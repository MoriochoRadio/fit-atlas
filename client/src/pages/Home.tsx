import { AnatomyMap } from "@/components/AnatomyMap";
import { recoveryGuides, wellnessCards } from "@/lib/catalogContent";
import { catalogSummary, entriesToExercises, getCatalogPageCount, getInitialCatalogEntries, loadCatalogEntriesByIds, loadCatalogPage, loadFullCatalog } from "@/lib/catalogLoader";
import type { BodyRegion, Exercise, ExerciseDetail } from "@/lib/catalogTypes";
import { aerobicIntervalTemplates } from "@/lib/aerobicIntervals";
import { lowNoiseCircuitTemplates } from "@/lib/lowNoiseCircuits";
import { lifeStageGuides, startChecklist } from "@/lib/lifeStageGuidance";
import { Activity, ArrowRight, BarChart3, BookOpen, Brain, CalendarDays, Check, ChevronRight, Dumbbell, HeartPulse, History, Loader2, Menu, Plus, Search, ShieldCheck, Sparkles, Star, Timer, X } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { getCalendarDays, getFourWeekTrends, getPersonalRecords, getTotalMinutes, getTotalVolume, getWeeklyVolume, type TrainingLog } from "@/lib/trainingMetrics";
import { getPersonalizedProgram } from "@/lib/personalization";
import { downloadBackup, parseBackup, readLocalCheckin, readLocalExplorePreferences, readLocalProfile, readLocalWeeklyPlan, readTrainingLogs, saveLocalCheckin, saveLocalExplorePreferences, saveLocalProfile, saveLocalWeeklyPlan, saveTrainingLogs } from "@/lib/localStore";
import { recordRecentExercise, toggleFavoriteExercise, type ExplorePreferences } from "@/lib/explorePreferences";
import { filterExercises } from "@/lib/exerciseFilters";
import { sortExercises, type ExerciseSort } from "@/lib/exerciseSorting";
import { recoveryProtocols, recoveryStageGuides } from "@/lib/recoveryProtocols";
import { applyRecoveryExplore, getRecoveryPathway, recoveryPathways, type RecoveryPathwayId } from "@/lib/recoveryPathways";
import { getInsightSummary } from "@/lib/trainingInsights";
import { wellnessDetails } from "@/lib/wellnessDetails";
import { getMovementVisual } from "@/lib/movementVisuals";
import { getExerciseEvidenceScope } from "@/lib/exerciseEvidence";
import { MovementVisualGuide, RecoveryPathwayPanel, RecoveryStageGrid, SeatedRecoveryPanel, WellnessDetailPanel } from "@/components/GuidancePanels";
import { getRoutineTemplate, type RoutineGoal } from "@/lib/routineTemplates";
import { getCheckinRecommendation, type DailyCheckin } from "@/lib/dailyCheckin";
import { buildSession, type SessionEnvironment, type SessionGoal, type SessionDuration } from "@/lib/sessionBuilder";
import { addDesignedSession, completeWeeklySessionWithRecord, getWeeklyPlanInsight, setWeeklyGoal, toggleWeeklySession, type WeeklyPlan } from "@/lib/weeklyPlan";
import type { RecoveryContext, SeatedRecoveryDuration } from "@/lib/seatedRecovery";
import { preferredCategoryOptions, preferredEnvironmentOptions, preferredEquipmentOptions } from "@/lib/profilePreferences";

type LogEntry = TrainingLog;
type CinematicScene = "home" | "explore" | "anatomy" | "progress" | "wellness";

const categories = preferredCategoryOptions;
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

function SectionTitle({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: React.ReactNode }) {
  return <div className="section-heading"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2><p className="section-description">{description}</p></div>{action}</div>;
}

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("전체");
  const [focus, setFocus] = useState("전체");
  const [regionFilter, setRegionFilter] = useState("전체");
  const [difficulty, setDifficulty] = useState("전체");
  const [equipment, setEquipment] = useState("전체");
  const [sort, setSort] = useState<ExerciseSort>("recommended");
  const [catalogEntries, setCatalogEntries] = useState(() => getInitialCatalogEntries());
  const [loadedCatalogPages, setLoadedCatalogPages] = useState(1);
  const [visibleExerciseCount, setVisibleExerciseCount] = useState<number>(initialVisibleExerciseCount);
  const [catalogLoading, setCatalogLoading] = useState(false);
  const [explorePreferences, setExplorePreferences] = useState<ExplorePreferences>(() => typeof window === "undefined" ? { favoriteExerciseIds: [], recentExerciseIds: [] } : readLocalExplorePreferences());
  const [savedCatalogEntries, setSavedCatalogEntries] = useState(() => getInitialCatalogEntries().filter(() => false));
  const [activeRegion, setActiveRegion] = useState<BodyRegion>("등");
  const [activeRecoveryPathwayId, setActiveRecoveryPathwayId] = useState<RecoveryPathwayId>("shoulder");
  const [goal, setGoal] = useState<keyof typeof goalCopy>("근력증가");
  const [routineGoal, setRoutineGoal] = useState<RoutineGoal>("strength");
  const [sessionGoal, setSessionGoal] = useState<SessionGoal>("all_round");
  const [sessionEnvironment, setSessionEnvironment] = useState<SessionEnvironment>(() => typeof window === "undefined" ? "home" : readLocalProfile().preferredEnvironment);
  const [sessionDuration, setSessionDuration] = useState<SessionDuration>(30);
  const [seatedRecoveryDuration, setSeatedRecoveryDuration] = useState<SeatedRecoveryDuration>(5);
  const [weeklyPlan, setWeeklyPlan] = useState<WeeklyPlan>(() => typeof window === "undefined" ? readLocalWeeklyPlan() : readLocalWeeklyPlan());
  const [logOpen, setLogOpen] = useState(false);
  const [linkedPlanSessionId, setLinkedPlanSessionId] = useState<string | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeScene, setActiveScene] = useState<CinematicScene>("home");
  const [logs, setLogs] = useState<LogEntry[]>(() => typeof window === "undefined" ? [] : readTrainingLogs());
  const [form, setForm] = useState(() => ({ date: new Date().toISOString().slice(0, 10), exercise: "바벨 백 스쿼트", sets: "3", reps: "8", load: "40", minutes: "35", distance: "", distanceUnit: "km" as "km" | "m", intensity: "6" }));
  const [profileForm, setProfileForm] = useState(() => typeof window === "undefined" ? readLocalProfile() : readLocalProfile());
  const [checkin, setCheckin] = useState<DailyCheckin>(() => {
    const saved = typeof window === "undefined" ? undefined : readLocalCheckin();
    const today = new Date().toISOString().slice(0, 10);
    return saved && saved.date === today ? saved : { ...(saved ?? { energy: 3, sleep: 3, stress: 3, pain: 1 }), date: today };
  });

  useEffect(() => {
    saveTrainingLogs(logs);
  }, [logs]);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const sceneById: Record<string, CinematicScene> = { program: "home", session: "home", explore: "explore", anatomy: "anatomy", progress: "progress", wellness: "wellness" };
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];
      if (visible) setActiveScene(sceneById[visible.target.id] ?? "home");
    }, { threshold: [0.18, 0.45, 0.7], rootMargin: "-18% 0px -44% 0px" });
    Object.keys(sceneById).forEach((id) => document.getElementById(id) && observer.observe(document.getElementById(id)!));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    saveLocalCheckin(checkin);
  }, [checkin]);

  useEffect(() => {
    saveLocalWeeklyPlan(weeklyPlan);
  }, [weeklyPlan]);

  useEffect(() => {
    saveLocalExplorePreferences(explorePreferences);
  }, [explorePreferences]);

  useEffect(() => {
    if (!logOpen) setLinkedPlanSessionId(null);
  }, [logOpen]);

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
  const filteredExercises = useMemo(() => sortExercises(filterExercises(catalogExercises, { keyword, category, focus, region: regionFilter, difficulty, equipment }), sort), [catalogExercises, category, difficulty, equipment, focus, keyword, regionFilter, sort]);
  const visibleExercises = useMemo(() => filteredExercises.slice(0, visibleExerciseCount), [filteredExercises, visibleExerciseCount]);
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

  const regionExercises = catalogExercises.filter((exercise) => exercise.regions.includes(activeRegion));
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
  const sessionPlan = useMemo(() => buildSession({ goal: sessionGoal, environment: sessionEnvironment, duration: sessionDuration, checkin }), [checkin, sessionDuration, sessionEnvironment, sessionGoal]);
  const weeklyPlanInsight = useMemo(() => getWeeklyPlanInsight(weeklyPlan, logs, checkin), [checkin, logs, weeklyPlan]);

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
    const baseIntensity = checkinRecommendation.mode === "ready" ? "6" : checkinRecommendation.mode === "lighter" ? "4" : "3";
    setForm((current) => ({ ...current, date: new Date().toISOString().slice(0, 10), exercise: exerciseByPlan[session.goal][session.environment], sets: session.goal === "endurance" ? "1" : "2", reps: session.goal === "endurance" ? "1" : "8", load: "0", minutes: String(session.duration), distance: "", distanceUnit: "km", intensity: baseIntensity }));
    setLinkedPlanSessionId(session.id);
    setLogOpen(true);
  };

  useEffect(() => {
    setVisibleExerciseCount(initialVisibleExerciseCount);
  }, [category, difficulty, equipment, focus, keyword, regionFilter, sort]);

  useEffect(() => {
    const needsFullCatalog = Boolean(keyword || category !== "전체" || focus !== "전체" || regionFilter !== "전체" || difficulty !== "전체" || equipment !== "전체");
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
  }, [category, difficulty, equipment, focus, keyword, loadedCatalogPages, regionFilter]);

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

  const exploreRecoveryAlternative = async (exerciseId: string) => {
    let availableExercises = catalogExercises;
    if (!availableExercises.some((exercise) => exercise.id === exerciseId)) {
      const entries = await loadFullCatalog();
      setCatalogEntries(entries);
      setLoadedCatalogPages(getCatalogPageCount());
      availableExercises = entriesToExercises(entries);
    }
    const result = applyRecoveryExplore(activeRecoveryPathway, exerciseId, availableExercises, { setKeyword, setCategory, setFocus, setRegion: setRegionFilter, scrollToTarget: (targetId) => document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" }) });
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
    document.getElementById("explore")?.scrollIntoView({ behavior: "smooth" });
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
    saveLocalProfile(profileForm);
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
    document.getElementById("explore")?.scrollIntoView({ behavior: "smooth" });
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
  };

  const openSavedExercise = (exercise: Exercise) => {
    setKeyword(exercise.name);
    setCategory("전체");
    setFocus("전체");
    setRegionFilter("전체");
    setDifficulty("전체");
    setEquipment("전체");
    setSort("recommended");
    document.getElementById("explore")?.scrollIntoView({ behavior: "smooth" });
  };

  const applyExplorePath = (path: (typeof explorePaths)[number]) => {
    setKeyword("");
    setCategory(path.category as (typeof categories)[number]);
    setFocus(path.focus);
    setRegionFilter("전체");
    setDifficulty("전체");
    setEquipment(path.equipment);
    setSort("recommended");
    setActiveScene("explore");
  };

  const applySessionQuickStart = (preset: (typeof sessionQuickStarts)[number]) => {
    setSessionGoal(preset.goal);
    setSessionEnvironment(preset.environment);
    setSessionDuration(preset.duration);
  };


  return (
    <div className={`site-shell scene-${activeScene}`}>
      <div className="cinematic-backdrop" aria-hidden="true"><span className="cinematic-orb orb-one" /><span className="cinematic-orb orb-two" /><span className="cinematic-gridlines" /><span className="cinematic-hud">SCENE / {activeScene.toUpperCase()}</span></div>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Fit Atlas 홈"><span className="brand-mark"><Activity size={17} /></span><span>FIT ATLAS</span></a>
        <nav className={menuOpen ? "nav is-open" : "nav"} aria-label="주요 메뉴">
          <a href="#explore" aria-current={activeScene === "explore" ? "page" : undefined} onClick={() => { setActiveScene("explore"); setMenuOpen(false); }}>운동 탐색</a><a href="#anatomy" aria-current={activeScene === "anatomy" ? "page" : undefined} onClick={() => { setActiveScene("anatomy"); setMenuOpen(false); }}>바디 맵</a><a href="#progress" aria-current={activeScene === "progress" ? "page" : undefined} onClick={() => { setActiveScene("progress"); setMenuOpen(false); }}>기록 분석</a><a href="#wellness" aria-current={activeScene === "wellness" ? "page" : undefined} onClick={() => { setActiveScene("wellness"); setMenuOpen(false); }}>웰니스</a>
        </nav>
        <div className="topbar-actions"><button className="ghost-button desktop-only" onClick={() => setProfileOpen(true)}>내 프로필</button><button className="ghost-button desktop-only" onClick={() => downloadBackup(logs, profileForm, checkin, weeklyPlan, explorePreferences)}>백업</button><label className="login-button desktop-only">가져오기<input className="sr-only" type="file" accept="application/json" onChange={async (event) => { const file = event.target.files?.[0]; if (!file) return; try { const backup = parseBackup(await file.text()); setLogs(backup.logs); setProfileForm(backup.profile); setCheckin(backup.checkin); setWeeklyPlan(backup.weeklyPlan); setExplorePreferences(backup.explorePreferences); saveLocalProfile(backup.profile); saveLocalCheckin(backup.checkin); saveLocalWeeklyPlan(backup.weeklyPlan); saveLocalExplorePreferences(backup.explorePreferences); toast.success("백업을 복원했습니다."); } catch { toast.error("백업 파일을 읽지 못했습니다."); } event.currentTarget.value = ""; }} /></label><button className="dark-button" onClick={() => setLogOpen(true)}><Plus size={16} /> 운동 기록</button><button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="메뉴 열기"><Menu size={20} /></button></div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-noise" />
          <div className="hero-copy">
            <p className="eyebrow light">TRAINING INTELLIGENCE / 1008 MOVEMENTS</p>
            <h1>더 강하게.<br /><em>더 정확하게.</em></h1>
            <p className="hero-description">운동 과학과 실제 훈련 흐름을 하나로 연결합니다. 오늘의 컨디션에 맞는 동작을 찾고, 기록으로 다음 세션을 더 정교하게 설계하세요.</p>
            <p className="local-first-note"><ShieldCheck size={14} /> 기록·프로필은 이 브라우저에만 저장됩니다. 다른 기기에서는 <strong>백업·가져오기</strong>를 사용하세요.</p>
            <div className="hero-actions"><a href="#explore" className="light-button" onClick={() => setActiveScene("explore")}>운동 시작하기 <ArrowRight size={16} /></a><button className="text-button" onClick={() => { setActiveScene("anatomy"); document.getElementById("anatomy")?.scrollIntoView({ behavior: "smooth" }); }}>내 몸의 움직임 보기 <ChevronRight size={17} /></button></div>
          </div>
          <div className="hero-atlas">
            <img className="hero-performance-image" src="/manus-storage/fit-atlas-performance-hero_9e3d3d3c.jpg" alt="바벨 프런트 스쿼트를 수행하는 운동선수" /><div className="hero-image-shade" /><div className="hero-performance-tag"><span>PERFORM</span><b>01</b><small>STRENGTH SESSION</small></div><div className="atlas-stat stat-one"><span>TRAIN</span><b>{catalogStats.exerciseCount}</b><small>큐레이션 운동</small></div><div className="atlas-stat stat-two"><span>FOCUS</span><b>{catalogStats.categoryCount}</b><small>운동 카테고리</small></div><div className="atlas-caption">TRAIN / RECOVER<br />/ REPEAT</div>
          </div>
          <div className="hero-footer"><span><ShieldCheck size={15} /> 연구 근거를 명시한 콘텐츠</span><span><HeartPulse size={15} /> 의료 진단을 대체하지 않는 안전 설계</span></div>
        </section>

        <section className="start-dock" aria-label="오늘의 주요 행동"><div className="start-dock-intro"><p className="eyebrow">START HERE</p><h2>오늘, 무엇을<br /><em>시작할까요?</em></h2><p>복잡한 설정 없이 현재 목적에 맞는 한 가지 경로를 선택하세요.</p></div><div className="start-dock-actions"><a className="start-action start-action-explore" href="#explore" onClick={() => setActiveScene("explore")}><span><BookOpen size={19} /> 운동 찾기</span><b>1,008개 운동<br />자세·부위·근거</b><ArrowRight size={18} /></a><button className="start-action start-action-session" onClick={() => { setSessionGoal("all_round"); document.getElementById("session")?.scrollIntoView({ behavior: "smooth" }); }}><span><Timer size={19} /> 오늘 세션</span><b>{sessionDuration}분 맞춤<br />운동 설계</b><ArrowRight size={18} /></button><button className="start-action start-action-record" onClick={() => setLogOpen(true)}><span><History size={19} /> 운동 기록</span><b>{logs.length}개 기록<br />변화 확인</b><Plus size={18} /></button><a className="start-action start-action-recover" href="#recovery" onClick={() => setActiveScene("wellness")}><span><HeartPulse size={19} /> 회복 가이드</span><b>불편감·피로<br />가벼운 회복</b><ArrowRight size={18} /></a></div></section>

        <section className="today-command" aria-label="오늘의 시작"><div className="today-command-copy"><p className="eyebrow">TODAY'S READINESS</p><div className="today-command-title"><Brain size={21} /><h2>{checkinRecommendation.title}</h2></div><p>{checkinRecommendation.guidance}</p><button className="dark-button" onClick={() => document.getElementById("program")?.scrollIntoView({ behavior: "smooth" })}>오늘의 기준 확인 <ArrowRight size={15} /></button></div><div className="today-command-meta"><article><span>CATALOG</span><b>{catalogStats.exerciseCount.toLocaleString()}</b><p>독립 운동 종목</p></article><article><span>RECORDS</span><b>{logs.length}</b><p>이 브라우저 기록</p></article><article><span>SESSION</span><b>{sessionDuration}<small>min</small></b><p>현재 설계 시간</p></article></div></section>

        <section id="program" className="program-section section-pad">
          <SectionTitle eyebrow="PERSONALIZE" title="오늘의 움직임을, 당신의 목표에 맞게." description="간단한 목표 선택으로 시작하는 보수적이고 점진적인 운동 제안입니다. 실제 서비스에서는 프로필·운동 이력·피로도까지 반영합니다." />
          <div className="program-grid"><div className="program-selector"><p className="small-label">PRIMARY GOAL</p><div className="goal-pills">{(Object.keys(goalCopy) as Array<keyof typeof goalCopy>).map((item) => <button key={item} onClick={() => setGoal(item)} className={goal === item ? "is-selected" : ""}>{item}</button>)}</div><button className="profile-link" onClick={() => setProfileOpen(true)}>연령·체중·경험 수준 설정 <ArrowRight size={14} /></button><button className="profile-link preference-link" onClick={applySavedExplorePreferences}>저장한 선호 조건으로 탐색 <ArrowRight size={14} /></button><div className="program-note"><Sparkles size={18} /><p><strong>권장 원칙</strong><br />처음 2주간은 운동 전후 불편감·피로를 관찰하며 강도보다 일관성을 우선하세요.</p></div></div><div className="program-card"><div><p className="eyebrow">YOUR STARTING POINT · {plan.sessionsPerWeek} · {plan.targetRpe}</p><h3>{plan.title}</h3><p>{plan.note} {plan.personalizationNote}</p><p className="profile-context">{plan.sexConsideration}</p></div><div className="program-exercise-list">{plan.recommendations.map((name, index) => <div key={name}><span>0{index + 1}</span><b>{name}</b><Check size={16} /></div>)}</div><button className="outline-button" onClick={() => document.getElementById("explore")?.scrollIntoView({ behavior: "smooth" })}>운동 구성 살펴보기 <ArrowRight size={16} /></button></div></div>
          <div className={`checkin-card mode-${checkinRecommendation.mode}`}><div className="checkin-head"><div><p className="eyebrow">DAILY READINESS · LOCAL ONLY</p><h3>{checkinRecommendation.title}</h3><p>{checkinRecommendation.guidance}</p></div><span>{checkinRecommendation.rpeAdjustment}</span></div><div className="checkin-controls"><label>에너지 <b>{checkin.energy}/5</b><input type="range" min="1" max="5" value={checkin.energy} onChange={(event) => setCheckin((current) => ({ ...current, date: new Date().toISOString().slice(0, 10), energy: Number(event.target.value) }))} /></label><label>수면 <b>{checkin.sleep}/5</b><input type="range" min="1" max="5" value={checkin.sleep} onChange={(event) => setCheckin((current) => ({ ...current, date: new Date().toISOString().slice(0, 10), sleep: Number(event.target.value) }))} /></label><label>스트레스 <b>{checkin.stress}/5</b><input type="range" min="1" max="5" value={checkin.stress} onChange={(event) => setCheckin((current) => ({ ...current, date: new Date().toISOString().slice(0, 10), stress: Number(event.target.value) }))} /></label><label>통증·불편감 <b>{checkin.pain}/5</b><input type="range" min="1" max="5" value={checkin.pain} onChange={(event) => setCheckin((current) => ({ ...current, date: new Date().toISOString().slice(0, 10), pain: Number(event.target.value) }))} /></label></div></div>
        </section>

        <section id="session" className="session-section section-pad"><SectionTitle eyebrow="SESSION DESIGNER" title="오늘의 조건으로, 한 세션을 설계하세요." description="시간·장소·목표를 고르면 오늘의 컨디션에 맞춘 시작 구조를 제안합니다. 부담되면 15분 또는 더 쉬운 환경으로 바꿔도 됩니다." /><section className="session-launcher" aria-label="빠른 오늘 세션 시작"><div className="session-launcher-head"><div><p className="eyebrow">01 / QUICK START</p><h3>지금 가능한<br /><em>한 가지</em>를 고르세요.</h3></div><p>미리 정한 세 가지 시작점입니다. 선택 뒤에는 아래에서 목표·장소·시간을 자유롭게 조정할 수 있습니다.</p></div><div className="session-quick-starts">{sessionQuickStarts.map((preset) => { const isSelected = sessionGoal === preset.goal && sessionEnvironment === preset.environment && sessionDuration === preset.duration; return <button key={preset.id} className={isSelected ? "is-selected" : ""} aria-pressed={isSelected} onClick={() => applySessionQuickStart(preset)}><Timer size={19} /><span>{preset.label}</span><small>{preset.detail}</small><ArrowRight size={16} /></button>; })}</div><div className="session-current-state"><span>현재 설계</span><b>{sessionDuration}분 · {{ home: "집·매트", gym: "헬스장", outdoor: "야외·걷기" }[sessionEnvironment]} · {{ all_round: "전신 균형", strength: "기초 근력", endurance: "심폐 리듬" }[sessionGoal]}</b><p><ShieldCheck size={15} /> 오늘 체크인이 강도 안내에 자동 반영됩니다.</p></div></section><div className="session-builder"><div className="session-options"><p className="small-label">02 / FINE TUNE</p><div className="session-choice-group"><span>목표</span><div>{(["all_round", "strength", "endurance"] as SessionGoal[]).map((item) => <button key={item} className={sessionGoal === item ? "is-selected" : ""} onClick={() => setSessionGoal(item)}>{{ all_round: "전신 균형", strength: "기초 근력", endurance: "심폐 리듬" }[item]}</button>)}</div></div><div className="session-choice-group"><span>환경</span><div>{(["home", "gym", "outdoor"] as SessionEnvironment[]).map((item) => <button key={item} className={sessionEnvironment === item ? "is-selected" : ""} onClick={() => setSessionEnvironment(item)}>{{ home: "집·매트", gym: "헬스장", outdoor: "야외·걷기" }[item]}</button>)}</div></div><button className="session-preference-button" onClick={() => { setSessionEnvironment(profileForm.preferredEnvironment); toast.success("저장한 운동 환경을 세션에 적용했습니다."); }}>저장 환경 적용 · {{ home: "집·매트", gym: "헬스장", outdoor: "야외·걷기" }[profileForm.preferredEnvironment]}</button><div className="session-choice-group"><span>시간</span><div>{([15, 30, 45] as SessionDuration[]).map((item) => <button key={item} className={sessionDuration === item ? "is-selected" : ""} onClick={() => setSessionDuration(item)}>{item}분</button>)}</div></div><p className="session-local-note"><ShieldCheck size={15} /> 피로·통증·수면 반응이 좋지 않으면 시간을 줄이거나 범위를 낮추세요.</p></div><article className="session-plan"><div className="session-plan-head"><div><p className="eyebrow">03 / YOUR SESSION</p><h3>{sessionPlan.title}</h3><p>{sessionPlan.summary}</p></div><span>{sessionPlan.adjustment}</span></div><div className="session-blocks">{sessionPlan.blocks.map((block, index) => <div key={block.label} className="session-block"><span>0{index + 1}</span><div><p className="small-label">{block.label} · 약 {block.minutes}분</p><ul>{block.items.map((item) => <li key={item}>{item}</li>)}</ul></div></div>)}</div><div className="session-plan-actions"><button className="session-save-button" onClick={() => { setWeeklyPlan((current) => addDesignedSession(current, sessionPlan, sessionGoal, sessionEnvironment, sessionDuration)); toast.success("오늘의 세션을 이번 주 계획에 추가했습니다."); }}><CalendarDays size={16} /> 이번 주 계획에 추가</button><button className="session-log-button" onClick={() => { setLogOpen(true); toast.success("세션을 마친 뒤 운동 기록을 남겨 보세요."); }}><Plus size={16} /> 운동 기록 열기</button></div><div className="session-safety"><HeartPulse size={16} />{sessionPlan.safetyNote}</div></article></div></section>
        <WeeklyPlanPanel plan={weeklyPlan} insight={weeklyPlanInsight} onGoal={(nextGoal) => setWeeklyPlan((current) => setWeeklyGoal(current, nextGoal))} onToggle={(sessionId) => setWeeklyPlan((current) => toggleWeeklySession(current, sessionId))} onStartLog={startPlanSessionLog} onAdd={() => { setWeeklyPlan((current) => addDesignedSession(current, sessionPlan, sessionGoal, sessionEnvironment, sessionDuration)); toast.success("오늘의 설계 세션을 이번 주 계획에 추가했습니다."); }} />
        <section id="recovery" className="seated-recovery-section section-pad"><SectionTitle eyebrow="WORKDAY RECOVERY" title="오래 앉은 뒤, 다음 작업을 위한 짧은 전환." description="장시간 같은 자세 뒤에 환경을 확인하고 가볍게 움직이는 일반 교육용 루틴입니다. 통증을 치료하려 하거나 무리한 스트레칭을 하는 대신, 작은 범위와 반응 확인을 우선합니다." /><SeatedRecoveryPanel duration={seatedRecoveryDuration} onDuration={setSeatedRecoveryDuration} recommendation={checkinRecommendation} recoveryContext={profileForm.recoveryContext as RecoveryContext} onExplore={exploreSeatedRecoveryExercise} onBuildSession={() => { setSessionGoal("all_round"); setSessionEnvironment("home"); setSessionDuration(15); document.getElementById("session")?.scrollIntoView({ behavior: "smooth" }); toast.success("집·매트 환경의 15분 가벼운 세션으로 설정했습니다."); }} /></section>

        <section className="routine-section section-pad"><SectionTitle eyebrow="ROUTINE LIBRARY" title="목표를 루틴으로, 루틴을 리듬으로." description="4주 템플릿은 일반적인 시작 구조입니다. 주차를 통과하기보다 통증·피로·수면 반응에 맞춰 머무르거나 가볍게 조절하세요." /><div className="routine-goals">{(["strength", "endurance", "weight_management", "general_health"] as RoutineGoal[]).map((item) => <button key={item} className={routineGoal === item ? "is-selected" : ""} onClick={() => setRoutineGoal(item)}>{{ strength: "근력", endurance: "심폐", weight_management: "체중 관리", general_health: "전신 건강" }[item]}</button>)}</div><div className="routine-card"><div className="routine-intro"><p className="eyebrow">{routineGoal.replace("_", " ").toUpperCase()}</p><h3>{routine.title}</h3><p>{routine.intro}</p><div className="routine-safety"><ShieldCheck size={16} />{routine.safetyNote}</div></div><div className="routine-weeks">{routine.weeks.map((week) => <article key={week.week}><span>W{week.week}</span><div><p className="small-label">{week.theme} · {week.sessions}</p><ul>{week.focus.map((item) => <li key={item}>{item}</li>)}</ul><p>{week.note}</p></div></article>)}</div></div></section>

        <section id="explore" className="explore-section section-pad">
          <SectionTitle eyebrow="EXERCISE LIBRARY" title="움직임을 지식으로 익히세요." description={`개인용 정적 큐레이션: ${catalogStats.categoryCount}개 카테고리 · ${catalogStats.exerciseCount}개 운동. 카테고리와 목적, 장비로 탐색하고 올바른 자세·효과·안전 단서를 확인하세요.`} action={<span className="library-count">{filteredExercises.length} MATCHES · {catalogExercises.length}/{catalogStats.exerciseCount}</span>} />
          <section className="explore-launcher" aria-label="빠른 운동 시작"><div className="explore-launcher-head"><div><p className="eyebrow">01 / CHOOSE A START</p><h3>어떻게 움직이고 싶나요?</h3></div><p>한 가지 시작점을 고르면 결과를 바로 좁힙니다. 이후 부위·난이도·장비 조건을 더할 수 있습니다.</p></div><div className="explore-paths">{explorePaths.map((path) => { const Icon = path.icon; const isSelected = category === path.category && focus === path.focus && equipment === path.equipment; return <button key={path.id} className={isSelected ? "is-selected" : ""} aria-pressed={isSelected} onClick={() => applyExplorePath(path)}><Icon size={20} /><span>{path.label}</span><small>{path.description}</small><ArrowRight size={16} /></button>; })}</div><div className="explore-selection-state"><span>현재 조건</span><b>{category === "전체" && focus === "전체" && equipment === "전체" ? "모든 운동 보기" : [category !== "전체" ? category : null, focus !== "전체" ? focus : null, equipment !== "전체" ? equipment : null].filter(Boolean).join(" · ")}</b><p><strong>{filteredExercises.length}개</strong> 운동을 바로 살펴볼 수 있습니다.</p></div></section>
          <div className="search-panel"><div className="search-field"><Search size={18} /><input value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="운동, 부위, 장비 검색" aria-label="운동 검색" /></div><div className="quick-category-filter" role="group" aria-label="운동 종류 빠른 필터"><div className="quick-category-head"><div><p className="small-label">EXERCISE TYPE</p><b>운동 종류 빠른 선택</b><span aria-live="polite">{category === "전체" ? `전체 ${filteredExercises.length}개 표시` : `${category} ${filteredExercises.length}개 표시`}</span></div><div className="filter-head-actions"><button className="preference-filter-button" onClick={applySavedExplorePreferences}>선호 조건 적용</button>{(keyword || category !== "전체" || focus !== "전체" || regionFilter !== "전체" || difficulty !== "전체" || equipment !== "전체" || sort !== "recommended") && <button className="filter-reset" onClick={resetExploreFilters}>조건 초기화</button>}</div></div><div className="quick-category-options">{categories.map((item) => <button key={item} className={category === item ? "filter-active" : ""} aria-pressed={category === item} onClick={() => setCategory(item)}>{item === "전체" ? "전체 보기" : item}</button>)}</div></div><div className="filter-row"><label className="sort-select">정렬<select value={sort} onChange={(event) => setSort(event.target.value as ExerciseSort)} aria-label="정렬 기준"><option value="recommended">추천순 · 입문·짧은 시간 우선</option><option value="difficulty">난이도순 · 입문부터</option><option value="duration">소요 시간순 · 짧은 시간부터</option></select></label><select value={regionFilter} onChange={(event) => setRegionFilter(event.target.value)} aria-label="부위 필터"><option>전체</option>{Object.keys(recoveryGuides).map((region) => <option key={region}>{region}</option>)}</select><select value={focus} onChange={(event) => setFocus(event.target.value)} aria-label="목적 필터"><option>전체</option><option>근력</option><option>체력</option><option>심폐</option><option>가동성</option><option>균형</option><option>협응</option><option>파워</option></select><select value={difficulty} onChange={(event) => setDifficulty(event.target.value)} aria-label="난이도 필터"><option>전체</option><option>입문</option><option>중급</option><option>상급</option></select><select value={equipment} onChange={(event) => setEquipment(event.target.value)} aria-label="장비 필터"><option>전체</option><option>장비 없음</option><option>장비 필요</option></select></div></div>
          <div className="saved-exercise-panels" aria-label="빠른 운동 탐색"><section className="saved-exercise-panel"><div><p className="small-label"><History size={13} /> RECENTLY VIEWED</p><h3>최근 본 운동</h3></div>{recentExercises.length ? <div className="saved-exercise-list">{recentExercises.map((exercise) => <button key={exercise.id} onClick={() => openSavedExercise(exercise)}><span>{exercise.category}</span><b>{exercise.name}</b><ArrowRight size={14} /></button>)}</div> : <p>운동 카드에서 <strong>자세·근거 보기</strong>를 열면 여기에 저장됩니다.</p>}</section><section className="saved-exercise-panel"><div><p className="small-label"><Star size={13} /> FAVORITES</p><h3>즐겨찾기</h3></div>{favoriteExercises.length ? <div className="saved-exercise-list">{favoriteExercises.map((exercise) => <button key={exercise.id} onClick={() => openSavedExercise(exercise)}><span>{exercise.category}</span><b>{exercise.name}</b><ArrowRight size={14} /></button>)}</div> : <p>운동 카드 오른쪽 위의 <strong>별표</strong>로 자주 찾는 운동을 모아 보세요.</p>}</section></div>
          <div className="exercise-grid">{visibleExercises.map((exercise, index) => <ExerciseCard key={exercise.id} exercise={exercise} detail={detailsByExerciseId.get(exercise.id)!} index={index} isFavorite={explorePreferences.favoriteExerciseIds.includes(exercise.id)} onToggleFavorite={() => setExplorePreferences((current) => toggleFavoriteExercise(current, exercise.id))} onViewed={() => setExplorePreferences((current) => recordRecentExercise(current, exercise.id))} />)}</div>
          {filteredExercises.length === 0 && <div className="empty-library"><Search size={26} /><p>조건에 맞는 운동을 찾지 못했습니다. 검색어나 필터를 조정해 보세요.</p></div>}
          {filteredExercises.length > 0 && (visibleExerciseCount < filteredExercises.length || loadedCatalogPages < getCatalogPageCount()) && <div className="catalog-pagination"><p aria-live="polite">{visibleExercises.length}개 표시 · {catalogExercises.length}/{catalogStats.exerciseCount}개 카탈로그를 불러왔습니다.</p><button className="outline-button catalog-load-more" onClick={() => void loadMoreExercises()} disabled={catalogLoading}>{catalogLoading ? <><Loader2 size={15} className="animate-spin" /> 불러오는 중</> : <>운동 100개 더 보기 <ArrowRight size={15} /></>}</button></div>}
        </section>

        <section id="anatomy" className="anatomy-section section-pad">
          <SectionTitle eyebrow="BODY ATLAS" title="부위를 누르면, 필요한 움직임이 보입니다." description="신체 지도의 부위를 선택해 연관 운동과 회복 관점을 확인하세요. 통증 정보는 교육 목적이며 진단이나 치료가 아닙니다." />
          <div className="anatomy-grid"><div className="body-map-card"><div className="map-head"><span>INTERACTIVE MUSCLE MAP</span><span className="live-dot">LIVE GUIDE</span></div><AnatomyMap activeRegion={activeRegion} onSelect={setActiveRegion} /><div className="region-selector">{(Object.keys(recoveryGuides) as BodyRegion[]).map((region) => <button key={region} className={activeRegion === region ? "is-active" : ""} onClick={() => setActiveRegion(region)}>{region}</button>)}</div></div><div className="anatomy-info"><div className="region-title"><p className="eyebrow">SELECTED REGION</p><h3>{activeRegion}</h3></div><div className="related-list"><p className="small-label">RELATED EXERCISES</p>{regionExercises.slice(0, 3).map((exercise) => <div key={exercise.id}><span>{exercise.category}</span><b>{exercise.name}</b><ArrowRight size={15} /></div>)}</div><div className="safety-callout"><ShieldCheck size={18} /><p><strong>안전한 탐색</strong><br />날카로운 통증, 저림, 근력 저하, 외상 후 변화는 자가 관리보다 의료 평가를 우선하세요.</p></div></div></div>
          <div className="recovery-card"><div><p className="eyebrow">RECOVERY GUIDE · {activeRegion}</p><h3>{recovery.title}</h3><p>{recovery.intro}</p></div><ol>{recovery.steps.map((step, index) => <li key={step}><span>0{index + 1}</span>{step}</li>)}</ol><div className="recovery-caution"><HeartPulse size={17} /> {recovery.caution}</div></div>
          <RecoveryProtocolPanel region={activeRegion} />
          <RecoveryPathwayPanel pathways={recoveryPathways} pathway={activeRecoveryPathway} alternatives={pathwayAlternatives} onChoose={(id) => { setActiveRecoveryPathwayId(id); setActiveRegion(getRecoveryPathway(id).region); }} onExplore={exploreRecoveryAlternative} />
        </section>

        <section id="progress" className="progress-section section-pad">
          <SectionTitle eyebrow="TRAINING LOG" title="기록은 감이 아닌 방향을 만듭니다." description="종목·세트·횟수·중량·시간·강도를 기록하면 누적 볼륨과 개인 최고 기록을 확인할 수 있습니다." action={<button className="dark-button" onClick={() => setLogOpen(true)}><Plus size={16} /> 새 기록</button>} />
          <div className="metric-row"><Metric icon={<Dumbbell size={18} />} label="누적 볼륨" value={logs.length ? `${totalVolume.toLocaleString()} kg` : "—"} caption={logs.length ? "기록된 세트 기준" : "기록을 추가해 시작"} /><Metric icon={<Timer size={18} />} label="운동 시간" value={logs.length ? `${totalMinutes}분` : "—"} caption={logs.length ? "누적 기록 기준" : "아직 기록 없음"} /><Metric icon={<Activity size={18} />} label="세션 수" value={`${logs.length}`} caption="기록된 운동" /><Metric icon={<CalendarDays size={18} />} label="이번 주" value={`${insights.load.sessions}`} caption="최근 7일 기록" /></div>
          <div className="insight-row"><article><p className="small-label">TRAINING LOAD</p><h3>{insights.load.load ? `${insights.load.load} 부하점수` : "기록 대기"}</h3><p>{insights.loadLabel}</p></article><article><p className="small-label">CONSISTENCY</p><h3>{insights.consistency.activeDays ? `주 평균 ${insights.consistency.weeklyAverage}일` : "습관 만들기"}</h3><p>{insights.consistencyLabel}</p></article><article><p className="small-label">BODY BALANCE</p><h3>{insights.balance[0]?.region ?? "부위 분석 대기"}</h3><p>{insights.balanceLabel}</p>{insights.balance.length > 0 && <div className="balance-tags">{insights.balance.slice(0, 4).map((item) => <span key={item.region}>{item.region}</span>)}</div>}</article></div>
          <div className="aerobic-trend-row"><article><p className="small-label">AEROBIC INTENSITY · RPE</p><h3>{insights.aerobic.band}{insights.aerobic.sessions ? ` · RPE ${insights.aerobic.averageRpe}` : ""}</h3><p>{insights.aerobic.label}</p></article><article><p className="small-label">EXERCISE TREND · 7 DAYS</p><h3>{insights.trend.direction} · {insights.prTrend.direction}</h3><p>{insights.trend.label}<br />{insights.streak.label} · {insights.prTrend.label}</p></article></div>
          <div className="four-week-card"><div className="card-title"><div><p className="small-label">4-WEEK RHYTHM</p><h3>시간·거리·부하의 흐름</h3></div><BarChart3 size={21} /></div><div className="four-week-bars" aria-label="최근 4주 운동 부하 추세">{fourWeekTrends.map((item) => <div key={item.label}><div className="four-week-bar-track"><i style={{ height: `${Math.max((item.load / maxFourWeekLoad) * 100, item.load ? 7 : 2)}%` }} /></div><b>{item.label}</b><span>{item.minutes}분 · {item.distanceKm ? `${item.distanceKm}km` : "거리—"}</span></div>)}</div></div>
          <div className="analytics-grid"><div className="chart-card"><div className="card-title"><div><p className="small-label">WEEKLY VOLUME</p><h3>최근 7일 볼륨</h3></div><BarChart3 size={21} /></div>{logs.length ? <div className="volume-bars" aria-label="최근 7일 운동 볼륨">{weeklyVolume.map((item) => <div className="volume-column" key={item.day} title={`${item.day}: ${item.volume.toLocaleString()} kg`}><i style={{ height: `${Math.max((item.volume / maxWeeklyVolume) * 100, item.volume ? 7 : 2)}%` }} /><span>{item.day}</span><b>{item.volume ? `${Math.round(item.volume / 1000)}k` : "·"}</b></div>)}</div> : <div className="chart-empty"><div className="ghost-bars"><i /><i /><i /><i /><i /><i /><i /></div><p>첫 운동을 기록하면 주간 볼륨 추세가 표시됩니다.</p></div>}</div><div className="pr-card"><p className="small-label">PERSONAL RECORDS</p><h3>개인 최고 기록</h3>{Object.keys(pr).length ? <div className="pr-list">{Object.entries(pr).map(([name, value]) => <div key={name}><span>{name}</span><b>{value} kg</b></div>)}</div> : <div className="pr-empty"><span className="pr-orbit"><Sparkles size={21} /></span><p>중량 기록을 추가해<br />첫 PR을 만들어 보세요.</p></div>}<button className="text-button dark-text" onClick={() => setLogOpen(true)}>기록 추가하기 <ArrowRight size={15} /></button></div></div>
          <div className="calendar-card"><div><p className="small-label">ACTIVITY CALENDAR</p><h3>날짜별 운동 기록</h3></div><div>{<div className="week-calendar">{calendarDays.map((day) => <div key={day.key} className={day.count ? "has-activity" : ""}><span>{day.weekday}</span><b>{day.day}</b><i>{day.count || "·"}</i></div>)}</div>}{logs.length ? <div className="log-table">{logs.slice(0, 4).map((log) => <div key={log.id}><span>{log.date.slice(5).replace("-", ".")}.</span><b>{log.exercise}</b><span>{log.sets}세트 · {log.reps}회 · {log.load}kg</span><span>RPE {log.intensity}</span></div>)}</div> : <div className="calendar-empty"><CalendarDays size={22} /><p>아직 기록된 운동이 없습니다. 세트와 강도를 남겨 다음 세션의 기준을 만들어 보세요.</p></div>}</div></div>
        </section>

        <section id="wellness" className="wellness-section section-pad"><SectionTitle eyebrow="WHOLE-PERSON WELLNESS" title="회복도 훈련의 일부입니다." description="영양, 수면, 열 노출은 운동을 대체하는 비법이 아니라, 일관된 훈련을 지지하는 생활 습관의 일부로 다룹니다." /><div className="wellness-grid">{wellnessCards.map((card, index) => <WellnessCard key={card.title} card={card} index={index} />)}</div></section>

        <section className="interval-section section-pad"><SectionTitle eyebrow="CARDIO INTERVALS" title="종목에 맞춰, 숨이 무너지기 전에 낮춥니다." description="모든 템플릿은 입문·회복 우선의 출발점입니다. 말하기 검사와 RPE가 계획보다 우선하며, 통증·어지러움·비정상적 숨참은 중단 신호입니다." /><div className="interval-grid">{aerobicIntervalTemplates.map((template) => <article className="interval-card" key={template.id}><p className="small-label">{template.format}</p><h3>{template.title}</h3><dl><div><dt>준비</dt><dd>{template.warmup}</dd></div><div><dt>작업</dt><dd>{template.work}</dd></div><div><dt>회복</dt><dd>{template.recovery}</dd></div></dl><p className="interval-rpe">{template.rpe}</p><p>{template.adjust}</p><p className="interval-safety"><ShieldCheck size={14} /> {template.safety}</p></article>)}</div></section>

        <section className="interval-section section-pad"><SectionTitle eyebrow="QUIET HOME CIRCUITS" title="바닥 충격을 낮추고, 리듬은 이어갑니다." description="아파트·공유 주거 환경을 고려한 무점프 전신 서킷입니다. 발소리·호흡·자세 중 하나라도 통제되지 않으면 보폭·반복·라운드를 먼저 줄이세요." /><div className="interval-grid">{lowNoiseCircuitTemplates.map((template) => <article className="interval-card" key={template.id}><p className="small-label">{template.format}</p><h3>{template.title}</h3><dl><div><dt>소음</dt><dd>{template.noise}</dd></div><div><dt>공간</dt><dd>{template.space}</dd></div><div><dt>구성</dt><dd>{template.blocks.join(" · ")}</dd></div></dl><p className="interval-rpe">{template.intensity}</p><p>{template.adjust}</p><p className="interval-safety"><ShieldCheck size={14} /> {template.safety}</p></article>)}</div></section>

        <section className="life-stage-section section-pad"><SectionTitle eyebrow="START SAFELY" title="시작 조건을 먼저 맞추고, 한 번에 하나만 조절합니다." description="이 안내는 개인 진단·치료·운동 처방이 아닌 일반 정보입니다. 임신·산후 상태, 질환, 수술·부상 이력 또는 새 증상은 의료진의 안내를 우선하세요." /><div className="start-checklist"><h3>운동 시작 전 5가지 확인</h3><ul>{startChecklist.map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul></div><div className="life-stage-grid">{lifeStageGuides.map((guide) => <article key={guide.id}><p className="eyebrow">GENERAL STARTING POINT</p><h3>{guide.title}</h3><p>{guide.scope}</p><h4>시작</h4><ul>{guide.start.map((item) => <li key={item}>{item}</li>)}</ul><h4>조절</h4><ul>{guide.adjust.map((item) => <li key={item}>{item}</li>)}</ul><p className="life-stage-stop"><ShieldCheck size={14} /> {guide.stop.join(" · ")}</p></article>)}</div></section>

        <section className="evidence-section"><div><BookOpen size={21} /><p className="eyebrow">EVIDENCE FIRST</p><h2>근거를 남기고,<br />한계를 함께 말합니다.</h2></div><div><p>Fit Atlas는 운동 항목마다 공공 보건 지침 또는 전문 기관의 출처를 연결합니다. 권고량은 일반적 참고 정보이며 개인별 질환, 임신·산후 상태, 부상 이력, 복용 약물을 대체 평가하지 않습니다.</p><a href="https://www.who.int/news-room/fact-sheets/detail/physical-activity" target="_blank" rel="noreferrer">WHO 신체 활동 권고 보기 <ArrowRight size={16} /></a></div></section>
      </main>

      <footer className="site-footer"><div className="brand"><span className="brand-mark"><Activity size={17} /></span><span>FIT ATLAS</span></div><p>움직임을 위한 지식, 일관성을 위한 기록.</p><p>© 2026 Fit Atlas. Educational information only.</p></footer>

      {logOpen && <div className="modal-backdrop" role="presentation" onMouseDown={() => setLogOpen(false)}><section className="log-modal" role="dialog" aria-modal="true" aria-labelledby="log-title" onMouseDown={(event) => event.stopPropagation()}><div className="modal-head"><div><p className="eyebrow">TRAINING LOG</p><h2 id="log-title">운동 기록 추가</h2></div><button onClick={() => setLogOpen(false)} className="icon-button" aria-label="닫기"><X size={19} /></button></div><div className="log-form"><div className="form-grid"><label>운동 날짜<input type="date" max={new Date().toISOString().slice(0, 10)} value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} /></label><label>운동<select value={form.exercise} onChange={(event) => setForm({ ...form, exercise: event.target.value })}>{catalogExercises.map((exercise) => <option key={exercise.id}>{exercise.name}</option>)}</select></label></div><div className="form-grid"><label>세트<input inputMode="numeric" value={form.sets} onChange={(event) => setForm({ ...form, sets: event.target.value })} /></label><label>횟수<input inputMode="numeric" value={form.reps} onChange={(event) => setForm({ ...form, reps: event.target.value })} /></label><label>중량 (kg)<input inputMode="decimal" value={form.load} onChange={(event) => setForm({ ...form, load: event.target.value })} /></label><label>운동 시간 (분)<input inputMode="numeric" value={form.minutes} onChange={(event) => setForm({ ...form, minutes: event.target.value })} /></label><label>거리 · 선택<input inputMode="decimal" placeholder="러닝·사이클·로잉·수영" value={form.distance} onChange={(event) => setForm({ ...form, distance: event.target.value })} /><select value={form.distanceUnit} onChange={(event) => setForm({ ...form, distanceUnit: event.target.value as "km" | "m" })}><option value="km">km</option><option value="m">m</option></select></label></div><label>주관적 강도 RPE <span>{form.intensity}/10</span><input type="range" min="1" max="10" value={form.intensity} onChange={(event) => setForm({ ...form, intensity: event.target.value })} /></label><p className="form-safety"><ShieldCheck size={15} /> 거리 단위는 러닝·사이클에는 km, 로잉·수영에는 m를 사용하세요. 기록은 시간·거리·RPE의 보수적 맥락과 4주 흐름을 이 브라우저에서만 계산합니다.</p><button className="dark-button form-submit" onClick={addLog}>기록 저장 <ArrowRight size={16} /></button></div></section></div>}
      {profileOpen && <div className="modal-backdrop" role="presentation" onMouseDown={() => setProfileOpen(false)}><section className="log-modal profile-modal" role="dialog" aria-modal="true" aria-labelledby="profile-title" onMouseDown={(event) => event.stopPropagation()}><div className="modal-head"><div><p className="eyebrow">PERSONALIZATION</p><h2 id="profile-title">운동 기준 설정</h2></div><button onClick={() => setProfileOpen(false)} className="icon-button" aria-label="닫기"><X size={19} /></button></div><p className="modal-description">입력값은 이 기기에만 저장되며 보수적인 시작 난이도와 안내 맥락을 정하는 데만 사용합니다. 질환·통증·임신 상태 등 의료 정보에 대한 진단은 제공하지 않습니다.</p><div className="log-form"><div className="form-grid"><label>연령<input inputMode="numeric" placeholder="예: 30" value={profileForm.age} onChange={(event) => setProfileForm({ ...profileForm, age: event.target.value })} /></label><label>체중 (kg)<input inputMode="decimal" placeholder="예: 68" value={profileForm.weightKg} onChange={(event) => setProfileForm({ ...profileForm, weightKg: event.target.value })} /></label></div><label>성별<select value={profileForm.sex} onChange={(event) => setProfileForm({ ...profileForm, sex: event.target.value })}><option value="undisclosed">응답하지 않음</option><option value="female">여성</option><option value="male">남성</option><option value="nonbinary">논바이너리</option></select></label><div className="form-grid"><label>주요 목표<select value={profileForm.primaryGoal} onChange={(event) => setProfileForm({ ...profileForm, primaryGoal: event.target.value })}><option value="strength">근력 증가</option><option value="endurance">체력 증가</option><option value="weight_management">체중 관리</option><option value="general_health">건강 증진</option></select></label><label>경험 수준<select value={profileForm.experience} onChange={(event) => setProfileForm({ ...profileForm, experience: event.target.value })}><option value="beginner">입문</option><option value="intermediate">중급</option><option value="advanced">상급</option></select></label></div><div className="form-grid"><label>선호 운동 종류<select aria-label="선호 운동 종류" value={profileForm.preferredCategory} onChange={(event) => setProfileForm({ ...profileForm, preferredCategory: event.target.value as typeof profileForm.preferredCategory })}>{preferredCategoryOptions.map((item) => <option key={item} value={item}>{item === "전체" ? "특정 종류 없음" : item}</option>)}</select></label><label>선호 장비<select aria-label="선호 장비" value={profileForm.preferredEquipment} onChange={(event) => setProfileForm({ ...profileForm, preferredEquipment: event.target.value as typeof profileForm.preferredEquipment })}>{preferredEquipmentOptions.map((item) => <option key={item} value={item}>{{ flexible: "상황에 맞게", bodyweight: "장비 없이", basic_home: "간단한 홈 장비", gym: "헬스장 장비" }[item]}</option>)}</select></label></div><label>주 활동 환경<select aria-label="주 활동 환경" value={profileForm.preferredEnvironment} onChange={(event) => setProfileForm({ ...profileForm, preferredEnvironment: event.target.value as typeof profileForm.preferredEnvironment })}>{preferredEnvironmentOptions.map((item) => <option key={item} value={item}>{{ home: "집·매트", gym: "헬스장", outdoor: "야외·걷기" }[item]}</option>)}</select></label><label>선택적 안전 모드<select value={profileForm.recoveryContext} onChange={(event) => setProfileForm({ ...profileForm, recoveryContext: event.target.value })}><option value="none">해당 없음</option><option value="reduced_readiness">낮은 에너지·회복 저하·생애주기 변화</option><option value="pregnancy_postpartum">임신·산후 — 의료진 확인 우선</option></select></label><button className="dark-button form-submit" onClick={saveProfileSettings}>설정 저장 <ArrowRight size={16} /></button></div></section></div>}
    </div>
  );
}

function ExerciseCard({ exercise, detail, isFavorite, onToggleFavorite, onViewed }: { exercise: Exercise; detail: ExerciseDetail; index: number; isFavorite: boolean; onToggleFavorite: () => void; onViewed: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const visual = getMovementVisual(exercise.id);
  const evidence = getExerciseEvidenceScope(exercise);
  return <article className="exercise-card"><div className="exercise-top"><span>{exercise.category}</span><div className="exercise-card-actions"><span className="difficulty">{exercise.difficulty}</span><button className={isFavorite ? "favorite-toggle is-favorite" : "favorite-toggle"} aria-label={`${exercise.name} ${isFavorite ? "즐겨찾기 해제" : "즐겨찾기 추가"}`} aria-pressed={isFavorite} onClick={onToggleFavorite}><Star size={15} fill={isFavorite ? "currentColor" : "none"} /></button></div></div><h3>{exercise.name}</h3><p className="english-name">{exercise.englishName}</p><p className="exercise-description">{exercise.description}</p><div className="tag-row">{exercise.regions.map((region) => <span key={region}>{region}</span>)}<span className="focus-tag">{exercise.focus}</span></div><div className="exercise-meta"><span><Timer size={14} />{exercise.minutes}</span><span><Dumbbell size={14} />{exercise.equipment}</span></div>{expanded && <div className="exercise-detail"><p className="small-label">TRAINING BENEFITS</p><div className="benefit-row">{exercise.benefits.map((benefit) => <span key={benefit}>{benefit}</span>)}</div>{visual && <MovementVisualGuide title={visual.title} frames={visual.frames} />}<p className="small-label">SETUP</p><ol>{detail.setup.map((step, stepIndex) => <li key={step}><b>{stepIndex + 1}.</b>{step}</li>)}</ol><p className="small-label">FORM CUES</p><ol>{exercise.cues.map((cue, cueIndex) => <li key={cue}><b>{cueIndex + 1}.</b>{cue}</li>)}</ol><div className="detail-grid"><div><p className="small-label">EASIER</p><ul>{detail.regressions.map((item) => <li key={item}>{item}</li>)}</ul></div><div><p className="small-label">NEXT STEP</p><ul>{detail.progressions.map((item) => <li key={item}>{item}</li>)}</ul></div></div><p className="small-label">COMMON ERRORS</p><ul className="detail-errors">{detail.commonMistakes.map((item) => <li key={item}>{item}</li>)}</ul><p className="exercise-finish"><b>마무리</b>{detail.finish}</p><p className="exercise-warning">{exercise.warning}</p><section className="evidence-scope" aria-label={`${exercise.name} 근거 적용 범위`}><p className="small-label">EVIDENCE SCOPE</p><p>{evidence.sourceLabel}</p><p>{evidence.guidanceLabel}</p><small>{evidence.limit}</small></section><a href={exercise.reference.url} target="_blank" rel="noreferrer">{exercise.reference.label} <ArrowRight size={13} /></a></div>}<button className="card-expand" onClick={() => { const nextExpanded = !expanded; setExpanded(nextExpanded); if (nextExpanded) onViewed(); }}>{expanded ? "간단히 보기" : "자세·근거 보기"}<ChevronRight size={15} className={expanded ? "rotate-icon" : ""} /></button></article>;
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
  return <article className={`wellness-card tone-${card.tone}`}><span className="wellness-index">{String(index + 1).padStart(2, "0")}</span><p className="eyebrow">{card.eyebrow}</p><h3>{card.title}</h3><p>{card.text}</p>{expanded && <WellnessDetailPanel detail={detail} />}<button className="wellness-expand" onClick={() => setExpanded(!expanded)}>{expanded ? "간단히 보기" : "상세 가이드"}<ChevronRight size={14} className={expanded ? "rotate-icon" : ""} /></button><a href={card.url} target="_blank" rel="noreferrer">{card.source} <ArrowRight size={14} /></a></article>;
}
