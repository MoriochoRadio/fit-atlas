/** 화면에 보이는 한국어 목표 이름과 개인화 엔진이 쓰는 키의 대응. */
export const goalCopy = {
  근력증가: "strength",
  체력증가: "endurance",
  다이어트: "weight_management",
} as const;

export type PrimaryGoalLabel = keyof typeof goalCopy;
