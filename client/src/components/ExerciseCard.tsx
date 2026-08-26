import { useContext, useEffect, useState } from "react";
import { ArrowRight, ChevronRight, Star } from "lucide-react";
import { ExerciseCardSummary } from "@/components/ExerciseCardSummary";
import { MovementVisualGuide } from "@/components/GuidancePanels";
import { AsciiInteractionContext } from "@/lib/asciiInteractionContext";
import {
  getAsciiDiagramPresentation,
  getAsciiMovementDiagram,
} from "@/lib/asciiMovementDiagrams";
import { getExerciseEvidenceScope } from "@/lib/exerciseEvidence";
import {
  getExerciseTextGuide,
  type ExerciseTextGuide,
} from "@/lib/exerciseTextGuide";
import type { ExerciseDetail } from "@/lib/exerciseDetails";
import type { Exercise } from "@/lib/fitnessData";
import { getMovementVisual } from "@/lib/movementVisuals";

export function ExerciseCard({
  exercise,
  detail,
  index,
  isFavorite,
  onToggleFavorite,
  onViewed,
  onAlt,
}: {
  exercise: Exercise;
  detail: ExerciseDetail;
  index: number;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onViewed: () => void;
  onAlt: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const visual = getMovementVisual(exercise.id);
  const textGuide = getExerciseTextGuide(exercise, detail);
  const evidence = getExerciseEvidenceScope(exercise);
  const detailId = `exercise-detail-${exercise.id}`;
  const { pendingExerciseName, clearPendingExercise } = useContext(
    AsciiInteractionContext
  );
  useEffect(() => {
    if (pendingExerciseName !== exercise.name) return;
    setExpanded(true);
    onViewed();
    clearPendingExercise();
  }, [clearPendingExercise, exercise.name, onViewed, pendingExerciseName]);
  return (
    <article
      data-atlas-index={String(index + 1).padStart(3, "0")}
      className={expanded ? "exercise-card is-expanded" : "exercise-card"}
    >
      <div className="exercise-top">
        <span className="exercise-category-label">{exercise.category}</span>
        <div className="exercise-card-actions">
          <span className="difficulty">
            <small>난이도</small>
            {exercise.difficulty}
          </span>
          <button
            className={
              isFavorite ? "favorite-toggle is-favorite" : "favorite-toggle"
            }
            aria-label={`${exercise.name} ${isFavorite ? "즐겨찾기 해제" : "즐겨찾기 추가"}`}
            aria-pressed={isFavorite}
            onClick={onToggleFavorite}
          >
            <Star size={15} fill={isFavorite ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
      <h3>{exercise.name}</h3>
      <p className="english-name">{exercise.englishName}</p>
      <ExerciseCardSummary exercise={exercise} />
      {expanded && (
        <div id={detailId} className="exercise-detail">
          <p className="small-label">TRAINING BENEFITS</p>
          <div className="benefit-row">
            {exercise.benefits.map(benefit => (
              <span key={benefit}>{benefit}</span>
            ))}
          </div>
          <TextExerciseGuide guide={textGuide} exerciseName={exercise.name} />
          {visual && (
            <section
              className="visual-guide-block"
              aria-label={`${exercise.name} 단계형 자세 안내`}
            >
              <div className="visual-guide-note">
                <span>01 · 02 · 03</span>
                <p>
                  그림의 순서대로 짧게 리허설한 뒤,{" "}
                  <strong>통증·불안정·호흡 흐트러짐</strong>이 있으면 아래의
                  쉬운 변형으로 조절하세요.
                </p>
              </div>
              <MovementVisualGuide
                title={visual.title}
                frames={visual.frames}
              />
            </section>
          )}
          <p className="small-label">SETUP</p>
          <ol>
            {detail.setup.map((step, stepIndex) => (
              <li key={step}>
                <b>{stepIndex + 1}.</b>
                {step}
              </li>
            ))}
          </ol>
          <p className="small-label">FORM CUES</p>
          <ol>
            {exercise.cues.map((cue, cueIndex) => (
              <li key={cue}>
                <b>{cueIndex + 1}.</b>
                {cue}
              </li>
            ))}
          </ol>
          <div className="detail-grid">
            <div>
              <p className="small-label">EASIER</p>
              <ul>
                {detail.regressions.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="small-label">NEXT STEP</p>
              <ul>
                {detail.progressions.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="small-label">COMMON ERRORS</p>
          <ul className="detail-errors">
            {detail.commonMistakes.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <button className="detail-alt" onClick={onAlt}>
            변형 비교 <ArrowRight size={14} />
          </button>
          <p className="exercise-finish">
            <b>마무리</b>
            {detail.finish}
          </p>
          <p className="exercise-warning">{exercise.warning}</p>
          <section
            className="evidence-scope"
            aria-label={`${exercise.name} 근거 적용 범위`}
          >
            <p className="small-label">EVIDENCE SCOPE</p>
            <p>{evidence.sourceLabel}</p>
            <p>{evidence.guidanceLabel}</p>
            <small>{evidence.limit}</small>
          </section>
          <a href={exercise.reference.url} target="_blank" rel="noreferrer">
            {exercise.reference.label} <ArrowRight size={13} />
          </a>
        </div>
      )}
      <button
        className="card-expand"
        aria-expanded={expanded}
        aria-controls={detailId}
        onClick={() => {
          const nextExpanded = !expanded;
          setExpanded(nextExpanded);
          if (nextExpanded) onViewed();
        }}
      >
        {expanded ? "간단히 보기" : "자세·근거 보기"}
        <ChevronRight size={15} className={expanded ? "rotate-icon" : ""} />
      </button>
    </article>
  );
}

function TextExerciseGuide({
  guide,
  exerciseName,
}: {
  guide: ExerciseTextGuide;
  exerciseName: string;
}) {
  const ascii = getAsciiMovementDiagram(exerciseName, guide);
  const presentation = getAsciiDiagramPresentation(guide);
  const { showAxis, onOpenRom } = useContext(AsciiInteractionContext);
  return (
    <section
      className="text-exercise-guide"
      aria-label={`${exerciseName} 사진 없는 자세 안내`}
    >
      <div className="text-guide-head">
        <div>
          <p className="small-label">TEXT MOVEMENT MAP</p>
          <h4>읽으며 따라 하는 자세 지도</h4>
        </div>
        <span>
          사진 없이도
          <br />① → ② → ③
        </span>
      </div>
      {ascii && (
        <section
          className={`ascii-movement-diagram theme-${presentation.categoryTheme} region-${presentation.regionTheme}`}
          aria-label={`${exerciseName} ASCII 동작 도식`}
        >
          <div className="ascii-legend">
            <p className="small-label">ASCII MOTION SKETCH</p>
            <div>
              <span>{presentation.categoryLabel}</span>
              <span>● {presentation.regionLabel}</span>
            </div>
            <p>
              <b>화살표 범례</b> {presentation.motionLabel}
            </p>
            <p>{ascii.description}</p>
          </div>
          <div
            className="ascii-axis-rom"
            aria-label={`중심축 ${presentation.jointFocus}, 가동 범위 ${presentation.rom}`}
          >
            {showAxis && (
              <>
                <div className="axis-points" aria-hidden="true">
                  <i />
                  <b />
                  <i />
                </div>
                <p>
                  <b>중심축</b> {presentation.jointFocus}
                </p>
              </>
            )}
            <button
              className={`rom-badge rom-${presentation.rom}`}
              onClick={() => onOpenRom(exerciseName, presentation)}
              aria-haspopup="dialog"
            >
              ROM · {presentation.rom}
            </button>
            <small>{presentation.romDescription}</small>
          </div>
          <div className="ascii-stages">
            {ascii.stages.map((stage, index) => (
              <article key={stage.label}>
                <span>
                  0{index + 1} · {stage.label}
                </span>
                <pre aria-label={`${stage.label} ASCII 도식: ${stage.cue}`}>
                  {stage.art}
                </pre>
                <i aria-hidden="true">{presentation.stageArrows[index]}</i>
                <b>{stage.cue}</b>
              </article>
            ))}
          </div>
        </section>
      )}
      <ol className="text-guide-sequence">
        {guide.sequence.map((step, index) => (
          <li key={step}>
            <span>0{index + 1}</span>
            <div>
              <b>{["시작 자세", "움직임", "마무리 확인"][index]}</b>
              <p>{step}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="text-guide-facts">
        <article>
          <span>◎ 주로 쓰는 근육</span>
          <p>{guide.primaryMuscles.join(" · ")}</p>
        </article>
        <article>
          <span>＋ 함께 쓰는 근육</span>
          <p>{guide.supportingMuscles.join(" · ")}</p>
        </article>
        <article>
          <span>↔ 호흡</span>
          <p>{guide.breathing.replace("↔ ", "")}</p>
        </article>
        <article>
          <span>↓ 어렵다면</span>
          <p>{guide.adjustment.replace("↓ ", "")}</p>
        </article>
      </div>
      <p className="text-guide-stop">{guide.stop}</p>
    </section>
  );
}
