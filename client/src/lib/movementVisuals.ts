export type MovementFrame = {
  label: string;
  cue: string;
  pose: "stand" | "squat" | "hinge" | "push" | "plank" | "run" | "balance" | "row" | "lunge" | "jump" | "shuffle";
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
  row: { title: "케이블 로우 흐름", frames: [{ label: "준비", cue: "몸통을 길게·어깨 이완", pose: "stand" }, { label: "당기기", cue: "견갑을 먼저 뒤·아래로", pose: "row" }, { label: "복귀", cue: "반동 없이 천천히", pose: "stand" }] },
  "cable-face-pull": { title: "페이스 풀 흐름", frames: [{ label: "준비", cue: "가벼운 저항·목 이완", pose: "stand" }, { label: "당기기", cue: "팔꿈치를 편안한 대각선", pose: "row" }, { label: "복귀", cue: "어깨를 으쓱하지 않기", pose: "stand" }] },
  "reverse-lunge": { title: "리버스 런지 흐름", frames: [{ label: "준비", cue: "지지대 가까이·짧은 보폭", pose: "stand" }, { label: "내려가기", cue: "앞발 전체로 바닥 누르기", pose: "lunge" }, { label: "돌아오기", cue: "골반을 안정적으로", pose: "stand" }] },
  "snap-down": { title: "스냅 다운 흐름", frames: [{ label: "준비", cue: "발 전체로 바닥 느끼기", pose: "stand" }, { label: "착지", cue: "조용히 반스쿼트로 멈추기", pose: "squat" }, { label: "확인", cue: "무릎·발끝 정렬 점검", pose: "squat" }] },
  "squat-jump-stick": { title: "점프·스틱 흐름", frames: [{ label: "준비", cue: "낮은 범위·호흡 준비", pose: "squat" }, { label: "작은 점프", cue: "높이보다 편안한 리듬", pose: "jump" }, { label: "착지", cue: "조용히 멈춰 정렬 확인", pose: "squat" }] },
  "lateral-bound-stick": { title: "레터럴 바운드 흐름", frames: [{ label: "준비", cue: "짧은 거리·지지대 가까이", pose: "stand" }, { label: "측면 이동", cue: "발을 교차하지 않고", pose: "shuffle" }, { label: "착지", cue: "1–2초 균형 유지", pose: "balance" }] },
  "cable-chest-press": { title: "케이블 프레스 흐름", frames: [{ label: "준비", cue: "갈비뼈·골반을 편안히", pose: "stand" }, { label: "밀기", cue: "몸통 회전 없이 앞으로", pose: "push" }, { label: "복귀", cue: "천천히 장력 유지", pose: "stand" }] },
  "ankle-knee-to-wall": { title: "발목 락 흐름", frames: [{ label: "준비", cue: "발뒤꿈치를 바닥에", pose: "stand" }, { label: "이동", cue: "무릎은 발가락 방향", pose: "lunge" }, { label: "복귀", cue: "통증 없는 거리에서", pose: "stand" }] },
  "kettlebell-deadlift": { title: "케틀벨 데드리프트 흐름", frames: [{ label: "준비", cue: "케틀벨을 발 중앙 가까이", pose: "stand" }, { label: "힌지", cue: "엉덩이를 뒤로 보내기", pose: "hinge" }, { label: "일어서기", cue: "발과 둔근으로 바닥 밀기", pose: "stand" }] },
  "resistance-band-row": { title: "저항 밴드 로우 흐름", frames: [{ label: "준비", cue: "고정점과 장력 확인", pose: "stand" }, { label: "당기기", cue: "목 이완·팔꿈치 뒤로", pose: "row" }, { label: "복귀", cue: "반동 없이 장력 유지", pose: "stand" }] },
  "low-step-march": { title: "로우 스텝 마치 흐름", frames: [{ label: "준비", cue: "스텝 안정성·지지대 확인", pose: "stand" }, { label: "올라가기", cue: "발 전체를 스텝 위에", pose: "lunge" }, { label: "균형", cue: "안정된 뒤 천천히 내려오기", pose: "balance" }] },
};

export function getMovementVisual(exerciseId: string) {
  return movementVisuals[exerciseId];
}
