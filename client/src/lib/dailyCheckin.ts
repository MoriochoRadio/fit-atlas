export type DailyCheckin = {
  date: string;
  energy: number;
  sleep: number;
  stress: number;
  pain: number;
};

export const defaultDailyCheckin: DailyCheckin = {
  date: new Date().toISOString().slice(0, 10),
  energy: 3,
  sleep: 3,
  stress: 3,
  pain: 1,
};

export type CheckinRecommendation = {
  mode: "ready" | "lighter" | "recovery" | "stop_and_assess";
  title: string;
  guidance: string;
  rpeAdjustment: string;
};

export function readDailyCheckin(serialized: string | null): DailyCheckin {
  try {
    const value = JSON.parse(
      serialized ?? "null"
    ) as Partial<DailyCheckin> | null;
    if (!value || typeof value.date !== "string") return defaultDailyCheckin;
    const safe = (number: unknown, fallback: number) =>
      typeof number === "number" &&
      Number.isFinite(number) &&
      Math.round(number * 2) === number * 2 &&
      number >= 1 &&
      number <= 5
        ? number
        : fallback;
    return {
      date: value.date,
      energy: safe(value.energy, 3),
      sleep: safe(value.sleep, 3),
      stress: safe(value.stress, 3),
      pain: safe(value.pain, 1),
    };
  } catch {
    return defaultDailyCheckin;
  }
}

export function getCheckinRecommendation(
  checkin: DailyCheckin
): CheckinRecommendation {
  if (checkin.pain >= 4)
    return {
      mode: "stop_and_assess",
      title: "통증 신호를 먼저 확인하세요",
      guidance:
        "강도를 높이거나 통증을 통과하려 하지 마세요. 날카로운 통증, 저림, 힘 빠짐, 외상 후 변화가 있으면 운동을 멈추고 평가를 우선하세요.",
      rpeAdjustment: "고강도 세션 보류 · 통증 없는 일상 움직임만 고려",
    };
  const readiness =
    checkin.energy + checkin.sleep + (6 - checkin.stress) + (6 - checkin.pain);
  if (readiness <= 10)
    return {
      mode: "recovery",
      title: "회복 우선의 날",
      guidance:
        "오늘은 걷기, 편안한 가동성, 가벼운 호흡처럼 부담이 낮은 움직임을 우선하고 다음 날 반응을 기록하세요.",
      rpeAdjustment: "RPE 2–4 · 시간과 범위 모두 줄이기",
    };
  if (readiness <= 14)
    return {
      mode: "lighter",
      title: "가벼운 조정이 적절한 날",
      guidance:
        "계획한 운동을 하더라도 세트·반복·중량 중 하나만 낮추고, 기술과 편안한 호흡을 우선하세요.",
      rpeAdjustment: "평소보다 1–2 RPE 낮추기",
    };
  return {
    mode: "ready",
    title: "계획한 기초 세션을 진행할 수 있어요",
    guidance:
      "워밍업에서 몸의 반응을 한 번 더 확인한 뒤, 계획한 범위 안에서 운동하세요. 오늘도 한 번에 여러 변수를 올리지는 마세요.",
    rpeAdjustment: "계획 RPE 유지 · 통증·현기증 시 즉시 조절",
  };
}
