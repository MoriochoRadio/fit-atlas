// @vitest-environment jsdom
import { createElement } from "react";
import * as ReactRuntime from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import Home from "./Home";

Object.assign(globalThis, { React: ReactRuntime });

vi.mock("sonner", () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

const squat = {
  id: "seed-squat",
  date: "2026-08-24",
  exercise: "바벨 백 스쿼트",
  sets: 4,
  reps: 6,
  load: 60,
  minutes: 42,
  intensity: 7,
};
const pullup = {
  id: "seed-pullup",
  date: "2026-08-22",
  exercise: "풀업",
  sets: 3,
  reps: 5,
  load: 0,
  minutes: 20,
  intensity: 6,
};

function openTrainingLog() {
  const topbar = document.querySelector(".topbar") as HTMLElement;
  fireEvent.click(within(topbar).getByRole("button", { name: /운동 기록/ }));
}

function fieldValue(label: string) {
  const form = document.querySelector(".log-form") as HTMLElement;
  const field = [...form.querySelectorAll("label")].find(item =>
    item.textContent?.trim().startsWith(label)
  );
  return (field?.querySelector("input, select") as HTMLInputElement | null)
    ?.value;
}

describe("Home training log entry", () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.history.replaceState(null, "", "#top");
    Object.defineProperty(Element.prototype, "scrollIntoView", {
      configurable: true,
      value: vi.fn(),
    });
  });

  afterEach(() => cleanup());

  it("offers no recent-exercise shortcut before anything has been logged", () => {
    render(createElement(Home));
    openTrainingLog();
    expect(document.querySelector(".log-recent-exercises")).toBeNull();
  });

  it("opens a blank log already filled with the last entry for that exercise", () => {
    window.localStorage.setItem(
      "fit-atlas-logs",
      JSON.stringify([squat, pullup])
    );
    render(createElement(Home));
    openTrainingLog();

    expect(fieldValue("세트")).toBe("4");
    expect(fieldValue("횟수")).toBe("6");
    expect(fieldValue("중량")).toBe("60");
    expect(fieldValue("운동 시간")).toBe("42");
  });

  it("refills the whole form when another recent exercise is picked", () => {
    window.localStorage.setItem(
      "fit-atlas-logs",
      JSON.stringify([squat, pullup])
    );
    render(createElement(Home));
    openTrainingLog();

    const picker = document.querySelector(
      ".log-recent-exercises"
    ) as HTMLElement;
    expect(
      [...picker.querySelectorAll("button")].map(button =>
        button.textContent?.trim()
      )
    ).toEqual(["바벨 백 스쿼트", "풀업"]);

    fireEvent.click(within(picker).getByRole("button", { name: "풀업" }));

    expect(fieldValue("세트")).toBe("3");
    expect(fieldValue("횟수")).toBe("5");
    expect(fieldValue("운동 시간")).toBe("20");
  });

  it("says how the entry differs from the last time that exercise was logged", () => {
    window.localStorage.setItem("fit-atlas-logs", JSON.stringify([squat]));
    render(createElement(Home));
    openTrainingLog();

    expect(document.querySelector(".log-change-hint")?.textContent).toContain(
      "2026-08-24 기록과 같은 구성입니다."
    );

    const form = document.querySelector(".log-form") as HTMLElement;
    const loadField = [...form.querySelectorAll("label")]
      .find(item => item.textContent?.trim().startsWith("중량"))
      ?.querySelector("input") as HTMLInputElement;
    fireEvent.change(loadField, { target: { value: "65" } });

    expect(document.querySelector(".log-change-hint")?.textContent).toContain(
      "중량 60 → 65"
    );
  });
});
