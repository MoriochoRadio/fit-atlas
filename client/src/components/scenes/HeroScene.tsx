import {
  ArrowRight,
  BookOpen,
  Brain,
  ChevronRight,
  HeartPulse,
  History,
  Plus,
  Timer,
} from "lucide-react";
import { HeroRecentEquipmentResume } from "@/components/HeroRecentEquipmentResume";
import { WeeklyAtlasDetailReport } from "@/components/WeeklyAtlasDetailReport";
import type { catalogSummary } from "@/lib/catalogLoader";
import type { CheckinRecommendation } from "@/lib/dailyCheckin";
import { equipmentSessionSetup } from "@/lib/equipmentSessionSetup";
import type {
  AtlasInteractionPreferences,
  HeroEquipment,
} from "@/lib/localStore";
import type { CinematicScene } from "@/lib/scenes";
import type {
  SessionDuration,
  SessionEnvironment,
  SessionGoal,
} from "@/lib/sessionBuilder";
import type { getWeeklyPlanInsight, WeeklyPlan } from "@/lib/weeklyPlan";

type HeroSceneProps = {
  onNavigate: (scene: CinematicScene) => void;
  atlasInteraction: AtlasInteractionPreferences;
  onChangeEquipment: (equipment: HeroEquipment) => void;
  onChangeResistance: (resistance: number) => void;
  onStartEquipmentSession: () => void;
  onResumeRecentSession: () => void;
  onStartAllRoundSession: () => void;
  onOpenLog: () => void;
  machineSessionIntensity: { rpe: number; label: string; target: string };
  atlasRoute: { label: string; description: string };
  atlasPerformance: "surge" | "active" | "starting";
  atlasSignalSummary: { title: string; detail: string };
  checkinRecommendation: CheckinRecommendation;
  catalogStats: typeof catalogSummary;
  logCount: number;
  sessionGoal: SessionGoal;
  sessionEnvironment: SessionEnvironment;
  sessionDuration: SessionDuration;
  hasTrainingHistory: boolean;
  weeklyPlan: WeeklyPlan;
  weeklyPlanInsight: ReturnType<typeof getWeeklyPlanInsight>;
  weeklyCompletionPercent: number;
  weeklyCompletionFlow: {
    weekday: string;
    planned: number;
    completed: number;
  }[];
  weeklyDirection: string;
  onChangeWeeklyGoal: (goal: WeeklyPlan["goal"]) => void;
};

export function HeroScene({
  onNavigate,
  atlasInteraction,
  onChangeEquipment,
  onChangeResistance,
  onStartEquipmentSession,
  onResumeRecentSession,
  onStartAllRoundSession,
  onOpenLog,
  machineSessionIntensity,
  atlasRoute,
  atlasPerformance,
  atlasSignalSummary,
  checkinRecommendation,
  catalogStats,
  logCount,
  sessionGoal,
  sessionEnvironment,
  sessionDuration,
  hasTrainingHistory,
  weeklyPlan,
  weeklyPlanInsight,
  weeklyCompletionPercent,
  weeklyCompletionFlow,
  weeklyDirection,
  onChangeWeeklyGoal,
}: HeroSceneProps) {
  return (
    <section
      id="scene-home"
      className="scene-view scene-view-home"
      tabIndex={-1}
    >
      <section className="hero">
        <div className="hero-noise" />
        <div className="hero-copy">
          <p className="eyebrow light">TODAY</p>
          <h1>
            오늘은
            <br />
            <em>무엇을 움직일까요?</em>
          </h1>
          <div className="hero-actions">
            <button
              className="light-button"
              onClick={() =>
                atlasInteraction.recentEquipmentSession
                  ? onResumeRecentSession()
                  : onNavigate("session")
              }
            >
              {atlasInteraction.recentEquipmentSession
                ? "최근 세션 이어하기"
                : "오늘 세션"}{" "}
              <ArrowRight size={16} />
            </button>
            <a
              href="#explore"
              className="text-button"
              onClick={event => {
                event.preventDefault();
                onNavigate("explore");
              }}
            >
              운동 탐색 <ChevronRight size={17} />
            </a>
          </div>
          <div className="hero-context" aria-label="오늘 운동 상태 요약">
            <article>
              <span>오늘의 강도</span>
              <b>
                {machineSessionIntensity.label} · RPE{" "}
                {machineSessionIntensity.rpe}
              </b>
              <small>
                {machineSessionIntensity.target} {atlasInteraction.resistance}%
              </small>
            </article>
            <article>
              <span>이번 주 흐름</span>
              {hasTrainingHistory ? (
                <>
                  <b>{weeklyCompletionPercent}% 완료</b>
                  <small>
                    {weeklyPlanInsight.completed}/{weeklyPlanInsight.total || 0}{" "}
                    세션
                  </small>
                </>
              ) : (
                // 0% 완료 · 0/3 세션은 처음 온 사람에게 알려주는 것이 없다.
                <>
                  <b>아직 기록 없음</b>
                  <small>첫 세션을 마치면 흐름이 쌓입니다</small>
                </>
              )}
            </article>
            {atlasInteraction.recentEquipmentSession && (
              <HeroRecentEquipmentResume
                label={
                  equipmentSessionSetup[
                    atlasInteraction.recentEquipmentSession.equipment
                  ].label
                }
                resistance={atlasInteraction.recentEquipmentSession.resistance}
                onResume={onResumeRecentSession}
              />
            )}
          </div>
        </div>
        <div className="hero-workspace">
          {/*
            드래그로 돌리는 의사(擬似) 3D 기구를 걷어냈다. rotateY 한 줄짜리 장식이라
            회전이 아무 값도 만들지 않았고, 홈에서 가장 큰 자리를 차지하면서 정작
            운동을 찾는 흐름을 아래로 밀어냈다. 실제로 하던 일은 장비 선택과 강도
            설정 두 가지뿐이라 그대로 읽히는 컨트롤로 남긴다.
            테마·모션 속도는 운동과 무관한 외형 설정이라 장면 설정으로 옮겼다.
          */}
          <div className="hero-workspace-bottom">
            <article
              className="hero-session-card"
              aria-label={`오늘의 ${sessionDuration}분 ${sessionGoal === "strength" ? "기초 근력" : sessionGoal === "endurance" ? "심폐 리듬" : "전신 균형"} 세션 요약`}
            >
              <p>{atlasRoute.label}</p>
              <b>
                {sessionDuration}
                <small> MIN</small>
              </b>
              <span>
                {sessionGoal === "strength"
                  ? "기초 근력"
                  : sessionGoal === "endurance"
                    ? "심폐 리듬"
                    : "전신 균형"}{" "}
                ·{" "}
                {
                  {
                    home: "집·매트",
                    gym: "헬스장",
                    outdoor: "야외·걷기",
                  }[sessionEnvironment]
                }
              </span>
              <small className="session-route-description">
                {atlasRoute.description} · {machineSessionIntensity.target}{" "}
                {atlasInteraction.resistance}% · {machineSessionIntensity.label}{" "}
                RPE {machineSessionIntensity.rpe}
              </small>

              <div
                className="session-equipment-picker"
                role="group"
                aria-label="장비 선택"
              >
                {(
                  [
                    ["cable", "케이블"],
                    ["dumbbell", "덤벨"],
                    ["treadmill", "트레드밀"],
                  ] as const
                ).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={atlasInteraction.heroEquipment === value}
                    className={
                      atlasInteraction.heroEquipment === value
                        ? "is-selected"
                        : ""
                    }
                    onClick={() => onChangeEquipment(value)}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <label className="session-resistance">
                <span>
                  강도 <b>{atlasInteraction.resistance}%</b>
                  <small>{machineSessionIntensity.label}</small>
                </span>
                <input
                  type="range"
                  min={20}
                  max={90}
                  step={2}
                  value={atlasInteraction.resistance}
                  aria-label="세션 강도"
                  onChange={event =>
                    onChangeResistance(Number(event.target.value))
                  }
                />
              </label>

              <button
                className="hero-session-start"
                onClick={onStartEquipmentSession}
              >
                이 장비로 세션 설계 <ArrowRight size={14} />
              </button>
            </article>
          </div>
        </div>
      </section>

      <section className="start-dock" aria-label="오늘의 주요 행동">
        <div className="start-dock-intro">
          <p className="eyebrow">START HERE</p>
          <h2>
            오늘, 무엇을
            <br />
            <em>시작할까요?</em>
          </h2>
          <p>복잡한 설정 없이 현재 목적에 맞는 한 가지 경로를 선택하세요.</p>
        </div>
        <div className="start-dock-actions">
          <a
            className="start-action start-action-explore"
            href="#explore"
            onClick={event => {
              event.preventDefault();
              onNavigate("explore");
            }}
          >
            <span>
              <BookOpen size={19} /> 운동 찾기
            </span>
            <b>
              {catalogStats.exerciseCount.toLocaleString()}개 운동
              <br />
              자세·부위·근거
            </b>
            <ArrowRight size={18} />
          </a>
          <button
            className="start-action start-action-session"
            onClick={onStartAllRoundSession}
          >
            <span>
              <Timer size={19} /> 오늘 세션
            </span>
            <b>
              {sessionDuration}분 맞춤
              <br />
              운동 설계
            </b>
            <ArrowRight size={18} />
          </button>
          <button
            className="start-action start-action-record"
            onClick={onOpenLog}
          >
            <span>
              <History size={19} /> 운동 기록
            </span>
            <b>
              {logCount}개 기록
              <br />
              변화 확인
            </b>
            <Plus size={18} />
          </button>
          <a
            className="start-action start-action-recover"
            href="#recovery"
            onClick={event => {
              event.preventDefault();
              onNavigate("wellness");
            }}
          >
            <span>
              <HeartPulse size={19} /> 회복 가이드
            </span>
            <b>
              불편감·피로
              <br />
              가벼운 회복
            </b>
            <ArrowRight size={18} />
          </a>
        </div>
      </section>
      {/* 0% · 0/3 · 0건만 가득한 통계는 처음 온 사람에게 보여줄 것이 없다.
          기록이 쌓인 뒤에만 띄운다. 반면 주간 목표 설정은 시작하는 사람에게
          필요한 출발점이라 항상 남긴다. */}
      {hasTrainingHistory && (
        <section
          className={`weekly-atlas-report signal-${atlasPerformance}`}
          aria-label="주간 아틀라스 요약 리포트"
        >
          <div className="weekly-report-head">
            <div>
              <p className="eyebrow">WEEKLY ATLAS</p>
              <h2>이번 주 흐름</h2>
            </div>
            <span>{atlasSignalSummary.title}</span>
          </div>
          <div className="weekly-report-body">
            <div
              className="weekly-signal-orbit"
              style={
                {
                  "--report-progress": `${weeklyCompletionPercent}%`,
                } as React.CSSProperties
              }
            >
              <b>
                {weeklyCompletionPercent}
                <small>%</small>
              </b>
              <span>완료</span>
            </div>
            <div className="weekly-report-metrics">
              <article>
                <span>완료 세션</span>
                <b>
                  {weeklyPlanInsight.completed}
                  <small>/{weeklyPlanInsight.total || 0}</small>
                </b>
              </article>
              <article>
                <span>운동 기록</span>
                <b>{weeklyPlanInsight.loggedThisWeek}</b>
              </article>
              <article>
                <span>아틀라스</span>
                <b>
                  {atlasPerformance === "surge"
                    ? "HIGH"
                    : atlasPerformance === "active"
                      ? "FLOW"
                      : "READY"}
                </b>
              </article>
            </div>
            <p>{atlasSignalSummary.detail}</p>
          </div>
        </section>
      )}
      <WeeklyAtlasDetailReport
        showFlow={hasTrainingHistory}
        flow={weeklyCompletionFlow}
        goal={weeklyPlan.goal}
        onGoal={onChangeWeeklyGoal}
        direction={weeklyDirection}
        onOpenSession={() => onNavigate("session")}
      />

      <section className="today-command" aria-label="오늘의 시작">
        <div className="today-command-copy">
          <p className="eyebrow">TODAY'S READINESS</p>
          <div className="today-command-title">
            <Brain size={21} />
            <h2>{checkinRecommendation.title}</h2>
          </div>
          <p>{checkinRecommendation.guidance}</p>
          <button className="dark-button" onClick={() => onNavigate("session")}>
            오늘의 기준 확인 <ArrowRight size={15} />
          </button>
        </div>
        <div className="today-command-meta">
          <article>
            <span>CATALOG</span>
            <b>{catalogStats.exerciseCount.toLocaleString()}</b>
            <p>독립 운동 종목</p>
          </article>
          <article>
            <span>RECORDS</span>
            <b>{logCount}</b>
            <p>기록된 운동</p>
          </article>
          <article>
            <span>SESSION</span>
            <b>
              {sessionDuration}
              <small>min</small>
            </b>
            <p>현재 설계 시간</p>
          </article>
        </div>
      </section>
    </section>
  );
}
