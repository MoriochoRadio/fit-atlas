import type { BodyRegion } from "./catalogTypes";

export const recoveryGuides: Record<
  BodyRegion,
  { title: string; intro: string; steps: string[]; caution: string }
> = {
  가슴: {
    title: "가슴·앞어깨의 긴장 완화",
    intro:
      "무리한 밀기 운동 뒤의 뻐근함에는 강도를 줄이고 통증 없는 범위의 움직임부터 재개하세요.",
    steps: [
      "문틀에 손을 가볍게 대고 가슴 앞쪽을 부드럽게 열기",
      "폼롤러를 등 상부에 두고 흉추를 편안하게 펴기",
      "마사지건은 뼈·관절·목 앞쪽을 피하고 낮은 강도로 짧게 사용",
    ],
    caution:
      "저림, 흉통, 숨참, 외상 후 변형은 자가 관리보다 즉시 평가가 우선입니다.",
  },
  등: {
    title: "등·견갑 주변의 회복",
    intro:
      "오래 앉은 뒤의 뻣뻣함은 가벼운 걷기와 견갑의 부드러운 움직임으로 시작합니다.",
    steps: [
      "네발 자세에서 등 전체를 천천히 둥글고 길게 만들기",
      "벽에 등을 대고 팔을 천천히 위로 미끄러뜨리기",
      "마사지건은 척추뼈 위를 피하고 주변 근육에만 짧게 사용",
    ],
    caution:
      "팔까지 내려오는 저림, 감각 이상, 진행성 약화는 전문 평가가 필요합니다.",
  },
  어깨: {
    title: "어깨 가동성·부하 관리",
    intro:
      "통증이 있는 어깨는 강한 스트레칭보다 자극을 낮추고 편안한 범위에서 움직이는 것이 먼저입니다.",
    steps: [
      "팔꿈치를 옆구리에 붙이고 가볍게 바깥 회전 연습",
      "견갑을 뒤·아래로 부드럽게 정렬",
      "폼롤러는 광배·등 상부 주변을 짧고 편안하게 사용",
    ],
    caution:
      "갑작스러운 힘 빠짐, 외상 뒤의 심한 통증, 밤에 깨는 통증은 진료 상담이 필요합니다.",
  },
  팔: {
    title: "팔·전완의 부담 낮추기",
    intro:
      "그립 운동량이 많았다면 반복 동작과 강도를 잠시 낮추고 손목 중립을 되찾습니다.",
    steps: [
      "손목을 편안한 범위에서 천천히 굽혔다 펴기",
      "팔꿈치를 고정한 채 가벼운 회전 움직임",
      "마사지건은 팔 근육 부위에 낮은 강도로 짧게 사용",
    ],
    caution:
      "감각 저하나 손의 뚜렷한 힘 약화가 있으면 운동을 중단하고 평가를 받으세요.",
  },
  코어: {
    title: "몸통의 편안한 재가동",
    intro:
      "허리 불편은 통증을 밀어붙이는 운동 대신 걷기와 작은 범위의 조절 운동부터 시작하세요.",
    steps: [
      "천천히 복식 호흡하며 골반·갈비뼈 긴장 완화",
      "누운 자세에서 한쪽 발만 가볍게 들었다 내리기",
      "폼롤러는 척추 자체가 아닌 둔근·등 주변 근육에 사용",
    ],
    caution:
      "대소변 변화, 회음부 감각 변화, 심한 방사통은 긴급 평가가 필요할 수 있습니다.",
  },
  둔근: {
    title: "둔근·고관절 주변 회복",
    intro:
      "둔근의 뻐근함에는 가벼운 보행과 고관절의 편안한 가동 범위 회복을 우선합니다.",
    steps: [
      "누워서 한쪽 무릎을 가슴 쪽으로 가볍게 당기기",
      "엉덩이를 조여 브리지의 짧은 범위부터 연습",
      "폼롤러는 둔근에 체중을 과하게 싣지 않고 천천히 이동",
    ],
    caution:
      "다리 저림·통증이 점점 아래로 퍼지거나 근력 저하가 있으면 상담하세요.",
  },
  하체: {
    title: "하체의 점진적 회복",
    intro:
      "운동 뒤 불편감에는 무리한 압박보다 저강도 움직임과 점진적 부하 복귀가 기본입니다.",
    steps: [
      "발목을 천천히 앞뒤로 움직여 순환 돕기",
      "벽을 짚고 종아리·엉덩이를 편안한 범위에서 늘리기",
      "폼롤러는 근육 부위에만 짧게 사용하고 관절·정맥류 부위는 피하기",
    ],
    caution:
      "붓기·열감·외상·체중 부하 불가·무릎 잠김이 있으면 자가 운동을 멈추고 평가를 받으세요.",
  },
};

export const wellnessCards = [
  {
    eyebrow: "RECOVER",
    title: "수면 리듬",
    text: "성인 수면 권고는 7–9시간입니다. 기상·취침 시간을 일정하게 만들고, 취침 직전의 강한 빛·카페인·고강도 운동은 개인 반응을 보며 조절하세요.",
    source: "NHLBI, 2022",
    url: "https://www.nhlbi.nih.gov/health/heart-healthy-living/sleep",
    tone: "plum",
  },
  {
    eyebrow: "FUEL",
    title: "운동 전후 식사",
    text: "에너지·단백질·수분 요구량은 체격, 목표, 운동량 및 질환 여부에 따라 달라집니다. 극단적 제한보다 일관된 식사와 개인화된 상담을 우선하세요.",
    source: "Academy of Nutrition and Dietetics",
    url: "https://www.eatright.org/fitness/sports-and-athletic-performance",
    tone: "sand",
  },
  {
    eyebrow: "HEAT",
    title: "사우나와 열 노출",
    text: "사우나는 운동을 대체하지 않습니다. 수분 상태를 점검하고, 어지러움·불편감이 생기면 즉시 나오며 임신·심혈관 질환·복용 약물이 있다면 의료진과 먼저 상담하세요.",
    source: "CDC Heat Health",
    url: "https://www.cdc.gov/heat-health/about/index.html",
    tone: "ink",
  },
  {
    eyebrow: "SLEEP",
    title: "수면 환경과 습관",
    text: "연령에 따른 권장 수면 시간은 다릅니다. 규칙적인 취침·기상 시간, 조용하고 시원한 침실, 취침 전 전자기기·카페인·큰 식사 조절은 일반적인 수면 위생 전략입니다.",
    source: "CDC About Sleep",
    url: "https://www.cdc.gov/sleep/about/index.html",
    tone: "plum",
  },
  {
    eyebrow: "HYDRATE",
    title: "수분과 더운 날 활동",
    text: "더운 환경에서는 수분 보충, 휴식, 시원한 장소 확보, 어지러움·두통·메스꺼움·비정상적 숨참 같은 과열 증상 인지가 중요합니다.",
    source: "CDC Heat Health",
    url: "https://www.cdc.gov/heat-health/about/index.html",
    tone: "sand",
  },
  {
    eyebrow: "RECOVER",
    title: "능동적 회복",
    text: "강한 세션 다음 날에는 편안한 걷기, 낮은 강도의 사이클, 통증 없는 가동성처럼 회복을 방해하지 않는 가벼운 움직임을 선택하고 강도·수면·피로 반응을 관찰하세요.",
    source: "CDC Adult Activity",
    url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
    tone: "ink",
  },
  {
    eyebrow: "TOOLS",
    title: "마사지건의 현실적 역할",
    text: "마사지건은 단기 가동 범위·유연성·주관적 회복 보조에 활용할 수 있지만, 근력·균형·폭발력 향상 도구로 과장하지 않습니다. 뼈·관절·목 앞쪽·감각 이상 부위는 피하세요.",
    source: "Ferreira et al., 2023 review",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10532323/",
    tone: "plum",
  },
  {
    eyebrow: "BALANCE",
    title: "균형과 일상 기능",
    text: "특히 65세 이상은 유산소·근력과 함께 균형 활동을 포함하는 것이 권고됩니다. 한 발 서기, 의자 앉았다 일어나기, 탠덤 워킹은 지지대 가까이에서 시작하세요.",
    source: "CDC Older Adult Activity",
    url: "https://www.cdc.gov/physical-activity-basics/guidelines/older-adults.html",
    tone: "sand",
  },
  {
    eyebrow: "FUEL",
    title: "일상 식사 리듬",
    text: "운동 전후 한 번의 식사보다 일관된 식사 리듬과 충분한 에너지·수분 섭취가 중요합니다. 속 불편·에너지 저하처럼 반복되는 반응은 기록해 훈련 시간과 식사 간격을 함께 조절하세요.",
    source: "Academy of Nutrition and Dietetics",
    url: "https://www.eatright.org/fitness/sports-and-athletic-performance",
    tone: "ink",
  },
  {
    eyebrow: "HEAT",
    title: "더운 날 세션 계획",
    text: "더운 날의 활동은 더 서늘한 시간대, 물, 그늘·실내 대안, 낮아진 페이스를 먼저 계획합니다. 약함·현기증이 느껴지면 활동을 멈추고 시원한 곳으로 이동하세요.",
    source: "CDC Heat and Athletes",
    url: "https://www.cdc.gov/heat-health/risk-factors/heat-and-athletes.html",
    tone: "plum",
  },
  {
    eyebrow: "SLEEP",
    title: "카페인·운동·수면 일지",
    text: "카페인, 운동 시간, 취침·기상 시각이 수면에 미치는 반응은 개인마다 다를 수 있습니다. 정답을 고정하기보다 반복되는 패턴을 짧게 기록해 다음 세션 강도를 조절하세요.",
    source: "CDC About Sleep",
    url: "https://www.cdc.gov/sleep/about/index.html",
    tone: "sand",
  },
];
