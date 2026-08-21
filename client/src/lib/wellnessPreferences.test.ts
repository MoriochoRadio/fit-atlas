import { describe, expect, it } from "vitest";
import { defaultWellnessPreferences, readWellnessPreferences } from "./wellnessPreferences";

describe("wellness preferences", () => {
  it("restores only supported saved recovery durations", () => {
    expect(readWellnessPreferences('{"savedRecoveryDuration":10}')).toEqual({ savedRecoveryDuration: 10 });
    expect(readWellnessPreferences('{"savedRecoveryDuration":5}')).toEqual({ savedRecoveryDuration: 5 });
  });

  it("safely falls back for malformed or unsupported local data", () => {
    expect(readWellnessPreferences('{"savedRecoveryDuration":30}')).toEqual(defaultWellnessPreferences);
    expect(readWellnessPreferences("not-json")).toEqual(defaultWellnessPreferences);
  });
});
