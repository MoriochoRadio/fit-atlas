export type BodyRegion = "가슴" | "등" | "어깨" | "팔" | "코어" | "둔근" | "하체";
export type ExerciseCategory = "러닝" | "유산소" | "헬스기구" | "프리웨이트" | "맨몸운동";

export type Exercise = {
  id: string;
  name: string;
  englishName: string;
  category: ExerciseCategory;
  regions: BodyRegion[];
  focus: "근력" | "체력" | "심폐" | "가동성";
  difficulty: "입문" | "중급" | "상급";
  equipment: string;
  minutes: string;
  description: string;
  cues: string[];
  warning: string;
  reference: { label: string; url: string };
};

export const exercises: Exercise[] = [
  {
    id: "squat",
    name: "바벨 백 스쿼트",
    englishName: "Barbell Back Squat",
    category: "프리웨이트",
    regions: ["하체", "둔근", "코어"],
    focus: "근력",
    difficulty: "중급",
    equipment: "바벨 · 랙",
    minutes: "3–5세트 · 5–10회",
    description: "무릎과 발끝의 방향을 정렬하고, 몸통의 긴장을 유지하며 고관절과 무릎을 함께 굽혀 일어나는 복합 하체 운동입니다.",
    cues: ["발 전체로 바닥을 균등하게 누르기", "갈비뼈와 골반을 중립에 가깝게 유지", "통증 없는 가동 범위에서 제어하기"],
    warning: "날카로운 무릎·허리 통증, 저림 또는 불안정감이 있으면 중단하고 평가를 받으세요.",
    reference: { label: "ACSM 저항 운동 지침", url: "https://acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines/" },
  },
  {
    id: "run",
    name: "이지 러닝",
    englishName: "Easy Run",
    category: "러닝",
    regions: ["하체", "둔근", "코어"],
    focus: "심폐",
    difficulty: "입문",
    equipment: "러닝화",
    minutes: "20–40분 · 대화 가능한 강도",
    description: "대화가 가능한 편안한 강도로 리듬을 유지하는 지속성 러닝입니다. 처음에는 걷기 구간을 섞어 점진적으로 시간을 늘립니다.",
    cues: ["시선은 전방, 어깨 힘 빼기", "짧고 조용한 보폭으로 착지", "숨이 과도하게 가빠지면 속도 낮추기"],
    warning: "흉통, 어지러움, 비정상적인 호흡 곤란은 즉시 중단 신호입니다.",
    reference: { label: "WHO 신체 활동 권고", url: "https://www.who.int/news-room/fact-sheets/detail/physical-activity" },
  },
  {
    id: "row",
    name: "시티드 케이블 로우",
    englishName: "Seated Cable Row",
    category: "헬스기구",
    regions: ["등", "팔"],
    focus: "근력",
    difficulty: "입문",
    equipment: "케이블 머신",
    minutes: "3세트 · 8–12회",
    description: "팔로 당기기보다 견갑골을 뒤·아래로 움직인 뒤 팔꿈치를 몸통 가까이 보내는 등 중심의 당기기 운동입니다.",
    cues: ["몸통을 과도하게 젖히지 않기", "어깨를 귀에서 멀어지게 유지", "복귀 구간도 천천히 제어"],
    warning: "어깨 앞쪽의 통증이 커지면 가동 범위와 부하를 줄이고 전문가와 상담하세요.",
    reference: { label: "CDC 주요 근육군 운동", url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html" },
  },
  {
    id: "pushup",
    name: "푸시업",
    englishName: "Push-up",
    category: "맨몸운동",
    regions: ["가슴", "어깨", "팔", "코어"],
    focus: "근력",
    difficulty: "입문",
    equipment: "없음",
    minutes: "2–4세트 · 6–15회",
    description: "손으로 바닥을 밀며 몸통을 하나의 선으로 유지하는 상체 밀기 운동입니다. 벽·벤치 변형으로 난이도를 조정할 수 있습니다.",
    cues: ["머리부터 발뒤꿈치까지 긴 선 만들기", "팔꿈치는 몸통에서 약간 대각선", "내려갈 때 들이쉬고 밀며 내쉬기"],
    warning: "손목 또는 어깨 통증이 지속되면 높은 지지면 변형을 사용하거나 상담하세요.",
    reference: { label: "CDC 주요 근육군 운동", url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html" },
  },
  {
    id: "deadbug",
    name: "데드 버그",
    englishName: "Dead Bug",
    category: "맨몸운동",
    regions: ["코어", "둔근"],
    focus: "가동성",
    difficulty: "입문",
    equipment: "매트",
    minutes: "2–3세트 · 좌우 6–10회",
    description: "누운 자세에서 팔다리를 교차로 움직이며 몸통의 과도한 움직임을 줄이는 코어 조절 운동입니다.",
    cues: ["허리를 바닥에 강하게 누르기보다 편안한 중립 찾기", "느리고 작은 범위부터 시작", "숨을 참지 않고 길게 내쉬기"],
    warning: "허리 통증이 뚜렷하게 증가하면 움직임 범위를 줄이거나 중단하세요.",
    reference: { label: "NHS 통증 자가 관리", url: "https://www.nhs.uk/live-well/pain/10-ways-to-ease-pain/" },
  },
  {
    id: "bike",
    name: "스테디 사이클",
    englishName: "Steady Cycling",
    category: "유산소",
    regions: ["하체", "둔근"],
    focus: "심폐",
    difficulty: "입문",
    equipment: "실내 자전거",
    minutes: "25–45분 · RPE 4–6",
    description: "관절 충격을 낮추면서 하체와 심폐 지구력을 기를 수 있는 지속성 유산소 운동입니다.",
    cues: ["안장은 무릎이 완전히 잠기지 않는 높이", "어깨를 편안하게, 손에 체중 싣지 않기", "처음에는 일정한 강도로 유지"],
    warning: "무릎 앞쪽 불편이 이어지면 안장 높이와 저항을 재조정하세요.",
    reference: { label: "WHO 신체 활동 권고", url: "https://www.who.int/news-room/fact-sheets/detail/physical-activity" },
  },
  {
    id: "rdl",
    name: "덤벨 루마니안 데드리프트",
    englishName: "Dumbbell Romanian Deadlift",
    category: "프리웨이트",
    regions: ["둔근", "하체", "등"],
    focus: "근력",
    difficulty: "중급",
    equipment: "덤벨",
    minutes: "3세트 · 8–10회",
    description: "엉덩이를 뒤로 보내는 힙 힌지 패턴을 통해 둔근과 햄스트링을 중심으로 강화하는 운동입니다.",
    cues: ["무릎은 부드럽게 굽힌 채 유지", "덤벨을 몸 가까이 이동", "등으로 들기보다 엉덩이로 일어서기"],
    warning: "허리의 날카로운 통증이나 방사통이 있으면 수행하지 마세요.",
    reference: { label: "ACSM 저항 운동 지침", url: "https://acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines/" },
  },
  {
    id: "latpulldown",
    name: "랫 풀다운",
    englishName: "Lat Pulldown",
    category: "헬스기구",
    regions: ["등", "팔"],
    focus: "근력",
    difficulty: "입문",
    equipment: "랫 풀다운 머신",
    minutes: "3세트 · 8–12회",
    description: "팔꿈치를 아래·옆으로 당기며 광배근과 상부 등 근육을 쓰는 수직 당기기 운동입니다.",
    cues: ["목 뒤가 아닌 가슴 윗부분 방향으로 당기기", "반동 없이 천천히 복귀", "그립보다 팔꿈치 이동에 집중"],
    warning: "목·어깨 통증이 있으면 무게를 줄이고 그립 폭을 조정하세요.",
    reference: { label: "CDC 주요 근육군 운동", url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html" },
  },
];

export const recoveryGuides: Record<BodyRegion, { title: string; intro: string; steps: string[]; caution: string }> = {
  가슴: { title: "가슴·앞어깨의 긴장 완화", intro: "무리한 밀기 운동 뒤의 뻐근함에는 강도를 줄이고 통증 없는 범위의 움직임부터 재개하세요.", steps: ["문틀에 손을 가볍게 대고 가슴 앞쪽을 부드럽게 열기", "폼롤러를 등 상부에 두고 흉추를 편안하게 펴기", "마사지건은 뼈·관절·목 앞쪽을 피하고 낮은 강도로 짧게 사용"], caution: "저림, 흉통, 숨참, 외상 후 변형은 자가 관리보다 즉시 평가가 우선입니다." },
  등: { title: "등·견갑 주변의 회복", intro: "오래 앉은 뒤의 뻣뻣함은 가벼운 걷기와 견갑의 부드러운 움직임으로 시작합니다.", steps: ["네발 자세에서 등 전체를 천천히 둥글고 길게 만들기", "벽에 등을 대고 팔을 천천히 위로 미끄러뜨리기", "마사지건은 척추뼈 위를 피하고 주변 근육에만 짧게 사용"], caution: "팔까지 내려오는 저림, 감각 이상, 진행성 약화는 전문 평가가 필요합니다." },
  어깨: { title: "어깨 가동성·부하 관리", intro: "통증이 있는 어깨는 강한 스트레칭보다 자극을 낮추고 편안한 범위에서 움직이는 것이 먼저입니다.", steps: ["팔꿈치를 옆구리에 붙이고 가볍게 바깥 회전 연습", "견갑을 뒤·아래로 부드럽게 정렬", "폼롤러는 광배·등 상부 주변을 짧고 편안하게 사용"], caution: "갑작스러운 힘 빠짐, 외상 뒤의 심한 통증, 밤에 깨는 통증은 진료 상담이 필요합니다." },
  팔: { title: "팔·전완의 부담 낮추기", intro: "그립 운동량이 많았다면 반복 동작과 강도를 잠시 낮추고 손목 중립을 되찾습니다.", steps: ["손목을 편안한 범위에서 천천히 굽혔다 펴기", "팔꿈치를 고정한 채 가벼운 회전 움직임", "마사지건은 팔 근육 부위에 낮은 강도로 짧게 사용"], caution: "감각 저하나 손의 뚜렷한 힘 약화가 있으면 운동을 중단하고 평가를 받으세요." },
  코어: { title: "몸통의 편안한 재가동", intro: "허리 불편은 통증을 밀어붙이는 운동 대신 걷기와 작은 범위의 조절 운동부터 시작하세요.", steps: ["천천히 복식 호흡하며 골반·갈비뼈 긴장 완화", "누운 자세에서 한쪽 발만 가볍게 들었다 내리기", "폼롤러는 척추 자체가 아닌 둔근·등 주변 근육에 사용"], caution: "대소변 변화, 회음부 감각 변화, 심한 방사통은 긴급 평가가 필요할 수 있습니다." },
  둔근: { title: "둔근·고관절 주변 회복", intro: "둔근의 뻐근함에는 가벼운 보행과 고관절의 편안한 가동 범위 회복을 우선합니다.", steps: ["누워서 한쪽 무릎을 가슴 쪽으로 가볍게 당기기", "엉덩이를 조여 브리지의 짧은 범위부터 연습", "폼롤러는 둔근에 체중을 과하게 싣지 않고 천천히 이동"], caution: "다리 저림·통증이 점점 아래로 퍼지거나 근력 저하가 있으면 상담하세요." },
  하체: { title: "하체의 점진적 회복", intro: "운동 뒤 불편감에는 무리한 압박보다 저강도 움직임과 점진적 부하 복귀가 기본입니다.", steps: ["발목을 천천히 앞뒤로 움직여 순환 돕기", "벽을 짚고 종아리·엉덩이를 편안한 범위에서 늘리기", "폼롤러는 근육 부위에만 짧게 사용하고 관절·정맥류 부위는 피하기"], caution: "붓기·열감·외상·체중 부하 불가·무릎 잠김이 있으면 자가 운동을 멈추고 평가를 받으세요." },
};

export const wellnessCards = [
  { eyebrow: "RECOVER", title: "수면 리듬", text: "성인 수면 권고는 7–9시간입니다. 기상·취침 시간을 일정하게 만들고, 취침 직전의 강한 빛·카페인·고강도 운동은 개인 반응을 보며 조절하세요.", source: "NHLBI, 2022", url: "https://www.nhlbi.nih.gov/health/heart-healthy-living/sleep", tone: "plum" },
  { eyebrow: "FUEL", title: "운동 전후 식사", text: "에너지·단백질·수분 요구량은 체격, 목표, 운동량 및 질환 여부에 따라 달라집니다. 극단적 제한보다 일관된 식사와 개인화된 상담을 우선하세요.", source: "Academy of Nutrition and Dietetics", url: "https://www.eatright.org/fitness/sports-and-athletic-performance", tone: "sand" },
  { eyebrow: "HEAT", title: "사우나와 열 노출", text: "사우나는 운동을 대체하지 않습니다. 수분 상태를 점검하고, 어지러움·불편감이 생기면 즉시 나오며 임신·심혈관 질환·복용 약물이 있다면 의료진과 먼저 상담하세요.", source: "CDC Heat Health", url: "https://www.cdc.gov/heat-health/about/index.html", tone: "ink" },
];
