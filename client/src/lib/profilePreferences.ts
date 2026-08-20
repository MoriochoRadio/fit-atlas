export type RecoveryContext = "none" | "reduced_readiness" | "pregnancy_postpartum";

export const preferredCategoryOptions = ["전체", "러닝", "유산소", "헬스기구", "프리웨이트", "맨몸운동", "모빌리티", "균형·협응", "요가·필라테스", "파워·민첩성"] as const;
export const preferredEquipmentOptions = ["flexible", "bodyweight", "basic_home", "gym"] as const;
export const preferredEnvironmentOptions = ["home", "gym", "outdoor"] as const;

export type PreferredCategory = (typeof preferredCategoryOptions)[number];
export type PreferredEquipment = (typeof preferredEquipmentOptions)[number];
export type PreferredEnvironment = (typeof preferredEnvironmentOptions)[number];

export type ProfilePreferences = {
  age: string;
  weightKg: string;
  sex: string;
  primaryGoal: string;
  experience: string;
  recoveryContext: string;
  preferredCategory: PreferredCategory;
  preferredEquipment: PreferredEquipment;
  preferredEnvironment: PreferredEnvironment;
};

export const defaultProfilePreferences: ProfilePreferences = {
  age: "",
  weightKg: "",
  sex: "undisclosed",
  primaryGoal: "strength",
  experience: "beginner",
  recoveryContext: "none",
  preferredCategory: "전체",
  preferredEquipment: "flexible",
  preferredEnvironment: "home",
};

export function readProfilePreferences(serialized: string | null): ProfilePreferences {
  try {
    const parsed = serialized ? JSON.parse(serialized) as Partial<ProfilePreferences> : {};
    const candidate = { ...defaultProfilePreferences, ...parsed };
    return {
      ...candidate,
      preferredCategory: preferredCategoryOptions.includes(candidate.preferredCategory as PreferredCategory) ? candidate.preferredCategory as PreferredCategory : defaultProfilePreferences.preferredCategory,
      preferredEquipment: preferredEquipmentOptions.includes(candidate.preferredEquipment as PreferredEquipment) ? candidate.preferredEquipment as PreferredEquipment : defaultProfilePreferences.preferredEquipment,
      preferredEnvironment: preferredEnvironmentOptions.includes(candidate.preferredEnvironment as PreferredEnvironment) ? candidate.preferredEnvironment as PreferredEnvironment : defaultProfilePreferences.preferredEnvironment,
    };
  } catch {
    return defaultProfilePreferences;
  }
}

export function mergeAccountProfile(current: ProfilePreferences, profile: {
  age: number | null;
  weightKg: string | number | null;
  sex: "female" | "male" | "nonbinary" | "undisclosed";
  primaryGoal: "strength" | "endurance" | "weight_management" | "general_health";
  experience: "beginner" | "intermediate" | "advanced";
  recoveryContext: RecoveryContext;
}): ProfilePreferences {
  return {
    ...current,
    age: profile.age ? String(profile.age) : "",
    weightKg: profile.weightKg ? String(profile.weightKg) : "",
    sex: profile.sex,
    primaryGoal: profile.primaryGoal,
    experience: profile.experience,
    recoveryContext: profile.recoveryContext,
  };
}
