import { Volume2, X } from "lucide-react";
import { ModalDialog } from "@/components/ModalDialog";
import type {
  AtlasMotionSpeed,
  AtlasTheme,
  SceneExperiencePreferences,
} from "@/lib/localStore";

type SceneExperienceDialogProps = {
  preferences: SceneExperiencePreferences;
  onChangeSound: (soundEnabled: boolean) => void;
  onClose: () => void;
  /** 운동과 무관한 외형 설정. 홈 첫 화면을 차지하고 있어 이곳으로 모았다. */
  theme: AtlasTheme;
  onChangeTheme: (theme: AtlasTheme) => void;
  motionSpeed: AtlasMotionSpeed;
  onChangeMotionSpeed: (speed: AtlasMotionSpeed) => void;
  axisVisible: boolean;
  onChangeAxisVisible: (visible: boolean) => void;
};

const THEMES: ReadonlyArray<readonly [AtlasTheme, string]> = [
  ["lime", "라임"],
  ["ocean", "오션"],
  ["coral", "코랄"],
  ["plum", "플럼"],
];

const SPEEDS: ReadonlyArray<readonly [AtlasMotionSpeed, string]> = [
  ["slow", "느림"],
  ["normal", "보통"],
  ["fast", "빠름"],
];

export function SceneExperienceDialog({
  preferences,
  onChangeSound,
  onClose,
  theme,
  onChangeTheme,
  motionSpeed,
  onChangeMotionSpeed,
  axisVisible,
  onChangeAxisVisible,
}: SceneExperienceDialogProps) {
  const sceneLabel = {
    home: "홈",
    session: "오늘 세션",
    explore: "운동 탐색",
    anatomy: "바디 맵",
    progress: "기록 분석",
    wellness: "웰니스",
  }[preferences.lastScene];
  return (
    <ModalDialog
      className="log-modal scene-settings-modal"
      labelledBy="scene-settings-title"
      onClose={onClose}
    >
      <div className="modal-head">
        <div>
          <p className="eyebrow">SCENE EXPERIENCE</p>
          <h2 id="scene-settings-title">장면 전환 설정</h2>
        </div>
        <button onClick={onClose} className="icon-button" aria-label="닫기">
          <X size={19} />
        </button>
      </div>
      <p className="modal-description">
        장면을 바꿀 때의 감각과 다음 접속 시 시작 위치를 이 기기에서만
        조절합니다.
      </p>
      <div className="scene-settings-content">
        <label className="scene-sound-toggle">
          <input
            type="checkbox"
            checked={preferences.soundEnabled}
            onChange={event => onChangeSound(event.target.checked)}
          />
          <span>
            <Volume2 size={18} />
            <b>장면 전환 효과음</b>
            <small>
              {preferences.soundEnabled
                ? "켜짐 · 화면을 직접 전환할 때 짧고 부드러운 안내음이 재생됩니다."
                : "꺼짐 · 화면 이동은 시각 전환만 사용합니다."}
            </small>
          </span>
        </label>
        <article className="last-scene-status">
          <span>LAST SCENE</span>
          <b>{sceneLabel}</b>
          <p>마지막으로 본 장면은 다음 접속 시 자동으로 복원됩니다.</p>
        </article>
      </div>
      <section className="scene-settings-group" aria-label="화면 외형">
        <h3>화면 외형</h3>
        <p className="scene-settings-note">
          운동 내용과는 상관없는 표시 설정입니다.
        </p>
        <div className="scene-settings-row">
          <span>테마</span>
          <div role="group" aria-label="테마 선택">
            {THEMES.map(([value, label]) => (
              <button
                key={value}
                type="button"
                aria-pressed={theme === value}
                className={theme === value ? "is-selected" : ""}
                onClick={() => onChangeTheme(value)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="scene-settings-row">
          <span>모션 속도</span>
          <div role="group" aria-label="모션 속도 선택">
            {SPEEDS.map(([value, label]) => (
              <button
                key={value}
                type="button"
                aria-pressed={motionSpeed === value}
                className={motionSpeed === value ? "is-selected" : ""}
                onClick={() => onChangeMotionSpeed(value)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="scene-settings-row">
          <span>중심축 안내선</span>
          <button
            type="button"
            aria-pressed={axisVisible}
            className={axisVisible ? "is-selected" : ""}
            onClick={() => onChangeAxisVisible(!axisVisible)}
          >
            {axisVisible ? "표시" : "숨김"}
          </button>
        </div>
      </section>
    </ModalDialog>
  );
}
