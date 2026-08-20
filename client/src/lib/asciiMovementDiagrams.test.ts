import { describe, expect, it } from "vitest";
import { asciiMovementDiagrams, getAsciiMovementDiagram } from "./asciiMovementDiagrams";

describe("ASCII movement diagrams", () => {
  it("provides three readable sketches for representative complex movement patterns", () => {
    expect(Object.keys(asciiMovementDiagrams)).toEqual(expect.arrayContaining(["squat", "pushup", "rdl", "dumbbell-bench", "latpulldown", "leg-press", "row-erg-easy", "bike", "front-plank", "barbell-hip-thrust", "bird-dog", "assisted-pullup", "step-up"]));
    Object.values(asciiMovementDiagrams).forEach((diagram) => {
      expect(diagram.stages).toHaveLength(3);
      diagram.stages.forEach((stage) => {
        expect(stage.art).toContain("\n");
        expect(stage.cue.length).toBeGreaterThan(4);
      });
    });
    expect(getAsciiMovementDiagram("맨몸 스쿼트")?.title).toContain("맨몸 스쿼트");
    expect(getAsciiMovementDiagram("unknown")).toBeUndefined();
  });
});
