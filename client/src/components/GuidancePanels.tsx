import React from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import type { MovementVisual } from "@/lib/movementVisuals";
import type { RecoveryStageGuide } from "@/lib/recoveryProtocols";
import type { RecoveryPathway, RecoveryPathwayId } from "@/lib/recoveryPathways";
import type { WellnessDetail } from "@/lib/wellnessDetails";

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
