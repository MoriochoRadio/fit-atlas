import { describe, expect, it } from "vitest";
import { getConsistency, getInsightSummary, getRegionBalance, getTrainingLoad } from "./trainingInsights";
import type { TrainingLog } from "./trainingMetrics";

const logs: TrainingLog[] = [
  { id: "1", date: "2026-08-14", exercise: "바벨 백 스쿼트", sets: 3, reps: 8, load: 50, minutes: 35, intensity: 6 },
  { id: "2", date: "2026-08-12", exercise: "푸시업", sets: 3, reps: 10, load: 0, minutes: 20, intensity: 5 },
  { id: "3", date: "2026-08-01", exercise: "이지 러닝", sets: 1, reps: 1, load: 0, minutes: 25, intensity: 5 },
];

describe("training insights", () => {
  const reference = new Date("2026-08-14T12:00:00.000Z");

  it("aggregates recent session load and distinct active days", () => {
    expect(getTrainingLoad(logs, reference)).toEqual({ load: 310, sessions: 2, minutes: 55 });
    expect(getConsistency(logs, reference)).toEqual({ activeDays: 3, possibleDays: 28, weeklyAverage: 0.8 });
  });

  it("maps exercise names to body-region balance and readable summaries", () => {
    expect(getRegionBalance(logs).some((item) => item.region === "하체" && item.score > 0)).toBe(true);
    const insight = getInsightSummary(logs, reference);
    expect(insight.loadLabel).toBe("최근 7일 2회 · 55분");
    expect(insight.balanceLabel).toContain("중심 기록");
  });
});
