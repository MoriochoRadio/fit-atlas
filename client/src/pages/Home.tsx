import { recoveryGuides } from "@/lib/catalogContent";
import {
  catalogSummary,
  entriesToExercises,
  getCatalogPageCount,
  getInitialCatalogEntries,
  loadCatalogEntriesByIds,
  loadCatalogPage,
  loadFullCatalog,
} from "@/lib/catalogLoader";
import type { BodyRegion, Exercise } from "@/lib/catalogTypes";
import {
  Activity,
  ArrowRight,
  HeartPulse,
  Menu,
  Plus,
  Search,
  ShieldCheck,
  Timer,
  X,
} from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { SceneExperienceDialog } from "@/components/SceneExperienceDialog";
import {
  AnatomyScene,
  type AnatomyMuscleRoles,
} from "@/components/scenes/AnatomyScene";
import {
  defaultExploreFilters,
  filtersForKeyword,
  filtersFromPreset,
  type ExploreFilters,
} from "@/lib/exploreFilterState";
import { AsciiInteractionContext } from "@/lib/asciiInteractionContext";
import { explorePaths, type ExplorePath } from "@/lib/explorePaths";
import { equipmentSessionSetup } from "@/lib/equipmentSessionSetup";
import { goalCopy } from "@/lib/goalCopy";
import { sceneByHash, type CinematicScene } from "@/lib/scenes";
import { HeroScene } from "@/components/scenes/HeroScene";
import { WellnessScene } from "@/components/scenes/WellnessScene";
import { ExploreScene } from "@/components/scenes/ExploreScene";
import { SessionScene } from "@/components/scenes/SessionScene";
import { ProgressScene } from "@/components/scenes/ProgressScene";
import { WorkdayRecoveryScene } from "@/components/scenes/WorkdayRecoveryScene";
import { toast } from "sonner";
import {
  getCalendarDays,
  getFourWeekTrends,
  getPersonalRecords,
  getTotalMinutes,
  getTotalVolume,
  getWeeklyVolume,
  type TrainingLog,
} from "@/lib/trainingMetrics";
import { getPersonalizedProgram } from "@/lib/personalization";
import {
  defaultAtlasInteractionPreferences,
  defaultAtlasTheme,
  defaultSceneExperiencePreferences,
  downloadBackup,
  parseBackup,
  readAtlasInteractionPreferences,
  readAtlasTheme,
  readAxisVisibility,
  readLocalCheckin,
  readLocalExplorePreferences,
  readLocalProfile,
  readLocalRomStatusHistory,
  readLocalWeeklyPlan,
  readSceneExperiencePreferences,
  readTrainingLogs,
  saveAtlasInteractionPreferences,
  saveAtlasTheme,
  saveAxisVisibility,
  saveLocalCheckin,
  saveLocalExplorePreferences,
  saveLocalProfile,
  saveLocalRomStatusHistory,
  saveLocalWeeklyPlan,
  saveSceneExperiencePreferences,
  saveTrainingLogs,
  type AtlasTheme,
  type SceneExperiencePreferences,
} from "@/lib/localStore";
import {
  defaultExplorePreferences,
  recordRecentExercise,
  removeExploreFilterPreset,
  saveExploreFilterPreset,
  toggleFavoriteExercise,
  type ExploreFilterPreset,
  type ExplorePreferences,
} from "@/lib/explorePreferences";
import { filterExercises } from "@/lib/exerciseFilters";
import { sortExercises } from "@/lib/exerciseSorting";
import {
  applyRecoveryExplore,
  getRecoveryPathway,
  type RecoveryPathwayId,
} from "@/lib/recoveryPathways";
import { getInsightSummary } from "@/lib/trainingInsights";
import { getExerciseTextGuide } from "@/lib/exerciseTextGuide";
import { getAsciiDiagramPresentation } from "@/lib/asciiMovementDiagrams";
import { getRomRecommendation } from "@/lib/romRecommendations";
import { getRomReadinessRecommendation } from "@/lib/romReadiness";
import {
  createRomStatusRecord,
  getCurrentWeekRomStatus,
  getFourWeekRomStatus,
  mergeRomStatusHistory,
  type RomStatusRecord,
} from "@/lib/romStatusHistory";
import { getRoutineTemplate, type RoutineGoal } from "@/lib/routineTemplates";
import {
  getCheckinRecommendation,
  type DailyCheckin,
} from "@/lib/dailyCheckin";
import {
  buildSession,
  sessionQuickStarts,
  type SessionBlock,
  type SessionEnvironment,
  type SessionGoal,
  type SessionDuration,
} from "@/lib/sessionBuilder";
import {
  addDesignedSession,
  addRomAlternativeToWeeklyPlan,
  completeWeeklySessionWithRecord,
  getWeeklyPlanInsight,
  setWeeklyGoal,
  toggleWeeklySession,
  type WeeklyPlan,
} from "@/lib/weeklyPlan";
import type {
  RecoveryContext,
  SeatedRecoveryDuration,
} from "@/lib/seatedRecovery";
import {
  preferredCategoryOptions,
  preferredEnvironmentOptions,
  preferredEquipmentOptions,
} from "@/lib/profilePreferences";

type LogEntry = TrainingLog;
type RomRecommendationTarget = {
  exerciseName: string;
  presentation: ReturnType<typeof getAsciiDiagramPresentation>;
};

const categories = preferredCategoryOptions;
// 이 12개 컴포넌트는 모두 합쳐 31.7 kB다. lazy로 쪼개면 초기 전송량은 거의 줄지 않으면서
// 요청만 12회 늘고, Suspense 경계 탓에 렌더 타이밍이 비결정적이 된다(회귀 테스트 2건이
// 이 이유로 깨져 CI가 33회 연속 실패했다). 큰 것(카탈로그 페이지·html2canvas)만 지연 로드한다.
const initialVisibleExerciseCount = 18;

function playSceneTransitionSound() {
  if (typeof window === "undefined") return;
  const AudioContextConstructor =
    window.AudioContext ??
    (window as Window & { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!AudioContextConstructor) return;
  try {
    const context = new AudioContextConstructor();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const now = context.currentTime;
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(330, now);
    oscillator.frequency.exponentialRampToValueAtTime(520, now + 0.16);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.045, now + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.21);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start(now);
    oscillator.stop(now + 0.22);
    window.setTimeout(() => void context.close(), 280);
  } catch {
    // Audio output is optional and must never block scene navigation.
  }
}

export default function Home() {
  const [exploreFilters, setExploreFilters] = useState<ExploreFilters>(
    defaultExploreFilters
  );
  const {
    keyword,
    category,
    focus,
    region: regionFilter,
    difficulty,
    equipment,
    sort,
    rom: romFilter,
  } = exploreFilters;
  const updateExploreFilters = (patch: Partial<ExploreFilters>) =>
    setExploreFilters(current => ({ ...current, ...patch }));
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [atlasTheme, setAtlasTheme] = useState<AtlasTheme>(() =>
    typeof window === "undefined" ? defaultAtlasTheme : readAtlasTheme()
  );
  const [atlasInteraction, setAtlasInteraction] = useState(() =>
    typeof window === "undefined"
      ? defaultAtlasInteractionPreferences
      : readAtlasInteractionPreferences()
  );
  const [atlasTransition, setAtlasTransition] = useState<
    "theme" | "route" | null
  >(null);
  const [activeAtlasNode, setActiveAtlasNode] = useState<number | null>(null);
  const [atlasNodeDraft, setAtlasNodeDraft] = useState({
    label: "",
    minutes: "",
    items: "",
  });
  const [axisVisible, setAxisVisible] = useState(() =>
    typeof window === "undefined" ? true : readAxisVisibility()
  );
  const [romRecommendationTarget, setRomRecommendationTarget] =
    useState<RomRecommendationTarget | null>(null);
  const [pendingExerciseName, setPendingExerciseName] = useState<string | null>(
    null
  );
  const [catalogEntries, setCatalogEntries] = useState(() =>
    getInitialCatalogEntries()
  );
  const [loadedCatalogPages, setLoadedCatalogPages] = useState(1);
  const [visibleExerciseCount, setVisibleExerciseCount] = useState<number>(
    initialVisibleExerciseCount
  );
  const [catalogLoading, setCatalogLoading] = useState(false);
  const [explorePreferences, setExplorePreferences] =
    useState<ExplorePreferences>(() =>
      typeof window === "undefined"
        ? defaultExplorePreferences
        : readLocalExplorePreferences()
    );
  const [presetName, setPresetName] = useState("");
  const [savedCatalogEntries, setSavedCatalogEntries] = useState(() =>
    getInitialCatalogEntries().filter(() => false)
  );
  const [activeRegion, setActiveRegion] = useState<BodyRegion>("등");
  const [selectedAnatomyRegions, setSelectedAnatomyRegions] = useState<
    BodyRegion[]
  >(["등"]);
  const [anatomyExercise, setAnatomyExercise] = useState<Exercise | null>(null);
  const [activeRecoveryPathwayId, setActiveRecoveryPathwayId] =
    useState<RecoveryPathwayId>("shoulder");
  const [goal, setGoal] = useState<keyof typeof goalCopy>("근력증가");
  const [routineGoal, setRoutineGoal] = useState<RoutineGoal>("strength");
  const [sessionGoal, setSessionGoal] = useState<SessionGoal>("all_round");
  const [sessionEnvironment, setSessionEnvironment] =
    useState<SessionEnvironment>(() =>
      typeof window === "undefined"
        ? "home"
        : readLocalProfile().preferredEnvironment
    );
  const [sessionDuration, setSessionDuration] = useState<SessionDuration>(30);
  const [sessionGuidanceOpen, setSessionGuidanceOpen] = useState(false);
  const [seatedRecoveryDuration, setSeatedRecoveryDuration] =
    useState<SeatedRecoveryDuration>(5);
  const [weeklyPlan, setWeeklyPlan] = useState<WeeklyPlan>(() =>
    typeof window === "undefined"
      ? readLocalWeeklyPlan()
      : readLocalWeeklyPlan()
  );
  const [logOpen, setLogOpen] = useState(false);
  const [linkedPlanSessionId, setLinkedPlanSessionId] = useState<string | null>(
    null
  );
  const [profileOpen, setProfileOpen] = useState(false);
  const [sceneSettingsOpen, setSceneSettingsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [storageUnavailable, setStorageUnavailable] = useState(false);
  const [sceneExperience, setSceneExperience] =
    useState<SceneExperiencePreferences>(() =>
      typeof window === "undefined"
        ? defaultSceneExperiencePreferences
        : readSceneExperiencePreferences()
    );
  const [activeScene, setActiveScene] = useState<CinematicScene>(() => {
    if (typeof window === "undefined") return "home";
    return (
      sceneByHash[window.location.hash] ??
      readSceneExperiencePreferences().lastScene
    );
  });
  const [logs, setLogs] = useState<LogEntry[]>(() =>
    typeof window === "undefined" ? [] : readTrainingLogs()
  );
  const [form, setForm] = useState(() => ({
    date: new Date().toISOString().slice(0, 10),
    exercise: "바벨 백 스쿼트",
    sets: "3",
    reps: "8",
    load: "40",
    minutes: "35",
    distance: "",
    distanceUnit: "km" as "km" | "m",
    intensity: "6",
  }));
  const [profileForm, setProfileForm] = useState(() =>
    typeof window === "undefined" ? readLocalProfile() : readLocalProfile()
  );
  const [checkin, setCheckin] = useState<DailyCheckin>(() => {
    const saved =
      typeof window === "undefined" ? undefined : readLocalCheckin();
    const today = new Date().toISOString().slice(0, 10);
    return saved && saved.date === today
      ? saved
      : {
          ...(saved ?? { energy: 3, sleep: 3, stress: 3, pain: 1 }),
          date: today,
        };
  });
  const [romStatusHistory, setRomStatusHistory] = useState<RomStatusRecord[]>(
    () => (typeof window === "undefined" ? [] : readLocalRomStatusHistory())
  );
  const [romDashboardExporting, setRomDashboardExporting] = useState(false);
  const [dashboardExportMeta, setDashboardExportMeta] = useState(() => ({
    period: "최근 7일",
    note: "",
  }));
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
      document
        .getElementById(`scene-${activeScene}`)
        ?.focus({ preventScroll: true });
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
    setRomStatusHistory(current =>
      mergeRomStatusHistory(current, createRomStatusRecord(checkin))
    );
  }, [checkin]);

  useEffect(() => {
    document
      .querySelectorAll<HTMLInputElement>(
        ".checkin-controls input[type='range']"
      )
      .forEach(input => {
        input.step = "0.5";
      });
  }, []);

  useEffect(() => {
    if (!saveLocalRomStatusHistory(romStatusHistory))
      setStorageUnavailable(true);
  }, [romStatusHistory]);

  useEffect(() => {
    if (!saveLocalWeeklyPlan(weeklyPlan)) setStorageUnavailable(true);
  }, [weeklyPlan]);

  useEffect(() => {
    const isComplete =
      weeklyPlan.sessions.length > 0 &&
      weeklyPlan.sessions.every(session => session.completed);
    if (
      completionEffectInitialized.current &&
      isComplete &&
      !previouslyComplete.current
    )
      setCelebrationOpen(true);
    completionEffectInitialized.current = true;
    previouslyComplete.current = isComplete;
  }, [weeklyPlan]);

  useEffect(() => {
    if (!saveLocalExplorePreferences(explorePreferences))
      setStorageUnavailable(true);
  }, [explorePreferences]);

  useEffect(() => {
    if (!saveAxisVisibility(axisVisible)) setStorageUnavailable(true);
  }, [axisVisible]);

  useEffect(() => {
    if (!saveAtlasTheme(atlasTheme)) setStorageUnavailable(true);
  }, [atlasTheme]);

  useEffect(() => {
    if (!saveAtlasInteractionPreferences(atlasInteraction))
      setStorageUnavailable(true);
  }, [atlasInteraction]);

  useEffect(() => {
    setSceneExperience(current =>
      current.lastScene === activeScene
        ? current
        : { ...current, lastScene: activeScene }
    );
  }, [activeScene]);

  useEffect(() => {
    if (!saveSceneExperiencePreferences(sceneExperience))
      setStorageUnavailable(true);
  }, [sceneExperience]);

  const playAtlasTransition = (kind: "theme" | "route") => {
    if (atlasTransitionTimer.current)
      window.clearTimeout(atlasTransitionTimer.current);
    setAtlasTransition(null);
    window.setTimeout(() => setAtlasTransition(kind), 0);
    atlasTransitionTimer.current = window.setTimeout(() => {
      setAtlasTransition(null);
    }, 820);
  };

  useEffect(
    () => () => {
      if (atlasTransitionTimer.current)
        window.clearTimeout(atlasTransitionTimer.current);
    },
    []
  );

  useEffect(() => {
    if (!atlasRouteInitialized.current) {
      atlasRouteInitialized.current = true;
      return;
    }
    playAtlasTransition("route");
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
  }, [
    activeAtlasNode,
    logOpen,
    menuOpen,
    profileOpen,
    romRecommendationTarget,
    sceneSettingsOpen,
  ]);

  useEffect(() => {
    const savedIds = [
      ...explorePreferences.favoriteExerciseIds,
      ...explorePreferences.recentExerciseIds,
    ];
    if (savedIds.length === 0) {
      setSavedCatalogEntries([]);
      return;
    }
    let cancelled = false;
    void loadCatalogEntriesByIds(savedIds).then(entries => {
      if (!cancelled) setSavedCatalogEntries(entries);
    });
    return () => {
      cancelled = true;
    };
  }, [
    explorePreferences.favoriteExerciseIds,
    explorePreferences.recentExerciseIds,
  ]);

  const catalogExercises = useMemo(
    () => entriesToExercises(catalogEntries),
    [catalogEntries]
  );
  const detailsByExerciseId = useMemo(
    () =>
      new Map(
        catalogEntries.map(({ exercise, detail }) => [exercise.id, detail])
      ),
    [catalogEntries]
  );
  const filteredExercises = useMemo(() => {
    const matches = filterExercises(catalogExercises, {
      keyword,
      category,
      focus,
      region: regionFilter,
      difficulty,
      equipment,
    });
    const romMatches =
      romFilter === "전체"
        ? matches
        : matches.filter(exercise => {
            const detail = detailsByExerciseId.get(exercise.id);
            return detail
              ? getAsciiDiagramPresentation(
                  getExerciseTextGuide(exercise, detail)
                ).rom === romFilter
              : false;
          });
    return sortExercises(romMatches, sort);
  }, [
    catalogExercises,
    category,
    detailsByExerciseId,
    difficulty,
    equipment,
    focus,
    keyword,
    regionFilter,
    romFilter,
    sort,
  ]);
  const visibleExercises = useMemo(
    () => filteredExercises.slice(0, visibleExerciseCount),
    [filteredExercises, visibleExerciseCount]
  );
  const activeExploreFilterLabels = useMemo(
    () =>
      [
        keyword.trim() ? `검색 · ${keyword.trim()}` : null,
        category !== "전체" ? `종류 · ${category}` : null,
        focus !== "전체" ? `목적 · ${focus}` : null,
        regionFilter !== "전체" ? `부위 · ${regionFilter}` : null,
        difficulty !== "전체" ? `난이도 · ${difficulty}` : null,
        equipment !== "전체" ? `장비 · ${equipment}` : null,
        romFilter !== "전체" ? `ROM · ${romFilter}` : null,
      ].filter((label): label is string => Boolean(label)),
    [category, difficulty, equipment, focus, keyword, regionFilter, romFilter]
  );
  const sortLabel = {
    recommended: "추천순",
    difficulty: "난이도순",
    duration: "소요 시간순",
  }[sort];
  const hasExploreFilterState =
    activeExploreFilterLabels.length > 0 || sort !== "recommended";
  useEffect(() => {
    setVisibleExerciseCount(current =>
      current === initialVisibleExerciseCount
        ? current
        : initialVisibleExerciseCount
    );
  }, [
    category,
    difficulty,
    equipment,
    focus,
    keyword,
    regionFilter,
    romFilter,
    sort,
  ]);
  const catalogStats = catalogSummary;
  const savedExerciseById = useMemo(
    () =>
      new Map(
        savedCatalogEntries.map(({ exercise }) => [exercise.id, exercise])
      ),
    [savedCatalogEntries]
  );
  const favoriteExercises = useMemo(
    () =>
      explorePreferences.favoriteExerciseIds.flatMap(id => {
        const exercise = savedExerciseById.get(id);
        return exercise ? [exercise] : [];
      }),
    [explorePreferences.favoriteExerciseIds, savedExerciseById]
  );
  const recentExercises = useMemo(
    () =>
      explorePreferences.recentExerciseIds.flatMap(id => {
        const exercise = savedExerciseById.get(id);
        return exercise ? [exercise] : [];
      }),
    [explorePreferences.recentExerciseIds, savedExerciseById]
  );

  const anatomyFilterRegions = selectedAnatomyRegions.length
    ? selectedAnatomyRegions
    : [activeRegion];
  const regionExercises = catalogExercises.filter(exercise =>
    anatomyFilterRegions.every(region => exercise.regions.includes(region))
  );
  const anatomyMuscleRoles = useMemo<AnatomyMuscleRoles>(
    () =>
      anatomyExercise
        ? {
            primary: anatomyExercise.regions.slice(0, 2),
            supporting: anatomyExercise.regions.slice(2),
          }
        : null,
    [anatomyExercise]
  );
  const recovery = recoveryGuides[activeRegion];
  const activeRecoveryPathway = getRecoveryPathway(activeRecoveryPathwayId);
  const pathwayAlternatives = activeRecoveryPathway.alternativeExerciseIds
    .map(id => catalogExercises.find(exercise => exercise.id === id))
    .filter((exercise): exercise is Exercise => Boolean(exercise));
  const plan = getPersonalizedProgram({
    age: profileForm.age ? Number(profileForm.age) : null,
    weightKg: profileForm.weightKg ? Number(profileForm.weightKg) : null,
    sex: profileForm.sex as "female" | "male" | "nonbinary" | "undisclosed",
    primaryGoal: goalCopy[goal],
    experience: profileForm.experience as
      | "beginner"
      | "intermediate"
      | "advanced",
    recoveryContext: profileForm.recoveryContext as
      | "none"
      | "reduced_readiness"
      | "pregnancy_postpartum",
  });
  const routine = getRoutineTemplate(routineGoal);
  const weeklyVolume = useMemo(() => getWeeklyVolume(logs), [logs]);
  const fourWeekTrends = useMemo(() => getFourWeekTrends(logs), [logs]);
  const maxFourWeekLoad = Math.max(...fourWeekTrends.map(item => item.load), 1);
  const maxWeeklyVolume = Math.max(...weeklyVolume.map(item => item.volume), 1);
  const calendarDays = useMemo(() => getCalendarDays(logs), [logs]);
  const totalVolume = getTotalVolume(logs);
  const totalMinutes = getTotalMinutes(logs);
  const pr = useMemo(() => getPersonalRecords(logs), [logs]);
  const insights = useMemo(
    () => getInsightSummary(logs, new Date(), catalogExercises),
    [catalogExercises, logs]
  );
  const checkinRecommendation = useMemo(
    () => getCheckinRecommendation(checkin),
    [checkin]
  );
  const romReadiness = useMemo(
    () => getRomReadinessRecommendation(checkin),
    [checkin]
  );
  const weekRomStatus = useMemo(
    () => getCurrentWeekRomStatus(romStatusHistory),
    [romStatusHistory]
  );
  const fourWeekRomStatus = useMemo(
    () => getFourWeekRomStatus(romStatusHistory, weeklyPlan),
    [romStatusHistory, weeklyPlan]
  );
  const sessionPlan = useMemo(
    () =>
      buildSession({
        goal: sessionGoal,
        environment: sessionEnvironment,
        duration: sessionDuration,
        checkin,
      }),
    [checkin, sessionDuration, sessionEnvironment, sessionGoal]
  );
  const machineSessionIntensity = useMemo(() => {
    const rpe =
      atlasInteraction.resistance >= 76
        ? 8
        : atlasInteraction.resistance >= 58
          ? 6
          : atlasInteraction.resistance >= 36
            ? 4
            : 3;
    const label =
      rpe >= 8 ? "집중" : rpe >= 6 ? "보통" : rpe >= 4 ? "가볍게" : "회복";
    const target = {
      cable: "당기기·밀기 저항",
      dumbbell: "전신 부하",
      treadmill: "심폐 페이스",
    }[atlasInteraction.heroEquipment];
    return { rpe, label, target };
  }, [atlasInteraction.heroEquipment, atlasInteraction.resistance]);
  const weeklyPlanInsight = useMemo(
    () => getWeeklyPlanInsight(weeklyPlan, logs, checkin),
    [checkin, logs, weeklyPlan]
  );
  const atlasBlockKeyPrefix = `${sessionGoal}-${sessionEnvironment}-${sessionDuration}`;
  const atlasBlocks = useMemo(
    () =>
      sessionPlan.blocks.map(
        (block, index) =>
          atlasInteraction.blockEdits[`${atlasBlockKeyPrefix}-${index}`] ??
          block
      ),
    [atlasBlockKeyPrefix, atlasInteraction.blockEdits, sessionPlan.blocks]
  );
  const atlasSessionPlan = useMemo(
    () => ({ ...sessionPlan, blocks: atlasBlocks }),
    [atlasBlocks, sessionPlan]
  );
  const atlasPerformance = useMemo(() => {
    const completionRate = weeklyPlanInsight.total
      ? weeklyPlanInsight.completed / weeklyPlanInsight.total
      : 0;
    if (completionRate >= 1 || weeklyPlanInsight.loggedThisWeek >= 4)
      return "surge";
    if (completionRate >= 0.5 || weeklyPlanInsight.loggedThisWeek >= 2)
      return "active";
    return "starting";
  }, [weeklyPlanInsight]);
  // 처음 온 사람에게는 0%·0/3·0건만 가득한 대시보드가 먼저 보였다.
  // 쌓인 기록이 있을 때만 주간 리포트를 띄우고, 그 전에는 할 일을 먼저 보여준다.
  const hasTrainingHistory = logs.length > 0 || weeklyPlanInsight.completed > 0;

  const weeklyCompletionPercent = weeklyPlanInsight.total
    ? Math.round((weeklyPlanInsight.completed / weeklyPlanInsight.total) * 100)
    : 0;
  const atlasSignalSummary =
    atlasPerformance === "surge"
      ? { title: "고밀도 신호", detail: "완료·기록 흐름이 충분히 쌓였습니다." }
      : atlasPerformance === "active"
        ? { title: "활성 신호", detail: "이번 주 리듬을 이어가고 있습니다." }
        : { title: "준비 신호", detail: "첫 완료 또는 기록부터 시작하세요." };
  const weeklyCompletionFlow = useMemo(
    () =>
      ["월", "화", "수", "목", "금", "토", "일"].map(weekday => {
        const sessions = weeklyPlan.sessions.filter(
          session => session.weekday === weekday
        );
        return {
          weekday,
          planned: sessions.length,
          completed: sessions.filter(session => session.completed).length,
        };
      }),
    [weeklyPlan.sessions]
  );
  const weeklyDirection = useMemo(() => {
    if (checkinRecommendation.mode === "stop_and_assess")
      return "통증 신호가 있으면 다음 운동보다 회복과 필요한 평가를 먼저 선택하세요.";
    if (weeklyPlanInsight.total === 0 || weeklyPlanInsight.completed === 0)
      return "가장 부담이 적은 한 세션을 선택해 이번 주의 첫 신호를 만드세요.";
    if (weeklyPlanInsight.completed === weeklyPlanInsight.total)
      return "이번 주 계획을 마쳤습니다. 다음 세션에서는 시간·반복·저항 중 하나만 작게 조절하세요.";
    if (weeklyPlanInsight.loggedThisWeek === 0)
      return "완료한 세션 하나의 시간과 강도만 기록해 다음 주의 기준을 남겨 보세요.";
    return `남은 ${weeklyPlanInsight.remaining}개 세션은 현재 리듬을 유지하며 나누어 진행하세요.`;
  }, [checkinRecommendation.mode, weeklyPlanInsight]);
  const activeAtlasBlock =
    activeAtlasNode === null ? null : (atlasBlocks[activeAtlasNode] ?? null);
  const atlasRoute = {
    all_round: { label: "BALANCE ROUTE", description: "전신 연결과 리듬" },
    strength: { label: "POWER ROUTE", description: "점진적 힘과 안정" },
    endurance: { label: "FLOW ROUTE", description: "호흡과 지속 리듬" },
  }[sessionGoal];
  const navigateToScene = (scene: CinematicScene) => {
    const nextHash = scene === "home" ? "#top" : `#${scene}`;
    if (window.location.hash !== nextHash)
      window.history.pushState(null, "", nextHash);
    if (scene !== activeScene && sceneExperience.soundEnabled)
      playSceneTransitionSound();
    setActiveScene(scene);
    setMenuOpen(false);
    setSceneSettingsOpen(false);
  };

  const jumpToWellnessSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (!target) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    target.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  const startEquipmentSession = () => {
    const selected = equipmentSessionSetup[atlasInteraction.heroEquipment];
    setSessionGoal(selected.goal);
    setAtlasInteraction(current => ({
      ...current,
      recentEquipmentSession: {
        equipment: current.heroEquipment,
        resistance: current.resistance,
        startedAt: Date.now(),
      },
    }));
    navigateToScene("session");
    toast.success(
      `${selected.label} 기준 ${selected.goalLabel} ${sessionDuration}분 세션으로 연결했습니다.`
    );
  };

  const resumeRecentEquipmentSession = () => {
    const recent = atlasInteraction.recentEquipmentSession;
    if (!recent) return;
    const selected = equipmentSessionSetup[recent.equipment];
    setSessionGoal(selected.goal);
    setAtlasInteraction(current => ({
      ...current,
      heroEquipment: recent.equipment,
      resistance: recent.resistance,
      recentEquipmentSession: { ...recent, startedAt: Date.now() },
    }));
    navigateToScene("session");
    toast.success(
      `최근 ${selected.label} ${recent.resistance}% 설정으로 ${selected.goalLabel} 세션을 다시 시작합니다.`
    );
  };

  const openAtlasNode = (index: number) => {
    const block = atlasBlocks[index];
    if (!block) return;
    setAtlasNodeDraft({
      label: block.label,
      minutes: String(block.minutes),
      items: block.items.join("\n"),
    });
    setActiveAtlasNode(index);
  };

  const saveAtlasNode = () => {
    if (activeAtlasNode === null) return;
    const minutes = Number(atlasNodeDraft.minutes);
    const items = atlasNodeDraft.items
      .split("\n")
      .map(item => item.trim())
      .filter(Boolean)
      .slice(0, 8);
    if (
      !atlasNodeDraft.label.trim() ||
      !Number.isInteger(minutes) ||
      minutes < 1 ||
      minutes > 90 ||
      items.length === 0
    ) {
      toast.error(
        "블록 이름, 1~90분 범위, 한 개 이상의 움직임을 확인해 주세요."
      );
      return;
    }
    setAtlasInteraction(current => ({
      ...current,
      blockEdits: {
        ...current.blockEdits,
        [`${atlasBlockKeyPrefix}-${activeAtlasNode}`]: {
          label: atlasNodeDraft.label.trim().slice(0, 40),
          minutes,
          items,
        },
      },
    }));
    setActiveAtlasNode(null);
    playAtlasTransition("route");
    toast.success("아틀라스 세션 블록을 저장했습니다.");
  };

  const resetAtlasNode = () => {
    if (activeAtlasNode === null) return;
    setAtlasInteraction(current => {
      const blockEdits = { ...current.blockEdits };
      delete blockEdits[`${atlasBlockKeyPrefix}-${activeAtlasNode}`];
      return { ...current, blockEdits };
    });
    setActiveAtlasNode(null);
    playAtlasTransition("route");
  };

  const addLog = () => {
    const today = new Date().toISOString().slice(0, 10);
    const distance = form.distance.trim() ? Number(form.distance) : undefined;
    const entry = {
      id: crypto.randomUUID(),
      date: form.date,
      exercise: form.exercise,
      sets: Number(form.sets),
      reps: Number(form.reps),
      load: Number(form.load),
      minutes: Number(form.minutes),
      intensity: Number(form.intensity),
      ...(distance ? { distance, distanceUnit: form.distanceUnit } : {}),
    };
    if (!/^\d{4}-\d{2}-\d{2}$/.test(entry.date) || entry.date > today) {
      toast.error("운동 날짜는 오늘 또는 과거 날짜로 입력해 주세요.");
      return;
    }
    if (
      !Number.isInteger(entry.sets) ||
      entry.sets < 1 ||
      entry.sets > 30 ||
      !Number.isInteger(entry.reps) ||
      entry.reps < 1 ||
      entry.reps > 500 ||
      !Number.isFinite(entry.load) ||
      entry.load < 0 ||
      entry.load > 1000 ||
      !Number.isInteger(entry.minutes) ||
      entry.minutes < 1 ||
      entry.minutes > 1440 ||
      !Number.isInteger(entry.intensity) ||
      entry.intensity < 1 ||
      entry.intensity > 10 ||
      (distance !== undefined &&
        (!Number.isFinite(distance) ||
          distance <= 0 ||
          distance > (form.distanceUnit === "km" ? 500 : 500_000)))
    ) {
      toast.error("세트·횟수·시간·강도를 유효한 범위로 입력해 주세요.");
      return;
    }
    setLogs(current => [entry, ...current]);
    if (linkedPlanSessionId) {
      setWeeklyPlan(current =>
        completeWeeklySessionWithRecord(
          current,
          linkedPlanSessionId,
          new Date().toISOString()
        )
      );
      toast.success("운동 기록을 저장하고 해당 계획 세션을 완료 처리했습니다.");
    } else {
      toast.success("이 브라우저에 운동 기록을 저장했습니다.");
    }
    setLogOpen(false);
  };

  const startPlanSessionLog = (session: WeeklyPlan["sessions"][number]) => {
    const exerciseByPlan: Record<
      SessionGoal,
      Record<SessionEnvironment, string>
    > = {
      all_round: {
        home: "리버스 런지",
        gym: "레그 프레스",
        outdoor: "빠른 걷기",
      },
      strength: { home: "리버스 런지", gym: "레그 프레스", outdoor: "스텝업" },
      endurance: { home: "스텝업", gym: "스테디 사이클", outdoor: "빠른 걷기" },
    };
    const machineRpe =
      atlasInteraction.resistance >= 76
        ? 8
        : atlasInteraction.resistance >= 58
          ? 6
          : atlasInteraction.resistance >= 36
            ? 4
            : 3;
    const baseIntensity = String(
      checkinRecommendation.mode === "ready"
        ? machineRpe
        : checkinRecommendation.mode === "lighter"
          ? Math.min(machineRpe, 4)
          : Math.min(machineRpe, 3)
    );
    setForm(current => ({
      ...current,
      date: new Date().toISOString().slice(0, 10),
      exercise: exerciseByPlan[session.goal][session.environment],
      sets: session.goal === "endurance" ? "1" : "2",
      reps: session.goal === "endurance" ? "1" : "8",
      load: "0",
      minutes: String(session.duration),
      distance: "",
      distanceUnit: "km",
      intensity: baseIntensity,
    }));
    setLinkedPlanSessionId(session.id);
    setLogOpen(true);
  };

  const startCurrentMachineSessionLog = () => {
    const exerciseByPlan: Record<
      SessionGoal,
      Record<SessionEnvironment, string>
    > = {
      all_round: {
        home: "리버스 런지",
        gym: "레그 프레스",
        outdoor: "빠른 걷기",
      },
      strength: {
        home: "덤벨 루마니안 데드리프트",
        gym: "레그 프레스",
        outdoor: "스텝업",
      },
      endurance: {
        home: "저충격 스텝 터치",
        gym: "트레드밀 워크",
        outdoor: "빠른 걷기",
      },
    };
    setForm(current => ({
      ...current,
      date: new Date().toISOString().slice(0, 10),
      exercise: exerciseByPlan[sessionGoal][sessionEnvironment],
      sets: sessionGoal === "endurance" ? "1" : "2",
      reps: sessionGoal === "endurance" ? "1" : "8",
      load: "0",
      minutes: String(sessionDuration),
      distance: "",
      distanceUnit: "km",
      intensity: String(
        checkinRecommendation.mode === "ready"
          ? machineSessionIntensity.rpe
          : checkinRecommendation.mode === "lighter"
            ? Math.min(machineSessionIntensity.rpe, 4)
            : Math.min(machineSessionIntensity.rpe, 3)
      ),
    }));
    setLinkedPlanSessionId(null);
    setLogOpen(true);
    toast.success(
      `${machineSessionIntensity.target} ${atlasInteraction.resistance}%를 오늘 세션 강도 RPE ${machineSessionIntensity.rpe}에 반영했습니다.`
    );
  };

  useEffect(() => {
    setVisibleExerciseCount(initialVisibleExerciseCount);
  }, [
    category,
    difficulty,
    equipment,
    focus,
    keyword,
    regionFilter,
    romFilter,
    sort,
  ]);

  useEffect(() => {
    const cappedRpe =
      checkinRecommendation.mode === "ready"
        ? machineSessionIntensity.rpe
        : checkinRecommendation.mode === "lighter"
          ? Math.min(machineSessionIntensity.rpe, 4)
          : Math.min(machineSessionIntensity.rpe, 3);
    setForm(current =>
      current.intensity === String(cappedRpe)
        ? current
        : { ...current, intensity: String(cappedRpe) }
    );
  }, [checkinRecommendation.mode, machineSessionIntensity.rpe]);

  useEffect(() => {
    const needsFullCatalog = Boolean(
      keyword ||
        category !== "전체" ||
        focus !== "전체" ||
        regionFilter !== "전체" ||
        difficulty !== "전체" ||
        equipment !== "전체" ||
        romFilter !== "전체"
    );
    if (!needsFullCatalog || loadedCatalogPages === getCatalogPageCount())
      return;
    let cancelled = false;
    setCatalogLoading(true);
    void loadFullCatalog()
      .then(entries => {
        if (cancelled) return;
        setCatalogEntries(entries);
        setLoadedCatalogPages(getCatalogPageCount());
      })
      .catch(() => {
        if (!cancelled)
          toast.error(
            "운동 목록을 추가로 불러오지 못했습니다. 다시 시도해 주세요."
          );
      })
      .finally(() => {
        if (!cancelled) setCatalogLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [
    category,
    difficulty,
    equipment,
    focus,
    keyword,
    loadedCatalogPages,
    regionFilter,
    romFilter,
  ]);

  useEffect(() => {
    if (!logOpen || loadedCatalogPages === getCatalogPageCount()) return;
    void loadFullCatalog().then(entries => {
      setCatalogEntries(entries);
      setLoadedCatalogPages(getCatalogPageCount());
    });
  }, [loadedCatalogPages, logOpen]);

  const loadMoreExercises = async () => {
    if (visibleExerciseCount < filteredExercises.length) {
      setVisibleExerciseCount(current => current + initialVisibleExerciseCount);
      return;
    }
    if (loadedCatalogPages >= getCatalogPageCount() || catalogLoading) return;
    setCatalogLoading(true);
    try {
      const nextPage = await loadCatalogPage(loadedCatalogPages);
      setCatalogEntries(current => [...current, ...nextPage]);
      setLoadedCatalogPages(current => current + 1);
      setVisibleExerciseCount(current => current + initialVisibleExerciseCount);
    } catch {
      toast.error("다음 운동 목록을 불러오지 못했습니다. 다시 시도해 주세요.");
    } finally {
      setCatalogLoading(false);
    }
  };

  const openAnatomyExercise = (exercise: Exercise) => {
    setAnatomyExercise(exercise);
    setExploreFilters(current => ({
      ...filtersForKeyword(exercise.name),
      sort: current.sort,
    }));
    setPendingExerciseName(exercise.name);
    navigateToScene("explore");
    toast.success(`${exercise.name}의 자세·방법·안전 단서를 엽니다.`);
  };

  const selectAnatomyRegion = (region: BodyRegion) => {
    setActiveRegion(region);
    setAnatomyExercise(null);
    setSelectedAnatomyRegions(current =>
      current.includes(region)
        ? current.filter(item => item !== region)
        : [...current, region]
    );
    if (loadedCatalogPages >= getCatalogPageCount()) return;
    void loadFullCatalog().then(entries => {
      setCatalogEntries(entries);
      setLoadedCatalogPages(getCatalogPageCount());
    });
  };

  const exploreRecoveryAlternative = async (exerciseId: string) => {
    let availableExercises = catalogExercises;
    if (!availableExercises.some(exercise => exercise.id === exerciseId)) {
      const entries = await loadFullCatalog();
      setCatalogEntries(entries);
      setLoadedCatalogPages(getCatalogPageCount());
      availableExercises = entriesToExercises(entries);
    }
    const result = applyRecoveryExplore(
      activeRecoveryPathway,
      exerciseId,
      availableExercises,
      {
        applyFilters: filters => updateExploreFilters(filters),
        scrollToTarget: () => navigateToScene("explore"),
      }
    );
    if (result)
      toast.success(`${result.exercise.name}의 자세·안전 단서를 확인하세요.`);
  };

  const exploreSeatedRecoveryExercise = async (exerciseId: string) => {
    let availableExercises = catalogExercises;
    if (!availableExercises.some(exercise => exercise.id === exerciseId)) {
      const entries = await loadFullCatalog();
      setCatalogEntries(entries);
      setLoadedCatalogPages(getCatalogPageCount());
      availableExercises = entriesToExercises(entries);
    }
    const exercise = availableExercises.find(item => item.id === exerciseId);
    if (!exercise) return;
    updateExploreFilters({
      keyword: exercise.name,
      category: "전체",
      focus: "전체",
      region: "전체",
    });
    navigateToScene("explore");
    toast.success(`${exercise.name}의 자세·안전 단서를 확인하세요.`);
  };

  const saveProfileSettings = () => {
    const apiProfile = {
      age: profileForm.age ? Number(profileForm.age) : null,
      weightKg: profileForm.weightKg ? Number(profileForm.weightKg) : null,
      sex: profileForm.sex as "female" | "male" | "nonbinary" | "undisclosed",
      primaryGoal: profileForm.primaryGoal as
        | "strength"
        | "endurance"
        | "weight_management"
        | "general_health",
      experience: profileForm.experience as
        | "beginner"
        | "intermediate"
        | "advanced",
      recoveryContext: profileForm.recoveryContext as
        | "none"
        | "reduced_readiness"
        | "pregnancy_postpartum",
    };
    if (
      apiProfile.age !== null &&
      (apiProfile.age < 13 || apiProfile.age > 120)
    ) {
      toast.error("연령은 13–120 범위에서 입력해 주세요.");
      return;
    }
    if (
      apiProfile.weightKg !== null &&
      (apiProfile.weightKg < 25 || apiProfile.weightKg > 400)
    ) {
      toast.error("체중은 25–400 kg 범위에서 입력해 주세요.");
      return;
    }
    if (!saveLocalProfile(profileForm)) {
      setStorageUnavailable(true);
      toast.error(
        "이 브라우저에 설정을 저장할 수 없습니다. 저장 공간과 개인정보 보호 설정을 확인해 주세요."
      );
      return;
    }
    const goalByProfile = {
      strength: "근력증가",
      endurance: "체력증가",
      weight_management: "다이어트",
      general_health: "체력증가",
    } as const;
    setGoal(goalByProfile[apiProfile.primaryGoal]);
    setSessionEnvironment(profileForm.preferredEnvironment);
    setProfileOpen(false);
    toast.success("선호 환경을 세션 설계에 반영해 저장했습니다.");
  };

  const applySavedExplorePreferences = () => {
    setExploreFilters({
      ...defaultExploreFilters,
      category: profileForm.preferredCategory,
      equipment:
        profileForm.preferredEquipment === "bodyweight"
          ? "장비 없음"
          : profileForm.preferredEquipment === "flexible"
            ? "전체"
            : "장비 필요",
    });
    navigateToScene("explore");
    toast.success("저장한 선호 조건으로 운동을 찾습니다.");
  };

  const resetExploreFilters = () => {
    setExploreFilters(defaultExploreFilters);
  };

  const saveCurrentExplorePreset = () => {
    const name = presetName.trim();
    if (!name) {
      toast.error("프리셋 이름을 입력해 주세요.");
      return;
    }
    const existing = explorePreferences.filterPresets.find(
      preset => preset.name === name
    );
    const preset: ExploreFilterPreset = {
      id: existing?.id ?? `preset-${Date.now()}`,
      name: name.slice(0, 28),
      keyword,
      category,
      focus,
      region: regionFilter,
      difficulty,
      equipment,
      sort,
      rom: romFilter,
    };
    setExplorePreferences(current => saveExploreFilterPreset(current, preset));
    setPresetName("");
    toast.success(`${preset.name} 필터 프리셋을 저장했습니다.`);
  };

  const applyExploreFilterPreset = (preset: ExploreFilterPreset) => {
    setExploreFilters(filtersFromPreset(preset));
    setVisibleExerciseCount(initialVisibleExerciseCount);
    setFiltersOpen(true);
    toast.success(`${preset.name} 조건을 적용했습니다.`);
  };

  const deleteExploreFilterPreset = (preset: ExploreFilterPreset) => {
    setExplorePreferences(current =>
      removeExploreFilterPreset(current, preset.id)
    );
    toast.success(`${preset.name} 프리셋을 삭제했습니다.`);
  };

  const openSavedExercise = async (exercise: Exercise) => {
    if (!detailsByExerciseId.has(exercise.id)) {
      setCatalogLoading(true);
      try {
        const entries = await loadCatalogEntriesByIds([exercise.id]);
        if (entries.length)
          setCatalogEntries(current =>
            current.some(entry => entry.exercise.id === exercise.id)
              ? current
              : [...current, ...entries]
          );
      } catch {
        toast.error(
          "저장한 운동의 상세 안내를 불러오지 못했습니다. 다시 시도해 주세요."
        );
        return;
      } finally {
        setCatalogLoading(false);
      }
    }
    setExploreFilters(filtersForKeyword(exercise.name));
    setAnatomyExercise(exercise);
    setPendingExerciseName(exercise.name);
    navigateToScene("explore");
    toast.success(`${exercise.name}의 자세·안전 안내를 다시 엽니다.`);
  };

  const applyExplorePath = (path: ExplorePath) => {
    setExploreFilters({
      ...defaultExploreFilters,
      category: path.category as (typeof categories)[number],
      focus: path.focus,
      equipment: path.equipment,
    });
    navigateToScene("explore");
  };

  const applyRomReadiness = () => {
    if (!romReadiness.rom) {
      navigateToScene("wellness");
      return;
    }
    setExploreFilters({ ...defaultExploreFilters, rom: romReadiness.rom });
    navigateToScene("explore");
  };

  const applySessionQuickStart = (
    preset: (typeof sessionQuickStarts)[number]
  ) => {
    setSessionGoal(preset.goal);
    setSessionEnvironment(preset.environment);
    setSessionDuration(preset.duration);
  };

  const exportRomStatusDashboard = async () => {
    if (!romDashboardRef.current || romDashboardExporting) return;
    setRomDashboardExporting(true);
    try {
      const { default: html2canvas } = await import("html2canvas");
      const canvas = await html2canvas(romDashboardRef.current, {
        backgroundColor: "#f6f8fb",
        scale: 2,
        useCORS: true,
      });
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      const periodSlug =
        dashboardExportMeta.period
          .trim()
          .replace(/[^0-9A-Za-z가-힣]+/g, "-")
          .replace(/^-|-$/g, "") || "weekly";
      link.download = `fit-atlas-rom-${periodSlug}-${new Date().toISOString().slice(0, 10)}.png`;
      link.click();
      toast.success("주간 상태 그래프를 PNG로 저장했습니다.");
    } catch {
      toast.error(
        "그래프 이미지를 만들지 못했습니다. 잠시 후 다시 시도해 주세요."
      );
    } finally {
      setRomDashboardExporting(false);
    }
  };

  return (
    <AsciiInteractionContext.Provider
      value={{
        showAxis: axisVisible,
        pendingExerciseName,
        clearPendingExercise: () => setPendingExerciseName(null),
        onOpenRom: (exerciseName, presentation) =>
          setRomRecommendationTarget({
            exerciseName: exerciseName,
            presentation,
          }),
        onExploreAlternative: exerciseName => {
          setRomRecommendationTarget(null);
          setExploreFilters(current => ({
            ...filtersForKeyword(exerciseName),
            sort: current.sort,
          }));
          setPendingExerciseName(exerciseName);
          navigateToScene("explore");
        },
        onAddToTodayRoutine: exerciseName => {
          setWeeklyPlan(current =>
            addRomAlternativeToWeeklyPlan(current, exerciseName)
          );
          toast.success(`${exerciseName}을 오늘의 운동 루틴에 추가했습니다.`);
        },
      }}
    >
      <div
        className={`site-shell scene-${activeScene} atlas-theme-${atlasTheme} atlas-motion-${sessionGoal} atlas-environment-${sessionEnvironment} atlas-speed-${atlasInteraction.motionSpeed} atlas-performance-${atlasPerformance}${atlasTransition ? ` atlas-transition-${atlasTransition}` : ""}`}
      >
        <div className="cinematic-backdrop" aria-hidden="true">
          <span className="cinematic-orb orb-one" />
          <span className="cinematic-orb orb-two" />
          <span className="cinematic-gridlines" />
          <span className="cinematic-hud">
            SCENE / {activeScene.toUpperCase()}
          </span>
        </div>
        {celebrationOpen && (
          <div
            className="completion-celebration"
            role="status"
            aria-live="polite"
          >
            <div className="celebration-confetti" aria-hidden="true">
              ✦ ✦ ✦ ✦ ✦ ✦ ✦
            </div>
            <div>
              <p className="eyebrow">ROUTINE COMPLETE</p>
              <h2>오늘의 루틴을 모두 마쳤습니다.</h2>
              <p>
                완료율 100%입니다. 다음 세션은 반응을 확인하며 한 가지 변수만
                천천히 조절하세요.
              </p>
            </div>
            <button
              onClick={() => setCelebrationOpen(false)}
              aria-label="축하 메시지 닫기"
            >
              확인
            </button>
          </div>
        )}
        <header className="topbar">
          <a
            className="brand"
            href="#top"
            aria-label="Fit Atlas 홈"
            onClick={event => {
              event.preventDefault();
              navigateToScene("home");
            }}
          >
            <span className="brand-mark">
              <Activity size={17} />
            </span>
            <span>FIT ATLAS</span>
          </a>
          <nav
            className={menuOpen ? "nav is-open" : "nav"}
            aria-label="주요 메뉴"
          >
            <a
              href="#explore"
              aria-current={activeScene === "explore" ? "page" : undefined}
              onClick={event => {
                event.preventDefault();
                navigateToScene("explore");
              }}
            >
              운동 탐색
            </a>
            <a
              href="#anatomy"
              aria-current={activeScene === "anatomy" ? "page" : undefined}
              onClick={event => {
                event.preventDefault();
                navigateToScene("anatomy");
              }}
            >
              바디 맵
            </a>
            <a
              href="#progress"
              aria-current={activeScene === "progress" ? "page" : undefined}
              onClick={event => {
                event.preventDefault();
                navigateToScene("progress");
              }}
            >
              기록 분석
            </a>
            <a
              href="#wellness"
              aria-current={activeScene === "wellness" ? "page" : undefined}
              onClick={event => {
                event.preventDefault();
                navigateToScene("wellness");
              }}
            >
              웰니스
            </a>
            <button
              type="button"
              className="mobile-only mobile-scene-settings"
              onClick={() => {
                setMenuOpen(false);
                setSceneSettingsOpen(true);
              }}
            >
              장면 설정
            </button>
          </nav>
          <div className="topbar-actions">
            <button
              className="ghost-button desktop-only"
              onClick={() => setProfileOpen(true)}
            >
              내 프로필
            </button>
            <button
              className="ghost-button desktop-only"
              onClick={() => setSceneSettingsOpen(true)}
            >
              장면 설정
            </button>
            <button
              className="ghost-button desktop-only"
              onClick={() =>
                downloadBackup(
                  logs,
                  profileForm,
                  checkin,
                  weeklyPlan,
                  explorePreferences
                )
              }
            >
              백업
            </button>
            <label className="login-button desktop-only">
              가져오기
              <input
                className="sr-only"
                type="file"
                accept="application/json"
                onChange={async event => {
                  const file = event.target.files?.[0];
                  if (!file) return;
                  try {
                    const backup = parseBackup(await file.text());
                    setLogs(backup.logs);
                    setProfileForm(backup.profile);
                    setCheckin(backup.checkin);
                    setWeeklyPlan(backup.weeklyPlan);
                    setExplorePreferences(backup.explorePreferences);
                    saveLocalProfile(backup.profile);
                    saveLocalCheckin(backup.checkin);
                    saveLocalWeeklyPlan(backup.weeklyPlan);
                    saveLocalExplorePreferences(backup.explorePreferences);
                    toast.success("백업을 복원했습니다.");
                  } catch {
                    toast.error("백업 파일을 읽지 못했습니다.");
                  }
                  event.currentTarget.value = "";
                }}
              />
            </label>
            <button className="dark-button" onClick={() => setLogOpen(true)}>
              <Plus size={16} /> 운동 기록
            </button>
            <button
              className="menu-button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="메뉴 열기"
            >
              <Menu size={20} />
            </button>
          </div>
        </header>

        <main id="top">
          <nav className="mobile-quick-nav" aria-label="모바일 빠른 이동">
            <a
              href="#explore"
              onClick={event => {
                event.preventDefault();
                navigateToScene("explore");
              }}
            >
              <Search size={17} />
              <span>탐색</span>
            </a>
            <a
              href="#session"
              onClick={event => {
                event.preventDefault();
                navigateToScene("session");
              }}
            >
              <Timer size={17} />
              <span>오늘 세션</span>
            </a>
            <button onClick={() => setLogOpen(true)}>
              <Plus size={18} />
              <span>기록</span>
            </button>
            <a
              href="#recovery"
              onClick={event => {
                event.preventDefault();
                navigateToScene("wellness");
              }}
            >
              <HeartPulse size={17} />
              <span>회복</span>
            </a>
          </nav>
          <HeroScene
            onNavigate={navigateToScene}
            atlasInteraction={atlasInteraction}
            onChangeEquipment={equipment => {
              if (atlasInteraction.heroEquipment === equipment) return;
              setAtlasInteraction(current => ({
                ...current,
                heroEquipment: equipment,
              }));
              playAtlasTransition("route");
            }}
            onChangeResistance={resistance =>
              setAtlasInteraction(current => ({ ...current, resistance }))
            }
            onStartEquipmentSession={startEquipmentSession}
            onResumeRecentSession={resumeRecentEquipmentSession}
            onStartAllRoundSession={() => {
              setSessionGoal("all_round");
              navigateToScene("session");
            }}
            onOpenLog={() => setLogOpen(true)}
            machineSessionIntensity={machineSessionIntensity}
            atlasRoute={atlasRoute}
            atlasPerformance={atlasPerformance}
            atlasSignalSummary={atlasSignalSummary}
            checkinRecommendation={checkinRecommendation}
            catalogStats={catalogStats}
            logCount={logs.length}
            sessionGoal={sessionGoal}
            sessionEnvironment={sessionEnvironment}
            sessionDuration={sessionDuration}
            hasTrainingHistory={hasTrainingHistory}
            weeklyPlan={weeklyPlan}
            weeklyPlanInsight={weeklyPlanInsight}
            weeklyCompletionPercent={weeklyCompletionPercent}
            weeklyCompletionFlow={weeklyCompletionFlow}
            weeklyDirection={weeklyDirection}
            onChangeWeeklyGoal={nextGoal => {
              if (nextGoal === weeklyPlan.goal) return;
              setWeeklyPlan(current => setWeeklyGoal(current, nextGoal));
              setSessionGoal(nextGoal);
              toast.success(
                `이번 주 목표를 ${{ all_round: "전신", strength: "근력", endurance: "심폐" }[nextGoal]} 중심으로 변경했고 다음 세션 설계에도 반영했습니다.`
              );
            }}
          />{" "}
          <SessionScene
            goal={goal}
            onChangeGoal={setGoal}
            plan={plan}
            profileForm={profileForm}
            onOpenProfile={() => setProfileOpen(true)}
            onGoToExplore={() => navigateToScene("explore")}
            onApplySavedPreferences={applySavedExplorePreferences}
            onApplySavedEnvironment={() => {
              setSessionEnvironment(profileForm.preferredEnvironment);
              toast.success("저장한 운동 환경을 세션에 적용했습니다.");
            }}
            checkin={checkin}
            onChangeCheckin={(field, value) =>
              setCheckin(current => ({
                ...current,
                date: new Date().toISOString().slice(0, 10),
                [field]: value,
              }))
            }
            checkinRecommendation={checkinRecommendation}
            sessionGoal={sessionGoal}
            onChangeSessionGoal={setSessionGoal}
            sessionEnvironment={sessionEnvironment}
            onChangeSessionEnvironment={setSessionEnvironment}
            sessionDuration={sessionDuration}
            onChangeSessionDuration={setSessionDuration}
            onApplyQuickStart={applySessionQuickStart}
            sessionGuidanceOpen={sessionGuidanceOpen}
            onToggleSessionGuidance={() =>
              setSessionGuidanceOpen(current => !current)
            }
            sessionPlan={sessionPlan}
            atlasSessionPlan={atlasSessionPlan}
            atlasBlocks={atlasBlocks}
            atlasInteraction={atlasInteraction}
            machineSessionIntensity={machineSessionIntensity}
            onOpenBlock={openAtlasNode}
            onOpenSessionLog={startCurrentMachineSessionLog}
            onAddSessionToWeek={(planToAdd, message) => {
              setWeeklyPlan(current =>
                addDesignedSession(
                  current,
                  planToAdd,
                  sessionGoal,
                  sessionEnvironment,
                  sessionDuration
                )
              );
              toast.success(message);
            }}
            weeklyPlan={weeklyPlan}
            weeklyPlanInsight={weeklyPlanInsight}
            onChangeWeeklyGoal={nextGoal =>
              setWeeklyPlan(current => setWeeklyGoal(current, nextGoal))
            }
            onToggleWeeklySession={sessionId =>
              setWeeklyPlan(current => toggleWeeklySession(current, sessionId))
            }
            onStartPlanLog={startPlanSessionLog}
          />{" "}
          <WorkdayRecoveryScene
            onJumpToSection={jumpToWellnessSection}
            seatedRecoveryDuration={seatedRecoveryDuration}
            onChangeDuration={setSeatedRecoveryDuration}
            checkinRecommendation={checkinRecommendation}
            recoveryContext={profileForm.recoveryContext as RecoveryContext}
            onExploreExercise={exploreSeatedRecoveryExercise}
            onBuildLightSession={() => {
              setSessionGoal("all_round");
              setSessionEnvironment("home");
              setSessionDuration(15);
              navigateToScene("session");
              toast.success(
                "집·매트 환경의 15분 가벼운 세션으로 설정했습니다."
              );
            }}
            onGoToAnatomy={() => navigateToScene("anatomy")}
            routineGoal={routineGoal}
            onChangeRoutineGoal={setRoutineGoal}
            routine={routine}
          />
          <ExploreScene
            filters={exploreFilters}
            onChangeFilters={updateExploreFilters}
            onResetFilters={resetExploreFilters}
            activeFilterLabels={activeExploreFilterLabels}
            hasFilterState={hasExploreFilterState}
            sortLabel={sortLabel}
            filtersOpen={filtersOpen}
            onToggleFilters={() => setFiltersOpen(open => !open)}
            explorePaths={explorePaths}
            onApplyPath={applyExplorePath}
            onApplySavedPreferences={applySavedExplorePreferences}
            romReadiness={romReadiness}
            onApplyRomReadiness={applyRomReadiness}
            checkin={checkin}
            catalogStats={catalogStats}
            catalogExercises={catalogExercises}
            catalogLoading={catalogLoading}
            loadedCatalogPages={loadedCatalogPages}
            onLoadMore={loadMoreExercises}
            filteredExercises={filteredExercises}
            visibleExercises={visibleExercises}
            visibleExerciseCount={visibleExerciseCount}
            detailsByExerciseId={detailsByExerciseId}
            favoriteExerciseIds={explorePreferences.favoriteExerciseIds}
            onToggleFavorite={exerciseId =>
              setExplorePreferences(current =>
                toggleFavoriteExercise(current, exerciseId)
              )
            }
            onViewExercise={exercise => {
              setExplorePreferences(current =>
                recordRecentExercise(current, exercise.id)
              );
              setAnatomyExercise(exercise);
            }}
            onFindEasier={exercise =>
              updateExploreFilters({
                keyword: "",
                category: exercise.category,
                difficulty: "초급",
                sort: "difficulty",
              })
            }
            filterPresets={explorePreferences.filterPresets}
            presetName={presetName}
            onChangePresetName={setPresetName}
            onSavePreset={saveCurrentExplorePreset}
            onApplyPreset={applyExploreFilterPreset}
            onDeletePreset={deleteExploreFilterPreset}
            favoriteExercises={favoriteExercises}
            recentExercises={recentExercises}
            onOpenSavedExercise={openSavedExercise}
          />
          <AnatomyScene
            activeRegion={activeRegion}
            selectedAnatomyRegions={selectedAnatomyRegions}
            onToggleRegion={selectAnatomyRegion}
            regionExercises={regionExercises}
            anatomyExercise={anatomyExercise}
            anatomyMuscleRoles={anatomyMuscleRoles}
            onOpenExercise={openAnatomyExercise}
            recovery={recovery}
            activeRecoveryPathway={activeRecoveryPathway}
            pathwayAlternatives={pathwayAlternatives}
            onChoosePathway={id => {
              setActiveRecoveryPathwayId(id);
              setActiveRegion(getRecoveryPathway(id).region);
            }}
            onExploreAlternative={exploreRecoveryAlternative}
          />
          <ProgressScene
            logs={logs}
            totalVolume={totalVolume}
            totalMinutes={totalMinutes}
            insights={insights}
            weeklyVolume={weeklyVolume}
            maxWeeklyVolume={maxWeeklyVolume}
            fourWeekTrends={fourWeekTrends}
            maxFourWeekLoad={maxFourWeekLoad}
            calendarDays={calendarDays}
            pr={pr}
            weekRomStatus={weekRomStatus}
            fourWeekRomStatus={fourWeekRomStatus}
            romDashboardRef={romDashboardRef}
            romDashboardExporting={romDashboardExporting}
            onExportRomDashboard={() => void exportRomStatusDashboard()}
            routineCompletion={{
              completed: weeklyPlanInsight.completed,
              total: weeklyPlanInsight.total,
            }}
            dashboardExportMeta={dashboardExportMeta}
            onChangeDashboardMeta={(key, value) =>
              setDashboardExportMeta(current => ({ ...current, [key]: value }))
            }
            onOpenLog={() => setLogOpen(true)}
          />
          <WellnessScene />{" "}
        </main>

        <footer className="site-footer">
          <div className="brand">
            <span className="brand-mark">
              <Activity size={17} />
            </span>
            <span>FIT ATLAS</span>
          </div>
          <p>움직임을 위한 지식, 일관성을 위한 기록.</p>
          <p>© 2026 Fit Atlas. Educational information only.</p>
        </footer>
        {storageUnavailable && (
          <div className="storage-warning" role="status">
            <ShieldCheck size={16} />
            <p>
              <strong>이 브라우저에서 자동 저장이 제한되었습니다.</strong> 현재
              화면의 변경 사항은 유지되지만, 탭을 닫으면 사라질 수 있습니다.
              브라우저 저장 공간 또는 개인정보 보호 설정을 확인한 뒤 다시 시도해
              주세요.
            </p>
          </div>
        )}
        {romRecommendationTarget && (
          <RomRecommendationDialog
            target={romRecommendationTarget}
            onClose={() => setRomRecommendationTarget(null)}
          />
        )}

        {logOpen && (
          <div
            className="modal-backdrop"
            role="presentation"
            onMouseDown={() => setLogOpen(false)}
          >
            <section
              className="log-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="log-title"
              onMouseDown={event => event.stopPropagation()}
            >
              <div className="modal-head">
                <div>
                  <p className="eyebrow">TRAINING LOG</p>
                  <h2 id="log-title">운동 기록 추가</h2>
                </div>
                <button
                  onClick={() => setLogOpen(false)}
                  className="icon-button"
                  aria-label="닫기"
                >
                  <X size={19} />
                </button>
              </div>
              <div className="form-steps" aria-label="기록 입력 순서">
                <span className="is-active">1 기본</span>
                <span>2 강도</span>
                <span>3 저장</span>
              </div>
              <p className="log-helper">
                모든 수치를 완벽히 기억할 필요는 없습니다.{" "}
                <strong>종목·시간·RPE</strong>부터 남기고, 세트·횟수·중량은
                기억나는 만큼 입력하세요.
              </p>
              <div className="log-form">
                <div className="form-grid">
                  <label>
                    운동 날짜
                    <input
                      type="date"
                      max={new Date().toISOString().slice(0, 10)}
                      value={form.date}
                      onChange={event =>
                        setForm({ ...form, date: event.target.value })
                      }
                    />
                  </label>
                  <label>
                    운동
                    <select
                      value={form.exercise}
                      onChange={event =>
                        setForm({ ...form, exercise: event.target.value })
                      }
                    >
                      {catalogExercises.map(exercise => (
                        <option key={exercise.id}>{exercise.name}</option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="form-grid">
                  <label>
                    세트
                    <input
                      inputMode="numeric"
                      value={form.sets}
                      onChange={event =>
                        setForm({ ...form, sets: event.target.value })
                      }
                    />
                  </label>
                  <label>
                    횟수
                    <input
                      inputMode="numeric"
                      value={form.reps}
                      onChange={event =>
                        setForm({ ...form, reps: event.target.value })
                      }
                    />
                  </label>
                  <label>
                    중량 (kg)
                    <input
                      inputMode="decimal"
                      value={form.load}
                      onChange={event =>
                        setForm({ ...form, load: event.target.value })
                      }
                    />
                  </label>
                  <label>
                    운동 시간 (분)
                    <input
                      inputMode="numeric"
                      value={form.minutes}
                      onChange={event =>
                        setForm({ ...form, minutes: event.target.value })
                      }
                    />
                  </label>
                  <label>
                    거리 · 선택
                    <input
                      inputMode="decimal"
                      placeholder="러닝·사이클·로잉·수영"
                      value={form.distance}
                      onChange={event =>
                        setForm({ ...form, distance: event.target.value })
                      }
                    />
                    <select
                      value={form.distanceUnit}
                      onChange={event =>
                        setForm({
                          ...form,
                          distanceUnit: event.target.value as "km" | "m",
                        })
                      }
                    >
                      <option value="km">km</option>
                      <option value="m">m</option>
                    </select>
                  </label>
                </div>
                <label>
                  주관적 강도 RPE <span>{form.intensity}/10</span>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={form.intensity}
                    onChange={event =>
                      setForm({ ...form, intensity: event.target.value })
                    }
                  />
                </label>
                <p className="form-safety">
                  <ShieldCheck size={15} /> 거리 단위는 러닝·사이클에는 km,
                  로잉·수영에는 m를 사용하세요. 수치가 불확실하면 낮게
                  추정하거나 다음 기록부터 보완해도 됩니다.
                </p>
                <button className="dark-button form-submit" onClick={addLog}>
                  이 기록 저장하기 <ArrowRight size={16} />
                </button>
              </div>
            </section>
          </div>
        )}
        {profileOpen && (
          <div
            className="modal-backdrop"
            role="presentation"
            onMouseDown={() => setProfileOpen(false)}
          >
            <section
              className="log-modal profile-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="profile-title"
              onMouseDown={event => event.stopPropagation()}
            >
              <div className="modal-head">
                <div>
                  <p className="eyebrow">PERSONALIZATION</p>
                  <h2 id="profile-title">운동 기준 설정</h2>
                </div>
                <button
                  onClick={() => setProfileOpen(false)}
                  className="icon-button"
                  aria-label="닫기"
                >
                  <X size={19} />
                </button>
              </div>
              <p className="modal-description">
                입력값은 이 기기에만 저장되며 보수적인 시작 난이도와 안내 맥락을
                정하는 데만 사용합니다. 질환·통증·임신 상태 등 의료 정보에 대한
                진단은 제공하지 않습니다.
              </p>
              <div className="log-form">
                <div className="form-grid">
                  <label>
                    연령
                    <input
                      inputMode="numeric"
                      placeholder="예: 30"
                      value={profileForm.age}
                      onChange={event =>
                        setProfileForm({
                          ...profileForm,
                          age: event.target.value,
                        })
                      }
                    />
                  </label>
                  <label>
                    체중 (kg)
                    <input
                      inputMode="decimal"
                      placeholder="예: 68"
                      value={profileForm.weightKg}
                      onChange={event =>
                        setProfileForm({
                          ...profileForm,
                          weightKg: event.target.value,
                        })
                      }
                    />
                  </label>
                </div>
                <label>
                  성별
                  <select
                    value={profileForm.sex}
                    onChange={event =>
                      setProfileForm({
                        ...profileForm,
                        sex: event.target.value,
                      })
                    }
                  >
                    <option value="undisclosed">응답하지 않음</option>
                    <option value="female">여성</option>
                    <option value="male">남성</option>
                    <option value="nonbinary">논바이너리</option>
                  </select>
                </label>
                <div className="form-grid">
                  <label>
                    주요 목표
                    <select
                      value={profileForm.primaryGoal}
                      onChange={event =>
                        setProfileForm({
                          ...profileForm,
                          primaryGoal: event.target.value,
                        })
                      }
                    >
                      <option value="strength">근력 증가</option>
                      <option value="endurance">체력 증가</option>
                      <option value="weight_management">체중 관리</option>
                      <option value="general_health">건강 증진</option>
                    </select>
                  </label>
                  <label>
                    경험 수준
                    <select
                      value={profileForm.experience}
                      onChange={event =>
                        setProfileForm({
                          ...profileForm,
                          experience: event.target.value,
                        })
                      }
                    >
                      <option value="beginner">입문</option>
                      <option value="intermediate">중급</option>
                      <option value="advanced">상급</option>
                    </select>
                  </label>
                </div>
                <div className="form-grid">
                  <label>
                    선호 운동 종류
                    <select
                      aria-label="선호 운동 종류"
                      value={profileForm.preferredCategory}
                      onChange={event =>
                        setProfileForm({
                          ...profileForm,
                          preferredCategory: event.target
                            .value as typeof profileForm.preferredCategory,
                        })
                      }
                    >
                      {preferredCategoryOptions.map(item => (
                        <option key={item} value={item}>
                          {item === "전체" ? "특정 종류 없음" : item}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    선호 장비
                    <select
                      aria-label="선호 장비"
                      value={profileForm.preferredEquipment}
                      onChange={event =>
                        setProfileForm({
                          ...profileForm,
                          preferredEquipment: event.target
                            .value as typeof profileForm.preferredEquipment,
                        })
                      }
                    >
                      {preferredEquipmentOptions.map(item => (
                        <option key={item} value={item}>
                          {
                            {
                              flexible: "상황에 맞게",
                              bodyweight: "장비 없이",
                              basic_home: "간단한 홈 장비",
                              gym: "헬스장 장비",
                            }[item]
                          }
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <label>
                  주 활동 환경
                  <select
                    aria-label="주 활동 환경"
                    value={profileForm.preferredEnvironment}
                    onChange={event =>
                      setProfileForm({
                        ...profileForm,
                        preferredEnvironment: event.target
                          .value as typeof profileForm.preferredEnvironment,
                      })
                    }
                  >
                    {preferredEnvironmentOptions.map(item => (
                      <option key={item} value={item}>
                        {
                          {
                            home: "집·매트",
                            gym: "헬스장",
                            outdoor: "야외·걷기",
                          }[item]
                        }
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  선택적 안전 모드
                  <select
                    value={profileForm.recoveryContext}
                    onChange={event =>
                      setProfileForm({
                        ...profileForm,
                        recoveryContext: event.target.value,
                      })
                    }
                  >
                    <option value="none">해당 없음</option>
                    <option value="reduced_readiness">
                      낮은 에너지·회복 저하·생애주기 변화
                    </option>
                    <option value="pregnancy_postpartum">
                      임신·산후 — 의료진 확인 우선
                    </option>
                  </select>
                </label>
                <button
                  className="dark-button form-submit"
                  onClick={saveProfileSettings}
                >
                  설정 저장 <ArrowRight size={16} />
                </button>
              </div>
            </section>
          </div>
        )}
        {romRecommendationTarget && (
          <RomRecommendationDialog
            target={romRecommendationTarget}
            onClose={() => setRomRecommendationTarget(null)}
          />
        )}
        {sceneSettingsOpen && (
          <SceneExperienceDialog
            preferences={sceneExperience}
            onChangeSound={soundEnabled =>
              setSceneExperience(current => ({ ...current, soundEnabled }))
            }
            onClose={() => setSceneSettingsOpen(false)}
            theme={atlasTheme}
            onChangeTheme={theme => {
              if (theme === atlasTheme) return;
              setAtlasTheme(theme);
              playAtlasTransition("theme");
            }}
            motionSpeed={atlasInteraction.motionSpeed}
            onChangeMotionSpeed={motionSpeed => {
              if (motionSpeed === atlasInteraction.motionSpeed) return;
              setAtlasInteraction(current => ({ ...current, motionSpeed }));
            }}
            axisVisible={axisVisible}
            onChangeAxisVisible={setAxisVisible}
          />
        )}
        {activeAtlasBlock && activeAtlasNode !== null && (
          <AtlasNodeDialog
            block={activeAtlasBlock}
            index={activeAtlasNode}
            draft={atlasNodeDraft}
            onDraft={setAtlasNodeDraft}
            onClose={() => setActiveAtlasNode(null)}
            onSave={saveAtlasNode}
            onReset={resetAtlasNode}
          />
        )}
      </div>
    </AsciiInteractionContext.Provider>
  );
}

function RomRecommendationDialog({
  target,
  onClose,
}: {
  target: RomRecommendationTarget;
  onClose: () => void;
}) {
  const recommendation = getRomRecommendation(target.presentation);
  const { onAddToTodayRoutine, onExploreAlternative } = React.useContext(
    AsciiInteractionContext
  );
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="log-modal rom-recommendation-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="rom-recommendation-title"
        onMouseDown={event => event.stopPropagation()}
      >
        <div className="modal-head">
          <div>
            <p className="eyebrow">ROM ADJUSTMENT GUIDE</p>
            <h2 id="rom-recommendation-title">
              {target.exerciseName} · {recommendation.title}
            </h2>
          </div>
          <button onClick={onClose} className="icon-button" aria-label="닫기">
            <X size={19} />
          </button>
        </div>
        <p className="modal-description">{recommendation.intro}</p>
        <div className="rom-recommendation-grid">
          <article>
            <p className="small-label">가볍게 풀기</p>
            <ul>
              {recommendation.stretch.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article>
            <p className="small-label">대체 운동 방식</p>
            <ul>
              {recommendation.alternatives.map(item => (
                <li key={item.name}>
                  <div className="alternative-exercise-actions">
                    <button
                      className="alternative-exercise-link"
                      onClick={() => onExploreAlternative(item.name)}
                    >
                      <b>{item.name}</b>
                      <span>{item.rationale}</span>
                      <ArrowRight size={14} />
                    </button>
                    <button
                      className="alternative-routine-add"
                      onClick={() => onAddToTodayRoutine(item.name)}
                    >
                      <Plus size={13} /> 오늘 루틴
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </article>
        </div>
        <p className="text-guide-stop">{recommendation.caution}</p>
      </section>
    </div>
  );
}

function AtlasNodeDialog({
  block,
  index,
  draft,
  onDraft,
  onClose,
  onSave,
  onReset,
}: {
  block: SessionBlock;
  index: number;
  draft: { label: string; minutes: string; items: string };
  onDraft: React.Dispatch<
    React.SetStateAction<{ label: string; minutes: string; items: string }>
  >;
  onClose: () => void;
  onSave: () => void;
  onReset: () => void;
}) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="log-modal atlas-node-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="atlas-node-title"
        onMouseDown={event => event.stopPropagation()}
      >
        <div className="modal-head">
          <div>
            <p className="eyebrow">ATLAS NODE 0{index + 1}</p>
            <h2 id="atlas-node-title">{block.label} 블록 편집</h2>
          </div>
          <button onClick={onClose} className="icon-button" aria-label="닫기">
            <X size={19} />
          </button>
        </div>
        <p className="modal-description">
          아틀라스에서 이 노드는 현재 세션의{" "}
          <strong>
            {block.minutes}분 {block.label}
          </strong>{" "}
          블록입니다. 수정한 내용은 이 브라우저의 같은 목표·장소·시간 조합에만
          저장됩니다.
        </p>
        <div className="log-form atlas-node-form">
          <div className="form-grid">
            <label>
              블록 이름
              <input
                value={draft.label}
                maxLength={40}
                onChange={event =>
                  onDraft(current => ({
                    ...current,
                    label: event.target.value,
                  }))
                }
              />
            </label>
            <label>
              예상 시간 (분)
              <input
                inputMode="numeric"
                value={draft.minutes}
                onChange={event =>
                  onDraft(current => ({
                    ...current,
                    minutes: event.target.value,
                  }))
                }
              />
            </label>
          </div>
          <label>
            움직임 · 한 줄에 하나씩
            <textarea
              value={draft.items}
              rows={6}
              maxLength={800}
              onChange={event =>
                onDraft(current => ({ ...current, items: event.target.value }))
              }
            />
          </label>
          <p className="form-safety">
            <ShieldCheck size={15} /> 통증·어지러움·비정상적인 숨참이 있으면
            계획보다 중단·조절을 우선하세요.
          </p>
          <div className="atlas-node-actions">
            <button className="recovery-secondary" onClick={onReset}>
              기본값으로 되돌리기
            </button>
            <button className="dark-button form-submit" onClick={onSave}>
              블록 저장 <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
