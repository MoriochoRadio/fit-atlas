import { useRef, useState } from "react";
import type { SessionEnvironment, SessionGoal } from "@/lib/sessionBuilder";

type HeroGymMachine3DProps = {
  goal: SessionGoal;
  environment: SessionEnvironment;
  completion: number;
  nodes: string[];
  onOpenNode: (index: number) => void;
};

const goalLabel: Record<SessionGoal, string> = { strength: "POWER", endurance: "FLOW", all_round: "BALANCE" };
const environmentLabel: Record<SessionEnvironment, string> = { home: "HOME SETUP", gym: "GYM FLOOR", outdoor: "OUTDOOR BASE" };

export function HeroGymMachine3D({ goal, environment, completion, nodes, onOpenNode }: HeroGymMachine3DProps) {
  const [rotation, setRotation] = useState(-12);
  const [resistance, setResistance] = useState(goal === "strength" ? 68 : goal === "endurance" ? 42 : 54);
  const [dragging, setDragging] = useState(false);
  const [pulling, setPulling] = useState(false);
  const rotateDrag = useRef<{ x: number; rotation: number } | null>(null);
  const pullDrag = useRef<{ y: number; resistance: number } | null>(null);
  const pulledDistance = Math.round((resistance / 100) * 68);

  const startRotate = (event: React.PointerEvent<SVGSVGElement>) => {
    rotateDrag.current = { x: event.clientX, rotation };
    setDragging(true);
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };
  const moveRotate = (event: React.PointerEvent<SVGSVGElement>) => {
    if (!rotateDrag.current) return;
    setRotation(Math.max(-38, Math.min(38, rotateDrag.current.rotation + (event.clientX - rotateDrag.current.x) * .55)));
  };
  const endRotate = (event: React.PointerEvent<SVGSVGElement>) => {
    rotateDrag.current = null;
    setDragging(false);
    event.currentTarget.releasePointerCapture?.(event.pointerId);
  };
  const startPull = (event: React.PointerEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    pullDrag.current = { y: event.clientY, resistance };
    setPulling(true);
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };
  const movePull = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (!pullDrag.current) return;
    setResistance(Math.max(0, Math.min(100, pullDrag.current.resistance + (pullDrag.current.y - event.clientY) * .8)));
  };
  const endPull = (event: React.PointerEvent<HTMLButtonElement>) => {
    pullDrag.current = null;
    setPulling(false);
    event.currentTarget.releasePointerCapture?.(event.pointerId);
  };

  return <section className={`hero-gym-machine goal-${goal} environment-${environment} ${dragging ? "is-rotating" : ""} ${pulling ? "is-pulling" : ""}`} aria-label="직접 조작 가능한 3D 케이블 운동 장비">
    <div className="machine-hud"><span>FIT / MACHINE_01</span><b>{goalLabel[goal]}</b><small>{environmentLabel[environment]} · 이번 주 {completion}%</small></div>
    <svg className="gym-machine-canvas" style={{ transform: `rotateY(${rotation}deg) rotateX(3deg)` }} viewBox="0 0 420 360" role="img" aria-labelledby="machine-title machine-description" onPointerDown={startRotate} onPointerMove={moveRotate} onPointerUp={endRotate} onPointerCancel={endRotate}>
      <title id="machine-title">회전 가능한 3D 스타일 케이블 머신</title><desc id="machine-description">빈 공간을 좌우로 드래그해 장비를 돌리고, 가운데 핸들을 위아래로 드래그해 저항을 조절할 수 있습니다.</desc>
      <defs><linearGradient id="machine-frame" x1="0" x2="1"><stop stopColor="#17213e"/><stop offset=".48" stopColor="#475474"/><stop offset="1" stopColor="#10172a"/></linearGradient><linearGradient id="machine-panel" x1="0" x2="1"><stop stopColor="#334369"/><stop offset=".5" stopColor="#17213e"/><stop offset="1" stopColor="#24335b"/></linearGradient><linearGradient id="machine-signal" x1="0" x2="1"><stop stopColor="#b4d82e"/><stop offset=".5" stopColor="#ecff76"/><stop offset="1" stopColor="#7d9b17"/></linearGradient><filter id="machine-glow"><feDropShadow dx="0" dy="0" stdDeviation="7" floodColor="#d8ff4f" floodOpacity=".68"/></filter></defs>
      <ellipse className="machine-shadow" cx="210" cy="330" rx="146" ry="18"/>
      <g className="machine-assembly"><path d="M82 317 L118 47 L151 47 L136 317 Z" fill="url(#machine-frame)"/><path d="M282 317 L269 47 L302 47 L339 317 Z" fill="url(#machine-frame)"/><rect x="116" y="46" width="186" height="17" rx="7" fill="url(#machine-frame)"/><rect x="132" y="88" width="156" height="224" rx="18" fill="url(#machine-panel)" stroke="rgba(220,235,202,.42)"/><rect x="151" y="106" width="118" height="154" rx="12" className="machine-stack-casing"/>{Array.from({ length: 7 }, (_, index) => <rect key={index} x="161" y={124 + index * 17} width="98" height="12" rx="5" className="machine-weight-plate" style={{ opacity: index < Math.ceil(resistance / 15) ? 1 : .28 }} />)}<rect x="146" y="270" width="128" height="25" rx="10" fill="url(#machine-frame)"/><path d="M122 316 L78 326 L95 340 L166 327 Z M254 327 L325 340 L342 326 L298 316 Z" fill="#11182b"/>
        <circle cx="210" cy="76" r="13" fill="#0c1325" stroke="#d8ff4f" strokeWidth="3" filter="url(#machine-glow)"/><circle cx="210" cy="76" r="5" fill="#eaff7d"/><path d={`M210 89 C210 124 210 ${144 + pulledDistance} 210 ${181 + pulledDistance}`} className="machine-cable"/><path d={`M210 ${181 + pulledDistance} C174 ${196 + pulledDistance} 154 ${210 + pulledDistance} 132 ${222 + pulledDistance} M210 ${181 + pulledDistance} C246 ${196 + pulledDistance} 266 ${210 + pulledDistance} 288 ${222 + pulledDistance}`} className="machine-cable"/>
      </g>
    </svg>
    <button className="machine-handle" style={{ transform: `translate(-50%, ${pulledDistance}px)` }} aria-label={`케이블 저항 ${resistance}% 조절`} onPointerDown={startPull} onPointerMove={movePull} onPointerUp={endPull} onPointerCancel={endPull}><i/><span>DRAG</span></button>
    <div className="machine-resistance"><span>RESISTANCE</span><b>{resistance}<small>%</small></b><input type="range" min="0" max="100" value={resistance} onChange={(event) => setResistance(Number(event.target.value))} aria-label="케이블 저항 조절"/><button onClick={() => setResistance(goal === "strength" ? 68 : goal === "endurance" ? 42 : 54)}>세션값</button></div>
    <div className="machine-route-nodes" aria-label="세션 블록 편집">{nodes.map((label, index) => <button key={`${label}-${index}`} className={`machine-route-node node-${index + 1}`} onClick={() => onOpenNode(index)} aria-haspopup="dialog" aria-label={`${label} 블록 상세 및 편집`}>{String(index + 1).padStart(2, "0")}</button>)}</div>
    <p className="machine-instruction">빈 공간을 드래그해 회전 · 핸들을 위아래로 당겨 저항 조절</p>
  </section>;
}
