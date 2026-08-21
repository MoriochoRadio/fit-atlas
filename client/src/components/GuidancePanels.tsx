import { ArrowRight, CheckCircle2, RotateCcw, ShieldCheck, Star, Trash2 } from "lucide-react";
import * as React from "react";
import { useEffect, useState } from "react";
import type { MovementVisual } from "@/lib/movementVisuals";
import type { RecoveryStageGuide } from "@/lib/recoveryProtocols";
import type { RecoveryPathway, RecoveryPathwayId } from "@/lib/recoveryPathways";
import { getSeatedRecoveryAdjustment, seatedRecoveryRoutines, seatedRecoveryStopSignals, type RecoveryContext, type SeatedRecoveryDuration } from "@/lib/seatedRecovery";
import type { CheckinRecommendation } from "@/lib/dailyCheckin";
import type { WellnessDetail } from "@/lib/wellnessDetails";
import { readLocalWellnessPreferences, recoveryNoteMaxLength, saveLocalWellnessPreferences, type RecoveryReflection, type RecoveryRoutineRecord } from "@/lib/wellnessPreferences";
import { summarizeRecoveryHistory } from "@/lib/recoveryHistorySummary";

export function MovementVisualGuide({ title, frames }: MovementVisual) {
  return <div className="movement-visual"><p className="small-label">{title.toUpperCase()}</p><div className="movement-frames">{frames.map((frame, index) => <div className="movement-frame" key={frame.label}><div className={`pose-silhouette pose-${frame.pose}`} aria-hidden="true"><i className="pose-head" /><i className="pose-body" /><i className="pose-arm arm-one" /><i className="pose-arm arm-two" /><i className="pose-leg leg-one" /><i className="pose-leg leg-two" /></div><b>{index + 1}. {frame.label}</b><span>{frame.cue}</span></div>)}</div></div>;
}

export function RecoveryStageGrid({ stages }: { stages: RecoveryStageGuide }) {
  const stageGroups = [["운동 전 준비", stages.beforeSession], ["운동 후 회복", stages.afterSession], ["부하 재개", stages.returnToLoad]] as const;
  return <div className="recovery-stage-grid" aria-label="회복 프로토콜 단계">{stageGroups.map(([label, steps], index) => <article key={label} data-recovery-stage={String(index + 1).padStart(2, "0")}><p className="small-label">{String(index + 1).padStart(2, "0")} / {label}</p><ul>{steps.map((step) => <li key={step}>{step}</li>)}</ul></article>)}</div>;
}

export function WellnessDetailPanel({ detail }: { detail: WellnessDetail }) {
  return <div className="wellness-detail"><p className="small-label">일상 실천</p><ul>{detail.practices.map((item) => <li key={item}>{item}</li>)}</ul><p className="small-label">운동 맥락</p><ul>{detail.trainingContext.map((item) => <li key={item}>{item}</li>)}</ul><p className="wellness-caution">{detail.caution}</p></div>;
}

export function RecoveryPathwayPanel({ pathways, pathway, alternatives, onChoose, onExplore }: { pathways: RecoveryPathway[]; pathway: RecoveryPathway; alternatives: Array<{ id: string; name: string; category: string }>; onChoose: (id: RecoveryPathwayId) => void; onExplore: (id: string) => void }) {
  return <section className="recovery-pathway" aria-label="관절과 움직임별 회복 선택 경로"><div className="pathway-heading"><div><p className="eyebrow">MOVE WITH CARE</p><h3>불편할 땐, 멈추는 것만이 답은 아닙니다.</h3><p>이 선택지는 일반 교육용입니다. 위험 신호가 없을 때에만 반응을 관찰하며 더 쉬운 움직임으로 전환하세요.</p></div><ShieldCheck size={21} /></div><div className="pathway-tabs">{pathways.map((item) => <button key={item.id} className={pathway.id === item.id ? "is-selected" : ""} onClick={() => onChoose(item.id)}>{item.label}</button>)}</div><div className="pathway-grid"><article><p className="small-label">운동 전 확인</p><h4>{pathway.label}</h4><p>{pathway.summary}</p><ul>{pathway.checkBefore.map((item) => <li key={item}>{item}</li>)}</ul></article><article><p className="small-label">오늘의 가벼운 대체</p><ul>{pathway.chooseInstead.map((item) => <li key={item}>{item}</li>)}</ul><div className="pathway-alternatives">{alternatives.map((item) => <button key={item.id} onClick={() => onExplore(item.id)}><span>{item.category}</span>{item.name}<ArrowRight size={14} /></button>)}</div></article><article><p className="small-label">재개 기준</p><p>{pathway.returnRule}</p><div className="pathway-stop"><ShieldCheck size={15} /><div><b>자가 진행을 멈출 신호</b><ul>{pathway.stopSignals.map((item) => <li key={item}>{item}</li>)}</ul></div></div></article></div></section>;
}

const reflectionLabels: Record<RecoveryReflection, string> = { lighter: "가벼워짐", same: "비슷함", pause: "쉬어가기" };

function RecoveryHistoryTimeline({ history, onResume, onDelete, onClear }: { history: RecoveryRoutineRecord[]; onResume: (duration: SeatedRecoveryDuration) => void; onDelete: (record: RecoveryRoutineRecord) => void; onClear: () => void }) {
  const summary = summarizeRecoveryHistory(history);
  const [isClearReady, setIsClearReady] = useState(false);
  const [filter, setFilter] = useState<"all" | "lighter" | "same" | "pause" | "5" | "10">("all");
  const [query, setQuery] = useState("");
  if (history.length === 0) return null;
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const filteredHistory = history.filter((record) => (filter === "all" || filter === String(record.duration) || record.reflection === filter) && (normalizedQuery.length === 0 || record.note.toLocaleLowerCase().includes(normalizedQuery)));
  const latestRecord = history[0];
  const previousRecord = history[1];
  const recentChange = !latestRecord?.reflection ? "최근 기록의 체감을 선택하면 직전 기록과 비교합니다." : !previousRecord?.reflection ? `최근 체감은 ${reflectionLabels[latestRecord.reflection]}입니다. 다음 기록부터 변화가 비교됩니다.` : latestRecord.reflection === previousRecord.reflection ? `직전 기록과 같은 ${reflectionLabels[latestRecord.reflection]} 흐름입니다.` : `직전 ${reflectionLabels[previousRecord.reflection]} → 최근 ${reflectionLabels[latestRecord.reflection]}로 바뀌었습니다.`;
  const recentFour = history.slice(0, 4);
  const filterContext = [filter !== "all" ? `${filter === "5" || filter === "10" ? `${filter}분 루틴` : `${reflectionLabels[filter as RecoveryReflection]} 체감`}` : null, normalizedQuery ? `메모 “${query.trim()}”` : null, "최근 변화 비교 유지"].filter(Boolean).join(" · ");
  const resetFilters = () => {
    setFilter("all");
    setQuery("");
  };
  const confirmClear = () => {
    onClear();
    setIsClearReady(false);
  };
  return <section className="recovery-history" aria-label="최근 회복 수행 기록">
    <div className="recovery-history-heading"><div><p className="small-label">RECENT RECOVERY · LOCAL ONLY</p><h4>최근 회복 기록</h4><p>이 브라우저에 저장된 최근 {history.length}회입니다.</p></div><div className="recovery-history-actions">{isClearReady ? <><button type="button" onClick={() => setIsClearReady(false)}>취소</button><button type="button" className="is-danger" onClick={confirmClear}>전체 기록 삭제</button></> : <button type="button" onClick={() => setIsClearReady(true)}><Trash2 size={13} /> 전체 초기화</button>}<RotateCcw size={18} aria-hidden="true" /></div></div>
    <div className="recovery-history-summary" aria-label="최근 회복 기록 요약"><div><span>최근 기록</span><b>{summary.total}회</b></div><div><span>가벼워짐</span><b>{summary.reflections.lighter}회</b></div><div><span>자주 한 루틴</span><b>{summary.mostUsedDuration}분 · {summary.durations[summary.mostUsedDuration!]}회</b></div></div><div className="recovery-history-trend" aria-label="최근 회복 변화 비교"><span>RECENT CHANGE</span><p>{recentChange}</p></div><div className="recovery-history-four-trend" aria-label="최근 4회 체감 흐름"><span>LAST {recentFour.length} / 4</span><ol>{recentFour.map((record, index) => <li key={`${record.completedAt ?? record.completedOn}-${record.duration}-${index}`} className={record.reflection ? `is-${record.reflection}` : "is-pending"}><b>{String(index + 1).padStart(2, "0")}</b><span>{record.reflection ? reflectionLabels[record.reflection] : "체감 대기"}</span></li>)}</ol></div>
    <div className="recovery-history-filters" role="group" aria-label="회복 기록 필터"><button type="button" className={filter === "all" ? "is-selected" : ""} aria-pressed={filter === "all"} aria-label="전체 기록 필터" onClick={() => setFilter("all")}>전체 {history.length}</button><button type="button" className={filter === "lighter" ? "is-selected" : ""} aria-pressed={filter === "lighter"} aria-label="가벼워짐 기록 필터" onClick={() => setFilter("lighter")}>가벼워짐 {summary.reflections.lighter}</button><button type="button" className={filter === "same" ? "is-selected" : ""} aria-pressed={filter === "same"} aria-label="비슷함 기록 필터" onClick={() => setFilter("same")}>비슷함 {summary.reflections.same}</button><button type="button" className={filter === "pause" ? "is-selected" : ""} aria-pressed={filter === "pause"} aria-label="쉬어가기 기록 필터" onClick={() => setFilter("pause")}>쉬어가기 {summary.reflections.pause}</button><button type="button" className={filter === "5" ? "is-selected" : ""} aria-pressed={filter === "5"} aria-label="5분 루틴 필터" onClick={() => setFilter("5")}>5분 {summary.durations[5]}</button><button type="button" className={filter === "10" ? "is-selected" : ""} aria-pressed={filter === "10"} aria-label="10분 루틴 필터" onClick={() => setFilter("10")}>10분 {summary.durations[10]}</button></div>
    <div className="recovery-history-search"><label htmlFor="recovery-history-search">회복 메모 검색</label><div><input id="recovery-history-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="메모의 단어를 입력하세요" />{query && <button type="button" aria-label="메모 검색어 지우기" onClick={() => setQuery("")}>지우기</button>}</div></div>
    {isClearReady && <p className="recovery-history-confirm" aria-live="polite">이 브라우저에 저장된 회복 기록만 지웁니다. 저장한 루틴은 유지됩니다.</p>}
    <p className="recovery-history-filter-count" aria-live="polite">표시 {filteredHistory.length}/{history.length}회</p><p className="recovery-history-filter-context" aria-live="polite">{filterContext}</p>
    {filteredHistory.length > 0 ? <ol>{filteredHistory.map((record, index) => <li key={`${record.completedAt ?? record.completedOn}-${record.duration}-${index}`}><div><b><span className="recovery-history-sequence">RECENT {String(index + 1).padStart(2, "0")}</span>{record.duration}분 자리 회복</b><span>{record.completedOn} · {record.reflection ? reflectionLabels[record.reflection] : "체감 미입력"}</span>{record.note && <p className="recovery-history-note">{record.note}</p>}</div><div className="recovery-history-item-actions"><button type="button" aria-label={`${record.duration}분 회복 기록 다시 열기`} onClick={() => onResume(record.duration)}>다시 열기 <ArrowRight size={14} /></button><button type="button" className="recovery-history-delete" aria-label={`${record.duration}분 자리 회복 기록 삭제`} onClick={() => onDelete(record)}><Trash2 size={14} /></button></div></li>)}</ol> : <div className="recovery-history-empty"><p>선택한 조건과 메모에 맞는 회복 기록이 없습니다.</p><button type="button" onClick={resetFilters}>전체 기록 보기</button></div>}
  </section>;
}

export function SeatedRecoveryPanel({ duration, onDuration, recommendation, recoveryContext, onExplore, onBuildSession }: { duration: SeatedRecoveryDuration; onDuration: (duration: SeatedRecoveryDuration) => void; recommendation: CheckinRecommendation; recoveryContext: RecoveryContext; onExplore: (exerciseId: string) => void; onBuildSession: () => void }) {
  const routine = seatedRecoveryRoutines[duration];
  const adjustment = getSeatedRecoveryAdjustment(recommendation, recoveryContext);
  const [preferences, setPreferences] = useState(() => readLocalWellnessPreferences());
  const savedDuration = preferences.savedRecoveryDuration;
  const completedRecord = preferences.lastRecoveryRecord?.duration === duration ? preferences.lastRecoveryRecord : preferences.recoveryHistory.find((record) => record.duration === duration) ?? null;
  const [noteDraft, setNoteDraft] = useState("");
  useEffect(() => setNoteDraft(completedRecord?.note ?? ""), [completedRecord?.completedAt, completedRecord?.duration]);
  const persistPreferences = (nextPreferences: typeof preferences) => {
    if (saveLocalWellnessPreferences(nextPreferences)) setPreferences(nextPreferences);
  };
  const saveCurrentRoutine = () => persistPreferences({ ...preferences, savedRecoveryDuration: duration });
  const completeRoutine = () => {
    const completedAt = new Date().toISOString();
    const record: RecoveryRoutineRecord = { duration, completedOn: completedAt.slice(0, 10), completedAt, reflection: null, note: "" };
    persistPreferences({ ...preferences, lastRecoveryRecord: record, recoveryHistory: [record, ...preferences.recoveryHistory].slice(0, 6) });
  };
  const updateRecoveryRecord = (targetRecord: RecoveryRoutineRecord, updatedRecord: RecoveryRoutineRecord) => persistPreferences({ ...preferences, lastRecoveryRecord: preferences.lastRecoveryRecord?.completedAt === targetRecord.completedAt && preferences.lastRecoveryRecord?.completedOn === targetRecord.completedOn ? updatedRecord : preferences.lastRecoveryRecord, recoveryHistory: preferences.recoveryHistory.map((record) => record.completedAt === targetRecord.completedAt && record.completedOn === targetRecord.completedOn ? updatedRecord : record) });
  const saveReflection = (reflection: RecoveryReflection) => {
    if (!completedRecord) return;
    updateRecoveryRecord(completedRecord, { ...completedRecord, reflection });
  };
  const saveNote = () => completedRecord && updateRecoveryRecord(completedRecord, { ...completedRecord, note: noteDraft.trim().slice(0, recoveryNoteMaxLength) });
  const deleteRecord = (target: RecoveryRoutineRecord) => {
    const recoveryHistory = preferences.recoveryHistory.filter((record) => record.completedAt !== target.completedAt || record.completedOn !== target.completedOn || record.duration !== target.duration);
    const lastRecoveryRecord = preferences.lastRecoveryRecord?.completedAt === target.completedAt && preferences.lastRecoveryRecord.completedOn === target.completedOn && preferences.lastRecoveryRecord.duration === target.duration ? recoveryHistory[0] ?? null : preferences.lastRecoveryRecord;
    persistPreferences({ ...preferences, lastRecoveryRecord, recoveryHistory });
  };
  const clearRecoveryHistory = () => persistPreferences({ ...preferences, lastRecoveryRecord: null, recoveryHistory: [] });
  return <section className="seated-recovery" aria-label="장시간 앉기 뒤 회복 루틴"><div className="seated-recovery-heading"><div><p className="eyebrow">BETWEEN TASKS · LOCAL GUIDE</p><h3>오래 앉은 뒤, 작게 움직이며 다시 시작하세요.</h3><p>자세 하나를 완벽하게 고정하려 하기보다, 작업 환경을 조정하고 같은 자세를 잠시 바꾸는 일반 교육용 흐름입니다.</p></div><ShieldCheck size={21} /></div><div className="seated-recovery-duration" role="group" aria-label="앉은 자세 회복 루틴 시간 선택">{([5, 10] as SeatedRecoveryDuration[]).map((item) => <button key={item} className={duration === item ? "is-selected" : ""} aria-pressed={duration === item} onClick={() => onDuration(item)}>{item}분</button>)}</div><div className="recovery-favorite-actions" aria-live="polite"><button type="button" onClick={saveCurrentRoutine}><Star size={15} /> 현재 {duration}분 루틴 저장</button>{savedDuration !== null && savedDuration !== duration && <button type="button" className="recovery-favorite-resume" onClick={() => onDuration(savedDuration)}><ArrowRight size={15} /> 저장한 {savedDuration}분 루틴 불러오기</button>}{savedDuration === duration && <p><Star size={14} /> 이 {duration}분 루틴을 저장했습니다.</p>}</div><div className="recovery-reflection" aria-live="polite"><div><p className="small-label">FINISH LINE · LOCAL NOTE</p><h4>루틴을 마친 뒤, 몸의 반응은 어땠나요?</h4><p>짧은 체감만 남겨 다음 회복 선택에 참고하세요.</p></div>{!completedRecord ? <button type="button" onClick={completeRoutine}><CheckCircle2 size={16} /> 이번 {duration}분 루틴 완료 기록</button> : <div className="recovery-reflection-options"><p><CheckCircle2 size={15} /> {duration}분 완료 기록을 남겼습니다. {completedRecord.reflection ? `체감: ${reflectionLabels[completedRecord.reflection]}` : "체감을 선택해 주세요."}</p><div role="group" aria-label="회복 루틴 체감 선택">{(Object.keys(reflectionLabels) as RecoveryReflection[]).map((reflection) => <button key={reflection} type="button" className={completedRecord.reflection === reflection ? "is-selected" : ""} aria-pressed={completedRecord.reflection === reflection} onClick={() => saveReflection(reflection)}>{reflectionLabels[reflection]}</button>)}</div><div className="recovery-note"><label htmlFor={`recovery-note-${duration}`}>이번 회복 메모</label><textarea id={`recovery-note-${duration}`} value={noteDraft} maxLength={recoveryNoteMaxLength} onChange={(event) => setNoteDraft(event.target.value)} placeholder="예: 책상 높이를 조정하니 목이 편해짐" /><div><span>{noteDraft.length}/{recoveryNoteMaxLength}</span><button type="button" onClick={saveNote}>메모 저장</button></div></div></div>}</div><RecoveryHistoryTimeline history={preferences.recoveryHistory} onResume={onDuration} onDelete={deleteRecord} onClear={clearRecoveryHistory} /><div className="seated-recovery-grid"><article className="seated-routine"><p className="small-label">{routine.title.toUpperCase()} · {routine.duration} MIN</p><h4>{routine.title}</h4><p>{routine.summary}</p><ol>{routine.blocks.map((block, index) => <li key={block.label}><span>0{index + 1}</span><div><b>{block.label} · {block.minutes}</b><ul>{block.items.map((item) => <li key={item}>{item}</li>)}</ul></div></li>)}</ol></article><aside className={`seated-adjustment mode-${recommendation.mode}`}><p className="small-label">TODAY'S ADJUSTMENT</p><h4>{adjustment.label}</h4><p>{adjustment.guidance}</p><button className="outline-button" onClick={onBuildSession}>15분 가벼운 세션 설계 <ArrowRight size={15} /></button><div className="seated-stop"><ShieldCheck size={15} /><div><b>멈추고 평가가 필요한 신호</b><ul>{seatedRecoveryStopSignals.map((signal) => <li key={signal}>{signal}</li>)}</ul></div></div><a className="seated-source" href="https://www.cdc.gov/niosh/ergonomics/about/index.html" target="_blank" rel="noreferrer">CDC/NIOSH 작업 인체공학 참고 <ArrowRight size={13} /></a><div className="seated-explore"><p className="small-label">RELATED MOVEMENTS</p>{routine.exploreExerciseIds.map((id, index) => <button key={id} onClick={() => onExplore(id)}>0{index + 1} · 관련 동작 탐색 <ArrowRight size={14} /></button>)}</div></aside></div></section>;
}
