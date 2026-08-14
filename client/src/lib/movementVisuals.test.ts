import { describe, expect, it } from "vitest";
import { getMovementVisual, movementVisuals } from "./movementVisuals";

describe("movement visual guides", () => {
  it("provides three labelled frames for representative complex exercises", () => {
    expect(Object.keys(movementVisuals)).toEqual(expect.arrayContaining(["squat", "pushup", "rdl", "run", "single-leg-stand"]));
    Object.values(movementVisuals).forEach((guide) => {
      expect(guide.frames).toHaveLength(3);
      guide.frames.forEach((frame) => {
        expect(frame.label.length).toBeGreaterThan(0);
        expect(frame.cue.length).toBeGreaterThan(4);
      });
    });
    expect(getMovementVisual("unknown")).toBeUndefined();
  });
});
