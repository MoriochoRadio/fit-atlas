import { describe, expect, it } from "vitest";
import { wellnessCards } from "./fitnessData";
import { wellnessDetails } from "./wellnessDetails";

describe("wellness detail knowledge", () => {
  it("provides practical, training-context, and safety guidance for every wellness card", () => {
    expect(Object.keys(wellnessDetails).sort()).toEqual(wellnessCards.map((card) => card.title).sort());
    Object.values(wellnessDetails).forEach((detail) => {
      expect(detail.practices).toHaveLength(3);
      expect(detail.trainingContext).toHaveLength(2);
      expect(detail.caution.length).toBeGreaterThan(30);
    });
  });
});
