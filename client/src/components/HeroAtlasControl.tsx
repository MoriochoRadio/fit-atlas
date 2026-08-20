import { atlasMotionSpeeds, atlasThemes, type AtlasMotionSpeed, type AtlasTheme } from "@/lib/localStore";

const themeCopy: Record<AtlasTheme, { label: string; description: string }> = {
  lime: { label: "라임", description: "선명한 시작 신호" },
  ocean: { label: "오션", description: "차분한 호흡 리듬" },
  coral: { label: "코랄", description: "따뜻한 에너지" },
  plum: { label: "플럼", description: "집중과 회복" },
};
const speedCopy: Record<AtlasMotionSpeed, { label: string; rate: string }> = {
  slow: { label: "느림", rate: "0.7×" },
  normal: { label: "보통", rate: "1.0×" },
  fast: { label: "빠름", rate: "1.4×" },
};

type HeroAtlasControlProps = {
  theme: AtlasTheme;
  motionSpeed: AtlasMotionSpeed;
  onTheme: (theme: AtlasTheme) => void;
  onMotionSpeed: (speed: AtlasMotionSpeed) => void;
  performanceText: string;
  feedback: string;
};

export function HeroAtlasControl({ theme, motionSpeed, onTheme, onMotionSpeed, performanceText, feedback }: HeroAtlasControlProps) {
  return <div className="atlas-theme-control" role="group" aria-label="아틀라스 제어"><div><p>ATLAS THEME</p><span>{themeCopy[theme].label} · {themeCopy[theme].description}</span></div><div className="atlas-theme-options" aria-label="아틀라스 색상 테마 선택">{atlasThemes.map((item) => <button key={item} className={theme === item ? "is-selected" : ""} onClick={() => onTheme(item)} aria-pressed={theme === item} aria-label={`${themeCopy[item].label} 테마 선택`}><i /><span>{themeCopy[item].label}</span></button>)}</div><div className="atlas-speed-control" role="group" aria-label="아틀라스 궤적 재생 속도">{atlasMotionSpeeds.map((speed) => <button key={speed} className={motionSpeed === speed ? "is-selected" : ""} onClick={() => onMotionSpeed(speed)} aria-pressed={motionSpeed === speed}><span>{speedCopy[speed].label}</span><b>{speedCopy[speed].rate}</b></button>)}</div><span className="atlas-performance-status">{performanceText}</span><span className="atlas-feedback" role="status" aria-live="polite">{feedback}</span></div>;
}
