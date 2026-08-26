/** 앱은 한 화면 안에서 여섯 개의 장면을 오간다. 각 장면은 URL 해시로도 직접 열린다. */
export type CinematicScene =
  | "home"
  | "session"
  | "explore"
  | "anatomy"
  | "progress"
  | "wellness";

export const sceneByHash: Record<string, CinematicScene> = {
  "#top": "home",
  "#session": "session",
  "#explore": "explore",
  "#anatomy": "anatomy",
  "#progress": "progress",
  "#wellness": "wellness",
};
