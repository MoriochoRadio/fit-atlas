// @vitest-environment jsdom
import { createElement } from "react";
import * as ReactRuntime from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  cleanup,
  fireEvent,
  render,
  within,
} from "@testing-library/react";
import Home from "./Home";

Object.assign(globalThis, { React: ReactRuntime });

vi.mock("sonner", () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

function goToScene(hash: string) {
  fireEvent.click(document.querySelector(`a[href="${hash}"]`) as HTMLElement);
}

describe("Home daily check-in", () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.history.replaceState(null, "", "#top");
    Object.defineProperty(Element.prototype, "scrollIntoView", {
      configurable: true,
      value: vi.fn(),
    });
  });

  afterEach(() => cleanup());

  it("records nothing just because the app was opened", () => {
    render(createElement(Home));
    expect(window.localStorage.getItem("fit-atlas-daily-checkin")).toBeNull();
    expect(
      JSON.parse(
        window.localStorage.getItem("fit-atlas-rom-status-history") ?? "[]"
      )
    ).toEqual([]);
  });

  it("shows the weekly dashboard as awaiting input for a visitor who never checked in", () => {
    render(createElement(Home));
    goToScene("#progress");
    const dashboard = document.querySelector(
      ".rom-status-dashboard"
    ) as HTMLElement;
    expect(within(dashboard).getByText("0/7")).toBeTruthy();
    expect(
      [...dashboard.querySelectorAll(".rom-status-week article")].every(day =>
        day.textContent?.includes("입력")
      )
    ).toBe(true);
  });

  it("starts recording once a check-in slider is actually moved", () => {
    render(createElement(Home));
    goToScene("#session");
    const slider = document.querySelector(
      ".checkin-controls input[type='range']"
    ) as HTMLInputElement;
    fireEvent.change(slider, { target: { value: "5" } });

    const stored = JSON.parse(
      window.localStorage.getItem("fit-atlas-daily-checkin") ?? "null"
    );
    expect(stored?.energy).toBe(5);
    expect(
      JSON.parse(
        window.localStorage.getItem("fit-atlas-rom-status-history") ?? "[]"
      )
    ).toHaveLength(1);
  });

  it("keeps a check-in saved on an earlier visit", () => {
    const today = new Date().toISOString().slice(0, 10);
    window.localStorage.setItem(
      "fit-atlas-daily-checkin",
      JSON.stringify({ date: today, energy: 2, sleep: 2, stress: 4, pain: 3 })
    );
    render(createElement(Home));
    goToScene("#progress");
    const dashboard = document.querySelector(
      ".rom-status-dashboard"
    ) as HTMLElement;
    expect(within(dashboard).getByText("1/7")).toBeTruthy();
  });
});

describe("Home backup safety", () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.history.replaceState(null, "", "#top");
    Object.defineProperty(Element.prototype, "scrollIntoView", {
      configurable: true,
      value: vi.fn(),
    });
  });

  afterEach(() => cleanup());

  it("reaches backup and import from the mobile menu, not only the desktop bar", () => {
    render(createElement(Home));
    const nav = document.querySelector(".topbar nav") as HTMLElement;
    expect(within(nav).getByRole("button", { name: "기록 백업" })).toBeTruthy();
    expect(within(nav).getByText("백업 가져오기")).toBeTruthy();
    expect(within(nav).getByRole("button", { name: "내 프로필" })).toBeTruthy();
  });

  it("asks before an import replaces what is already stored", async () => {
    const confirmSpy = vi
      .spyOn(window, "confirm")
      .mockImplementation(() => false);
    render(createElement(Home));

    const input = document
      .querySelector(".topbar-actions label")
      ?.querySelector("input[type='file']") as HTMLInputElement;
    const backup = {
      version: 5,
      exportedAt: "2026-08-20T00:00:00.000Z",
      logs: [],
      profile: {},
      checkin: { date: "2026-08-20", energy: 3, sleep: 3, stress: 3, pain: 1 },
      weeklyPlan: { weekStart: "2026-08-17", goal: "all_round", sessions: [] },
      explorePreferences: {},
      romStatusHistory: [],
      atlasInteraction: {},
    };
    const file = new File([JSON.stringify(backup)], "backup.json", {
      type: "application/json",
    });
    Object.defineProperty(input, "files", { value: [file] });
    fireEvent.change(input);
    await Promise.resolve();
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(confirmSpy).toHaveBeenCalled();
    confirmSpy.mockRestore();
  });
});
