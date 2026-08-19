import { describe, expect, it } from "vitest";
import { lowNoiseCircuitTemplates } from "./lowNoiseCircuits";

describe("low-noise home circuits", () => {
  it("provides distinct 10, 15, 20, and 30 minute no-jump templates", () => {
    expect(lowNoiseCircuitTemplates.map((template) => template.id)).toEqual(["quiet-10", "quiet-15", "quiet-20", "quiet-30"]);
    expect(lowNoiseCircuitTemplates.map((template) => template.title)).toEqual(expect.arrayContaining(["10분 · 매우 조용한 리셋", "15분 · 무도구 전신 협응", "20분 · 저소음 전신 기본", "30분 · 저소음 전신 리듬"]));
  });

  it("uses a quiet, wrist-friendly fallback in the 15 minute no-equipment coordination circuit", () => {
    const template = lowNoiseCircuitTemplates.find((item) => item.id === "quiet-15");
    expect(template?.blocks.join(" ")).toContain("스탠딩 섀도 복싱 이지");
    expect(template?.adjust).toContain("손목 부담");
    expect(template?.safety).toContain("균형 상실");
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
