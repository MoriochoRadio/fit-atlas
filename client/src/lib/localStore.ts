import type { ProfilePreferences } from "./profilePreferences";
import {
  defaultProfilePreferences,
  readProfilePreferences,
} from "./profilePreferences";
import type { TrainingLog } from "./trainingMetrics";
import {
  defaultDailyCheckin,
  readDailyCheckin,
  type DailyCheckin,
} from "./dailyCheckin";
import {
  createWeeklyPlan,
  readWeeklyPlan,
  type WeeklyPlan,
} from "./weeklyPlan";
import {
  defaultExplorePreferences,
  readExplorePreferences,
  type ExplorePreferences,
} from "./explorePreferences";
import { readRomStatusHistory, type RomStatusRecord } from "./romStatusHistory";

const LOGS_KEY = "fit-atlas-logs";
const PROFILE_KEY = "fit-atlas-profile";
const CHECKIN_KEY = "fit-atlas-daily-checkin";
const WEEKLY_PLAN_KEY = "fit-atlas-weekly-plan";
const EXPLORE_PREFERENCES_KEY = "fit-atlas-explore-preferences";
const AXIS_VISIBILITY_KEY = "fit-atlas-axis-visibility";
const ROM_STATUS_HISTORY_KEY = "fit-atlas-rom-status-history";
const ATLAS_THEME_KEY = "fit-atlas-atlas-theme";
const ATLAS_INTERACTION_KEY = "fit-atlas-atlas-interaction";
const SCENE_EXPERIENCE_KEY = "fit-atlas-scene-experience";

export const atlasThemes = ["lime", "ocean", "coral", "plum"] as const;
export type AtlasTheme = (typeof atlasThemes)[number];
export const defaultAtlasTheme: AtlasTheme = "lime";
export const atlasMotionSpeeds = ["slow", "normal", "fast"] as const;
export type AtlasMotionSpeed = (typeof atlasMotionSpeeds)[number];
export const heroEquipmentOptions = ["cable", "dumbbell", "treadmill"] as const;
export type HeroEquipment = (typeof heroEquipmentOptions)[number];
export type AtlasBlockEdit = {
  label: string;
  minutes: number;
  items: string[];
};
export type AtlasRecentEquipmentSession = {
  equipment: HeroEquipment;
  resistance: number;
  startedAt: number;
};
export type AtlasInteractionPreferences = {
  motionSpeed: AtlasMotionSpeed;
  blockEdits: Record<string, AtlasBlockEdit>;
  heroEquipment: HeroEquipment;
  resistance: number;
  recentEquipmentSession: AtlasRecentEquipmentSession | null;
};
export const defaultAtlasInteractionPreferences: AtlasInteractionPreferences = {
  motionSpeed: "normal",
  blockEdits: {},
  heroEquipment: "cable",
  resistance: 54,
  recentEquipmentSession: null,
};
export const cinematicScenes = [
  "home",
  "session",
  "explore",
  "anatomy",
  "progress",
  "wellness",
] as const;
export type CinematicScenePreference = (typeof cinematicScenes)[number];
export type SceneExperiencePreferences = {
  soundEnabled: boolean;
  lastScene: CinematicScenePreference;
};
export const defaultSceneExperiencePreferences: SceneExperiencePreferences = {
  soundEnabled: true,
  lastScene: "home",
};

function persistLocalValue(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export type FitAtlasBackup = {
  version: 5;
  exportedAt: string;
  logs: TrainingLog[];
  profile: ProfilePreferences;
  checkin: DailyCheckin;
  weeklyPlan: WeeklyPlan;
  explorePreferences: ExplorePreferences;
  /** 주간 피로·통증 기록. 버전 4까지는 빠져 있어 기기를 옮기면 사라졌다. */
  romStatusHistory: RomStatusRecord[];
  /** 사용자가 편집한 세션 블록과 최근 장비 설정. 마찬가지로 버전 4까지 빠져 있었다. */
  atlasInteraction: AtlasInteractionPreferences;
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
  return typeof window === "undefined"
    ? defaultProfilePreferences
    : readProfilePreferences(window.localStorage.getItem(PROFILE_KEY));
}

export function saveLocalProfile(profile: ProfilePreferences) {
  return persistLocalValue(PROFILE_KEY, profile);
}

export function readLocalCheckin() {
  return typeof window === "undefined"
    ? defaultDailyCheckin
    : readDailyCheckin(window.localStorage.getItem(CHECKIN_KEY));
}

/**
 * 저장된 체크인이 없으면 null 을 준다. readLocalCheckin 은 없을 때도 기본값을 돌려주므로
 * "사용자가 실제로 입력했는지"를 구분해야 하는 곳에서는 이쪽을 써야 한다.
 * 이 구분이 없어서 앱을 처음 연 것만으로 오늘 체크인이 기록되고,
 * 주간 대시보드가 "1/7일 입력"으로 보이는 문제가 있었다.
 */
export function readStoredCheckin(): DailyCheckin | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(CHECKIN_KEY);
  return raw === null ? null : readDailyCheckin(raw);
}

export function saveLocalCheckin(checkin: DailyCheckin) {
  return persistLocalValue(CHECKIN_KEY, checkin);
}

export function readLocalWeeklyPlan() {
  return typeof window === "undefined"
    ? createWeeklyPlan()
    : readWeeklyPlan(window.localStorage.getItem(WEEKLY_PLAN_KEY));
}

export function saveLocalWeeklyPlan(plan: WeeklyPlan) {
  return persistLocalValue(WEEKLY_PLAN_KEY, plan);
}

export function readLocalExplorePreferences() {
  return typeof window === "undefined"
    ? defaultExplorePreferences
    : readExplorePreferences(
        window.localStorage.getItem(EXPLORE_PREFERENCES_KEY)
      );
}

export function saveLocalExplorePreferences(preferences: ExplorePreferences) {
  return persistLocalValue(EXPLORE_PREFERENCES_KEY, preferences);
}

export function readAxisVisibility() {
  try {
    const value = JSON.parse(
      window.localStorage.getItem(AXIS_VISIBILITY_KEY) ?? "true"
    );
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
    const value = JSON.parse(
      window.localStorage.getItem(ATLAS_THEME_KEY) ??
        JSON.stringify(defaultAtlasTheme)
    );
    return atlasThemes.includes(value) ? value : defaultAtlasTheme;
  } catch {
    return defaultAtlasTheme;
  }
}

export function saveAtlasTheme(theme: AtlasTheme) {
  return persistLocalValue(ATLAS_THEME_KEY, theme);
}

function readAtlasBlockEdit(value: unknown): AtlasBlockEdit | null {
  if (!value || typeof value !== "object") return null;
  const entry = value as {
    label?: unknown;
    minutes?: unknown;
    items?: unknown;
  };
  if (
    typeof entry.label !== "string" ||
    typeof entry.minutes !== "number" ||
    !Number.isFinite(entry.minutes) ||
    !Array.isArray(entry.items) ||
    !entry.items.every(item => typeof item === "string")
  )
    return null;
  return {
    label: entry.label.slice(0, 40),
    minutes: Math.min(90, Math.max(1, Math.round(entry.minutes))),
    items: entry.items.filter(Boolean).slice(0, 8),
  };
}

/**
 * serialized 를 주면 그 문자열을, 주지 않으면 localStorage 를 읽는다.
 * 백업 파일에서 복원할 때 같은 검증을 다시 쓰기 위해 인자를 받는다.
 */
export function readAtlasInteractionPreferences(
  serialized?: string
): AtlasInteractionPreferences {
  try {
    const value = JSON.parse(
      serialized ??
        (typeof window === "undefined"
          ? "{}"
          : (window.localStorage.getItem(ATLAS_INTERACTION_KEY) ?? "{}"))
    );
    const motionSpeed = atlasMotionSpeeds.includes(value?.motionSpeed)
      ? value.motionSpeed
      : defaultAtlasInteractionPreferences.motionSpeed;
    const heroEquipment = heroEquipmentOptions.includes(value?.heroEquipment)
      ? value.heroEquipment
      : defaultAtlasInteractionPreferences.heroEquipment;
    const resistance =
      typeof value?.resistance === "number" && Number.isFinite(value.resistance)
        ? Math.max(0, Math.min(100, Math.round(value.resistance)))
        : defaultAtlasInteractionPreferences.resistance;
    const rawRecentSession = value?.recentEquipmentSession;
    const recentEquipmentSession =
      rawRecentSession &&
      typeof rawRecentSession === "object" &&
      heroEquipmentOptions.includes(rawRecentSession.equipment) &&
      typeof rawRecentSession.resistance === "number" &&
      Number.isFinite(rawRecentSession.resistance) &&
      typeof rawRecentSession.startedAt === "number" &&
      Number.isFinite(rawRecentSession.startedAt) &&
      rawRecentSession.startedAt > 0
        ? {
            equipment: rawRecentSession.equipment,
            resistance: Math.max(
              0,
              Math.min(100, Math.round(rawRecentSession.resistance))
            ),
            startedAt: Math.round(rawRecentSession.startedAt),
          }
        : null;
    const rawEdits =
      value?.blockEdits && typeof value.blockEdits === "object"
        ? (value.blockEdits as Record<string, unknown>)
        : {};
    const blockEdits = Object.fromEntries(
      Object.entries(rawEdits).flatMap(([key, item]) => {
        const edit = readAtlasBlockEdit(item);
        return edit ? [[key, edit]] : [];
      })
    );
    return {
      motionSpeed,
      blockEdits,
      heroEquipment,
      resistance,
      recentEquipmentSession,
    };
  } catch {
    return defaultAtlasInteractionPreferences;
  }
}

export function saveAtlasInteractionPreferences(
  preferences: AtlasInteractionPreferences
) {
  return persistLocalValue(ATLAS_INTERACTION_KEY, preferences);
}

export function readSceneExperiencePreferences(): SceneExperiencePreferences {
  try {
    const value = JSON.parse(
      window.localStorage.getItem(SCENE_EXPERIENCE_KEY) ?? "{}"
    );
    return {
      soundEnabled:
        typeof value?.soundEnabled === "boolean"
          ? value.soundEnabled
          : defaultSceneExperiencePreferences.soundEnabled,
      lastScene: cinematicScenes.includes(value?.lastScene)
        ? value.lastScene
        : defaultSceneExperiencePreferences.lastScene,
    };
  } catch {
    return defaultSceneExperiencePreferences;
  }
}

export function saveSceneExperiencePreferences(
  preferences: SceneExperiencePreferences
) {
  return persistLocalValue(SCENE_EXPERIENCE_KEY, preferences);
}

export function readLocalRomStatusHistory() {
  return typeof window === "undefined"
    ? []
    : readRomStatusHistory(window.localStorage.getItem(ROM_STATUS_HISTORY_KEY));
}

export function saveLocalRomStatusHistory(records: RomStatusRecord[]) {
  return persistLocalValue(ROM_STATUS_HISTORY_KEY, records);
}

export function createBackup(
  logs: TrainingLog[],
  profile: ProfilePreferences,
  checkin: DailyCheckin = defaultDailyCheckin,
  weeklyPlan: WeeklyPlan = createWeeklyPlan(),
  explorePreferences: ExplorePreferences = defaultExplorePreferences,
  romStatusHistory: RomStatusRecord[] = [],
  atlasInteraction: AtlasInteractionPreferences = defaultAtlasInteractionPreferences
): FitAtlasBackup {
  return {
    version: 5,
    exportedAt: new Date().toISOString(),
    logs,
    profile,
    checkin,
    weeklyPlan,
    explorePreferences,
    romStatusHistory,
    atlasInteraction,
  };
}

export function downloadBackup(
  logs: TrainingLog[],
  profile: ProfilePreferences,
  checkin: DailyCheckin,
  weeklyPlan: WeeklyPlan,
  explorePreferences: ExplorePreferences,
  romStatusHistory: RomStatusRecord[] = readLocalRomStatusHistory(),
  atlasInteraction: AtlasInteractionPreferences = readAtlasInteractionPreferences()
) {
  const blob = new Blob(
    [
      JSON.stringify(
        createBackup(
          logs,
          profile,
          checkin,
          weeklyPlan,
          explorePreferences,
          romStatusHistory,
          atlasInteraction
        ),
        null,
        2
      ),
    ],
    { type: "application/json" }
  );
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `fit-atlas-backup-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

export function parseBackup(serialized: string): FitAtlasBackup {
  const value = JSON.parse(serialized) as {
    version?: number;
    exportedAt?: unknown;
    logs?: unknown;
    profile?: unknown;
    checkin?: unknown;
    weeklyPlan?: unknown;
    explorePreferences?: unknown;
    romStatusHistory?: unknown;
    atlasInteraction?: unknown;
  };
  if (
    typeof value.version !== "number" ||
    value.version < 1 ||
    value.version > 5 ||
    !Array.isArray(value.logs) ||
    !value.profile
  )
    throw new Error("지원하지 않는 백업 파일입니다.");
  if (value.version === 2 && value.checkin === undefined)
    throw new Error("지원하지 않는 백업 파일입니다.");
  if (
    value.version >= 3 &&
    (value.checkin === undefined || value.weeklyPlan === undefined)
  )
    throw new Error("지원하지 않는 백업 파일입니다.");
  return {
    version: 5,
    exportedAt: typeof value.exportedAt === "string" ? value.exportedAt : "",
    logs: value.logs as TrainingLog[],
    profile: readProfilePreferences(JSON.stringify(value.profile)),
    checkin: readDailyCheckin(
      JSON.stringify(value.checkin ?? defaultDailyCheckin)
    ),
    weeklyPlan: readWeeklyPlan(
      JSON.stringify(value.weeklyPlan ?? createWeeklyPlan())
    ),
    explorePreferences: readExplorePreferences(
      JSON.stringify(value.explorePreferences ?? defaultExplorePreferences)
    ),
    // 버전 4 이하 백업에는 없다. 빈 값으로 복원해 기존 파일도 계속 읽힌다.
    romStatusHistory: readRomStatusHistory(
      JSON.stringify(value.romStatusHistory ?? [])
    ),
    atlasInteraction: readAtlasInteractionPreferences(
      JSON.stringify(
        value.atlasInteraction ?? defaultAtlasInteractionPreferences
      )
    ),
  };
}
