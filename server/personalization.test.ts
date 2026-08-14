import { describe, expect, it } from "vitest";
import { getPersonalizedProgram } from "../client/src/lib/personalization";

describe("personalized program rules", () => {
  it("uses experience to set a conservative initial weekly frequency and effort band", () => {
    const program = getPersonalizedProgram({ age: 30, weightKg: 68, sex: "undisclosed", primaryGoal: "strength", experience: "beginner", recoveryContext: "none" });
    expect(program.sessionsPerWeek).toBe("주 2회");
    expect(program.targetRpe).toBe("RPE 4–6");
  });

  it("uses a lower-impact cardio option and lower initial effort for an older adult", () => {
    const program = getPersonalizedProgram({ age: 65, weightKg: 68, sex: "female", primaryGoal: "endurance", experience: "intermediate", recoveryContext: "none" });
    expect(program.recommendations).toContain("스테디 사이클");
    expect(program.recommendations).not.toContain("이지 러닝");
    expect(program.targetRpe).toBe("RPE 3–5");
  });

  it("uses body weight to choose a low-impact start while keeping sex-specific loading neutral", () => {
    const program = getPersonalizedProgram({ age: 32, weightKg: 105, sex: "nonbinary", primaryGoal: "endurance", experience: "beginner", recoveryContext: "none" });
    expect(program.recommendations).toContain("스테디 사이클");
    expect(program.sexConsideration).toContain("성별 이분법");
  });

  it("switches to an explicit clinician-confirmation state for pregnancy or postpartum context", () => {
    const program = getPersonalizedProgram({ age: 32, weightKg: 68, sex: "female", primaryGoal: "general_health", experience: "beginner", recoveryContext: "pregnancy_postpartum" });
    expect(program.sessionsPerWeek).toBe("의료진 확인 후 설정");
    expect(program.targetRpe).toBe("자가 처방 없음");
  });
});
