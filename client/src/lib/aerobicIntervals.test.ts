import { describe, expect, it } from "vitest";
import { aerobicIntervalTemplates, getIntervalAdjustment } from "./aerobicIntervals";

describe("aerobic interval templates", () => {
  it("covers running, cycling, rowing, and swimming with conservative safety guidance", () => {
    expect(aerobicIntervalTemplates.map((template) => template.id)).toEqual(["run", "cycle", "row", "swim"]);
    aerobicIntervalTemplates.forEach((template) => {
      expect(template.warmup.length).toBeGreaterThan(5);
      expect(template.rpe).toContain("RPE");
      expect(template.safety.length).toBeGreaterThan(15);
    });
  });

  it("adds a lower-readiness adjustment without altering the base template", () => {
    expect(getIntervalAdjustment(aerobicIntervalTemplates[0]!, "reduced")).toContain("반복을 1–2회 줄이고");
  });
});
