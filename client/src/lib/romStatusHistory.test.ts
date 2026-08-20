import { describe, expect, it } from "vitest";
import { createRomStatusRecord, getCurrentWeekRomStatus, mergeRomStatusHistory, readRomStatusHistory } from "./romStatusHistory";

describe("ROM status history", () => {
  it("captures each day’s check-in and replaces only that day’s prior state", () => {
    const first = createRomStatusRecord({ date: "2026-08-17", energy: 2, sleep: 2, stress: 4, pain: 2 });
    const next = createRomStatusRecord({ date: "2026-08-17", energy: 4, sleep: 4, stress: 2, pain: 1 });
    expect(mergeRomStatusHistory([first], next)).toEqual([next]);
  });

  it("returns seven calendar slots without fabricating missing status data", () => {
    const record = createRomStatusRecord({ date: "2026-08-18", energy: 3, sleep: 3, stress: 3, pain: 1 });
    const week = getCurrentWeekRomStatus([record], new Date("2026-08-20T12:00:00"));
    expect(week).toHaveLength(7);
    expect(week.find((item) => item.date === "2026-08-18")?.record).toEqual(record);
    expect(week.filter((item) => !item.record)).not.toHaveLength(0);
    expect(readRomStatusHistory("not-json")).toEqual([]);
  });
});
