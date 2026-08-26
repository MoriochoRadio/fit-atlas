import type { ExerciseSort } from "./exerciseSorting";
import type { ExploreFilterPreset } from "./explorePreferences";
import {
  preferredCategoryOptions,
  type PreferredCategory,
} from "./profilePreferences";

export type RomFilter = "전체" | "작음" | "보통" | "큼";

/**
 * 탐색 화면의 조건은 항상 함께 읽히고 함께 초기화된다.
 * 8개의 개별 상태로 두면 초기화·프리셋 적용·대체 운동 열기가
 * 매번 8줄짜리 세터 나열이 되므로 하나의 값으로 다룬다.
 */
export type ExploreFilters = {
  keyword: string;
  category: PreferredCategory;
  focus: string;
  region: string;
  difficulty: string;
  equipment: string;
  sort: ExerciseSort;
  rom: RomFilter;
};

export const defaultExploreFilters: ExploreFilters = {
  keyword: "",
  category: "전체",
  focus: "전체",
  region: "전체",
  difficulty: "전체",
  equipment: "전체",
  sort: "recommended",
  rom: "전체",
};

const sortOptions: ExerciseSort[] = ["recommended", "difficulty", "duration"];
const romOptions: RomFilter[] = ["전체", "작음", "보통", "큼"];

/** 키워드만 남기고 나머지 조건을 전체로 되돌린다. 대체 운동을 이름으로 열 때 쓴다. */
export function filtersForKeyword(keyword: string): ExploreFilters {
  return { ...defaultExploreFilters, keyword };
}

/** 저장된 프리셋은 자유 문자열이므로 알 수 없는 값은 안전한 기본값으로 떨어뜨린다. */
export function filtersFromPreset(preset: ExploreFilterPreset): ExploreFilters {
  return {
    keyword: preset.keyword,
    category: preferredCategoryOptions.includes(
      preset.category as PreferredCategory
    )
      ? (preset.category as PreferredCategory)
      : "전체",
    focus: preset.focus || "전체",
    region: preset.region || "전체",
    difficulty: preset.difficulty || "전체",
    equipment: preset.equipment || "전체",
    sort: sortOptions.includes(preset.sort as ExerciseSort)
      ? (preset.sort as ExerciseSort)
      : "recommended",
    rom: romOptions.includes(preset.rom as RomFilter)
      ? (preset.rom as RomFilter)
      : "전체",
  };
}
