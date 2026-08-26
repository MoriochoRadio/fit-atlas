import { useEffect, useMemo, useRef, useState } from "react";
import type { BodyRegion } from "@/lib/catalogTypes";

type MuscleRegion = {
  name: BodyRegion;
  front?: string;
  back?: string;
  label: string;
};
type MuscleRoles = { primary: BodyRegion[]; supporting: BodyRegion[] } | null;

const muscleRegions: MuscleRegion[] = [
  {
    name: "가슴",
    label: "대흉근",
    front:
      "M81 107 C68 101 57 108 55 128 C67 140 80 143 94 137 L101 116 Z M109 116 L116 137 C130 143 143 140 155 128 C153 108 142 101 129 107 Z",
  },
  {
    name: "어깨",
    label: "삼각근",
    front:
      "M57 106 C43 108 36 123 43 139 L58 137 L70 111 Z M140 111 L152 137 L167 139 C174 123 167 108 153 106 Z",
    back: "M55 109 C41 111 35 126 43 141 L60 137 L70 112 Z M140 112 L150 137 L167 141 C175 126 169 111 155 109 Z",
  },
  {
    name: "팔",
    label: "상완근",
    front:
      "M43 139 L61 137 L59 205 C55 218 45 220 37 211 L37 164 Z M149 137 L167 139 L173 164 L173 211 C165 220 155 218 151 205 Z",
    back: "M43 140 L61 137 L59 205 C55 218 45 220 37 211 L37 165 Z M149 137 L167 140 L173 165 L173 211 C165 220 155 218 151 205 Z",
  },
  {
    name: "코어",
    label: "복직근",
    front: "M84 140 L126 140 L133 218 L77 218 Z",
  },
  {
    name: "등",
    label: "광배근",
    back: "M67 112 L79 97 L131 97 L143 112 L133 214 L77 214 Z",
  },
  {
    name: "둔근",
    label: "둔근",
    back: "M77 215 L103 215 L103 247 C90 252 76 245 70 230 Z M103 215 L129 215 L136 230 C130 245 116 252 103 247 Z",
  },
  {
    name: "하체",
    label: "대퇴·종아리",
    front:
      "M76 218 L102 220 L98 358 L72 358 Z M106 220 L132 218 L136 358 L110 358 Z",
    back: "M76 246 L102 247 L98 358 L72 358 Z M106 247 L132 246 L136 358 L110 358 Z",
  },
];

function defaultRotation(region: BodyRegion) {
  return region === "등" || region === "둔근" ? 180 : 0;
}
function normalizedRotation(rotation: number) {
  return ((rotation % 360) + 360) % 360;
}
function isBackView(rotation: number) {
  const normalized = normalizedRotation(rotation);
  return normalized > 70 && normalized < 290;
}

export function AnatomyMap({
  activeRegion,
  selectedRegions,
  onToggleRegion,
  muscleRoles,
}: {
  activeRegion: BodyRegion;
  selectedRegions: BodyRegion[];
  onToggleRegion: (region: BodyRegion) => void;
  muscleRoles?: MuscleRoles;
}) {
  const [rotation, setRotation] = useState(() => defaultRotation(activeRegion));
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef<{ x: number; rotation: number } | null>(null);
  const didDrag = useRef(false);
  const view = isBackView(rotation) ? "back" : "front";
  const displayedMuscles = useMemo(
    () =>
      muscleRegions.filter(region =>
        view === "front" ? Boolean(region.front) : Boolean(region.back)
      ),
    [view]
  );

  useEffect(() => {
    if (!selectedRegions.includes(activeRegion)) return;
    setRotation(defaultRotation(activeRegion));
  }, [activeRegion, selectedRegions]);

  const startDrag = (event: React.PointerEvent<SVGSVGElement>) => {
    dragStart.current = { x: event.clientX, rotation };
    didDrag.current = false;
    setDragging(true);
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };
  const moveDrag = (event: React.PointerEvent<SVGSVGElement>) => {
    if (!dragStart.current) return;
    const delta = event.clientX - dragStart.current.x;
    if (Math.abs(delta) > 4) didDrag.current = true;
    setRotation(dragStart.current.rotation + delta * 0.82);
  };
  const endDrag = (event: React.PointerEvent<SVGSVGElement>) => {
    dragStart.current = null;
    setDragging(false);
    event.currentTarget.releasePointerCapture?.(event.pointerId);
    window.setTimeout(() => {
      didDrag.current = false;
    }, 0);
  };
  const toggleRegion = (region: BodyRegion) => {
    if (!didDrag.current) onToggleRegion(region);
  };
  const selectedLabel =
    selectedRegions.length > 1
      ? `${selectedRegions.length}개 부위`
      : activeRegion;

  return (
    <div
      className={`anatomy-stage anatomy-3d-stage view-${view} ${dragging ? "is-dragging" : ""}`}
      aria-label="클릭·드래그 가능한 3D 근육 인체 모델"
    >
      <div className="anatomy-orbit anatomy-orbit-one" />
      <div className="anatomy-orbit anatomy-orbit-two" />
      <div
        className="anatomy-view-control"
        role="group"
        aria-label="인체 모델 보기"
      >
        <button
          className={view === "front" ? "is-selected" : ""}
          aria-pressed={view === "front"}
          onClick={() => setRotation(0)}
        >
          전면
        </button>
        <button
          className={view === "back" ? "is-selected" : ""}
          aria-pressed={view === "back"}
          onClick={() => setRotation(180)}
        >
          후면
        </button>
      </div>
      <svg
        className="muscle-model-3d"
        style={{ transform: `rotateX(2deg) rotateY(${rotation}deg)` }}
        viewBox="0 0 210 390"
        role="img"
        aria-labelledby="anatomy-title anatomy-description"
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <title id="anatomy-title">
          클릭과 드래그가 가능한 3D 스타일 인체 근육 모델
        </title>
        <desc id="anatomy-description">
          좌우로 드래그해 인체를 회전하고, 근육을 클릭해 여러 부위를 선택할 수
          있습니다. 현재 선택 부위는 {selectedRegions.join("·")}입니다.
        </desc>
        <defs>
          <linearGradient id="body-volume" x1="0" x2="1">
            <stop stopColor="#d9e1d9" />
            <stop offset=".5" stopColor="#fcfdf9" />
            <stop offset="1" stopColor="#b9c6ba" />
          </linearGradient>
          <linearGradient id="muscle-volume" x1="0" x2="1">
            <stop stopColor="#8fa957" />
            <stop offset=".5" stopColor="#d7ff4f" />
            <stop offset="1" stopColor="#5c7334" />
          </linearGradient>
          <linearGradient id="primary-volume" x1="0" x2="1">
            <stop stopColor="#d95745" />
            <stop offset=".5" stopColor="#ff846d" />
            <stop offset="1" stopColor="#a9322a" />
          </linearGradient>
          <linearGradient id="support-volume" x1="0" x2="1">
            <stop stopColor="#4f92bd" />
            <stop offset=".5" stopColor="#8cd4ff" />
            <stop offset="1" stopColor="#27678f" />
          </linearGradient>
          <filter id="body-shadow">
            <feDropShadow
              dx="8"
              dy="12"
              stdDeviation="8"
              floodColor="#17312c"
              floodOpacity=".22"
            />
          </filter>
        </defs>
        <ellipse
          className="model-ground-shadow"
          cx="105"
          cy="370"
          rx="55"
          ry="10"
        />
        <g className="muscle-model-body" filter="url(#body-shadow)">
          <circle cx="105" cy="52" r="31" className="model-skin" />
          <path
            d="M82 82 Q105 68 128 82 L145 108 L136 215 L141 247 L142 360 L113 360 L105 257 L97 360 L68 360 L69 247 L74 215 L65 108 Z"
            className="model-silhouette"
          />
          {displayedMuscles.map(region => {
            const role = muscleRoles?.primary.includes(region.name)
              ? "is-primary"
              : muscleRoles?.supporting.includes(region.name)
                ? "is-supporting"
                : "";
            return (
              <path
                key={region.name}
                d={view === "front" ? region.front : region.back}
                className={`muscle-zone muscle-${region.name} ${selectedRegions.includes(region.name) ? "is-active" : ""} ${role}`}
                role="button"
                tabIndex={0}
                aria-pressed={selectedRegions.includes(region.name)}
                aria-label={`${region.name} ${region.label} ${selectedRegions.includes(region.name) ? "선택 해제" : "선택"}`}
                onClick={() => toggleRegion(region.name)}
                onKeyDown={event => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onToggleRegion(region.name);
                  }
                }}
              />
            );
          })}
        </g>
      </svg>
      <div className="anatomy-model-readout">
        <span>{view === "front" ? "FRONT / DRAG 3D" : "BACK / DRAG 3D"}</span>
        <b>{selectedLabel}</b>
        <small>
          {muscleRoles
            ? "주동근 코랄 · 협응근 블루"
            : "드래그하여 회전 · 복수 선택 가능"}
        </small>
      </div>
      <div className="anatomy-label">좌우로 드래그 · 근육을 눌러 복수 선택</div>
    </div>
  );
}
