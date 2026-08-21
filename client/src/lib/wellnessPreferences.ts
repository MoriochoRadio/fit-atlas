import type { SeatedRecoveryDuration } from "./seatedRecovery";

const WELLNESS_PREFERENCES_KEY = "fit-atlas-wellness-preferences";
const recoveryDurations: SeatedRecoveryDuration[] = [5, 10];
const recoveryReflections = ["lighter", "same", "pause"] as const;
const recoveryHistoryLimit = 6;
export const recoveryNoteMaxLength = 160;

export type RecoveryReflection = (typeof recoveryReflections)[number];
export type RecoveryRoutineRecord = { duration: SeatedRecoveryDuration; completedOn: string; completedAt: string | null; reflection: RecoveryReflection | null; note: string };
export type WellnessPreferences = { savedRecoveryDuration: SeatedRecoveryDuration | null; lastRecoveryRecord: RecoveryRoutineRecord | null; recoveryHistory: RecoveryRoutineRecord[] };

export const defaultWellnessPreferences: WellnessPreferences = { savedRecoveryDuration: null, lastRecoveryRecord: null, recoveryHistory: [] };

function readRecoveryRecord(value: unknown): RecoveryRoutineRecord | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Partial<RecoveryRoutineRecord>;
  if (!recoveryDurations.includes(record.duration as SeatedRecoveryDuration) || typeof record.completedOn !== "string" || record.completedOn.length === 0) return null;
  if (record.completedAt !== undefined && record.completedAt !== null && typeof record.completedAt !== "string") return null;
  if (record.reflection !== null && !recoveryReflections.includes(record.reflection as RecoveryReflection)) return null;
  return { duration: record.duration as SeatedRecoveryDuration, completedOn: record.completedOn, completedAt: record.completedAt ?? null, reflection: record.reflection as RecoveryReflection | null, note: typeof record.note === "string" ? record.note.slice(0, recoveryNoteMaxLength) : "" };
}

function recoveryRecordTimestamp(record: RecoveryRoutineRecord) {
  return Date.parse(record.completedAt ?? record.completedOn) || 0;
}

function readRecoveryHistory(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.map(readRecoveryRecord).filter((record): record is RecoveryRoutineRecord => record !== null).sort((left, right) => recoveryRecordTimestamp(right) - recoveryRecordTimestamp(left)).slice(0, recoveryHistoryLimit);
}

export function readWellnessPreferences(serialized: string | null): WellnessPreferences {
  try {
    const value = JSON.parse(serialized ?? "{}");
    const lastRecoveryRecord = readRecoveryRecord(value?.lastRecoveryRecord);
    const recoveryHistory = readRecoveryHistory(value?.recoveryHistory);
    return {
      savedRecoveryDuration: recoveryDurations.includes(value?.savedRecoveryDuration) ? value.savedRecoveryDuration : null,
      lastRecoveryRecord,
      recoveryHistory: recoveryHistory.length > 0 ? recoveryHistory : lastRecoveryRecord ? [lastRecoveryRecord] : [],
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
