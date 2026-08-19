import { describe, expect, it } from "vitest";
import { getExerciseDetail } from "./exerciseDetails";
import { exercises } from "./fitnessData";
import { verifiedActualExercisesPart14 } from "./verifiedActualExercisesPart14";

const normalize = (value: string) => value
  .toLocaleLowerCase("ko-KR")
  .replace(/[··–—\-–—.,()]/g, " ")
  .replace(/\s+/g, " ")
  .trim();

describe("exercise catalog quality gate", () => {
  it("keeps a catalog of individually named exercises instead of generated coaching combinations", () => {
    expect(exercises).toHaveLength(1000);
    expect(exercises.some((exercise) => exercise.id.startsWith("atlas13-"))).toBe(false);
    expect(exercises.filter((exercise) => exercise.id.startsWith("verified-")).length).toBe(501);
  });

  it("keeps the new expansion grounded in sourced independent movements, not set prescriptions", () => {
    expect(verifiedActualExercisesPart14).toHaveLength(501);
    verifiedActualExercisesPart14.forEach((exercise) => {
      expect(exercise.reference.url).toMatch(/acsm\.org|github\.com\/yuhonas\/free-exercise-db/);
      expect(exercise.name).not.toMatch(/템포|폼 리셋|파셜 레인지|1\.5레프|포즈/);
      expect(exercise.englishName).not.toMatch(/tempo|form reset|partial range|one half rep|pause rep/i);
    });
  });

  it("keeps identifiers and both display-name fields unique after normalization", () => {
    const ids = exercises.map((exercise) => exercise.id);
    const names = exercises.map((exercise) => normalize(exercise.name));
    const englishNames = exercises.map((exercise) => normalize(exercise.englishName));

    expect(new Set(ids).size).toBe(exercises.length);
    expect(new Set(names).size).toBe(exercises.length);
    expect(new Set(englishNames).size).toBe(exercises.length);
  });

  it("provides complete catalogue metadata and a usable safe detail structure for every exercise", () => {
    exercises.forEach((exercise) => {
      expect(exercise.id).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
      expect(exercise.cues).toHaveLength(3);
      expect(exercise.benefits).toHaveLength(3);
      expect(exercise.warning.length).toBeGreaterThan(20);
      expect(exercise.reference.url).toMatch(/^https:\/\//);

      const detail = getExerciseDetail(exercise);
      expect(detail.setup).toHaveLength(3);
      expect(detail.commonMistakes).toHaveLength(3);
      expect(detail.regressions).toHaveLength(3);
      expect(detail.progressions).toHaveLength(3);
      expect(detail.finish.length).toBeGreaterThan(20);
    });
  });
});
