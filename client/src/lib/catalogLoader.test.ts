import { describe, expect, it } from "vitest";
import { entriesToExercises, getCatalogPageCount, getInitialCatalogEntries, loadCatalogEntriesByIds, loadCatalogPage, loadFullCatalog } from "./catalogLoader";

describe("lazy exercise catalog loader", () => {
  it("starts with one bounded page and exposes the complete page count", () => {
    expect(getCatalogPageCount()).toBe(10);
    expect(getInitialCatalogEntries()).toHaveLength(100);
  });

  it("loads later pages independently with matching exercise-detail pairs", async () => {
    const secondPage = await loadCatalogPage(1);
    expect(secondPage).toHaveLength(100);
    expect(secondPage[0].exercise.id).not.toBe(getInitialCatalogEntries()[0].exercise.id);
    expect(secondPage.every(({ exercise, detail }) => exercise.id.length > 0 && detail.setup.length >= 3)).toBe(true);
  });

  it("resolves saved exercise ids in the requested order without loading an unknown entry", async () => {
    const first = getInitialCatalogEntries()[0];
    const later = (await loadCatalogPage(1))[0];
    const saved = await loadCatalogEntriesByIds([later.exercise.id, "not-a-real-exercise", first.exercise.id]);
    expect(saved.map(({ exercise }) => exercise.id)).toEqual([later.exercise.id, first.exercise.id]);
  });

  it("reconstructs the 1,000-item catalog without duplicate exercise ids when a full search is requested", async () => {
    const entries = await loadFullCatalog();
    const ids = entriesToExercises(entries).map((exercise) => exercise.id);
    expect(entries).toHaveLength(1000);
    expect(new Set(ids).size).toBe(1000);
  });
});
