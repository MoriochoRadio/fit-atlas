import { describe, expect, it } from "vitest";
import { getExerciseMinutes, sortExercises } from "./exerciseSorting";
import type { Exercise } from "./fitnessData";

const exercise = (id: string, difficulty: Exercise["difficulty"], minutes: string): Exercise => ({
  id,
  name: id,
  englishName: id,
  category: "맨몸운동",
  regions: ["코어"],
  focus: "근력",
  difficulty,
  equipment: "장비 없음",
  minutes,
  description: "정렬 테스트를 위한 운동입니다.",
  cues: ["호흡", "정렬", "통제"],
  benefits: ["근력", "협응", "가동성"],
  warning: "통증이 생기면 즉시 중단하고 더 쉬운 변형으로 전환하세요.",
  reference: { label: "ACSM", url: "https://www.acsm.org" },
});

describe("exercise sorting", () => {
  const sample = [exercise("advanced-short", "상급", "10–15분"), exercise("beginner-long", "입문", "30–40분"), exercise("beginner-short", "입문", "5–10분"), exercise("intermediate", "중급", "15–20분")];

  it("reads the lower bound of a Korean duration range", () => {
    expect(getExerciseMinutes("15–20분")).toBe(15);
    expect(getExerciseMinutes("시간 자유")).toBe(Number.MAX_SAFE_INTEGER);
  });

  it("sorts recommendations by entry readiness and then shorter duration", () => {
    expect(sortExercises(sample, "recommended").map((item) => item.id)).toEqual(["beginner-short", "beginner-long", "intermediate", "advanced-short"]);
  });

  it("sorts by duration independently from difficulty", () => {
    expect(sortExercises(sample, "duration").map((item) => item.id)).toEqual(["beginner-short", "advanced-short", "intermediate", "beginner-long"]);
  });
});
