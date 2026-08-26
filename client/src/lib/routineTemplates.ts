export type RoutineGoal =
  | "strength"
  | "endurance"
  | "weight_management"
  | "general_health";

export type RoutineWeek = {
  week: number;
  theme: string;
  sessions: string;
  focus: string[];
  note: string;
};

export type RoutineTemplate = {
  goal: RoutineGoal;
  title: string;
  intro: string;
  safetyNote: string;
  weeks: [RoutineWeek, RoutineWeek, RoutineWeek, RoutineWeek];
};

export const routineTemplates: RoutineTemplate[] = [
  {
    goal: "strength",
    title: "4주 기초 근력 루틴",
    intro:
      "주요 움직임 패턴을 낮은 부담에서 익히고, 자세 품질을 해치지 않는 범위에서만 진행합니다.",
    safetyNote:
      "모든 세트는 2–4회 정도 더 할 수 있는 여유를 남기는 강도에서 시작하세요.",
    weeks: [
      {
        week: 1,
        theme: "움직임 익히기",
        sessions: "주 2회",
        focus: [
          "맨몸 스쿼트 또는 고블릿 스쿼트",
          "푸시업 변형",
          "시티드 케이블 로우",
          "데드 버그",
        ],
        note: "가벼운 부하와 통증 없는 범위로 자세를 익힙니다.",
      },
      {
        week: 2,
        theme: "반복 안정화",
        sessions: "주 2회",
        focus: ["스쿼트 패턴", "당기기 패턴", "밀기 패턴", "버드 독"],
        note: "첫 주와 비슷한 부하에서 반복 품질과 회복 반응을 확인합니다.",
      },
      {
        week: 3,
        theme: "점진적 자극",
        sessions: "주 2–3회",
        focus: [
          "하체 1개",
          "상체 밀기 1개",
          "상체 당기기 1개",
          "코어 조절 1개",
        ],
        note: "한 종목의 반복 또는 중량 중 하나만 소폭 조절합니다.",
      },
      {
        week: 4,
        theme: "회복 확인",
        sessions: "주 2회",
        focus: ["가벼운 전신 세션", "가동성", "편안한 걷기 또는 사이클"],
        note: "피로·통증·수면을 돌아보고 다음 4주 기준을 기록합니다.",
      },
    ],
  },
  {
    goal: "endurance",
    title: "4주 심폐 기반 루틴",
    intro:
      "대화 가능한 강도의 지속 활동을 먼저 쌓고, 짧은 변화 구간은 회복이 충분할 때만 더합니다.",
    safetyNote:
      "흉통, 실신감, 비정상적인 호흡 곤란이 있으면 즉시 활동을 중단하고 평가를 받으세요.",
    weeks: [
      {
        week: 1,
        theme: "일관성 만들기",
        sessions: "주 3회",
        focus: ["이지 러닝 또는 빠른 걷기", "스테디 사이클", "짧은 가동성"],
        note: "각 세션은 대화 가능한 강도와 편안한 호흡을 우선합니다.",
      },
      {
        week: 2,
        theme: "시간 늘리기",
        sessions: "주 3회",
        focus: ["20–30분 지속 활동", "저충격 유산소", "코어 조절"],
        note: "속도보다 총 시간을 먼저 소폭 늘립니다.",
      },
      {
        week: 3,
        theme: "리듬 변화",
        sessions: "주 3회",
        focus: ["걷기·달리기 인터벌", "로잉 또는 엘립티컬", "편안한 걷기"],
        note: "짧은 변화 구간 뒤 충분한 회복 구간을 둡니다.",
      },
      {
        week: 4,
        theme: "지속 가능성",
        sessions: "주 2–3회",
        focus: ["선호 유산소 2회", "저강도 회복 1회", "가동성"],
        note: "피로가 쌓이면 강도보다 빈도·시간을 낮추고 회복을 우선합니다.",
      },
    ],
  },
  {
    goal: "weight_management",
    title: "4주 활동량·근력 균형 루틴",
    intro:
      "체중 변화 자체보다 일상 활동, 근력 유지, 지속 가능한 식사·수면 습관을 함께 다룹니다.",
    safetyNote:
      "극단적인 식사 제한과 과도한 운동량 증가는 피하고, 컨디션 저하가 반복되면 전문 상담을 고려하세요.",
    weeks: [
      {
        week: 1,
        theme: "활동 습관",
        sessions: "주 3회",
        focus: ["빠른 걷기", "맨몸 스쿼트", "푸시업 변형", "케이블 로우"],
        note: "짧은 세션을 규칙적으로 배치하고 생활 속 걷기를 기록합니다.",
      },
      {
        week: 2,
        theme: "전신 루틴",
        sessions: "주 3회",
        focus: ["저충격 유산소", "하체·당기기·밀기", "코어 조절"],
        note: "근력 세션과 편안한 유산소를 번갈아 배치합니다.",
      },
      {
        week: 3,
        theme: "점진적 활동",
        sessions: "주 3–4회",
        focus: ["사이클 또는 걷기", "전신 근력 2회", "가동성"],
        note: "시간 또는 반복 하나만 조금 늘리고 수면·에너지 반응을 확인합니다.",
      },
      {
        week: 4,
        theme: "유지 전략",
        sessions: "주 3회",
        focus: ["선호 활동", "기초 근력", "능동 회복"],
        note: "어떤 세션이 가장 지속 가능했는지 기록해 다음 주에 반영합니다.",
      },
    ],
  },
  {
    goal: "general_health",
    title: "4주 전신 건강 루틴",
    intro:
      "근력, 심폐 활동, 균형, 가동성을 한 주에 작은 단위로 나누어 일상 기능을 지지합니다.",
    safetyNote:
      "새 운동은 낮은 강도·짧은 시간부터 시작하고, 통증·어지러움·피로 변화에 따라 조절하세요.",
    weeks: [
      {
        week: 1,
        theme: "전신 기초",
        sessions: "주 2회",
        focus: [
          "의자 앉았다 일어나기",
          "빠른 걷기",
          "월 슬라이드",
          "한 발 서기",
        ],
        note: "안전한 지지와 편안한 범위에서 전신 움직임을 익힙니다.",
      },
      {
        week: 2,
        theme: "균형 배치",
        sessions: "주 2–3회",
        focus: ["하체 근력", "상체 당기기", "저충격 유산소", "균형"],
        note: "서로 다른 목적을 한 번에 과하게 넣지 않고 나누어 배치합니다.",
      },
      {
        week: 3,
        theme: "일상 기능",
        sessions: "주 3회",
        focus: ["스텝업", "캐리 또는 걷기", "푸시업 변형", "발목 가동성"],
        note: "일상에서 필요한 앉기·걷기·들기 패턴을 가볍게 연습합니다.",
      },
      {
        week: 4,
        theme: "회복 포함",
        sessions: "주 2회",
        focus: ["선호 유산소", "가벼운 전신 근력", "균형·가동성"],
        note: "피로와 수면을 확인하고 다음 사이클의 시작 강도를 조정합니다.",
      },
    ],
  },
];

export function getRoutineTemplate(goal: RoutineGoal) {
  return routineTemplates.find(template => template.goal === goal)!;
}
