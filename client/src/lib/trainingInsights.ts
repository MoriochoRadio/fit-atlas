import { exercises } from "./fitnessData";
import type { TrainingLog } from "./trainingMetrics";

const DAY_MS = 86_400_000;

function isoDay(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function getTrainingLoad(logs: TrainingLog[], referenceDate = new Date()) {
  const start = new Date(referenceDate.getTime() - 6 * DAY_MS);
  const startKey = isoDay(start);
  const endKey = isoDay(referenceDate);
  const current = logs.filter((log) => log.date >= startKey && log.date <= endKey);
  const load = current.reduce((sum, log) => sum + log.minutes * log.intensity, 0);
  return { load, sessions: current.length, minutes: current.reduce((sum, log) => sum + log.minutes, 0) };
}

export function getConsistency(logs: TrainingLog[], referenceDate = new Date()) {
  const start = new Date(referenceDate.getTime() - 27 * DAY_MS);
  const days = new Set(logs.filter((log) => log.date >= isoDay(start) && log.date <= isoDay(referenceDate)).map((log) => log.date));
  return { activeDays: days.size, possibleDays: 28, weeklyAverage: Math.round((days.size / 4) * 10) / 10 };
}

export function getRegionBalance(logs: TrainingLog[]) {
  const nameMap = new Map(exercises.map((exercise) => [exercise.name, exercise]));
  const totals = new Map<string, number>();
  logs.forEach((log) => {
    const exercise = nameMap.get(log.exercise);
    if (!exercise) return;
    const score = Math.max(log.sets * log.reps * Math.max(log.load, 1), log.minutes * log.intensity);
    exercise.regions.forEach((region) => totals.set(region, (totals.get(region) ?? 0) + score));
  });
  return Array.from(totals.entries()).map(([region, score]) => ({ region, score })).sort((a, b) => b.score - a.score);
}

export function getInsightSummary(logs: TrainingLog[], referenceDate = new Date()) {
  const load = getTrainingLoad(logs, referenceDate);
  const consistency = getConsistency(logs, referenceDate);
  const balance = getRegionBalance(logs);
  const lead = balance[0]?.region;
  const trailing = balance.length > 1 ? balance[balance.length - 1]?.region : undefined;
  return {
    load,
    consistency,
    balance,
    loadLabel: load.sessions === 0 ? "최근 7일 기록 없음" : `최근 7일 ${load.sessions}회 · ${load.minutes}분`,
    consistencyLabel: consistency.activeDays === 0 ? "기록을 시작해 보세요" : `최근 28일 ${consistency.activeDays}일 기록`,
    balanceLabel: lead ? `${lead} 중심 기록${trailing ? ` · ${trailing} 항목도 균형 있게 확인` : ""}` : "운동을 기록하면 부위 경향을 확인할 수 있어요",
  };
}
