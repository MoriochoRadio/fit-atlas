export type RecoveryContext = "none" | "reduced_readiness" | "pregnancy_postpartum";

export type ProfilePreferences = {
  age: string;
  weightKg: string;
  sex: string;
  primaryGoal: string;
  experience: string;
  recoveryContext: string;
};

export const defaultProfilePreferences: ProfilePreferences = {
  age: "",
  weightKg: "",
  sex: "undisclosed",
  primaryGoal: "strength",
  experience: "beginner",
  recoveryContext: "none",
};

export function readProfilePreferences(serialized: string | null): ProfilePreferences {
  try {
    const parsed = serialized ? JSON.parse(serialized) : {};
    return { ...defaultProfilePreferences, ...parsed };
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
