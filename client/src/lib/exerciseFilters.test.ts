import { describe, expect, it } from "vitest";
import { exercises, recoveryGuides, wellnessCards } from "./fitnessData";
import { filterExercises } from "./exerciseFilters";

const allFilters = { keyword: "", category: "전체", focus: "전체", region: "전체", difficulty: "전체", equipment: "전체" };

describe("exercise library QA", () => {
  it("covers every supported category with posture, benefits, warnings, and sources", () => {
    const categories = new Set(exercises.map((exercise) => exercise.category));
    expect(categories).toEqual(new Set(["러닝", "유산소", "헬스기구", "프리웨이트", "맨몸운동", "모빌리티"]));
    expect(exercises.length).toBeGreaterThanOrEqual(16);
    exercises.forEach((exercise) => {
      expect(exercise.cues.length).toBeGreaterThanOrEqual(3);
      expect(exercise.benefits.length).toBeGreaterThanOrEqual(3);
      expect(exercise.warning.length).toBeGreaterThan(20);
      expect(exercise.reference.url).toMatch(/^https:\/\//);
    });
  });

  it("combines category, region, purpose, difficulty, equipment, and keyword filters", () => {
    const result = filterExercises(exercises, { ...allFilters, category: "맨몸운동", region: "코어", focus: "근력", difficulty: "입문", equipment: "장비 없음", keyword: "푸시업" });
    expect(result.map((exercise) => exercise.id)).toEqual(["pushup"]);
  });

  it("shows mobility entries and excludes equipment when requested", () => {
    expect(filterExercises(exercises, { ...allFilters, category: "모빌리티" }).map((exercise) => exercise.id)).toContain("cat-cow");
    expect(filterExercises(exercises, { ...allFilters, equipment: "장비 없음" }).every((exercise) => exercise.equipment === "없음")).toBe(true);
  });

  it("provides recovery and wellness education for every mapped region", () => {
    expect(Object.keys(recoveryGuides)).toHaveLength(7);
    Object.values(recoveryGuides).forEach((guide) => {
      expect(guide.steps).toHaveLength(3);
      expect(guide.caution.length).toBeGreaterThan(25);
    });
    expect(wellnessCards.map((card) => card.title)).toEqual(["수면 리듬", "운동 전후 식사", "사우나와 열 노출"]);
  });
});
