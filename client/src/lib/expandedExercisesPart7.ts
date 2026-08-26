import type { Exercise } from "./fitnessData";

const sources = {
  cdcOlder: {
    label: "CDC 균형·근력·일상 활동 안내",
    url: "https://www.cdc.gov/physical-activity-basics/guidelines/older-adults.html",
  },
  acsm: {
    label: "ACSM 저항운동 지침",
    url: "https://acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines/",
  },
};

export const expandedExercisesPart7: Exercise[] = [
  {
    id: "rail-supported-step-up",
    name: "난간 지지 스텝업",
    englishName: "Rail-Supported Step-Up",
    category: "균형·협응",
    regions: ["하체", "둔근", "코어"],
    focus: "균형",
    difficulty: "입문",
    equipment: "낮고 안정된 계단 · 난간",
    minutes: "좌우 5–8회 · 2세트",
    description:
      "난간을 가볍게 잡고 낮은 계단에 한 발씩 올라섰다가 천천히 내려오며 계단 오르기와 체중 이동을 연습합니다.",
    cues: [
      "난간은 당기지 말고 가볍게 지지",
      "발 전체를 계단에 올리기",
      "내려올 때 속도를 더 천천히",
    ],
    benefits: ["계단 오르기 준비", "하체·둔근 사용", "체중 이동 균형"],
    warning:
      "난간·계단이 흔들리거나 무릎 통증·어지러움·넘어질 위험이 있으면 실시하지 말고 평지 걷기로 낮추세요.",
    reference: sources.cdcOlder,
  },
  {
    id: "rail-supported-step-down",
    name: "난간 지지 스텝다운",
    englishName: "Rail-Supported Step-Down",
    category: "균형·협응",
    regions: ["하체", "둔근", "코어"],
    focus: "협응",
    difficulty: "입문",
    equipment: "낮고 안정된 계단 · 난간",
    minutes: "좌우 4–6회 · 2세트",
    description:
      "낮은 계단 위에서 난간을 가볍게 지지하고 한 발을 바닥에 조용히 내리며 계단 내려가기의 속도 제어를 연습합니다.",
    cues: [
      "처음에는 낮은 한 칸만 사용",
      "무릎이 발 방향을 따라가기",
      "발끝이 아닌 발 전체로 조용히 착지",
    ],
    benefits: ["계단 하강 제어", "무릎·고관절 협응", "균형 자신감"],
    warning:
      "무릎이 꺾이는 느낌, 날카로운 통증, 발목 불안정, 지지대 불안이 있으면 중단하세요.",
    reference: sources.cdcOlder,
  },
  {
    id: "counter-incline-pushup",
    name: "카운터 인클라인 푸시업",
    englishName: "Counter Incline Push-Up",
    category: "맨몸운동",
    regions: ["가슴", "어깨", "팔", "코어"],
    focus: "근력",
    difficulty: "입문",
    equipment: "미끄럽지 않은 카운터 또는 벽",
    minutes: "2–3세트 · 5–12회",
    description:
      "단단하고 미끄럽지 않은 높은 지지면에 손을 두고 몸을 한 선으로 기울여 상체 밀기 패턴을 연습합니다.",
    cues: [
      "지지면이 움직이지 않는지 확인",
      "몸통을 길게 유지",
      "팔꿈치를 편안한 대각선으로 굽히기",
    ],
    benefits: ["상체 밀기 기초", "가슴·팔 근력", "코어 정렬"],
    warning:
      "손목·어깨 통증, 지지면 미끄러짐, 어지러움이 있으면 벽 푸시업 또는 상체 휴식으로 낮추세요.",
    reference: sources.acsm,
  },
  {
    id: "easy-suitcase-carry",
    name: "라이트 수트케이스 캐리",
    englishName: "Easy Suitcase Carry",
    category: "프리웨이트",
    regions: ["코어", "하체", "둔근", "팔"],
    focus: "체력",
    difficulty: "입문",
    equipment: "가벼운 덤벨 또는 장보기 가방 · 평평한 경로",
    minutes: "10–20m · 좌우 2–3회",
    description:
      "가벼운 물체를 한 손에 들고 짧고 평평한 경로를 천천히 걸으며 한쪽 운반과 몸통 정렬을 연습합니다.",
    cues: [
      "어깨를 한쪽으로 기울이지 않기",
      "방향 전환 전에 속도 줄이기",
      "짧은 경로부터 시작",
    ],
    benefits: ["한쪽 운반 준비", "그립·몸통 협응", "보행 제어"],
    warning:
      "허리·어깨·손목 통증, 물체를 제어하기 어려운 흔들림, 숨참이 있으면 부하·거리를 낮추거나 중단하세요.",
    reference: sources.acsm,
  },
  {
    id: "chair-rise-with-reach",
    name: "의자 일어서기·도달",
    englishName: "Chair Rise with Reach",
    category: "균형·협응",
    regions: ["하체", "둔근", "코어", "어깨"],
    focus: "협응",
    difficulty: "입문",
    equipment: "안정된 의자 · 벽 선택",
    minutes: "5–8회 · 2세트",
    description:
      "안정된 의자에서 일어선 뒤 벽 쪽으로 팔을 편안하게 뻗고 다시 앉으며 일상 전환과 가벼운 도달 동작을 연결합니다.",
    cues: [
      "의자가 벽에 닿아 움직이지 않게",
      "먼저 완전히 선 뒤 팔 뻗기",
      "앉을 때 엉덩이를 천천히 뒤로",
    ],
    benefits: ["일상 전환 동작", "하체·몸통 협응", "안전한 도달 연습"],
    warning:
      "현기증, 최근 낙상, 어깨 통증, 의자 흔들림이 있으면 팔 뻗기를 빼고 지지대를 사용하세요.",
    reference: sources.cdcOlder,
  },
  {
    id: "supported-floor-transfer",
    name: "지지 바닥 전환 프렙",
    englishName: "Supported Floor Transfer Preparation",
    category: "균형·협응",
    regions: ["하체", "둔근", "코어", "팔"],
    focus: "협응",
    difficulty: "중급",
    equipment: "단단한 의자 또는 소파 · 매트",
    minutes: "좌우 2–4회",
    description:
      "안정된 지지면 가까이에서 반무릎 자세와 손 지지를 이용해 바닥과 선 자세 사이의 전환을 천천히 연습합니다.",
    cues: [
      "지지면과 주변 공간 먼저 확인",
      "한 단계씩 멈춰 호흡 확인",
      "속도보다 손·무릎 위치 우선",
    ],
    benefits: ["바닥 전환 자신감", "고관절·무릎 협응", "일상 이동 준비"],
    warning:
      "최근 낙상·수술·관절 치환·심한 무릎/고관절 통증·어지러움이 있으면 혼자 연습하지 말고 전문가와 상의하세요.",
    reference: sources.cdcOlder,
  },
  {
    id: "wall-supported-lateral-reach",
    name: "벽 지지 사이드 리치",
    englishName: "Wall-Supported Lateral Reach",
    category: "균형·협응",
    regions: ["코어", "둔근", "하체", "어깨"],
    focus: "균형",
    difficulty: "입문",
    equipment: "벽 또는 안정된 카운터",
    minutes: "좌우 5–8회 · 2세트",
    description:
      "한 손을 벽에 가볍게 대고 반대팔을 옆으로 편안하게 뻗으며 체중을 작은 범위로 옮기는 균형 연습입니다.",
    cues: [
      "지지 손은 몸 가까이에",
      "발을 움직이지 않고 작은 범위",
      "시선은 정면에 두기",
    ],
    benefits: ["측면 체중 이동", "몸통·고관절 인식", "균형 준비"],
    warning:
      "어지러움·넘어질 위험·어깨 통증이 있으면 팔 도달 범위를 줄이거나 앉은 자세로 바꾸세요.",
    reference: sources.cdcOlder,
  },
  {
    id: "seated-march-to-stand",
    name: "시티드 마치·일어서기",
    englishName: "Seated March to Stand",
    category: "균형·협응",
    regions: ["하체", "둔근", "코어"],
    focus: "협응",
    difficulty: "입문",
    equipment: "안정된 의자 · 지지대 선택",
    minutes: "좌우 4회 + 3–6회 · 2세트",
    description:
      "의자에 앉아 작은 제자리 마치를 몇 번 수행한 뒤 안정적으로 일어서며 앉기·서기 전환 전의 다리 리듬을 연습합니다.",
    cues: [
      "의자가 움직이지 않는지 확인",
      "마치는 작고 천천히",
      "몸이 안정된 뒤에만 일어서기",
    ],
    benefits: ["앉은 자세 다리 리듬", "일어서기 준비", "균형·협응"],
    warning:
      "현기증, 호흡 곤란, 무릎 통증, 의자 불안이 있으면 마치만 하거나 도움을 사용하세요.",
    reference: sources.cdcOlder,
  },
  {
    id: "grocery-bag-lift-to-counter",
    name: "장보기 가방 카운터 리프트",
    englishName: "Grocery Bag Lift to Counter",
    category: "프리웨이트",
    regions: ["하체", "둔근", "코어", "팔", "등"],
    focus: "체력",
    difficulty: "입문",
    equipment: "아주 가벼운 가방 · 허리 높이의 안정된 카운터",
    minutes: "4–8회 · 2세트",
    description:
      "아주 가벼운 가방을 바닥 대신 높은 지지면에서 시작해 몸 가까이 들고 카운터 위에 조용히 놓으며 일상 물건 옮기기 경로를 연습합니다.",
    cues: [
      "가방을 몸 가까이 두기",
      "허리보다 엉덩이·무릎으로 높이 맞추기",
      "비틀지 말고 발을 옮겨 방향 전환",
    ],
    benefits: ["일상 물건 옮기기", "하체·몸통 협응", "안전한 들어올리기 인식"],
    warning:
      "허리·어깨 통증, 가방 내용물 이동, 급한 비틀기, 무거운 물체가 있으면 실시하지 말고 더 가볍거나 도움을 사용하세요.",
    reference: sources.acsm,
  },
];
