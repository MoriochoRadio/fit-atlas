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
