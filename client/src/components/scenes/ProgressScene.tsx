import type React from "react";
import {
  Activity,
  ArrowRight,
  BarChart3,
  CalendarDays,
  Dumbbell,
  Plus,
  Sparkles,
  Timer,
  TrendingUp,
} from "lucide-react";
import { Metric, SectionTitle } from "@/components/SectionPrimitives";
import { RomStatusDashboard } from "@/components/RomStatusDashboard";
import type {
  getCalendarDays,
  getFourWeekTrends,
  getPersonalRecords,
  getWeeklyVolume,
  TrainingLog,
} from "@/lib/trainingMetrics";
import type { getInsightSummary } from "@/lib/trainingInsights";
import type { ExerciseProgression } from "@/lib/exerciseProgression";
import type {
  getCurrentWeekRomStatus,
  getFourWeekRomStatus,
} from "@/lib/romStatusHistory";

type ProgressSceneProps = {
  logs: TrainingLog[];
  totalVolume: number;
  totalMinutes: number;
  insights: ReturnType<typeof getInsightSummary>;
  progressions: ExerciseProgression[];
  weeklyVolume: ReturnType<typeof getWeeklyVolume>;
  maxWeeklyVolume: number;
  fourWeekTrends: ReturnType<typeof getFourWeekTrends>;
  maxFourWeekLoad: number;
  calendarDays: ReturnType<typeof getCalendarDays>;
  pr: ReturnType<typeof getPersonalRecords>;
  weekRomStatus: ReturnType<typeof getCurrentWeekRomStatus>;
  fourWeekRomStatus: ReturnType<typeof getFourWeekRomStatus>;
  romDashboardRef: React.RefObject<HTMLElement | null>;
  romDashboardExporting: boolean;
  onExportRomDashboard: () => void;
  routineCompletion: { completed: number; total: number };
  dashboardExportMeta: { period: string; note: string };
  onChangeDashboardMeta: (key: "period" | "note", value: string) => void;
  onOpenLog: () => void;
};

export function ProgressScene({
  logs,
  totalVolume,
  totalMinutes,
  insights,
  progressions,
  weeklyVolume,
  maxWeeklyVolume,
  fourWeekTrends,
  maxFourWeekLoad,
  calendarDays,
  pr,
  weekRomStatus,
  fourWeekRomStatus,
  romDashboardRef,
  romDashboardExporting,
  onExportRomDashboard,
  routineCompletion,
  dashboardExportMeta,
  onChangeDashboardMeta,
  onOpenLog,
}: ProgressSceneProps) {
  return (
    <section
      id="scene-progress"
      className="scene-view scene-view-progress"
      tabIndex={-1}
    >
      <section id="progress" className="progress-section section-pad">
        <SectionTitle
          eyebrow="TRAINING LOG"
          title="기록은 감이 아닌 방향을 만듭니다."
          description="종목·세트·횟수·중량·시간·강도를 기록하면 누적 볼륨과 개인 최고 기록을 확인할 수 있습니다."
          action={
            <button className="dark-button" onClick={onOpenLog}>
              <Plus size={16} /> 새 기록
            </button>
          }
        />
        <RomStatusDashboard
          days={weekRomStatus}
          dashboardRef={romDashboardRef}
          exporting={romDashboardExporting}
          onExport={onExportRomDashboard}
          routineCompletion={routineCompletion}
          exportMeta={dashboardExportMeta}
          onChangeMeta={onChangeDashboardMeta}
          monthlySummary={fourWeekRomStatus}
        />
        <div className="metric-row">
          <Metric
            icon={<Dumbbell size={18} />}
            label="누적 볼륨"
            value={logs.length ? `${totalVolume.toLocaleString()} kg` : "—"}
            caption={logs.length ? "기록된 세트 기준" : "기록을 추가해 시작"}
          />
          <Metric
            icon={<Timer size={18} />}
            label="운동 시간"
            value={logs.length ? `${totalMinutes}분` : "—"}
            caption={logs.length ? "누적 기록 기준" : "아직 기록 없음"}
          />
          <Metric
            icon={<Activity size={18} />}
            label="세션 수"
            value={`${logs.length}`}
            caption="기록된 운동"
          />
          <Metric
            icon={<CalendarDays size={18} />}
            label="이번 주"
            value={`${insights.load.sessions}`}
            caption="최근 7일 기록"
          />
        </div>
        <div className="insight-row">
          <article>
            <p className="small-label">TRAINING LOAD</p>
            <h3>
              {insights.load.load
                ? `${insights.load.load} 부하점수`
                : "기록 대기"}
            </h3>
            <p>{insights.loadLabel}</p>
          </article>
          <article>
            <p className="small-label">CONSISTENCY</p>
            <h3>
              {insights.consistency.activeDays
                ? `주 평균 ${insights.consistency.weeklyAverage}일`
                : "습관 만들기"}
            </h3>
            <p>{insights.consistencyLabel}</p>
          </article>
          <article>
            <p className="small-label">BODY BALANCE</p>
            <h3>{insights.balance[0]?.region ?? "부위 분석 대기"}</h3>
            <p>{insights.balanceLabel}</p>
            {insights.balance.length > 0 && (
              <div className="balance-tags">
                {insights.balance.slice(0, 4).map(item => (
                  <span key={item.region}>{item.region}</span>
                ))}
              </div>
            )}
          </article>
        </div>
        <div className="aerobic-trend-row">
          <article>
            <p className="small-label">AEROBIC INTENSITY · RPE</p>
            <h3>
              {insights.aerobic.band}
              {insights.aerobic.sessions
                ? ` · RPE ${insights.aerobic.averageRpe}`
                : ""}
            </h3>
            <p>{insights.aerobic.label}</p>
          </article>
          <article>
            <p className="small-label">EXERCISE TREND · 7 DAYS</p>
            <h3>
              {insights.trend.direction} · {insights.prTrend.direction}
            </h3>
            <p>
              {insights.trend.label}
              <br />
              {insights.streak.label} · {insights.prTrend.label}
            </p>
          </article>
        </div>
        {progressions.length > 0 && (
          <section
            className="exercise-progression-card"
            aria-label="종목별 진척"
          >
            <div className="card-title">
              <div>
                <p className="small-label">PER-EXERCISE PROGRESS</p>
                <h3>같은 종목이 어떻게 달라졌나</h3>
              </div>
              <TrendingUp size={21} />
            </div>
            <p className="exercise-progression-note">
              두 번 이상 기록한 종목만 표시합니다. 중량을 쓰는 종목은 중량으로,
              맨몸 종목은 총 반복 수로 견줍니다. 숫자를 올리는 것보다 통증 없는
              범위를 유지하는 편이 우선입니다.
            </p>
            <ol className="exercise-progression-list">
              {progressions.map(item => {
                const peak = Math.max(
                  ...item.points.map(point =>
                    item.measure === "load"
                      ? point.load
                      : point.sets * point.reps
                  ),
                  1
                );
                return (
                  <li key={item.exercise}>
                    <div className="exercise-progression-head">
                      <b>{item.exercise}</b>
                      <span className={`is-${item.direction}`}>
                        {item.measureLabel} {item.direction}
                      </span>
                      <small>{item.sessions}회 기록</small>
                    </div>
                    <div
                      className="exercise-progression-bars"
                      aria-label={`${item.exercise} ${item.measureLabel} 변화`}
                    >
                      {item.points.slice(-8).map(point => {
                        const value =
                          item.measure === "load"
                            ? point.load
                            : point.sets * point.reps;
                        return (
                          <i
                            key={point.date}
                            style={{
                              height: `${Math.max((value / peak) * 100, 6)}%`,
                            }}
                            title={`${point.date} · ${value}${item.measure === "load" ? "kg" : "회"}`}
                          />
                        );
                      })}
                    </div>
                    <p>{item.summary}</p>
                  </li>
                );
              })}
            </ol>
          </section>
        )}
        <div className="four-week-card">
          <div className="card-title">
            <div>
              <p className="small-label">4-WEEK RHYTHM</p>
              <h3>시간·거리·부하의 흐름</h3>
            </div>
            <BarChart3 size={21} />
          </div>
          <div className="four-week-bars" aria-label="최근 4주 운동 부하 추세">
            {fourWeekTrends.map(item => (
              <div key={item.label}>
                <div className="four-week-bar-track">
                  <i
                    style={{
                      height: `${Math.max((item.load / maxFourWeekLoad) * 100, item.load ? 7 : 2)}%`,
                    }}
                  />
                </div>
                <b>{item.label}</b>
                <span>
                  {item.minutes}분 ·{" "}
                  {item.distanceKm ? `${item.distanceKm}km` : "거리—"}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="analytics-grid">
          <div className="chart-card">
            <div className="card-title">
              <div>
                <p className="small-label">WEEKLY VOLUME</p>
                <h3>최근 7일 볼륨</h3>
              </div>
              <BarChart3 size={21} />
            </div>
            {logs.length ? (
              <div className="volume-bars" aria-label="최근 7일 운동 볼륨">
                {weeklyVolume.map(item => (
                  <div
                    className="volume-column"
                    key={item.day}
                    title={`${item.day}: ${item.volume.toLocaleString()} kg`}
                  >
                    <i
                      style={{
                        height: `${Math.max((item.volume / maxWeeklyVolume) * 100, item.volume ? 7 : 2)}%`,
                      }}
                    />
                    <span>{item.day}</span>
                    <b>
                      {item.volume ? `${Math.round(item.volume / 1000)}k` : "·"}
                    </b>
                  </div>
                ))}
              </div>
            ) : (
              <div className="chart-empty">
                <div className="ghost-bars">
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
                <p>
                  <strong>첫 기록 하나면 충분합니다.</strong>
                  <br />
                  종목·시간·강도만 남겨도 다음 세션의 기준이 생깁니다.
                </p>
                <div
                  className="first-record-route"
                  aria-label="첫 기록 다음 흐름"
                >
                  <span>
                    <b>01</b> 운동·시간·RPE 입력
                  </span>
                  <span>
                    <b>02</b> 주간 흐름에 첫 신호 표시
                  </span>
                </div>
                <button className="empty-state-action" onClick={onOpenLog}>
                  첫 기록 남기기 <ArrowRight size={14} />
                </button>
              </div>
            )}
          </div>
          <div className="pr-card">
            <p className="small-label">PERSONAL RECORDS</p>
            <h3>개인 최고 기록</h3>
            {Object.keys(pr).length ? (
              <div className="pr-list">
                {Object.entries(pr).map(([name, value]) => (
                  <div key={name}>
                    <span>{name}</span>
                    <b>{value} kg</b>
                  </div>
                ))}
              </div>
            ) : (
              <div className="pr-empty">
                <span className="pr-orbit">
                  <Sparkles size={21} />
                </span>
                <p>
                  중량 기록을 추가해
                  <br />첫 PR을 만들어 보세요.
                </p>
              </div>
            )}
            <button className="text-button dark-text" onClick={onOpenLog}>
              기록 추가하기 <ArrowRight size={15} />
            </button>
          </div>
        </div>
        <div className="calendar-card">
          <div>
            <p className="small-label">ACTIVITY CALENDAR</p>
            <h3>날짜별 운동 기록</h3>
          </div>
          <div>
            {
              <div className="week-calendar">
                {calendarDays.map(day => (
                  <div
                    key={day.key}
                    className={day.count ? "has-activity" : ""}
                  >
                    <span>{day.weekday}</span>
                    <b>{day.day}</b>
                    <i>{day.count || "·"}</i>
                  </div>
                ))}
              </div>
            }
            {logs.length ? (
              <div className="log-table">
                {logs.slice(0, 4).map(log => (
                  <div key={log.id}>
                    <span>{log.date.slice(5).replace("-", ".")}.</span>
                    <b>{log.exercise}</b>
                    <span>
                      {log.sets}세트 · {log.reps}회 · {log.load}kg
                    </span>
                    <span>RPE {log.intensity}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="calendar-empty">
                <CalendarDays size={22} />
                <p>
                  아직 기록된 운동이 없습니다. 세트와 강도를 남겨 다음 세션의
                  기준을 만들어 보세요.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </section>
  );
}
