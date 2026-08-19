export type DetailSource = {
  id: string;
  name: string;
  category: string;
  equipment: string | null;
  primaryMuscles: string[];
  level: string | null;
};

export type DetailedProfile = {
  description: string;
  cues: string[];
  benefits: string[];
  warning: string;
  setup: string[];
  finish: string;
  commonMistakes: string[];
  regressions: string[];
  progressions: string[];
};

type ProfileInput = {
  name: string;
  equipment: string;
  source: DetailSource;
};

const muscleNames: Record<string, string> = {
  abdominals: "복부", abductors: "엉덩이 바깥쪽", adductors: "허벅지 안쪽", biceps: "이두근", calves: "종아리", chest: "가슴", forearms: "전완", glutes: "둔근", hamstrings: "햄스트링", lats: "광배근", "lower back": "허리 주변", "middle back": "등 중앙", quadriceps: "대퇴사두근", shoulders: "어깨", traps: "승모근", triceps: "삼두근", "upper back": "등 위쪽",
};

const includes = (source: DetailSource, pattern: RegExp) => pattern.test(source.name);
const muscles = (source: DetailSource) => source.primaryMuscles.map((muscle) => muscleNames[muscle.toLowerCase()] ?? muscle).slice(0, 2).join("·") || "주동 근육";

function position(source: DetailSource) {
  if (includes(source, /seated|sitting/i)) return "시티드 자세에서 골반을 등받이 또는 벤치에 안정시킵니다";
  if (includes(source, /lying|supine|floor|flat bench/i)) return "바닥 또는 벤치에 등을 안정적으로 댄 뒤 갈비뼈를 과하게 들지 않습니다";
  if (includes(source, /incline/i)) return "인클라인 지지면을 고정하고 머리·등·골반이 흔들리지 않게 둡니다";
  if (includes(source, /decline/i)) return "디클라인 지지대와 발 고정을 먼저 확인하고 천천히 자세를 잡습니다";
  if (includes(source, /kneeling/i)) return "무릎 아래에 매트를 두고 골반을 중립 가까이 맞춥니다";
  if (includes(source, /one arm|single arm|one-arm/i)) return "작동하지 않는 쪽의 손·발 또는 벤치 지지로 몸통 회전을 줄입니다";
  if (includes(source, /single leg|one leg|one-leg/i)) return "지지 발 전체를 바닥에 두고 벽이나 벤치 가까이에서 균형을 준비합니다";
  return "발 또는 지지면을 단단히 고정하고 몸통을 길게 세웁니다";
}

function equipmentSetup(source: DetailSource, equipment: string) {
  if (source.equipment === "barbell") return "바벨의 좌우 중량·안전핀·내려놓을 위치를 확인하고 손 간격을 고정합니다";
  if (source.equipment === "dumbbell" || source.equipment === "kettlebells") return "도구를 몸 가까이에서 안정적으로 잡고 양쪽 중량이 같은지 확인합니다";
  if (source.equipment === "cable") return "케이블 높이·핀·손잡이 잠금과 당김 방향을 가벼운 저항으로 시험합니다";
  if (source.equipment === "machine") return "시트·패드·관절 축·핀을 몸에 맞추고 빈 동작으로 범위를 확인합니다";
  if (source.equipment === "bands") return "밴드의 갈라짐과 고정점을 확인하고 당김 선에 사람이 없는지 살핍니다";
  if (source.equipment === "exercise ball") return "짐볼이 미끄러지지 않는 바닥에서 움직일 공간과 가까운 지지대를 확보합니다";
  if (source.equipment === "medicine ball") return "공을 놓을 공간과 튀어 나갈 방향을 비우고 손가락을 펴서 받습니다";
  if (source.equipment === "foam roll") return "폼롤러가 미끄러지지 않게 놓고 관절이 아닌 주변 연부조직에 닿는지 확인합니다";
  return `${equipment}·바닥·주변 공간을 확인하고 가장 쉬운 범위로 한 번 리허설합니다`;
}

function modifiers(source: DetailSource) {
  const values: string[] = [];
  if (includes(source, /reverse/i)) values.push("반대 방향으로 움직일 때도 어깨·손목 정렬을 먼저 확인합니다");
  if (includes(source, /wide/i)) values.push("넓은 그립에서는 팔꿈치와 어깨가 불편하지 않은 범위만 사용합니다");
  if (includes(source, /close/i)) values.push("좁은 그립에서는 손목을 꺾지 않고 팔꿈치 경로를 통제합니다");
  if (includes(source, /alternating/i)) values.push("좌우를 바꿀 때 몸통이 급하게 회전하지 않게 잠시 정지합니다");
  if (includes(source, /front/i)) values.push("앞쪽으로 도구가 이동할 때 갈비뼈를 과하게 들지 않습니다");
  return values[0] ?? "반복 사이에도 시작 자세의 지지와 정렬을 다시 확인합니다";
}

function family(source: DetailSource) {
  const name = source.name.toLowerCase();
  if (/(deadlift|good morning|hip hinge|romanian)/.test(name)) return "hinge";
  if (/(squat|lunge|step up|step-up|leg press)/.test(name)) return "squat";
  if (/(row|pulldown|pull-up|chin-up)/.test(name)) return "pull";
  if (/(press|push-up|pushup|dip)/.test(name)) return "press";
  if (/(curl)/.test(name)) return "curl";
  if (/(triceps|extension|skullcrusher)/.test(name)) return "extension";
  if (/(fly|raise|lateral|front raise)/.test(name)) return "raise";
  if (/(shrug)/.test(name)) return "shrug";
  if (/(calf)/.test(name)) return "calf";
  if (/(wrist|forearm)/.test(name)) return "wrist";
  if (/(crunch|sit-up|leg raise|plank|abdominal)/.test(name)) return "core";
  if (/(bridge|thrust|abduction|adduction|clamshell)/.test(name)) return "hip";
  if (/(leg curl)/.test(name)) return "legCurl";
  if (/(leg extension)/.test(name)) return "legExtension";
  if (/(rotation|twist|woodchop|chop)/.test(name)) return "rotation";
  if (/(clean|snatch|jerk|jump|hop|throw)/.test(name)) return "power";
  if (/(carry|walk)/.test(name)) return "carry";
  if (/(bike|bicycl|elliptical|rowing|treadmill|climber)/.test(name)) return "cardio";
  if (/(stretch|mobility|roll)/.test(name) || source.category === "stretching") return "mobility";
  return "general";
}

const profiles: Record<string, Omit<DetailedProfile, "description" | "warning"> & { description: (name: string, target: string) => string; warning: (name: string) => string }> = {
  hinge: {
    description: (name, target) => `${name}은 ${target}을 길게 사용하면서 엉덩이를 뒤로 보내고 도구를 몸 가까이 이동시키는 힙 힌지 종목입니다.`,
    cues: ["발 전체로 바닥을 누르고 무릎은 부드럽게 유지", "골반을 뒤로 보내며 척추 길이를 유지", "도구를 정강이·허벅지 가까이 따라 이동"], benefits: ["후면 사슬의 힘 사용 인식", "엉덩이 주도 움직임 연습", "도구를 몸 가까이 다루는 제어"], setup: ["발을 골반 너비 근처에 두고 도구를 발 중앙 가까이에 둡니다", "양손 그립을 고정한 뒤 겨드랑이와 복부에 가볍게 힘을 줍니다", "가벼운 힙 힌지로 햄스트링 긴장을 먼저 확인합니다"], finish: "엉덩이를 앞으로 가져와 선 뒤, 도구를 통제된 경로로 안전하게 내려놓습니다.", commonMistakes: ["무릎을 먼저 과하게 굽혀 힌지가 사라지는 경우", "도구가 몸에서 멀어져 허리에 부담이 커지는 경우", "끝 범위에서 등을 둥글게 말아 당기는 경우"], regressions: ["가벼운 덤벨 또는 높은 시작 위치로 바꿉니다", "도구 없이 벽 터치 힌지로 범위를 익힙니다", "가능한 범위까지만 내려가고 멈춥니다"], progressions: ["동일한 정렬에서 부하만 소폭 올립니다", "지지면을 안정적으로 유지한 채 범위를 조금 늘립니다", "한쪽 도구 또는 더 긴 지렛대는 숙련 뒤에만 시도합니다"] , warning: (name) => `${name} 중 허리의 날카로운 통증·저림, 그립 미끄러짐 또는 균형 상실이 있으면 즉시 중단하고 도구를 안전하게 내려놓으세요.` },
  squat: {
    description: (name, target) => `${name}은 ${target}을 사용해 무릎과 엉덩이를 함께 굽혔다 펴는 하체 지지·밀기 종목입니다.`, cues: ["발 전체를 바닥에 붙이고 무릎을 발 방향으로 이동", "골반과 흉곽이 함께 내려가도록 몸통을 길게 유지", "발바닥으로 바닥을 밀며 부드럽게 일어서기"], benefits: ["하체 지지력과 제어", "엉덩이·무릎 협응", "일상적인 앉고 서기 패턴 연습"], setup: ["발 간격과 발끝 방향을 편안한 범위에서 정합니다", "필요하면 벤치·랙·손잡이를 가까이 둡니다", "얕은 범위의 맨몸 반복으로 무릎 반응을 확인합니다"], finish: "무릎과 엉덩이를 함께 펴고 발 전체로 균형을 회복한 뒤 다음 반복을 준비합니다.", commonMistakes: ["무릎이 발 안쪽으로 무너지는 경우", "발뒤꿈치가 들린 채 깊이를 억지로 늘리는 경우", "내려가며 허리가 과하게 말리거나 젖혀지는 경우"], regressions: ["의자·박스를 목표 높이로 사용합니다", "지지대를 잡고 얕은 범위로 수행합니다", "부하를 빼고 체중 이동부터 연습합니다"], progressions: ["안정된 범위에서 반복만 소폭 늘립니다", "편안한 깊이가 확보된 뒤 부하를 추가합니다", "편측 변형은 지지대 가까이에서 시작합니다"], warning: (name) => `${name} 중 무릎·고관절의 날카로운 통증, 발바닥 들림 또는 균형 상실이 있으면 깊이·부하를 낮추거나 중단하세요.` },
  pull: {
    description: (name, target) => `${name}은 ${target}을 쓰며 손잡이 또는 도구를 몸 쪽으로 당기고 어깨뼈의 위치를 제어하는 당기기 종목입니다.`, cues: ["먼저 어깨를 귀에서 멀리 두고 가슴을 편안히 유지", "팔꿈치를 목적 방향으로 끌되 몸통 반동 줄이기", "당긴 끝에서 잠시 멈춘 뒤 통제하며 돌아가기"], benefits: ["등·팔의 당기기 협응", "견갑 위치 인식", "그립과 몸통 안정 제어"], setup: ["그립·바·손잡이 높이와 고정 상태를 확인합니다", "몸통을 과도하게 젖히지 않는 거리에서 시작합니다", "가벼운 당김으로 어깨가 편안한 경로를 찾습니다"], finish: "팔을 급하게 펴지 말고 어깨가 앞으로 쏠리지 않는 범위에서 시작 위치로 돌아갑니다.", commonMistakes: ["어깨를 으쓱한 채 팔만 사용하는 경우", "몸통을 크게 흔들어 반동을 만드는 경우", "팔꿈치를 끝까지 밀어 관절을 잠그는 경우"], regressions: ["밴드·보조 장치 또는 더 가벼운 저항을 사용합니다", "지지된 시티드 자세로 몸통 부담을 줄입니다", "당기는 범위를 짧게 정하고 멈춥니다"], progressions: ["같은 경로에서 저항을 한 단계만 올립니다", "완전한 어깨 제어가 되면 범위를 조금 늘립니다", "편측 당김은 몸통 회전을 통제할 수 있을 때 시도합니다"], warning: (name) => `${name} 중 어깨 앞쪽의 날카로운 통증, 손 저림, 고정점 흔들림 또는 그립 이탈이 있으면 즉시 중단하세요.` },
  press: {
    description: (name, target) => `${name}은 ${target}을 사용해 손잡이·도구 또는 바닥을 몸에서 멀어지게 미는 상체 밀기 종목입니다.`, cues: ["손목을 중립에 가깝게 두고 손잡이를 안정적으로 잡기", "갈비뼈를 과하게 들지 않고 몸통 길이 유지", "팔꿈치를 편안한 경로로 밀고 천천히 되돌리기"], benefits: ["가슴·어깨·팔의 밀기 협응", "손목과 견갑 안정 제어", "상체 지지 패턴 연습"], setup: ["손잡이·바·지지면의 높이와 좌우 설정을 확인합니다", "어깨가 불편하지 않은 그립 폭을 찾습니다", "가벼운 저항에서 밀기 경로를 한 번 확인합니다"], finish: "팔꿈치를 잠그지 않은 편안한 끝 범위에서 잠시 멈춘 뒤 같은 경로로 돌아옵니다.", commonMistakes: ["어깨가 앞으로 말린 채 밀어 올리는 경우", "허리를 과하게 젖혀 무게를 넘기는 경우", "손목을 꺾고 그립을 느슨하게 유지하는 경우"], regressions: ["벽·높은 벤치 또는 가벼운 저항으로 바꿉니다", "가동 범위를 줄이고 어깨 편안함을 확인합니다", "양손 지지로 안정성을 먼저 확보합니다"], progressions: ["정렬이 유지될 때 반복을 소폭 늘립니다", "안정된 지지면에서 저항을 한 단계만 올립니다", "낮은 지지 또는 편측 변형은 통제 후 시도합니다"], warning: (name) => `${name} 중 어깨·팔꿈치·손목 통증, 저림 또는 도구 흔들림이 있으면 즉시 멈추고 설정을 다시 확인하세요.` },
  curl: { description: (name, target) => `${name}은 ${target}을 중심으로 팔꿈치를 굽히며 도구를 통제하는 팔 굽힘 종목입니다.`, cues: ["상완을 몸통 가까이에 두고 팔꿈치 위치를 고정", "손목을 꺾지 말고 도구를 부드럽게 들어 올리기", "내려갈 때도 중량을 통제하며 팔을 편안히 펴기"], benefits: ["팔 굽힘 근육의 제어", "전완·그립 안정 인식", "팔꿈치 관절 경로 연습"], setup: ["가벼운 중량을 들고 팔꿈치를 몸통 옆에 둡니다", "어깨를 올리지 않고 가슴과 골반을 편안히 정렬합니다", "손목이 중립에 가까운 그립을 먼저 찾습니다"], finish: "팔꿈치를 완전히 잠그지 않는 편안한 아래 범위에서 다음 반복을 준비합니다.", commonMistakes: ["몸통을 뒤로 젖혀 반동을 쓰는 경우", "팔꿈치가 앞으로 크게 이동하는 경우", "손목을 꺾어 중량을 드는 경우"], regressions: ["더 가벼운 도구나 밴드를 사용합니다", "시티드 또는 벤치 지지로 몸통 반동을 줄입니다", "아래와 위 범위를 조금 줄입니다"], progressions: ["반동 없이 반복을 한두 회 늘립니다", "그립이 안정되면 중량을 소폭 올립니다", "편측 수행은 몸통이 흔들리지 않을 때 시작합니다"], warning: (name) => `${name} 중 팔꿈치·손목의 날카로운 통증, 저림 또는 그립 미끄러짐이 있으면 즉시 중단하세요.` },
  extension: { description: (name, target) => `${name}은 ${target}을 사용해 팔꿈치 또는 목표 관절을 펴는 경로를 통제하는 종목입니다.`, cues: ["관절 축을 고정하고 목표 관절만 부드럽게 펴기", "어깨와 몸통이 흔들리지 않게 지지 유지", "끝 범위에서 관절을 세게 잠그지 않기"], benefits: ["관절 폄 경로 제어", "팔 뒤쪽·주변 안정 근육 사용", "도구를 안전하게 다루는 협응"], setup: ["도구·손잡이를 안정적으로 고정하고 관절 축을 맞춥니다", "가벼운 저항으로 불편하지 않은 범위를 확인합니다", "몸통을 지지하거나 발을 단단히 고정합니다"], finish: "저항을 천천히 되돌려 관절이 편안한 시작 범위에서 멈춥니다.", commonMistakes: ["어깨와 허리를 함께 흔들어 저항을 넘기는 경우", "관절을 반동으로 끝까지 잠그는 경우", "손목을 꺾어 힘을 전달하는 경우"], regressions: ["저항과 범위를 모두 낮춥니다", "양손 또는 지지된 자세를 사용합니다", "통증 없는 중간 범위만 수행합니다"], progressions: ["정렬을 지킨 채 반복을 소폭 늘립니다", "저항은 한 단계만 올립니다", "편측·긴 지렛대는 관절이 편안할 때만 시도합니다"], warning: (name) => `${name} 중 관절 끝의 날카로운 통증, 저림 또는 손잡이 흔들림이 있으면 즉시 중단하세요.` },
  raise: { description: (name, target) => `${name}은 ${target}을 사용해 팔 또는 도구를 정해진 평면으로 들어 올리며 어깨 위치를 제어하는 종목입니다.`, cues: ["어깨를 귀에서 멀리 두고 목을 길게 유지", "도구를 몸에서 너무 멀리 보내지 않기", "편안한 높이까지만 올린 뒤 천천히 내려오기"], benefits: ["어깨 주변의 제어", "팔과 견갑의 협응", "가벼운 도구 경로 인식"], setup: ["낮은 중량으로 시작하고 양발 또는 벤치 지지로 균형을 만듭니다", "팔꿈치를 살짝 굽혀 관절 부담을 줄입니다", "어깨가 편안한 들기 평면을 먼저 확인합니다"], finish: "어깨가 앞으로 밀리지 않게 도구를 몸 옆으로 통제해 되돌립니다.", commonMistakes: ["어깨를 으쓱하며 목에 힘을 주는 경우", "반동으로 도구를 목표 높이보다 높게 던지는 경우", "손목을 꺾어 도구를 지지하는 경우"], regressions: ["중량을 낮추거나 한 팔씩 지지된 자세로 수행합니다", "들기 높이를 어깨 아래로 줄입니다", "밴드 또는 더 짧은 지렛대를 사용합니다"], progressions: ["동일한 높이와 정렬에서 반복을 늘립니다", "작은 중량 증가를 한 번만 적용합니다", "편측·인클라인 변형은 어깨가 편안할 때 시도합니다"], warning: (name) => `${name} 중 어깨 위쪽 통증, 목 긴장, 저림 또는 반동이 생기면 즉시 범위·저항을 낮추거나 중단하세요.` },
  cardio: { description: (name, target) => `${name}은 ${target}을 포함한 전신 또는 하체를 리드미컬하게 사용해 심폐 활동을 만드는 유산소 종목입니다.`, cues: ["낮은 저항에서 편안한 호흡 리듬 먼저 찾기", "관절이 자연스럽게 움직이는 범위를 유지", "손잡이나 페달에 체중을 과하게 싣지 않기"], benefits: ["저충격 심폐 활동", "지속적인 리듬과 호흡 인식", "관절 부담을 조절한 활동량 확보"], setup: ["시트·손잡이·페달 또는 보폭 설정을 몸에 맞춥니다", "비상 정지·고정 장치와 주변 공간을 확인합니다", "아주 낮은 저항에서 1~2분 움직임을 시험합니다"], finish: "저항과 속도를 서서히 낮춰 호흡을 정리한 뒤 천천히 기구에서 내립니다.", commonMistakes: ["처음부터 저항과 속도를 함께 높이는 경우", "손잡이에 체중을 실어 자세가 무너지는 경우", "피로 신호를 무시하고 불안정한 리듬을 지속하는 경우"], regressions: ["저항과 시간을 모두 낮춥니다", "더 안정된 기구 또는 앉은 자세를 선택합니다", "짧은 활동 뒤 충분히 회복합니다"], progressions: ["편안한 호흡이 유지되면 시간만 소폭 늘립니다", "시간 적응 뒤 저항을 한 단계만 조절합니다", "다음 날 관절 반응이 편안할 때만 빈도를 늘립니다"], warning: (name) => `${name} 중 흉통·현기증·비정상적인 숨참, 관절 통증 또는 기구 이상이 있으면 즉시 멈추고 안전하게 내려오세요.` },
  mobility: { description: (name, target) => `${name}은 ${target} 주변을 통증 없는 범위에서 천천히 움직여 가동 범위와 자세 감각을 확인하는 모빌리티 종목입니다.`, cues: ["작은 범위에서 호흡을 멈추지 않기", "끝 범위를 밀지 말고 부드럽게 왕복", "다른 관절이 대신 움직이지 않는지 확인"], benefits: ["관절 위치와 범위 인식", "편안한 움직임 준비", "호흡과 자세의 연결"], setup: ["편안한 바닥·매트 또는 지지대를 준비합니다", "첫 반복은 가장 작은 범위로 시작합니다", "통증이 아닌 가벼운 당김만 허용합니다"], finish: "중립 자세로 천천히 돌아와 불편감이 남지 않는지 확인합니다.", commonMistakes: ["끝 범위를 억지로 밀어 통증을 만드는 경우", "호흡을 참거나 반동을 쓰는 경우", "저림·방사통을 무시하고 지속하는 경우"], regressions: ["범위와 유지 시간을 줄입니다", "벽·의자·블록 같은 지지대를 사용합니다", "누운 또는 앉은 안정된 자세로 바꿉니다"], progressions: ["다음 날 편안하면 범위만 조금 늘립니다", "호흡 주기를 한 번 추가합니다", "지지대는 안정적으로 줄여 갑니다"], warning: (name) => `${name} 중 날카로운 통증, 저림, 방사통, 붓기·열감이 있으면 자가 진행을 멈추고 평가를 우선하세요.` },
  power: { description: (name, target) => `${name}은 ${target}을 빠르게 쓰되 착지·받기·도구 경로를 먼저 통제해야 하는 파워 또는 기술 종목입니다.`, cues: ["낮은 속도 리허설 뒤에만 힘을 빠르게 쓰기", "발·무릎·골반이 같은 방향으로 받기", "도구나 몸을 끝 범위에서 안정적으로 멈추기"], benefits: ["힘 발휘와 제어의 연결", "착지·받기 협응", "전신 타이밍 인식"], setup: ["미끄럽지 않은 바닥과 충분한 빈 공간을 확보합니다", "낮은 충격의 기본 동작을 먼저 성공합니다", "도구를 쓸 경우 가벼운 부하와 안전한 내려놓기 위치를 정합니다"], finish: "착지 또는 받기 뒤 잠시 균형을 확인하고 호흡이 안정된 후 다음 반복을 시작합니다.", commonMistakes: ["피로한 상태에서 높이·속도·부하를 함께 올리는 경우", "착지 소리와 무릎 흔들림을 무시하는 경우", "도구 경로가 불안정한데 반복을 이어 가는 경우"], regressions: ["점프·속도를 빼고 체중 이동으로 바꿉니다", "낮은 높이·짧은 거리·가벼운 도구를 사용합니다", "지지대 가까이에서 받기 자세만 연습합니다"], progressions: ["안정된 착지 뒤 반복을 한두 회 늘립니다", "한 번에 거리·높이·부하 중 하나만 조절합니다", "복잡한 연속 동작은 기본 패턴이 안정된 뒤 시도합니다"], warning: (name) => `${name} 중 착지 불안, 무릎·발목·허리 통증, 어지러움 또는 공간 부족이 있으면 즉시 중단하세요.` },
};

profiles.core = profiles.general = profiles.mobility;
profiles.hip = profiles.squat;
profiles.legCurl = profiles.legExtension = profiles.squat;
profiles.rotation = profiles.core;
profiles.calf = profiles.squat;
profiles.wrist = profiles.curl;
profiles.shrug = profiles.raise;
profiles.carry = profiles.cardio;

export function createDetailedProfile({ name, equipment, source }: ProfileInput): DetailedProfile {
  const profile = profiles[family(source)] ?? profiles.general;
  const target = muscles(source);
  return {
    description: `${profile.description(name, target)} ${modifiers(source)}`,
    cues: [`${name}에서 ${profile.cues[0]}`, `${target}을 느끼며 ${profile.cues[1]}`, modifiers(source)],
    benefits: [`${name}으로 ${profile.benefits[0]}`, `${target}을 활용한 ${profile.benefits[1]}`, `${target}의 움직임 경로 인식`],
    warning: profile.warning(name),
    setup: [equipmentSetup(source, equipment), position(source), `${name}에 맞춰 ${profile.setup[0]}`],
    finish: `${name}을 마친 뒤 ${profile.finish}`,
    commonMistakes: profile.commonMistakes.map((item) => `${name}에서 ${item}`),
    regressions: profile.regressions.map((item) => `${name}은 ${item}`),
    progressions: profile.progressions.map((item) => `${name}은 ${item}`),
  };
}
