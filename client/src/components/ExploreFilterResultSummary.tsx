type ExploreFilterResultSummaryProps = {
  filteredCount: number;
  visibleCount: number;
  loadedCount: number;
  totalCount: number;
  activeFilterLabels: string[];
};

export function ExploreFilterResultSummary({ filteredCount, visibleCount, loadedCount, totalCount, activeFilterLabels }: ExploreFilterResultSummaryProps) {
  return <section className="explore-result-summary" aria-live="polite"><div><p className="small-label">FILTERED RESULTS</p><b>{filteredCount.toLocaleString()}<small>개 일치</small></b><p>{filteredCount ? `${visibleCount}개를 먼저 표시합니다. ${loadedCount.toLocaleString()}/${totalCount.toLocaleString()}개 카탈로그에서 탐색 중입니다.` : "일치하는 운동이 없습니다. 아래 조건을 초기화하거나 한 단계씩 덜어 보세요."}</p></div>{activeFilterLabels.length ? <div className="explore-filter-chips" aria-label="적용된 탐색 조건">{activeFilterLabels.map((label) => <span key={label}>{label}</span>)}</div> : <p className="explore-filter-hint">종류를 고른 뒤, 필요할 때만 부위·목적·난이도를 더해 보세요.</p>}</section>;
}
