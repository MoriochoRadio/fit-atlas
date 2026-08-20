import { X } from "lucide-react";
import type { ExploreFilterPreset } from "@/lib/explorePreferences";

type ExplorePresetPanelProps = {
  presetName: string;
  presets: ExploreFilterPreset[];
  onPresetName: (value: string) => void;
  onSave: () => void;
  onApply: (preset: ExploreFilterPreset) => void;
  onDelete: (preset: ExploreFilterPreset) => void;
};

export function ExplorePresetPanel({ presetName, presets, onPresetName, onSave, onApply, onDelete }: ExplorePresetPanelProps) {
  return <section className="explore-preset-panel" aria-label="저장한 탐색 필터"><div className="explore-preset-head"><div><p className="small-label">FILTER PRESETS</p><h3>자주 쓰는 조건</h3><p>현재 검색·필터·정렬 조합을 이 기기에 저장해 다음에도 바로 적용하세요.</p></div><div className="explore-preset-save"><label>프리셋 이름<input value={presetName} maxLength={28} onChange={(event) => onPresetName(event.target.value)} placeholder="예: 퇴근 후 가벼운 전신" aria-label="필터 프리셋 이름" /></label><button type="button" onClick={onSave}>현재 조건 저장</button></div></div>{presets.length ? <div className="explore-preset-list">{presets.map((preset) => <article key={preset.id}><button type="button" onClick={() => onApply(preset)}><b>{preset.name}</b><span>{[preset.category, preset.focus, preset.region, preset.difficulty, preset.equipment, preset.rom !== "전체" ? `ROM ${preset.rom}` : null].filter((item) => item && item !== "전체").join(" · ") || "전체 조건"}</span></button><button type="button" className="preset-delete-button" aria-label={`${preset.name} 프리셋 삭제`} onClick={() => onDelete(preset)}><X size={14} /></button></article>)}</div> : <p className="explore-preset-empty">저장한 조건이 없습니다. 자주 쓰는 검색 조합을 이름으로 저장해 보세요.</p>}</section>;
}
