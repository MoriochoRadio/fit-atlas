import type { SeatedRecoveryDuration } from "./seatedRecovery";

const WELLNESS_PREFERENCES_KEY = "fit-atlas-wellness-preferences";
const recoveryDurations: SeatedRecoveryDuration[] = [5, 10];

export type WellnessPreferences = { savedRecoveryDuration: SeatedRecoveryDuration | null };

export const defaultWellnessPreferences: WellnessPreferences = { savedRecoveryDuration: null };

export function readWellnessPreferences(serialized: string | null): WellnessPreferences {
  try {
    const value = JSON.parse(serialized ?? "{}");
    return { savedRecoveryDuration: recoveryDurations.includes(value?.savedRecoveryDuration) ? value.savedRecoveryDuration : null };
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
