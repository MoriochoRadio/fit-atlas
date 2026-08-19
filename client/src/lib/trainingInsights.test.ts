import { describe, expect, it } from "vitest";
import { exercises } from "./fitnessData";
import { getAerobicIntensityInsight, getConsecutiveDayStreak, getConsistency, getExerciseTrend, getInsightSummary, getPersonalRecordTrend, getRegionBalance, getTrainingLoad } from "./trainingInsights";
import type { TrainingLog } from "./trainingMetrics";

const logs: TrainingLog[] = [
  { id: "1", date: "2026-08-14", exercise: "바벨 백 스쿼트", sets: 3, reps: 8, load: 50, minutes: 35, intensity: 6 },
  { id: "2", date: "2026-08-12", exercise: "푸시업", sets: 3, reps: 10, load: 0, minutes: 20, intensity: 5 },
  { id: "3", date: "2026-08-01", exercise: "이지 러닝", sets: 1, reps: 1, load: 0, minutes: 25, intensity: 5 },
];

describe("training insights", () => {
  const reference = new Date("2026-08-14T12:00:00.000Z");
  const catalog = exercises;

  it("aggregates recent session load and distinct active days", () => {
    expect(getTrainingLoad(logs, reference)).toEqual({ load: 310, sessions: 2, minutes: 55 });
    expect(getConsistency(logs, reference)).toEqual({ activeDays: 3, possibleDays: 28, weeklyAverage: 0.8 });
  });

  it("maps exercise names to body-region balance and readable summaries", () => {
    expect(getRegionBalance(logs, catalog).some((item) => item.region === "하체" && item.score > 0)).toBe(true);
    const insight = getInsightSummary(logs, reference, catalog);
    expect(insight.loadLabel).toBe("최근 7일 2회 · 55분");
    expect(insight.balanceLabel).toContain("중심 기록");
  });

  it("reads aerobic RPE conservatively and compares a recent exercise trend", () => {
    const aerobic = getAerobicIntensityInsight(logs, reference, catalog);
    expect(aerobic.band).toBe("기록 대기");
    const expanded = [...logs, { id: "4", date: "2026-08-13", exercise: "이지 러닝", sets: 1, reps: 1, load: 0, minutes: 30, distanceKm: 5, intensity: 6 }, { id: "5", date: "2026-08-05", exercise: "바벨 백 스쿼트", sets: 2, reps: 8, load: 40, minutes: 20, intensity: 5 }];
    expect(getAerobicIntensityInsight(expanded, reference, catalog)).toMatchObject({ sessions: 1, minutes: 30, distanceKm: 5, paceMinutesPerKm: 6, averageRpe: 6, band: "중강도 근처" });
    const swim = [{ id: "swim", date: "2026-08-13", exercise: "이지 수영", sets: 1, reps: 1, load: 0, minutes: 12, intensity: 4, distance: 400, distanceUnit: "m" as const }];
    expect(getAerobicIntensityInsight(swim, reference, catalog).paceLabel).toBe("평균 3분/100m");
    const rowing = [{ id: "row", date: "2026-08-13", exercise: "로잉 에르고미터", sets: 1, reps: 1, load: 0, minutes: 4, intensity: 4, distance: 1000, distanceUnit: "m" as const }];
    expect(getAerobicIntensityInsight(rowing, reference, catalog).paceLabel).toBe("평균 2분/500m");
    expect(getExerciseTrend(expanded, reference)).toMatchObject({ exercise: "바벨 백 스쿼트", direction: "상승" });
    expect(getConsecutiveDayStreak(expanded, reference)).toMatchObject({ days: 3 });
    expect(getPersonalRecordTrend(expanded, reference)).toMatchObject({ exercise: "바벨 백 스쿼트", direction: "새 PR" });
  });
});
