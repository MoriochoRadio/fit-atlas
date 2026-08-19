import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { exercises } from "../client/src/lib/fitnessData";
import { isIndependentCatalogExercise } from "../client/src/lib/catalogQualityRules";
import { createDetailedProfile } from "./verifiedDetailProfileRules";

type SourceExercise = {
  id: string;
  name: string;
  category: string;
  equipment: string | null;
  primaryMuscles: string[];
  level: "beginner" | "intermediate" | "expert" | null;
};

type AtlasCategory = "러닝" | "유산소" | "헬스기구" | "프리웨이트" | "맨몸운동" | "모빌리티" | "균형·협응" | "요가·필라테스" | "파워·민첩성";
type AtlasFocus = "근력" | "체력" | "심폐" | "가동성" | "균형" | "협응" | "파워";
type AtlasDifficulty = "입문" | "중급" | "상급";
type AtlasRegion = "가슴" | "등" | "어깨" | "팔" | "코어" | "둔근" | "하체";

const targetCount = 534;
const sourcePath = "/home/ubuntu/free-exercise-db/dist/exercises.json";
const outputPath = path.resolve("client/src/lib/verifiedActualExercisesPart14.ts");
const translationPath = "/tmp/verified_actual_korean_names.json";
const allowedCategories = new Set(["strength", "cardio", "stretching", "plyometrics", "powerlifting", "olympic weightlifting", "strongman"]);
const allowedEquipment = new Set(["barbell", "dumbbell", "cable", "machine", "kettlebells", "body only", "bands", "e-z curl bar", "medicine ball", "exercise ball", "foam roll", "none", "other"]);
const rejectedNameTerms = /(?:with chains|with bands|negative|partial rep|tempo|pause rep|interval|circuit|partner|assisted by partner|behind(?: the)? neck|neck|to neck|judo flip|atlas stone|car deadlift|sissy squat)/i;

const normalized = (value: string) => value
  .toLocaleLowerCase("en-US")
  .replace(/[^\p{L}\p{N}]+/gu, " ")
  .replace(/\s+/g, " ")
  .trim();

const toVerifiedId = (sourceId: string) => `verified-${sourceId.toLocaleLowerCase("en-US").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;

const koreanTerms: Array<[RegExp, string]> = [
  [/\bbarbell\b/gi, "바벨"], [/\bdumbbell\b/gi, "덤벨"], [/\bkettlebell\b/gi, "케틀벨"], [/\bcable\b/gi, "케이블"], [/\bmachine\b/gi, "머신"], [/\blever\b/gi, "레버"], [/\bsmith\b/gi, "스미스"], [/\bbodyweight\b/gi, "맨몸"], [/\bbody only\b/gi, "맨몸"], [/\bbench\b/gi, "벤치"], [/\bseated\b/gi, "시티드"], [/\bstanding\b/gi, "스탠딩"], [/\blying\b/gi, "라잉"], [/\bincline\b/gi, "인클라인"], [/\bdecline\b/gi, "디클라인"], [/\bflat\b/gi, "플랫"], [/\bone arm\b/gi, "싱글 암"], [/\bone-arm\b/gi, "싱글 암"], [/\bsingle arm\b/gi, "싱글 암"], [/\bsingle-arm\b/gi, "싱글 암"], [/\balternating\b/gi, "얼터네이팅"], [/\balternate\b/gi, "얼터네이트"], [/\bclose-grip\b/gi, "클로즈 그립"], [/\bwide-grip\b/gi, "와이드 그립"], [/\bunderhand\b/gi, "언더핸드"], [/\boverhand\b/gi, "오버핸드"], [/\breverse\b/gi, "리버스"], [/\bfront\b/gi, "프런트"], [/\brear\b/gi, "리어"], [/\blateral\b/gi, "레터럴"], [/\boverhead\b/gi, "오버헤드"], [/\bhigh\b/gi, "하이"], [/\blow\b/gi, "로우"], [/\bhammer\b/gi, "해머"], [/\bpreacher\b/gi, "프리처"], [/\bconcentration\b/gi, "컨센트레이션"], [/\bcurl\b/gi, "컬"], [/\bpress\b/gi, "프레스"], [/\bsquat\b/gi, "스쿼트"], [/\bdeadlift\b/gi, "데드리프트"], [/\brow\b/gi, "로우"], [/\bpulldown\b/gi, "풀다운"], [/\bpull-up\b/gi, "풀업"], [/\bchin-up\b/gi, "친업"], [/\bpush-up\b/gi, "푸시업"], [/\bflye?s?\b/gi, "플라이"], [/\braise\b/gi, "레이즈"], [/\bextension\b/gi, "익스텐션"], [/\bcrunch\b/gi, "크런치"], [/\bplank\b/gi, "플랭크"], [/\brotation\b/gi, "로테이션"], [/\bshrug\b/gi, "슈러그"], [/\bcarry\b/gi, "캐리"], [/\blunge\b/gi, "런지"], [/\bstep-up\b/gi, "스텝업"], [/\bcalf raise\b/gi, "카프 레이즈"], [/\bhip\b/gi, "힙"], [/\bglute\b/gi, "글루트"], [/\bhamstring\b/gi, "햄스트링"], [/\bshoulder\b/gi, "숄더"], [/\bchest\b/gi, "체스트"], [/\bback\b/gi, "백"], [/\btriceps?\b/gi, "트라이셉스"], [/\bbiceps?\b/gi, "바이셉스"], [/\bwrist\b/gi, "리스트"], [/\bcore\b/gi, "코어"], [/\bwalk\b/gi, "워크"], [/\brun\b/gi, "런"], [/\bbike\b/gi, "바이크"], [/\bstretch\b/gi, "스트레치"], [/\bfoam roll\b/gi, "폼롤"], [/\bmedicine ball\b/gi, "메디신볼"], [/\bband\b/gi, "밴드"], [/\bball\b/gi, "볼"], [/\bpower\b/gi, "파워"], [/\bjump\b/gi, "점프"], [/\bclean\b/gi, "클린"], [/\bsnatch\b/gi, "스내치"], [/\bjerk\b/gi, "저크"], [/\bromanian\b/gi, "루마니안"], [/\bgood morning\b/gi, "굿모닝"], [/\bzercher\b/gi, "저처"], [/\bpullover\b/gi, "풀오버"], [/\bside bend\b/gi, "사이드 밴드"], [/\bside\b/gi, "사이드"], [/\barm\b/gi, "암"], [/\bleg\b/gi, "레그"], [/\bto\b/gi, "투"], [/\bwith\b/gi, "위드"],
];

const manualKorean = (name: string) => koreanTerms.reduce((result, [pattern, replacement]) => result.replace(pattern, replacement), name)
  .replace(/\s+/g, " ")
  .trim();

const getRegions = (muscles: string[]): AtlasRegion[] => {
  const regionMap: Record<string, AtlasRegion[]> = {
    abdominals: ["코어"], abductors: ["둔근", "하체"], adductors: ["하체"], biceps: ["팔"], calves: ["하체"], chest: ["가슴"], forearms: ["팔"], glutes: ["둔근", "하체"], hamstrings: ["하체", "둔근"], lats: ["등"], "lower back": ["등", "코어"], "middle back": ["등"], neck: ["어깨"], quadriceps: ["하체"], shoulders: ["어깨"], traps: ["등", "어깨"], triceps: ["팔"], "upper back": ["등"],
  };
  const mapped = muscles.flatMap((muscle) => regionMap[muscle.toLowerCase()] ?? ["코어"]);
  return [...new Set(mapped)].slice(0, 4) as AtlasRegion[];
};

const getCategory = (source: SourceExercise): AtlasCategory => {
  if (source.category === "cardio") return "유산소";
  if (source.category === "stretching") return "모빌리티";
  if (source.category === "plyometrics") return "파워·민첩성";
  if (source.equipment === "body only" || source.equipment === "none") return "맨몸운동";
  if (["barbell", "dumbbell", "kettlebells", "e-z curl bar", "bands", "medicine ball", "exercise ball"].includes(source.equipment ?? "")) return "프리웨이트";
  return "헬스기구";
};

const getFocus = (category: AtlasCategory): AtlasFocus => ({ "러닝": "심폐", "유산소": "심폐", "헬스기구": "근력", "프리웨이트": "근력", "맨몸운동": "근력", "모빌리티": "가동성", "균형·협응": "균형", "요가·필라테스": "가동성", "파워·민첩성": "파워" }[category]);
const getDifficulty = (level: SourceExercise["level"]): AtlasDifficulty => level === "expert" ? "상급" : level === "intermediate" ? "중급" : "입문";
const getEquipment = (source: SourceExercise) => ({ barbell: "바벨·안전 랙 선택", dumbbell: "덤벨·안정된 지지면 선택", cable: "케이블 머신·핀", machine: "머신·시트/패드", kettlebells: "케틀벨", "body only": "장비 없음", bands: "저항 밴드·안정된 고정점", "e-z curl bar": "EZ 바", "medicine ball": "가벼운 메디신볼·공간", "exercise ball": "안정된 짐볼", "foam roll": "폼롤러·매트", none: "장비 없음", other: "안정된 전용 장비" }[source.equipment ?? "none"] ?? "전용 장비");
const getMinutes = (category: AtlasCategory) => ({ "러닝": "10–25분", "유산소": "10–25분", "헬스기구": "6–12회 · 2세트", "프리웨이트": "6–12회 · 2세트", "맨몸운동": "6–12회 · 2세트", "모빌리티": "좌우 5–10회 · 2세트", "균형·협응": "10–30초 · 2회", "요가·필라테스": "20–40초 · 2회", "파워·민첩성": "3–6회 · 2세트" }[category]);

const safetyByCategory: Record<AtlasCategory, { cue: string; benefit: string; warning: string; setup: string; mistake: string; regression: string; progression: string; finish: string }> = {
  "러닝": { cue: "대화 가능한 호흡", benefit: "심폐 지구력", warning: "흉통·현기증·비정상적인 숨참·날카로운 통증 또는 노면 위험이 있으면 즉시 걷기로 낮추거나 중단하세요.", setup: "신발·노면·날씨와 귀가 경로 확인", mistake: "초반부터 속도와 거리를 동시에 올리기", regression: "평지 걷기·짧은 시간", progression: "회복이 편안한 날 시간만 소폭 증가", finish: "걷기로 호흡을 낮추고 발목·무릎·피로 반응을 확인합니다." },
  "유산소": { cue: "낮은 저항·리듬 유지", benefit: "저충격 심폐 활동", warning: "흉통·현기증·비정상적인 숨참·관절 통증 또는 기구 이상이 있으면 즉시 저항을 낮추고 중단하세요.", setup: "기구 높이·저항·고정 장치 확인", mistake: "저항을 급하게 올리고 손잡이에 체중 싣기", regression: "저항·시간 낮추기", progression: "시간을 먼저 소폭 증가", finish: "저항을 낮춰 호흡을 안정시키고 관절 반응을 확인합니다." },
  "헬스기구": { cue: "시트·패드·관절 축 맞추기", benefit: "저항 운동 적응", warning: "관절 통증·저림·기구 흔들림·핀 미고정 또는 반동이 있으면 즉시 중단하고 설정을 다시 확인하세요.", setup: "시트·패드·핀을 신체에 맞게 조절", mistake: "반동으로 중량을 움직이고 범위를 억지로 늘리기", regression: "중량·가동 범위 낮추기", progression: "반복 품질 뒤 중량 한 단계만 조절", finish: "중량을 완전히 제자리에 두고 관절·호흡 반응을 확인합니다." },
  "프리웨이트": { cue: "중량을 몸 가까이·정렬 유지", benefit: "자유중량 제어", warning: "허리·관절 통증·저림·그립 미끄러짐·균형 상실 또는 주변 충돌 위험이 있으면 즉시 중단하세요.", setup: "바닥·장비·주변 반경과 안전한 내려놓기 위치 확인", mistake: "무게를 몸에서 멀리 두고 반동으로 반복하기", regression: "더 가벼운 도구·짧은 범위", progression: "정렬 유지 뒤 반복 또는 부하 하나만 소폭 증가", finish: "도구를 안전하게 내려놓고 그립·관절·피로 반응을 확인합니다." },
  "맨몸운동": { cue: "지지면을 밀고 몸통 정렬", benefit: "맨몸 근력·협응", warning: "관절 통증·저림·어지러움·지지면 미끄러짐 또는 몸통 정렬 상실이 있으면 쉬운 변형으로 낮추거나 중단하세요.", setup: "바닥·공간·지지면을 확인하고 쉬운 범위 리허설", mistake: "통증을 참고 난도·반복을 동시에 올리기", regression: "벽·벤치·무릎 지지 또는 짧은 범위", progression: "안정된 지지에서 반복만 소폭 증가", finish: "호흡을 정리하고 손목·어깨·무릎 반응을 확인합니다." },
  "모빌리티": { cue: "통증 없는 작은 범위·호흡", benefit: "관절 가동성 인식", warning: "외상 뒤 통증·저림·방사통·붓기·열감 또는 날카로운 통증이 있으면 자가 운동을 중단하고 평가를 우선하세요.", setup: "편안한 자세와 작은 범위부터 설정", mistake: "끝 범위를 억지로 밀고 호흡 참기", regression: "범위 줄이기·지지대 사용", progression: "다음 날 편안할 때 범위 또는 반복 하나만 증가", finish: "중립 자세로 천천히 돌아와 불편감이 남지 않는지 확인합니다." },
  "균형·협응": { cue: "지지대 가까이·느린 체중 이동", benefit: "균형·협응", warning: "어지러움·낙상 위험·발목·무릎 통증·미끄러운 바닥 또는 균형 상실이 있으면 즉시 양발 지지로 전환하세요.", setup: "벽·의자 가까이에서 바닥과 주변 공간 확인", mistake: "피로한 상태에서 지지 없이 난도 올리기", regression: "양손 지지·짧은 시간", progression: "지지와 시간 중 하나만 소폭 조절", finish: "양발로 안정된 뒤 어지러움과 균형 반응을 확인합니다." },
  "요가·필라테스": { cue: "호흡 유지·관절 편안함", benefit: "전신 가동성", warning: "통증·저림·어지러움 또는 균형 상실이 있으면 자세를 낮추고 억지로 깊이를 늘리지 마세요.", setup: "매트·공간·편안한 호흡 범위 확인", mistake: "유연성을 과시하려 끝 범위를 강요하기", regression: "블록·벽·의자와 짧은 유지", progression: "편안한 범위에서 호흡 주기만 추가", finish: "중립 자세에서 호흡을 정리하고 불편감 반응을 확인합니다." },
  "파워·민첩성": { cue: "낮은 충격·착지 제어", benefit: "파워·방향 제어", warning: "무릎·발목·허리 통증·착지 불안·피로 누적·공간 부족 또는 미끄러운 바닥이 있으면 즉시 중단하세요.", setup: "낮은 충격의 기본 동작과 착지 공간 확인", mistake: "높이·속도·거리부터 동시에 올리기", regression: "점프 없는 체중 이동·낮은 속도", progression: "착지 제어 뒤 거리 또는 반복 하나만 증가", finish: "걷기로 호흡을 낮추고 관절·착지 반응을 확인합니다." },
};

const sourceRef = { label: "Free Exercise DB — 공개 도메인 실제 운동 종목", url: "https://github.com/yuhonas/free-exercise-db" };
const acsmRef = { label: "ACSM — Exercise Safety", url: "https://acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines/" };

const dataset = JSON.parse(await readFile(sourcePath, "utf8")) as SourceExercise[];
const translatedNames = JSON.parse(await readFile(translationPath, "utf8")) as Record<string, string>;
const toKorean = (name: string) => translatedNames[name] ?? manualKorean(name);
const baseExercises = exercises.filter((exercise) => !exercise.id.startsWith("verified-") && isIndependentCatalogExercise(exercise));
const existingEnglishNames = new Set(baseExercises.map((exercise) => normalized(exercise.englishName)));
const existingKoreanNames = new Set(baseExercises.map((exercise) => normalized(exercise.name)));
const selectedNames = new Set<string>();
const selectedKoreanNames = new Set<string>();

const candidates = dataset
  .filter((exercise) => allowedCategories.has(exercise.category))
  .filter((exercise) => allowedEquipment.has(exercise.equipment ?? "none"))
  .filter((exercise) => !rejectedNameTerms.test(exercise.name))
  .filter((exercise) => isIndependentCatalogExercise({ id: toVerifiedId(exercise.id) }))
  .filter((exercise) => !existingEnglishNames.has(normalized(exercise.name)))
  .sort((left, right) => `${left.category}:${left.equipment}:${left.name}`.localeCompare(`${right.category}:${right.equipment}:${right.name}`));

const selected = candidates.filter((exercise) => {
  const englishName = normalized(exercise.name);
  const koreanName = normalized(toKorean(exercise.name));
  if (selectedNames.has(englishName) || selectedKoreanNames.has(koreanName) || existingKoreanNames.has(koreanName)) return false;
  selectedNames.add(englishName);
  selectedKoreanNames.add(koreanName);
  return true;
}).slice(0, targetCount);

if (selected.length !== targetCount) throw new Error(`Expected ${targetCount} verified source exercises, received ${selected.length}.`);

const rows = selected.map((source) => {
  const category = getCategory(source);
  const region = getRegions(source.primaryMuscles);
  const safety = safetyByCategory[category];
  const name = toKorean(source.name);
  const equipment = getEquipment(source);
  const detailed = createDetailedProfile({ name, equipment, source });
  return {
    id: toVerifiedId(source.id),
    name,
    englishName: source.name,
    category,
    regions: region,
    focus: getFocus(category),
    difficulty: getDifficulty(source.level),
    equipment,
    minutes: getMinutes(category),
    description: detailed.description,
    cues: detailed.cues,
    benefits: detailed.benefits,
    warning: detailed.warning,
    reference: category === "모빌리티" ? sourceRef : acsmRef,
    detail: { setup: detailed.setup, finish: detailed.finish, commonMistakes: detailed.commonMistakes, regressions: detailed.regressions, progressions: detailed.progressions },
  };
});

const exerciseRows = rows.map(({ detail: _detail, ...exercise }) => exercise);
const detailRows = rows.map(({ id, detail }) => [id, detail] as const);
const output = `import type { Exercise } from "./fitnessData";\nimport type { ExerciseDetail } from "./exerciseDetails";\n\nexport const verifiedActualExercisesPart14: Exercise[] = ${JSON.stringify(exerciseRows, null, 2)};\n\nexport const verifiedActualExerciseDetailsPart14: Record<string, ExerciseDetail> = Object.fromEntries(${JSON.stringify(detailRows, null, 2)});\n`;

await writeFile(outputPath, output, "utf8");
console.log(`Generated ${rows.length} verified actual exercise entries at ${outputPath}.`);
