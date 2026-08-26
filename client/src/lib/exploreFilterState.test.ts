import { describe, expect, it } from "vitest";
import {
  defaultExploreFilters,
  filtersForKeyword,
  filtersFromPreset,
} from "./exploreFilterState";
import type { ExploreFilterPreset } from "./explorePreferences";

const preset = (
  overrides: Partial<ExploreFilterPreset> = {}
): ExploreFilterPreset => ({
  id: "preset-1",
  name: "퇴근 후 가벼운 전신",
  keyword: "스쿼트",
  category: "맨몸운동",
  focus: "근력",
  region: "하체",
  difficulty: "입문",
  equipment: "장비 없음",
  sort: "difficulty",
  rom: "작음",
  ...overrides,
});

describe("exploreFilterState", () => {
  it("keeps only the keyword and returns every other condition to its default", () => {
    const filters = filtersForKeyword("발목 니투월 락");
    expect(filters).toEqual({
      ...defaultExploreFilters,
      keyword: "발목 니투월 락",
    });
  });

  it("restores a saved preset as it was written", () => {
    expect(filtersFromPreset(preset())).toEqual({
      keyword: "스쿼트",
      category: "맨몸운동",
      focus: "근력",
      region: "하체",
      difficulty: "입문",
      equipment: "장비 없음",
      sort: "difficulty",
      rom: "작음",
    });
  });

  it("falls back to a safe default when a stored preset holds an unknown value", () => {
    const filters = filtersFromPreset(
      preset({ category: "존재하지 않는 종류", sort: "random", rom: "아주 큼" })
    );
    expect(filters.category).toBe("전체");
    expect(filters.sort).toBe("recommended");
    expect(filters.rom).toBe("전체");
  });

  it("treats an empty stored field as the 전체 condition", () => {
    const filters = filtersFromPreset(
      preset({ focus: "", region: "", difficulty: "", equipment: "" })
    );
    expect([
      filters.focus,
      filters.region,
      filters.difficulty,
      filters.equipment,
    ]).toEqual(["전체", "전체", "전체", "전체"]);
  });
});
