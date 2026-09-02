import { describe, expect, it } from "vitest";
import {
  createBackup,
  parseBackup,
  readAtlasInteractionPreferences,
  readAtlasTheme,
  readAxisVisibility,
  readLocalExplorePreferences,
  readLocalProfile,
  readLocalWeeklyPlan,
  readSceneExperiencePreferences,
  readTrainingLogs,
  saveAtlasInteractionPreferences,
  saveAtlasTheme,
  saveAxisVisibility,
  saveLocalExplorePreferences,
  saveLocalProfile,
  saveLocalWeeklyPlan,
  saveSceneExperiencePreferences,
  saveTrainingLogs,
  defaultAtlasInteractionPreferences,
} from "./localStore";
import { defaultExplorePreferences } from "./explorePreferences";
import { defaultProfilePreferences } from "./profilePreferences";
import { createWeeklyPlan } from "./weeklyPlan";

function installLocalStorage() {
  const values = new Map<string, string>();
  const localStorage = {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => values.set(key, value),
    removeItem: (key: string) => values.delete(key),
    clear: () => values.clear(),
  };
  Object.defineProperty(globalThis, "window", {
    value: { localStorage },
    configurable: true,
  });
  return localStorage;
}

describe("local backup format", () => {
  it("round-trips profile and workout records without server data", () => {
    const backup = createBackup(
      [
        {
          id: "log-1",
          date: "2026-08-14",
          exercise: "푸시업",
          sets: 3,
          reps: 10,
          load: 0,
          minutes: 20,
          intensity: 5,
        },
      ],
      { ...defaultProfilePreferences, recoveryContext: "reduced_readiness" }
    );
    const restored = parseBackup(JSON.stringify(backup));
    expect(backup.version).toBe(5);
    expect(restored.logs).toHaveLength(1);
    expect(restored.profile.recoveryContext).toBe("reduced_readiness");
    expect(restored.weeklyPlan.sessions).toHaveLength(3);
    expect(restored.explorePreferences).toEqual({
      favoriteExerciseIds: [],
      recentExerciseIds: [],
      filterPresets: [],
    });
  });

  it("persists logs, profiles, presets, and scene experience locally", () => {
    const storage = installLocalStorage();
    const logs = [
      {
        id: "log-1",
        date: "2026-08-14",
        exercise: "푸시업",
        sets: 3,
        reps: 10,
        load: 0,
        minutes: 20,
        intensity: 5,
      },
    ];
    const profile = {
      ...defaultProfilePreferences,
      age: "30",
      recoveryContext: "reduced_readiness",
    };
    const weeklyPlan = createWeeklyPlan("strength");
    const explorePreferences = {
      favoriteExerciseIds: ["squat"],
      recentExerciseIds: ["run", "squat"],
      filterPresets: [
        {
          id: "evening",
          name: "퇴근 후",
          keyword: "",
          category: "맨몸운동",
          focus: "가동성",
          region: "전체",
          difficulty: "입문",
          equipment: "장비 없음",
          sort: "duration",
          rom: "작음",
        },
      ],
    };
    saveTrainingLogs(logs);
    saveLocalProfile(profile);
    saveLocalWeeklyPlan(weeklyPlan);
    saveLocalExplorePreferences(explorePreferences);
    saveAxisVisibility(false);
    saveAtlasTheme("ocean");
    saveSceneExperiencePreferences({
      soundEnabled: false,
      lastScene: "explore",
    });
    saveAtlasInteractionPreferences({
      motionSpeed: "fast",
      blockEdits: {
        "strength-gym-30-1": {
          label: "당기기",
          minutes: 12,
          items: ["랫 풀다운 · 2세트"],
        },
      },
      heroEquipment: "dumbbell",
      resistance: 72,
      recentEquipmentSession: {
        equipment: "dumbbell",
        resistance: 72,
        startedAt: 1787222400000,
      },
    });
    expect(readTrainingLogs()).toEqual(logs);
    expect(readLocalProfile()).toEqual(profile);
    expect(readLocalWeeklyPlan()).toEqual(weeklyPlan);
    expect(readLocalExplorePreferences()).toEqual(explorePreferences);
    expect(readAxisVisibility()).toBe(false);
    expect(readAtlasTheme()).toBe("ocean");
    expect(readSceneExperiencePreferences()).toEqual({
      soundEnabled: false,
      lastScene: "explore",
    });
    expect(readAtlasInteractionPreferences()).toEqual({
      motionSpeed: "fast",
      blockEdits: {
        "strength-gym-30-1": {
          label: "당기기",
          minutes: 12,
          items: ["랫 풀다운 · 2세트"],
        },
      },
      heroEquipment: "dumbbell",
      resistance: 72,
      recentEquipmentSession: {
        equipment: "dumbbell",
        resistance: 72,
        startedAt: 1787222400000,
      },
    });
    storage.setItem("fit-atlas-logs", "not-json");
    storage.setItem("fit-atlas-profile", "not-json");
    expect(readTrainingLogs()).toEqual([]);
    expect(readLocalProfile()).toEqual(defaultProfilePreferences);
  });

  it("restores only supported atlas theme identifiers and safely falls back for malformed values", () => {
    const storage = installLocalStorage();
    storage.setItem("fit-atlas-atlas-theme", JSON.stringify("coral"));
    expect(readAtlasTheme()).toBe("coral");
    storage.setItem("fit-atlas-atlas-theme", JSON.stringify("unknown"));
    expect(readAtlasTheme()).toBe("lime");
    storage.setItem("fit-atlas-atlas-theme", "not-json");
    expect(readAtlasTheme()).toBe("lime");
  });

  it("restores valid atlas interaction preferences and filters malformed node edits", () => {
    const storage = installLocalStorage();
    storage.setItem(
      "fit-atlas-atlas-interaction",
      JSON.stringify({
        motionSpeed: "slow",
        heroEquipment: "treadmill",
        resistance: 115,
        recentEquipmentSession: {
          equipment: "treadmill",
          resistance: -4,
          startedAt: 1787222400000,
        },
        blockEdits: {
          valid: { label: "준비", minutes: 5, items: ["걷기"] },
          broken: { label: 5 },
        },
      })
    );
    expect(readAtlasInteractionPreferences()).toEqual({
      motionSpeed: "slow",
      blockEdits: { valid: { label: "준비", minutes: 5, items: ["걷기"] } },
      heroEquipment: "treadmill",
      resistance: 100,
      recentEquipmentSession: {
        equipment: "treadmill",
        resistance: 0,
        startedAt: 1787222400000,
      },
    });
    storage.setItem("fit-atlas-atlas-interaction", "not-json");
    expect(readAtlasInteractionPreferences()).toEqual({
      motionSpeed: "normal",
      blockEdits: {},
      heroEquipment: "cable",
      resistance: 54,
      recentEquipmentSession: null,
    });
  });

  it("restores only valid scene experience settings and safely filters malformed filter presets", () => {
    const storage = installLocalStorage();
    storage.setItem(
      "fit-atlas-scene-experience",
      JSON.stringify({ soundEnabled: "yes", lastScene: "unknown" })
    );
    expect(readSceneExperiencePreferences()).toEqual({
      soundEnabled: true,
      lastScene: "home",
    });
    storage.setItem(
      "fit-atlas-explore-preferences",
      JSON.stringify({
        favoriteExerciseIds: ["push-up"],
        recentExerciseIds: ["run"],
        filterPresets: [
          {
            id: "valid",
            name: "  짧은 회복  ",
            keyword: "스트레칭",
            category: "전체",
            focus: "가동성",
            region: "전체",
            difficulty: "입문",
            equipment: "장비 없음",
            sort: "duration",
            rom: "작음",
          },
          { id: 3, name: "broken" },
        ],
      })
    );
    expect(readLocalExplorePreferences()).toEqual({
      favoriteExerciseIds: ["push-up"],
      recentExerciseIds: ["run"],
      filterPresets: [
        {
          id: "valid",
          name: "짧은 회복",
          keyword: "스트레칭",
          category: "전체",
          focus: "가동성",
          region: "전체",
          difficulty: "입문",
          equipment: "장비 없음",
          sort: "duration",
          rom: "작음",
        },
      ],
    });
  });

  it("reports a storage failure instead of throwing when browser persistence is unavailable", () => {
    Object.defineProperty(globalThis, "window", {
      value: {
        localStorage: {
          getItem: () => null,
          setItem: () => {
            throw new Error("quota exceeded");
          },
        },
      },
      configurable: true,
    });
    expect(saveTrainingLogs([])).toBe(false);
    expect(saveLocalProfile(defaultProfilePreferences)).toBe(false);
    expect(saveAxisVisibility(false)).toBe(false);
    expect(saveAtlasTheme("plum")).toBe(false);
    expect(
      saveSceneExperiencePreferences({ soundEnabled: true, lastScene: "home" })
    ).toBe(false);
    expect(
      saveAtlasInteractionPreferences({
        motionSpeed: "normal",
        blockEdits: {},
        heroEquipment: "cable",
        resistance: 54,
        recentEquipmentSession: null,
      })
    ).toBe(false);
  });

  it("keeps legacy records without distance fields and restores new meter-based distance records", () => {
    const legacy = parseBackup(
      JSON.stringify(
        createBackup(
          [
            {
              id: "legacy",
              date: "2026-08-14",
              exercise: "푸시업",
              sets: 2,
              reps: 8,
              load: 0,
              minutes: 10,
              intensity: 4,
            },
          ],
          defaultProfilePreferences
        )
      )
    );
    const modern = parseBackup(
      JSON.stringify(
        createBackup(
          [
            {
              id: "swim",
              date: "2026-08-14",
              exercise: "이지 수영",
              sets: 1,
              reps: 1,
              load: 0,
              minutes: 12,
              intensity: 4,
              distance: 400,
              distanceUnit: "m",
            },
          ],
          defaultProfilePreferences
        )
      )
    );
    expect(legacy.logs[0]).not.toHaveProperty("distance");
    expect(modern.logs[0]).toMatchObject({ distance: 400, distanceUnit: "m" });
  });

  it("preserves legacy and new distance-unit logs through localStorage", () => {
    installLocalStorage();
    const logs = [
      {
        id: "legacy",
        date: "2026-08-14",
        exercise: "푸시업",
        sets: 2,
        reps: 8,
        load: 0,
        minutes: 10,
        intensity: 4,
      },
      {
        id: "row",
        date: "2026-08-14",
        exercise: "로잉 에르고미터",
        sets: 1,
        reps: 1,
        load: 0,
        minutes: 8,
        intensity: 4,
        distance: 2000,
        distanceUnit: "m" as const,
      },
    ];
    saveTrainingLogs(logs);
    expect(readTrainingLogs()).toEqual(logs);
  });

  it("carries the weekly readiness history and edited session blocks", () => {
    const romStatusHistory = [
      {
        date: "2026-08-20",
        energy: 4,
        sleep: 3,
        stress: 2,
        pain: 1,
        recommendedRom: "보통" as const,
      },
    ];
    const atlasInteraction = {
      ...defaultAtlasInteractionPreferences,
      resistance: 72,
      blockEdits: {
        "all_round-home-30-1": {
          label: "내가 고친 블록",
          minutes: 12,
          items: ["A"],
        },
      },
    };
    const restored = parseBackup(
      JSON.stringify(
        createBackup(
          [],
          defaultProfilePreferences,
          undefined,
          undefined,
          undefined,
          romStatusHistory,
          atlasInteraction
        )
      )
    );
    expect(restored.romStatusHistory).toEqual(romStatusHistory);
    expect(restored.atlasInteraction.resistance).toBe(72);
    expect(
      restored.atlasInteraction.blockEdits["all_round-home-30-1"].label
    ).toBe("내가 고친 블록");
  });

  it("still reads a version 4 backup that predates those fields", () => {
    const restored = parseBackup(
      JSON.stringify({
        version: 4,
        exportedAt: "2026-08-20T00:00:00.000Z",
        logs: [],
        profile: defaultProfilePreferences,
        checkin: {
          date: "2026-08-20",
          energy: 3,
          sleep: 3,
          stress: 3,
          pain: 1,
        },
        weeklyPlan: createWeeklyPlan(),
        explorePreferences: defaultExplorePreferences,
      })
    );
    expect(restored.romStatusHistory).toEqual([]);
    expect(restored.atlasInteraction).toEqual(
      defaultAtlasInteractionPreferences
    );
  });

  it("rejects an invalid backup format", () => {
    expect(() =>
      parseBackup(
        JSON.stringify({ version: 4, logs: [], profile: {}, checkin: {} })
      )
    ).toThrow("지원하지 않는 백업 파일입니다.");
  });

  it("migrates version 2 backups by creating a safe current weekly plan", () => {
    const restored = parseBackup(
      JSON.stringify({
        version: 2,
        logs: [],
        profile: defaultProfilePreferences,
        checkin: {
          date: "2026-08-14",
          energy: 3,
          sleep: 3,
          stress: 3,
          pain: 1,
        },
      })
    );
    expect(restored.version).toBe(5);
    expect(restored.weeklyPlan.sessions).toHaveLength(3);
  });

  it("round-trips favorites, recent exercises, and filter presets while safely migrating version 3 backups", () => {
    const preferences = {
      favoriteExerciseIds: ["squat"],
      recentExerciseIds: ["run", "squat"],
      filterPresets: [
        {
          id: "strength",
          name: "근력 집중",
          keyword: "",
          category: "헬스기구",
          focus: "근력",
          region: "전체",
          difficulty: "중급",
          equipment: "장비 필요",
          sort: "recommended",
          rom: "전체",
        },
      ],
    };
    const restored = parseBackup(
      JSON.stringify(
        createBackup(
          [],
          defaultProfilePreferences,
          undefined,
          undefined,
          preferences
        )
      )
    );
    expect(restored.explorePreferences).toEqual(preferences);
    const legacy = parseBackup(
      JSON.stringify({
        version: 3,
        logs: [],
        profile: defaultProfilePreferences,
        checkin: {
          date: "2026-08-14",
          energy: 3,
          sleep: 3,
          stress: 3,
          pain: 1,
        },
        weeklyPlan: createWeeklyPlan(),
      })
    );
    expect(legacy.explorePreferences).toEqual({
      favoriteExerciseIds: [],
      recentExerciseIds: [],
      filterPresets: [],
    });
  });
});
