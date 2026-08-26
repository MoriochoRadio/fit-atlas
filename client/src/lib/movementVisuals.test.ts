import { describe, expect, it } from "vitest";
import { getMovementVisual, movementVisuals } from "./movementVisuals";

describe("movement visual guides", () => {
  it("provides three labelled frames for representative complex exercises", () => {
    expect(Object.keys(movementVisuals)).toEqual(
      expect.arrayContaining([
        "squat",
        "pushup",
        "rdl",
        "run",
        "single-leg-stand",
        "row",
        "reverse-lunge",
        "snap-down",
        "squat-jump-stick",
        "lateral-bound-stick",
        "cable-chest-press",
        "ankle-knee-to-wall",
        "kettlebell-deadlift",
        "resistance-band-row",
        "low-step-march",
        "sandbag-bear-hug-carry",
        "trx-row",
        "landmine-press",
        "landmine-rotation-prep",
        "trekking-pole-walk-prep",
        "controlled-downhill-walk",
        "bodyweight-squat",
        "counter-incline-pushup",
        "dead-bug-heel-tap",
        "side-plank-knee",
        "incline-treadmill-walk",
        "treadmill-walk-interval",
        "rowing-ergometer",
        "dumbbell-bench",
        "kettlebell-goblet-squat",
        "resistance-band-chest-press",
        "kettlebell-suitcase-carry",
        "bike",
        "swimming",
        "latpulldown",
        "assisted-pullup",
        "leg-press",
        "leg-curl",
        "machine-shoulder-press",
        "barbell-hip-thrust",
        "front-plank",
        "bird-dog",
        "step-up",
        "kettlebell-swing-prep",
      ])
    );
    Object.values(movementVisuals).forEach(guide => {
      expect(guide.frames).toHaveLength(3);
      guide.frames.forEach(frame => {
        expect(frame.label.length).toBeGreaterThan(0);
        expect(frame.cue.length).toBeGreaterThan(4);
      });
    });
    expect(getMovementVisual("unknown")).toBeUndefined();
    expect(getMovementVisual("trekking-pole-walk-prep")?.title).toContain(
      "트레킹 폴"
    );
    expect(
      getMovementVisual("controlled-downhill-walk")?.frames.map(
        frame => frame.pose
      )
    ).toEqual(["stand", "lunge", "balance"]);
    expect(getMovementVisual("rowing-ergometer")?.title).toContain(
      "로잉 에르고미터"
    );
    expect(
      getMovementVisual("dead-bug-heel-tap")?.frames.map(frame => frame.pose)
    ).toEqual(["deadbug", "deadbug", "deadbug"]);
    expect(
      getMovementVisual("latpulldown")?.frames.map(frame => frame.pose)
    ).toEqual(["pulldown", "pulldown", "pulldown"]);
    expect(getMovementVisual("barbell-hip-thrust")?.title).toContain(
      "힙 쓰러스트"
    );
    expect(
      getMovementVisual("pool-easy-swim")?.frames.map(frame => frame.pose)
    ).toEqual(["swim", "swim", "swim"]);
  });
});
