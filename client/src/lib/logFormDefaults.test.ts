import { describe, expect, it } from "vitest";
import {
  buildLogFormValues,
  describeChangeFromLast,
  emptyLogFormValues,
  findLastEntryFor,
  getRecentLoggedExercises,
} from "./logFormDefaults";
import type { TrainingLog } from "./trainingMetrics";

const log = (overrides: Partial<TrainingLog> & { date: string; exercise: string }): TrainingLog => ({
  id: `${overrides.exercise}-${overrides.date}`,
  sets: 3,
  reps: 8,
  load: 40,
  minutes: 35,
  intensity: 6,
  ...overrides,
});

const logs: TrainingLog[] = [
  log({ date: "2026-08-20", exercise: "바벨 백 스쿼트", sets: 4, reps: 6, load: 60, minutes: 42, intensity: 7 }),
  log({ date: "2026-08-18", exercise: "달리기", minutes: 30, distance: 5, distanceUnit: "km" }),
  log({ date: "2026-08-14", exercise: "바벨 백 스쿼트", sets: 3, reps: 8, load: 50 }),
  log({ date: "2026-08-12", exercise: "풀업" }),
];

describe("logFormDefaults", () => {
  it("finds the most recent entry for an exercise, not just the first in the list", () => {
    expect(findLastEntryFor(logs, "바벨 백 스쿼트")?.date).toBe("2026-08-20");
  });

  it("returns nothing when the exercise has never been logged", () => {
    expect(findLastEntryFor(logs, "케틀벨 스윙")).toBeUndefined();
  });

  it("prefills the form from the last time the same exercise was logged", () => {
    expect(buildLogFormValues(logs, "바벨 백 스쿼트", "2026-08-26")).toEqual({
      date: "2026-08-26",
      exercise: "바벨 백 스쿼트",
      sets: "4",
      reps: "6",
      load: "60",
      minutes: "42",
      distance: "",
      distanceUnit: "km",
      intensity: "7",
    });
  });

  it("carries the distance and its unit back for a distance-based exercise", () => {
    const values = buildLogFormValues(logs, "달리기", "2026-08-26");
    expect([values.distance, values.distanceUnit]).toEqual(["5", "km"]);
  });

  it("falls back to the light starting defaults for a first-time exercise", () => {
    expect(buildLogFormValues([], "케틀벨 스윙", "2026-08-26")).toEqual({
      ...emptyLogFormValues,
      date: "2026-08-26",
      exercise: "케틀벨 스윙",
    });
  });

  it("lists recently logged exercises newest first without repeating one", () => {
    expect(getRecentLoggedExercises(logs)).toEqual(["바벨 백 스쿼트", "달리기", "풀업"]);
  });

  it("respects the requested limit", () => {
    expect(getRecentLoggedExercises(logs, 2)).toEqual(["바벨 백 스쿼트", "달리기"]);
  });

  it("names what changed against the last entry", () => {
    const values = buildLogFormValues(logs, "바벨 백 스쿼트", "2026-08-26");
    expect(describeChangeFromLast(logs, { ...values, load: "65" })).toBe(
      "2026-08-20 대비 중량 60 → 65"
    );
  });

  it("says so when nothing changed", () => {
    const values = buildLogFormValues(logs, "바벨 백 스쿼트", "2026-08-26");
    expect(describeChangeFromLast(logs, values)).toBe("2026-08-20 기록과 같은 구성입니다.");
  });

  it("stays quiet for an exercise with no history to compare against", () => {
    const values = buildLogFormValues(logs, "케틀벨 스윙", "2026-08-26");
    expect(describeChangeFromLast(logs, values)).toBeNull();
  });
});
