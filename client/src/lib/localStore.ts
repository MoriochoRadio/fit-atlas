import type { ProfilePreferences } from "./profilePreferences";
import { defaultProfilePreferences, readProfilePreferences } from "./profilePreferences";
import type { TrainingLog } from "./trainingMetrics";
import { defaultDailyCheckin, readDailyCheckin, type DailyCheckin } from "./dailyCheckin";

const LOGS_KEY = "fit-atlas-logs";
const PROFILE_KEY = "fit-atlas-profile";
const CHECKIN_KEY = "fit-atlas-daily-checkin";

export type FitAtlasBackup = {
  version: 2;
  exportedAt: string;
  logs: TrainingLog[];
  profile: ProfilePreferences;
  checkin: DailyCheckin;
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

export function readLocalCheckin() {
  return typeof window === "undefined" ? defaultDailyCheckin : readDailyCheckin(window.localStorage.getItem(CHECKIN_KEY));
}

export function saveLocalCheckin(checkin: DailyCheckin) {
  window.localStorage.setItem(CHECKIN_KEY, JSON.stringify(checkin));
}

export function createBackup(logs: TrainingLog[], profile: ProfilePreferences, checkin: DailyCheckin = defaultDailyCheckin): FitAtlasBackup {
  return { version: 2, exportedAt: new Date().toISOString(), logs, profile, checkin };
}

export function downloadBackup(logs: TrainingLog[], profile: ProfilePreferences, checkin: DailyCheckin) {
  const blob = new Blob([JSON.stringify(createBackup(logs, profile, checkin), null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `fit-atlas-backup-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

export function parseBackup(serialized: string): FitAtlasBackup {
  const value = JSON.parse(serialized) as { version?: number; exportedAt?: unknown; logs?: unknown; profile?: unknown; checkin?: unknown };
  if ((value.version !== 1 && value.version !== 2) || !Array.isArray(value.logs) || !value.profile) throw new Error("지원하지 않는 백업 파일입니다.");
  if (value.version === 2 && value.checkin === undefined) throw new Error("지원하지 않는 백업 파일입니다.");
  return { version: 2, exportedAt: typeof value.exportedAt === "string" ? value.exportedAt : "", logs: value.logs as TrainingLog[], profile: readProfilePreferences(JSON.stringify(value.profile)), checkin: readDailyCheckin(JSON.stringify(value.checkin ?? defaultDailyCheckin)) };
}
