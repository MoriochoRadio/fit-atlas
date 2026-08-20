import type { ExerciseTextGuide } from "./exerciseTextGuide";

type AsciiStage = { label: string; art: string; cue: string };

export type AsciiMovementDiagram = {
  title: string;
  description: string;
  stages: [AsciiStage, AsciiStage, AsciiStage];
};

export type AsciiDiagramPresentation = {
  categoryTheme: "cardio" | "strength" | "mobility" | "coordination";
  regionTheme: "chest" | "back" | "shoulder" | "arms" | "core" | "glutes" | "lower";
  categoryLabel: string;
  regionLabel: string;
  stageArrows: [string, string, string];
  motionLabel: string;
  jointFocus: string;
  rom: "작음" | "보통" | "큼";
  romDescription: string;
};

const pose = (...lines: string[]) => lines.join("\n");

const stand = pose("  O", " /|\\", " / \\", "─────");
const squat = pose("  O", " /|\\", "_/ \\_", "─────");
const plank = pose("O────", "  |  ", " / \\ ", "─────");
const push = pose("O─── ", "  |\\  ", " /  \\ ", "─────");
const hinge = pose(" O  ", "  \\_ ", " /|  ", " /_  ");
const bench = pose(" O──", "  |  ", " /|\\ ", "─────");
const pull = pose(" ─── ", "  O  ", " /|\\ ", " / \\");
const press = pose("   O", "  /|\\", "  /   ", "──┴──");
const erg = pose(" O  ↔", "  \\_ ", " /|  ", " /_  ");
const bike = pose("  O ", " /|_", " / \\○", "───○─");
const bridge = pose("O___", "  /\\ ", " /_   ", "─────");
const birdDog = pose(" O──", " /|  ", "/  \\", "─────");
const step = pose("  O ", " /| ", " / \\_", "───▔▔");

export const asciiMovementDiagrams: Record<string, AsciiMovementDiagram> = {
  squat: { title: "스쿼트 ASCII 도식", description: "발 전체로 지면을 느끼며 앉았다가 일어나는 흐름입니다.", stages: [{ label: "시작", art: stand, cue: "발 전체를 바닥에" }, { label: "앉기", art: squat, cue: "엉덩이·무릎을 함께" }, { label: "일어서기", art: stand, cue: "바닥을 밀어 올라오기" }] },
  "bodyweight-squat": { title: "맨몸 스쿼트 ASCII 도식", description: "낮은 범위부터 균형을 유지하는 앉기·일어서기 흐름입니다.", stages: [{ label: "준비", art: stand, cue: "발 간격을 편안하게" }, { label: "내려가기", art: squat, cue: "통증 없는 범위로" }, { label: "복귀", art: stand, cue: "발 전체로 밀기" }] },
  pushup: { title: "푸시업 ASCII 도식", description: "긴 몸통 선을 유지한 채 바닥을 밀어내는 흐름입니다.", stages: [{ label: "시작", art: plank, cue: "머리부터 발까지 긴 선" }, { label: "내리기", art: push, cue: "팔꿈치는 편안한 대각선" }, { label: "밀기", art: plank, cue: "바닥을 멀리 밀기" }] },
  rdl: { title: "힙 힌지 ASCII 도식", description: "무릎보다 엉덩이를 뒤로 보내는 접기·펴기 흐름입니다.", stages: [{ label: "시작", art: stand, cue: "부하를 몸 가까이" }, { label: "접기", art: hinge, cue: "엉덩이를 뒤로" }, { label: "일어서기", art: stand, cue: "둔근으로 바닥 밀기" }] },
  "dumbbell-bench": { title: "덤벨 벤치 프레스 ASCII 도식", description: "벤치에서 몸통을 안정시킨 뒤 덤벨을 제어해 미는 흐름입니다.", stages: [{ label: "준비", art: bench, cue: "발·등을 안정적으로" }, { label: "내리기", art: bench, cue: "손목을 편안히 제어" }, { label: "밀기", art: press, cue: "어깨 통증 없는 경로" }] },
  latpulldown: { title: "랫 풀다운 ASCII 도식", description: "어깨를 먼저 내린 뒤 팔꿈치를 아래로 보내는 당기기 흐름입니다.", stages: [{ label: "준비", art: pull, cue: "허벅지 지지·가벼운 중량" }, { label: "당기기", art: pull, cue: "어깨를 내리고 팔꿈치 아래로" }, { label: "복귀", art: stand, cue: "반동 없이 장력 제어" }] },
  "leg-press": { title: "레그 프레스 ASCII 도식", description: "등받이 지지에서 발 전체로 플랫폼을 미는 흐름입니다.", stages: [{ label: "설정", art: bench, cue: "등·골반을 등받이에" }, { label: "밀기", art: press, cue: "무릎을 끝까지 잠그지 않기" }, { label: "복귀", art: bench, cue: "허리 뜨기 전 범위에서" }] },
  "row-erg-easy": { title: "로잉 에르고미터 ASCII 도식", description: "다리·몸통·팔 순서로 밀고, 반대 순서로 돌아오는 흐름입니다.", stages: [{ label: "캐치", art: erg, cue: "낮은 저항·몸통 길게" }, { label: "드라이브", art: erg, cue: "다리·몸통·팔 순서" }, { label: "복귀", art: erg, cue: "팔·몸통·다리 순서" }] },
  bike: { title: "사이클 ASCII 도식", description: "안정된 상체로 부드러운 페달 리듬을 유지하는 흐름입니다.", stages: [{ label: "설정", art: bike, cue: "안장·브레이크 확인" }, { label: "페달", art: bike, cue: "어깨 힘을 빼고 부드럽게" }, { label: "조절", art: bike, cue: "호흡이 거칠면 저항 낮추기" }] },
  "front-plank": { title: "프런트 플랭크 ASCII 도식", description: "팔꿈치 지지에서 몸통을 길게 유지하는 정적 지지 흐름입니다.", stages: [{ label: "준비", art: plank, cue: "팔꿈치를 어깨 아래" }, { label: "지지", art: plank, cue: "골반을 편안한 높이로" }, { label: "종료", art: plank, cue: "정렬 흐트러지기 전 쉬기" }] },
  "barbell-hip-thrust": { title: "힙 쓰러스트 ASCII 도식", description: "벤치 지지에서 둔근으로 골반을 들어 올리는 흐름입니다.", stages: [{ label: "준비", art: bridge, cue: "발·벤치 위치 확인" }, { label: "들기", art: bridge, cue: "갈비뼈 들지 않고 둔근으로" }, { label: "복귀", art: bridge, cue: "골반을 먼저 낮추기" }] },
  "bird-dog": { title: "버드 독 ASCII 도식", description: "네발 지지에서 반대 손·발을 짧게 뻗는 협응 흐름입니다.", stages: [{ label: "준비", art: birdDog, cue: "손·무릎 아래 지지" }, { label: "뻗기", art: birdDog, cue: "반대손·발을 짧게" }, { label: "복귀", art: birdDog, cue: "골반 흔들림 없이 교대" }] },
  "assisted-pullup": { title: "어시스트 풀업 ASCII 도식", description: "보조 지지를 확인한 뒤 어깨를 내리고 당기는 흐름입니다.", stages: [{ label: "준비", art: pull, cue: "보조 중량·발 지지 확인" }, { label: "당기기", art: pull, cue: "목 길게·어깨를 먼저 내리기" }, { label: "복귀", art: stand, cue: "천천히 내려오기" }] },
  "step-up": { title: "스텝업 ASCII 도식", description: "낮은 스텝에서 앞발 전체로 올라가고 천천히 내려오는 흐름입니다.", stages: [{ label: "준비", art: step, cue: "낮은 스텝·지지대 확인" }, { label: "올라가기", art: step, cue: "앞발 전체로 바닥 밀기" }, { label: "내려오기", art: stand, cue: "속도보다 안정 우선" }] },
};

const asciiDiagramIdByExerciseName: Record<string, string> = {
  "바벨 백 스쿼트": "squat",
  "맨몸 스쿼트": "bodyweight-squat",
  "푸시업": "pushup",
  "덤벨 벤치 프레스": "dumbbell-bench",
  "랫 풀다운": "latpulldown",
  "레그 프레스": "leg-press",
  "로잉 에르고미터": "row-erg-easy",
  "스테디 사이클": "bike",
  "프런트 플랭크": "front-plank",
  "바벨 힙 쓰러스트": "barbell-hip-thrust",
  "버드 독": "bird-dog",
  "어시스트 풀업": "assisted-pullup",
  "스텝업": "step-up",
};

function selectFallbackDiagramId(guide: ExerciseTextGuide) {
  const descriptor = `${guide.name} ${guide.equipment} ${guide.category} ${guide.focus} ${guide.regions.join(" ")}`.toLowerCase();
  if (/(사이클|바이크|자전거)/.test(descriptor)) return "bike";
  if (/(로잉|로우)/.test(descriptor)) return "row-erg-easy";
  if (/(수영|수중|풀)/.test(descriptor)) return "row-erg-easy";
  if (/(풀업|풀다운|랫|친업|매달리기)/.test(descriptor)) return "latpulldown";
  if (/(프레스|벤치|푸시|딥)/.test(descriptor)) return "dumbbell-bench";
  if (/(데드|힌지|스윙|굿모닝|RDL)/i.test(descriptor)) return "rdl";
  if (/(런지|스텝|계단)/.test(descriptor)) return "step-up";
  if (/(스쿼트|레그|종아리)/.test(descriptor)) return "bodyweight-squat";
  if (/(플랭크|크런치|데드버그|코어|복근)/.test(descriptor)) return "front-plank";
  if (/(둔근|힙|브리지)/.test(descriptor)) return "barbell-hip-thrust";
  if (guide.category === "러닝" || guide.category === "유산소") return "bike";
  if (guide.category === "모빌리티" || guide.category === "요가·필라테스" || guide.focus === "균형" || guide.focus === "협응") return "bird-dog";
  return "bodyweight-squat";
}

function createFallbackDiagram(guide: ExerciseTextGuide): AsciiMovementDiagram {
  const reference = asciiMovementDiagrams[selectFallbackDiagramId(guide)];
  return {
    title: `${guide.name} ASCII 동작 도식`,
    description: `${guide.name}의 ${guide.category} 동작을 시작·핵심 움직임·마무리 확인 순서로 읽는 공통 도식입니다.`,
    stages: reference.stages.map((stage, index) => ({ label: ["시작", "핵심", "마무리"][index], art: stage.art, cue: guide.sequence[index] })) as AsciiMovementDiagram["stages"],
  };
}

export function getAsciiDiagramPresentation(guide: ExerciseTextGuide): AsciiDiagramPresentation {
  const pattern = selectFallbackDiagramId(guide);
  const categoryTheme = guide.category === "러닝" || guide.category === "유산소" ? "cardio" : guide.category === "모빌리티" || guide.category === "요가·필라테스" ? "mobility" : guide.category === "균형·협응" || guide.category === "파워·민첩성" ? "coordination" : "strength";
  const categoryLabel = { cardio: "심폐·리듬", strength: "근력·제어", mobility: "가동성·회복", coordination: "균형·협응" }[categoryTheme];
  const regionTheme = ({ 가슴: "chest", 등: "back", 어깨: "shoulder", 팔: "arms", 코어: "core", 둔근: "glutes", 하체: "lower" } as const)[guide.regions[0]];
  const regionLabel = ({ chest: "가슴", back: "등", shoulder: "어깨", arms: "팔", core: "코어", glutes: "둔근", lower: "하체" } as const)[regionTheme];
  const movement = pattern === "rdl" || pattern === "barbell-hip-thrust" ? { stageArrows: ["↘", "↗", "↕"] as [string, string, string], motionLabel: "고관절 접기 ↘ · 펴기 ↗" } : pattern === "dumbbell-bench" || pattern === "latpulldown" ? { stageArrows: ["↙", "↗", "↕"] as [string, string, string], motionLabel: "팔·어깨 경로 ↙ · 밀기/당기기 ↗" } : pattern === "row-erg-easy" || pattern === "bike" ? { stageArrows: ["↔", "→", "↔"] as [string, string, string], motionLabel: "반복 리듬 ↔ · 추진 방향 →" } : pattern === "step-up" ? { stageArrows: ["↗", "↑", "↘"] as [string, string, string], motionLabel: "발 지지 ↗ · 위로 밀기 ↑ · 천천히 내려오기 ↘" } : pattern === "front-plank" || pattern === "bird-dog" ? { stageArrows: ["→", "↔", "←"] as [string, string, string], motionLabel: "몸통 길게 → · 균형 유지 ↔ · 제어 복귀 ←" } : { stageArrows: ["↘", "↑", "↕"] as [string, string, string], motionLabel: "관절 굽힘 ↘ · 지면 밀기 ↑ · 제어 복귀 ↕" };
  const axis = pattern === "rdl" || pattern === "barbell-hip-thrust" ? { jointFocus: "고관절 · 무릎", rom: "보통" as const, romDescription: "고관절을 중심으로 접고 펴되, 허리로 범위를 억지로 만들지 않습니다." } : pattern === "dumbbell-bench" || pattern === "latpulldown" ? { jointFocus: "어깨 · 팔꿈치", rom: "보통" as const, romDescription: "어깨·팔꿈치가 편안한 경로 안에서 움직입니다." } : pattern === "row-erg-easy" || pattern === "bike" ? { jointFocus: "고관절 · 무릎 · 발목", rom: "보통" as const, romDescription: "반복 리듬 안에서 다리 관절이 부드럽게 이어집니다." } : pattern === "step-up" || pattern === "bodyweight-squat" ? { jointFocus: "발목 · 무릎 · 고관절", rom: "큼" as const, romDescription: "발목·무릎·고관절을 함께 쓰되 통증 없는 범위에서 멈춥니다." } : pattern === "front-plank" || pattern === "bird-dog" ? { jointFocus: "어깨 · 골반 · 척추", rom: "작음" as const, romDescription: "관절을 크게 움직이기보다 몸통 중심축을 길게 유지합니다." } : guide.category === "모빌리티" || guide.category === "요가·필라테스" ? { jointFocus: `${regionLabel} 주변 관절`, rom: "큼" as const, romDescription: "범위는 호흡이 유지되는 선에서 천천히 넓힙니다." } : guide.focus === "균형" || guide.focus === "협응" ? { jointFocus: "발목 · 골반 · 몸통", rom: "작음" as const, romDescription: "작은 보정 움직임으로 안정된 중심축을 찾습니다." } : { jointFocus: `${regionLabel} · 몸통 중심축`, rom: "보통" as const, romDescription: "주요 부위와 몸통이 함께 제어되는 편안한 범위입니다." };
  return { categoryTheme, regionTheme, categoryLabel, regionLabel, ...movement, ...axis };
}

export function getAsciiMovementDiagram(exerciseId: string, guide?: ExerciseTextGuide) {
  const direct = asciiMovementDiagrams[exerciseId] ?? asciiMovementDiagrams[asciiDiagramIdByExerciseName[exerciseId]];
  return direct ?? (guide ? createFallbackDiagram(guide) : undefined);
}
