import { describe, expect, it } from "vitest";
import { getFilterRelaxations } from "./filterRelaxation";
import { defaultExploreFilters } from "./exploreFilterState";
import type { Exercise } from "./catalogTypes";

const exercise = (overrides: Partial<Exercise> & { id: string; name: string }): Exercise =>
  ({
    englishName: overrides.name,
    category: "맨몸운동",
    regions: ["하체"],
    focus: "근력",
    difficulty: "입문",
    equipment: "없음",
    minutes: "10분",
    description: "",
    benefits: [],
    ...overrides,
  }) as Exercise;

const catalog: Exercise[] = [
  exercise({ id: "1", name: "바디웨이트 스쿼트" }),
  exercise({ id: "2", name: "리버스 런지", difficulty: "중급" }),
  exercise({ id: "3", name: "레그 프레스", category: "헬스기구", equipment: "레그 프레스 머신" }),
  exercise({ id: "4", name: "랫 풀다운", category: "헬스기구", regions: ["등"], equipment: "케이블 머신" }),
];

describe("getFilterRelaxations", () => {
  it("returns nothing when no condition has been narrowed", () => {
    expect(getFilterRelaxations(catalog, defaultExploreFilters)).toEqual([]);
  });

  it("names the single condition that is blocking every result", () => {
    // 헬스기구 + 장비 없음 조합은 카탈로그에 없다
    const relaxations = getFilterRelaxations(catalog, {
      ...defaultExploreFilters,
      category: "헬스기구",
      equipment: "장비 없음",
    });
    // 두 조건 모두 2건을 되살리므로, 같은 수일 때는 조건 표시 순서를 유지한다
    expect(relaxations.map(item => [item.label, item.count])).toEqual([
      ["종류", 2],
      ["장비", 2],
    ]);
  });

  it("orders the suggestions by how many results each one would restore", () => {
    const relaxations = getFilterRelaxations(catalog, {
      ...defaultExploreFilters,
      keyword: "존재하지 않는 운동",
      region: "등",
    });
    expect(relaxations[0].label).toBe("검색어");
    expect(relaxations[0].count).toBeGreaterThan(0);
  });

  it("carries the value that is currently applied so the hint can name it", () => {
    const [first] = getFilterRelaxations(catalog, {
      ...defaultExploreFilters,
      difficulty: "상급",
    });
    expect(first).toMatchObject({ key: "difficulty", label: "난이도", value: "상급" });
  });

  it("skips a condition whose removal still leaves nothing", () => {
    const relaxations = getFilterRelaxations(catalog, {
      ...defaultExploreFilters,
      keyword: "존재하지 않는 운동",
      difficulty: "중급",
    });
    // 난이도만 풀어도 검색어 때문에 여전히 0건이므로 제안에 넣지 않는다
    expect(relaxations.map(item => item.label)).toEqual(["검색어"]);
  });
});
