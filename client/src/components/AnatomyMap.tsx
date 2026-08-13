import type { BodyRegion } from "@/lib/fitnessData";

const regions: { name: BodyRegion; path: string; labelX: number; labelY: number }[] = [
  { name: "가슴", path: "M84 83 C70 81 60 88 58 105 C68 112 77 115 86 112 L96 96 Z M100 96 L110 112 C119 115 128 112 138 105 C136 88 126 81 112 83 Z", labelX: 98, labelY: 101 },
  { name: "어깨", path: "M57 85 C43 88 38 101 42 113 L56 111 L63 91 Z M139 85 L133 91 L140 111 L154 113 C158 101 153 88 139 85 Z", labelX: 148, labelY: 101 },
  { name: "팔", path: "M43 111 L58 112 L55 173 C53 189 43 193 36 185 L37 131 Z M138 112 L153 111 L159 131 L160 185 C153 193 143 189 141 173 Z", labelX: 151, labelY: 150 },
  { name: "코어", path: "M84 113 L112 113 L120 176 L76 176 Z", labelX: 98, labelY: 147 },
  { name: "둔근", path: "M76 176 L98 176 L98 202 C86 204 76 199 70 188 Z M98 176 L120 176 L126 188 C120 199 110 204 98 202 Z", labelX: 98, labelY: 190 },
  { name: "하체", path: "M72 200 L96 202 L92 308 L70 308 Z M100 202 L124 200 L126 308 L104 308 Z", labelX: 112, labelY: 250 },
  { name: "등", path: "M65 93 L76 80 L120 80 L132 93 L122 174 L74 174 Z", labelX: 98, labelY: 132 },
];

export function AnatomyMap({ activeRegion, onSelect }: { activeRegion: BodyRegion; onSelect: (region: BodyRegion) => void }) {
  return (
    <div className="anatomy-stage" aria-label="클릭 가능한 전면 신체 지도">
      <div className="anatomy-orbit anatomy-orbit-one" />
      <div className="anatomy-orbit anatomy-orbit-two" />
      <svg viewBox="0 0 196 340" role="img" aria-labelledby="anatomy-title">
        <title id="anatomy-title">부위별 운동과 회복 가이드를 탐색할 수 있는 인체 지도</title>
        <circle cx="98" cy="45" r="26" className="anatomy-skin" />
        <path d="M76 70 Q98 58 120 70 L133 90 L122 182 L126 202 L128 310 L104 310 L98 210 L92 310 L68 310 L70 202 L74 182 L63 90 Z" className="anatomy-silhouette" />
        {regions.map((region) => (
          <path key={region.name} d={region.path} onClick={() => onSelect(region.name)} className={`anatomy-zone ${activeRegion === region.name ? "is-active" : ""}`} role="button" tabIndex={0} aria-label={`${region.name} 선택`} onKeyDown={(event) => event.key === "Enter" && onSelect(region.name)} />
        ))}
      </svg>
      <div className="anatomy-label">TAP TO EXPLORE</div>
    </div>
  );
}
