import type { Exercise } from "./catalogTypes";

export type ExerciseEvidenceScope = {
  sourceLabel: string;
  guidanceLabel: string;
  limit: string;
};

const isSourceCatalogExercise = (exercise: Exercise) =>
  exercise.id.startsWith("verified-");

export function getExerciseEvidenceScope(
  exercise: Exercise
): ExerciseEvidenceScope {
  if (isSourceCatalogExercise(exercise)) {
    return {
      sourceLabel:
        "종목 원천: 공개 운동 데이터베이스의 운동명·장비·주동근 분류를 대조했습니다.",
      guidanceLabel:
        exercise.category === "유산소" || exercise.category === "러닝"
          ? "적용 지침: 일반적인 신체 활동·심폐 활동 안전 원칙을 적용합니다."
          : "적용 지침: 일반적인 저항 운동·점진적 부하·안전 원칙을 적용합니다.",
      limit:
        "이 출처와 안내는 개인의 질환·통증·부상 상태에서의 효과나 적합성을 검증하거나 보장하지 않습니다.",
    };
  }

  if (/who\.int|cdc\.gov/i.test(exercise.reference.url)) {
    return {
      sourceLabel:
        "근거 성격: 공공 보건 기관의 일반 신체 활동 권고를 연결했습니다.",
      guidanceLabel:
        "적용 지침: 빈도·활동량·안전 신호를 일반 성인 기준으로 해석합니다.",
      limit: "개별 운동 동작의 치료 효과나 개인별 운동 처방을 뜻하지 않습니다.",
    };
  }

  if (/acsm\.org/i.test(exercise.reference.url)) {
    return {
      sourceLabel:
        "근거 성격: ACSM의 일반 운동 안전·신체 활동 지침을 연결했습니다.",
      guidanceLabel:
        exercise.focus === "심폐"
          ? "적용 지침: 일반 심폐 활동의 점진성·회복·안전 신호 원칙을 적용합니다."
          : "적용 지침: 일반 저항 운동·점진적 부하·안전 원칙을 적용합니다.",
      limit:
        "이 일반 지침은 개인의 질환·통증·부상 상태에서의 효과나 적합성을 보장하지 않습니다.",
    };
  }

  if (/nsca\.com/i.test(exercise.reference.url)) {
    return {
      sourceLabel:
        "근거 성격: 전문 훈련 기관의 기술·훈련 원칙 자료를 연결했습니다.",
      guidanceLabel:
        "적용 지침: 기술 난도·점진성·안전한 공간과 장비 확인을 우선합니다.",
      limit:
        "개별 부상 위험이나 수행 능력을 예측하지 않으며, 통증·불안정이 있으면 중단합니다.",
    };
  }

  return {
    sourceLabel: "근거 성격: 이 운동의 교육·안전 참고 원문을 연결했습니다.",
    guidanceLabel:
      "적용 지침: 현재 컨디션과 장비 설정에 맞춰 가장 쉬운 범위부터 확인합니다.",
    limit:
      "참고 링크는 의료 진단·치료 또는 개인별 효과 보장을 대체하지 않습니다.",
  };
}
