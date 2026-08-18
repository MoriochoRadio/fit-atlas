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
};

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
