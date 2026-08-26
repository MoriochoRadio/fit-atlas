import { describe, expect, it } from "vitest";
import { loadFullCatalog } from "./catalogLoader";
import { getExerciseTextGuide } from "./exerciseTextGuide";

describe("exercise text guide", () => {
  it("creates a readable sequence, muscle map, breathing cue, adjustment, and stop cue for every catalog entry", async () => {
    const entries = await loadFullCatalog();
    expect(entries).toHaveLength(990);

    entries.forEach(({ exercise, detail }) => {
      const guide = getExerciseTextGuide(exercise, detail);
      expect(guide.sequence).toHaveLength(3);
      expect(guide.sequence.every(step => step.length > 8)).toBe(true);
      expect(guide.primaryMuscles.length).toBeGreaterThan(0);
      expect(guide.supportingMuscles.length).toBeGreaterThan(0);
      expect(guide.breathing).toContain("↔");
      expect(guide.adjustment).toContain("↓");
      expect(guide.stop).toContain("■");
    });
  });
});
