import { catalogPage01 } from "./catalogPage01";
import { catalogPage02 } from "./catalogPage02";
import { catalogPage03 } from "./catalogPage03";
import { catalogPage04 } from "./catalogPage04";
import { catalogPage05 } from "./catalogPage05";
import { catalogPage06 } from "./catalogPage06";
import { catalogPage07 } from "./catalogPage07";
import { catalogPage08 } from "./catalogPage08";
import { catalogPage09 } from "./catalogPage09";
import { catalogPage10 } from "./catalogPage10";
import { catalogPage11 } from "./catalogPage11";
import type { Exercise, ExerciseDetail } from "./catalogTypes";

export type { ExerciseDetail } from "./catalogTypes";

const catalogEntries = [
  ...catalogPage01,
  ...catalogPage02,
  ...catalogPage03,
  ...catalogPage04,
  ...catalogPage05,
  ...catalogPage06,
  ...catalogPage07,
  ...catalogPage08,
  ...catalogPage09,
  ...catalogPage10,
  ...catalogPage11,
];

const detailByExerciseId = new Map(catalogEntries.map(({ exercise, detail }) => [exercise.id, detail]));

export const exerciseDetails: Record<string, ExerciseDetail> = Object.fromEntries(detailByExerciseId);

function fallbackDetail(exercise: Exercise): ExerciseDetail {
  return {
    setup: ["통증 없는 시작 자세와 주변 환경을 먼저 확인합니다.", `${exercise.equipment}을 안정적으로 준비하고 필요한 지지대를 가까이 둡니다.`, "낮은 강도와 작은 가동 범위에서 호흡·균형 반응을 확인합니다."],
    commonMistakes: ["통증·저림·현기증 신호를 무시하고 반복을 이어가기", "속도나 부하를 자세 품질보다 먼저 올리기", "호흡을 오래 참거나 관절 끝 범위를 억지로 밀어붙이기"],
    regressions: ["가동 범위·저항·시간 중 한 가지를 낮추기", "안정된 지지면 또는 보조 도구 가까이에서 연습하기", "반복 사이 휴식을 늘리고 편안한 호흡으로 되돌리기"],
    progressions: ["다음 날 반응이 편안할 때 반복 또는 시간을 소폭 늘리기", "자세가 안정된 뒤에만 저항 또는 복잡성을 한 단계 조절하기", "한 번에 하나의 변수만 바꿔 반응을 기록하기"],
    finish: "짧은 호흡 정리와 가벼운 보행으로 반응을 확인하고, 통증이나 어지러움이 남으면 다음 세션의 강도를 낮추세요.",
  };
}

export function getExerciseDetail(exercise: Exercise): ExerciseDetail {
  return detailByExerciseId.get(exercise.id) ?? fallbackDetail(exercise);
}
