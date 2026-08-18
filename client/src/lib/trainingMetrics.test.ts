import { describe, expect, it } from "vitest";
import { getCalendarDays, getDistanceKm, getFourWeekTrends, getPersonalRecords, getTotalMinutes, getTotalVolume, getWeeklyVolume, type TrainingLog } from "./trainingMetrics";

const logs: TrainingLog[] = [
  { id: "1", date: "2026-08-10", exercise: "바벨 백 스쿼트", sets: 3, reps: 8, load: 40, minutes: 35, intensity: 6 },
  { id: "2", date: "2026-08-11", exercise: "바벨 백 스쿼트", sets: 3, reps: 5, load: 50, minutes: 30, intensity: 7 },
  { id: "3", date: "2026-08-11", exercise: "푸시업", sets: 3, reps: 10, load: 0, minutes: 20, intensity: 5 },
];

describe("training metrics", () => {
  it("calculates volume, time, and personal records locally", () => {
    expect(getTotalVolume(logs)).toBe(1710);
    expect(getTotalMinutes(logs)).toBe(85);
    expect(getPersonalRecords(logs)).toEqual({ "바벨 백 스쿼트": 50, "푸시업": 0 });
  });

  it("maps activity to the correct local week days", () => {
    const referenceDate = new Date("2026-08-13T12:00:00.000Z");
    const weekly = getWeeklyVolume(logs, referenceDate);
    const calendar = getCalendarDays(logs, referenceDate);
    expect(weekly[3]?.volume).toBe(960);
    expect(weekly[4]?.volume).toBe(750);
    expect(calendar[4]?.count).toBe(2);
  });

  it("normalizes kilometer and meter entries while comparing four weekly trends", () => {
    const reference = new Date("2026-08-14T12:00:00.000Z");
    const distanceLogs = [...logs, { id: "4", date: "2026-08-14", exercise: "이지 러닝", sets: 1, reps: 1, load: 0, minutes: 24, intensity: 5, distance: 4, distanceUnit: "km" as const }, { id: "5", date: "2026-08-08", exercise: "로잉머신", sets: 1, reps: 1, load: 0, minutes: 12, intensity: 4, distance: 2000, distanceUnit: "m" as const }];
    expect(getDistanceKm(distanceLogs[3])).toBe(4);
    expect(getDistanceKm(distanceLogs[4])).toBe(2);
    expect(getFourWeekTrends(distanceLogs, reference).at(-1)).toMatchObject({ minutes: 121, distanceKm: 6, load: 688 });
  });
});
