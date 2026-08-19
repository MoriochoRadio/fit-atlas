import { catalogPage01 } from "./catalogPage01";
import { catalogPage02 } from "./catalogPage02";
import { catalogPage03 } from "./catalogPage03";
import { catalogPage04 } from "./catalogPage04";
import { catalogPage05 } from "./catalogPage05";
import { catalogPage06 } from "./catalogPage06";
import { catalogPage07 } from "./catalogPage07";
import { catalogPage08 } from "./catalogPage08";
import { catalogPage09 } from "./catalogPage09";
import { catalogPage10 } from "./catalogPage10";
import { catalogPage11 } from "./catalogPage11";

export type { BodyRegion, Exercise, ExerciseCategory } from "./catalogTypes";
export { recoveryGuides, wellnessCards } from "./catalogContent";

export const exercises = [
  ...catalogPage01,
  ...catalogPage02,
  ...catalogPage03,
  ...catalogPage04,
  ...catalogPage05,
  ...catalogPage06,
  ...catalogPage07,
  ...catalogPage08,
  ...catalogPage09,
  ...catalogPage10,
  ...catalogPage11,
].map(({ exercise }) => exercise);
