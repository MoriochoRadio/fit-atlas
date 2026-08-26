import { describe, expect, it } from "vitest";
import { getPersonalizedProgram } from "./personalization";

describe("local personalized program", () => {
  it("uses a low-impact and lower-effort start when the profile calls for it", () => {
    const program = getPersonalizedProgram({
      age: 65,
      weightKg: 68,
      sex: "female",
      primaryGoal: "endurance",
      experience: "intermediate",
      recoveryContext: "none",
    });
    expect(program.recommendations).toContain("스테디 사이클");
    expect(program.recommendations).not.toContain("이지 러닝");
    expect(program.targetRpe).toBe("RPE 3–5");
  });

  it("uses a clinician-confirmation state for pregnancy or postpartum context", () => {
    const program = getPersonalizedProgram({
      age: 32,
      weightKg: 68,
      sex: "female",
      primaryGoal: "general_health",
      experience: "beginner",
      recoveryContext: "pregnancy_postpartum",
    });
    expect(program.sessionsPerWeek).toBe("의료진 확인 후 설정");
    expect(program.targetRpe).toBe("자가 처방 없음");
  });

  it("records sex as context without unsafe automatic loading changes", () => {
    const female = getPersonalizedProgram({
      age: 30,
      weightKg: 68,
      sex: "female",
      primaryGoal: "strength",
      experience: "beginner",
      recoveryContext: "none",
    });
    const male = getPersonalizedProgram({
      age: 30,
      weightKg: 68,
      sex: "male",
      primaryGoal: "strength",
      experience: "beginner",
      recoveryContext: "none",
    });
    expect(female.targetRpe).toBe(male.targetRpe);
    expect(female.sexConsideration).toContain("성별만으로");
    expect(male.sexConsideration).toContain("성별만으로");
  });

  it("adds balance and mobility options for older adult starting plans", () => {
    const program = getPersonalizedProgram({
      age: 68,
      weightKg: 64,
      sex: "undisclosed",
      primaryGoal: "general_health",
      experience: "beginner",
      recoveryContext: "none",
    });
    expect(program.recommendations).toEqual([
      "스테디 사이클",
      "의자 앉았다 일어나기",
      "한 발 서기",
      "캣·카우 가동성",
    ]);
    expect(program.targetRpe).toBe("RPE 3–5");
  });
});
