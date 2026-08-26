import type { Exercise } from "./fitnessData";

const sources = {
  who: {
    label: "WHO 신체 활동 일반 안내",
    url: "https://www.who.int/news-room/fact-sheets/detail/physical-activity",
  },
  redCross: {
    label: "American Red Cross 수영 안전",
    url: "https://www.redcross.org/get-help/how-to-prepare-for-emergencies/types-of-emergencies/water-safety/swim-safety.html",
  },
};

export const expandedExercisesPart9: Exercise[] = [
  {
    id: "bike-cadence-easy-spin",
    name: "이지 케이던스 스핀",
    englishName: "Easy Cadence Spin",
    category: "유산소",
    regions: ["하체", "둔근", "코어"],
    focus: "심폐",
    difficulty: "입문",
    equipment: "실내 자전거 또는 안전한 평지 자전거",
    minutes: "30초 가볍게 + 60초 편안하게 · 4–6회",
    description:
      "아주 낮은 저항에서 발을 원형으로 부드럽게 돌리고, 짧은 가벼운 스핀 뒤 충분히 편안한 페달링으로 돌아오는 리듬 드릴입니다.",
    cues: [
      "저항보다 부드러운 원형 리듬",
      "어깨·손목 힘 빼기",
      "안장 위에서 튀지 않기",
    ],
    benefits: ["페달링 리듬", "저충격 심폐 준비", "하체 협응"],
    warning:
      "어지러움·흉통·무릎 통증·안장 불안·야외 교통 위험이 있으면 즉시 중단하고 안전한 환경으로 전환하세요.",
    reference: sources.who,
  },
  {
    id: "bike-standing-transition-prep",
    name: "사이클 스탠딩 전환 프렙",
    englishName: "Bike Standing Transition Preparation",
    category: "유산소",
    regions: ["하체", "둔근", "코어", "팔"],
    focus: "협응",
    difficulty: "중급",
    equipment: "안정된 실내 자전거",
    minutes: "5–10초 · 3–5회",
    description:
      "안정된 실내 자전거에서 매우 낮은 저항을 사용해 안장 위에서 살짝 체중을 들어 올렸다 바로 앉으며 페달·몸통 지지 전환을 연습합니다.",
    cues: [
      "실내 자전거에서만 시작",
      "낮은 저항·짧은 시간",
      "핸들에 매달리지 않고 몸통 길게",
    ],
    benefits: ["안장 전환 인식", "하체·몸통 협응", "사이클 자세 변화 준비"],
    warning:
      "무릎·허리·손목 통증, 페달 미끄러짐, 균형 상실이 있으면 시행하지 말고 앉은 페달링으로 돌아가세요.",
    reference: sources.who,
  },
  {
    id: "bike-brake-check-walk",
    name: "사이클 브레이크 체크 워크",
    englishName: "Bike Brake Check Walk",
    category: "균형·협응",
    regions: ["하체", "코어", "팔"],
    focus: "협응",
    difficulty: "입문",
    equipment: "자전거 · 평평하고 차량 없는 공간",
    minutes: "20–40m · 2–3회",
    description:
      "차량이 없는 평평한 곳에서 자전거 옆을 천천히 걸으며 브레이크·안장·핸들·타이어 상태와 정지 동작을 확인하는 안전 준비 드릴입니다.",
    cues: [
      "차량 없는 넓은 공간",
      "출발 전 브레이크 반응 확인",
      "멈춘 뒤에만 장비 조정",
    ],
    benefits: ["자전거 장비 점검", "정지·보행 제어", "야외 라이딩 준비"],
    warning:
      "브레이크·타이어·체인에 이상이 있거나 차량·보행자가 가까우면 타지 말고 장비 점검을 우선하세요.",
    reference: sources.who,
  },
  {
    id: "pool-wall-glide-prep",
    name: "풀 월 글라이드 프렙",
    englishName: "Pool Wall Glide Preparation",
    category: "유산소",
    regions: ["코어", "어깨", "하체"],
    focus: "협응",
    difficulty: "입문",
    equipment: "감시 인력·동반자·얕은 수심이 확인된 수영장",
    minutes: "짧은 글라이드 3–5회 · 긴 휴식",
    description:
      "얕고 익숙한 수심에서 벽을 가볍게 밀고 짧은 몸통 정렬 글라이드를 연습한 뒤 바로 벽 또는 바닥 지지로 돌아오는 수중 기술 준비입니다.",
    cues: [
      "혼자 하지 않고 얕은 구간",
      "짧은 거리·긴 휴식",
      "호흡이 편안한 범위만",
    ],
    benefits: ["물속 몸통 정렬", "수중 자신감", "수영 기술 준비"],
    warning:
      "수심·감시·동반자·호흡 상태가 불확실하거나 숨참·어지러움이 있으면 물에 들어가지 말고 도움을 요청하세요.",
    reference: sources.redCross,
  },
  {
    id: "pool-kickboard-easy-kick",
    name: "이지 킥보드 플러터 킥",
    englishName: "Easy Kickboard Flutter Kick",
    category: "유산소",
    regions: ["하체", "둔근", "코어"],
    focus: "심폐",
    difficulty: "입문",
    equipment: "감시 인력·동반자·얕은 수심이 확인된 수영장 · 킥보드",
    minutes: "짧은 길이 2–4회 · 충분한 휴식",
    description:
      "감시와 동반자가 있는 익숙한 수영장에서 킥보드를 가볍게 잡고 작은 플러터 킥으로 짧은 거리를 이동하는 저강도 수중 드릴입니다.",
    cues: [
      "킥보드에 체중을 과하게 싣지 않기",
      "작고 편안한 킥",
      "한 길이 뒤 벽에서 충분히 쉬기",
    ],
    benefits: ["수중 하체 리듬", "저충격 유산소", "호흡·휴식 연습"],
    warning:
      "혼자 수영하거나 수심·감시 인력이 불확실하고, 숨참·경련·어지러움이 있으면 실시하지 말고 즉시 도움을 요청하세요.",
    reference: sources.redCross,
  },
];
