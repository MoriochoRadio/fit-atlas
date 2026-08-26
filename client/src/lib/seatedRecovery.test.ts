import { describe, expect, it } from "vitest";
import {
  getSeatedRecoveryAdjustment,
  seatedRecoveryRoutines,
  seatedRecoveryStopSignals,
} from "./seatedRecovery";

describe("seated recovery routines", () => {
  it("provides two short routines with staged instructions and valid exploration targets", () => {
    expect(Object.keys(seatedRecoveryRoutines)).toEqual(["5", "10"]);
    expect(seatedRecoveryRoutines[5].blocks).toHaveLength(5);
    expect(seatedRecoveryRoutines[10].blocks).toHaveLength(5);
    expect(seatedRecoveryRoutines[10].exploreExerciseIds).toEqual(
      expect.arrayContaining(["seated-march-to-stand", "bodyweight-squat"])
    );
    expect(seatedRecoveryStopSignals).toHaveLength(3);
  });

  it("prioritizes pausing self-management for high-pain check-ins and reduces scope for recovery contexts", () => {
    expect(
      getSeatedRecoveryAdjustment(
        { mode: "stop_and_assess", title: "", guidance: "", rpeAdjustment: "" },
        "none"
      ).label
    ).toBe("자가 진행 보류");
    expect(
      getSeatedRecoveryAdjustment(
        { mode: "recovery", title: "", guidance: "", rpeAdjustment: "" },
        "none"
      ).label
    ).toBe("회복 우선 조정");
    expect(
      getSeatedRecoveryAdjustment(
        { mode: "ready", title: "", guidance: "", rpeAdjustment: "" },
        "pregnancy_postpartum"
      ).guidance
    ).toContain("복부 압박");
  });
});
