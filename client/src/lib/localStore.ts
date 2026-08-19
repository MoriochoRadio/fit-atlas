import type { ProfilePreferences } from "./profilePreferences";
import { defaultProfilePreferences, readProfilePreferences } from "./profilePreferences";
import type { TrainingLog } from "./trainingMetrics";
import { defaultDailyCheckin, readDailyCheckin, type DailyCheckin } from "./dailyCheckin";
import { createWeeklyPlan, readWeeklyPlan, type WeeklyPlan } from "./weeklyPlan";
import { defaultExplorePreferences, readExplorePreferences, type ExplorePreferences } from "./explorePreferences";

const LOGS_KEY = "fit-atlas-logs";
const PROFILE_KEY = "fit-atlas-profile";
const CHECKIN_KEY = "fit-atlas-daily-checkin";
const WEEKLY_PLAN_KEY = "fit-atlas-weekly-plan";
const EXPLORE_PREFERENCES_KEY = "fit-atlas-explore-preferences";

export type FitAtlasBackup = {
  version: 4;
  exportedAt: string;
  logs: TrainingLog[];
  profile: ProfilePreferences;
  checkin: DailyCheckin;
  weeklyPlan: WeeklyPlan;
  explorePreferences: ExplorePreferences;
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

export function readLocalWeeklyPlan() {
  return typeof window === "undefined" ? createWeeklyPlan() : readWeeklyPlan(window.localStorage.getItem(WEEKLY_PLAN_KEY));
}

export function saveLocalWeeklyPlan(plan: WeeklyPlan) {
  window.localStorage.setItem(WEEKLY_PLAN_KEY, JSON.stringify(plan));
}

export function readLocalExplorePreferences() {
  return typeof window === "undefined" ? defaultExplorePreferences : readExplorePreferences(window.localStorage.getItem(EXPLORE_PREFERENCES_KEY));
}

export function saveLocalExplorePreferences(preferences: ExplorePreferences) {
  window.localStorage.setItem(EXPLORE_PREFERENCES_KEY, JSON.stringify(preferences));
}

export function createBackup(logs: TrainingLog[], profile: ProfilePreferences, checkin: DailyCheckin = defaultDailyCheckin, weeklyPlan: WeeklyPlan = createWeeklyPlan(), explorePreferences: ExplorePreferences = defaultExplorePreferences): FitAtlasBackup {
  return { version: 4, exportedAt: new Date().toISOString(), logs, profile, checkin, weeklyPlan, explorePreferences };
}

export function downloadBackup(logs: TrainingLog[], profile: ProfilePreferences, checkin: DailyCheckin, weeklyPlan: WeeklyPlan, explorePreferences: ExplorePreferences) {
  const blob = new Blob([JSON.stringify(createBackup(logs, profile, checkin, weeklyPlan, explorePreferences), null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `fit-atlas-backup-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

export function parseBackup(serialized: string): FitAtlasBackup {
  const value = JSON.parse(serialized) as { version?: number; exportedAt?: unknown; logs?: unknown; profile?: unknown; checkin?: unknown; weeklyPlan?: unknown; explorePreferences?: unknown };
  if ((value.version !== 1 && value.version !== 2 && value.version !== 3 && value.version !== 4) || !Array.isArray(value.logs) || !value.profile) throw new Error("지원하지 않는 백업 파일입니다.");
  if (value.version === 2 && value.checkin === undefined) throw new Error("지원하지 않는 백업 파일입니다.");
  if ((value.version === 3 || value.version === 4) && (value.checkin === undefined || value.weeklyPlan === undefined)) throw new Error("지원하지 않는 백업 파일입니다.");
  return { version: 4, exportedAt: typeof value.exportedAt === "string" ? value.exportedAt : "", logs: value.logs as TrainingLog[], profile: readProfilePreferences(JSON.stringify(value.profile)), checkin: readDailyCheckin(JSON.stringify(value.checkin ?? defaultDailyCheckin)), weeklyPlan: readWeeklyPlan(JSON.stringify(value.weeklyPlan ?? createWeeklyPlan())), explorePreferences: readExplorePreferences(JSON.stringify(value.explorePreferences ?? defaultExplorePreferences)) };
}
