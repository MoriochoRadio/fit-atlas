import { describe, expect, it } from "vitest";
import { buildSession } from "./sessionBuilder";

const checkin = { date: "2026-08-14", energy: 4, sleep: 4, stress: 2, pain: 1 } as const;

describe("single session builder", () => {
  it("builds a bounded session with the selected duration and environment", () => {
    const plan = buildSession({ goal: "strength", environment: "gym", duration: 30, checkin });
    expect(plan.title).toContain("30분");
    expect(plan.blocks.reduce((total, block) => total + block.minutes, 0)).toBe(30);
    expect(plan.blocks[1].items.join(" ")).toContain("레그 프레스");
  });

  it("applies a lighter template when readiness is reduced", () => {
    const plan = buildSession({ goal: "all_round", environment: "home", duration: 15, checkin: { ...checkin, energy: 2, sleep: 2, stress: 4, pain: 2 } });
    expect(plan.summary).toContain("낮추고");
    expect(plan.blocks[1].items.every((item) => item.includes("가볍게"))).toBe(true);
  });

  it("prioritizes symptom-aware recovery when pain is high", () => {
    const plan = buildSession({ goal: "endurance", environment: "outdoor", duration: 45, checkin: { ...checkin, pain: 4 } });
    expect(plan.title).toContain("통증 신호");
    expect(plan.blocks.reduce((total, block) => total + block.minutes, 0)).toBe(45);
    expect(plan.blocks[1].items.join(" ")).not.toContain("걷기·달리기 인터벌");
  });
});
