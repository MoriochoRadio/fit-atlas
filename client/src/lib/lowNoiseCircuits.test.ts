import { describe, expect, it } from "vitest";
import { lowNoiseCircuitTemplates } from "./lowNoiseCircuits";

describe("low-noise home circuits", () => {
  it("provides distinct 10, 20, and 30 minute no-jump templates", () => {
    expect(lowNoiseCircuitTemplates.map((template) => template.id)).toEqual(["quiet-10", "quiet-20", "quiet-30"]);
    expect(lowNoiseCircuitTemplates.map((template) => template.title)).toEqual(expect.arrayContaining(["10분 · 매우 조용한 리셋", "20분 · 저소음 전신 기본", "30분 · 저소음 전신 리듬"]));
  });

  it("includes noise, space, adjustment, and stop-signal guidance for every template", () => {
    lowNoiseCircuitTemplates.forEach((template) => {
      expect(template.blocks.length).toBeGreaterThanOrEqual(3);
      expect(template.noise).toContain("소음 수준");
      expect(template.space).toContain("필요 공간");
      expect(template.adjust.length).toBeGreaterThan(25);
      expect(template.safety.length).toBeGreaterThan(25);
    });
  });
});
