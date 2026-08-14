import { describe, expect, it } from "vitest";
import { defaultProfilePreferences, mergeAccountProfile, readProfilePreferences } from "../client/src/lib/profilePreferences";

describe("profile preference persistence", () => {
  it("restores a guest browser safety mode from serialized preferences", () => {
    const preferences = readProfilePreferences(JSON.stringify({ recoveryContext: "reduced_readiness", weightKg: "68" }));
    expect(preferences.recoveryContext).toBe("reduced_readiness");
    expect(preferences.weightKg).toBe("68");
  });

  it("uses the authenticated account value instead of resetting recovery context during sync", () => {
    const merged = mergeAccountProfile({ ...defaultProfilePreferences, recoveryContext: "none" }, {
      age: 30,
      weightKg: "68.00",
      sex: "undisclosed",
      primaryGoal: "strength",
      experience: "beginner",
      recoveryContext: "pregnancy_postpartum",
    });
    expect(merged.recoveryContext).toBe("pregnancy_postpartum");
    expect(merged.weightKg).toBe("68.00");
  });
});
