import { exercises } from "./fitnessData";
import { getVolume, type TrainingLog } from "./trainingMetrics";

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

export function getAerobicIntensityInsight(logs: TrainingLog[], referenceDate = new Date()) {
  const nameMap = new Map(exercises.map((exercise) => [exercise.name, exercise]));
  const start = new Date(referenceDate.getTime() - 6 * DAY_MS);
  const aerobic = logs.filter((log) => log.date >= isoDay(start) && log.date <= isoDay(referenceDate) && ["러닝", "유산소"].includes(nameMap.get(log.exercise)?.category ?? ""));
  if (aerobic.length === 0) return { sessions: 0, minutes: 0, distanceKm: 0, averageRpe: 0, paceMinutesPerKm: undefined, band: "기록 대기", label: "러닝·유산소 기록을 추가하면 시간·거리·자각강도를 함께 읽습니다." };
  const minutes = aerobic.reduce((sum, log) => sum + log.minutes, 0);
  const distanceKm = aerobic.reduce((sum, log) => sum + (log.distanceKm ?? 0), 0);
  const averageRpe = Math.round((aerobic.reduce((sum, log) => sum + log.intensity, 0) / aerobic.length) * 10) / 10;
  const paceMinutesPerKm = distanceKm > 0 ? Math.round((minutes / distanceKm) * 10) / 10 : undefined;
  const band = averageRpe <= 4 ? "편안한 범위" : averageRpe <= 6 ? "중강도 근처" : "고강도 가능";
  const talkTest = averageRpe <= 6 ? "말은 가능하지만 노래하기 어려운지 확인" : "몇 단어 뒤 숨을 고르게 되면 구간을 줄이기";
  const paceLabel = paceMinutesPerKm ? ` · 평균 ${paceMinutesPerKm}분/km` : " · 거리 미입력";
  return { sessions: aerobic.length, minutes, distanceKm, averageRpe, paceMinutesPerKm, band, label: `최근 ${aerobic.length}회 · ${minutes}분${paceLabel} · ${talkTest}` };
}

export function getExerciseTrend(logs: TrainingLog[], referenceDate = new Date()) {
  const currentStart = new Date(referenceDate.getTime() - 6 * DAY_MS);
  const previousStart = new Date(referenceDate.getTime() - 13 * DAY_MS);
  const previousEnd = new Date(referenceDate.getTime() - 7 * DAY_MS);
  const totals = new Map<string, { current: number; previous: number }>();
  logs.forEach((log) => {
    const score = Math.max(getVolume(log), log.minutes * log.intensity);
    const current = log.date >= isoDay(currentStart) && log.date <= isoDay(referenceDate);
    const previous = log.date >= isoDay(previousStart) && log.date <= isoDay(previousEnd);
    if (!current && !previous) return;
    const entry = totals.get(log.exercise) ?? { current: 0, previous: 0 };
    entry.current += current ? score : 0;
    entry.previous += previous ? score : 0;
    totals.set(log.exercise, entry);
  });
  const lead = Array.from(totals.entries()).filter(([, values]) => values.current > 0).sort(([, a], [, b]) => b.current - a.current)[0];
  if (!lead) return { exercise: undefined, current: 0, previous: 0, direction: "기록 대기", label: "최근 기록이 쌓이면 운동별 변화 방향을 확인합니다." };
  const [exercise, values] = lead;
  const direction = values.previous === 0 ? "새로운 기록" : values.current > values.previous ? "상승" : values.current < values.previous ? "감소" : "유지";
  return { exercise, ...values, direction, label: `${exercise} · 지난 7일 대비 ${direction} 경향` };
}

export function getConsecutiveDayStreak(logs: TrainingLog[], referenceDate = new Date()) {
  const eligibleDays = Array.from(new Set(logs.filter((log) => log.date <= isoDay(referenceDate)).map((log) => log.date))).sort().reverse();
  if (eligibleDays.length === 0) return { days: 0, label: "운동 기록을 시작하면 연속일을 확인합니다." };
  let days = 1;
  let cursor = new Date(`${eligibleDays[0]}T12:00:00.000Z`);
  for (let index = 1; index < eligibleDays.length; index += 1) {
    cursor.setUTCDate(cursor.getUTCDate() - 1);
    if (isoDay(cursor) !== eligibleDays[index]) break;
    days += 1;
  }
  return { days, label: `${eligibleDays[0].slice(5).replace("-", ".")} 기준 ${days}일 연속 기록` };
}

export function getPersonalRecordTrend(logs: TrainingLog[], referenceDate = new Date()) {
  const currentStart = isoDay(new Date(referenceDate.getTime() - 6 * DAY_MS));
  const current = logs.filter((log) => log.date >= currentStart && log.date <= isoDay(referenceDate) && log.load > 0);
  if (current.length === 0) return { exercise: undefined, direction: "기록 대기", label: "중량 기록을 추가하면 최근 PR 변화를 확인합니다." };
  const prior = logs.filter((log) => log.date < currentStart && log.load > 0);
  const candidate = [...current].sort((a, b) => b.load - a.load)[0];
  const priorBest = prior.filter((log) => log.exercise === candidate.exercise).reduce((best, log) => Math.max(best, log.load), 0);
  const direction = priorBest === 0 || candidate.load > priorBest ? "새 PR" : candidate.load === priorBest ? "유지" : "기준 확인";
  return { exercise: candidate.exercise, direction, label: `${candidate.exercise} · ${candidate.load}kg · 이전 최고 ${priorBest || "없음"}kg` };
}

export function getInsightSummary(logs: TrainingLog[], referenceDate = new Date()) {
  const load = getTrainingLoad(logs, referenceDate);
  const consistency = getConsistency(logs, referenceDate);
  const balance = getRegionBalance(logs);
  const aerobic = getAerobicIntensityInsight(logs, referenceDate);
  const trend = getExerciseTrend(logs, referenceDate);
  const streak = getConsecutiveDayStreak(logs, referenceDate);
  const prTrend = getPersonalRecordTrend(logs, referenceDate);
  const lead = balance[0]?.region;
  const trailing = balance.length > 1 ? balance[balance.length - 1]?.region : undefined;
  return {
    load,
    consistency,
    balance,
    aerobic,
    trend,
    streak,
    prTrend,
    loadLabel: load.sessions === 0 ? "최근 7일 기록 없음" : `최근 7일 ${load.sessions}회 · ${load.minutes}분`,
    consistencyLabel: consistency.activeDays === 0 ? "기록을 시작해 보세요" : `최근 28일 ${consistency.activeDays}일 기록`,
    balanceLabel: lead ? `${lead} 중심 기록${trailing ? ` · ${trailing} 항목도 균형 있게 확인` : ""}` : "운동을 기록하면 부위 경향을 확인할 수 있어요",
  };
}
