import { catalogPage01 } from "./catalogPage01";
import { catalogPageByExerciseId } from "./catalogPageIndex";
import type { CatalogEntry, Exercise } from "./catalogTypes";

export const catalogSummary = { exerciseCount: 1008, categoryCount: 9, pageSize: 100 } as const;

type CatalogPageLoader = () => Promise<{ default?: CatalogEntry[]; [key: string]: unknown }>;

const dynamicPageLoaders: CatalogPageLoader[] = [
  () => Promise.resolve({ catalogPage01 }),
  () => import("./catalogPage02"),
  () => import("./catalogPage03"),
  () => import("./catalogPage04"),
  () => import("./catalogPage05"),
  () => import("./catalogPage06"),
  () => import("./catalogPage07"),
  () => import("./catalogPage08"),
  () => import("./catalogPage09"),
  () => import("./catalogPage10"),
  () => import("./catalogPage11"),
];

const pageCache = new Map<number, CatalogEntry[]>([[0, catalogPage01]]);

function getModuleEntries(module: { [key: string]: unknown }, pageIndex: number): CatalogEntry[] {
  const key = `catalogPage${String(pageIndex + 1).padStart(2, "0")}`;
  const entries = module[key];
  if (!Array.isArray(entries)) throw new Error(`카탈로그 페이지 ${pageIndex + 1}을 읽지 못했습니다.`);
  return entries as CatalogEntry[];
}

export const getCatalogPageCount = () => dynamicPageLoaders.length;
export const getInitialCatalogEntries = () => catalogPage01;

export async function loadCatalogPage(pageIndex: number): Promise<CatalogEntry[]> {
  const cached = pageCache.get(pageIndex);
  if (cached) return cached;
  const loadedModule = await dynamicPageLoaders[pageIndex]();
  const entries = getModuleEntries(loadedModule, pageIndex);
  pageCache.set(pageIndex, entries);
  return entries;
}

export async function loadFullCatalog(): Promise<CatalogEntry[]> {
  const pages = await Promise.all(Array.from({ length: getCatalogPageCount() }, (_, pageIndex) => loadCatalogPage(pageIndex)));
  return pages.flat();
}

export async function loadCatalogEntriesByIds(exerciseIds: string[]): Promise<CatalogEntry[]> {
  const requestedIds = Array.from(new Set(exerciseIds));
  const pageIndexes = Array.from(new Set(requestedIds.map((id) => catalogPageByExerciseId[id]).filter((pageIndex): pageIndex is number => Number.isInteger(pageIndex))));
  const pages = await Promise.all(pageIndexes.map((pageIndex) => loadCatalogPage(pageIndex)));
  const entriesById = new Map(pages.flat().map((entry) => [entry.exercise.id, entry]));
  return requestedIds.flatMap((id) => {
    const entry = entriesById.get(id);
    return entry ? [entry] : [];
  });
}

export const entriesToExercises = (entries: CatalogEntry[]): Exercise[] => entries.map(({ exercise }) => exercise);
