import { describe, expect, it } from "vitest";
import { getRoutineTemplate, routineTemplates } from "./routineTemplates";

describe("routine templates", () => {
  it("covers all four primary goals with a safe four-week structure", () => {
    expect(routineTemplates.map(item => item.goal)).toEqual([
      "strength",
      "endurance",
      "weight_management",
      "general_health",
    ]);
    routineTemplates.forEach(template => {
      expect(template.weeks).toHaveLength(4);
      expect(template.weeks.map(week => week.week)).toEqual([1, 2, 3, 4]);
      template.weeks.forEach(week =>
        expect(week.focus.length).toBeGreaterThanOrEqual(3)
      );
    });
  });

  it("returns the selected goal template", () => {
    expect(getRoutineTemplate("endurance").title).toContain("심폐");
  });
});
