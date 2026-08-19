import concurrent.futures as futures
import json
import os
import re
import threading
import time
from pathlib import Path

import requests


MODEL = "gpt-5-mini"
BATCH_SIZE = 12
MAX_WORKERS = 4
INPUT = Path("client/src/lib/verifiedActualExercisesPart14.ts")
SOURCE = Path("/home/ubuntu/free-exercise-db/dist/exercises.json")
OUTPUT = Path("scripts/data/verifiedExerciseDetailProfiles.json")
OUTPUT.parent.mkdir(parents=True, exist_ok=True)
write_lock = threading.Lock()


def verified_id(source_id: str) -> str:
    normalized = re.sub(r"[^a-z0-9]+", "-", source_id.lower()).strip("-")
    return f"verified-{normalized}"


def load_verified_exercises():
    content = INPUT.read_text(encoding="utf-8")
    match = re.search(r"export const verifiedActualExercisesPart14: Exercise\[\] = (\[.*?\]);\n\nexport const", content, re.DOTALL)
    if not match:
        raise RuntimeError("검증 원천 운동 목록을 찾지 못했습니다.")
    return json.loads(match.group(1))


def load_items():
    source_by_id = {verified_id(row["id"]): row for row in json.loads(SOURCE.read_text(encoding="utf-8"))}
    items = []
    for exercise in load_verified_exercises():
        source = source_by_id.get(exercise["id"])
        if not source:
            raise RuntimeError(f"원천 데이터를 찾지 못했습니다: {exercise['id']}")
        items.append({
            "id": exercise["id"],
            "koreanName": exercise["name"],
            "englishName": exercise["englishName"],
            "category": exercise["category"],
            "equipment": exercise["equipment"],
            "primaryMuscles": source.get("primaryMuscles", []),
            "level": source.get("level") or "beginner",
        })
    return items


def load_existing():
    if not OUTPUT.exists():
        return {}
    data = json.loads(OUTPUT.read_text(encoding="utf-8"))
    return data if isinstance(data, dict) else {}


def schema():
    text = {"type": "string", "minLength": 12}
    text_list = {"type": "array", "items": text, "minItems": 3, "maxItems": 3}
    profile = {
        "type": "object",
        "properties": {
            "id": {"type": "string"},
            "description": text,
            "cues": text_list,
            "benefits": text_list,
            "warning": {"type": "string", "minLength": 30},
            "setup": text_list,
            "finish": text,
            "commonMistakes": text_list,
            "regressions": text_list,
            "progressions": text_list,
        },
        "required": ["id", "description", "cues", "benefits", "warning", "setup", "finish", "commonMistakes", "regressions", "progressions"],
        "additionalProperties": False,
    }
    return {
        "type": "object",
        "properties": {"profiles": {"type": "array", "items": profile}},
        "required": ["profiles"],
        "additionalProperties": False,
    }


def validate(profile, item):
    if profile.get("id") != item["id"]:
        raise RuntimeError(f"운동 식별자가 일치하지 않습니다: {profile.get('id')} != {item['id']}")
    for key in ("description", "warning", "finish"):
        if not isinstance(profile.get(key), str) or len(profile[key].strip()) < 12:
            raise RuntimeError(f"{item['id']}의 {key} 문장이 부족합니다.")
    for key in ("cues", "benefits", "setup", "commonMistakes", "regressions", "progressions"):
        values = profile.get(key)
        if not isinstance(values, list) or len(values) != 3 or any(not isinstance(value, str) or len(value.strip()) < 8 for value in values):
            raise RuntimeError(f"{item['id']}의 {key} 항목이 3개의 충분한 문장이 아닙니다.")


def request_profiles(batch):
    prompt = """당신은 한국어 운동 자세 편집자입니다. 아래 각 항목은 실제 독립 운동 종목입니다. 운동 이름, 장비, 분류, 주동근을 근거로 각 운동마다 서로 구별되는 실용적 자세 지식을 한국어로 작성하세요.

원칙:
1. 정확한 장비 설정, 시작 자세, 관절·도구 이동 경로, 호흡, 마무리 기준을 구체적으로 쓰되, 이름만으로 확정할 수 없는 각도·무게·의학적 주장은 만들지 마세요.
2. 통증·저림·어지러움·기구 이상 시 중단하라는 보수적 안전 경계는 유지하되, 운동별 위험(그립, 낙하, 지지면, 척추·무릎·어깨 정렬 등)을 구별하세요.
3. 세트 방식·템포·인터벌을 새로운 운동처럼 만들지 마세요. 의학적 진단·치료 조언을 제공하지 마세요.
4. description·finish는 완결 문장으로, 나머지 배열은 짧은 실행 문장 3개씩 작성하세요. 항목 간 문구를 복제하지 마세요.
5. 모든 문자열은 한국어로 작성하고, 지정된 id를 그대로 보존하세요.

운동 입력:
""" + json.dumps(batch, ensure_ascii=False)
    payload = {
        "model": MODEL,
        "messages": [
            {"role": "system", "content": "Output only schema-valid JSON. You are precise, conservative, and do not invent medical claims."},
            {"role": "user", "content": prompt},
        ],
        "max_completion_tokens": 12000,
        "response_format": {"type": "json_schema", "json_schema": {"name": "verified_exercise_detail_profiles", "strict": True, "schema": schema()}},
    }
    for attempt in range(3):
        try:
            response = requests.post(
                f"{os.environ['OPENAI_API_BASE']}/chat/completions",
                headers={"Authorization": f"Bearer {os.environ['OPENAI_API_KEY']}", "Content-Type": "application/json"},
                json=payload,
                timeout=180,
            )
            response.raise_for_status()
            rows = json.loads(response.json()["choices"][0]["message"]["content"])["profiles"]
            received = {row["id"]: row for row in rows}
            expected = {item["id"] for item in batch}
            if set(received) != expected:
                raise RuntimeError(f"응답 운동 식별자 불일치: missing={expected - set(received)}, unexpected={set(received) - expected}")
            for item in batch:
                validate(received[item["id"]], item)
            return received
        except (requests.RequestException, ValueError, KeyError, RuntimeError):
            if attempt == 2:
                raise
            time.sleep(2 ** (attempt + 1))


def save(profiles):
    OUTPUT.write_text(json.dumps(profiles, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


items = load_items()
profiles = load_existing()
pending = [item for item in items if item["id"] not in profiles]
print(f"기존 {len(profiles)}개, 새 생성 대상 {len(pending)}개")


def process(batch):
    result = request_profiles(batch)
    with write_lock:
        profiles.update(result)
        save(profiles)
        print(f"자세 지식 완료: {len(profiles)}/{len(items)}")


batches = [pending[index:index + BATCH_SIZE] for index in range(0, len(pending), BATCH_SIZE)]
with futures.ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
    list(executor.map(process, batches))

if set(profiles) != {item["id"] for item in items}:
    raise RuntimeError("완료된 자세 지식 프로필과 원천 운동 식별자 집합이 일치하지 않습니다.")

print(f"{len(profiles)}개 개별 자세 지식을 {OUTPUT}에 저장했습니다.")
