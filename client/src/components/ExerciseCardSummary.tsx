import { Dumbbell, Timer } from "lucide-react";
import type { Exercise } from "@/lib/catalogTypes";

export function ExerciseCardSummary({ exercise }: { exercise: Exercise }) {
  return (
    <>
      <p className="exercise-description">{exercise.description}</p>
      <div className="tag-row">
        {exercise.regions.map(region => (
          <span key={region}>{region}</span>
        ))}
        <span className="focus-tag">{exercise.focus}</span>
      </div>
      <div className="exercise-meta" aria-label={`${exercise.name} 핵심 정보`}>
        <span>
          <Timer size={14} />
          <b>시간</b>
          <em>{exercise.minutes}</em>
        </span>
        <span>
          <Dumbbell size={14} />
          <b>장비</b>
          <em>{exercise.equipment}</em>
        </span>
      </div>
    </>
  );
}
