import { describe, expect, it } from "vitest";
import {
  defaultProfilePreferences,
  readProfilePreferences,
} from "./profilePreferences";

describe("profile preferences", () => {
  it("adds safe local preference defaults when reading an older saved profile", () => {
    const restored = readProfilePreferences(
      JSON.stringify({ age: "34", primaryGoal: "endurance" })
    );
    expect(restored).toMatchObject({
      age: "34",
      primaryGoal: "endurance",
      preferredCategory: "전체",
      preferredEquipment: "flexible",
      preferredEnvironment: "home",
    });
  });

  it("keeps valid preference choices and resets unsupported imported values to safe defaults", () => {
    const valid = readProfilePreferences(
      JSON.stringify({
        preferredCategory: "맨몸운동",
        preferredEquipment: "basic_home",
        preferredEnvironment: "outdoor",
      })
    );
    expect(valid).toMatchObject({
      preferredCategory: "맨몸운동",
      preferredEquipment: "basic_home",
      preferredEnvironment: "outdoor",
    });

    const invalid = readProfilePreferences(
      JSON.stringify({
        preferredCategory: "unknown",
        preferredEquipment: "studio",
        preferredEnvironment: "beach",
      })
    );
    expect(invalid).toMatchObject({
      preferredCategory: defaultProfilePreferences.preferredCategory,
      preferredEquipment: defaultProfilePreferences.preferredEquipment,
      preferredEnvironment: defaultProfilePreferences.preferredEnvironment,
    });
  });
});
