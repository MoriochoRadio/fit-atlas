import type { ProfilePreferences } from "./profilePreferences";
import { defaultProfilePreferences, readProfilePreferences } from "./profilePreferences";
import type { TrainingLog } from "./trainingMetrics";
import { defaultDailyCheckin, readDailyCheckin, type DailyCheckin } from "./dailyCheckin";
import { createWeeklyPlan, readWeeklyPlan, type WeeklyPlan } from "./weeklyPlan";
import { defaultExplorePreferences, readExplorePreferences, type ExplorePreferences } from "./explorePreferences";
import { readRomStatusHistory, type RomStatusRecord } from "./romStatusHistory";

const LOGS_KEY = "fit-atlas-logs";
const PROFILE_KEY = "fit-atlas-profile";
const CHECKIN_KEY = "fit-atlas-daily-checkin";
const WEEKLY_PLAN_KEY = "fit-atlas-weekly-plan";
const EXPLORE_PREFERENCES_KEY = "fit-atlas-explore-preferences";
const AXIS_VISIBILITY_KEY = "fit-atlas-axis-visibility";
const ROM_STATUS_HISTORY_KEY = "fit-atlas-rom-status-history";
const ATLAS_THEME_KEY = "fit-atlas-atlas-theme";

export const atlasThemes = ["lime", "ocean", "coral", "plum"] as const;
export type AtlasTheme = (typeof atlasThemes)[number];
export const defaultAtlasTheme: AtlasTheme = "lime";

function persistLocalValue(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

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
  return persistLocalValue(LOGS_KEY, logs);
}

export function readLocalProfile() {
  return typeof window === "undefined" ? defaultProfilePreferences : readProfilePreferences(window.localStorage.getItem(PROFILE_KEY));
}

export function saveLocalProfile(profile: ProfilePreferences) {
  return persistLocalValue(PROFILE_KEY, profile);
}

export function readLocalCheckin() {
  return typeof window === "undefined" ? defaultDailyCheckin : readDailyCheckin(window.localStorage.getItem(CHECKIN_KEY));
}

export function saveLocalCheckin(checkin: DailyCheckin) {
  return persistLocalValue(CHECKIN_KEY, checkin);
}

export function readLocalWeeklyPlan() {
  return typeof window === "undefined" ? createWeeklyPlan() : readWeeklyPlan(window.localStorage.getItem(WEEKLY_PLAN_KEY));
}

export function saveLocalWeeklyPlan(plan: WeeklyPlan) {
  return persistLocalValue(WEEKLY_PLAN_KEY, plan);
}

export function readLocalExplorePreferences() {
  return typeof window === "undefined" ? defaultExplorePreferences : readExplorePreferences(window.localStorage.getItem(EXPLORE_PREFERENCES_KEY));
}

export function saveLocalExplorePreferences(preferences: ExplorePreferences) {
  return persistLocalValue(EXPLORE_PREFERENCES_KEY, preferences);
}

export function readAxisVisibility() {
  try {
    const value = JSON.parse(window.localStorage.getItem(AXIS_VISIBILITY_KEY) ?? "true");
    return typeof value === "boolean" ? value : true;
  } catch {
    return true;
  }
}

export function saveAxisVisibility(visible: boolean) {
  return persistLocalValue(AXIS_VISIBILITY_KEY, visible);
}

export function readAtlasTheme(): AtlasTheme {
  try {
    const value = JSON.parse(window.localStorage.getItem(ATLAS_THEME_KEY) ?? JSON.stringify(defaultAtlasTheme));
    return atlasThemes.includes(value) ? value : defaultAtlasTheme;
  } catch {
    return defaultAtlasTheme;
  }
}

export function saveAtlasTheme(theme: AtlasTheme) {
  return persistLocalValue(ATLAS_THEME_KEY, theme);
}

export function readLocalRomStatusHistory() {
  return typeof window === "undefined" ? [] : readRomStatusHistory(window.localStorage.getItem(ROM_STATUS_HISTORY_KEY));
}

export function saveLocalRomStatusHistory(records: RomStatusRecord[]) {
  return persistLocalValue(ROM_STATUS_HISTORY_KEY, records);
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
