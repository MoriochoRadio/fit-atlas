import { describe, expect, it } from "vitest";
import { getExerciseEvidenceScope } from "./exerciseEvidence";
import { verifiedActualExercisesPart14 } from "./verifiedActualExercisesPart14";
import { exercises } from "./fitnessData";

describe("exercise evidence scope", () => {
  it("separates a source-backed movement record from general safety guidance and individual-effect limits", () => {
    const sourceExercise = verifiedActualExercisesPart14.find((exercise) => exercise.category === "프리웨이트")!;
    const scope = getExerciseEvidenceScope(sourceExercise);
    expect(scope.sourceLabel).toContain("종목 원천");
    expect(scope.guidanceLabel).toContain("저항 운동");
    expect(scope.limit).toContain("보장하지 않습니다");
  });

  it("labels public-health references as general guidance rather than movement-specific proof", () => {
    const publicHealthExercise = exercises.find((exercise) => /who\.int|cdc\.gov/i.test(exercise.reference.url))!;
    const scope = getExerciseEvidenceScope(publicHealthExercise);
    expect(scope.sourceLabel).toContain("공공 보건");
    expect(scope.limit).toContain("개별 운동 동작");
  });
});
