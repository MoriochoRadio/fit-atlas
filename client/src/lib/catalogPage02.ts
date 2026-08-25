import type { CatalogEntry } from "./catalogTypes";

export const catalogPage02: CatalogEntry[] = [
  {
    exercise: {
      id: "low-step-lateral-tap",
      name: "로우 스텝 레터럴 탭",
      englishName: "Low Step Lateral Tap",
      category: "균형·협응",
      regions: ["하체", "둔근", "코어"],
      focus: "협응",
      difficulty: "입문",
      equipment: "낮고 안정된 스텝 · 벽 근처",
      minutes: "좌우 5–8회 · 2세트",
      description:
        "스텝 옆에 서서 한 발을 위에 가볍게 터치하고 돌아오며 측면 체중 이동을 천천히 연습합니다.",
      cues: [
        "스텝 높이는 낮게 시작",
        "발을 교차하지 않고 옆으로 이동",
        "골반이 급하게 기울지 않게",
      ],
      benefits: ["측면 이동 제어", "둔근·발목 협응", "방향 전환 준비"],
      warning:
        "발목·무릎 통증이나 균형 불안이 있으면 스텝 없이 바닥 탭으로 바꾸세요.",
      reference: {
        label: "CDC 성인 신체 활동 지침",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: [
        "낮은 스텝·벽·난간의 안정성을 확인",
        "스텝 없이 바닥 옆 탭을 먼저 연습",
        "발가락이 아니라 발 전체로 바닥을 느끼기",
      ],
      finish: "양발을 바닥에 두고 균형이 안정된 뒤 반대 방향으로 전환합니다.",
      commonMistakes: [
        "스텝 가장자리에 발을 강하게 찍음",
        "골반이 급히 흔들림",
        "지지대에서 너무 멀리 시작",
      ],
      regressions: ["스텝 없는 바닥 탭", "더 낮은 높이", "양손 지지"],
      progressions: ["반복 소폭 증가", "한 손 지지", "느린 방향 전환 추가"],
    },
  },
  {
    exercise: {
      id: "medicine-ball-scoop-toss",
      name: "메디신볼 스쿱 토스",
      englishName: "Medicine Ball Scoop Toss",
      category: "파워·민첩성",
      regions: ["하체", "둔근", "코어", "팔"],
      focus: "파워",
      difficulty: "입문",
      equipment: "아주 가벼운 메디신볼 · 안전한 벽",
      minutes: "2–3세트 · 3–5회",
      description:
        "가벼운 공을 낮은 자세에서 앞으로 부드럽게 보내며 하체·몸통·팔의 짧은 힘 전달을 연습합니다.",
      cues: [
        "아주 가벼운 공과 충분한 공간",
        "허리보다 엉덩이·다리로 힘 전달",
        "공을 안전하게 받거나 회수할 경로 확인",
      ],
      benefits: ["전신 힘 전달", "몸통-팔 협응", "파워 패턴 기초"],
      warning:
        "허리·어깨·손목 통증이 있거나 공 반동을 제어할 수 없으면 실시하지 마세요.",
      reference: {
        label: "ACSM 2026 저항운동 지침",
        url: "https://acsm.org/resistance-training-guidelines-update-2026/",
      },
    },
    detail: {
      setup: [
        "아주 가벼운 공·비어 있는 벽면·회수 경로 확인",
        "작은 힙 힌지와 체중 이동만 먼저 리허설",
        "공을 가까운 벽에 낮은 속도로 보내기",
      ],
      finish: "공을 바닥에 안전히 두고 손목·어깨·허리 반응을 확인합니다.",
      commonMistakes: [
        "팔만 크게 휘두름",
        "공 반동을 제어하지 못함",
        "무거운 공을 너무 멀리 던짐",
      ],
      regressions: [
        "공 없이 체중 이동",
        "아주 가까운 벽·낮은 속도",
        "메디신볼 체스트 패스",
      ],
      progressions: [
        "정확한 회수 뒤 거리 소폭 증가",
        "한 번에 한 변수만 조절",
        "충분히 숙련된 뒤 작은 회전 추가",
      ],
    },
  },
  {
    exercise: {
      id: "aqua-walk",
      name: "수중 걷기",
      englishName: "Aqua Walking",
      category: "유산소",
      regions: ["하체", "둔근", "코어"],
      focus: "심폐",
      difficulty: "입문",
      equipment: "수심이 익숙한 수영장",
      minutes: "10–25분 · 편안한 리듬",
      description:
        "물속에서 천천히 걸으며 부력과 저항을 활용해 관절 충격을 낮춘 유산소 리듬을 경험합니다.",
      cues: [
        "수심과 바닥 상태를 먼저 확인",
        "난간 가까운 구간에서 시작",
        "보폭을 짧고 편안하게 유지",
      ],
      benefits: ["저충격 유산소", "보행 리듬", "하체 순환감"],
      warning:
        "수영장 안전 규칙을 따르고, 어지러움·호흡 불편·물 공포가 있으면 혼자 진행하지 마세요.",
      reference: {
        label: "CDC 성인 신체 활동 지침",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: [
        "수심·바닥·난간 위치와 수영장 규칙 확인",
        "얕고 익숙한 구간에서 짧은 보폭으로 시작",
        "호흡과 균형이 편안한지 확인",
      ],
      finish:
        "난간 가까이에서 속도를 낮추고 물 밖으로 나올 때 어지러움이 없는지 확인합니다.",
      commonMistakes: [
        "익숙하지 않은 수심에서 혼자 진행",
        "큰 보폭과 빠른 방향 전환",
        "호흡 불편을 참고 지속",
      ],
      regressions: [
        "더 얕은 구간",
        "난간 가까운 짧은 걷기",
        "수영장 밖 평지 걷기",
      ],
      progressions: [
        "시간을 소폭 늘리기",
        "팔 움직임 부드럽게 추가",
        "편안한 속도 변화",
      ],
    },
  },
  {
    exercise: {
      id: "elliptical-easy",
      name: "일립티컬",
      englishName: "Elliptical",
      category: "유산소",
      regions: ["하체", "둔근", "코어", "팔"],
      focus: "심폐",
      difficulty: "입문",
      equipment: "일립티컬 머신",
      minutes: "10–25분 · RPE 3–5",
      description:
        "낮은 저항에서 페달과 손잡이를 부드럽게 움직이며 달리기 충격을 줄인 전신 유산소 리듬을 연습합니다.",
      cues: [
        "페달 위 발 위치를 먼저 확인",
        "손잡이에 체중을 기대지 않기",
        "대화 가능한 강도로 시작",
      ],
      benefits: ["저충격 심폐 활동", "전신 리듬", "걷기·달리기 대체"],
      warning:
        "현기증·무릎 통증·손잡이에 과도하게 의지하는 자세가 나오면 저항·시간을 낮추거나 중단하세요.",
      reference: {
        label: "CDC 성인 신체 활동 지침",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: [
        "페달·손잡이와 저항을 낮은 설정으로 확인",
        "발 전체를 페달 중앙에 두기",
        "3분 미만의 매우 편안한 리듬으로 시작",
      ],
      finish:
        "저항을 낮추고 몇 분 천천히 움직인 뒤 발판에서 안전하게 내려옵니다.",
      commonMistakes: [
        "손잡이에 체중을 과하게 싣기",
        "저항을 너무 빠르게 올림",
        "현기증을 참고 지속",
      ],
      regressions: ["저항·시간 낮추기", "리컴번트 바이크", "평지 걷기"],
      progressions: [
        "시간 우선 소폭 증가",
        "짧은 리듬 변화",
        "회복이 충분한 날 저항 한 단계 추가",
      ],
    },
  },
  {
    exercise: {
      id: "sandbag-bear-hug-carry",
      name: "샌드백 베어허그 캐리",
      englishName: "Sandbag Bear-Hug Carry",
      category: "프리웨이트",
      regions: ["하체", "둔근", "코어", "팔", "등"],
      focus: "체력",
      difficulty: "중급",
      equipment: "가벼운 샌드백 · 평평한 보행 경로",
      minutes: "10–25m · 2–4회",
      description:
        "가벼운 샌드백을 몸 앞 가까이 안고 짧은 거리를 통제해 걸으며 전신 운반과 보행 리듬을 연습합니다.",
      cues: [
        "가벼운 샌드백·짧은 경로부터",
        "몸통을 길게 세우고 짧게 걷기",
        "방향 전환 전 속도를 줄이기",
      ],
      benefits: ["전신 운반 지구력", "몸통·그립 협응", "보행 제어"],
      warning:
        "허리·어깨 통증, 숨참, 몸통이 크게 기울어짐이 있으면 거리·부하를 낮추거나 중단하세요.",
      reference: {
        label: "NSCA 운반 운동 안내",
        url: "https://www.nsca.com/education/articles/nsca-coach/increase-hip-and-trunk-stability-with-loaded-carries/",
      },
    },
    detail: {
      setup: [
        "샌드백 손잡이·누출·보행 경로 확인",
        "무릎 가까이에서 몸 앞으로 끌어안기",
        "10m 미만의 짧은 경로에서 리허설",
      ],
      finish:
        "샌드백을 무릎 가까이에서 바닥에 두고 호흡·허리 반응을 확인합니다.",
      commonMistakes: [
        "몸통을 뒤로 젖혀 버팀",
        "큰 보폭으로 급히 걷기",
        "피로해도 방향 전환 지속",
      ],
      regressions: ["더 가벼운 샌드백", "10m 미만 거리", "양손 파머스 캐리"],
      progressions: [
        "거리 소폭 증가",
        "가벼운 부하 증가",
        "정지·걷기 구간 연결",
      ],
    },
  },
  {
    exercise: {
      id: "sandbag-front-squat",
      name: "샌드백 프런트 스쿼트",
      englishName: "Sandbag Front Squat",
      category: "프리웨이트",
      regions: ["하체", "둔근", "코어", "팔"],
      focus: "근력",
      difficulty: "중급",
      equipment: "가벼운 샌드백",
      minutes: "2–3세트 · 5–8회",
      description:
        "가벼운 샌드백을 몸 앞쪽에 안정적으로 두고 편안한 범위의 스쿼트를 수행하는 기능성 하체 운동입니다.",
      cues: [
        "샌드백을 몸에 가깝게 밀착",
        "발 전체로 바닥 누르기",
        "깊이보다 정렬과 호흡 우선",
      ],
      benefits: ["하체·둔근 근력", "앞쪽 부하 제어", "몸통 협응"],
      warning:
        "무릎·허리 통증이나 샌드백을 제어할 수 없는 흔들림이 있으면 맨몸·고블릿 스쿼트로 낮추세요.",
      reference: {
        label: "ACSM 2026 저항운동 지침",
        url: "https://acsm.org/resistance-training-guidelines-update-2026/",
      },
    },
    detail: {
      setup: [
        "샌드백을 몸 앞에 밀착해 안정적으로 잡기",
        "발 전체와 무릎 방향 확인",
        "맨몸 스쿼트로 편안한 깊이 찾기",
      ],
      finish: "샌드백을 바닥에 안전히 내려놓고 무릎·허리 반응을 기록합니다.",
      commonMistakes: [
        "샌드백을 몸에서 멀리 둠",
        "발뒤꿈치가 들림",
        "깊이를 억지로 늘림",
      ],
      regressions: ["맨몸 의자 스쿼트", "더 가벼운 샌드백", "얕은 범위"],
      progressions: [
        "반복 품질 뒤 소폭 증량",
        "바닥 1초 멈춤",
        "가벼운 캐리와 연결",
      ],
    },
  },
  {
    exercise: {
      id: "trx-row",
      name: "TRX 로우",
      englishName: "TRX Row",
      category: "맨몸운동",
      regions: ["등", "팔", "어깨", "코어"],
      focus: "근력",
      difficulty: "입문",
      equipment: "안전하게 고정한 서스펜션 스트랩",
      minutes: "2–3세트 · 6–12회",
      description:
        "발 위치로 각도를 조절하며 스트랩 손잡이를 몸 쪽으로 당겨 등·견갑의 제어를 연습합니다.",
      cues: [
        "고정점·스트랩 마모 먼저 확인",
        "몸을 긴 선으로 유지",
        "어깨를 으쓱하지 않고 손잡이 당기기",
      ],
      benefits: ["등·팔 근력", "견갑 제어", "가변 난도 당기기"],
      warning:
        "고정점이 불안정하거나 어깨 통증·저림이 있으면 사용하지 말고 밴드 로우로 바꾸세요.",
      reference: {
        label: "ACE 서스펜션 트레이닝 안내",
        url: "https://www.acefitness.org/continuing-education/certified/september-2022/8128/get-suspended-a-workout-to-maximize-the-proven-health-benefits-of-suspension-training/",
      },
    },
    detail: {
      setup: [
        "고정점·스트랩 마모·바닥 상태 확인",
        "발을 고정점 가까이에 두고 낮은 각도 선택",
        "몸을 긴 선으로 가볍게 기울이기",
      ],
      finish:
        "발을 고정점 쪽으로 옮겨 장력을 줄이고 어깨·손 반응을 확인합니다.",
      commonMistakes: [
        "고정점 확인 없이 체중 싣기",
        "목을 으쓱함",
        "몸통을 젖혀 반동 사용",
      ],
      regressions: ["더 높은 몸 각도", "무릎 굽혀 발 지지", "밴드 로우"],
      progressions: [
        "발을 더 멀리 두기",
        "정지 1초 추가",
        "한쪽씩 보조 당기기",
      ],
    },
  },
  {
    exercise: {
      id: "trx-assisted-squat",
      name: "TRX 어시스티드 스쿼트",
      englishName: "TRX Assisted Squat",
      category: "맨몸운동",
      regions: ["하체", "둔근", "코어"],
      focus: "근력",
      difficulty: "입문",
      equipment: "안전하게 고정한 서스펜션 스트랩",
      minutes: "2–3세트 · 6–12회",
      description:
        "스트랩을 가볍게 잡아 균형을 보조하며 스쿼트의 편안한 범위와 하체 제어를 연습합니다.",
      cues: [
        "팔로 몸을 당기지 않고 가볍게 지지",
        "발 전체와 무릎 방향 확인",
        "통증 없는 깊이에서 멈추기",
      ],
      benefits: ["스쿼트 자신감", "균형 보조", "하체 근력 기초"],
      warning:
        "무릎 통증·현기증·고정점 불안이 있으면 의자 스쿼트와 벽 지지로 낮추세요.",
      reference: {
        label: "ACE 서스펜션 트레이닝 안내",
        url: "https://www.acefitness.org/continuing-education/certified/september-2022/8128/get-suspended-a-workout-to-maximize-the-proven-health-benefits-of-suspension-training/",
      },
    },
    detail: {
      setup: [
        "고정점·스트랩 길이를 확인",
        "양손으로 가볍게 잡고 발 전체 고정",
        "작은 범위의 스쿼트부터",
      ],
      finish: "스트랩 장력을 줄이고 양발로 균형을 확인합니다.",
      commonMistakes: [
        "팔로 몸을 강하게 끌어당김",
        "무릎이 안쪽으로 무너짐",
        "통증을 넘는 깊이",
      ],
      regressions: ["의자 스쿼트", "더 얕은 범위", "벽 지지"],
      progressions: ["스트랩 의존도 줄이기", "반복 소폭 증가", "1초 멈춤"],
    },
  },
  {
    exercise: {
      id: "trx-chest-press",
      name: "TRX 체스트 프레스",
      englishName: "TRX Chest Press",
      category: "맨몸운동",
      regions: ["가슴", "어깨", "팔", "코어"],
      focus: "근력",
      difficulty: "중급",
      equipment: "안전하게 고정한 서스펜션 스트랩",
      minutes: "2–3세트 · 5–10회",
      description:
        "스트랩을 잡고 몸을 한 선으로 기울여 팔을 굽혔다 펴며 상체 밀기와 몸통 제어를 연습합니다.",
      cues: [
        "각도를 낮게 시작해 부하 조절",
        "갈비뼈를 과도하게 들지 않기",
        "팔꿈치를 편안한 대각선으로",
      ],
      benefits: ["가슴·팔 근력", "상체 밀기 제어", "몸통 안정성"],
      warning:
        "어깨 앞쪽 통증·손목 불편·고정점 불안이 있으면 더 높은 각도 또는 벽 푸시업으로 낮추세요.",
      reference: {
        label: "ACE 서스펜션 트레이닝 안내",
        url: "https://www.acefitness.org/continuing-education/certified/september-2022/8128/get-suspended-a-workout-to-maximize-the-proven-health-benefits-of-suspension-training/",
      },
    },
    detail: {
      setup: [
        "고정점·스트랩 상태 확인",
        "몸 각도를 매우 높게 시작",
        "갈비뼈·골반을 편안히 정렬",
      ],
      finish: "발을 고정점 쪽으로 옮겨 장력을 줄이고 손목·어깨를 확인합니다.",
      commonMistakes: [
        "허리를 과도하게 젖힘",
        "팔꿈치를 과하게 벌림",
        "고정점 불안정",
      ],
      regressions: ["더 높은 각도", "벽 푸시업", "짧은 범위"],
      progressions: ["각도를 소폭 낮추기", "천천히 복귀", "정지 구간 추가"],
    },
  },
  {
    exercise: {
      id: "club-bell-front-hold-march",
      name: "클럽벨 프런트 홀드 마치",
      englishName: "Clubbell Front Hold March",
      category: "프리웨이트",
      regions: ["코어", "어깨", "팔", "하체"],
      focus: "협응",
      difficulty: "입문",
      equipment: "아주 가벼운 클럽벨",
      minutes: "20–30초 · 2–3회",
      description:
        "아주 가벼운 클럽벨을 세로로 몸 앞에 두고 제자리에서 천천히 마치하며 몸통·어깨의 안정성을 연습합니다.",
      cues: [
        "아주 가벼운 도구부터",
        "클럽벨이 몸에서 멀어지지 않게",
        "작고 조용한 제자리 걸음",
      ],
      benefits: ["그립·몸통 협응", "어깨 위치 인식", "운반 패턴 준비"],
      warning:
        "손목·어깨 통증, 도구 제어 상실, 어지러움이 있으면 즉시 중단하고 맨몸 마치로 낮추세요.",
      reference: {
        label: "ACSM 2026 저항운동 지침",
        url: "https://acsm.org/resistance-training-guidelines-update-2026/",
      },
    },
    detail: {
      setup: [
        "도구 손잡이·주변 반경 확인",
        "아주 가벼운 클럽벨을 몸 앞에 가까이",
        "제자리 체중 이동부터 리허설",
      ],
      finish: "클럽벨을 바닥에 놓고 손목·어깨·호흡 반응을 확인합니다.",
      commonMistakes: [
        "도구를 몸에서 멀리 둠",
        "무릎을 높이 들어 균형 상실",
        "손목 통증을 무시",
      ],
      regressions: ["맨몸 마치", "더 가벼운 도구", "10초 미만"],
      progressions: [
        "시간 소폭 증가",
        "걷기 5m 추가",
        "한 번에 한 변수만 조절",
      ],
    },
  },
  {
    exercise: {
      id: "club-bell-two-hand-swing-prep",
      name: "클럽벨 투핸드 스윙 프렙",
      englishName: "Clubbell Two-Hand Swing Preparation",
      category: "프리웨이트",
      regions: ["둔근", "하체", "코어", "어깨"],
      focus: "협응",
      difficulty: "입문",
      equipment: "아주 가벼운 클럽벨 · 넓은 공간",
      minutes: "2–3세트 · 4–6회",
      description:
        "두 손으로 아주 가벼운 클럽벨을 짧은 범위에서 앞뒤로 이동하며 힙 힌지와 도구 경로를 익히는 준비 운동입니다.",
      cues: [
        "도구가 지나갈 공간 충분히 확보",
        "허리보다 엉덩이로 접고 일어서기",
        "어깨 높이 이하의 짧은 범위 유지",
      ],
      benefits: ["힙 힌지 협응", "도구 경로 인식", "그립 준비"],
      warning:
        "어깨·허리 통증, 좁은 공간, 도구 흔들림을 제어하지 못하는 경우에는 실시하지 마세요.",
      reference: {
        label: "ACSM 2026 저항운동 지침",
        url: "https://acsm.org/resistance-training-guidelines-update-2026/",
      },
    },
    detail: {
      setup: [
        "넓은 반경·바닥·도구 상태 확인",
        "두 손으로 짧은 범위만 잡기",
        "빈손 힌지로 먼저 리허설",
      ],
      finish: "도구를 바닥에 안전히 두고 허리·어깨 반응을 확인합니다.",
      commonMistakes: [
        "어깨 높이 이상으로 크게 휘두름",
        "허리로 반동 생성",
        "공간 확인 없이 시작",
      ],
      regressions: ["빈손 힌지", "더 가벼운 도구", "아주 짧은 범위"],
      progressions: [
        "반복 소폭 증가",
        "리듬 안정 뒤 작은 범위 확대",
        "충분한 회복일에만 속도 조절",
      ],
    },
  },
  {
    exercise: {
      id: "supported-dead-hang",
      name: "지지 데드 행",
      englishName: "Supported Dead Hang",
      category: "맨몸운동",
      regions: ["등", "어깨", "팔", "코어"],
      focus: "가동성",
      difficulty: "입문",
      equipment: "안정된 바 · 발 지지대",
      minutes: "5–15초 · 2–4회",
      description:
        "발을 바닥 또는 지지대에 일부 둔 채 안정된 바를 가볍게 잡아 어깨 위쪽의 편안한 매달리기 감각을 탐색합니다.",
      cues: [
        "바 고정 상태와 발 지지 확인",
        "발로 체중 일부를 계속 지지",
        "목을 으쓱하지 않고 짧게 유지",
      ],
      benefits: ["어깨 위치 인식", "그립 준비", "상체 가동성 탐색"],
      warning:
        "어깨 불안정·저림·통증·손 미끄러짐이 있으면 매달리지 말고 벽 슬라이드로 바꾸세요.",
      reference: {
        label: "ACSM 2026 저항운동 지침",
        url: "https://acsm.org/resistance-training-guidelines-update-2026/",
      },
    },
    detail: {
      setup: [
        "바·발 지지대·그립 상태 확인",
        "발로 체중 대부분을 지지",
        "5초 미만의 편안한 매달림부터",
      ],
      finish: "발을 바닥에 완전히 두고 어깨·손의 감각을 확인합니다.",
      commonMistakes: [
        "발 지지 없이 체중 전부 매달림",
        "목을 으쓱함",
        "손 미끄러짐을 무시",
      ],
      regressions: ["월 슬라이드", "밴드 로우", "양발 지지 늘리기"],
      progressions: [
        "발 지지 소폭 줄이기",
        "시간 2초 증가",
        "안정된 뒤 스캐풀라 행",
      ],
    },
  },
  {
    exercise: {
      id: "scapular-hang",
      name: "스캐풀라 행",
      englishName: "Scapular Hang",
      category: "맨몸운동",
      regions: ["등", "어깨", "팔"],
      focus: "협응",
      difficulty: "중급",
      equipment: "안정된 바 · 발 지지대 선택",
      minutes: "3–6회 · 2세트",
      description:
        "안정된 바를 잡고 팔꿈치를 펴 둔 채 어깨를 아주 작게 올렸다 내리며 견갑 조절을 연습합니다.",
      cues: [
        "작은 범위만 사용",
        "팔꿈치를 구부려 당기지 않기",
        "목을 길게 유지",
      ],
      benefits: ["견갑 조절", "매달리기 준비", "등·어깨 협응"],
      warning:
        "어깨 통증·저림·매달리기 불안이 있으면 수행하지 말고 밴드 로우·월 슬라이드로 낮추세요.",
      reference: {
        label: "ACSM 2026 저항운동 지침",
        url: "https://acsm.org/resistance-training-guidelines-update-2026/",
      },
    },
    detail: {
      setup: [
        "바·발 지지대·어깨 반응 확인",
        "팔꿈치를 편 채 작은 견갑 움직임만",
        "발 지지를 유지한 상태로 시작",
      ],
      finish: "발로 체중을 받으며 천천히 내려와 어깨·목 반응을 확인합니다.",
      commonMistakes: [
        "팔꿈치를 굽혀 풀업으로 바꿈",
        "큰 범위를 강요",
        "통증·저림 무시",
      ],
      regressions: ["월 슬라이드", "밴드 로우", "지지 데드 행"],
      progressions: ["반복 소폭 증가", "발 지지 조금 줄이기", "정지 구간 1초"],
    },
  },
  {
    exercise: {
      id: "landmine-press",
      name: "랜드마인 프레스",
      englishName: "Landmine Press",
      category: "프리웨이트",
      regions: ["어깨", "가슴", "팔", "코어"],
      focus: "근력",
      difficulty: "중급",
      equipment: "안전하게 고정한 랜드마인 바",
      minutes: "좌우 2–3세트 · 6–10회",
      description:
        "바의 한쪽 끝을 대각선 앞으로 밀며 완전한 머리 위 밀기보다 낮은 각도에서 어깨·몸통 제어를 연습합니다.",
      cues: [
        "바 고정·주변 공간을 먼저 확인",
        "갈비뼈와 골반을 편안히 정렬",
        "통증 없는 대각선 경로로 밀기",
      ],
      benefits: ["대각선 밀기", "어깨·코어 협응", "상체 근력"],
      warning:
        "어깨 통증·허리 과신전·바 고정 불안이 있으면 실시하지 말고 가벼운 체스트 프레스로 낮추세요.",
      reference: {
        label: "ACSM 2026 저항운동 지침",
        url: "https://acsm.org/resistance-training-guidelines-update-2026/",
      },
    },
    detail: {
      setup: [
        "바 고정·원판·주변 반경 확인",
        "가벼운 부하와 대각선 경로로 리허설",
        "갈비뼈·골반을 편안히 정렬",
      ],
      finish: "바를 고정된 위치에 두고 어깨·허리 반응을 확인합니다.",
      commonMistakes: [
        "허리를 과도하게 젖힘",
        "바 고정 확인 누락",
        "통증을 넘는 범위",
      ],
      regressions: ["케이블 체스트 프레스", "더 가벼운 바", "양손 프레스"],
      progressions: ["한쪽씩 수행", "반복 소폭 증가", "느린 복귀 구간"],
    },
  },
  {
    exercise: {
      id: "landmine-row",
      name: "랜드마인 로우",
      englishName: "Landmine Row",
      category: "프리웨이트",
      regions: ["등", "팔", "코어", "하체"],
      focus: "근력",
      difficulty: "중급",
      equipment: "안전하게 고정한 랜드마인 바",
      minutes: "2–3세트 · 6–10회",
      description:
        "힌지 자세에서 랜드마인 바 끝을 몸 쪽으로 당기며 등 중심의 당기기와 몸통 정렬을 연습합니다.",
      cues: [
        "가벼운 부하·짧은 힌지부터",
        "팔꿈치를 몸통 가까이 당기기",
        "허리가 둥글어지면 범위 줄이기",
      ],
      benefits: ["등·팔 근력", "힌지 속 당기기", "몸통 제어"],
      warning:
        "허리·어깨 통증, 바 고정 불안, 피로로 정렬이 무너지면 즉시 중단하세요.",
      reference: {
        label: "ACSM 2026 저항운동 지침",
        url: "https://acsm.org/resistance-training-guidelines-update-2026/",
      },
    },
    detail: {
      setup: [
        "바 고정·원판·발 위치 확인",
        "짧은 힌지와 가벼운 부하로 리허설",
        "등을 길게 유지하며 손잡이 잡기",
      ],
      finish: "바를 고정 위치에 두고 허리·등·그립 반응을 확인합니다.",
      commonMistakes: [
        "허리를 둥글게 말기",
        "팔로만 급하게 당김",
        "바 고정 확인 누락",
      ],
      regressions: ["체스트 서포티드 로우", "더 가벼운 바", "짧은 힌지"],
      progressions: ["반복 소폭 증가", "정지 1초", "부하 소폭 증가"],
    },
  },
  {
    exercise: {
      id: "landmine-rotation-prep",
      name: "랜드마인 회전 프렙",
      englishName: "Landmine Rotation Preparation",
      category: "프리웨이트",
      regions: ["코어", "둔근", "하체", "어깨"],
      focus: "협응",
      difficulty: "입문",
      equipment: "안전하게 고정한 랜드마인 바 · 가벼운 부하",
      minutes: "좌우 2세트 · 4–6회",
      description:
        "가벼운 랜드마인 바를 두 손으로 잡고 몸통·골반이 함께 움직이는 작은 대각선 회전 경로를 안전하게 연습하는 준비 운동입니다.",
      cues: [
        "바 고정과 넓은 반경 먼저 확인",
        "아주 작은 범위에서 골반과 몸통 함께 이동",
        "허리를 비틀지 말고 발로 방향 전환",
      ],
      benefits: ["회전 패턴 인식", "몸통·둔근 협응", "대각선 부하 준비"],
      warning:
        "허리·고관절·어깨 통증, 바 고정 불안, 제어되지 않는 속도가 있으면 중단하고 팔로프 프레스로 바꾸세요.",
      reference: {
        label: "ACSM 2026 저항운동 지침",
        url: "https://acsm.org/resistance-training-guidelines-update-2026/",
      },
    },
    detail: {
      setup: [
        "바 고정·원판·주변 반경 확인",
        "아주 가벼운 부하와 작은 경로 선택",
        "빈손 체중 이동부터 리허설",
      ],
      finish: "바를 고정 위치에 두고 허리·고관절·어깨 반응을 확인합니다.",
      commonMistakes: [
        "허리만 급하게 비틂",
        "바 고정 확인 누락",
        "반동으로 범위를 키움",
      ],
      regressions: ["팔로프 프레스", "빈손 체중 이동", "더 짧은 경로"],
      progressions: ["반복 소폭 증가", "좌우 제어 확인", "부하 한 단계만 증가"],
    },
  },
  {
    exercise: {
      id: "seated-wrist-mobility",
      name: "시티드 손목 가동성",
      englishName: "Seated Wrist Mobility",
      category: "모빌리티",
      regions: ["팔"],
      focus: "가동성",
      difficulty: "입문",
      equipment: "안정된 의자 · 테이블 선택",
      minutes: "좌우 6–10회 · 1–2세트",
      description:
        "앉은 자세에서 팔꿈치를 편안히 지지하고 손목을 작은 범위로 굽혔다 펴며 전완·손목의 부담을 낮추는 가동성 탐색입니다.",
      cues: [
        "통증 없는 작은 범위부터",
        "팔꿈치와 어깨를 편안히 지지",
        "반동 없이 천천히 왕복",
      ],
      benefits: ["손목 위치 인식", "전완 긴장 완화", "그립 운동 전 준비"],
      warning:
        "외상 뒤 변형·급성 붓기·감각 저하·뚜렷한 힘 빠짐이 있으면 자가 운동보다 의료 평가를 우선하세요.",
      reference: {
        label: "ACSM 2026 저항운동 지침",
        url: "https://acsm.org/resistance-training-guidelines-update-2026/",
      },
    },
    detail: {
      setup: [
        "의자와 팔 지지면이 흔들리지 않는지 확인",
        "손목을 중립에 두고 아주 작은 범위 선택",
        "각 방향을 빈손으로 한 번씩 리허설",
      ],
      finish: "손을 편안히 펴고 저림·붓기·다음 날 반응을 확인합니다.",
      commonMistakes: [
        "가동 범위를 억지로 끝까지 밀기",
        "통증·저림을 스트레칭으로 오해",
        "손바닥에 체중을 과하게 싣기",
      ],
      regressions: [
        "지지면 없이 공중에서 작은 움직임",
        "반복 절반으로 줄이기",
        "따뜻한 물 뒤 편안한 범위",
      ],
      progressions: [
        "반복 소폭 증가",
        "가벼운 전완 회전 추가",
        "다음 날 편안할 때만 그립 운동 재개",
      ],
    },
  },
  {
    exercise: {
      id: "pool-easy-swim",
      name: "이지 수영",
      englishName: "Easy Pool Swim",
      category: "유산소",
      regions: ["등", "어깨", "코어", "하체"],
      focus: "심폐",
      difficulty: "입문",
      equipment: "안전 관리가 되는 수영장 · 수경 선택",
      minutes: "10–20분 · 쉬는 구간 포함",
      description:
        "감시 인력·동반자·수심이 확인된 수영장에서 짧은 길이를 편안한 호흡으로 반복하는 저강도 수중 유산소 운동입니다.",
      cues: [
        "혼자 수영하지 않고 안전 구역에서 시작",
        "한 길이 뒤 충분히 호흡·휴식",
        "숨참·어지러움이 오기 전 물 밖에서 쉬기",
      ],
      benefits: ["저충격 심폐 활동", "전신 협응", "호흡 리듬 탐색"],
      warning:
        "수영 능력·수심·감시 인력이 불확실하거나 숨참·흉통·어지러움이 있으면 물에 들어가지 말고 즉시 도움을 요청하세요.",
      reference: {
        label: "American Red Cross 수영 안전 안내",
        url: "https://www.redcross.org/get-help/how-to-prepare-for-emergencies/types-of-emergencies/water-safety/swim-safety.html",
      },
    },
    detail: {
      setup: [
        "수심·감시 인력·동반자·수영장 규칙 확인",
        "얕고 익숙한 구간에서 한 길이만 리허설",
        "물 밖 휴식 위치와 호흡 상태 확인",
      ],
      finish:
        "벽을 잡고 호흡을 충분히 낮춘 뒤 천천히 물 밖으로 나와 어지러움을 확인합니다.",
      commonMistakes: [
        "혼자 또는 익숙하지 않은 수심에서 시작",
        "숨이 차도 길이를 끝까지 고집",
        "피로 후 수영장 가장자리를 무리하게 넘음",
      ],
      regressions: [
        "수중 걷기",
        "짧은 길이와 긴 휴식",
        "킥판·안전 교육 하의 기술 연습",
      ],
      progressions: [
        "편안한 길이 1회만 추가",
        "휴식은 유지한 채 총 시간 소폭 증가",
        "안전 관리가 되는 환경에서만 다음 단계",
      ],
    },
  },
  {
    exercise: {
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
      reference: {
        label: "CDC 균형·근력·일상 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/older-adults.html",
      },
    },
    detail: {
      setup: [
        "계단·난간·신발 바닥 상태 확인",
        "한 손으로 난간을 가볍게 지지",
        "낮은 한 칸에서 한 번 리허설",
      ],
      finish: "양발을 평지에 두고 호흡과 무릎·발목 반응을 확인합니다.",
      commonMistakes: [
        "난간을 세게 당김",
        "발끝만 계단에 올림",
        "내려올 때 급하게 떨어짐",
      ],
      regressions: ["평지 체중 이동", "의자 앉았다 일어나기", "더 낮은 단차"],
      progressions: [
        "반복 1회 증가",
        "난간 지지 소폭 줄이기",
        "다음 날 편안할 때만 한 세트 추가",
      ],
    },
  },
  {
    exercise: {
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
      reference: {
        label: "CDC 균형·근력·일상 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/older-adults.html",
      },
    },
    detail: {
      setup: [
        "낮은 계단·난간·착지 공간 확인",
        "난간 가까이에서 선 자세 만들기",
        "한 발을 바닥에 살짝 대는 리허설",
      ],
      finish: "양발을 평지에 두고 균형을 되찾은 뒤 다음 쪽으로 전환합니다.",
      commonMistakes: [
        "무릎이 안쪽으로 무너짐",
        "발끝으로 세게 착지",
        "난간에서 멀리 시작",
      ],
      regressions: [
        "제자리 체중 이동",
        "스텝업만 수행",
        "더 높은 지지로 범위 줄이기",
      ],
      progressions: [
        "반복 1회 증가",
        "착지 정지 1초",
        "안정된 날 한 세트 추가",
      ],
    },
  },
  {
    exercise: {
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
      reference: {
        label: "ACSM 저항운동 지침",
        url: "https://acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines/",
      },
    },
    detail: {
      setup: [
        "카운터·벽이 미끄럽지 않고 안정적인지 확인",
        "손을 어깨 너비에 두고 몸을 긴 선으로",
        "짧은 범위의 가벼운 리허설",
      ],
      finish: "벽을 짚고 천천히 선 자세로 돌아와 손목·어깨 반응을 확인합니다.",
      commonMistakes: [
        "엉덩이가 과하게 처짐",
        "팔꿈치를 몸 옆으로 과도하게 붙임",
        "지지면 미끄러짐을 무시",
      ],
      regressions: ["벽 푸시업", "더 높은 지지면", "반복 절반"],
      progressions: [
        "카운터 높이 소폭 낮추기",
        "반복 1–2회 증가",
        "느린 복귀 구간",
      ],
    },
  },
  {
    exercise: {
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
      reference: {
        label: "ACSM 저항운동 지침",
        url: "https://acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines/",
      },
    },
    detail: {
      setup: [
        "가벼운 물체·평평한 경로·방향 전환 공간 확인",
        "물체를 몸 가까이에 들고 선 자세 확인",
        "5걸음 미만의 짧은 경로부터",
      ],
      finish:
        "물체를 안정된 지지면에 내려두고 어깨·허리·그립 반응을 확인합니다.",
      commonMistakes: [
        "몸통을 물체 쪽으로 기울임",
        "급하게 방향 전환",
        "피로해도 거리를 고집",
      ],
      regressions: ["맨몸 보행", "양손의 더 가벼운 물체", "5걸음 경로"],
      progressions: [
        "거리 소폭 증가",
        "반대쪽 교대",
        "다음 날 편안할 때만 부하 소폭 증가",
      ],
    },
  },
  {
    exercise: {
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
      reference: {
        label: "CDC 균형·근력·일상 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/older-adults.html",
      },
    },
    detail: {
      setup: [
        "의자를 벽에 붙여 흔들림 확인",
        "발을 바닥에 두고 한 번 천천히 일어서기",
        "팔 도달은 어깨 편안한 높이로",
      ],
      finish: "의자에 천천히 앉아 어지러움과 무릎·어깨 반응을 확인합니다.",
      commonMistakes: [
        "앉기 전에 팔부터 급히 뻗음",
        "의자 끝에 걸쳐 앉음",
        "균형을 잃은 채 반복",
      ],
      regressions: ["일어서기만 수행", "벽에 한 손 지지", "도달 범위 줄이기"],
      progressions: [
        "도달 방향 한 곳 추가",
        "반복 1회 증가",
        "지지 손 소폭 줄이기",
      ],
    },
  },
  {
    exercise: {
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
      reference: {
        label: "CDC 균형·근력·일상 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/older-adults.html",
      },
    },
    detail: {
      setup: [
        "의자·소파·매트·주변 공간 확인",
        "반무릎 자세를 지지대 가까이에서 리허설",
        "한 단계마다 멈춰 호흡 확인",
      ],
      finish: "안정된 의자에 앉아 호흡·무릎·고관절 반응을 충분히 확인합니다.",
      commonMistakes: [
        "지지대 없이 급하게 일어남",
        "통증을 넘겨 무릎 꿇음",
        "주변 물체·미끄러운 매트 미확인",
      ],
      regressions: [
        "반무릎 자세만 연습",
        "더 높은 지지면",
        "보조자·전문가와 연습",
      ],
      progressions: [
        "단계 하나만 더 연결",
        "좌우 교대",
        "다음 날 편안할 때만 반복 증가",
      ],
    },
  },
  {
    exercise: {
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
      reference: {
        label: "CDC 균형·근력·일상 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/older-adults.html",
      },
    },
    detail: {
      setup: [
        "벽·카운터·바닥 상태 확인",
        "한 손으로 지지하고 양발을 안정적으로",
        "작은 체중 이동부터 리허설",
      ],
      finish: "양발에 체중을 고르게 둔 채 시선·호흡·어지러움을 확인합니다.",
      commonMistakes: [
        "팔을 너무 멀리 뻗음",
        "발을 떼며 균형 상실",
        "지지대에서 멀리 섬",
      ],
      regressions: ["앉은 자세 도달", "아주 작은 범위", "양손 지지"],
      progressions: [
        "도달 범위 소폭 증가",
        "좌우 반복 1회",
        "한 손 지지 유지 시간 증가",
      ],
    },
  },
  {
    exercise: {
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
      reference: {
        label: "CDC 균형·근력·일상 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/older-adults.html",
      },
    },
    detail: {
      setup: [
        "의자가 움직이지 않는지 확인",
        "앉은 마치를 작게 2회 리허설",
        "일어서기 전 발 전체를 바닥에 두기",
      ],
      finish: "의자에 천천히 앉아 숨·무릎·균형 반응을 확인합니다.",
      commonMistakes: [
        "마치를 너무 높이 들어 몸통 흔들림",
        "어지러운 상태에서 일어남",
        "의자 가장자리에 불안정하게 앉음",
      ],
      regressions: ["앉은 마치만", "마치 횟수 절반", "한 손 지지 후 일어서기"],
      progressions: [
        "좌우 마치 1회 추가",
        "일어서기 반복 1회",
        "편안한 날 지지 손 줄이기",
      ],
    },
  },
  {
    exercise: {
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
      benefits: [
        "일상 물건 옮기기",
        "하체·몸통 협응",
        "안전한 들어올리기 인식",
      ],
      warning:
        "허리·어깨 통증, 가방 내용물 이동, 급한 비틀기, 무거운 물체가 있으면 실시하지 말고 더 가볍거나 도움을 사용하세요.",
      reference: {
        label: "ACSM 저항운동 지침",
        url: "https://acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines/",
      },
    },
    detail: {
      setup: [
        "아주 가벼운 가방·카운터·발밑 공간 확인",
        "가방을 몸 가까이 둔 채 들기 리허설",
        "방향 전환은 발을 옮겨서",
      ],
      finish:
        "가방을 카운터에 안정적으로 둔 뒤 허리·어깨·그립 반응을 확인합니다.",
      commonMistakes: [
        "허리만 굽혀 가방 들기",
        "물체를 몸에서 멀리 둠",
        "들고 비틀어 방향 전환",
      ],
      regressions: ["빈손 힌지", "더 가벼운 가방", "더 높은 카운터"],
      progressions: [
        "반복 1회 증가",
        "안정된 날 부하 소폭 증가",
        "운반 거리를 한 걸음만 추가",
      ],
    },
  },
  {
    exercise: {
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
      reference: {
        label: "NPS Hike Smart 안전 안내",
        url: "https://www.nps.gov/articles/hiking-safety.htm",
      },
    },
    detail: {
      setup: [
        "날씨·지면·경사·귀가 경로 확인",
        "평지에서 2–3분 편안히 걷기",
        "완만한 짧은 경사만 선택",
      ],
      finish: "평지에서 속도를 낮추고 호흡·무릎·발목 반응을 확인합니다.",
      commonMistakes: [
        "평지 속도를 그대로 유지",
        "대화가 안 될 때도 경사 고집",
        "내리막을 급하게 내려감",
      ],
      regressions: ["평지 걷기", "경사 구간 절반", "더 긴 휴식"],
      progressions: [
        "경사 시간 1–2분 증가",
        "같은 경사에서 리듬 안정",
        "다음 날 편안할 때만 거리 증가",
      ],
    },
  },
  {
    exercise: {
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
      reference: {
        label: "NPS Hike Smart 안전 안내",
        url: "https://www.nps.gov/articles/hiking-safety.htm",
      },
    },
    detail: {
      setup: [
        "건조한 짧은 내리막·신발·탈출 경로 확인",
        "평지에서 짧은 보폭 리허설",
        "첫 5걸음은 아주 천천히",
      ],
      finish: "평지에서 멈춰 호흡·무릎·발목·균형 반응을 확인합니다.",
      commonMistakes: [
        "큰 보폭으로 발뒤꿈치만 강하게 착지",
        "시선을 발끝에만 고정",
        "피곤한 상태에서 하강 연습",
      ],
      regressions: ["평지 보행", "더 완만한 경사", "난간·폴이 있는 경로"],
      progressions: [
        "걸음 5회 증가",
        "정지 없이 짧은 구간 연결",
        "지면이 건조할 때만 경사 소폭 증가",
      ],
    },
  },
  {
    exercise: {
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
      reference: {
        label: "NPS Hike Smart 안전 안내",
        url: "https://www.nps.gov/articles/hiking-safety.htm",
      },
    },
    detail: {
      setup: [
        "폴 길이·잠금·팁·손목끈 확인",
        "평지의 넓은 공간 선택",
        "반대손·반대발 리듬을 5걸음 리허설",
      ],
      finish:
        "폴을 안전히 들고 평지에서 멈춰 손목·어깨·주변 간격을 확인합니다.",
      commonMistakes: [
        "잠금 확인 없이 체중 싣기",
        "폴을 너무 멀리 앞에 찍기",
        "혼잡한 길에서 폴 끝을 휘두르기",
      ],
      regressions: ["폴 없이 평지 걷기", "한 손은 폴을 들기만", "5걸음 리듬"],
      progressions: [
        "거리 소폭 증가",
        "완만한 경사에서 리듬 유지",
        "다음 날 손목·어깨가 편안할 때만 지형 변화",
      ],
    },
  },
  {
    exercise: {
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
      reference: {
        label: "NPS Hike Smart 안전 안내",
        url: "https://www.nps.gov/articles/hiking-safety.htm",
      },
    },
    detail: {
      setup: [
        "낮고 고정된 선·막대와 넓은 공간 확인",
        "지지대 가까이에서 한 발 들기 리허설",
        "장애물을 넘긴 뒤 1초 멈추기",
      ],
      finish: "양발을 평지에 두고 발목·무릎·균형 반응을 확인합니다.",
      commonMistakes: [
        "높은 장애물을 서둘러 넘기기",
        "발을 끌며 통과",
        "넘긴 뒤 균형 확인 없이 다음 반복",
      ],
      regressions: ["벽 지지 제자리 마치", "바닥 선 넘기", "낮은 반복 수"],
      progressions: [
        "반대쪽 1회 추가",
        "정지 2초 유지",
        "고정된 장애물 높이 소폭 증가",
      ],
    },
  },
  {
    exercise: {
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
      reference: {
        label: "NPS Hike Smart 안전 안내",
        url: "https://www.nps.gov/articles/hiking-safety.htm",
      },
    },
    detail: {
      setup: [
        "배낭 무게·끈·날씨·물 확인",
        "양쪽 끈을 균등하게 조절",
        "평지 5분 걷기부터",
      ],
      finish: "배낭을 벗고 어깨·허리·피로·수분 상태를 확인합니다.",
      commonMistakes: [
        "무거운 물건을 몸에서 멀리 넣음",
        "한쪽 끈만 메기",
        "더위·피로 신호를 무시",
      ],
      regressions: ["빈 배낭 보행", "평지·5분", "물·휴식 위치 가까이"],
      progressions: [
        "시간 2–3분 증가",
        "같은 무게로 완만한 경사",
        "다음 날 편안할 때만 무게 소폭 조절",
      ],
    },
  },
  {
    exercise: {
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
      reference: {
        label: "WHO 신체 활동 일반 안내",
        url: "https://www.who.int/news-room/fact-sheets/detail/physical-activity",
      },
    },
    detail: {
      setup: [
        "실내 자전거의 고정·페달·저항 확인",
        "낮은 저항의 앉은 페달링 2분",
        "5초 미만의 짧은 전환 선택",
      ],
      finish: "안장에 앉아 저항을 낮춘 뒤 호흡·무릎·손목 반응을 확인합니다.",
      commonMistakes: [
        "야외 주행 중 처음 시도",
        "핸들에 체중을 매달림",
        "높은 저항에서 급하게 일어남",
      ],
      regressions: ["앉은 페달링", "엉덩이만 살짝 띄우기", "5초 미만"],
      progressions: [
        "시간 2초 증가",
        "반복 1회 추가",
        "안정된 실내 환경에서만",
      ],
    },
  },
  {
    exercise: {
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
      reference: {
        label: "WHO 신체 활동 일반 안내",
        url: "https://www.who.int/news-room/fact-sheets/detail/physical-activity",
      },
    },
    detail: {
      setup: [
        "차량 없는 평지·브레이크·타이어 확인",
        "자전거 옆에서 핸들을 안정적으로 잡기",
        "짧게 걷고 멈추기 리허설",
      ],
      finish: "자전거를 세워 두고 브레이크·타이어·주변 경로를 다시 확인합니다.",
      commonMistakes: [
        "차량 가까이에서 점검",
        "주행 중 장비 조정",
        "브레이크 이상을 무시",
      ],
      regressions: ["정지 상태 점검", "10m 보행", "보조자와 확인"],
      progressions: [
        "거리 소폭 증가",
        "안전한 방향 전환",
        "장비 이상 없을 때만 탑승",
      ],
    },
  },
  {
    exercise: {
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
      reference: {
        label: "American Red Cross 수영 안전",
        url: "https://www.redcross.org/get-help/how-to-prepare-for-emergencies/types-of-emergencies/water-safety/swim-safety.html",
      },
    },
    detail: {
      setup: [
        "감시·동반자·수심·휴식 위치 확인",
        "얕은 구간에서 벽을 잡고 호흡 확인",
        "짧은 글라이드 1회만",
      ],
      finish:
        "벽 또는 바닥 지지로 돌아와 호흡을 충분히 낮춘 뒤 물 밖에서 어지러움을 확인합니다.",
      commonMistakes: [
        "혼자 또는 익숙하지 않은 수심에서 시작",
        "숨참 후에도 계속 진행",
        "긴 거리 글라이드를 고집",
      ],
      regressions: ["수중 걷기", "벽 잡고 몸통 정렬", "아주 짧은 글라이드"],
      progressions: [
        "편안한 글라이드 1회 추가",
        "휴식 유지",
        "감시·동반 환경에서만",
      ],
    },
  },
  {
    exercise: {
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
      reference: {
        label: "American Red Cross 수영 안전",
        url: "https://www.redcross.org/get-help/how-to-prepare-for-emergencies/types-of-emergencies/water-safety/swim-safety.html",
      },
    },
    detail: {
      setup: [
        "감시·동반자·수심·킥보드 상태 확인",
        "벽 가까이에서 작은 킥 리허설",
        "한 길이보다 짧은 구간부터",
      ],
      finish: "벽을 잡고 호흡을 낮춘 뒤 어지러움·경련·피로를 확인합니다.",
      commonMistakes: [
        "킥보드에 상체 체중을 과하게 싣기",
        "숨이 차도 끝까지 진행",
        "혼자 수영",
      ],
      regressions: ["수중 걷기", "벽 잡고 작은 킥", "짧은 구간·긴 휴식"],
      progressions: [
        "편안한 거리 소폭 증가",
        "휴식 유지",
        "안전 관리가 되는 환경에서만",
      ],
    },
  },
  {
    exercise: {
      id: "single-leg-hip-hinge-support",
      name: "지지 싱글 레그 힙 힌지",
      englishName: "Supported Single-Leg Hip Hinge",
      category: "맨몸운동",
      regions: ["둔근", "하체", "코어"],
      focus: "균형",
      difficulty: "중급",
      equipment: "벽 또는 의자",
      minutes: "좌우 4–6회 · 2세트",
      description:
        "한 손으로 지지하며 엉덩이를 뒤로 보내는 편측 힌지·균형 변형입니다.",
      cues: ["지지대 가까이", "골반 정면", "작은 범위"],
      benefits: ["편측 힌지", "둔근 제어", "균형"],
      warning: "균형 상실·허리 통증·어지러움이 있으면 양발 힌지로 낮추세요.",
      reference: {
        label: "ACSM 저항·신체활동 일반 지침",
        url: "https://acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines/",
      },
    },
    detail: {
      setup: ["벽·의자 지지 확인", "양발 힌지 리허설", "작은 범위"],
      finish: "양발로 서서 균형·허리 반응을 확인합니다.",
      commonMistakes: ["골반을 열기", "지지대에 매달림", "범위 과도"],
      regressions: ["양발 힌지", "발끝 보조", "더 작은 범위"],
      progressions: ["반복 증가", "지지 줄이기", "느린 복귀"],
    },
  },
  {
    exercise: {
      id: "treadmill-incline-easy",
      name: "트레드밀 인클라인",
      englishName: "Treadmill Incline",
      category: "러닝",
      regions: ["하체", "둔근", "코어"],
      focus: "심폐",
      difficulty: "입문",
      equipment: "트레드밀",
      minutes: "2–5분 · 대화 가능한 강도",
      description:
        "낮은 경사와 편안한 보행 속도에서 경사 보행 리듬을 익히는 트레드밀 변형입니다.",
      cues: ["낮은 경사부터", "난간에 매달리지 않기", "대화 가능한 속도"],
      benefits: ["경사 적응", "심폐 활동", "둔근·하체 지구력"],
      warning:
        "벨트 속도·경사가 불편하거나 어지러움·통증이 있으면 즉시 정지하고 평지 보행으로 바꾸세요.",
      reference: {
        label: "ACSM 저항·신체활동 일반 지침",
        url: "https://acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines/",
      },
    },
    detail: {
      setup: ["안전 클립·벨트·경사 확인", "평지 걷기 2분", "낮은 경사"],
      finish: "경사·속도를 낮춰 평지 걷기로 마무리합니다.",
      commonMistakes: ["난간 매달림", "경사 급증", "벨트 위 시선 고정"],
      regressions: ["평지 걷기", "더 낮은 경사", "짧은 시간"],
      progressions: ["시간 1분 증가", "경사 소폭", "속도는 유지"],
    },
  },
  {
    exercise: {
      id: "machine-leg-press-easy",
      name: "머신 레그 프레스",
      englishName: "Machine Leg Press",
      category: "헬스기구",
      regions: ["하체", "둔근"],
      focus: "근력",
      difficulty: "입문",
      equipment: "레그 프레스 머신",
      minutes: "6–10회 · 2세트",
      description:
        "가벼운 중량과 짧은 범위에서 발 위치·등 지지·무릎 경로를 익히는 기구 하체 운동입니다.",
      cues: ["시트·핀 확인", "발 전체로 플랫폼 누르기", "무릎 잠그지 않기"],
      benefits: ["하체 근력", "기구 적응", "스쿼트 대체"],
      warning:
        "무릎·허리 통증, 안전장치 미확인, 너무 깊은 범위가 있으면 중단하고 중량·범위를 낮추세요.",
      reference: {
        label: "ACSM 저항·신체활동 일반 지침",
        url: "https://acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines/",
      },
    },
    detail: {
      setup: ["시트·핀·안전장치 확인", "가벼운 중량 리허설", "짧은 범위"],
      finish: "안전장치를 잠그고 무릎·허리 반응을 확인합니다.",
      commonMistakes: ["무릎 잠금", "허리 들림", "깊이를 과도하게"],
      regressions: ["더 가벼운 중량", "짧은 범위", "월 싯"],
      progressions: ["반복 증가", "느린 복귀", "중량 한 단계"],
    },
  },
  {
    exercise: {
      id: "knee-pushup-easy",
      name: "니 푸시업",
      englishName: "Knee Push-up",
      category: "맨몸운동",
      regions: ["가슴", "팔", "코어"],
      focus: "근력",
      difficulty: "입문",
      equipment: "매트",
      minutes: "4–8회 · 2세트",
      description:
        "무릎을 지지해 몸통을 길게 유지하며 수행하는 낮은 부하 푸시업 변형입니다.",
      cues: ["머리부터 무릎까지 길게", "팔꿈치 45도", "통증 없는 범위"],
      benefits: ["상체 밀기", "푸시업 진행 준비", "몸통 긴장 인식"],
      warning: "손목·어깨 통증이 있으면 높은 지지면 푸시업으로 바꾸세요.",
      reference: {
        label: "ACSM 저항·신체활동 일반 지침",
        url: "https://acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines/",
      },
    },
    detail: {
      setup: ["매트·손 위치 확인", "몸통 길게", "작은 범위 리허설"],
      finish: "손을 짚고 천천히 일어나 손목·어깨를 확인합니다.",
      commonMistakes: ["골반 처짐", "팔꿈치 과도하게 벌림", "통증 무시"],
      regressions: ["벽 푸시업", "높은 지지면", "반복 절반"],
      progressions: ["반복 1회 증가", "느린 복귀", "지지면 낮추기"],
    },
  },
  {
    exercise: {
      id: "side-plank-knee",
      name: "사이드 플랭크 니",
      englishName: "Knee Side Plank",
      category: "맨몸운동",
      regions: ["코어", "둔근", "어깨"],
      focus: "협응",
      difficulty: "입문",
      equipment: "매트",
      minutes: "10–20초 · 좌우 2회",
      description:
        "무릎을 굽혀 지지하는 옆 플랭크로 옆몸통과 골반 제어를 익힙니다.",
      cues: ["팔꿈치를 어깨 아래", "골반을 짧게 들어올리기", "목 힘 빼기"],
      benefits: ["옆몸통 제어", "골반 안정성", "어깨 지지 준비"],
      warning: "어깨·허리 통증이 있으면 옆으로 누운 호흡으로 낮추세요.",
      reference: {
        label: "ACSM 저항·신체활동 일반 지침",
        url: "https://acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines/",
      },
    },
    detail: {
      setup: ["팔꿈치·무릎 지지 확인", "짧은 골반 들기", "호흡 유지"],
      finish: "옆으로 누워 어깨·허리 반응을 확인합니다.",
      commonMistakes: ["어깨를 으쓱", "골반 처짐", "목 긴장"],
      regressions: ["옆으로 누운 호흡", "짧은 유지", "무릎 더 굽힘"],
      progressions: ["5초 증가", "반복 추가", "윗다리 펴기"],
    },
  },
  {
    exercise: {
      id: "supported-split-squat",
      name: "지지 스플릿 스쿼트",
      englishName: "Supported Split Squat",
      category: "맨몸운동",
      regions: ["하체", "둔근", "코어"],
      focus: "근력",
      difficulty: "입문",
      equipment: "벽 또는 단단한 의자",
      minutes: "좌우 5–8회 · 2세트",
      description:
        "벽 또는 의자를 가볍게 잡고 짧은 범위에서 앞발로 바닥을 누르며 편측 하체 패턴을 익힙니다.",
      cues: [
        "지지대는 균형 보조만",
        "짧은 보폭·작은 범위",
        "앞발 전체로 지면 누르기",
      ],
      benefits: ["편측 하체 근력", "균형", "런지 준비"],
      warning:
        "무릎·고관절 통증, 균형 상실, 체중 부하 불가가 있으면 벽 지지 체중 이동으로 낮추세요.",
      reference: {
        label: "ACSM 저항·신체활동 일반 지침",
        url: "https://acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines/",
      },
    },
    detail: {
      setup: [
        "벽·의자 지지와 발 간격 확인",
        "짧은 체중 이동 리허설",
        "통증 없는 깊이만",
      ],
      finish: "양발을 모아 균형·무릎 반응을 확인합니다.",
      commonMistakes: [
        "지지대를 당김",
        "무릎 통증을 넘김",
        "깊이를 급하게 늘림",
      ],
      regressions: ["체중 이동", "더 짧은 범위", "양손 지지"],
      progressions: ["반복 1회 증가", "지지 줄이기", "깊이 소폭 증가"],
    },
  },
  {
    exercise: {
      id: "dead-bug-heel-tap",
      name: "데드 버그 힐 탭",
      englishName: "Dead Bug Heel Tap",
      category: "맨몸운동",
      regions: ["코어", "하체"],
      focus: "협응",
      difficulty: "입문",
      equipment: "매트",
      minutes: "좌우 4–8회 · 2세트",
      description:
        "누운 자세에서 한쪽 발뒤꿈치를 바닥에 가볍게 터치하며 호흡과 몸통 제어를 연습합니다.",
      cues: ["갈비뼈·골반을 편안히", "허리 통증 없는 범위", "내쉬며 발 내리기"],
      benefits: ["몸통 제어", "호흡 협응", "허리 부담 조절"],
      warning: "허리 통증·저림이 커지면 다리 이동 범위를 줄이거나 중단하세요.",
      reference: {
        label: "ACSM 저항·신체활동 일반 지침",
        url: "https://acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines/",
      },
    },
    detail: {
      setup: ["매트·호흡 확인", "무릎 굽힌 기본 자세", "한쪽 발만 작은 범위로"],
      finish: "양발을 바닥에 두고 호흡·허리 반응을 확인합니다.",
      commonMistakes: ["허리 통증을 무시", "숨 참기", "다리를 너무 멀리 뻗음"],
      regressions: ["발 고정 호흡", "한쪽 팔만 이동", "범위 절반"],
      progressions: ["좌우 반복 증가", "천천히 내리기", "한 변수만 증가"],
    },
  },
  {
    exercise: {
      id: "prone-w-pull",
      name: "프론 W 풀",
      englishName: "Prone W Pull",
      category: "맨몸운동",
      regions: ["등", "어깨", "팔"],
      focus: "협응",
      difficulty: "입문",
      equipment: "매트 또는 벤치",
      minutes: "5–8회 · 2세트",
      description:
        "엎드린 자세에서 팔꿈치를 W 모양으로 당기며 목 힘을 빼고 등 상부의 가벼운 조절을 연습합니다.",
      cues: ["이마·목 편안히", "팔을 높이 들지 않기", "견갑을 가볍게 뒤로"],
      benefits: ["등 상부 조절", "당기기 기초", "어깨 자세 인식"],
      warning:
        "어깨 앞쪽 통증·목 통증·저림이 있으면 벽 로우 또는 밴드 로우로 전환하세요.",
      reference: {
        label: "ACSM 저항·신체활동 일반 지침",
        url: "https://acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines/",
      },
    },
    detail: {
      setup: ["매트·목 편안함 확인", "팔꿈치 W 위치", "아주 작은 당기기"],
      finish: "팔을 내려 목·어깨·저림 반응을 확인합니다.",
      commonMistakes: ["목을 젖힘", "팔을 높이 들기", "어깨 통증 무시"],
      regressions: ["벽 W 슬라이드", "더 작은 범위", "반복 절반"],
      progressions: ["반복 1회 증가", "정지 1초", "범위 소폭 증가"],
    },
  },
  {
    exercise: {
      id: "bodyweight-good-morning",
      name: "맨몸 굿모닝",
      englishName: "Bodyweight Good Morning",
      category: "맨몸운동",
      regions: ["둔근", "하체", "코어"],
      focus: "협응",
      difficulty: "입문",
      equipment: "평평한 바닥",
      minutes: "6–10회 · 2세트",
      description:
        "손을 가슴 앞에 가볍게 두고 엉덩이를 뒤로 보내는 작은 힙 힌지를 연습합니다.",
      cues: [
        "허리보다 엉덩이를 뒤로",
        "발 전체로 바닥 누르기",
        "통증 없는 작은 범위",
      ],
      benefits: ["힌지 패턴", "둔근·하체 협응", "들기 동작 준비"],
      warning: "허리 통증·어지러움·저림이 있으면 범위를 줄이거나 중단하세요.",
      reference: {
        label: "ACSM 저항·신체활동 일반 지침",
        url: "https://acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines/",
      },
    },
    detail: {
      setup: [
        "평평한 바닥·발 위치 확인",
        "빈손으로 작은 힌지 리허설",
        "호흡을 멈추지 않고 시작",
      ],
      finish: "선 자세에서 호흡을 정리하고 허리·둔근 반응을 확인합니다.",
      commonMistakes: ["허리만 굽힘", "무릎을 과하게 잠금", "통증을 넘는 깊이"],
      regressions: ["벽 힌지", "더 작은 범위", "의자 가까이"],
      progressions: [
        "반복 1회 증가",
        "정지 1초",
        "다음 날 편안할 때만 범위 증가",
      ],
    },
  },
  {
    exercise: {
      id: "incline-plank-shoulder-tap",
      name: "인클라인 플랭크 숄더 탭",
      englishName: "Incline Plank Shoulder Tap",
      category: "맨몸운동",
      regions: ["코어", "어깨", "팔"],
      focus: "협응",
      difficulty: "입문",
      equipment: "단단한 카운터 또는 벽",
      minutes: "좌우 4–8회 · 2세트",
      description:
        "높은 지지면에서 몸통을 길게 유지하며 반대쪽 어깨를 가볍게 터치합니다.",
      cues: ["높은 지지면부터", "골반 흔들림 줄이기", "손목이 편안한 범위"],
      benefits: ["코어·어깨 협응", "상체 지지 준비", "교대 안정성"],
      warning:
        "손목·어깨 통증, 지지면 미끄러짐, 몸통 제어 상실이 있으면 벽 지지로 낮추세요.",
      reference: {
        label: "ACSM 저항·신체활동 일반 지침",
        url: "https://acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines/",
      },
    },
    detail: {
      setup: [
        "지지면·손목·발 위치 확인",
        "높은 지지면에서 플랭크 만들기",
        "작은 탭 1회 리허설",
      ],
      finish: "지지면을 짚고 천천히 선 자세로 돌아와 손목·어깨를 확인합니다.",
      commonMistakes: [
        "골반을 크게 흔듦",
        "지지면 미끄러짐 무시",
        "어깨 통증을 넘김",
      ],
      regressions: ["벽 지지 탭", "양손 정지 플랭크", "반복 절반"],
      progressions: ["반복 1회 증가", "지지면 소폭 낮추기", "느린 탭"],
    },
  },
  {
    exercise: {
      id: "recovery-jog-walk",
      name: "리커버리 조그·워크",
      englishName: "Recovery Jog-Walk",
      category: "러닝",
      regions: ["하체", "둔근", "코어"],
      focus: "심폐",
      difficulty: "입문",
      equipment: "평평하고 안전한 경로",
      minutes: "30초 조깅 + 90초 걷기 · 4–6회",
      description:
        "말하기가 가능한 매우 느린 조깅과 충분한 걷기를 번갈아 수행하는 보수적 러닝 재도입입니다.",
      cues: [
        "조깅은 대화 가능한 속도",
        "걷기에서 호흡 회복",
        "통증 전 즉시 감속",
      ],
      benefits: ["러닝 재도입", "심폐 적응", "페이스 조절"],
      warning:
        "날카로운 통증·흉통·어지러움·비정상적 숨참이 있으면 중단하고 평가를 우선하세요.",
      reference: {
        label: "ACSM 저항·신체활동 일반 지침",
        url: "https://acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines/",
      },
    },
    detail: {
      setup: [
        "평지·날씨·귀가 경로 확인",
        "걷기 3분으로 시작",
        "30초 이하 조깅 선택",
      ],
      finish: "걷기 2분 이상으로 호흡을 낮추고 통증·어지러움을 확인합니다.",
      commonMistakes: [
        "조깅을 질주로 바꿈",
        "호흡 회복 전 재시작",
        "통증 신호 무시",
      ],
      regressions: ["걷기만", "15초 조깅", "휴식 증가"],
      progressions: ["조깅 15초 증가", "구간 1회 추가", "다음 날 편안할 때만"],
    },
  },
  {
    exercise: {
      id: "machine-seated-row-easy",
      name: "머신 시티드 로우",
      englishName: "Machine Seated Row",
      category: "헬스기구",
      regions: ["등", "팔", "어깨"],
      focus: "근력",
      difficulty: "입문",
      equipment: "시티드 로우 머신",
      minutes: "6–10회 · 2–3세트",
      description:
        "가슴 또는 발 지지를 조절한 머신에서 가벼운 저항으로 견갑·팔의 당기기 경로를 연습합니다.",
      cues: ["시트·지지대 먼저 조절", "목을 으쓱하지 않기", "천천히 복귀"],
      benefits: ["등·팔 근력", "견갑 조절", "당기기 기초"],
      warning:
        "어깨·팔 저림·허리 통증·기구 조절 불가가 있으면 중단하고 더 가벼운 지지 로우로 바꾸세요.",
      reference: {
        label: "ACSM 저항·신체활동 일반 지침",
        url: "https://acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines/",
      },
    },
    detail: {
      setup: [
        "시트·지지대·핀 고정 확인",
        "가벼운 저항으로 당기기 리허설",
        "목·어깨 이완",
      ],
      finish: "핸들을 놓기 전 장력을 낮추고 등·어깨 반응을 확인합니다.",
      commonMistakes: ["몸통 반동", "어깨를 으쓱함", "핀·시트 미확인"],
      regressions: ["더 가벼운 중량", "짧은 범위", "밴드 로우"],
      progressions: ["반복 1회 증가", "정지 1초", "중량 한 단계만"],
    },
  },
  {
    exercise: {
      id: "quiet-step-touch",
      name: "콰이어트 스텝 터치",
      englishName: "Quiet Step Touch",
      category: "맨몸운동",
      regions: ["하체", "코어"],
      focus: "심폐",
      difficulty: "입문",
      equipment: "미끄럽지 않은 바닥",
      minutes: "30–60초 · 2–4회",
      description:
        "발을 바닥에서 낮게 끌듯 옆으로 옮기고 가볍게 터치하며 점프 없이 리듬을 만듭니다.",
      cues: ["발 낮게", "부드러운 착지", "작은 옆 이동"],
      benefits: ["저충격 심폐 리듬", "측면 협응", "워밍업"],
      warning:
        "발목·무릎·고관절 통증, 어지러움 또는 바닥 미끄러움이 있으면 제자리 체중 이동으로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["바닥·주변 공간 확인", "작은 옆 이동", "조용한 발 터치"],
      finish: "양발로 서서 발목·무릎·호흡 반응을 확인합니다.",
      commonMistakes: ["발을 세게 디딤", "이동 과도", "바닥 미끄러움 무시"],
      regressions: ["제자리 체중 이동", "시간 줄이기", "벽 지지"],
      progressions: ["시간 10초", "팔 리치 추가", "리듬 소폭"],
    },
  },
  {
    exercise: {
      id: "low-impact-skater-step",
      name: "로우 임팩트 스케이터 스텝",
      englishName: "Low-Impact Skater Step",
      category: "맨몸운동",
      regions: ["하체", "둔근", "코어"],
      focus: "협응",
      difficulty: "입문",
      equipment: "벽 또는 의자 선택",
      minutes: "좌우 6–12회 · 2세트",
      description:
        "점프 없이 한 발을 옆·뒤로 가볍게 터치하며 체중을 천천히 옮기는 저충격 측면 이동입니다.",
      cues: ["점프 금지", "작은 옆 이동", "발 조용히"],
      benefits: ["측면 둔근 제어", "저충격 협응", "균형"],
      warning:
        "무릎·발목·고관절 통증, 균형 상실 또는 바닥 미끄러움이 있으면 지지 레터럴 런지로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["바닥·지지대 확인", "작은 옆·뒤 탭", "천천히 체중 이동"],
      finish: "양발로 서서 발목·무릎·고관절 반응을 확인합니다.",
      commonMistakes: ["점프함", "보폭 과도", "무릎 무너짐"],
      regressions: ["지지 레터럴 런지", "범위 줄이기", "벽 지지"],
      progressions: ["반복 증가", "느린 이동", "정지 1초"],
    },
  },
  {
    exercise: {
      id: "standing-shadow-box-easy",
      name: "스탠딩 섀도 복싱",
      englishName: "Standing Shadow Boxing",
      category: "맨몸운동",
      regions: ["팔", "어깨", "코어", "하체"],
      focus: "심폐",
      difficulty: "입문",
      equipment: "주변 여유 공간",
      minutes: "20–45초 · 2–4회",
      description:
        "발을 고정하거나 조용히 체중을 옮긴 상태에서 낮은 힘의 펀치를 공중에 천천히 뻗습니다.",
      cues: ["팔꿈치 과신전 금지", "발 조용히", "어깨 이완"],
      benefits: ["저충격 심폐 리듬", "상체 협응", "스트레스 해소 보조"],
      warning:
        "어깨·팔꿈치·손목 통증, 어지러움 또는 주변 장애물이 있으면 팔 스윙 마치로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["주변 공간 확인", "팔꿈치 편안히", "낮은 힘의 펀치"],
      finish: "팔을 내리고 어깨·팔꿈치·호흡 반응을 확인합니다.",
      commonMistakes: ["팔꿈치 잠금", "발 세게 구름", "어깨 으쓱"],
      regressions: ["팔 스윙 마치", "범위 줄이기", "앉아서 수행"],
      progressions: ["시간 10초", "교차 리치", "리듬 소폭"],
    },
  },
  {
    exercise: {
      id: "quiet-squat-front-reach",
      name: "콰이어트 스쿼트 프런트 리치",
      englishName: "Quiet Squat Front Reach",
      category: "맨몸운동",
      regions: ["하체", "둔근", "코어", "어깨"],
      focus: "협응",
      difficulty: "입문",
      equipment: "벽 또는 의자 선택",
      minutes: "6–10회 · 2세트",
      description:
        "얕은 스쿼트에서 일어나며 팔을 앞쪽으로 조용히 뻗어 전신 협응을 연습합니다.",
      cues: ["얕은 스쿼트", "발 조용히", "팔은 편안히 뻗기"],
      benefits: ["하체 지구력", "전신 협응", "일상 일어서기"],
      warning:
        "무릎·고관절·어깨·허리 통증 또는 균형 상실이 있으면 의자 스쿼트와 팔 리치를 분리하세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["발·무릎 위치 확인", "얕은 스쿼트", "작은 앞 리치"],
      finish: "팔을 내리고 천천히 서서 무릎·허리·어깨 반응을 확인합니다.",
      commonMistakes: ["발 세게 디딤", "무릎 무너짐", "팔 과도하게 뻗음"],
      regressions: ["의자 스쿼트", "팔 리치 분리", "범위 줄이기"],
      progressions: ["반복 증가", "느린 하강", "정지 1초"],
    },
  },
  {
    exercise: {
      id: "wall-pushup-march-easy",
      name: "월 푸시업 마치",
      englishName: "Wall Push-up March",
      category: "맨몸운동",
      regions: ["가슴", "팔", "어깨", "코어", "하체"],
      focus: "협응",
      difficulty: "입문",
      equipment: "튼튼한 벽",
      minutes: "좌우 4–8회 · 2세트",
      description:
        "벽 푸시업을 마친 뒤 한쪽 무릎을 낮게 들어 조용히 멈추며 상체 밀기와 균형을 연결합니다.",
      cues: ["벽 상태 확인", "낮은 무릎 들기", "발 조용히"],
      benefits: ["상체 밀기", "교차 협응", "저충격 전신 연결"],
      warning:
        "손목·어깨·무릎 통증, 어지러움 또는 벽 미끄러움이 있으면 벽 푸시업과 마치를 분리하세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["벽·손목 확인", "벽 푸시업 리허설", "낮은 무릎 들기"],
      finish: "벽에서 물러나 손목·어깨·무릎·호흡 반응을 확인합니다.",
      commonMistakes: ["벽 미끄러움 무시", "무릎 너무 높이", "허리 처짐"],
      regressions: ["벽 푸시업", "벽 지지 마치", "동작 분리"],
      progressions: ["반복 증가", "느린 전환", "정지 1초"],
    },
  },
  {
    exercise: {
      id: "seated-knee-lift-punch-easy",
      name: "시티드 니 리프트 펀치",
      englishName: "Seated Knee Lift Punch",
      category: "맨몸운동",
      regions: ["코어", "하체", "팔", "어깨"],
      focus: "협응",
      difficulty: "입문",
      equipment: "안정된 의자",
      minutes: "좌우 6–10회 · 2세트",
      description:
        "안정된 의자에 앉아 한쪽 무릎을 낮게 들고 반대 팔을 가볍게 앞으로 뻗는 저소음 교차 동작입니다.",
      cues: ["의자 고정", "낮은 무릎 들기", "부드러운 팔 뻗기"],
      benefits: ["교차 협응", "코어 제어", "저충격 심폐 리듬"],
      warning:
        "의자 흔들림·허리·고관절·어깨 통증 또는 어지러움이 있으면 발을 바닥에 둔 팔 리치로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["의자 안정 확인", "낮은 무릎 들기", "부드러운 반대팔 리치"],
      finish: "발을 바닥에 두고 허리·고관절·어깨 반응을 확인합니다.",
      commonMistakes: ["의자 뒤로 기울기", "펀치 과도", "숨 참기"],
      regressions: ["앉은 팔 리치", "발 바닥 유지", "범위 줄이기"],
      progressions: ["반복 증가", "느린 교대", "유지 1초"],
    },
  },
  {
    exercise: {
      id: "slow-march-arm-sweep",
      name: "슬로 마치 암 스윕",
      englishName: "Slow March Arm Sweep",
      category: "맨몸운동",
      regions: ["하체", "코어", "어깨"],
      focus: "협응",
      difficulty: "입문",
      equipment: "벽 또는 의자 선택",
      minutes: "좌우 8–16회 · 2세트",
      description:
        "무릎을 낮게 교대로 들며 팔을 부드럽게 위·앞으로 쓸어 올려 소리 없이 전신 리듬을 만듭니다.",
      cues: ["낮은 무릎", "발 조용히", "팔 범위 편안히"],
      benefits: ["저충격 심폐 리듬", "보행 준비", "어깨 협응"],
      warning:
        "어지러움·균형 상실·고관절·무릎·어깨 통증이 있으면 벽 지지 마치로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["공간·지지대 확인", "낮은 마치", "작은 팔 스윕"],
      finish: "양발로 서서 어지러움·고관절·무릎·어깨 반응을 확인합니다.",
      commonMistakes: ["무릎 너무 높이", "팔 범위 과도", "발 세게 디딤"],
      regressions: ["벽 지지 마치", "앉은 팔 스윕", "범위 줄이기"],
      progressions: ["반복 증가", "지지 줄이기", "정지 1초"],
    },
  },
  {
    exercise: {
      id: "controlled-step-back-tap-support",
      name: "지지 컨트롤 스텝백 탭",
      englishName: "Supported Controlled Step-Back Tap",
      category: "맨몸운동",
      regions: ["하체", "둔근", "코어"],
      focus: "협응",
      difficulty: "입문",
      equipment: "벽 또는 의자",
      minutes: "좌우 5–10회 · 2세트",
      description:
        "한 손 지지에서 한 발을 조용히 뒤로 탭한 뒤 돌아오며 점프 없는 방향 전환을 연습합니다.",
      cues: ["지지대 가까이", "발 조용히 탭", "작은 뒤걸음"],
      benefits: ["하체 협응", "균형", "저충격 방향 전환"],
      warning:
        "무릎·고관절·발목 통증, 균형 상실 또는 바닥 미끄러움이 있으면 뒤 탭 범위를 줄이세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["지지대·바닥 확인", "작은 뒤 탭", "천천히 돌아오기"],
      finish: "양발로 서서 발목·무릎·고관절 반응을 확인합니다.",
      commonMistakes: ["발 세게 디딤", "뒤걸음 과도", "무릎 안쪽 붕괴"],
      regressions: ["제자리 발끝 탭", "범위 줄이기", "양손 지지"],
      progressions: ["반복 증가", "느린 이동", "정지 1초"],
    },
  },
  {
    exercise: {
      id: "side-to-side-toe-tap-quiet",
      name: "콰이어트 사이드 투 사이드 토 탭",
      englishName: "Quiet Side-to-Side Toe Tap",
      category: "맨몸운동",
      regions: ["하체", "둔근", "코어"],
      focus: "심폐",
      difficulty: "입문",
      equipment: "바닥 선·벽 선택",
      minutes: "좌우 20–40초 · 2–4회",
      description:
        "바닥 선 양쪽을 발끝으로 조용히 번갈아 탭하며 작은 체중 이동과 리듬을 연습합니다.",
      cues: ["낮은 발끝 탭", "발 조용히", "몸통 세우기"],
      benefits: ["저충격 심폐 리듬", "발목 인식", "측면 협응"],
      warning:
        "발목·무릎 통증, 어지러움 또는 바닥 미끄러움이 있으면 선 없이 체중 이동만 하세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["바닥 선·지지대 확인", "낮은 발끝 탭", "작은 체중 이동"],
      finish: "양발로 서서 발목·무릎·호흡 반응을 확인합니다.",
      commonMistakes: [
        "발 세게 디딤",
        "상체 흔들림 과도",
        "바닥 미끄러움 무시",
      ],
      regressions: ["선 없이 체중 이동", "시간 줄이기", "벽 지지"],
      progressions: ["시간 10초", "팔 리치", "리듬 소폭"],
    },
  },
  {
    exercise: {
      id: "quiet-hip-hinge-reach",
      name: "콰이어트 힙 힌지 리치",
      englishName: "Quiet Hip Hinge Reach",
      category: "맨몸운동",
      regions: ["하체", "둔근", "코어", "어깨"],
      focus: "협응",
      difficulty: "입문",
      equipment: "벽 또는 의자 선택",
      minutes: "6–10회 · 2세트",
      description:
        "엉덩이를 뒤로 보내는 작은 힌지와 앞쪽 팔 리치를 조용히 연결해 전신 후면 사슬을 연습합니다.",
      cues: ["엉덩이 뒤로", "등 길게", "발 조용히 고정"],
      benefits: ["힌지 패턴", "둔근 제어", "전신 협응"],
      warning:
        "허리·고관절·어깨 통증, 어지러움 또는 균형 상실이 있으면 벽 힌지로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["바닥·허리 반응 확인", "작은 벽 힌지", "앞 리치"],
      finish: "천천히 선 자세로 돌아와 허리·고관절·어깨 반응을 확인합니다.",
      commonMistakes: ["허리 둥글게", "발 세게 디딤", "리치 과도"],
      regressions: ["벽 힌지", "리치 생략", "범위 줄이기"],
      progressions: ["반복 증가", "느린 하강", "정지 1초"],
    },
  },
  {
    exercise: {
      id: "knee-supported-bear-shoulder-shift",
      name: "니 서포트 베어 숄더 시프트",
      englishName: "Knee-Supported Bear Shoulder Shift",
      category: "맨몸운동",
      regions: ["코어", "어깨", "팔", "하체"],
      focus: "협응",
      difficulty: "입문",
      equipment: "매트",
      minutes: "좌우 4–8회 · 2세트",
      description:
        "무릎을 매트에 둔 네발 자세에서 어깨를 한 손 쪽으로 아주 작게 옮겨 조용한 상체 지지를 연습합니다.",
      cues: ["무릎 지지", "작은 체중 이동", "손바닥 고르게"],
      benefits: ["어깨 안정", "코어 지지", "전신 준비"],
      warning:
        "손목·어깨·무릎·허리 통증 또는 손 미끄러짐이 있으면 네발 자세 정지로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["매트·손목 확인", "무릎 지지 네발 자세", "작은 어깨 이동"],
      finish: "무릎을 매트에 두고 손목·어깨·허리 반응을 확인합니다.",
      commonMistakes: ["골반 처짐", "손 미끄러짐 무시", "이동 과도"],
      regressions: ["네발 자세 홀드", "범위 줄이기", "손 이동 생략"],
      progressions: ["반복 증가", "느린 이동", "정지 1초"],
    },
  },
  {
    exercise: {
      id: "standing-hamstring-curl-tap-support",
      name: "지지 스탠딩 햄스트링 컬 탭",
      englishName: "Supported Standing Hamstring Curl Tap",
      category: "맨몸운동",
      regions: ["하체", "둔근", "코어"],
      focus: "근력",
      difficulty: "입문",
      equipment: "벽 또는 의자",
      minutes: "좌우 6–12회 · 2세트",
      description:
        "한 손 지지에서 뒤꿈치를 엉덩이 쪽으로 낮게 당겼다가 발끝을 조용히 바닥에 탭합니다.",
      cues: ["지지대 가까이", "작은 무릎 굽힘", "발 조용히"],
      benefits: ["햄스트링 제어", "한발 균형", "저충격 하체 지구력"],
      warning:
        "무릎·고관절·발목 통증 또는 균형 상실이 있으면 양발 힐 슬라이드로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["지지대·바닥 확인", "작은 무릎 굽힘", "조용한 발끝 탭"],
      finish: "양발로 서서 무릎·고관절·발목 반응을 확인합니다.",
      commonMistakes: ["허리 과신전", "발 세게 디딤", "무릎 통증 무시"],
      regressions: ["양발 힐 슬라이드", "범위 줄이기", "양손 지지"],
      progressions: ["반복 증가", "느린 복귀", "유지 1초"],
    },
  },
  {
    exercise: {
      id: "seated-wrist-radial-deviation-easy",
      name: "시티드 손목 요측 편위",
      englishName: "Seated Wrist Radial Deviation",
      category: "맨몸운동",
      regions: ["팔"],
      focus: "가동성",
      difficulty: "입문",
      equipment: "안정된 의자",
      minutes: "좌우 5–8회 · 1–2세트",
      description:
        "앉은 자세에서 손목을 엄지 쪽으로 아주 작게 옮겼다 돌아오며 손목 옆쪽의 편안한 범위 제어를 연습합니다.",
      cues: ["작은 범위", "팔꿈치 가까이", "천천히 복귀"],
      benefits: ["손목 위치 인식", "전완 조절", "손 부담 저감 준비"],
      warning:
        "손목 통증·저림·붓기·최근 외상이 있으면 수행하지 말고 전문 평가를 우선하세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["의자·손목 확인", "손목 중립", "작은 엄지 쪽 이동"],
      finish: "손을 편안히 펴고 손목·전완·저림 반응을 확인합니다.",
      commonMistakes: ["범위 과도", "팔꿈치 흔들림", "통증 무시"],
      regressions: ["범위 줄이기", "한 손씩", "손가락 이완"],
      progressions: ["반복 증가", "느린 복귀", "좌우 비교"],
    },
  },
  {
    exercise: {
      id: "seated-wrist-ulnar-deviation-easy",
      name: "시티드 손목 척측 편위",
      englishName: "Seated Wrist Ulnar Deviation",
      category: "맨몸운동",
      regions: ["팔"],
      focus: "가동성",
      difficulty: "입문",
      equipment: "안정된 의자",
      minutes: "좌우 5–8회 · 1–2세트",
      description:
        "앉은 자세에서 손목을 새끼손가락 쪽으로 아주 작게 옮겼다 돌아오며 전완의 편안한 움직임을 연습합니다.",
      cues: ["작은 범위", "손목 중립 근처", "천천히 복귀"],
      benefits: ["손목 가동성", "전완 인식", "그립 전 준비"],
      warning:
        "손목 통증·저림·붓기·최근 외상이 있으면 수행하지 말고 전문 평가를 우선하세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["의자·손목 확인", "손목 중립", "작은 새끼손가락 쪽 이동"],
      finish: "손을 편안히 펴고 손목·전완·저림 반응을 확인합니다.",
      commonMistakes: ["범위 과도", "손목 꺾임", "통증 무시"],
      regressions: ["범위 줄이기", "한 손씩", "손가락 이완"],
      progressions: ["반복 증가", "느린 복귀", "좌우 비교"],
    },
  },
  {
    exercise: {
      id: "seated-hand-tendon-glide-easy",
      name: "시티드 핸드 텐던 글라이드",
      englishName: "Seated Hand Tendon Glide",
      category: "맨몸운동",
      regions: ["팔"],
      focus: "가동성",
      difficulty: "입문",
      equipment: "없음",
      minutes: "각 손 4–6회 · 1–2세트",
      description:
        "앉아서 손가락을 편안히 펴기·갈고리 모양·부드러운 주먹 순서로 바꾸며 손가락의 낮은 강도 움직임을 연습합니다.",
      cues: ["천천히 모양 바꾸기", "힘주지 않기", "손목 편안히"],
      benefits: ["손가락 움직임", "그립 전 준비", "전완 긴장 인식"],
      warning:
        "손가락 통증·저림·붓기·잠김 또는 최근 외상이 있으면 중단하고 전문가 지침을 따르세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["손가락 편안히 펴기", "갈고리 모양", "부드러운 주먹"],
      finish: "손가락을 편안히 펴고 통증·저림·붓기 반응을 확인합니다.",
      commonMistakes: ["손 세게 쥠", "순서 급함", "통증 무시"],
      regressions: ["펴기만", "모양 1개", "한 손씩"],
      progressions: ["반복 증가", "느린 순서", "역순 진행"],
    },
  },
  {
    exercise: {
      id: "elbow-supported-hand-open-close-easy",
      name: "엘보 서포티드 핸드 오픈 클로즈",
      englishName: "Elbow Supported Hand Open-Close",
      category: "맨몸운동",
      regions: ["팔"],
      focus: "협응",
      difficulty: "입문",
      equipment: "테이블 또는 의자 팔걸이 선택",
      minutes: "각 손 6–10회 · 1–2세트",
      description:
        "팔꿈치를 지지한 상태에서 손을 천천히 펴고 가볍게 감으며 손목 부담을 줄인 손가락 협응을 연습합니다.",
      cues: ["팔꿈치 지지", "가볍게 펴고 감기", "손목 중립"],
      benefits: ["손가락 협응", "전완 부담 조절", "그립 준비"],
      warning:
        "통증·저림·붓기·감각 변화가 있으면 반복하지 말고 손을 편안히 쉬게 하세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["팔꿈치 지지", "손가락 편안히 펴기", "가볍게 감기"],
      finish: "손을 편안히 펴고 손가락·손목·팔꿈치 반응을 확인합니다.",
      commonMistakes: ["주먹 과도", "손목 꺾임", "저림 무시"],
      regressions: ["펴기만", "반복 줄이기", "한 손씩"],
      progressions: ["반복 증가", "느린 감기", "정지 1초"],
    },
  },
  {
    exercise: {
      id: "seated-heel-raise-easy",
      name: "시티드 힐 레이즈",
      englishName: "Seated Heel Raise",
      category: "맨몸운동",
      regions: ["하체"],
      focus: "근력",
      difficulty: "입문",
      equipment: "안정된 의자",
      minutes: "8–12회 · 2세트",
      description:
        "의자에 앉아 발 앞부분을 바닥에 두고 뒤꿈치를 천천히 들어 종아리와 발목의 저충격 제어를 연습합니다.",
      cues: ["발 앞부분 고정", "천천히 들어올리기", "반동 금지"],
      benefits: ["종아리 지구력", "발목 제어", "앉은 하체 활성"],
      warning:
        "발목 통증·종아리 경련·저림 또는 부기가 있으면 범위를 줄이거나 중단하세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["의자·발목 확인", "발 앞부분 지지", "천천히 뒤꿈치 들기"],
      finish: "뒤꿈치를 바닥에 두고 발목·종아리·무릎 반응을 확인합니다.",
      commonMistakes: ["반동", "발목 통증 무시", "발 앞부분 들림"],
      regressions: ["작은 범위", "한쪽씩", "발목 펌프"],
      progressions: ["반복 증가", "느린 내리기", "정지 1초"],
    },
  },
  {
    exercise: {
      id: "seated-toe-raise-easy",
      name: "시티드 토 레이즈",
      englishName: "Seated Toe Raise",
      category: "맨몸운동",
      regions: ["하체"],
      focus: "근력",
      difficulty: "입문",
      equipment: "안정된 의자",
      minutes: "8–12회 · 2세트",
      description:
        "의자에 앉아 뒤꿈치를 바닥에 두고 발끝을 천천히 들어 정강이 앞쪽과 발목 제어를 연습합니다.",
      cues: ["뒤꿈치 고정", "발끝 천천히", "작은 범위"],
      benefits: ["발목 앞쪽 제어", "보행 준비", "저충격 하체"],
      warning:
        "발목 통증·저림·경련 또는 부기가 있으면 범위를 줄이거나 중단하세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["의자·발목 확인", "뒤꿈치 지지", "천천히 발끝 들기"],
      finish: "발끝을 바닥에 두고 발목·정강이·무릎 반응을 확인합니다.",
      commonMistakes: ["반동", "발목 과신전", "통증 무시"],
      regressions: ["작은 범위", "한쪽씩", "발끝 탭"],
      progressions: ["반복 증가", "느린 내리기", "정지 1초"],
    },
  },
  {
    exercise: {
      id: "seated-hip-abduction-press-easy",
      name: "시티드 힙 어브덕션 프레스",
      englishName: "Seated Hip Abduction Press",
      category: "맨몸운동",
      regions: ["둔근", "하체", "코어"],
      focus: "근력",
      difficulty: "입문",
      equipment: "안정된 의자 · 손 선택",
      minutes: "5–10초 · 2회",
      description:
        "앉아 양 무릎 바깥을 손으로 아주 가볍게 지지하고 무릎을 바깥으로 밀려는 낮은 강도 수축을 연습합니다.",
      cues: ["골반 수평", "가벼운 바깥 압력", "발 바닥 지지"],
      benefits: ["옆둔근 인식", "골반 안정", "앉은 하체 보강"],
      warning:
        "고관절·무릎 통증, 저림 또는 압박 불편이 있으면 힘주기를 중단하고 발 지지 체중 이동으로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["의자·고관절 확인", "무릎 바깥 손 지지", "가벼운 바깥 압력"],
      finish: "발을 바닥에 두고 고관절·무릎·허리 반응을 확인합니다.",
      commonMistakes: ["압력 과도", "골반 기울기", "통증 무시"],
      regressions: ["압력 줄이기", "유지 줄이기", "체중 이동"],
      progressions: ["유지 2초", "반복 증가", "좌우 비교"],
    },
  },
  {
    exercise: {
      id: "seated-hip-adduction-squeeze-easy",
      name: "시티드 힙 애덕션 스퀴즈",
      englishName: "Seated Hip Adduction Squeeze",
      category: "맨몸운동",
      regions: ["하체", "둔근", "코어"],
      focus: "근력",
      difficulty: "입문",
      equipment: "의자 · 작은 수건 선택",
      minutes: "5–10초 · 2회",
      description:
        "앉아 무릎 사이의 수건 또는 손을 아주 가볍게 누르며 고관절 안쪽과 골반의 정렬을 연습합니다.",
      cues: ["가벼운 스퀴즈", "골반 수평", "숨 참지 않기"],
      benefits: ["고관절 안쪽 인식", "골반 정렬", "앉은 하체 제어"],
      warning:
        "고관절·무릎 통증, 압박 불편 또는 경련이 있으면 수건을 빼고 수행을 중단하세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["의자·고관절 확인", "무릎 사이 수건 또는 손", "가벼운 스퀴즈"],
      finish: "압력을 풀고 고관절·무릎·허리 반응을 확인합니다.",
      commonMistakes: ["압력 과도", "숨 참기", "골반 기울기"],
      regressions: ["수건 빼기", "압력 줄이기", "유지 줄이기"],
      progressions: ["유지 2초", "반복 증가", "느린 스퀴즈"],
    },
  },
  {
    exercise: {
      id: "chair-seated-leg-slide-easy",
      name: "체어 시티드 레그 슬라이드",
      englishName: "Chair Seated Leg Slide",
      category: "맨몸운동",
      regions: ["하체", "코어"],
      focus: "협응",
      difficulty: "입문",
      equipment: "안정된 의자 · 수건 선택",
      minutes: "좌우 5–8회 · 2세트",
      description:
        "앉은 자세에서 한 발을 바닥 위로 천천히 앞뒤로 미끄러뜨리며 무릎·고관절의 편안한 협응을 연습합니다.",
      cues: ["등 길게", "발 천천히 슬라이드", "작은 범위"],
      benefits: ["무릎·고관절 협응", "앉은 하체 회복", "저충격 코어"],
      warning:
        "무릎·고관절·허리 통증, 저림 또는 통증 악화가 있으면 범위를 줄이거나 중단하세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["의자·바닥 확인", "발 바닥 지지", "작은 앞뒤 슬라이드"],
      finish: "양발을 바닥에 두고 무릎·고관절·허리 반응을 확인합니다.",
      commonMistakes: ["슬라이드 과도", "허리 뒤로 젖힘", "통증 무시"],
      regressions: ["발끝 탭", "범위 줄이기", "한쪽씩"],
      progressions: ["반복 증가", "느린 복귀", "좌우 교대"],
    },
  },
  {
    exercise: {
      id: "seated-cross-body-knee-tap-easy",
      name: "시티드 크로스 바디 니 탭",
      englishName: "Seated Cross-Body Knee Tap",
      category: "맨몸운동",
      regions: ["코어", "하체", "어깨"],
      focus: "협응",
      difficulty: "입문",
      equipment: "안정된 의자",
      minutes: "좌우 6–10회 · 2세트",
      description:
        "앉아 한쪽 손을 반대쪽 무릎에 가볍게 닿게 하며 몸통 회전과 다리 들기의 낮은 강도 협응을 연습합니다.",
      cues: ["낮은 무릎 들기", "작은 회전", "등 길게"],
      benefits: ["교차 협응", "앉은 코어", "전신 준비"],
      warning:
        "허리·고관절·무릎·어깨 통증, 어지러움 또는 의자 불안정이 있으면 손만 무릎에 닿게 하세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["의자·등 길게", "낮은 무릎 들기", "작은 교차 탭"],
      finish: "발을 바닥에 두고 허리·고관절·어깨·균형 반응을 확인합니다.",
      commonMistakes: ["몸통 과도 회전", "무릎 너무 높이", "의자 흔들림 무시"],
      regressions: ["손만 무릎에", "한쪽씩", "범위 줄이기"],
      progressions: ["반복 증가", "느린 교대", "정지 1초"],
    },
  },
  {
    exercise: {
      id: "seated-step-out-tap-easy",
      name: "시티드 스텝 아웃 탭",
      englishName: "Seated Step-Out Tap",
      category: "균형·협응",
      regions: ["하체", "둔근", "코어"],
      focus: "협응",
      difficulty: "입문",
      equipment: "안정된 의자",
      minutes: "좌우 6–10회 · 2세트",
      description:
        "앉은 자세에서 한쪽 발을 옆으로 작게 내보내 조용히 탭하고 돌아오며 좁은 공간의 하체 협응을 연습합니다.",
      cues: ["작은 옆 탭", "발 전체 제어", "골반 수평"],
      benefits: ["측면 협응", "둔근 인식", "저소음 활동"],
      warning:
        "고관절·무릎·발목 통증 또는 의자 흔들림이 있으면 발을 가까이 두고 범위를 줄이세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["의자·바닥 확인", "작은 옆 탭", "발 전체 제어"],
      finish: "양발을 바닥에 두고 고관절·무릎·발목 반응을 확인합니다.",
      commonMistakes: ["보폭 과도", "발 세게 탭", "골반 기울기"],
      regressions: ["발끝 탭", "범위 줄이기", "한쪽씩"],
      progressions: ["반복 증가", "느린 교대", "정지 1초"],
    },
  },
  {
    exercise: {
      id: "seated-wrist-flexion-isometric-easy",
      name: "시티드 손목 굴곡 아이소메트릭",
      englishName: "Seated Wrist Flexion Isometric",
      category: "맨몸운동",
      regions: ["팔"],
      focus: "근력",
      difficulty: "입문",
      equipment: "의자 · 반대 손",
      minutes: "좌우 5–10초 · 2회",
      description:
        "앉아서 한 손으로 반대 손등에 아주 가볍게 저항을 주며 손목 굴곡의 낮은 강도 수축을 연습합니다.",
      cues: ["팔꿈치 가까이", "손목 중립 근처", "가벼운 압력"],
      benefits: ["전완 인식", "그립 준비", "압력 자가 조절"],
      warning:
        "손목·팔꿈치 통증, 저림, 붓기 또는 최근 손상 후 불편이 있으면 수행하지 말고 전문 지침을 따르세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["의자·손목 확인", "반대 손으로 가벼운 저항", "짧은 조임"],
      finish: "손을 편안히 펴고 손목·팔꿈치·저림 반응을 확인합니다.",
      commonMistakes: ["힘 과도", "손목 꺾임", "통증 무시"],
      regressions: ["압력 줄이기", "유지 줄이기", "손가락 펼침"],
      progressions: ["유지 2초", "반복 증가", "좌우 교대"],
    },
  },
  {
    exercise: {
      id: "seated-wrist-extension-isometric-easy",
      name: "시티드 손목 신전 아이소메트릭",
      englishName: "Seated Wrist Extension Isometric",
      category: "맨몸운동",
      regions: ["팔"],
      focus: "근력",
      difficulty: "입문",
      equipment: "의자 · 반대 손",
      minutes: "좌우 5–10초 · 2회",
      description:
        "앉아서 반대 손으로 손바닥 쪽을 가볍게 저항해 손목 신전의 편안한 수축을 연습합니다.",
      cues: ["팔꿈치 가까이", "작은 힘", "손가락 이완"],
      benefits: ["전완 뒤쪽 인식", "손목 제어", "그립 준비"],
      warning:
        "손목·팔꿈치 통증, 저림, 붓기 또는 힘이 갑자기 빠지는 느낌이 있으면 즉시 중단하세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["의자·손목 확인", "작은 신전 저항", "손가락 이완"],
      finish: "손을 편안히 펴고 손목·팔꿈치·저림 반응을 확인합니다.",
      commonMistakes: ["손목 꺾임", "저항 과도", "통증 무시"],
      regressions: ["압력 줄이기", "범위 줄이기", "손가락 이완"],
      progressions: ["유지 2초", "반복 증가", "좌우 교대"],
    },
  },
  {
    exercise: {
      id: "finger-spread-isometric-easy",
      name: "핑거 스프레드 아이소메트릭",
      englishName: "Finger Spread Isometric",
      category: "맨몸운동",
      regions: ["팔"],
      focus: "협응",
      difficulty: "입문",
      equipment: "없음",
      minutes: "5–10초 · 2회",
      description:
        "손가락을 편안히 벌린 뒤 작은 긴장으로 유지해 손가락 펼침과 전완의 가벼운 제어를 연습합니다.",
      cues: ["손가락 과도하게 벌리지 않기", "손목 편안히", "짧은 유지"],
      benefits: ["손가락 제어", "전완 인식", "그립 균형"],
      warning:
        "손가락·손목 관절 통증, 저림 또는 염증 반응이 있으면 힘주기를 중단하고 편안히 펴기만 하세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["손가락 편안히 펴기", "작게 벌리기", "짧은 유지"],
      finish: "손가락을 느슨하게 두고 손·손목의 편안함을 확인합니다.",
      commonMistakes: ["과도하게 벌림", "손목 긴장", "저림 무시"],
      regressions: ["작은 펼침", "유지 생략", "한 손씩"],
      progressions: ["유지 2초", "반복 증가", "느린 벌림"],
    },
  },
  {
    exercise: {
      id: "thumb-opposition-tap-easy",
      name: "엄지 대립 탭",
      englishName: "Thumb Opposition Tap",
      category: "맨몸운동",
      regions: ["팔"],
      focus: "협응",
      difficulty: "입문",
      equipment: "없음",
      minutes: "각 손 6–10회 · 2세트",
      description:
        "엄지를 각 손가락 끝에 부드럽게 닿게 하며 손의 섬세한 협응과 그립 준비를 연습합니다.",
      cues: ["가볍게 닿기", "손목 중립", "천천히 순서"],
      benefits: ["엄지 협응", "손가락 민첩성", "그립 준비"],
      warning:
        "엄지·손가락 통증, 저림 또는 관절 붓기가 있으면 반복을 줄이거나 중단하세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["손목 중립", "엄지와 검지 닿기", "순서대로 탭"],
      finish: "손가락을 편안히 펴고 엄지·손목·저림 반응을 확인합니다.",
      commonMistakes: ["손가락 세게 누름", "순서 급함", "통증 무시"],
      regressions: ["검지 탭만", "반복 줄이기", "한 손씩"],
      progressions: ["반복 증가", "느린 순서", "역순 탭"],
    },
  },
  {
    exercise: {
      id: "fist-squeeze-isometric-easy",
      name: "피스트 스퀴즈 아이소메트릭",
      englishName: "Fist Squeeze Isometric",
      category: "맨몸운동",
      regions: ["팔"],
      focus: "근력",
      difficulty: "입문",
      equipment: "없음",
      minutes: "5–8초 · 2회",
      description:
        "손가락을 편안히 감아 가벼운 주먹을 만들고 낮은 강도로 유지해 그립의 기초 긴장을 연습합니다.",
      cues: ["가볍게 감기", "엄지 편안히", "손목 중립"],
      benefits: ["그립 인식", "전완 지구력 준비", "손가락 제어"],
      warning:
        "손가락·손목·팔꿈치 통증, 저림 또는 손의 붓기가 있으면 주먹을 쥐지 말고 손가락 펼침으로 바꾸세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["손가락 편안히 감기", "가벼운 주먹", "짧은 유지"],
      finish: "손을 펴고 손가락·손목·팔꿈치 반응을 확인합니다.",
      commonMistakes: ["주먹 과도하게 쥠", "엄지 압박", "통증 무시"],
      regressions: ["손가락 반만 감기", "유지 줄이기", "손가락 펼침"],
      progressions: ["유지 2초", "반복 증가", "좌우 교대"],
    },
  },
  {
    exercise: {
      id: "fingertip-wall-press-easy",
      name: "핑거팁 월 프레스",
      englishName: "Fingertip Wall Press",
      category: "맨몸운동",
      regions: ["팔", "어깨"],
      focus: "협응",
      difficulty: "입문",
      equipment: "단단한 벽",
      minutes: "5–8초 · 2회",
      description:
        "벽에 손가락 끝을 가볍게 대고 아주 작은 압력을 주며 손가락·손목의 지지 감각을 연습합니다.",
      cues: ["벽 가까이 서기", "아주 가벼운 압력", "손목 중립"],
      benefits: ["손가락 지지 감각", "전완 준비", "벽 기반 조절"],
      warning:
        "손가락·손목·어깨 통증 또는 저림이 있으면 손바닥 벽 지지 또는 손가락 이완으로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["벽·손가락 확인", "벽 가까이 서기", "아주 가벼운 압력"],
      finish: "손을 벽에서 떼고 손가락·손목·어깨 반응을 확인합니다.",
      commonMistakes: ["압력 과도", "손목 꺾임", "벽 멀리 섬"],
      regressions: ["손바닥 벽 지지", "압력 줄이기", "한 손씩"],
      progressions: ["유지 2초", "반복 증가", "느린 압력"],
    },
  },
  {
    exercise: {
      id: "wall-supported-hip-circle-easy",
      name: "월 서포티드 힙 서클",
      englishName: "Wall Supported Hip Circle",
      category: "균형·협응",
      regions: ["둔근", "하체", "코어"],
      focus: "협응",
      difficulty: "입문",
      equipment: "단단한 벽",
      minutes: "좌우 4–6회 · 2세트",
      description:
        "벽 가까이에서 한쪽 무릎을 낮게 든 뒤 작은 원을 그려 고관절과 균형 제어를 연습합니다.",
      cues: ["벽 가까이", "작은 원", "골반 수평"],
      benefits: ["고관절 협응", "균형", "둔근 인식"],
      warning:
        "고관절·무릎·허리 통증, 어지러움 또는 균형 상실이 있으면 발끝 탭으로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["벽·균형 확인", "낮은 무릎 들기", "작은 원"],
      finish: "양발로 서서 고관절·무릎·균형 반응을 확인합니다.",
      commonMistakes: ["원이 과도하게 큼", "골반 기울기", "벽 지지 생략"],
      regressions: ["발끝 탭", "원 줄이기", "양손 벽 지지"],
      progressions: ["반복 증가", "방향 바꾸기", "정지 1초"],
    },
  },
  {
    exercise: {
      id: "chair-supported-lateral-weight-shift",
      name: "체어 서포티드 레터럴 웨이트 시프트",
      englishName: "Chair Supported Lateral Weight Shift",
      category: "균형·협응",
      regions: ["하체", "둔근", "코어"],
      focus: "균형",
      difficulty: "입문",
      equipment: "안정된 의자",
      minutes: "좌우 6–10회 · 2세트",
      description:
        "의자를 가볍게 잡고 체중을 한쪽 발로 천천히 옮겼다가 돌아오며 고관절·무릎의 저충격 제어를 연습합니다.",
      cues: ["의자 가까이", "천천히 이동", "발 전체 지지"],
      benefits: ["체중 이동", "고관절 제어", "균형 준비"],
      warning:
        "무릎·고관절·발목 통증, 어지러움 또는 의자 흔들림이 있으면 범위를 줄이거나 중단하세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["의자·바닥 확인", "발 전체 지지", "작은 옆 체중 이동"],
      finish: "양발에 체중을 두고 고관절·무릎·균형 반응을 확인합니다.",
      commonMistakes: ["급한 이동", "무릎 안쪽 붕괴", "의자 흔들림 무시"],
      regressions: ["범위 줄이기", "양손 지지", "제자리 체중 이동"],
      progressions: ["반복 증가", "느린 이동", "정지 1초"],
    },
  },
  {
    exercise: {
      id: "seated-ankle-pump-march-easy",
      name: "시티드 앵클 펌프 마치",
      englishName: "Seated Ankle Pump March",
      category: "맨몸운동",
      regions: ["하체", "코어"],
      focus: "협응",
      difficulty: "입문",
      equipment: "안정된 의자",
      minutes: "좌우 8–12회 · 2세트",
      description:
        "의자에 앉아 한쪽 발뒤꿈치·발끝을 번갈아 작게 들며 발목과 하체의 조용한 협응을 연습합니다.",
      cues: ["등 길게", "작은 발목 펌프", "천천히 교대"],
      benefits: ["발목 제어", "앉은 하체 활동", "저충격 협응"],
      warning:
        "발목·무릎 통증, 종아리 경련, 저림 또는 부기가 있으면 범위를 줄이거나 중단하세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["의자·발목 확인", "발 바닥 지지", "작은 펌프 교대"],
      finish: "발을 바닥에 두고 발목·종아리·무릎 반응을 확인합니다.",
      commonMistakes: ["발목 과신전", "급한 리듬", "경련 무시"],
      regressions: ["한쪽씩", "범위 줄이기", "발끝만 들기"],
      progressions: ["반복 증가", "느린 교대", "정지 1초"],
    },
  },
  {
    exercise: {
      id: "standing-heel-toe-rock-support",
      name: "지지 힐 투 토 록",
      englishName: "Supported Heel-to-Toe Rock",
      category: "균형·협응",
      regions: ["하체", "둔근", "코어"],
      focus: "균형",
      difficulty: "입문",
      equipment: "벽 또는 안정된 의자",
      minutes: "6–10회 · 2세트",
      description:
        "지지대 가까이에서 뒤꿈치와 앞꿈치 사이로 조용히 체중을 이동해 발목·무릎·고관절의 연결을 연습합니다.",
      cues: ["지지대 가까이", "작은 앞뒤 이동", "발 전체 제어"],
      benefits: ["발목 제어", "균형", "보행 준비"],
      warning:
        "발목·무릎·고관절 통증, 어지러움 또는 균형 상실이 있으면 앉은 발목 펌프로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["지지대·바닥 확인", "작은 앞뒤 이동", "발 전체 제어"],
      finish: "양발을 바닥에 두고 발목·무릎·균형 반응을 확인합니다.",
      commonMistakes: ["앞뒤 이동 과도", "무릎 잠금", "지지대 멀리 섬"],
      regressions: ["시티드 앵클 펌프", "범위 줄이기", "양손 지지"],
      progressions: ["반복 증가", "느린 이동", "정지 1초"],
    },
  },
  {
    exercise: {
      id: "wall-supported-mini-lunge-easy",
      name: "월 서포티드 미니 런지",
      englishName: "Wall Supported Mini Lunge",
      category: "맨몸운동",
      regions: ["하체", "둔근", "코어"],
      focus: "체력",
      difficulty: "입문",
      equipment: "단단한 벽",
      minutes: "좌우 4–8회 · 2세트",
      description:
        "벽 지지의 짧은 스플릿 스탠스에서 아주 작은 범위로 무릎을 굽혔다 펴며 하체 제어를 연습합니다.",
      cues: ["벽 지지", "짧은 보폭", "무릎 정렬"],
      benefits: ["하체 지구력", "고관절·무릎 제어", "저충격"],
      warning:
        "무릎·고관절 통증, 앞무릎 불안정 또는 균형 상실이 있으면 체중 이동으로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["벽·발 위치 확인", "짧은 보폭", "아주 작은 굽힘"],
      finish: "양발로 서서 무릎·고관절·균형 반응을 확인합니다.",
      commonMistakes: ["보폭 과도", "앞무릎 안쪽 붕괴", "벽 지지 생략"],
      regressions: ["체중 이동", "범위 줄이기", "양손 벽 지지"],
      progressions: ["반복 증가", "정지 1초", "보폭 소폭"],
    },
  },
  {
    exercise: {
      id: "chair-supported-side-step-touch",
      name: "체어 서포티드 사이드 스텝 터치",
      englishName: "Chair Supported Side Step Touch",
      category: "균형·협응",
      regions: ["하체", "둔근", "코어"],
      focus: "협응",
      difficulty: "입문",
      equipment: "안정된 의자",
      minutes: "좌우 6–10회 · 2세트",
      description:
        "의자를 가볍게 잡고 옆으로 작은 한 걸음을 옮긴 뒤 반대 발을 조용히 터치해 좁은 공간 협응을 연습합니다.",
      cues: ["의자 가까이", "작은 옆걸음", "조용한 터치"],
      benefits: ["측면 협응", "둔근 제어", "저소음 활동"],
      warning:
        "무릎·고관절·발목 통증, 어지러움 또는 의자 흔들림이 있으면 제자리 체중 이동으로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["의자·바닥 확인", "작은 옆걸음", "조용한 탭"],
      finish: "양발로 서서 발목·무릎·고관절·균형 반응을 확인합니다.",
      commonMistakes: ["발 세게 디딤", "보폭 과도", "의자 흔들림 무시"],
      regressions: ["제자리 탭", "범위 줄이기", "양손 지지"],
      progressions: ["반복 증가", "느린 교대", "정지 1초"],
    },
  },
  {
    exercise: {
      id: "prone-swimmer-sweep-easy",
      name: "프론 스위머 스윕",
      englishName: "Prone Swimmer Sweep",
      category: "맨몸운동",
      regions: ["등", "어깨", "팔"],
      focus: "협응",
      difficulty: "입문",
      equipment: "매트",
      minutes: "5–8회 · 2세트",
      description:
        "엎드린 자세에서 팔을 바닥 가까이 두고 옆에서 골반 쪽으로 부드럽게 쓸어 등·어깨 뒤쪽의 협응을 연습합니다.",
      cues: ["목 길게", "팔 바닥 가까이", "작은 스윕"],
      benefits: ["등·어깨 협응", "자세 인식", "상체 지구력 준비"],
      warning:
        "어깨·목·허리 통증, 저림 또는 엎드린 자세 불편이 있으면 벽 스노우 엔젤로 낮추거나 중단하세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["매트·목 확인", "팔 바닥 가까이", "작은 옆 스윕"],
      finish: "팔을 편안히 내리고 목·어깨·등 반응을 확인합니다.",
      commonMistakes: ["목 젖힘", "팔 너무 높이", "허리 과신전"],
      regressions: ["벽 스노우 엔젤", "범위 줄이기", "한쪽씩"],
      progressions: ["반복 증가", "정지 1초", "느린 스윕"],
    },
  },
  {
    exercise: {
      id: "prone-elbow-pullback-hold-easy",
      name: "프론 엘보 풀백 홀드",
      englishName: "Prone Elbow Pullback Hold",
      category: "맨몸운동",
      regions: ["등", "어깨", "팔"],
      focus: "근력",
      difficulty: "입문",
      equipment: "매트",
      minutes: "5–10초 · 2회",
      description:
        "엎드려 팔꿈치를 옆구리 쪽으로 가볍게 당긴 모양으로 유지하며 등과 견갑의 낮은 강도 지지를 연습합니다.",
      cues: ["팔꿈치 옆구리", "목 이완", "작은 조임"],
      benefits: ["등 인식", "견갑 안정", "당기기 준비"],
      warning:
        "어깨·목·허리 통증, 저림 또는 호흡 불편이 있으면 유지 시간을 줄이거나 엎드린 W 풀로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["매트·목 확인", "팔꿈치 옆구리", "가벼운 당김 모양"],
      finish: "팔을 바닥에 두고 목·어깨·등 반응을 확인합니다.",
      commonMistakes: ["목 으쓱", "허리 꺾임", "힘 과도"],
      regressions: ["프론 W 풀", "유지 줄이기", "팔 바닥 유지"],
      progressions: ["유지 2초", "반복 증가", "정지 1초"],
    },
  },
  {
    exercise: {
      id: "back-of-hand-wall-press-easy",
      name: "백 오브 핸드 월 프레스",
      englishName: "Back-of-Hand Wall Press",
      category: "맨몸운동",
      regions: ["어깨", "등", "팔"],
      focus: "협응",
      difficulty: "입문",
      equipment: "단단한 벽",
      minutes: "5–10초 · 2회",
      description:
        "벽에 등을 대고 손등을 가볍게 벽으로 밀며 어깨 뒤쪽과 견갑의 편안한 위치를 연습합니다.",
      cues: ["가벼운 손등 압력", "목 길게", "갈비뼈 편안히"],
      benefits: ["어깨 외회전 인식", "자세 제어", "벽 기반 안정성"],
      warning:
        "어깨 앞쪽 통증, 저림 또는 손목 불편이 있으면 압력을 줄이거나 팔을 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["벽·어깨 확인", "손등 가볍게 벽에", "작은 압력"],
      finish: "손을 벽에서 떼고 어깨·손목·목 반응을 확인합니다.",
      commonMistakes: ["어깨 으쓱", "압력 과도", "손목 꺾임"],
      regressions: ["압력 줄이기", "팔 낮추기", "한쪽씩"],
      progressions: ["유지 2초", "반복 증가", "범위 소폭"],
    },
  },
  {
    exercise: {
      id: "seated-biceps-isometric-curl-easy",
      name: "시티드 바이셉스 아이소메트릭 컬",
      englishName: "Seated Biceps Isometric Curl",
      category: "맨몸운동",
      regions: ["팔"],
      focus: "근력",
      difficulty: "입문",
      equipment: "안정된 의자",
      minutes: "좌우 5–10초 · 2회",
      description:
        "의자에 앉아 한 손으로 반대 손목을 가볍게 눌러 낮은 강도의 이두근 수축을 연습합니다.",
      cues: ["팔꿈치 몸통 가까이", "가벼운 저항", "손목 중립"],
      benefits: ["이두근 인식", "팔 지구력", "저항 자가 조절"],
      warning:
        "팔꿈치·손목·어깨 통증, 저림 또는 과도한 힘주기가 있으면 압력을 줄이거나 중단하세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["의자·팔꿈치 확인", "한 손으로 반대 손목 지지", "가벼운 컬 압력"],
      finish: "양팔을 편안히 내려 팔꿈치·손목·어깨 반응을 확인합니다.",
      commonMistakes: ["저항 과도", "팔꿈치 앞뒤 이동", "손목 꺾임"],
      regressions: ["압력 줄이기", "유지 줄이기", "한쪽만"],
      progressions: ["유지 2초", "반복 증가", "느린 조임"],
    },
  },
  {
    exercise: {
      id: "chair-arm-pressdown-isometric-easy",
      name: "체어 암 프레스다운 아이소메트릭",
      englishName: "Chair Arm Pressdown Isometric",
      category: "맨몸운동",
      regions: ["팔", "어깨", "코어"],
      focus: "근력",
      difficulty: "입문",
      equipment: "벽에 고정한 의자",
      minutes: "5–10초 · 2회",
      description:
        "의자 가장자리 옆을 가볍게 누르며 팔 뒤쪽과 어깨 아래쪽의 안정적인 지지를 짧게 연습합니다.",
      cues: ["의자 고정", "가벼운 아래 압력", "어깨 내리기"],
      benefits: ["삼두근 인식", "상체 지지", "의자 기반 안전 조절"],
      warning:
        "의자가 움직이거나 손목·팔꿈치·어깨 통증이 있으면 수행하지 말고 벽 프레스로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["의자 고정 확인", "손 의자 옆", "가벼운 아래 압력"],
      finish: "손을 떼고 손목·팔꿈치·어깨 반응을 확인합니다.",
      commonMistakes: ["의자 흔들림 무시", "어깨 으쓱", "압력 과도"],
      regressions: ["벽 삼두 프레스", "압력 줄이기", "한쪽씩"],
      progressions: ["유지 2초", "반복 증가", "정지 1초"],
    },
  },
  {
    exercise: {
      id: "wall-no-money-external-rotation-easy",
      name: "월 노 머니 외회전",
      englishName: "Wall No-Money External Rotation",
      category: "맨몸운동",
      regions: ["어깨", "등", "팔"],
      focus: "협응",
      difficulty: "입문",
      equipment: "단단한 벽",
      minutes: "6–10회 · 2세트",
      description:
        "팔꿈치를 옆구리에 둔 채 손등을 벽에 가볍게 대고 작은 외회전 범위를 연습합니다.",
      cues: ["팔꿈치 옆구리", "작은 회전", "목 이완"],
      benefits: ["어깨 외회전", "견갑 제어", "상체 자세 준비"],
      warning:
        "어깨 통증·저림·불안정감이 있으면 범위를 줄이거나 벽 손등 프레스로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["벽·어깨 확인", "팔꿈치 옆구리", "작은 손등 회전"],
      finish: "팔을 편안히 내리고 어깨·목·저림 반응을 확인합니다.",
      commonMistakes: ["팔꿈치 벌어짐", "회전 과도", "목 으쓱"],
      regressions: ["손등 월 프레스", "범위 줄이기", "한쪽씩"],
      progressions: ["반복 증가", "정지 1초", "느린 복귀"],
    },
  },
  {
    exercise: {
      id: "chair-hamstring-heel-dig-easy",
      name: "체어 햄스트링 힐 딕",
      englishName: "Chair Hamstring Heel Dig",
      category: "맨몸운동",
      regions: ["하체", "둔근"],
      focus: "근력",
      difficulty: "입문",
      equipment: "안정된 의자",
      minutes: "좌우 5–10초 · 2회",
      description:
        "의자에 앉아 한쪽 뒤꿈치를 바닥으로 가볍게 끌어당기는 느낌으로 누르며 햄스트링을 연습합니다.",
      cues: ["뒤꿈치 가볍게 누르기", "무릎 편안히", "골반 수평"],
      benefits: ["햄스트링 인식", "무릎 뒤쪽 제어", "앉은 하체 보강"],
      warning:
        "무릎 뒤쪽 통증, 경련, 저림 또는 허리 불편이 있으면 압력을 줄이거나 발을 바닥에 편안히 두세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["의자·무릎 확인", "뒤꿈치 바닥", "가벼운 끌기 압력"],
      finish: "발을 편안히 두고 무릎·고관절·햄스트링 반응을 확인합니다.",
      commonMistakes: ["힘 과도", "골반 뒤로 기울기", "경련 무시"],
      regressions: ["압력 줄이기", "양발 동시", "유지 줄이기"],
      progressions: ["유지 2초", "반복 증가", "좌우 교대"],
    },
  },
  {
    exercise: {
      id: "wall-hip-extension-press-easy",
      name: "월 힙 익스텐션 프레스",
      englishName: "Wall Hip Extension Press",
      category: "맨몸운동",
      regions: ["둔근", "하체", "코어"],
      focus: "근력",
      difficulty: "입문",
      equipment: "단단한 벽",
      minutes: "좌우 5–10초 · 2회",
      description:
        "벽을 등진 자세에서 한쪽 발뒤꿈치를 벽 쪽으로 아주 가볍게 밀며 둔근과 고관절 뒤쪽의 등척성 제어를 연습합니다.",
      cues: ["가벼운 뒤꿈치 압력", "골반 수평", "작은 범위"],
      benefits: ["둔근 인식", "고관절 신전 제어", "저충격 하체"],
      warning:
        "고관절·무릎·허리 통증, 경련 또는 균형 상실이 있으면 양발 체중 이동으로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["벽·균형 확인", "뒤꿈치 가볍게 벽 쪽", "골반 수평"],
      finish: "양발로 서서 고관절·무릎·허리 반응을 확인합니다.",
      commonMistakes: ["허리 꺾임", "압력 과도", "골반 기울기"],
      regressions: ["체중 이동", "압력 줄이기", "양손 벽 지지"],
      progressions: ["유지 2초", "반복 증가", "좌우 교대"],
    },
  },
  {
    exercise: {
      id: "supine-heel-slide-easy",
      name: "수파인 힐 슬라이드",
      englishName: "Supine Heel Slide",
      category: "맨몸운동",
      regions: ["하체", "코어", "둔근"],
      focus: "협응",
      difficulty: "입문",
      equipment: "매트 또는 수건",
      minutes: "좌우 5–8회 · 2세트",
      description:
        "바로 누워 한쪽 뒤꿈치를 매트 위로 천천히 밀고 당기며 무릎·고관절·코어의 편안한 움직임을 연습합니다.",
      cues: ["허리 편안히", "뒤꿈치 천천히", "작은 범위"],
      benefits: ["무릎 굴곡 제어", "고관절 협응", "저충격 코어"],
      warning:
        "무릎·고관절·허리 통증, 당김 악화 또는 저림이 있으면 범위를 줄이거나 중단하세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["매트·허리 확인", "한쪽 뒤꿈치 슬라이드", "작은 범위"],
      finish: "양발을 매트에 두고 무릎·고관절·허리 반응을 확인합니다.",
      commonMistakes: ["허리 과신전", "슬라이드 과도", "통증 무시"],
      regressions: ["뒤꿈치 탭", "범위 줄이기", "양발 정지"],
      progressions: ["반복 증가", "느린 복귀", "좌우 교대"],
    },
  },
  {
    exercise: {
      id: "chair-supported-knee-bend-tap",
      name: "체어 지지 니 벤드 탭",
      englishName: "Chair Supported Knee Bend Tap",
      category: "균형·협응",
      regions: ["하체", "둔근", "코어"],
      focus: "협응",
      difficulty: "입문",
      equipment: "안정된 의자",
      minutes: "좌우 5–10회 · 2세트",
      description:
        "의자를 가볍게 잡고 한쪽 무릎을 작게 굽혔다 펴며 반대 발끝을 조용히 탭해 저충격 균형을 연습합니다.",
      cues: ["의자 가까이", "작은 무릎 굽힘", "조용한 탭"],
      benefits: ["무릎 제어", "균형", "저충격 전신 준비"],
      warning:
        "무릎·발목·고관절 통증, 어지러움 또는 의자 흔들림이 있으면 양발 체중 이동으로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["의자·바닥 확인", "작은 무릎 굽힘", "조용한 발끝 탭"],
      finish: "양발로 서서 무릎·발목·균형 반응을 확인합니다.",
      commonMistakes: ["발 세게 탭", "무릎 안쪽 붕괴", "지지대 멀리 섬"],
      regressions: ["체중 이동", "범위 줄이기", "양손 지지"],
      progressions: ["반복 증가", "느린 교대", "지지 소폭 줄이기"],
    },
  },
  {
    exercise: {
      id: "wall-split-stance-hip-shift-easy",
      name: "월 스플릿 스탠스 힙 시프트",
      englishName: "Wall Split-Stance Hip Shift",
      category: "맨몸운동",
      regions: ["하체", "둔근", "코어"],
      focus: "협응",
      difficulty: "입문",
      equipment: "단단한 벽",
      minutes: "좌우 5–8회 · 2세트",
      description:
        "벽 지지의 작은 앞뒤 체중 이동으로 고관절·무릎에 무리 없는 스플릿 스탠스 제어를 연습합니다.",
      cues: ["벽 지지", "짧은 체중 이동", "앞무릎 정렬"],
      benefits: ["고관절 제어", "보행 준비", "균형"],
      warning:
        "무릎·고관절 통증, 균형 상실 또는 앞무릎 불안정이 있으면 양발 체중 이동으로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["벽·발 위치 확인", "짧은 스플릿 스탠스", "작은 체중 이동"],
      finish: "양발로 서서 고관절·무릎·균형 반응을 확인합니다.",
      commonMistakes: ["앞무릎 안쪽 붕괴", "보폭 과도", "벽 지지 생략"],
      regressions: ["양발 체중 이동", "보폭 줄이기", "양손 벽 지지"],
      progressions: ["반복 증가", "정지 1초", "보폭 소폭"],
    },
  },
  {
    exercise: {
      id: "wall-elbow-row-isometric-easy",
      name: "월 엘보 로우 아이소메트릭",
      englishName: "Wall Elbow Row Isometric",
      category: "맨몸운동",
      regions: ["등", "어깨", "팔"],
      focus: "근력",
      difficulty: "입문",
      equipment: "단단한 벽",
      minutes: "5–12초 · 2회",
      description:
        "벽에 등을 대고 팔꿈치를 뒤로 가볍게 누르며 등을 조이는 감각을 짧게 연습합니다.",
      cues: ["목 길게", "팔꿈치 가볍게 뒤로", "갈비뼈 편안히"],
      benefits: ["등 인식", "견갑 제어", "자세 보강"],
      warning:
        "어깨·목·팔꿈치 통증, 저림 또는 벽 압박 불편이 있으면 압력을 줄이거나 중단하세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["벽·등 확인", "팔꿈치 가볍게 뒤로", "짧은 조임"],
      finish: "팔을 편안히 내리고 목·어깨·등 반응을 확인합니다.",
      commonMistakes: ["목 으쓱", "압력 과도", "허리 과신전"],
      regressions: ["압력 줄이기", "한쪽씩", "팔 내리기"],
      progressions: ["유지 2초", "반복 증가", "좌우 교대"],
    },
  },
  {
    exercise: {
      id: "seated-lat-press-isometric-easy",
      name: "시티드 랫 프레스 아이소메트릭",
      englishName: "Seated Lat Press Isometric",
      category: "맨몸운동",
      regions: ["등", "어깨", "팔"],
      focus: "근력",
      difficulty: "입문",
      equipment: "안정된 의자",
      minutes: "5–10초 · 2회",
      description:
        "의자에 앉아 손을 허벅지 옆에 두고 아래로 가볍게 누르며 겨드랑이 아래와 등 옆의 긴장을 연습합니다.",
      cues: ["발 바닥 고정", "어깨 내리기", "가벼운 압력"],
      benefits: ["광배근 인식", "어깨 안정", "앉은 자세 보강"],
      warning:
        "어깨·손목·팔꿈치 통증 또는 저림이 있으면 압력을 줄이거나 팔을 편안히 내려 두세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["의자·어깨 확인", "손 허벅지 옆", "가벼운 아래 압력"],
      finish: "손을 편안히 놓고 어깨·팔꿈치·호흡 반응을 확인합니다.",
      commonMistakes: ["어깨 으쓱", "압력 과도", "숨 참기"],
      regressions: ["압력 줄이기", "한쪽씩", "팔 내리기"],
      progressions: ["유지 2초", "반복 증가", "좌우 교대"],
    },
  },
];
