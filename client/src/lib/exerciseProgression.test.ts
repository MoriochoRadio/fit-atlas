import { describe, expect, it } from "vitest";
import {
  getExerciseProgression,
  getTrackedProgressions,
} from "./exerciseProgression";
import type { TrainingLog } from "./trainingMetrics";

const log = (
  overrides: Partial<TrainingLog> & { date: string; exercise: string }
): TrainingLog => ({
  id: `${overrides.exercise}-${overrides.date}`,
  sets: 3,
  reps: 8,
  load: 40,
  minutes: 30,
  intensity: 6,
  ...overrides,
});

describe("getExerciseProgression", () => {
  it("returns nothing when the exercise has only been logged once", () => {
    expect(
      getExerciseProgression([log({ date: "2026-08-20", exercise: "스쿼트" })], "스쿼트")
    ).toBeNull();
  });

  it("compares the first and latest session in date order, not list order", () => {
    const progression = getExerciseProgression(
      [
        log({ date: "2026-08-20", exercise: "스쿼트", load: 60 }),
        log({ date: "2026-08-06", exercise: "스쿼트", load: 40 }),
        log({ date: "2026-08-13", exercise: "스쿼트", load: 50 }),
      ],
      "스쿼트"
    );
    expect(progression?.first.date).toBe("2026-08-06");
    expect(progression?.latest.date).toBe("2026-08-20");
    expect(progression?.change).toBe(20);
    expect(progression?.direction).toBe("올라감");
    expect(progression?.summary).toBe("2026-08-06 40kg → 2026-08-20 60kg");
  });

  it("measures a bodyweight exercise by total repetitions instead of load", () => {
    const progression = getExerciseProgression(
      [
        log({ date: "2026-08-06", exercise: "풀업", load: 0, sets: 3, reps: 4 }),
        log({ date: "2026-08-20", exercise: "풀업", load: 0, sets: 4, reps: 5 }),
      ],
      "풀업"
    );
    expect(progression?.measure).toBe("reps");
    expect(progression?.measureLabel).toBe("총 반복");
    expect(progression?.change).toBe(8);
    expect(progression?.summary).toBe("2026-08-06 12회 → 2026-08-20 20회");
  });

  it("reports a drop as 내려감 rather than hiding it", () => {
    const progression = getExerciseProgression(
      [
        log({ date: "2026-08-06", exercise: "스쿼트", load: 60 }),
        log({ date: "2026-08-20", exercise: "스쿼트", load: 45 }),
      ],
      "스쿼트"
    );
    expect(progression?.direction).toBe("내려감");
    expect(progression?.change).toBe(-15);
  });

  it("calls an unchanged measure 유지", () => {
    const progression = getExerciseProgression(
      [
        log({ date: "2026-08-06", exercise: "스쿼트", load: 50 }),
        log({ date: "2026-08-20", exercise: "스쿼트", load: 50 }),
      ],
      "스쿼트"
    );
    expect(progression?.direction).toBe("유지");
    expect(progression?.summary).toContain("유지했습니다");
  });

  it("computes volume per session from sets, reps and load", () => {
    const progression = getExerciseProgression(
      [
        log({ date: "2026-08-06", exercise: "스쿼트", sets: 3, reps: 8, load: 40 }),
        log({ date: "2026-08-20", exercise: "스쿼트", sets: 4, reps: 6, load: 60 }),
      ],
      "스쿼트"
    );
    expect(progression?.points.map(point => point.volume)).toEqual([960, 1440]);
  });
});

describe("getTrackedProgressions", () => {
  const logs = [
    log({ date: "2026-08-06", exercise: "스쿼트", load: 40 }),
    log({ date: "2026-08-13", exercise: "스쿼트", load: 50 }),
    log({ date: "2026-08-20", exercise: "스쿼트", load: 60 }),
    log({ date: "2026-08-07", exercise: "벤치프레스", load: 30 }),
    log({ date: "2026-08-21", exercise: "벤치프레스", load: 35 }),
    log({ date: "2026-08-22", exercise: "한 번만 한 운동" }),
  ];

  it("ranks exercises by how many sessions have been recorded", () => {
    expect(getTrackedProgressions(logs).map(item => item.exercise)).toEqual([
      "스쿼트",
      "벤치프레스",
    ]);
  });

  it("leaves out an exercise with nothing to compare against", () => {
    expect(
      getTrackedProgressions(logs).some(item => item.exercise === "한 번만 한 운동")
    ).toBe(false);
  });

  it("honours the requested limit", () => {
    expect(getTrackedProgressions(logs, 1)).toHaveLength(1);
  });

  it("returns an empty list when nothing has been logged", () => {
    expect(getTrackedProgressions([])).toEqual([]);
  });
});
