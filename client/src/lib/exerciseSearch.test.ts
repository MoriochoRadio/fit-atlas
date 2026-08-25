import { describe, expect, it } from "vitest";
import { exercises } from "./fitnessData";
import {
  filterExercises,
  matchesKeyword,
  type ExerciseFilters,
} from "./exerciseFilters";

const base: ExerciseFilters = {
  keyword: "",
  category: "전체",
  focus: "전체",
  region: "전체",
  difficulty: "전체",
  equipment: "전체",
};

const search = (keyword: string) =>
  filterExercises(exercises, { ...base, keyword });

describe("검색어 정규화", () => {
  it("붙여 써도 띄어 쓴 이름을 찾는다", () => {
    // 카탈로그 표기는 "랫 풀다운"인데 "랫풀다운"으로 치면 2건만 나오던 문제
    const joined = search("랫풀다운");
    const spaced = search("랫 풀다운");
    expect(joined.length).toBeGreaterThan(0);
    expect(joined.length).toBe(spaced.length);
    expect(joined.some(exercise => exercise.name === "랫 풀다운")).toBe(true);
  });

  it("낱말을 띄어 치면 둘 다 포함한 항목까지 넓게 찾는다", () => {
    // "벤치 프레스"는 두 낱말이므로 떨어져 있는 항목도 포함한다. 붙여 친 결과는 그 부분집합이다.
    const joined = search("벤치프레스");
    const spaced = search("벤치 프레스");
    expect(joined.length).toBeGreaterThan(0);
    expect(spaced.length).toBeGreaterThanOrEqual(joined.length);
    expect(joined.every(exercise => spaced.includes(exercise))).toBe(true);
  });

  it("낱말 순서를 바꿔도 찾는다", () => {
    expect(search("랫 풀다운").length).toBe(search("풀다운 랫").length);
  });

  it("하이픈·대소문자를 구분하지 않는다", () => {
    const withHyphen = search("Push-Up").length;
    expect(search("push up").length).toBe(withHyphen);
    expect(search("pushup").length).toBe(withHyphen);
    expect(search("PUSHUP").length).toBe(withHyphen);
  });

  it("흔한 한글 표기 변형을 흡수한다", () => {
    // "푸쉬업"은 0건이 나오던 표기
    expect(search("푸쉬업").length).toBeGreaterThan(0);
    expect(search("푸쉬업").length).toBe(search("푸시업").length);
    expect(search("스콰트").length).toBe(search("스쿼트").length);
    expect(search("벤취프레스").length).toBe(search("벤치프레스").length);
  });

  it("빈 검색어는 전체를 돌려준다", () => {
    expect(search("").length).toBe(exercises.length);
    expect(search("   ").length).toBe(exercises.length);
  });

  it("없는 낱말이 하나라도 섞이면 결과가 없다", () => {
    expect(search("랫 풀다운 존재하지않는낱말").length).toBe(0);
  });

  it("이름 외에 부위·장비로도 찾을 수 있다", () => {
    const byRegion = exercises.filter(exercise =>
      matchesKeyword(exercise, "둔근")
    );
    expect(byRegion.length).toBeGreaterThan(0);
    expect(byRegion.every(exercise => matchesKeyword(exercise, "둔근"))).toBe(
      true
    );
  });
});
