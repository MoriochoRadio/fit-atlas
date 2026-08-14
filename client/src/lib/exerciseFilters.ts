import type { BodyRegion, Exercise } from "./fitnessData";

export type ExerciseFilters = {
  keyword: string;
  category: string;
  focus: string;
  region: string;
  difficulty: string;
  equipment: string;
};

export function filterExercises(exercises: Exercise[], filters: ExerciseFilters) {
  const keyword = filters.keyword.toLowerCase().trim();
  return exercises.filter((exercise) => {
    const searchableText = `${exercise.name} ${exercise.englishName} ${exercise.category} ${exercise.regions.join(" ")} ${exercise.focus} ${exercise.equipment}`.toLowerCase();
    const categoryMatches = filters.category === "전체" || exercise.category === filters.category;
    const focusMatches = filters.focus === "전체" || exercise.focus === filters.focus;
    const regionMatches = filters.region === "전체" || exercise.regions.includes(filters.region as BodyRegion);
    const difficultyMatches = filters.difficulty === "전체" || exercise.difficulty === filters.difficulty;
    const equipmentMatches = filters.equipment === "전체" || (filters.equipment === "장비 없음" ? exercise.equipment === "없음" : exercise.equipment !== "없음");
    return categoryMatches && focusMatches && regionMatches && difficultyMatches && equipmentMatches && searchableText.includes(keyword);
  });
}
