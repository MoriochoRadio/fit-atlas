import type React from "react";
import { Download, Loader2 } from "lucide-react";
import {
  getCurrentWeekRomStatus,
  getFourWeekRomStatus,
} from "@/lib/romStatusHistory";

type RomStatusDashboardProps = {
  days: ReturnType<typeof getCurrentWeekRomStatus>;
  dashboardRef: React.RefObject<HTMLElement | null>;
  exporting: boolean;
  onExport: () => void;
  routineCompletion: { completed: number; total: number };
  exportMeta: { period: string; note: string };
  onChangeMeta: (key: "period" | "note", value: string) => void;
  monthlySummary: ReturnType<typeof getFourWeekRomStatus>;
};

export function RomStatusDashboard({
  days,
  dashboardRef,
  exporting,
  onExport,
  routineCompletion,
  exportMeta,
  onChangeMeta,
  monthlySummary,
}: RomStatusDashboardProps) {
  const recorded = days.filter(day => day.record);
  const averagePain = recorded.length
    ? (
        recorded.reduce((sum, day) => sum + (day.record?.pain ?? 0), 0) /
        recorded.length
      ).toFixed(1)
    : "—";
  return (
    <section
      ref={dashboardRef}
      className="rom-status-dashboard"
      aria-label="주간 피로 통증 및 추천 ROM 대시보드"
    >
      <div className="rom-status-head">
        <div>
          <p className="small-label">WEEKLY READINESS · LOCAL ONLY</p>
          <h3>이번 주 피로·통증·ROM 흐름</h3>
          <p>
            체크인한 날짜만 표시합니다. 빈 칸은 입력이 없는 날이며, 점수는
            진단이 아닌 오늘의 운동 조절 참고용입니다.
          </p>
        </div>
        <div>
          <button
            className="rom-export-button"
            onClick={onExport}
            disabled={exporting}
            aria-label="주간 상태 그래프 PNG로 내보내기"
          >
            {exporting ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Download size={14} />
            )}
            {exporting ? "이미지 준비 중" : "PNG 저장"}
          </button>
          <b>{recorded.length}/7</b>
          <span>일 입력 · 평균 통증 {averagePain}</span>
          <span>
            루틴 완료 {routineCompletion.completed}/{routineCompletion.total} ·{" "}
            {routineCompletion.total
              ? Math.round(
                  (routineCompletion.completed / routineCompletion.total) * 100
                )
              : 0}
            %
          </span>
        </div>
      </div>
      <div className="dashboard-export-note">
        <label>
          기록 기간
          <input
            value={exportMeta.period}
            maxLength={40}
            onChange={event => onChangeMeta("period", event.target.value)}
            aria-label="PNG 기록 기간"
          />
        </label>
        <label>
          메모
          <textarea
            value={exportMeta.note}
            maxLength={120}
            onChange={event => onChangeMeta("note", event.target.value)}
            placeholder="예: 무릎 상태를 확인하며 작은 범위로 진행"
            aria-label="PNG 기록 메모"
          />
        </label>
        <small>입력한 기간·메모는 PNG에 함께 저장됩니다.</small>
      </div>
      <div className="rom-status-week">
        {days.map(day => (
          <article
            key={day.date}
            className={
              day.record ? `has-status rom-${day.record.recommendedRom}` : ""
            }
          >
            <span>{day.label}</span>
            {day.record ? (
              <>
                <div
                  className="rom-status-bars"
                  aria-label={`${day.label} 에너지 ${day.record.energy}, 통증 ${day.record.pain}`}
                >
                  <i
                    className="energy"
                    style={{ height: `${day.record.energy * 20}%` }}
                  />
                  <i
                    className="pain"
                    style={{ height: `${day.record.pain * 20}%` }}
                  />
                </div>
                <b>{day.record.recommendedRom}</b>
                <small>
                  E {day.record.energy} · P {day.record.pain}
                </small>
              </>
            ) : (
              <p>
                입력
                <br />
                대기
              </p>
            )}
          </article>
        ))}
      </div>
      <div className="rom-status-legend">
        <span>
          <i className="energy" />
          에너지
        </span>
        <span>
          <i className="pain" />
          통증
        </span>
        <span>ROM · 작음 / 보통 / 회복</span>
      </div>
      <section
        className="monthly-rom-summary"
        aria-label="최근 4주 완료율 및 피로도 변화"
      >
        <div>
          <p className="small-label">4-WEEK SUMMARY</p>
          <h4>완료율과 피로 변화</h4>
          <p>
            기록이 있는 주만 수치를 표시하며, 이전 주의 완료율은 로컬에 남은
            실제 계획 데이터가 있을 때만 보여 줍니다.
          </p>
        </div>
        <div className="monthly-rom-bars">
          {monthlySummary.map(week => (
            <article key={week.label}>
              <span>{week.label}</span>
              {week.recordedDays ? (
                <div className="monthly-bar-pair">
                  <i
                    className="completion"
                    style={{ height: `${week.completionRate ?? 0}%` }}
                    title={
                      week.completionRate === null
                        ? "완료 기록 대기"
                        : `완료율 ${week.completionRate}%`
                    }
                  />
                  <i
                    className="fatigue"
                    style={{ height: `${(week.fatigueAverage ?? 0) * 20}%` }}
                    title={`평균 피로 ${week.fatigueAverage ?? "—"}`}
                  />
                </div>
              ) : (
                <div className="monthly-bar-empty">—</div>
              )}
              <b>
                {week.completionRate === null
                  ? "완료—"
                  : `${week.completionRate}%`}
              </b>
              <small>
                {week.fatigueAverage === null
                  ? "피로—"
                  : `피로 ${week.fatigueAverage}`}
              </small>
            </article>
          ))}
        </div>
        <div className="monthly-rom-legend">
          <span>
            <i className="completion" />
            완료율
          </span>
          <span>
            <i className="fatigue" />
            피로
          </span>
        </div>
      </section>
    </section>
  );
}
