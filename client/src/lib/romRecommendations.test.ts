import { describe, expect, it } from "vitest";
import { getRomRecommendation } from "./romRecommendations";
import type { AsciiDiagramPresentation } from "./asciiMovementDiagrams";

const base: Omit<AsciiDiagramPresentation, "rom"> = {
  categoryTheme: "strength",
  regionTheme: "lower",
  categoryLabel: "근력·제어",
  regionLabel: "하체",
  stageArrows: ["↘", "↑", "↕"],
  motionLabel: "관절 굽힘 ↘ · 지면 밀기 ↑",
  jointFocus: "발목 · 무릎 · 고관절",
  romDescription: "테스트 설명",
};

describe("ROM recommendations", () => {
  it("provides a stretch, alternative, and safety cue for all ROM sizes", () => {
    (["작음", "보통", "큼"] as const).forEach(rom => {
      const result = getRomRecommendation({ ...base, rom });
      expect(result.title.length).toBeGreaterThan(6);
      expect(result.stretch.length).toBeGreaterThan(0);
      expect(result.alternatives.length).toBeGreaterThan(0);
      expect(result.caution.length).toBeGreaterThan(10);
    });
  });
});
