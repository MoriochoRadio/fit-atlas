import { describe, expect, it } from "vitest";
import { getExerciseDetail } from "./exerciseDetails";
import { exercises } from "./fitnessData";
import { structuredTrainingEntryIds } from "./catalogQualityRules";

// 공개 원천에서 가져온 534개는 카탈로그 안에 "verified-" 접두사로 들어 있다.
// 같은 데이터를 별도 파일로 한 벌 더 두면 두 사본이 갈라질 수 있어 카탈로그에서 직접 뽑는다.
const verifiedSourcedExercises = exercises.filter((exercise) => exercise.id.startsWith("verified-"));

const normalize = (value: string) => value
  .toLocaleLowerCase("ko-KR")
  .replace(/[··–—\-–—.,()]/g, " ")
  .replace(/\s+/g, " ")
  .trim();

describe("exercise catalog quality gate", () => {
  it("keeps a catalog of individually named exercises instead of generated coaching combinations", () => {
    expect(exercises).toHaveLength(1008);
    expect(exercises.some((exercise) => exercise.id.startsWith("atlas13-"))).toBe(false);
    expect(exercises.filter((exercise) => exercise.id.startsWith("verified-")).length).toBe(534);
  });

  it("keeps new racket and combat starter drills non-contact with individualized safety and detail knowledge", () => {
    const ids = ["tennis-ready-split-step-easy", "tennis-shadow-forehand-recovery-easy", "badminton-ready-side-step-easy", "badminton-net-step-return-easy", "table-tennis-ready-shift-easy", "boxing-guard-step-reset-easy", "boxing-shadow-jab-return-easy", "martial-arts-stance-shift-easy"];
    const additions = ids.map((id) => exercises.find((exercise) => exercise.id === id));
    expect(additions).toHaveLength(8);
    additions.forEach((exercise) => {
      expect(exercise).toBeDefined();
      if (!exercise) return;
      const detail = getExerciseDetail(exercise);
      expect(exercise.difficulty).toBe("입문");
      expect(exercise.warning).toMatch(/통증|어지러움|미끄러움|장애물|대련|타격/);
      expect(detail.setup).toHaveLength(3);
      expect(detail.commonMistakes).toHaveLength(3);
      expect(detail.regressions).toHaveLength(3);
      expect(detail.progressions).toHaveLength(3);
    });
  });

  it("keeps the new expansion grounded in sourced independent movements, not set prescriptions", () => {
    expect(verifiedSourcedExercises).toHaveLength(534);
    verifiedSourcedExercises.forEach((exercise) => {
      expect(exercise.reference.url).toMatch(/acsm\.org|github\.com\/yuhonas\/free-exercise-db/);
      expect(exercise.name).not.toMatch(/템포|폼 리셋|파셜 레인지|1\.5레프|포즈/);
      expect(exercise.englishName).not.toMatch(/tempo|form reset|partial range|one half rep|pause rep/i);
    });
  });

  it("gives every sourced movement an exercise-specific instruction profile instead of a category template", () => {
    const instructionSignatures = verifiedSourcedExercises.map((exercise) => {
      const detail = getExerciseDetail(exercise);
      expect(exercise.description).not.toContain("독립적인 동작 경로를 연습하는 실제 운동 종목입니다.");
      expect(exercise.cues.some((cue) => cue.includes(exercise.name))).toBe(true);
      expect(exercise.benefits.some((benefit) => benefit.includes(exercise.name))).toBe(true);
      expect(detail.setup.some((step) => step.includes(exercise.name))).toBe(true);
      expect(detail.finish).toContain(exercise.name);
      expect(detail.commonMistakes.every((mistake) => mistake.includes(exercise.name))).toBe(true);
      expect(detail.regressions.every((regression) => regression.includes(exercise.name))).toBe(true);
      expect(detail.progressions.every((progression) => progression.includes(exercise.name))).toBe(true);
      return normalize(JSON.stringify({
        description: exercise.description.replaceAll(exercise.name, "{name}"),
        warning: exercise.warning,
        setup: detail.setup.map((step) => step.replaceAll(exercise.name, "{name}").replaceAll(exercise.equipment, "{equipment}")),
        mistakes: detail.commonMistakes.map((mistake) => mistake.replaceAll(exercise.name, "{name}")),
        regressions: detail.regressions.map((regression) => regression.replaceAll(exercise.name, "{name}")),
        progressions: detail.progressions.map((progression) => progression.replaceAll(exercise.name, "{name}")),
      }));
    });
    const counts = instructionSignatures.reduce<Record<string, number>>((result, signature) => {
      result[signature] = (result[signature] ?? 0) + 1;
      return result;
    }, {});
    expect(Math.max(...Object.values(counts))).toBeLessThanOrEqual(2);
  });

  it("excludes program structure and coaching methods from the independent exercise catalog", () => {
    expect(exercises.some((exercise) => structuredTrainingEntryIds.has(exercise.id))).toBe(false);
    expect(exercises.some((exercise) => /(?:behind(?: the)? neck|neck bridge|neck harness|judo flip|atlas stone|car deadlift|partner|with chains|with bands)/i.test(exercise.englishName))).toBe(false);
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
