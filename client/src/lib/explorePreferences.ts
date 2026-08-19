export const MAX_RECENT_EXERCISES = 12;

export type ExplorePreferences = {
  favoriteExerciseIds: string[];
  recentExerciseIds: string[];
};

export const defaultExplorePreferences: ExplorePreferences = {
  favoriteExerciseIds: [],
  recentExerciseIds: [],
};

function readExerciseIds(value: unknown, limit?: number) {
  if (!Array.isArray(value)) return [];
  const ids = value.filter((item): item is string => typeof item === "string" && item.length > 0);
  const uniqueIds = Array.from(new Set(ids));
  return limit ? uniqueIds.slice(0, limit) : uniqueIds;
}

export function readExplorePreferences(serialized: string | null | undefined): ExplorePreferences {
  try {
    const value = JSON.parse(serialized ?? "{}") as Partial<ExplorePreferences>;
    return {
      favoriteExerciseIds: readExerciseIds(value.favoriteExerciseIds),
      recentExerciseIds: readExerciseIds(value.recentExerciseIds, MAX_RECENT_EXERCISES),
    };
  } catch {
    return defaultExplorePreferences;
  }
}

export function toggleFavoriteExercise(preferences: ExplorePreferences, exerciseId: string): ExplorePreferences {
  const isFavorite = preferences.favoriteExerciseIds.includes(exerciseId);
  return {
    ...preferences,
    favoriteExerciseIds: isFavorite ? preferences.favoriteExerciseIds.filter((id) => id !== exerciseId) : [...preferences.favoriteExerciseIds, exerciseId],
  };
}

export function recordRecentExercise(preferences: ExplorePreferences, exerciseId: string): ExplorePreferences {
  return {
    ...preferences,
    recentExerciseIds: [exerciseId, ...preferences.recentExerciseIds.filter((id) => id !== exerciseId)].slice(0, MAX_RECENT_EXERCISES),
  };
}
