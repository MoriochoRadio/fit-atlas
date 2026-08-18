// @vitest-environment jsdom
import { createElement } from "react";
import * as ReactRuntime from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import Home from "./Home";

Object.assign(globalThis, { React: ReactRuntime });

vi.mock("sonner", () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

describe("Home recovery alternative flow", () => {
  const scrollIntoView = vi.fn();

  beforeEach(() => {
    window.localStorage.clear();
    scrollIntoView.mockReset();
    Object.defineProperty(Element.prototype, "scrollIntoView", { configurable: true, value: scrollIntoView });
  });

  afterEach(() => cleanup());

  it("updates the Home search and region filter, then scrolls to the library when a pathway alternative is clicked", () => {
    render(createElement(Home));
    fireEvent.click(screen.getByRole("button", { name: "발목 불편" }));
    fireEvent.click(screen.getByRole("button", { name: /발목 니투월 락/ }));

    expect((screen.getByLabelText("운동 검색") as HTMLInputElement).value).toBe("발목 니투월 락");
    expect((screen.getByLabelText("부위 필터") as HTMLSelectElement).value).toBe("하체");
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });
  });
});
