import { describe, expect, it } from "vitest";
import { defaultWellnessPreferences, readWellnessPreferences } from "./wellnessPreferences";

describe("wellness preferences", () => {
  it("restores only supported saved recovery durations", () => {
    expect(readWellnessPreferences('{"savedRecoveryDuration":10}')).toEqual({ savedRecoveryDuration: 10, lastRecoveryRecord: null });
    expect(readWellnessPreferences('{"savedRecoveryDuration":5}')).toEqual({ savedRecoveryDuration: 5, lastRecoveryRecord: null });
  });

  it("restores one supported recovery completion and reflection", () => {
    expect(readWellnessPreferences('{"savedRecoveryDuration":10,"lastRecoveryRecord":{"duration":10,"completedOn":"2026-08-21","reflection":"lighter"}}')).toEqual({ savedRecoveryDuration: 10, lastRecoveryRecord: { duration: 10, completedOn: "2026-08-21", reflection: "lighter" } });
  });

  it("safely falls back for malformed or unsupported local data", () => {
    expect(readWellnessPreferences('{"savedRecoveryDuration":30}')).toEqual(defaultWellnessPreferences);
    expect(readWellnessPreferences('{"lastRecoveryRecord":{"duration":5,"completedOn":"","reflection":"lighter"}}')).toEqual(defaultWellnessPreferences);
    expect(readWellnessPreferences('{"lastRecoveryRecord":{"duration":5,"completedOn":"2026-08-21","reflection":"unknown"}}')).toEqual(defaultWellnessPreferences);
    expect(readWellnessPreferences("not-json")).toEqual(defaultWellnessPreferences);
  });
});
