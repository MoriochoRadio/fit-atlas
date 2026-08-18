import type { BodyRegion, Exercise } from "./fitnessData";

export type RecoveryPathwayId = "shoulder" | "low-back" | "knee" | "ankle";

export type RecoveryPathway = {
  id: RecoveryPathwayId;
  label: string;
  region: BodyRegion;
  summary: string;
  checkBefore: string[];
  chooseInstead: string[];
  returnRule: string;
  alternativeExerciseIds: string[];
  stopSignals: string[];
};

export const recoveryPathways: RecoveryPathway[] = [
  { id: "shoulder", label: "어깨 불편", region: "어깨", summary: "머리 위 밀기나 깊은 푸시업이 불편할 때, 진단 대신 움직임 반응을 확인하고 편안한 범위의 준비 움직임으로 낮추는 경로입니다.", checkBefore: ["팔을 올릴 때 갑작스러운 힘 빠짐·탈구 의심이 없는지 확인", "저림·외상 뒤 심한 통증·밤에 깨는 지속 통증이면 자가 진행보다 평가 우선"], chooseInstead: ["높이를 낮춘 벽 지지 움직임 또는 통증 없는 월 슬라이드", "상체 부하가 불편하면 걷기·하체·호흡 중심 세션으로 전환"], returnRule: "월 슬라이드나 가벼운 당기기를 편안히 제어한 뒤, 가동 범위·세트·저항 중 하나만 늘리세요.", alternativeExerciseIds: ["wall-slide", "cable-face-pull"], stopSignals: ["갑작스러운 힘 빠짐", "감각 변화 또는 외상성 통증"] },
  { id: "low-back", label: "허리·몸통 불편", region: "코어", summary: "무거운 힌지나 빠른 복부 운동이 불편할 때, 통증을 밀어붙이지 않고 걷기·작은 범위의 몸통 조절로 전환하는 경로입니다.", checkBefore: ["통증이 다리로 퍼지거나 감각·힘 변화가 없는지 확인", "대소변 변화·회음부 감각 변화·심한 외상은 즉시 자가 경로 중단"], chooseInstead: ["작은 범위의 버드 독처럼 골반이 흔들리지 않는 조절 움직임", "무거운 힌지 대신 짧은 걷기와 편안한 호흡"], returnRule: "일상 보행과 작은 범위의 조절 운동을 편안히 마친 뒤, 범위·반복·저항 중 하나만 올리세요.", alternativeExerciseIds: ["bird-dog", "pallof-press"], stopSignals: ["양쪽 다리 저림·약화", "대소변 또는 회음부 감각 변화"] },
  { id: "knee", label: "무릎 불편", region: "하체", summary: "스쿼트 깊이·점프·달리기가 불편할 때, 체중 부하 반응을 확인하고 낮은 의자·평지 걷기처럼 통제하기 쉬운 움직임으로 낮추는 경로입니다.", checkBefore: ["체중을 실을 수 있는지와 붓기·열감·잠김 느낌이 없는지 확인", "급성 붓기·관절 잠김·외상 뒤 변형은 자가 진행보다 평가 우선"], chooseInstead: ["안정된 의자에서 손 지지를 허용한 앉았다 일어나기", "평지·낮은 경사의 짧은 걷기 구간"], returnRule: "의자 앉았다 일어나기와 평지 보행이 다음 날까지 편안할 때, 거리·반복·깊이 중 하나만 조절하세요.", alternativeExerciseIds: ["sit-to-stand", "treadmill-walk-interval"], stopSignals: ["체중 부하 불가", "관절 잠김 또는 급성 붓기"] },
  { id: "ankle", label: "발목 불편", region: "하체", summary: "방향 전환·점프·경사 걷기가 불편할 때, 발뒤꿈치가 안정된 작은 가동성·지지대 가까운 균형으로 전환하는 경로입니다.", checkBefore: ["발목 붓기·열감·변형 또는 보행 불가가 없는지 확인", "감각 변화·심한 멍·최근 외상 뒤 악화는 자가 진행보다 평가 우선"], chooseInstead: ["발뒤꿈치를 바닥에 둔 니투월 락의 작은 범위", "벽·의자 가까이에서 짧게 한 발 서기"], returnRule: "평지 보행과 지지대 가까운 균형이 편안한 뒤, 거리·반복·방향 전환 중 하나만 늘리세요.", alternativeExerciseIds: ["ankle-knee-to-wall", "single-leg-stand"], stopSignals: ["4걸음 이상 체중 부하 불가", "변형·감각 변화 또는 급격한 붓기"] },
];

export function getRecoveryPathway(id: RecoveryPathwayId): RecoveryPathway {
  return recoveryPathways.find((pathway) => pathway.id === id) ?? recoveryPathways[0];
}

export function getRecoveryExploreAction(pathway: RecoveryPathway, exercise: Pick<Exercise, "name">) {
  return { keyword: exercise.name, region: pathway.region, category: "전체" as const, focus: "전체" as const, targetId: "explore" as const };
}

type RecoveryExploreEffects = {
  setKeyword: (value: string) => void;
  setCategory: (value: "전체") => void;
  setFocus: (value: "전체") => void;
  setRegion: (value: BodyRegion) => void;
  scrollToTarget: (targetId: "explore") => void;
};

export function applyRecoveryExplore(pathway: RecoveryPathway, exerciseId: string, catalog: Array<Pick<Exercise, "id" | "name">>, effects: RecoveryExploreEffects) {
  const exercise = catalog.find((item) => item.id === exerciseId);
  if (!exercise) return undefined;
  const action = getRecoveryExploreAction(pathway, exercise);
  effects.setKeyword(action.keyword);
  effects.setCategory(action.category);
  effects.setFocus(action.focus);
  effects.setRegion(action.region);
  effects.scrollToTarget(action.targetId);
  return { action, exercise };
}
