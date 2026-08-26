import type { Exercise } from "./fitnessData";

const source = {
  label: "NPS Hike Smart 안전 안내",
  url: "https://www.nps.gov/articles/hiking-safety.htm",
};

export const expandedExercisesPart8: Exercise[] = [
  {
    id: "easy-incline-walk",
    name: "이지 인클라인 워크",
    englishName: "Easy Incline Walk",
    category: "유산소",
    regions: ["하체", "둔근", "코어"],
    focus: "심폐",
    difficulty: "입문",
    equipment: "완만하고 건조한 경사로 · 미끄럽지 않은 신발",
    minutes: "8–20분 · 대화 가능한 강도",
    description:
      "평지 걷기에 익숙한 뒤 짧고 완만한 경사를 대화 가능한 속도로 오르며 등산·경사 보행의 기초를 만듭니다.",
    cues: [
      "평지보다 짧은 보폭",
      "숨이 차기 전 속도 낮추기",
      "내려갈 때는 더 천천히",
    ],
    benefits: ["경사 보행 적응", "하체·둔근 지구력", "야외 심폐 활동"],
    warning:
      "젖은 지면·낙엽·빙판·번개·어지러움·흉통이 있거나 대화가 어려우면 즉시 경사를 낮추거나 중단하세요.",
    reference: source,
  },
  {
    id: "controlled-downhill-walk",
    name: "컨트롤 다운힐 워크",
    englishName: "Controlled Downhill Walk",
    category: "균형·협응",
    regions: ["하체", "둔근", "코어"],
    focus: "협응",
    difficulty: "입문",
    equipment: "짧고 완만한 하향 경사 · 견고한 신발",
    minutes: "20–40걸음 · 2–3회",
    description:
      "짧고 건조한 내리막에서 보폭을 줄이고 발 전체로 조용히 내려오며 하강 시의 속도·균형 제어를 연습합니다.",
    cues: [
      "시선은 2–3걸음 앞 바닥으로",
      "보폭을 짧게·무릎을 부드럽게",
      "급한 방향 전환 피하기",
    ],
    benefits: ["내리막 보행 제어", "발목·무릎 협응", "지형 인식"],
    warning:
      "무릎·발목 통증, 불안정한 자갈·진흙·얼음, 시야 불량, 체중 부하 불가가 있으면 연습하지 마세요.",
    reference: source,
  },
  {
    id: "trekking-pole-walk-prep",
    name: "트레킹 폴 워크 프렙",
    englishName: "Trekking Pole Walk Preparation",
    category: "균형·협응",
    regions: ["하체", "코어", "팔", "어깨"],
    focus: "협응",
    difficulty: "입문",
    equipment: "길이 조절·잠금 확인된 트레킹 폴 · 평지",
    minutes: "20–40걸음 · 2–3회",
    description:
      "평지에서 폴 끝과 잠금 상태를 먼저 확인하고, 반대손·반대발 리듬으로 짧게 걸으며 폴 사용의 기초를 익힙니다.",
    cues: [
      "폴 길이·잠금·팁 상태 확인",
      "반대손·반대발 리듬",
      "폴을 멀리 찍지 않고 몸 가까이",
    ],
    benefits: ["폴 보행 협응", "상체·보행 리듬", "지형 준비"],
    warning:
      "폴 잠금이 불확실하거나 손목·어깨 통증, 주변 보행자와 간격 부족이 있으면 사용하지 말고 평지 걷기로 바꾸세요.",
    reference: source,
  },
  {
    id: "trail-step-over",
    name: "트레일 스텝오버 프렙",
    englishName: "Trail Step-Over Preparation",
    category: "균형·협응",
    regions: ["하체", "둔근", "코어"],
    focus: "균형",
    difficulty: "입문",
    equipment: "낮고 고정된 막대 또는 선 · 지지대 선택",
    minutes: "좌우 5–8회 · 2세트",
    description:
      "평평한 바닥에서 낮고 고정된 선 또는 막대를 한 발씩 넘으며 트레일의 작은 장애물 앞에서 발을 들어 옮기는 리듬을 연습합니다.",
    cues: [
      "낮은 높이와 넓은 공간부터",
      "발을 넘긴 뒤 1초 균형",
      "시선은 장애물과 앞 바닥 사이",
    ],
    benefits: ["발 끌림 감소 준비", "한 발 균형", "트레일 보행 협응"],
    warning:
      "걸려 넘어질 위험, 발목 불안정·급성 통증, 높은·움직이는 장애물이 있으면 시행하지 말고 벽 지지 마치로 낮추세요.",
    reference: source,
  },
  {
    id: "light-daypack-walk",
    name: "라이트 데이팩 워크",
    englishName: "Light Daypack Walk",
    category: "유산소",
    regions: ["하체", "둔근", "코어", "등"],
    focus: "체력",
    difficulty: "입문",
    equipment: "가볍고 밀착되는 배낭 · 평지 또는 완만한 길",
    minutes: "10–20분 · 대화 가능한 강도",
    description:
      "아주 가벼운 데이팩을 몸에 밀착하고 짧은 경로를 걸으며 야외 이동 시 배낭·보행 리듬을 탐색합니다.",
    cues: [
      "무게를 등에 가깝게·양쪽 끈 균등",
      "처음에는 평지·짧은 시간",
      "더위·피로 전에 쉬기",
    ],
    benefits: ["배낭 보행 준비", "몸통·보행 지구력", "장비 적응"],
    warning:
      "어깨·허리 통증, 끈이 피부를 누름, 더위·탈수 징후, 균형 저하가 있으면 무게·거리·경사를 낮추거나 중단하세요.",
    reference: source,
  },
  {
    id: "outdoor-pace-reset",
    name: "야외 페이스 리셋 워크",
    englishName: "Outdoor Pace Reset Walk",
    category: "러닝",
    regions: ["하체", "코어"],
    focus: "심폐",
    difficulty: "입문",
    equipment: "안전한 평지 또는 넓은 트레일",
    minutes: "1–2분 빠르게 + 1–2분 편안하게 · 3–5회",
    description:
      "안전한 평지에서 짧은 빠른 걷기와 편안한 걷기를 번갈아 수행하며 트레일 속도를 말하기 검사로 조정하는 유산소 기초입니다.",
    cues: [
      "빠른 구간도 짧은 문장은 가능하게",
      "내리막·교차로 전 미리 감속",
      "날씨·수분·귀가 시간을 함께 확인",
    ],
    benefits: ["페이스 조절", "야외 유산소 적응", "말하기 검사 활용"],
    warning:
      "열·천둥·시야 불량·길 이탈·어지러움·흉통이 있거나 호흡이 회복되지 않으면 속도를 즉시 낮추고 안전한 곳에서 쉬세요.",
    reference: source,
  },
];
