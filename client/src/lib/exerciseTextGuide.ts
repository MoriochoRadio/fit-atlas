import type { Exercise, ExerciseDetail } from "./catalogTypes";

export type ExerciseTextGuide = {
  name: string;
  category: Exercise["category"];
  focus: Exercise["focus"];
  regions: Exercise["regions"];
  equipment: string;
  sequence: [string, string, string];
  primaryMuscles: string[];
  supportingMuscles: string[];
  breathing: string;
  adjustment: string;
  stop: string;
};

const musclesByRegion = {
  가슴: ["대흉근", "소흉근"],
  등: ["광배근", "중·하부 승모근", "능형근"],
  어깨: ["삼각근", "회전근개 주변 안정근"],
  팔: ["상완이두근", "상완삼두근", "전완근"],
  코어: ["복직근", "복횡근", "척추기립근"],
  둔근: ["대둔근", "중둔근"],
  하체: ["대퇴사두근", "햄스트링", "종아리근"],
} as const;

function getBreathing(
  category: Exercise["category"],
  focus: Exercise["focus"]
) {
  if (category === "러닝" || category === "유산소")
    return "↔ 편안한 리듬으로 숨을 이어가고, 짧은 문장 말하기가 어려우면 속도·저항을 먼저 낮춥니다.";
  if (category === "모빌리티" || category === "요가·필라테스")
    return "↔ 범위를 넓힐 때는 길게 내쉬고, 돌아올 때는 편안히 들이쉽니다. 숨을 참아 범위를 만들지 않습니다.";
  if (focus === "균형" || focus === "협응")
    return "↔ 움직임을 시작하기 전 숨을 정리하고, 흔들림이 커지면 호흡을 회복한 뒤 다음 반복으로 넘어갑니다.";
  return "↔ 힘을 쓰는 구간에서 천천히 내쉬고, 시작 위치로 돌아오며 들이쉽니다. 숨을 참아 몸통을 굳히지 않습니다.";
}

function explainStep(step: string) {
  return step.length > 8
    ? step
    : `${step} 뒤, 몸의 정렬과 통증·어지러움 반응을 확인합니다.`;
}

export function getExerciseTextGuide(
  exercise: Exercise,
  detail: ExerciseDetail
): ExerciseTextGuide {
  const regionMuscles = exercise.regions.map(region => musclesByRegion[region]);
  const primaryMuscles = Array.from(
    new Set(regionMuscles.slice(0, 2).flat())
  ).slice(0, 4);
  const supportingMuscles = Array.from(
    new Set(regionMuscles.slice(2).flat())
  ).slice(0, 4);
  const fallbackSupport =
    exercise.category === "러닝" || exercise.category === "유산소"
      ? ["호흡근", "발·발목 안정근"]
      : ["몸통 안정근", "그립·지지 근육"];
  const execution =
    exercise.cues.slice(0, 2).join(" · ") ||
    `${exercise.name}의 움직임을 작고 제어된 범위로 반복합니다.`;

  return {
    name: exercise.name,
    category: exercise.category,
    focus: exercise.focus,
    regions: exercise.regions,
    equipment: exercise.equipment,
    sequence: [
      explainStep(
        detail.setup[0] ??
          `${exercise.equipment}의 고정·높이·주변 공간을 먼저 확인합니다.`
      ),
      explainStep(execution),
      explainStep(
        detail.finish || "동작을 멈추고 호흡과 관절 반응을 확인합니다."
      ),
    ],
    primaryMuscles: primaryMuscles.length
      ? primaryMuscles
      : ["주동 근육은 운동 부위와 동작 범위에 따라 달라집니다."],
    supportingMuscles: supportingMuscles.length
      ? supportingMuscles
      : fallbackSupport,
    breathing: getBreathing(exercise.category, exercise.focus),
    adjustment: `↓ 어렵거나 정렬이 흐트러지면 ${detail.regressions[0] ?? "가동 범위·반복·저항을 줄인 변형"}으로 낮춥니다.`,
    stop: `■ ${exercise.warning}`,
  };
}
