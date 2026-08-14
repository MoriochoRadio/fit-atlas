import type { ProfilePreferences } from "./profilePreferences";
import { defaultProfilePreferences, readProfilePreferences } from "./profilePreferences";
import type { TrainingLog } from "./trainingMetrics";

const LOGS_KEY = "fit-atlas-logs";
const PROFILE_KEY = "fit-atlas-profile";

export type FitAtlasBackup = {
  version: 1;
  exportedAt: string;
  logs: TrainingLog[];
  profile: ProfilePreferences;
};

export function readTrainingLogs(): TrainingLog[] {
  try {
    const value = JSON.parse(window.localStorage.getItem(LOGS_KEY) ?? "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

export function saveTrainingLogs(logs: TrainingLog[]) {
  window.localStorage.setItem(LOGS_KEY, JSON.stringify(logs));
}

export function readLocalProfile() {
  return typeof window === "undefined" ? defaultProfilePreferences : readProfilePreferences(window.localStorage.getItem(PROFILE_KEY));
}

export function saveLocalProfile(profile: ProfilePreferences) {
  window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function createBackup(logs: TrainingLog[], profile: ProfilePreferences): FitAtlasBackup {
  return { version: 1, exportedAt: new Date().toISOString(), logs, profile };
}

export function downloadBackup(logs: TrainingLog[], profile: ProfilePreferences) {
  const blob = new Blob([JSON.stringify(createBackup(logs, profile), null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `fit-atlas-backup-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

export function parseBackup(serialized: string): FitAtlasBackup {
  const value = JSON.parse(serialized) as Partial<FitAtlasBackup>;
  if (value.version !== 1 || !Array.isArray(value.logs) || !value.profile) throw new Error("지원하지 않는 백업 파일입니다.");
  return { version: 1, exportedAt: typeof value.exportedAt === "string" ? value.exportedAt : "", logs: value.logs, profile: readProfilePreferences(JSON.stringify(value.profile)) };
}
