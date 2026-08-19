import { describe, expect, it } from "vitest";
import { exercises, recoveryGuides, wellnessCards } from "./fitnessData";
import { filterExercises, getCatalogStats } from "./exerciseFilters";

const allFilters = { keyword: "", category: "전체", focus: "전체", region: "전체", difficulty: "전체", equipment: "전체" };

describe("exercise library QA", () => {
  it("covers every supported category with posture, benefits, warnings, and sources", () => {
    const categories = new Set(exercises.map((exercise) => exercise.category));
    const stats = getCatalogStats(exercises);
    expect(categories).toEqual(new Set(["러닝", "유산소", "헬스기구", "프리웨이트", "맨몸운동", "모빌리티", "균형·협응", "요가·필라테스", "파워·민첩성"]));
    expect(exercises.length).toBeGreaterThanOrEqual(200);
    expect(stats).toEqual({ exerciseCount: exercises.length, categoryCount: categories.size });
    expect(new Set(exercises.map((exercise) => exercise.id)).size).toBe(exercises.length);
    exercises.forEach((exercise) => {
      expect(exercise.cues.length).toBeGreaterThanOrEqual(3);
      expect(exercise.benefits.length).toBeGreaterThanOrEqual(3);
      expect(exercise.warning.length).toBeGreaterThan(20);
      expect(exercise.reference.url).toMatch(/^https:\/\//);
    });
    expect(exercises.map((exercise) => exercise.id)).toEqual(expect.arrayContaining(["kettlebell-sumo-deadlift", "resistance-band-row", "battle-rope-alternating-wave", "low-step-march", "medicine-ball-scoop-toss", "aqua-walk", "elliptical-easy", "recumbent-bike-easy", "row-erg-easy", "sandbag-bear-hug-carry", "trx-row", "landmine-press", "landmine-rotation-prep", "seated-wrist-mobility", "pool-easy-swim", "rail-supported-step-up", "counter-incline-pushup", "supported-floor-transfer", "grocery-bag-lift-to-counter", "easy-incline-walk", "trekking-pole-walk-prep", "light-daypack-walk", "outdoor-pace-reset", "cable-biceps-curl-easy", "machine-incline-chest-press-easy", "a-skip-walk-drill", "easy-fartlek-run", "pike-pushup-prep", "copenhagen-plank-knee-easy", "assisted-pistol-squat-to-box", "decline-pushup-prep", "treadmill-incline-tempo-walk", "machine-ab-crunch-easy", "cable-reverse-fly-easy", "hollow-tuck-hold", "run-walk-200m-easy", "treadmill-jog-walk-interval", "cable-single-arm-chest-press-easy", "unilateral-leg-press-easy", "active-hang-foot-assist", "supported-pull-up-negative", "band-assisted-chin-up-easy", "y-balance-reach-support", "single-leg-head-turn-support"]));
  });

  it("combines category, region, purpose, difficulty, equipment, and keyword filters", () => {
    const result = filterExercises(exercises, { ...allFilters, category: "맨몸운동", region: "코어", focus: "근력", difficulty: "입문", equipment: "장비 없음", keyword: "푸시업" });
    expect(result.map((exercise) => exercise.id)).toEqual(["pushup"]);
  });

  it("shows mobility entries and excludes equipment when requested", () => {
    expect(filterExercises(exercises, { ...allFilters, category: "모빌리티" }).map((exercise) => exercise.id)).toContain("cat-cow");
    expect(filterExercises(exercises, { ...allFilters, category: "균형·협응", focus: "균형" }).map((exercise) => exercise.id)).toContain("single-leg-stand");
    expect(filterExercises(exercises, { ...allFilters, category: "요가·필라테스", keyword: "다운독" }).map((exercise) => exercise.id)).toEqual(["downward-dog"]);
    expect(filterExercises(exercises, { ...allFilters, category: "파워·민첩성", focus: "파워" }).map((exercise) => exercise.id)).toEqual(expect.arrayContaining(["snap-down", "squat-jump-stick"]));
    expect(filterExercises(exercises, { ...allFilters, equipment: "장비 없음" }).every((exercise) => exercise.equipment === "없음")).toBe(true);
  });

  it("provides recovery and wellness education for every mapped region", () => {
    expect(Object.keys(recoveryGuides)).toHaveLength(7);
    Object.values(recoveryGuides).forEach((guide) => {
      expect(guide.steps).toHaveLength(3);
      expect(guide.caution.length).toBeGreaterThan(25);
    });
    expect(wellnessCards).toHaveLength(11);
    expect(wellnessCards.map((card) => card.title)).toEqual(expect.arrayContaining(["수면 리듬", "운동 전후 식사", "사우나와 열 노출", "마사지건의 현실적 역할", "균형과 일상 기능", "일상 식사 리듬", "더운 날 세션 계획", "카페인·운동·수면 일지"]));
    wellnessCards.forEach((card) => expect(card.url).toMatch(/^https:\/\//));
  });
});
