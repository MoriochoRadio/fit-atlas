import type { AsciiDiagramPresentation } from "./asciiMovementDiagrams";

export type RomRecommendation = {
  title: string;
  intro: string;
  stretch: string[];
  alternatives: string[];
  caution: string;
};

export function getRomRecommendation(presentation: AsciiDiagramPresentation): RomRecommendation {
  if (presentation.rom === "작음") return {
    title: "작은 ROM · 안정부터 확인",
    intro: `${presentation.jointFocus} 중심축을 흔들지 않고, 작은 범위에서 편안한 리듬을 찾는 선택입니다.`,
    stretch: ["호흡을 내쉬며 관절 주변의 긴장을 가볍게 풀고, 통증 없는 범위에서 3~5회만 움직입니다.", "정지 자세라면 지지면을 넓히거나 지지대를 추가해 중심축을 먼저 안정시킵니다."],
    alternatives: ["벽·벤치·의자 지지를 활용한 같은 패턴", "가동 범위는 유지하고 시간·반복을 줄인 버전"],
    caution: "날카로운 통증, 저림, 힘 빠짐이 있거나 움직일수록 불편감이 커지면 범위를 늘리지 말고 중단하세요.",
  };
  if (presentation.rom === "큼") return {
    title: "큰 ROM · 범위보다 제어",
    intro: `${presentation.jointFocus}가 넓게 움직이는 패턴입니다. 가장 깊은 지점보다 안정적으로 돌아올 수 있는 범위를 우선합니다.`,
    stretch: ["가벼운 반복으로 관절을 데운 뒤, 매 반복에서 호흡이 유지되는 지점까지만 천천히 넓힙니다.", "가동 전후에 짧은 보행 또는 부담 없는 관절 움직임으로 반응을 확인합니다."],
    alternatives: ["의자·박스·낮은 스텝을 이용해 깊이를 줄인 버전", "가벼운 부하 또는 맨몸으로 전환한 버전"],
    caution: "반동으로 범위를 만들지 마세요. 관절 통증이나 정렬 붕괴가 나타나면 즉시 작은 범위로 낮추거나 중단하세요.",
  };
  return {
    title: "보통 ROM · 편안한 경로 유지",
    intro: `${presentation.jointFocus}의 자연스러운 움직임 경로를 따라, 속도보다 일관된 제어를 연습하는 선택입니다.`,
    stretch: ["첫 1~2회는 낮은 저항으로 움직이며 좌우 차이·호흡·불편감을 확인합니다.", "관절을 끝 범위로 밀기보다, 부드럽게 돌아올 수 있는 지점에서 방향을 바꿉니다."],
    alternatives: ["중량·저항을 낮추고 같은 경로를 유지한 버전", "지지대 또는 보조 기구를 이용한 안정된 버전"],
    caution: "불편감이 누적되거나 관절이 흔들리면 반복 수·저항·범위 중 한 가지를 먼저 줄이세요.",
  };
}
