import type { TrainingLog } from "./trainingMetrics";

export type ProgressionPoint = {
  date: string;
  /** 세트 × 횟수 × 중량. 중량 0인 맨몸 운동은 0이 되므로 reps 를 함께 본다. */
  volume: number;
  load: number;
  reps: number;
  sets: number;
  minutes: number;
};

export type ExerciseProgression = {
  exercise: string;
  sessions: number;
  points: ProgressionPoint[];
  first: ProgressionPoint;
  latest: ProgressionPoint;
  /** 비교 기준이 되는 값. 중량을 쓰면 중량, 맨몸이면 총 반복 수. */
  measure: "load" | "reps";
  measureLabel: string;
  change: number;
  direction: "올라감" | "유지" | "내려감";
  summary: string;
};

function toPoint(log: TrainingLog): ProgressionPoint {
  return {
    date: log.date,
    volume: log.sets * log.reps * log.load,
    load: log.load,
    reps: log.reps,
    sets: log.sets,
    minutes: log.minutes,
  };
}

/**
 * 한 종목의 기록을 오래된 순으로 모아 첫 기록과 최근 기록을 견준다.
 * 누적 볼륨만으로는 "무엇이 늘었는지"를 알 수 없어서, 중량을 쓰는 종목은 중량으로,
 * 맨몸처럼 중량이 0인 종목은 총 반복 수로 비교한다.
 */
export function getExerciseProgression(
  logs: TrainingLog[],
  exercise: string,
  minimumSessions = 2
): ExerciseProgression | null {
  const points = logs
    .filter(log => log.exercise === exercise)
    .map(toPoint)
    .sort((left, right) => left.date.localeCompare(right.date));
  if (points.length < minimumSessions) return null;

  const first = points[0];
  const latest = points[points.length - 1];
  const usesLoad = points.some(point => point.load > 0);
  const measure = usesLoad ? "load" : "reps";
  const measureLabel = usesLoad ? "중량" : "총 반복";
  const valueOf = (point: ProgressionPoint) =>
    usesLoad ? point.load : point.sets * point.reps;

  const change = valueOf(latest) - valueOf(first);
  const direction = change > 0 ? "올라감" : change < 0 ? "내려감" : "유지";
  const unit = usesLoad ? "kg" : "회";
  const summary =
    change === 0
      ? `${first.date}부터 ${measureLabel} ${valueOf(latest)}${unit}을 유지했습니다.`
      : `${first.date} ${valueOf(first)}${unit} → ${latest.date} ${valueOf(latest)}${unit}`;

  return {
    exercise,
    sessions: points.length,
    points,
    first,
    latest,
    measure,
    measureLabel,
    change,
    direction,
    summary,
  };
}

/**
 * 기록이 가장 많이 쌓인 종목부터 진척을 정리한다.
 * 한 번만 한 종목은 견줄 대상이 없으므로 제외한다.
 */
export function getTrackedProgressions(
  logs: TrainingLog[],
  limit = 4,
  minimumSessions = 2
): ExerciseProgression[] {
  const counts = new Map<string, number>();
  for (const log of logs)
    counts.set(log.exercise, (counts.get(log.exercise) ?? 0) + 1);

  return Array.from(counts.keys())
    .flatMap(exercise => {
      const progression = getExerciseProgression(
        logs,
        exercise,
        minimumSessions
      );
      return progression ? [progression] : [];
    })
    .sort(
      (left, right) =>
        right.sessions - left.sessions ||
        right.latest.date.localeCompare(left.latest.date)
    )
    .slice(0, limit);
}
