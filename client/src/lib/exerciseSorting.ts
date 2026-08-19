import type { Exercise } from "./fitnessData";

export type ExerciseSort = "recommended" | "difficulty" | "duration";

const difficultyRank: Record<Exercise["difficulty"], number> = { 입문: 0, 중급: 1, 상급: 2 };

export function getExerciseMinutes(value: string) {
  const match = value.match(/\d+/);
  return match ? Number(match[0]) : Number.MAX_SAFE_INTEGER;
}

export function sortExercises(exerciseList: Exercise[], sort: ExerciseSort) {
  return exerciseList
    .map((exercise, index) => ({ exercise, index, minutes: getExerciseMinutes(exercise.minutes), difficulty: difficultyRank[exercise.difficulty] }))
    .sort((a, b) => {
      if (sort === "duration") return a.minutes - b.minutes || a.difficulty - b.difficulty || a.index - b.index;
      if (sort === "difficulty") return a.difficulty - b.difficulty || a.minutes - b.minutes || a.index - b.index;
      return a.difficulty - b.difficulty || a.minutes - b.minutes || a.index - b.index;
    })
    .map(({ exercise }) => exercise);
}
