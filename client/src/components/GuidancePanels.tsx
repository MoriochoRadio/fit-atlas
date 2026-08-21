import React from "react";
import { ArrowRight, ShieldCheck, Star } from "lucide-react";
import { useState } from "react";
import type { MovementVisual } from "@/lib/movementVisuals";
import type { RecoveryStageGuide } from "@/lib/recoveryProtocols";
import type { RecoveryPathway, RecoveryPathwayId } from "@/lib/recoveryPathways";
import { getSeatedRecoveryAdjustment, seatedRecoveryRoutines, seatedRecoveryStopSignals, type RecoveryContext, type SeatedRecoveryDuration } from "@/lib/seatedRecovery";
import type { CheckinRecommendation } from "@/lib/dailyCheckin";
import type { WellnessDetail } from "@/lib/wellnessDetails";
import { readLocalWellnessPreferences, saveLocalWellnessPreferences } from "@/lib/wellnessPreferences";

export function MovementVisualGuide({ title, frames }: MovementVisual) {
  return <div className="movement-visual"><p className="small-label">{title.toUpperCase()}</p><div className="movement-frames">{frames.map((frame, index) => <div className="movement-frame" key={frame.label}><div className={`pose-silhouette pose-${frame.pose}`} aria-hidden="true"><i className="pose-head" /><i className="pose-body" /><i className="pose-arm arm-one" /><i className="pose-arm arm-two" /><i className="pose-leg leg-one" /><i className="pose-leg leg-two" /></div><b>{index + 1}. {frame.label}</b><span>{frame.cue}</span></div>)}</div></div>;
}

export function RecoveryStageGrid({ stages }: { stages: RecoveryStageGuide }) {
  const stageGroups = [["운동 전 준비", stages.beforeSession], ["운동 후 회복", stages.afterSession], ["부하 재개", stages.returnToLoad]] as const;
  return <div className="recovery-stage-grid">{stageGroups.map(([label, steps]) => <article key={label}><p className="small-label">{label}</p><ul>{steps.map((step) => <li key={step}>{step}</li>)}</ul></article>)}</div>;
}

export function WellnessDetailPanel({ detail }: { detail: WellnessDetail }) {
  return <div className="wellness-detail"><p className="small-label">일상 실천</p><ul>{detail.practices.map((item) => <li key={item}>{item}</li>)}</ul><p className="small-label">운동 맥락</p><ul>{detail.trainingContext.map((item) => <li key={item}>{item}</li>)}</ul><p className="wellness-caution">{detail.caution}</p></div>;
}

export function RecoveryPathwayPanel({ pathways, pathway, alternatives, onChoose, onExplore }: { pathways: RecoveryPathway[]; pathway: RecoveryPathway; alternatives: Array<{ id: string; name: string; category: string }>; onChoose: (id: RecoveryPathwayId) => void; onExplore: (id: string) => void }) {
  return <section className="recovery-pathway" aria-label="관절과 움직임별 회복 선택 경로"><div className="pathway-heading"><div><p className="eyebrow">MOVE WITH CARE</p><h3>불편할 땐, 멈추는 것만이 답은 아닙니다.</h3><p>이 선택지는 일반 교육용입니다. 위험 신호가 없을 때에만 반응을 관찰하며 더 쉬운 움직임으로 전환하세요.</p></div><ShieldCheck size={21} /></div><div className="pathway-tabs">{pathways.map((item) => <button key={item.id} className={pathway.id === item.id ? "is-selected" : ""} onClick={() => onChoose(item.id)}>{item.label}</button>)}</div><div className="pathway-grid"><article><p className="small-label">운동 전 확인</p><h4>{pathway.label}</h4><p>{pathway.summary}</p><ul>{pathway.checkBefore.map((item) => <li key={item}>{item}</li>)}</ul></article><article><p className="small-label">오늘의 가벼운 대체</p><ul>{pathway.chooseInstead.map((item) => <li key={item}>{item}</li>)}</ul><div className="pathway-alternatives">{alternatives.map((item) => <button key={item.id} onClick={() => onExplore(item.id)}><span>{item.category}</span>{item.name}<ArrowRight size={14} /></button>)}</div></article><article><p className="small-label">재개 기준</p><p>{pathway.returnRule}</p><div className="pathway-stop"><ShieldCheck size={15} /><div><b>자가 진행을 멈출 신호</b><ul>{pathway.stopSignals.map((item) => <li key={item}>{item}</li>)}</ul></div></div></article></div></section>;
}

export function SeatedRecoveryPanel({ duration, onDuration, recommendation, recoveryContext, onExplore, onBuildSession }: { duration: SeatedRecoveryDuration; onDuration: (duration: SeatedRecoveryDuration) => void; recommendation: CheckinRecommendation; recoveryContext: RecoveryContext; onExplore: (exerciseId: string) => void; onBuildSession: () => void }) {
  const routine = seatedRecoveryRoutines[duration];
  const adjustment = getSeatedRecoveryAdjustment(recommendation, recoveryContext);
  const [savedDuration, setSavedDuration] = useState<SeatedRecoveryDuration | null>(() => readLocalWellnessPreferences().savedRecoveryDuration);
  const saveCurrentRoutine = () => {
    if (saveLocalWellnessPreferences({ savedRecoveryDuration: duration })) setSavedDuration(duration);
  };
  return <section className="seated-recovery" aria-label="장시간 앉기 뒤 회복 루틴"><div className="seated-recovery-heading"><div><p className="eyebrow">BETWEEN TASKS · LOCAL GUIDE</p><h3>오래 앉은 뒤, 작게 움직이며 다시 시작하세요.</h3><p>자세 하나를 완벽하게 고정하려 하기보다, 작업 환경을 조정하고 같은 자세를 잠시 바꾸는 일반 교육용 흐름입니다.</p></div><ShieldCheck size={21} /></div><div className="seated-recovery-duration" role="group" aria-label="앉은 자세 회복 루틴 시간 선택">{([5, 10] as SeatedRecoveryDuration[]).map((item) => <button key={item} className={duration === item ? "is-selected" : ""} aria-pressed={duration === item} onClick={() => onDuration(item)}>{item}분</button>)}</div><div className="recovery-favorite-actions" aria-live="polite"><button type="button" onClick={saveCurrentRoutine}><Star size={15} /> 현재 {duration}분 루틴 저장</button>{savedDuration !== null && savedDuration !== duration && <button type="button" className="recovery-favorite-resume" onClick={() => onDuration(savedDuration)}><ArrowRight size={15} /> 저장한 {savedDuration}분 루틴 불러오기</button>}{savedDuration === duration && <p><Star size={14} /> 이 {duration}분 루틴을 저장했습니다.</p>}</div><div className="seated-recovery-grid"><article className="seated-routine"><p className="small-label">{routine.title.toUpperCase()} · {routine.duration} MIN</p><h4>{routine.title}</h4><p>{routine.summary}</p><ol>{routine.blocks.map((block, index) => <li key={block.label}><span>0{index + 1}</span><div><b>{block.label} · {block.minutes}</b><ul>{block.items.map((item) => <li key={item}>{item}</li>)}</ul></div></li>)}</ol></article><aside className={`seated-adjustment mode-${recommendation.mode}`}><p className="small-label">TODAY'S ADJUSTMENT</p><h4>{adjustment.label}</h4><p>{adjustment.guidance}</p><button className="outline-button" onClick={onBuildSession}>15분 가벼운 세션 설계 <ArrowRight size={15} /></button><div className="seated-stop"><ShieldCheck size={15} /><div><b>멈추고 평가가 필요한 신호</b><ul>{seatedRecoveryStopSignals.map((signal) => <li key={signal}>{signal}</li>)}</ul></div></div><a className="seated-source" href="https://www.cdc.gov/niosh/ergonomics/about/index.html" target="_blank" rel="noreferrer">CDC/NIOSH 작업 인체공학 참고 <ArrowRight size={13} /></a><div className="seated-explore"><p className="small-label">RELATED MOVEMENTS</p>{routine.exploreExerciseIds.map((id, index) => <button key={id} onClick={() => onExplore(id)}>0{index + 1} · 관련 동작 탐색 <ArrowRight size={14} /></button>)}</div></aside></div></section>;
}
