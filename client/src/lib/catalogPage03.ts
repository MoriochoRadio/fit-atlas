import type { CatalogEntry } from "./catalogTypes";

export const catalogPage03: CatalogEntry[] = [
  {
    exercise: {
      id: "towel-self-row-seated-easy",
      name: "타월 셀프 로우 시티드",
      englishName: "Towel Self Row Seated",
      category: "맨몸운동",
      regions: ["등", "팔", "어깨"],
      focus: "근력",
      difficulty: "입문",
      equipment: "짧은 수건 · 안정된 의자",
      minutes: "좌우 5–8회 · 2세트",
      description:
        "수건 양끝을 잡고 한 손으로 가볍게 당기며 다른 손으로 저항을 조절해 앉은 자세 당기기 감각을 연습합니다.",
      cues: ["가벼운 당김", "어깨 내리기", "몸통 고정"],
      benefits: ["당기기 대체", "등 인식", "강도 자가 조절"],
      warning:
        "수건이 손에서 미끄러지거나 어깨·팔꿈치·손목 통증이 있으면 즉시 중단하고 벽 견갑 제어로 바꾸세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["의자·수건 확인", "양끝 가볍게 잡기", "작은 당김 리허설"],
      finish: "수건 장력을 풀고 손·팔꿈치·어깨 반응을 확인합니다.",
      commonMistakes: ["수건 세게 당김", "몸통 반동", "어깨 으쓱"],
      regressions: ["장력 줄이기", "한 손만", "월 엘보 로우"],
      progressions: ["반복 증가", "정지 1초", "느린 복귀"],
    },
  },
  {
    exercise: {
      id: "wall-triceps-press-isometric-easy",
      name: "월 트라이셉스 프레스 아이소메트릭",
      englishName: "Wall Triceps Press Isometric",
      category: "맨몸운동",
      regions: ["팔", "어깨"],
      focus: "근력",
      difficulty: "입문",
      equipment: "단단한 벽",
      minutes: "5–10초 · 2회",
      description:
        "벽 가까이에서 팔꿈치를 굽힌 뒤 손바닥으로 벽을 가볍게 밀어 팔 뒤쪽의 긴장을 짧게 연습합니다.",
      cues: ["팔꿈치 몸통 가까이", "가벼운 밀기", "손목 중립"],
      benefits: ["삼두근 인식", "팔 지지 준비", "밀기 제어"],
      warning:
        "손목·팔꿈치·어깨 통증, 저림 또는 벽에서 미끄러짐이 있으면 압력을 줄이거나 중단하세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["벽·손목 확인", "팔꿈치 몸통 가까이", "가벼운 벽 밀기"],
      finish: "손을 벽에서 떼고 손목·팔꿈치·어깨 반응을 확인합니다.",
      commonMistakes: ["팔꿈치 벌어짐", "손목 꺾임", "압력 과도"],
      regressions: ["압력 줄이기", "벽 가까이 서기", "한쪽씩"],
      progressions: ["유지 2초", "반복 증가", "발 위치 소폭 뒤로"],
    },
  },
  {
    exercise: {
      id: "chair-incline-scapular-pushup-easy",
      name: "체어 인클라인 스캐풀라 푸시업",
      englishName: "Chair Incline Scapular Push-Up",
      category: "맨몸운동",
      regions: ["어깨", "가슴", "코어"],
      focus: "협응",
      difficulty: "입문",
      equipment: "벽에 고정한 튼튼한 의자",
      minutes: "5–10회 · 2세트",
      description:
        "높은 의자 지지에서 팔꿈치를 펴둔 채 어깨뼈만 작게 앞뒤로 움직이며 상체 지지를 연습합니다.",
      cues: ["의자 고정", "팔꿈치 펴기", "작은 견갑 이동"],
      benefits: ["견갑 제어", "상체 지지", "어깨 준비"],
      warning:
        "의자가 움직이거나 손목·어깨 통증이 있으면 벽 견갑 푸시업으로 낮추거나 중단하세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["의자 고정 확인", "높은 지지 선택", "작은 견갑 이동"],
      finish: "의자에서 손을 떼고 손목·어깨·목 반응을 확인합니다.",
      commonMistakes: ["팔꿈치 굽힘", "의자 흔들림 무시", "목 으쓱"],
      regressions: ["벽 견갑 푸시업", "범위 줄이기", "벽 더 가까이"],
      progressions: ["반복 증가", "정지 1초", "지지면 소폭 낮추기"],
    },
  },
  {
    exercise: {
      id: "chair-supported-hip-hinge-tap",
      name: "체어 지지 힙 힌지 탭",
      englishName: "Chair Supported Hip Hinge Tap",
      category: "맨몸운동",
      regions: ["둔근", "하체", "코어"],
      focus: "협응",
      difficulty: "입문",
      equipment: "안정된 의자",
      minutes: "6–10회 · 2세트",
      description:
        "의자 등받이를 가볍게 잡고 엉덩이를 뒤로 보내며 의자 끝을 살짝 터치해 고관절 힌지를 연습합니다.",
      cues: ["엉덩이 뒤로", "등 길게", "의자 가볍게 터치"],
      benefits: ["고관절 힌지", "둔근 제어", "허리 부담 인식"],
      warning:
        "허리·고관절·무릎 통증, 어지러움 또는 의자 흔들림이 있으면 범위를 줄이거나 중단하세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["의자·바닥 확인", "등받이 가볍게 잡기", "짧은 힌지"],
      finish: "양발로 서서 허리·고관절·무릎 반응을 확인합니다.",
      commonMistakes: ["허리 둥글게", "의자에 강하게 앉기", "무릎 잠금"],
      regressions: ["벽 힌지", "범위 줄이기", "양손 지지"],
      progressions: ["반복 증가", "느린 복귀", "정지 1초"],
    },
  },
  {
    exercise: {
      id: "chair-sit-to-stand-pause-easy",
      name: "체어 싯 투 스탠드 포즈",
      englishName: "Chair Sit-to-Stand Pause",
      category: "맨몸운동",
      regions: ["하체", "둔근", "코어"],
      focus: "체력",
      difficulty: "입문",
      equipment: "벽에 고정한 의자",
      minutes: "5–10회 · 2세트",
      description:
        "의자에서 천천히 일어나 중간의 편안한 지점에서 짧게 멈춘 뒤 다시 앉아 하체 지구력을 연습합니다.",
      cues: ["발 전체 지지", "천천히 일어서기", "짧은 멈춤"],
      benefits: ["하체 지구력", "일상 전환", "무릎 제어"],
      warning:
        "무릎·고관절 통증, 어지러움 또는 의자 흔들림이 있으면 손 지지를 쓰거나 범위를 줄이세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["의자 고정 확인", "발 전체 지지", "천천히 일어서기"],
      finish: "의자에 천천히 앉아 무릎·고관절·호흡 반응을 확인합니다.",
      commonMistakes: ["급히 앉기", "무릎 안쪽 붕괴", "발뒤꿈치 들림"],
      regressions: ["손 지지", "범위 줄이기", "일어서기만"],
      progressions: ["반복 증가", "멈춤 1초", "손 지지 줄이기"],
    },
  },
  {
    exercise: {
      id: "wall-sit-alternating-heel-lift-easy",
      name: "월 싯 얼터네이팅 힐 리프트",
      englishName: "Wall Sit Alternating Heel Lift",
      category: "맨몸운동",
      regions: ["하체", "둔근", "코어"],
      focus: "체력",
      difficulty: "입문",
      equipment: "단단한 벽",
      minutes: "좌우 4–8회 · 2세트",
      description:
        "얕은 월 싯에서 한쪽 뒤꿈치만 작게 들고 내리며 점프 없이 하체 지구력과 발 제어를 연습합니다.",
      cues: ["얕은 월 싯", "뒤꿈치 작게", "벽 지지"],
      benefits: ["하체 지구력", "발목 제어", "저충격"],
      warning:
        "무릎·발목·고관절 통증 또는 벽 지지 불편이 있으면 일반 월 싯 또는 양발 카프 레이즈로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["벽·발 위치 확인", "얕은 월 싯", "작은 뒤꿈치 들기"],
      finish: "천천히 서서 무릎·발목·호흡 반응을 확인합니다.",
      commonMistakes: ["깊이 과도", "골반 흔들림", "통증 무시"],
      regressions: ["월 싯 홀드", "양발 카프 레이즈", "범위 줄이기"],
      progressions: ["반복 증가", "느린 교대", "유지 2초"],
    },
  },
  {
    exercise: {
      id: "wall-hip-abduction-hold-easy",
      name: "월 힙 어브덕션 홀드",
      englishName: "Wall Hip Abduction Hold",
      category: "맨몸운동",
      regions: ["둔근", "하체", "코어"],
      focus: "근력",
      difficulty: "입문",
      equipment: "단단한 벽",
      minutes: "좌우 5–12초 · 2회",
      description:
        "옆으로 선 자세에서 바깥쪽 무릎·허벅지를 벽에 아주 가볍게 밀며 옆엉덩이의 등척성 제어를 연습합니다.",
      cues: ["골반 수평", "가벼운 벽 압력", "발 전체 지지"],
      benefits: ["옆둔근 제어", "골반 안정", "무릎 정렬 보조"],
      warning:
        "고관절·무릎 통증, 벽 압박 불편 또는 균형 상실이 있으면 양발 체중 이동으로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["벽·고관절 확인", "옆으로 선 자세", "가벼운 바깥 압력"],
      finish: "양발에 체중을 두고 고관절·무릎·균형 반응을 확인합니다.",
      commonMistakes: ["몸통 기울기", "압력 과도", "무릎 잠금"],
      regressions: ["양발 체중 이동", "압력 줄이기", "양손 벽 지지"],
      progressions: ["유지 2초", "반복 증가", "지지 소폭 줄이기"],
    },
  },
  {
    exercise: {
      id: "standing-knee-flexion-hold-support",
      name: "지지 스탠딩 니 플렉션 홀드",
      englishName: "Supported Standing Knee Flexion Hold",
      category: "균형·협응",
      regions: ["하체", "둔근"],
      focus: "균형",
      difficulty: "입문",
      equipment: "벽 또는 의자",
      minutes: "좌우 5–10초 · 2회",
      description:
        "지지대 가까이에서 한쪽 무릎을 뒤로 작게 굽혀 짧게 유지하며 햄스트링과 한발 지지를 연습합니다.",
      cues: ["지지대 가까이", "무릎 낮게 굽힘", "골반 수평"],
      benefits: ["햄스트링 인식", "한발 지지", "무릎 제어"],
      warning:
        "무릎·고관절·허리 통증, 경련 또는 균형 상실이 있으면 발끝 탭으로 낮추거나 중단하세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["지지대·바닥 확인", "작은 무릎 굽힘", "짧은 유지"],
      finish: "양발로 서서 무릎·고관절·균형 반응을 확인합니다.",
      commonMistakes: ["골반 기울기", "무릎 너무 높이", "지지대 멀리 섬"],
      regressions: ["발끝 탭", "유지 줄이기", "양손 지지"],
      progressions: ["유지 2초", "반복 증가", "지지 소폭 줄이기"],
    },
  },
  {
    exercise: {
      id: "seated-knee-extension-alternating-easy",
      name: "시티드 얼터네이팅 니 익스텐션",
      englishName: "Seated Alternating Knee Extension",
      category: "맨몸운동",
      regions: ["하체", "코어"],
      focus: "협응",
      difficulty: "입문",
      equipment: "안정된 의자",
      minutes: "좌우 6–10회 · 2세트",
      description:
        "의자에 앉아 한쪽 무릎을 편안한 범위로 펴고 천천히 바꿔가며 허벅지 제어를 연습합니다.",
      cues: ["등 길게", "작은 무릎 펴기", "천천히 교대"],
      benefits: ["대퇴 제어", "앉은 자세 활동", "저충격 하체"],
      warning:
        "무릎 통증·잠김·부기·불안정 또는 최근 수술이 있으면 수행하지 말고 전문가 지침을 따르세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["의자·무릎 확인", "발 바닥 고정", "작은 무릎 펴기"],
      finish: "발을 바닥에 두고 무릎·대퇴·고관절 반응을 확인합니다.",
      commonMistakes: ["무릎 잠금", "몸통 뒤로 젖힘", "통증 무시"],
      regressions: ["범위 줄이기", "한쪽씩", "발끝만 들기"],
      progressions: ["반복 증가", "느린 교대", "정지 1초"],
    },
  },
  {
    exercise: {
      id: "wall-march-press-easy",
      name: "월 마치 프레스",
      englishName: "Wall March Press",
      category: "맨몸운동",
      regions: ["하체", "코어", "어깨"],
      focus: "협응",
      difficulty: "입문",
      equipment: "단단한 벽",
      minutes: "좌우 6–10회 · 2세트",
      description:
        "벽을 가볍게 밀며 한쪽 무릎을 낮게 들어 교대해 좁은 공간의 저충격 전신 협응을 연습합니다.",
      cues: ["가벼운 벽 밀기", "낮은 무릎 들기", "골반 수평"],
      benefits: ["전신 협응", "저충격 심폐 준비", "한발 지지"],
      warning:
        "손목·어깨·무릎·고관절 통증, 어지러움 또는 균형 상실이 있으면 제자리 체중 이동으로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["벽·손목 확인", "가벼운 벽 밀기", "낮은 무릎 들기"],
      finish: "양발로 서서 손목·어깨·무릎·호흡 반응을 확인합니다.",
      commonMistakes: [
        "무릎 과도하게 들기",
        "골반 기울기",
        "벽에 과도하게 기대기",
      ],
      regressions: ["체중 이동", "한쪽만", "벽 밀기 생략"],
      progressions: ["반복 증가", "느린 교대", "유지 1초"],
    },
  },
  {
    exercise: {
      id: "glute-bridge-adduction-squeeze-easy",
      name: "글루트 브리지 애덕션 스퀴즈",
      englishName: "Glute Bridge Adduction Squeeze",
      category: "맨몸운동",
      regions: ["둔근", "하체", "코어"],
      focus: "근력",
      difficulty: "입문",
      equipment: "매트 · 작은 수건 또는 쿠션 선택",
      minutes: "6–10회 · 2세트",
      description:
        "양발 브리지에서 무릎 사이의 수건·쿠션을 아주 가볍게 누르며 둔근과 골반의 정렬을 연습합니다.",
      cues: ["가벼운 스퀴즈", "골반 수평", "허리 과신전 금지"],
      benefits: ["둔근 제어", "고관절 안쪽 안정", "골반 정렬"],
      warning:
        "허리·고관절·무릎 통증, 햄스트링 경련 또는 압박 불편이 있으면 수건을 빼고 양발 브리지로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["매트·허리 확인", "양발 브리지 리허설", "가벼운 수건 스퀴즈"],
      finish:
        "수건을 빼고 양발을 매트에 두어 허리·고관절·무릎 반응을 확인합니다.",
      commonMistakes: ["허리 과신전", "스퀴즈 과도", "햄스트링 경련 무시"],
      regressions: ["양발 브리지", "수건 빼기", "범위 줄이기"],
      progressions: ["반복 증가", "상단 정지 1초", "유지 2초"],
    },
  },
  {
    exercise: {
      id: "prone-hip-extension-knee-bent-easy",
      name: "프론 힙 익스텐션 니 벤트",
      englishName: "Prone Hip Extension Knee Bent",
      category: "맨몸운동",
      regions: ["둔근", "하체", "코어"],
      focus: "근력",
      difficulty: "입문",
      equipment: "매트 또는 수건",
      minutes: "좌우 5–8회 · 2세트",
      description:
        "엎드린 자세에서 한쪽 무릎을 굽힌 채 발바닥을 천장 쪽으로 아주 작게 보내며 둔근 수축을 연습합니다.",
      cues: ["골반 바닥 유지", "작은 발바닥 리치", "허리 편안히"],
      benefits: ["둔근 인식", "고관절 신전", "골반 제어"],
      warning:
        "허리·고관절·무릎 통증, 경련 또는 허리가 꺾이는 느낌이 있으면 범위를 줄이거나 글루트 브리지로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["매트·허리 확인", "한쪽 무릎 굽힘", "작은 발바닥 리치"],
      finish: "다리를 매트에 두고 허리·고관절·무릎 반응을 확인합니다.",
      commonMistakes: ["허리 꺾임", "골반 들림", "범위 과도"],
      regressions: ["글루트 브리지", "발 리치 줄이기", "무릎 펴기"],
      progressions: ["반복 증가", "정지 1초", "좌우 교대"],
    },
  },
  {
    exercise: {
      id: "standing-hip-flexion-hold-support",
      name: "지지 스탠딩 힙 플렉션 홀드",
      englishName: "Supported Standing Hip Flexion Hold",
      category: "균형·협응",
      regions: ["하체", "코어", "둔근"],
      focus: "균형",
      difficulty: "입문",
      equipment: "벽 또는 의자",
      minutes: "좌우 5–12초 · 2회",
      description:
        "한 손 지지에서 한쪽 무릎을 낮게 들어 짧게 유지하며 고관절 앞쪽·골반과 한발 지지를 제어합니다.",
      cues: ["지지대 가까이", "낮은 무릎 들기", "골반 수평"],
      benefits: ["한발 균형", "고관절 제어", "보행 준비"],
      warning:
        "고관절·무릎·허리 통증, 어지러움 또는 균형 상실이 있으면 발끝을 바닥에 둔 마치로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["지지대·바닥 확인", "낮은 무릎 들기", "짧은 유지"],
      finish: "양발로 서서 고관절·무릎·균형 반응을 확인합니다.",
      commonMistakes: ["골반 기울기", "무릎 너무 높이", "지지대 멀리 섬"],
      regressions: ["발끝 탭", "유지 줄이기", "양손 지지"],
      progressions: ["유지 2초", "반복 증가", "지지 소폭 줄이기"],
    },
  },
  {
    exercise: {
      id: "wall-quad-set-easy",
      name: "월 쿼드 셋",
      englishName: "Wall Quad Set",
      category: "맨몸운동",
      regions: ["하체"],
      focus: "근력",
      difficulty: "입문",
      equipment: "단단한 벽",
      minutes: "5–12초 · 2회",
      description:
        "벽에 등을 대고 선 자세에서 한쪽 무릎을 무리 없이 펴며 허벅지 앞쪽을 가볍게 조이는 등척성 연습입니다.",
      cues: ["얕은 무릎 굽힘", "가벼운 허벅지 조임", "벽 지지"],
      benefits: ["대퇴 제어", "무릎 정렬 인식", "하체 지구력 준비"],
      warning:
        "무릎의 날카로운 통증·잠김·붓기·불안정 또는 최근 외상이 있으면 자가 운동보다 평가를 우선하세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["벽·무릎 확인", "얕은 무릎 굽힘", "가벼운 허벅지 조임"],
      finish: "벽에서 물러나 무릎·대퇴·발목 반응을 확인합니다.",
      commonMistakes: ["무릎 잠금", "힘 과도", "통증 무시"],
      regressions: ["앉은 대퇴 조임", "유지 줄이기", "양발 체중 이동"],
      progressions: ["유지 2초", "반복 증가", "좌우 교대"],
    },
  },
  {
    exercise: {
      id: "terminal-knee-extension-wall-easy",
      name: "터미널 니 익스텐션 월",
      englishName: "Terminal Knee Extension Wall",
      category: "맨몸운동",
      regions: ["하체", "둔근"],
      focus: "협응",
      difficulty: "입문",
      equipment: "단단한 벽 · 수건 선택",
      minutes: "좌우 5–10회 · 2세트",
      description:
        "벽 지지에서 무릎을 아주 작은 범위로 펴고 풀며 허벅지·발 전체의 정렬을 천천히 연습합니다.",
      cues: ["발 전체 지지", "작은 무릎 펴기", "골반 수평"],
      benefits: ["무릎 정렬 인식", "대퇴 협응", "보행 준비"],
      warning:
        "무릎 통증·부기·잠김·불안정 또는 수술 후 제한이 있으면 수행하지 말고 전문가의 지침을 따르세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["벽·무릎 확인", "발 전체 지지", "작은 무릎 펴기"],
      finish: "중립 자세로 서서 무릎·대퇴·발목 반응을 확인합니다.",
      commonMistakes: ["무릎 잠금", "몸통 기울기", "통증 무시"],
      regressions: ["범위 줄이기", "앉은 대퇴 조임", "벽 지지"],
      progressions: ["반복 증가", "정지 1초", "느린 복귀"],
    },
  },
  {
    exercise: {
      id: "supported-squat-pulse-easy",
      name: "지지 스쿼트 펄스",
      englishName: "Supported Squat Pulse",
      category: "맨몸운동",
      regions: ["하체", "둔근", "코어"],
      focus: "체력",
      difficulty: "입문",
      equipment: "벽 또는 의자",
      minutes: "6–12회 · 2세트",
      description:
        "지지대를 가까이 둔 얕은 스쿼트에서 아주 작은 위아래 펄스로 하체 지구력과 정렬을 연습합니다.",
      cues: ["얕은 범위", "발 전체 지지", "작은 펄스"],
      benefits: ["하체 지구력", "스쿼트 제어", "무릎 정렬"],
      warning:
        "무릎·고관절·허리 통증, 어지러움 또는 무릎 안쪽 붕괴가 있으면 의자 일어서기로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["지지대·바닥 확인", "얕은 스쿼트", "작은 펄스"],
      finish: "지지대를 잡고 천천히 서서 무릎·고관절·호흡 반응을 확인합니다.",
      commonMistakes: ["깊이 과도", "무릎 안쪽 붕괴", "발꿈치 들림"],
      regressions: ["의자 일어서기", "펄스 생략", "범위 줄이기"],
      progressions: ["반복 증가", "느린 펄스", "정지 1초"],
    },
  },
  {
    exercise: {
      id: "forearm-tabletop-hold-easy",
      name: "포어암 테이블탑 홀드",
      englishName: "Forearm Tabletop Hold",
      category: "맨몸운동",
      regions: ["둔근", "코어", "어깨"],
      focus: "근력",
      difficulty: "입문",
      equipment: "매트",
      minutes: "5–12초 · 2회",
      description:
        "팔꿈치와 발을 매트에 두고 엉덩이를 낮게 들어 손목에 체중을 싣지 않는 후면 사슬 지지를 연습합니다.",
      cues: ["팔꿈치 아래 어깨", "낮은 엉덩이 들기", "목 길게"],
      benefits: ["손목 부담 저감 지지", "둔근 제어", "후면 사슬"],
      warning:
        "어깨·팔꿈치·목·허리 통증 또는 어지러움이 있으면 글루트 브리지나 옆누운 둔근 동작으로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["매트·팔꿈치 확인", "팔꿈치·발 지지", "낮은 엉덩이 들기"],
      finish: "골반을 매트에 두고 어깨·팔꿈치·목·허리 반응을 확인합니다.",
      commonMistakes: ["목 젖힘", "어깨 으쓱", "엉덩이 과도하게 들기"],
      regressions: ["글루트 브리지", "유지 줄이기", "팔꿈치 지지 생략"],
      progressions: ["유지 2초", "반복 증가", "발 위치 소폭"],
    },
  },
  {
    exercise: {
      id: "seated-forearm-pronation-supination",
      name: "시티드 전완 회내·회외",
      englishName: "Seated Forearm Pronation Supination",
      category: "맨몸운동",
      regions: ["팔"],
      focus: "가동성",
      difficulty: "입문",
      equipment: "안정된 의자",
      minutes: "좌우 6–10회 · 1–2세트",
      description:
        "팔꿈치를 몸통 가까이에 두고 손바닥을 천천히 위아래로 돌려 전완의 편안한 회전을 탐색합니다.",
      cues: ["팔꿈치 고정", "작은 회전", "손목 중립"],
      benefits: ["전완 가동성", "그립 준비", "손목 위치 인식"],
      warning:
        "손목·팔꿈치 통증, 저림·붓기 또는 최근 외상이 있으면 범위를 줄이거나 의료 평가를 우선하세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["의자·팔꿈치 확인", "팔꿈치 몸통 가까이", "작은 손바닥 회전"],
      finish: "손을 편안히 펴고 손목·팔꿈치 반응을 확인합니다.",
      commonMistakes: ["손목 꺾임", "회전 과도", "저림 무시"],
      regressions: ["범위 줄이기", "한 방향만", "팔 지지"],
      progressions: ["반복 증가", "느린 회전", "좌우 비교"],
    },
  },
  {
    exercise: {
      id: "forearm-wall-slide-easy",
      name: "포어암 월 슬라이드",
      englishName: "Forearm Wall Slide",
      category: "맨몸운동",
      regions: ["어깨", "등", "코어"],
      focus: "협응",
      difficulty: "입문",
      equipment: "단단한 벽",
      minutes: "5–8회 · 2세트",
      description:
        "전완을 벽에 댄 채 낮은 범위로 위아래를 움직이며 손목 부담을 낮춘 어깨·견갑 제어를 연습합니다.",
      cues: ["전완 벽 지지", "낮은 범위", "목 이완"],
      benefits: ["어깨 안정", "견갑 제어", "손목 부담 저감"],
      warning:
        "어깨·팔꿈치 통증, 저림 또는 벽에서 전완이 미끄러지면 중단하고 더 낮은 범위로 바꾸세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["벽·전완 확인", "낮은 전완 지지", "작은 위아래 슬라이드"],
      finish: "전완을 내리고 어깨·팔꿈치·손목 반응을 확인합니다.",
      commonMistakes: ["목 으쓱", "허리 과신전", "범위 과도"],
      regressions: ["정지 벽 지지", "범위 줄이기", "한쪽씩"],
      progressions: ["반복 증가", "정지 1초", "범위 소폭"],
    },
  },
  {
    exercise: {
      id: "kneeling-hip-shift-clock",
      name: "니링 힙 시프트 클락",
      englishName: "Kneeling Hip Shift Clock",
      category: "맨몸운동",
      regions: ["둔근", "하체", "코어"],
      focus: "협응",
      difficulty: "입문",
      equipment: "매트",
      minutes: "좌우 4–8회 · 2세트",
      description:
        "양무릎 자세에서 엉덩이를 앞·옆·뒤로 작은 방향으로 옮기며 좁은 공간에서 고관절 체중 이동을 연습합니다.",
      cues: ["무릎 아래 매트", "작은 이동", "호흡 유지"],
      benefits: ["고관절 이동", "골반 인식", "바닥 전환 준비"],
      warning:
        "무릎·고관절·허리 통증, 최근 수술 또는 어지러움이 있으면 앉은 골반 틸트로 낮추거나 중단하세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["매트·무릎 확인", "양무릎 자세", "작은 방향 이동"],
      finish: "앉은 자세로 돌아와 무릎·고관절·허리 반응을 확인합니다.",
      commonMistakes: ["이동 과도", "허리 꺾임", "무릎 통증 무시"],
      regressions: ["시티드 펠빅 틸트", "범위 줄이기", "앞뒤 이동만"],
      progressions: ["방향 1개 추가", "반복 증가", "정지 1초"],
    },
  },
  {
    exercise: {
      id: "squat-to-half-kneel-support",
      name: "지지 스쿼트 투 하프 니",
      englishName: "Supported Squat to Half Kneel",
      category: "균형·협응",
      regions: ["하체", "둔근", "코어"],
      focus: "협응",
      difficulty: "중급",
      equipment: "튼튼한 의자 또는 벽 · 매트",
      minutes: "좌우 2–5회 · 2세트",
      description:
        "지지대 가까이에서 얕은 스쿼트와 한쪽 무릎 내리기를 천천히 연결해 좁은 공간 전환을 연습합니다.",
      cues: ["지지대 가까이", "한 단계씩", "무릎 아래 매트"],
      benefits: ["바닥 전환", "하체 협응", "균형"],
      warning:
        "무릎·고관절 통증, 최근 낙상·수술, 균형 상실 또는 어지러움이 있으면 혼자 수행하지 마세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["지지대·매트 확인", "얕은 스쿼트", "한 단계씩 무릎 내리기"],
      finish: "지지대를 잡고 천천히 서서 무릎·고관절·균형 반응을 확인합니다.",
      commonMistakes: ["급한 전환", "무릎 비틀기", "지지대 없이 진행"],
      regressions: ["하프 니 홀드", "스쿼트만", "양손 지지"],
      progressions: ["반복 증가", "좌우 교대", "지지 소폭 줄이기"],
    },
  },
  {
    exercise: {
      id: "side-lying-clam-hold-easy",
      name: "사이드 라잉 클램 홀드",
      englishName: "Side-Lying Clam Hold",
      category: "맨몸운동",
      regions: ["둔근", "하체", "코어"],
      focus: "근력",
      difficulty: "입문",
      equipment: "매트",
      minutes: "좌우 5–12초 · 2회",
      description:
        "옆으로 누워 무릎을 굽힌 채 위쪽 무릎을 작은 범위로 열고 짧게 유지하며 옆엉덩이 제어를 연습합니다.",
      cues: ["발 붙이기", "골반 쌓기", "작게 열기"],
      benefits: ["둔근 등척성", "골반 안정", "고관절 제어"],
      warning:
        "고관절·허리 통증, 저림 또는 골반이 뒤로 넘어가면 범위를 줄이거나 옆누운 정지로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["매트·고관절 확인", "발 붙이기", "작은 무릎 열기"],
      finish: "무릎을 포개고 고관절·허리 반응을 확인합니다.",
      commonMistakes: ["골반 뒤집힘", "무릎 너무 높이", "허리 통증 무시"],
      regressions: ["옆누운 정지", "범위 줄이기", "유지 생략"],
      progressions: ["유지 2초", "반복 증가", "정지 1초"],
    },
  },
  {
    exercise: {
      id: "seated-pelvic-tilt-easy",
      name: "시티드 펠빅 틸트",
      englishName: "Seated Pelvic Tilt",
      category: "모빌리티",
      regions: ["코어", "둔근", "하체"],
      focus: "가동성",
      difficulty: "입문",
      equipment: "안정된 의자",
      minutes: "6–10회 · 1–2세트",
      description:
        "의자에 편안히 앉아 골반을 작게 앞뒤로 기울이며 오래 앉은 뒤 허리·골반 위치를 부드럽게 탐색합니다.",
      cues: ["발 바닥 고정", "작은 골반 움직임", "호흡 유지"],
      benefits: ["골반 위치 인식", "허리 부담 완화 보조", "앉은 자세 리셋"],
      warning:
        "허리·고관절 통증, 저림 또는 어지러움이 있으면 범위를 줄이거나 중단하고 필요한 평가를 우선하세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["의자 안정 확인", "발 바닥 고정", "작은 골반 기울임"],
      finish: "중립 자세로 앉아 허리·고관절·호흡 반응을 확인합니다.",
      commonMistakes: ["상체 과도 젖힘", "숨 참기", "통증 무시"],
      regressions: ["호흡만", "범위 줄이기", "등받이 지지"],
      progressions: ["반복 증가", "느린 전환", "정지 1초"],
    },
  },
  {
    exercise: {
      id: "chair-thoracic-extension-easy",
      name: "의자 흉추 신전",
      englishName: "Chair Thoracic Extension",
      category: "모빌리티",
      regions: ["등", "어깨", "코어"],
      focus: "가동성",
      difficulty: "입문",
      equipment: "등받이 있는 안정된 의자",
      minutes: "5–8회 · 1–2세트",
      description:
        "등받이에 등 상부를 가볍게 기대고 가슴을 작은 범위로 열어 오래 앉은 뒤 흉곽 움직임을 탐색합니다.",
      cues: ["등받이 안정", "목 길게", "작은 열기"],
      benefits: ["흉추 가동성", "자세 인식", "어깨 움직임 준비"],
      warning:
        "목·등·허리 통증, 어지러움 또는 의자 흔들림이 있으면 앉은 호흡·팔 리치로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["의자·등받이 확인", "등 상부 가볍게 기대기", "작은 가슴 열기"],
      finish: "중립 자세로 앉아 목·등·허리 반응을 확인합니다.",
      commonMistakes: ["목 과신전", "허리 과신전", "의자 흔들림 무시"],
      regressions: ["앉은 호흡", "범위 줄이기", "등받이 없이 리치"],
      progressions: ["반복 증가", "호흡 길게", "범위 소폭"],
    },
  },
  {
    exercise: {
      id: "seated-spinal-twist-easy",
      name: "시티드 스파이널 트위스트",
      englishName: "Seated Spinal Twist",
      category: "모빌리티",
      regions: ["등", "코어", "하체"],
      focus: "가동성",
      difficulty: "입문",
      equipment: "안정된 의자",
      minutes: "좌우 4–8회 · 1–2세트",
      description:
        "의자에 앉아 가슴과 팔을 작게 옆으로 돌리며 허리를 억지로 비틀지 않고 흉곽 회전을 연습합니다.",
      cues: ["골반 안정", "가슴부터 회전", "작은 범위"],
      benefits: ["흉곽 회전", "앉은 자세 리셋", "호흡 협응"],
      warning:
        "허리·고관절 통증, 저림·방사통 또는 어지러움이 있으면 회전을 줄이거나 중단하세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["의자 안정 확인", "골반 중립", "작은 흉곽 회전"],
      finish: "정면으로 돌아와 허리·고관절·호흡 반응을 확인합니다.",
      commonMistakes: ["허리만 비틀기", "팔로 억지로 당김", "통증 무시"],
      regressions: ["머리만 돌리기", "범위 줄이기", "호흡만"],
      progressions: ["반복 증가", "정지 1초", "대각선 리치"],
    },
  },
  {
    exercise: {
      id: "seated-posture-reset-reach",
      name: "시티드 포스처 리셋 리치",
      englishName: "Seated Posture Reset Reach",
      category: "맨몸운동",
      regions: ["등", "어깨", "코어"],
      focus: "협응",
      difficulty: "입문",
      equipment: "안정된 의자",
      minutes: "좌우 5–8회 · 1–2세트",
      description:
        "의자에 앉아 몸통을 길게 세운 뒤 한쪽 팔을 낮게 대각선으로 뻗어 앉은 자세의 몸통·어깨 협응을 리셋합니다.",
      cues: ["발 바닥 고정", "몸통 길게", "낮은 대각선 리치"],
      benefits: ["자세 인식", "어깨 협응", "좁은 공간 움직임"],
      warning:
        "어깨·목·허리 통증, 어지러움 또는 의자 불안정이 있으면 팔 범위를 줄이거나 앉은 호흡으로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["의자 안정 확인", "몸통 길게", "낮은 대각선 리치"],
      finish: "팔을 내리고 목·어깨·허리 반응을 확인합니다.",
      commonMistakes: ["어깨 으쓱", "허리 젖힘", "의자 흔들림 무시"],
      regressions: ["팔 범위 줄이기", "호흡만", "한쪽씩"],
      progressions: ["반복 증가", "느린 리치", "정지 1초"],
    },
  },
  {
    exercise: {
      id: "wall-snow-angel-easy",
      name: "월 스노우 엔젤",
      englishName: "Wall Snow Angel",
      category: "맨몸운동",
      regions: ["어깨", "등", "코어"],
      focus: "협응",
      difficulty: "입문",
      equipment: "단단한 벽",
      minutes: "5–8회 · 2세트",
      description:
        "벽에 기대어 팔을 낮은 범위에서 천천히 위아래로 움직이며 견갑과 어깨의 편안한 경로를 탐색합니다.",
      cues: ["벽 지지", "작은 팔 범위", "목 이완"],
      benefits: ["어깨 이동", "견갑 인식", "자세 준비"],
      warning:
        "어깨·목·허리 통증, 저림 또는 팔을 올릴 때 불편이 있으면 월 슬라이드나 범위 축소로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["벽·어깨 확인", "낮은 팔 위치", "작은 위아래 이동"],
      finish: "팔을 내리고 목·어깨·허리 반응을 확인합니다.",
      commonMistakes: ["허리 과신전", "목 으쓱", "팔 범위 과도"],
      regressions: ["월 슬라이드", "범위 줄이기", "한쪽씩"],
      progressions: ["반복 증가", "정지 1초", "범위 소폭"],
    },
  },
  {
    exercise: {
      id: "prone-cobra-hold-easy",
      name: "프론 코브라 홀드",
      englishName: "Prone Cobra Hold",
      category: "맨몸운동",
      regions: ["등", "어깨", "둔근", "코어"],
      focus: "근력",
      difficulty: "입문",
      equipment: "매트 또는 수건",
      minutes: "5–12초 · 2회",
      description:
        "엎드린 자세에서 팔을 몸통 옆에 두고 가슴과 손을 아주 작게 들어 등 상부·둔근의 정적 제어를 연습합니다.",
      cues: ["목 길게", "작은 가슴 들기", "엉덩이 가볍게 조이기"],
      benefits: ["등 상부 지구력", "자세 인식", "후면 사슬 제어"],
      warning:
        "허리·목·어깨 통증, 어지러움 또는 숨 참기가 있으면 엎드린 W 풀이나 바닥 휴식으로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["매트·목 확인", "팔 몸통 옆", "작은 가슴 들기"],
      finish: "가슴을 매트에 두고 목·등·허리 반응을 확인합니다.",
      commonMistakes: ["목 젖힘", "허리 과신전", "숨 참기"],
      regressions: ["프론 W 풀", "유지 줄이기", "가슴 들기 생략"],
      progressions: ["유지 2초", "반복 증가", "팔 뒤쪽 리치"],
    },
  },
  {
    exercise: {
      id: "self-resisted-row-easy",
      name: "셀프 레지스티드 로우",
      englishName: "Self-Resisted Row",
      category: "맨몸운동",
      regions: ["등", "팔", "어깨", "코어"],
      focus: "근력",
      difficulty: "입문",
      equipment: "없음",
      minutes: "좌우 5–8회 · 2세트",
      description:
        "한 손으로 반대 손목·전완에 아주 가벼운 저항을 주고 팔꿈치를 뒤로 보내 수평 당기기 패턴을 연습합니다.",
      cues: ["가벼운 저항", "팔꿈치 뒤로", "목 이완"],
      benefits: ["당기기 패턴", "견갑 제어", "장비 없는 등 자극"],
      warning:
        "어깨·팔꿈치·손목 통증, 저림 또는 힘으로 버티려는 느낌이 있으면 저항을 낮추거나 벽 리치로 바꾸세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["어깨·팔꿈치 확인", "반대 손목 가볍게 잡기", "작은 당기기"],
      finish: "팔을 내리고 어깨·팔꿈치·손목 반응을 확인합니다.",
      commonMistakes: ["저항 과도", "목 으쓱", "몸통 반동"],
      regressions: ["압력 줄이기", "팔 이동 줄이기", "벽 리치"],
      progressions: ["반복 증가", "정지 1초", "좌우 비교"],
    },
  },
  {
    exercise: {
      id: "wall-lat-press-isometric-easy",
      name: "월 랫 프레스 아이소메트릭",
      englishName: "Wall Lat Press Isometric",
      category: "맨몸운동",
      regions: ["등", "어깨", "코어"],
      focus: "근력",
      difficulty: "입문",
      equipment: "단단한 벽",
      minutes: "좌우 5–12초 · 2회",
      description:
        "벽 옆에 서서 팔꿈치·전완으로 벽을 아주 가볍게 아래·뒤 방향으로 누르며 옆등과 견갑의 정적 지지를 연습합니다.",
      cues: ["가벼운 압력", "목 이완", "몸통 길게"],
      benefits: ["옆등 제어", "어깨 안정", "당기기 준비"],
      warning:
        "어깨·팔꿈치·손목 통증, 저림 또는 벽 미끄러움이 있으면 중단하고 팔을 편안히 내리세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["벽·어깨 확인", "전완 벽 지지", "가벼운 아래 압력"],
      finish: "팔을 내리고 어깨·팔꿈치·손목 반응을 확인합니다.",
      commonMistakes: ["압력 과도", "목 으쓱", "벽 미끄러움 무시"],
      regressions: ["압력 줄이기", "손바닥 벽 지지", "유지 줄이기"],
      progressions: ["유지 2초", "반복 증가", "좌우 비교"],
    },
  },
  {
    exercise: {
      id: "forearm-plank-knee-hold",
      name: "포어암 플랭크 니 홀드",
      englishName: "Forearm Plank Knee Hold",
      category: "맨몸운동",
      regions: ["코어", "어깨", "둔근"],
      focus: "근력",
      difficulty: "입문",
      equipment: "매트",
      minutes: "8–20초 · 2회",
      description:
        "팔꿈치와 무릎을 매트에 둔 플랭크에서 손목에 체중을 싣지 않고 몸통의 짧은 정적 지지를 연습합니다.",
      cues: ["팔꿈치 아래 어깨", "무릎 지지", "호흡 유지"],
      benefits: ["손목 부담 저감 코어", "어깨 지지", "몸통 안정"],
      warning:
        "어깨·팔꿈치·허리 통증, 저림 또는 숨 참기가 있으면 더 짧게 유지하거나 누운 코어 동작으로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["매트·팔꿈치 확인", "무릎 지지", "짧은 몸통 정렬"],
      finish: "무릎을 매트에 두고 어깨·팔꿈치·허리 반응을 확인합니다.",
      commonMistakes: ["골반 처짐", "어깨 으쓱", "숨 참기"],
      regressions: ["팔꿈치 네발 홀드", "유지 줄이기", "누운 코어"],
      progressions: ["유지 2초", "반복 증가", "무릎 위치 소폭"],
    },
  },
  {
    exercise: {
      id: "supine-heel-press-90-90",
      name: "수파인 90·90 힐 프레스",
      englishName: "Supine 90-90 Heel Press",
      category: "맨몸운동",
      regions: ["코어", "하체"],
      focus: "근력",
      difficulty: "입문",
      equipment: "매트 또는 벽 선택",
      minutes: "5–12초 · 2회",
      description:
        "누운 자세에서 무릎·고관절을 편안히 굽히고 뒤꿈치를 바닥이나 벽에 아주 가볍게 누르며 복부·햄스트링 제어를 연습합니다.",
      cues: ["허리 편안히", "가벼운 뒤꿈치 압력", "숨 내쉬기"],
      benefits: ["손목 부담 없는 코어", "햄스트링 인식", "골반 안정"],
      warning:
        "허리·고관절·무릎 통증, 경련 또는 복부 압박 불편이 있으면 힘과 유지 시간을 줄이세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["매트·허리 확인", "무릎 편안히 굽힘", "가벼운 뒤꿈치 압력"],
      finish: "압력을 풀고 허리·고관절·무릎 반응을 확인합니다.",
      commonMistakes: ["힘 과도", "허리 과신전", "숨 참기"],
      regressions: ["압력 줄이기", "발 바닥 유지", "유지 줄이기"],
      progressions: ["유지 2초", "반복 증가", "교대 압력"],
    },
  },
  {
    exercise: {
      id: "side-lying-hip-abduction-hold",
      name: "사이드 라잉 힙 어브덕션 홀드",
      englishName: "Side-Lying Hip Abduction Hold",
      category: "맨몸운동",
      regions: ["둔근", "하체", "코어"],
      focus: "근력",
      difficulty: "입문",
      equipment: "매트",
      minutes: "좌우 5–15초 · 2회",
      description:
        "옆으로 누워 위쪽 다리를 작은 범위로 들어 짧게 유지하며 옆엉덩이와 골반의 정적 제어를 연습합니다.",
      cues: ["골반 쌓기", "낮은 다리 들기", "목 편안히"],
      benefits: ["둔근 등척성", "골반 안정", "한발 지지 준비"],
      warning:
        "고관절·허리 통증, 저림 또는 다리를 들 때 골반이 뒤로 넘어가면 범위를 줄이거나 옆누운 정지로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["매트·고관절 확인", "골반 쌓기", "낮은 다리 들기"],
      finish: "다리를 매트에 두고 고관절·허리 반응을 확인합니다.",
      commonMistakes: ["골반 뒤집힘", "다리 너무 높이", "허리 통증 무시"],
      regressions: ["옆누운 정지", "범위 줄이기", "무릎 굽힘"],
      progressions: ["유지 2초", "반복 증가", "정지 1초"],
    },
  },
  {
    exercise: {
      id: "standing-clock-reach-support",
      name: "지지 스탠딩 클락 리치",
      englishName: "Supported Standing Clock Reach",
      category: "균형·협응",
      regions: ["하체", "둔근", "코어"],
      focus: "협응",
      difficulty: "입문",
      equipment: "벽 또는 의자",
      minutes: "좌우 4–8회 · 2세트",
      description:
        "한 손 지지에서 반대 발끝을 앞·옆·뒤 방향으로 작게 탭해 좁은 공간에서 체중 이동과 균형을 연습합니다.",
      cues: ["지지대 가까이", "작은 발끝 탭", "골반 수평"],
      benefits: ["균형", "방향 인식", "좁은 공간 협응"],
      warning:
        "어지러움·균형 상실·무릎·발목·고관절 통증 또는 바닥 미끄러움이 있으면 양발 체중 이동으로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["지지대·바닥 확인", "작은 발끝 탭", "골반 수평"],
      finish: "양발로 서서 발목·무릎·고관절·균형 반응을 확인합니다.",
      commonMistakes: ["발 탭 과도", "지지대 멀리 섬", "무릎 안쪽 붕괴"],
      regressions: ["양발 체중 이동", "범위 줄이기", "양손 지지"],
      progressions: ["반복 증가", "방향 1개 추가", "지지 소폭 줄이기"],
    },
  },
  {
    exercise: {
      id: "half-kneeling-to-stand-support",
      name: "지지 하프 니링 투 스탠드",
      englishName: "Supported Half-Kneeling to Stand",
      category: "균형·협응",
      regions: ["하체", "둔근", "코어"],
      focus: "협응",
      difficulty: "입문",
      equipment: "튼튼한 의자 또는 벽 · 매트",
      minutes: "좌우 3–6회 · 2세트",
      description:
        "한쪽 무릎을 매트에 둔 반무릎 자세에서 지지대를 이용해 천천히 서고 다시 내려가는 바닥 전환 연습입니다.",
      cues: ["지지대 가까이", "한 단계씩", "무릎 아래 매트"],
      benefits: ["바닥 전환", "하체 협응", "일상 이동"],
      warning:
        "최근 낙상·수술·관절 치환, 심한 무릎·고관절 통증 또는 어지러움이 있으면 혼자 수행하지 마세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["매트·지지대 확인", "반무릎 자세 리허설", "한 단계씩 이동"],
      finish: "지지대 가까이 선 뒤 무릎·고관절·어지러움 반응을 확인합니다.",
      commonMistakes: [
        "지지대 없이 급하게 전환",
        "무릎 통증 무시",
        "주변 공간 미확인",
      ],
      regressions: ["반무릎 홀드", "더 높은 지지면", "보조자와 연습"],
      progressions: ["반복 1회", "좌우 교대", "지지 소폭 줄이기"],
    },
  },
  {
    exercise: {
      id: "side-sit-to-kneel-support",
      name: "지지 사이드 싯 투 니",
      englishName: "Supported Side Sit to Kneel",
      category: "균형·협응",
      regions: ["하체", "둔근", "코어", "팔"],
      focus: "협응",
      difficulty: "중급",
      equipment: "튼튼한 의자 또는 벽 · 매트",
      minutes: "좌우 2–5회 · 2세트",
      description:
        "옆으로 앉은 자세에서 손과 지지대를 활용해 무릎 자세로 천천히 전환하는 이동 패턴입니다.",
      cues: ["매트 사용", "손 지지 준비", "천천히 전환"],
      benefits: ["바닥 이동", "고관절 협응", "어깨 지지"],
      warning:
        "손목·무릎·고관절 통증, 최근 낙상 또는 어지러움이 있으면 더 높은 지지면과 함께 수행하거나 보류하세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["매트·지지대 확인", "옆 앉기 리허설", "손 지지 준비"],
      finish: "안정된 자세로 앉아 손목·무릎·고관절 반응을 확인합니다.",
      commonMistakes: ["손 지지 생략", "급한 전환", "통증 무시"],
      regressions: ["옆 앉기만", "더 높은 지지면", "단계 분리"],
      progressions: ["좌우 교대", "반복 증가", "지지 소폭 줄이기"],
    },
  },
  {
    exercise: {
      id: "dead-bug-isometric-press",
      name: "데드 버그 아이소메트릭 프레스",
      englishName: "Dead Bug Isometric Press",
      category: "맨몸운동",
      regions: ["코어", "하체", "팔"],
      focus: "근력",
      difficulty: "입문",
      equipment: "매트",
      minutes: "좌우 5–15초 · 2회",
      description:
        "누운 자세에서 반대쪽 손과 허벅지를 가볍게 서로 밀며 몸통 정렬을 유지하는 등척성 코어 동작입니다.",
      cues: ["숨 참지 않기", "허리 편안히", "가볍게 밀기"],
      benefits: ["복압 조절", "교차 코어 안정", "허리 중립 인식"],
      warning:
        "허리·고관절·목 통증, 복부 압박 불편 또는 숨 참기가 생기면 힘을 낮추거나 발을 바닥에 두세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["매트·허리 반응 확인", "한쪽 무릎 90도", "반대손 가볍게 대기"],
      finish: "발을 매트에 두고 허리·고관절·호흡 반응을 확인합니다.",
      commonMistakes: ["숨 참기", "허리 과신전", "너무 세게 밀기"],
      regressions: ["발 바닥 유지", "힘 줄이기", "한쪽만 연습"],
      progressions: ["유지 2초", "교대 증가", "반복 증가"],
    },
  },
  {
    exercise: {
      id: "quadruped-reach-back-easy",
      name: "네발 리치백",
      englishName: "Quadruped Reach Back",
      category: "맨몸운동",
      regions: ["코어", "어깨", "둔근", "하체"],
      focus: "가동성",
      difficulty: "입문",
      equipment: "매트",
      minutes: "좌우 5–8회 · 2세트",
      description:
        "네발 자세에서 한 손을 반대쪽 발목 방향으로 작게 보내며 체중 이동과 흉곽 회전을 부드럽게 연습합니다.",
      cues: ["무릎 지지", "작은 리치", "손바닥 고르게"],
      benefits: ["흉곽 회전", "어깨 지지", "고관절 이동"],
      warning:
        "손목·어깨·허리·무릎 통증 또는 손 미끄러짐이 있으면 네발 자세 정지나 범위 축소로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["매트·손목 확인", "네발 자세", "작은 리치"],
      finish: "무릎을 매트에 두고 손목·어깨·허리 반응을 확인합니다.",
      commonMistakes: ["골반 과도 회전", "손 미끄러짐 무시", "목 긴장"],
      regressions: ["네발 홀드", "범위 줄이기", "손 이동 생략"],
      progressions: ["반복 증가", "정지 1초", "리치 소폭"],
    },
  },
  {
    exercise: {
      id: "wall-slide-lift-off-easy",
      name: "월 슬라이드 리프트오프",
      englishName: "Wall Slide Lift-off",
      category: "맨몸운동",
      regions: ["어깨", "등", "코어"],
      focus: "협응",
      difficulty: "입문",
      equipment: "단단한 벽",
      minutes: "5–8회 · 2세트",
      description:
        "벽에 팔을 댄 채 낮은 범위로 올린 뒤 손을 아주 작게 떼어 견갑과 어깨의 제어를 연습합니다.",
      cues: ["목 길게", "작은 리프트", "허리 과신전 금지"],
      benefits: ["어깨 안정", "견갑 제어", "팔 올리기 준비"],
      warning:
        "어깨·목·허리 통증, 저림 또는 벽에서 팔을 뗄 때 불편이 있으면 월 슬라이드만 수행하세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["벽·어깨 반응 확인", "낮은 월 슬라이드", "작은 손 떼기"],
      finish: "팔을 내리고 목·어깨·허리 반응을 확인합니다.",
      commonMistakes: ["허리 과신전", "어깨 으쓱", "리프트 과도"],
      regressions: ["월 슬라이드", "범위 줄이기", "손 떼기 생략"],
      progressions: ["반복 증가", "정지 1초", "범위 소폭"],
    },
  },
  {
    exercise: {
      id: "prone-external-rotation-lift-easy",
      name: "프론 외회전 리프트",
      englishName: "Prone External Rotation Lift",
      category: "맨몸운동",
      regions: ["어깨", "등"],
      focus: "근력",
      difficulty: "입문",
      equipment: "매트 또는 수건",
      minutes: "좌우 5–8회 · 2세트",
      description:
        "엎드린 자세에서 팔꿈치를 옆에 두고 손등을 천천히 들어 어깨 뒤쪽의 가벼운 제어를 연습합니다.",
      cues: ["이마 편안히", "작은 손등 들기", "목 힘 빼기"],
      benefits: ["어깨 뒤쪽 제어", "견갑 안정", "자세 인식"],
      warning:
        "어깨·목 통증, 저림 또는 팔을 들 때 불편이 있으면 범위를 줄이거나 월 슬라이드로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["매트·목 반응 확인", "팔꿈치 옆", "작은 손등 들기"],
      finish: "팔을 매트에 두고 목·어깨 반응을 확인합니다.",
      commonMistakes: ["목 젖힘", "어깨 으쓱", "팔 너무 높이"],
      regressions: ["월 슬라이드", "범위 줄이기", "팔 지지"],
      progressions: ["반복 증가", "정지 1초", "좌우 비교"],
    },
  },
  {
    exercise: {
      id: "short-foot-doming-easy",
      name: "쇼트 풋 도밍",
      englishName: "Short Foot Doming",
      category: "맨몸운동",
      regions: ["하체", "코어"],
      focus: "협응",
      difficulty: "입문",
      equipment: "의자 또는 벽 선택",
      minutes: "좌우 5–10회 · 2세트",
      description:
        "발가락을 구부리지 않고 발바닥 아치를 짧게 끌어올려 발의 지지 감각을 연습합니다.",
      cues: ["발가락 길게", "아치만 작게", "발목 편안히"],
      benefits: ["발 아치 인식", "균형 준비", "발목 제어"],
      warning:
        "발바닥·발가락·발목의 날카로운 통증, 경련 또는 감각 이상이 있으면 중단하고 편안한 발 체중 이동으로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["발바닥 반응 확인", "발가락 길게", "작은 아치 만들기"],
      finish: "발 전체를 바닥에 두고 발가락·발목 반응을 확인합니다.",
      commonMistakes: ["발가락 구부림", "경련 무시", "발목 긴장"],
      regressions: ["앉아서 수행", "범위 줄이기", "발 체중 이동"],
      progressions: ["유지 2초", "반복 증가", "벽 지지 줄이기"],
    },
  },
  {
    exercise: {
      id: "toe-yoga-easy",
      name: "토 요가",
      englishName: "Toe Yoga",
      category: "맨몸운동",
      regions: ["하체"],
      focus: "협응",
      difficulty: "입문",
      equipment: "의자 선택",
      minutes: "좌우 5–10회 · 2세트",
      description:
        "엄지발가락과 나머지 발가락을 번갈아 들어 발가락의 분리 움직임과 발 지지 인식을 연습합니다.",
      cues: ["발바닥 고정", "작은 움직임", "경련 전 멈추기"],
      benefits: ["발가락 협응", "발 아치 인식", "균형 준비"],
      warning:
        "발가락·발바닥 통증, 경련 또는 신경 증상이 있으면 즉시 멈추고 움직임 범위를 줄이세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["발바닥 안정", "엄지 들기", "나머지 발가락 들기"],
      finish: "발 전체를 바닥에 두고 발가락·발바닥 반응을 확인합니다.",
      commonMistakes: ["발바닥 들림", "경련 무시", "급한 움직임"],
      regressions: ["앉아서 수행", "한 방향만", "반복 줄이기"],
      progressions: ["반복 증가", "천천히 교대", "벽 지지 줄이기"],
    },
  },
  {
    exercise: {
      id: "tibialis-wall-raise-easy",
      name: "티비알리스 월 레이즈",
      englishName: "Tibialis Wall Raise",
      category: "맨몸운동",
      regions: ["하체"],
      focus: "근력",
      difficulty: "입문",
      equipment: "단단한 벽",
      minutes: "6–12회 · 2세트",
      description:
        "벽에 등을 기대고 발뒤꿈치를 바닥에 둔 채 발앞쪽을 작게 들어 정강이 앞쪽을 제어합니다.",
      cues: ["뒤꿈치 고정", "발끝 작게 들기", "무릎 편안히"],
      benefits: ["정강이 앞쪽 근력", "발목 제어", "보행 준비"],
      warning:
        "정강이·발목 통증, 경련 또는 균형 상실이 있으면 앉아서 발끝 들기로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["벽·발목 확인", "뒤꿈치 고정", "작은 발끝 들기"],
      finish: "발 전체를 바닥에 두고 정강이·발목 반응을 확인합니다.",
      commonMistakes: ["몸 기울기 과도", "발끝 급히 내림", "통증 무시"],
      regressions: ["앉은 발끝 들기", "반복 줄이기", "벽 지지"],
      progressions: ["반복 증가", "상단 정지 1초", "느린 하강"],
    },
  },
  {
    exercise: {
      id: "soleus-wall-raise-easy",
      name: "솔레우스 월 레이즈",
      englishName: "Soleus Wall Raise",
      category: "맨몸운동",
      regions: ["하체"],
      focus: "근력",
      difficulty: "입문",
      equipment: "단단한 벽",
      minutes: "6–12회 · 2세트",
      description:
        "벽 지지에서 무릎을 살짝 굽힌 채 발뒤꿈치를 작게 들어 종아리 깊은 층의 지구력을 연습합니다.",
      cues: ["무릎 살짝 굽힘", "작은 발꿈치 들기", "벽 지지"],
      benefits: ["종아리 지구력", "발목 제어", "보행 준비"],
      warning:
        "종아리·아킬레스건·무릎 통증 또는 경련이 있으면 범위를 줄이거나 지지 카프 레이즈로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["벽·발목 확인", "무릎 살짝 굽힘", "작은 발꿈치 들기"],
      finish: "뒤꿈치를 바닥에 두고 종아리·발목 반응을 확인합니다.",
      commonMistakes: ["무릎 펴짐", "발꿈치 급히 내림", "경련 무시"],
      regressions: ["양발 카프 레이즈", "범위 줄이기", "유지 생략"],
      progressions: ["반복 증가", "상단 정지 1초", "느린 하강"],
    },
  },
  {
    exercise: {
      id: "single-leg-calf-hold-support",
      name: "지지 싱글 레그 카프 홀드",
      englishName: "Supported Single-Leg Calf Hold",
      category: "맨몸운동",
      regions: ["하체", "코어"],
      focus: "균형",
      difficulty: "중급",
      equipment: "벽 또는 의자",
      minutes: "좌우 5–12초 · 2회",
      description:
        "한 손 지지에서 한 발로 발뒤꿈치를 낮게 들어 짧게 유지하며 종아리·발목의 정적 제어를 연습합니다.",
      cues: ["손 지지", "낮은 들기", "발목 곧게"],
      benefits: ["종아리 등척성", "한발 균형", "발목 안정"],
      warning:
        "발목·아킬레스건·종아리 통증, 경련 또는 균형 상실이 있으면 양발 카프 레이즈로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["지지대·발목 확인", "낮은 발꿈치 들기", "짧은 유지"],
      finish: "양발로 서서 종아리·발목·균형 반응을 확인합니다.",
      commonMistakes: ["발목 바깥 붕괴", "경련 무시", "지지대 멀리 섬"],
      regressions: ["양발 카프 레이즈", "유지 줄이기", "양손 지지"],
      progressions: ["유지 2초", "반복 증가", "지지 소폭 줄이기"],
    },
  },
  {
    exercise: {
      id: "bear-plank-scapular-protraction",
      name: "베어 플랭크 스캐풀라 프로트랙션",
      englishName: "Bear Plank Scapular Protraction",
      category: "맨몸운동",
      regions: ["코어", "어깨", "등", "팔"],
      focus: "협응",
      difficulty: "중급",
      equipment: "매트",
      minutes: "5–8회 · 2세트",
      description:
        "무릎을 낮게 든 베어 플랭크에서 팔꿈치를 편 채 견갑골만 아주 작게 앞으로 보내 어깨 지지를 연습합니다.",
      cues: ["무릎 낮게", "작은 견갑 이동", "허리 중립"],
      benefits: ["어깨 지지", "코어 안정", "상체 협응"],
      warning:
        "손목·어깨·허리 통증, 손 미끄러짐 또는 호흡 정지가 있으면 네발 자세 스캐풀라 푸시업으로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["매트·손목 확인", "무릎 낮은 베어 플랭크", "작은 견갑 밀기"],
      finish: "무릎을 매트에 두고 손목·어깨·허리 반응을 확인합니다.",
      commonMistakes: ["팔꿈치 굽힘", "골반 처짐", "숨 참기"],
      regressions: ["네발 견갑 푸시업", "무릎 매트", "범위 줄이기"],
      progressions: ["반복 증가", "정지 1초", "무릎 높이 소폭"],
    },
  },
  {
    exercise: {
      id: "offset-wall-pushup",
      name: "오프셋 월 푸시업",
      englishName: "Offset Wall Push-up",
      category: "맨몸운동",
      regions: ["가슴", "팔", "어깨", "코어"],
      focus: "근력",
      difficulty: "입문",
      equipment: "튼튼한 벽",
      minutes: "좌우 5–10회 · 2세트",
      description:
        "한 손을 조금 높거나 옆에 둔 벽 푸시업으로 한쪽씩 상체 지지와 밀기 제어를 연습합니다.",
      cues: ["벽 상태 확인", "작은 손 위치 차이", "몸통 긴 선"],
      benefits: ["상체 밀기", "편측 제어", "푸시업 준비"],
      warning:
        "손목·어깨·팔꿈치 통증, 벽 미끄러움 또는 몸통 회전이 있으면 양손 벽 푸시업으로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["벽·손 위치 확인", "작은 손 위치 차이", "짧은 밀기 리허설"],
      finish: "벽에서 물러나 손목·어깨·팔꿈치 반응을 확인합니다.",
      commonMistakes: ["몸통 회전", "벽 미끄러움 무시", "팔꿈치 잠금"],
      regressions: ["양손 벽 푸시업", "손 차이 줄이기", "범위 줄이기"],
      progressions: ["반복 증가", "손 차이 소폭", "벽에서 발 소폭 멀리"],
    },
  },
  {
    exercise: {
      id: "narrow-incline-pushup-easy",
      name: "내로우 인클라인 푸시업",
      englishName: "Narrow Incline Push-up",
      category: "맨몸운동",
      regions: ["가슴", "팔", "어깨", "코어"],
      focus: "근력",
      difficulty: "중급",
      equipment: "단단한 카운터 또는 벤치",
      minutes: "4–8회 · 2세트",
      description:
        "높은 지지면에서 손 간격을 어깨 너비보다 조금 좁혀 짧은 범위의 상체 밀기와 팔 제어를 연습합니다.",
      cues: ["지지면 고정", "손 간격 약간 좁게", "팔꿈치 편안한 경로"],
      benefits: ["팔 뒤쪽 근력", "상체 밀기", "코어 지지"],
      warning:
        "손목·어깨·팔꿈치 통증, 지지면 흔들림 또는 허리 처짐이 있으면 일반 인클라인 푸시업으로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["지지면·손목 확인", "손 간격 약간 좁게", "짧은 범위 리허설"],
      finish: "지지면을 짚고 천천히 서서 손목·어깨·팔꿈치 반응을 확인합니다.",
      commonMistakes: [
        "팔꿈치 통증 무시",
        "허리 처짐",
        "손 간격 과도하게 좁힘",
      ],
      regressions: ["일반 인클라인 푸시업", "지지면 높이기", "범위 줄이기"],
      progressions: ["반복 증가", "느린 하강", "지지면 소폭 낮추기"],
    },
  },
  {
    exercise: {
      id: "counter-bodyweight-triceps-extension",
      name: "카운터 맨몸 트라이셉스 익스텐션",
      englishName: "Counter Bodyweight Triceps Extension",
      category: "맨몸운동",
      regions: ["팔", "어깨", "코어"],
      focus: "근력",
      difficulty: "중급",
      equipment: "단단한 카운터 또는 벤치",
      minutes: "4–8회 · 2세트",
      description:
        "높은 지지면에 손을 두고 팔꿈치를 굽혔다 펴며 짧은 범위의 팔 뒤쪽 밀기를 연습합니다.",
      cues: ["지지면 고정", "팔꿈치 앞쪽", "짧은 범위"],
      benefits: ["팔 뒤쪽 근력", "상체 지지", "밀기 보조"],
      warning:
        "손목·어깨·팔꿈치 통증, 지지면 흔들림 또는 목 불편이 있으면 벽 푸시업으로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["지지면·손목 확인", "팔꿈치 앞쪽", "짧은 굽힘 리허설"],
      finish: "지지면을 짚고 천천히 서서 손목·어깨·팔꿈치 반응을 확인합니다.",
      commonMistakes: ["머리 과도하게 숙임", "팔꿈치 벌어짐", "지지면 불안정"],
      regressions: ["벽 푸시업", "지지면 높이기", "범위 줄이기"],
      progressions: ["반복 증가", "느린 복귀", "지지면 소폭 낮추기"],
    },
  },
  {
    exercise: {
      id: "knee-plank-up-down",
      name: "니 플랭크 업다운",
      englishName: "Knee Plank Up-Down",
      category: "맨몸운동",
      regions: ["코어", "어깨", "팔"],
      focus: "협응",
      difficulty: "중급",
      equipment: "매트",
      minutes: "좌우 3–6회 · 2세트",
      description:
        "무릎 지지 플랭크에서 한쪽 팔꿈치와 손을 번갈아 움직이며 상체 지지 전환을 연습합니다.",
      cues: ["무릎 지지", "골반 흔들림 줄이기", "천천히 교대"],
      benefits: ["코어 지지", "어깨 안정", "팔 지지 전환"],
      warning:
        "손목·어깨·팔꿈치 통증, 허리 처짐 또는 손 미끄러짐이 있으면 니 플랭크 홀드로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["매트·손목 확인", "무릎 플랭크 정렬", "한 팔 전환 리허설"],
      finish: "무릎을 매트에 두고 손목·어깨·허리 반응을 확인합니다.",
      commonMistakes: ["골반 흔들림", "팔꿈치 세게 내려놓기", "숨 참기"],
      regressions: ["니 플랭크 홀드", "반복 줄이기", "한쪽 전환만"],
      progressions: ["반복 증가", "느린 전환", "정지 1초"],
    },
  },
  {
    exercise: {
      id: "wall-sit-calf-raise-easy",
      name: "월 싯 카프 레이즈",
      englishName: "Wall Sit Calf Raise",
      category: "맨몸운동",
      regions: ["하체", "코어"],
      focus: "근력",
      difficulty: "중급",
      equipment: "튼튼한 벽",
      minutes: "4–8회 · 2세트",
      description:
        "얕은 월 싯에서 발뒤꿈치를 작은 범위로 들어 종아리·하체 지구력과 벽 지지를 연습합니다.",
      cues: ["얕은 월 싯", "작은 발꿈치 들기", "무릎 정렬"],
      benefits: ["종아리 근력", "하체 지구력", "자세 제어"],
      warning:
        "무릎·발목 통증, 경련 또는 허리 불편이 있으면 월 싯 홀드와 카프 레이즈를 분리하세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["벽·발 위치 확인", "얕은 월 싯", "작은 발꿈치 들기"],
      finish: "벽에서 천천히 일어나 무릎·발목·허리 반응을 확인합니다.",
      commonMistakes: ["월 싯 너무 깊게", "발꿈치 급히 내림", "경련 무시"],
      regressions: ["월 싯 이지", "지지 카프 레이즈", "동작 분리"],
      progressions: ["반복 증가", "상단 정지 1초", "유지 2초"],
    },
  },
  {
    exercise: {
      id: "supported-split-squat-hold",
      name: "지지 스플릿 스쿼트 홀드",
      englishName: "Supported Split Squat Hold",
      category: "맨몸운동",
      regions: ["하체", "둔근", "코어"],
      focus: "근력",
      difficulty: "입문",
      equipment: "벽 또는 의자",
      minutes: "좌우 5–15초 · 2회",
      description:
        "한 손 지지에서 짧은 스플릿 스쿼트 깊이를 편안하게 유지하며 하체 지구력과 정렬을 연습합니다.",
      cues: ["지지대 가까이", "짧은 깊이", "무릎 정렬"],
      benefits: ["하체 지구력", "균형", "런지 준비"],
      warning:
        "무릎·고관절·발목 통증 또는 균형 상실이 있으면 높은 분할 자세 또는 양발 서기로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["벽·의자 지지 확인", "짧은 분할 자세", "무릎 정렬"],
      finish: "양발로 서서 무릎·고관절·발목 반응을 확인합니다.",
      commonMistakes: ["무릎 안쪽 붕괴", "지지대에서 멀리 섬", "깊이 과도"],
      regressions: ["높은 분할 자세", "유지 시간 줄이기", "양손 지지"],
      progressions: ["유지 2초", "지지 줄이기", "범위 소폭"],
    },
  },
  {
    exercise: {
      id: "squat-pulse-easy",
      name: "스쿼트 펄스",
      englishName: "Squat Pulse",
      category: "맨몸운동",
      regions: ["하체", "둔근", "코어"],
      focus: "근력",
      difficulty: "입문",
      equipment: "벽 또는 의자 선택",
      minutes: "5–10회 · 2세트",
      description:
        "얕은 스쿼트 범위에서 아주 작은 위아래 움직임을 수행해 하체 지구력과 무릎 정렬을 연습합니다.",
      cues: ["얕은 범위", "무릎 정렬", "천천히 펄스"],
      benefits: ["하체 지구력", "스쿼트 제어", "둔근 협응"],
      warning:
        "무릎·고관절·허리 통증 또는 균형 상실이 있으면 의자 스쿼트로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["발·무릎 위치 확인", "얕은 스쿼트", "작은 펄스"],
      finish: "천천히 선 자세로 돌아와 무릎·고관절·허리 반응을 확인합니다.",
      commonMistakes: ["깊이 과도", "무릎 무너짐", "너무 빠른 펄스"],
      regressions: ["의자 스쿼트", "범위 줄이기", "지지대 사용"],
      progressions: ["반복 증가", "느린 펄스", "상단 정지"],
    },
  },
  {
    exercise: {
      id: "seated-knee-tuck-easy",
      name: "시티드 니 턱",
      englishName: "Seated Knee Tuck",
      category: "맨몸운동",
      regions: ["코어", "하체"],
      focus: "근력",
      difficulty: "입문",
      equipment: "매트 또는 안정된 의자",
      minutes: "6–10회 · 2세트",
      description:
        "매트 또는 의자 가장자리에서 무릎을 작은 범위로 몸통 쪽에 가까이하며 복부와 고관절 제어를 연습합니다.",
      cues: ["가슴 편안히", "작은 무릎 당김", "숨 내쉬기"],
      benefits: ["코어 제어", "고관절 협응", "바닥 전환 준비"],
      warning:
        "허리·고관절 통증, 의자 흔들림 또는 균형 상실이 있으면 누운 니 턱으로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["매트·의자 안정 확인", "작은 무릎 당김", "몸통 길게"],
      finish: "발을 바닥에 두고 허리·고관절·균형 반응을 확인합니다.",
      commonMistakes: [
        "의자 뒤로 기울기",
        "허리 통증 무시",
        "무릎 너무 높이 당김",
      ],
      regressions: ["라잉 니 턱", "범위 줄이기", "발끝 바닥"],
      progressions: ["반복 증가", "느린 복귀", "정지 1초"],
    },
  },
  {
    exercise: {
      id: "high-plank-knee-to-elbow-easy",
      name: "하이 플랭크 니 투 엘보",
      englishName: "High Plank Knee to Elbow",
      category: "맨몸운동",
      regions: ["코어", "어깨", "팔", "하체"],
      focus: "협응",
      difficulty: "중급",
      equipment: "매트",
      minutes: "좌우 3–6회 · 2세트",
      description:
        "하이 플랭크에서 무릎을 작은 범위로 같은 쪽 팔꿈치 쪽에 가져오며 몸통 회전 제어를 연습합니다.",
      cues: ["손바닥 고르게", "작은 무릎 이동", "골반 흔들림 줄이기"],
      benefits: ["코어 협응", "어깨 지지", "고관절 제어"],
      warning:
        "손목·어깨·허리 통증 또는 골반 처짐이 있으면 무릎 플랭크 니 이동으로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["매트·손목 확인", "하이 플랭크 정렬", "작은 무릎 이동"],
      finish: "무릎을 매트에 두고 손목·어깨·허리 반응을 확인합니다.",
      commonMistakes: ["골반 흔들림", "어깨 으쓱", "무릎 이동 과도"],
      regressions: ["니 플랭크 무릎 이동", "범위 줄이기", "한쪽만"],
      progressions: ["반복 증가", "느린 복귀", "정지 1초"],
    },
  },
  {
    exercise: {
      id: "prone-w-to-y-lift-easy",
      name: "프론 W 투 Y 리프트",
      englishName: "Prone W-to-Y Lift",
      category: "맨몸운동",
      regions: ["등", "어깨", "코어"],
      focus: "협응",
      difficulty: "입문",
      equipment: "매트",
      minutes: "4–8회 · 2세트",
      description:
        "엎드린 자세에서 팔을 W와 Y 모양 사이로 작은 범위만 움직이며 등 상부와 견갑 제어를 연습합니다.",
      cues: ["이마 편안히", "작은 팔 들기", "목 길게"],
      benefits: ["견갑 제어", "등 상부 협응", "어깨 지지"],
      warning:
        "어깨·목·허리 통증 또는 팔 저림이 있으면 프론 W 풀 또는 벽 슬라이드로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["매트·목 반응 확인", "이마 편안히", "작은 W 리프트"],
      finish: "팔을 매트에 두고 목·어깨·허리 반응을 확인합니다.",
      commonMistakes: ["목 과신전", "팔 너무 높이 들기", "허리 통증 무시"],
      regressions: ["프론 W 풀", "벽 슬라이드", "범위 줄이기"],
      progressions: ["Y 위치 추가", "반복 증가", "정지 1초"],
    },
  },
  {
    exercise: {
      id: "frog-pump-easy",
      name: "프로그 펌프",
      englishName: "Frog Pump",
      category: "맨몸운동",
      regions: ["둔근", "하체", "코어"],
      focus: "근력",
      difficulty: "입문",
      equipment: "매트",
      minutes: "8–15회 · 2세트",
      description:
        "발바닥을 마주 대고 무릎을 벌린 누운 자세에서 짧은 골반 들어올리기로 둔근 수축을 연습합니다.",
      cues: ["발바닥 마주 보기", "작은 골반 들기", "갈비뼈 과도하게 들지 않기"],
      benefits: ["둔근 인식", "힙 힌지 준비", "골반 제어"],
      warning:
        "허리·고관절 통증, 경련 또는 불편한 무릎 벌림이 있으면 글루트 브리지로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["매트·허리 반응 확인", "발바닥 마주 보기", "작은 골반 들기"],
      finish: "골반을 매트에 두고 허리·고관절·햄스트링 반응을 확인합니다.",
      commonMistakes: ["허리 과신전", "무릎 과도하게 벌림", "발로 밀기"],
      regressions: ["글루트 브리지", "범위 줄이기", "양발 평행"],
      progressions: ["반복 증가", "상단 정지 1초", "느린 복귀"],
    },
  },
  {
    exercise: {
      id: "hamstring-walkout-easy",
      name: "햄스트링 워크아웃",
      englishName: "Hamstring Walkout",
      category: "맨몸운동",
      regions: ["하체", "둔근", "코어"],
      focus: "근력",
      difficulty: "중급",
      equipment: "매트",
      minutes: "4–8걸음 · 2세트",
      description:
        "글루트 브리지에서 발을 한 걸음씩 멀리·가까이 옮기며 뒤허벅지와 골반 제어를 짧은 범위로 연습합니다.",
      cues: ["골반 낮게 유지", "작은 발걸음", "통증 없는 범위"],
      benefits: ["햄스트링 근력", "골반 제어", "힌지 준비"],
      warning:
        "햄스트링 경련·허리 통증·골반 처짐이 있으면 글루트 브리지 홀드로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["매트·발 미끄럼 확인", "글루트 브리지 리허설", "작은 발걸음"],
      finish: "골반을 매트에 두고 햄스트링·허리·고관절 반응을 확인합니다.",
      commonMistakes: ["골반 처짐", "발걸음 과도", "경련 무시"],
      regressions: ["글루트 브리지 홀드", "걸음 수 줄이기", "범위 줄이기"],
      progressions: ["걸음 1회", "느린 복귀", "상단 정지 1초"],
    },
  },
  {
    exercise: {
      id: "single-leg-glute-bridge-hold",
      name: "싱글 레그 글루트 브리지 홀드",
      englishName: "Single-Leg Glute Bridge Hold",
      category: "맨몸운동",
      regions: ["둔근", "하체", "코어"],
      focus: "근력",
      difficulty: "중급",
      equipment: "매트",
      minutes: "좌우 5–12초 · 2회",
      description:
        "한 발을 바닥에 둔 짧은 글루트 브리지에서 반대발을 낮게 든 채 골반 수평을 유지합니다.",
      cues: ["반대발 낮게", "골반 수평", "짧은 유지"],
      benefits: ["편측 둔근 근력", "골반 안정", "균형 보조"],
      warning:
        "허리·고관절·햄스트링 통증 또는 경련이 있으면 양발 글루트 브리지로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["매트·허리 반응 확인", "양발 브리지 리허설", "반대발 낮게 들기"],
      finish: "양발을 매트에 두고 허리·고관절·햄스트링 반응을 확인합니다.",
      commonMistakes: ["골반 기울기", "햄스트링 경련", "허리 과신전"],
      regressions: ["글루트 브리지", "유지 시간 줄이기", "발끝 보조"],
      progressions: ["유지 2초", "반복 증가", "발 위치 소폭"],
    },
  },
  {
    exercise: {
      id: "kneeling-squat-to-stand",
      name: "닐링 스쿼트 투 스탠드",
      englishName: "Kneeling Squat to Stand",
      category: "맨몸운동",
      regions: ["하체", "둔근", "코어"],
      focus: "협응",
      difficulty: "중급",
      equipment: "매트·벽 또는 의자",
      minutes: "좌우 선행발 3–6회 · 2세트",
      description:
        "반무릎 자세에서 발을 앞에 두고 천천히 일어서며 바닥 전환과 하체 제어를 연습합니다.",
      cues: ["매트 사용", "지지대 가까이", "천천히 일어서기"],
      benefits: ["바닥 전환", "하체 근력", "균형"],
      warning:
        "무릎 통증·어지러움·균형 상실이 있으면 양손 지지 또는 높은 의자 전환으로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["매트·지지대 확인", "반무릎 리허설", "천천히 일어서기"],
      finish: "의자·벽 지지를 잡고 서서 무릎·고관절·균형 반응을 확인합니다.",
      commonMistakes: ["무릎 비틀기", "발 위치 불안정", "급히 일어서기"],
      regressions: ["반무릎 홀드", "양손 지지", "의자 전환"],
      progressions: ["반복 증가", "지지 줄이기", "선행발 교대"],
    },
  },
  {
    exercise: {
      id: "squat-to-calf-raise-easy",
      name: "스쿼트 투 카프 레이즈",
      englishName: "Squat to Calf Raise",
      category: "맨몸운동",
      regions: ["하체", "둔근", "코어"],
      focus: "협응",
      difficulty: "입문",
      equipment: "벽 또는 의자",
      minutes: "6–10회 · 2세트",
      description:
        "짧은 스쿼트에서 일어난 뒤 지지대를 가볍게 잡고 발뒤꿈치를 천천히 들어 하체 협응을 연습합니다.",
      cues: ["짧은 스쿼트", "지지대 가까이", "천천히 발꿈치 들기"],
      benefits: ["하체 협응", "종아리 근력", "균형"],
      warning:
        "무릎·발목 통증, 어지러움 또는 균형 상실이 있으면 스쿼트와 카프 레이즈를 분리하세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["지지대·바닥 확인", "짧은 스쿼트", "낮은 카프 레이즈"],
      finish: "양발을 바닥에 두고 무릎·발목·균형 반응을 확인합니다.",
      commonMistakes: ["무릎 무너짐", "발꿈치 급히 내림", "균형 상실 무시"],
      regressions: ["의자 스쿼트", "지지 카프 레이즈", "동작 분리"],
      progressions: ["반복 증가", "상단 정지 1초", "지지 줄이기"],
    },
  },
  {
    exercise: {
      id: "prisoner-squat-easy",
      name: "프리즈너 스쿼트",
      englishName: "Prisoner Squat",
      category: "맨몸운동",
      regions: ["하체", "둔근", "코어"],
      focus: "근력",
      difficulty: "중급",
      equipment: "없음 또는 의자",
      minutes: "6–10회 · 2세트",
      description:
        "손을 머리 뒤가 아닌 귀 옆에 가볍게 둔 채 짧은 스쿼트를 수행해 몸통 위치와 하체 제어를 연습합니다.",
      cues: ["손은 가볍게", "가슴 과도하게 들지 않기", "짧은 깊이"],
      benefits: ["스쿼트 제어", "몸통 인식", "하체 근력"],
      warning:
        "어깨 불편·무릎·허리 통증 또는 균형 상실이 있으면 팔을 앞에 두거나 의자 스쿼트로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["발·무릎 위치 확인", "팔 편안한 위치", "짧은 스쿼트"],
      finish: "팔을 내리고 무릎·허리·어깨 반응을 확인합니다.",
      commonMistakes: ["목 당김", "허리 과신전", "깊이 과도"],
      regressions: ["의자 스쿼트", "팔 앞에 두기", "범위 줄이기"],
      progressions: ["반복 증가", "느린 하강", "상단 정지"],
    },
  },
  {
    exercise: {
      id: "supported-lateral-lunge",
      name: "지지 레터럴 런지",
      englishName: "Supported Lateral Lunge",
      category: "맨몸운동",
      regions: ["하체", "둔근", "코어"],
      focus: "근력",
      difficulty: "중급",
      equipment: "벽 또는 의자",
      minutes: "좌우 4–8회 · 2세트",
      description:
        "한 손 지지에서 옆으로 짧게 체중을 옮기며 고관절·하체의 측면 제어를 연습합니다.",
      cues: ["지지대 가까이", "작은 옆 이동", "무릎 정렬"],
      benefits: ["측면 하체 근력", "고관절 제어", "방향 전환"],
      warning:
        "무릎·고관절·발목 통증 또는 균형 상실이 있으면 옆 체중 이동으로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["벽·의자 지지 확인", "옆 체중 이동", "작은 런지"],
      finish: "양발로 서서 무릎·고관절·발목 반응을 확인합니다.",
      commonMistakes: ["무릎 안쪽 붕괴", "발 뒤꿈치 들림", "범위 과도"],
      regressions: ["옆 체중 이동", "범위 줄이기", "양손 지지"],
      progressions: ["반복 증가", "지지 줄이기", "정지 1초"],
    },
  },
  {
    exercise: {
      id: "side-lying-hip-abduction-easy",
      name: "사이드 라잉 힙 어브덕션",
      englishName: "Side-Lying Hip Abduction",
      category: "맨몸운동",
      regions: ["둔근", "하체", "코어"],
      focus: "근력",
      difficulty: "입문",
      equipment: "매트",
      minutes: "좌우 6–12회 · 2세트",
      description:
        "옆으로 누워 위쪽 다리를 작은 범위로 들어 올리며 둔근 측면의 제어를 연습합니다.",
      cues: ["골반 포개기", "발끝 정면", "작은 들기"],
      benefits: ["둔근 측면 근력", "고관절 제어", "균형 보조"],
      warning:
        "고관절 통증·허리 불편·골반 뒤집힘이 있으면 범위를 줄이거나 클램셸로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["매트·고관절 반응 확인", "골반 포개기", "작은 다리 들기"],
      finish: "양다리를 포개고 고관절·허리 반응을 확인합니다.",
      commonMistakes: ["골반 뒤집힘", "발끝 위로 향함", "범위 과도"],
      regressions: ["클램셸", "범위 줄이기", "무릎 굽히기"],
      progressions: ["반복 증가", "상단 정지 1초", "느린 복귀"],
    },
  },
  {
    exercise: {
      id: "crab-reach-prep",
      name: "크랩 리치 프렙",
      englishName: "Crab Reach Prep",
      category: "맨몸운동",
      regions: ["어깨", "둔근", "코어", "팔"],
      focus: "협응",
      difficulty: "중급",
      equipment: "매트",
      minutes: "좌우 3–6회 · 2세트",
      description:
        "앉은 손 지지 자세에서 발을 가까이 두고 골반을 작게 들어 올리며 어깨·엉덩이 전환을 연습합니다.",
      cues: ["손목 편안한 각도", "작은 골반 들기", "목 이완"],
      benefits: ["어깨 지지", "둔근 제어", "바닥 전환"],
      warning:
        "손목·어깨·허리 통증 또는 손 지지 불안이 있으면 리버스 테이블탑 홀드로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["매트·손목 확인", "손 지지 리허설", "작은 골반 들기"],
      finish: "골반을 매트에 두고 손목·어깨·허리 반응을 확인합니다.",
      commonMistakes: ["목 꺾기", "손목 통증 무시", "골반 과도하게 들기"],
      regressions: ["리버스 플랭크 니", "범위 줄이기", "양손 뒤 지지"],
      progressions: ["반복 증가", "도달 소폭", "정지 1초"],
    },
  },
  {
    exercise: {
      id: "reverse-plank-knee-easy",
      name: "리버스 플랭크 니",
      englishName: "Reverse Plank Knee",
      category: "맨몸운동",
      regions: ["코어", "둔근", "어깨", "팔"],
      focus: "근력",
      difficulty: "입문",
      equipment: "매트",
      minutes: "5–12초 · 2회",
      description:
        "무릎을 굽힌 앉은 손 지지 자세에서 골반을 짧게 들어 올려 뒤쪽 몸통 지지를 연습합니다.",
      cues: ["무릎 굽히기", "작은 골반 들기", "목 이완"],
      benefits: ["뒤쪽 코어 지지", "둔근 근력", "어깨 지지 준비"],
      warning:
        "손목·어깨·허리 통증, 손 미끄러짐 또는 목 긴장이 있으면 중단하세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["매트·손목 확인", "무릎 굽힌 손 지지", "작은 골반 들기"],
      finish: "골반을 매트에 두고 손목·어깨·허리 반응을 확인합니다.",
      commonMistakes: ["목 긴장", "손 미끄러짐 무시", "허리 과신전"],
      regressions: ["앉은 손 지지", "유지 시간 줄이기", "골반 들기 생략"],
      progressions: ["유지 2초", "반복 증가", "발 위치 소폭"],
    },
  },
  {
    exercise: {
      id: "inchworm-walkout-easy",
      name: "인치웜 워크아웃",
      englishName: "Inchworm Walkout",
      category: "맨몸운동",
      regions: ["코어", "어깨", "팔", "하체"],
      focus: "협응",
      difficulty: "중급",
      equipment: "매트",
      minutes: "3–6회 · 2세트",
      description:
        "무릎을 부드럽게 편 선 자세에서 손을 짧게 앞으로 걸어 플랭크 가까이 갔다가 다시 돌아옵니다.",
      cues: ["무릎 부드럽게", "짧은 손걸음", "허리 길게"],
      benefits: ["전신 협응", "어깨 지지", "햄스트링 가동성"],
      warning:
        "손목·어깨·허리 통증, 어지러움 또는 손 미끄러짐이 있으면 벽 워크아웃으로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["매트·손목 확인", "무릎 부드러운 선 자세", "짧은 손걸음"],
      finish:
        "손을 허벅지에 두고 천천히 서서 손목·어깨·허리 반응을 확인합니다.",
      commonMistakes: ["무릎 잠금", "손걸음 과도", "허리 처짐"],
      regressions: ["벽 워크아웃", "걸음 수 줄이기", "무릎 더 굽히기"],
      progressions: ["걸음 1회", "느린 복귀", "범위 소폭"],
    },
  },
  {
    exercise: {
      id: "bear-crawl-forward-easy",
      name: "베어 크롤 포워드",
      englishName: "Bear Crawl Forward",
      category: "맨몸운동",
      regions: ["코어", "어깨", "팔", "하체"],
      focus: "협응",
      difficulty: "중급",
      equipment: "매트·미끄럽지 않은 바닥",
      minutes: "앞뒤 3–6걸음 · 2회",
      description:
        "무릎을 바닥 가까이 둔 네발 자세에서 반대 손·발을 짧게 움직이며 전신 협응을 연습합니다.",
      cues: ["작은 걸음", "무릎 낮게", "골반 흔들림 줄이기"],
      benefits: ["전신 협응", "코어 지지", "어깨 안정"],
      warning:
        "손목·어깨·무릎·허리 통증 또는 바닥 미끄러움이 있으면 베어 플랭크 홀드로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: [
        "매트·바닥 마찰 확인",
        "베어 플랭크 리허설",
        "작은 반대손·발 이동",
      ],
      finish: "무릎을 매트에 두고 손목·어깨·무릎 반응을 확인합니다.",
      commonMistakes: ["큰 걸음", "골반 흔들림", "숨 참기"],
      regressions: ["베어 플랭크 홀드", "걸음 수 줄이기", "무릎 바닥"],
      progressions: ["걸음 1회", "느린 이동", "뒤로 이동"],
    },
  },
  {
    exercise: {
      id: "quadruped-knee-hover-rock",
      name: "쿼드러펫 니 호버 록",
      englishName: "Quadruped Knee Hover Rock",
      category: "맨몸운동",
      regions: ["코어", "어깨", "하체"],
      focus: "협응",
      difficulty: "중급",
      equipment: "매트",
      minutes: "앞뒤 4–8회 · 2세트",
      description:
        "네발 자세에서 무릎을 낮게 띄운 뒤 몸을 아주 작게 앞뒤로 움직이며 전신 지지를 연습합니다.",
      cues: ["무릎 낮게", "작은 앞뒤 이동", "손바닥 고르게"],
      benefits: ["코어 지지", "어깨 안정", "전신 협응"],
      warning:
        "손목·어깨·무릎·허리 통증, 손 미끄러짐 또는 숨참이 있으면 무릎 바닥 네발 록으로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["매트·손목 확인", "네발 자세 정렬", "무릎 낮게 띄우기"],
      finish: "무릎을 매트에 두고 손목·어깨·무릎 반응을 확인합니다.",
      commonMistakes: ["허리 처짐", "이동 과도", "손바닥 압박 불균형"],
      regressions: ["무릎 바닥 록", "호버 시간 줄이기", "범위 줄이기"],
      progressions: ["반복 증가", "호버 1초", "이동 소폭"],
    },
  },
  {
    exercise: {
      id: "dead-bug-contralateral-reach",
      name: "데드 버그 콘트랄래터럴 리치",
      englishName: "Dead Bug Contralateral Reach",
      category: "맨몸운동",
      regions: ["코어", "하체", "어깨"],
      focus: "협응",
      difficulty: "중급",
      equipment: "매트",
      minutes: "좌우 4–8회 · 2세트",
      description:
        "누운 자세에서 반대쪽 팔과 다리를 짧게 뻗으며 갈비뼈·골반 정렬을 유지합니다.",
      cues: ["짧은 리치", "숨 내쉬기", "허리 편안한 범위"],
      benefits: ["코어 협응", "팔다리 분리", "몸통 정렬"],
      warning:
        "허리 통증·저림·숨참이 있으면 힐 탭 또는 한쪽만 움직이는 변형으로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["매트·허리 반응 확인", "팔·다리 90도", "짧은 반대쪽 리치"],
      finish: "팔다리를 매트에 두고 허리·호흡·고관절 반응을 확인합니다.",
      commonMistakes: ["허리 뜸", "숨 참기", "리치 과도"],
      regressions: ["데드 버그 힐 탭", "한쪽만", "범위 줄이기"],
      progressions: ["반복 증가", "유지 1초", "리치 소폭"],
    },
  },
  {
    exercise: {
      id: "side-plank-thread-the-needle-knee",
      name: "사이드 플랭크 스레드 더 니들 니",
      englishName: "Side Plank Thread the Needle Knee",
      category: "맨몸운동",
      regions: ["코어", "어깨", "둔근"],
      focus: "협응",
      difficulty: "중급",
      equipment: "매트",
      minutes: "좌우 3–6회 · 2세트",
      description:
        "아래 무릎 지지 옆 플랭크에서 위쪽 팔을 몸통 아래로 작은 범위만 통과시켜 회전 제어를 연습합니다.",
      cues: ["아래 무릎 지지", "작은 회전", "골반 수평"],
      benefits: ["옆몸통 지지", "회전 협응", "어깨 안정"],
      warning:
        "어깨·허리 통증, 손목 불편 또는 골반 처짐이 있으면 사이드 플랭크 니 홀드로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["매트·아래 무릎 지지", "사이드 플랭크 니 리허설", "작은 팔 통과"],
      finish: "양무릎을 매트에 두고 어깨·허리·골반 반응을 확인합니다.",
      commonMistakes: ["골반 처짐", "어깨 으쓱", "회전 과도"],
      regressions: ["사이드 플랭크 니", "범위 줄이기", "팔 이동 생략"],
      progressions: ["반복 증가", "정지 1초", "회전 소폭"],
    },
  },
  {
    exercise: {
      id: "tall-kneeling-arm-sweep",
      name: "톨 닐링 암 스윕",
      englishName: "Tall-Kneeling Arm Sweep",
      category: "맨몸운동",
      regions: ["코어", "둔근", "어깨"],
      focus: "협응",
      difficulty: "입문",
      equipment: "매트",
      minutes: "6–10회 · 2세트",
      description:
        "양무릎 선 자세에서 팔을 편안히 위·옆으로 움직이며 골반과 갈비뼈 정렬을 연습합니다.",
      cues: ["엉덩이 조이기", "갈비뼈 과도하게 들지 않기", "팔 편안히"],
      benefits: ["몸통 정렬", "어깨 가동성", "무릎 선 자세 적응"],
      warning:
        "무릎·어깨·허리 통증, 어지러움 또는 균형 상실이 있으면 앉은 자세로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["매트·무릎 반응 확인", "양무릎 선 자세", "작은 팔 스윕"],
      finish: "앉은 자세로 돌아와 무릎·어깨·허리 반응을 확인합니다.",
      commonMistakes: ["허리 과신전", "무릎 통증 무시", "팔 범위 과도"],
      regressions: ["앉은 팔 스윕", "범위 줄이기", "벽 지지"],
      progressions: ["반복 증가", "정지 1초", "범위 소폭"],
    },
  },
  {
    exercise: {
      id: "standing-cross-crawl-march",
      name: "스탠딩 크로스 크롤 마치",
      englishName: "Standing Cross-Crawl March",
      category: "맨몸운동",
      regions: ["코어", "하체", "어깨"],
      focus: "협응",
      difficulty: "입문",
      equipment: "벽 또는 의자 선택",
      minutes: "좌우 6–12회 · 2세트",
      description:
        "선 자세에서 반대 손과 무릎을 작은 범위로 가까이 가져오며 보행 리듬과 교차 협응을 연습합니다.",
      cues: ["지지대 가까이", "낮은 무릎 들기", "천천히 교대"],
      benefits: ["교차 협응", "균형", "보행 준비"],
      warning:
        "어지러움·균형 상실·고관절·무릎 통증이 있으면 벽 지지 마치로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["벽·의자 지지 확인", "낮은 마치", "작은 교차 탭"],
      finish: "양발로 서서 어지러움·고관절·무릎 반응을 확인합니다.",
      commonMistakes: [
        "무릎 너무 높이 들기",
        "몸통 과도 회전",
        "균형 상실 무시",
      ],
      regressions: ["벽 지지 마치", "범위 줄이기", "양손 지지"],
      progressions: ["반복 증가", "지지 줄이기", "정지 1초"],
    },
  },
  {
    exercise: {
      id: "foot-assisted-pronated-pullup",
      name: "발 지지 오버핸드 풀업",
      englishName: "Foot-Assisted Pronated Pull-up",
      category: "맨몸운동",
      regions: ["등", "팔", "어깨"],
      focus: "근력",
      difficulty: "중급",
      equipment: "안정된 바·낮은 스텝",
      minutes: "3–6회 · 2세트",
      description:
        "손등이 몸을 향하는 오버핸드 그립으로 바를 잡고 발 지지를 유지한 채 짧은 범위의 풀업을 연습합니다.",
      cues: ["바·스텝 고정 확인", "발 지지 유지", "목 길게"],
      benefits: ["수직 당기기", "등·팔 근력", "풀업 그립 적응"],
      warning:
        "어깨·팔꿈치 통증, 손 미끄러짐, 바·스텝 불안정이 있으면 진행하지 마세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["바·스텝·그립 확인", "발로 체중 일부 지지", "짧은 범위 리허설"],
      finish: "발을 스텝에 안정적으로 두고 어깨·팔꿈치·손 반응을 확인합니다.",
      commonMistakes: ["발 지지 생략", "목 앞으로 내밈", "반동"],
      regressions: ["액티브 행", "지지 로우", "범위 줄이기"],
      progressions: ["반복 증가", "느린 복귀", "발 지지 소폭 줄이기"],
    },
  },
  {
    exercise: {
      id: "foot-assisted-supinated-chinup",
      name: "발 지지 언더핸드 친업",
      englishName: "Foot-Assisted Supinated Chin-up",
      category: "맨몸운동",
      regions: ["등", "팔", "어깨"],
      focus: "근력",
      difficulty: "중급",
      equipment: "안정된 바·낮은 스텝",
      minutes: "3–6회 · 2세트",
      description:
        "손바닥이 몸을 향하는 언더핸드 그립으로 발 지지를 유지하며 짧은 범위의 친업을 연습합니다.",
      cues: ["바·스텝 고정 확인", "발 지지 유지", "반동 금지"],
      benefits: ["수직 당기기", "팔 앞쪽·등 근력", "친업 준비"],
      warning:
        "팔꿈치·어깨 통증, 손 미끄러짐, 바·스텝 불안정이 있으면 진행하지 마세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["바·스텝·그립 확인", "발로 체중 일부 지지", "짧은 범위 리허설"],
      finish: "발을 스텝에 안정적으로 두고 어깨·팔꿈치·손 반응을 확인합니다.",
      commonMistakes: ["발 지지 생략", "팔꿈치 통증 무시", "반동"],
      regressions: ["밴드 친업", "지지 로우", "범위 줄이기"],
      progressions: ["반복 증가", "느린 복귀", "발 지지 소폭 줄이기"],
    },
  },
  {
    exercise: {
      id: "neutral-grip-pullup-foot-assist",
      name: "발 지지 뉴트럴 그립 풀업",
      englishName: "Foot-Assisted Neutral-Grip Pull-up",
      category: "맨몸운동",
      regions: ["등", "팔", "어깨"],
      focus: "근력",
      difficulty: "중급",
      equipment: "뉴트럴 그립 바·발 지지대",
      minutes: "3–6회 · 2세트",
      description:
        "서로 마주 보는 손잡이를 잡고 발로 체중 일부를 지지하며 짧은 수직 당기기를 연습합니다.",
      cues: ["손잡이·발 지지 확인", "발 지지 유지", "목 이완"],
      benefits: ["수직 당기기", "그립 선택지", "등·팔 근력"],
      warning:
        "손목·어깨·팔꿈치 통증, 손 미끄러짐, 기구 불안정이 있으면 중단하세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: [
        "뉴트럴 바·발 지지 확인",
        "발로 체중 일부 지지",
        "짧은 범위 리허설",
      ],
      finish: "발을 바닥에 두고 손목·어깨·팔꿈치 반응을 확인합니다.",
      commonMistakes: ["발 지지 생략", "목 으쓱", "기구 불안정 무시"],
      regressions: ["뉴트럴 그립 행", "지지 로우", "범위 줄이기"],
      progressions: ["반복 증가", "느린 복귀", "발 지지 소폭 줄이기"],
    },
  },
  {
    exercise: {
      id: "mixed-grip-pullup-foot-assist",
      name: "발 지지 혼합 그립 풀업",
      englishName: "Foot-Assisted Mixed-Grip Pull-up",
      category: "맨몸운동",
      regions: ["등", "팔", "어깨", "코어"],
      focus: "근력",
      difficulty: "상급",
      equipment: "안정된 바·낮은 스텝",
      minutes: "좌우 그립 2–5회 · 2세트",
      description:
        "한 손은 오버핸드, 한 손은 언더핸드로 잡고 발 지지를 유지하며 짧은 범위만 당긴 뒤 다음 세트에서 손 위치를 바꿉니다.",
      cues: ["그립은 세트 사이 교대", "발 지지 유지", "몸통 정면"],
      benefits: ["그립 다양성", "수직 당기기", "몸통 제어"],
      warning:
        "매달린 채 그립을 바꾸지 말고, 어깨·팔꿈치 통증·손 미끄러짐이 있으면 중단하세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["바·스텝·양손 위치 확인", "발 지지 유지", "그립별 짧은 범위"],
      finish: "발을 스텝에 두고 내려온 뒤 다음 세트 전에 그립을 바꿉니다.",
      commonMistakes: ["매달린 채 그립 교체", "몸통 회전", "발 지지 생략"],
      regressions: ["오버핸드 지지 풀업", "언더핸드 지지 친업", "범위 줄이기"],
      progressions: ["반복 증가", "느린 복귀", "발 지지 소폭 줄이기"],
    },
  },
  {
    exercise: {
      id: "wide-grip-pullup-foot-assist",
      name: "발 지지 와이드 그립 풀업",
      englishName: "Foot-Assisted Wide-Grip Pull-up",
      category: "맨몸운동",
      regions: ["등", "어깨", "팔"],
      focus: "근력",
      difficulty: "상급",
      equipment: "안정된 바·낮은 스텝",
      minutes: "2–5회 · 2세트",
      description:
        "평소보다 조금 넓은 그립과 지속적인 발 지지로 짧은 수직 당기기 범위를 안전하게 탐색합니다.",
      cues: ["그립은 과도하게 넓히지 않기", "발 지지 유지", "짧은 범위"],
      benefits: ["등 상부 인식", "그립 선택지", "풀업 준비"],
      warning:
        "어깨 앞쪽 통증·저림·불편한 그립·손 미끄러짐이 있으면 즉시 일반 그립으로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["바·스텝·그립 폭 확인", "발 지지 유지", "짧은 범위 리허설"],
      finish: "발을 스텝에 안정적으로 두고 어깨·팔꿈치 반응을 확인합니다.",
      commonMistakes: ["그립 과도하게 넓힘", "어깨 통증 무시", "반동"],
      regressions: ["일반 그립 지지 풀업", "중립 그립", "범위 줄이기"],
      progressions: ["반복 증가", "느린 복귀", "발 지지 소폭 줄이기"],
    },
  },
  {
    exercise: {
      id: "pullup-midrange-hold-foot-assist",
      name: "발 지지 풀업 미드레인지 홀드",
      englishName: "Foot-Assisted Pull-up Midrange Hold",
      category: "맨몸운동",
      regions: ["등", "팔", "어깨"],
      focus: "근력",
      difficulty: "상급",
      equipment: "안정된 바·낮은 스텝",
      minutes: "3–8초 · 2회",
      description:
        "발 지지를 유지한 채 팔꿈치가 중간 정도 굽힌 위치에서 짧게 멈추며 풀업 전환 구간을 제어합니다.",
      cues: ["발 지지 유지", "짧은 정지", "목 이완"],
      benefits: ["전환 구간 제어", "등·팔 지지", "풀업 진행"],
      warning:
        "어깨·팔꿈치 통증, 손 미끄러짐, 발 지지 불안정이 있으면 플렉스드 암 행으로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["바·스텝 고정 확인", "중간 팔꿈치 각도", "발 지지 유지"],
      finish: "발로 체중을 받고 천천히 내려와 어깨·팔꿈치 반응을 확인합니다.",
      commonMistakes: ["발 지지 생략", "목 으쓱", "유지 시간 과도"],
      regressions: ["플렉스드 암 행", "유지 시간 줄이기", "지지 로우"],
      progressions: ["유지 2초 증가", "반복 1회", "발 지지 소폭 줄이기"],
    },
  },
  {
    exercise: {
      id: "low-bar-grip-transition-row",
      name: "로우 바 그립 전환 로우",
      englishName: "Low-Bar Grip Transition Row",
      category: "맨몸운동",
      regions: ["등", "팔", "어깨", "코어"],
      focus: "협응",
      difficulty: "중급",
      equipment: "안정된 낮은 바",
      minutes: "그립별 4–8회 · 2세트",
      description:
        "발을 바닥에 둔 낮은 바 로우에서 오버핸드·언더핸드·뉴트럴 그립을 세트 사이에 바꿔 당기기 경로를 연습합니다.",
      cues: ["발 지지 유지", "그립은 세트 사이 교대", "몸통 긴 선"],
      benefits: ["그립 적응", "당기기 협응", "풀업 준비"],
      warning:
        "바 고정 불안, 손목·어깨·팔꿈치 통증 또는 몸통 반동이 있으면 중단하세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["낮은 바 고정 확인", "발 지지 유지", "한 그립 리허설"],
      finish:
        "발을 고정점 쪽으로 옮겨 장력을 줄이고 어깨·손 반응을 확인합니다.",
      commonMistakes: ["반복 중 그립 변경", "몸통 반동", "바 고정 미확인"],
      regressions: ["한 그립 지지 로우", "높은 몸 각도", "범위 줄이기"],
      progressions: ["그립 한 종류 추가", "반복 증가", "정지 1초"],
    },
  },
  {
    exercise: {
      id: "assisted-wide-grip-pulldown-easy",
      name: "어시스트 와이드 그립 풀다운",
      englishName: "Assisted Wide-Grip Pulldown",
      category: "헬스기구",
      regions: ["등", "어깨", "팔"],
      focus: "근력",
      difficulty: "입문",
      equipment: "랫풀다운 머신",
      minutes: "6–10회 · 2세트",
      description:
        "평소보다 조금 넓은 바 그립에서 가벼운 중량을 쇄골 앞쪽으로 당기며 등 상부 제어를 연습합니다.",
      cues: [
        "그립 과도하게 넓히지 않기",
        "가슴 편안히 세우기",
        "목 뒤로 당기지 않기",
      ],
      benefits: ["수직 당기기", "등 상부 근력", "그립 선택지"],
      warning:
        "어깨 통증·저림·불편한 그립·반동이 있으면 일반 그립 랫풀다운으로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["시트·패드·핀 확인", "가벼운 중량", "적당한 그립 폭"],
      finish: "중량을 놓고 어깨·팔꿈치·목 반응을 확인합니다.",
      commonMistakes: ["그립 과도하게 넓힘", "목 뒤로 당김", "반동"],
      regressions: ["일반 그립 랫풀다운", "중량 낮추기", "범위 줄이기"],
      progressions: ["반복 증가", "느린 복귀", "중량 한 단계"],
    },
  },
  {
    exercise: {
      id: "assisted-neutral-grip-pullup-machine",
      name: "어시스트 뉴트럴 그립 풀업 머신",
      englishName: "Assisted Neutral-Grip Pull-up Machine",
      category: "헬스기구",
      regions: ["등", "팔", "어깨"],
      focus: "근력",
      difficulty: "입문",
      equipment: "어시스트 뉴트럴 그립 머신",
      minutes: "4–8회 · 2세트",
      description:
        "서로 마주 보는 손잡이와 충분한 보조 중량을 사용해 통증 없는 범위에서 당깁니다.",
      cues: ["보조 중량 충분히", "무릎 패드 확인", "목 길게"],
      benefits: ["수직 당기기", "그립 선택지", "등·팔 근력"],
      warning:
        "보조 패드·손잡이 불안정, 어깨·팔꿈치 통증, 낙상 위험이 있으면 중단하세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: [
        "보조 패드·손잡이·핀 확인",
        "충분한 보조 중량",
        "짧은 범위 리허설",
      ],
      finish: "패드에서 안전히 내려와 손목·어깨·팔꿈치 반응을 확인합니다.",
      commonMistakes: ["반동", "목 앞으로 내밈", "보조 중량 부족"],
      regressions: ["보조 중량 늘리기", "뉴트럴 그립 행", "랫풀다운"],
      progressions: ["반복 증가", "느린 복귀", "보조 중량 소폭 줄이기"],
    },
  },
  {
    exercise: {
      id: "close-grip-pullup-foot-assist",
      name: "발 지지 클로즈 그립 풀업",
      englishName: "Foot-Assisted Close-Grip Pull-up",
      category: "맨몸운동",
      regions: ["등", "팔", "어깨"],
      focus: "근력",
      difficulty: "상급",
      equipment: "안정된 바·낮은 스텝",
      minutes: "3–6회 · 2세트",
      description:
        "어깨 너비보다 조금 좁은 그립에서 발 지지를 유지하며 짧은 수직 당기기를 연습합니다.",
      cues: ["그립 과도하게 좁히지 않기", "발 지지 유지", "팔꿈치 편안한 경로"],
      benefits: ["수직 당기기", "팔·등 근력", "그립 다양성"],
      warning:
        "손목·팔꿈치·어깨 통증, 손 미끄러짐, 바·스텝 불안정이 있으면 일반 그립으로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["바·스텝·그립 폭 확인", "발 지지 유지", "짧은 범위 리허설"],
      finish: "발을 스텝에 안정적으로 두고 손목·팔꿈치·어깨 반응을 확인합니다.",
      commonMistakes: ["그립 과도하게 좁힘", "발 지지 생략", "반동"],
      regressions: ["일반 그립 지지 풀업", "지지 로우", "범위 줄이기"],
      progressions: ["반복 증가", "느린 복귀", "발 지지 소폭 줄이기"],
    },
  },
  {
    exercise: {
      id: "active-hang-foot-assist",
      name: "발 지지 액티브 행",
      englishName: "Foot-Assisted Active Hang",
      category: "맨몸운동",
      regions: ["등", "어깨", "팔", "코어"],
      focus: "협응",
      difficulty: "입문",
      equipment: "안정된 바·발 지지대",
      minutes: "5–12초 · 2–3회",
      description:
        "발로 체중 일부를 지지한 채 어깨를 귀에서 멀리 두고 편안한 매달리기 자세를 유지합니다.",
      cues: ["바·발 지지 확인", "발로 체중 일부 지지", "목 길게"],
      benefits: ["견갑 제어", "그립 준비", "매달리기 적응"],
      warning:
        "어깨 불안정·저림·통증·손 미끄러짐 또는 바 고정 불안이 있으면 매달리지 마세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: [
        "바·발 지지대·그립 확인",
        "발로 체중 대부분 지지",
        "짧은 유지 리허설",
      ],
      finish: "발을 바닥에 두고 어깨·손·호흡 반응을 확인합니다.",
      commonMistakes: ["발 지지 생략", "목 으쓱", "손 미끄러짐 무시"],
      regressions: ["월 슬라이드", "밴드 로우", "양발 지지 늘리기"],
      progressions: ["유지 2초 증가", "발 지지 소폭 줄이기", "스캐풀라 행"],
    },
  },
  {
    exercise: {
      id: "flexed-arm-hang-foot-assist",
      name: "발 지지 플렉스드 암 행",
      englishName: "Foot-Assisted Flexed-Arm Hang",
      category: "맨몸운동",
      regions: ["등", "팔", "어깨"],
      focus: "근력",
      difficulty: "중급",
      equipment: "안정된 바·발 지지대",
      minutes: "3–8초 · 2회",
      description:
        "발 지지를 유지하고 팔꿈치를 편안하게 굽힌 상단 자세에서 짧게 정지하며 당기기 지지를 연습합니다.",
      cues: ["발 지지 유지", "짧은 정지", "목 이완"],
      benefits: ["당기기 지지", "등·팔 근력", "풀업 준비"],
      warning:
        "어깨·팔꿈치 통증, 손 미끄러짐, 바 또는 발 지지대 불안정이 있으면 수행하지 마세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["바·발 지지대 확인", "낮은 스텝으로 상단 진입", "발 지지 유지"],
      finish: "발로 체중을 받고 천천히 내려와 어깨·팔꿈치 반응을 확인합니다.",
      commonMistakes: ["발 지지 생략", "목 앞으로 내밈", "유지 시간 과도"],
      regressions: ["액티브 행", "발 지지 늘리기", "밴드 로우"],
      progressions: ["유지 2초 증가", "발 지지 소폭 줄이기", "네거티브 준비"],
    },
  },
  {
    exercise: {
      id: "band-assisted-chin-up-easy",
      name: "밴드 어시스트 친업",
      englishName: "Band-Assisted Chin-up",
      category: "맨몸운동",
      regions: ["등", "팔", "어깨"],
      focus: "근력",
      difficulty: "중급",
      equipment: "안정된 바·저항 밴드·스텝",
      minutes: "3–6회 · 2세트",
      description:
        "안전하게 고정한 밴드와 스텝을 사용해 손바닥이 몸을 향한 그립으로 짧은 범위의 친업을 연습합니다.",
      cues: ["바·밴드 확인", "스텝으로 승하강", "반동 금지"],
      benefits: ["수직 당기기", "팔·등 근력", "친업 준비"],
      warning:
        "밴드 균열·고정 불안·손 미끄러짐·어깨 통증이 있으면 수행하지 마세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: [
        "바·밴드·스텝 상태 확인",
        "발 또는 무릎 밴드 지지",
        "짧은 범위 리허설",
      ],
      finish: "스텝에 안전히 내려와 어깨·팔꿈치·손 반응을 확인합니다.",
      commonMistakes: ["밴드 손상 무시", "반동", "무리한 범위"],
      regressions: ["어시스트 친업 머신", "밴드 장력 늘리기", "지지 행"],
      progressions: ["반복 증가", "느린 복귀", "밴드 지지 소폭 줄이기"],
    },
  },
  {
    exercise: {
      id: "neutral-grip-hang-foot-assist",
      name: "발 지지 뉴트럴 그립 행",
      englishName: "Foot-Assisted Neutral-Grip Hang",
      category: "맨몸운동",
      regions: ["등", "어깨", "팔"],
      focus: "가동성",
      difficulty: "입문",
      equipment: "뉴트럴 그립 바·발 지지대",
      minutes: "5–12초 · 2–3회",
      description:
        "서로 마주 보는 손잡이를 잡고 발 지지를 유지하며 편안한 중립 그립 매달리기를 탐색합니다.",
      cues: ["손잡이·발 지지 확인", "발로 체중 일부 지지", "목 이완"],
      benefits: ["그립 선택지", "어깨 위치 인식", "매달리기 적응"],
      warning:
        "손목·어깨 통증, 저림, 손 미끄러짐 또는 기구 불안정이 있으면 진행하지 마세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: [
        "뉴트럴 바·발 지지 확인",
        "발로 체중 일부 지지",
        "짧은 유지 리허설",
      ],
      finish: "발을 바닥에 두고 손목·어깨·그립 반응을 확인합니다.",
      commonMistakes: ["발 지지 생략", "목 으쓱", "기구 불안정 무시"],
      regressions: ["액티브 행", "양발 지지 늘리기", "월 슬라이드"],
      progressions: ["유지 2초 증가", "발 지지 소폭 줄이기", "스캐풀라 행"],
    },
  },
  {
    exercise: {
      id: "assisted-chin-up-machine-easy",
      name: "어시스트 친업 머신",
      englishName: "Assisted Chin-up Machine",
      category: "헬스기구",
      regions: ["등", "팔", "어깨"],
      focus: "근력",
      difficulty: "입문",
      equipment: "어시스트 풀업·친업 머신",
      minutes: "4–8회 · 2세트",
      description:
        "충분한 보조 중량을 설정하고 손바닥이 몸을 향한 그립으로 통증 없는 범위에서 당깁니다.",
      cues: ["보조 중량 충분히", "무릎 패드 확인", "반동 금지"],
      benefits: ["수직 당기기", "등·팔 근력", "친업 준비"],
      warning:
        "보조 패드·핀 불안정, 어깨·팔꿈치 통증, 낙상 위험이 있으면 중단하세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: [
        "보조 패드·핀·손잡이 확인",
        "충분한 보조 중량",
        "짧은 범위 리허설",
      ],
      finish: "패드에서 안전히 내려와 어깨·팔꿈치·손 반응을 확인합니다.",
      commonMistakes: ["반동", "목 앞으로 내밈", "보조 중량 부족"],
      regressions: ["보조 중량 늘리기", "랫풀다운", "짧은 범위"],
      progressions: ["반복 증가", "느린 복귀", "보조 중량 소폭 줄이기"],
    },
  },
  {
    exercise: {
      id: "single-leg-head-turn-support",
      name: "지지 싱글 레그 헤드 턴",
      englishName: "Supported Single-Leg Head Turn",
      category: "맨몸운동",
      regions: ["하체", "둔근", "코어"],
      focus: "균형",
      difficulty: "중급",
      equipment: "벽 또는 의자",
      minutes: "좌우 5–10초 · 2회",
      description:
        "한 손 지지의 한 발 서기에서 시선을 정면에 두고 머리를 아주 작게 좌우로 돌리며 균형을 연습합니다.",
      cues: ["지지대 가까이", "작은 머리 회전", "무릎 부드럽게"],
      benefits: ["균형", "시선 전환 적응", "발목·고관절 제어"],
      warning:
        "어지러움·메스꺼움·균형 상실·발목 또는 무릎 통증이 있으면 즉시 양발 서기로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["벽·의자 지지 확인", "양발 체중 이동", "작은 머리 회전"],
      finish: "양발로 서서 어지러움·발목·무릎 반응을 확인합니다.",
      commonMistakes: ["머리 회전 과도", "지지대에서 멀리 섬", "무릎 잠금"],
      regressions: ["양발 머리 회전", "한 손 지지", "회전 줄이기"],
      progressions: ["유지 2초 증가", "회전 소폭", "지지 줄이기"],
    },
  },
  {
    exercise: {
      id: "y-balance-reach-support",
      name: "지지 Y 밸런스 리치",
      englishName: "Supported Y Balance Reach",
      category: "맨몸운동",
      regions: ["하체", "둔근", "코어"],
      focus: "균형",
      difficulty: "중급",
      equipment: "벽 또는 의자",
      minutes: "좌우 3방향 · 2회",
      description:
        "한 손 지지에서 반대발을 앞·대각선 두 방향으로 작은 범위만 뻗으며 한발 제어를 연습합니다.",
      cues: ["지지대 가까이", "작은 리치", "골반 정면"],
      benefits: ["동적 균형", "고관절 제어", "발목 인식"],
      warning:
        "균형 상실·발목·무릎·고관절 통증이 있으면 한 방향 체중 이동으로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["벽·의자 지지 확인", "양발 체중 이동", "한 방향 작은 리치"],
      finish: "양발로 서서 발목·무릎·고관절 반응을 확인합니다.",
      commonMistakes: ["리치 과도", "골반 회전", "지지대에서 멀리 섬"],
      regressions: ["한 방향만", "범위 줄이기", "양손 지지"],
      progressions: ["방향 하나 추가", "반복 증가", "지지 줄이기"],
    },
  },
  {
    exercise: {
      id: "lateral-step-over-balance-support",
      name: "지지 레터럴 스텝오버 밸런스",
      englishName: "Supported Lateral Step-Over Balance",
      category: "맨몸운동",
      regions: ["하체", "둔근", "코어"],
      focus: "균형",
      difficulty: "중급",
      equipment: "바닥 선·벽 또는 의자",
      minutes: "좌우 4–8회 · 2세트",
      description:
        "지지대 가까이에서 바닥 선을 옆으로 넘고 한 발에 잠깐 멈춰 방향 전환 균형을 연습합니다.",
      cues: ["낮은 바닥 선", "지지대 가까이", "착지 후 멈춤"],
      benefits: ["측면 균형", "방향 전환", "발목 제어"],
      warning:
        "발목·무릎 통증, 어지러움, 바닥 미끄러움 또는 균형 상실이 있으면 옆 체중 이동으로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["바닥 선·지지대 확인", "옆 체중 이동", "낮은 선 넘기"],
      finish: "양발로 서서 발목·무릎·균형 반응을 확인합니다.",
      commonMistakes: ["발 끌기", "착지 후 멈춤 생략", "지지대에서 멀리 섬"],
      regressions: ["옆 체중 이동", "선 없이 옆걸음", "양손 지지"],
      progressions: ["반복 증가", "정지 1초", "지지 줄이기"],
    },
  },
  {
    exercise: {
      id: "staggered-stance-reach-balance",
      name: "스태거드 스탠스 리치 밸런스",
      englishName: "Staggered-Stance Reach Balance",
      category: "맨몸운동",
      regions: ["하체", "둔근", "코어"],
      focus: "균형",
      difficulty: "입문",
      equipment: "벽 또는 의자",
      minutes: "좌우 4–8회 · 2세트",
      description:
        "앞뒤 발을 좁게 둔 자세에서 한 손 지지를 사용해 작은 앞쪽 도달과 체중 이동을 연습합니다.",
      cues: ["발 간격 좁게", "지지대 가까이", "작은 도달"],
      benefits: ["보행 균형", "체중 이동", "고관절 제어"],
      warning:
        "어지러움·균형 상실·발목·무릎 통증이 있으면 발 간격을 넓히고 양손 지지를 사용하세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["벽·의자 지지 확인", "발 간격 넓게 시작", "작은 앞쪽 리치"],
      finish: "양발 간격을 넓혀 어지러움·발목·무릎 반응을 확인합니다.",
      commonMistakes: ["발 간격 과도하게 좁힘", "리치 과도", "무릎 잠금"],
      regressions: ["양발 넓게", "범위 줄이기", "양손 지지"],
      progressions: ["발 간격 소폭", "리치 증가", "지지 줄이기"],
    },
  },
  {
    exercise: {
      id: "heel-toe-rock-balance-support",
      name: "지지 힐·토 록 밸런스",
      englishName: "Supported Heel-Toe Rock Balance",
      category: "맨몸운동",
      regions: ["하체", "코어"],
      focus: "균형",
      difficulty: "입문",
      equipment: "벽 또는 의자",
      minutes: "6–10회 · 2세트",
      description:
        "지지대를 가볍게 잡고 체중을 발뒤꿈치와 발앞쪽 사이로 천천히 옮겨 보행 전 균형을 연습합니다.",
      cues: ["지지대 가까이", "작은 체중 이동", "무릎 부드럽게"],
      benefits: ["발목 인식", "균형", "보행 준비"],
      warning:
        "어지러움·발목 통증·경련 또는 균형 상실이 있으면 양발 체중 이동만 수행하세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["벽·의자 지지 확인", "양발 체중 고르게", "작은 앞뒤 이동"],
      finish: "발 전체를 바닥에 두고 발목·균형 반응을 확인합니다.",
      commonMistakes: ["범위 과도", "무릎 잠금", "어지러움 무시"],
      regressions: ["체중 이동 줄이기", "양손 지지", "앉은 발목 펌프"],
      progressions: ["반복 증가", "지지 줄이기", "정지 1초"],
    },
  },
  {
    exercise: {
      id: "cross-body-tap-balance-support",
      name: "지지 크로스 바디 탭 밸런스",
      englishName: "Supported Cross-Body Tap Balance",
      category: "맨몸운동",
      regions: ["하체", "둔근", "코어"],
      focus: "협응",
      difficulty: "중급",
      equipment: "벽 또는 의자",
      minutes: "좌우 4–8회 · 2세트",
      description:
        "한 손 지지 상태에서 반대 손을 몸 앞쪽으로 작게 뻗으며 한발 지지와 몸통 협응을 연습합니다.",
      cues: ["지지대 가까이", "작은 탭", "골반 수평"],
      benefits: ["균형", "교차 협응", "코어 제어"],
      warning:
        "균형 상실·어지러움·고관절·무릎 통증이 있으면 양발 선 자세의 교차 탭으로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["벽·의자 지지 확인", "양발 체중 이동", "작은 교차 탭"],
      finish: "양발로 서서 고관절·무릎·균형 반응을 확인합니다.",
      commonMistakes: ["몸통 회전 과도", "지지대에서 멀리 섬", "리치 과도"],
      regressions: ["양발 교차 탭", "범위 줄이기", "양손 지지"],
      progressions: ["반복 증가", "한발 지지 시간", "지지 줄이기"],
    },
  },
  {
    exercise: {
      id: "scapular-pushup-easy",
      name: "스캐풀라 푸시업",
      englishName: "Scapular Push-up",
      category: "맨몸운동",
      regions: ["어깨", "등", "코어"],
      focus: "협응",
      difficulty: "입문",
      equipment: "매트 또는 높은 지지면",
      minutes: "6–10회 · 2세트",
      description:
        "팔꿈치를 편 채 견갑골을 작게 앞뒤로 움직이며 어깨 지지와 상체 정렬을 연습합니다.",
      cues: ["높은 지지면 가능", "팔꿈치 편 채", "작은 견갑 움직임"],
      benefits: ["견갑 제어", "어깨 지지", "푸시업 준비"],
      warning:
        "어깨·손목 통증, 허리 처짐 또는 목 긴장이 있으면 벽 지지로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["높은 지지면·손목 확인", "팔꿈치 편 자세", "작은 견갑 움직임"],
      finish: "발을 지지면 쪽으로 옮기고 손목·어깨·목 반응을 확인합니다.",
      commonMistakes: ["팔꿈치 굽힘", "허리 처짐", "목 긴장"],
      regressions: ["벽 지지", "범위 줄이기", "네발 자세"],
      progressions: ["반복 증가", "지지면 낮추기", "느린 이동"],
    },
  },
  {
    exercise: {
      id: "hollow-tuck-hold",
      name: "할로우 턱 홀드",
      englishName: "Hollow Tuck Hold",
      category: "맨몸운동",
      regions: ["코어", "하체"],
      focus: "근력",
      difficulty: "중급",
      equipment: "매트",
      minutes: "8–15초 · 2회",
      description:
        "무릎을 접은 누운 자세에서 갈비뼈와 골반을 가까이 유지하며 짧게 복부 지지를 연습합니다.",
      cues: ["무릎 접기", "허리 편안한 범위", "숨 내쉬기"],
      benefits: ["코어 지지", "몸통 정렬", "운동 전환"],
      warning: "허리 통증·저림·숨참이 있으면 데드 버그 힐 탭으로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["매트·허리 반응 확인", "무릎 접은 누운 자세", "짧은 유지 리허설"],
      finish: "발을 바닥에 두고 허리·호흡·고관절 반응을 확인합니다.",
      commonMistakes: ["허리 과도하게 뜸", "숨 참기", "다리 너무 멀리 뻗기"],
      regressions: ["데드 버그 힐 탭", "유지 시간 줄이기", "한 발 바닥"],
      progressions: ["유지 2초 증가", "발 한쪽 소폭", "팔 위치 소폭"],
    },
  },
  {
    exercise: {
      id: "side-plank-hip-abduction-knee",
      name: "사이드 플랭크 힙 어브덕션 니",
      englishName: "Side Plank Hip Abduction Knee",
      category: "맨몸운동",
      regions: ["코어", "둔근", "어깨"],
      focus: "협응",
      difficulty: "중급",
      equipment: "매트",
      minutes: "좌우 4–8회 · 2세트",
      description:
        "아래 무릎을 지지한 옆 플랭크에서 위쪽 다리를 작은 범위로 들어 올려 옆몸통과 둔근을 함께 제어합니다.",
      cues: ["아래 무릎 지지", "골반 수평", "작은 다리 들기"],
      benefits: ["옆몸통 지지", "둔근 제어", "균형 보조"],
      warning:
        "어깨·고관절 통증 또는 골반 흔들림이 있으면 사이드 플랭크 니 홀드로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["매트·아래 무릎 지지", "옆 플랭크 정렬", "작은 다리 들기"],
      finish: "양무릎을 바닥에 두고 어깨·고관절 반응을 확인합니다.",
      commonMistakes: ["골반 처짐", "어깨 으쓱", "다리 들기 과도"],
      regressions: ["사이드 플랭크 니", "유지 시간 줄이기", "다리 들기 생략"],
      progressions: ["반복 증가", "유지 2초", "다리 범위 소폭"],
    },
  },
  {
    exercise: {
      id: "archer-pushup-prep",
      name: "아처 푸시업 프렙",
      englishName: "Archer Push-up Prep",
      category: "맨몸운동",
      regions: ["가슴", "팔", "어깨", "코어"],
      focus: "근력",
      difficulty: "상급",
      equipment: "매트 또는 높은 지지면",
      minutes: "좌우 3–6회 · 2세트",
      description:
        "높은 지지면에서 한 팔 쪽으로 체중을 작게 옮기며 단측 푸시업 전 제어를 연습합니다.",
      cues: ["높은 지지면", "작은 체중 이동", "몸통 긴 선"],
      benefits: ["편측 밀기 준비", "상체 지지", "체중 이동"],
      warning:
        "어깨·손목 통증, 허리 처짐 또는 통제되지 않는 이동이 있으면 인클라인 푸시업으로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: [
        "높은 지지면·손목 확인",
        "인클라인 푸시업 리허설",
        "작은 체중 이동",
      ],
      finish: "발을 지지면 쪽으로 옮기고 손목·어깨·허리 반응을 확인합니다.",
      commonMistakes: ["체중 이동 과도", "허리 처짐", "팔꿈치 잠금"],
      regressions: ["인클라인 푸시업", "범위 줄이기", "양손 지지"],
      progressions: ["좌우 반복 증가", "지지면 소폭 낮추기", "느린 하강"],
    },
  },
  {
    exercise: {
      id: "supported-reverse-lunge-knee-drive",
      name: "지지 리버스 런지 니 드라이브",
      englishName: "Supported Reverse Lunge Knee Drive",
      category: "맨몸운동",
      regions: ["하체", "둔근", "코어"],
      focus: "균형",
      difficulty: "중급",
      equipment: "벽 또는 의자",
      minutes: "좌우 4–8회 · 2세트",
      description:
        "한 손 지지에서 짧은 리버스 런지 뒤 앞무릎을 낮게 들어 균형 전환을 연습합니다.",
      cues: ["지지대 가까이", "작은 런지", "무릎 낮게"],
      benefits: ["하체 제어", "균형", "러닝 준비"],
      warning:
        "무릎·고관절 통증 또는 균형 상실이 있으면 지지 스플릿 스쿼트로 낮추세요.",
      reference: {
        label: "CDC 성인 활동 안내",
        url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
      },
    },
    detail: {
      setup: ["벽·의자 지지 확인", "짧은 리버스 런지", "낮은 무릎 들기"],
      finish: "양발로 서서 무릎·고관절·균형 반응을 확인합니다.",
      commonMistakes: [
        "무릎 무너짐",
        "지지대에서 멀리 섬",
        "무릎 너무 높이 들기",
      ],
      regressions: ["지지 스플릿 스쿼트", "범위 줄이기", "무릎 들기 생략"],
      progressions: ["반복 증가", "지지 줄이기", "정지 1초"],
    },
  },
];
