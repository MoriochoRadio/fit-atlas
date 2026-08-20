import type { BodyRegion } from "@/lib/catalogTypes";
import { useEffect, useState } from "react";

type MuscleRegion = { name: BodyRegion; front?: string; back?: string; label: string };

const muscleRegions: MuscleRegion[] = [
  { name: "가슴", label: "대흉근", front: "M81 107 C68 101 57 108 55 128 C67 140 80 143 94 137 L101 116 Z M109 116 L116 137 C130 143 143 140 155 128 C153 108 142 101 129 107 Z" },
  { name: "어깨", label: "삼각근", front: "M57 106 C43 108 36 123 43 139 L58 137 L70 111 Z M140 111 L152 137 L167 139 C174 123 167 108 153 106 Z", back: "M55 109 C41 111 35 126 43 141 L60 137 L70 112 Z M140 112 L150 137 L167 141 C175 126 169 111 155 109 Z" },
  { name: "팔", label: "상완근", front: "M43 139 L61 137 L59 205 C55 218 45 220 37 211 L37 164 Z M149 137 L167 139 L173 164 L173 211 C165 220 155 218 151 205 Z", back: "M43 140 L61 137 L59 205 C55 218 45 220 37 211 L37 165 Z M149 137 L167 140 L173 165 L173 211 C165 220 155 218 151 205 Z" },
  { name: "코어", label: "복직근", front: "M84 140 L126 140 L133 218 L77 218 Z" },
  { name: "등", label: "광배근", back: "M67 112 L79 97 L131 97 L143 112 L133 214 L77 214 Z" },
  { name: "둔근", label: "둔근", back: "M77 215 L103 215 L103 247 C90 252 76 245 70 230 Z M103 215 L129 215 L136 230 C130 245 116 252 103 247 Z" },
  { name: "하체", label: "대퇴·종아리", front: "M76 218 L102 220 L98 358 L72 358 Z M106 220 L132 218 L136 358 L110 358 Z", back: "M76 246 L102 247 L98 358 L72 358 Z M106 247 L132 246 L136 358 L110 358 Z" },
];

function viewForRegion(region: BodyRegion) { return region === "등" || region === "둔근" ? "back" : "front" as const; }

export function AnatomyMap({ activeRegion, onSelect }: { activeRegion: BodyRegion; onSelect: (region: BodyRegion) => void }) {
  const [view, setView] = useState<"front" | "back">(() => viewForRegion(activeRegion));
  useEffect(() => { setView(viewForRegion(activeRegion)); }, [activeRegion]);
  const chooseRegion = (region: BodyRegion) => { setView(viewForRegion(region)); onSelect(region); };
  const displayedMuscles = muscleRegions.filter((region) => view === "front" ? Boolean(region.front) : Boolean(region.back));

  return <div className={`anatomy-stage anatomy-3d-stage view-${view}`} aria-label="클릭 가능한 3D 근육 인체 모델">
    <div className="anatomy-orbit anatomy-orbit-one" /><div className="anatomy-orbit anatomy-orbit-two" />
    <div className="anatomy-view-control" role="group" aria-label="인체 모델 보기"><button className={view === "front" ? "is-selected" : ""} aria-pressed={view === "front"} onClick={() => setView("front")}>전면</button><button className={view === "back" ? "is-selected" : ""} aria-pressed={view === "back"} onClick={() => setView("back")}>후면</button></div>
    <svg className="muscle-model-3d" viewBox="0 0 210 390" role="img" aria-labelledby="anatomy-title anatomy-description">
      <title id="anatomy-title">클릭 가능한 3D 스타일 인체 근육 모델</title><desc id="anatomy-description">근육 부위를 클릭하면 관련 운동과 회복 안내가 바뀝니다. 현재 선택 부위는 {activeRegion}입니다.</desc>
      <defs><linearGradient id="body-volume" x1="0" x2="1"><stop stopColor="#d9e1d9" /><stop offset=".5" stopColor="#fcfdf9" /><stop offset="1" stopColor="#b9c6ba" /></linearGradient><linearGradient id="muscle-volume" x1="0" x2="1"><stop stopColor="#8fa957" /><stop offset=".5" stopColor="#d7ff4f" /><stop offset="1" stopColor="#5c7334" /></linearGradient><filter id="body-shadow"><feDropShadow dx="8" dy="12" stdDeviation="8" floodColor="#17312c" floodOpacity=".22" /></filter></defs>
      <ellipse className="model-ground-shadow" cx="105" cy="370" rx="55" ry="10" />
      <g className="muscle-model-body" filter="url(#body-shadow)"><circle cx="105" cy="52" r="31" className="model-skin" /><path d="M82 82 Q105 68 128 82 L145 108 L136 215 L141 247 L142 360 L113 360 L105 257 L97 360 L68 360 L69 247 L74 215 L65 108 Z" className="model-silhouette" />
        {displayedMuscles.map((region) => <path key={region.name} d={view === "front" ? region.front : region.back} className={`muscle-zone muscle-${region.name} ${activeRegion === region.name ? "is-active" : ""}`} role="button" tabIndex={0} aria-label={`${region.name} ${region.label} 선택`} onClick={() => chooseRegion(region.name)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); chooseRegion(region.name); } }} />)}
      </g>
    </svg>
    <div className="anatomy-model-readout"><span>{view === "front" ? "FRONT / 3D" : "BACK / 3D"}</span><b>{activeRegion}</b><small>{muscleRegions.find((region) => region.name === activeRegion)?.label}</small></div>
    <div className="anatomy-label">MODEL 또는 왼쪽 부위 선택</div>
  </div>;
}
