import { useEffect, useRef } from "react";
import type { SessionBlock } from "@/lib/sessionBuilder";

export function SessionComposition({ blocks }: { blocks: SessionBlock[] }) {
  const totalMinutes = Math.max(blocks.reduce((sum, block) => sum + block.minutes, 0), 1);
  const previousBlocks = useRef<SessionBlock[] | null>(null);
  const previousMix = previousBlocks.current;
  useEffect(() => { previousBlocks.current = blocks; }, [blocks]);
  const previousTotal = previousMix ? Math.max(previousMix.reduce((sum, block) => sum + block.minutes, 0), 1) : 1;
  const deltas = previousMix ? blocks.map((block) => {
    const previous = previousMix.find((item) => item.label === block.label);
    return { label: block.label, value: Math.round((block.minutes / totalMinutes) * 100) - Math.round(((previous?.minutes ?? 0) / previousTotal) * 100) };
  }) : [];
  return <div className="session-composition" aria-label="세션 구성 비중"><span>TIME MIX</span>{blocks.map((block) => <div key={block.label}><b>{block.label}</b><small>{block.minutes}분 · {Math.round((block.minutes / totalMinutes) * 100)}%</small></div>)}{previousMix && <><p className="session-composition-compare" aria-label="이전 세션 비중 비교">이전 {previousMix.map((block) => `${block.label} ${Math.round((block.minutes / previousTotal) * 100)}%`).join(" · ")} → 현재 구성</p><p className="session-composition-delta" aria-label="세션 비중 변화량">{deltas.map((delta) => `${delta.label} ${delta.value > 0 ? "+" : ""}${delta.value}%p`).join(" · ")}</p></>}</div>;
}
