import type { BodyRegion, Exercise, ExerciseCategory } from "./fitnessData";

type Pattern = {
  id: string;
  name: string;
  englishName: string;
  category: ExerciseCategory;
  regions: BodyRegion[];
  focus: Exercise["focus"];
  equipment: string;
  minutes: string;
  description: string;
  cue: string;
  benefit: string;
  warning: string;
};

type Variant = {
  id: string;
  name: string;
  englishName: string;
  difficulty: Exercise["difficulty"];
  description: string;
  cue: string;
  benefit: string;
  setup: string;
  mistake: string;
  regression: string;
  progression: string;
};

const source = { label: "ACSM — Exercise Safety", url: "https://www.acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines" };

const patterns: Pattern[] = [
  { id: "road-run", name: "로드 런", englishName: "Road Run", category: "러닝", regions: ["하체", "둔근", "코어"], focus: "심폐", equipment: "러닝화·평지", minutes: "12–30분", description: "예측 가능한 평지에서 호흡과 보폭을 관찰하며 수행하는 지속 러닝입니다.", cue: "시선 정면과 짧은 보폭", benefit: "심폐 지구력", warning: "흉통·현기증·비정상적 숨참 또는 날카로운 통증이 있으면 즉시 걷기로 전환하거나 중단하세요." },
  { id: "track-run", name: "트랙 런", englishName: "Track Run", category: "러닝", regions: ["하체", "코어"], focus: "심폐", equipment: "러닝화·트랙", minutes: "10–25분", description: "평탄한 트랙에서 거리와 리듬을 일정하게 확인하는 러닝입니다.", cue: "커브에서 속도 낮추기", benefit: "페이스 인식", warning: "혼잡한 레인·젖은 트랙·발목 불안 또는 통증이 있으면 달리기를 피하세요." },
  { id: "treadmill-run", name: "트레드밀 런", englishName: "Treadmill Run", category: "러닝", regions: ["하체", "둔근", "코어"], focus: "심폐", equipment: "트레드밀·안전 클립", minutes: "10–25분", description: "안전 클립과 낮은 속도에서 시작해 벨트 위 보행·조깅을 제어하는 러닝입니다.", cue: "벨트 중앙·안전 클립", benefit: "페이스 제어", warning: "현기증·발판 미끄러짐·무릎 통증 또는 안전 클립 미사용 상태라면 즉시 중단하세요." },
  { id: "incline-walk-run", name: "인클라인 워크·런", englishName: "Incline Walk Run", category: "러닝", regions: ["하체", "둔근", "코어"], focus: "체력", equipment: "트레드밀·안전 클립", minutes: "10–20분", description: "완만한 경사와 평지를 번갈아 사용하며 강도를 조절하는 보행·러닝 변형입니다.", cue: "경사 한 단계씩", benefit: "둔근·심폐 적응", warning: "종아리·아킬레스·무릎 통증 또는 손잡이에 체중을 과도하게 싣는 자세가 있으면 경사를 낮추세요." },
  { id: "trail-hike-run", name: "트레일 하이크·런", englishName: "Trail Hike Run", category: "러닝", regions: ["하체", "둔근", "코어"], focus: "체력", equipment: "트레킹화·완만한 길", minutes: "15–35분", description: "완만하고 익숙한 길에서 하이킹과 짧은 조깅을 나누어 수행하는 야외 변형입니다.", cue: "노면을 먼저 확인", benefit: "야외 보행 제어", warning: "낙상 위험·날씨 악화·시야 불량 또는 혼자 구조 요청이 어려운 환경에서는 진행하지 마세요." },
  { id: "stadium-step", name: "스타디움 스텝", englishName: "Stadium Step", category: "러닝", regions: ["하체", "둔근", "코어"], focus: "체력", equipment: "낮고 마른 계단·난간", minutes: "8–20분", description: "낮은 계단에서 난간 가까이 보행 리듬과 하체 지구력을 확인하는 변형입니다.", cue: "발 전체·난간 가까이", benefit: "계단 보행 적응", warning: "젖은 계단·무릎 통증·균형 불안 또는 난간 부재 시에는 계단 운동을 피하세요." },
  { id: "recovery-walk", name: "리커버리 워크", englishName: "Recovery Walk", category: "러닝", regions: ["하체", "코어"], focus: "심폐", equipment: "편안한 신발·평지", minutes: "10–25분", description: "매우 편안한 보행으로 다음 세션 전 피로와 관절 반응을 관찰하는 회복 변형입니다.", cue: "대화 가능한 호흡", benefit: "능동 회복", warning: "통증·열감·어지러움 또는 비정상적 피로가 커지면 보행을 줄이거나 휴식을 선택하세요." },

  { id: "leg-press", name: "레그 프레스", englishName: "Leg Press", category: "헬스기구", regions: ["하체", "둔근", "코어"], focus: "근력", equipment: "레그 프레스 머신", minutes: "8–12회 · 2세트", description: "시트와 발판을 조절한 뒤 하체로 발판을 밀며 가동 범위를 제어하는 머신 운동입니다.", cue: "패드 조절·발 전체", benefit: "하체 근력", warning: "무릎·고관절·허리 통증, 안전장치 미확인 또는 반동이 있으면 중단하세요." },
  { id: "leg-curl", name: "레그 컬", englishName: "Leg Curl", category: "헬스기구", regions: ["하체", "둔근"], focus: "근력", equipment: "레그 컬 머신", minutes: "8–12회 · 2세트", description: "패드를 맞춘 뒤 무릎을 편안한 범위로 굽혀 다리 뒤쪽을 제어하는 머신 운동입니다.", cue: "골반 고정·반동 없이", benefit: "햄스트링 근력", warning: "무릎 뒤쪽 통증·경련·패드 압박 불편 또는 기구 조절 불량이 있으면 진행하지 마세요." },
  { id: "leg-extension", name: "레그 익스텐션", englishName: "Leg Extension", category: "헬스기구", regions: ["하체"], focus: "근력", equipment: "레그 익스텐션 머신", minutes: "8–12회 · 2세트", description: "시트와 발목 패드를 조절한 뒤 무릎을 편안한 범위에서 펴는 머신 운동입니다.", cue: "시트 깊이·느린 복귀", benefit: "대퇴사두근 근력", warning: "무릎 앞쪽 날카로운 통증·잠김 또는 패드 위치 불편이 있으면 범위를 줄이거나 중단하세요." },
  { id: "chest-press", name: "체스트 프레스", englishName: "Chest Press", category: "헬스기구", regions: ["가슴", "어깨", "팔"], focus: "근력", equipment: "체스트 프레스 머신", minutes: "8–12회 · 2세트", description: "시트와 손잡이를 조절한 뒤 편안한 범위로 앞을 미는 머신 운동입니다.", cue: "어깨 이완·손목 중립", benefit: "상체 밀기 근력", warning: "어깨·팔꿈치·손목 통증, 기구 흔들림 또는 손잡이 불안이 있으면 수행하지 마세요." },
  { id: "lat-pulldown", name: "랫 풀다운", englishName: "Lat Pulldown", category: "헬스기구", regions: ["등", "어깨", "팔"], focus: "근력", equipment: "랫 풀다운 머신", minutes: "8–12회 · 2세트", description: "무릎 패드와 손잡이를 맞춘 뒤 상체를 과도하게 젖히지 않고 아래로 당기는 머신 운동입니다.", cue: "목 이완·가슴 높게", benefit: "등 당기기 근력", warning: "어깨 통증·저림, 반동 또는 손잡이·패드 조절 불량이 있으면 장력을 낮추거나 중단하세요." },
  { id: "seated-row", name: "시티드 로우", englishName: "Seated Row", category: "헬스기구", regions: ["등", "어깨", "팔"], focus: "근력", equipment: "시티드 로우 머신", minutes: "8–12회 · 2세트", description: "시트와 가슴 패드를 조절한 뒤 손잡이를 몸통 가까이 당기는 머신 운동입니다.", cue: "견갑 가볍게 뒤로", benefit: "등 상부 근력", warning: "어깨 통증·목 긴장·허리 반동 또는 손잡이 불안이 있으면 진행하지 마세요." },
  { id: "shoulder-press", name: "숄더 프레스", englishName: "Shoulder Press", category: "헬스기구", regions: ["어깨", "팔", "가슴"], focus: "근력", equipment: "숄더 프레스 머신", minutes: "6–10회 · 2세트", description: "등받이와 시트를 조절한 뒤 통증 없는 범위로 위를 미는 머신 운동입니다.", cue: "갈비뼈 편안히·느린 복귀", benefit: "어깨 근력", warning: "어깨 끼임 통증·저림·허리 과신전 또는 시트 불량이 있으면 중단하세요." },
  { id: "pec-deck", name: "펙 덱", englishName: "Pec Deck", category: "헬스기구", regions: ["가슴", "어깨", "팔"], focus: "근력", equipment: "펙 덱 머신", minutes: "8–12회 · 2세트", description: "패드 높이를 맞춘 뒤 팔을 편안한 범위로 모아 가슴 앞쪽을 제어하는 머신 운동입니다.", cue: "어깨를 으쓱하지 않기", benefit: "가슴 근력", warning: "어깨 앞쪽 통증·저림 또는 팔꿈치·패드 불편이 있으면 가동 범위를 줄이세요." },
  { id: "ab-crunch", name: "앱 크런치", englishName: "Ab Crunch", category: "헬스기구", regions: ["코어"], focus: "근력", equipment: "앱 크런치 머신", minutes: "8–12회 · 2세트", description: "패드와 시트를 맞춘 뒤 몸통을 짧게 말아 복부 긴장을 제어하는 머신 운동입니다.", cue: "목 편안히·짧은 범위", benefit: "코어 근력", warning: "허리 통증·저림·숨 참기 또는 패드 압박 불편이 있으면 중단하세요." },
  { id: "back-extension", name: "백 익스텐션", englishName: "Back Extension", category: "헬스기구", regions: ["등", "둔근", "코어"], focus: "근력", equipment: "백 익스텐션 머신", minutes: "8–12회 · 2세트", description: "패드 높이를 맞춘 뒤 중립까지 몸통을 펴며 후면 사슬을 제어하는 머신 운동입니다.", cue: "중립까지만·반동 없이", benefit: "후면 사슬 근력", warning: "허리 통증·저림·과도한 젖힘 또는 패드 위치 불량이 있으면 중단하세요." },
  { id: "hip-abduction", name: "힙 어브덕션", englishName: "Hip Abduction", category: "헬스기구", regions: ["둔근", "하체", "코어"], focus: "근력", equipment: "힙 어브덕션 머신", minutes: "8–12회 · 2세트", description: "시트와 무릎 패드를 조절한 뒤 다리를 편안한 범위로 벌려 둔근을 제어하는 머신 운동입니다.", cue: "낮은 저항·골반 고정", benefit: "측면 둔근 근력", warning: "고관절·무릎 통증·사타구니 불편 또는 패드 압박이 있으면 범위를 줄이거나 중단하세요." },

  { id: "dumbbell-squat", name: "덤벨 스쿼트", englishName: "Dumbbell Squat", category: "프리웨이트", regions: ["하체", "둔근", "코어"], focus: "근력", equipment: "덤벨", minutes: "8–12회 · 2세트", description: "가벼운 덤벨을 몸 가까이 두고 발 전체로 바닥을 누르며 수행하는 하체 운동입니다.", cue: "발 전체·몸통 길게", benefit: "하체 근력", warning: "무릎·고관절·허리 통증, 발뒤꿈치 들림 또는 균형 상실이 있으면 중단하세요." },
  { id: "dumbbell-rdl", name: "덤벨 RDL", englishName: "Dumbbell Romanian Deadlift", category: "프리웨이트", regions: ["둔근", "하체", "코어"], focus: "근력", equipment: "덤벨", minutes: "8–12회 · 2세트", description: "덤벨을 몸 가까이에 두고 엉덩이를 뒤로 보내며 다리 뒤쪽을 제어하는 힌지 운동입니다.", cue: "등 길게·덤벨 가까이", benefit: "둔근·햄스트링 근력", warning: "허리 통증·저림·햄스트링 날카로운 통증 또는 등이 둥글어지면 즉시 중단하세요." },
  { id: "dumbbell-row", name: "덤벨 로우", englishName: "Dumbbell Row", category: "프리웨이트", regions: ["등", "어깨", "팔"], focus: "근력", equipment: "덤벨·벤치 선택", minutes: "좌우 8–12회 · 2세트", description: "한 손 지지 또는 벤치 지지에서 덤벨을 몸통 가까이 당기는 등 운동입니다.", cue: "목 이완·반동 없이", benefit: "등 당기기 근력", warning: "어깨·허리 통증·저림 또는 지지 벤치 불안이 있으면 중단하세요." },
  { id: "dumbbell-floor-press", name: "덤벨 플로어 프레스", englishName: "Dumbbell Floor Press", category: "프리웨이트", regions: ["가슴", "어깨", "팔"], focus: "근력", equipment: "덤벨·매트", minutes: "8–12회 · 2세트", description: "바닥에 누워 팔꿈치가 바닥에 닿는 편안한 범위에서 덤벨을 미는 상체 운동입니다.", cue: "손목 중립·바닥 제어", benefit: "상체 밀기 근력", warning: "어깨·팔꿈치·손목 통증 또는 덤벨을 안전하게 내려놓을 공간이 없으면 진행하지 마세요." },
  { id: "dumbbell-lateral-raise", name: "덤벨 레터럴 레이즈", englishName: "Dumbbell Lateral Raise", category: "프리웨이트", regions: ["어깨", "팔"], focus: "근력", equipment: "가벼운 덤벨", minutes: "8–12회 · 2세트", description: "가벼운 덤벨을 작은 범위로 옆으로 들어 어깨를 제어하는 단일 관절 운동입니다.", cue: "목 이완·가벼운 중량", benefit: "어깨 근력", warning: "어깨 끼임 통증·목 긴장·반동 또는 무거운 덤벨 사용이 있으면 중단하세요." },
  { id: "dumbbell-biceps-curl", name: "덤벨 바이셉스 컬", englishName: "Dumbbell Biceps Curl", category: "프리웨이트", regions: ["팔"], focus: "근력", equipment: "덤벨", minutes: "8–12회 · 2세트", description: "팔꿈치를 몸통 가까이 두고 가벼운 덤벨을 천천히 굽혀 올리는 팔 운동입니다.", cue: "팔꿈치 고정·느린 복귀", benefit: "팔 근력", warning: "팔꿈치·손목 통증·반동 또는 어깨 들림이 있으면 중량과 범위를 낮추세요." },
  { id: "dumbbell-farmer-carry", name: "덤벨 파머스 캐리", englishName: "Dumbbell Farmer Carry", category: "프리웨이트", regions: ["팔", "코어", "하체"], focus: "근력", equipment: "덤벨·평평한 경로", minutes: "10–30m · 2회", description: "양손에 가벼운 덤벨을 들고 짧고 평평한 경로를 천천히 걷는 운반 운동입니다.", cue: "짧은 보폭·어깨 이완", benefit: "그립·몸통 안정", warning: "그립 미끄러짐·허리 통증·균형 상실 또는 주변 충돌 위험이 있으면 중단하세요." },
  { id: "kettlebell-deadlift", name: "케틀벨 데드리프트", englishName: "Kettlebell Deadlift", category: "프리웨이트", regions: ["둔근", "하체", "코어"], focus: "근력", equipment: "케틀벨", minutes: "8–12회 · 2세트", description: "케틀벨을 발 중앙 가까이에 두고 엉덩이를 뒤로 보내며 들어 올리는 힌지 운동입니다.", cue: "발 전체·엉덩이 뒤로", benefit: "후면 사슬 근력", warning: "허리 통증·저림·등 말림 또는 케틀벨이 몸에서 멀어지면 즉시 중단하세요." },
  { id: "kettlebell-goblet-squat", name: "케틀벨 고블릿 스쿼트", englishName: "Kettlebell Goblet Squat", category: "프리웨이트", regions: ["하체", "둔근", "코어"], focus: "근력", equipment: "케틀벨", minutes: "8–12회 · 2세트", description: "케틀벨을 몸 앞에 가깝게 잡고 편안한 깊이로 앉았다 일어나는 하체 운동입니다.", cue: "가슴 편안히·발 전체", benefit: "하체·몸통 근력", warning: "무릎·고관절·허리 통증·발뒤꿈치 들림 또는 깊이를 억지로 늘리는 경우 중단하세요." },
  { id: "kettlebell-suitcase-carry", name: "케틀벨 수트케이스 캐리", englishName: "Kettlebell Suitcase Carry", category: "프리웨이트", regions: ["코어", "팔", "하체"], focus: "근력", equipment: "케틀벨·평평한 경로", minutes: "한쪽 10–20m · 2회", description: "한 손에 케틀벨을 들고 몸통 기울기를 줄이며 짧은 경로를 걷는 운반 운동입니다.", cue: "몸통 길게·짧은 보폭", benefit: "편측 몸통 안정", warning: "허리 통증·그립 미끄러짐·균형 상실 또는 주변 충돌 위험이 있으면 중단하세요." },

  { id: "bodyweight-squat", name: "맨몸 스쿼트", englishName: "Bodyweight Squat", category: "맨몸운동", regions: ["하체", "둔근", "코어"], focus: "근력", equipment: "장비 없음", minutes: "8–15회 · 2세트", description: "발 전체로 바닥을 누르며 고관절과 무릎을 함께 굽혔다 펴는 기본 하체 운동입니다.", cue: "무릎·발끝 같은 방향", benefit: "하체 근력", warning: "무릎·고관절·허리 통증 또는 균형 상실이 있으면 의자·벽 지지 변형으로 낮추세요." },
  { id: "bodyweight-pushup", name: "맨몸 푸시업", englishName: "Bodyweight Push-Up", category: "맨몸운동", regions: ["가슴", "어깨", "팔", "코어"], focus: "근력", equipment: "매트 선택", minutes: "5–12회 · 2세트", description: "몸통을 긴 선으로 유지하며 바닥 또는 지지면을 밀어 올리는 상체 운동입니다.", cue: "몸통 길게·팔꿈치 편안히", benefit: "상체 밀기 근력", warning: "손목·어깨·팔꿈치 통증·허리 처짐 또는 목 긴장이 있으면 벽·벤치 변형으로 낮추세요." },
  { id: "bodyweight-lunge", name: "맨몸 런지", englishName: "Bodyweight Lunge", category: "맨몸운동", regions: ["하체", "둔근", "코어"], focus: "근력", equipment: "장비 없음", minutes: "좌우 6–10회 · 2세트", description: "짧은 보폭에서 앞발 전체로 바닥을 누르며 하체를 편안한 범위로 굽히는 운동입니다.", cue: "짧은 보폭·골반 수평", benefit: "편측 하체 제어", warning: "무릎·고관절 통증·균형 상실 또는 미끄러운 바닥이 있으면 지지 런지로 낮추세요." },
  { id: "glute-bridge", name: "글루트 브리지", englishName: "Glute Bridge", category: "맨몸운동", regions: ["둔근", "하체", "코어"], focus: "근력", equipment: "매트", minutes: "8–15회 · 2세트", description: "누운 자세에서 발로 바닥을 누르고 엉덩이를 편안한 높이까지 드는 후면 사슬 운동입니다.", cue: "갈비뼈 편안히·둔근 조임", benefit: "둔근 근력", warning: "허리·고관절 통증·경련 또는 목 긴장이 있으면 범위를 줄이거나 중단하세요." },
  { id: "wall-sit", name: "월 싯", englishName: "Wall Sit", category: "맨몸운동", regions: ["하체", "둔근", "코어"], focus: "근력", equipment: "단단한 벽", minutes: "10–30초 · 2회", description: "벽을 등으로 지지한 낮지 않은 스쿼트 자세에서 하체 긴장을 유지하는 등척성 운동입니다.", cue: "얕은 각도·발 전체", benefit: "하체 지구력", warning: "무릎·고관절·허리 통증·어지러움 또는 발 미끄러짐이 있으면 즉시 일어나세요." },
  { id: "good-morning", name: "맨몸 굿모닝", englishName: "Bodyweight Good Morning", category: "맨몸운동", regions: ["둔근", "하체", "코어"], focus: "협응", equipment: "장비 없음", minutes: "8–12회 · 2세트", description: "무릎을 부드럽게 둔 채 엉덩이를 뒤로 보내며 힌지 감각을 익히는 맨몸 운동입니다.", cue: "등 길게·엉덩이 뒤로", benefit: "힙 힌지 인식", warning: "허리·햄스트링 통증·저림 또는 등이 둥글어지면 범위를 줄이거나 중단하세요." },
  { id: "forearm-plank", name: "포어암 플랭크", englishName: "Forearm Plank", category: "맨몸운동", regions: ["코어", "어깨", "둔근"], focus: "근력", equipment: "매트", minutes: "10–30초 · 2회", description: "팔꿈치를 어깨 아래에 두고 몸통을 긴 선으로 유지하는 코어 등척성 운동입니다.", cue: "갈비뼈·골반 정렬", benefit: "코어 안정", warning: "어깨·허리 통증·숨 참기 또는 허리 처짐이 있으면 무릎 지지 변형으로 낮추세요." },
  { id: "dead-bug", name: "데드 버그", englishName: "Dead Bug", category: "맨몸운동", regions: ["코어", "하체"], focus: "협응", equipment: "매트", minutes: "좌우 5–10회 · 2세트", description: "누운 자세에서 팔·다리를 천천히 교대하며 골반과 몸통을 제어하는 코어 운동입니다.", cue: "허리 편안히·느린 교대", benefit: "코어 협응", warning: "허리·고관절 통증·저림 또는 허리가 과도하게 뜨면 범위를 줄이거나 중단하세요." },
  { id: "bear-plank", name: "베어 플랭크", englishName: "Bear Plank", category: "맨몸운동", regions: ["코어", "어깨", "팔", "하체"], focus: "협응", equipment: "매트", minutes: "10–25초 · 2회", description: "네발 자세에서 무릎을 낮게 띄우고 손·발로 바닥을 누르며 전신을 제어하는 운동입니다.", cue: "무릎 낮게·골반 고정", benefit: "전신 협응", warning: "손목·어깨·무릎·허리 통증 또는 골반 처짐이 있으면 네발 자세로 낮추세요." },
  { id: "side-plank", name: "사이드 플랭크", englishName: "Side Plank", category: "맨몸운동", regions: ["코어", "어깨", "둔근"], focus: "근력", equipment: "매트", minutes: "한쪽 10–25초 · 2회", description: "옆으로 누운 지지 자세에서 몸통 옆면을 편안한 범위로 유지하는 코어 운동입니다.", cue: "어깨 아래 팔꿈치", benefit: "측면 코어 안정", warning: "어깨·허리 통증·저림 또는 골반 처짐이 있으면 무릎 지지 변형으로 낮추세요." },
  { id: "crab-walk", name: "크랩 워크", englishName: "Crab Walk", category: "맨몸운동", regions: ["코어", "둔근", "어깨", "팔"], focus: "협응", equipment: "매트", minutes: "3–8걸음 · 2회", description: "무릎 굽힌 리버스 테이블탑에서 손과 발을 짧게 이동하는 전신 협응 운동입니다.", cue: "작은 걸음·손목 확인", benefit: "후면 사슬 협응", warning: "손목·어깨·허리 통증·손 미끄러짐 또는 좁은 공간에서는 진행하지 마세요." },
  { id: "single-leg-balance", name: "싱글 레그 밸런스", englishName: "Single-Leg Balance", category: "맨몸운동", regions: ["하체", "둔근", "코어"], focus: "균형", equipment: "벽 또는 안정된 의자", minutes: "한쪽 10–30초 · 2회", description: "지지대 가까이에서 한 발로 서며 발목·고관절·몸통의 균형을 연습합니다.", cue: "시선 정면·지지대 가까이", benefit: "균형 능력", warning: "어지러움·발목 통증·균형 불안 또는 미끄러운 바닥이 있으면 양발 체중 이동으로 낮추세요." },
  { id: "inchworm", name: "인치웜", englishName: "Inchworm", category: "맨몸운동", regions: ["코어", "어깨", "하체"], focus: "협응", equipment: "매트", minutes: "4–8회 · 2세트", description: "서서 손을 바닥으로 옮긴 뒤 짧은 플랭크까지 걸어가고 다시 돌아오는 전신 전환 운동입니다.", cue: "무릎 부드럽게·작은 걸음", benefit: "전신 협응", warning: "손목·어깨·허리·햄스트링 통증, 어지러움 또는 손 미끄러짐이 있으면 범위를 줄이세요." },

  { id: "cat-cow", name: "캣 카우", englishName: "Cat Cow", category: "모빌리티", regions: ["등", "코어", "어깨"], focus: "가동성", equipment: "매트", minutes: "6–12회 · 2세트", description: "네발 자세에서 호흡에 맞춰 척추를 부드럽게 굽히고 펴는 가동성 운동입니다.", cue: "호흡 따라 작은 범위", benefit: "척추 가동성", warning: "외상 뒤 통증·저림·방사통 또는 목 통증이 있으면 자가 운동보다 평가를 우선하세요." },
  { id: "ninety-ninety-switch", name: "90·90 스위치", englishName: "90-90 Switch", category: "모빌리티", regions: ["하체", "둔근", "코어"], focus: "가동성", equipment: "매트", minutes: "좌우 5–10회 · 2세트", description: "앉은 자세에서 양무릎 방향을 천천히 바꾸며 고관절의 편안한 회전을 연습합니다.", cue: "손 지지·작은 전환", benefit: "고관절 가동성", warning: "고관절·무릎·허리 통증 또는 저림이 있으면 손 지지를 늘리거나 범위를 줄이세요." },
  { id: "ankle-rock", name: "앵클 록", englishName: "Ankle Rock", category: "모빌리티", regions: ["하체"], focus: "가동성", equipment: "벽 또는 매트", minutes: "좌우 6–12회 · 2세트", description: "벽 또는 하프 닐링에서 발 전체를 바닥에 둔 채 무릎을 작게 앞뒤로 옮기는 발목 운동입니다.", cue: "발뒤꿈치 유지", benefit: "발목 가동성", warning: "발목·무릎 통증·붓기·열감 또는 발뒤꿈치 들림이 있으면 중단하세요." },
  { id: "wall-slide", name: "월 슬라이드", englishName: "Wall Slide", category: "모빌리티", regions: ["어깨", "등", "코어"], focus: "가동성", equipment: "단단한 벽", minutes: "6–12회 · 2세트", description: "벽을 가볍게 지지하며 팔을 통증 없는 범위로 위아래 움직이는 어깨·등 가동성 운동입니다.", cue: "목 이완·작은 범위", benefit: "어깨 가동성", warning: "어깨 끼임·저림·날카로운 통증 또는 팔 힘 빠짐이 있으면 중단하세요." },
  { id: "open-book", name: "오픈 북", englishName: "Open Book", category: "모빌리티", regions: ["등", "어깨", "코어"], focus: "가동성", equipment: "매트", minutes: "좌우 5–10회 · 2세트", description: "옆으로 누워 윗팔을 천천히 열며 흉추와 어깨의 편안한 회전을 탐색하는 운동입니다.", cue: "골반 고정·호흡 길게", benefit: "흉추 회전", warning: "허리·어깨 통증·어지러움·저림이 있으면 회전 범위를 줄이거나 중단하세요." },
  { id: "tandem-walk", name: "탠덤 워크", englishName: "Tandem Walk", category: "균형·협응", regions: ["하체", "코어"], focus: "균형", equipment: "평평한 바닥·벽 가까이", minutes: "6–12걸음 · 2회", description: "발끝과 뒤꿈치를 가깝게 이어 천천히 걸으며 보행 균형을 연습합니다.", cue: "벽 가까이·느린 걸음", benefit: "보행 균형", warning: "어지러움·발목 통증·균형 불안 또는 미끄러운 바닥이 있으면 일반 보행으로 낮추세요." },
  { id: "clock-reach", name: "클락 리치", englishName: "Clock Reach", category: "균형·협응", regions: ["하체", "둔근", "코어"], focus: "균형", equipment: "벽 또는 안정된 의자", minutes: "좌우 4–8회 · 2세트", description: "한 발 지지에서 반대발을 앞·옆·뒤로 낮게 탭하며 체중 이동을 제어하는 운동입니다.", cue: "작은 탭·골반 수평", benefit: "방향 균형", warning: "무릎·발목·고관절 통증·어지러움 또는 균형 상실이 있으면 양발 체중 이동으로 낮추세요." },
  { id: "chair-yoga-flow", name: "체어 요가 플로우", englishName: "Chair Yoga Flow", category: "요가·필라테스", regions: ["등", "어깨", "코어", "하체"], focus: "가동성", equipment: "벽에 고정한 튼튼한 의자", minutes: "3–8분", description: "앉은 자세에서 호흡·팔 리치·가벼운 몸통 움직임을 연결하는 저강도 흐름입니다.", cue: "발 전체·편안한 호흡", benefit: "앉은 가동성", warning: "어지러움·의자 흔들림·어깨 통증 또는 발이 바닥에 닿지 않으면 수행하지 마세요." },
  { id: "standing-yoga-flow", name: "스탠딩 요가 플로우", englishName: "Standing Yoga Flow", category: "요가·필라테스", regions: ["하체", "코어", "어깨"], focus: "균형", equipment: "미끄럽지 않은 바닥·벽 선택", minutes: "3–8분", description: "서서 호흡과 가벼운 리치·체중 이동을 연결하는 균형 중심 요가 흐름입니다.", cue: "벽 가까이·작은 범위", benefit: "서기 균형", warning: "어지러움·발목 통증·균형 불안 또는 미끄러운 바닥이 있으면 의자 흐름으로 낮추세요." },

  { id: "quiet-step-touch", name: "콰이어트 스텝 터치", englishName: "Quiet Step Touch", category: "파워·민첩성", regions: ["하체", "둔근", "코어"], focus: "협응", equipment: "장비 없음", minutes: "20–40초 · 2회", description: "점프 없이 옆으로 작게 이동하며 조용한 발 디딤과 방향 전환을 연습하는 저충격 드릴입니다.", cue: "조용한 착지·작은 이동", benefit: "저충격 협응", warning: "무릎·발목 통증·미끄러운 바닥·공간 부족 또는 균형 상실이 있으면 중단하세요." },
  { id: "snap-down", name: "스냅 다운", englishName: "Snap Down", category: "파워·민첩성", regions: ["하체", "둔근", "코어"], focus: "파워", equipment: "미끄럽지 않은 바닥", minutes: "4–8회 · 2세트", description: "발을 작게 떼거나 올린 뒤 조용한 반스쿼트로 멈추며 착지 제어를 연습하는 드릴입니다.", cue: "낮은 충격·멈춤", benefit: "착지 제어", warning: "무릎·발목·허리 통증, 착지 불안 또는 피로로 제어가 어려우면 점프 없는 스쿼트로 낮추세요." },
  { id: "lateral-bound", name: "레터럴 바운드", englishName: "Lateral Bound", category: "파워·민첩성", regions: ["하체", "둔근", "코어"], focus: "파워", equipment: "미끄럽지 않은 넓은 바닥", minutes: "좌우 3–6회 · 2세트", description: "작은 옆 이동과 정지로 방향 전환 전 하체 제어를 연습하는 민첩성 드릴입니다.", cue: "작은 거리·착지 멈춤", benefit: "측면 제어", warning: "무릎·발목·고관절 통증·균형 상실 또는 공간 부족이 있으면 옆걸음으로 낮추세요." },
  { id: "quick-feet-march", name: "퀵 피트 마치", englishName: "Quick Feet March", category: "파워·민첩성", regions: ["하체", "코어"], focus: "협응", equipment: "장비 없음", minutes: "15–30초 · 2회", description: "제자리에서 낮은 무릎 높이로 발을 빠르게 교대하며 리듬을 연습하는 저충격 드릴입니다.", cue: "낮은 무릎·조용한 발", benefit: "발 리듬", warning: "어지러움·무릎·발목 통증 또는 호흡 과부하가 있으면 속도를 낮추거나 중단하세요." },
];

const variations: Variant[] = [
  { id: "control", name: "컨트롤", englishName: "Controlled", difficulty: "입문", description: "가동 범위를 줄이고 움직임 품질을 우선하는 제어 변형입니다.", cue: "천천히 시작·끝내기", benefit: "움직임 제어", setup: "가장 쉬운 범위에서 2회 리허설", mistake: "속도를 먼저 높이기", regression: "범위와 반복을 절반으로 낮추기", progression: "품질 유지 뒤 반복 1–2회 추가" },
  { id: "tempo", name: "템포", englishName: "Tempo", difficulty: "중급", description: "내리고 돌아오는 속도를 의도적으로 늦춰 정렬을 관찰하는 템포 변형입니다.", cue: "내리는 구간 3초", benefit: "템포 인식", setup: "호흡이 편한 낮은 부하·속도 선택", mistake: "느린 구간에서 숨 참기", regression: "2초 템포와 짧은 범위", progression: "한 세트에만 3초 템포 적용" },
  { id: "pause", name: "포즈", englishName: "Pause", difficulty: "중급", description: "편안한 중간 지점에서 짧게 멈추며 자세를 확인하는 포즈 변형입니다.", cue: "1초 정지·호흡 유지", benefit: "정렬 인식", setup: "통증 없는 멈춤 지점을 먼저 찾기", mistake: "불안정한 끝 범위에서 오래 버티기", regression: "멈춤 없이 기본 변형", progression: "정지 시간을 1초만 늘리기" },
  { id: "isometric", name: "아이소메트릭", englishName: "Isometric", difficulty: "입문", description: "통증 없는 짧은 범위에서 힘을 유지하며 안정성을 연습하는 등척성 변형입니다.", cue: "5초 미만·숨 쉬기", benefit: "안정성", setup: "낮은 강도에서 3초 유지 리허설", mistake: "숨을 참고 과하게 버티기", regression: "유지 시간을 2초로 줄이기", progression: "편안한 날 1–2초만 추가" },
  { id: "eccentric", name: "슬로우 네거티브", englishName: "Slow Eccentric", difficulty: "중급", description: "내리거나 복귀하는 구간을 느리게 제어해 기술을 관찰하는 변형입니다.", cue: "느린 복귀·반동 금지", benefit: "감속 제어", setup: "반복 수를 기본보다 줄여 시작", mistake: "피로 후에도 느린 복귀 고집", regression: "정상 속도·짧은 범위", progression: "한 세트에만 느린 복귀 적용" },
  { id: "partial", name: "파셜 레인지", englishName: "Partial Range", difficulty: "입문", description: "불편 없는 짧은 가동 범위에서 동작 경로를 익히는 파셜 레인지 변형입니다.", cue: "편안한 범위만", benefit: "가동 범위 인식", setup: "가장 편한 시작·종료 지점 확인", mistake: "통증을 넘는 범위를 강요", regression: "정지 자세 또는 더 짧은 범위", progression: "다음 날 편안할 때 범위 조금 확대" },
  { id: "alternating", name: "얼터네이팅", englishName: "Alternating", difficulty: "입문", description: "좌우 또는 빠름·느림을 번갈아 수행해 리듬과 좌우 차이를 관찰하는 변형입니다.", cue: "한 번에 한쪽·천천히 교대", benefit: "좌우 인식", setup: "느린 교대 2회로 리듬 확인", mistake: "속도 경쟁으로 정렬 잃기", regression: "한쪽을 모두 마친 뒤 교대", progression: "같은 품질에서 교대 횟수 소폭 증가" },
  { id: "one-half-rep", name: "1.5 레프", englishName: "One-and-a-Half Rep", difficulty: "상급", description: "짧은 추가 범위를 한 번 넣어 동작 경로의 제어를 연습하는 1.5회 변형입니다.", cue: "추가 범위는 작게", benefit: "반복 제어", setup: "기본 동작을 먼저 안정적으로 수행", mistake: "깊이와 속도를 동시에 올리기", regression: "기본 반복으로 되돌리기", progression: "한 세트의 절반만 1.5회로 수행" },
  { id: "interval", name: "인터벌", englishName: "Interval", difficulty: "중급", description: "짧은 작업 구간과 충분한 회복 구간을 교대하며 강도를 조절하는 변형입니다.", cue: "짧은 구간·완전 회복", benefit: "강도 조절", setup: "작업보다 긴 회복부터 설정", mistake: "회복을 건너뛰기", regression: "작업 시간을 절반으로 낮추기", progression: "한 번에 한 구간만 추가" },
  { id: "reset", name: "폼 리셋", englishName: "Form Reset", difficulty: "입문", description: "매 반복 또는 짧은 구간 뒤 중립 자세를 다시 확인하며 기술을 재설정하는 변형입니다.", cue: "매번 중립으로 돌아오기", benefit: "기술 일관성", setup: "낮은 강도에서 리셋 동작 연습", mistake: "피로한 자세로 연속 반복", regression: "반복을 줄이고 휴식 늘리기", progression: "같은 리셋을 유지한 채 반복 소폭 증가" },
];

export const expandedExercisesPart13: Exercise[] = patterns.flatMap((pattern) => variations.map((variant) => ({
  id: `atlas13-${pattern.id}-${variant.id}`,
  name: `${pattern.name} ${variant.name}`,
  englishName: `${pattern.englishName} ${variant.englishName}`,
  category: pattern.category,
  regions: pattern.regions,
  focus: pattern.focus,
  difficulty: variant.difficulty,
  equipment: pattern.equipment,
  minutes: pattern.minutes,
  description: `${pattern.description} ${variant.description}`,
  cues: [pattern.cue, variant.cue, "통증 없는 범위·호흡 유지"],
  benefits: [pattern.benefit, variant.benefit, "자기 조절 능력"],
  warning: `${pattern.warning} ${variant.mistake}로 강도를 올리지 마세요.`,
  reference: source,
})));

export const expandedExerciseDetailsPart13 = Object.fromEntries(expandedExercisesPart13.map((exercise) => {
  const variant = variations.find((item) => exercise.id.endsWith(`-${item.id}`))!;
  return [exercise.id, {
    setup: [`${exercise.name} 전 장비·바닥·주변 공간을 확인`, variant.setup, "통증 없는 가장 쉬운 범위에서 낮은 강도로 리허설"],
    finish: `${exercise.name}을 마친 뒤 호흡을 낮추고 관절·균형·통증 반응을 확인합니다.`,
    commonMistakes: [variant.mistake, "정렬이 무너진 상태에서 반복 지속", "통증·저림·어지러움 신호 무시"],
    regressions: [variant.regression, "부하·시간 또는 가동 범위 낮추기", "안정된 지지면·쉬운 기본 변형으로 전환"],
    progressions: [variant.progression, "한 번에 하나의 변수만 조절", "다음 날 반응이 편안할 때만 다음 단계 시도"],
  }];
}));
