// @vitest-environment jsdom
import { createElement } from "react";
import * as ReactRuntime from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
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

  it("renders distance units and the four-week rhythm card in the local record experience", () => {
    render(createElement(Home));
    fireEvent.click(screen.getByRole("button", { name: /운동 기록/ }));
    expect(screen.getByText("4-WEEK RHYTHM")).toBeTruthy();
    expect(screen.getByText("거리 · 선택")).toBeTruthy();
    expect(screen.getByRole("option", { name: "km" })).toBeTruthy();
    expect(screen.getByRole("option", { name: "m" })).toBeTruthy();
  });

  it("renders all four conservative cardio interval templates", () => {
    render(createElement(Home));
    expect(screen.getByText("CARDIO INTERVALS")).toBeTruthy();
    expect(screen.getAllByText("걷기·달리기 인터벌").length).toBeGreaterThan(0);
    expect(screen.getAllByText("사이클 리듬 인터벌").length).toBeGreaterThan(0);
    expect(screen.getAllByText("로잉 기술 인터벌").length).toBeGreaterThan(0);
    expect(screen.getAllByText("수영 짧은 길이 인터벌").length).toBeGreaterThan(0);
    expect(screen.getAllByText(/RPE 5–6/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/숨이 정리된 뒤만 다음 길이/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/혼자 하지 않기/).length).toBeGreaterThan(0);
  });

  it("renders 10, 15, 20, and 30 minute low-noise no-jump circuit templates", () => {
    render(createElement(Home));
    expect(screen.getByText("QUIET HOME CIRCUITS")).toBeTruthy();
    expect(screen.getAllByText("10분 · 매우 조용한 리셋").length).toBeGreaterThan(0);
    expect(screen.getAllByText("15분 · 무도구 전신 협응").length).toBeGreaterThan(0);
    expect(screen.getAllByText("20분 · 저소음 전신 기본").length).toBeGreaterThan(0);
    expect(screen.getAllByText("30분 · 저소음 전신 리듬").length).toBeGreaterThan(0);
    expect(screen.getAllByText(/소음 수준: 매우 낮음/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/점프·발 구르기 없이 작은 체중 이동/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/점프·발 구르기·가구 충격 없음/).length).toBeGreaterThan(0);
  });

  it("renders life-stage general guidance and the pre-exercise safety checklist", () => {
    render(createElement(Home));
    expect(screen.getAllByText("운동 시작 전 5가지 확인").length).toBeGreaterThan(0);
    expect(screen.getAllByText("고령층 일반 시작").length).toBeGreaterThan(0);
    expect(screen.getAllByText("산후 일반 안내").length).toBeGreaterThan(0);
    expect(screen.getAllByText(/개인 진단·치료·운동 처방이 아닌 일반 정보/).length).toBeGreaterThan(0);
  });

  it("renders nutrition, hydration, and heat-exposure safety guidance after expanding wellness cards", () => {
    render(createElement(Home));
    ["운동 전후 식사", "사우나와 열 노출", "수분과 더운 날 활동"].forEach((title) => {
      const card = screen.getByRole("heading", { name: title }).closest("article");
      expect(card).toBeTruthy();
      fireEvent.click(within(card!).getByRole("button", { name: "상세 가이드" }));
    });
    expect(screen.getAllByText(/의료·영양 전문가 상담/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/실신감·혼란·심한 두통/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/심한 두통·실신감·혼란/).length).toBeGreaterThan(0);
  });

  it("provides an accessible quick exercise-type filter that combines with existing filters and can reset", () => {
    render(createElement(Home));
    const typeFilter = screen.getByRole("group", { name: "운동 종류 빠른 필터" });
    const bodyweight = within(typeFilter).getByRole("button", { name: "맨몸운동" });

    expect(bodyweight.getAttribute("aria-pressed")).toBe("false");
    fireEvent.click(bodyweight);
    expect(bodyweight.getAttribute("aria-pressed")).toBe("true");
    expect(within(typeFilter).getByText(/맨몸운동 \d+개 표시/)).toBeTruthy();

    fireEvent.change(screen.getByLabelText("장비 필터"), { target: { value: "장비 필요" } });
    expect((screen.getByLabelText("장비 필터") as HTMLSelectElement).value).toBe("장비 필요");
    expect(bodyweight.getAttribute("aria-pressed")).toBe("true");

    fireEvent.click(within(typeFilter).getByRole("button", { name: "조건 초기화" }));
    expect(within(typeFilter).getByRole("button", { name: "전체 보기" }).getAttribute("aria-pressed")).toBe("true");
    expect((screen.getByLabelText("장비 필터") as HTMLSelectElement).value).toBe("전체");
  });

  it("sorts filtered exercise results from the accessible sort dropdown and resets to recommendations", () => {
    render(createElement(Home));
    const typeFilter = screen.getByRole("group", { name: "운동 종류 빠른 필터" });
    fireEvent.click(within(typeFilter).getByRole("button", { name: "요가·필라테스" }));

    const sort = screen.getByLabelText("정렬 기준") as HTMLSelectElement;
    expect(sort.value).toBe("recommended");
    fireEvent.change(sort, { target: { value: "duration" } });
    expect(sort.value).toBe("duration");
    expect(within(typeFilter).getByText(/요가·필라테스 \d+개 표시/)).toBeTruthy();

    fireEvent.click(within(typeFilter).getByRole("button", { name: "조건 초기화" }));
    expect(sort.value).toBe("recommended");
  });
});
