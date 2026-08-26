import { useEffect, useState } from "react";
import { Activity, ShieldCheck, Timer } from "lucide-react";
import { SeatedRecoveryPanel } from "@/components/GuidancePanels";
import { SectionTitle } from "@/components/SectionPrimitives";
import type { CheckinRecommendation } from "@/lib/dailyCheckin";
import { getRoutineTemplate, type RoutineGoal } from "@/lib/routineTemplates";
import type {
  RecoveryContext,
  SeatedRecoveryDuration,
} from "@/lib/seatedRecovery";

const wellnessJumpItems = [
  { id: "recovery", label: "회복 시작" },
  { id: "wellness", label: "생활 습관" },
  { id: "cardio-intervals", label: "유산소" },
  { id: "quiet-circuits", label: "무점프" },
  { id: "start-safely", label: "안전" },
] as const;

function WellnessQuickNav({ onJump }: { onJump: (id: string) => void }) {
  const [activeSection, setActiveSection] =
    useState<(typeof wellnessJumpItems)[number]["id"]>("recovery");
  useEffect(() => {
    if (typeof window === "undefined" || !window.IntersectionObserver) return;
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort(
            (left, right) => right.intersectionRatio - left.intersectionRatio
          )[0];
        if (
          visible &&
          wellnessJumpItems.some(item => item.id === visible.target.id)
        )
          setActiveSection(
            visible.target.id as (typeof wellnessJumpItems)[number]["id"]
          );
      },
      { rootMargin: "-20% 0px -62% 0px", threshold: [0.15, 0.4, 0.7] }
    );
    wellnessJumpItems.forEach(item => {
      const target = document.getElementById(item.id);
      if (target) observer.observe(target);
    });
    return () => observer.disconnect();
  }, []);
  return (
    <nav className="wellness-toc" aria-label="웰니스 화면 빠른 이동">
      <span>빠른 이동</span>
      {wellnessJumpItems.map(item => (
        <button
          type="button"
          key={item.id}
          className={activeSection === item.id ? "is-active" : ""}
          aria-current={activeSection === item.id ? "location" : undefined}
          onClick={() => {
            setActiveSection(item.id);
            onJump(item.id);
          }}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}

type WorkdayRecoverySceneProps = {
  onJumpToSection: (id: string) => void;
  seatedRecoveryDuration: SeatedRecoveryDuration;
  onChangeDuration: (duration: SeatedRecoveryDuration) => void;
  checkinRecommendation: CheckinRecommendation;
  recoveryContext: RecoveryContext;
  onExploreExercise: (exerciseId: string) => void;
  onBuildLightSession: () => void;
  onGoToAnatomy: () => void;
  routineGoal: RoutineGoal;
  onChangeRoutineGoal: (goal: RoutineGoal) => void;
  routine: ReturnType<typeof getRoutineTemplate>;
};

export function WorkdayRecoveryScene({
  onJumpToSection,
  seatedRecoveryDuration,
  onChangeDuration,
  checkinRecommendation,
  recoveryContext,
  onExploreExercise,
  onBuildLightSession,
  onGoToAnatomy,
  routineGoal,
  onChangeRoutineGoal,
  routine,
}: WorkdayRecoverySceneProps) {
  return (
    <section
      id="scene-wellness"
      className="scene-view scene-view-wellness"
      tabIndex={-1}
    >
      <WellnessQuickNav onJump={onJumpToSection} />
      <section id="recovery" className="seated-recovery-section section-pad">
        <SectionTitle
          eyebrow="WORKDAY RECOVERY"
          title="오래 앉은 뒤, 다음 작업을 위한 짧은 전환."
          description="장시간 같은 자세 뒤에 환경을 확인하고 가볍게 움직이는 일반 교육용 루틴입니다. 통증을 치료하려 하거나 무리한 스트레칭을 하는 대신, 작은 범위와 반응 확인을 우선합니다."
        />
        <section className="recovery-start" aria-label="빠른 회복 시작">
          <div>
            <p className="eyebrow">START SMALL</p>
            <h3>지금은 무엇이 필요한가요?</h3>
            <p>
              불편감이 없다면 5분 움직임으로 재시작하고, 특정 부위가 신경 쓰이면
              부위별 안내로 이동하세요.
            </p>
          </div>
          <div className="recovery-start-actions">
            <button
              className="recovery-primary"
              onClick={() => onChangeDuration(5)}
            >
              <Timer size={17} /> 5분 가볍게 시작
            </button>
            <button className="recovery-secondary" onClick={onGoToAnatomy}>
              <Activity size={17} /> 부위별로 확인
            </button>
          </div>
        </section>
        <SeatedRecoveryPanel
          duration={seatedRecoveryDuration}
          onDuration={onChangeDuration}
          recommendation={checkinRecommendation}
          recoveryContext={recoveryContext}
          onExplore={onExploreExercise}
          onBuildSession={onBuildLightSession}
        />
      </section>

      <section className="routine-section section-pad">
        <SectionTitle
          eyebrow="ROUTINE LIBRARY"
          title="목표를 루틴으로, 루틴을 리듬으로."
          description="4주 템플릿은 일반적인 시작 구조입니다. 주차를 통과하기보다 통증·피로·수면 반응에 맞춰 머무르거나 가볍게 조절하세요."
        />
        <div className="routine-goals">
          {(
            [
              "strength",
              "endurance",
              "weight_management",
              "general_health",
            ] as RoutineGoal[]
          ).map(item => (
            <button
              key={item}
              className={routineGoal === item ? "is-selected" : ""}
              onClick={() => onChangeRoutineGoal(item)}
            >
              {
                {
                  strength: "근력",
                  endurance: "심폐",
                  weight_management: "체중 관리",
                  general_health: "전신 건강",
                }[item]
              }
            </button>
          ))}
        </div>
        <div className="routine-card">
          <div className="routine-intro">
            <p className="eyebrow">
              {routineGoal.replace("_", " ").toUpperCase()}
            </p>
            <h3>{routine.title}</h3>
            <p>{routine.intro}</p>
            <div className="routine-safety">
              <ShieldCheck size={16} />
              {routine.safetyNote}
            </div>
          </div>
          <div className="routine-weeks">
            {routine.weeks.map(week => (
              <article key={week.week}>
                <span>W{week.week}</span>
                <div>
                  <p className="small-label">
                    {week.theme} · {week.sessions}
                  </p>
                  <ul>
                    {week.focus.map(item => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <p>{week.note}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}
