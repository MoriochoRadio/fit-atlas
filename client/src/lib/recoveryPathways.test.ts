import { describe, expect, it } from "vitest";
import { exercises } from "./fitnessData";
import { applyRecoveryExplore, getRecoveryExploreAction, getRecoveryPathway, recoveryPathways } from "./recoveryPathways";

describe("recovery pathways", () => {
  it("provides seven education-only joint and movement pathways with safe alternatives", () => {
    expect(recoveryPathways.map((pathway) => pathway.id)).toEqual(["shoulder", "low-back", "knee", "ankle", "wrist", "elbow", "hip"]);
    recoveryPathways.forEach((pathway) => {
      expect(pathway.checkBefore).toHaveLength(2);
      expect(pathway.chooseInstead).toHaveLength(2);
      expect(pathway.stopSignals).toHaveLength(2);
      expect(pathway.returnRule.length).toBeGreaterThan(25);
      pathway.alternativeExerciseIds.forEach((id) => expect(exercises.some((exercise) => exercise.id === id)).toBe(true));
    });
  });

  it("returns the selected pathway for the body-map recovery flow", () => {
    expect(getRecoveryPathway("ankle").region).toBe("하체");
    expect(getRecoveryPathway("low-back").alternativeExerciseIds).toContain("bird-dog");
    expect(getRecoveryPathway("hip").alternativeExerciseIds).toContain("wall-supported-lateral-reach");
    expect(getRecoveryPathway("knee").alternativeExerciseIds).toContain("seated-march-to-stand");
    expect(getRecoveryPathway("wrist").alternativeExerciseIds).toContain("seated-march-to-stand");
  });

  it("creates the Home search and region action for an alternative exercise", () => {
    const action = getRecoveryExploreAction(getRecoveryPathway("ankle"), { name: "발목 니투월 락" });
    expect(action).toEqual({ keyword: "발목 니투월 락", region: "하체", category: "전체", focus: "전체", targetId: "explore" });
  });

  it("applies the Home search, region filter, and explore scroll effect together", () => {
    const calls: string[] = [];
    const result = applyRecoveryExplore(getRecoveryPathway("ankle"), "ankle-knee-to-wall", exercises, { setKeyword: (value) => calls.push(`keyword:${value}`), setCategory: (value) => calls.push(`category:${value}`), setFocus: (value) => calls.push(`focus:${value}`), setRegion: (value) => calls.push(`region:${value}`), scrollToTarget: (value) => calls.push(`scroll:${value}`) });
    expect(result?.exercise.name).toBe("발목 니투월 락");
    expect(calls).toEqual(["keyword:발목 니투월 락", "category:전체", "focus:전체", "region:하체", "scroll:explore"]);
  });

  it("keeps new functional alternatives connected to a valid Home exploration action", () => {
    const result = applyRecoveryExplore(getRecoveryPathway("hip"), "wall-supported-lateral-reach", exercises, { setKeyword: () => undefined, setCategory: () => undefined, setFocus: () => undefined, setRegion: () => undefined, scrollToTarget: () => undefined });
    expect(result?.exercise.name).toBe("벽 지지 사이드 리치");
  });
});
