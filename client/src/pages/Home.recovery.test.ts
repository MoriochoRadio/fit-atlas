// @vitest-environment jsdom
import { createElement } from "react";
import * as ReactRuntime from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
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
    const ankleAlternative = screen.getAllByRole("button").find((button) => button.textContent?.includes("발목 니투월 락"));
    expect(ankleAlternative).toBeTruthy();
    fireEvent.click(ankleAlternative!);

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

  it("renders the first catalog page first, then appends the next page on demand", async () => {
    render(createElement(Home));
    expect(screen.getByText("100개 표시 · 100/1000개 카탈로그를 불러왔습니다.")).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: /운동 100개 더 보기/ }));
    await waitFor(() => expect(screen.getByText("200개 표시 · 200/1000개 카탈로그를 불러왔습니다.")).toBeTruthy());
  });

  it("saves a favorite and a recently viewed exercise from its card", async () => {
    render(createElement(Home));
    const card = screen.getByRole("heading", { name: "바벨 백 스쿼트" }).closest("article");
    expect(card).toBeTruthy();

    fireEvent.click(within(card!).getByRole("button", { name: "바벨 백 스쿼트 즐겨찾기 추가" }));
    expect(within(card!).getByRole("button", { name: "바벨 백 스쿼트 즐겨찾기 해제" }).getAttribute("aria-pressed")).toBe("true");
    fireEvent.click(within(card!).getByRole("button", { name: "자세·근거 보기" }));

    await waitFor(() => expect(screen.getAllByText("바벨 백 스쿼트").length).toBeGreaterThan(2));
    expect(screen.getByLabelText("바벨 백 스쿼트 근거 적용 범위")).toBeTruthy();
    expect(screen.getByText(/전문 훈련 기관의 기술·훈련 원칙 자료/)).toBeTruthy();
    expect(screen.getByText(/통증·불안정이 있으면 중단/)).toBeTruthy();
    expect(screen.getByRole("link", { name: /NSCA 바벨 스쿼트 기술 안내/ })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "최근 본 운동" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "즐겨찾기" })).toBeTruthy();
  });

  it("renders the expanded visual guide from a representative bodyweight exercise detail card", async () => {
    render(createElement(Home));
    fireEvent.change(screen.getByLabelText("운동 검색"), { target: { value: "맨몸 스쿼트" } });

    await waitFor(() => expect(screen.getByRole("heading", { name: "맨몸 스쿼트" })).toBeTruthy());
    const card = screen.getByRole("heading", { name: "맨몸 스쿼트" }).closest("article");
    expect(card).toBeTruthy();
    fireEvent.click(within(card!).getByRole("button", { name: "자세·근거 보기" }));

    expect(within(card!).getByText("맨몸 스쿼트 흐름")).toBeTruthy();
    expect(within(card!).getAllByText(/발 전체를 바닥에|엉덩이·무릎을 함께|통증 없는 범위로/)).toHaveLength(3);
  });

  it("switches the seated-work recovery routine and bridges to a light home session", () => {
    render(createElement(Home));
    const recoveryPanel = screen.getByLabelText("장시간 앉기 뒤 회복 루틴");
    expect(within(recoveryPanel).getByText("5분 자리 리셋")).toBeTruthy();

    fireEvent.click(within(recoveryPanel).getByRole("button", { name: "10분" }));
    expect(within(recoveryPanel).getByText("10분 자리 회복·재시작")).toBeTruthy();
    fireEvent.click(within(recoveryPanel).getByRole("button", { name: /15분 가벼운 세션 설계/ }));

    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });
    expect(screen.getByRole("heading", { name: "15분 전신 균형 세션 · 집·매트" })).toBeTruthy();
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
