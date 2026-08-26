import { filterExercises } from "./exerciseFilters";
import type { Exercise } from "./catalogTypes";
import {
  defaultExploreFilters,
  type ExploreFilters,
} from "./exploreFilterState";

/** 조건 하나를 풀면 몇 개가 나오는지. 검색 결과가 0건일 때 다음 행동을 고르기 위한 값이다. */
export type RelaxationSuggestion = {
  key: keyof ExploreFilters;
  label: string;
  /** 지금 걸려 있는 값. 버튼 문구에 그대로 쓴다. */
  value: string;
  count: number;
};

const RELAXABLE: ReadonlyArray<{ key: keyof ExploreFilters; label: string }> = [
  { key: "keyword", label: "검색어" },
  { key: "category", label: "종류" },
  { key: "focus", label: "목적" },
  { key: "region", label: "부위" },
  { key: "difficulty", label: "난이도" },
  { key: "equipment", label: "장비" },
];

function countFor(exercises: Exercise[], filters: ExploreFilters) {
  return filterExercises(exercises, {
    keyword: filters.keyword,
    category: filters.category,
    focus: filters.focus,
    region: filters.region,
    difficulty: filters.difficulty,
    equipment: filters.equipment,
  }).length;
}

/**
 * 조건을 하나씩만 기본값으로 되돌려 보고, 결과가 생기는 것만 많은 순서로 돌려준다.
 * "아무것도 없습니다"에서 멈추는 대신 어떤 조건이 결과를 막고 있는지 보여 준다.
 * ROM·정렬은 여기서 다루지 않는다. 목록을 좁히는 조건이 아니기 때문이다.
 */
export function getFilterRelaxations(
  exercises: Exercise[],
  filters: ExploreFilters
): RelaxationSuggestion[] {
  return RELAXABLE.flatMap(({ key, label }) => {
    const value = filters[key];
    if (value === defaultExploreFilters[key]) return [];
    const count = countFor(exercises, {
      ...filters,
      [key]: defaultExploreFilters[key],
    });
    if (count === 0) return [];
    return [{ key, label, value: String(value), count }];
  }).sort((left, right) => right.count - left.count);
}
