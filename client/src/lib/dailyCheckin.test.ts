import { describe, expect, it } from "vitest";
import { getCheckinRecommendation, readDailyCheckin } from "./dailyCheckin";

describe("daily check-in", () => {
  it("keeps check-in values within their supported local range", () => {
    expect(
      readDailyCheckin(
        '{"date":"2026-08-14","energy":9,"sleep":3,"stress":2,"pain":0}'
      )
    ).toMatchObject({ energy: 3, sleep: 3, stress: 2, pain: 1 });
    expect(readDailyCheckin("broken").energy).toBe(3);
  });

  it("accepts half-step check-in values while rejecting unsupported precision", () => {
    expect(
      readDailyCheckin(
        '{"date":"2026-08-14","energy":2.5,"sleep":3.5,"stress":2,"pain":1.5}'
      )
    ).toMatchObject({ energy: 2.5, sleep: 3.5, pain: 1.5 });
    expect(
      readDailyCheckin(
        '{"date":"2026-08-14","energy":2.2,"sleep":3,"stress":2,"pain":1}'
      ).energy
    ).toBe(3);
  });

  it("prioritizes pain and otherwise offers conservative readiness adjustments", () => {
    expect(
      getCheckinRecommendation({
        date: "2026-08-14",
        energy: 5,
        sleep: 5,
        stress: 1,
        pain: 4,
      }).mode
    ).toBe("stop_and_assess");
    expect(
      getCheckinRecommendation({
        date: "2026-08-14",
        energy: 1,
        sleep: 1,
        stress: 5,
        pain: 1,
      }).mode
    ).toBe("recovery");
    expect(
      getCheckinRecommendation({
        date: "2026-08-14",
        energy: 4,
        sleep: 4,
        stress: 2,
        pain: 1,
      }).mode
    ).toBe("ready");
  });
});
