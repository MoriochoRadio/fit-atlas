import type { SessionBlock } from "@/lib/sessionBuilder";

export function SessionComposition({ blocks }: { blocks: SessionBlock[] }) {
  const totalMinutes = Math.max(blocks.reduce((sum, block) => sum + block.minutes, 0), 1);
  return <div className="session-composition" aria-label="세션 구성 비중"><span>TIME MIX</span>{blocks.map((block) => <div key={block.label}><b>{block.label}</b><small>{block.minutes}분 · {Math.round((block.minutes / totalMinutes) * 100)}%</small></div>)}</div>;
}
