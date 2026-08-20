import { getCheckinRecommendation, type DailyCheckin } from "./dailyCheckin";
import type { SessionDuration, SessionEnvironment, SessionGoal, SessionPlan } from "./sessionBuilder";
import type { TrainingLog } from "./trainingMetrics";

export type WeeklyPlanGoal = SessionGoal;

export type WeeklyPlanSession = {
  id: string;
  label: string;
  weekday: string;
  goal: WeeklyPlanGoal;
  environment: SessionEnvironment;
  duration: SessionDuration;
  completed: boolean;
  addedFromDesigner: boolean;
  recordedAt?: string;
};

export type WeeklyPlan = {
  weekStart: string;
  goal: WeeklyPlanGoal;
  sessions: WeeklyPlanSession[];
};

const weekdayNames = ["일", "월", "화", "수", "목", "금", "토"];

function dayKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function getWeekStart(referenceDate = new Date()) {
  const date = new Date(referenceDate);
  date.setHours(12, 0, 0, 0);
  const offset = (date.getDay() + 6) % 7;
  date.setDate(date.getDate() - offset);
  return dayKey(date);
}

const starterSessions: Record<WeeklyPlanGoal, Omit<WeeklyPlanSession, "completed" | "addedFromDesigner">[]> = {
  all_round: [
    { id: "balance-home", label: "전신 균형 · 집·매트", weekday: "화", goal: "all_round", environment: "home", duration: 30 },
    { id: "balance-outdoor", label: "편안한 야외 걷기", weekday: "목", goal: "all_round", environment: "outdoor", duration: 30 },
    { id: "balance-gym", label: "전신 균형 · 헬스장", weekday: "토", goal: "all_round", environment: "gym", duration: 30 },
  ],
  strength: [
    { id: "strength-home", label: "기초 근력 · 집·매트", weekday: "월", goal: "strength", environment: "home", duration: 30 },
    { id: "strength-gym-a", label: "기초 근력 · 헬스장", weekday: "수", goal: "strength", environment: "gym", duration: 45 },
    { id: "strength-gym-b", label: "기초 근력 · 헬스장", weekday: "토", goal: "strength", environment: "gym", duration: 30 },
  ],
  endurance: [
    { id: "endurance-outdoor", label: "심폐 리듬 · 야외·걷기", weekday: "화", goal: "endurance", environment: "outdoor", duration: 30 },
    { id: "endurance-gym", label: "심폐 리듬 · 헬스장", weekday: "목", goal: "endurance", environment: "gym", duration: 30 },
    { id: "endurance-home", label: "가벼운 심폐 · 집·매트", weekday: "일", goal: "endurance", environment: "home", duration: 15 },
  ],
};

export function createWeeklyPlan(goal: WeeklyPlanGoal = "all_round", referenceDate = new Date()): WeeklyPlan {
  return {
    weekStart: getWeekStart(referenceDate),
    goal,
    sessions: starterSessions[goal].map((session) => ({ ...session, completed: false, addedFromDesigner: false })),
  };
}

function isValidSession(value: unknown): value is WeeklyPlanSession {
  if (!value || typeof value !== "object") return false;
  const session = value as Partial<WeeklyPlanSession>;
  return typeof session.id === "string" && typeof session.label === "string" && typeof session.weekday === "string" && ["all_round", "strength", "endurance"].includes(session.goal ?? "") && ["home", "gym", "outdoor"].includes(session.environment ?? "") && [15, 30, 45].includes(session.duration ?? 0) && typeof session.completed === "boolean" && typeof session.addedFromDesigner === "boolean" && (session.recordedAt === undefined || typeof session.recordedAt === "string");
}

export function readWeeklyPlan(serialized: string | null, referenceDate = new Date()): WeeklyPlan {
  try {
    const value = JSON.parse(serialized ?? "null") as Partial<WeeklyPlan> | null;
    if (!value || typeof value.weekStart !== "string" || !["all_round", "strength", "endurance"].includes(value.goal ?? "") || !Array.isArray(value.sessions) || !value.sessions.every(isValidSession) || value.weekStart !== getWeekStart(referenceDate)) return createWeeklyPlan("all_round", referenceDate);
    return { weekStart: value.weekStart, goal: value.goal as WeeklyPlanGoal, sessions: value.sessions };
  } catch {
    return createWeeklyPlan("all_round", referenceDate);
  }
}

export function toggleWeeklySession(plan: WeeklyPlan, sessionId: string): WeeklyPlan {
  return { ...plan, sessions: plan.sessions.map((session) => session.id === sessionId ? { ...session, completed: !session.completed, recordedAt: session.completed ? undefined : session.recordedAt } : session) };
}

export function completeWeeklySessionWithRecord(plan: WeeklyPlan, sessionId: string, recordedAt: string): WeeklyPlan {
  return { ...plan, sessions: plan.sessions.map((session) => session.id === sessionId ? { ...session, completed: true, recordedAt } : session) };
}

export function setWeeklyGoal(plan: WeeklyPlan, goal: WeeklyPlanGoal, referenceDate = new Date()): WeeklyPlan {
  return createWeeklyPlan(goal, referenceDate);
}

export function addDesignedSession(plan: WeeklyPlan, session: SessionPlan, goal: SessionGoal, environment: SessionEnvironment, duration: SessionDuration, referenceDate = new Date()): WeeklyPlan {
  const current = readWeeklyPlan(JSON.stringify(plan), referenceDate);
  const today = weekdayNames[referenceDate.getDay()];
  const id = `designed-${current.sessions.length + 1}-${today}-${duration}`;
  const next: WeeklyPlanSession = { id, label: session.title, weekday: today, goal, environment, duration, completed: false, addedFromDesigner: true };
  return { ...current, sessions: [...current.sessions, next] };
}

export function addRomAlternativeToWeeklyPlan(plan: WeeklyPlan, exerciseName: string, referenceDate = new Date()): WeeklyPlan {
  const current = readWeeklyPlan(JSON.stringify(plan), referenceDate);
  const today = weekdayNames[referenceDate.getDay()];
  const id = `rom-${dayKey(referenceDate)}-${exerciseName.replace(/\s+/g, "-")}`;
  if (current.sessions.some((session) => session.id === id)) return current;
  const next: WeeklyPlanSession = { id, label: `오늘의 ROM 조절 · ${exerciseName}`, weekday: today, goal: "all_round", environment: "home", duration: 15, completed: false, addedFromDesigner: true };
  return { ...current, sessions: [...current.sessions, next] };
}

export function getWeeklyPlanInsight(plan: WeeklyPlan, logs: TrainingLog[], checkin: DailyCheckin, referenceDate = new Date()) {
  const completed = plan.sessions.filter((session) => session.completed).length;
  const loggedThisWeek = logs.filter((log) => log.date >= plan.weekStart && log.date <= dayKey(referenceDate)).length;
  const readiness = getCheckinRecommendation(checkin);
  const remaining = plan.sessions.length - completed;
  const linkedRecords = plan.sessions.filter((session) => Boolean(session.recordedAt)).length;
  const label = readiness.mode === "stop_and_assess" ? "통증 신호가 있으면 완료 수보다 회복과 평가를 우선하세요." : readiness.mode === "recovery" || readiness.mode === "lighter" ? "이번 주 계획은 줄여도 괜찮습니다. 남은 세션을 더 가볍게 조절하세요." : completed === plan.sessions.length ? "이번 주 계획을 모두 체크했어요. 다음 주에는 한 변수만 작게 조절하세요." : completed === 0 ? "첫 체크부터 시작해 보세요. 계획은 유연하게 조절할 수 있습니다." : `남은 ${remaining}개 세션은 컨디션을 보며 나누어 진행하세요.`;
  return { completed, total: plan.sessions.length, remaining, loggedThisWeek, linkedRecords, manualChecks: completed - linkedRecords, label };
}
