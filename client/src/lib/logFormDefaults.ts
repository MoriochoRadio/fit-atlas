import type { TrainingLog } from "./trainingMetrics";

export type LogFormValues = {
  date: string;
  exercise: string;
  sets: string;
  reps: string;
  load: string;
  minutes: string;
  distance: string;
  distanceUnit: "km" | "m";
  intensity: string;
};

/** 기록이 하나도 없을 때 쓰는 값. 가벼운 시작을 가정한다. */
export const emptyLogFormValues: Omit<LogFormValues, "date" | "exercise"> = {
  sets: "3",
  reps: "8",
  load: "40",
  minutes: "35",
  distance: "",
  distanceUnit: "km",
  intensity: "6",
};

function byDateDescending(left: TrainingLog, right: TrainingLog) {
  return right.date.localeCompare(left.date);
}

/** 같은 종목의 가장 최근 기록. 같은 날짜가 여러 건이면 목록에서 앞선 것을 쓴다. */
export function findLastEntryFor(logs: TrainingLog[], exercise: string) {
  return logs
    .filter(log => log.exercise === exercise)
    .sort(byDateDescending)
    .at(0);
}

/**
 * 매번 세트·횟수·중량을 처음부터 치는 대신 같은 종목의 직전 기록을 채워 준다.
 * 대개 지난번과 같거나 한 단계만 다르므로, 기본값이 맞으면 그대로 저장하면 된다.
 */
export function buildLogFormValues(
  logs: TrainingLog[],
  exercise: string,
  today: string
): LogFormValues {
  const last = findLastEntryFor(logs, exercise);
  if (!last) return { ...emptyLogFormValues, date: today, exercise };
  return {
    date: today,
    exercise,
    sets: String(last.sets),
    reps: String(last.reps),
    load: String(last.load),
    minutes: String(last.minutes),
    distance: last.distance === undefined ? "" : String(last.distance),
    distanceUnit: last.distanceUnit ?? "km",
    intensity: String(last.intensity),
  };
}

/**
 * 최근에 기록한 종목을 중복 없이 최신순으로. 990개짜리 선택 목록을 훑지 않고도
 * 자주 하는 운동을 바로 고를 수 있게 하려는 것이다.
 */
export function getRecentLoggedExercises(logs: TrainingLog[], limit = 5) {
  const names: string[] = [];
  for (const log of [...logs].sort(byDateDescending)) {
    if (names.includes(log.exercise)) continue;
    names.push(log.exercise);
    if (names.length >= limit) break;
  }
  return names;
}

/** 직전 기록과 견줘 무엇이 달라졌는지. 저장 전에 눈으로 확인할 한 줄이다. */
export function describeChangeFromLast(
  logs: TrainingLog[],
  values: LogFormValues
) {
  const last = findLastEntryFor(logs, values.exercise);
  if (!last) return null;
  const changes: string[] = [];
  const compare = (label: string, before: number, after: string) => {
    const next = Number(after);
    if (!Number.isFinite(next) || next === before) return;
    changes.push(`${label} ${before} → ${next}`);
  };
  compare("세트", last.sets, values.sets);
  compare("횟수", last.reps, values.reps);
  compare("중량", last.load, values.load);
  compare("시간", last.minutes, values.minutes);
  compare("RPE", last.intensity, values.intensity);
  if (changes.length === 0) return `${last.date} 기록과 같은 구성입니다.`;
  return `${last.date} 대비 ${changes.join(" · ")}`;
}
