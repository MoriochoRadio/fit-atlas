import type { BodyRegion, Exercise } from "./fitnessData";

export type RecoveryPathwayId = "shoulder" | "low-back" | "knee" | "ankle" | "wrist" | "elbow" | "hip";

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
  { id: "knee", label: "무릎 불편", region: "하체", summary: "스쿼트 깊이·점프·달리기가 불편할 때, 체중 부하 반응을 확인하고 낮은 의자·평지 걷기처럼 통제하기 쉬운 움직임으로 낮추는 경로입니다.", checkBefore: ["체중을 실을 수 있는지와 붓기·열감·잠김 느낌이 없는지 확인", "급성 붓기·관절 잠김·외상 뒤 변형은 자가 진행보다 평가 우선"], chooseInstead: ["안정된 의자에서 작은 제자리 마치 뒤 천천히 일어서기", "평지·낮은 경사의 짧은 걷기 구간"], returnRule: "앉은 마치·일어서기와 평지 보행이 다음 날까지 편안할 때, 거리·반복·깊이 중 하나만 조절하세요.", alternativeExerciseIds: ["seated-march-to-stand", "treadmill-walk-interval"], stopSignals: ["체중 부하 불가", "관절 잠김 또는 급성 붓기"] },
  { id: "ankle", label: "발목 불편", region: "하체", summary: "방향 전환·점프·경사 걷기가 불편할 때, 발뒤꿈치가 안정된 작은 가동성·지지대 가까운 균형으로 전환하는 경로입니다.", checkBefore: ["발목 붓기·열감·변형 또는 보행 불가가 없는지 확인", "감각 변화·심한 멍·최근 외상 뒤 악화는 자가 진행보다 평가 우선"], chooseInstead: ["발뒤꿈치를 바닥에 둔 니투월 락의 작은 범위", "벽·카운터 가까이에서 작은 옆 체중 이동"], returnRule: "평지 보행과 지지대 가까운 작은 체중 이동이 편안한 뒤, 거리·반복·방향 전환 중 하나만 늘리세요.", alternativeExerciseIds: ["ankle-knee-to-wall", "wall-supported-lateral-reach"], stopSignals: ["4걸음 이상 체중 부하 불가", "변형·감각 변화 또는 급격한 붓기"] },
  { id: "wrist", label: "손목 불편", region: "팔", summary: "푸시업·플랭크·그립 운동이 불편할 때, 손바닥 체중 부하를 줄이고 전완·손목의 작은 범위 움직임으로 반응을 확인하는 경로입니다.", checkBefore: ["외상 뒤 변형·급성 붓기·손가락 감각 변화가 없는지 확인", "손을 쥘 수 없거나 통증이 빠르게 커지면 자가 진행보다 평가 우선"], chooseInstead: ["앉은 자세에서 손목을 작은 범위로 굽혔다 펴기", "손바닥 지지 대신 의자에서 작은 마치·일어서기 또는 걷기 중심으로 전환"], returnRule: "일상적인 쥐기와 작은 손목 움직임이 다음 날까지 편안할 때, 지지 높이·시간·반복 중 하나만 조절하세요.", alternativeExerciseIds: ["seated-wrist-mobility", "seated-march-to-stand"], stopSignals: ["손가락 감각 저하 또는 뚜렷한 약화", "외상 뒤 변형·급성 붓기"] },
  { id: "elbow", label: "팔꿈치 불편", region: "팔", summary: "반복적인 당기기·컬·그립이 불편할 때, 통증을 누르지 않고 전완 부담과 그립 저항을 낮춰 움직임 반응을 확인하는 경로입니다.", checkBefore: ["팔꿈치 주변 열감·급성 붓기·외상성 통증이 없는지 확인", "휴식 중에도 심한 통증·감각 변화·갑작스러운 힘 빠짐이면 평가 우선"], chooseInstead: ["그립 저항 없이 손목·전완을 작은 범위에서 천천히 움직이기", "팔꿈치 부하가 적은 걷기·하체·호흡 중심 세션으로 전환"], returnRule: "가벼운 일상 쥐기와 작은 범위의 전완 움직임이 편안한 뒤, 부하·반복·그립 강도 중 하나만 늘리세요.", alternativeExerciseIds: ["seated-wrist-mobility", "sit-to-stand"], stopSignals: ["휴식 중 심해지는 통증 또는 감각 변화", "외상 뒤 붓기·변형 또는 급격한 힘 저하"] },
  { id: "hip", label: "고관절 불편", region: "둔근", summary: "깊은 스쿼트·런지·빠른 달리기가 불편할 때, 가동 범위를 강요하지 않고 보행·둔근 조절·작은 고관절 움직임으로 전환하는 경로입니다.", checkBefore: ["체중 부하 시 심한 통증·절뚝거림·갑작스러운 움직임 제한이 없는지 확인", "외상 뒤 변형·발열·밤에 깨는 지속 통증이면 자가 진행보다 평가 우선"], chooseInstead: ["반무릎 자세에서 고관절 앞쪽을 작은 범위로 편안하게 움직이기", "벽 지지 상태에서 작은 옆 체중 이동 또는 짧은 평지 걷기"], returnRule: "보행과 벽 지지 체중 이동을 다음 날까지 편안히 마친 뒤, 깊이·거리·저항 중 하나만 늘리세요.", alternativeExerciseIds: ["hip-flexor-stretch", "wall-supported-lateral-reach"], stopSignals: ["체중 부하가 어려운 심한 통증", "외상 뒤 변형·발열 또는 진행성 절뚝거림"] },
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
