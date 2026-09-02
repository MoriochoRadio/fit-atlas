import { describe, expect, it } from "vitest";
import {
  addDesignedSession,
  addRomAlternativeToWeeklyPlan,
  completeWeeklySessionWithRecord,
  createWeeklyPlan,
  getWeeklyPlanInsight,
  getWeekStart,
  readWeeklyPlan,
  setWeeklyGoal,
  toggleWeeklySession,
} from "./weeklyPlan";

const referenceDate = new Date("2026-08-14T12:00:00Z");
const checkin = {
  date: "2026-08-14",
  energy: 4,
  sleep: 4,
  stress: 2,
  pain: 1,
} as const;

describe("weekly plan", () => {
  it("creates a current-week starter plan and resets stale storage safely", () => {
    const plan = createWeeklyPlan("strength", referenceDate);
    expect(plan.weekStart).toBe(getWeekStart(referenceDate));
    expect(plan.sessions).toHaveLength(3);
    expect(
      readWeeklyPlan(
        JSON.stringify({ ...plan, weekStart: "2026-08-03" }),
        referenceDate
      ).goal
    ).toBe("all_round");
  });

  it("replaces the unfinished starter sessions when the goal changes", () => {
    const plan = createWeeklyPlan("all_round", referenceDate);
    const toggled = toggleWeeklySession(plan, plan.sessions[0].id);
    expect(toggled.sessions[0].completed).toBe(true);

    const switched = setWeeklyGoal(toggled, "endurance", referenceDate);
    // 이미 마친 세션은 실제로 한 활동이므로 원래 목표 그대로 남는다.
    expect(
      switched.sessions
        .filter(session => !session.completed)
        .every(session => session.goal === "endurance")
    ).toBe(true);
  });

  it("keeps sessions already completed when the weekly goal changes", () => {
    const plan = createWeeklyPlan("all_round", referenceDate);
    const completed = toggleWeeklySession(plan, plan.sessions[0].id);
    expect(
      completed.sessions.filter(session => session.completed)
    ).toHaveLength(1);

    const switched = setWeeklyGoal(completed, "endurance", referenceDate);
    expect(switched.goal).toBe("endurance");
    expect(switched.sessions.filter(session => session.completed)).toHaveLength(
      1
    );
    expect(switched.sessions.find(session => session.completed)?.id).toBe(
      plan.sessions[0].id
    );
  });

  it("rebuilds the sessions that were not finished for the new goal", () => {
    const plan = createWeeklyPlan("all_round", referenceDate);
    const completed = toggleWeeklySession(plan, plan.sessions[0].id);
    const switched = setWeeklyGoal(completed, "endurance", referenceDate);
    const rebuilt = switched.sessions.filter(session => !session.completed);
    expect(rebuilt.length).toBeGreaterThan(0);
    expect(rebuilt.every(session => session.goal === "endurance")).toBe(true);
  });

  it("starts clean when the stored plan belongs to an earlier week", () => {
    const lastWeek = createWeeklyPlan(
      "all_round",
      new Date("2026-08-07T12:00:00Z")
    );
    const completed = toggleWeeklySession(lastWeek, lastWeek.sessions[0].id);
    const switched = setWeeklyGoal(completed, "strength", referenceDate);
    expect(switched.sessions.some(session => session.completed)).toBe(false);
  });

  it("marks an exact planned session as completed when a linked record is saved", () => {
    const plan = createWeeklyPlan("all_round", referenceDate);
    const linked = completeWeeklySessionWithRecord(
      plan,
      plan.sessions[0].id,
      "2026-08-14T12:30:00.000Z"
    );
    expect(linked.sessions[0]).toMatchObject({
      completed: true,
      recordedAt: "2026-08-14T12:30:00.000Z",
    });
    expect(
      getWeeklyPlanInsight(linked, [], checkin, referenceDate)
    ).toMatchObject({ linkedRecords: 1, manualChecks: 0 });
  });

  it("adds today’s designed session and prioritizes readiness in the weekly insight", () => {
    const plan = createWeeklyPlan("all_round", referenceDate);
    const withDesigner = addDesignedSession(
      plan,
      {
        title: "15분 전신 균형 세션",
        summary: "",
        adjustment: "",
        blocks: [],
        safetyNote: "",
      },
      "all_round",
      "home",
      15,
      referenceDate
    );
    expect(withDesigner.sessions.at(-1)).toMatchObject({
      weekday: "금",
      addedFromDesigner: true,
    });
    expect(
      getWeeklyPlanInsight(
        withDesigner,
        [],
        { ...checkin, pain: 4 },
        referenceDate
      ).label
    ).toContain("통증 신호");
  });

  it("adds a ROM alternative to today’s routine once without duplicating it", () => {
    const plan = createWeeklyPlan("all_round", referenceDate);
    const withAlternative = addRomAlternativeToWeeklyPlan(
      plan,
      "데드버그",
      referenceDate
    );
    expect(withAlternative.sessions.at(-1)).toMatchObject({
      label: "오늘의 ROM 조절 · 데드버그",
      weekday: "금",
      duration: 15,
    });
    expect(
      addRomAlternativeToWeeklyPlan(withAlternative, "데드버그", referenceDate)
        .sessions
    ).toHaveLength(withAlternative.sessions.length);
  });
});
