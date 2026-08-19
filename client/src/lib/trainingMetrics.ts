export type TrainingLog = {
  id: string;
  date: string;
  exercise: string;
  sets: number;
  reps: number;
  load: number;
  minutes: number;
  intensity: number;
  distanceKm?: number;
  distance?: number;
  distanceUnit?: "km" | "m";
};

export function getDistanceKm(log: Pick<TrainingLog, "distanceKm" | "distance" | "distanceUnit">) {
  if (typeof log.distance === "number") return log.distanceUnit === "m" ? log.distance / 1000 : log.distance;
  return log.distanceKm ?? 0;
}

export function getVolume(log: Pick<TrainingLog, "sets" | "reps" | "load">) {
  return log.sets * log.reps * log.load;
}

export function getTotalVolume(logs: TrainingLog[]) {
  return logs.reduce((sum, log) => sum + getVolume(log), 0);
}

export function getTotalMinutes(logs: TrainingLog[]) {
  return logs.reduce((sum, log) => sum + log.minutes, 0);
}

export function getPersonalRecords(logs: TrainingLog[]) {
  return logs.reduce<Record<string, number>>((records, log) => ({
    ...records,
    [log.exercise]: Math.max(records[log.exercise] ?? 0, log.load),
  }), {});
}

export function getWeeklyVolume(logs: TrainingLog[], referenceDate = new Date()) {
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(referenceDate);
    date.setHours(12, 0, 0, 0);
    date.setDate(date.getDate() - (6 - index));
    const key = date.toISOString().slice(0, 10);
    return {
      day: new Intl.DateTimeFormat("ko-KR", { weekday: "short" }).format(date),
      volume: logs.filter((log) => log.date === key).reduce((sum, log) => sum + getVolume(log), 0),
    };
  });
}

export function getCalendarDays(logs: TrainingLog[], referenceDate = new Date()) {
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(referenceDate);
    date.setHours(12, 0, 0, 0);
    date.setDate(date.getDate() - (6 - index));
    const key = date.toISOString().slice(0, 10);
    return {
      key,
      day: date.getDate(),
      weekday: new Intl.DateTimeFormat("ko-KR", { weekday: "short" }).format(date),
      count: logs.filter((log) => log.date === key).length,
    };
  });
}

export function getFourWeekTrends(logs: TrainingLog[], referenceDate = new Date()) {
  return Array.from({ length: 4 }, (_, index) => {
    const end = new Date(referenceDate);
    end.setUTCDate(end.getUTCDate() - (3 - index) * 7);
    const start = new Date(end);
    start.setUTCDate(start.getUTCDate() - 6);
    const selected = logs.filter((log) => log.date >= start.toISOString().slice(0, 10) && log.date <= end.toISOString().slice(0, 10));
    return { label: `${index + 1}주`, minutes: selected.reduce((sum, log) => sum + log.minutes, 0), distanceKm: Math.round(selected.reduce((sum, log) => sum + getDistanceKm(log), 0) * 10) / 10, load: selected.reduce((sum, log) => sum + log.minutes * log.intensity, 0) };
  });
}
