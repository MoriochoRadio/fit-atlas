import type { DailyCheckin } from "./dailyCheckin";
import { getRomReadinessRecommendation } from "./romReadiness";

export type RomStatusRecord = Pick<DailyCheckin, "date" | "energy" | "sleep" | "stress" | "pain"> & {
  recommendedRom: "작음" | "보통" | "회복";
};

export function createRomStatusRecord(checkin: DailyCheckin): RomStatusRecord {
  return { ...checkin, recommendedRom: getRomReadinessRecommendation(checkin).rom ?? "회복" };
}

export function mergeRomStatusHistory(records: RomStatusRecord[], next: RomStatusRecord): RomStatusRecord[] {
  return [...records.filter((record) => record.date !== next.date), next].sort((a, b) => a.date.localeCompare(b.date)).slice(-28);
}

export function readRomStatusHistory(serialized: string | null): RomStatusRecord[] {
  try {
    const value = JSON.parse(serialized ?? "[]") as unknown;
    if (!Array.isArray(value)) return [];
    return value.filter((record): record is RomStatusRecord => Boolean(record) && typeof record === "object" && typeof (record as RomStatusRecord).date === "string" && typeof (record as RomStatusRecord).energy === "number" && typeof (record as RomStatusRecord).pain === "number" && ["작음", "보통", "회복"].includes((record as RomStatusRecord).recommendedRom));
  } catch {
    return [];
  }
}

export function getCurrentWeekRomStatus(records: RomStatusRecord[], referenceDate = new Date()) {
  const start = new Date(referenceDate);
  start.setHours(12, 0, 0, 0);
  start.setDate(start.getDate() - ((start.getDay() + 6) % 7));
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    const key = date.toISOString().slice(0, 10);
    return { date: key, label: ["월", "화", "수", "목", "금", "토", "일"][index], record: records.find((item) => item.date === key) ?? null };
  });
}

export type MonthlyRomStatusWeek = {
  label: string;
  completionRate: number | null;
  fatigueAverage: number | null;
  recordedDays: number;
};

export function getFourWeekRomStatus(records: RomStatusRecord[], weeklyPlan: { weekStart: string; sessions: { completed: boolean }[] }, referenceDate = new Date()): MonthlyRomStatusWeek[] {
  const currentWeekStart = new Date(referenceDate);
  currentWeekStart.setHours(12, 0, 0, 0);
  currentWeekStart.setDate(currentWeekStart.getDate() - ((currentWeekStart.getDay() + 6) % 7));
  return Array.from({ length: 4 }, (_, index) => {
    const start = new Date(currentWeekStart);
    start.setDate(currentWeekStart.getDate() - (3 - index) * 7);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    const startKey = start.toISOString().slice(0, 10);
    const endKey = end.toISOString().slice(0, 10);
    const matches = records.filter((record) => record.date >= startKey && record.date <= endKey);
    const fatigueAverage = matches.length ? Math.round((matches.reduce((sum, record) => sum + (6 - record.energy + record.stress) / 2, 0) / matches.length) * 10) / 10 : null;
    const isCurrent = weeklyPlan.weekStart === startKey;
    const completionRate = isCurrent && weeklyPlan.sessions.length ? Math.round((weeklyPlan.sessions.filter((session) => session.completed).length / weeklyPlan.sessions.length) * 100) : null;
    return { label: `W${index + 1}`, completionRate, fatigueAverage, recordedDays: matches.length };
  });
}
