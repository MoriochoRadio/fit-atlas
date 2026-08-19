import { describe, expect, it } from "vitest";
import { entriesToExercises, getCatalogPageCount, getInitialCatalogEntries, loadCatalogPage, loadFullCatalog } from "./catalogLoader";

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

  it("reconstructs the 1,000-item catalog without duplicate exercise ids when a full search is requested", async () => {
    const entries = await loadFullCatalog();
    const ids = entriesToExercises(entries).map((exercise) => exercise.id);
    expect(entries).toHaveLength(1000);
    expect(new Set(ids).size).toBe(1000);
  });
});
