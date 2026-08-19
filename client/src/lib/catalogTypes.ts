export type BodyRegion = "가슴" | "등" | "어깨" | "팔" | "코어" | "둔근" | "하체";

export type ExerciseCategory = "러닝" | "유산소" | "헬스기구" | "프리웨이트" | "맨몸운동" | "모빌리티" | "균형·협응" | "요가·필라테스" | "파워·민첩성";

export type Exercise = {
  id: string;
  name: string;
  englishName: string;
  category: ExerciseCategory;
  regions: BodyRegion[];
  focus: "근력" | "체력" | "심폐" | "가동성" | "균형" | "협응" | "파워";
  difficulty: "입문" | "중급" | "상급";
  equipment: string;
  minutes: string;
  description: string;
  cues: string[];
  benefits: string[];
  warning: string;
  reference: { label: string; url: string };
};

export type ExerciseDetail = {
  setup: string[];
  commonMistakes: string[];
  regressions: string[];
  progressions: string[];
  finish: string;
};

export type CatalogEntry = {
  exercise: Exercise;
  detail: ExerciseDetail;
};
