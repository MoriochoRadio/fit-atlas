import { describe, expect, it } from "vitest";
import { summarizeRecoveryHistory } from "./recoveryHistorySummary";

describe("recovery history summary", () => {
  it("counts recorded reflections and routine durations", () => {
    const summary = summarizeRecoveryHistory([
      {
        duration: 5,
        completedOn: "2026-08-21",
        completedAt: "2026-08-21T10:00:00.000Z",
        reflection: "lighter",
        note: "",
      },
      {
        duration: 10,
        completedOn: "2026-08-21",
        completedAt: "2026-08-21T09:00:00.000Z",
        reflection: "same",
        note: "",
      },
      {
        duration: 5,
        completedOn: "2026-08-20",
        completedAt: "2026-08-20T10:00:00.000Z",
        reflection: null,
        note: "",
      },
    ]);

    expect(summary).toEqual({
      total: 3,
      reflections: { lighter: 1, same: 1, pause: 0 },
      durations: { 5: 2, 10: 1 },
      mostUsedDuration: 5,
    });
  });

  it("returns an empty summary without inferring a preferred routine", () => {
    expect(summarizeRecoveryHistory([])).toEqual({
      total: 0,
      reflections: { lighter: 0, same: 0, pause: 0 },
      durations: { 5: 0, 10: 0 },
      mostUsedDuration: null,
    });
  });
});
