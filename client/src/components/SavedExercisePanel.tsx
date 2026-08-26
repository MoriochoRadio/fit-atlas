import { ArrowRight, History, Star } from "lucide-react";
import type { Exercise } from "@/lib/catalogTypes";

type SavedExercisePanelProps = {
  kind: "recent" | "favorite";
  exercises: Exercise[];
  onOpen: (exercise: Exercise) => void | Promise<void>;
};

export function SavedExercisePanel({
  kind,
  exercises,
  onOpen,
}: SavedExercisePanelProps) {
  const isRecent = kind === "recent";
  const title = isRecent ? "최근 본 운동" : "즐겨찾기";
  const eyebrow = isRecent ? "RECENTLY VIEWED" : "FAVORITES";
  const emptyTitle = isRecent
    ? "아직 다시 볼 운동이 없습니다."
    : "아직 즐겨찾는 운동이 없습니다.";
  const emptyCopy = isRecent
    ? "운동 카드에서 자세·근거 보기를 열면 여기에 자동으로 모입니다."
    : "운동 카드 오른쪽 위의 별표로 자주 찾는 운동을 여기에 모아 보세요.";
  const Icon = isRecent ? History : Star;

  return (
    <section
      className={`saved-exercise-panel saved-exercise-panel-${kind}`}
      aria-label={`${title} 빠른 재진입`}
    >
      <div className="saved-exercise-head">
        <div>
          <p className="small-label">
            <Icon size={13} /> {eyebrow}
          </p>
          <h3>{title}</h3>
        </div>
        <span className="saved-exercise-count">{exercises.length}</span>
      </div>
      {exercises.length ? (
        <div className="saved-exercise-list">
          {exercises.map((exercise, index) => (
            <button
              key={exercise.id}
              aria-label={`${exercise.name} 자세·안전 안내 다시 열기`}
              onClick={() => void onOpen(exercise)}
            >
              <span className="saved-exercise-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <small>
                  {exercise.category} · {exercise.focus}
                </small>
                <b>{exercise.name}</b>
              </div>
              <ArrowRight size={15} />
            </button>
          ))}
        </div>
      ) : (
        <div className="saved-exercise-empty">
          <strong>{emptyTitle}</strong>
          <p>{emptyCopy}</p>
        </div>
      )}
      <p className="saved-exercise-foot">
        선택하면 필터를 정리하고 해당 운동의 자세·안전 안내를 바로 엽니다.
      </p>
    </section>
  );
}
