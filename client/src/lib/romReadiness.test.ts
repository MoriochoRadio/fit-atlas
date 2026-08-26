import { describe, expect, it } from "vitest";
import { getRomReadinessRecommendation } from "./romReadiness";

describe("ROM readiness recommendation", () => {
  it("prioritizes a smaller range when fatigue or pain signals are elevated", () => {
    expect(
      getRomReadinessRecommendation({
        date: "2026-08-20",
        energy: 1,
        sleep: 2,
        stress: 4,
        pain: 2,
      }).rom
    ).toBe("작음");
    expect(
      getRomReadinessRecommendation({
        date: "2026-08-20",
        energy: 3,
        sleep: 3,
        stress: 3,
        pain: 4,
      }).rom
    ).toBeNull();
  });

  it("starts with a moderate range when readiness is stable", () => {
    expect(
      getRomReadinessRecommendation({
        date: "2026-08-20",
        energy: 4,
        sleep: 4,
        stress: 2,
        pain: 1,
      }).rom
    ).toBe("보통");
  });
});
