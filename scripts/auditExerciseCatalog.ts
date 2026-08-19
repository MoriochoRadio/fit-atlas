import { exerciseDetails, getExerciseDetail } from "../client/src/lib/exerciseDetails";
import { exercises } from "../client/src/lib/fitnessData";

type AuditIssue = {
  rule: string;
  ids: string[];
  message: string;
};

const normalize = (value: string) => value
  .toLocaleLowerCase("ko-KR")
  .replace(/[··–—\-–—.,()]/g, " ")
  .replace(/\s+/g, " ")
  .trim();

const findDuplicateGroups = (values: Array<{ id: string; value: string }>) => {
  const groups = new Map<string, string[]>();
  values.forEach(({ id, value }) => {
    const key = normalize(value);
    groups.set(key, [...(groups.get(key) ?? []), id]);
  });
  return [...groups.values()].filter((ids) => ids.length > 1);
};

const issues: AuditIssue[] = [];
const duplicateIds = findDuplicateGroups(exercises.map((exercise) => ({ id: exercise.id, value: exercise.id })));
if (duplicateIds.length) issues.push({ rule: "duplicate-id", ids: duplicateIds.flat(), message: "식별자 중복" });

const duplicateNames = findDuplicateGroups(exercises.map((exercise) => ({ id: exercise.id, value: exercise.name })));
if (duplicateNames.length) issues.push({ rule: "duplicate-name", ids: duplicateNames.flat(), message: "표시 이름 중복" });

const duplicateEnglishNames = findDuplicateGroups(exercises.map((exercise) => ({ id: exercise.id, value: exercise.englishName })));
if (duplicateEnglishNames.length) issues.push({ rule: "duplicate-english-name", ids: duplicateEnglishNames.flat(), message: "영문 이름 중복" });

const malformed = exercises.filter((exercise) => (
  !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(exercise.id)
  || exercise.cues.length < 3
  || exercise.benefits.length < 3
  || exercise.warning.length <= 20
  || !exercise.reference.url.startsWith("https://")
));
if (malformed.length) issues.push({ rule: "metadata-completeness", ids: malformed.map((exercise) => exercise.id), message: "필수 메타데이터 누락 또는 형식 오류" });

const incompleteEffectiveDetails = exercises.filter((exercise) => {
  const detail = getExerciseDetail(exercise);
  return !detail
    || detail.setup.length < 3
    || detail.commonMistakes.length < 3
    || detail.regressions.length < 3
    || detail.progressions.length < 3
    || detail.finish.length <= 20;
});
if (incompleteEffectiveDetails.length) issues.push({ rule: "effective-detail-completeness", ids: incompleteEffectiveDetails.map((exercise) => exercise.id), message: "UI에 제공되는 상세 동작 지식이 누락 또는 불완전" });

const categoryFallbackDetails = exercises.filter((exercise) => !exerciseDetails[exercise.id]);

const generatedCompoundEntries = exercises.filter((exercise) => exercise.id.startsWith("atlas13-"));
if (generatedCompoundEntries.length) {
  issues.push({
    rule: "generated-compound-entry",
    ids: generatedCompoundEntries.map((exercise) => exercise.id),
    message: "운동 종목이 아니라 코칭 방식·세트 구조를 기계적으로 결합한 항목",
  });
}

const categoryCounts = Object.fromEntries(
  Object.entries(exercises.reduce<Record<string, number>>((counts, exercise) => {
    counts[exercise.category] = (counts[exercise.category] ?? 0) + 1;
    return counts;
  }, {})).sort(([left], [right]) => left.localeCompare(right, "ko-KR")),
);

const summary = {
  totalExercises: exercises.length,
  categoryCounts,
  manualExerciseEntries: exercises.length - generatedCompoundEntries.length,
  generatedCompoundEntries: generatedCompoundEntries.length,
  duplicateIdGroups: duplicateIds.length,
  duplicateNameGroups: duplicateNames.length,
  duplicateEnglishNameGroups: duplicateEnglishNames.length,
  malformedMetadata: malformed.length,
  incompleteEffectiveDetails: incompleteEffectiveDetails.length,
  categoryFallbackDetails: categoryFallbackDetails.length,
  categoryFallbackSample: categoryFallbackDetails.slice(0, 20).map((exercise) => exercise.id),
  issues,
};

console.log(JSON.stringify(summary, null, 2));
