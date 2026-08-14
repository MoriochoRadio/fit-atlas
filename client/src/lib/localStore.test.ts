import { describe, expect, it } from "vitest";
import { createBackup, parseBackup } from "./localStore";
import { defaultProfilePreferences } from "./profilePreferences";

describe("local backup format", () => {
  it("round-trips profile and workout records without server data", () => {
    const backup = createBackup([{ id: "log-1", date: "2026-08-14", exercise: "푸시업", sets: 3, reps: 10, load: 0, minutes: 20, intensity: 5 }], { ...defaultProfilePreferences, recoveryContext: "reduced_readiness" });
    const restored = parseBackup(JSON.stringify(backup));
    expect(restored.logs).toHaveLength(1);
    expect(restored.profile.recoveryContext).toBe("reduced_readiness");
  });
});
