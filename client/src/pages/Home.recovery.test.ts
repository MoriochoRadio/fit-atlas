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
    fireEvent.click(screen.getByRole("button", { name: "부위·목적·난이도 상세 조건" }));
    expect((screen.getByLabelText("부위 필터") as HTMLSelectElement).value).toBe("하체");
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });
  });

  it("renders distance units and the four-week rhythm card in the local record experience", () => {
    render(createElement(Home));
    const topbar = document.querySelector(".topbar");
    fireEvent.click(within(topbar as HTMLElement).getByRole("button", { name: /운동 기록/ }));
    expect(screen.getByText("4-WEEK RHYTHM")).toBeTruthy();
    expect(screen.getByText("거리 · 선택")).toBeTruthy();
    expect(screen.getByRole("option", { name: "km" })).toBeTruthy();
    expect(screen.getByRole("option", { name: "m" })).toBeTruthy();
  });

  it("renders the action-first start panel and opens the current session design flow", () => {
    render(createElement(Home));
    expect(screen.getByRole("heading", { name: /오늘은\s*무엇을 움직일까요\?/ })).toBeTruthy();
    expect(screen.getByLabelText("오늘의 30분 전신 균형 세션 요약")).toBeTruthy();
    expect(screen.queryByRole("img", { name: /운동선수/ })).toBeNull();
    const startDock = screen.getByLabelText("오늘의 주요 행동");
    expect(within(startDock).getByText("운동 찾기")).toBeTruthy();
    expect(within(startDock).getByText("회복 가이드")).toBeTruthy();
    fireEvent.click(within(startDock).getByRole("button", { name: /오늘 세션/ }));

    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });
    expect(screen.getByRole("heading", { name: "30분 전신 균형 세션 · 집·매트" })).toBeTruthy();
  });

  it("summarizes weekly completion, exercise records, and atlas signal in one compact report", () => {
    render(createElement(Home));
    const report = screen.getByLabelText("주간 아틀라스 요약 리포트");
    expect(within(report).getByRole("heading", { name: "이번 주 흐름" })).toBeTruthy();
    expect(report.querySelector(".weekly-signal-orbit b")?.textContent).toBe("0%");
    expect(within(report).getByText("준비 신호")).toBeTruthy();
    screen.getAllByRole("button", { name: /완료 처리/ }).forEach((button) => fireEvent.click(button));
    expect(report.querySelector(".weekly-signal-orbit b")?.textContent).toBe("100%");
    expect(within(report).getByText("고밀도 신호")).toBeTruthy();
  });

  it("applies a quick exercise start path and makes the chosen condition visible", () => {
    render(createElement(Home));
    const launcher = screen.getByLabelText("빠른 운동 시작");

    fireEvent.click(within(launcher).getByRole("button", { name: /달리기·유산소/ }));

    expect(within(launcher).getByText("러닝 · 심폐")).toBeTruthy();
    expect(screen.getByRole("button", { name: "러닝" }).getAttribute("aria-pressed")).toBe("true");
  });

  it("applies a quick session start and makes the current session conditions visible", () => {
    render(createElement(Home));
    const launcher = screen.getByLabelText("빠른 오늘 세션 시작");

    fireEvent.click(within(launcher).getByRole("button", { name: /30분 헬스장/ }));

    expect(within(launcher).getByText("30분 · 헬스장 · 기초 근력")).toBeTruthy();
    expect(screen.getByRole("heading", { name: "30분 기초 근력 세션 · 헬스장" })).toBeTruthy();
    expect(document.querySelector(".site-shell")?.className).toContain("atlas-motion-strength");
  });

  it("lets the user change and restore a preferred atlas theme locally", () => {
    render(createElement(Home));
    const oceanTheme = screen.getByRole("button", { name: "오션 테마 선택" });
    fireEvent.click(oceanTheme);
    expect(oceanTheme.getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByText("오션 테마를 적용했습니다.")).toBeTruthy();
    expect(document.querySelector(".site-shell")?.className).toContain("atlas-theme-ocean");
    cleanup();
    render(createElement(Home));
    expect(screen.getByRole("button", { name: "오션 테마 선택" }).getAttribute("aria-pressed")).toBe("true");
  });

  it("opens an atlas node editor, stores a block edit, and changes the route speed", () => {
    render(createElement(Home));
    fireEvent.click(screen.getByRole("button", { name: "준비 블록 상세 및 편집" }));
    expect(screen.getByRole("heading", { name: "준비 블록 편집" })).toBeTruthy();
    fireEvent.change(screen.getByLabelText("블록 이름"), { target: { value: "리듬 준비" } });
    fireEvent.change(screen.getByLabelText("움직임 · 한 줄에 하나씩"), { target: { value: "편안한 걷기\n캣·카우 · 6회" } });
    fireEvent.click(screen.getByRole("button", { name: /블록 저장/ }));
    expect(screen.queryByRole("dialog", { name: /블록 편집/ })).toBeNull();
    expect(screen.getByText("리듬 준비 · 약 5분")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /빠름/ }));
    expect(document.querySelector(".site-shell")?.className).toContain("atlas-speed-fast");
  });

  it("increases atlas visual density after the current weekly plan is completed", () => {
    render(createElement(Home));
    expect(document.querySelector(".site-shell")?.className).toContain("atlas-performance-starting");
    screen.getAllByRole("button", { name: /완료 처리/ }).forEach((button) => fireEvent.click(button));
    expect(document.querySelector(".site-shell")?.className).toContain("atlas-performance-surge");
  });

  it("toggles the mobile navigation state without changing the active content flow", () => {
    render(createElement(Home));
    const menu = screen.getByRole("navigation", { name: "주요 메뉴" });
    expect(menu.className).toBe("nav");
    fireEvent.click(screen.getByRole("button", { name: "메뉴 열기" }));
    expect(menu.className).toBe("nav is-open");
  });

  it("changes the cinematic scene when primary navigation moves between training areas", () => {
    render(createElement(Home));
    const shell = document.querySelector(".site-shell");
    expect(shell?.className).toContain("scene-home");

    const primaryNav = screen.getByRole("navigation", { name: "주요 메뉴" });
    fireEvent.click(within(primaryNav).getByRole("link", { name: "운동 탐색" }));
    expect(shell?.className).toContain("scene-explore");
    expect(within(primaryNav).getByRole("link", { name: "운동 탐색" }).getAttribute("aria-current")).toBe("page");

    fireEvent.click(within(primaryNav).getByRole("link", { name: "웰니스" }));
    expect(shell?.className).toContain("scene-wellness");
    expect(within(primaryNav).getByRole("link", { name: "웰니스" }).getAttribute("aria-current")).toBe("page");
  });

  it("renders the first catalog page first, then appends the next page on demand", async () => {
    render(createElement(Home));
    expect(screen.getByText("18개 표시 · 100/1008개 카탈로그를 불러왔습니다.")).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: /운동 100개 더 보기/ }));
    await waitFor(() => expect(screen.getByText("36개 표시 · 100/1008개 카탈로그를 불러왔습니다.")).toBeTruthy());
  });

  it("saves a favorite and a recently viewed exercise from its card", async () => {
    render(createElement(Home));
    fireEvent.change(screen.getByLabelText("운동 검색"), { target: { value: "바벨 백 스쿼트" } });
    await waitFor(() => expect(screen.getByRole("heading", { name: "바벨 백 스쿼트" })).toBeTruthy());
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
    expect(within(card!).getAllByText(/발 전체를 바닥에|엉덩이·무릎을 함께|통증 없는 범위로/).length).toBeGreaterThanOrEqual(3);
    expect(within(card!).getByLabelText("맨몸 스쿼트 사진 없는 자세 안내")).toBeTruthy();
    expect(within(card!).getByText("읽으며 따라 하는 자세 지도")).toBeTruthy();
    expect(within(card!).getByText("◎ 주로 쓰는 근육")).toBeTruthy();
    expect(within(card!).getByText("↔ 호흡")).toBeTruthy();
    expect(within(card!).getByText("↓ 어렵다면")).toBeTruthy();
    expect(within(card!).getByLabelText("맨몸 스쿼트 ASCII 동작 도식")).toBeTruthy();
    expect(within(card!).getByText(/낮은 범위부터 균형을 유지하는 앉기·일어서기 흐름/)).toBeTruthy();
    expect(within(card!).getByText("ASCII MOTION SKETCH")).toBeTruthy();
    expect(within(card!).getByText("중심축")).toBeTruthy();
    expect(within(card!).getByText("ROM · 큼")).toBeTruthy();
    fireEvent.click(within(card!).getByRole("button", { name: "ROM · 큼" }));
    expect(screen.getAllByText(/맨몸 스쿼트 · 큰 ROM/).length).toBeGreaterThan(0);
    expect(screen.getAllByText("대체 운동 방식").length).toBeGreaterThan(0);
    const alternativeLink = screen.getAllByRole("button", { name: /리버스 런지/ }).find((element) => element.className.includes("alternative-exercise-link"));
    expect(alternativeLink).toBeTruthy();
    fireEvent.click(alternativeLink!);
    await waitFor(() => expect(screen.getByRole("heading", { name: "리버스 런지" })).toBeTruthy());
    const alternativeCard = screen.getByRole("heading", { name: "리버스 런지" }).closest("article");
    expect(within(alternativeCard!).getByText("읽으며 따라 하는 자세 지도")).toBeTruthy();
  });

  it("adds a ROM alternative to today’s routine and reflects half-step check-ins in the weekly dashboard", async () => {
    render(createElement(Home));
    fireEvent.change(screen.getByLabelText("운동 검색"), { target: { value: "맨몸 스쿼트" } });
    await waitFor(() => expect(screen.getByRole("heading", { name: "맨몸 스쿼트" })).toBeTruthy());
    const card = screen.getByRole("heading", { name: "맨몸 스쿼트" }).closest("article");
    fireEvent.click(within(card!).getByRole("button", { name: "자세·근거 보기" }));
    fireEvent.click(within(card!).getByRole("button", { name: "ROM · 큼" }));
    const routineAdd = screen.getAllByRole("button", { name: /오늘 루틴/ }).find((element) => element.className.includes("alternative-routine-add"));
    expect(routineAdd).toBeTruthy();
    fireEvent.click(routineAdd!);
    expect(screen.getByText("오늘의 ROM 조절 · 리버스 런지")).toBeTruthy();
    fireEvent.change(screen.getByRole("slider", { name: /통증/ }), { target: { value: "2.5" } });
    expect(screen.getByLabelText("주간 피로 통증 및 추천 ROM 대시보드")).toBeTruthy();
  });

  it("filters the library by ROM size and lets the top control hide joint axes", () => {
    render(createElement(Home));
    const axisToggle = screen.getByRole("button", { name: "중심축 표시" });
    fireEvent.click(axisToggle);
    expect(axisToggle.getAttribute("aria-pressed")).toBe("false");
    cleanup();
    render(createElement(Home));
    expect(screen.getByRole("button", { name: "중심축 숨김" }).getAttribute("aria-pressed")).toBe("false");
    const smallRomFilter = screen.getByRole("button", { name: "ROM · 작음" });
    fireEvent.click(smallRomFilter);
    expect(smallRomFilter.getAttribute("aria-pressed")).toBe("true");
  });

  it("reflects today routine completion in the weekly status dashboard and exposes PNG export", () => {
    render(createElement(Home));
    expect(screen.getByRole("button", { name: "주간 상태 그래프 PNG로 내보내기" })).toBeTruthy();
    const completionToggle = screen.getAllByRole("button", { name: /완료 처리/ })[0];
    fireEvent.click(completionToggle);
    expect(screen.getAllByText("루틴 완료 1/3 · 33%").length).toBeGreaterThan(0);
  });

  it("celebrates full routine completion and includes period and note fields in the export dashboard", () => {
    render(createElement(Home));
    expect(screen.getByLabelText("PNG 기록 기간")).toBeTruthy();
    expect(screen.getByLabelText("PNG 기록 메모")).toBeTruthy();
    expect(screen.getByLabelText("최근 4주 완료율 및 피로도 변화")).toBeTruthy();
    screen.getAllByRole("button", { name: /완료 처리/ }).forEach((button) => fireEvent.click(button));
    expect(screen.getByText("오늘의 루틴을 모두 마쳤습니다.")).toBeTruthy();
  });

  it("prioritizes a conservative ROM path when today’s pain signal is high", () => {
    render(createElement(Home));
    fireEvent.change(screen.getByRole("slider", { name: /통증/ }), { target: { value: "4" } });
    expect(screen.getAllByText("통증 신호가 크면 ROM 추천을 잠시 멈추세요").length).toBeGreaterThan(0);
    expect(screen.getByRole("button", { name: "회복 가이드 보기" })).toBeTruthy();
  });

  it("renders the expanded machine visual guide with a safe adjustment cue", async () => {
    render(createElement(Home));
    fireEvent.change(screen.getByLabelText("운동 검색"), { target: { value: "랫 풀다운" } });

    await waitFor(() => expect(screen.getByRole("heading", { name: "랫 풀다운" })).toBeTruthy());
    const card = screen.getByRole("heading", { name: "랫 풀다운" }).closest("article");
    expect(card).toBeTruthy();
    fireEvent.click(within(card!).getByRole("button", { name: "자세·근거 보기" }));

    expect(within(card!).getByText("랫 풀다운 흐름")).toBeTruthy();
    expect(within(card!).getByText(/통증·불안정·호흡 흐트러짐/)).toBeTruthy();
    expect(within(card!).getAllByText(/반동 없이 장력 제어/).length).toBeGreaterThan(0);
  });

  it("loads a non-contact combat starter drill with its visual guide and safety scope", async () => {
    render(createElement(Home));
    fireEvent.change(screen.getByLabelText("운동 검색"), { target: { value: "복싱 가드 스텝" } });

    await waitFor(() => expect(screen.getByRole("heading", { name: "복싱 가드 스텝 리셋 이지" })).toBeTruthy());
    const card = screen.getByRole("heading", { name: "복싱 가드 스텝 리셋 이지" }).closest("article");
    expect(card).toBeTruthy();
    fireEvent.click(within(card!).getByRole("button", { name: "자세·근거 보기" }));

    expect(within(card!).getByText("복싱 가드 스텝 리셋 흐름")).toBeTruthy();
    expect(within(card!).getAllByText(/대련·스파링·타격은 포함하지 않습니다/).length).toBeGreaterThan(0);
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

  it("provides a low-pressure first record prompt and a quick recovery start", () => {
    render(createElement(Home));

    expect(screen.getByRole("button", { name: /첫 기록 남기기/ })).toBeTruthy();
    expect(screen.getByLabelText("빠른 회복 시작")).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: /첫 기록 남기기/ }));
    expect(screen.getByText(/모든 수치를 완벽히 기억할 필요는 없습니다/)).toBeTruthy();
  });

  it("closes the training log with the Escape key", () => {
    render(createElement(Home));

    fireEvent.click(screen.getByRole("button", { name: /첫 기록 남기기/ }));
    expect(screen.getByRole("dialog", { name: "운동 기록 추가" })).toBeTruthy();

    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByRole("dialog", { name: "운동 기록 추가" })).toBeNull();
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

  it("saves local category, equipment, and environment preferences then applies them to explore and session design", () => {
    render(createElement(Home));
    fireEvent.click(screen.getByRole("button", { name: "내 프로필" }));
    fireEvent.change(screen.getByLabelText("선호 운동 종류"), { target: { value: "맨몸운동" } });
    fireEvent.change(screen.getByLabelText("선호 장비"), { target: { value: "bodyweight" } });
    fireEvent.change(screen.getByLabelText("주 활동 환경"), { target: { value: "outdoor" } });
    fireEvent.click(screen.getByRole("button", { name: "설정 저장" }));

    expect(JSON.parse(window.localStorage.getItem("fit-atlas-profile") ?? "{}")).toMatchObject({ preferredCategory: "맨몸운동", preferredEquipment: "bodyweight", preferredEnvironment: "outdoor" });
    expect(screen.getByRole("heading", { name: "30분 전신 균형 세션 · 야외·걷기" })).toBeTruthy();

    const typeFilter = screen.getByRole("group", { name: "운동 종류 빠른 필터" });
    fireEvent.click(within(typeFilter).getByRole("button", { name: "선호 조건 적용" }));
    expect(within(typeFilter).getByRole("button", { name: "맨몸운동" }).getAttribute("aria-pressed")).toBe("true");
    fireEvent.click(screen.getByRole("button", { name: "부위·목적·난이도 상세 조건" }));
    expect((screen.getByLabelText("장비 필터") as HTMLSelectElement).value).toBe("장비 없음");
  });

  it("provides an accessible quick exercise-type filter that combines with existing filters and can reset", () => {
    render(createElement(Home));
    const typeFilter = screen.getByRole("group", { name: "운동 종류 빠른 필터" });
    const bodyweight = within(typeFilter).getByRole("button", { name: "맨몸운동" });

    expect(bodyweight.getAttribute("aria-pressed")).toBe("false");
    fireEvent.click(bodyweight);
    expect(bodyweight.getAttribute("aria-pressed")).toBe("true");
    expect(within(typeFilter).getByText(/맨몸운동 \d+개 표시/)).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "부위·목적·난이도 상세 조건" }));
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

    fireEvent.click(screen.getByRole("button", { name: "부위·목적·난이도 상세 조건" }));
    const sort = screen.getByLabelText("정렬 기준") as HTMLSelectElement;
    expect(sort.value).toBe("recommended");
    fireEvent.change(sort, { target: { value: "duration" } });
    expect(sort.value).toBe("duration");
    expect(within(typeFilter).getByText(/요가·필라테스 \d+개 표시/)).toBeTruthy();

    fireEvent.click(within(typeFilter).getByRole("button", { name: "조건 초기화" }));
    expect(sort.value).toBe("recommended");
  });

  it("keeps detailed exercise filters out of the initial path until the user asks for them", () => {
    render(createElement(Home));
    const advanced = screen.getByRole("button", { name: "부위·목적·난이도 상세 조건" });
    expect(advanced.getAttribute("aria-expanded")).toBe("false");
    expect(screen.queryByLabelText("부위 필터")).toBeNull();
    fireEvent.click(advanced);
    expect(advanced.getAttribute("aria-expanded")).toBe("true");
    expect(screen.getByLabelText("부위 필터")).toBeTruthy();
  });
});
