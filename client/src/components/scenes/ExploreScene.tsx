import { ArrowRight, ChevronDown, Loader2, Search } from "lucide-react";
import { ExerciseCard } from "@/components/ExerciseCard";
import { ExploreFilterResultSummary } from "@/components/ExploreFilterResultSummary";
import { ExplorePresetPanel } from "@/components/ExplorePresetPanel";
import { SavedExercisePanel } from "@/components/SavedExercisePanel";
import { SectionTitle } from "@/components/SectionPrimitives";
import { catalogSummary, getCatalogPageCount } from "@/lib/catalogLoader";
import type { ExerciseDetail } from "@/lib/exerciseDetails";
import type { ExerciseSort } from "@/lib/exerciseSorting";
import type { ExploreFilterPreset } from "@/lib/explorePreferences";
import type { ExploreFilters, RomFilter } from "@/lib/exploreFilterState";
import type { RelaxationSuggestion } from "@/lib/filterRelaxation";
import { recoveryGuides } from "@/lib/catalogContent";
import type { Exercise } from "@/lib/catalogTypes";
import { preferredCategoryOptions } from "@/lib/profilePreferences";
import type { getRomReadinessRecommendation } from "@/lib/romReadiness";
import type { DailyCheckin } from "@/lib/dailyCheckin";
import type { ExplorePath } from "@/lib/explorePaths";

const categories = preferredCategoryOptions;

type ExploreSceneProps = {
  filters: ExploreFilters;
  onChangeFilters: (patch: Partial<ExploreFilters>) => void;
  onResetFilters: () => void;
  relaxations: RelaxationSuggestion[];
  onRelax: (key: keyof ExploreFilters) => void;
  activeFilterLabels: string[];
  hasFilterState: boolean;
  sortLabel: string;
  filtersOpen: boolean;
  onToggleFilters: () => void;
  explorePaths: readonly ExplorePath[];
  onApplyPath: (path: ExplorePath) => void;
  onApplySavedPreferences: () => void;
  romReadiness: ReturnType<typeof getRomReadinessRecommendation>;
  onApplyRomReadiness: () => void;
  checkin: DailyCheckin;
  catalogStats: typeof catalogSummary;
  catalogExercises: Exercise[];
  catalogLoading: boolean;
  loadedCatalogPages: number;
  onLoadMore: () => void;
  filteredExercises: Exercise[];
  visibleExercises: Exercise[];
  visibleExerciseCount: number;
  detailsByExerciseId: Map<string, ExerciseDetail>;
  favoriteExerciseIds: string[];
  onToggleFavorite: (exerciseId: string) => void;
  onViewExercise: (exercise: Exercise) => void;
  onFindEasier: (exercise: Exercise) => void;
  filterPresets: ExploreFilterPreset[];
  presetName: string;
  onChangePresetName: (name: string) => void;
  onSavePreset: () => void;
  onApplyPreset: (preset: ExploreFilterPreset) => void;
  onDeletePreset: (preset: ExploreFilterPreset) => void;
  favoriteExercises: Exercise[];
  recentExercises: Exercise[];
  onOpenSavedExercise: (exercise: Exercise) => Promise<void> | void;
};

export function ExploreScene({
  filters,
  onChangeFilters,
  onResetFilters,
  relaxations,
  onRelax,
  activeFilterLabels,
  hasFilterState,
  sortLabel,
  filtersOpen,
  onToggleFilters,
  explorePaths,
  onApplyPath,
  onApplySavedPreferences,
  romReadiness,
  onApplyRomReadiness,
  checkin,
  catalogStats,
  catalogExercises,
  catalogLoading,
  loadedCatalogPages,
  onLoadMore,
  filteredExercises,
  visibleExercises,
  visibleExerciseCount,
  detailsByExerciseId,
  favoriteExerciseIds,
  onToggleFavorite,
  onViewExercise,
  onFindEasier,
  filterPresets,
  presetName,
  onChangePresetName,
  onSavePreset,
  onApplyPreset,
  onDeletePreset,
  favoriteExercises,
  recentExercises,
  onOpenSavedExercise,
}: ExploreSceneProps) {
  const {
    keyword,
    category,
    focus,
    region: regionFilter,
    difficulty,
    equipment,
    sort,
    rom: romFilter,
  } = filters;
  return (
    <section
      id="scene-explore"
      className="scene-view scene-view-explore"
      tabIndex={-1}
    >
      <section id="explore" className="explore-section section-pad">
        <SectionTitle
          eyebrow="EXERCISE LIBRARY"
          title="움직임을 지식으로 익히세요."
          description={`개인용 정적 큐레이션: ${catalogStats.categoryCount}개 카테고리 · ${catalogStats.exerciseCount}개 운동. 카테고리와 목적, 장비로 탐색하고 올바른 자세·효과·안전 단서를 확인하세요.`}
          action={
            <div className="library-actions">
              <span className="library-count">
                {filteredExercises.length} MATCHES · {catalogExercises.length}/
                {catalogStats.exerciseCount}
              </span>
            </div>
          }
        />
        <div className="search-panel">
          <div className="search-field">
            <Search size={18} />
            <input
              value={keyword}
              onChange={event =>
                onChangeFilters({ keyword: event.target.value })
              }
              placeholder="운동, 부위, 장비 검색"
              aria-label="운동 검색"
            />
          </div>
          <div className="explore-primary-controls">
            <label className="sort-select">
              정렬
              <select
                value={sort}
                onChange={event =>
                  onChangeFilters({
                    sort: event.target.value as ExerciseSort,
                  })
                }
                aria-label="정렬 기준"
              >
                <option value="recommended">추천순</option>
                <option value="difficulty">난이도순</option>
                <option value="duration">시간순</option>
              </select>
            </label>
            <p>
              <span>현재 정렬</span>
              <b>{sortLabel}</b>
            </p>
          </div>
          <div
            className="quick-category-filter"
            role="group"
            aria-label="운동 종류 빠른 필터"
          >
            <div className="quick-category-head">
              <div>
                <p className="small-label">EXERCISE TYPE</p>
                <b>운동 종류 빠른 선택</b>
                <span aria-live="polite">
                  {category === "전체"
                    ? `전체 ${filteredExercises.length}개 표시`
                    : `${category} ${filteredExercises.length}개 표시`}
                </span>
              </div>
              <div className="filter-head-actions">
                <button
                  className="preference-filter-button"
                  onClick={onApplySavedPreferences}
                >
                  선호 조건 적용
                </button>
                {hasFilterState && (
                  <button className="filter-reset" onClick={onResetFilters}>
                    조건 초기화
                  </button>
                )}
              </div>
            </div>
            <div className="quick-category-options">
              {categories.map(item => (
                <button
                  key={item}
                  className={category === item ? "filter-active" : ""}
                  aria-pressed={category === item}
                  onClick={() => onChangeFilters({ category: item })}
                >
                  {item === "전체" ? "전체 보기" : item}
                </button>
              ))}
            </div>
          </div>
          <div className="advanced-filter-control">
            <div>
              <p className="small-label">MORE FILTERS</p>
              <span>
                {activeFilterLabels.length
                  ? `${activeFilterLabels.length}개 조건 적용됨`
                  : "필요할 때만 조건을 더하세요"}
              </span>
            </div>
            <button
              onClick={onToggleFilters}
              aria-expanded={filtersOpen}
              aria-controls="advanced-exercise-filters"
            >
              {filtersOpen ? "상세 조건 닫기" : "부위·목적·난이도 상세 조건"}
              <ChevronDown size={15} />
            </button>
          </div>
          {filtersOpen && (
            <div id="advanced-exercise-filters" className="filter-row">
              <select
                value={regionFilter}
                onChange={event =>
                  onChangeFilters({ region: event.target.value })
                }
                aria-label="부위 필터"
              >
                <option>전체</option>
                {Object.keys(recoveryGuides).map(region => (
                  <option key={region}>{region}</option>
                ))}
              </select>
              <select
                value={focus}
                onChange={event =>
                  onChangeFilters({ focus: event.target.value })
                }
                aria-label="목적 필터"
              >
                <option>전체</option>
                <option>근력</option>
                <option>체력</option>
                <option>심폐</option>
                <option>가동성</option>
                <option>균형</option>
                <option>협응</option>
                <option>파워</option>
              </select>
              <select
                value={difficulty}
                onChange={event =>
                  onChangeFilters({ difficulty: event.target.value })
                }
                aria-label="난이도 필터"
              >
                <option>전체</option>
                <option>입문</option>
                <option>중급</option>
                <option>상급</option>
              </select>
              <select
                value={equipment}
                onChange={event =>
                  onChangeFilters({ equipment: event.target.value })
                }
                aria-label="장비 필터"
              >
                <option>전체</option>
                <option>장비 없음</option>
                <option>장비 필요</option>
              </select>
            </div>
          )}
          <ExploreFilterResultSummary
            filteredCount={filteredExercises.length}
            visibleCount={visibleExercises.length}
            loadedCount={catalogExercises.length}
            totalCount={catalogStats.exerciseCount}
            activeFilterLabels={activeFilterLabels}
          />
        </div>
        <details className="explore-more">
          {/* 첫 화면에 운동이 보이도록, 자주 쓰지 않는 조건은 접어 둔다.
              이전에는 이 블록들이 검색 위에 쌓여 모바일에서 첫 운동이 3.3화면 아래 있었다. */}
          <summary>
            <span>상세 조건</span>
            <small>ROM · 시작점 · 저장한 조건</small>
          </summary>
          <div
            className="rom-filter"
            role="group"
            aria-label="가동 범위 ROM 필터"
          >
            {(["전체", "작음", "보통", "큼"] as RomFilter[]).map(item => (
              <button
                key={item}
                className={romFilter === item ? "is-selected" : ""}
                aria-pressed={romFilter === item}
                onClick={() => onChangeFilters({ rom: item })}
              >
                {item === "전체" ? "ROM 전체" : `ROM · ${item}`}
              </button>
            ))}
          </div>
          <div className="rom-readiness-inline">
            <span>오늘의 ROM</span>
            <b>{romReadiness.title}</b>
            <p>
              통증 {checkin.pain}/5 · 에너지 {checkin.energy}/5
            </p>
            <button onClick={onApplyRomReadiness}>
              {romReadiness.actionLabel} <ArrowRight size={13} />
            </button>
          </div>
          <section className="explore-launcher" aria-label="빠른 운동 시작">
            <div className="explore-launcher-head">
              <div>
                <p className="eyebrow">01 / CHOOSE A START</p>
                <h3>어떻게 움직이고 싶나요?</h3>
              </div>
              <p>
                한 가지 시작점을 고르면 결과를 바로 좁힙니다. 이후
                부위·난이도·장비 조건을 더할 수 있습니다.
              </p>
            </div>
            <div className="explore-paths">
              {explorePaths.map(path => {
                const Icon = path.icon;
                const isSelected =
                  category === path.category &&
                  focus === path.focus &&
                  equipment === path.equipment;
                return (
                  <button
                    key={path.id}
                    className={isSelected ? "is-selected" : ""}
                    aria-pressed={isSelected}
                    onClick={() => onApplyPath(path)}
                  >
                    <Icon size={20} />
                    <span>{path.label}</span>
                    <small>{path.description}</small>
                    <ArrowRight size={16} />
                  </button>
                );
              })}
            </div>
            <div className="explore-selection-state">
              <span>현재 조건</span>
              <b>
                {category === "전체" && focus === "전체" && equipment === "전체"
                  ? "모든 운동 보기"
                  : [
                      category !== "전체" ? category : null,
                      focus !== "전체" ? focus : null,
                      equipment !== "전체" ? equipment : null,
                    ]
                      .filter(Boolean)
                      .join(" · ")}
              </b>
              <p>
                <strong>{filteredExercises.length}개</strong> 운동을 바로 살펴볼
                수 있습니다.
              </p>
            </div>
          </section>
          <ExplorePresetPanel
            presetName={presetName}
            presets={filterPresets}
            onPresetName={onChangePresetName}
            onSave={onSavePreset}
            onApply={onApplyPreset}
            onDelete={onDeletePreset}
          />
        </details>
        <div
          className="mobile-explore-rail"
          aria-label="모바일 탐색 결과 위치"
          aria-live="polite"
        >
          <span>RESULT ROUTE</span>
          <b>
            {visibleExercises.length} / {filteredExercises.length}
          </b>
          <p>
            {activeFilterLabels.length
              ? activeFilterLabels.join(" · ")
              : "전체 카탈로그"}
          </p>
        </div>
        <div className="exercise-grid">
          {visibleExercises.map((exercise, index) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              detail={detailsByExerciseId.get(exercise.id)!}
              index={index}
              isFavorite={favoriteExerciseIds.includes(exercise.id)}
              onToggleFavorite={() => onToggleFavorite(exercise.id)}
              onViewed={() => onViewExercise(exercise)}
              onAlt={() => onFindEasier(exercise)}
            />
          ))}
        </div>
        <div className="saved-exercise-panels" aria-label="빠른 운동 탐색">
          <SavedExercisePanel
            kind="recent"
            exercises={recentExercises}
            onOpen={onOpenSavedExercise}
          />
          <SavedExercisePanel
            kind="favorite"
            exercises={favoriteExercises}
            onOpen={onOpenSavedExercise}
          />
        </div>
        {filteredExercises.length === 0 && (
          <div className="empty-library">
            <Search size={26} />
            <div>
              <h3>일치하는 운동이 없습니다.</h3>
              {relaxations.length > 0 ? (
                <>
                  <p>
                    조건 하나만 풀면 다시 결과가 나옵니다. 어떤 조건이 막고
                    있는지 아래에서 고르세요.
                  </p>
                  <div
                    className="empty-library-relaxations"
                    aria-label="조건 하나만 풀어 보기"
                  >
                    {relaxations.map(item => (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => onRelax(item.key)}
                      >
                        <b>
                          {item.label} · {item.value}
                        </b>
                        <span>{item.count}개 표시</span>
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <p>
                  검색어 또는 적용 조건을 하나씩 줄여 보세요. 전체 카탈로그로
                  즉시 돌아갈 수도 있습니다.
                </p>
              )}
              <button className="outline-button" onClick={onResetFilters}>
                모든 조건 초기화
              </button>
            </div>
          </div>
        )}
        {filteredExercises.length > 0 &&
          (visibleExerciseCount < filteredExercises.length ||
            loadedCatalogPages < getCatalogPageCount()) && (
            <div className="catalog-pagination">
              <p aria-live="polite">
                {visibleExercises.length}개 표시 · {catalogExercises.length}/
                {catalogStats.exerciseCount}개 카탈로그를 불러왔습니다.
              </p>
              <button
                className="outline-button catalog-load-more"
                onClick={() => void onLoadMore()}
                disabled={catalogLoading}
              >
                {catalogLoading ? (
                  <>
                    <Loader2 size={15} className="animate-spin" /> 불러오는 중
                  </>
                ) : (
                  <>
                    운동 100개 더 보기 <ArrowRight size={15} />
                  </>
                )}
              </button>
            </div>
          )}
      </section>
    </section>
  );
}
