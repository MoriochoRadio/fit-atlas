import type {
  RecoveryReflection,
  RecoveryRoutineRecord,
} from "./wellnessPreferences";

export type RecoveryHistorySummary = {
  total: number;
  reflections: Record<RecoveryReflection, number>;
  durations: Record<5 | 10, number>;
  mostUsedDuration: 5 | 10 | null;
};

export function summarizeRecoveryHistory(
  history: RecoveryRoutineRecord[]
): RecoveryHistorySummary {
  const reflections: Record<RecoveryReflection, number> = {
    lighter: 0,
    same: 0,
    pause: 0,
  };
  const durations: Record<5 | 10, number> = { 5: 0, 10: 0 };
  history.forEach(record => {
    durations[record.duration] += 1;
    if (record.reflection) reflections[record.reflection] += 1;
  });
  const mostUsedDuration =
    history.length === 0 ? null : durations[10] > durations[5] ? 10 : 5;
  return { total: history.length, reflections, durations, mostUsedDuration };
}
