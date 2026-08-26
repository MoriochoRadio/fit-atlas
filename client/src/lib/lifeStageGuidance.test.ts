import { describe, expect, it } from "vitest";
import { lifeStageGuides, startChecklist } from "./lifeStageGuidance";

describe("life-stage general guidance", () => {
  it("keeps general, non-prescriptive guidance and pre-exercise checks", () => {
    expect(lifeStageGuides).toHaveLength(4);
    expect(lifeStageGuides.map(guide => guide.id)).toEqual(
      expect.arrayContaining([
        "young-adult",
        "midlife",
        "older-adult",
        "postpartum-general",
      ])
    );
    lifeStageGuides.forEach(guide => {
      expect(guide.start).toHaveLength(3);
      expect(guide.adjust.length).toBeGreaterThanOrEqual(2);
      expect(guide.stop.join(" ").length).toBeGreaterThan(15);
    });
    expect(startChecklist).toHaveLength(5);
  });
});
