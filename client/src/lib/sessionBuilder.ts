import { getCheckinRecommendation, type DailyCheckin } from "./dailyCheckin";

export type SessionGoal = "strength" | "endurance" | "all_round";
export type SessionEnvironment = "home" | "gym" | "outdoor";
export type SessionDuration = 15 | 30 | 45;

export type SessionInput = {
  goal: SessionGoal;
  environment: SessionEnvironment;
  duration: SessionDuration;
  checkin: DailyCheckin;
};

export type SessionBlock = {
  label: string;
  minutes: number;
  items: string[];
};

export type SessionPlan = {
  title: string;
  summary: string;
  adjustment: string;
  blocks: SessionBlock[];
  safetyNote: string;
};

const timing: Record<SessionDuration, [number, number, number]> = {
  15: [3, 8, 4],
  30: [5, 18, 7],
  45: [7, 28, 10],
};

const warmups: Record<SessionEnvironment, string[]> = {
  home: ["네발 자세 락백 · 6회", "캣·카우 가동성 · 6회", "편안한 제자리 걷기"],
  gym: ["가벼운 사이클 또는 트레드밀 걷기", "월 슬라이드 · 6회", "가벼운 체중 이동"],
  outdoor: ["편안한 걷기", "발목 니투월 락 · 좌우 6회", "짧은 보폭으로 리듬 찾기"],
};

const finishes: Record<SessionEnvironment, string[]> = {
  home: ["편안한 호흡 · 1–2분", "90·90 힙 스위치 또는 차일드 포즈", "오늘의 통증·피로 반응 기록"],
  gym: ["저항을 낮춘 걷기 또는 사이클", "가벼운 월 슬라이드", "다음 세션 전 회복 반응 기록"],
  outdoor: ["속도를 낮춘 걷기", "물·그늘 또는 실내 이동", "호흡·현기증·통증 반응 확인"],
};

const mainItems: Record<SessionGoal, Record<SessionEnvironment, string[]>> = {
  strength: {
    home: ["케틀벨 데드리프트 또는 맨몸 굿모닝 또는 콰이어트 힙 힌지 리치 · 2세트", "지지 풀업 네거티브 또는 발 지지 오버핸드 풀업 또는 내로우 인클라인 푸시업 이지 · 2세트", "지지 피스톨 스쿼트 투 박스 또는 지지 레터럴 런지 또는 지지 스플릿 스쿼트 홀드 · 2세트", "발 지지 풀업 포즈 래더 또는 데드 버그 콘트랄래터럴 리치 또는 니 플랭크 업다운 · 좌우 6회"],
    gym: ["레그 프레스 또는 샌드백 프런트 스쿼트 · 2–3세트", "머신 인클라인 체스트 프레스 또는 랜드마인 프레스 · 2–3세트", "어시스트 뉴트럴 그립 풀업 머신 또는 케이블 스트레이트 암 풀다운 · 2–3세트", "머신 앱 크런치 또는 케이블 스탠딩 힙 어브덕션 · 2세트"],
    outdoor: ["난간 지지 스텝업 · 좌우 2세트", "난간 지지 스텝다운 · 좌우 2세트", "로우 스텝 레터럴 탭 · 좌우 2세트", "탠덤 스탠스 · 좌우 20초"],
  },
  endurance: {
    home: ["콰이어트 스텝 터치 또는 로우 임팩트 스케이터 스텝", "스탠딩 섀도 복싱 이지 또는 슬로 마치 암 스윕 · 20–45초", "사이드 투 사이드 토 탭 또는 가동성 1–2개를 회복 구간에 배치"],
    gym: ["리컴번트 바이크·일립티컬·트레드밀 조그·워크 인터벌 중 선택", "대화 가능한 강도에서 지속", "자세가 무너지면 저항을 낮추기"],
    outdoor: ["200m 런·워크 이지 또는 러닝 액셀러레이션 마치", "400m 런·워크는 호흡이 편안할 때만", "더운 날에는 그늘·물·낮은 페이스 우선"],
  },
  all_round: {
    home: ["스쿼트 투 카프 레이즈 또는 월 싯 카프 레이즈 이지 또는 콰이어트 스쿼트 프런트 리치 · 2세트", "로우 바 그립 전환 로우 또는 아처 푸시업 프렙 또는 카운터 맨몸 트라이셉스 익스텐션 또는 월 푸시업 마치 이지 · 2세트", "지지 Y 밸런스 리치 또는 지지 레터럴 런지 또는 지지 컨트롤 스텝백 탭 · 좌우 2세트", "하이 플랭크 니 투 엘보 이지 또는 니 서포트 베어 숄더 시프트 또는 베어 크롤 포워드 이지"],
    gym: ["레그 프레스 또는 유니래터럴 레그 프레스 · 2세트", "케이블 싱글 암 로우 또는 어시스트 뉴트럴 그립 풀업 머신 · 2세트", "일립티컬 이지 또는 트레드밀 템포 워크 · 편안한 강도", "케이블 싱글 암 체스트 프레스 또는 팔로프 프레스 · 좌우 2세트"],
    outdoor: ["라이트 데이팩 워크 또는 빠른 걷기", "난간 지지 스텝업 또는 카프 레이즈", "컨트롤 다운힐 워크 또는 벽 지지 사이드 리치", "발목 니투월 락"],
  },
};

function shortMain(items: string[], duration: SessionDuration) {
  if (duration === 15) return items.slice(0, 2);
  if (duration === 30) return items.slice(0, 3);
  return items;
}

export function buildSession(input: SessionInput): SessionPlan {
  const readiness = getCheckinRecommendation(input.checkin);
  const [warmupMinutes, mainMinutes, finishMinutes] = timing[input.duration];

  if (readiness.mode === "stop_and_assess") {
    return {
      title: "통증 신호를 우선하는 회복 설계",
      summary: "오늘은 목표 세션을 보류하고, 통증을 통과하려 하지 않는 짧고 편안한 움직임만 고려하세요.",
      adjustment: readiness.rpeAdjustment,
      blocks: [
        { label: "환경 확인", minutes: 3, items: ["통증 위치·변화·외상 여부 확인", "날카로운 통증·저림·힘 빠짐이 있으면 운동 보류"] },
        { label: "편안한 움직임", minutes: Math.max(input.duration - 7, 5), items: ["편안한 걷기 또는 호흡 · 통증 없는 범위", "가벼운 네발 자세 락백 또는 캣·카우 · 불편하지 않을 때만"] },
        { label: "다음 결정", minutes: 4, items: ["반응이 악화되면 활동 중단", "위험 신호가 있으면 의료 평가 우선"] },
      ],
      safetyNote: "이 도구는 의료 진단이나 치료 처방을 제공하지 않습니다.",
    };
  }

  const isLight = readiness.mode === "recovery" || readiness.mode === "lighter";
  const main = shortMain(mainItems[input.goal][input.environment], input.duration);
  const goalName = { strength: "기초 근력", endurance: "심폐 리듬", all_round: "전신 균형" }[input.goal];
  const environmentName = { home: "집·매트", gym: "헬스장", outdoor: "야외·걷기" }[input.environment];

  return {
    title: `${input.duration}분 ${goalName} 세션 · ${environmentName}`,
    summary: isLight ? "오늘의 컨디션에 맞춰 세트·시간·저항 중 하나를 낮추고, 자세와 편안한 호흡을 우선합니다." : "워밍업에서 반응을 확인한 뒤, 계획한 범위 안에서만 한 가지 변수를 점진적으로 조절하세요.",
    adjustment: readiness.rpeAdjustment,
    blocks: [
      { label: "준비", minutes: warmupMinutes, items: warmups[input.environment].slice(0, input.duration === 15 ? 2 : 3) },
      { label: "주요 움직임", minutes: mainMinutes, items: isLight ? main.map((item) => `${item} · 평소보다 가볍게`) : main },
      { label: "마무리", minutes: finishMinutes, items: finishes[input.environment].slice(0, input.duration === 15 ? 2 : 3) },
    ],
    safetyNote: "통증, 어지러움, 비정상적인 숨참, 현기증이 있으면 즉시 멈추고 필요한 평가를 우선하세요.",
  };
}
