import { recoveryGuides, wellnessCards } from "@/lib/catalogContent";
import { catalogSummary, entriesToExercises, getCatalogPageCount, getInitialCatalogEntries, loadCatalogEntriesByIds, loadCatalogPage, loadFullCatalog } from "@/lib/catalogLoader";
import type { BodyRegion, Exercise, ExerciseDetail } from "@/lib/catalogTypes";
import { aerobicIntervalTemplates } from "@/lib/aerobicIntervals";
import { lowNoiseCircuitTemplates } from "@/lib/lowNoiseCircuits";
import { lifeStageGuides, startChecklist } from "@/lib/lifeStageGuidance";
import { Activity, ArrowRight, BarChart3, BookOpen, Brain, CalendarDays, Check, ChevronDown, ChevronRight, Dumbbell, HeartPulse, History, Loader2, Menu, Plus, Search, ShieldCheck, Sparkles, Star, Timer, X } from "lucide-react";
import React, { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { getCalendarDays, getFourWeekTrends, getPersonalRecords, getTotalMinutes, getTotalVolume, getWeeklyVolume, type TrainingLog } from "@/lib/trainingMetrics";
import { getPersonalizedProgram } from "@/lib/personalization";
import { atlasMotionSpeeds, atlasThemes, defaultAtlasInteractionPreferences, defaultAtlasTheme, defaultSceneExperiencePreferences, downloadBackup, parseBackup, readAtlasInteractionPreferences, readAtlasTheme, readAxisVisibility, readLocalCheckin, readLocalExplorePreferences, readLocalProfile, readLocalRomStatusHistory, readLocalWeeklyPlan, readSceneExperiencePreferences, readTrainingLogs, saveAtlasInteractionPreferences, saveAtlasTheme, saveAxisVisibility, saveLocalCheckin, saveLocalExplorePreferences, saveLocalProfile, saveLocalRomStatusHistory, saveLocalWeeklyPlan, saveSceneExperiencePreferences, saveTrainingLogs, type AtlasMotionSpeed, type AtlasTheme, type HeroEquipment, type SceneExperiencePreferences } from "@/lib/localStore";
import { defaultExplorePreferences, recordRecentExercise, removeExploreFilterPreset, saveExploreFilterPreset, toggleFavoriteExercise, type ExploreFilterPreset, type ExplorePreferences } from "@/lib/explorePreferences";
import { filterExercises } from "@/lib/exerciseFilters";
import { sortExercises, type ExerciseSort } from "@/lib/exerciseSorting";
import { recoveryProtocols, recoveryStageGuides } from "@/lib/recoveryProtocols";
import { applyRecoveryExplore, getRecoveryPathway, recoveryPathways, type RecoveryPathwayId } from "@/lib/recoveryPathways";
import { getInsightSummary } from "@/lib/trainingInsights";
import { wellnessDetails } from "@/lib/wellnessDetails";
import { getMovementVisual } from "@/lib/movementVisuals";
import { getExerciseTextGuide, type ExerciseTextGuide } from "@/lib/exerciseTextGuide";
import { getAsciiDiagramPresentation, getAsciiMovementDiagram } from "@/lib/asciiMovementDiagrams";
import { getRomRecommendation } from "@/lib/romRecommendations";
import { getRomReadinessRecommendation } from "@/lib/romReadiness";
import { createRomStatusRecord, getCurrentWeekRomStatus, getFourWeekRomStatus, mergeRomStatusHistory, type RomStatusRecord } from "@/lib/romStatusHistory";
import { getExerciseEvidenceScope } from "@/lib/exerciseEvidence";
import { MovementVisualGuide, RecoveryPathwayPanel, RecoveryStageGrid, SeatedRecoveryPanel, WellnessDetailPanel } from "@/components/GuidancePanels";
import { getRoutineTemplate, type RoutineGoal } from "@/lib/routineTemplates";
import { getCheckinRecommendation, type DailyCheckin } from "@/lib/dailyCheckin";
import { buildSession, type SessionBlock, type SessionEnvironment, type SessionGoal, type SessionDuration } from "@/lib/sessionBuilder";
import { addDesignedSession, addRomAlternativeToWeeklyPlan, completeWeeklySessionWithRecord, getWeeklyPlanInsight, setWeeklyGoal, toggleWeeklySession, type WeeklyPlan } from "@/lib/weeklyPlan";
import type { RecoveryContext, SeatedRecoveryDuration } from "@/lib/seatedRecovery";
import { preferredCategoryOptions, preferredEnvironmentOptions, preferredEquipmentOptions } from "@/lib/profilePreferences";

type LogEntry = TrainingLog;
type CinematicScene = "home" | "session" | "explore" | "anatomy" | "progress" | "wellness";
const sceneByHash: Record<string, CinematicScene> = { "#top": "home", "#session": "session", "#explore": "explore", "#anatomy": "anatomy", "#progress": "progress", "#wellness": "wellness" };
type RomFilter = "전체" | "작음" | "보통" | "큼";
type RomRecommendationTarget = { exerciseName: string; presentation: ReturnType<typeof getAsciiDiagramPresentation> };
type AnatomyMuscleRoles = { primary: BodyRegion[]; supporting: BodyRegion[] } | null;
const AsciiInteractionContext = React.createContext<{ showAxis: boolean; pendingExerciseName: string | null; clearPendingExercise: () => void; onOpenRom: (exerciseName: string, presentation: ReturnType<typeof getAsciiDiagramPresentation>) => void; onExploreAlternative: (exerciseName: string) => void; onAddToTodayRoutine: (exerciseName: string) => void }>({ showAxis: true, pendingExerciseName: null, clearPendingExercise: () => undefined, onOpenRom: () => undefined, onExploreAlternative: () => undefined, onAddToTodayRoutine: () => undefined });

const categories = preferredCategoryOptions;
const LazyAnatomyMap = lazy(() => import("@/components/AnatomyMap").then((module) => ({ default: module.AnatomyMap })));
const AnatomyMap = ({ activeRegion, selectedRegions, onToggleRegion, muscleRoles }: { activeRegion: BodyRegion; selectedRegions: BodyRegion[]; onToggleRegion: (region: BodyRegion) => void; muscleRoles: AnatomyMuscleRoles }) => <Suspense fallback={<div className="anatomy-model-loading" role="status">근육 모델 불러오는 중</div>}><LazyAnatomyMap activeRegion={activeRegion} selectedRegions={selectedRegions} onToggleRegion={onToggleRegion} muscleRoles={muscleRoles} /></Suspense>;
const LazyHeroGymMachine3D = lazy(() => import("@/components/HeroGymMachine3D").then((module) => ({ default: module.HeroGymMachine3D })));
const HeroGymMachine3D = ({ goal, environment, completion, equipment, resistance, nodes, onEquipment, onResistance, onOpenNode }: { goal: SessionGoal; environment: SessionEnvironment; completion: number; equipment: HeroEquipment; resistance: number; nodes: string[]; onEquipment: (equipment: HeroEquipment) => void; onResistance: (resistance: number) => void; onOpenNode: (index: number) => void }) => <Suspense fallback={<div className="hero-machine-loading" role="status">오늘의 장비를 준비하는 중</div>}><LazyHeroGymMachine3D goal={goal} environment={environment} completion={completion} equipment={equipment} resistance={resistance} nodes={nodes} onEquipment={onEquipment} onResistance={onResistance} onOpenNode={onOpenNode} /></Suspense>;
const LazyWeeklyAtlasDetailReport = lazy(() => import("@/components/WeeklyAtlasDetailReport").then((module) => ({ default: module.WeeklyAtlasDetailReport })));
const WeeklyAtlasDetailReport = (props: React.ComponentProps<typeof LazyWeeklyAtlasDetailReport>) => <Suspense fallback={<div className="weekly-atlas-detail-report weekly-atlas-loading" role="status">주간 흐름을 준비하는 중</div>}><LazyWeeklyAtlasDetailReport {...props} /></Suspense>;
const LazyHeroRecentEquipmentResume = lazy(() => import("@/components/HeroRecentEquipmentResume").then((module) => ({ default: module.HeroRecentEquipmentResume })));
const HeroRecentEquipmentResume = (props: React.ComponentProps<typeof LazyHeroRecentEquipmentResume>) => <Suspense fallback={null}><LazyHeroRecentEquipmentResume {...props} /></Suspense>;
const LazyHeroAtlasControl = lazy(() => import("@/components/HeroAtlasControl").then((module) => ({ default: module.HeroAtlasControl })));
type HeroAtlasControlProps = { theme: AtlasTheme; motionSpeed: AtlasMotionSpeed; onTheme: (theme: AtlasTheme) => void; onMotionSpeed: (speed: AtlasMotionSpeed) => void; performanceText: string; feedback: string };
const HeroAtlasControl = (props: HeroAtlasControlProps) => <Suspense fallback={<div className="atlas-theme-control" role="status">아틀라스 제어를 준비하는 중</div>}><LazyHeroAtlasControl {...props} /></Suspense>;
const LazyExplorePresetPanel = lazy(() => import("@/components/ExplorePresetPanel").then((module) => ({ default: module.ExplorePresetPanel })));
type ExplorePresetPanelProps = React.ComponentProps<typeof LazyExplorePresetPanel>;
const ExplorePresetPanel = (props: ExplorePresetPanelProps) => <Suspense fallback={<div className="explore-preset-panel" role="status">필터 프리셋을 준비하는 중</div>}><LazyExplorePresetPanel {...props} /></Suspense>;
const LazySceneExperienceDialog = lazy(() => import("@/components/SceneExperienceDialog").then((module) => ({ default: module.SceneExperienceDialog })));
type SceneExperienceDialogProps = React.ComponentProps<typeof LazySceneExperienceDialog>;
const SceneExperienceDialog = (props: SceneExperienceDialogProps) => <Suspense fallback={null}><LazySceneExperienceDialog {...props} /></Suspense>;
const LazyRomStatusDashboard = lazy(() => import("@/components/RomStatusDashboard").then((module) => ({ default: module.RomStatusDashboard })));
type RomStatusDashboardProps = React.ComponentProps<typeof LazyRomStatusDashboard>;
const RomStatusDashboard = (props: RomStatusDashboardProps) => <Suspense fallback={<div className="rom-status-dashboard" role="status">주간 상태 흐름을 준비하는 중</div>}><LazyRomStatusDashboard {...props} /></Suspense>;
const LazyExploreFilterResultSummary = lazy(() => import("@/components/ExploreFilterResultSummary").then((module) => ({ default: module.ExploreFilterResultSummary })));
type ExploreFilterResultSummaryProps = React.ComponentProps<typeof LazyExploreFilterResultSummary>;
const ExploreFilterResultSummary = (props: ExploreFilterResultSummaryProps) => <Suspense fallback={null}><LazyExploreFilterResultSummary {...props} /></Suspense>;
const LazyExerciseCardSummary = lazy(() => import("@/components/ExerciseCardSummary").then((module) => ({ default: module.ExerciseCardSummary })));
type ExerciseCardSummaryProps = React.ComponentProps<typeof LazyExerciseCardSummary>;
const ExerciseCardSummary = (props: ExerciseCardSummaryProps) => <Suspense fallback={null}><LazyExerciseCardSummary {...props} /></Suspense>;
const LazySavedExercisePanel = lazy(() => import("@/components/SavedExercisePanel").then((module) => ({ default: module.SavedExercisePanel })));
type SavedExercisePanelProps = React.ComponentProps<typeof LazySavedExercisePanel>;
const SavedExercisePanel = (props: SavedExercisePanelProps) => <Suspense fallback={null}><LazySavedExercisePanel {...props} /></Suspense>;
const goalCopy = { 근력증가: "strength", 체력증가: "endurance", 다이어트: "weight_management" } as const;
const catalogPageSize = catalogSummary.pageSize;
const initialVisibleExerciseCount = 18;
const explorePaths = [
  { id: "home", label: "집에서 맨몸", description: "장비 없이 바로 시작", category: "맨몸운동", focus: "전체", equipment: "장비 없음", icon: Activity },
  { id: "gym", label: "헬스장 기구", description: "기구·케이블 중심", category: "헬스기구", focus: "전체", equipment: "장비 필요", icon: Dumbbell },
  { id: "cardio", label: "달리기·유산소", description: "심폐 리듬 만들기", category: "러닝", focus: "심폐", equipment: "전체", icon: HeartPulse },
  { id: "mobility", label: "가볍게 회복", description: "가동성·저강도 움직임", category: "전체", focus: "가동성", equipment: "전체", icon: Sparkles },
] as const;
const sessionQuickStarts: { id: string; label: string; detail: string; goal: SessionGoal; environment: SessionEnvironment; duration: SessionDuration }[] = [
  { id: "quick-home", label: "15분 집에서", detail: "가볍게 전신 깨우기", goal: "all_round", environment: "home", duration: 15 },
  { id: "quick-gym", label: "30분 헬스장", detail: "기초 근력에 집중", goal: "strength", environment: "gym", duration: 30 },
  { id: "quick-outdoor", label: "30분 야외", detail: "심폐 리듬 만들기", goal: "endurance", environment: "outdoor", duration: 30 },
] as const;
const equipmentSessionSetup: Record<HeroEquipment, { goal: SessionGoal; label: string; goalLabel: string }> = {
  cable: { goal: "strength", label: "케이블 머신", goalLabel: "기초 근력" },
  dumbbell: { goal: "all_round", label: "덤벨", goalLabel: "전신 균형" },
  treadmill: { goal: "endurance", label: "트레드밀", goalLabel: "심폐 리듬" },
};

function SectionTitle({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: React.ReactNode }) {
  return <div className="section-heading"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2><p className="section-description">{description}</p></div>{action}</div>;
}

const wellnessJumpItems = [
  { id: "recovery", label: "회복 시작" },
  { id: "wellness", label: "생활 습관" },
  { id: "cardio-intervals", label: "유산소" },
  { id: "quiet-circuits", label: "무점프" },
  { id: "start-safely", label: "안전" },
] as const;

function WellnessQuickNav({ onJump }: { onJump: (id: string) => void }) {
  const [activeSection, setActiveSection] = useState<(typeof wellnessJumpItems)[number]["id"]>("recovery");
  useEffect(() => {
    if (typeof window === "undefined" || !window.IntersectionObserver) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];
      if (visible && wellnessJumpItems.some((item) => item.id === visible.target.id)) setActiveSection(visible.target.id as (typeof wellnessJumpItems)[number]["id"]);
    }, { rootMargin: "-20% 0px -62% 0px", threshold: [0.15, 0.4, 0.7] });
    wellnessJumpItems.forEach((item) => { const target = document.getElementById(item.id); if (target) observer.observe(target); });
    return () => observer.disconnect();
  }, []);
  return <nav className="wellness-toc" aria-label="웰니스 화면 빠른 이동"><span>빠른 이동</span>{wellnessJumpItems.map((item) => <button type="button" key={item.id} className={activeSection === item.id ? "is-active" : ""} aria-current={activeSection === item.id ? "location" : undefined} onClick={() => { setActiveSection(item.id); onJump(item.id); }}>{item.label}</button>)}</nav>;
}

function playSceneTransitionSound() {
  if (typeof window === "undefined") return;
  const AudioContextConstructor = window.AudioContext ?? (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextConstructor) return;
  try {
    const context = new AudioContextConstructor();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const now = context.currentTime;
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(330, now);
    oscillator.frequency.exponentialRampToValueAtTime(520, now + .16);
    gain.gain.setValueAtTime(.0001, now);
    gain.gain.exponentialRampToValueAtTime(.045, now + .025);
    gain.gain.exponentialRampToValueAtTime(.0001, now + .21);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start(now);
    oscillator.stop(now + .22);
    window.setTimeout(() => void context.close(), 280);
  } catch {
    // Audio output is optional and must never block scene navigation.
  }
}

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("전체");
  const [focus, setFocus] = useState("전체");
  const [regionFilter, setRegionFilter] = useState("전체");
  const [difficulty, setDifficulty] = useState("전체");
  const [equipment, setEquipment] = useState("전체");
  const [sort, setSort] = useState<ExerciseSort>("recommended");
  const [romFilter, setRomFilter] = useState<RomFilter>("전체");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [atlasTheme, setAtlasTheme] = useState<AtlasTheme>(() => typeof window === "undefined" ? defaultAtlasTheme : readAtlasTheme());
  const [atlasInteraction, setAtlasInteraction] = useState(() => typeof window === "undefined" ? defaultAtlasInteractionPreferences : readAtlasInteractionPreferences());
  const [atlasTransition, setAtlasTransition] = useState<"theme" | "route" | null>(null);
  const [atlasFeedback, setAtlasFeedback] = useState("");
  const [activeAtlasNode, setActiveAtlasNode] = useState<number | null>(null);
  const [atlasNodeDraft, setAtlasNodeDraft] = useState({ label: "", minutes: "", items: "" });
  const [axisVisible, setAxisVisible] = useState(() => typeof window === "undefined" ? true : readAxisVisibility());
  const [romRecommendationTarget, setRomRecommendationTarget] = useState<RomRecommendationTarget | null>(null);
  const [pendingExerciseName, setPendingExerciseName] = useState<string | null>(null);
  const [catalogEntries, setCatalogEntries] = useState(() => getInitialCatalogEntries());
  const [loadedCatalogPages, setLoadedCatalogPages] = useState(1);
  const [visibleExerciseCount, setVisibleExerciseCount] = useState<number>(initialVisibleExerciseCount);
  const [catalogLoading, setCatalogLoading] = useState(false);
  const [explorePreferences, setExplorePreferences] = useState<ExplorePreferences>(() => typeof window === "undefined" ? defaultExplorePreferences : readLocalExplorePreferences());
  const [presetName, setPresetName] = useState("");
  const [savedCatalogEntries, setSavedCatalogEntries] = useState(() => getInitialCatalogEntries().filter(() => false));
  const [activeRegion, setActiveRegion] = useState<BodyRegion>("등");
  const [selectedAnatomyRegions, setSelectedAnatomyRegions] = useState<BodyRegion[]>(["등"]);
  const [anatomyExercise, setAnatomyExercise] = useState<Exercise | null>(null);
  const [activeRecoveryPathwayId, setActiveRecoveryPathwayId] = useState<RecoveryPathwayId>("shoulder");
  const [goal, setGoal] = useState<keyof typeof goalCopy>("근력증가");
  const [routineGoal, setRoutineGoal] = useState<RoutineGoal>("strength");
  const [sessionGoal, setSessionGoal] = useState<SessionGoal>("all_round");
  const [sessionEnvironment, setSessionEnvironment] = useState<SessionEnvironment>(() => typeof window === "undefined" ? "home" : readLocalProfile().preferredEnvironment);
  const [sessionDuration, setSessionDuration] = useState<SessionDuration>(30);
  const [sessionGuidanceOpen, setSessionGuidanceOpen] = useState(false);
  const [seatedRecoveryDuration, setSeatedRecoveryDuration] = useState<SeatedRecoveryDuration>(5);
  const [weeklyPlan, setWeeklyPlan] = useState<WeeklyPlan>(() => typeof window === "undefined" ? readLocalWeeklyPlan() : readLocalWeeklyPlan());
  const [logOpen, setLogOpen] = useState(false);
  const [linkedPlanSessionId, setLinkedPlanSessionId] = useState<string | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [sceneSettingsOpen, setSceneSettingsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [storageUnavailable, setStorageUnavailable] = useState(false);
  const [sceneExperience, setSceneExperience] = useState<SceneExperiencePreferences>(() => typeof window === "undefined" ? defaultSceneExperiencePreferences : readSceneExperiencePreferences());
  const [activeScene, setActiveScene] = useState<CinematicScene>(() => {
    if (typeof window === "undefined") return "home";
    return sceneByHash[window.location.hash] ?? readSceneExperiencePreferences().lastScene;
  });
  const [logs, setLogs] = useState<LogEntry[]>(() => typeof window === "undefined" ? [] : readTrainingLogs());
  const [form, setForm] = useState(() => ({ date: new Date().toISOString().slice(0, 10), exercise: "바벨 백 스쿼트", sets: "3", reps: "8", load: "40", minutes: "35", distance: "", distanceUnit: "km" as "km" | "m", intensity: "6" }));
  const [profileForm, setProfileForm] = useState(() => typeof window === "undefined" ? readLocalProfile() : readLocalProfile());
  const [checkin, setCheckin] = useState<DailyCheckin>(() => {
    const saved = typeof window === "undefined" ? undefined : readLocalCheckin();
    const today = new Date().toISOString().slice(0, 10);
    return saved && saved.date === today ? saved : { ...(saved ?? { energy: 3, sleep: 3, stress: 3, pain: 1 }), date: today };
  });
  const [romStatusHistory, setRomStatusHistory] = useState<RomStatusRecord[]>(() => typeof window === "undefined" ? [] : readLocalRomStatusHistory());
  const [romDashboardExporting, setRomDashboardExporting] = useState(false);
  const [dashboardExportMeta, setDashboardExportMeta] = useState(() => ({ period: "최근 7일", note: "" }));
  const [celebrationOpen, setCelebrationOpen] = useState(false);
  const romDashboardRef = useRef<HTMLElement | null>(null);
  const completionEffectInitialized = useRef(false);
  const previouslyComplete = useRef(false);
  const atlasTransitionTimer = useRef<number | null>(null);
  const atlasRouteInitialized = useRef(false);

  useEffect(() => {
    if (!saveTrainingLogs(logs)) setStorageUnavailable(true);
  }, [logs]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(`scene-${activeScene}`)?.focus({ preventScroll: true });
      document.getElementById("top")?.scrollIntoView({ behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [activeScene]);

  useEffect(() => {
    const syncSceneFromHash = () => {
      const hashScene = sceneByHash[window.location.hash];
      if (hashScene) setActiveScene(hashScene);
    };
    syncSceneFromHash();
    window.addEventListener("hashchange", syncSceneFromHash);
    window.addEventListener("popstate", syncSceneFromHash);
    return () => {
      window.removeEventListener("hashchange", syncSceneFromHash);
      window.removeEventListener("popstate", syncSceneFromHash);
    };
  }, []);

  useEffect(() => {
    if (!saveLocalCheckin(checkin)) setStorageUnavailable(true);
    setRomStatusHistory((current) => mergeRomStatusHistory(current, createRomStatusRecord(checkin)));
  }, [checkin]);

  useEffect(() => {
    document.querySelectorAll<HTMLInputElement>(".checkin-controls input[type='range']").forEach((input) => { input.step = "0.5"; });
  }, []);

  useEffect(() => {
    if (!saveLocalRomStatusHistory(romStatusHistory)) setStorageUnavailable(true);
  }, [romStatusHistory]);

  useEffect(() => {
    if (!saveLocalWeeklyPlan(weeklyPlan)) setStorageUnavailable(true);
  }, [weeklyPlan]);

  useEffect(() => {
    const isComplete = weeklyPlan.sessions.length > 0 && weeklyPlan.sessions.every((session) => session.completed);
    if (completionEffectInitialized.current && isComplete && !previouslyComplete.current) setCelebrationOpen(true);
    completionEffectInitialized.current = true;
    previouslyComplete.current = isComplete;
  }, [weeklyPlan]);

  useEffect(() => {
    if (!saveLocalExplorePreferences(explorePreferences)) setStorageUnavailable(true);
  }, [explorePreferences]);

  useEffect(() => {
    if (!saveAxisVisibility(axisVisible)) setStorageUnavailable(true);
  }, [axisVisible]);

  useEffect(() => {
    if (!saveAtlasTheme(atlasTheme)) setStorageUnavailable(true);
  }, [atlasTheme]);

  useEffect(() => {
    if (!saveAtlasInteractionPreferences(atlasInteraction)) setStorageUnavailable(true);
  }, [atlasInteraction]);

  useEffect(() => {
    setSceneExperience((current) => current.lastScene === activeScene ? current : { ...current, lastScene: activeScene });
  }, [activeScene]);

  useEffect(() => {
    if (!saveSceneExperiencePreferences(sceneExperience)) setStorageUnavailable(true);
  }, [sceneExperience]);

  const playAtlasTransition = (kind: "theme" | "route", feedback: string) => {
    if (atlasTransitionTimer.current) window.clearTimeout(atlasTransitionTimer.current);
    setAtlasTransition(null);
    window.setTimeout(() => setAtlasTransition(kind), 0);
    setAtlasFeedback(feedback);
    atlasTransitionTimer.current = window.setTimeout(() => {
      setAtlasTransition(null);
      setAtlasFeedback("");
    }, 820);
  };

  useEffect(() => () => {
    if (atlasTransitionTimer.current) window.clearTimeout(atlasTransitionTimer.current);
  }, []);

  useEffect(() => {
    if (!atlasRouteInitialized.current) {
      atlasRouteInitialized.current = true;
      return;
    }
    const label = sessionGoal === "strength" ? "파워" : sessionGoal === "endurance" ? "플로우" : "밸런스";
    playAtlasTransition("route", `${label} 경로를 다시 그렸습니다.`);
  }, [sessionEnvironment, sessionGoal]);

  useEffect(() => {
    setActiveAtlasNode(null);
  }, [sessionDuration, sessionEnvironment, sessionGoal]);

  useEffect(() => {
    if (!logOpen) setLinkedPlanSessionId(null);
  }, [logOpen]);

  useEffect(() => {
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (logOpen) setLogOpen(false);
      if (profileOpen) setProfileOpen(false);
      if (sceneSettingsOpen) setSceneSettingsOpen(false);
      if (menuOpen) setMenuOpen(false);
      if (romRecommendationTarget) setRomRecommendationTarget(null);
      if (activeAtlasNode !== null) setActiveAtlasNode(null);
    };
    window.addEventListener("keydown", closeWithEscape);
    return () => window.removeEventListener("keydown", closeWithEscape);
  }, [activeAtlasNode, logOpen, menuOpen, profileOpen, romRecommendationTarget, sceneSettingsOpen]);

  useEffect(() => {
    const savedIds = [...explorePreferences.favoriteExerciseIds, ...explorePreferences.recentExerciseIds];
    if (savedIds.length === 0) {
      setSavedCatalogEntries([]);
      return;
    }
    let cancelled = false;
    void loadCatalogEntriesByIds(savedIds).then((entries) => {
      if (!cancelled) setSavedCatalogEntries(entries);
    });
    return () => { cancelled = true; };
  }, [explorePreferences.favoriteExerciseIds, explorePreferences.recentExerciseIds]);

  const catalogExercises = useMemo(() => entriesToExercises(catalogEntries), [catalogEntries]);
  const detailsByExerciseId = useMemo(() => new Map(catalogEntries.map(({ exercise, detail }) => [exercise.id, detail])), [catalogEntries]);
  const filteredExercises = useMemo(() => {
    const matches = filterExercises(catalogExercises, { keyword, category, focus, region: regionFilter, difficulty, equipment });
    const romMatches = romFilter === "전체" ? matches : matches.filter((exercise) => {
      const detail = detailsByExerciseId.get(exercise.id);
      return detail ? getAsciiDiagramPresentation(getExerciseTextGuide(exercise, detail)).rom === romFilter : false;
    });
    return sortExercises(romMatches, sort);
  }, [catalogExercises, category, detailsByExerciseId, difficulty, equipment, focus, keyword, regionFilter, romFilter, sort]);
  const visibleExercises = useMemo(() => filteredExercises.slice(0, visibleExerciseCount), [filteredExercises, visibleExerciseCount]);
  const activeExploreFilterLabels = useMemo(() => [
    keyword.trim() ? `검색 · ${keyword.trim()}` : null,
    category !== "전체" ? `종류 · ${category}` : null,
    focus !== "전체" ? `목적 · ${focus}` : null,
    regionFilter !== "전체" ? `부위 · ${regionFilter}` : null,
    difficulty !== "전체" ? `난이도 · ${difficulty}` : null,
    equipment !== "전체" ? `장비 · ${equipment}` : null,
    romFilter !== "전체" ? `ROM · ${romFilter}` : null,
  ].filter((label): label is string => Boolean(label)), [category, difficulty, equipment, focus, keyword, regionFilter, romFilter]);
  const sortLabel = { recommended: "추천순", difficulty: "난이도순", duration: "소요 시간순" }[sort];
  const hasExploreFilterState = activeExploreFilterLabels.length > 0 || sort !== "recommended";
  useEffect(() => {
    setVisibleExerciseCount((current) => current === initialVisibleExerciseCount ? current : initialVisibleExerciseCount);
  }, [category, difficulty, equipment, focus, keyword, regionFilter, romFilter, sort]);
  const catalogStats = catalogSummary;
  const savedExerciseById = useMemo(() => new Map(savedCatalogEntries.map(({ exercise }) => [exercise.id, exercise])), [savedCatalogEntries]);
  const favoriteExercises = useMemo(() => explorePreferences.favoriteExerciseIds.flatMap((id) => {
    const exercise = savedExerciseById.get(id);
    return exercise ? [exercise] : [];
  }), [explorePreferences.favoriteExerciseIds, savedExerciseById]);
  const recentExercises = useMemo(() => explorePreferences.recentExerciseIds.flatMap((id) => {
    const exercise = savedExerciseById.get(id);
    return exercise ? [exercise] : [];
  }), [explorePreferences.recentExerciseIds, savedExerciseById]);

  const anatomyFilterRegions = selectedAnatomyRegions.length ? selectedAnatomyRegions : [activeRegion];
  const regionExercises = catalogExercises.filter((exercise) => anatomyFilterRegions.every((region) => exercise.regions.includes(region)));
  const anatomyMuscleRoles = useMemo<AnatomyMuscleRoles>(() => anatomyExercise ? { primary: anatomyExercise.regions.slice(0, 2), supporting: anatomyExercise.regions.slice(2) } : null, [anatomyExercise]);
  const recovery = recoveryGuides[activeRegion];
  const activeRecoveryPathway = getRecoveryPathway(activeRecoveryPathwayId);
  const pathwayAlternatives = activeRecoveryPathway.alternativeExerciseIds.map((id) => catalogExercises.find((exercise) => exercise.id === id)).filter((exercise): exercise is Exercise => Boolean(exercise));
  const plan = getPersonalizedProgram({ age: profileForm.age ? Number(profileForm.age) : null, weightKg: profileForm.weightKg ? Number(profileForm.weightKg) : null, sex: profileForm.sex as "female" | "male" | "nonbinary" | "undisclosed", primaryGoal: goalCopy[goal], experience: profileForm.experience as "beginner" | "intermediate" | "advanced", recoveryContext: profileForm.recoveryContext as "none" | "reduced_readiness" | "pregnancy_postpartum" });
  const routine = getRoutineTemplate(routineGoal);
  const weeklyVolume = useMemo(() => getWeeklyVolume(logs), [logs]);
  const fourWeekTrends = useMemo(() => getFourWeekTrends(logs), [logs]);
  const maxFourWeekLoad = Math.max(...fourWeekTrends.map((item) => item.load), 1);
  const maxWeeklyVolume = Math.max(...weeklyVolume.map((item) => item.volume), 1);
  const calendarDays = useMemo(() => getCalendarDays(logs), [logs]);
  const totalVolume = getTotalVolume(logs);
  const totalMinutes = getTotalMinutes(logs);
  const pr = useMemo(() => getPersonalRecords(logs), [logs]);
  const insights = useMemo(() => getInsightSummary(logs, new Date(), catalogExercises), [catalogExercises, logs]);
  const checkinRecommendation = useMemo(() => getCheckinRecommendation(checkin), [checkin]);
  const romReadiness = useMemo(() => getRomReadinessRecommendation(checkin), [checkin]);
  const weekRomStatus = useMemo(() => getCurrentWeekRomStatus(romStatusHistory), [romStatusHistory]);
  const fourWeekRomStatus = useMemo(() => getFourWeekRomStatus(romStatusHistory, weeklyPlan), [romStatusHistory, weeklyPlan]);
  const sessionPlan = useMemo(() => buildSession({ goal: sessionGoal, environment: sessionEnvironment, duration: sessionDuration, checkin }), [checkin, sessionDuration, sessionEnvironment, sessionGoal]);
  const machineSessionIntensity = useMemo(() => {
    const rpe = atlasInteraction.resistance >= 76 ? 8 : atlasInteraction.resistance >= 58 ? 6 : atlasInteraction.resistance >= 36 ? 4 : 3;
    const label = rpe >= 8 ? "집중" : rpe >= 6 ? "보통" : rpe >= 4 ? "가볍게" : "회복";
    const target = { cable: "당기기·밀기 저항", dumbbell: "전신 부하", treadmill: "심폐 페이스" }[atlasInteraction.heroEquipment];
    return { rpe, label, target };
  }, [atlasInteraction.heroEquipment, atlasInteraction.resistance]);
  const weeklyPlanInsight = useMemo(() => getWeeklyPlanInsight(weeklyPlan, logs, checkin), [checkin, logs, weeklyPlan]);
  const atlasBlockKeyPrefix = `${sessionGoal}-${sessionEnvironment}-${sessionDuration}`;
  const atlasBlocks = useMemo(() => sessionPlan.blocks.map((block, index) => atlasInteraction.blockEdits[`${atlasBlockKeyPrefix}-${index}`] ?? block), [atlasBlockKeyPrefix, atlasInteraction.blockEdits, sessionPlan.blocks]);
  const atlasSessionPlan = useMemo(() => ({ ...sessionPlan, blocks: atlasBlocks }), [atlasBlocks, sessionPlan]);
  const atlasPerformance = useMemo(() => {
    const completionRate = weeklyPlanInsight.total ? weeklyPlanInsight.completed / weeklyPlanInsight.total : 0;
    if (completionRate >= 1 || weeklyPlanInsight.loggedThisWeek >= 4) return "surge";
    if (completionRate >= .5 || weeklyPlanInsight.loggedThisWeek >= 2) return "active";
    return "starting";
  }, [weeklyPlanInsight]);
  const weeklyCompletionPercent = weeklyPlanInsight.total ? Math.round((weeklyPlanInsight.completed / weeklyPlanInsight.total) * 100) : 0;
  const atlasSignalSummary = atlasPerformance === "surge" ? { title: "고밀도 신호", detail: "완료·기록 흐름이 충분히 쌓였습니다." } : atlasPerformance === "active" ? { title: "활성 신호", detail: "이번 주 리듬을 이어가고 있습니다." } : { title: "준비 신호", detail: "첫 완료 또는 기록부터 시작하세요." };
  const weeklyCompletionFlow = useMemo(() => ["월", "화", "수", "목", "금", "토", "일"].map((weekday) => {
    const sessions = weeklyPlan.sessions.filter((session) => session.weekday === weekday);
    return { weekday, planned: sessions.length, completed: sessions.filter((session) => session.completed).length };
  }), [weeklyPlan.sessions]);
  const weeklyDirection = useMemo(() => {
    if (checkinRecommendation.mode === "stop_and_assess") return "통증 신호가 있으면 다음 운동보다 회복과 필요한 평가를 먼저 선택하세요.";
    if (weeklyPlanInsight.total === 0 || weeklyPlanInsight.completed === 0) return "가장 부담이 적은 한 세션을 선택해 이번 주의 첫 신호를 만드세요.";
    if (weeklyPlanInsight.completed === weeklyPlanInsight.total) return "이번 주 계획을 마쳤습니다. 다음 세션에서는 시간·반복·저항 중 하나만 작게 조절하세요.";
    if (weeklyPlanInsight.loggedThisWeek === 0) return "완료한 세션 하나의 시간과 강도만 기록해 다음 주의 기준을 남겨 보세요.";
    return `남은 ${weeklyPlanInsight.remaining}개 세션은 현재 리듬을 유지하며 나누어 진행하세요.`;
  }, [checkinRecommendation.mode, weeklyPlanInsight]);
  const activeAtlasBlock = activeAtlasNode === null ? null : atlasBlocks[activeAtlasNode] ?? null;
  const atlasRoute = { all_round: { label: "BALANCE ROUTE", description: "전신 연결과 리듬" }, strength: { label: "POWER ROUTE", description: "점진적 힘과 안정" }, endurance: { label: "FLOW ROUTE", description: "호흡과 지속 리듬" } }[sessionGoal];
  const navigateToScene = (scene: CinematicScene) => {
    const nextHash = scene === "home" ? "#top" : `#${scene}`;
    if (window.location.hash !== nextHash) window.history.pushState(null, "", nextHash);
    if (scene !== activeScene && sceneExperience.soundEnabled) playSceneTransitionSound();
    setActiveScene(scene);
    setMenuOpen(false);
    setSceneSettingsOpen(false);
  };

  const jumpToWellnessSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (!target) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  };

  const startEquipmentSession = () => {
    const selected = equipmentSessionSetup[atlasInteraction.heroEquipment];
    setSessionGoal(selected.goal);
    setAtlasInteraction((current) => ({ ...current, recentEquipmentSession: { equipment: current.heroEquipment, resistance: current.resistance, startedAt: Date.now() } }));
    navigateToScene("session");
    toast.success(`${selected.label} 기준 ${selected.goalLabel} ${sessionDuration}분 세션으로 연결했습니다.`);
  };

  const resumeRecentEquipmentSession = () => {
    const recent = atlasInteraction.recentEquipmentSession;
    if (!recent) return;
    const selected = equipmentSessionSetup[recent.equipment];
    setSessionGoal(selected.goal);
    setAtlasInteraction((current) => ({ ...current, heroEquipment: recent.equipment, resistance: recent.resistance, recentEquipmentSession: { ...recent, startedAt: Date.now() } }));
    navigateToScene("session");
    toast.success(`최근 ${selected.label} ${recent.resistance}% 설정으로 ${selected.goalLabel} 세션을 다시 시작합니다.`);
  };

  const openAtlasNode = (index: number) => {
    const block = atlasBlocks[index];
    if (!block) return;
    setAtlasNodeDraft({ label: block.label, minutes: String(block.minutes), items: block.items.join("\n") });
    setActiveAtlasNode(index);
  };

  const saveAtlasNode = () => {
    if (activeAtlasNode === null) return;
    const minutes = Number(atlasNodeDraft.minutes);
    const items = atlasNodeDraft.items.split("\n").map((item) => item.trim()).filter(Boolean).slice(0, 8);
    if (!atlasNodeDraft.label.trim() || !Number.isInteger(minutes) || minutes < 1 || minutes > 90 || items.length === 0) {
      toast.error("블록 이름, 1~90분 범위, 한 개 이상의 움직임을 확인해 주세요.");
      return;
    }
    setAtlasInteraction((current) => ({ ...current, blockEdits: { ...current.blockEdits, [`${atlasBlockKeyPrefix}-${activeAtlasNode}`]: { label: atlasNodeDraft.label.trim().slice(0, 40), minutes, items } } }));
    setActiveAtlasNode(null);
    playAtlasTransition("route", "세션 블록을 저장하고 경로를 갱신했습니다.");
    toast.success("아틀라스 세션 블록을 저장했습니다.");
  };

  const resetAtlasNode = () => {
    if (activeAtlasNode === null) return;
    setAtlasInteraction((current) => {
      const blockEdits = { ...current.blockEdits };
      delete blockEdits[`${atlasBlockKeyPrefix}-${activeAtlasNode}`];
      return { ...current, blockEdits };
    });
    setActiveAtlasNode(null);
    playAtlasTransition("route", "기본 세션 경로로 되돌렸습니다.");
  };

  const addLog = () => {
    const today = new Date().toISOString().slice(0, 10);
    const distance = form.distance.trim() ? Number(form.distance) : undefined;
    const entry = { id: crypto.randomUUID(), date: form.date, exercise: form.exercise, sets: Number(form.sets), reps: Number(form.reps), load: Number(form.load), minutes: Number(form.minutes), intensity: Number(form.intensity), ...(distance ? { distance, distanceUnit: form.distanceUnit } : {}) };
    if (!/^\d{4}-\d{2}-\d{2}$/.test(entry.date) || entry.date > today) {
      toast.error("운동 날짜는 오늘 또는 과거 날짜로 입력해 주세요.");
      return;
    }
    if (!Number.isInteger(entry.sets) || entry.sets < 1 || entry.sets > 30 || !Number.isInteger(entry.reps) || entry.reps < 1 || entry.reps > 500 || !Number.isFinite(entry.load) || entry.load < 0 || entry.load > 1000 || !Number.isInteger(entry.minutes) || entry.minutes < 1 || entry.minutes > 1440 || !Number.isInteger(entry.intensity) || entry.intensity < 1 || entry.intensity > 10 || (distance !== undefined && (!Number.isFinite(distance) || distance <= 0 || distance > (form.distanceUnit === "km" ? 500 : 500_000)))) {
      toast.error("세트·횟수·시간·강도를 유효한 범위로 입력해 주세요.");
      return;
    }
    setLogs((current) => [entry, ...current]);
    if (linkedPlanSessionId) {
      setWeeklyPlan((current) => completeWeeklySessionWithRecord(current, linkedPlanSessionId, new Date().toISOString()));
      toast.success("운동 기록을 저장하고 해당 계획 세션을 완료 처리했습니다.");
    } else {
      toast.success("이 브라우저에 운동 기록을 저장했습니다.");
    }
    setLogOpen(false);
  };

  const startPlanSessionLog = (session: WeeklyPlan["sessions"][number]) => {
    const exerciseByPlan: Record<SessionGoal, Record<SessionEnvironment, string>> = {
      all_round: { home: "리버스 런지", gym: "레그 프레스", outdoor: "빠른 걷기" },
      strength: { home: "리버스 런지", gym: "레그 프레스", outdoor: "스텝업" },
      endurance: { home: "스텝업", gym: "스테디 사이클", outdoor: "빠른 걷기" },
    };
    const machineRpe = atlasInteraction.resistance >= 76 ? 8 : atlasInteraction.resistance >= 58 ? 6 : atlasInteraction.resistance >= 36 ? 4 : 3;
    const baseIntensity = String(checkinRecommendation.mode === "ready" ? machineRpe : checkinRecommendation.mode === "lighter" ? Math.min(machineRpe, 4) : Math.min(machineRpe, 3));
    setForm((current) => ({ ...current, date: new Date().toISOString().slice(0, 10), exercise: exerciseByPlan[session.goal][session.environment], sets: session.goal === "endurance" ? "1" : "2", reps: session.goal === "endurance" ? "1" : "8", load: "0", minutes: String(session.duration), distance: "", distanceUnit: "km", intensity: baseIntensity }));
    setLinkedPlanSessionId(session.id);
    setLogOpen(true);
  };

  const startCurrentMachineSessionLog = () => {
    const exerciseByPlan: Record<SessionGoal, Record<SessionEnvironment, string>> = {
      all_round: { home: "리버스 런지", gym: "레그 프레스", outdoor: "빠른 걷기" },
      strength: { home: "덤벨 루마니안 데드리프트", gym: "레그 프레스", outdoor: "스텝업" },
      endurance: { home: "저충격 스텝 터치", gym: "트레드밀 워크", outdoor: "빠른 걷기" },
    };
    setForm((current) => ({ ...current, date: new Date().toISOString().slice(0, 10), exercise: exerciseByPlan[sessionGoal][sessionEnvironment], sets: sessionGoal === "endurance" ? "1" : "2", reps: sessionGoal === "endurance" ? "1" : "8", load: "0", minutes: String(sessionDuration), distance: "", distanceUnit: "km", intensity: String(checkinRecommendation.mode === "ready" ? machineSessionIntensity.rpe : checkinRecommendation.mode === "lighter" ? Math.min(machineSessionIntensity.rpe, 4) : Math.min(machineSessionIntensity.rpe, 3)) }));
    setLinkedPlanSessionId(null);
    setLogOpen(true);
    toast.success(`${machineSessionIntensity.target} ${atlasInteraction.resistance}%를 오늘 세션 강도 RPE ${machineSessionIntensity.rpe}에 반영했습니다.`);
  };

  useEffect(() => {
    setVisibleExerciseCount(initialVisibleExerciseCount);
  }, [category, difficulty, equipment, focus, keyword, regionFilter, romFilter, sort]);

  useEffect(() => {
    const cappedRpe = checkinRecommendation.mode === "ready" ? machineSessionIntensity.rpe : checkinRecommendation.mode === "lighter" ? Math.min(machineSessionIntensity.rpe, 4) : Math.min(machineSessionIntensity.rpe, 3);
    setForm((current) => current.intensity === String(cappedRpe) ? current : { ...current, intensity: String(cappedRpe) });
  }, [checkinRecommendation.mode, machineSessionIntensity.rpe]);

  useEffect(() => {
    const needsFullCatalog = Boolean(keyword || category !== "전체" || focus !== "전체" || regionFilter !== "전체" || difficulty !== "전체" || equipment !== "전체" || romFilter !== "전체");
    if (!needsFullCatalog || loadedCatalogPages === getCatalogPageCount()) return;
    let cancelled = false;
    setCatalogLoading(true);
    void loadFullCatalog().then((entries) => {
      if (cancelled) return;
      setCatalogEntries(entries);
      setLoadedCatalogPages(getCatalogPageCount());
    }).catch(() => {
      if (!cancelled) toast.error("운동 목록을 추가로 불러오지 못했습니다. 다시 시도해 주세요.");
    }).finally(() => {
      if (!cancelled) setCatalogLoading(false);
    });
    return () => { cancelled = true; };
  }, [category, difficulty, equipment, focus, keyword, loadedCatalogPages, regionFilter, romFilter]);

  useEffect(() => {
    if (!logOpen || loadedCatalogPages === getCatalogPageCount()) return;
    void loadFullCatalog().then((entries) => {
      setCatalogEntries(entries);
      setLoadedCatalogPages(getCatalogPageCount());
    });
  }, [loadedCatalogPages, logOpen]);

  const loadMoreExercises = async () => {
    if (visibleExerciseCount < filteredExercises.length) {
      setVisibleExerciseCount((current) => current + initialVisibleExerciseCount);
      return;
    }
    if (loadedCatalogPages >= getCatalogPageCount() || catalogLoading) return;
    setCatalogLoading(true);
    try {
      const nextPage = await loadCatalogPage(loadedCatalogPages);
      setCatalogEntries((current) => [...current, ...nextPage]);
      setLoadedCatalogPages((current) => current + 1);
      setVisibleExerciseCount((current) => current + initialVisibleExerciseCount);
    } catch {
      toast.error("다음 운동 목록을 불러오지 못했습니다. 다시 시도해 주세요.");
    } finally {
      setCatalogLoading(false);
    }
  };

  const openAnatomyExercise = (exercise: Exercise) => {
    setAnatomyExercise(exercise);
    setKeyword(exercise.name);
    setCategory("전체");
    setFocus("전체");
    setRegionFilter("전체");
    setDifficulty("전체");
    setEquipment("전체");
    setRomFilter("전체");
    setPendingExerciseName(exercise.name);
    navigateToScene("explore");
    toast.success(`${exercise.name}의 자세·방법·안전 단서를 엽니다.`);
  };

  const selectAnatomyRegion = (region: BodyRegion) => {
    setActiveRegion(region);
    setAnatomyExercise(null);
    setSelectedAnatomyRegions((current) => current.includes(region) ? current.filter((item) => item !== region) : [...current, region]);
    if (loadedCatalogPages >= getCatalogPageCount()) return;
    void loadFullCatalog().then((entries) => {
      setCatalogEntries(entries);
      setLoadedCatalogPages(getCatalogPageCount());
    });
  };

  const exploreRecoveryAlternative = async (exerciseId: string) => {
    let availableExercises = catalogExercises;
    if (!availableExercises.some((exercise) => exercise.id === exerciseId)) {
      const entries = await loadFullCatalog();
      setCatalogEntries(entries);
      setLoadedCatalogPages(getCatalogPageCount());
      availableExercises = entriesToExercises(entries);
    }
    const result = applyRecoveryExplore(activeRecoveryPathway, exerciseId, availableExercises, { setKeyword, setCategory, setFocus, setRegion: setRegionFilter, scrollToTarget: () => navigateToScene("explore") });
    if (result) toast.success(`${result.exercise.name}의 자세·안전 단서를 확인하세요.`);
  };

  const exploreSeatedRecoveryExercise = async (exerciseId: string) => {
    let availableExercises = catalogExercises;
    if (!availableExercises.some((exercise) => exercise.id === exerciseId)) {
      const entries = await loadFullCatalog();
      setCatalogEntries(entries);
      setLoadedCatalogPages(getCatalogPageCount());
      availableExercises = entriesToExercises(entries);
    }
    const exercise = availableExercises.find((item) => item.id === exerciseId);
    if (!exercise) return;
    setKeyword(exercise.name);
    setCategory("전체");
    setFocus("전체");
    setRegionFilter("전체");
    navigateToScene("explore");
    toast.success(`${exercise.name}의 자세·안전 단서를 확인하세요.`);
  };

  const saveProfileSettings = () => {
    const apiProfile = {
      age: profileForm.age ? Number(profileForm.age) : null,
      weightKg: profileForm.weightKg ? Number(profileForm.weightKg) : null,
      sex: profileForm.sex as "female" | "male" | "nonbinary" | "undisclosed",
      primaryGoal: profileForm.primaryGoal as "strength" | "endurance" | "weight_management" | "general_health",
      experience: profileForm.experience as "beginner" | "intermediate" | "advanced",
      recoveryContext: profileForm.recoveryContext as "none" | "reduced_readiness" | "pregnancy_postpartum",
    };
    if (apiProfile.age !== null && (apiProfile.age < 13 || apiProfile.age > 120)) { toast.error("연령은 13–120 범위에서 입력해 주세요."); return; }
    if (apiProfile.weightKg !== null && (apiProfile.weightKg < 25 || apiProfile.weightKg > 400)) { toast.error("체중은 25–400 kg 범위에서 입력해 주세요."); return; }
    if (!saveLocalProfile(profileForm)) {
      setStorageUnavailable(true);
      toast.error("이 브라우저에 설정을 저장할 수 없습니다. 저장 공간과 개인정보 보호 설정을 확인해 주세요.");
      return;
    }
    const goalByProfile = { strength: "근력증가", endurance: "체력증가", weight_management: "다이어트", general_health: "체력증가" } as const;
    setGoal(goalByProfile[apiProfile.primaryGoal]);
    setSessionEnvironment(profileForm.preferredEnvironment);
    setProfileOpen(false);
    toast.success("선호 환경을 세션 설계에 반영해 저장했습니다.");
  };

  const applySavedExplorePreferences = () => {
    setKeyword("");
    setCategory(profileForm.preferredCategory);
    setFocus("전체");
    setRegionFilter("전체");
    setDifficulty("전체");
    setEquipment(profileForm.preferredEquipment === "bodyweight" ? "장비 없음" : profileForm.preferredEquipment === "flexible" ? "전체" : "장비 필요");
    setSort("recommended");
    setRomFilter("전체");
    navigateToScene("explore");
    toast.success("저장한 선호 조건으로 운동을 찾습니다.");
  };

  const resetExploreFilters = () => {
    setKeyword("");
    setCategory("전체");
    setFocus("전체");
    setRegionFilter("전체");
    setDifficulty("전체");
    setEquipment("전체");
    setSort("recommended");
    setRomFilter("전체");
  };

  const saveCurrentExplorePreset = () => {
    const name = presetName.trim();
    if (!name) {
      toast.error("프리셋 이름을 입력해 주세요.");
      return;
    }
    const existing = explorePreferences.filterPresets.find((preset) => preset.name === name);
    const preset: ExploreFilterPreset = { id: existing?.id ?? `preset-${Date.now()}`, name: name.slice(0, 28), keyword, category, focus, region: regionFilter, difficulty, equipment, sort, rom: romFilter };
    setExplorePreferences((current) => saveExploreFilterPreset(current, preset));
    setPresetName("");
    toast.success(`${preset.name} 필터 프리셋을 저장했습니다.`);
  };

  const applyExploreFilterPreset = (preset: ExploreFilterPreset) => {
    setKeyword(preset.keyword);
    setCategory(categories.includes(preset.category as (typeof categories)[number]) ? preset.category as (typeof categories)[number] : "전체");
    setFocus(preset.focus || "전체");
    setRegionFilter(preset.region || "전체");
    setDifficulty(preset.difficulty || "전체");
    setEquipment(preset.equipment || "전체");
    setSort((["recommended", "difficulty", "duration"] as ExerciseSort[]).includes(preset.sort as ExerciseSort) ? preset.sort as ExerciseSort : "recommended");
    setRomFilter((["전체", "작음", "보통", "큼"] as RomFilter[]).includes(preset.rom as RomFilter) ? preset.rom as RomFilter : "전체");
    setVisibleExerciseCount(initialVisibleExerciseCount);
    setFiltersOpen(true);
    toast.success(`${preset.name} 조건을 적용했습니다.`);
  };

  const deleteExploreFilterPreset = (preset: ExploreFilterPreset) => {
    setExplorePreferences((current) => removeExploreFilterPreset(current, preset.id));
    toast.success(`${preset.name} 프리셋을 삭제했습니다.`);
  };

  const openSavedExercise = async (exercise: Exercise) => {
    if (!detailsByExerciseId.has(exercise.id)) {
      setCatalogLoading(true);
      try {
        const entries = await loadCatalogEntriesByIds([exercise.id]);
        if (entries.length) setCatalogEntries((current) => current.some((entry) => entry.exercise.id === exercise.id) ? current : [...current, ...entries]);
      } catch {
        toast.error("저장한 운동의 상세 안내를 불러오지 못했습니다. 다시 시도해 주세요.");
        return;
      } finally {
        setCatalogLoading(false);
      }
    }
    setKeyword(exercise.name);
    setCategory("전체");
    setFocus("전체");
    setRegionFilter("전체");
    setDifficulty("전체");
    setEquipment("전체");
    setSort("recommended");
    setRomFilter("전체");
    setAnatomyExercise(exercise);
    setPendingExerciseName(exercise.name);
    navigateToScene("explore");
    toast.success(`${exercise.name}의 자세·안전 안내를 다시 엽니다.`);
  };

  const applyExplorePath = (path: (typeof explorePaths)[number]) => {
    setKeyword("");
    setCategory(path.category as (typeof categories)[number]);
    setFocus(path.focus);
    setRegionFilter("전체");
    setDifficulty("전체");
    setEquipment(path.equipment);
    setSort("recommended");
    setRomFilter("전체");
    navigateToScene("explore");
  };

  const applyRomReadiness = () => {
    if (!romReadiness.rom) {
      navigateToScene("wellness");
      return;
    }
    setKeyword("");
    setCategory("전체");
    setFocus("전체");
    setRegionFilter("전체");
    setDifficulty("전체");
    setEquipment("전체");
    setSort("recommended");
    setRomFilter(romReadiness.rom);
    navigateToScene("explore");
  };

  const applySessionQuickStart = (preset: (typeof sessionQuickStarts)[number]) => {
    setSessionGoal(preset.goal);
    setSessionEnvironment(preset.environment);
    setSessionDuration(preset.duration);
  };

  const exportRomStatusDashboard = async () => {
    if (!romDashboardRef.current || romDashboardExporting) return;
    setRomDashboardExporting(true);
    try {
      const { default: html2canvas } = await import("html2canvas");
      const canvas = await html2canvas(romDashboardRef.current, { backgroundColor: "#f6f8fb", scale: 2, useCORS: true });
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      const periodSlug = dashboardExportMeta.period.trim().replace(/[^0-9A-Za-z가-힣]+/g, "-").replace(/^-|-$/g, "") || "weekly";
      link.download = `fit-atlas-rom-${periodSlug}-${new Date().toISOString().slice(0, 10)}.png`;
      link.click();
      toast.success("주간 상태 그래프를 PNG로 저장했습니다.");
    } catch {
      toast.error("그래프 이미지를 만들지 못했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setRomDashboardExporting(false);
    }
  };


  return (
    <AsciiInteractionContext.Provider value={{ showAxis: axisVisible, pendingExerciseName, clearPendingExercise: () => setPendingExerciseName(null), onOpenRom: (exerciseName, presentation) => setRomRecommendationTarget({ exerciseName: exerciseName, presentation }), onExploreAlternative: (exerciseName) => { setRomRecommendationTarget(null); setKeyword(exerciseName); setCategory("전체"); setFocus("전체"); setRegionFilter("전체"); setDifficulty("전체"); setEquipment("전체"); setRomFilter("전체"); setPendingExerciseName(exerciseName); navigateToScene("explore"); }, onAddToTodayRoutine: (exerciseName) => { setWeeklyPlan((current) => addRomAlternativeToWeeklyPlan(current, exerciseName)); toast.success(`${exerciseName}을 오늘의 운동 루틴에 추가했습니다.`); } }}><div className={`site-shell scene-${activeScene} atlas-theme-${atlasTheme} atlas-motion-${sessionGoal} atlas-environment-${sessionEnvironment} atlas-speed-${atlasInteraction.motionSpeed} atlas-performance-${atlasPerformance}${atlasTransition ? ` atlas-transition-${atlasTransition}` : ""}`}>
      <div className="cinematic-backdrop" aria-hidden="true"><span className="cinematic-orb orb-one" /><span className="cinematic-orb orb-two" /><span className="cinematic-gridlines" /><span className="cinematic-hud">SCENE / {activeScene.toUpperCase()}</span></div>
      {celebrationOpen && <div className="completion-celebration" role="status" aria-live="polite"><div className="celebration-confetti" aria-hidden="true">✦ ✦ ✦ ✦ ✦ ✦ ✦</div><div><p className="eyebrow">ROUTINE COMPLETE</p><h2>오늘의 루틴을 모두 마쳤습니다.</h2><p>완료율 100%입니다. 다음 세션은 반응을 확인하며 한 가지 변수만 천천히 조절하세요.</p></div><button onClick={() => setCelebrationOpen(false)} aria-label="축하 메시지 닫기">확인</button></div>}
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Fit Atlas 홈" onClick={(event) => { event.preventDefault(); navigateToScene("home"); }}><span className="brand-mark"><Activity size={17} /></span><span>FIT ATLAS</span></a>
        <nav className={menuOpen ? "nav is-open" : "nav"} aria-label="주요 메뉴">
          <a href="#explore" aria-current={activeScene === "explore" ? "page" : undefined} onClick={(event) => { event.preventDefault(); navigateToScene("explore"); }}>운동 탐색</a><a href="#anatomy" aria-current={activeScene === "anatomy" ? "page" : undefined} onClick={(event) => { event.preventDefault(); navigateToScene("anatomy"); }}>바디 맵</a><a href="#progress" aria-current={activeScene === "progress" ? "page" : undefined} onClick={(event) => { event.preventDefault(); navigateToScene("progress"); }}>기록 분석</a><a href="#wellness" aria-current={activeScene === "wellness" ? "page" : undefined} onClick={(event) => { event.preventDefault(); navigateToScene("wellness"); }}>웰니스</a><button type="button" className="mobile-only mobile-scene-settings" onClick={() => { setMenuOpen(false); setSceneSettingsOpen(true); }}>장면 설정</button>
        </nav>
        <div className="topbar-actions"><button className="ghost-button desktop-only" onClick={() => setProfileOpen(true)}>내 프로필</button><button className="ghost-button desktop-only" onClick={() => setSceneSettingsOpen(true)}>장면 설정</button><button className="ghost-button desktop-only" onClick={() => downloadBackup(logs, profileForm, checkin, weeklyPlan, explorePreferences)}>백업</button><label className="login-button desktop-only">가져오기<input className="sr-only" type="file" accept="application/json" onChange={async (event) => { const file = event.target.files?.[0]; if (!file) return; try { const backup = parseBackup(await file.text()); setLogs(backup.logs); setProfileForm(backup.profile); setCheckin(backup.checkin); setWeeklyPlan(backup.weeklyPlan); setExplorePreferences(backup.explorePreferences); saveLocalProfile(backup.profile); saveLocalCheckin(backup.checkin); saveLocalWeeklyPlan(backup.weeklyPlan); saveLocalExplorePreferences(backup.explorePreferences); toast.success("백업을 복원했습니다."); } catch { toast.error("백업 파일을 읽지 못했습니다."); } event.currentTarget.value = ""; }} /></label><button className="dark-button" onClick={() => setLogOpen(true)}><Plus size={16} /> 운동 기록</button><button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="메뉴 열기"><Menu size={20} /></button></div>
      </header>
      <div className="axis-control-top"><button className={axisVisible ? "axis-toggle-button is-on" : "axis-toggle-button"} onClick={() => setAxisVisible((current) => !current)} aria-pressed={axisVisible}><Activity size={15} /> 중심축 {axisVisible ? "표시" : "숨김"}</button></div>

      <main id="top">
        <nav className="mobile-quick-nav" aria-label="모바일 빠른 이동"><a href="#explore" onClick={(event) => { event.preventDefault(); navigateToScene("explore"); }}><Search size={17} /><span>탐색</span></a><a href="#session" onClick={(event) => { event.preventDefault(); navigateToScene("session"); }}><Timer size={17} /><span>오늘 세션</span></a><button onClick={() => setLogOpen(true)}><Plus size={18} /><span>기록</span></button><a href="#recovery" onClick={(event) => { event.preventDefault(); navigateToScene("wellness"); }}><HeartPulse size={17} /><span>회복</span></a></nav>
        <section id="scene-home" className="scene-view scene-view-home" tabIndex={-1}>
        <section className="hero">
          <div className="hero-noise" />
          <div className="hero-copy">
            <p className="eyebrow light">TODAY</p>
            <h1>오늘은<br /><em>무엇을 움직일까요?</em></h1>
            <div className="hero-actions"><button className="light-button" onClick={() => atlasInteraction.recentEquipmentSession ? resumeRecentEquipmentSession() : navigateToScene("session")}>{atlasInteraction.recentEquipmentSession ? "최근 세션 이어하기" : "오늘 세션"} <ArrowRight size={16} /></button><a href="#explore" className="text-button" onClick={(event) => { event.preventDefault(); navigateToScene("explore"); }}>운동 탐색 <ChevronRight size={17} /></a></div>
            <div className="hero-context" aria-label="오늘 운동 상태 요약"><article><span>오늘의 강도</span><b>{machineSessionIntensity.label} · RPE {machineSessionIntensity.rpe}</b><small>{machineSessionIntensity.target} {atlasInteraction.resistance}%</small></article><article><span>이번 주 흐름</span><b>{weeklyCompletionPercent}% 완료</b><small>{weeklyPlanInsight.completed}/{weeklyPlanInsight.total || 0} 세션</small></article>{atlasInteraction.recentEquipmentSession && <HeroRecentEquipmentResume label={equipmentSessionSetup[atlasInteraction.recentEquipmentSession.equipment].label} resistance={atlasInteraction.recentEquipmentSession.resistance} onResume={resumeRecentEquipmentSession} />}</div>
          </div>
          <div className="hero-workspace">
            <div className="hero-atlas" aria-label={`오늘의 ${sessionDuration}분 ${sessionGoal === "strength" ? "기초 근력" : sessionGoal === "endurance" ? "심폐 리듬" : "전신 균형"} 세션 요약`}>
              <div className="atlas-visual-head"><span>ATLAS / TODAY</span><span className="atlas-ready"><i /> READY</span></div>
              <HeroGymMachine3D goal={sessionGoal} environment={sessionEnvironment} completion={weeklyCompletionPercent} equipment={atlasInteraction.heroEquipment} resistance={atlasInteraction.resistance} nodes={atlasBlocks.slice(0, 3).map((block) => block.label)} onEquipment={(heroEquipment) => { if (heroEquipment === atlasInteraction.heroEquipment) return; setAtlasInteraction((current) => ({ ...current, heroEquipment })); playAtlasTransition("route", `${{ cable: "케이블 머신", dumbbell: "덤벨", treadmill: "트레드밀" }[heroEquipment]} 장비를 선택했습니다.`); }} onResistance={(resistance) => setAtlasInteraction((current) => ({ ...current, resistance }))} onOpenNode={openAtlasNode} />
            </div>
            <div className="hero-workspace-bottom">
              <article className="hero-session-card"><p>{atlasRoute.label}</p><b>{sessionDuration}<small> MIN</small></b><span>{sessionGoal === "strength" ? "기초 근력" : sessionGoal === "endurance" ? "심폐 리듬" : "전신 균형"} · {{ home: "집·매트", gym: "헬스장", outdoor: "야외·걷기" }[sessionEnvironment]}</span><small className="session-route-description">{atlasRoute.description} · {machineSessionIntensity.target} {atlasInteraction.resistance}% · {machineSessionIntensity.label} RPE {machineSessionIntensity.rpe}</small><button className="hero-session-start" onClick={startEquipmentSession}>이 장비로 세션 설계 <ArrowRight size={14} /></button></article>
              <HeroAtlasControl theme={atlasTheme} motionSpeed={atlasInteraction.motionSpeed} onTheme={(theme) => { if (theme === atlasTheme) return; setAtlasTheme(theme); playAtlasTransition("theme", `${{ lime: "라임", ocean: "오션", coral: "코랄", plum: "플럼" }[theme]} 테마를 적용했습니다.`); }} onMotionSpeed={(speed) => { if (speed === atlasInteraction.motionSpeed) return; setAtlasInteraction((current) => ({ ...current, motionSpeed: speed })); playAtlasTransition("route", `${{ slow: "느림", normal: "보통", fast: "빠름" }[speed]} 속도로 경로를 재생합니다.`); }} performanceText={`이번 주 ${weeklyPlanInsight.completed}/${weeklyPlanInsight.total || 0} · ${atlasPerformance === "surge" ? "신호 밀도 높음" : atlasPerformance === "active" ? "신호 흐름 활성" : "신호 준비 중"}`} feedback={atlasFeedback} />
            </div>
          </div>
        </section>

        <section className={`weekly-atlas-report signal-${atlasPerformance}`} aria-label="주간 아틀라스 요약 리포트"><div className="weekly-report-head"><div><p className="eyebrow">WEEKLY ATLAS</p><h2>이번 주 흐름</h2></div><span>{atlasSignalSummary.title}</span></div><div className="weekly-report-body"><div className="weekly-signal-orbit" style={{ "--report-progress": `${weeklyCompletionPercent}%` } as React.CSSProperties}><b>{weeklyCompletionPercent}<small>%</small></b><span>완료</span></div><div className="weekly-report-metrics"><article><span>완료 세션</span><b>{weeklyPlanInsight.completed}<small>/{weeklyPlanInsight.total || 0}</small></b></article><article><span>운동 기록</span><b>{weeklyPlanInsight.loggedThisWeek}</b></article><article><span>아틀라스</span><b>{atlasPerformance === "surge" ? "HIGH" : atlasPerformance === "active" ? "FLOW" : "READY"}</b></article></div><p>{atlasSignalSummary.detail}</p></div></section>
        <WeeklyAtlasDetailReport flow={weeklyCompletionFlow} goal={weeklyPlan.goal} onGoal={(nextGoal) => { if (nextGoal === weeklyPlan.goal) return; setWeeklyPlan((current) => setWeeklyGoal(current, nextGoal)); toast.success(`이번 주 목표를 ${{ all_round: "전신", strength: "근력", endurance: "심폐" }[nextGoal]} 중심으로 변경했습니다.`); }} direction={weeklyDirection} onOpenSession={() => navigateToScene("session")} />

        <section className="start-dock" aria-label="오늘의 주요 행동"><div className="start-dock-intro"><p className="eyebrow">START HERE</p><h2>오늘, 무엇을<br /><em>시작할까요?</em></h2><p>복잡한 설정 없이 현재 목적에 맞는 한 가지 경로를 선택하세요.</p></div><div className="start-dock-actions"><a className="start-action start-action-explore" href="#explore" onClick={(event) => { event.preventDefault(); navigateToScene("explore"); }}><span><BookOpen size={19} /> 운동 찾기</span><b>1,008개 운동<br />자세·부위·근거</b><ArrowRight size={18} /></a><button className="start-action start-action-session" onClick={() => { setSessionGoal("all_round"); navigateToScene("session"); }}><span><Timer size={19} /> 오늘 세션</span><b>{sessionDuration}분 맞춤<br />운동 설계</b><ArrowRight size={18} /></button><button className="start-action start-action-record" onClick={() => setLogOpen(true)}><span><History size={19} /> 운동 기록</span><b>{logs.length}개 기록<br />변화 확인</b><Plus size={18} /></button><a className="start-action start-action-recover" href="#recovery" onClick={(event) => { event.preventDefault(); navigateToScene("wellness"); }}><span><HeartPulse size={19} /> 회복 가이드</span><b>불편감·피로<br />가벼운 회복</b><ArrowRight size={18} /></a></div></section>

        <section className="today-command" aria-label="오늘의 시작"><div className="today-command-copy"><p className="eyebrow">TODAY'S READINESS</p><div className="today-command-title"><Brain size={21} /><h2>{checkinRecommendation.title}</h2></div><p>{checkinRecommendation.guidance}</p><button className="dark-button" onClick={() => navigateToScene("session")}>오늘의 기준 확인 <ArrowRight size={15} /></button></div><div className="today-command-meta"><article><span>CATALOG</span><b>{catalogStats.exerciseCount.toLocaleString()}</b><p>독립 운동 종목</p></article><article><span>RECORDS</span><b>{logs.length}</b><p>기록된 운동</p></article><article><span>SESSION</span><b>{sessionDuration}<small>min</small></b><p>현재 설계 시간</p></article></div></section>
        </section>

        <section id="scene-session" className="scene-view scene-view-session" tabIndex={-1}>
        <section id="program" className="program-section section-pad">
          <SectionTitle eyebrow="PERSONALIZE" title="오늘의 움직임을, 당신의 목표에 맞게." description="간단한 목표 선택으로 시작하는 보수적이고 점진적인 운동 제안입니다. 실제 서비스에서는 프로필·운동 이력·피로도까지 반영합니다." />
          <div className="program-grid"><div className="program-selector"><p className="small-label">PRIMARY GOAL</p><div className="goal-pills">{(Object.keys(goalCopy) as Array<keyof typeof goalCopy>).map((item) => <button key={item} onClick={() => setGoal(item)} className={goal === item ? "is-selected" : ""}>{item}</button>)}</div><button className="profile-link" onClick={() => setProfileOpen(true)}>연령·체중·경험 수준 설정 <ArrowRight size={14} /></button><button className="profile-link preference-link" onClick={applySavedExplorePreferences}>저장한 선호 조건으로 탐색 <ArrowRight size={14} /></button><div className="program-note"><Sparkles size={18} /><p><strong>권장 원칙</strong><br />처음 2주간은 운동 전후 불편감·피로를 관찰하며 강도보다 일관성을 우선하세요.</p></div></div><div className="program-card"><div><p className="eyebrow">YOUR STARTING POINT · {plan.sessionsPerWeek} · {plan.targetRpe}</p><h3>{plan.title}</h3><p>{plan.note} {plan.personalizationNote}</p><p className="profile-context">{plan.sexConsideration}</p></div><div className="program-exercise-list">{plan.recommendations.map((name, index) => <div key={name}><span>0{index + 1}</span><b>{name}</b><Check size={16} /></div>)}</div><button className="outline-button" onClick={() => navigateToScene("explore")}>운동 구성 살펴보기 <ArrowRight size={16} /></button></div></div>
          <div className={`checkin-card mode-${checkinRecommendation.mode}`}><div className="checkin-head"><div><p className="eyebrow">DAILY READINESS · LOCAL ONLY</p><h3>{checkinRecommendation.title}</h3><p>{checkinRecommendation.guidance}</p></div><span>{checkinRecommendation.rpeAdjustment}</span></div><div className="checkin-controls"><label>에너지 <b>{checkin.energy}/5</b><input type="range" min="1" max="5" value={checkin.energy} onChange={(event) => setCheckin((current) => ({ ...current, date: new Date().toISOString().slice(0, 10), energy: Number(event.target.value) }))} /></label><label>수면 <b>{checkin.sleep}/5</b><input type="range" min="1" max="5" value={checkin.sleep} onChange={(event) => setCheckin((current) => ({ ...current, date: new Date().toISOString().slice(0, 10), sleep: Number(event.target.value) }))} /></label><label>스트레스 <b>{checkin.stress}/5</b><input type="range" min="1" max="5" value={checkin.stress} onChange={(event) => setCheckin((current) => ({ ...current, date: new Date().toISOString().slice(0, 10), stress: Number(event.target.value) }))} /></label><label>통증·불편감 <b>{checkin.pain}/5</b><input type="range" min="1" max="5" value={checkin.pain} onChange={(event) => setCheckin((current) => ({ ...current, date: new Date().toISOString().slice(0, 10), pain: Number(event.target.value) }))} /></label></div></div>
        </section>

        <section id="session" className="session-section section-pad"><SectionTitle eyebrow="SESSION DESIGNER" title="오늘의 조건으로, 한 세션을 설계하세요." description="시간·장소·목표를 고르면 오늘의 컨디션에 맞춘 시작 구조를 제안합니다. 부담되면 15분 또는 더 쉬운 환경으로 바꿔도 됩니다." /><section className="session-launcher" aria-label="빠른 오늘 세션 시작"><div className="session-launcher-head"><div><p className="eyebrow">01 / QUICK START</p><h3>지금 가능한<br /><em>한 가지</em>를 고르세요.</h3></div><p>미리 정한 세 가지 시작점입니다. 선택 뒤에는 아래에서 목표·장소·시간을 자유롭게 조정할 수 있습니다.</p></div><div className="session-quick-starts">{sessionQuickStarts.map((preset) => { const isSelected = sessionGoal === preset.goal && sessionEnvironment === preset.environment && sessionDuration === preset.duration; return <button key={preset.id} className={isSelected ? "is-selected" : ""} aria-pressed={isSelected} onClick={() => applySessionQuickStart(preset)}><Timer size={19} /><span>{preset.label}</span><small>{preset.detail}</small><ArrowRight size={16} /></button>; })}</div><div className="session-current-state"><span>현재 설계</span><b>{sessionDuration}분 · {{ home: "집·매트", gym: "헬스장", outdoor: "야외·걷기" }[sessionEnvironment]} · {{ all_round: "전신 균형", strength: "기초 근력", endurance: "심폐 리듬" }[sessionGoal]}</b><p><ShieldCheck size={15} /> {machineSessionIntensity.target} {atlasInteraction.resistance}% · {machineSessionIntensity.label} RPE {machineSessionIntensity.rpe}가 오늘 기록 기본값에 자동 반영됩니다.</p></div></section><div className="session-builder"><div className="session-options"><p className="small-label">02 / FINE TUNE</p><div className="session-choice-group"><span>목표</span><div>{(["all_round", "strength", "endurance"] as SessionGoal[]).map((item) => <button key={item} className={sessionGoal === item ? "is-selected" : ""} onClick={() => setSessionGoal(item)}>{{ all_round: "전신 균형", strength: "기초 근력", endurance: "심폐 리듬" }[item]}</button>)}</div></div><div className="session-choice-group"><span>환경</span><div>{(["home", "gym", "outdoor"] as SessionEnvironment[]).map((item) => <button key={item} className={sessionEnvironment === item ? "is-selected" : ""} onClick={() => setSessionEnvironment(item)}>{{ home: "집·매트", gym: "헬스장", outdoor: "야외·걷기" }[item]}</button>)}</div></div><button className="session-preference-button" onClick={() => { setSessionEnvironment(profileForm.preferredEnvironment); toast.success("저장한 운동 환경을 세션에 적용했습니다."); }}>저장 환경 적용 · {{ home: "집·매트", gym: "헬스장", outdoor: "야외·걷기" }[profileForm.preferredEnvironment]}</button><div className="session-choice-group"><span>시간</span><div>{([15, 30, 45] as SessionDuration[]).map((item) => <button key={item} className={sessionDuration === item ? "is-selected" : ""} onClick={() => setSessionDuration(item)}>{item}분</button>)}</div></div><button type="button" className="session-guidance-toggle" aria-expanded={sessionGuidanceOpen} onClick={() => setSessionGuidanceOpen((current) => !current)}>{sessionGuidanceOpen ? "조절 기준 접기" : "피로·통증 조절 기준 보기"}</button>{sessionGuidanceOpen && <p className="session-local-note"><ShieldCheck size={15} /> 피로·통증·수면 반응이 좋지 않으면 시간을 줄이거나 범위를 낮추세요.</p>}</div><article className="session-plan"><div className="session-plan-head"><div><p className="eyebrow">03 / YOUR SESSION</p><h3>{atlasSessionPlan.title}</h3><p>{atlasSessionPlan.summary}</p></div><span>{atlasSessionPlan.adjustment}</span></div><div className="session-blocks">{atlasSessionPlan.blocks.map((block, index) => <div key={block.label} className="session-block"><span>0{index + 1}</span><div><p className="small-label">{block.label} · 약 {block.minutes}분</p><ul>{block.items.map((item) => <li key={item}>{item}</li>)}</ul></div></div>)}</div><div className="session-plan-actions"><button className="session-save-button" onClick={() => { setWeeklyPlan((current) => addDesignedSession(current, atlasSessionPlan, sessionGoal, sessionEnvironment, sessionDuration)); toast.success("오늘의 세션을 이번 주 계획에 추가했습니다."); }}><CalendarDays size={16} /> 이번 주 계획에 추가</button><button className="session-log-button" onClick={startCurrentMachineSessionLog}><Plus size={16} /> 운동 기록 열기</button></div><div className="session-safety"><HeartPulse size={16} />{atlasSessionPlan.safetyNote}</div></article></div></section>
        <WeeklyPlanPanel plan={weeklyPlan} insight={weeklyPlanInsight} onGoal={(nextGoal) => setWeeklyPlan((current) => setWeeklyGoal(current, nextGoal))} onToggle={(sessionId) => setWeeklyPlan((current) => toggleWeeklySession(current, sessionId))} onStartLog={startPlanSessionLog} onAdd={() => { setWeeklyPlan((current) => addDesignedSession(current, sessionPlan, sessionGoal, sessionEnvironment, sessionDuration)); toast.success("오늘의 설계 세션을 이번 주 계획에 추가했습니다."); }} />
        </section>
        <section id="scene-wellness" className="scene-view scene-view-wellness" tabIndex={-1}><WellnessQuickNav onJump={jumpToWellnessSection} />
        <section id="recovery" className="seated-recovery-section section-pad"><SectionTitle eyebrow="WORKDAY RECOVERY" title="오래 앉은 뒤, 다음 작업을 위한 짧은 전환." description="장시간 같은 자세 뒤에 환경을 확인하고 가볍게 움직이는 일반 교육용 루틴입니다. 통증을 치료하려 하거나 무리한 스트레칭을 하는 대신, 작은 범위와 반응 확인을 우선합니다." /><section className="recovery-start" aria-label="빠른 회복 시작"><div><p className="eyebrow">START SMALL</p><h3>지금은 무엇이 필요한가요?</h3><p>불편감이 없다면 5분 움직임으로 재시작하고, 특정 부위가 신경 쓰이면 부위별 안내로 이동하세요.</p></div><div className="recovery-start-actions"><button className="recovery-primary" onClick={() => setSeatedRecoveryDuration(5)}><Timer size={17} /> 5분 가볍게 시작</button><button className="recovery-secondary" onClick={() => navigateToScene("anatomy")}><Activity size={17} /> 부위별로 확인</button></div></section><SeatedRecoveryPanel duration={seatedRecoveryDuration} onDuration={setSeatedRecoveryDuration} recommendation={checkinRecommendation} recoveryContext={profileForm.recoveryContext as RecoveryContext} onExplore={exploreSeatedRecoveryExercise} onBuildSession={() => { setSessionGoal("all_round"); setSessionEnvironment("home"); setSessionDuration(15); navigateToScene("session"); toast.success("집·매트 환경의 15분 가벼운 세션으로 설정했습니다."); }} /></section>

        <section className="routine-section section-pad"><SectionTitle eyebrow="ROUTINE LIBRARY" title="목표를 루틴으로, 루틴을 리듬으로." description="4주 템플릿은 일반적인 시작 구조입니다. 주차를 통과하기보다 통증·피로·수면 반응에 맞춰 머무르거나 가볍게 조절하세요." /><div className="routine-goals">{(["strength", "endurance", "weight_management", "general_health"] as RoutineGoal[]).map((item) => <button key={item} className={routineGoal === item ? "is-selected" : ""} onClick={() => setRoutineGoal(item)}>{{ strength: "근력", endurance: "심폐", weight_management: "체중 관리", general_health: "전신 건강" }[item]}</button>)}</div><div className="routine-card"><div className="routine-intro"><p className="eyebrow">{routineGoal.replace("_", " ").toUpperCase()}</p><h3>{routine.title}</h3><p>{routine.intro}</p><div className="routine-safety"><ShieldCheck size={16} />{routine.safetyNote}</div></div><div className="routine-weeks">{routine.weeks.map((week) => <article key={week.week}><span>W{week.week}</span><div><p className="small-label">{week.theme} · {week.sessions}</p><ul>{week.focus.map((item) => <li key={item}>{item}</li>)}</ul><p>{week.note}</p></div></article>)}</div></div></section>
        </section>

        <section id="scene-explore" className="scene-view scene-view-explore" tabIndex={-1}><section id="explore" className="explore-section section-pad">
          <SectionTitle eyebrow="EXERCISE LIBRARY" title="움직임을 지식으로 익히세요." description={`개인용 정적 큐레이션: ${catalogStats.categoryCount}개 카테고리 · ${catalogStats.exerciseCount}개 운동. 카테고리와 목적, 장비로 탐색하고 올바른 자세·효과·안전 단서를 확인하세요.`} action={<div className="library-actions"><span className="library-count">{filteredExercises.length} MATCHES · {catalogExercises.length}/{catalogStats.exerciseCount}</span><div className="rom-filter" role="group" aria-label="가동 범위 ROM 필터">{(["전체", "작음", "보통", "큼"] as RomFilter[]).map((item) => <button key={item} className={romFilter === item ? "is-selected" : ""} aria-pressed={romFilter === item} onClick={() => setRomFilter(item)}>{item === "전체" ? "ROM 전체" : `ROM · ${item}`}</button>)}</div><div className="rom-readiness-inline"><span>오늘의 ROM</span><b>{romReadiness.title}</b><p>통증 {checkin.pain}/5 · 에너지 {checkin.energy}/5</p><button onClick={applyRomReadiness}>{romReadiness.actionLabel} <ArrowRight size={13} /></button></div></div>} />
          <section className="explore-launcher" aria-label="빠른 운동 시작"><div className="explore-launcher-head"><div><p className="eyebrow">01 / CHOOSE A START</p><h3>어떻게 움직이고 싶나요?</h3></div><p>한 가지 시작점을 고르면 결과를 바로 좁힙니다. 이후 부위·난이도·장비 조건을 더할 수 있습니다.</p></div><div className="explore-paths">{explorePaths.map((path) => { const Icon = path.icon; const isSelected = category === path.category && focus === path.focus && equipment === path.equipment; return <button key={path.id} className={isSelected ? "is-selected" : ""} aria-pressed={isSelected} onClick={() => applyExplorePath(path)}><Icon size={20} /><span>{path.label}</span><small>{path.description}</small><ArrowRight size={16} /></button>; })}</div><div className="explore-selection-state"><span>현재 조건</span><b>{category === "전체" && focus === "전체" && equipment === "전체" ? "모든 운동 보기" : [category !== "전체" ? category : null, focus !== "전체" ? focus : null, equipment !== "전체" ? equipment : null].filter(Boolean).join(" · ")}</b><p><strong>{filteredExercises.length}개</strong> 운동을 바로 살펴볼 수 있습니다.</p></div></section>
          <div className="search-panel"><div className="search-field"><Search size={18} /><input value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="운동, 부위, 장비 검색" aria-label="운동 검색" /></div><div className="explore-primary-controls"><label className="sort-select">정렬<select value={sort} onChange={(event) => setSort(event.target.value as ExerciseSort)} aria-label="정렬 기준"><option value="recommended">추천순 · 입문·짧은 시간 우선</option><option value="difficulty">난이도순 · 입문부터</option><option value="duration">소요 시간순 · 짧은 시간부터</option></select></label><p><span>현재 정렬</span><b>{sortLabel}</b></p></div><div className="quick-category-filter" role="group" aria-label="운동 종류 빠른 필터"><div className="quick-category-head"><div><p className="small-label">EXERCISE TYPE</p><b>운동 종류 빠른 선택</b><span aria-live="polite">{category === "전체" ? `전체 ${filteredExercises.length}개 표시` : `${category} ${filteredExercises.length}개 표시`}</span></div><div className="filter-head-actions"><button className="preference-filter-button" onClick={applySavedExplorePreferences}>선호 조건 적용</button>{hasExploreFilterState && <button className="filter-reset" onClick={resetExploreFilters}>조건 초기화</button>}</div></div><div className="quick-category-options">{categories.map((item) => <button key={item} className={category === item ? "filter-active" : ""} aria-pressed={category === item} onClick={() => setCategory(item)}>{item === "전체" ? "전체 보기" : item}</button>)}</div></div><div className="advanced-filter-control"><div><p className="small-label">MORE FILTERS</p><span>{activeExploreFilterLabels.length ? `${activeExploreFilterLabels.length}개 조건 적용됨` : "필요할 때만 조건을 더하세요"}</span></div><button onClick={() => setFiltersOpen((open) => !open)} aria-expanded={filtersOpen} aria-controls="advanced-exercise-filters">{filtersOpen ? "상세 조건 닫기" : "부위·목적·난이도 상세 조건"}<ChevronDown size={15} /></button></div>{filtersOpen && <div id="advanced-exercise-filters" className="filter-row"><select value={regionFilter} onChange={(event) => setRegionFilter(event.target.value)} aria-label="부위 필터"><option>전체</option>{Object.keys(recoveryGuides).map((region) => <option key={region}>{region}</option>)}</select><select value={focus} onChange={(event) => setFocus(event.target.value)} aria-label="목적 필터"><option>전체</option><option>근력</option><option>체력</option><option>심폐</option><option>가동성</option><option>균형</option><option>협응</option><option>파워</option></select><select value={difficulty} onChange={(event) => setDifficulty(event.target.value)} aria-label="난이도 필터"><option>전체</option><option>입문</option><option>중급</option><option>상급</option></select><select value={equipment} onChange={(event) => setEquipment(event.target.value)} aria-label="장비 필터"><option>전체</option><option>장비 없음</option><option>장비 필요</option></select></div>}<ExploreFilterResultSummary filteredCount={filteredExercises.length} visibleCount={visibleExercises.length} loadedCount={catalogExercises.length} totalCount={catalogStats.exerciseCount} activeFilterLabels={activeExploreFilterLabels} /></div>
          <ExplorePresetPanel presetName={presetName} presets={explorePreferences.filterPresets} onPresetName={setPresetName} onSave={saveCurrentExplorePreset} onApply={applyExploreFilterPreset} onDelete={deleteExploreFilterPreset} />
          <div className="saved-exercise-panels" aria-label="빠른 운동 탐색"><SavedExercisePanel kind="recent" exercises={recentExercises} onOpen={openSavedExercise} /><SavedExercisePanel kind="favorite" exercises={favoriteExercises} onOpen={openSavedExercise} /></div>
          <div className="exercise-grid">{visibleExercises.map((exercise, index) => <ExerciseCard key={exercise.id} exercise={exercise} detail={detailsByExerciseId.get(exercise.id)!} index={index} isFavorite={explorePreferences.favoriteExerciseIds.includes(exercise.id)} onToggleFavorite={() => setExplorePreferences((current) => toggleFavoriteExercise(current, exercise.id))} onViewed={() => { setExplorePreferences((current) => recordRecentExercise(current, exercise.id)); setAnatomyExercise(exercise); }} />)}</div>
          {filteredExercises.length === 0 && <div className="empty-library"><Search size={26} /><div><h3>일치하는 운동이 없습니다.</h3><p>검색어 또는 적용 조건을 하나씩 줄여 보세요. 전체 카탈로그로 즉시 돌아갈 수도 있습니다.</p><button className="outline-button" onClick={resetExploreFilters}>모든 조건 초기화</button></div></div>}
          {filteredExercises.length > 0 && (visibleExerciseCount < filteredExercises.length || loadedCatalogPages < getCatalogPageCount()) && <div className="catalog-pagination"><p aria-live="polite">{visibleExercises.length}개 표시 · {catalogExercises.length}/{catalogStats.exerciseCount}개 카탈로그를 불러왔습니다.</p><button className="outline-button catalog-load-more" onClick={() => void loadMoreExercises()} disabled={catalogLoading}>{catalogLoading ? <><Loader2 size={15} className="animate-spin" /> 불러오는 중</> : <>운동 100개 더 보기 <ArrowRight size={15} /></>}</button></div>}
        </section></section>

        <section id="scene-anatomy" className="scene-view scene-view-anatomy" tabIndex={-1}><section id="anatomy" className="anatomy-section section-pad">
          <SectionTitle eyebrow="BODY ATLAS" title="부위를 누르면, 필요한 움직임이 보입니다." description="신체 지도의 부위를 선택해 연관 운동과 회복 관점을 확인하세요. 통증 정보는 교육 목적이며 진단이나 치료가 아닙니다." />
          <div className="anatomy-grid"><div className="body-map-card"><div className="map-head"><span>INTERACTIVE 3D MUSCLE MODEL</span><span className="live-dot">DRAG · MULTI SELECT</span></div><AnatomyMap activeRegion={activeRegion} selectedRegions={selectedAnatomyRegions} onToggleRegion={selectAnatomyRegion} muscleRoles={anatomyMuscleRoles} /><div className="region-selector" role="group" aria-label="근육 부위 다중 선택">{(Object.keys(recoveryGuides) as BodyRegion[]).map((region) => <button key={region} className={selectedAnatomyRegions.includes(region) ? "is-active" : ""} aria-pressed={selectedAnatomyRegions.includes(region)} onClick={() => selectAnatomyRegion(region)}>{region}</button>)}</div></div><div className="anatomy-info"><div className="region-title"><p className="eyebrow">{selectedAnatomyRegions.length > 1 ? "COMPOUND MUSCLE FILTER" : "SELECTED MUSCLE / REGION"}</p><h3>{selectedAnatomyRegions.length ? selectedAnatomyRegions.join(" · ") : activeRegion}</h3><p>{selectedAnatomyRegions.length > 1 ? "선택한 모든 부위를 함께 자극하는 복합 운동만 표시합니다." : "모델을 드래그해 회전하거나 근육을 눌러 여러 부위를 함께 선택하세요."}</p></div>{anatomyExercise && <div className="anatomy-muscle-legend" aria-label={`${anatomyExercise.name} 근육 역할`}><span className="primary">주동근 · {anatomyMuscleRoles?.primary.join(" · ") || "-"}</span><span className="supporting">협응근 · {anatomyMuscleRoles?.supporting.join(" · ") || "-"}</span></div>}<div className="related-list"><div className="related-list-head"><p className="small-label">{selectedAnatomyRegions.length > 1 ? "COMPOUND EXERCISES" : "RELATED EXERCISES"}</p><span>{regionExercises.length}개</span></div>{regionExercises.length ? <div className="anatomy-exercise-list">{regionExercises.slice(0, 16).map((exercise) => <button key={exercise.id} onClick={() => openAnatomyExercise(exercise)}><span>{exercise.category}</span><b>{exercise.name}</b><ArrowRight size={15} /></button>)}</div> : <p className="anatomy-list-empty">이 조합을 함께 자극하는 운동을 찾지 못했습니다. 한 부위를 해제하거나 다른 조합을 선택해 보세요.</p>}</div><div className="safety-callout"><ShieldCheck size={18} /><p><strong>안전한 탐색</strong><br />날카로운 통증, 저림, 근력 저하, 외상 후 변화는 자가 관리보다 의료 평가를 우선하세요.</p></div></div></div>
          <div className="recovery-card"><div><p className="eyebrow">RECOVERY GUIDE · {activeRegion}</p><h3>{recovery.title}</h3><p>{recovery.intro}</p></div><ol>{recovery.steps.map((step, index) => <li key={step}><span>0{index + 1}</span>{step}</li>)}</ol><div className="recovery-caution"><HeartPulse size={17} /> {recovery.caution}</div></div>
          <RecoveryProtocolPanel region={activeRegion} />
          <RecoveryPathwayPanel pathways={recoveryPathways} pathway={activeRecoveryPathway} alternatives={pathwayAlternatives} onChoose={(id) => { setActiveRecoveryPathwayId(id); setActiveRegion(getRecoveryPathway(id).region); }} onExplore={exploreRecoveryAlternative} />
        </section></section>

        <section id="scene-progress" className="scene-view scene-view-progress" tabIndex={-1}><section id="progress" className="progress-section section-pad">
          <SectionTitle eyebrow="TRAINING LOG" title="기록은 감이 아닌 방향을 만듭니다." description="종목·세트·횟수·중량·시간·강도를 기록하면 누적 볼륨과 개인 최고 기록을 확인할 수 있습니다." action={<button className="dark-button" onClick={() => setLogOpen(true)}><Plus size={16} /> 새 기록</button>} />
          <RomStatusDashboard days={weekRomStatus} dashboardRef={romDashboardRef} exporting={romDashboardExporting} onExport={() => void exportRomStatusDashboard()} routineCompletion={{ completed: weeklyPlanInsight.completed, total: weeklyPlanInsight.total }} exportMeta={dashboardExportMeta} onChangeMeta={(key, value) => setDashboardExportMeta((current) => ({ ...current, [key]: value }))} monthlySummary={fourWeekRomStatus} />
          <div className="metric-row"><Metric icon={<Dumbbell size={18} />} label="누적 볼륨" value={logs.length ? `${totalVolume.toLocaleString()} kg` : "—"} caption={logs.length ? "기록된 세트 기준" : "기록을 추가해 시작"} /><Metric icon={<Timer size={18} />} label="운동 시간" value={logs.length ? `${totalMinutes}분` : "—"} caption={logs.length ? "누적 기록 기준" : "아직 기록 없음"} /><Metric icon={<Activity size={18} />} label="세션 수" value={`${logs.length}`} caption="기록된 운동" /><Metric icon={<CalendarDays size={18} />} label="이번 주" value={`${insights.load.sessions}`} caption="최근 7일 기록" /></div>
          <div className="insight-row"><article><p className="small-label">TRAINING LOAD</p><h3>{insights.load.load ? `${insights.load.load} 부하점수` : "기록 대기"}</h3><p>{insights.loadLabel}</p></article><article><p className="small-label">CONSISTENCY</p><h3>{insights.consistency.activeDays ? `주 평균 ${insights.consistency.weeklyAverage}일` : "습관 만들기"}</h3><p>{insights.consistencyLabel}</p></article><article><p className="small-label">BODY BALANCE</p><h3>{insights.balance[0]?.region ?? "부위 분석 대기"}</h3><p>{insights.balanceLabel}</p>{insights.balance.length > 0 && <div className="balance-tags">{insights.balance.slice(0, 4).map((item) => <span key={item.region}>{item.region}</span>)}</div>}</article></div>
          <div className="aerobic-trend-row"><article><p className="small-label">AEROBIC INTENSITY · RPE</p><h3>{insights.aerobic.band}{insights.aerobic.sessions ? ` · RPE ${insights.aerobic.averageRpe}` : ""}</h3><p>{insights.aerobic.label}</p></article><article><p className="small-label">EXERCISE TREND · 7 DAYS</p><h3>{insights.trend.direction} · {insights.prTrend.direction}</h3><p>{insights.trend.label}<br />{insights.streak.label} · {insights.prTrend.label}</p></article></div>
          <div className="four-week-card"><div className="card-title"><div><p className="small-label">4-WEEK RHYTHM</p><h3>시간·거리·부하의 흐름</h3></div><BarChart3 size={21} /></div><div className="four-week-bars" aria-label="최근 4주 운동 부하 추세">{fourWeekTrends.map((item) => <div key={item.label}><div className="four-week-bar-track"><i style={{ height: `${Math.max((item.load / maxFourWeekLoad) * 100, item.load ? 7 : 2)}%` }} /></div><b>{item.label}</b><span>{item.minutes}분 · {item.distanceKm ? `${item.distanceKm}km` : "거리—"}</span></div>)}</div></div>
          <div className="analytics-grid"><div className="chart-card"><div className="card-title"><div><p className="small-label">WEEKLY VOLUME</p><h3>최근 7일 볼륨</h3></div><BarChart3 size={21} /></div>{logs.length ? <div className="volume-bars" aria-label="최근 7일 운동 볼륨">{weeklyVolume.map((item) => <div className="volume-column" key={item.day} title={`${item.day}: ${item.volume.toLocaleString()} kg`}><i style={{ height: `${Math.max((item.volume / maxWeeklyVolume) * 100, item.volume ? 7 : 2)}%` }} /><span>{item.day}</span><b>{item.volume ? `${Math.round(item.volume / 1000)}k` : "·"}</b></div>)}</div> : <div className="chart-empty"><div className="ghost-bars"><i /><i /><i /><i /><i /><i /><i /></div><p><strong>첫 기록 하나면 충분합니다.</strong><br />종목·시간·강도만 남겨도 다음 세션의 기준이 생깁니다.</p><button className="empty-state-action" onClick={() => setLogOpen(true)}>첫 기록 남기기 <ArrowRight size={14} /></button></div>}</div><div className="pr-card"><p className="small-label">PERSONAL RECORDS</p><h3>개인 최고 기록</h3>{Object.keys(pr).length ? <div className="pr-list">{Object.entries(pr).map(([name, value]) => <div key={name}><span>{name}</span><b>{value} kg</b></div>)}</div> : <div className="pr-empty"><span className="pr-orbit"><Sparkles size={21} /></span><p>중량 기록을 추가해<br />첫 PR을 만들어 보세요.</p></div>}<button className="text-button dark-text" onClick={() => setLogOpen(true)}>기록 추가하기 <ArrowRight size={15} /></button></div></div>
          <div className="calendar-card"><div><p className="small-label">ACTIVITY CALENDAR</p><h3>날짜별 운동 기록</h3></div><div>{<div className="week-calendar">{calendarDays.map((day) => <div key={day.key} className={day.count ? "has-activity" : ""}><span>{day.weekday}</span><b>{day.day}</b><i>{day.count || "·"}</i></div>)}</div>}{logs.length ? <div className="log-table">{logs.slice(0, 4).map((log) => <div key={log.id}><span>{log.date.slice(5).replace("-", ".")}.</span><b>{log.exercise}</b><span>{log.sets}세트 · {log.reps}회 · {log.load}kg</span><span>RPE {log.intensity}</span></div>)}</div> : <div className="calendar-empty"><CalendarDays size={22} /><p>아직 기록된 운동이 없습니다. 세트와 강도를 남겨 다음 세션의 기준을 만들어 보세요.</p></div>}</div></div>
        </section></section>

        <section className="scene-view scene-view-wellness"><section id="wellness" className="wellness-section section-pad"><SectionTitle eyebrow="WHOLE-PERSON WELLNESS" title="회복도 훈련의 일부입니다." description="영양, 수면, 열 노출은 운동을 대체하는 비법이 아니라, 일관된 훈련을 지지하는 생활 습관의 일부로 다룹니다." /><div className="wellness-grid">{wellnessCards.map((card, index) => <WellnessCard key={card.title} card={card} index={index} />)}</div></section>

        <section id="cardio-intervals" className="interval-section section-pad"><SectionTitle eyebrow="CARDIO INTERVALS" title="종목에 맞춰, 숨이 무너지기 전에 낮춥니다." description="모든 템플릿은 입문·회복 우선의 출발점입니다. 말하기 검사와 RPE가 계획보다 우선하며, 통증·어지러움·비정상적 숨참은 중단 신호입니다." /><div className="interval-grid">{aerobicIntervalTemplates.map((template) => <article className="interval-card" key={template.id}><p className="small-label">{template.format}</p><h3>{template.title}</h3><dl><div><dt>준비</dt><dd>{template.warmup}</dd></div><div><dt>작업</dt><dd>{template.work}</dd></div><div><dt>회복</dt><dd>{template.recovery}</dd></div></dl><p className="interval-rpe">{template.rpe}</p><p>{template.adjust}</p><p className="interval-safety"><ShieldCheck size={14} /> {template.safety}</p></article>)}</div></section>

        <section id="quiet-circuits" className="interval-section section-pad"><SectionTitle eyebrow="QUIET HOME CIRCUITS" title="바닥 충격을 낮추고, 리듬은 이어갑니다." description="아파트·공유 주거 환경을 고려한 무점프 전신 서킷입니다. 발소리·호흡·자세 중 하나라도 통제되지 않으면 보폭·반복·라운드를 먼저 줄이세요." /><div className="interval-grid">{lowNoiseCircuitTemplates.map((template) => <article className="interval-card" key={template.id}><p className="small-label">{template.format}</p><h3>{template.title}</h3><dl><div><dt>소음</dt><dd>{template.noise}</dd></div><div><dt>공간</dt><dd>{template.space}</dd></div><div><dt>구성</dt><dd>{template.blocks.join(" · ")}</dd></div></dl><p className="interval-rpe">{template.intensity}</p><p>{template.adjust}</p><p className="interval-safety"><ShieldCheck size={14} /> {template.safety}</p></article>)}</div></section>

        <section id="start-safely" className="life-stage-section section-pad"><SectionTitle eyebrow="START SAFELY" title="시작 조건을 먼저 맞추고, 한 번에 하나만 조절합니다." description="이 안내는 개인 진단·치료·운동 처방이 아닌 일반 정보입니다. 임신·산후 상태, 질환, 수술·부상 이력 또는 새 증상은 의료진의 안내를 우선하세요." /><div className="start-checklist"><h3>운동 시작 전 5가지 확인</h3><ul>{startChecklist.map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul></div><div className="life-stage-grid">{lifeStageGuides.map((guide) => <article key={guide.id}><p className="eyebrow">GENERAL STARTING POINT</p><h3>{guide.title}</h3><p>{guide.scope}</p><h4>시작</h4><ul>{guide.start.map((item) => <li key={item}>{item}</li>)}</ul><h4>조절</h4><ul>{guide.adjust.map((item) => <li key={item}>{item}</li>)}</ul><p className="life-stage-stop"><ShieldCheck size={14} /> {guide.stop.join(" · ")}</p></article>)}</div></section>

        <section className="evidence-section"><div><BookOpen size={21} /><p className="eyebrow">EVIDENCE FIRST</p><h2>근거를 남기고,<br />한계를 함께 말합니다.</h2></div><div><p>Fit Atlas는 운동 항목마다 공공 보건 지침 또는 전문 기관의 출처를 연결합니다. 권고량은 일반적 참고 정보이며 개인별 질환, 임신·산후 상태, 부상 이력, 복용 약물을 대체 평가하지 않습니다.</p><a href="https://www.who.int/news-room/fact-sheets/detail/physical-activity" target="_blank" rel="noreferrer">WHO 신체 활동 권고 보기 <ArrowRight size={16} /></a></div></section></section>
      </main>

      <footer className="site-footer"><div className="brand"><span className="brand-mark"><Activity size={17} /></span><span>FIT ATLAS</span></div><p>움직임을 위한 지식, 일관성을 위한 기록.</p><p>© 2026 Fit Atlas. Educational information only.</p></footer>
      {storageUnavailable && <div className="storage-warning" role="status"><ShieldCheck size={16} /><p><strong>이 브라우저에서 자동 저장이 제한되었습니다.</strong> 현재 화면의 변경 사항은 유지되지만, 탭을 닫으면 사라질 수 있습니다. 브라우저 저장 공간 또는 개인정보 보호 설정을 확인한 뒤 다시 시도해 주세요.</p></div>}{romRecommendationTarget && <RomRecommendationDialog target={romRecommendationTarget} onClose={() => setRomRecommendationTarget(null)} />}

      {logOpen && <div className="modal-backdrop" role="presentation" onMouseDown={() => setLogOpen(false)}><section className="log-modal" role="dialog" aria-modal="true" aria-labelledby="log-title" onMouseDown={(event) => event.stopPropagation()}><div className="modal-head"><div><p className="eyebrow">TRAINING LOG</p><h2 id="log-title">운동 기록 추가</h2></div><button onClick={() => setLogOpen(false)} className="icon-button" aria-label="닫기"><X size={19} /></button></div><div className="form-steps" aria-label="기록 입력 순서"><span className="is-active">1 기본</span><span>2 강도</span><span>3 저장</span></div><p className="log-helper">모든 수치를 완벽히 기억할 필요는 없습니다. <strong>종목·시간·RPE</strong>부터 남기고, 세트·횟수·중량은 기억나는 만큼 입력하세요.</p><div className="log-form"><div className="form-grid"><label>운동 날짜<input type="date" max={new Date().toISOString().slice(0, 10)} value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} /></label><label>운동<select value={form.exercise} onChange={(event) => setForm({ ...form, exercise: event.target.value })}>{catalogExercises.map((exercise) => <option key={exercise.id}>{exercise.name}</option>)}</select></label></div><div className="form-grid"><label>세트<input inputMode="numeric" value={form.sets} onChange={(event) => setForm({ ...form, sets: event.target.value })} /></label><label>횟수<input inputMode="numeric" value={form.reps} onChange={(event) => setForm({ ...form, reps: event.target.value })} /></label><label>중량 (kg)<input inputMode="decimal" value={form.load} onChange={(event) => setForm({ ...form, load: event.target.value })} /></label><label>운동 시간 (분)<input inputMode="numeric" value={form.minutes} onChange={(event) => setForm({ ...form, minutes: event.target.value })} /></label><label>거리 · 선택<input inputMode="decimal" placeholder="러닝·사이클·로잉·수영" value={form.distance} onChange={(event) => setForm({ ...form, distance: event.target.value })} /><select value={form.distanceUnit} onChange={(event) => setForm({ ...form, distanceUnit: event.target.value as "km" | "m" })}><option value="km">km</option><option value="m">m</option></select></label></div><label>주관적 강도 RPE <span>{form.intensity}/10</span><input type="range" min="1" max="10" value={form.intensity} onChange={(event) => setForm({ ...form, intensity: event.target.value })} /></label><p className="form-safety"><ShieldCheck size={15} /> 거리 단위는 러닝·사이클에는 km, 로잉·수영에는 m를 사용하세요. 수치가 불확실하면 낮게 추정하거나 다음 기록부터 보완해도 됩니다.</p><button className="dark-button form-submit" onClick={addLog}>이 기록 저장하기 <ArrowRight size={16} /></button></div></section></div>}
      {profileOpen && <div className="modal-backdrop" role="presentation" onMouseDown={() => setProfileOpen(false)}><section className="log-modal profile-modal" role="dialog" aria-modal="true" aria-labelledby="profile-title" onMouseDown={(event) => event.stopPropagation()}><div className="modal-head"><div><p className="eyebrow">PERSONALIZATION</p><h2 id="profile-title">운동 기준 설정</h2></div><button onClick={() => setProfileOpen(false)} className="icon-button" aria-label="닫기"><X size={19} /></button></div><p className="modal-description">입력값은 이 기기에만 저장되며 보수적인 시작 난이도와 안내 맥락을 정하는 데만 사용합니다. 질환·통증·임신 상태 등 의료 정보에 대한 진단은 제공하지 않습니다.</p><div className="log-form"><div className="form-grid"><label>연령<input inputMode="numeric" placeholder="예: 30" value={profileForm.age} onChange={(event) => setProfileForm({ ...profileForm, age: event.target.value })} /></label><label>체중 (kg)<input inputMode="decimal" placeholder="예: 68" value={profileForm.weightKg} onChange={(event) => setProfileForm({ ...profileForm, weightKg: event.target.value })} /></label></div><label>성별<select value={profileForm.sex} onChange={(event) => setProfileForm({ ...profileForm, sex: event.target.value })}><option value="undisclosed">응답하지 않음</option><option value="female">여성</option><option value="male">남성</option><option value="nonbinary">논바이너리</option></select></label><div className="form-grid"><label>주요 목표<select value={profileForm.primaryGoal} onChange={(event) => setProfileForm({ ...profileForm, primaryGoal: event.target.value })}><option value="strength">근력 증가</option><option value="endurance">체력 증가</option><option value="weight_management">체중 관리</option><option value="general_health">건강 증진</option></select></label><label>경험 수준<select value={profileForm.experience} onChange={(event) => setProfileForm({ ...profileForm, experience: event.target.value })}><option value="beginner">입문</option><option value="intermediate">중급</option><option value="advanced">상급</option></select></label></div><div className="form-grid"><label>선호 운동 종류<select aria-label="선호 운동 종류" value={profileForm.preferredCategory} onChange={(event) => setProfileForm({ ...profileForm, preferredCategory: event.target.value as typeof profileForm.preferredCategory })}>{preferredCategoryOptions.map((item) => <option key={item} value={item}>{item === "전체" ? "특정 종류 없음" : item}</option>)}</select></label><label>선호 장비<select aria-label="선호 장비" value={profileForm.preferredEquipment} onChange={(event) => setProfileForm({ ...profileForm, preferredEquipment: event.target.value as typeof profileForm.preferredEquipment })}>{preferredEquipmentOptions.map((item) => <option key={item} value={item}>{{ flexible: "상황에 맞게", bodyweight: "장비 없이", basic_home: "간단한 홈 장비", gym: "헬스장 장비" }[item]}</option>)}</select></label></div><label>주 활동 환경<select aria-label="주 활동 환경" value={profileForm.preferredEnvironment} onChange={(event) => setProfileForm({ ...profileForm, preferredEnvironment: event.target.value as typeof profileForm.preferredEnvironment })}>{preferredEnvironmentOptions.map((item) => <option key={item} value={item}>{{ home: "집·매트", gym: "헬스장", outdoor: "야외·걷기" }[item]}</option>)}</select></label><label>선택적 안전 모드<select value={profileForm.recoveryContext} onChange={(event) => setProfileForm({ ...profileForm, recoveryContext: event.target.value })}><option value="none">해당 없음</option><option value="reduced_readiness">낮은 에너지·회복 저하·생애주기 변화</option><option value="pregnancy_postpartum">임신·산후 — 의료진 확인 우선</option></select></label><button className="dark-button form-submit" onClick={saveProfileSettings}>설정 저장 <ArrowRight size={16} /></button></div></section></div>}{romRecommendationTarget && <RomRecommendationDialog target={romRecommendationTarget} onClose={() => setRomRecommendationTarget(null)} />}
      {sceneSettingsOpen && <SceneExperienceDialog preferences={sceneExperience} onChangeSound={(soundEnabled) => setSceneExperience((current) => ({ ...current, soundEnabled }))} onClose={() => setSceneSettingsOpen(false)} />}
      {activeAtlasBlock && activeAtlasNode !== null && <AtlasNodeDialog block={activeAtlasBlock} index={activeAtlasNode} draft={atlasNodeDraft} onDraft={setAtlasNodeDraft} onClose={() => setActiveAtlasNode(null)} onSave={saveAtlasNode} onReset={resetAtlasNode} />}
    </div></AsciiInteractionContext.Provider>
  );
}

function ExerciseCard({ exercise, detail, index, isFavorite, onToggleFavorite, onViewed }: { exercise: Exercise; detail: ExerciseDetail; index: number; isFavorite: boolean; onToggleFavorite: () => void; onViewed: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const visual = getMovementVisual(exercise.id);
  const textGuide = getExerciseTextGuide(exercise, detail);
  const evidence = getExerciseEvidenceScope(exercise);
  const detailId = `exercise-detail-${exercise.id}`;
  const { pendingExerciseName, clearPendingExercise } = React.useContext(AsciiInteractionContext);
  useEffect(() => {
    if (pendingExerciseName !== exercise.name) return;
    setExpanded(true);
    onViewed();
    clearPendingExercise();
  }, [clearPendingExercise, exercise.name, onViewed, pendingExerciseName]);
  return <article data-atlas-index={String(index + 1).padStart(3, "0")} className={expanded ? "exercise-card is-expanded" : "exercise-card"}><div className="exercise-top"><span className="exercise-category-label">{exercise.category}</span><div className="exercise-card-actions"><span className="difficulty"><small>난이도</small>{exercise.difficulty}</span><button className={isFavorite ? "favorite-toggle is-favorite" : "favorite-toggle"} aria-label={`${exercise.name} ${isFavorite ? "즐겨찾기 해제" : "즐겨찾기 추가"}`} aria-pressed={isFavorite} onClick={onToggleFavorite}><Star size={15} fill={isFavorite ? "currentColor" : "none"} /></button></div></div><h3>{exercise.name}</h3><p className="english-name">{exercise.englishName}</p><ExerciseCardSummary exercise={exercise} />{expanded && <div id={detailId} className="exercise-detail"><p className="small-label">TRAINING BENEFITS</p><div className="benefit-row">{exercise.benefits.map((benefit) => <span key={benefit}>{benefit}</span>)}</div><TextExerciseGuide guide={textGuide} exerciseName={exercise.name} />{visual && <section className="visual-guide-block" aria-label={`${exercise.name} 단계형 자세 안내`}><div className="visual-guide-note"><span>01 · 02 · 03</span><p>그림의 순서대로 짧게 리허설한 뒤, <strong>통증·불안정·호흡 흐트러짐</strong>이 있으면 아래의 쉬운 변형으로 조절하세요.</p></div><MovementVisualGuide title={visual.title} frames={visual.frames} /></section>}<p className="small-label">SETUP</p><ol>{detail.setup.map((step, stepIndex) => <li key={step}><b>{stepIndex + 1}.</b>{step}</li>)}</ol><p className="small-label">FORM CUES</p><ol>{exercise.cues.map((cue, cueIndex) => <li key={cue}><b>{cueIndex + 1}.</b>{cue}</li>)}</ol><div className="detail-grid"><div><p className="small-label">EASIER</p><ul>{detail.regressions.map((item) => <li key={item}>{item}</li>)}</ul></div><div><p className="small-label">NEXT STEP</p><ul>{detail.progressions.map((item) => <li key={item}>{item}</li>)}</ul></div></div><p className="small-label">COMMON ERRORS</p><ul className="detail-errors">{detail.commonMistakes.map((item) => <li key={item}>{item}</li>)}</ul><p className="exercise-finish"><b>마무리</b>{detail.finish}</p><p className="exercise-warning">{exercise.warning}</p><section className="evidence-scope" aria-label={`${exercise.name} 근거 적용 범위`}><p className="small-label">EVIDENCE SCOPE</p><p>{evidence.sourceLabel}</p><p>{evidence.guidanceLabel}</p><small>{evidence.limit}</small></section><a href={exercise.reference.url} target="_blank" rel="noreferrer">{exercise.reference.label} <ArrowRight size={13} /></a></div>}<button className="card-expand" aria-expanded={expanded} aria-controls={detailId} onClick={() => { const nextExpanded = !expanded; setExpanded(nextExpanded); if (nextExpanded) onViewed(); }}>{expanded ? "간단히 보기" : "자세·근거 보기"}<ChevronRight size={15} className={expanded ? "rotate-icon" : ""} /></button></article>;
}

function TextExerciseGuide({ guide, exerciseName }: { guide: ExerciseTextGuide; exerciseName: string }) {
  const ascii = getAsciiMovementDiagram(exerciseName, guide);
  const presentation = getAsciiDiagramPresentation(guide);
  const { showAxis, onOpenRom } = React.useContext(AsciiInteractionContext);
  return <section className="text-exercise-guide" aria-label={`${exerciseName} 사진 없는 자세 안내`}><div className="text-guide-head"><div><p className="small-label">TEXT MOVEMENT MAP</p><h4>읽으며 따라 하는 자세 지도</h4></div><span>사진 없이도<br />① → ② → ③</span></div>{ascii && <section className={`ascii-movement-diagram theme-${presentation.categoryTheme} region-${presentation.regionTheme}`} aria-label={`${exerciseName} ASCII 동작 도식`}><div className="ascii-legend"><p className="small-label">ASCII MOTION SKETCH</p><div><span>{presentation.categoryLabel}</span><span>● {presentation.regionLabel}</span></div><p><b>화살표 범례</b> {presentation.motionLabel}</p><p>{ascii.description}</p></div><div className="ascii-axis-rom" aria-label={`중심축 ${presentation.jointFocus}, 가동 범위 ${presentation.rom}`}>{showAxis && <><div className="axis-points" aria-hidden="true"><i /><b /><i /></div><p><b>중심축</b> {presentation.jointFocus}</p></>}<button className={`rom-badge rom-${presentation.rom}`} onClick={() => onOpenRom(exerciseName, presentation)} aria-haspopup="dialog">ROM · {presentation.rom}</button><small>{presentation.romDescription}</small></div><div className="ascii-stages">{ascii.stages.map((stage, index) => <article key={stage.label}><span>0{index + 1} · {stage.label}</span><pre aria-label={`${stage.label} ASCII 도식: ${stage.cue}`}>{stage.art}</pre><i aria-hidden="true">{presentation.stageArrows[index]}</i><b>{stage.cue}</b></article>)}</div></section>}<ol className="text-guide-sequence">{guide.sequence.map((step, index) => <li key={step}><span>0{index + 1}</span><div><b>{["시작 자세", "움직임", "마무리 확인"][index]}</b><p>{step}</p></div></li>)}</ol><div className="text-guide-facts"><article><span>◎ 주로 쓰는 근육</span><p>{guide.primaryMuscles.join(" · ")}</p></article><article><span>＋ 함께 쓰는 근육</span><p>{guide.supportingMuscles.join(" · ")}</p></article><article><span>↔ 호흡</span><p>{guide.breathing.replace("↔ ", "")}</p></article><article><span>↓ 어렵다면</span><p>{guide.adjustment.replace("↓ ", "")}</p></article></div><p className="text-guide-stop">{guide.stop}</p></section>;
}

function RomRecommendationDialog({ target, onClose }: { target: RomRecommendationTarget; onClose: () => void }) {
  const recommendation = getRomRecommendation(target.presentation);
  const { onAddToTodayRoutine, onExploreAlternative } = React.useContext(AsciiInteractionContext);
  return <div className="modal-backdrop" role="presentation" onMouseDown={onClose}><section className="log-modal rom-recommendation-modal" role="dialog" aria-modal="true" aria-labelledby="rom-recommendation-title" onMouseDown={(event) => event.stopPropagation()}><div className="modal-head"><div><p className="eyebrow">ROM ADJUSTMENT GUIDE</p><h2 id="rom-recommendation-title">{target.exerciseName} · {recommendation.title}</h2></div><button onClick={onClose} className="icon-button" aria-label="닫기"><X size={19} /></button></div><p className="modal-description">{recommendation.intro}</p><div className="rom-recommendation-grid"><article><p className="small-label">가볍게 풀기</p><ul>{recommendation.stretch.map((item) => <li key={item}>{item}</li>)}</ul></article><article><p className="small-label">대체 운동 방식</p><ul>{recommendation.alternatives.map((item) => <li key={item.name}><div className="alternative-exercise-actions"><button className="alternative-exercise-link" onClick={() => onExploreAlternative(item.name)}><b>{item.name}</b><span>{item.rationale}</span><ArrowRight size={14} /></button><button className="alternative-routine-add" onClick={() => onAddToTodayRoutine(item.name)}><Plus size={13} /> 오늘 루틴</button></div></li>)}</ul></article></div><p className="text-guide-stop">{recommendation.caution}</p></section></div>;
}

function AtlasNodeDialog({ block, index, draft, onDraft, onClose, onSave, onReset }: { block: SessionBlock; index: number; draft: { label: string; minutes: string; items: string }; onDraft: React.Dispatch<React.SetStateAction<{ label: string; minutes: string; items: string }>>; onClose: () => void; onSave: () => void; onReset: () => void }) {
  return <div className="modal-backdrop" role="presentation" onMouseDown={onClose}><section className="log-modal atlas-node-modal" role="dialog" aria-modal="true" aria-labelledby="atlas-node-title" onMouseDown={(event) => event.stopPropagation()}><div className="modal-head"><div><p className="eyebrow">ATLAS NODE 0{index + 1}</p><h2 id="atlas-node-title">{block.label} 블록 편집</h2></div><button onClick={onClose} className="icon-button" aria-label="닫기"><X size={19} /></button></div><p className="modal-description">아틀라스에서 이 노드는 현재 세션의 <strong>{block.minutes}분 {block.label}</strong> 블록입니다. 수정한 내용은 이 브라우저의 같은 목표·장소·시간 조합에만 저장됩니다.</p><div className="log-form atlas-node-form"><div className="form-grid"><label>블록 이름<input value={draft.label} maxLength={40} onChange={(event) => onDraft((current) => ({ ...current, label: event.target.value }))} /></label><label>예상 시간 (분)<input inputMode="numeric" value={draft.minutes} onChange={(event) => onDraft((current) => ({ ...current, minutes: event.target.value }))} /></label></div><label>움직임 · 한 줄에 하나씩<textarea value={draft.items} rows={6} maxLength={800} onChange={(event) => onDraft((current) => ({ ...current, items: event.target.value }))} /></label><p className="form-safety"><ShieldCheck size={15} /> 통증·어지러움·비정상적인 숨참이 있으면 계획보다 중단·조절을 우선하세요.</p><div className="atlas-node-actions"><button className="recovery-secondary" onClick={onReset}>기본값으로 되돌리기</button><button className="dark-button form-submit" onClick={onSave}>블록 저장 <ArrowRight size={16} /></button></div></div></section></div>;
}

function Metric({ icon, label, value, caption }: { icon: React.ReactNode; label: string; value: string; caption: string }) { return <div className="metric-card"><span className="metric-icon">{icon}</span><p>{label}</p><b>{value}</b><small>{caption}</small></div>; }

function WeeklyPlanPanel({ plan, insight, onGoal, onToggle, onStartLog, onAdd }: { plan: WeeklyPlan; insight: ReturnType<typeof getWeeklyPlanInsight>; onGoal: (goal: WeeklyPlan["goal"]) => void; onToggle: (sessionId: string) => void; onStartLog: (session: WeeklyPlan["sessions"][number]) => void; onAdd: () => void }) {
  const completion = insight.total ? Math.round((insight.completed / insight.total) * 100) : 0;
  return <section className="weekly-plan-section section-pad"><SectionTitle eyebrow="WEEKLY RHYTHM" title="계획을 체크하고, 조절하며 이어가세요." description="완료 체크는 이 브라우저에만 저장됩니다. 실제 운동 기록과는 구분해 두고, 컨디션이 낮은 날에는 미루거나 더 가볍게 바꿔도 됩니다." /><div className="weekly-plan-grid"><aside className="weekly-summary"><p className="eyebrow">THIS WEEK · LOCAL ONLY</p><h3>{insight.completed} / {insight.total} 세션</h3><div className="weekly-progress-track" aria-label={`주간 계획 이행률 ${completion}%`}><i style={{ width: `${completion}%` }} /></div><p>{insight.label}</p><div className="weekly-goals">{(["all_round", "strength", "endurance"] as WeeklyPlan["goal"][]).map((goal) => <button key={goal} className={plan.goal === goal ? "is-selected" : ""} onClick={() => onGoal(goal)}>{{ all_round: "전신 균형", strength: "기초 근력", endurance: "심폐 리듬" }[goal]}</button>)}</div><button className="weekly-add-button" onClick={onAdd}><Plus size={15} /> 오늘 설계 세션 추가</button><small>기록 연결 {insight.linkedRecords}건 · 직접 체크 {insight.manualChecks}건 · 이번 주 운동 기록 {insight.loggedThisWeek}개</small></aside><div className="weekly-sessions">{plan.sessions.map((session, index) => <article key={session.id} className={session.completed ? "is-completed" : ""}><button className="weekly-check" onClick={() => onToggle(session.id)} aria-label={`${session.label} ${session.completed ? "완료 해제" : "완료 처리"}`} aria-pressed={session.completed}>{session.completed ? <Check size={15} /> : <span />}</button><div><p className="small-label">0{index + 1} · {session.weekday}요일 · {session.duration}분</p><h3>{session.label}</h3><p>{session.recordedAt ? "운동 기록과 연결되어 완료됨" : session.addedFromDesigner ? "세션 설계 도구에서 추가됨" : "목표별 시작 계획"}</p><button className="weekly-log-button" onClick={() => onStartLog(session)}>{session.recordedAt ? "기록 다시 열기" : "이 계획으로 기록 시작"}<ArrowRight size={13} /></button></div></article>)}</div></div></section>;
}

function RecoveryProtocolPanel({ region }: { region: BodyRegion }) {
  const protocol = recoveryProtocols[region];
  const stages = recoveryStageGuides[region];
  const groups = [
    ["스트레칭·가동성", protocol.stretch],
    ["폼롤러", protocol.foamRoller],
    ["마사지건", protocol.massageGun],
    ["부하 조절", protocol.loadManagement],
  ] as const;
  return <section className="recovery-toolkit" aria-label={`${region} 회복 방법 상세`}><div className="toolkit-heading"><p className="eyebrow">RECOVERY TOOLKIT</p><h3>도구보다, 반응을 먼저 확인하세요.</h3><p>아래 내용은 일반 교육용입니다. 통증을 치료하려 하기보다 불편감·피로·기능 변화를 관찰하며 부하를 조절하세요.</p></div><RecoveryStageGrid stages={stages} /><div className="toolkit-grid">{groups.map(([label, steps]) => <article key={label}><p className="small-label">{label}</p><ul>{steps.map((step) => <li key={step}>{step}</li>)}</ul></article>)}</div><div className="toolkit-red-flags"><ShieldCheck size={17} /><div><p className="small-label">즉시 자가 관리를 멈추고 평가가 필요한 신호</p><ul>{protocol.redFlags.map((flag) => <li key={flag}>{flag}</li>)}</ul></div></div></section>;
}

function WellnessCard({ card, index }: { card: (typeof wellnessCards)[number]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const detail = wellnessDetails[card.title];
  const detailId = `wellness-detail-${index}`;
  return <article className={`wellness-card tone-${card.tone}${expanded ? " is-expanded" : ""}`}><span className="wellness-index">{String(index + 1).padStart(2, "0")}</span><p className="eyebrow">{card.eyebrow}</p><h3>{card.title}</h3><p>{card.text}</p>{expanded && <div id={detailId} className="wellness-detail-region"><WellnessDetailPanel detail={detail} /></div>}<button className="wellness-expand" aria-expanded={expanded} aria-controls={detailId} onClick={() => setExpanded(!expanded)}>{expanded ? "간단히 보기" : "상세 가이드"}<ChevronRight size={14} className={expanded ? "rotate-icon" : ""} /></button><a href={card.url} target="_blank" rel="noreferrer">{card.source} <ArrowRight size={14} /></a></article>;
}
