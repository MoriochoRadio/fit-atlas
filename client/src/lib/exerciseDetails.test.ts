import { describe, expect, it } from "vitest";
import { exerciseDetails, getExerciseDetail } from "./exerciseDetails";
import { expandedExercisesPart5 } from "./expandedExercisesPart5";
import { expandedExercisesPart6 } from "./expandedExercisesPart6";
import { expandedExercisesPart7 } from "./expandedExercisesPart7";
import { expandedExercisesPart8 } from "./expandedExercisesPart8";
import { expandedExercisesPart9 } from "./expandedExercisesPart9";
import { expandedExercisesPart10 } from "./expandedExercisesPart10";
import { expandedExercisesPart11 } from "./expandedExercisesPart11";
import { exercises } from "./fitnessData";
import { isIndependentCatalogExercise } from "./catalogQualityRules";

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
    expect(getExerciseDetail(exercises.find((exercise) => exercise.id === "kettlebell-deadlift")!).commonMistakes).toContain("허리를 둥글게 말아 당김");
    expect(getExerciseDetail(exercises.find((exercise) => exercise.id === "resistance-band-row")!).setup).toContain("문·기둥 등 고정점과 밴드 손상 여부를 확인");
    expect(getExerciseDetail(exercises.find((exercise) => exercise.id === "battle-rope-alternating-wave")!).regressions).toContain("시티드 웨이브");
  });

  it("gives every newly added equipment and low-impact movement an individual detail definition", () => {
    // expandedExercisesPart*는 카탈로그로 옮겨가기 전의 옛 목록이라, 중복 정리로 사라진 항목이 남아 있다.
    // 지금 카탈로그에 실제로 있는 것만 검사한다.
    const catalogIds = new Set(exercises.map((exercise) => exercise.id));
    [...expandedExercisesPart5, ...expandedExercisesPart6, ...expandedExercisesPart7, ...expandedExercisesPart8, ...expandedExercisesPart9, ...expandedExercisesPart10, ...expandedExercisesPart11].filter(isIndependentCatalogExercise).filter((exercise) => catalogIds.has(exercise.id)).forEach((exercise) => {
      expect(exerciseDetails[exercise.id]).toBeDefined();
      expect(exerciseDetails[exercise.id].setup).toHaveLength(3);
      expect(exerciseDetails[exercise.id].commonMistakes).toHaveLength(3);
      expect(exerciseDetails[exercise.id].regressions).toHaveLength(3);
      expect(exerciseDetails[exercise.id].progressions).toHaveLength(3);
    });
  });
});
