import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { describe, expect, it } from "vitest";
import { MovementVisualGuide, RecoveryPathwayPanel, RecoveryStageGrid, SeatedRecoveryPanel, WellnessDetailPanel } from "@/components/GuidancePanels";
import { getMovementVisual } from "@/lib/movementVisuals";
import { recoveryStageGuides } from "@/lib/recoveryProtocols";
import { wellnessDetails } from "@/lib/wellnessDetails";
import { getRecoveryPathway, recoveryPathways } from "@/lib/recoveryPathways";

describe("guidance panels", () => {
  it("renders a new exercise visual with labelled stages and pose classes", () => {
    const guide = getMovementVisual("snap-down");
    expect(guide).toBeDefined();
    if (!guide) throw new Error("스냅 다운 시각 가이드가 없습니다.");
    const markup = renderToStaticMarkup(createElement(MovementVisualGuide, guide));
    expect(markup).toContain("스냅 다운 흐름");
    expect(markup).toContain("pose-squat");
    expect(markup).toContain("착지");
  });

  it("renders all recovery stages and sleep safety detail in the UI markup", () => {
    const recoveryMarkup = renderToStaticMarkup(createElement(RecoveryStageGrid, { stages: recoveryStageGuides.하체 }));
    const wellnessMarkup = renderToStaticMarkup(createElement(WellnessDetailPanel, { detail: wellnessDetails["카페인·운동·수면 일지"] }));
    expect(recoveryMarkup).toContain("운동 전 준비");
    expect(recoveryMarkup).toContain("운동 후 회복");
    expect(recoveryMarkup).toContain("부하 재개");
    expect(wellnessMarkup).toContain("지속적인 불면");
  });
  it("renders the joint pathway tabs, alternatives, and stop signals in the UI markup", () => {
    const pathway = getRecoveryPathway("ankle");
    const markup = renderToStaticMarkup(createElement(RecoveryPathwayPanel, { pathways: recoveryPathways, pathway, alternatives: [{ id: "ankle-knee-to-wall", name: "발목 니투월 락", category: "모빌리티" }], onChoose: () => undefined, onExplore: () => undefined }));
    expect(markup).toContain("발목 불편");
    expect(markup).toContain("발목 니투월 락");
    expect(markup).toContain("자가 진행을 멈출 신호");
  });

  it("renders the seated-work recovery routine, today adjustment, stop signals, and session bridge", () => {
    const markup = renderToStaticMarkup(createElement(SeatedRecoveryPanel, { duration: 5, onDuration: () => undefined, recommendation: { mode: "recovery", title: "", guidance: "", rpeAdjustment: "" }, recoveryContext: "none", onExplore: () => undefined, onBuildSession: () => undefined }));
    expect(markup).toContain("5분 자리 리셋");
    expect(markup).toContain("회복 우선 조정");
    expect(markup).toContain("멈추고 평가가 필요한 신호");
    expect(markup).toContain("15분 가벼운 세션 설계");
    expect(markup).toContain("CDC/NIOSH 작업 인체공학 참고");
  });
});
