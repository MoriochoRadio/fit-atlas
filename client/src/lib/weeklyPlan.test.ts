import { describe, expect, it } from "vitest";
import { addDesignedSession, createWeeklyPlan, getWeeklyPlanInsight, getWeekStart, readWeeklyPlan, setWeeklyGoal, toggleWeeklySession } from "./weeklyPlan";

const referenceDate = new Date("2026-08-14T12:00:00Z");
const checkin = { date: "2026-08-14", energy: 4, sleep: 4, stress: 2, pain: 1 } as const;

describe("weekly plan", () => {
  it("creates a current-week starter plan and resets stale storage safely", () => {
    const plan = createWeeklyPlan("strength", referenceDate);
    expect(plan.weekStart).toBe(getWeekStart(referenceDate));
    expect(plan.sessions).toHaveLength(3);
    expect(readWeeklyPlan(JSON.stringify({ ...plan, weekStart: "2026-08-03" }), referenceDate).goal).toBe("all_round");
  });

  it("toggles completion and replaces starter sessions when the goal changes", () => {
    const plan = createWeeklyPlan("all_round", referenceDate);
    const toggled = toggleWeeklySession(plan, plan.sessions[0].id);
    expect(toggled.sessions[0].completed).toBe(true);
    expect(setWeeklyGoal(toggled, "endurance", referenceDate).sessions.every((session) => session.goal === "endurance")).toBe(true);
  });

  it("adds today’s designed session and prioritizes readiness in the weekly insight", () => {
    const plan = createWeeklyPlan("all_round", referenceDate);
    const withDesigner = addDesignedSession(plan, { title: "15분 전신 균형 세션", summary: "", adjustment: "", blocks: [], safetyNote: "" }, "all_round", "home", 15, referenceDate);
    expect(withDesigner.sessions.at(-1)).toMatchObject({ weekday: "금", addedFromDesigner: true });
    expect(getWeeklyPlanInsight(withDesigner, [], { ...checkin, pain: 4 }, referenceDate).label).toContain("통증 신호");
  });
});
