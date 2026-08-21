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
    window.history.replaceState(null, "", "#top");
    scrollIntoView.mockReset();
    Object.defineProperty(Element.prototype, "scrollIntoView", { configurable: true, value: scrollIntoView });
  });

  afterEach(() => cleanup());

  it("updates the search and region filter, then opens the independent library scene when a pathway alternative is clicked", async () => {
    render(createElement(Home));
    fireEvent.click(screen.getByRole("button", { name: "발목 불편" }));
    const ankleAlternative = screen.getAllByRole("button").find((button) => button.textContent?.includes("발목 니투월 락"));
    expect(ankleAlternative).toBeTruthy();
    fireEvent.click(ankleAlternative!);

    expect((screen.getByLabelText("운동 검색") as HTMLInputElement).value).toBe("발목 니투월 락");
    fireEvent.click(screen.getByRole("button", { name: "부위·목적·난이도 상세 조건" }));
    expect((screen.getByLabelText("부위 필터") as HTMLSelectElement).value).toBe("하체");
    await waitFor(() => expect(document.querySelector(".site-shell")?.classList.contains("scene-explore")).toBe(true));
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

  it("synchronizes the 3D muscle model and text list, then opens a related exercise detail", async () => {
    render(createElement(Home));
    const model = await waitFor(() => screen.getByLabelText("클릭·드래그 가능한 3D 근육 인체 모델"));

    fireEvent.click(screen.getByLabelText("등 광배근 선택 해제"));
    fireEvent.click(screen.getByLabelText("등 광배근 선택"));
    expect(within(model).getByRole("button", { name: "후면" }).getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByRole("button", { name: "등" }).getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByRole("heading", { name: "등" })).toBeTruthy();

    const relatedExercise = document.querySelector(".anatomy-exercise-list button") as HTMLButtonElement;
    const exerciseName = relatedExercise.querySelector("b")?.textContent;
    expect(exerciseName).toBeTruthy();
    fireEvent.click(relatedExercise);
    await waitFor(() => expect((screen.getByLabelText("운동 검색") as HTMLInputElement).value).toBe(exerciseName));
    expect(document.querySelector(".site-shell")?.classList.contains("scene-explore")).toBe(true);
  });

  it("rotates the muscle model, filters with multiple regions, and exposes exercise muscle roles", async () => {
    render(createElement(Home));
    const model = await waitFor(() => screen.getByLabelText("클릭·드래그 가능한 3D 근육 인체 모델"));
    const modelSvg = model.querySelector("svg") as SVGSVGElement;
    const multiSelect = screen.getByRole("group", { name: "근육 부위 다중 선택" });
    fireEvent.pointerDown(modelSvg, { pointerId: 1, clientX: 80 });
    fireEvent.pointerMove(modelSvg, { pointerId: 1, clientX: 145 });
    fireEvent.pointerUp(modelSvg, { pointerId: 1, clientX: 145 });
    expect(modelSvg.getAttribute("style")).toContain("rotateY(233.3deg)");

    fireEvent.click(within(multiSelect).getByRole("button", { name: "가슴" }));
    expect(within(multiSelect).getByRole("button", { name: "등" }).getAttribute("aria-pressed")).toBe("true");
    expect(within(multiSelect).getByRole("button", { name: "가슴" }).getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByText("선택한 모든 부위를 함께 자극하는 복합 운동만 표시합니다.")).toBeTruthy();

    fireEvent.click(screen.getAllByRole("button", { name: "자세·근거 보기" })[0]!);
    await waitFor(() => expect(screen.getByLabelText(/근육 역할/)).toBeTruthy());
    expect(document.querySelectorAll(".muscle-zone.is-primary").length).toBeGreaterThan(0);
  });

  it("lets the hero cable machine rotate, adjust resistance, and open a session node", async () => {
    render(createElement(Home));
    const machine = await waitFor(() => screen.getByLabelText("직접 조작 가능한 3D 케이블 운동 장비"));
    const canvas = machine.querySelector("svg") as SVGSVGElement;
    fireEvent.pointerDown(canvas, { pointerId: 4, clientX: 90 });
    fireEvent.pointerMove(canvas, { pointerId: 4, clientX: 150 });
    fireEvent.pointerUp(canvas, { pointerId: 4, clientX: 150 });
    expect(canvas.getAttribute("style")).toContain("rotateY(21deg)");

    const resistance = within(machine).getByLabelText("케이블 저항 조절") as HTMLInputElement;
    fireEvent.change(resistance, { target: { value: "77" } });
    expect(resistance.value).toBe("77");
    fireEvent.click(within(machine).getAllByRole("button", { name: /블록 상세 및 편집/ })[0]!);
    expect(screen.getByRole("dialog")).toBeTruthy();
  });

  it("switches the hero equipment and applies its resistance to the current session record", async () => {
    render(createElement(Home));
    const cableMachine = await waitFor(() => screen.getByLabelText("직접 조작 가능한 3D 케이블 운동 장비"));
    const equipmentControl = within(cableMachine).getByRole("group", { name: "메인 3D 운동 기구 선택" });

    fireEvent.click(within(equipmentControl).getByRole("button", { name: "덤벨" }));
    const dumbbellMachine = await waitFor(() => screen.getByLabelText("직접 조작 가능한 3D 덤벨 운동 장비"));
    expect(within(dumbbellMachine).getByRole("button", { name: "덤벨" }).getAttribute("aria-pressed")).toBe("true");
    const resistance = within(dumbbellMachine).getByLabelText("덤벨 부하 조절") as HTMLInputElement;
    fireEvent.change(resistance, { target: { value: "77" } });

    await waitFor(() => expect(screen.getAllByText(/전신 부하 77% · 집중 RPE 8/).length).toBeGreaterThan(0));
    const [energy, sleep, stress, pain] = Array.from(document.querySelectorAll(".checkin-controls input")) as HTMLInputElement[];
    fireEvent.change(energy!, { target: { value: "5" } });
    fireEvent.change(sleep!, { target: { value: "5" } });
    fireEvent.change(stress!, { target: { value: "1" } });
    fireEvent.change(pain!, { target: { value: "1" } });
    fireEvent.click(screen.getByRole("button", { name: "운동 기록 열기" }));
    expect((screen.getByLabelText(/주관적 강도 RPE/) as HTMLInputElement).value).toBe("8");
  });

  it("offers equipment-specific resistance presets and updates the current intensity", async () => {
    render(createElement(Home));
    const cableMachine = await waitFor(() => screen.getByLabelText("직접 조작 가능한 3D 케이블 운동 장비"));
    fireEvent.click(within(cableMachine).getByRole("button", { name: "케이블 집중 76% 프리셋" }));
    expect((within(cableMachine).getByLabelText("케이블 저항 조절") as HTMLInputElement).value).toBe("76");
    expect(screen.getByText("집중 · RPE 8")).toBeTruthy();

    fireEvent.click(within(cableMachine).getByRole("button", { name: "트레드밀" }));
    const treadmillMachine = await waitFor(() => screen.getByLabelText("직접 조작 가능한 3D 트레드밀 운동 장비"));
    fireEvent.click(within(treadmillMachine).getByRole("button", { name: "트레드밀 페이스업 68% 프리셋" }));
    expect((within(treadmillMachine).getByLabelText("트레드밀 페이스 조절") as HTMLInputElement).value).toBe("68");
  });

  it("renders the action-first start panel and opens the independent current session scene", async () => {
    render(createElement(Home));
    expect(screen.getByRole("heading", { name: /오늘은\s*무엇을 움직일까요\?/ })).toBeTruthy();
    expect(screen.getByLabelText("오늘의 30분 전신 균형 세션 요약")).toBeTruthy();
    expect(screen.queryByRole("img", { name: /운동선수/ })).toBeNull();
    const startDock = screen.getByLabelText("오늘의 주요 행동");
    expect(within(startDock).getByText("운동 찾기")).toBeTruthy();
    expect(within(startDock).getByText("회복 가이드")).toBeTruthy();
    fireEvent.click(within(startDock).getByRole("button", { name: /오늘 세션/ }));

    await waitFor(() => expect(document.querySelector(".site-shell")?.classList.contains("scene-session")).toBe(true));
    expect(screen.getByRole("heading", { name: "30분 전신 균형 세션 · 집·매트" })).toBeTruthy();
  });

  it("keeps hero status, machine controls, session readout, and atlas controls on separate surfaces", async () => {
    render(createElement(Home));
    const workspace = document.querySelector(".hero-workspace");
    expect(workspace).toBeTruthy();
    expect(screen.getByLabelText("오늘 운동 상태 요약")).toBeTruthy();
    expect(within(workspace as HTMLElement).getByLabelText("직접 조작 가능한 3D 케이블 운동 장비")).toBeTruthy();
    expect(within(workspace as HTMLElement).getByText("BALANCE ROUTE")).toBeTruthy();
    await waitFor(() => expect(within(workspace as HTMLElement).getByRole("group", { name: "아틀라스 제어" })).toBeTruthy());
    expect(document.querySelector(".hero-atlas .hero-session-card")).toBeNull();
    expect(document.querySelector(".hero-atlas .atlas-theme-control")).toBeNull();
  });

  it("starts a matching session goal from the selected hero equipment", async () => {
    render(createElement(Home));
    const cableMachine = await waitFor(() => screen.getByLabelText("직접 조작 가능한 3D 케이블 운동 장비"));
    fireEvent.click(within(cableMachine).getByRole("button", { name: "트레드밀" }));
    const treadmillMachine = await waitFor(() => screen.getByLabelText("직접 조작 가능한 3D 트레드밀 운동 장비"));

    fireEvent.click(within(treadmillMachine.closest(".hero-workspace") as HTMLElement).getByRole("button", { name: "이 장비로 세션 설계" }));

    await waitFor(() => expect(document.querySelector(".site-shell")?.classList.contains("scene-session")).toBe(true));
    expect(screen.getByRole("heading", { name: "30분 심폐 리듬 세션 · 집·매트" })).toBeTruthy();
  });

  it("switches the main navigation through independent explore, body, progress, and wellness scenes", async () => {
    render(createElement(Home));
    const primaryNav = screen.getByRole("navigation", { name: "주요 메뉴" });

    fireEvent.click(within(primaryNav).getByRole("link", { name: "운동 탐색" }));
    await waitFor(() => expect(document.querySelector(".site-shell")?.classList.contains("scene-explore")).toBe(true));
    expect(screen.getByRole("heading", { name: "움직임을 지식으로 익히세요." })).toBeTruthy();

    fireEvent.click(within(primaryNav).getByRole("link", { name: "바디 맵" }));
    await waitFor(() => expect(document.querySelector(".site-shell")?.classList.contains("scene-anatomy")).toBe(true));
    expect(screen.getByRole("heading", { name: "부위를 누르면, 필요한 움직임이 보입니다." })).toBeTruthy();

    fireEvent.click(within(primaryNav).getByRole("link", { name: "기록 분석" }));
    await waitFor(() => expect(document.querySelector(".site-shell")?.classList.contains("scene-progress")).toBe(true));
    expect(screen.getByRole("heading", { name: "기록은 감이 아닌 방향을 만듭니다." })).toBeTruthy();

    fireEvent.click(within(primaryNav).getByRole("link", { name: "웰니스" }));
    await waitFor(() => expect(document.querySelector(".site-shell")?.classList.contains("scene-wellness")).toBe(true));
    expect(screen.getByRole("heading", { name: "오래 앉은 뒤, 다음 작업을 위한 짧은 전환." })).toBeTruthy();
  });

  it("opens a direct scene URL as the matching independent surface", async () => {
    window.history.replaceState(null, "", "#explore");
    render(createElement(Home));

    await waitFor(() => expect(document.querySelector(".site-shell")?.classList.contains("scene-explore")).toBe(true));
    expect(screen.getByRole("heading", { name: "움직임을 지식으로 익히세요." })).toBeTruthy();
  });

  it("toggles scene transition sound from the dedicated settings dialog", async () => {
    render(createElement(Home));
    const topbar = document.querySelector(".topbar");
    fireEvent.click(within(topbar as HTMLElement).getAllByRole("button", { name: "장면 설정" }).find((button) => button.classList.contains("desktop-only"))!);
    const dialog = await waitFor(() => screen.getByRole("dialog", { name: /장면 전환 설정/ }));
    const soundToggle = within(dialog).getByRole("checkbox", { name: /장면 전환 효과음/ }) as HTMLInputElement;
    expect(soundToggle.checked).toBe(true);
    fireEvent.click(soundToggle);
    expect(soundToggle.checked).toBe(false);
    expect(JSON.parse(window.localStorage.getItem("fit-atlas-scene-experience") ?? "{}")).toMatchObject({ soundEnabled: false });
  });

  it("opens scene settings from the mobile navigation entry without leaving its menu behind", async () => {
    render(createElement(Home));
    fireEvent.click(screen.getByRole("button", { name: "메뉴 열기" }));
    const navigation = screen.getByRole("navigation", { name: "주요 메뉴" });
    const mobileSettings = within(navigation).getAllByRole("button", { name: "장면 설정" }).find((button) => button.classList.contains("mobile-only"));
    fireEvent.click(mobileSettings!);
    await waitFor(() => expect(screen.getByRole("dialog", { name: /장면 전환 설정/ })).toBeTruthy());
    expect(navigation.classList.contains("is-open")).toBe(false);
  });

  it("synchronizes the active scene when browser history changes", async () => {
    render(createElement(Home));
    window.history.pushState(null, "", "#wellness");
    window.dispatchEvent(new PopStateEvent("popstate"));
    await waitFor(() => expect(document.querySelector(".site-shell")?.classList.contains("scene-wellness")).toBe(true));
  });

  it("restores the last scene when the app opens without an explicit scene hash", async () => {
    const firstVisit = render(createElement(Home));
    const primaryNav = screen.getByRole("navigation", { name: "주요 메뉴" });
    fireEvent.click(within(primaryNav).getByRole("link", { name: "기록 분석" }));
    await waitFor(() => expect(document.querySelector(".site-shell")?.classList.contains("scene-progress")).toBe(true));
    firstVisit.unmount();
    window.history.replaceState(null, "", "/");

    render(createElement(Home));
    await waitFor(() => expect(document.querySelector(".site-shell")?.classList.contains("scene-progress")).toBe(true));
  });

  it("saves, applies, and deletes a named exercise filter preset", async () => {
    render(createElement(Home));
    const primaryNav = screen.getByRole("navigation", { name: "주요 메뉴" });
    fireEvent.click(within(primaryNav).getByRole("link", { name: "운동 탐색" }));
    await waitFor(() => expect(document.querySelector(".site-shell")?.classList.contains("scene-explore")).toBe(true));
    fireEvent.click(screen.getByRole("button", { name: "맨몸운동" }));
    fireEvent.change(screen.getByLabelText("필터 프리셋 이름"), { target: { value: "집 운동" } });
    fireEvent.click(screen.getByRole("button", { name: "현재 조건 저장" }));
    const preset = await waitFor(() => screen.getAllByRole("button", { name: /집 운동/ }).find((button) => !button.getAttribute("aria-label")));
    expect(preset).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "러닝" }));
    fireEvent.click(preset!);
    expect(screen.getByRole("button", { name: "맨몸운동" }).getAttribute("aria-pressed")).toBe("true");
    fireEvent.click(screen.getByRole("button", { name: "집 운동 프리셋 삭제" }));
    expect(screen.queryByRole("button", { name: "집 운동 프리셋 삭제" })).toBeNull();
  });

  it("restores a recently started equipment session and resumes its matching goal", async () => {
    render(createElement(Home));
    const cableMachine = await waitFor(() => screen.getByLabelText("직접 조작 가능한 3D 케이블 운동 장비"));
    fireEvent.click(within(cableMachine).getByRole("button", { name: "덤벨" }));
    const dumbbellMachine = await waitFor(() => screen.getByLabelText("직접 조작 가능한 3D 덤벨 운동 장비"));
    fireEvent.click(screen.getByRole("button", { name: "이 장비로 세션 설계" }));
    await waitFor(() => expect(screen.getByRole("button", { name: "최근 덤벨 54% 설정으로 세션 다시 시작" })).toBeTruthy());

    cleanup();
    render(createElement(Home));
    expect(screen.getByRole("button", { name: "최근 세션 이어하기" })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "최근 세션 이어하기" }));

    expect(screen.getByRole("heading", { name: "30분 전신 균형 세션 · 집·매트" })).toBeTruthy();
  });

  it("shows weekly completion flow, lets the user change the weekly goal, and gives the next direction", () => {
    render(createElement(Home));
    const report = screen.getByLabelText("주간 아틀라스 상세 리포트");
    expect(within(report).getByRole("heading", { name: "주간 완료 흐름" })).toBeTruthy();
    expect(within(report).getByRole("img", { name: /월요일 계획 0개 중 완료 0개/ })).toBeTruthy();
    expect(within(report).getByText("가장 부담이 적은 한 세션을 선택해 이번 주의 첫 신호를 만드세요.")).toBeTruthy();
    fireEvent.click(within(report).getByRole("button", { name: "근력" }));
    expect(within(report).getByRole("button", { name: "근력" }).getAttribute("aria-pressed")).toBe("true");
    screen.getAllByRole("button", { name: /완료 처리/ }).forEach((button) => fireEvent.click(button));
    expect(within(report).getByText("이번 주 계획을 마쳤습니다. 다음 세션에서는 시간·반복·저항 중 하나만 작게 조절하세요.")).toBeTruthy();
  });

  it("opens session design directly from the weekly summary next action", () => {
    render(createElement(Home));
    const report = screen.getByLabelText("주간 아틀라스 상세 리포트");
    fireEvent.click(within(report).getByRole("button", { name: "다음 세션 설계" }));
    expect(screen.getByRole("heading", { name: "오늘의 조건으로, 한 세션을 설계하세요." })).toBeTruthy();
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

  it("reveals session adjustment guidance only on request and exposes wellness quick navigation", () => {
    render(createElement(Home));
    const guidanceToggle = screen.getByRole("button", { name: "피로·통증 조절 기준 보기" });
    expect(guidanceToggle.getAttribute("aria-expanded")).toBe("false");
    expect(screen.queryByText(/피로·통증·수면 반응이 좋지 않으면/)).toBeNull();
    fireEvent.click(guidanceToggle);
    expect(guidanceToggle.getAttribute("aria-expanded")).toBe("true");
    expect(screen.getByText(/피로·통증·수면 반응이 좋지 않으면/)).toBeTruthy();
    const wellnessNavigation = screen.getByRole("navigation", { name: "웰니스 화면 빠른 이동" });
    ["회복 시작", "생활 습관", "유산소", "무점프", "안전"].forEach((name) => expect(within(wellnessNavigation).getByRole("button", { name })).toBeTruthy());
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
    const recentPanel = screen.getByLabelText("최근 본 운동 빠른 재진입");
    fireEvent.click(within(recentPanel).getByRole("button", { name: "바벨 백 스쿼트 자세·안전 안내 다시 열기" }));
    await waitFor(() => expect((screen.getByLabelText("운동 검색") as HTMLInputElement).value).toBe("바벨 백 스쿼트"));
    await waitFor(() => expect(screen.getByLabelText("바벨 백 스쿼트 근거 적용 범위")).toBeTruthy());
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
    expect(within(card!).getByText("TRAINING BENEFITS")).toBeTruthy();
    expect(within(card!).getByText("읽으며 따라 하는 자세 지도")).toBeTruthy();
    expect(within(card!).getByText("◎ 주로 쓰는 근육")).toBeTruthy();
    expect(within(card!).getByText("↔ 호흡")).toBeTruthy();
    expect(within(card!).getByText("↓ 어렵다면")).toBeTruthy();
    expect(within(card!).getByLabelText("맨몸 스쿼트 ASCII 동작 도식")).toBeTruthy();
    expect(within(card!).getByText(/낮은 범위부터 균형을 유지하는 앉기·일어서기 흐름/)).toBeTruthy();
    expect(within(card!).getByText("ASCII MOTION SKETCH")).toBeTruthy();
    expect(within(card!).getByText("중심축")).toBeTruthy();
    expect(within(card!).getByText("ROM · 큼")).toBeTruthy();
    expect(within(card!).getByText("SETUP")).toBeTruthy();
    expect(within(card!).getByText("FORM CUES")).toBeTruthy();
    expect(within(card!).getByText("COMMON ERRORS")).toBeTruthy();
    expect(within(card!).getByLabelText("맨몸 스쿼트 근거 적용 범위")).toBeTruthy();
    expect(within(card!).getByRole("button", { name: "간단히 보기" })).toBeTruthy();
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

  it("switches the seated-work recovery routine and bridges to a light home session", async () => {
    render(createElement(Home));
    const recoveryPanel = screen.getByLabelText("장시간 앉기 뒤 회복 루틴");
    expect(within(recoveryPanel).getByText("5분 자리 리셋")).toBeTruthy();

    fireEvent.click(within(recoveryPanel).getByRole("button", { name: "10분" }));
    expect(within(recoveryPanel).getByText("10분 자리 회복·재시작")).toBeTruthy();
    fireEvent.click(within(recoveryPanel).getByRole("button", { name: "현재 10분 루틴 저장" }));
    expect(within(recoveryPanel).getByText("이 10분 루틴을 저장했습니다.")).toBeTruthy();
    fireEvent.click(within(recoveryPanel).getByRole("button", { name: "이번 10분 루틴 완료 기록" }));
    expect(within(recoveryPanel).getByText("10분 완료 기록을 남겼습니다. 체감을 선택해 주세요.")).toBeTruthy();
    fireEvent.click(within(recoveryPanel).getByRole("button", { name: "가벼워짐" }));
    expect(within(recoveryPanel).getByText(/체감: 가벼워짐/)).toBeTruthy();
    fireEvent.change(within(recoveryPanel).getByLabelText("이번 회복 메모"), { target: { value: "책상 높이를 조정하니 목이 편해짐" } });
    fireEvent.click(within(recoveryPanel).getByRole("button", { name: "메모 저장" }));
    fireEvent.click(within(recoveryPanel).getByRole("button", { name: "5분" }));
    fireEvent.click(within(recoveryPanel).getByRole("button", { name: "이번 5분 루틴 완료 기록" }));
    expect(within(recoveryPanel).getByRole("heading", { name: "최근 회복 기록" })).toBeTruthy();
    const recoverySummary = within(recoveryPanel).getByLabelText("최근 회복 기록 요약");
    expect(within(recoverySummary).getByText("2회")).toBeTruthy();
    expect(within(recoverySummary).getByText("가벼워짐")).toBeTruthy();
    expect(within(recoverySummary).getByText("5분 · 1회")).toBeTruthy();
    expect(within(recoveryPanel).getAllByText("자리 회복", { exact: false }).length).toBeGreaterThan(1);
    const memoSearch = within(recoveryPanel).getByLabelText("회복 메모 검색");
    fireEvent.change(memoSearch, { target: { value: "목이" } });
    expect(within(recoveryPanel).getByText("표시 1/2회")).toBeTruthy();
    fireEvent.click(within(recoveryPanel).getByRole("button", { name: "가벼워짐 기록 필터" }));
    expect(within(recoveryPanel).getByText("표시 1/2회")).toBeTruthy();
    expect(within(recoveryPanel).getByText("책상 높이를 조정하니 목이 편해짐")).toBeTruthy();
    fireEvent.change(memoSearch, { target: { value: "손목" } });
    expect(within(recoveryPanel).getByText("선택한 조건과 메모에 맞는 회복 기록이 없습니다.")).toBeTruthy();
    fireEvent.click(within(recoveryPanel).getByRole("button", { name: "전체 기록 보기" }));
    expect(within(recoveryPanel).getByText("표시 2/2회")).toBeTruthy();
    fireEvent.click(within(recoveryPanel).getAllByRole("button", { name: "다시 열기" })[1]!);
    expect(within(recoveryPanel).getByText("10분 자리 회복·재시작")).toBeTruthy();
    expect(within(recoveryPanel).getByText(/체감: 가벼워짐/)).toBeTruthy();
    expect((within(recoveryPanel).getByLabelText("이번 회복 메모") as HTMLTextAreaElement).value).toBe("책상 높이를 조정하니 목이 편해짐");
    fireEvent.click(within(recoveryPanel).getByRole("button", { name: "10분 자리 회복 기록 삭제" }));
    expect(within(recoveryPanel).getByRole("button", { name: "이번 10분 루틴 완료 기록" })).toBeTruthy();
    expect(within(recoveryPanel).getByText("이 브라우저에 저장된 최근 1회입니다.")).toBeTruthy();
    expect(within(recoverySummary).getByText("1회")).toBeTruthy();
    fireEvent.click(within(recoveryPanel).getByRole("button", { name: "전체 초기화" }));
    expect(within(recoveryPanel).getByText("이 브라우저에 저장된 회복 기록만 지웁니다. 저장한 루틴은 유지됩니다.")).toBeTruthy();
    fireEvent.click(within(recoveryPanel).getByRole("button", { name: "전체 기록 삭제" }));
    expect(within(recoveryPanel).queryByRole("heading", { name: "최근 회복 기록" })).toBeNull();
    expect(within(recoveryPanel).queryByLabelText("최근 회복 기록 요약")).toBeNull();
    expect(within(recoveryPanel).getByText("이 10분 루틴을 저장했습니다.")).toBeTruthy();
    fireEvent.click(within(recoveryPanel).getByRole("button", { name: /15분 가벼운 세션 설계/ }));

    await waitFor(() => expect(document.querySelector(".site-shell")?.classList.contains("scene-session")).toBe(true));
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

  it("keeps sorting visible and explains active conditions with a direct empty-result reset", () => {
    render(createElement(Home));
    const sort = screen.getByLabelText("정렬 기준") as HTMLSelectElement;

    expect(sort.value).toBe("recommended");
    expect(screen.getByText("현재 정렬")).toBeTruthy();
    fireEvent.change(sort, { target: { value: "duration" } });
    expect(screen.getByText("소요 시간순")).toBeTruthy();

    fireEvent.change(screen.getByLabelText("운동 검색"), { target: { value: "존재하지않는운동조건" } });
    expect(screen.getByRole("heading", { name: "일치하는 운동이 없습니다." })).toBeTruthy();
    expect(screen.getByLabelText("적용된 탐색 조건").textContent).toContain("검색 · 존재하지않는운동조건");

    fireEvent.click(screen.getByRole("button", { name: "모든 조건 초기화" }));
    expect((screen.getByLabelText("운동 검색") as HTMLInputElement).value).toBe("");
    expect((screen.getByLabelText("정렬 기준") as HTMLSelectElement).value).toBe("recommended");
    expect(screen.queryByRole("heading", { name: "일치하는 운동이 없습니다." })).toBeNull();
  });

  it("keeps mobile quick navigation and direct session and ROM starts available", async () => {
    render(createElement(Home));
    const quickNav = screen.getByLabelText("모바일 빠른 이동");
    expect(within(quickNav).getByRole("link", { name: "오늘 세션" })).toBeTruthy();
    expect(within(quickNav).getByRole("link", { name: "탐색" })).toBeTruthy();
    expect(screen.getByRole("button", { name: /15분 집에서/ })).toBeTruthy();
    expect(screen.getByText(/준비 · 약/)).toBeTruthy();
    expect(screen.getByText(/주요 움직임 · 약/)).toBeTruthy();
    expect(screen.getByText(/마무리 · 약/)).toBeTruthy();
    expect(screen.getByRole("button", { name: "이번 주 계획에 추가" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "운동 기록 열기" })).toBeTruthy();

    fireEvent.click(within(quickNav).getByRole("link", { name: "오늘 세션" }));
    await waitFor(() => expect(document.querySelector(".site-shell")?.classList.contains("scene-session")).toBe(true));
    fireEvent.click(within(quickNav).getByRole("link", { name: "탐색" }));
    await waitFor(() => expect(document.querySelector(".site-shell")?.classList.contains("scene-explore")).toBe(true));
    const smallRom = screen.getByRole("button", { name: "ROM · 작음" });
    fireEvent.click(smallRom);
    expect(smallRom.getAttribute("aria-pressed")).toBe("true");
  });

  it("keeps exercise cards scannable before opening the detailed movement and evidence guidance", async () => {
    render(createElement(Home));
    const detailTrigger = screen.getAllByRole("button", { name: "자세·근거 보기" })[0];
    const card = detailTrigger.closest("article");
    expect(card).toBeTruthy();
    await waitFor(() => expect(card?.querySelectorAll(".exercise-meta span").length).toBe(2));
    expect(card?.querySelector(".exercise-detail")).toBeNull();
    expect(detailTrigger.getAttribute("aria-expanded")).toBe("false");

    fireEvent.click(detailTrigger);
    expect(card?.querySelector(".exercise-detail")).toBeTruthy();
    expect(within(card!).getByRole("button", { name: "간단히 보기" })).toBeTruthy();
    expect(detailTrigger.getAttribute("aria-expanded")).toBe("true");
    expect(card?.querySelector(".exercise-meta b")?.textContent).toBe("시간");
  });

  it("keeps the selected body region explicit before moving from a related exercise to its detail", async () => {
    render(createElement(Home));
    const selector = screen.getByRole("group", { name: "근육 부위 다중 선택" });
    const back = within(selector).getByRole("button", { name: "등" });
    expect(back.getAttribute("aria-pressed")).toBe("true");
    const relatedList = document.querySelector(".anatomy-exercise-list");
    expect(relatedList?.querySelectorAll("button").length).toBeGreaterThan(0);

    const exercise = relatedList?.querySelector("button") as HTMLButtonElement;
    const name = exercise.querySelector("b")?.textContent;
    expect(name).toBeTruthy();
    fireEvent.click(exercise);
    await waitFor(() => expect(document.querySelector(".site-shell")?.classList.contains("scene-explore")).toBe(true));
    expect((screen.getByLabelText("운동 검색") as HTMLInputElement).value).toBe(name);
  });

  it("keeps an empty progress dashboard focused on the weekly signal and first record action", () => {
    render(createElement(Home));
    expect(screen.getByText("이번 주 피로·통증·ROM 흐름")).toBeTruthy();
    const volumeChart = screen.getByRole("heading", { name: "최근 7일 볼륨" }).closest("div");
    expect(volumeChart).toBeTruthy();
    const firstRecord = screen.getByRole("button", { name: "첫 기록 남기기" });
    fireEvent.click(firstRecord);
    expect(screen.getByRole("dialog", { name: "운동 기록 추가" })).toBeTruthy();
  });

  it("keeps the wellness route and short recovery start available in the reading flow", () => {
    render(createElement(Home));
    const route = document.querySelector(".wellness-toc");
    expect(route?.querySelectorAll("button").length).toBeGreaterThan(0);
    const startRecovery = screen.getByRole("button", { name: "5분 가볍게 시작" });
    fireEvent.click(startRecovery);
    const durationSelector = screen.getByRole("group", { name: "앉은 자세 회복 루틴 시간 선택" });
    expect(within(durationSelector).getByRole("button", { name: "5분" }).getAttribute("aria-pressed")).toBe("true");
  });

  it("moves keyboard context to the active scene after mobile quick navigation", async () => {
    render(createElement(Home));
    fireEvent.click(screen.getByRole("link", { name: "오늘 세션" }));
    const sessionScene = document.getElementById("scene-session");
    await waitFor(() => {
      expect(document.querySelector(".site-shell")?.classList.contains("scene-session")).toBe(true);
      expect(document.activeElement).toBe(sessionScene);
    });
  });

  it("keeps the session plan separated into scannable coaching stages before save or log actions", () => {
    render(createElement(Home));
    const stages = document.querySelectorAll(".session-block");
    expect(stages.length).toBe(3);
    expect(Array.from(stages).map((stage) => stage.querySelector(".small-label")?.textContent)).toEqual(expect.arrayContaining([expect.stringContaining("준비"), expect.stringContaining("주요 움직임"), expect.stringContaining("마무리")]));
    expect(screen.getByRole("button", { name: "이번 주 계획에 추가" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "운동 기록 열기" })).toBeTruthy();
  });
});
