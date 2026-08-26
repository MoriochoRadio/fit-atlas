import { describe, expect, it } from "vitest";
import {
  catalogSummary,
  entriesToExercises,
  getCatalogPageCount,
  getInitialCatalogEntries,
  loadCatalogEntriesByIds,
  loadCatalogPage,
  loadFullCatalog,
} from "./catalogLoader";

describe("lazy exercise catalog loader", () => {
  it("starts with one bounded page and exposes the complete page count", () => {
    expect(getCatalogPageCount()).toBe(11);
    // 중복 정리로 페이지마다 항목 수가 조금씩 달라졌다. 한 페이지가 pageSize를
    // 넘지 않는다는 것과 첫 페이지가 비어 있지 않다는 것만 보장하면 된다.
    expect(getInitialCatalogEntries().length).toBeGreaterThan(0);
    expect(getInitialCatalogEntries().length).toBeLessThanOrEqual(
      catalogSummary.pageSize
    );
  });

  it("loads later pages independently with matching exercise-detail pairs", async () => {
    const secondPage = await loadCatalogPage(1);
    expect(secondPage.length).toBeGreaterThan(0);
    expect(secondPage.length).toBeLessThanOrEqual(catalogSummary.pageSize);
    expect(secondPage[0].exercise.id).not.toBe(
      getInitialCatalogEntries()[0].exercise.id
    );
    expect(
      secondPage.every(
        ({ exercise, detail }) =>
          exercise.id.length > 0 && detail.setup.length >= 3
      )
    ).toBe(true);
  });

  it("loads the compact eleventh page with complete detail pairs", async () => {
    const finalPage = await loadCatalogPage(10);
    expect(finalPage).toHaveLength(8);
    expect(
      finalPage.every(
        ({ detail }) =>
          detail.commonMistakes.length >= 3 && detail.regressions.length >= 3
      )
    ).toBe(true);
  });

  it("resolves non-contact racket and combat starter drills by id from their lazy catalog pages", async () => {
    const additions = await loadCatalogEntriesByIds([
      "tennis-ready-split-step-easy",
      "boxing-guard-step-reset-easy",
    ]);
    expect(additions.map(({ exercise }) => exercise.id)).toEqual([
      "tennis-ready-split-step-easy",
      "boxing-guard-step-reset-easy",
    ]);
    expect(
      additions.every(
        ({ detail }) =>
          detail.setup.length === 3 && detail.progressions.length === 3
      )
    ).toBe(true);
  });

  it("resolves saved exercise ids in the requested order without loading an unknown entry", async () => {
    const first = getInitialCatalogEntries()[0];
    const later = (await loadCatalogPage(1))[0];
    const saved = await loadCatalogEntriesByIds([
      later.exercise.id,
      "not-a-real-exercise",
      first.exercise.id,
    ]);
    expect(saved.map(({ exercise }) => exercise.id)).toEqual([
      later.exercise.id,
      first.exercise.id,
    ]);
  });

  it("reconstructs the complete catalog without duplicate exercise ids when a full search is requested", async () => {
    const entries = await loadFullCatalog();
    const ids = entriesToExercises(entries).map(exercise => exercise.id);
    expect(entries).toHaveLength(catalogSummary.exerciseCount);
    expect(new Set(ids).size).toBe(catalogSummary.exerciseCount);
  });
});
