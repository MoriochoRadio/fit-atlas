export const MAX_RECENT_EXERCISES = 12;
export const MAX_EXPLORE_FILTER_PRESETS = 6;

export type ExploreFilterPreset = {
  id: string;
  name: string;
  keyword: string;
  category: string;
  focus: string;
  region: string;
  difficulty: string;
  equipment: string;
  sort: string;
  rom: string;
};

export type ExplorePreferences = {
  favoriteExerciseIds: string[];
  recentExerciseIds: string[];
  filterPresets: ExploreFilterPreset[];
};

export const defaultExplorePreferences: ExplorePreferences = {
  favoriteExerciseIds: [],
  recentExerciseIds: [],
  filterPresets: [],
};

function readExerciseIds(value: unknown, limit?: number) {
  if (!Array.isArray(value)) return [];
  const ids = value.filter(
    (item): item is string => typeof item === "string" && item.length > 0
  );
  const uniqueIds = Array.from(new Set(ids));
  return limit ? uniqueIds.slice(0, limit) : uniqueIds;
}

function readFilterPresets(value: unknown): ExploreFilterPreset[] {
  if (!Array.isArray(value)) return [];
  const presets = value.flatMap(item => {
    if (!item || typeof item !== "object") return [];
    const preset = item as Partial<ExploreFilterPreset>;
    const stringFields = [
      preset.id,
      preset.name,
      preset.keyword,
      preset.category,
      preset.focus,
      preset.region,
      preset.difficulty,
      preset.equipment,
      preset.sort,
      preset.rom,
    ];
    if (!stringFields.every(field => typeof field === "string")) return [];
    const name = preset.name!.trim().slice(0, 28);
    if (!name || !preset.id) return [];
    return [
      {
        id: preset.id.slice(0, 64),
        name,
        keyword: preset.keyword!.slice(0, 80),
        category: preset.category!.slice(0, 40),
        focus: preset.focus!.slice(0, 40),
        region: preset.region!.slice(0, 40),
        difficulty: preset.difficulty!.slice(0, 40),
        equipment: preset.equipment!.slice(0, 40),
        sort: preset.sort!.slice(0, 40),
        rom: preset.rom!.slice(0, 40),
      },
    ];
  });
  return Array.from(
    new Map(presets.map(preset => [preset.id, preset])).values()
  ).slice(0, MAX_EXPLORE_FILTER_PRESETS);
}

export function readExplorePreferences(
  serialized: string | null | undefined
): ExplorePreferences {
  try {
    const value = JSON.parse(serialized ?? "{}") as Partial<ExplorePreferences>;
    return {
      favoriteExerciseIds: readExerciseIds(value.favoriteExerciseIds),
      recentExerciseIds: readExerciseIds(
        value.recentExerciseIds,
        MAX_RECENT_EXERCISES
      ),
      filterPresets: readFilterPresets(value.filterPresets),
    };
  } catch {
    return defaultExplorePreferences;
  }
}

export function toggleFavoriteExercise(
  preferences: ExplorePreferences,
  exerciseId: string
): ExplorePreferences {
  const isFavorite = preferences.favoriteExerciseIds.includes(exerciseId);
  return {
    ...preferences,
    favoriteExerciseIds: isFavorite
      ? preferences.favoriteExerciseIds.filter(id => id !== exerciseId)
      : [...preferences.favoriteExerciseIds, exerciseId],
  };
}

export function recordRecentExercise(
  preferences: ExplorePreferences,
  exerciseId: string
): ExplorePreferences {
  return {
    ...preferences,
    recentExerciseIds: [
      exerciseId,
      ...preferences.recentExerciseIds.filter(id => id !== exerciseId),
    ].slice(0, MAX_RECENT_EXERCISES),
  };
}

export function saveExploreFilterPreset(
  preferences: ExplorePreferences,
  preset: ExploreFilterPreset
): ExplorePreferences {
  return {
    ...preferences,
    filterPresets: [
      preset,
      ...preferences.filterPresets.filter(item => item.id !== preset.id),
    ].slice(0, MAX_EXPLORE_FILTER_PRESETS),
  };
}

export function removeExploreFilterPreset(
  preferences: ExplorePreferences,
  presetId: string
): ExplorePreferences {
  return {
    ...preferences,
    filterPresets: preferences.filterPresets.filter(
      preset => preset.id !== presetId
    ),
  };
}
