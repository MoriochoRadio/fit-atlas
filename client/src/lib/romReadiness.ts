import { getCheckinRecommendation, type DailyCheckin } from "./dailyCheckin";

export type RomReadinessRecommendation = {
  rom: "작음" | "보통" | null;
  title: string;
  description: string;
  actionLabel: string;
};

export function getRomReadinessRecommendation(checkin: DailyCheckin): RomReadinessRecommendation {
  const readiness = getCheckinRecommendation(checkin);
  if (readiness.mode === "stop_and_assess") return {
    rom: null,
    title: "통증 신호가 크면 ROM 추천을 잠시 멈추세요",
    description: "가동 범위를 넓히는 운동을 고르기보다, 통증 없는 일상 움직임과 필요한 평가를 우선하세요.",
    actionLabel: "회복 가이드 보기",
  };
  if (readiness.mode === "recovery") return {
    rom: "작음",
    title: "오늘은 작은 ROM부터 시작하세요",
    description: "피로가 높을 때는 관절 끝 범위를 밀지 말고, 통증 없는 작은 움직임과 편안한 호흡을 먼저 확인하세요.",
    actionLabel: "작은 ROM 운동 보기",
  };
  if (readiness.mode === "lighter") return {
    rom: "작음",
    title: "가벼운 날: 작은 ROM을 우선하세요",
    description: "오늘은 큰 범위보다 안정된 중심축과 일정한 호흡이 유지되는 작은 범위를 선택하세요.",
    actionLabel: "작은 ROM 운동 보기",
  };
  return {
    rom: "보통",
    title: "오늘은 보통 ROM부터 확인하세요",
    description: "워밍업 뒤 몸의 반응이 편안하다면 보통 범위에서 경로와 호흡을 먼저 점검하세요.",
    actionLabel: "보통 ROM 운동 보기",
  };
}
