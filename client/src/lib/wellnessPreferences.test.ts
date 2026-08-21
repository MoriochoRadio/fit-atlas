import { describe, expect, it } from "vitest";
import { defaultWellnessPreferences, readWellnessPreferences, recoveryNoteMaxLength } from "./wellnessPreferences";

describe("wellness preferences", () => {
  it("restores only supported saved recovery durations", () => {
    expect(readWellnessPreferences('{"savedRecoveryDuration":10}')).toEqual({ savedRecoveryDuration: 10, lastRecoveryRecord: null, recoveryHistory: [] });
    expect(readWellnessPreferences('{"savedRecoveryDuration":5}')).toEqual({ savedRecoveryDuration: 5, lastRecoveryRecord: null, recoveryHistory: [] });
  });

  it("restores a legacy completion and uses it as the first history item", () => {
    expect(readWellnessPreferences('{"savedRecoveryDuration":10,"lastRecoveryRecord":{"duration":10,"completedOn":"2026-08-21","reflection":"lighter"}}')).toEqual({ savedRecoveryDuration: 10, lastRecoveryRecord: { duration: 10, completedOn: "2026-08-21", completedAt: null, reflection: "lighter", note: "" }, recoveryHistory: [{ duration: 10, completedOn: "2026-08-21", completedAt: null, reflection: "lighter", note: "" }] });
  });

  it("restores recent valid history in reverse chronological order", () => {
    const preferences = readWellnessPreferences('{"recoveryHistory":[{"duration":5,"completedOn":"2026-08-20","completedAt":"2026-08-20T09:00:00.000Z","reflection":"same"},{"duration":10,"completedOn":"2026-08-21","completedAt":"2026-08-21T09:00:00.000Z","reflection":"lighter"},{"duration":20,"completedOn":"2026-08-21","completedAt":"2026-08-21T10:00:00.000Z","reflection":"pause"}]}');
    expect(preferences.recoveryHistory).toEqual([{ duration: 10, completedOn: "2026-08-21", completedAt: "2026-08-21T09:00:00.000Z", reflection: "lighter", note: "" }, { duration: 5, completedOn: "2026-08-20", completedAt: "2026-08-20T09:00:00.000Z", reflection: "same", note: "" }]);
  });

  it("keeps a short note and trims oversized local notes", () => {
    const oversizedNote = "회".repeat(recoveryNoteMaxLength + 10);
    expect(readWellnessPreferences(`{"lastRecoveryRecord":{"duration":5,"completedOn":"2026-08-21","reflection":null,"note":"${oversizedNote}"}}`).lastRecoveryRecord?.note).toHaveLength(recoveryNoteMaxLength);
  });

  it("safely falls back for malformed or unsupported local data", () => {
    expect(readWellnessPreferences('{"savedRecoveryDuration":30}')).toEqual(defaultWellnessPreferences);
    expect(readWellnessPreferences('{"lastRecoveryRecord":{"duration":5,"completedOn":"","reflection":"lighter"}}')).toEqual(defaultWellnessPreferences);
    expect(readWellnessPreferences('{"lastRecoveryRecord":{"duration":5,"completedOn":"2026-08-21","reflection":"unknown"}}')).toEqual(defaultWellnessPreferences);
    expect(readWellnessPreferences("not-json")).toEqual(defaultWellnessPreferences);
  });
});
