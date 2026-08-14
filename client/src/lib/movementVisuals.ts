export type MovementFrame = {
  label: string;
  cue: string;
  pose: "stand" | "squat" | "hinge" | "push" | "plank" | "run" | "balance";
};

export type MovementVisual = {
  title: string;
  frames: [MovementFrame, MovementFrame, MovementFrame];
};

export const movementVisuals: Record<string, MovementVisual> = {
  squat: { title: "스쿼트 흐름", frames: [{ label: "시작", cue: "발 전체를 바닥에", pose: "stand" }, { label: "내려가기", cue: "엉덩이와 무릎을 함께", pose: "squat" }, { label: "일어서기", cue: "발 전체로 지면 밀기", pose: "stand" }] },
  pushup: { title: "푸시업 흐름", frames: [{ label: "시작", cue: "긴 몸통 선 만들기", pose: "plank" }, { label: "내려가기", cue: "팔꿈치를 대각선으로", pose: "push" }, { label: "밀기", cue: "바닥을 멀리 밀기", pose: "plank" }] },
  rdl: { title: "힙 힌지 흐름", frames: [{ label: "시작", cue: "덤벨을 몸 가까이", pose: "stand" }, { label: "접기", cue: "엉덩이를 뒤로", pose: "hinge" }, { label: "일어서기", cue: "둔근으로 일어서기", pose: "stand" }] },
  run: { title: "이지 러닝 흐름", frames: [{ label: "자세", cue: "시선 전방·어깨 이완", pose: "stand" }, { label: "접지", cue: "짧고 조용한 보폭", pose: "run" }, { label: "리듬", cue: "호흡이 무너지면 감속", pose: "run" }] },
  "single-leg-stand": { title: "한 발 서기 흐름", frames: [{ label: "준비", cue: "벽·의자 가까이", pose: "stand" }, { label: "균형", cue: "시선은 정면", pose: "balance" }, { label: "전환", cue: "안정된 뒤 반대쪽", pose: "stand" }] },
};

export function getMovementVisual(exerciseId: string) {
  return movementVisuals[exerciseId];
}
