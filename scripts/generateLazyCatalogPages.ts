import fs from "node:fs";
import path from "node:path";
import { exercises, recoveryGuides, wellnessCards } from "../client/src/lib/fitnessData";
import { getExerciseDetail } from "../client/src/lib/exerciseDetails";
import { verifiedActualExerciseDetailsPart14, verifiedActualExercisesPart14 } from "../client/src/lib/verifiedActualExercisesPart14";
import { isIndependentCatalogExercise } from "../client/src/lib/catalogQualityRules";

const projectRoot = path.resolve(import.meta.dirname, "..");
const catalogDirectory = path.join(projectRoot, "client", "src", "lib");
const pageSize = 100;

const serialize = (value: unknown) => JSON.stringify(value, null, 2);
const toPageName = (pageIndex: number) => `catalogPage${String(pageIndex + 1).padStart(2, "0")}`;

const manuallyCuratedEntries = exercises
  .filter((exercise) => !exercise.id.startsWith("verified-") && isIndependentCatalogExercise(exercise))
  .map((exercise) => ({ exercise, detail: getExerciseDetail(exercise) }));
const verifiedEntries = verifiedActualExercisesPart14.map((exercise) => ({ exercise, detail: verifiedActualExerciseDetailsPart14[exercise.id] }));
const entries = [...manuallyCuratedEntries, ...verifiedEntries];
if (entries.length !== 1000) throw new Error(`Expected 1,000 catalog entries, received ${entries.length}.`);

const pageCount = Math.ceil(entries.length / pageSize);
for (let pageIndex = 0; pageIndex < pageCount; pageIndex += 1) {
  const pageName = toPageName(pageIndex);
  const pageEntries = entries.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
  const source = `import type { CatalogEntry } from "./catalogTypes";\n\nexport const ${pageName}: CatalogEntry[] = ${serialize(pageEntries)};\n`;
  fs.writeFileSync(path.join(catalogDirectory, `${pageName}.ts`), source);
}

const contentSource = `import type { BodyRegion } from "./catalogTypes";\n\nexport const recoveryGuides: Record<BodyRegion, { title: string; intro: string; steps: string[]; caution: string }> = ${serialize(recoveryGuides)};\n\nexport const wellnessCards = ${serialize(wellnessCards)};\n`;
fs.writeFileSync(path.join(catalogDirectory, "catalogContent.ts"), contentSource);

const pageByExerciseId = Object.fromEntries(entries.map(({ exercise }, index) => [exercise.id, Math.floor(index / pageSize)]));
fs.writeFileSync(path.join(catalogDirectory, "catalogPageIndex.ts"), `export const catalogPageByExerciseId: Record<string, number> = ${serialize(pageByExerciseId)};\n`);

console.log(`Generated ${pageCount} lazy catalog pages with ${pageSize} entries each at ${catalogDirectory}.`);
