import { createContext } from "react";
import type { getAsciiDiagramPresentation } from "./asciiMovementDiagrams";

/**
 * 자세 지도(ASCII)는 운동 카드와 ROM 다이얼로그 양쪽 깊은 곳에서 렌더되고,
 * 축 표시·ROM 열기·대체 운동 탐색은 모두 Home 의 상태를 건드린다.
 * 프롭으로 내려보내면 중간 컴포넌트가 전부 통과 프롭만 갖게 되어 컨텍스트로 둔다.
 */
export type AsciiInteraction = {
  showAxis: boolean;
  pendingExerciseName: string | null;
  clearPendingExercise: () => void;
  onOpenRom: (
    exerciseName: string,
    presentation: ReturnType<typeof getAsciiDiagramPresentation>
  ) => void;
  onExploreAlternative: (exerciseName: string) => void;
  onAddToTodayRoutine: (exerciseName: string) => void;
};

export const AsciiInteractionContext = createContext<AsciiInteraction>({
  showAxis: true,
  pendingExerciseName: null,
  clearPendingExercise: () => undefined,
  onOpenRom: () => undefined,
  onExploreAlternative: () => undefined,
  onAddToTodayRoutine: () => undefined,
});
