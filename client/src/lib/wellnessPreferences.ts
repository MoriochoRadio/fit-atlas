import type { SeatedRecoveryDuration } from "./seatedRecovery";

const WELLNESS_PREFERENCES_KEY = "fit-atlas-wellness-preferences";
const recoveryDurations: SeatedRecoveryDuration[] = [5, 10];
const recoveryReflections = ["lighter", "same", "pause"] as const;

export type RecoveryReflection = (typeof recoveryReflections)[number];
export type RecoveryRoutineRecord = { duration: SeatedRecoveryDuration; completedOn: string; reflection: RecoveryReflection | null };
export type WellnessPreferences = { savedRecoveryDuration: SeatedRecoveryDuration | null; lastRecoveryRecord: RecoveryRoutineRecord | null };

export const defaultWellnessPreferences: WellnessPreferences = { savedRecoveryDuration: null, lastRecoveryRecord: null };

function readRecoveryRecord(value: unknown): RecoveryRoutineRecord | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Partial<RecoveryRoutineRecord>;
  if (!recoveryDurations.includes(record.duration as SeatedRecoveryDuration) || typeof record.completedOn !== "string" || record.completedOn.length === 0) return null;
  if (record.reflection !== null && !recoveryReflections.includes(record.reflection as RecoveryReflection)) return null;
  return { duration: record.duration as SeatedRecoveryDuration, completedOn: record.completedOn, reflection: record.reflection as RecoveryReflection | null };
}

export function readWellnessPreferences(serialized: string | null): WellnessPreferences {
  try {
    const value = JSON.parse(serialized ?? "{}");
    return {
      savedRecoveryDuration: recoveryDurations.includes(value?.savedRecoveryDuration) ? value.savedRecoveryDuration : null,
      lastRecoveryRecord: readRecoveryRecord(value?.lastRecoveryRecord),
    };
  } catch {
    return defaultWellnessPreferences;
  }
}

export function readLocalWellnessPreferences() {
  if (typeof window === "undefined") return defaultWellnessPreferences;
  return readWellnessPreferences(window.localStorage.getItem(WELLNESS_PREFERENCES_KEY));
}

export function saveLocalWellnessPreferences(preferences: WellnessPreferences) {
  try {
    window.localStorage.setItem(WELLNESS_PREFERENCES_KEY, JSON.stringify(preferences));
    return true;
  } catch {
    return false;
  }
}
