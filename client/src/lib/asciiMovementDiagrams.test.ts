import { describe, expect, it } from "vitest";
import { asciiMovementDiagrams, getAsciiDiagramPresentation, getAsciiMovementDiagram } from "./asciiMovementDiagrams";
import { loadFullCatalog } from "./catalogLoader";
import { getExerciseTextGuide } from "./exerciseTextGuide";

describe("ASCII movement diagrams", () => {
  it("provides three readable sketches for representative complex movement patterns", () => {
    expect(Object.keys(asciiMovementDiagrams)).toEqual(expect.arrayContaining(["squat", "pushup", "rdl", "dumbbell-bench", "latpulldown", "leg-press", "rowing-ergometer", "bike", "front-plank", "barbell-hip-thrust", "bird-dog", "assisted-pullup", "step-up"]));
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

  it("creates a three-stage accessible fallback diagram for every catalog exercise", async () => {
    const entries = await loadFullCatalog();
    expect(entries).toHaveLength(990);

    entries.forEach(({ exercise, detail }) => {
      const guide = getExerciseTextGuide(exercise, detail);
      const diagram = getAsciiMovementDiagram(exercise.id, guide);
      const presentation = getAsciiDiagramPresentation(guide);
      expect(diagram).toBeDefined();
      expect(diagram?.stages).toHaveLength(3);
      expect(diagram?.stages.every((stage) => stage.art.includes("\n") && stage.cue.length > 4)).toBe(true);
      expect(presentation.stageArrows).toHaveLength(3);
      expect(presentation.stageArrows.every((arrow) => /[↘↗↕↙↔→←↑]/.test(arrow))).toBe(true);
      expect(presentation.categoryLabel.length).toBeGreaterThan(2);
      expect(presentation.regionLabel.length).toBeGreaterThan(0);
      expect(presentation.jointFocus.length).toBeGreaterThan(2);
      expect(["작음", "보통", "큼"]).toContain(presentation.rom);
      expect(presentation.romDescription.length).toBeGreaterThan(10);
    });
  });
});
