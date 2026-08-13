export type PersonalizationProfile = {
  age: number | null;
  weightKg: number | null;
  sex: "female" | "male" | "nonbinary" | "undisclosed";
  primaryGoal: "strength" | "endurance" | "weight_management" | "general_health";
  experience: "beginner" | "intermediate" | "advanced";
};

export type PersonalizedProgram = {
  title: string;
  note: string;
  recommendations: string[];
  sessionsPerWeek: string;
  targetRpe: string;
  personalizationNote: string;
  sexConsideration: string;
};

const basePrograms = {
  strength: { title: "기초 근력을 설계하세요.", note: "주요 움직임 패턴을 균형 있게 익히며 부하를 점진적으로 올립니다.", recommendations: ["바벨 백 스쿼트", "시티드 케이블 로우", "푸시업"] },
  endurance: { title: "지속 가능한 심폐 기반을 만드세요.", note: "대화 가능한 강도의 유산소 시간을 먼저 일관되게 쌓습니다.", recommendations: ["이지 러닝", "스테디 사이클", "데드 버그"] },
  weight_management: { title: "움직임과 근력의 균형을 잡으세요.", note: "극단적 제한보다 근력 활동과 일상 활동을 함께 이어갑니다.", recommendations: ["스테디 사이클", "푸시업", "덤벨 루마니안 데드리프트"] },
  general_health: { title: "전신 활동의 기반을 만드세요.", note: "근력과 심폐 활동을 함께 배치하고 회복 가능한 리듬을 우선합니다.", recommendations: ["스테디 사이클", "시티드 케이블 로우", "데드 버그"] },
} as const;

const experienceSettings = {
  beginner: { sessionsPerWeek: "주 2회", targetRpe: "RPE 4–6", note: "작은 운동량에서 자세와 다음 날 회복 반응을 먼저 확인합니다." },
  intermediate: { sessionsPerWeek: "주 3회", targetRpe: "RPE 5–7", note: "한 번에 크게 늘리기보다 주간 운동량을 점진적으로 조절합니다." },
  advanced: { sessionsPerWeek: "주 3–4회", targetRpe: "RPE 6–8", note: "부하뿐 아니라 세트 품질과 회복 지표를 함께 점검합니다." },
} as const;

export function getPersonalizedProgram(profile: PersonalizationProfile): PersonalizedProgram {
  const base = basePrograms[profile.primaryGoal];
  const experience = experienceSettings[profile.experience];
  const lowImpactStart = (profile.age !== null && profile.age >= 60) || (profile.weightKg !== null && profile.weightKg >= 100);
  const recommendations = [...base.recommendations];
  let personalizationNote: string = experience.note;

  if (lowImpactStart) {
    const runIndex = recommendations.indexOf("이지 러닝");
    if (runIndex >= 0) recommendations[runIndex] = "스테디 사이클";
    else if (!recommendations.includes("스테디 사이클")) recommendations[0] = "스테디 사이클";
    personalizationNote = profile.age !== null && profile.age >= 60
      ? "연령 설정을 반영해 균형·가동성·저충격 유산소 운동을 우선하고, 회복일을 충분히 둡니다."
      : "체중 설정을 반영해 관절 충격을 낮춘 유산소 옵션부터 시작하고, 자각 강도와 통증 반응에 따라 진행합니다.";
  }

  const sexConsideration = {
    female: "성별만으로 시작 부하를 낮추거나 운동을 제한하지 않습니다. 컨디션·통증·회복 반응을 기준으로 조절하세요.",
    male: "성별만으로 시작 부하를 높이지 않습니다. 컨디션·통증·회복 반응을 기준으로 조절하세요.",
    nonbinary: "성별 이분법 가정 없이 경험·자각 강도·회복 반응을 기준으로 시작안을 조절합니다.",
    undisclosed: "성별 정보는 선택 사항입니다. 시작안은 경험·자각 강도·회복 반응을 기준으로 설계합니다.",
  }[profile.sex];

  return { ...base, recommendations, sessionsPerWeek: experience.sessionsPerWeek, targetRpe: lowImpactStart ? "RPE 3–5" : experience.targetRpe, personalizationNote, sexConsideration };
}
