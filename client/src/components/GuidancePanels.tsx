import React from "react";
import type { MovementVisual } from "@/lib/movementVisuals";
import type { RecoveryStageGuide } from "@/lib/recoveryProtocols";
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
