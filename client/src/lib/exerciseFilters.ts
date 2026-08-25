import type { BodyRegion, Exercise } from "./fitnessData";

export type ExerciseFilters = {
  keyword: string;
  category: string;
  focus: string;
  region: string;
  difficulty: string;
  equipment: string;
};

/**
 * 사용자가 흔히 쓰는 표기를 카탈로그 표기로 맞춘다.
 * 카탈로그는 한 가지 표기로 통일돼 있으므로(푸시·스쿼트·벤치·런지) 입력 쪽만 바꾸면 된다.
 * "푸쉬업"으로 검색하면 0건이 나오던 문제가 이 표에서 해결된다.
 */
const SPELLING_VARIANTS: ReadonlyArray<readonly [RegExp, string]> = [
  [/쉬/g, "시"], // 푸쉬업 → 푸시업
  [/스콰트|스쾃|스콰|스쿼시/g, "스쿼트"],
  [/취/g, "치"], // 벤취프레스 → 벤치프레스
  [/런쥐/g, "런지"],
  [/플렁크|플랑크/g, "플랭크"],
  [/데드리프팅/g, "데드리프트"],
  [/덤벨|아령/g, "덤벨"],
  [/바벨|역기/g, "바벨"],
];

/** 띄어쓰기·하이픈·괄호처럼 사람마다 다르게 쓰는 구분자는 비교에서 제외한다. */
const SEPARATORS = /[\s\-–—_·・.,()[\]{}/\'"`]+/g;

function normalize(value: string): string {
  let text = value.toLowerCase();
  for (const [pattern, replacement] of SPELLING_VARIANTS)
    text = text.replace(pattern, replacement);
  return text.replace(SEPARATORS, "");
}

// 운동 객체는 바뀌지 않으므로 정규화 결과를 캐시해 입력할 때마다 다시 계산하지 않는다.
const searchIndex = new WeakMap<Exercise, string>();

function searchableFor(exercise: Exercise): string {
  const cached = searchIndex.get(exercise);
  if (cached !== undefined) return cached;
  const text = normalize(
    [
      exercise.name,
      exercise.englishName,
      exercise.category,
      exercise.regions.join(" "),
      exercise.focus,
      exercise.equipment,
    ].join(" ")
  );
  searchIndex.set(exercise, text);
  return text;
}

/**
 * 검색어를 낱말로 쪼개 모두 포함하는지 본다.
 * 순서를 바꿔 쳐도("풀다운 랫") 찾을 수 있고, 붙여 써도("랫풀다운") 같은 결과가 나온다.
 */
export function matchesKeyword(exercise: Exercise, keyword: string): boolean {
  const tokens = keyword.split(/\s+/).map(normalize).filter(Boolean);
  if (tokens.length === 0) return true;
  const haystack = searchableFor(exercise);
  return tokens.every(token => haystack.includes(token));
}

export function filterExercises(
  exercises: Exercise[],
  filters: ExerciseFilters
) {
  return exercises.filter(exercise => {
    const categoryMatches =
      filters.category === "전체" || exercise.category === filters.category;
    const focusMatches =
      filters.focus === "전체" || exercise.focus === filters.focus;
    const regionMatches =
      filters.region === "전체" ||
      exercise.regions.includes(filters.region as BodyRegion);
    const difficultyMatches =
      filters.difficulty === "전체" ||
      exercise.difficulty === filters.difficulty;
    const equipmentMatches =
      filters.equipment === "전체" ||
      (filters.equipment === "장비 없음"
        ? exercise.equipment === "없음"
        : exercise.equipment !== "없음");
    return (
      categoryMatches &&
      focusMatches &&
      regionMatches &&
      difficultyMatches &&
      equipmentMatches &&
      matchesKeyword(exercise, filters.keyword)
    );
  });
}

export function getCatalogStats(exercises: Exercise[]) {
  return {
    exerciseCount: exercises.length,
    categoryCount: new Set(exercises.map(exercise => exercise.category)).size,
  };
}
