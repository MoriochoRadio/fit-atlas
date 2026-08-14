import { describe, expect, it } from "vitest";
import { createBackup, parseBackup, readLocalProfile, readTrainingLogs, saveLocalProfile, saveTrainingLogs } from "./localStore";
import { defaultProfilePreferences } from "./profilePreferences";

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
    expect(restored.logs).toHaveLength(1);
    expect(restored.profile.recoveryContext).toBe("reduced_readiness");
  });

  it("persists logs and profiles locally, then safely handles malformed stored data", () => {
    const storage = installLocalStorage();
    const logs = [{ id: "log-1", date: "2026-08-14", exercise: "푸시업", sets: 3, reps: 10, load: 0, minutes: 20, intensity: 5 }];
    const profile = { ...defaultProfilePreferences, age: "30", recoveryContext: "reduced_readiness" };
    saveTrainingLogs(logs);
    saveLocalProfile(profile);
    expect(readTrainingLogs()).toEqual(logs);
    expect(readLocalProfile()).toEqual(profile);
    storage.setItem("fit-atlas-logs", "not-json");
    storage.setItem("fit-atlas-profile", "not-json");
    expect(readTrainingLogs()).toEqual([]);
    expect(readLocalProfile()).toEqual(defaultProfilePreferences);
  });

  it("rejects an invalid backup format", () => {
    expect(() => parseBackup(JSON.stringify({ version: 2, logs: [], profile: {} }))).toThrow("지원하지 않는 백업 파일입니다.");
  });
});
