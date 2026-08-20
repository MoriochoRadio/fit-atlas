import { Volume2, X } from "lucide-react";
import type { SceneExperiencePreferences } from "@/lib/localStore";

type SceneExperienceDialogProps = {
  preferences: SceneExperiencePreferences;
  onChangeSound: (soundEnabled: boolean) => void;
  onClose: () => void;
};

export function SceneExperienceDialog({ preferences, onChangeSound, onClose }: SceneExperienceDialogProps) {
  const sceneLabel = { home: "홈", session: "오늘 세션", explore: "운동 탐색", anatomy: "바디 맵", progress: "기록 분석", wellness: "웰니스" }[preferences.lastScene];
  return <div className="modal-backdrop" role="presentation" onMouseDown={onClose}><section className="log-modal scene-settings-modal" role="dialog" aria-modal="true" aria-labelledby="scene-settings-title" onMouseDown={(event) => event.stopPropagation()}><div className="modal-head"><div><p className="eyebrow">SCENE EXPERIENCE</p><h2 id="scene-settings-title">장면 전환 설정</h2></div><button onClick={onClose} className="icon-button" aria-label="닫기"><X size={19} /></button></div><p className="modal-description">장면을 바꿀 때의 감각과 다음 접속 시 시작 위치를 이 기기에서만 조절합니다.</p><div className="scene-settings-content"><label className="scene-sound-toggle"><input type="checkbox" checked={preferences.soundEnabled} onChange={(event) => onChangeSound(event.target.checked)} /><span><Volume2 size={18} /><b>장면 전환 효과음</b><small>{preferences.soundEnabled ? "켜짐 · 화면을 직접 전환할 때 짧고 부드러운 안내음이 재생됩니다." : "꺼짐 · 화면 이동은 시각 전환만 사용합니다."}</small></span></label><article className="last-scene-status"><span>LAST SCENE</span><b>{sceneLabel}</b><p>마지막으로 본 장면은 다음 접속 시 자동으로 복원됩니다.</p></article></div></section></div>;
}
