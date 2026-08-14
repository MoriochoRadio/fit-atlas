import { describe, expect, it } from "vitest";
import { getExerciseDetail } from "./exerciseDetails";
import { exercises } from "./fitnessData";

describe("exercise detail knowledge", () => {
  it("provides a complete safe detail structure for every exercise", () => {
    exercises.forEach((exercise) => {
      const detail = getExerciseDetail(exercise);
      expect(detail.setup).toHaveLength(3);
      expect(detail.commonMistakes).toHaveLength(3);
      expect(detail.regressions).toHaveLength(3);
      expect(detail.progressions).toHaveLength(3);
      expect(detail.finish.length).toBeGreaterThan(20);
    });
  });

  it("keeps exercise-specific details where the movement has higher technical demand", () => {
    expect(getExerciseDetail(exercises.find((exercise) => exercise.id === "squat")!).commonMistakes).toContain("무릎이 발과 다른 방향으로 무너짐");
    expect(getExerciseDetail(exercises.find((exercise) => exercise.id === "run")!).regressions).toContain("걷기·달리기 인터벌");
  });
});
