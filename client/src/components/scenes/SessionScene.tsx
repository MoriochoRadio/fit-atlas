import {
  ArrowRight,
  CalendarDays,
  Check,
  HeartPulse,
  Plus,
  ShieldCheck,
  Sparkles,
  Timer,
} from "lucide-react";
import { SectionTitle } from "@/components/SectionPrimitives";
import { SessionComposition } from "@/components/SessionComposition";
import type { AtlasInteractionPreferences } from "@/lib/localStore";
import type { CheckinRecommendation, DailyCheckin } from "@/lib/dailyCheckin";
import type { getPersonalizedProgram } from "@/lib/personalization";
import type { ProfilePreferences } from "@/lib/profilePreferences";
import {
  sessionQuickStarts,
  type buildSession,
  type SessionDuration,
  type SessionEnvironment,
  type SessionGoal,
} from "@/lib/sessionBuilder";
import type { getWeeklyPlanInsight, WeeklyPlan } from "@/lib/weeklyPlan";
import { goalCopy } from "@/lib/goalCopy";

type SessionPlan = ReturnType<typeof buildSession>;

type SessionSceneProps = {
  goal: keyof typeof goalCopy;
  onChangeGoal: (goal: keyof typeof goalCopy) => void;
  plan: ReturnType<typeof getPersonalizedProgram>;
  profileForm: ProfilePreferences;
  onOpenProfile: () => void;
  onGoToExplore: () => void;
  onApplySavedPreferences: () => void;
  onApplySavedEnvironment: () => void;
  checkin: DailyCheckin;
  onChangeCheckin: (
    field: "energy" | "sleep" | "stress" | "pain",
    value: number
  ) => void;
  checkinRecommendation: CheckinRecommendation;
  sessionGoal: SessionGoal;
  onChangeSessionGoal: (goal: SessionGoal) => void;
  sessionEnvironment: SessionEnvironment;
  onChangeSessionEnvironment: (environment: SessionEnvironment) => void;
  sessionDuration: SessionDuration;
  onChangeSessionDuration: (duration: SessionDuration) => void;
  onApplyQuickStart: (quickStart: (typeof sessionQuickStarts)[number]) => void;
  sessionGuidanceOpen: boolean;
  onToggleSessionGuidance: () => void;
  sessionPlan: SessionPlan;
  atlasSessionPlan: SessionPlan;
  atlasBlocks: SessionPlan["blocks"];
  atlasInteraction: AtlasInteractionPreferences;
  machineSessionIntensity: { rpe: number; label: string; target: string };
  onOpenBlock: (index: number) => void;
  onOpenSessionLog: () => void;
  onAddSessionToWeek: (plan: SessionPlan, message: string) => void;
  weeklyPlan: WeeklyPlan;
  weeklyPlanInsight: ReturnType<typeof getWeeklyPlanInsight>;
  onChangeWeeklyGoal: (goal: WeeklyPlan["goal"]) => void;
  onToggleWeeklySession: (sessionId: string) => void;
  onStartPlanLog: (session: WeeklyPlan["sessions"][number]) => void;
};

export function SessionScene({
  goal,
  onChangeGoal,
  plan,
  profileForm,
  onOpenProfile,
  onGoToExplore,
  onApplySavedPreferences,
  onApplySavedEnvironment,
  checkin,
  onChangeCheckin,
  checkinRecommendation,
  sessionGoal,
  onChangeSessionGoal,
  sessionEnvironment,
  onChangeSessionEnvironment,
  sessionDuration,
  onChangeSessionDuration,
  onApplyQuickStart,
  sessionGuidanceOpen,
  onToggleSessionGuidance,
  sessionPlan,
  atlasSessionPlan,
  atlasBlocks,
  atlasInteraction,
  machineSessionIntensity,
  onOpenBlock,
  onOpenSessionLog,
  onAddSessionToWeek,
  weeklyPlan,
  weeklyPlanInsight,
  onChangeWeeklyGoal,
  onToggleWeeklySession,
  onStartPlanLog,
}: SessionSceneProps) {
  return (
    <section
      id="scene-session"
      className="scene-view scene-view-session"
      tabIndex={-1}
    >
      <section id="program" className="program-section section-pad">
        <SectionTitle
          eyebrow="PERSONALIZE"
          title="오늘의 움직임을, 당신의 목표에 맞게."
          description="간단한 목표 선택으로 시작하는 보수적이고 점진적인 운동 제안입니다. 실제 서비스에서는 프로필·운동 이력·피로도까지 반영합니다."
        />
        <div className="program-grid">
          <div className="program-selector">
            <p className="small-label">PRIMARY GOAL</p>
            <div className="goal-pills">
              {(Object.keys(goalCopy) as Array<keyof typeof goalCopy>).map(
                item => (
                  <button
                    key={item}
                    onClick={() => onChangeGoal(item)}
                    className={goal === item ? "is-selected" : ""}
                  >
                    {item}
                  </button>
                )
              )}
            </div>
            <button className="profile-link" onClick={onOpenProfile}>
              연령·체중·경험 수준 설정 <ArrowRight size={14} />
            </button>
            <button
              className="profile-link preference-link"
              onClick={onApplySavedPreferences}
            >
              저장한 선호 조건으로 탐색 <ArrowRight size={14} />
            </button>
            <div className="program-note">
              <Sparkles size={18} />
              <p>
                <strong>권장 원칙</strong>
                <br />
                처음 2주간은 운동 전후 불편감·피로를 관찰하며 강도보다 일관성을
                우선하세요.
              </p>
            </div>
          </div>
          <div className="program-card">
            <div>
              <p className="eyebrow">
                YOUR STARTING POINT · {plan.sessionsPerWeek} · {plan.targetRpe}
              </p>
              <h3>{plan.title}</h3>
              <p>
                {plan.note} {plan.personalizationNote}
              </p>
              <p className="profile-context">{plan.sexConsideration}</p>
            </div>
            <div className="program-exercise-list">
              {plan.recommendations.map((name, index) => (
                <div key={name}>
                  <span>0{index + 1}</span>
                  <b>{name}</b>
                  <Check size={16} />
                </div>
              ))}
            </div>
            <button className="outline-button" onClick={onGoToExplore}>
              운동 구성 살펴보기 <ArrowRight size={16} />
            </button>
          </div>
        </div>
        <div className={`checkin-card mode-${checkinRecommendation.mode}`}>
          <div className="checkin-head">
            <div>
              <p className="eyebrow">DAILY READINESS · LOCAL ONLY</p>
              <h3>{checkinRecommendation.title}</h3>
              <p>{checkinRecommendation.guidance}</p>
            </div>
            <span>{checkinRecommendation.rpeAdjustment}</span>
          </div>
          <div className="checkin-controls">
            <label>
              에너지 <b>{checkin.energy}/5</b>
              <input
                type="range"
                min="1"
                max="5"
                value={checkin.energy}
                onChange={event =>
                  onChangeCheckin("energy", Number(event.target.value))
                }
              />
            </label>
            <label>
              수면 <b>{checkin.sleep}/5</b>
              <input
                type="range"
                min="1"
                max="5"
                value={checkin.sleep}
                onChange={event =>
                  onChangeCheckin("sleep", Number(event.target.value))
                }
              />
            </label>
            <label>
              스트레스 <b>{checkin.stress}/5</b>
              <input
                type="range"
                min="1"
                max="5"
                value={checkin.stress}
                onChange={event =>
                  onChangeCheckin("stress", Number(event.target.value))
                }
              />
            </label>
            <label>
              통증·불편감 <b>{checkin.pain}/5</b>
              <input
                type="range"
                min="1"
                max="5"
                value={checkin.pain}
                onChange={event =>
                  onChangeCheckin("pain", Number(event.target.value))
                }
              />
            </label>
          </div>
        </div>
      </section>

      <section id="session" className="session-section section-pad">
        <SectionTitle
          eyebrow="SESSION DESIGNER"
          title="오늘의 조건으로, 한 세션을 설계하세요."
          description="시간·장소·목표를 고르면 오늘의 컨디션에 맞춘 시작 구조를 제안합니다. 부담되면 15분 또는 더 쉬운 환경으로 바꿔도 됩니다."
        />
        <section className="session-launcher" aria-label="빠른 오늘 세션 시작">
          <div className="session-launcher-head">
            <div>
              <p className="eyebrow">01 / QUICK START</p>
              <h3>
                지금 가능한
                <br />
                <em>한 가지</em>를 고르세요.
              </h3>
            </div>
            <p>
              미리 정한 세 가지 시작점입니다. 선택 뒤에는 아래에서
              목표·장소·시간을 자유롭게 조정할 수 있습니다.
            </p>
          </div>
          <div className="session-quick-starts">
            {sessionQuickStarts.map(preset => {
              const isSelected =
                sessionGoal === preset.goal &&
                sessionEnvironment === preset.environment &&
                sessionDuration === preset.duration;
              return (
                <button
                  key={preset.id}
                  className={isSelected ? "is-selected" : ""}
                  aria-pressed={isSelected}
                  onClick={() => onApplyQuickStart(preset)}
                >
                  <Timer size={19} />
                  <span>{preset.label}</span>
                  <small>{preset.detail}</small>
                  <ArrowRight size={16} />
                </button>
              );
            })}
          </div>
          <div className="session-current-state">
            <span>현재 설계</span>
            <b>
              {sessionDuration}분 ·{" "}
              {
                { home: "집·매트", gym: "헬스장", outdoor: "야외·걷기" }[
                  sessionEnvironment
                ]
              }{" "}
              ·{" "}
              {
                {
                  all_round: "전신 균형",
                  strength: "기초 근력",
                  endurance: "심폐 리듬",
                }[sessionGoal]
              }
            </b>
            <p>
              <ShieldCheck size={15} /> {machineSessionIntensity.target}{" "}
              {atlasInteraction.resistance}% · {machineSessionIntensity.label}{" "}
              RPE {machineSessionIntensity.rpe}가 오늘 기록 기본값에 자동
              반영됩니다.
            </p>
          </div>
        </section>
        <div className="session-builder">
          <div className="session-options">
            <p className="small-label">02 / FINE TUNE</p>
            <div className="session-choice-group">
              <span>목표</span>
              <div>
                {(["all_round", "strength", "endurance"] as SessionGoal[]).map(
                  item => (
                    <button
                      key={item}
                      className={sessionGoal === item ? "is-selected" : ""}
                      onClick={() => onChangeSessionGoal(item)}
                    >
                      {
                        {
                          all_round: "전신 균형",
                          strength: "기초 근력",
                          endurance: "심폐 리듬",
                        }[item]
                      }
                    </button>
                  )
                )}
              </div>
            </div>
            <div className="session-choice-group">
              <span>환경</span>
              <div>
                {(["home", "gym", "outdoor"] as SessionEnvironment[]).map(
                  item => (
                    <button
                      key={item}
                      className={
                        sessionEnvironment === item ? "is-selected" : ""
                      }
                      onClick={() => onChangeSessionEnvironment(item)}
                    >
                      {
                        {
                          home: "집·매트",
                          gym: "헬스장",
                          outdoor: "야외·걷기",
                        }[item]
                      }
                    </button>
                  )
                )}
              </div>
            </div>
            <button
              className="session-preference-button"
              onClick={onApplySavedEnvironment}
            >
              저장 환경 적용 ·{" "}
              {
                { home: "집·매트", gym: "헬스장", outdoor: "야외·걷기" }[
                  profileForm.preferredEnvironment
                ]
              }
            </button>
            <div className="session-choice-group">
              <span>시간</span>
              <div>
                {([15, 30, 45] as SessionDuration[]).map(item => (
                  <button
                    key={item}
                    className={sessionDuration === item ? "is-selected" : ""}
                    onClick={() => onChangeSessionDuration(item)}
                  >
                    {item}분
                  </button>
                ))}
              </div>
            </div>
            <button
              type="button"
              className="session-guidance-toggle"
              aria-expanded={sessionGuidanceOpen}
              onClick={onToggleSessionGuidance}
            >
              {sessionGuidanceOpen
                ? "조절 기준 접기"
                : "피로·통증 조절 기준 보기"}
            </button>
            {sessionGuidanceOpen && (
              <p className="session-local-note">
                <ShieldCheck size={15} /> 피로·통증·수면 반응이 좋지 않으면
                시간을 줄이거나 범위를 낮추세요.
              </p>
            )}
          </div>
          <article className="session-plan">
            <div className="session-plan-head">
              <div>
                <p className="eyebrow">03 / YOUR SESSION</p>
                <h3>{atlasSessionPlan.title}</h3>
                <p>{atlasSessionPlan.summary}</p>
              </div>
              <span>{atlasSessionPlan.adjustment}</span>
            </div>
            <SessionComposition
              blocks={atlasBlocks}
              onOpenBlock={onOpenBlock}
            />
            <div className="session-blocks">
              {atlasSessionPlan.blocks.map((block, index) => (
                <div key={block.label} className="session-block">
                  <span>0{index + 1}</span>
                  <div>
                    <p className="small-label">
                      {block.label} · 약 {block.minutes}분
                    </p>
                    <ul>
                      {block.items.map(item => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            <div className="session-plan-actions">
              <button
                className="session-save-button"
                onClick={() =>
                  onAddSessionToWeek(
                    atlasSessionPlan,
                    "오늘의 세션을 이번 주 계획에 추가했습니다."
                  )
                }
              >
                <CalendarDays size={16} /> 이번 주 계획에 추가
              </button>
              <button className="session-log-button" onClick={onOpenSessionLog}>
                <Plus size={16} /> 운동 기록 열기
              </button>
            </div>
            <div className="session-safety">
              <HeartPulse size={16} />
              {atlasSessionPlan.safetyNote}
            </div>
          </article>
        </div>
      </section>
      <WeeklyPlanPanel
        plan={weeklyPlan}
        insight={weeklyPlanInsight}
        onGoal={onChangeWeeklyGoal}
        onToggle={onToggleWeeklySession}
        onStartLog={onStartPlanLog}
        onAdd={() =>
          onAddSessionToWeek(
            sessionPlan,
            "오늘의 설계 세션을 이번 주 계획에 추가했습니다."
          )
        }
      />
    </section>
  );
}

function WeeklyPlanPanel({
  plan,
  insight,
  onGoal,
  onToggle,
  onStartLog,
  onAdd,
}: {
  plan: WeeklyPlan;
  insight: ReturnType<typeof getWeeklyPlanInsight>;
  onGoal: (goal: WeeklyPlan["goal"]) => void;
  onToggle: (sessionId: string) => void;
  onStartLog: (session: WeeklyPlan["sessions"][number]) => void;
  onAdd: () => void;
}) {
  const completion = insight.total
    ? Math.round((insight.completed / insight.total) * 100)
    : 0;
  return (
    <section className="weekly-plan-section section-pad">
      <SectionTitle
        eyebrow="WEEKLY RHYTHM"
        title="계획을 체크하고, 조절하며 이어가세요."
        description="완료 체크는 이 브라우저에만 저장됩니다. 실제 운동 기록과는 구분해 두고, 컨디션이 낮은 날에는 미루거나 더 가볍게 바꿔도 됩니다."
      />
      <div className="weekly-plan-grid">
        <aside className="weekly-summary">
          <p className="eyebrow">THIS WEEK · LOCAL ONLY</p>
          <h3>
            {insight.completed} / {insight.total} 세션
          </h3>
          <div
            className="weekly-progress-track"
            aria-label={`주간 계획 이행률 ${completion}%`}
          >
            <i style={{ width: `${completion}%` }} />
          </div>
          <p>{insight.label}</p>
          <div className="weekly-goals">
            {(
              ["all_round", "strength", "endurance"] as WeeklyPlan["goal"][]
            ).map(goal => (
              <button
                key={goal}
                className={plan.goal === goal ? "is-selected" : ""}
                onClick={() => onGoal(goal)}
              >
                {
                  {
                    all_round: "전신 균형",
                    strength: "기초 근력",
                    endurance: "심폐 리듬",
                  }[goal]
                }
              </button>
            ))}
          </div>
          <button className="weekly-add-button" onClick={onAdd}>
            <Plus size={15} /> 오늘 설계 세션 추가
          </button>
          <small>
            기록 연결 {insight.linkedRecords}건 · 직접 체크{" "}
            {insight.manualChecks}건 · 이번 주 운동 기록{" "}
            {insight.loggedThisWeek}개
          </small>
        </aside>
        <div className="weekly-sessions">
          {plan.sessions.map((session, index) => (
            <article
              key={session.id}
              className={session.completed ? "is-completed" : ""}
            >
              <button
                className="weekly-check"
                onClick={() => onToggle(session.id)}
                aria-label={`${session.label} ${session.completed ? "완료 해제" : "완료 처리"}`}
                aria-pressed={session.completed}
              >
                {session.completed ? <Check size={15} /> : <span />}
              </button>
              <div>
                <p className="small-label">
                  0{index + 1} · {session.weekday}요일 · {session.duration}분
                </p>
                <h3>{session.label}</h3>
                <p>
                  {session.recordedAt
                    ? "운동 기록과 연결되어 완료됨"
                    : session.addedFromDesigner
                      ? "세션 설계 도구에서 추가됨"
                      : "목표별 시작 계획"}
                </p>
                <button
                  className="weekly-log-button"
                  onClick={() => onStartLog(session)}
                >
                  {session.recordedAt
                    ? "기록 다시 열기"
                    : "이 계획으로 기록 시작"}
                  <ArrowRight size={13} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
