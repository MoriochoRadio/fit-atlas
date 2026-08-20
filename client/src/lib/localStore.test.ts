import { describe, expect, it } from "vitest";
import { createBackup, parseBackup, readAxisVisibility, readLocalExplorePreferences, readLocalProfile, readLocalWeeklyPlan, readTrainingLogs, saveAxisVisibility, saveLocalExplorePreferences, saveLocalProfile, saveLocalWeeklyPlan, saveTrainingLogs } from "./localStore";
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
  Object.defineProperty(globalThis, "window", { value: { localStorage }, configurable: true });
  return localStorage;
}

describe("local backup format", () => {
  it("round-trips profile and workout records without server data", () => {
    const backup = createBackup([{ id: "log-1", date: "2026-08-14", exercise: "푸시업", sets: 3, reps: 10, load: 0, minutes: 20, intensity: 5 }], { ...defaultProfilePreferences, recoveryContext: "reduced_readiness" });
    const restored = parseBackup(JSON.stringify(backup));
    expect(backup.version).toBe(4);
    expect(restored.logs).toHaveLength(1);
    expect(restored.profile.recoveryContext).toBe("reduced_readiness");
    expect(restored.weeklyPlan.sessions).toHaveLength(3);
    expect(restored.explorePreferences).toEqual({ favoriteExerciseIds: [], recentExerciseIds: [] });
  });

  it("persists logs and profiles locally, then safely handles malformed stored data", () => {
    const storage = installLocalStorage();
    const logs = [{ id: "log-1", date: "2026-08-14", exercise: "푸시업", sets: 3, reps: 10, load: 0, minutes: 20, intensity: 5 }];
    const profile = { ...defaultProfilePreferences, age: "30", recoveryContext: "reduced_readiness" };
    saveTrainingLogs(logs);
    saveLocalProfile(profile);
    const weeklyPlan = createWeeklyPlan("strength");
    saveLocalWeeklyPlan(weeklyPlan);
    const explorePreferences = { favoriteExerciseIds: ["squat"], recentExerciseIds: ["run", "squat"] };
    saveLocalExplorePreferences(explorePreferences);
    saveAxisVisibility(false);
    expect(readTrainingLogs()).toEqual(logs);
    expect(readLocalProfile()).toEqual(profile);
    expect(readLocalWeeklyPlan()).toEqual(weeklyPlan);
    expect(readLocalExplorePreferences()).toEqual(explorePreferences);
    expect(readAxisVisibility()).toBe(false);
    storage.setItem("fit-atlas-logs", "not-json");
    storage.setItem("fit-atlas-profile", "not-json");
    expect(readTrainingLogs()).toEqual([]);
    expect(readLocalProfile()).toEqual(defaultProfilePreferences);
  });

  it("reports a storage failure instead of throwing when browser persistence is unavailable", () => {
    Object.defineProperty(globalThis, "window", { value: { localStorage: { getItem: () => null, setItem: () => { throw new Error("quota exceeded"); } } }, configurable: true });

    expect(saveTrainingLogs([])).toBe(false);
    expect(saveLocalProfile(defaultProfilePreferences)).toBe(false);
    expect(saveAxisVisibility(false)).toBe(false);
  });

  it("keeps legacy records without distance fields and restores new meter-based distance records", () => {
    const legacy = parseBackup(JSON.stringify(createBackup([{ id: "legacy", date: "2026-08-14", exercise: "푸시업", sets: 2, reps: 8, load: 0, minutes: 10, intensity: 4 }], defaultProfilePreferences)));
    const modern = parseBackup(JSON.stringify(createBackup([{ id: "swim", date: "2026-08-14", exercise: "이지 수영", sets: 1, reps: 1, load: 0, minutes: 12, intensity: 4, distance: 400, distanceUnit: "m" }], defaultProfilePreferences)));
    expect(legacy.logs[0]).not.toHaveProperty("distance");
    expect(modern.logs[0]).toMatchObject({ distance: 400, distanceUnit: "m" });
  });

  it("preserves legacy and new distance-unit logs through localStorage", () => {
    installLocalStorage();
    const logs = [{ id: "legacy", date: "2026-08-14", exercise: "푸시업", sets: 2, reps: 8, load: 0, minutes: 10, intensity: 4 }, { id: "row", date: "2026-08-14", exercise: "로잉 에르고미터", sets: 1, reps: 1, load: 0, minutes: 8, intensity: 4, distance: 2000, distanceUnit: "m" as const }];
    saveTrainingLogs(logs);
    expect(readTrainingLogs()).toEqual(logs);
  });

  it("rejects an invalid backup format", () => {
    expect(() => parseBackup(JSON.stringify({ version: 4, logs: [], profile: {}, checkin: {} }))).toThrow("지원하지 않는 백업 파일입니다.");
  });

  it("migrates version 2 backups by creating a safe current weekly plan", () => {
    const restored = parseBackup(JSON.stringify({ version: 2, logs: [], profile: defaultProfilePreferences, checkin: { date: "2026-08-14", energy: 3, sleep: 3, stress: 3, pain: 1 } }));
    expect(restored.version).toBe(4);
    expect(restored.weeklyPlan.sessions).toHaveLength(3);
  });

  it("round-trips favorites and recent exercises while safely migrating version 3 backups", () => {
    const preferences = { favoriteExerciseIds: ["squat"], recentExerciseIds: ["run", "squat"] };
    const restored = parseBackup(JSON.stringify(createBackup([], defaultProfilePreferences, undefined, undefined, preferences)));
    expect(restored.explorePreferences).toEqual(preferences);

    const legacy = parseBackup(JSON.stringify({ version: 3, logs: [], profile: defaultProfilePreferences, checkin: { date: "2026-08-14", energy: 3, sleep: 3, stress: 3, pain: 1 }, weeklyPlan: createWeeklyPlan() }));
    expect(legacy.explorePreferences).toEqual({ favoriteExerciseIds: [], recentExerciseIds: [] });
  });
});
