import { describe, expect, it } from "vitest";
import {
  MAX_RECENT_EXERCISES,
  readExplorePreferences,
  recordRecentExercise,
  toggleFavoriteExercise,
} from "./explorePreferences";

describe("explore preferences", () => {
  it("toggles favorites without duplicating identifiers", () => {
    const added = toggleFavoriteExercise(
      { favoriteExerciseIds: [], recentExerciseIds: [], filterPresets: [] },
      "squat"
    );
    expect(added.favoriteExerciseIds).toEqual(["squat"]);
    expect(toggleFavoriteExercise(added, "squat").favoriteExerciseIds).toEqual(
      []
    );
  });

  it("keeps recently viewed exercises unique, most-recent first, and bounded", () => {
    const initial = {
      favoriteExerciseIds: [],
      recentExerciseIds: Array.from(
        { length: MAX_RECENT_EXERCISES },
        (_, index) => `exercise-${index}`
      ),
      filterPresets: [],
    };
    const recorded = recordRecentExercise(initial, "exercise-4");
    expect(recorded.recentExerciseIds[0]).toBe("exercise-4");
    expect(recorded.recentExerciseIds).toHaveLength(MAX_RECENT_EXERCISES);
    expect(new Set(recorded.recentExerciseIds).size).toBe(MAX_RECENT_EXERCISES);
  });

  it("safely ignores malformed or duplicated stored identifiers", () => {
    expect(
      readExplorePreferences(
        '{"favoriteExerciseIds":["squat","squat",4],"recentExerciseIds":["run","run",null]}'
      )
    ).toEqual({
      favoriteExerciseIds: ["squat"],
      recentExerciseIds: ["run"],
      filterPresets: [],
    });
    expect(readExplorePreferences("not-json")).toEqual({
      favoriteExerciseIds: [],
      recentExerciseIds: [],
      filterPresets: [],
    });
  });
});
