import { exercises } from "../client/src/lib/fitnessData";
import { getExerciseDetail } from "../client/src/lib/exerciseDetails";

const unsafeNamePattern = /(?:behind(?: the)? neck|neck bridge|neck harness|judo flip|atlas stone|car deadlift|partner|with chains|with bands)/i;
const structuredTrainingPattern = /(?:negative|partial rep|tempo|pause rep|interval|circuit|progression|ladder|repeat|cadence)/i;
const genericDescriptionSuffix = "실제 운동 종목입니다.";

const references = exercises.reduce<Record<string, number>>((result, exercise) => {
  result[exercise.reference.url] = (result[exercise.reference.url] ?? 0) + 1;
  return result;
}, {});

const detailFingerprints = exercises.reduce<Record<string, string[]>>((result, exercise) => {
  const detail = getExerciseDetail(exercise);
  const fingerprint = JSON.stringify({
    warning: exercise.warning,
    setup: detail.setup.map((item) => item.replace(exercise.name, "{name}").replace(exercise.equipment, "{equipment}")),
    mistakes: detail.commonMistakes.map((item) => item.replace(exercise.name, "{name}")),
  });
  result[fingerprint] = [...(result[fingerprint] ?? []), exercise.id];
  return result;
}, {});

const repeatedDetailProfiles = Object.values(detailFingerprints).filter((ids) => ids.length > 1);
const genericProfiles = exercises.filter((exercise) => exercise.description.endsWith(genericDescriptionSuffix));
const unsafeNameCandidates = exercises.filter((exercise) => unsafeNamePattern.test(exercise.englishName));
const structuredTrainingEntries = exercises.filter((exercise) => structuredTrainingPattern.test(exercise.englishName));
const missingKoreanNameCandidates = exercises.filter((exercise) => !/[가-힣]/.test(exercise.name));

console.log(JSON.stringify({
  totalExercises: exercises.length,
  verifiedSourceEntries: exercises.filter((exercise) => exercise.id.startsWith("verified-")).length,
  manuallyCuratedEntries: exercises.filter((exercise) => !exercise.id.startsWith("verified-")).length,
  unsafeNameCandidates: unsafeNameCandidates.map(({ id, name, englishName }) => ({ id, name, englishName })),
  structuredTrainingEntries: structuredTrainingEntries.map(({ id, name, englishName }) => ({ id, name, englishName })),
  missingKoreanNameCandidates: missingKoreanNameCandidates.map(({ id, name, englishName }) => ({ id, name, englishName })),
  genericProfiles: genericProfiles.length,
  repeatedDetailProfileGroups: repeatedDetailProfiles.length,
  largestRepeatedDetailProfile: Math.max(0, ...repeatedDetailProfiles.map((ids) => ids.length)),
  references,
}, null, 2));
