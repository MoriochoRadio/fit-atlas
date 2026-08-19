import type { CatalogEntry } from "./catalogTypes";

export const catalogPage01: CatalogEntry[] = [
  {
    "exercise": {
      "id": "squat",
      "name": "바벨 백 스쿼트",
      "englishName": "Barbell Back Squat",
      "category": "프리웨이트",
      "regions": [
        "하체",
        "둔근",
        "코어"
      ],
      "focus": "근력",
      "difficulty": "중급",
      "equipment": "바벨 · 랙",
      "minutes": "3–5세트 · 5–10회",
      "description": "무릎과 발끝의 방향을 정렬하고, 몸통의 긴장을 유지하며 고관절과 무릎을 함께 굽혀 일어나는 복합 하체 운동입니다.",
      "cues": [
        "발 전체로 바닥을 균등하게 누르기",
        "갈비뼈와 골반을 중립에 가깝게 유지",
        "통증 없는 가동 범위에서 제어하기"
      ],
      "benefits": [
        "하체·둔근 근력",
        "몸통 안정성",
        "점진적 부하 능력"
      ],
      "warning": "날카로운 무릎·허리 통증, 저림 또는 불안정감이 있으면 중단하고 평가를 받으세요.",
      "reference": {
        "label": "ACSM 저항 운동 지침",
        "url": "https://acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines/"
      }
    },
    "detail": {
      "setup": [
        "랙 안전바와 바벨 높이를 가볍게 연습할 위치로 설정",
        "발을 편안한 너비로 두고 발 전체를 바닥에 고정",
        "가벼운 맨몸 스쿼트로 고관절·무릎 반응 확인"
      ],
      "finish": "바벨을 랙에 완전히 고정한 뒤 호흡과 허리·무릎의 반응을 기록합니다.",
      "commonMistakes": [
        "무릎이 발과 다른 방향으로 무너짐",
        "바닥에서 발뒤꿈치가 들림",
        "피로 시 허리가 과도하게 굽음"
      ],
      "regressions": [
        "의자 스쿼트",
        "고블릿 스쿼트",
        "얕은 통증 없는 범위"
      ],
      "progressions": [
        "반복 품질 후 소폭 증량",
        "멈춤 스쿼트",
        "한쪽 다리 보조 운동"
      ]
    }
  },
  {
    "exercise": {
      "id": "run",
      "name": "이지 러닝",
      "englishName": "Easy Run",
      "category": "러닝",
      "regions": [
        "하체",
        "둔근",
        "코어"
      ],
      "focus": "심폐",
      "difficulty": "입문",
      "equipment": "러닝화",
      "minutes": "20–40분 · 대화 가능한 강도",
      "description": "대화가 가능한 편안한 강도로 리듬을 유지하는 지속성 러닝입니다. 처음에는 걷기 구간을 섞어 점진적으로 시간을 늘립니다.",
      "cues": [
        "시선은 전방, 어깨 힘 빼기",
        "짧고 조용한 보폭으로 착지",
        "숨이 과도하게 가빠지면 속도 낮추기"
      ],
      "benefits": [
        "심폐 지구력",
        "유산소 체력",
        "운동 지속 시간"
      ],
      "warning": "흉통, 어지러움, 비정상적인 호흡 곤란은 즉시 중단 신호입니다.",
      "reference": {
        "label": "WHO 신체 활동 권고",
        "url": "https://www.who.int/news-room/fact-sheets/detail/physical-activity"
      }
    },
    "detail": {
      "setup": [
        "5분 걷기 또는 매우 느린 조깅으로 시작",
        "어깨·손에 힘을 빼고 호흡 리듬 확인",
        "통증 없는 신발·노면을 선택"
      ],
      "finish": "3–5분 걷기로 낮추고 물·통증·피로도를 기록합니다.",
      "commonMistakes": [
        "첫 5분부터 목표 속도 시도",
        "보폭을 앞쪽으로 과도하게 뻗음",
        "숨이 차도 속도를 고집"
      ],
      "regressions": [
        "걷기·달리기 인터벌",
        "인클라인 워킹",
        "시간 절반으로 시작"
      ],
      "progressions": [
        "주간 시간 소폭 증가",
        "평지 지속 시간 늘리기",
        "회복된 날 짧은 템포 구간"
      ]
    }
  },
  {
    "exercise": {
      "id": "row",
      "name": "시티드 케이블 로우",
      "englishName": "Seated Cable Row",
      "category": "헬스기구",
      "regions": [
        "등",
        "팔"
      ],
      "focus": "근력",
      "difficulty": "입문",
      "equipment": "케이블 머신",
      "minutes": "3세트 · 8–12회",
      "description": "팔로 당기기보다 견갑골을 뒤·아래로 움직인 뒤 팔꿈치를 몸통 가까이 보내는 등 중심의 당기기 운동입니다.",
      "cues": [
        "몸통을 과도하게 젖히지 않기",
        "어깨를 귀에서 멀어지게 유지",
        "복귀 구간도 천천히 제어"
      ],
      "benefits": [
        "등·팔 근력",
        "견갑 조절",
        "당기기 패턴"
      ],
      "warning": "어깨 앞쪽의 통증이 커지면 가동 범위와 부하를 줄이고 전문가와 상담하세요.",
      "reference": {
        "label": "CDC 주요 근육군 운동",
        "url": "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html"
      }
    },
    "detail": {
      "setup": [
        "시트·패드·손잡이를 신체에 맞게 조절",
        "매우 가벼운 무게로 1회 리허설",
        "가동 범위에서 통증 여부 확인"
      ],
      "finish": "중량을 제자리에 놓고 다음 세트 전 호흡·관절 반응을 확인합니다.",
      "commonMistakes": [
        "반동으로 중량 움직이기",
        "시트 위치를 맞추지 않음",
        "무게를 과도하게 올림"
      ],
      "regressions": [
        "중량 낮추기",
        "가동 범위 줄이기",
        "안정적인 그립·좌석 재설정"
      ],
      "progressions": [
        "반복 품질 유지 후 소폭 증량",
        "세트 1개 추가",
        "천천히 내리는 구간 제어"
      ]
    }
  },
  {
    "exercise": {
      "id": "pushup",
      "name": "푸시업",
      "englishName": "Push-up",
      "category": "맨몸운동",
      "regions": [
        "가슴",
        "어깨",
        "팔",
        "코어"
      ],
      "focus": "근력",
      "difficulty": "입문",
      "equipment": "없음",
      "minutes": "2–4세트 · 6–15회",
      "description": "손으로 바닥을 밀며 몸통을 하나의 선으로 유지하는 상체 밀기 운동입니다. 벽·벤치 변형으로 난이도를 조정할 수 있습니다.",
      "cues": [
        "머리부터 발뒤꿈치까지 긴 선 만들기",
        "팔꿈치는 몸통에서 약간 대각선",
        "내려갈 때 들이쉬고 밀며 내쉬기"
      ],
      "benefits": [
        "가슴·팔 근력",
        "코어 안정성",
        "상체 밀기 지구력"
      ],
      "warning": "손목 또는 어깨 통증이 지속되면 높은 지지면 변형을 사용하거나 상담하세요.",
      "reference": {
        "label": "CDC 주요 근육군 운동",
        "url": "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html"
      }
    },
    "detail": {
      "setup": [
        "손을 어깨보다 약간 넓게 두고 바닥을 단단히 누름",
        "머리·갈비뼈·골반·발뒤꿈치를 긴 선으로 정렬",
        "벽 또는 벤치 변형으로 어깨·손목 반응 확인"
      ],
      "finish": "무릎을 바닥에 두고 호흡을 정리한 뒤 손목·어깨에 불편이 없는지 확인합니다.",
      "commonMistakes": [
        "허리가 아래로 처짐",
        "팔꿈치를 과도하게 옆으로 벌림",
        "목을 앞으로 내밈"
      ],
      "regressions": [
        "벽 푸시업",
        "벤치 푸시업",
        "무릎 지지"
      ],
      "progressions": [
        "지지면 낮추기",
        "반복 소폭 증가",
        "느린 하강 또는 발 높이기"
      ]
    }
  },
  {
    "exercise": {
      "id": "deadbug",
      "name": "데드 버그",
      "englishName": "Dead Bug",
      "category": "맨몸운동",
      "regions": [
        "코어",
        "둔근"
      ],
      "focus": "가동성",
      "difficulty": "입문",
      "equipment": "매트",
      "minutes": "2–3세트 · 좌우 6–10회",
      "description": "누운 자세에서 팔다리를 교차로 움직이며 몸통의 과도한 움직임을 줄이는 코어 조절 운동입니다.",
      "cues": [
        "허리를 바닥에 강하게 누르기보다 편안한 중립 찾기",
        "느리고 작은 범위부터 시작",
        "숨을 참지 않고 길게 내쉬기"
      ],
      "benefits": [
        "코어 조절",
        "호흡 협응",
        "허리 부담 인식"
      ],
      "warning": "허리 통증이 뚜렷하게 증가하면 움직임 범위를 줄이거나 중단하세요.",
      "reference": {
        "label": "NHS 통증 자가 관리",
        "url": "https://www.nhs.uk/live-well/pain/10-ways-to-ease-pain/"
      }
    },
    "detail": {
      "setup": [
        "미끄럽지 않은 바닥과 충분한 공간 확보",
        "쉬운 변형으로 움직임 범위 확인",
        "관절에 불편이 없는 시작 자세 설정"
      ],
      "finish": "호흡을 정리하고 필요한 경우 짧은 걷기·가동성으로 전환합니다.",
      "commonMistakes": [
        "몸통이 무너진 상태에서 반복",
        "통증을 참고 진행",
        "난이도를 너무 빨리 높임"
      ],
      "regressions": [
        "벽·벤치·무릎 지지",
        "짧은 범위",
        "반복·시간 줄이기"
      ],
      "progressions": [
        "지지면 낮추기",
        "시간 또는 반복 소폭 증가",
        "편측 변형"
      ]
    }
  },
  {
    "exercise": {
      "id": "bike",
      "name": "스테디 사이클",
      "englishName": "Steady Cycling",
      "category": "유산소",
      "regions": [
        "하체",
        "둔근"
      ],
      "focus": "심폐",
      "difficulty": "입문",
      "equipment": "실내 자전거",
      "minutes": "25–45분 · RPE 4–6",
      "description": "관절 충격을 낮추면서 하체와 심폐 지구력을 기를 수 있는 지속성 유산소 운동입니다.",
      "cues": [
        "안장은 무릎이 완전히 잠기지 않는 높이",
        "어깨를 편안하게, 손에 체중 싣지 않기",
        "처음에는 일정한 강도로 유지"
      ],
      "benefits": [
        "심폐 지구력",
        "저충격 유산소",
        "하체 반복 지구력"
      ],
      "warning": "무릎 앞쪽 불편이 이어지면 안장 높이와 저항을 재조정하세요.",
      "reference": {
        "label": "WHO 신체 활동 권고",
        "url": "https://www.who.int/news-room/fact-sheets/detail/physical-activity"
      }
    },
    "detail": {
      "setup": [
        "기구 높이·저항을 편안한 위치로 설정",
        "3–5분 낮은 강도로 워밍업",
        "수분과 환기 상태를 확인"
      ],
      "finish": "마지막 몇 분은 저항을 낮추고 호흡이 안정된 뒤 종료합니다.",
      "commonMistakes": [
        "저항을 너무 빨리 올림",
        "손잡이에 체중을 과하게 싣기",
        "어지러움을 참음"
      ],
      "regressions": [
        "시간·저항 낮추기",
        "짧은 간격과 휴식",
        "저충격 기구 선택"
      ],
      "progressions": [
        "시간 우선 증가",
        "짧은 강도 변화",
        "주간 빈도 점진 증가"
      ]
    }
  },
  {
    "exercise": {
      "id": "rdl",
      "name": "덤벨 루마니안 데드리프트",
      "englishName": "Dumbbell Romanian Deadlift",
      "category": "프리웨이트",
      "regions": [
        "둔근",
        "하체",
        "등"
      ],
      "focus": "근력",
      "difficulty": "중급",
      "equipment": "덤벨",
      "minutes": "3세트 · 8–10회",
      "description": "엉덩이를 뒤로 보내는 힙 힌지 패턴을 통해 둔근과 햄스트링을 중심으로 강화하는 운동입니다.",
      "cues": [
        "무릎은 부드럽게 굽힌 채 유지",
        "덤벨을 몸 가까이 이동",
        "등으로 들기보다 엉덩이로 일어서기"
      ],
      "benefits": [
        "둔근·햄스트링 근력",
        "힙 힌지 패턴",
        "후면 사슬 부하"
      ],
      "warning": "허리의 날카로운 통증이나 방사통이 있으면 수행하지 마세요.",
      "reference": {
        "label": "ACSM 저항 운동 지침",
        "url": "https://acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines/"
      }
    },
    "detail": {
      "setup": [
        "덤벨을 몸 앞에 두고 발을 골반 너비로 설정",
        "무릎을 부드럽게 굽히고 몸통을 길게 유지",
        "가벼운 힙 힌지로 햄스트링·허리 반응 확인"
      ],
      "finish": "덤벨을 바닥에 안전하게 놓고 허리·다리 뒤쪽의 불편감이 남지 않는지 확인합니다.",
      "commonMistakes": [
        "덤벨을 몸에서 멀리 둠",
        "허리를 둥글게 말아 내림",
        "무릎을 과도하게 굽혀 스쿼트가 됨"
      ],
      "regressions": [
        "벽 힙 힌지",
        "케틀벨 데드리프트",
        "가벼운 덤벨·짧은 범위"
      ],
      "progressions": [
        "반복 상한 후 증량",
        "한쪽 다리 보조 힌지",
        "천천히 내리는 구간"
      ]
    }
  },
  {
    "exercise": {
      "id": "latpulldown",
      "name": "랫 풀다운",
      "englishName": "Lat Pulldown",
      "category": "헬스기구",
      "regions": [
        "등",
        "팔"
      ],
      "focus": "근력",
      "difficulty": "입문",
      "equipment": "랫 풀다운 머신",
      "minutes": "3세트 · 8–12회",
      "description": "팔꿈치를 아래·옆으로 당기며 광배근과 상부 등 근육을 쓰는 수직 당기기 운동입니다.",
      "cues": [
        "목 뒤가 아닌 가슴 윗부분 방향으로 당기기",
        "반동 없이 천천히 복귀",
        "그립보다 팔꿈치 이동에 집중"
      ],
      "benefits": [
        "등·팔 근력",
        "수직 당기기",
        "견갑 안정성"
      ],
      "warning": "목·어깨 통증이 있으면 무게를 줄이고 그립 폭을 조정하세요.",
      "reference": {
        "label": "CDC 주요 근육군 운동",
        "url": "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html"
      }
    },
    "detail": {
      "setup": [
        "시트·패드·손잡이를 신체에 맞게 조절",
        "매우 가벼운 무게로 1회 리허설",
        "가동 범위에서 통증 여부 확인"
      ],
      "finish": "중량을 제자리에 놓고 다음 세트 전 호흡·관절 반응을 확인합니다.",
      "commonMistakes": [
        "반동으로 중량 움직이기",
        "시트 위치를 맞추지 않음",
        "무게를 과도하게 올림"
      ],
      "regressions": [
        "중량 낮추기",
        "가동 범위 줄이기",
        "안정적인 그립·좌석 재설정"
      ],
      "progressions": [
        "반복 품질 유지 후 소폭 증량",
        "세트 1개 추가",
        "천천히 내리는 구간 제어"
      ]
    }
  },
  {
    "exercise": {
      "id": "rowing-ergometer",
      "name": "로잉 에르고미터",
      "englishName": "Rowing Ergometer",
      "category": "유산소",
      "regions": [
        "하체",
        "등",
        "팔",
        "코어"
      ],
      "focus": "심폐",
      "difficulty": "중급",
      "equipment": "로잉 머신",
      "minutes": "10–25분 · 일정한 스트로크",
      "description": "다리로 밀고 몸통을 연 뒤 팔로 당기는 순서로 전신을 사용하는 저충격 유산소 운동입니다.",
      "cues": [
        "다리-몸통-팔 순서로 당기기",
        "복귀는 팔-몸통-다리 순서",
        "허리를 둥글게 말지 않기"
      ],
      "benefits": [
        "전신 심폐 지구력",
        "등·하체 협응",
        "리듬 체력"
      ],
      "warning": "허리 통증이 있으면 스트로크 길이와 저항을 낮추고 자세를 확인하세요.",
      "reference": {
        "label": "WHO 신체 활동 권고",
        "url": "https://www.who.int/news-room/fact-sheets/detail/physical-activity"
      }
    },
    "detail": {
      "setup": [
        "기구 높이·저항을 편안한 위치로 설정",
        "3–5분 낮은 강도로 워밍업",
        "수분과 환기 상태를 확인"
      ],
      "finish": "마지막 몇 분은 저항을 낮추고 호흡이 안정된 뒤 종료합니다.",
      "commonMistakes": [
        "저항을 너무 빨리 올림",
        "손잡이에 체중을 과하게 싣기",
        "어지러움을 참음"
      ],
      "regressions": [
        "시간·저항 낮추기",
        "짧은 간격과 휴식",
        "저충격 기구 선택"
      ],
      "progressions": [
        "시간 우선 증가",
        "짧은 강도 변화",
        "주간 빈도 점진 증가"
      ]
    }
  },
  {
    "exercise": {
      "id": "leg-press",
      "name": "레그 프레스",
      "englishName": "Leg Press",
      "category": "헬스기구",
      "regions": [
        "하체",
        "둔근"
      ],
      "focus": "근력",
      "difficulty": "입문",
      "equipment": "레그 프레스 머신",
      "minutes": "3세트 · 8–12회",
      "description": "등과 골반을 등받이에 지지한 상태에서 발판을 밀어 하체에 점진적으로 부하를 주는 머신 운동입니다.",
      "cues": [
        "발 전체를 발판에 안정적으로 두기",
        "무릎을 과하게 잠그지 않기",
        "골반이 들리기 전 범위에서 멈추기"
      ],
      "benefits": [
        "대퇴·둔근 근력",
        "하체 부하 적응",
        "기초 저항 운동"
      ],
      "warning": "무릎·고관절 통증이나 골반 말림이 나타나면 가동 범위와 중량을 줄이세요.",
      "reference": {
        "label": "ACSM 저항 운동 지침",
        "url": "https://acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines/"
      }
    },
    "detail": {
      "setup": [
        "시트·패드·손잡이를 신체에 맞게 조절",
        "매우 가벼운 무게로 1회 리허설",
        "가동 범위에서 통증 여부 확인"
      ],
      "finish": "중량을 제자리에 놓고 다음 세트 전 호흡·관절 반응을 확인합니다.",
      "commonMistakes": [
        "반동으로 중량 움직이기",
        "시트 위치를 맞추지 않음",
        "무게를 과도하게 올림"
      ],
      "regressions": [
        "중량 낮추기",
        "가동 범위 줄이기",
        "안정적인 그립·좌석 재설정"
      ],
      "progressions": [
        "반복 품질 유지 후 소폭 증량",
        "세트 1개 추가",
        "천천히 내리는 구간 제어"
      ]
    }
  },
  {
    "exercise": {
      "id": "chest-press",
      "name": "머신 체스트 프레스",
      "englishName": "Machine Chest Press",
      "category": "헬스기구",
      "regions": [
        "가슴",
        "어깨",
        "팔"
      ],
      "focus": "근력",
      "difficulty": "입문",
      "equipment": "체스트 프레스 머신",
      "minutes": "3세트 · 8–12회",
      "description": "등받이에 안정적으로 앉아 손잡이를 앞으로 미는 상체 밀기 머신 운동입니다.",
      "cues": [
        "손잡이를 가슴 중앙 높이에 맞추기",
        "어깨가 과도하게 말리지 않게 하기",
        "밀고 돌아오는 구간 모두 제어"
      ],
      "benefits": [
        "가슴·팔 근력",
        "상체 밀기 패턴",
        "기초 저항 운동"
      ],
      "warning": "어깨 앞쪽 통증이 심해지면 그립 위치와 가동 범위를 조정하세요.",
      "reference": {
        "label": "CDC 주요 근육군 운동",
        "url": "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html"
      }
    },
    "detail": {
      "setup": [
        "시트·패드·손잡이를 신체에 맞게 조절",
        "매우 가벼운 무게로 1회 리허설",
        "가동 범위에서 통증 여부 확인"
      ],
      "finish": "중량을 제자리에 놓고 다음 세트 전 호흡·관절 반응을 확인합니다.",
      "commonMistakes": [
        "반동으로 중량 움직이기",
        "시트 위치를 맞추지 않음",
        "무게를 과도하게 올림"
      ],
      "regressions": [
        "중량 낮추기",
        "가동 범위 줄이기",
        "안정적인 그립·좌석 재설정"
      ],
      "progressions": [
        "반복 품질 유지 후 소폭 증량",
        "세트 1개 추가",
        "천천히 내리는 구간 제어"
      ]
    }
  },
  {
    "exercise": {
      "id": "goblet-squat",
      "name": "고블릿 스쿼트",
      "englishName": "Goblet Squat",
      "category": "프리웨이트",
      "regions": [
        "하체",
        "둔근",
        "코어"
      ],
      "focus": "근력",
      "difficulty": "입문",
      "equipment": "덤벨 또는 케틀벨",
      "minutes": "3세트 · 8–12회",
      "description": "가슴 앞에 덤벨을 들고 수행해 스쿼트 자세와 몸통 긴장을 배우기 좋은 하체 운동입니다.",
      "cues": [
        "무게를 몸 가까이에 두기",
        "발 전체로 지면 밀기",
        "무릎과 발끝 방향을 자연스럽게 맞추기"
      ],
      "benefits": [
        "하체·둔근 근력",
        "스쿼트 기술",
        "코어 긴장"
      ],
      "warning": "발뒤꿈치가 들리거나 허리 통증이 생기면 깊이와 중량을 낮추세요.",
      "reference": {
        "label": "ACSM 저항 운동 지침",
        "url": "https://acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines/"
      }
    },
    "detail": {
      "setup": [
        "주변 공간·바닥·장비 고정 상태 확인",
        "가벼운 중량으로 동작 경로 연습",
        "몸통 긴장과 편안한 호흡 준비"
      ],
      "finish": "중량을 안전하게 내려놓고 통증·피로·기술 변화를 기록합니다.",
      "commonMistakes": [
        "반동과 과도한 속도",
        "몸통 정렬을 잃음",
        "피로 시에도 같은 중량 고집"
      ],
      "regressions": [
        "맨몸 또는 가벼운 덤벨",
        "지지면 활용",
        "가동 범위·반복 수 낮추기"
      ],
      "progressions": [
        "반복 상한 달성 후 소폭 증량",
        "세트 추가",
        "안정적인 단측 변형"
      ]
    }
  },
  {
    "exercise": {
      "id": "overhead-press",
      "name": "덤벨 오버헤드 프레스",
      "englishName": "Dumbbell Overhead Press",
      "category": "프리웨이트",
      "regions": [
        "어깨",
        "팔",
        "코어"
      ],
      "focus": "근력",
      "difficulty": "중급",
      "equipment": "덤벨",
      "minutes": "3세트 · 6–10회",
      "description": "덤벨을 머리 위로 밀어 올리며 어깨와 몸통 안정성을 함께 사용하는 운동입니다.",
      "cues": [
        "갈비뼈가 과도하게 들리지 않게 하기",
        "흔들리지 않는 경로로 밀기",
        "목 주변 힘을 빼고 천천히 내리기"
      ],
      "benefits": [
        "어깨·팔 근력",
        "머리 위 밀기",
        "코어 안정성"
      ],
      "warning": "어깨 충돌감·저림이 있으면 가동 범위와 하중을 줄이고 평가를 받으세요.",
      "reference": {
        "label": "ACSM 저항 운동 지침",
        "url": "https://acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines/"
      }
    },
    "detail": {
      "setup": [
        "주변 공간·바닥·장비 고정 상태 확인",
        "가벼운 중량으로 동작 경로 연습",
        "몸통 긴장과 편안한 호흡 준비"
      ],
      "finish": "중량을 안전하게 내려놓고 통증·피로·기술 변화를 기록합니다.",
      "commonMistakes": [
        "반동과 과도한 속도",
        "몸통 정렬을 잃음",
        "피로 시에도 같은 중량 고집"
      ],
      "regressions": [
        "맨몸 또는 가벼운 덤벨",
        "지지면 활용",
        "가동 범위·반복 수 낮추기"
      ],
      "progressions": [
        "반복 상한 달성 후 소폭 증량",
        "세트 추가",
        "안정적인 단측 변형"
      ]
    }
  },
  {
    "exercise": {
      "id": "front-plank",
      "name": "프런트 플랭크",
      "englishName": "Front Plank",
      "category": "맨몸운동",
      "regions": [
        "코어",
        "어깨",
        "둔근"
      ],
      "focus": "근력",
      "difficulty": "입문",
      "equipment": "매트",
      "minutes": "2–4세트 · 15–45초",
      "description": "팔꿈치 또는 손으로 바닥을 지지하며 몸통이 과도하게 꺾이지 않도록 버티는 정적 코어 운동입니다.",
      "cues": [
        "바닥을 밀어 어깨를 안정시키기",
        "엉덩이를 과도하게 들거나 떨어뜨리지 않기",
        "짧은 시간부터 편안하게 호흡"
      ],
      "benefits": [
        "코어 지구력",
        "어깨 안정성",
        "몸통 정렬 인식"
      ],
      "warning": "허리 통증이 커지면 시간을 줄이거나 무릎 지지 변형을 사용하세요.",
      "reference": {
        "label": "CDC 주요 근육군 운동",
        "url": "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html"
      }
    },
    "detail": {
      "setup": [
        "미끄럽지 않은 바닥과 충분한 공간 확보",
        "쉬운 변형으로 움직임 범위 확인",
        "관절에 불편이 없는 시작 자세 설정"
      ],
      "finish": "호흡을 정리하고 필요한 경우 짧은 걷기·가동성으로 전환합니다.",
      "commonMistakes": [
        "몸통이 무너진 상태에서 반복",
        "통증을 참고 진행",
        "난이도를 너무 빨리 높임"
      ],
      "regressions": [
        "벽·벤치·무릎 지지",
        "짧은 범위",
        "반복·시간 줄이기"
      ],
      "progressions": [
        "지지면 낮추기",
        "시간 또는 반복 소폭 증가",
        "편측 변형"
      ]
    }
  },
  {
    "exercise": {
      "id": "cat-cow",
      "name": "캣·카우 가동성",
      "englishName": "Cat-Cow Mobility",
      "category": "모빌리티",
      "regions": [
        "등",
        "코어",
        "어깨"
      ],
      "focus": "가동성",
      "difficulty": "입문",
      "equipment": "매트",
      "minutes": "1–2세트 · 6–10회",
      "description": "네발 자세에서 척추를 부드럽게 굽히고 펴며 호흡과 몸통 움직임을 탐색하는 가동성 연습입니다.",
      "cues": [
        "통증 없는 작은 범위부터",
        "호흡에 맞춰 천천히 움직이기",
        "목을 과도하게 꺾지 않기"
      ],
      "benefits": [
        "척추 가동성 인식",
        "호흡·몸통 협응",
        "준비 운동"
      ],
      "warning": "외상 뒤 통증, 방사통, 신경 증상이 있으면 자가 운동보다 평가를 먼저 받으세요.",
      "reference": {
        "label": "NHS 통증 자가 관리",
        "url": "https://www.nhs.uk/live-well/pain/10-ways-to-ease-pain/"
      }
    },
    "detail": {
      "setup": [
        "통증 없는 작은 범위로 시작",
        "호흡을 길게 내쉬며 긴장 확인",
        "몸을 억지로 고정하지 않기"
      ],
      "finish": "움직임 뒤 불편감이 남지 않는지 확인하고 일상 동작으로 천천히 전환합니다.",
      "commonMistakes": [
        "가동 범위를 억지로 밀어붙임",
        "숨을 참음",
        "저림·방사통을 무시"
      ],
      "regressions": [
        "범위 줄이기",
        "지지대 사용",
        "누운 자세로 변경"
      ],
      "progressions": [
        "호흡에 맞춘 반복 추가",
        "조금 더 넓은 범위",
        "가벼운 근력 동작과 연결"
      ]
    }
  },
  {
    "exercise": {
      "id": "incline-walk",
      "name": "인클라인 워킹",
      "englishName": "Incline Walking",
      "category": "러닝",
      "regions": [
        "하체",
        "둔근"
      ],
      "focus": "심폐",
      "difficulty": "입문",
      "equipment": "트레드밀",
      "minutes": "15–30분 · 낮은 경사",
      "description": "걷기 속도를 유지한 채 완만한 경사를 이용해 심박을 높이는 저충격 유산소 선택지입니다.",
      "cues": [
        "난간을 당기지 않고 가볍게 손만 올리기",
        "보폭을 과하게 넓히지 않기",
        "몸 전체를 길게 유지"
      ],
      "benefits": [
        "심폐 체력",
        "둔근·종아리 지구력",
        "저충격 유산소"
      ],
      "warning": "무릎·아킬레스건 통증이 증가하면 경사와 시간을 낮추세요.",
      "reference": {
        "label": "CDC 신체 활동 지침",
        "url": "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html"
      }
    },
    "detail": {
      "setup": [
        "신발 끈·노면·날씨를 먼저 확인",
        "처음 5분은 걷기 또는 매우 편안한 속도",
        "호흡과 말하기 가능한 정도를 확인"
      ],
      "finish": "마지막 3–5분은 걷기로 낮추고 수분·통증 반응을 기록합니다.",
      "commonMistakes": [
        "초반부터 너무 빠르게 시작",
        "보폭을 과도하게 넓힘",
        "통증 신호를 무시"
      ],
      "regressions": [
        "걷기·달리기 교대",
        "평지·짧은 시간",
        "대화 가능한 강도"
      ],
      "progressions": [
        "시간을 소폭 늘리기",
        "완만한 경사",
        "회복이 충분한 날에만 빠른 구간 추가"
      ]
    }
  },
  {
    "exercise": {
      "id": "swimming",
      "name": "자유형 지속 수영",
      "englishName": "Steady Freestyle Swim",
      "category": "유산소",
      "regions": [
        "등",
        "어깨",
        "코어",
        "하체"
      ],
      "focus": "심폐",
      "difficulty": "중급",
      "equipment": "수영장 · 수경",
      "minutes": "15–30분 · 편안한 반복",
      "description": "호흡과 전신 협응을 사용해 물속에서 지속적으로 이동하는 저충격 유산소 활동입니다.",
      "cues": [
        "물에 얼굴을 넣을 때 길게 내쉬기",
        "어깨보다 몸통 회전으로 팔 뻗기",
        "피로하면 짧은 휴식 후 재개"
      ],
      "benefits": [
        "심폐 지구력",
        "전신 협응",
        "관절 충격 감소"
      ],
      "warning": "수영 능력과 수영장 안전 규칙을 확인하고, 혼자 무리하게 장거리 수영하지 마세요.",
      "reference": {
        "label": "CDC 신체 활동 지침",
        "url": "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html"
      }
    },
    "detail": {
      "setup": [
        "기구 높이·저항을 편안한 위치로 설정",
        "3–5분 낮은 강도로 워밍업",
        "수분과 환기 상태를 확인"
      ],
      "finish": "마지막 몇 분은 저항을 낮추고 호흡이 안정된 뒤 종료합니다.",
      "commonMistakes": [
        "저항을 너무 빨리 올림",
        "손잡이에 체중을 과하게 싣기",
        "어지러움을 참음"
      ],
      "regressions": [
        "시간·저항 낮추기",
        "짧은 간격과 휴식",
        "저충격 기구 선택"
      ],
      "progressions": [
        "시간 우선 증가",
        "짧은 강도 변화",
        "주간 빈도 점진 증가"
      ]
    }
  },
  {
    "exercise": {
      "id": "elliptical",
      "name": "엘립티컬 트레이너",
      "englishName": "Elliptical Trainer",
      "category": "유산소",
      "regions": [
        "하체",
        "둔근",
        "팔"
      ],
      "focus": "심폐",
      "difficulty": "입문",
      "equipment": "엘립티컬 머신",
      "minutes": "20–40분 · RPE 4–6",
      "description": "발이 페달에 닿은 상태로 전신을 리듬 있게 움직이는 저충격 유산소 운동입니다.",
      "cues": [
        "발 전체를 페달에 안정적으로 두기",
        "손잡이를 당기거나 밀며 어깨 긴장 풀기",
        "저항을 한 번에 크게 올리지 않기"
      ],
      "benefits": [
        "심폐 체력",
        "저충격 활동",
        "전신 반복 지구력"
      ],
      "warning": "어지러움이나 무릎 통증이 생기면 즉시 강도를 낮추거나 중단하세요.",
      "reference": {
        "label": "CDC 신체 활동 지침",
        "url": "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html"
      }
    },
    "detail": {
      "setup": [
        "기구 높이·저항을 편안한 위치로 설정",
        "3–5분 낮은 강도로 워밍업",
        "수분과 환기 상태를 확인"
      ],
      "finish": "마지막 몇 분은 저항을 낮추고 호흡이 안정된 뒤 종료합니다.",
      "commonMistakes": [
        "저항을 너무 빨리 올림",
        "손잡이에 체중을 과하게 싣기",
        "어지러움을 참음"
      ],
      "regressions": [
        "시간·저항 낮추기",
        "짧은 간격과 휴식",
        "저충격 기구 선택"
      ],
      "progressions": [
        "시간 우선 증가",
        "짧은 강도 변화",
        "주간 빈도 점진 증가"
      ]
    }
  },
  {
    "exercise": {
      "id": "stair-climber",
      "name": "스테어 클라이머",
      "englishName": "Stair Climber",
      "category": "유산소",
      "regions": [
        "하체",
        "둔근",
        "코어"
      ],
      "focus": "심폐",
      "difficulty": "중급",
      "equipment": "스테어 클라이머",
      "minutes": "10–25분 · 일정한 보폭",
      "description": "계단 오르기 패턴을 반복해 하체와 심폐계에 점진적으로 부하를 주는 기구 운동입니다.",
      "cues": [
        "발끝만 아닌 발 전체를 디디기",
        "난간에 체중을 기대지 않기",
        "처음에는 짧은 구간부터"
      ],
      "benefits": [
        "하체 지구력",
        "심폐 반응",
        "둔근 사용"
      ],
      "warning": "무릎 통증이나 균형 문제가 있으면 낮은 단계 또는 다른 저충격 활동을 선택하세요.",
      "reference": {
        "label": "CDC 신체 활동 지침",
        "url": "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html"
      }
    },
    "detail": {
      "setup": [
        "기구 높이·저항을 편안한 위치로 설정",
        "3–5분 낮은 강도로 워밍업",
        "수분과 환기 상태를 확인"
      ],
      "finish": "마지막 몇 분은 저항을 낮추고 호흡이 안정된 뒤 종료합니다.",
      "commonMistakes": [
        "저항을 너무 빨리 올림",
        "손잡이에 체중을 과하게 싣기",
        "어지러움을 참음"
      ],
      "regressions": [
        "시간·저항 낮추기",
        "짧은 간격과 휴식",
        "저충격 기구 선택"
      ],
      "progressions": [
        "시간 우선 증가",
        "짧은 강도 변화",
        "주간 빈도 점진 증가"
      ]
    }
  },
  {
    "exercise": {
      "id": "jump-rope",
      "name": "줄넘기 기초 바운스",
      "englishName": "Jump Rope Basic Bounce",
      "category": "유산소",
      "regions": [
        "하체",
        "코어"
      ],
      "focus": "협응",
      "difficulty": "중급",
      "equipment": "줄넘기 · 평평한 바닥",
      "minutes": "30초–2분 반복",
      "description": "짧고 낮은 점프를 리듬 있게 반복해 협응과 심폐 반응을 기르는 활동입니다.",
      "cues": [
        "발 앞부분으로 작고 조용하게 착지",
        "팔보다 손목으로 줄 돌리기",
        "짧은 구간과 휴식을 교대로"
      ],
      "benefits": [
        "리듬·협응",
        "심폐 반응",
        "종아리 탄성"
      ],
      "warning": "관절 통증·골절 위험·골반저 증상이 있다면 저충격 대안을 우선하세요.",
      "reference": {
        "label": "CDC 신체 활동 지침",
        "url": "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html"
      }
    },
    "detail": {
      "setup": [
        "기구 높이·저항을 편안한 위치로 설정",
        "3–5분 낮은 강도로 워밍업",
        "수분과 환기 상태를 확인"
      ],
      "finish": "마지막 몇 분은 저항을 낮추고 호흡이 안정된 뒤 종료합니다.",
      "commonMistakes": [
        "저항을 너무 빨리 올림",
        "손잡이에 체중을 과하게 싣기",
        "어지러움을 참음"
      ],
      "regressions": [
        "시간·저항 낮추기",
        "짧은 간격과 휴식",
        "저충격 기구 선택"
      ],
      "progressions": [
        "시간 우선 증가",
        "짧은 강도 변화",
        "주간 빈도 점진 증가"
      ]
    }
  },
  {
    "exercise": {
      "id": "leg-extension",
      "name": "레그 익스텐션",
      "englishName": "Leg Extension",
      "category": "헬스기구",
      "regions": [
        "하체"
      ],
      "focus": "근력",
      "difficulty": "입문",
      "equipment": "레그 익스텐션 머신",
      "minutes": "2–3세트 · 10–15회",
      "description": "앉은 자세에서 무릎을 펴며 대퇴 앞쪽을 사용하는 단일 관절 머신 운동입니다.",
      "cues": [
        "무릎 축을 머신 회전축에 맞추기",
        "끝 범위에서 무릎을 세게 잠그지 않기",
        "반동 없이 천천히 내리기"
      ],
      "benefits": [
        "대퇴사두근 근력",
        "무릎 펴기 조절",
        "하체 보조 운동"
      ],
      "warning": "무릎 앞쪽 통증이 커지면 가동 범위와 부하를 낮추세요.",
      "reference": {
        "label": "ACSM 신체 활동 지침",
        "url": "https://acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines/"
      }
    },
    "detail": {
      "setup": [
        "시트·패드·손잡이를 신체에 맞게 조절",
        "매우 가벼운 무게로 1회 리허설",
        "가동 범위에서 통증 여부 확인"
      ],
      "finish": "중량을 제자리에 놓고 다음 세트 전 호흡·관절 반응을 확인합니다.",
      "commonMistakes": [
        "반동으로 중량 움직이기",
        "시트 위치를 맞추지 않음",
        "무게를 과도하게 올림"
      ],
      "regressions": [
        "중량 낮추기",
        "가동 범위 줄이기",
        "안정적인 그립·좌석 재설정"
      ],
      "progressions": [
        "반복 품질 유지 후 소폭 증량",
        "세트 1개 추가",
        "천천히 내리는 구간 제어"
      ]
    }
  },
  {
    "exercise": {
      "id": "leg-curl",
      "name": "시티드 레그 컬",
      "englishName": "Seated Leg Curl",
      "category": "헬스기구",
      "regions": [
        "하체",
        "둔근"
      ],
      "focus": "근력",
      "difficulty": "입문",
      "equipment": "레그 컬 머신",
      "minutes": "2–3세트 · 10–15회",
      "description": "무릎을 굽히며 햄스트링을 사용하는 머신 운동으로, 하체 후면을 보조적으로 강화합니다.",
      "cues": [
        "골반을 시트에 안정적으로 고정",
        "허리를 과도하게 젖히지 않기",
        "되돌릴 때도 제어하기"
      ],
      "benefits": [
        "햄스트링 근력",
        "하체 후면 균형",
        "무릎 굽힘 조절"
      ],
      "warning": "햄스트링의 날카로운 통증이나 경련이 있으면 중단하고 부하를 낮추세요.",
      "reference": {
        "label": "ACSM 신체 활동 지침",
        "url": "https://acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines/"
      }
    },
    "detail": {
      "setup": [
        "시트·패드·손잡이를 신체에 맞게 조절",
        "매우 가벼운 무게로 1회 리허설",
        "가동 범위에서 통증 여부 확인"
      ],
      "finish": "중량을 제자리에 놓고 다음 세트 전 호흡·관절 반응을 확인합니다.",
      "commonMistakes": [
        "반동으로 중량 움직이기",
        "시트 위치를 맞추지 않음",
        "무게를 과도하게 올림"
      ],
      "regressions": [
        "중량 낮추기",
        "가동 범위 줄이기",
        "안정적인 그립·좌석 재설정"
      ],
      "progressions": [
        "반복 품질 유지 후 소폭 증량",
        "세트 1개 추가",
        "천천히 내리는 구간 제어"
      ]
    }
  },
  {
    "exercise": {
      "id": "machine-shoulder-press",
      "name": "머신 숄더 프레스",
      "englishName": "Machine Shoulder Press",
      "category": "헬스기구",
      "regions": [
        "어깨",
        "팔"
      ],
      "focus": "근력",
      "difficulty": "입문",
      "equipment": "숄더 프레스 머신",
      "minutes": "2–3세트 · 8–12회",
      "description": "등받이에 지지한 채 손잡이를 위로 밀어 어깨와 팔을 사용하는 기구 운동입니다.",
      "cues": [
        "손잡이를 귀 높이보다 편안한 위치에 맞추기",
        "갈비뼈가 과도하게 들리지 않게 하기",
        "무게보다 매끄러운 궤도 우선"
      ],
      "benefits": [
        "어깨·팔 근력",
        "머리 위 밀기",
        "기초 저항 운동"
      ],
      "warning": "어깨 충돌감, 저림 또는 목 통증이 있으면 중단하고 전문가에게 상담하세요.",
      "reference": {
        "label": "ACSM 신체 활동 지침",
        "url": "https://acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines/"
      }
    },
    "detail": {
      "setup": [
        "시트·패드·손잡이를 신체에 맞게 조절",
        "매우 가벼운 무게로 1회 리허설",
        "가동 범위에서 통증 여부 확인"
      ],
      "finish": "중량을 제자리에 놓고 다음 세트 전 호흡·관절 반응을 확인합니다.",
      "commonMistakes": [
        "반동으로 중량 움직이기",
        "시트 위치를 맞추지 않음",
        "무게를 과도하게 올림"
      ],
      "regressions": [
        "중량 낮추기",
        "가동 범위 줄이기",
        "안정적인 그립·좌석 재설정"
      ],
      "progressions": [
        "반복 품질 유지 후 소폭 증량",
        "세트 1개 추가",
        "천천히 내리는 구간 제어"
      ]
    }
  },
  {
    "exercise": {
      "id": "pec-deck",
      "name": "펙 덱 플라이",
      "englishName": "Pec Deck Fly",
      "category": "헬스기구",
      "regions": [
        "가슴",
        "어깨"
      ],
      "focus": "근력",
      "difficulty": "입문",
      "equipment": "펙 덱 머신",
      "minutes": "2–3세트 · 10–15회",
      "description": "등받이에 앉아 양쪽 패드를 안쪽으로 모으며 가슴 앞쪽을 사용하는 머신 운동입니다.",
      "cues": [
        "어깨를 귀 쪽으로 올리지 않기",
        "팔꿈치를 편안한 각도로 유지",
        "과도하게 뒤로 젖히지 않기"
      ],
      "benefits": [
        "가슴 근력",
        "상체 밀기 보조",
        "흉근 인식"
      ],
      "warning": "어깨 앞쪽 통증이 생기면 가동 범위와 좌석 위치를 조정하세요.",
      "reference": {
        "label": "ACSM 신체 활동 지침",
        "url": "https://acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines/"
      }
    },
    "detail": {
      "setup": [
        "시트·패드·손잡이를 신체에 맞게 조절",
        "매우 가벼운 무게로 1회 리허설",
        "가동 범위에서 통증 여부 확인"
      ],
      "finish": "중량을 제자리에 놓고 다음 세트 전 호흡·관절 반응을 확인합니다.",
      "commonMistakes": [
        "반동으로 중량 움직이기",
        "시트 위치를 맞추지 않음",
        "무게를 과도하게 올림"
      ],
      "regressions": [
        "중량 낮추기",
        "가동 범위 줄이기",
        "안정적인 그립·좌석 재설정"
      ],
      "progressions": [
        "반복 품질 유지 후 소폭 증량",
        "세트 1개 추가",
        "천천히 내리는 구간 제어"
      ]
    }
  },
  {
    "exercise": {
      "id": "hip-abduction",
      "name": "힙 어브덕션 머신",
      "englishName": "Hip Abduction Machine",
      "category": "헬스기구",
      "regions": [
        "둔근",
        "하체"
      ],
      "focus": "근력",
      "difficulty": "입문",
      "equipment": "힙 어브덕션 머신",
      "minutes": "2–3세트 · 10–15회",
      "description": "앉은 자세에서 다리를 바깥으로 벌려 엉덩이 바깥쪽 근육을 사용하는 머신 운동입니다.",
      "cues": [
        "골반을 시트에 안정적으로 두기",
        "반동으로 벌리지 않기",
        "복귀 구간도 천천히 제어"
      ],
      "benefits": [
        "둔근 보조 근력",
        "골반 안정성",
        "하체 보조 운동"
      ],
      "warning": "고관절 통증이 나타나면 가동 범위와 중량을 낮추세요.",
      "reference": {
        "label": "ACSM 신체 활동 지침",
        "url": "https://acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines/"
      }
    },
    "detail": {
      "setup": [
        "시트·패드·손잡이를 신체에 맞게 조절",
        "매우 가벼운 무게로 1회 리허설",
        "가동 범위에서 통증 여부 확인"
      ],
      "finish": "중량을 제자리에 놓고 다음 세트 전 호흡·관절 반응을 확인합니다.",
      "commonMistakes": [
        "반동으로 중량 움직이기",
        "시트 위치를 맞추지 않음",
        "무게를 과도하게 올림"
      ],
      "regressions": [
        "중량 낮추기",
        "가동 범위 줄이기",
        "안정적인 그립·좌석 재설정"
      ],
      "progressions": [
        "반복 품질 유지 후 소폭 증량",
        "세트 1개 추가",
        "천천히 내리는 구간 제어"
      ]
    }
  },
  {
    "exercise": {
      "id": "cable-pullthrough",
      "name": "케이블 풀스루",
      "englishName": "Cable Pull-Through",
      "category": "헬스기구",
      "regions": [
        "둔근",
        "하체",
        "코어"
      ],
      "focus": "근력",
      "difficulty": "중급",
      "equipment": "케이블 머신 · 로프",
      "minutes": "2–3세트 · 8–12회",
      "description": "케이블 저항을 이용해 힙 힌지 패턴과 둔근 사용을 연습하는 운동입니다.",
      "cues": [
        "엉덩이를 뒤로 보내며 케이블 장력 유지",
        "등을 길게 유지",
        "엉덩이 힘으로 일어서기"
      ],
      "benefits": [
        "둔근 근력",
        "힙 힌지 연습",
        "후면 사슬 부하"
      ],
      "warning": "허리 통증이나 균형 불안이 있다면 더 쉬운 힙 힌지 변형부터 연습하세요.",
      "reference": {
        "label": "ACSM 신체 활동 지침",
        "url": "https://acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines/"
      }
    },
    "detail": {
      "setup": [
        "시트·패드·손잡이를 신체에 맞게 조절",
        "매우 가벼운 무게로 1회 리허설",
        "가동 범위에서 통증 여부 확인"
      ],
      "finish": "중량을 제자리에 놓고 다음 세트 전 호흡·관절 반응을 확인합니다.",
      "commonMistakes": [
        "반동으로 중량 움직이기",
        "시트 위치를 맞추지 않음",
        "무게를 과도하게 올림"
      ],
      "regressions": [
        "중량 낮추기",
        "가동 범위 줄이기",
        "안정적인 그립·좌석 재설정"
      ],
      "progressions": [
        "반복 품질 유지 후 소폭 증량",
        "세트 1개 추가",
        "천천히 내리는 구간 제어"
      ]
    }
  },
  {
    "exercise": {
      "id": "dumbbell-bench",
      "name": "덤벨 벤치 프레스",
      "englishName": "Dumbbell Bench Press",
      "category": "프리웨이트",
      "regions": [
        "가슴",
        "어깨",
        "팔"
      ],
      "focus": "근력",
      "difficulty": "중급",
      "equipment": "덤벨 · 벤치",
      "minutes": "3세트 · 6–12회",
      "description": "벤치에서 양손 덤벨을 제어하며 상체 밀기 패턴을 연습하는 프리웨이트 운동입니다.",
      "cues": [
        "발을 바닥에 안정적으로 두기",
        "덤벨을 제어 가능한 범위에서 내리기",
        "손목을 중립에 가깝게 유지"
      ],
      "benefits": [
        "가슴·팔 근력",
        "좌우 제어",
        "상체 부하 적응"
      ],
      "warning": "혼자 고중량을 시도하지 말고 어깨 통증이 있으면 가동 범위를 낮추세요.",
      "reference": {
        "label": "ACSM 신체 활동 지침",
        "url": "https://acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines/"
      }
    },
    "detail": {
      "setup": [
        "주변 공간·바닥·장비 고정 상태 확인",
        "가벼운 중량으로 동작 경로 연습",
        "몸통 긴장과 편안한 호흡 준비"
      ],
      "finish": "중량을 안전하게 내려놓고 통증·피로·기술 변화를 기록합니다.",
      "commonMistakes": [
        "반동과 과도한 속도",
        "몸통 정렬을 잃음",
        "피로 시에도 같은 중량 고집"
      ],
      "regressions": [
        "맨몸 또는 가벼운 덤벨",
        "지지면 활용",
        "가동 범위·반복 수 낮추기"
      ],
      "progressions": [
        "반복 상한 달성 후 소폭 증량",
        "세트 추가",
        "안정적인 단측 변형"
      ]
    }
  },
  {
    "exercise": {
      "id": "lateral-raise",
      "name": "덤벨 레터럴 레이즈",
      "englishName": "Dumbbell Lateral Raise",
      "category": "프리웨이트",
      "regions": [
        "어깨"
      ],
      "focus": "근력",
      "difficulty": "입문",
      "equipment": "가벼운 덤벨",
      "minutes": "2–3세트 · 10–15회",
      "description": "가벼운 덤벨을 옆으로 들어 올려 어깨 옆쪽을 보조적으로 강화하는 운동입니다.",
      "cues": [
        "팔꿈치를 살짝 굽힌 채 유지",
        "어깨보다 몸통 반동을 쓰지 않기",
        "낮은 무게부터 제어"
      ],
      "benefits": [
        "어깨 근력",
        "상체 보조 운동",
        "움직임 제어"
      ],
      "warning": "어깨 통증이나 목 긴장이 생기면 중량과 높이를 낮추세요.",
      "reference": {
        "label": "ACSM 신체 활동 지침",
        "url": "https://acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines/"
      }
    },
    "detail": {
      "setup": [
        "주변 공간·바닥·장비 고정 상태 확인",
        "가벼운 중량으로 동작 경로 연습",
        "몸통 긴장과 편안한 호흡 준비"
      ],
      "finish": "중량을 안전하게 내려놓고 통증·피로·기술 변화를 기록합니다.",
      "commonMistakes": [
        "반동과 과도한 속도",
        "몸통 정렬을 잃음",
        "피로 시에도 같은 중량 고집"
      ],
      "regressions": [
        "맨몸 또는 가벼운 덤벨",
        "지지면 활용",
        "가동 범위·반복 수 낮추기"
      ],
      "progressions": [
        "반복 상한 달성 후 소폭 증량",
        "세트 추가",
        "안정적인 단측 변형"
      ]
    }
  },
  {
    "exercise": {
      "id": "barbell-hip-thrust",
      "name": "바벨 힙 쓰러스트",
      "englishName": "Barbell Hip Thrust",
      "category": "프리웨이트",
      "regions": [
        "둔근",
        "하체",
        "코어"
      ],
      "focus": "근력",
      "difficulty": "중급",
      "equipment": "바벨 · 벤치 · 패드",
      "minutes": "3세트 · 6–12회",
      "description": "등 상부를 벤치에 지지하고 엉덩이를 들어 올려 둔근에 부하를 주는 운동입니다.",
      "cues": [
        "갈비뼈와 골반을 과도하게 벌리지 않기",
        "정점에서 허리를 꺾지 않기",
        "엉덩이로 바벨을 들어 올리기"
      ],
      "benefits": [
        "둔근 근력",
        "힙 신전",
        "하체 후면 부하"
      ],
      "warning": "허리 통증이 느껴지면 범위와 부하를 낮추고 자세를 평가하세요.",
      "reference": {
        "label": "ACSM 신체 활동 지침",
        "url": "https://acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines/"
      }
    },
    "detail": {
      "setup": [
        "주변 공간·바닥·장비 고정 상태 확인",
        "가벼운 중량으로 동작 경로 연습",
        "몸통 긴장과 편안한 호흡 준비"
      ],
      "finish": "중량을 안전하게 내려놓고 통증·피로·기술 변화를 기록합니다.",
      "commonMistakes": [
        "반동과 과도한 속도",
        "몸통 정렬을 잃음",
        "피로 시에도 같은 중량 고집"
      ],
      "regressions": [
        "맨몸 또는 가벼운 덤벨",
        "지지면 활용",
        "가동 범위·반복 수 낮추기"
      ],
      "progressions": [
        "반복 상한 달성 후 소폭 증량",
        "세트 추가",
        "안정적인 단측 변형"
      ]
    }
  },
  {
    "exercise": {
      "id": "farmer-carry",
      "name": "파머스 캐리",
      "englishName": "Farmer Carry",
      "category": "프리웨이트",
      "regions": [
        "팔",
        "코어",
        "하체",
        "등"
      ],
      "focus": "체력",
      "difficulty": "중급",
      "equipment": "덤벨 또는 케틀벨",
      "minutes": "20–60초 걷기 · 2–4회",
      "description": "양손에 적절한 무게를 들고 안정적인 보행을 유지하는 전신 운반 운동입니다.",
      "cues": [
        "가슴을 과도하게 들지 않고 길게 서기",
        "어깨를 귀에서 멀어지게",
        "짧고 안정적인 보폭"
      ],
      "benefits": [
        "그립·코어 지구력",
        "보행 안정성",
        "전신 협응"
      ],
      "warning": "허리·어깨 통증 또는 균형 문제가 있으면 가벼운 무게·짧은 거리부터 시작하세요.",
      "reference": {
        "label": "ACSM 신체 활동 지침",
        "url": "https://acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines/"
      }
    },
    "detail": {
      "setup": [
        "주변 공간·바닥·장비 고정 상태 확인",
        "가벼운 중량으로 동작 경로 연습",
        "몸통 긴장과 편안한 호흡 준비"
      ],
      "finish": "중량을 안전하게 내려놓고 통증·피로·기술 변화를 기록합니다.",
      "commonMistakes": [
        "반동과 과도한 속도",
        "몸통 정렬을 잃음",
        "피로 시에도 같은 중량 고집"
      ],
      "regressions": [
        "맨몸 또는 가벼운 덤벨",
        "지지면 활용",
        "가동 범위·반복 수 낮추기"
      ],
      "progressions": [
        "반복 상한 달성 후 소폭 증량",
        "세트 추가",
        "안정적인 단측 변형"
      ]
    }
  },
  {
    "exercise": {
      "id": "step-up",
      "name": "스텝업",
      "englishName": "Step-up",
      "category": "맨몸운동",
      "regions": [
        "하체",
        "둔근",
        "코어"
      ],
      "focus": "협응",
      "difficulty": "입문",
      "equipment": "낮은 박스 또는 계단",
      "minutes": "좌우 2–3세트 · 6–12회",
      "description": "낮은 지지면 위로 한 발씩 올라가며 하체 힘과 한쪽 다리 제어를 연습합니다.",
      "cues": [
        "발 전체를 박스 위에 올리기",
        "올라간 다리로 바닥 밀기",
        "높이를 낮게 시작"
      ],
      "benefits": [
        "한쪽 다리 협응",
        "둔근·대퇴 근력",
        "계단 움직임"
      ],
      "warning": "무릎 통증이나 균형 불안이 있으면 지지대를 사용하거나 낮은 높이를 선택하세요.",
      "reference": {
        "label": "CDC 신체 활동 지침",
        "url": "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html"
      }
    },
    "detail": {
      "setup": [
        "미끄럽지 않은 바닥과 충분한 공간 확보",
        "쉬운 변형으로 움직임 범위 확인",
        "관절에 불편이 없는 시작 자세 설정"
      ],
      "finish": "호흡을 정리하고 필요한 경우 짧은 걷기·가동성으로 전환합니다.",
      "commonMistakes": [
        "몸통이 무너진 상태에서 반복",
        "통증을 참고 진행",
        "난이도를 너무 빨리 높임"
      ],
      "regressions": [
        "벽·벤치·무릎 지지",
        "짧은 범위",
        "반복·시간 줄이기"
      ],
      "progressions": [
        "지지면 낮추기",
        "시간 또는 반복 소폭 증가",
        "편측 변형"
      ]
    }
  },
  {
    "exercise": {
      "id": "reverse-lunge",
      "name": "리버스 런지",
      "englishName": "Reverse Lunge",
      "category": "맨몸운동",
      "regions": [
        "하체",
        "둔근",
        "코어"
      ],
      "focus": "근력",
      "difficulty": "중급",
      "equipment": "없음",
      "minutes": "좌우 2–3세트 · 6–10회",
      "description": "한 발을 뒤로 보내며 앞다리로 지면을 밀어 일어나는 한쪽 다리 운동입니다.",
      "cues": [
        "앞발 전체로 바닥 누르기",
        "상체를 길게 세우기",
        "짧은 보폭과 얕은 범위부터"
      ],
      "benefits": [
        "하체·둔근 근력",
        "한쪽 다리 제어",
        "균형"
      ],
      "warning": "무릎 통증이나 균형 상실이 있으면 지지대를 사용하거나 더 쉬운 변형을 선택하세요.",
      "reference": {
        "label": "CDC 신체 활동 지침",
        "url": "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html"
      }
    },
    "detail": {
      "setup": [
        "미끄럽지 않은 바닥과 충분한 공간 확보",
        "쉬운 변형으로 움직임 범위 확인",
        "관절에 불편이 없는 시작 자세 설정"
      ],
      "finish": "호흡을 정리하고 필요한 경우 짧은 걷기·가동성으로 전환합니다.",
      "commonMistakes": [
        "몸통이 무너진 상태에서 반복",
        "통증을 참고 진행",
        "난이도를 너무 빨리 높임"
      ],
      "regressions": [
        "벽·벤치·무릎 지지",
        "짧은 범위",
        "반복·시간 줄이기"
      ],
      "progressions": [
        "지지면 낮추기",
        "시간 또는 반복 소폭 증가",
        "편측 변형"
      ]
    }
  },
  {
    "exercise": {
      "id": "bodyweight-squat",
      "name": "맨몸 스쿼트",
      "englishName": "Bodyweight Squat",
      "category": "맨몸운동",
      "regions": [
        "하체",
        "둔근",
        "코어"
      ],
      "focus": "근력",
      "difficulty": "입문",
      "equipment": "없음",
      "minutes": "2–4세트 · 8–15회",
      "description": "체중을 이용해 앉았다 일어나며 하체 움직임과 가동 범위를 연습하는 기초 운동입니다.",
      "cues": [
        "발 전체에 체중 고르게 두기",
        "무릎과 발끝을 자연스럽게 같은 방향",
        "편안한 범위에서 천천히"
      ],
      "benefits": [
        "하체 기초 근력",
        "앉았다 일어나기",
        "움직임 자신감"
      ],
      "warning": "무릎·허리 통증이 생기면 의자 높이를 활용하거나 범위를 줄이세요.",
      "reference": {
        "label": "CDC 신체 활동 지침",
        "url": "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html"
      }
    },
    "detail": {
      "setup": [
        "미끄럽지 않은 바닥과 충분한 공간 확보",
        "쉬운 변형으로 움직임 범위 확인",
        "관절에 불편이 없는 시작 자세 설정"
      ],
      "finish": "호흡을 정리하고 필요한 경우 짧은 걷기·가동성으로 전환합니다.",
      "commonMistakes": [
        "몸통이 무너진 상태에서 반복",
        "통증을 참고 진행",
        "난이도를 너무 빨리 높임"
      ],
      "regressions": [
        "벽·벤치·무릎 지지",
        "짧은 범위",
        "반복·시간 줄이기"
      ],
      "progressions": [
        "지지면 낮추기",
        "시간 또는 반복 소폭 증가",
        "편측 변형"
      ]
    }
  },
  {
    "exercise": {
      "id": "mountain-climber",
      "name": "마운틴 클라이머",
      "englishName": "Mountain Climber",
      "category": "맨몸운동",
      "regions": [
        "코어",
        "어깨",
        "하체"
      ],
      "focus": "체력",
      "difficulty": "중급",
      "equipment": "매트",
      "minutes": "20–40초 · 2–4회",
      "description": "플랭크 자세에서 무릎을 번갈아 당겨 전신 지구력과 리듬을 사용하는 운동입니다.",
      "cues": [
        "손으로 바닥을 밀어 어깨 안정",
        "허리가 과도하게 흔들리지 않게",
        "느린 템포부터 시작"
      ],
      "benefits": [
        "전신 체력",
        "코어 제어",
        "심박 반응"
      ],
      "warning": "손목·어깨·허리 통증이 있으면 높은 지지면 변형 또는 다른 운동을 선택하세요.",
      "reference": {
        "label": "CDC 신체 활동 지침",
        "url": "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html"
      }
    },
    "detail": {
      "setup": [
        "미끄럽지 않은 바닥과 충분한 공간 확보",
        "쉬운 변형으로 움직임 범위 확인",
        "관절에 불편이 없는 시작 자세 설정"
      ],
      "finish": "호흡을 정리하고 필요한 경우 짧은 걷기·가동성으로 전환합니다.",
      "commonMistakes": [
        "몸통이 무너진 상태에서 반복",
        "통증을 참고 진행",
        "난이도를 너무 빨리 높임"
      ],
      "regressions": [
        "벽·벤치·무릎 지지",
        "짧은 범위",
        "반복·시간 줄이기"
      ],
      "progressions": [
        "지지면 낮추기",
        "시간 또는 반복 소폭 증가",
        "편측 변형"
      ]
    }
  },
  {
    "exercise": {
      "id": "bird-dog",
      "name": "버드 독",
      "englishName": "Bird Dog",
      "category": "맨몸운동",
      "regions": [
        "코어",
        "등",
        "둔근"
      ],
      "focus": "협응",
      "difficulty": "입문",
      "equipment": "매트",
      "minutes": "좌우 2–3세트 · 6–10회",
      "description": "네발 자세에서 반대쪽 팔과 다리를 천천히 뻗어 몸통의 안정과 협응을 연습합니다.",
      "cues": [
        "골반이 좌우로 흔들리지 않게",
        "팔·다리를 낮게부터 뻗기",
        "숨을 참지 않고 천천히"
      ],
      "benefits": [
        "코어 협응",
        "둔근·등 조절",
        "몸통 안정성"
      ],
      "warning": "허리 통증이 증가하면 움직임 범위를 줄이거나 중단하세요.",
      "reference": {
        "label": "NHS 통증 자가 관리",
        "url": "https://www.nhs.uk/live-well/pain/10-ways-to-ease-pain/"
      }
    },
    "detail": {
      "setup": [
        "미끄럽지 않은 바닥과 충분한 공간 확보",
        "쉬운 변형으로 움직임 범위 확인",
        "관절에 불편이 없는 시작 자세 설정"
      ],
      "finish": "호흡을 정리하고 필요한 경우 짧은 걷기·가동성으로 전환합니다.",
      "commonMistakes": [
        "몸통이 무너진 상태에서 반복",
        "통증을 참고 진행",
        "난이도를 너무 빨리 높임"
      ],
      "regressions": [
        "벽·벤치·무릎 지지",
        "짧은 범위",
        "반복·시간 줄이기"
      ],
      "progressions": [
        "지지면 낮추기",
        "시간 또는 반복 소폭 증가",
        "편측 변형"
      ]
    }
  },
  {
    "exercise": {
      "id": "wall-sit",
      "name": "월 싯",
      "englishName": "Wall Sit",
      "category": "맨몸운동",
      "regions": [
        "하체",
        "코어"
      ],
      "focus": "체력",
      "difficulty": "입문",
      "equipment": "벽",
      "minutes": "15–45초 · 2–4회",
      "description": "벽에 등을 대고 앉은 자세를 유지하며 하체 근지구력을 기르는 정적 운동입니다.",
      "cues": [
        "발을 무릎 아래에 안정적으로 두기",
        "허리를 벽에 편안하게 지지",
        "짧은 시간부터 시작"
      ],
      "benefits": [
        "대퇴 근지구력",
        "하체 버티기",
        "운동 시간 관리"
      ],
      "warning": "무릎 통증이 생기면 깊이와 시간을 즉시 낮추세요.",
      "reference": {
        "label": "CDC 신체 활동 지침",
        "url": "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html"
      }
    },
    "detail": {
      "setup": [
        "미끄럽지 않은 바닥과 충분한 공간 확보",
        "쉬운 변형으로 움직임 범위 확인",
        "관절에 불편이 없는 시작 자세 설정"
      ],
      "finish": "호흡을 정리하고 필요한 경우 짧은 걷기·가동성으로 전환합니다.",
      "commonMistakes": [
        "몸통이 무너진 상태에서 반복",
        "통증을 참고 진행",
        "난이도를 너무 빨리 높임"
      ],
      "regressions": [
        "벽·벤치·무릎 지지",
        "짧은 범위",
        "반복·시간 줄이기"
      ],
      "progressions": [
        "지지면 낮추기",
        "시간 또는 반복 소폭 증가",
        "편측 변형"
      ]
    }
  },
  {
    "exercise": {
      "id": "hip-flexor-stretch",
      "name": "반무릎 고관절 앞쪽 스트레칭",
      "englishName": "Half-Kneeling Hip Flexor Stretch",
      "category": "모빌리티",
      "regions": [
        "하체",
        "둔근",
        "코어"
      ],
      "focus": "가동성",
      "difficulty": "입문",
      "equipment": "매트",
      "minutes": "좌우 20–40초 · 2회",
      "description": "한쪽 무릎을 바닥에 두고 골반을 부드럽게 앞으로 이동해 고관절 앞쪽의 편안한 범위를 탐색합니다.",
      "cues": [
        "골반을 과도하게 앞으로 기울이지 않기",
        "엉덩이를 가볍게 조이기",
        "통증 없는 범위에서 호흡"
      ],
      "benefits": [
        "고관절 가동성",
        "보행·런지 준비",
        "골반 위치 인식"
      ],
      "warning": "앞쪽 고관절 통증이나 저림이 있으면 강한 스트레칭을 피하고 평가를 받으세요.",
      "reference": {
        "label": "NHS 통증 자가 관리",
        "url": "https://www.nhs.uk/live-well/pain/10-ways-to-ease-pain/"
      }
    },
    "detail": {
      "setup": [
        "통증 없는 작은 범위로 시작",
        "호흡을 길게 내쉬며 긴장 확인",
        "몸을 억지로 고정하지 않기"
      ],
      "finish": "움직임 뒤 불편감이 남지 않는지 확인하고 일상 동작으로 천천히 전환합니다.",
      "commonMistakes": [
        "가동 범위를 억지로 밀어붙임",
        "숨을 참음",
        "저림·방사통을 무시"
      ],
      "regressions": [
        "범위 줄이기",
        "지지대 사용",
        "누운 자세로 변경"
      ],
      "progressions": [
        "호흡에 맞춘 반복 추가",
        "조금 더 넓은 범위",
        "가벼운 근력 동작과 연결"
      ]
    }
  },
  {
    "exercise": {
      "id": "thoracic-rotation",
      "name": "오픈 북 흉추 회전",
      "englishName": "Open Book Rotation",
      "category": "모빌리티",
      "regions": [
        "등",
        "어깨",
        "코어"
      ],
      "focus": "가동성",
      "difficulty": "입문",
      "equipment": "매트",
      "minutes": "좌우 6–10회",
      "description": "옆으로 누워 팔을 열며 등 상부의 편안한 회전 범위를 탐색하는 가동성 연습입니다.",
      "cues": [
        "골반과 무릎을 안정적으로 두기",
        "팔보다 흉곽 회전에 집중",
        "호흡을 길게 내쉬기"
      ],
      "benefits": [
        "흉추 가동성",
        "어깨 움직임 준비",
        "호흡·회전 협응"
      ],
      "warning": "어지러움, 방사통, 외상 후 통증이 있으면 시행하지 마세요.",
      "reference": {
        "label": "NHS 통증 자가 관리",
        "url": "https://www.nhs.uk/live-well/pain/10-ways-to-ease-pain/"
      }
    },
    "detail": {
      "setup": [
        "통증 없는 작은 범위로 시작",
        "호흡을 길게 내쉬며 긴장 확인",
        "몸을 억지로 고정하지 않기"
      ],
      "finish": "움직임 뒤 불편감이 남지 않는지 확인하고 일상 동작으로 천천히 전환합니다.",
      "commonMistakes": [
        "가동 범위를 억지로 밀어붙임",
        "숨을 참음",
        "저림·방사통을 무시"
      ],
      "regressions": [
        "범위 줄이기",
        "지지대 사용",
        "누운 자세로 변경"
      ],
      "progressions": [
        "호흡에 맞춘 반복 추가",
        "조금 더 넓은 범위",
        "가벼운 근력 동작과 연결"
      ]
    }
  },
  {
    "exercise": {
      "id": "ankle-rock",
      "name": "발목 전방 이동",
      "englishName": "Knee-to-Wall Ankle Rock",
      "category": "모빌리티",
      "regions": [
        "하체"
      ],
      "focus": "가동성",
      "difficulty": "입문",
      "equipment": "벽",
      "minutes": "좌우 1–2세트 · 8회",
      "description": "발뒤꿈치를 바닥에 둔 채 무릎을 벽 방향으로 천천히 보내 발목 움직임을 탐색합니다.",
      "cues": [
        "발뒤꿈치를 바닥에 유지",
        "무릎은 발끝 방향으로 부드럽게",
        "통증 없이 범위를 작게 조절"
      ],
      "benefits": [
        "발목 가동성",
        "스쿼트·걷기 준비",
        "하체 움직임 인식"
      ],
      "warning": "발목의 급성 붓기, 열감, 체중 부하 불가가 있으면 시행하지 마세요.",
      "reference": {
        "label": "NHS 통증 자가 관리",
        "url": "https://www.nhs.uk/live-well/pain/10-ways-to-ease-pain/"
      }
    },
    "detail": {
      "setup": [
        "통증 없는 작은 범위로 시작",
        "호흡을 길게 내쉬며 긴장 확인",
        "몸을 억지로 고정하지 않기"
      ],
      "finish": "움직임 뒤 불편감이 남지 않는지 확인하고 일상 동작으로 천천히 전환합니다.",
      "commonMistakes": [
        "가동 범위를 억지로 밀어붙임",
        "숨을 참음",
        "저림·방사통을 무시"
      ],
      "regressions": [
        "범위 줄이기",
        "지지대 사용",
        "누운 자세로 변경"
      ],
      "progressions": [
        "호흡에 맞춘 반복 추가",
        "조금 더 넓은 범위",
        "가벼운 근력 동작과 연결"
      ]
    }
  },
  {
    "exercise": {
      "id": "ninety-ninety",
      "name": "90·90 힙 스위치",
      "englishName": "90/90 Hip Switch",
      "category": "모빌리티",
      "regions": [
        "둔근",
        "하체",
        "코어"
      ],
      "focus": "가동성",
      "difficulty": "중급",
      "equipment": "매트",
      "minutes": "좌우 6–10회",
      "description": "앉은 자세에서 양쪽 고관절을 번갈아 회전하며 편안한 움직임 범위를 연습합니다.",
      "cues": [
        "양손으로 몸을 지지해도 괜찮기",
        "허리를 억지로 비틀지 않기",
        "천천히 방향 전환"
      ],
      "benefits": [
        "고관절 회전",
        "바닥 움직임",
        "골반·몸통 협응"
      ],
      "warning": "고관절 앞쪽의 날카로운 통증이 있으면 범위를 줄이거나 중단하세요.",
      "reference": {
        "label": "NHS 통증 자가 관리",
        "url": "https://www.nhs.uk/live-well/pain/10-ways-to-ease-pain/"
      }
    },
    "detail": {
      "setup": [
        "통증 없는 작은 범위로 시작",
        "호흡을 길게 내쉬며 긴장 확인",
        "몸을 억지로 고정하지 않기"
      ],
      "finish": "움직임 뒤 불편감이 남지 않는지 확인하고 일상 동작으로 천천히 전환합니다.",
      "commonMistakes": [
        "가동 범위를 억지로 밀어붙임",
        "숨을 참음",
        "저림·방사통을 무시"
      ],
      "regressions": [
        "범위 줄이기",
        "지지대 사용",
        "누운 자세로 변경"
      ],
      "progressions": [
        "호흡에 맞춘 반복 추가",
        "조금 더 넓은 범위",
        "가벼운 근력 동작과 연결"
      ]
    }
  },
  {
    "exercise": {
      "id": "single-leg-stand",
      "name": "한 발 서기",
      "englishName": "Single-Leg Stand",
      "category": "균형·협응",
      "regions": [
        "하체",
        "둔근",
        "코어"
      ],
      "focus": "균형",
      "difficulty": "입문",
      "equipment": "벽 또는 의자 근처",
      "minutes": "좌우 10–30초 · 2–3회",
      "description": "지지대 가까이에서 한 발로 서며 일상적인 균형 감각을 연습하는 활동입니다.",
      "cues": [
        "벽이나 의자 가까이에서 시작",
        "시선은 정면에 두기",
        "발가락에 힘을 과하게 주지 않기"
      ],
      "benefits": [
        "정적 균형",
        "발목·둔근 조절",
        "낙상 예방 활동"
      ],
      "warning": "넘어질 위험이 있으면 반드시 지지대를 사용하고 혼자 어려운 변형을 시도하지 마세요.",
      "reference": {
        "label": "CDC 고령자 활동·균형 지침",
        "url": "https://www.cdc.gov/physical-activity-basics/guidelines/older-adults.html"
      }
    },
    "detail": {
      "setup": [
        "벽 또는 안정된 의자 옆에 서기",
        "양발로 2–3회 체중 이동을 먼저 연습",
        "시선을 정면의 고정된 지점에 둠"
      ],
      "finish": "양발을 바닥에 두고 안정된 뒤 다음 쪽으로 전환합니다.",
      "commonMistakes": [
        "지지대에서 멀리 떨어짐",
        "발가락을 과도하게 움켜쥠",
        "피로한 상태에서 눈 감기 변형 시도"
      ],
      "regressions": [
        "양손 지지",
        "발끝만 바닥에서 떼기",
        "10초 미만 유지"
      ],
      "progressions": [
        "한 손 지지",
        "시간 증가",
        "안전한 환경에서 느린 팔 움직임"
      ]
    }
  },
  {
    "exercise": {
      "id": "tandem-walk",
      "name": "탠덤 워킹",
      "englishName": "Heel-to-Toe Walk",
      "category": "균형·협응",
      "regions": [
        "하체",
        "코어"
      ],
      "focus": "균형",
      "difficulty": "입문",
      "equipment": "벽 옆의 평평한 바닥",
      "minutes": "5–10걸음 · 2–3회",
      "description": "한 발의 뒤꿈치를 다음 발의 발가락 가까이에 두며 천천히 걷는 균형 연습입니다.",
      "cues": [
        "벽 가까운 곳에서 수행",
        "천천히 한 걸음씩",
        "필요하면 발 사이 간격 넓히기"
      ],
      "benefits": [
        "동적 균형",
        "보행 협응",
        "낙상 예방 활동"
      ],
      "warning": "어지러움이나 보행 불안이 있으면 의료진·전문가와 상의하고 지지대를 사용하세요.",
      "reference": {
        "label": "CDC 고령자 활동·균형 지침",
        "url": "https://www.cdc.gov/physical-activity-basics/guidelines/older-adults.html"
      }
    },
    "detail": {
      "setup": [
        "벽·의자 등 지지대 가까이 배치",
        "미끄럽지 않은 평평한 바닥 선택",
        "천천히 시작해 주변 안전 확인"
      ],
      "finish": "지지대를 잡고 안정된 뒤 종료하며 어지러움·불안을 기록합니다.",
      "commonMistakes": [
        "지지대 없이 어려운 변형 시도",
        "속도를 너무 높임",
        "피로한 상태에서 균형 도전"
      ],
      "regressions": [
        "양손 지지",
        "양발 간격 넓히기",
        "짧은 시간"
      ],
      "progressions": [
        "한 손 지지",
        "시간 소폭 증가",
        "천천히 걷는 변형"
      ]
    }
  },
  {
    "exercise": {
      "id": "sit-to-stand",
      "name": "의자 앉았다 일어나기",
      "englishName": "Sit-to-Stand",
      "category": "균형·협응",
      "regions": [
        "하체",
        "둔근",
        "코어"
      ],
      "focus": "협응",
      "difficulty": "입문",
      "equipment": "안정된 의자",
      "minutes": "2–3세트 · 5–12회",
      "description": "안정된 의자에서 앉았다 일어나며 일상 동작과 하체 힘을 연습하는 활동입니다.",
      "cues": [
        "의자가 움직이지 않는지 확인",
        "발을 골반 너비로 두기",
        "필요하면 손으로 지지"
      ],
      "benefits": [
        "일상 기능",
        "하체 근력",
        "균형·협응"
      ],
      "warning": "어지러움·무릎 통증·넘어질 위험이 있으면 지지대나 도움을 사용하세요.",
      "reference": {
        "label": "CDC 고령자 활동·균형 지침",
        "url": "https://www.cdc.gov/physical-activity-basics/guidelines/older-adults.html"
      }
    },
    "detail": {
      "setup": [
        "벽·의자 등 지지대 가까이 배치",
        "미끄럽지 않은 평평한 바닥 선택",
        "천천히 시작해 주변 안전 확인"
      ],
      "finish": "지지대를 잡고 안정된 뒤 종료하며 어지러움·불안을 기록합니다.",
      "commonMistakes": [
        "지지대 없이 어려운 변형 시도",
        "속도를 너무 높임",
        "피로한 상태에서 균형 도전"
      ],
      "regressions": [
        "양손 지지",
        "양발 간격 넓히기",
        "짧은 시간"
      ],
      "progressions": [
        "한 손 지지",
        "시간 소폭 증가",
        "천천히 걷는 변형"
      ]
    }
  },
  {
    "exercise": {
      "id": "downward-dog",
      "name": "다운독",
      "englishName": "Downward-Facing Dog",
      "category": "요가·필라테스",
      "regions": [
        "어깨",
        "등",
        "하체",
        "코어"
      ],
      "focus": "가동성",
      "difficulty": "입문",
      "equipment": "매트",
      "minutes": "20–40초 · 2–3회",
      "description": "손과 발로 바닥을 지지해 엉덩이를 뒤·위로 보내며 전신의 편안한 길이를 탐색하는 요가 자세입니다.",
      "cues": [
        "무릎을 살짝 굽혀도 괜찮기",
        "손으로 바닥을 부드럽게 밀기",
        "목에 힘을 빼고 호흡"
      ],
      "benefits": [
        "어깨·햄스트링 가동성",
        "전신 지지",
        "호흡과 움직임"
      ],
      "warning": "손목·어깨 통증 또는 혈압·어지러움 문제가 있다면 변형을 사용하거나 상담하세요.",
      "reference": {
        "label": "NHS 통증 자가 관리",
        "url": "https://www.nhs.uk/live-well/pain/10-ways-to-ease-pain/"
      }
    },
    "detail": {
      "setup": [
        "매트와 충분한 공간 준비",
        "호흡이 편안한 범위 설정",
        "관절이 불편하면 블록·쿠션 활용"
      ],
      "finish": "중립 자세에서 몇 번 호흡하고 어지러움·통증 반응을 확인합니다.",
      "commonMistakes": [
        "유연성을 과시하려 무리함",
        "호흡을 참음",
        "통증을 스트레칭으로 오해"
      ],
      "regressions": [
        "쿠션·벽·의자 사용",
        "무릎 굽히기",
        "자세 유지 시간 줄이기"
      ],
      "progressions": [
        "호흡 주기 추가",
        "안정된 범위에서 유지 시간 증가",
        "전환 동작 부드럽게 연결"
      ]
    }
  },
  {
    "exercise": {
      "id": "warrior-two",
      "name": "워리어 II",
      "englishName": "Warrior II",
      "category": "요가·필라테스",
      "regions": [
        "하체",
        "둔근",
        "코어",
        "어깨"
      ],
      "focus": "균형",
      "difficulty": "입문",
      "equipment": "매트",
      "minutes": "좌우 20–40초 · 2회",
      "description": "양발을 넓게 두고 앞무릎을 편안하게 굽혀 하체 안정성과 자세 인식을 연습하는 요가 자세입니다.",
      "cues": [
        "앞무릎은 발끝 방향으로",
        "골반을 억지로 정면으로 만들지 않기",
        "어깨 힘을 빼고 팔 길게"
      ],
      "benefits": [
        "하체 지구력",
        "자세·균형",
        "고관절 움직임"
      ],
      "warning": "무릎·고관절 통증이 있으면 보폭과 무릎 굽힘을 줄이세요.",
      "reference": {
        "label": "NHS 통증 자가 관리",
        "url": "https://www.nhs.uk/live-well/pain/10-ways-to-ease-pain/"
      }
    },
    "detail": {
      "setup": [
        "매트와 충분한 공간 준비",
        "호흡이 편안한 범위 설정",
        "관절이 불편하면 블록·쿠션 활용"
      ],
      "finish": "중립 자세에서 몇 번 호흡하고 어지러움·통증 반응을 확인합니다.",
      "commonMistakes": [
        "유연성을 과시하려 무리함",
        "호흡을 참음",
        "통증을 스트레칭으로 오해"
      ],
      "regressions": [
        "쿠션·벽·의자 사용",
        "무릎 굽히기",
        "자세 유지 시간 줄이기"
      ],
      "progressions": [
        "호흡 주기 추가",
        "안정된 범위에서 유지 시간 증가",
        "전환 동작 부드럽게 연결"
      ]
    }
  },
  {
    "exercise": {
      "id": "pilates-hundred",
      "name": "필라테스 헌드레드 변형",
      "englishName": "Pilates Hundred Modification",
      "category": "요가·필라테스",
      "regions": [
        "코어",
        "팔",
        "하체"
      ],
      "focus": "협응",
      "difficulty": "중급",
      "equipment": "매트",
      "minutes": "5회 호흡 · 3–5세트",
      "description": "누운 자세에서 팔을 작게 펌핑하며 호흡과 코어 조절을 연습하는 필라테스 기반 변형입니다.",
      "cues": [
        "목에 힘이 들어가면 머리를 바닥에 두기",
        "다리를 높게 두어 난이도 낮추기",
        "호흡을 억지로 참지 않기"
      ],
      "benefits": [
        "호흡·코어 협응",
        "복부 지구력",
        "누운 자세 조절"
      ],
      "warning": "허리·목 통증이 생기면 즉시 변형하거나 중단하세요.",
      "reference": {
        "label": "NHS 통증 자가 관리",
        "url": "https://www.nhs.uk/live-well/pain/10-ways-to-ease-pain/"
      }
    },
    "detail": {
      "setup": [
        "매트와 충분한 공간 준비",
        "호흡이 편안한 범위 설정",
        "관절이 불편하면 블록·쿠션 활용"
      ],
      "finish": "중립 자세에서 몇 번 호흡하고 어지러움·통증 반응을 확인합니다.",
      "commonMistakes": [
        "유연성을 과시하려 무리함",
        "호흡을 참음",
        "통증을 스트레칭으로 오해"
      ],
      "regressions": [
        "쿠션·벽·의자 사용",
        "무릎 굽히기",
        "자세 유지 시간 줄이기"
      ],
      "progressions": [
        "호흡 주기 추가",
        "안정된 범위에서 유지 시간 증가",
        "전환 동작 부드럽게 연결"
      ]
    }
  },
  {
    "exercise": {
      "id": "brisk-walk",
      "name": "빠른 걷기",
      "englishName": "Brisk Walking",
      "category": "러닝",
      "regions": [
        "하체",
        "둔근",
        "코어"
      ],
      "focus": "심폐",
      "difficulty": "입문",
      "equipment": "편안한 신발",
      "minutes": "20–45분 · 대화 가능한 강도",
      "description": "팔을 자연스럽게 흔들며 평지 또는 완만한 길을 일정한 리듬으로 걷는 접근성 높은 유산소 활동입니다.",
      "cues": [
        "시선은 정면에 두기",
        "보폭보다 리듬 우선",
        "어깨·손의 힘 빼기"
      ],
      "benefits": [
        "심폐 활동",
        "보행 지구력",
        "일상 활동량"
      ],
      "warning": "흉통, 현기증, 비정상적 숨참이 있으면 즉시 멈추고 평가를 받으세요.",
      "reference": {
        "label": "CDC 신체 활동 지침",
        "url": "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html"
      }
    },
    "detail": {
      "setup": [
        "신발 끈·노면·날씨를 먼저 확인",
        "처음 5분은 걷기 또는 매우 편안한 속도",
        "호흡과 말하기 가능한 정도를 확인"
      ],
      "finish": "마지막 3–5분은 걷기로 낮추고 수분·통증 반응을 기록합니다.",
      "commonMistakes": [
        "초반부터 너무 빠르게 시작",
        "보폭을 과도하게 넓힘",
        "통증 신호를 무시"
      ],
      "regressions": [
        "걷기·달리기 교대",
        "평지·짧은 시간",
        "대화 가능한 강도"
      ],
      "progressions": [
        "시간을 소폭 늘리기",
        "완만한 경사",
        "회복이 충분한 날에만 빠른 구간 추가"
      ]
    }
  },
  {
    "exercise": {
      "id": "hiking",
      "name": "완만한 하이킹",
      "englishName": "Easy Hiking",
      "category": "러닝",
      "regions": [
        "하체",
        "둔근",
        "코어"
      ],
      "focus": "체력",
      "difficulty": "중급",
      "equipment": "트레킹화 · 물",
      "minutes": "30–90분 · 지형에 맞춰",
      "description": "완만한 야외 지형을 걸으며 유산소 체력과 발목·하체 조절을 함께 사용하는 활동입니다.",
      "cues": [
        "지형에 맞춰 속도 줄이기",
        "내리막에서 보폭 짧게",
        "물과 날씨 대비"
      ],
      "benefits": [
        "유산소 체력",
        "하체 지구력",
        "야외 보행 협응"
      ],
      "warning": "낯선 지형·더위·고도에서는 시간과 강도를 보수적으로 조절하세요.",
      "reference": {
        "label": "CDC 신체 활동 지침",
        "url": "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html"
      }
    },
    "detail": {
      "setup": [
        "신발 끈·노면·날씨를 먼저 확인",
        "처음 5분은 걷기 또는 매우 편안한 속도",
        "호흡과 말하기 가능한 정도를 확인"
      ],
      "finish": "마지막 3–5분은 걷기로 낮추고 수분·통증 반응을 기록합니다.",
      "commonMistakes": [
        "초반부터 너무 빠르게 시작",
        "보폭을 과도하게 넓힘",
        "통증 신호를 무시"
      ],
      "regressions": [
        "걷기·달리기 교대",
        "평지·짧은 시간",
        "대화 가능한 강도"
      ],
      "progressions": [
        "시간을 소폭 늘리기",
        "완만한 경사",
        "회복이 충분한 날에만 빠른 구간 추가"
      ]
    }
  },
  {
    "exercise": {
      "id": "assisted-pullup",
      "name": "어시스트 풀업",
      "englishName": "Assisted Pull-up",
      "category": "헬스기구",
      "regions": [
        "등",
        "팔",
        "어깨",
        "코어"
      ],
      "focus": "근력",
      "difficulty": "중급",
      "equipment": "어시스트 풀업 머신",
      "minutes": "2–4세트 · 5–10회",
      "description": "보조 중량을 활용해 수직 당기기 패턴을 점진적으로 익히는 머신 운동입니다.",
      "cues": [
        "발·무릎 패드를 안정적으로 고정",
        "어깨를 귀에서 멀어지게",
        "반동 없이 천천히 복귀"
      ],
      "benefits": [
        "등·팔 근력",
        "수직 당기기",
        "체중 운동 준비"
      ],
      "warning": "어깨 통증이나 그립 통증이 있으면 보조량을 늘리고 범위를 낮추세요.",
      "reference": {
        "label": "ACSM 신체 활동 지침",
        "url": "https://acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines/"
      }
    },
    "detail": {
      "setup": [
        "시트·패드·손잡이를 신체에 맞게 조절",
        "매우 가벼운 무게로 1회 리허설",
        "가동 범위에서 통증 여부 확인"
      ],
      "finish": "중량을 제자리에 놓고 다음 세트 전 호흡·관절 반응을 확인합니다.",
      "commonMistakes": [
        "반동으로 중량 움직이기",
        "시트 위치를 맞추지 않음",
        "무게를 과도하게 올림"
      ],
      "regressions": [
        "중량 낮추기",
        "가동 범위 줄이기",
        "안정적인 그립·좌석 재설정"
      ],
      "progressions": [
        "반복 품질 유지 후 소폭 증량",
        "세트 1개 추가",
        "천천히 내리는 구간 제어"
      ]
    }
  },
  {
    "exercise": {
      "id": "cable-triceps",
      "name": "케이블 트라이셉스 프레스다운",
      "englishName": "Cable Triceps Pressdown",
      "category": "헬스기구",
      "regions": [
        "팔"
      ],
      "focus": "근력",
      "difficulty": "입문",
      "equipment": "케이블 머신",
      "minutes": "2–3세트 · 10–15회",
      "description": "팔꿈치를 몸통 가까이에 두고 케이블을 아래로 밀며 팔 뒤쪽을 사용하는 보조 운동입니다.",
      "cues": [
        "팔꿈치를 고정에 가깝게",
        "어깨를 앞으로 말지 않기",
        "복귀 구간을 천천히"
      ],
      "benefits": [
        "삼두근 근력",
        "상체 밀기 보조",
        "팔꿈치 제어"
      ],
      "warning": "팔꿈치 통증이 나타나면 그립·부하·반복 수를 낮추세요.",
      "reference": {
        "label": "ACSM 신체 활동 지침",
        "url": "https://acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines/"
      }
    },
    "detail": {
      "setup": [
        "시트·패드·손잡이를 신체에 맞게 조절",
        "매우 가벼운 무게로 1회 리허설",
        "가동 범위에서 통증 여부 확인"
      ],
      "finish": "중량을 제자리에 놓고 다음 세트 전 호흡·관절 반응을 확인합니다.",
      "commonMistakes": [
        "반동으로 중량 움직이기",
        "시트 위치를 맞추지 않음",
        "무게를 과도하게 올림"
      ],
      "regressions": [
        "중량 낮추기",
        "가동 범위 줄이기",
        "안정적인 그립·좌석 재설정"
      ],
      "progressions": [
        "반복 품질 유지 후 소폭 증량",
        "세트 1개 추가",
        "천천히 내리는 구간 제어"
      ]
    }
  },
  {
    "exercise": {
      "id": "cable-biceps",
      "name": "케이블 바이셉스 컬",
      "englishName": "Cable Biceps Curl",
      "category": "헬스기구",
      "regions": [
        "팔"
      ],
      "focus": "근력",
      "difficulty": "입문",
      "equipment": "케이블 머신",
      "minutes": "2–3세트 · 10–15회",
      "description": "팔꿈치를 굽히며 팔 앞쪽을 사용하는 케이블 보조 운동입니다.",
      "cues": [
        "팔꿈치를 옆구리 가까이",
        "몸통 반동 사용하지 않기",
        "손목을 과도하게 꺾지 않기"
      ],
      "benefits": [
        "팔 근력",
        "당기기 보조",
        "팔꿈치 굽힘 제어"
      ],
      "warning": "팔꿈치·손목 통증이 생기면 중량을 낮추고 그립을 조정하세요.",
      "reference": {
        "label": "ACSM 신체 활동 지침",
        "url": "https://acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines/"
      }
    },
    "detail": {
      "setup": [
        "시트·패드·손잡이를 신체에 맞게 조절",
        "매우 가벼운 무게로 1회 리허설",
        "가동 범위에서 통증 여부 확인"
      ],
      "finish": "중량을 제자리에 놓고 다음 세트 전 호흡·관절 반응을 확인합니다.",
      "commonMistakes": [
        "반동으로 중량 움직이기",
        "시트 위치를 맞추지 않음",
        "무게를 과도하게 올림"
      ],
      "regressions": [
        "중량 낮추기",
        "가동 범위 줄이기",
        "안정적인 그립·좌석 재설정"
      ],
      "progressions": [
        "반복 품질 유지 후 소폭 증량",
        "세트 1개 추가",
        "천천히 내리는 구간 제어"
      ]
    }
  },
  {
    "exercise": {
      "id": "smith-squat",
      "name": "스미스 머신 스쿼트",
      "englishName": "Smith Machine Squat",
      "category": "헬스기구",
      "regions": [
        "하체",
        "둔근",
        "코어"
      ],
      "focus": "근력",
      "difficulty": "중급",
      "equipment": "스미스 머신",
      "minutes": "3세트 · 6–12회",
      "description": "가이드 바 경로 안에서 하체 스쿼트 패턴을 연습하는 머신 기반 저항 운동입니다.",
      "cues": [
        "발 위치를 편안한 거리로 조절",
        "골반이 들리기 전 범위에서",
        "무게보다 안정된 제어 우선"
      ],
      "benefits": [
        "하체 근력",
        "스쿼트 패턴",
        "점진적 저항"
      ],
      "warning": "무릎·허리 통증이 있으면 깊이·발 위치·부하를 재조정하세요.",
      "reference": {
        "label": "ACSM 신체 활동 지침",
        "url": "https://acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines/"
      }
    },
    "detail": {
      "setup": [
        "시트·패드·손잡이를 신체에 맞게 조절",
        "매우 가벼운 무게로 1회 리허설",
        "가동 범위에서 통증 여부 확인"
      ],
      "finish": "중량을 제자리에 놓고 다음 세트 전 호흡·관절 반응을 확인합니다.",
      "commonMistakes": [
        "반동으로 중량 움직이기",
        "시트 위치를 맞추지 않음",
        "무게를 과도하게 올림"
      ],
      "regressions": [
        "중량 낮추기",
        "가동 범위 줄이기",
        "안정적인 그립·좌석 재설정"
      ],
      "progressions": [
        "반복 품질 유지 후 소폭 증량",
        "세트 1개 추가",
        "천천히 내리는 구간 제어"
      ]
    }
  },
  {
    "exercise": {
      "id": "one-arm-row",
      "name": "원암 덤벨 로우",
      "englishName": "One-arm Dumbbell Row",
      "category": "프리웨이트",
      "regions": [
        "등",
        "팔",
        "코어"
      ],
      "focus": "근력",
      "difficulty": "중급",
      "equipment": "덤벨 · 벤치",
      "minutes": "좌우 3세트 · 8–12회",
      "description": "한 손으로 지지한 채 덤벨을 몸통 쪽으로 당겨 등과 팔의 당기기 패턴을 연습합니다.",
      "cues": [
        "지지하는 손·무릎을 안정적으로",
        "팔꿈치를 골반 쪽으로 당기기",
        "몸통 회전 최소화"
      ],
      "benefits": [
        "등·팔 근력",
        "좌우 조절",
        "몸통 안정성"
      ],
      "warning": "허리 통증이 있으면 몸통을 더 지지하거나 가벼운 중량을 선택하세요.",
      "reference": {
        "label": "ACSM 신체 활동 지침",
        "url": "https://acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines/"
      }
    },
    "detail": {
      "setup": [
        "주변 공간·바닥·장비 고정 상태 확인",
        "가벼운 중량으로 동작 경로 연습",
        "몸통 긴장과 편안한 호흡 준비"
      ],
      "finish": "중량을 안전하게 내려놓고 통증·피로·기술 변화를 기록합니다.",
      "commonMistakes": [
        "반동과 과도한 속도",
        "몸통 정렬을 잃음",
        "피로 시에도 같은 중량 고집"
      ],
      "regressions": [
        "맨몸 또는 가벼운 덤벨",
        "지지면 활용",
        "가동 범위·반복 수 낮추기"
      ],
      "progressions": [
        "반복 상한 달성 후 소폭 증량",
        "세트 추가",
        "안정적인 단측 변형"
      ]
    }
  },
  {
    "exercise": {
      "id": "bulgarian-split",
      "name": "불가리안 스플릿 스쿼트",
      "englishName": "Bulgarian Split Squat",
      "category": "프리웨이트",
      "regions": [
        "하체",
        "둔근",
        "코어"
      ],
      "focus": "근력",
      "difficulty": "상급",
      "equipment": "벤치 · 덤벨 선택",
      "minutes": "좌우 2–3세트 · 6–10회",
      "description": "뒤쪽 발을 낮은 벤치에 올리고 한쪽 다리로 하체 제어를 연습하는 운동입니다.",
      "cues": [
        "처음에는 맨몸·낮은 지지면",
        "앞발 전체로 바닥 누르기",
        "균형이 흔들리면 지지대 활용"
      ],
      "benefits": [
        "한쪽 다리 근력",
        "둔근·대퇴 부하",
        "균형"
      ],
      "warning": "무릎 통증·균형 불안이 있다면 스플릿 스쿼트부터 충분히 연습하세요.",
      "reference": {
        "label": "ACSM 신체 활동 지침",
        "url": "https://acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines/"
      }
    },
    "detail": {
      "setup": [
        "주변 공간·바닥·장비 고정 상태 확인",
        "가벼운 중량으로 동작 경로 연습",
        "몸통 긴장과 편안한 호흡 준비"
      ],
      "finish": "중량을 안전하게 내려놓고 통증·피로·기술 변화를 기록합니다.",
      "commonMistakes": [
        "반동과 과도한 속도",
        "몸통 정렬을 잃음",
        "피로 시에도 같은 중량 고집"
      ],
      "regressions": [
        "맨몸 또는 가벼운 덤벨",
        "지지면 활용",
        "가동 범위·반복 수 낮추기"
      ],
      "progressions": [
        "반복 상한 달성 후 소폭 증량",
        "세트 추가",
        "안정적인 단측 변형"
      ]
    }
  },
  {
    "exercise": {
      "id": "kettlebell-deadlift",
      "name": "케틀벨 데드리프트",
      "englishName": "Kettlebell Deadlift",
      "category": "프리웨이트",
      "regions": [
        "둔근",
        "하체",
        "등",
        "코어"
      ],
      "focus": "근력",
      "difficulty": "입문",
      "equipment": "케틀벨",
      "minutes": "3세트 · 6–12회",
      "description": "바닥의 케틀벨을 몸 가까이에서 들어 올리며 힙 힌지 기초를 배우는 운동입니다.",
      "cues": [
        "엉덩이를 뒤로 보내기",
        "케틀벨을 몸 가까이",
        "등을 길게 유지"
      ],
      "benefits": [
        "후면 사슬 근력",
        "힙 힌지",
        "물건 들기 준비"
      ],
      "warning": "허리 통증·방사통이 있으면 수행하지 말고 전문가 평가를 받으세요.",
      "reference": {
        "label": "ACSM 신체 활동 지침",
        "url": "https://acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines/"
      }
    },
    "detail": {
      "setup": [
        "케틀벨 손잡이가 양발 중앙에 오게 놓기",
        "발 전체를 바닥에 두고 엉덩이를 뒤로 보내기",
        "가벼운 빈손 힌지로 허리·햄스트링 반응 확인"
      ],
      "finish": "케틀벨을 조용히 바닥에 내려놓고 허리·둔근의 반응을 확인합니다.",
      "commonMistakes": [
        "케틀벨을 몸에서 멀리 둠",
        "허리를 둥글게 말아 당김",
        "팔로 무게를 들어 올림"
      ],
      "regressions": [
        "벽 힙 힌지",
        "더 높은 지지면의 케틀벨",
        "아주 가벼운 무게와 짧은 범위"
      ],
      "progressions": [
        "반복 품질 뒤 소폭 증량",
        "느린 하강 구간",
        "충분히 숙련된 뒤 스윙 프렙"
      ]
    }
  },
  {
    "exercise": {
      "id": "calf-raise",
      "name": "카프 레이즈",
      "englishName": "Standing Calf Raise",
      "category": "맨몸운동",
      "regions": [
        "하체"
      ],
      "focus": "근력",
      "difficulty": "입문",
      "equipment": "벽 또는 의자 선택",
      "minutes": "2–4세트 · 10–20회",
      "description": "발 앞쪽으로 천천히 올라갔다 내려오며 종아리와 발목 조절을 연습하는 기초 운동입니다.",
      "cues": [
        "벽 가까이에서 시작",
        "위·아래 움직임을 천천히",
        "발목이 바깥으로 무너지지 않게"
      ],
      "benefits": [
        "종아리 근력",
        "발목 조절",
        "보행·계단 준비"
      ],
      "warning": "아킬레스건 통증이 생기면 범위와 반복 수를 낮추거나 중단하세요.",
      "reference": {
        "label": "CDC 신체 활동 지침",
        "url": "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html"
      }
    },
    "detail": {
      "setup": [
        "미끄럽지 않은 바닥과 충분한 공간 확보",
        "쉬운 변형으로 움직임 범위 확인",
        "관절에 불편이 없는 시작 자세 설정"
      ],
      "finish": "호흡을 정리하고 필요한 경우 짧은 걷기·가동성으로 전환합니다.",
      "commonMistakes": [
        "몸통이 무너진 상태에서 반복",
        "통증을 참고 진행",
        "난이도를 너무 빨리 높임"
      ],
      "regressions": [
        "벽·벤치·무릎 지지",
        "짧은 범위",
        "반복·시간 줄이기"
      ],
      "progressions": [
        "지지면 낮추기",
        "시간 또는 반복 소폭 증가",
        "편측 변형"
      ]
    }
  },
  {
    "exercise": {
      "id": "side-plank",
      "name": "사이드 플랭크 변형",
      "englishName": "Side Plank Modification",
      "category": "맨몸운동",
      "regions": [
        "코어",
        "어깨",
        "둔근"
      ],
      "focus": "근력",
      "difficulty": "중급",
      "equipment": "매트",
      "minutes": "좌우 15–30초 · 2–3회",
      "description": "옆으로 누운 상태에서 팔꿈치 또는 손과 무릎·발로 몸을 지지하며 옆몸통 조절을 연습합니다.",
      "cues": [
        "무릎 지지 변형부터 시작",
        "어깨를 귀에서 멀리",
        "골반을 과도하게 떨어뜨리지 않기"
      ],
      "benefits": [
        "옆몸통 지구력",
        "어깨 안정성",
        "골반 제어"
      ],
      "warning": "어깨·허리 통증이 생기면 지지점을 높이거나 중단하세요.",
      "reference": {
        "label": "CDC 신체 활동 지침",
        "url": "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html"
      }
    },
    "detail": {
      "setup": [
        "미끄럽지 않은 바닥과 충분한 공간 확보",
        "쉬운 변형으로 움직임 범위 확인",
        "관절에 불편이 없는 시작 자세 설정"
      ],
      "finish": "호흡을 정리하고 필요한 경우 짧은 걷기·가동성으로 전환합니다.",
      "commonMistakes": [
        "몸통이 무너진 상태에서 반복",
        "통증을 참고 진행",
        "난이도를 너무 빨리 높임"
      ],
      "regressions": [
        "벽·벤치·무릎 지지",
        "짧은 범위",
        "반복·시간 줄이기"
      ],
      "progressions": [
        "지지면 낮추기",
        "시간 또는 반복 소폭 증가",
        "편측 변형"
      ]
    }
  },
  {
    "exercise": {
      "id": "inverted-row",
      "name": "인버티드 로우 변형",
      "englishName": "Inverted Row Modification",
      "category": "맨몸운동",
      "regions": [
        "등",
        "팔",
        "코어"
      ],
      "focus": "근력",
      "difficulty": "중급",
      "equipment": "낮은 바 또는 안정된 TRX",
      "minutes": "2–4세트 · 5–12회",
      "description": "안정된 바 또는 스트랩을 잡고 몸통을 일직선으로 유지하며 가슴 쪽으로 당기는 운동입니다.",
      "cues": [
        "장비 고정 상태 먼저 확인",
        "몸통을 길게 유지",
        "팔꿈치를 몸통 가까이 당기기"
      ],
      "benefits": [
        "등·팔 근력",
        "체중 당기기",
        "코어 긴장"
      ],
      "warning": "장비가 불안정하면 수행하지 말고, 어깨 통증이 있으면 각도를 높이세요.",
      "reference": {
        "label": "ACSM 신체 활동 지침",
        "url": "https://acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines/"
      }
    },
    "detail": {
      "setup": [
        "미끄럽지 않은 바닥과 충분한 공간 확보",
        "쉬운 변형으로 움직임 범위 확인",
        "관절에 불편이 없는 시작 자세 설정"
      ],
      "finish": "호흡을 정리하고 필요한 경우 짧은 걷기·가동성으로 전환합니다.",
      "commonMistakes": [
        "몸통이 무너진 상태에서 반복",
        "통증을 참고 진행",
        "난이도를 너무 빨리 높임"
      ],
      "regressions": [
        "벽·벤치·무릎 지지",
        "짧은 범위",
        "반복·시간 줄이기"
      ],
      "progressions": [
        "지지면 낮추기",
        "시간 또는 반복 소폭 증가",
        "편측 변형"
      ]
    }
  },
  {
    "exercise": {
      "id": "wall-slide",
      "name": "월 슬라이드",
      "englishName": "Wall Slide",
      "category": "모빌리티",
      "regions": [
        "어깨",
        "등",
        "코어"
      ],
      "focus": "가동성",
      "difficulty": "입문",
      "equipment": "벽",
      "minutes": "1–3세트 · 6–12회",
      "description": "벽에 등을 가볍게 지지하고 팔을 위로 미끄러뜨리며 어깨·견갑 움직임을 탐색합니다.",
      "cues": [
        "갈비뼈가 들리지 않게",
        "통증 없는 높이까지",
        "어깨를 으쓱하지 않기"
      ],
      "benefits": [
        "어깨 가동성",
        "견갑 조절",
        "상체 준비"
      ],
      "warning": "어깨 통증·저림이 증가하면 범위를 줄이고 평가를 받으세요.",
      "reference": {
        "label": "NHS 통증 자가 관리",
        "url": "https://www.nhs.uk/live-well/pain/10-ways-to-ease-pain/"
      }
    },
    "detail": {
      "setup": [
        "통증 없는 작은 범위로 시작",
        "호흡을 길게 내쉬며 긴장 확인",
        "몸을 억지로 고정하지 않기"
      ],
      "finish": "움직임 뒤 불편감이 남지 않는지 확인하고 일상 동작으로 천천히 전환합니다.",
      "commonMistakes": [
        "가동 범위를 억지로 밀어붙임",
        "숨을 참음",
        "저림·방사통을 무시"
      ],
      "regressions": [
        "범위 줄이기",
        "지지대 사용",
        "누운 자세로 변경"
      ],
      "progressions": [
        "호흡에 맞춘 반복 추가",
        "조금 더 넓은 범위",
        "가벼운 근력 동작과 연결"
      ]
    }
  },
  {
    "exercise": {
      "id": "hamstring-sweep",
      "name": "햄스트링 스윕",
      "englishName": "Hamstring Sweep",
      "category": "모빌리티",
      "regions": [
        "하체",
        "둔근"
      ],
      "focus": "가동성",
      "difficulty": "입문",
      "equipment": "없음",
      "minutes": "좌우 6–10회",
      "description": "한쪽 발뒤꿈치를 앞에 두고 엉덩이를 뒤로 보내며 다리 뒤쪽의 편안한 움직임을 탐색합니다.",
      "cues": [
        "등을 과도하게 둥글게 말지 않기",
        "발끝을 당기되 힘 주지 않기",
        "작은 범위에서 리듬 있게"
      ],
      "benefits": [
        "햄스트링 가동성",
        "힙 힌지 준비",
        "걷기 전 준비"
      ],
      "warning": "다리 저림·방사통이 있으면 강한 스트레칭을 피하고 상담하세요.",
      "reference": {
        "label": "NHS 통증 자가 관리",
        "url": "https://www.nhs.uk/live-well/pain/10-ways-to-ease-pain/"
      }
    },
    "detail": {
      "setup": [
        "통증 없는 작은 범위로 시작",
        "호흡을 길게 내쉬며 긴장 확인",
        "몸을 억지로 고정하지 않기"
      ],
      "finish": "움직임 뒤 불편감이 남지 않는지 확인하고 일상 동작으로 천천히 전환합니다.",
      "commonMistakes": [
        "가동 범위를 억지로 밀어붙임",
        "숨을 참음",
        "저림·방사통을 무시"
      ],
      "regressions": [
        "범위 줄이기",
        "지지대 사용",
        "누운 자세로 변경"
      ],
      "progressions": [
        "호흡에 맞춘 반복 추가",
        "조금 더 넓은 범위",
        "가벼운 근력 동작과 연결"
      ]
    }
  },
  {
    "exercise": {
      "id": "lateral-weight-shift",
      "name": "좌우 체중 이동",
      "englishName": "Lateral Weight Shift",
      "category": "균형·협응",
      "regions": [
        "하체",
        "둔근",
        "코어"
      ],
      "focus": "균형",
      "difficulty": "입문",
      "equipment": "벽 또는 의자 근처",
      "minutes": "좌우 8–12회",
      "description": "안정된 지지대 가까이에서 체중을 한쪽 발로 부드럽게 옮기며 균형 조절을 연습합니다.",
      "cues": [
        "발을 바닥에 넓게 유지",
        "천천히 체중 옮기기",
        "필요하면 한 손으로 지지"
      ],
      "benefits": [
        "좌우 균형",
        "고관절 조절",
        "보행 준비"
      ],
      "warning": "넘어질 위험이 있으면 반드시 지지대를 사용하고 혼자 어려운 변형을 시도하지 마세요.",
      "reference": {
        "label": "CDC 고령자 활동·균형 지침",
        "url": "https://www.cdc.gov/physical-activity-basics/guidelines/older-adults.html"
      }
    },
    "detail": {
      "setup": [
        "벽·의자 등 지지대 가까이 배치",
        "미끄럽지 않은 평평한 바닥 선택",
        "천천히 시작해 주변 안전 확인"
      ],
      "finish": "지지대를 잡고 안정된 뒤 종료하며 어지러움·불안을 기록합니다.",
      "commonMistakes": [
        "지지대 없이 어려운 변형 시도",
        "속도를 너무 높임",
        "피로한 상태에서 균형 도전"
      ],
      "regressions": [
        "양손 지지",
        "양발 간격 넓히기",
        "짧은 시간"
      ],
      "progressions": [
        "한 손 지지",
        "시간 소폭 증가",
        "천천히 걷는 변형"
      ]
    }
  },
  {
    "exercise": {
      "id": "toe-heel-walk",
      "name": "발끝·뒤꿈치 걷기",
      "englishName": "Toe-Heel Walk",
      "category": "균형·협응",
      "regions": [
        "하체",
        "코어"
      ],
      "focus": "협응",
      "difficulty": "중급",
      "equipment": "벽 옆의 평평한 바닥",
      "minutes": "5–10걸음 · 2회",
      "description": "짧은 거리에서 발끝과 뒤꿈치로 번갈아 걷는 발목·보행 협응 연습입니다.",
      "cues": [
        "벽 가까이에서 시작",
        "발목을 급하게 꺾지 않기",
        "균형이 흔들리면 즉시 멈추기"
      ],
      "benefits": [
        "발목 협응",
        "동적 균형",
        "보행 감각"
      ],
      "warning": "어지러움·발목 통증·보행 불안이 있으면 실시하지 말고 더 쉬운 균형 연습을 선택하세요.",
      "reference": {
        "label": "CDC 고령자 활동·균형 지침",
        "url": "https://www.cdc.gov/physical-activity-basics/guidelines/older-adults.html"
      }
    },
    "detail": {
      "setup": [
        "벽·의자 등 지지대 가까이 배치",
        "미끄럽지 않은 평평한 바닥 선택",
        "천천히 시작해 주변 안전 확인"
      ],
      "finish": "지지대를 잡고 안정된 뒤 종료하며 어지러움·불안을 기록합니다.",
      "commonMistakes": [
        "지지대 없이 어려운 변형 시도",
        "속도를 너무 높임",
        "피로한 상태에서 균형 도전"
      ],
      "regressions": [
        "양손 지지",
        "양발 간격 넓히기",
        "짧은 시간"
      ],
      "progressions": [
        "한 손 지지",
        "시간 소폭 증가",
        "천천히 걷는 변형"
      ]
    }
  },
  {
    "exercise": {
      "id": "child-pose",
      "name": "차일드 포즈",
      "englishName": "Child's Pose",
      "category": "요가·필라테스",
      "regions": [
        "등",
        "어깨",
        "둔근"
      ],
      "focus": "가동성",
      "difficulty": "입문",
      "equipment": "매트",
      "minutes": "20–60초 · 2회",
      "description": "무릎을 접고 엉덩이를 뒤로 보내며 등과 어깨 주변을 편안하게 쉬게 하는 요가 자세입니다.",
      "cues": [
        "무릎 사이 간격을 편안하게",
        "엉덩이가 발뒤꿈치에 닿지 않아도 괜찮기",
        "호흡을 길게 내쉬기"
      ],
      "benefits": [
        "등·어깨 이완",
        "호흡",
        "회복 루틴"
      ],
      "warning": "무릎·고관절 통증이 있으면 지지대를 사용하거나 다른 자세를 선택하세요.",
      "reference": {
        "label": "NHS 통증 자가 관리",
        "url": "https://www.nhs.uk/live-well/pain/10-ways-to-ease-pain/"
      }
    },
    "detail": {
      "setup": [
        "매트와 충분한 공간 준비",
        "호흡이 편안한 범위 설정",
        "관절이 불편하면 블록·쿠션 활용"
      ],
      "finish": "중립 자세에서 몇 번 호흡하고 어지러움·통증 반응을 확인합니다.",
      "commonMistakes": [
        "유연성을 과시하려 무리함",
        "호흡을 참음",
        "통증을 스트레칭으로 오해"
      ],
      "regressions": [
        "쿠션·벽·의자 사용",
        "무릎 굽히기",
        "자세 유지 시간 줄이기"
      ],
      "progressions": [
        "호흡 주기 추가",
        "안정된 범위에서 유지 시간 증가",
        "전환 동작 부드럽게 연결"
      ]
    }
  },
  {
    "exercise": {
      "id": "pilates-bridge",
      "name": "필라테스 브리지",
      "englishName": "Pilates Bridge",
      "category": "요가·필라테스",
      "regions": [
        "둔근",
        "하체",
        "코어"
      ],
      "focus": "협응",
      "difficulty": "입문",
      "equipment": "매트",
      "minutes": "2–3세트 · 6–12회",
      "description": "누운 자세에서 척추를 편안하게 움직이며 엉덩이를 들어 올려 호흡·골반 조절을 연습합니다.",
      "cues": [
        "척추를 하나씩 과하게 굴리지 않기",
        "엉덩이로 부드럽게 들어 올리기",
        "목에 힘 빼기"
      ],
      "benefits": [
        "둔근·코어 협응",
        "골반 조절",
        "호흡"
      ],
      "warning": "허리 통증이 생기면 높이를 줄이거나 글루트 브리지 변형을 선택하세요.",
      "reference": {
        "label": "NHS 통증 자가 관리",
        "url": "https://www.nhs.uk/live-well/pain/10-ways-to-ease-pain/"
      }
    },
    "detail": {
      "setup": [
        "매트와 충분한 공간 준비",
        "호흡이 편안한 범위 설정",
        "관절이 불편하면 블록·쿠션 활용"
      ],
      "finish": "중립 자세에서 몇 번 호흡하고 어지러움·통증 반응을 확인합니다.",
      "commonMistakes": [
        "유연성을 과시하려 무리함",
        "호흡을 참음",
        "통증을 스트레칭으로 오해"
      ],
      "regressions": [
        "쿠션·벽·의자 사용",
        "무릎 굽히기",
        "자세 유지 시간 줄이기"
      ],
      "progressions": [
        "호흡 주기 추가",
        "안정된 범위에서 유지 시간 증가",
        "전환 동작 부드럽게 연결"
      ]
    }
  },
  {
    "exercise": {
      "id": "incline-treadmill-walk",
      "name": "경사 트레드밀 걷기",
      "englishName": "Incline Treadmill Walk",
      "category": "유산소",
      "regions": [
        "하체",
        "둔근",
        "코어"
      ],
      "focus": "심폐",
      "difficulty": "입문",
      "equipment": "트레드밀",
      "minutes": "15–35분 · RPE 4–6",
      "description": "속도보다 경사를 낮게부터 조절하며 걷기 리듬과 하체 지구력을 쌓는 저충격 유산소 활동입니다.",
      "cues": [
        "손잡이에 체중을 과하게 싣지 않기",
        "보폭을 짧고 편안하게 유지",
        "경사는 한 단계씩만 조절"
      ],
      "benefits": [
        "심폐 활동",
        "둔근·하체 지구력",
        "실내 걷기 변형"
      ],
      "warning": "종아리·무릎·허리 통증이 커지거나 어지러우면 경사와 속도를 낮추거나 중단하세요.",
      "reference": {
        "label": "CDC 성인 신체 활동 지침",
        "url": "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html"
      }
    },
    "detail": {
      "setup": [
        "기구 높이·저항을 편안한 위치로 설정",
        "3–5분 낮은 강도로 워밍업",
        "수분과 환기 상태를 확인"
      ],
      "finish": "마지막 몇 분은 저항을 낮추고 호흡이 안정된 뒤 종료합니다.",
      "commonMistakes": [
        "저항을 너무 빨리 올림",
        "손잡이에 체중을 과하게 싣기",
        "어지러움을 참음"
      ],
      "regressions": [
        "시간·저항 낮추기",
        "짧은 간격과 휴식",
        "저충격 기구 선택"
      ],
      "progressions": [
        "시간 우선 증가",
        "짧은 강도 변화",
        "주간 빈도 점진 증가"
      ]
    }
  },
  {
    "exercise": {
      "id": "sled-push",
      "name": "라이트 슬레드 푸시",
      "englishName": "Light Sled Push",
      "category": "헬스기구",
      "regions": [
        "하체",
        "둔근",
        "코어",
        "어깨"
      ],
      "focus": "체력",
      "difficulty": "중급",
      "equipment": "슬레드 · 평평한 바닥",
      "minutes": "10–20m · 4–8회",
      "description": "가벼운 썰매를 밀며 전신에 힘을 전달하는 짧은 거리의 컨디셔닝 운동입니다. 처음에는 기술과 보행 리듬을 우선합니다.",
      "cues": [
        "손잡이를 안정적으로 잡기",
        "몸통을 길게 유지",
        "짧고 일정한 걸음으로 밀기"
      ],
      "benefits": [
        "전신 체력",
        "하체 추진",
        "짧은 거리 컨디셔닝"
      ],
      "warning": "미끄러운 바닥, 무릎·허리 통증, 현기증이 있으면 실시하지 말고 부하와 거리를 낮추세요.",
      "reference": {
        "label": "ACSM 신체 활동 지침",
        "url": "https://acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines/"
      }
    },
    "detail": {
      "setup": [
        "시트·패드·손잡이를 신체에 맞게 조절",
        "매우 가벼운 무게로 1회 리허설",
        "가동 범위에서 통증 여부 확인"
      ],
      "finish": "중량을 제자리에 놓고 다음 세트 전 호흡·관절 반응을 확인합니다.",
      "commonMistakes": [
        "반동으로 중량 움직이기",
        "시트 위치를 맞추지 않음",
        "무게를 과도하게 올림"
      ],
      "regressions": [
        "중량 낮추기",
        "가동 범위 줄이기",
        "안정적인 그립·좌석 재설정"
      ],
      "progressions": [
        "반복 품질 유지 후 소폭 증량",
        "세트 1개 추가",
        "천천히 내리는 구간 제어"
      ]
    }
  },
  {
    "exercise": {
      "id": "machine-hamstring-curl",
      "name": "머신 햄스트링 컬",
      "englishName": "Machine Hamstring Curl",
      "category": "헬스기구",
      "regions": [
        "하체",
        "둔근"
      ],
      "focus": "근력",
      "difficulty": "입문",
      "equipment": "레그 컬 머신",
      "minutes": "2–3세트 · 8–15회",
      "description": "패드 위치를 맞춘 뒤 무릎을 굽혀 다리 뒤쪽을 쓰는 보조 저항 운동입니다.",
      "cues": [
        "관절 축과 머신 축을 맞추기",
        "골반이 들리지 않게 지지",
        "반동 없이 천천히 복귀"
      ],
      "benefits": [
        "햄스트링 근력",
        "무릎 굽힘 조절",
        "하체 보조 운동"
      ],
      "warning": "무릎 뒤쪽 통증이나 경련이 생기면 가동 범위와 중량을 줄이세요.",
      "reference": {
        "label": "ACSM 신체 활동 지침",
        "url": "https://acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines/"
      }
    },
    "detail": {
      "setup": [
        "시트·패드·손잡이를 신체에 맞게 조절",
        "매우 가벼운 무게로 1회 리허설",
        "가동 범위에서 통증 여부 확인"
      ],
      "finish": "중량을 제자리에 놓고 다음 세트 전 호흡·관절 반응을 확인합니다.",
      "commonMistakes": [
        "반동으로 중량 움직이기",
        "시트 위치를 맞추지 않음",
        "무게를 과도하게 올림"
      ],
      "regressions": [
        "중량 낮추기",
        "가동 범위 줄이기",
        "안정적인 그립·좌석 재설정"
      ],
      "progressions": [
        "반복 품질 유지 후 소폭 증량",
        "세트 1개 추가",
        "천천히 내리는 구간 제어"
      ]
    }
  },
  {
    "exercise": {
      "id": "cable-face-pull",
      "name": "케이블 페이스 풀",
      "englishName": "Cable Face Pull",
      "category": "헬스기구",
      "regions": [
        "등",
        "어깨",
        "팔"
      ],
      "focus": "근력",
      "difficulty": "입문",
      "equipment": "로프 케이블",
      "minutes": "2–3세트 · 10–15회",
      "description": "가벼운 로프 케이블을 얼굴 높이 쪽으로 당기며 상부 등과 어깨 뒤쪽의 제어를 연습하는 보조 운동입니다.",
      "cues": [
        "가벼운 중량에서 시작",
        "팔꿈치를 편안한 대각선으로",
        "목에 힘을 주지 않기"
      ],
      "benefits": [
        "견갑 조절",
        "상부 등·어깨 뒤쪽",
        "당기기 보조"
      ],
      "warning": "어깨 앞쪽 충돌감이나 목 통증이 생기면 높이·그립·중량을 조절하거나 중단하세요.",
      "reference": {
        "label": "ACSM 신체 활동 지침",
        "url": "https://acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines/"
      }
    },
    "detail": {
      "setup": [
        "시트·패드·손잡이를 신체에 맞게 조절",
        "매우 가벼운 무게로 1회 리허설",
        "가동 범위에서 통증 여부 확인"
      ],
      "finish": "중량을 제자리에 놓고 다음 세트 전 호흡·관절 반응을 확인합니다.",
      "commonMistakes": [
        "반동으로 중량 움직이기",
        "시트 위치를 맞추지 않음",
        "무게를 과도하게 올림"
      ],
      "regressions": [
        "중량 낮추기",
        "가동 범위 줄이기",
        "안정적인 그립·좌석 재설정"
      ],
      "progressions": [
        "반복 품질 유지 후 소폭 증량",
        "세트 1개 추가",
        "천천히 내리는 구간 제어"
      ]
    }
  },
  {
    "exercise": {
      "id": "pallof-press",
      "name": "팔로프 프레스",
      "englishName": "Pallof Press",
      "category": "헬스기구",
      "regions": [
        "코어",
        "어깨",
        "둔근"
      ],
      "focus": "협응",
      "difficulty": "입문",
      "equipment": "케이블 또는 밴드",
      "minutes": "좌우 2–3세트 · 6–12회",
      "description": "옆에서 당기는 저항에 맞서 팔을 앞으로 뻗으며 몸통이 회전하지 않도록 조절하는 코어 협응 운동입니다.",
      "cues": [
        "가벼운 저항부터",
        "갈비뼈·골반을 편안하게 정렬",
        "팔을 뻗고 천천히 돌아오기"
      ],
      "benefits": [
        "몸통 회전 제어",
        "코어 협응",
        "서기 자세 안정"
      ],
      "warning": "허리 통증이 증가하면 저항을 줄이거나 지지면을 더 안정적으로 바꾸세요.",
      "reference": {
        "label": "ACSM 신체 활동 지침",
        "url": "https://acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines/"
      }
    },
    "detail": {
      "setup": [
        "시트·패드·손잡이를 신체에 맞게 조절",
        "매우 가벼운 무게로 1회 리허설",
        "가동 범위에서 통증 여부 확인"
      ],
      "finish": "중량을 제자리에 놓고 다음 세트 전 호흡·관절 반응을 확인합니다.",
      "commonMistakes": [
        "반동으로 중량 움직이기",
        "시트 위치를 맞추지 않음",
        "무게를 과도하게 올림"
      ],
      "regressions": [
        "중량 낮추기",
        "가동 범위 줄이기",
        "안정적인 그립·좌석 재설정"
      ],
      "progressions": [
        "반복 품질 유지 후 소폭 증량",
        "세트 1개 추가",
        "천천히 내리는 구간 제어"
      ]
    }
  },
  {
    "exercise": {
      "id": "dumbbell-floor-press",
      "name": "덤벨 플로어 프레스",
      "englishName": "Dumbbell Floor Press",
      "category": "프리웨이트",
      "regions": [
        "가슴",
        "어깨",
        "팔"
      ],
      "focus": "근력",
      "difficulty": "입문",
      "equipment": "덤벨 · 매트",
      "minutes": "2–4세트 · 6–12회",
      "description": "바닥에 누워 덤벨을 밀며 팔꿈치가 바닥에 닿는 범위에서 상체 밀기 패턴을 연습합니다.",
      "cues": [
        "덤벨을 안정적으로 잡기",
        "팔꿈치가 바닥에 닿으면 잠시 멈추기",
        "어깨를 으쓱하지 않기"
      ],
      "benefits": [
        "가슴·팔 근력",
        "상체 밀기",
        "바닥 지지 안정성"
      ],
      "warning": "덤벨을 안전하게 놓을 공간이 없거나 어깨 통증이 있으면 실시하지 마세요.",
      "reference": {
        "label": "ACSM 신체 활동 지침",
        "url": "https://acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines/"
      }
    },
    "detail": {
      "setup": [
        "주변 공간·바닥·장비 고정 상태 확인",
        "가벼운 중량으로 동작 경로 연습",
        "몸통 긴장과 편안한 호흡 준비"
      ],
      "finish": "중량을 안전하게 내려놓고 통증·피로·기술 변화를 기록합니다.",
      "commonMistakes": [
        "반동과 과도한 속도",
        "몸통 정렬을 잃음",
        "피로 시에도 같은 중량 고집"
      ],
      "regressions": [
        "맨몸 또는 가벼운 덤벨",
        "지지면 활용",
        "가동 범위·반복 수 낮추기"
      ],
      "progressions": [
        "반복 상한 달성 후 소폭 증량",
        "세트 추가",
        "안정적인 단측 변형"
      ]
    }
  },
  {
    "exercise": {
      "id": "supported-reverse-lunge",
      "name": "지지 리버스 런지",
      "englishName": "Supported Reverse Lunge",
      "category": "맨몸운동",
      "regions": [
        "하체",
        "둔근",
        "코어"
      ],
      "focus": "근력",
      "difficulty": "입문",
      "equipment": "벽 또는 의자 지지",
      "minutes": "좌우 2–3세트 · 6–10회",
      "description": "벽이나 의자를 가볍게 잡고 한 발을 뒤로 보내며, 지지 도움으로 한쪽 다리 움직임을 천천히 연습하는 변형입니다.",
      "cues": [
        "처음에는 지지대 가까이",
        "앞발 전체로 바닥 누르기",
        "보폭을 짧게 시작"
      ],
      "benefits": [
        "한쪽 다리 기초 근력",
        "둔근·하체 조절",
        "보행 패턴"
      ],
      "warning": "무릎 통증·균형 불안이 있으면 범위를 낮추거나 의자 앉았다 일어나기로 바꾸세요.",
      "reference": {
        "label": "CDC 성인 신체 활동 지침",
        "url": "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html"
      }
    },
    "detail": {
      "setup": [
        "미끄럽지 않은 바닥과 충분한 공간 확보",
        "쉬운 변형으로 움직임 범위 확인",
        "관절에 불편이 없는 시작 자세 설정"
      ],
      "finish": "호흡을 정리하고 필요한 경우 짧은 걷기·가동성으로 전환합니다.",
      "commonMistakes": [
        "몸통이 무너진 상태에서 반복",
        "통증을 참고 진행",
        "난이도를 너무 빨리 높임"
      ],
      "regressions": [
        "벽·벤치·무릎 지지",
        "짧은 범위",
        "반복·시간 줄이기"
      ],
      "progressions": [
        "지지면 낮추기",
        "시간 또는 반복 소폭 증가",
        "편측 변형"
      ]
    }
  },
  {
    "exercise": {
      "id": "suitcase-carry",
      "name": "수트케이스 캐리",
      "englishName": "Suitcase Carry",
      "category": "프리웨이트",
      "regions": [
        "코어",
        "팔",
        "하체"
      ],
      "focus": "협응",
      "difficulty": "중급",
      "equipment": "덤벨 또는 케틀벨",
      "minutes": "좌우 15–30m · 2–4회",
      "description": "한 손에 가벼운 무게를 들고 천천히 걸으며 몸통이 한쪽으로 기울지 않게 조절하는 캐리 운동입니다.",
      "cues": [
        "가벼운 무게로 시작",
        "시선은 정면·보폭은 짧게",
        "어깨를 귀에서 멀리"
      ],
      "benefits": [
        "코어·그립 협응",
        "보행 안정성",
        "한쪽 부하 제어"
      ],
      "warning": "허리·어깨 통증이나 보행 불안이 있으면 무게를 낮추고 가까운 거리에서만 수행하세요.",
      "reference": {
        "label": "ACSM 신체 활동 지침",
        "url": "https://acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines/"
      }
    },
    "detail": {
      "setup": [
        "주변 공간·바닥·장비 고정 상태 확인",
        "가벼운 중량으로 동작 경로 연습",
        "몸통 긴장과 편안한 호흡 준비"
      ],
      "finish": "중량을 안전하게 내려놓고 통증·피로·기술 변화를 기록합니다.",
      "commonMistakes": [
        "반동과 과도한 속도",
        "몸통 정렬을 잃음",
        "피로 시에도 같은 중량 고집"
      ],
      "regressions": [
        "맨몸 또는 가벼운 덤벨",
        "지지면 활용",
        "가동 범위·반복 수 낮추기"
      ],
      "progressions": [
        "반복 상한 달성 후 소폭 증량",
        "세트 추가",
        "안정적인 단측 변형"
      ]
    }
  },
  {
    "exercise": {
      "id": "shallow-wall-sit",
      "name": "얕은 월 싯",
      "englishName": "Shallow Wall Sit",
      "category": "맨몸운동",
      "regions": [
        "하체",
        "둔근",
        "코어"
      ],
      "focus": "근력",
      "difficulty": "입문",
      "equipment": "벽",
      "minutes": "10–30초 · 2–4회",
      "description": "벽에 등을 기대고 무릎 각도를 낮게 유지하며, 짧은 시간 하체 정적 제어를 연습하는 쉬운 변형입니다.",
      "cues": [
        "깊이를 낮게부터 시작",
        "발 전체를 바닥에 두기",
        "호흡을 멈추지 않기"
      ],
      "benefits": [
        "대퇴 지구력",
        "하체 정적 제어",
        "짧은 시간 근력"
      ],
      "warning": "무릎 앞쪽 통증이 생기면 각도를 높이거나 중단하세요.",
      "reference": {
        "label": "CDC 성인 신체 활동 지침",
        "url": "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html"
      }
    },
    "detail": {
      "setup": [
        "미끄럽지 않은 바닥과 충분한 공간 확보",
        "쉬운 변형으로 움직임 범위 확인",
        "관절에 불편이 없는 시작 자세 설정"
      ],
      "finish": "호흡을 정리하고 필요한 경우 짧은 걷기·가동성으로 전환합니다.",
      "commonMistakes": [
        "몸통이 무너진 상태에서 반복",
        "통증을 참고 진행",
        "난이도를 너무 빨리 높임"
      ],
      "regressions": [
        "벽·벤치·무릎 지지",
        "짧은 범위",
        "반복·시간 줄이기"
      ],
      "progressions": [
        "지지면 낮추기",
        "시간 또는 반복 소폭 증가",
        "편측 변형"
      ]
    }
  },
  {
    "exercise": {
      "id": "quadruped-rockback",
      "name": "네발 자세 락백",
      "englishName": "Quadruped Rock Back",
      "category": "모빌리티",
      "regions": [
        "둔근",
        "하체",
        "등",
        "코어"
      ],
      "focus": "가동성",
      "difficulty": "입문",
      "equipment": "매트",
      "minutes": "1–2세트 · 6–12회",
      "description": "네발 자세에서 엉덩이를 뒤꿈치 쪽으로 부드럽게 보내며 고관절과 등 움직임을 탐색하는 준비 운동입니다.",
      "cues": [
        "손으로 바닥을 가볍게 밀기",
        "허리가 불편하지 않은 범위",
        "호흡에 맞춰 천천히 왕복"
      ],
      "benefits": [
        "고관절 움직임 인식",
        "등·몸통 준비",
        "가벼운 회복"
      ],
      "warning": "무릎·고관절 통증이나 외상 뒤 불편이 있으면 범위를 줄이거나 평가를 받으세요.",
      "reference": {
        "label": "NHS 통증 자가 관리",
        "url": "https://www.nhs.uk/live-well/pain/10-ways-to-ease-pain/"
      }
    },
    "detail": {
      "setup": [
        "통증 없는 작은 범위로 시작",
        "호흡을 길게 내쉬며 긴장 확인",
        "몸을 억지로 고정하지 않기"
      ],
      "finish": "움직임 뒤 불편감이 남지 않는지 확인하고 일상 동작으로 천천히 전환합니다.",
      "commonMistakes": [
        "가동 범위를 억지로 밀어붙임",
        "숨을 참음",
        "저림·방사통을 무시"
      ],
      "regressions": [
        "범위 줄이기",
        "지지대 사용",
        "누운 자세로 변경"
      ],
      "progressions": [
        "호흡에 맞춘 반복 추가",
        "조금 더 넓은 범위",
        "가벼운 근력 동작과 연결"
      ]
    }
  },
  {
    "exercise": {
      "id": "tandem-stance",
      "name": "탠덤 스탠스",
      "englishName": "Tandem Stance",
      "category": "균형·협응",
      "regions": [
        "하체",
        "코어"
      ],
      "focus": "균형",
      "difficulty": "입문",
      "equipment": "벽 또는 의자 근처",
      "minutes": "20–30초 · 좌우 2회",
      "description": "한 발의 뒤꿈치를 다른 발의 발끝 가까이에 두고 정지해 균형을 연습하는 기초 자세입니다.",
      "cues": [
        "벽·의자 가까이에서 시작",
        "시선은 고정된 지점에",
        "필요하면 손가락으로 가볍게 지지"
      ],
      "benefits": [
        "정적 균형",
        "발목·고관절 조절",
        "보행 안정성"
      ],
      "warning": "최근 낙상, 현기증, 보행 불안이 있으면 혼자 난도를 올리지 말고 전문가와 상담하세요.",
      "reference": {
        "label": "CDC 고령자 활동·균형 지침",
        "url": "https://www.cdc.gov/physical-activity-basics/guidelines/older-adults.html"
      }
    },
    "detail": {
      "setup": [
        "벽·의자 등 지지대 가까이 배치",
        "미끄럽지 않은 평평한 바닥 선택",
        "천천히 시작해 주변 안전 확인"
      ],
      "finish": "지지대를 잡고 안정된 뒤 종료하며 어지러움·불안을 기록합니다.",
      "commonMistakes": [
        "지지대 없이 어려운 변형 시도",
        "속도를 너무 높임",
        "피로한 상태에서 균형 도전"
      ],
      "regressions": [
        "양손 지지",
        "양발 간격 넓히기",
        "짧은 시간"
      ],
      "progressions": [
        "한 손 지지",
        "시간 소폭 증가",
        "천천히 걷는 변형"
      ]
    }
  },
  {
    "exercise": {
      "id": "snap-down",
      "name": "스냅 다운",
      "englishName": "Snap Down",
      "category": "파워·민첩성",
      "regions": [
        "하체",
        "둔근",
        "코어"
      ],
      "focus": "파워",
      "difficulty": "입문",
      "equipment": "미끄럽지 않은 바닥",
      "minutes": "2–3세트 · 3–5회",
      "description": "발뒤꿈치를 가볍게 들었다가 조용히 반스쿼트 자세로 멈추며 착지 정렬을 익히는 저충격 파워 준비 운동입니다.",
      "cues": [
        "무릎이 발끝 방향을 따라가게",
        "발 전체로 조용히 착지",
        "착지 뒤 1초 멈춰 정렬 확인"
      ],
      "benefits": [
        "착지 제어",
        "하체 정렬 인식",
        "점프 준비"
      ],
      "warning": "무릎·발목·허리 통증, 균형 상실, 최근 하체 외상이 있으면 점프 계열 대신 걷기·근력 운동을 선택하세요.",
      "reference": {
        "label": "NSCA 플라이오메트릭 안내",
        "url": "https://www.nsca.com/education/articles/kinetic-select/plyometric-exercises/"
      }
    },
    "detail": {
      "setup": [
        "미끄럽지 않은 평평한 바닥과 충분한 주변 공간 확인",
        "통증 없는 스쿼트·걷기·균형 변형부터 연습",
        "낮은 충격·짧은 반복으로 착지 리듬 점검"
      ],
      "finish": "마지막 반복 뒤 걷기로 호흡을 낮추고, 착지·관절·피로 반응을 기록합니다.",
      "commonMistakes": [
        "높이·속도부터 과하게 올림",
        "착지 제어 없이 연속 반복",
        "피로 신호를 무시한 채 거리·반복 증가"
      ],
      "regressions": [
        "스냅 다운 또는 옆걸음",
        "점프 없는 체중 이동",
        "반복·거리·속도 낮추기"
      ],
      "progressions": [
        "착지 멈춤 시간 유지 후 작은 거리 증가",
        "한 번에 하나의 변수만 조절",
        "충분한 회복일 뒤 다음 난도 시도"
      ]
    }
  },
  {
    "exercise": {
      "id": "squat-jump-stick",
      "name": "스쿼트 점프·스틱",
      "englishName": "Squat Jump to Stick",
      "category": "파워·민첩성",
      "regions": [
        "하체",
        "둔근",
        "코어"
      ],
      "focus": "파워",
      "difficulty": "중급",
      "equipment": "미끄럽지 않은 바닥",
      "minutes": "2–4세트 · 2–5회",
      "description": "작은 범위로 뛰어오른 뒤 같은 자리에서 조용히 착지하고 멈추는 기본 수직 점프 연습입니다.",
      "cues": [
        "낮은 점프 높이부터",
        "착지 때 무릎·고관절을 함께 부드럽게",
        "반복 사이 호흡과 정렬을 다시 확인"
      ],
      "benefits": [
        "하체 파워",
        "착지 제어",
        "신장-단축 주기 연습"
      ],
      "warning": "착지 소리가 커지거나 정렬을 유지하지 못하면 즉시 반복을 끝내고 스냅 다운으로 낮추세요.",
      "reference": {
        "label": "NSCA 플라이오메트릭 안내",
        "url": "https://www.nsca.com/education/articles/kinetic-select/plyometric-exercises/"
      }
    },
    "detail": {
      "setup": [
        "미끄럽지 않은 평평한 바닥과 충분한 주변 공간 확인",
        "통증 없는 스쿼트·걷기·균형 변형부터 연습",
        "낮은 충격·짧은 반복으로 착지 리듬 점검"
      ],
      "finish": "마지막 반복 뒤 걷기로 호흡을 낮추고, 착지·관절·피로 반응을 기록합니다.",
      "commonMistakes": [
        "높이·속도부터 과하게 올림",
        "착지 제어 없이 연속 반복",
        "피로 신호를 무시한 채 거리·반복 증가"
      ],
      "regressions": [
        "스냅 다운 또는 옆걸음",
        "점프 없는 체중 이동",
        "반복·거리·속도 낮추기"
      ],
      "progressions": [
        "착지 멈춤 시간 유지 후 작은 거리 증가",
        "한 번에 하나의 변수만 조절",
        "충분한 회복일 뒤 다음 난도 시도"
      ]
    }
  },
  {
    "exercise": {
      "id": "pogo-hop",
      "name": "포고 홉",
      "englishName": "Pogo Hop",
      "category": "파워·민첩성",
      "regions": [
        "하체",
        "코어"
      ],
      "focus": "파워",
      "difficulty": "중급",
      "equipment": "평평한 바닥 · 지지대 근처",
      "minutes": "10–20초 · 2–4회",
      "description": "무릎을 깊게 굽히지 않고 발목을 중심으로 아주 작은 양발 점프를 반복하는 리듬·탄성 연습입니다.",
      "cues": [
        "높이보다 가볍고 조용한 리듬",
        "몸통을 길게 유지",
        "피로 전에 짧게 끝내기"
      ],
      "benefits": [
        "발목 탄성",
        "리듬 협응",
        "러닝·점프 준비"
      ],
      "warning": "종아리·아킬레스건·발 통증이 있거나 최근 달리기 부하가 많았다면 실시하지 마세요.",
      "reference": {
        "label": "NSCA 플라이오메트릭 안내",
        "url": "https://www.nsca.com/education/articles/kinetic-select/plyometric-exercises/"
      }
    },
    "detail": {
      "setup": [
        "미끄럽지 않은 평평한 바닥과 충분한 주변 공간 확인",
        "통증 없는 스쿼트·걷기·균형 변형부터 연습",
        "낮은 충격·짧은 반복으로 착지 리듬 점검"
      ],
      "finish": "마지막 반복 뒤 걷기로 호흡을 낮추고, 착지·관절·피로 반응을 기록합니다.",
      "commonMistakes": [
        "높이·속도부터 과하게 올림",
        "착지 제어 없이 연속 반복",
        "피로 신호를 무시한 채 거리·반복 증가"
      ],
      "regressions": [
        "스냅 다운 또는 옆걸음",
        "점프 없는 체중 이동",
        "반복·거리·속도 낮추기"
      ],
      "progressions": [
        "착지 멈춤 시간 유지 후 작은 거리 증가",
        "한 번에 하나의 변수만 조절",
        "충분한 회복일 뒤 다음 난도 시도"
      ]
    }
  },
  {
    "exercise": {
      "id": "lateral-bound-stick",
      "name": "레터럴 바운드·스틱",
      "englishName": "Lateral Bound to Stick",
      "category": "파워·민첩성",
      "regions": [
        "하체",
        "둔근",
        "코어"
      ],
      "focus": "파워",
      "difficulty": "중급",
      "equipment": "평평한 바닥 · 벽 근처",
      "minutes": "좌우 2–3세트 · 3–5회",
      "description": "옆으로 작은 거리를 이동한 뒤 한 발 또는 양발로 멈춰 측면 이동과 균형을 함께 연습합니다.",
      "cues": [
        "거리를 매우 짧게 시작",
        "착지 뒤 1–2초 균형 유지",
        "골반이 한쪽으로 무너지지 않게"
      ],
      "benefits": [
        "측면 이동 제어",
        "둔근·하체 파워",
        "균형 협응"
      ],
      "warning": "발목 삠 이력, 무릎 불안정, 균형 불안이 있으면 옆걸음·스텝 탭으로 바꾸세요.",
      "reference": {
        "label": "NSCA 플라이오메트릭 안내",
        "url": "https://www.nsca.com/education/articles/kinetic-select/plyometric-exercises/"
      }
    },
    "detail": {
      "setup": [
        "미끄럽지 않은 평평한 바닥과 충분한 주변 공간 확인",
        "통증 없는 스쿼트·걷기·균형 변형부터 연습",
        "낮은 충격·짧은 반복으로 착지 리듬 점검"
      ],
      "finish": "마지막 반복 뒤 걷기로 호흡을 낮추고, 착지·관절·피로 반응을 기록합니다.",
      "commonMistakes": [
        "높이·속도부터 과하게 올림",
        "착지 제어 없이 연속 반복",
        "피로 신호를 무시한 채 거리·반복 증가"
      ],
      "regressions": [
        "스냅 다운 또는 옆걸음",
        "점프 없는 체중 이동",
        "반복·거리·속도 낮추기"
      ],
      "progressions": [
        "착지 멈춤 시간 유지 후 작은 거리 증가",
        "한 번에 하나의 변수만 조절",
        "충분한 회복일 뒤 다음 난도 시도"
      ]
    }
  },
  {
    "exercise": {
      "id": "low-cone-shuffle",
      "name": "로우 콘 셔플",
      "englishName": "Low Cone Shuffle",
      "category": "파워·민첩성",
      "regions": [
        "하체",
        "둔근",
        "코어"
      ],
      "focus": "협응",
      "difficulty": "입문",
      "equipment": "낮은 콘 또는 표시물",
      "minutes": "5–10m · 3–5회",
      "description": "낮은 표시물 사이를 빠르기보다 통제된 옆걸음으로 이동하며 방향 전환 기초를 연습합니다.",
      "cues": [
        "발을 교차하지 않고 옆으로 이동",
        "무릎을 부드럽게 굽히기",
        "방향 전환 전 속도를 줄이기"
      ],
      "benefits": [
        "민첩성 기초",
        "측면 이동 협응",
        "하체 준비"
      ],
      "warning": "미끄러운 바닥·어지러움·무릎 통증이 있으면 진행하지 말고 평지 걷기를 선택하세요.",
      "reference": {
        "label": "NSCA 플라이오메트릭 안내",
        "url": "https://www.nsca.com/education/articles/kinetic-select/plyometric-exercises/"
      }
    },
    "detail": {
      "setup": [
        "미끄럽지 않은 평평한 바닥과 충분한 주변 공간 확인",
        "통증 없는 스쿼트·걷기·균형 변형부터 연습",
        "낮은 충격·짧은 반복으로 착지 리듬 점검"
      ],
      "finish": "마지막 반복 뒤 걷기로 호흡을 낮추고, 착지·관절·피로 반응을 기록합니다.",
      "commonMistakes": [
        "높이·속도부터 과하게 올림",
        "착지 제어 없이 연속 반복",
        "피로 신호를 무시한 채 거리·반복 증가"
      ],
      "regressions": [
        "스냅 다운 또는 옆걸음",
        "점프 없는 체중 이동",
        "반복·거리·속도 낮추기"
      ],
      "progressions": [
        "착지 멈춤 시간 유지 후 작은 거리 증가",
        "한 번에 하나의 변수만 조절",
        "충분한 회복일 뒤 다음 난도 시도"
      ]
    }
  },
  {
    "exercise": {
      "id": "medicine-ball-chest-pass",
      "name": "메디신볼 체스트 패스",
      "englishName": "Medicine Ball Chest Pass",
      "category": "파워·민첩성",
      "regions": [
        "가슴",
        "어깨",
        "팔",
        "코어"
      ],
      "focus": "파워",
      "difficulty": "입문",
      "equipment": "가벼운 메디신볼 · 안전한 벽",
      "minutes": "2–3세트 · 3–6회",
      "description": "가벼운 공을 가슴 앞에서 벽 또는 파트너에게 짧게 밀어 보내며 상체 힘 전달을 연습합니다.",
      "cues": [
        "아주 가벼운 공으로 시작",
        "벽·파트너와 충분한 거리 확보",
        "팔꿈치를 잠그지 않고 부드럽게 받기"
      ],
      "benefits": [
        "상체 파워",
        "몸통-팔 협응",
        "짧은 힘 전달"
      ],
      "warning": "어깨·손목 통증이 있거나 공을 안전하게 받을 공간이 없으면 실시하지 마세요.",
      "reference": {
        "label": "NSCA 플라이오메트릭 안내",
        "url": "https://www.nsca.com/education/articles/kinetic-select/plyometric-exercises/"
      }
    },
    "detail": {
      "setup": [
        "미끄럽지 않은 평평한 바닥과 충분한 주변 공간 확인",
        "통증 없는 스쿼트·걷기·균형 변형부터 연습",
        "낮은 충격·짧은 반복으로 착지 리듬 점검"
      ],
      "finish": "마지막 반복 뒤 걷기로 호흡을 낮추고, 착지·관절·피로 반응을 기록합니다.",
      "commonMistakes": [
        "높이·속도부터 과하게 올림",
        "착지 제어 없이 연속 반복",
        "피로 신호를 무시한 채 거리·반복 증가"
      ],
      "regressions": [
        "스냅 다운 또는 옆걸음",
        "점프 없는 체중 이동",
        "반복·거리·속도 낮추기"
      ],
      "progressions": [
        "착지 멈춤 시간 유지 후 작은 거리 증가",
        "한 번에 하나의 변수만 조절",
        "충분한 회복일 뒤 다음 난도 시도"
      ]
    }
  },
  {
    "exercise": {
      "id": "kettlebell-swing-prep",
      "name": "케틀벨 스윙 프렙",
      "englishName": "Kettlebell Swing Preparation",
      "category": "프리웨이트",
      "regions": [
        "둔근",
        "하체",
        "코어",
        "등"
      ],
      "focus": "협응",
      "difficulty": "입문",
      "equipment": "가벼운 케틀벨",
      "minutes": "2–3세트 · 5–8회",
      "description": "케틀벨을 바닥에서 짧게 들어 힙 힌지와 엉덩이 힘 전달을 연습하는 스윙 전 단계입니다.",
      "cues": [
        "처음에는 힙 높이보다 낮게",
        "팔로 들어 올리지 않기",
        "등을 길게 유지하며 엉덩이로 일어서기"
      ],
      "benefits": [
        "힙 힌지 숙련",
        "둔근·후면 사슬",
        "파워 패턴 준비"
      ],
      "warning": "허리 통증·어지러움·기술 불안이 있으면 스윙으로 진행하지 말고 케틀벨 데드리프트를 선택하세요.",
      "reference": {
        "label": "ACSM 신체 활동 지침",
        "url": "https://acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines/"
      }
    },
    "detail": {
      "setup": [
        "주변 공간·바닥·장비 고정 상태 확인",
        "가벼운 중량으로 동작 경로 연습",
        "몸통 긴장과 편안한 호흡 준비"
      ],
      "finish": "중량을 안전하게 내려놓고 통증·피로·기술 변화를 기록합니다.",
      "commonMistakes": [
        "반동과 과도한 속도",
        "몸통 정렬을 잃음",
        "피로 시에도 같은 중량 고집"
      ],
      "regressions": [
        "맨몸 또는 가벼운 덤벨",
        "지지면 활용",
        "가동 범위·반복 수 낮추기"
      ],
      "progressions": [
        "반복 상한 달성 후 소폭 증량",
        "세트 추가",
        "안정적인 단측 변형"
      ]
    }
  },
  {
    "exercise": {
      "id": "dumbbell-step-up",
      "name": "덤벨 스텝업",
      "englishName": "Dumbbell Step-Up",
      "category": "프리웨이트",
      "regions": [
        "하체",
        "둔근",
        "코어"
      ],
      "focus": "근력",
      "difficulty": "중급",
      "equipment": "낮은 스텝 · 가벼운 덤벨",
      "minutes": "좌우 2–3세트 · 5–8회",
      "description": "낮은 스텝을 한 발로 밟고 올라가며 한쪽 다리 힘과 보행 제어를 연습합니다.",
      "cues": [
        "처음에는 덤벨 없이",
        "스텝 위 발 전체로 누르기",
        "내려올 때도 천천히 제어"
      ],
      "benefits": [
        "한쪽 다리 근력",
        "둔근 활성",
        "계단 보행 준비"
      ],
      "warning": "스텝이 흔들리거나 무릎 통증·균형 불안이 있으면 지지대와 맨몸 변형으로 낮추세요.",
      "reference": {
        "label": "ACSM 신체 활동 지침",
        "url": "https://acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines/"
      }
    },
    "detail": {
      "setup": [
        "주변 공간·바닥·장비 고정 상태 확인",
        "가벼운 중량으로 동작 경로 연습",
        "몸통 긴장과 편안한 호흡 준비"
      ],
      "finish": "중량을 안전하게 내려놓고 통증·피로·기술 변화를 기록합니다.",
      "commonMistakes": [
        "반동과 과도한 속도",
        "몸통 정렬을 잃음",
        "피로 시에도 같은 중량 고집"
      ],
      "regressions": [
        "맨몸 또는 가벼운 덤벨",
        "지지면 활용",
        "가동 범위·반복 수 낮추기"
      ],
      "progressions": [
        "반복 상한 달성 후 소폭 증량",
        "세트 추가",
        "안정적인 단측 변형"
      ]
    }
  },
  {
    "exercise": {
      "id": "cable-chest-press",
      "name": "케이블 체스트 프레스",
      "englishName": "Cable Chest Press",
      "category": "헬스기구",
      "regions": [
        "가슴",
        "어깨",
        "팔",
        "코어"
      ],
      "focus": "근력",
      "difficulty": "입문",
      "equipment": "케이블 머신",
      "minutes": "2–3세트 · 8–12회",
      "description": "케이블 손잡이를 앞쪽으로 밀며 한쪽씩 또는 양쪽을 함께 사용하는 상체 밀기 운동입니다.",
      "cues": [
        "가벼운 저항·안정된 자세",
        "갈비뼈를 과도하게 들지 않기",
        "손잡이를 천천히 되돌리기"
      ],
      "benefits": [
        "가슴·팔 근력",
        "서기 자세 코어 제어",
        "상체 밀기 변형"
      ],
      "warning": "어깨 앞쪽 통증이나 몸통 회전 제어 상실이 있으면 중량·범위를 줄이거나 중단하세요.",
      "reference": {
        "label": "ACSM 신체 활동 지침",
        "url": "https://acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines/"
      }
    },
    "detail": {
      "setup": [
        "시트·패드·손잡이를 신체에 맞게 조절",
        "매우 가벼운 무게로 1회 리허설",
        "가동 범위에서 통증 여부 확인"
      ],
      "finish": "중량을 제자리에 놓고 다음 세트 전 호흡·관절 반응을 확인합니다.",
      "commonMistakes": [
        "반동으로 중량 움직이기",
        "시트 위치를 맞추지 않음",
        "무게를 과도하게 올림"
      ],
      "regressions": [
        "중량 낮추기",
        "가동 범위 줄이기",
        "안정적인 그립·좌석 재설정"
      ],
      "progressions": [
        "반복 품질 유지 후 소폭 증량",
        "세트 1개 추가",
        "천천히 내리는 구간 제어"
      ]
    }
  },
  {
    "exercise": {
      "id": "machine-hip-abduction",
      "name": "머신 힙 어브덕션",
      "englishName": "Machine Hip Abduction",
      "category": "헬스기구",
      "regions": [
        "둔근",
        "하체"
      ],
      "focus": "근력",
      "difficulty": "입문",
      "equipment": "힙 어브덕션 머신",
      "minutes": "2–3세트 · 10–15회",
      "description": "앉은 자세에서 패드를 바깥쪽으로 밀며 엉덩이 옆쪽의 부하를 조절하는 보조 머신 운동입니다.",
      "cues": [
        "시트·등받이를 먼저 맞추기",
        "반동 없이 천천히 벌리기",
        "골반이 한쪽으로 기울지 않게"
      ],
      "benefits": [
        "둔근 보조 근력",
        "골반 안정성",
        "한쪽 다리 운동 보조"
      ],
      "warning": "고관절 통증·저림이 생기면 범위와 중량을 줄이거나 중단하세요.",
      "reference": {
        "label": "ACSM 신체 활동 지침",
        "url": "https://acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines/"
      }
    },
    "detail": {
      "setup": [
        "시트·패드·손잡이를 신체에 맞게 조절",
        "매우 가벼운 무게로 1회 리허설",
        "가동 범위에서 통증 여부 확인"
      ],
      "finish": "중량을 제자리에 놓고 다음 세트 전 호흡·관절 반응을 확인합니다.",
      "commonMistakes": [
        "반동으로 중량 움직이기",
        "시트 위치를 맞추지 않음",
        "무게를 과도하게 올림"
      ],
      "regressions": [
        "중량 낮추기",
        "가동 범위 줄이기",
        "안정적인 그립·좌석 재설정"
      ],
      "progressions": [
        "반복 품질 유지 후 소폭 증량",
        "세트 1개 추가",
        "천천히 내리는 구간 제어"
      ]
    }
  },
  {
    "exercise": {
      "id": "machine-calf-raise",
      "name": "머신 카프 레이즈",
      "englishName": "Machine Calf Raise",
      "category": "헬스기구",
      "regions": [
        "하체"
      ],
      "focus": "근력",
      "difficulty": "입문",
      "equipment": "카프 레이즈 머신",
      "minutes": "2–3세트 · 8–15회",
      "description": "발 앞쪽 지지면에서 발목을 천천히 펴고 내리며 종아리의 부하와 발목 움직임을 연습합니다.",
      "cues": [
        "가벼운 부하로 발목 범위 확인",
        "위·아래 모두 천천히",
        "무릎을 과도하게 잠그지 않기"
      ],
      "benefits": [
        "종아리 근력",
        "발목 제어",
        "걷기·러닝 보조"
      ],
      "warning": "아킬레스건·발바닥·종아리의 날카로운 통증이 있으면 실시하지 마세요.",
      "reference": {
        "label": "ACSM 신체 활동 지침",
        "url": "https://acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines/"
      }
    },
    "detail": {
      "setup": [
        "시트·패드·손잡이를 신체에 맞게 조절",
        "매우 가벼운 무게로 1회 리허설",
        "가동 범위에서 통증 여부 확인"
      ],
      "finish": "중량을 제자리에 놓고 다음 세트 전 호흡·관절 반응을 확인합니다.",
      "commonMistakes": [
        "반동으로 중량 움직이기",
        "시트 위치를 맞추지 않음",
        "무게를 과도하게 올림"
      ],
      "regressions": [
        "중량 낮추기",
        "가동 범위 줄이기",
        "안정적인 그립·좌석 재설정"
      ],
      "progressions": [
        "반복 품질 유지 후 소폭 증량",
        "세트 1개 추가",
        "천천히 내리는 구간 제어"
      ]
    }
  },
  {
    "exercise": {
      "id": "chest-supported-row",
      "name": "체스트 서포티드 로우",
      "englishName": "Chest-Supported Row",
      "category": "헬스기구",
      "regions": [
        "등",
        "팔",
        "어깨"
      ],
      "focus": "근력",
      "difficulty": "입문",
      "equipment": "체스트 서포티드 로우 머신",
      "minutes": "2–3세트 · 8–12회",
      "description": "가슴을 패드에 지지하고 손잡이를 당겨 등 중심의 당기기 패턴을 연습하는 머신 운동입니다.",
      "cues": [
        "가슴을 패드에 편안히 지지",
        "어깨를 귀에서 멀게",
        "팔꿈치를 몸통 가까이 당기기"
      ],
      "benefits": [
        "등·팔 근력",
        "견갑 조절",
        "몸통 지지 당기기"
      ],
      "warning": "가슴 압박감·어깨 통증·저림이 있으면 자세와 패드를 조절하거나 중단하세요.",
      "reference": {
        "label": "ACSM 신체 활동 지침",
        "url": "https://acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines/"
      }
    },
    "detail": {
      "setup": [
        "시트·패드·손잡이를 신체에 맞게 조절",
        "매우 가벼운 무게로 1회 리허설",
        "가동 범위에서 통증 여부 확인"
      ],
      "finish": "중량을 제자리에 놓고 다음 세트 전 호흡·관절 반응을 확인합니다.",
      "commonMistakes": [
        "반동으로 중량 움직이기",
        "시트 위치를 맞추지 않음",
        "무게를 과도하게 올림"
      ],
      "regressions": [
        "중량 낮추기",
        "가동 범위 줄이기",
        "안정적인 그립·좌석 재설정"
      ],
      "progressions": [
        "반복 품질 유지 후 소폭 증량",
        "세트 1개 추가",
        "천천히 내리는 구간 제어"
      ]
    }
  },
  {
    "exercise": {
      "id": "stair-climber-easy",
      "name": "스테어 클라이머 이지",
      "englishName": "Easy Stair Climber",
      "category": "유산소",
      "regions": [
        "하체",
        "둔근",
        "코어"
      ],
      "focus": "심폐",
      "difficulty": "입문",
      "equipment": "스테어 클라이머",
      "minutes": "10–25분 · RPE 4–6",
      "description": "낮은 속도에서 계단 오르기 리듬을 유지하며 하체와 심폐 지구력을 기르는 실내 유산소 활동입니다.",
      "cues": [
        "손잡이를 가볍게만 사용",
        "속도보다 일정한 리듬",
        "호흡이 과도하게 가빠지면 즉시 낮추기"
      ],
      "benefits": [
        "심폐 지구력",
        "하체 반복 지구력",
        "계단 동작 적응"
      ],
      "warning": "무릎 통증·현기증·손잡이에 체중을 과도하게 싣는 자세가 나타나면 강도를 낮추거나 중단하세요.",
      "reference": {
        "label": "CDC 성인 신체 활동 지침",
        "url": "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html"
      }
    },
    "detail": {
      "setup": [
        "기구 높이·저항을 편안한 위치로 설정",
        "3–5분 낮은 강도로 워밍업",
        "수분과 환기 상태를 확인"
      ],
      "finish": "마지막 몇 분은 저항을 낮추고 호흡이 안정된 뒤 종료합니다.",
      "commonMistakes": [
        "저항을 너무 빨리 올림",
        "손잡이에 체중을 과하게 싣기",
        "어지러움을 참음"
      ],
      "regressions": [
        "시간·저항 낮추기",
        "짧은 간격과 휴식",
        "저충격 기구 선택"
      ],
      "progressions": [
        "시간 우선 증가",
        "짧은 강도 변화",
        "주간 빈도 점진 증가"
      ]
    }
  },
  {
    "exercise": {
      "id": "ankle-knee-to-wall",
      "name": "발목 니투월 락",
      "englishName": "Ankle Knee-to-Wall Rock",
      "category": "모빌리티",
      "regions": [
        "하체",
        "코어"
      ],
      "focus": "가동성",
      "difficulty": "입문",
      "equipment": "벽",
      "minutes": "좌우 1–2세트 · 6–10회",
      "description": "발뒤꿈치를 바닥에 둔 채 무릎을 벽 쪽으로 부드럽게 보내 발목 앞쪽 움직임을 탐색합니다.",
      "cues": [
        "발뒤꿈치가 들리지 않게",
        "통증 없는 거리에서",
        "무릎은 두 번째 발가락 방향"
      ],
      "benefits": [
        "발목 움직임 인식",
        "스쿼트·걷기 준비",
        "종아리 긴장 완화 보조"
      ],
      "warning": "발목 부종·최근 염좌·날카로운 통증이 있으면 강제로 늘리지 말고 평가를 받으세요.",
      "reference": {
        "label": "NHS 통증 자가 관리",
        "url": "https://www.nhs.uk/live-well/pain/10-ways-to-ease-pain/"
      }
    },
    "detail": {
      "setup": [
        "통증 없는 작은 범위로 시작",
        "호흡을 길게 내쉬며 긴장 확인",
        "몸을 억지로 고정하지 않기"
      ],
      "finish": "움직임 뒤 불편감이 남지 않는지 확인하고 일상 동작으로 천천히 전환합니다.",
      "commonMistakes": [
        "가동 범위를 억지로 밀어붙임",
        "숨을 참음",
        "저림·방사통을 무시"
      ],
      "regressions": [
        "범위 줄이기",
        "지지대 사용",
        "누운 자세로 변경"
      ],
      "progressions": [
        "호흡에 맞춘 반복 추가",
        "조금 더 넓은 범위",
        "가벼운 근력 동작과 연결"
      ]
    }
  },
  {
    "exercise": {
      "id": "assisted-cossack-squat",
      "name": "지지 Cossack 스쿼트",
      "englishName": "Assisted Cossack Squat",
      "category": "모빌리티",
      "regions": [
        "하체",
        "둔근",
        "코어"
      ],
      "focus": "가동성",
      "difficulty": "중급",
      "equipment": "벽 또는 기둥 지지",
      "minutes": "좌우 1–2세트 · 4–6회",
      "description": "안정된 지지대를 잡고 한쪽으로 천천히 체중을 이동하며 고관절·발목의 편안한 범위를 탐색합니다.",
      "cues": [
        "깊이보다 안정된 지지",
        "반대쪽 다리를 억지로 펴지 않기",
        "통증 없는 범위만 사용"
      ],
      "benefits": [
        "측면 고관절 움직임",
        "한쪽 다리 준비",
        "가동 범위 인식"
      ],
      "warning": "무릎·고관절 통증이나 균형 불안이 있으면 더 쉬운 측면 체중 이동으로 낮추세요.",
      "reference": {
        "label": "NHS 통증 자가 관리",
        "url": "https://www.nhs.uk/live-well/pain/10-ways-to-ease-pain/"
      }
    },
    "detail": {
      "setup": [
        "통증 없는 작은 범위로 시작",
        "호흡을 길게 내쉬며 긴장 확인",
        "몸을 억지로 고정하지 않기"
      ],
      "finish": "움직임 뒤 불편감이 남지 않는지 확인하고 일상 동작으로 천천히 전환합니다.",
      "commonMistakes": [
        "가동 범위를 억지로 밀어붙임",
        "숨을 참음",
        "저림·방사통을 무시"
      ],
      "regressions": [
        "범위 줄이기",
        "지지대 사용",
        "누운 자세로 변경"
      ],
      "progressions": [
        "호흡에 맞춘 반복 추가",
        "조금 더 넓은 범위",
        "가벼운 근력 동작과 연결"
      ]
    }
  },
  {
    "exercise": {
      "id": "clock-reach",
      "name": "클락 리치",
      "englishName": "Clock Reach",
      "category": "균형·협응",
      "regions": [
        "하체",
        "둔근",
        "코어"
      ],
      "focus": "협응",
      "difficulty": "입문",
      "equipment": "벽 또는 의자 근처",
      "minutes": "좌우 1–2세트 · 3–5방향",
      "description": "한 발로 안정적으로 서며 다른 발을 시계 방향의 여러 지점에 가볍게 뻗어 균형·도달 협응을 연습합니다.",
      "cues": [
        "지지대 가까이 배치",
        "가까운 방향부터",
        "골반을 급히 돌리지 않기"
      ],
      "benefits": [
        "동적 균형",
        "엉덩이·발목 협응",
        "방향 감각"
      ],
      "warning": "최근 낙상·현기증·보행 불안이 있으면 혼자 난도를 올리지 말고 지지대를 사용하세요.",
      "reference": {
        "label": "CDC 성인 신체 활동 지침",
        "url": "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html"
      }
    },
    "detail": {
      "setup": [
        "벽·의자 등 지지대 가까이 배치",
        "미끄럽지 않은 평평한 바닥 선택",
        "천천히 시작해 주변 안전 확인"
      ],
      "finish": "지지대를 잡고 안정된 뒤 종료하며 어지러움·불안을 기록합니다.",
      "commonMistakes": [
        "지지대 없이 어려운 변형 시도",
        "속도를 너무 높임",
        "피로한 상태에서 균형 도전"
      ],
      "regressions": [
        "양손 지지",
        "양발 간격 넓히기",
        "짧은 시간"
      ],
      "progressions": [
        "한 손 지지",
        "시간 소폭 증가",
        "천천히 걷는 변형"
      ]
    }
  },
  {
    "exercise": {
      "id": "kettlebell-sumo-deadlift",
      "name": "케틀벨 수모 데드리프트",
      "englishName": "Kettlebell Sumo Deadlift",
      "category": "프리웨이트",
      "regions": [
        "둔근",
        "하체",
        "코어",
        "등"
      ],
      "focus": "근력",
      "difficulty": "입문",
      "equipment": "케틀벨",
      "minutes": "2–3세트 · 6–10회",
      "description": "조금 넓은 발 사이 바닥에 둔 케틀벨을 엉덩이와 무릎을 함께 굽혀 들어 올리며 하체 힘 전달을 연습합니다.",
      "cues": [
        "케틀벨을 발 중앙 가까이에 두기",
        "무릎은 발끝 방향으로 편안하게",
        "팔보다 발과 엉덩이로 바닥 밀기"
      ],
      "benefits": [
        "힙 힌지 기초",
        "둔근·하체 근력",
        "넓은 스탠스 제어"
      ],
      "warning": "허리 통증·저림·기술 불안이 있으면 부하를 낮추거나 벽 힙 힌지로 돌아가세요.",
      "reference": {
        "label": "ACSM 2026 저항운동 지침",
        "url": "https://acsm.org/resistance-training-guidelines-update-2026/"
      }
    },
    "detail": {
      "setup": [
        "케틀벨을 넓은 발 사이 중앙에 놓기",
        "무릎·발끝이 편안한 방향인지 확인",
        "가벼운 빈손 수모 힌지로 깊이 확인"
      ],
      "finish": "케틀벨을 바닥에 조용히 두고 고관절·무릎·허리의 반응을 살핍니다.",
      "commonMistakes": [
        "무릎이 안쪽으로 무너짐",
        "등을 둥글게 말아 당김",
        "발뒤꿈치가 들린 채 시작"
      ],
      "regressions": [
        "더 좁은 스탠스",
        "높은 지지면의 케틀벨",
        "빈손 힌지"
      ],
      "progressions": [
        "반복 품질 뒤 소폭 증량",
        "느린 하강 구간",
        "일반 케틀벨 데드리프트와 교대"
      ]
    }
  },
  {
    "exercise": {
      "id": "kettlebell-goblet-squat",
      "name": "케틀벨 고블릿 스쿼트",
      "englishName": "Kettlebell Goblet Squat",
      "category": "프리웨이트",
      "regions": [
        "하체",
        "둔근",
        "코어"
      ],
      "focus": "근력",
      "difficulty": "입문",
      "equipment": "가벼운 케틀벨",
      "minutes": "2–3세트 · 6–10회",
      "description": "가벼운 케틀벨을 가슴 앞에 가까이 들고 편안한 범위로 앉았다 일어나며 하체 정렬을 연습합니다.",
      "cues": [
        "케틀벨을 몸 가까이 안정적으로 잡기",
        "발 전체에 체중을 고르게 두기",
        "무릎과 발끝이 편안하게 같은 방향"
      ],
      "benefits": [
        "하체 근력",
        "몸통-하체 협응",
        "스쿼트 자세 인식"
      ],
      "warning": "무릎·허리 통증이 증가하면 의자 스쿼트나 맨몸 범위로 낮추세요.",
      "reference": {
        "label": "ACSM 2026 저항운동 지침",
        "url": "https://acsm.org/resistance-training-guidelines-update-2026/"
      }
    },
    "detail": {
      "setup": [
        "가벼운 케틀벨을 몸 가까이 두 손으로 잡기",
        "발 전체와 무릎·발끝 방향을 먼저 확인",
        "맨몸 스쿼트로 편안한 깊이 찾기"
      ],
      "finish": "케틀벨을 안전하게 내려놓고 호흡·무릎·허리 반응을 기록합니다.",
      "commonMistakes": [
        "가슴을 들며 허리를 과도하게 젖힘",
        "발뒤꿈치가 들림",
        "깊이를 무리하게 밀어붙임"
      ],
      "regressions": [
        "의자 스쿼트",
        "맨몸 스쿼트",
        "더 가벼운 무게·얕은 범위"
      ],
      "progressions": [
        "반복 상한 뒤 소폭 증량",
        "바닥에서 1초 멈춤",
        "지지 스텝업 보조"
      ]
    }
  },
  {
    "exercise": {
      "id": "kettlebell-suitcase-carry",
      "name": "케틀벨 수트케이스 캐리",
      "englishName": "Kettlebell Suitcase Carry",
      "category": "프리웨이트",
      "regions": [
        "코어",
        "팔",
        "하체"
      ],
      "focus": "협응",
      "difficulty": "입문",
      "equipment": "가벼운 케틀벨 · 평평한 바닥",
      "minutes": "좌우 15–30m · 2–3회",
      "description": "한 손에 가벼운 케틀벨을 들고 천천히 걸으며 몸통이 한쪽으로 기울지 않게 조절하는 운반 운동입니다.",
      "cues": [
        "가벼운 무게로 짧은 거리부터",
        "어깨를 귀에서 멀리 두기",
        "짧고 조용한 보폭 유지"
      ],
      "benefits": [
        "그립·코어 협응",
        "보행 안정성",
        "한쪽 부하 제어"
      ],
      "warning": "어깨·허리 통증이나 보행 불안이 있으면 즉시 거리를 줄이거나 중단하세요.",
      "reference": {
        "label": "ACSM 2026 저항운동 지침",
        "url": "https://acsm.org/resistance-training-guidelines-update-2026/"
      }
    },
    "detail": {
      "setup": [
        "평평한 짧은 보행 경로와 회전 공간 확인",
        "케틀벨을 한 손에 들기 전 가벼운 체중 이동",
        "어깨를 귀에서 멀리 두고 시선 정면"
      ],
      "finish": "케틀벨을 무릎 가까이에서 안전히 내려놓고 양쪽의 허리·그립 반응을 비교합니다.",
      "commonMistakes": [
        "무게 반대쪽으로 과도하게 기울기",
        "보폭을 크게 늘림",
        "피로해도 그립을 억지로 유지"
      ],
      "regressions": [
        "아주 가벼운 케틀벨",
        "10m 미만 거리",
        "양손 파머스 캐리"
      ],
      "progressions": [
        "거리 소폭 증가",
        "한쪽당 추가 구간",
        "안정된 보행 뒤 가벼운 수트케이스 캐리"
      ]
    }
  },
  {
    "exercise": {
      "id": "resistance-band-row",
      "name": "저항 밴드 로우",
      "englishName": "Resistance Band Row",
      "category": "프리웨이트",
      "regions": [
        "등",
        "팔",
        "어깨"
      ],
      "focus": "근력",
      "difficulty": "입문",
      "equipment": "안정적으로 고정한 저항 밴드",
      "minutes": "2–3세트 · 8–15회",
      "description": "가슴 높이에 안전하게 고정한 밴드를 몸 쪽으로 당기며 등·견갑의 부드러운 당기기 패턴을 연습합니다.",
      "cues": [
        "밴드 고정점을 먼저 두 번 확인",
        "어깨를 으쓱하지 않고 팔꿈치 당기기",
        "복귀 구간도 천천히 제어"
      ],
      "benefits": [
        "등·팔 근력",
        "견갑 조절",
        "가정 당기기 운동"
      ],
      "warning": "밴드가 손상됐거나 고정점이 불안정하면 사용하지 말고, 저림·어깨 통증이 있으면 중단하세요.",
      "reference": {
        "label": "ACSM 2026 저항운동 지침",
        "url": "https://acsm.org/resistance-training-guidelines-update-2026/"
      }
    },
    "detail": {
      "setup": [
        "문·기둥 등 고정점과 밴드 손상 여부를 확인",
        "한 걸음 뒤로 물러나 장력을 가볍게 만들기",
        "어깨를 편안히 내리고 몸통 길게 세우기"
      ],
      "finish": "장력을 천천히 풀고 고정점을 다시 확인한 뒤 손·어깨 반응을 살핍니다.",
      "commonMistakes": [
        "불안정한 고정점 사용",
        "몸통을 젖혀 반동으로 당김",
        "목을 으쓱한 채 반복"
      ],
      "regressions": [
        "더 가벼운 밴드",
        "한 발 앞으로 서서 장력 줄이기",
        "앉은 자세·짧은 범위"
      ],
      "progressions": [
        "반복 품질 뒤 장력 소폭 증가",
        "한쪽씩 당기기",
        "정지 구간 1초 추가"
      ]
    }
  },
  {
    "exercise": {
      "id": "resistance-band-chest-press",
      "name": "저항 밴드 체스트 프레스",
      "englishName": "Resistance Band Chest Press",
      "category": "프리웨이트",
      "regions": [
        "가슴",
        "어깨",
        "팔",
        "코어"
      ],
      "focus": "근력",
      "difficulty": "입문",
      "equipment": "안정적으로 고정한 저항 밴드",
      "minutes": "2–3세트 · 8–15회",
      "description": "등 뒤의 안정된 고정점에서 밴드를 앞으로 밀며 상체 밀기와 몸통 제어를 연습합니다.",
      "cues": [
        "밴드 고정점·손잡이 상태 확인",
        "갈비뼈를 과도하게 들지 않기",
        "팔꿈치를 잠그지 않고 부드럽게 복귀"
      ],
      "benefits": [
        "가슴·팔 근력",
        "서기 자세 제어",
        "가정 밀기 변형"
      ],
      "warning": "어깨 앞쪽 통증·밴드 끊김 위험·불안정한 고정점이 있으면 실시하지 마세요.",
      "reference": {
        "label": "ACSM 2026 저항운동 지침",
        "url": "https://acsm.org/resistance-training-guidelines-update-2026/"
      }
    },
    "detail": {
      "setup": [
        "밴드와 고정점이 손상·이탈 위험 없는지 확인",
        "한 걸음 앞으로 나가 작은 장력부터 만들기",
        "갈비뼈·골반을 편안하게 정렬"
      ],
      "finish": "밴드를 천천히 풀고 고정점·손목·어깨 반응을 확인합니다.",
      "commonMistakes": [
        "밴드 반동으로 팔을 잠금",
        "허리를 과도하게 젖힘",
        "불안정한 고정점 사용"
      ],
      "regressions": [
        "더 가벼운 밴드",
        "한 발 뒤로 장력 줄이기",
        "벽 푸시업"
      ],
      "progressions": [
        "반복 품질 뒤 장력 증가",
        "한쪽씩 프레스",
        "천천히 복귀 구간 추가"
      ]
    }
  },
  {
    "exercise": {
      "id": "resistance-band-lateral-walk",
      "name": "저항 밴드 사이드 워크",
      "englishName": "Resistance Band Lateral Walk",
      "category": "프리웨이트",
      "regions": [
        "둔근",
        "하체",
        "코어"
      ],
      "focus": "협응",
      "difficulty": "입문",
      "equipment": "가벼운 루프 밴드",
      "minutes": "5–8걸음 · 좌우 2–3회",
      "description": "무릎 위 또는 발목 위에 가벼운 밴드를 두고 작은 옆걸음으로 둔근·골반 제어를 연습합니다.",
      "cues": [
        "얕은 무릎 굽힘으로 시작",
        "발끝과 무릎 방향을 자연스럽게 맞추기",
        "보폭을 작게 유지"
      ],
      "benefits": [
        "둔근 활성 보조",
        "측면 보행 제어",
        "한쪽 다리 준비"
      ],
      "warning": "무릎·고관절 통증이나 균형 불안이 있으면 밴드를 빼고 짧은 옆걸음으로 낮추세요.",
      "reference": {
        "label": "ACSM 2026 저항운동 지침",
        "url": "https://acsm.org/resistance-training-guidelines-update-2026/"
      }
    },
    "detail": {
      "setup": [
        "루프 밴드에 균열이 없는지 확인",
        "무릎 위의 가벼운 위치에서 시작",
        "벽·의자 가까이에서 작은 옆걸음 리허설"
      ],
      "finish": "밴드를 천천히 벗고 발목·무릎·고관절 반응을 확인합니다.",
      "commonMistakes": [
        "보폭을 너무 넓게 시작",
        "무릎을 안쪽으로 무너뜨림",
        "발을 끌며 균형 상실"
      ],
      "regressions": [
        "밴드 없이 옆걸음",
        "더 약한 밴드",
        "두세 걸음만 수행"
      ],
      "progressions": [
        "걸음 수 소폭 증가",
        "낮은 반스쿼트 유지",
        "안전한 환경에서 방향 전환"
      ]
    }
  },
  {
    "exercise": {
      "id": "battle-rope-alternating-wave",
      "name": "배틀로프 얼터네이팅 웨이브",
      "englishName": "Battle Rope Alternating Wave",
      "category": "파워·민첩성",
      "regions": [
        "어깨",
        "팔",
        "코어",
        "하체"
      ],
      "focus": "체력",
      "difficulty": "중급",
      "equipment": "안전하게 고정한 배틀로프",
      "minutes": "10–20초 · 2–5회",
      "description": "낮은 반스쿼트 또는 안정된 서기 자세에서 로프를 좌우 번갈아 흔들며 전신 리듬과 짧은 컨디셔닝을 연습합니다.",
      "cues": [
        "로프 고정점과 주변 공간 먼저 확인",
        "낮은 진폭·짧은 구간부터",
        "어깨를 귀에서 멀리 두고 리듬 유지"
      ],
      "benefits": [
        "상체 컨디셔닝",
        "전신 리듬",
        "짧은 심박 자극"
      ],
      "warning": "어지러움·흉통·어깨 통증·기술 붕괴가 나타나면 즉시 멈추고 충분히 회복하세요.",
      "reference": {
        "label": "NSCA 배틀로프 컨디셔닝 안내",
        "url": "https://www.nsca.com/education/articles/ptq/utilizing-battling-rope-exercises-for-hiit-and-smit/"
      }
    },
    "detail": {
      "setup": [
        "로프 고정점·반경·바닥 미끄럼을 먼저 확인",
        "가벼운 반스쿼트 또는 편안한 서기 자세 선택",
        "10초 미만의 작은 진폭으로 리듬 리허설"
      ],
      "finish": "로프를 바닥에 완전히 놓고 짧게 걸으며 호흡과 어깨 반응을 낮춥니다.",
      "commonMistakes": [
        "초반부터 큰 파도와 긴 구간",
        "목을 으쓱하고 팔만 사용",
        "피로 후에도 로프를 제어하지 못함"
      ],
      "regressions": [
        "시티드 웨이브",
        "10초 미만 구간",
        "더 작은 진폭과 긴 휴식"
      ],
      "progressions": [
        "리듬 유지 후 5초만 추가",
        "낮은 반스쿼트 유지",
        "충분히 회복한 날 짧은 양팔 파도"
      ]
    }
  },
  {
    "exercise": {
      "id": "battle-rope-seated-wave",
      "name": "시티드 배틀로프 웨이브",
      "englishName": "Seated Battle Rope Wave",
      "category": "파워·민첩성",
      "regions": [
        "어깨",
        "팔",
        "코어"
      ],
      "focus": "체력",
      "difficulty": "입문",
      "equipment": "안정된 벤치 · 고정한 배틀로프",
      "minutes": "10–15초 · 2–4회",
      "description": "안정된 벤치에 앉아 로프를 작게 흔들며 다리 부담을 줄이고 상체 리듬을 경험하는 쉬운 변형입니다.",
      "cues": [
        "벤치와 로프 고정점 확인",
        "허리를 과도하게 젖히지 않기",
        "짧은 구간 뒤 충분히 쉬기"
      ],
      "benefits": [
        "상체 리듬",
        "그립·어깨 지구력",
        "낮은 하체 부담"
      ],
      "warning": "어깨·목 통증이나 어지러움이 있으면 시도하지 말고 가벼운 밴드 운동으로 바꾸세요.",
      "reference": {
        "label": "NSCA 배틀로프 컨디셔닝 안내",
        "url": "https://www.nsca.com/education/articles/ptq/utilizing-battling-rope-exercises-for-hiit-and-smit/"
      }
    },
    "detail": {
      "setup": [
        "벤치 안정성과 로프 고정점을 확인",
        "발 전체를 바닥에 두고 몸통을 길게 세우기",
        "10초 미만의 작은 파도로 리듬 확인"
      ],
      "finish": "로프를 바닥에 놓고 손·목·어깨의 긴장을 풀며 호흡을 낮춥니다.",
      "commonMistakes": [
        "허리를 젖혀 반동 만들기",
        "목을 으쓱한 채 긴 구간 수행",
        "피로 후에도 큰 진폭 유지"
      ],
      "regressions": [
        "더 작은 진폭",
        "8초 미만 구간",
        "밴드 로우로 전환"
      ],
      "progressions": [
        "리듬 유지 뒤 5초 증가",
        "한 팔씩 짧은 파도",
        "충분히 회복된 날 얼터네이팅 웨이브"
      ]
    }
  },
  {
    "exercise": {
      "id": "low-step-march",
      "name": "로우 스텝 마치",
      "englishName": "Low Step March",
      "category": "균형·협응",
      "regions": [
        "하체",
        "둔근",
        "코어"
      ],
      "focus": "협응",
      "difficulty": "입문",
      "equipment": "낮고 안정된 스텝",
      "minutes": "좌우 5–10회 · 2세트",
      "description": "낮은 스텝 위로 한 발씩 올라 무릎을 가볍게 들어 올린 뒤 천천히 내려오며 계단·균형 리듬을 연습합니다.",
      "cues": [
        "스텝이 흔들리지 않는지 확인",
        "발 전체를 스텝 위에 올리기",
        "필요하면 벽·난간 가까이에서"
      ],
      "benefits": [
        "계단 리듬",
        "한쪽 다리 협응",
        "균형 준비"
      ],
      "warning": "체중 부하 불가·무릎 통증·최근 낙상이 있으면 스텝 대신 평지 마치로 낮추세요.",
      "reference": {
        "label": "CDC 성인 신체 활동 지침",
        "url": "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html"
      }
    },
    "detail": {
      "setup": [
        "낮고 미끄럽지 않은 스텝을 벽·난간 가까이에 놓기",
        "스텝 위에 발 전체를 올리는 동작만 먼저 연습",
        "필요하면 손가락으로 지지대 잡기"
      ],
      "finish": "양발을 바닥에 두고 균형이 안정된 뒤 반대쪽을 시작합니다.",
      "commonMistakes": [
        "스텝 가장자리에 발을 걸침",
        "내려올 때 빠르게 떨어짐",
        "균형을 잃은 채 반복"
      ],
      "regressions": [
        "스텝 없이 제자리 마치",
        "더 낮은 높이",
        "양손 지지"
      ],
      "progressions": [
        "한 손 지지",
        "반복 소폭 증가",
        "정지 균형 1초 추가"
      ]
    }
  }
];
