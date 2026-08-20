import { useRef, useState } from "react";
import type { HeroEquipment } from "@/lib/localStore";
import type { SessionEnvironment, SessionGoal } from "@/lib/sessionBuilder";

type HeroGymMachine3DProps = {
  goal: SessionGoal;
  environment: SessionEnvironment;
  completion: number;
  equipment: HeroEquipment;
  resistance: number;
  nodes: string[];
  onEquipment: (equipment: HeroEquipment) => void;
  onResistance: (resistance: number) => void;
  onOpenNode: (index: number) => void;
};

const goalLabel: Record<SessionGoal, string> = { strength: "POWER", endurance: "FLOW", all_round: "BALANCE" };
const environmentLabel: Record<SessionEnvironment, string> = { home: "HOME SETUP", gym: "GYM FLOOR", outdoor: "OUTDOOR BASE" };
const equipmentCopy: Record<HeroEquipment, { label: string; action: string; resistance: string }> = {
  cable: { label: "케이블", action: "DRAG", resistance: "저항" },
  dumbbell: { label: "덤벨", action: "LIFT", resistance: "부하" },
  treadmill: { label: "트레드밀", action: "PACE", resistance: "페이스" },
};

export function HeroGymMachine3D({ goal, environment, completion, equipment, resistance, nodes, onEquipment, onResistance, onOpenNode }: HeroGymMachine3DProps) {
  const [rotation, setRotation] = useState(-12);
  const [dragging, setDragging] = useState(false);
  const [pulling, setPulling] = useState(false);
  const rotateDrag = useRef<{ x: number; rotation: number } | null>(null);
  const pullDrag = useRef<{ y: number; resistance: number } | null>(null);
  const pulledDistance = Math.round((resistance / 100) * 60);
  const rewardStackCount = Math.max(1, Math.min(7, Math.ceil((completion / 100) * 7)));
  const equipmentInfo = equipmentCopy[equipment];

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
    onResistance(Math.max(0, Math.min(100, Math.round(pullDrag.current.resistance + (pullDrag.current.y - event.clientY) * .8))));
  };
  const endPull = (event: React.PointerEvent<HTMLButtonElement>) => {
    pullDrag.current = null;
    setPulling(false);
    event.currentTarget.releasePointerCapture?.(event.pointerId);
  };

  return <section className={`hero-gym-machine equipment-${equipment} goal-${goal} environment-${environment} ${dragging ? "is-rotating" : ""} ${pulling ? "is-pulling" : ""}`} aria-label={`직접 조작 가능한 3D ${equipmentInfo.label} 운동 장비`}>
    <div className="machine-hud"><span>FIT / EQUIPMENT_01</span><b>{goalLabel[goal]}</b><small>{environmentLabel[environment]} · 주간 달성 {completion}%</small></div>
    <svg className="gym-machine-canvas" style={{ transform: `rotateY(${rotation}deg) rotateX(3deg)` }} viewBox="0 0 420 360" role="img" aria-labelledby="machine-title machine-description" onPointerDown={startRotate} onPointerMove={moveRotate} onPointerUp={endRotate} onPointerCancel={endRotate}>
      <title id="machine-title">회전 가능한 3D 스타일 {equipmentInfo.label} 운동 장비</title><desc id="machine-description">빈 공간을 좌우로 드래그해 장비를 돌리고, 가운데 조작 핸들을 위아래로 드래그해 오늘의 {equipmentInfo.resistance}을 조절할 수 있습니다.</desc>
      <defs><linearGradient id="machine-frame" x1="0" x2="1"><stop stopColor="#17213e"/><stop offset=".48" stopColor="#475474"/><stop offset="1" stopColor="#10172a"/></linearGradient><linearGradient id="machine-panel" x1="0" x2="1"><stop stopColor="#334369"/><stop offset=".5" stopColor="#17213e"/><stop offset="1" stopColor="#24335b"/></linearGradient><linearGradient id="machine-signal" x1="0" x2="1"><stop stopColor="#b4d82e"/><stop offset=".5" stopColor="#ecff76"/><stop offset="1" stopColor="#7d9b17"/></linearGradient><filter id="machine-glow"><feDropShadow dx="0" dy="0" stdDeviation="7" floodColor="#d8ff4f" floodOpacity=".68"/></filter></defs>
      <ellipse className="machine-shadow" cx="210" cy="330" rx="146" ry="18"/>
      {equipment === "cable" && <g className="machine-assembly"><path d="M82 317 L118 47 L151 47 L136 317 Z" fill="url(#machine-frame)"/><path d="M282 317 L269 47 L302 47 L339 317 Z" fill="url(#machine-frame)"/><rect x="116" y="46" width="186" height="17" rx="7" fill="url(#machine-frame)"/><rect x="132" y="88" width="156" height="224" rx="18" fill="url(#machine-panel)" stroke="rgba(220,235,202,.42)"/><rect x="151" y="106" width="118" height="154" rx="12" className="machine-stack-casing"/>{Array.from({ length: 7 }, (_, index) => <rect key={index} x="161" y={226 - index * 17} width="98" height="12" rx="5" className={`machine-weight-plate ${index < rewardStackCount ? "is-earned" : ""}`} />)}<rect x="146" y="270" width="128" height="25" rx="10" fill="url(#machine-frame)"/><path d="M122 316 L78 326 L95 340 L166 327 Z M254 327 L325 340 L342 326 L298 316 Z" fill="#11182b"/><circle cx="210" cy="76" r="13" fill="#0c1325" stroke="#d8ff4f" strokeWidth="3" filter="url(#machine-glow)"/><circle cx="210" cy="76" r="5" fill="#eaff7d"/><path d={`M210 89 C210 124 210 ${144 + pulledDistance} 210 ${181 + pulledDistance}`} className="machine-cable"/><path d={`M210 ${181 + pulledDistance} C174 ${196 + pulledDistance} 154 ${210 + pulledDistance} 132 ${222 + pulledDistance} M210 ${181 + pulledDistance} C246 ${196 + pulledDistance} 266 ${210 + pulledDistance} 288 ${222 + pulledDistance}`} className="machine-cable"/></g>}
      {equipment === "dumbbell" && <g className="dumbbell-assembly"><path d="M92 299 L158 227 L262 227 L328 299 L310 319 L110 319 Z" fill="url(#machine-frame)"/><rect x="118" y="161" width="184" height="42" rx="18" fill="url(#machine-panel)" stroke="rgba(230,244,189,.4)"/><path d="M166 150 L254 150 L276 213 L144 213 Z" fill="#111a30"/><rect x="186" y="166" width="48" height="20" rx="9" fill="url(#machine-signal)" filter="url(#machine-glow)"/><g className="dumbbell"><rect x="129" y="91" width="162" height="38" rx="18" fill="#c7d1da"/><rect x="88" y="63" width="60" height="94" rx="20" fill="url(#machine-frame)"/><rect x="272" y="63" width="60" height="94" rx="20" fill="url(#machine-frame)"/><rect x="102" y="78" width="32" height="64" rx="12" className="dumbbell-weight"/><rect x="286" y="78" width="32" height="64" rx="12" className="dumbbell-weight"/><rect x="162" y="99" width="96" height="22" rx="10" fill="#edf3e6"/></g><path d={`M210 129 C210 152 210 ${173 + pulledDistance} 210 ${198 + pulledDistance}`} className="machine-cable"/></g>}
      {equipment === "treadmill" && <g className="treadmill-assembly"><path d="M88 289 L142 168 L278 168 L332 289 L304 317 L116 317 Z" fill="url(#machine-frame)"/><path d="M122 281 L157 191 L263 191 L298 281 Z" fill="#111828" stroke="#bac5ce"/><path d="M150 242 L270 242" stroke="#4a5971" strokeWidth="6" strokeDasharray="8 8"/><path d="M134 168 L114 68 L144 68 L169 168 M286 168 L306 68 L276 68 L251 168" fill="none" stroke="url(#machine-frame)" strokeWidth="18" strokeLinecap="round"/><rect x="154" y="52" width="112" height="55" rx="12" fill="url(#machine-panel)" stroke="#d8ff4f"/><rect x="173" y="66" width="74" height="22" rx="6" fill="#10192f"/><text x="210" y="82" fill="#d8ff4f" textAnchor="middle" fontSize="14" fontFamily="monospace">{String(Math.round(resistance / 10)).padStart(2, "0")}.0</text><path d={`M210 108 C210 138 210 ${156 + pulledDistance} 210 ${187 + pulledDistance}`} className="machine-cable"/></g>}
    </svg>
    <button className="machine-handle" style={{ transform: `translate(-50%, ${pulledDistance}px)` }} aria-label={`${equipmentInfo.label} ${equipmentInfo.resistance} ${resistance}% 조절`} onPointerDown={startPull} onPointerMove={movePull} onPointerUp={endPull} onPointerCancel={endPull}><i/><span>{equipmentInfo.action}</span></button>
    <div className="machine-resistance"><span>{equipmentInfo.resistance.toUpperCase()}</span><b>{resistance}<small>%</small></b><input type="range" min="0" max="100" value={resistance} onChange={(event) => onResistance(Number(event.target.value))} aria-label={`${equipmentInfo.label} ${equipmentInfo.resistance} 조절`}/><button onClick={() => onResistance(goal === "strength" ? 68 : goal === "endurance" ? 42 : 54)}>세션값</button></div>
    <div className="machine-equipment-control" role="group" aria-label="메인 3D 운동 기구 선택">{(Object.keys(equipmentCopy) as HeroEquipment[]).map((item) => <button key={item} className={equipment === item ? "is-selected" : ""} onClick={() => onEquipment(item)} aria-pressed={equipment === item}>{equipmentCopy[item].label}</button>)}</div>
    <div className="machine-reward-meter" aria-label={`주간 달성률 ${completion}퍼센트, 웨이트 스택 ${rewardStackCount}단계`}><span>WEEKLY STACK</span><div>{Array.from({ length: 7 }, (_, index) => <i key={index} className={index < rewardStackCount ? "is-earned" : ""} />)}</div><b>{completion}%</b></div>
    <div className="machine-route-nodes" aria-label="세션 블록 편집">{nodes.map((label, index) => <button key={`${label}-${index}`} className={`machine-route-node node-${index + 1}`} onClick={() => onOpenNode(index)} aria-haspopup="dialog" aria-label={`${label} 블록 상세 및 편집`}>{String(index + 1).padStart(2, "0")}</button>)}</div>
    <p className="machine-instruction">기구를 고르고, 빈 공간을 드래그해 회전 · {equipmentInfo.action.toLowerCase()} 조작으로 오늘 강도 반영</p>
  </section>;
}
