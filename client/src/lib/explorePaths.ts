import { Activity, Dumbbell, HeartPulse, Sparkles } from "lucide-react";

/** 탐색 첫 진입에서 조건을 직접 조합하지 않고도 고를 수 있는 네 가지 시작점. */
export const explorePaths = [
  {
    id: "home",
    label: "집에서 맨몸",
    description: "장비 없이 바로 시작",
    category: "맨몸운동",
    focus: "전체",
    equipment: "장비 없음",
    icon: Activity,
  },
  {
    id: "gym",
    label: "헬스장 기구",
    description: "기구·케이블 중심",
    category: "헬스기구",
    focus: "전체",
    equipment: "장비 필요",
    icon: Dumbbell,
  },
  {
    id: "cardio",
    label: "달리기·유산소",
    description: "심폐 리듬 만들기",
    category: "러닝",
    focus: "심폐",
    equipment: "전체",
    icon: HeartPulse,
  },
  {
    id: "mobility",
    label: "가볍게 회복",
    description: "가동성·저강도 움직임",
    category: "전체",
    focus: "가동성",
    equipment: "전체",
    icon: Sparkles,
  },
] as const;

export type ExplorePath = (typeof explorePaths)[number];
