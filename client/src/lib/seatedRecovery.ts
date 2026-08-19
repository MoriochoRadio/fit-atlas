import type { CheckinRecommendation } from "./dailyCheckin";

export type SeatedRecoveryDuration = 5 | 10;
export type RecoveryContext = "none" | "reduced_readiness" | "pregnancy_postpartum";

export type SeatedRecoveryRoutine = {
  duration: SeatedRecoveryDuration;
  title: string;
  summary: string;
  blocks: Array<{ label: string; minutes: string; items: string[] }>;
  exploreExerciseIds: string[];
};

export type SeatedRecoveryAdjustment = {
  label: string;
  guidance: string;
};

export const seatedRecoveryRoutines: Record<SeatedRecoveryDuration, SeatedRecoveryRoutine> = {
  5: {
    duration: 5,
    title: "5분 자리 리셋",
    summary: "같은 자세를 오래 유지한 뒤, 책상·의자 환경을 확인하고 작은 움직임과 짧은 보행으로 리듬을 다시 찾는 일반 교육용 흐름입니다.",
    blocks: [
      { label: "환경 확인", minutes: "1분", items: ["발바닥이 바닥에 닿고 의자가 흔들리지 않는지 확인", "마우스·키보드·자주 쓰는 물건을 무리하게 뻗지 않는 거리로 옮기기"] },
      { label: "손·어깨 풀기", minutes: "1분", items: ["손가락을 천천히 펴고 쥔 뒤, 팔꿈치를 몸통 가까이에 두기", "어깨를 으쓱하지 않고 편안한 범위에서 뒤·아래로 정리"] },
      { label: "앉은 몸통 리셋", minutes: "1분", items: ["숨을 내쉬며 골반과 갈비뼈 긴장을 가볍게 풀기", "통증 없는 작은 범위에서 체중을 좌우로 천천히 옮기기"] },
      { label: "일어서기·보행", minutes: "1분", items: ["의자에서 천천히 일어나 20–40걸음 편안히 걷기", "급하게 허리를 펴거나 목을 끝 범위까지 젖히지 않기"] },
      { label: "반응 확인", minutes: "1분", items: ["불편이 줄거나 같은지 확인하고, 커지면 원래 작업 자세로 급히 돌아가지 않기", "다음 작업 구간에는 자세·시선·손목 위치를 한 가지만 조절"] },
    ],
    exploreExerciseIds: ["seated-wrist-mobility", "seated-march-to-stand", "sit-to-stand"],
  },
  10: {
    duration: 10,
    title: "10분 자리 회복·재시작",
    summary: "5분 리셋에 편안한 하체·흉곽 움직임과 짧은 가벼운 근력 패턴을 더한 흐름입니다. 강한 스트레칭이나 땀을 내는 운동이 목적은 아닙니다.",
    blocks: [
      { label: "환경·호흡", minutes: "2분", items: ["의자 높이·발 지지·화면과 물건의 거리를 먼저 확인", "숨을 참지 말고 길게 내쉬며 어깨·턱의 힘을 풀기"] },
      { label: "손·상체 가동", minutes: "2분", items: ["손가락·손목을 편안한 범위에서 펴고 접기", "팔꿈치를 몸통 가까이에 두고 가볍게 뒤로 당기는 느낌 찾기"] },
      { label: "하체·체중 이동", minutes: "2분", items: ["앉은 자세에서 발 전체로 바닥을 누르며 무릎·발목 반응 확인", "필요하면 의자나 책상을 지지해 작은 범위로 일어섰다 앉기"] },
      { label: "짧은 보행", minutes: "2분", items: ["실내의 평평하고 방해물 없는 곳에서 짧고 조용한 보폭으로 걷기", "호흡이 불편하거나 어지러우면 즉시 멈춰 앉거나 도움 요청"] },
      { label: "작업 재개 기준", minutes: "2분", items: ["다시 앉기 전 팔·손목·화면 거리를 한 번 더 조정", "저림·힘 빠짐·통증 악화가 남으면 루틴 반복 대신 자가 진행을 멈추기"] },
    ],
    exploreExerciseIds: ["seated-march-to-stand", "bodyweight-squat", "counter-incline-pushup"],
  },
};

export const seatedRecoveryStopSignals = [
  "새로 생긴 날카로운 통증, 저림 또는 감각 변화",
  "갑작스러운 힘 빠짐, 보행 불안, 어지러움 또는 비정상적 숨참",
  "외상 뒤 변형·붓기·열감, 또는 움직일수록 빠르게 악화되는 통증",
];

export function getSeatedRecoveryAdjustment(recommendation: CheckinRecommendation, recoveryContext: RecoveryContext): SeatedRecoveryAdjustment {
  if (recommendation.mode === "stop_and_assess") {
    return { label: "자가 진행 보류", guidance: "오늘은 루틴을 운동으로 밀어붙이지 마세요. 위험 신호가 있거나 통증이 커지면 필요한 평가를 우선합니다." };
  }
  if (recoveryContext === "pregnancy_postpartum") {
    return { label: "선택한 생애 단계 반영", guidance: "편안한 호흡·짧은 보행·가벼운 자세 변화를 우선하고, 복부 압박이나 불편한 범위는 피하세요." };
  }
  if (recoveryContext === "reduced_readiness" || recommendation.mode === "recovery") {
    return { label: "회복 우선 조정", guidance: "5분 흐름부터 선택하고, 일어서기·보행·가동 범위를 더 작게 유지하세요. 다음 날 반응도 함께 확인합니다." };
  }
  if (recommendation.mode === "lighter") {
    return { label: "가벼운 조정", guidance: "편안한 범위와 대화 가능한 호흡을 유지하며, 5분 또는 10분 중 부담이 낮은 흐름을 선택하세요." };
  }
  return { label: "일상 리듬 재시작", guidance: "작업을 재개하기 전 짧은 걷기와 환경 조정을 넣고, 추가 운동은 평소 계획을 별도로 확인한 뒤 진행하세요." };
}
