import type { HeroEquipment } from "./localStore";
import type { SessionGoal } from "./sessionBuilder";

/** 히어로에서 고른 장비가 어떤 세션 목표로 이어지는지. */
export const equipmentSessionSetup: Record<
  HeroEquipment,
  { goal: SessionGoal; label: string; goalLabel: string }
> = {
  cable: { goal: "strength", label: "케이블 머신", goalLabel: "기초 근력" },
  dumbbell: { goal: "all_round", label: "덤벨", goalLabel: "전신 균형" },
  treadmill: { goal: "endurance", label: "트레드밀", goalLabel: "심폐 리듬" },
};
