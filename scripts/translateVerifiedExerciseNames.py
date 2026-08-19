import json
import os
import re
import time
from pathlib import Path

import requests


INPUT = Path("client/src/lib/verifiedActualExercisesPart14.ts")
OUTPUT = Path("/tmp/verified_actual_korean_names.json")
MODEL = "gpt-5-mini"
BATCH_SIZE = 50


def load_names():
    content = INPUT.read_text(encoding="utf-8")
    match = re.search(
        r"export const verifiedActualExercisesPart14: Exercise\[\] = (\[.*?\]);\n\nexport const",
        content,
        re.DOTALL,
    )
    if not match:
        raise RuntimeError("운동 목록을 찾지 못했습니다.")
    return [row["englishName"] for row in json.loads(match.group(1))]


def request_translation(names):
    schema = {
        "type": "object",
        "properties": {
            "translations": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "english": {"type": "string"},
                        "korean": {"type": "string"},
                    },
                    "required": ["english", "korean"],
                    "additionalProperties": False,
                },
            }
        },
        "required": ["translations"],
        "additionalProperties": False,
    }
    prompt = (
        "아래는 공개 운동 데이터베이스에서 선별한 실제 독립 운동 종목의 영문 표기입니다. "
        "각 항목을 한국 피트니스 현장에서 통용되는 자연스러운 한국어 운동명으로 번역하거나 음역하세요. "
        "운동 종목을 합치거나 삭제하지 말고, 반복·템포·인터벌 같은 세트 방식은 추가하지 마세요. "
        "원문의 영문 표기를 english에 그대로 보존하고, korean에는 짧고 고유한 한국어 표기만 넣으세요.\n\n"
        + json.dumps(names, ensure_ascii=False)
    )
    payload = {
        "model": MODEL,
        "messages": [
            {"role": "system", "content": "You are a meticulous Korean strength-and-conditioning terminology editor. Output only the requested JSON."},
            {"role": "user", "content": prompt},
        ],
        "response_format": {
            "type": "json_schema",
            "json_schema": {"name": "exercise_name_translations", "strict": True, "schema": schema},
        },
    }
    for attempt in range(3):
        try:
            response = requests.post(
                f"{os.environ['OPENAI_API_BASE']}/chat/completions",
                headers={"Authorization": f"Bearer {os.environ['OPENAI_API_KEY']}", "Content-Type": "application/json"},
                json=payload,
                timeout=150,
            )
            response.raise_for_status()
            return json.loads(response.json()["choices"][0]["message"]["content"])["translations"]
        except requests.RequestException:
            if attempt == 2:
                raise
            time.sleep(2 ** (attempt + 1))


names = load_names()
translations = json.loads(OUTPUT.read_text(encoding="utf-8")) if OUTPUT.exists() else {}
pending = [name for name in names if name not in translations]
for index in range(0, len(pending), BATCH_SIZE):
    batch = pending[index:index + BATCH_SIZE]
    rows = request_translation(batch)
    received = {row["english"]: row["korean"] for row in rows}
    missing = set(batch) - set(received)
    unexpected = set(received) - set(batch)
    if missing or unexpected:
        raise RuntimeError(f"번역 결과 불일치: missing={missing}, unexpected={unexpected}")
    translations.update(received)
    OUTPUT.write_text(json.dumps(translations, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"번역 완료: {len(translations)}/{len(names)}")
    time.sleep(0.2)

OUTPUT.write_text(json.dumps(translations, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"{len(translations)}개 한국어 운동명을 {OUTPUT}에 저장했습니다.")
