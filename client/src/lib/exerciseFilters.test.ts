import { describe, expect, it } from "vitest";
import { exercises, recoveryGuides, wellnessCards } from "./fitnessData";
import { filterExercises, getCatalogStats } from "./exerciseFilters";

const allFilters = { keyword: "", category: "전체", focus: "전체", region: "전체", difficulty: "전체", equipment: "전체" };

describe("exercise library QA", () => {
  it("covers every supported category with posture, benefits, warnings, and sources", () => {
    const categories = new Set(exercises.map((exercise) => exercise.category));
    const stats = getCatalogStats(exercises);
    expect(categories).toEqual(new Set(["러닝", "유산소", "헬스기구", "프리웨이트", "맨몸운동", "모빌리티", "균형·협응", "요가·필라테스", "파워·민첩성"]));
    expect(exercises.length).toBeGreaterThanOrEqual(200);
    expect(stats).toEqual({ exerciseCount: exercises.length, categoryCount: categories.size });
    expect(new Set(exercises.map((exercise) => exercise.id)).size).toBe(exercises.length);
    exercises.forEach((exercise) => {
      expect(exercise.cues.length).toBeGreaterThanOrEqual(3);
      expect(exercise.benefits.length).toBeGreaterThanOrEqual(3);
      expect(exercise.warning.length).toBeGreaterThan(20);
      expect(exercise.reference.url).toMatch(/^https:\/\//);
    });
    expect(exercises.map((exercise) => exercise.id)).toEqual(expect.arrayContaining(["kettlebell-sumo-deadlift", "resistance-band-row", "battle-rope-alternating-wave", "low-step-march", "medicine-ball-scoop-toss", "aqua-walk", "elliptical-easy", "recumbent-bike-easy", "row-erg-easy", "sandbag-bear-hug-carry", "trx-row", "landmine-press", "landmine-rotation-prep", "seated-wrist-mobility", "pool-easy-swim", "rail-supported-step-up", "counter-incline-pushup", "supported-floor-transfer", "grocery-bag-lift-to-counter", "easy-incline-walk", "trekking-pole-walk-prep", "light-daypack-walk", "outdoor-pace-reset", "cable-biceps-curl-easy", "machine-incline-chest-press-easy", "a-skip-walk-drill", "easy-fartlek-run", "pike-pushup-prep", "copenhagen-plank-knee-easy", "assisted-pistol-squat-to-box", "decline-pushup-prep", "treadmill-incline-tempo-walk", "machine-ab-crunch-easy", "cable-reverse-fly-easy", "hollow-tuck-hold", "run-walk-200m-easy", "treadmill-jog-walk-interval", "cable-single-arm-chest-press-easy", "unilateral-leg-press-easy", "active-hang-foot-assist", "supported-pull-up-negative", "band-assisted-chin-up-easy", "y-balance-reach-support", "single-leg-head-turn-support", "foot-assisted-pronated-pullup", "mixed-grip-pullup-foot-assist", "pullup-pause-ladder-foot-assist", "band-assisted-pullup-tempo", "assisted-neutral-grip-pullup-machine", "frog-pump-easy", "hamstring-walkout-easy", "supported-lateral-lunge", "bear-crawl-forward-easy", "dead-bug-contralateral-reach", "standing-cross-crawl-march", "offset-wall-pushup", "counter-bodyweight-triceps-extension", "wall-sit-calf-raise-easy", "knee-plank-up-down", "high-plank-knee-to-elbow-easy"]));
  });

  it("combines category, region, purpose, difficulty, equipment, and keyword filters", () => {
    const result = filterExercises(exercises, { ...allFilters, category: "맨몸운동", region: "코어", focus: "근력", difficulty: "입문", equipment: "장비 없음", keyword: "푸시업" });
    expect(result.map((exercise) => exercise.id)).toEqual(["pushup"]);
  });

  it("includes the low-noise, no-jump home circuit variants", () => {
    expect(exercises.map((exercise) => exercise.id)).toEqual(expect.arrayContaining(["quiet-step-touch", "low-impact-skater-step", "standing-shadow-box-easy", "quiet-squat-front-reach", "wall-pushup-march-easy", "seated-knee-lift-punch-easy", "slow-march-arm-sweep", "controlled-step-back-tap-support", "side-to-side-toe-tap-quiet", "quiet-hip-hinge-reach", "knee-supported-bear-shoulder-shift", "standing-hamstring-curl-tap-support"]));
    expect(filterExercises(exercises, { ...allFilters, category: "맨몸운동", keyword: "콰이어트" }).map((exercise) => exercise.id)).toEqual(expect.arrayContaining(["quiet-step-touch", "quiet-squat-front-reach", "quiet-hip-hinge-reach"]));
  });

  it("includes floor-transfer, isometric, shoulder-stability, and foot-control bodyweight variants", () => {
    expect(exercises.map((exercise) => exercise.id)).toEqual(expect.arrayContaining(["half-kneeling-to-stand-support", "side-sit-to-kneel-support", "dead-bug-isometric-press", "quadruped-reach-back-easy", "wall-slide-lift-off-easy", "prone-external-rotation-lift-easy", "short-foot-doming-easy", "toe-yoga-easy", "tibialis-wall-raise-easy", "soleus-wall-raise-easy", "single-leg-calf-hold-support", "bear-plank-scapular-protraction"]));
    expect(filterExercises(exercises, { ...allFilters, category: "맨몸운동", keyword: "도밍" }).map((exercise) => exercise.id)).toEqual(["short-foot-doming-easy"]);
  });

  it("includes seated recovery, self-resisted pull, wrist-friendly core, and tight-space variants", () => {
    expect(exercises.map((exercise) => exercise.id)).toEqual(expect.arrayContaining(["seated-pelvic-tilt-easy", "chair-thoracic-extension-easy", "seated-spinal-twist-easy", "seated-posture-reset-reach", "wall-snow-angel-easy", "prone-cobra-hold-easy", "self-resisted-row-easy", "wall-lat-press-isometric-easy", "forearm-plank-knee-hold", "supine-heel-press-90-90", "side-lying-hip-abduction-hold", "standing-clock-reach-support"]));
    expect(filterExercises(exercises, { ...allFilters, category: "맨몸운동", keyword: "셀프 레지스티드" }).map((exercise) => exercise.id)).toEqual(["self-resisted-row-easy"]);
  });

  it("includes hip-control, knee-friendly endurance, forearm-support, and floor-transition variants", () => {
    expect(exercises.map((exercise) => exercise.id)).toEqual(expect.arrayContaining(["glute-bridge-adduction-squeeze-easy", "prone-hip-extension-knee-bent-easy", "standing-hip-flexion-hold-support", "wall-quad-set-easy", "terminal-knee-extension-wall-easy", "supported-squat-pulse-easy", "forearm-tabletop-hold-easy", "seated-forearm-pronation-supination", "forearm-wall-slide-easy", "kneeling-hip-shift-clock", "squat-to-half-kneel-support", "side-lying-clam-hold-easy"]));
    expect(filterExercises(exercises, { ...allFilters, category: "맨몸운동", keyword: "애덕션" }).map((exercise) => exercise.id)).toEqual(expect.arrayContaining(["glute-bridge-adduction-squeeze-easy", "seated-hip-adduction-squeeze-easy"]));
  });

  it("includes low-impact endurance and wall-or-chair upper-body reinforcement variants", () => {
    expect(exercises.map((exercise) => exercise.id)).toEqual(expect.arrayContaining(["wall-elbow-row-isometric-easy", "seated-lat-press-isometric-easy", "towel-self-row-seated-easy", "wall-triceps-press-isometric-easy", "chair-incline-scapular-pushup-easy", "chair-supported-hip-hinge-tap", "chair-sit-to-stand-pause-easy", "wall-sit-alternating-heel-lift-easy", "wall-hip-abduction-hold-easy", "standing-knee-flexion-hold-support", "seated-knee-extension-alternating-easy", "wall-march-press-easy"]));
    expect(filterExercises(exercises, { ...allFilters, category: "맨몸운동", keyword: "타월 셀프" }).map((exercise) => exercise.id)).toEqual(["towel-self-row-seated-easy"]);
  });

  it("includes no-equipment back-and-arm endurance and low-load hip-or-knee variants", () => {
    expect(exercises.map((exercise) => exercise.id)).toEqual(expect.arrayContaining(["prone-swimmer-sweep-easy", "prone-elbow-pullback-hold-easy", "back-of-hand-wall-press-easy", "seated-biceps-isometric-curl-easy", "chair-arm-pressdown-isometric-easy", "wall-no-money-external-rotation-easy", "chair-hamstring-heel-dig-easy", "wall-hip-extension-press-easy", "supine-heel-slide-easy", "chair-supported-knee-bend-tap", "wall-split-stance-hip-shift-easy"]));
    expect(filterExercises(exercises, { ...allFilters, category: "맨몸운동", keyword: "스위머" }).map((exercise) => exercise.id)).toEqual(["prone-swimmer-sweep-easy"]);
  });

  it("includes no-equipment forearm-grip endurance and low-load hip-or-knee control variants", () => {
    expect(exercises.map((exercise) => exercise.id)).toEqual(expect.arrayContaining(["seated-wrist-flexion-isometric-easy", "seated-wrist-extension-isometric-easy", "finger-spread-isometric-easy", "thumb-opposition-tap-easy", "fist-squeeze-isometric-easy", "fingertip-wall-press-easy", "wall-supported-hip-circle-easy", "chair-supported-lateral-weight-shift", "seated-ankle-pump-march-easy", "standing-heel-toe-rock-support", "wall-supported-mini-lunge-easy", "chair-supported-side-step-touch"]));
    expect(filterExercises(exercises, { ...allFilters, category: "맨몸운동", keyword: "엄지" }).map((exercise) => exercise.id)).toEqual(["thumb-opposition-tap-easy"]);
  });

  it("includes hand-or-wrist friendly and seated recovery coordination variants", () => {
    expect(exercises.map((exercise) => exercise.id)).toEqual(expect.arrayContaining(["seated-wrist-radial-deviation-easy", "seated-wrist-ulnar-deviation-easy", "seated-hand-tendon-glide-easy", "elbow-supported-hand-open-close-easy", "seated-heel-raise-easy", "seated-toe-raise-easy", "seated-hip-abduction-press-easy", "seated-hip-adduction-squeeze-easy", "chair-seated-leg-slide-easy", "seated-cross-body-knee-tap-easy", "seated-step-out-tap-easy"]));
    expect(filterExercises(exercises, { ...allFilters, category: "맨몸운동", keyword: "텐던" }).map((exercise) => exercise.id)).toEqual(["seated-hand-tendon-glide-easy"]);
  });
  it("includes solo-friendly lower-body, pull, press, shoulder, and arm gym-machine variants", () => {
    expect(exercises.map((exercise) => exercise.id)).toEqual(expect.arrayContaining(["hack-squat-machine-easy", "belt-squat-machine-easy", "machine-glute-drive-easy", "plate-loaded-high-row-easy", "machine-dip-press-easy", "cable-lateral-raise-easy", "cable-hammer-curl-easy", "cable-standing-hip-flexion-easy"]));
    expect(filterExercises(exercises, { ...allFilters, category: "헬스기구", keyword: "글루트 드라이브" }).map((exercise) => exercise.id)).toEqual(["machine-glute-drive-easy"]);
  });
  it("includes solo-friendly aerobic machine variants with steady entry options", () => {
    expect(exercises.map((exercise) => exercise.id)).toEqual(expect.arrayContaining(["ski-erg-steady-easy", "air-bike-steady-easy", "curved-treadmill-walk-easy", "vertical-climber-easy", "arm-ergometer-easy"]));
    expect(filterExercises(exercises, { ...allFilters, category: "유산소", keyword: "암 에르고미터" }).map((exercise) => exercise.id)).toEqual(["arm-ergometer-easy"]);
  });
  it("includes solo bodyweight hinge, unilateral lower-body, and core coordination variants", () => {
    expect(exercises.map((exercise) => exercise.id)).toEqual(expect.arrayContaining(["supported-single-leg-rdl-reach", "split-squat-front-reach-support", "side-plank-knee-reach-through", "supine-march-heel-tap-easy", "wall-squat-lateral-weight-shift-easy", "tall-kneeling-hip-hinge-easy"]));
    expect(filterExercises(exercises, { ...allFilters, category: "맨몸운동", keyword: "리치스루" }).map((exercise) => exercise.id)).toEqual(["side-plank-knee-reach-through"]);
  });
  it("includes solo progression, split, cruise, hill, cadence, and ladder running variants", () => {
    expect(exercises.map((exercise) => exercise.id)).toEqual(expect.arrayContaining(["easy-progression-run", "negative-split-walk-run-easy", "cruise-interval-run-easy", "hill-repeat-walk-run-easy", "cadence-ladder-march-jog", "run-walk-ladder-easy"]));
    expect(filterExercises(exercises, { ...allFilters, category: "러닝", keyword: "네거티브 스플릿" }).map((exercise) => exercise.id)).toEqual(["negative-split-walk-run-easy"]);
  });
  it("includes solo cable forearm, triceps, shoulder, and standing calf-machine variants", () => {
    expect(exercises.map((exercise) => exercise.id)).toEqual(expect.arrayContaining(["cable-reverse-curl-easy", "cable-cross-body-triceps-extension-easy", "cable-front-raise-easy", "machine-standing-calf-raise-easy"]));
    expect(filterExercises(exercises, { ...allFilters, category: "헬스기구", keyword: "리버스 컬" }).map((exercise) => exercise.id)).toEqual(["cable-reverse-curl-easy"]);
  });
  it("includes solo advanced pull, scapular-stability, and core-transition bodyweight variants", () => {
    expect(exercises.map((exercise) => exercise.id)).toEqual(expect.arrayContaining(["scapular-pullup-foot-assist", "hanging-knee-raise-foot-assist", "tuck-l-sit-support-easy", "hollow-to-arch-roll-easy", "reverse-plank-knee-lift-easy"]));
    expect(filterExercises(exercises, { ...allFilters, category: "맨몸운동", keyword: "스캐풀라 풀업" }).map((exercise) => exercise.id)).toEqual(["scapular-pullup-foot-assist"]);
  });
  it("includes solo free-weight hinge, carry, row, press, unilateral lower-body, and calf variants", () => {
    expect(exercises.map((exercise) => exercise.id)).toEqual(expect.arrayContaining(["dumbbell-suitcase-deadlift-easy", "dumbbell-front-rack-carry-easy", "chest-supported-dumbbell-row-easy", "dumbbell-pullover-easy", "dumbbell-z-press-easy", "dumbbell-lateral-lunge-easy", "dumbbell-bulgarian-split-squat-easy", "dumbbell-calf-raise-easy"]));
    expect(filterExercises(exercises, { ...allFilters, category: "프리웨이트", keyword: "프런트 랙 캐리" }).map((exercise) => exercise.id)).toEqual(["dumbbell-front-rack-carry-easy"]);
  });
  it("includes solo resistance-band upper-body, lower-body, and core coordination variants", () => {
    expect(exercises.map((exercise) => exercise.id)).toEqual(expect.arrayContaining(["resistance-band-pull-apart-easy", "resistance-band-biceps-curl-easy", "resistance-band-triceps-pressdown-easy", "resistance-band-squat-to-press-easy", "resistance-band-clamshell-easy", "resistance-band-dead-bug-press-easy", "resistance-band-hip-thrust-easy", "resistance-band-reverse-fly-easy"]));
    expect(filterExercises(exercises, { ...allFilters, category: "프리웨이트", keyword: "밴드 풀어파트" }).map((exercise) => exercise.id)).toEqual(["resistance-band-pull-apart-easy"]);
  });
  it("includes solo Smith, cable, and unilateral machine strength variants", () => {
    expect(exercises.map((exercise) => exercise.id)).toEqual(expect.arrayContaining(["smith-machine-box-squat-easy", "smith-machine-rdl-easy", "smith-machine-hip-thrust-easy", "smith-machine-incline-press-easy", "smith-machine-calf-raise-easy", "smith-machine-inverted-row-easy", "cable-high-row-easy", "cable-squat-to-row-easy", "machine-unilateral-leg-curl-easy", "machine-unilateral-leg-extension-easy"]));
    expect(filterExercises(exercises, { ...allFilters, category: "헬스기구", keyword: "스미스 머신 박스 스쿼트" }).map((exercise) => exercise.id)).toEqual(["smith-machine-box-squat-easy"]);
  });
  it("includes solo advanced bodyweight pushing, unilateral lower-body, balance, and core variants", () => {
    expect(exercises.map((exercise) => exercise.id)).toEqual(expect.arrayContaining(["elevated-pike-pushup-easy", "wall-handstand-lean-easy", "supported-cossack-squat-easy", "supported-shrimp-squat-easy", "partial-wall-walk-prep", "frog-stand-weight-shift-prep", "quadruped-shoulder-tap-easy", "hollow-tuck-rock-easy", "seated-straddle-compression-easy"]));
    expect(filterExercises(exercises, { ...allFilters, category: "맨몸운동", keyword: "프로그 스탠드" }).map((exercise) => exercise.id)).toEqual(["frog-stand-weight-shift-prep"]);
  });
  it("shows mobility entries and excludes equipment when requested", () => {
    expect(filterExercises(exercises, { ...allFilters, category: "모빌리티" }).map((exercise) => exercise.id)).toContain("cat-cow");
    expect(filterExercises(exercises, { ...allFilters, category: "균형·협응", focus: "균형" }).map((exercise) => exercise.id)).toContain("single-leg-stand");
    expect(filterExercises(exercises, { ...allFilters, category: "요가·필라테스", keyword: "다운독" }).map((exercise) => exercise.id)).toEqual(["downward-dog"]);
    expect(filterExercises(exercises, { ...allFilters, category: "파워·민첩성", focus: "파워" }).map((exercise) => exercise.id)).toEqual(expect.arrayContaining(["snap-down", "squat-jump-stick"]));
    expect(filterExercises(exercises, { ...allFilters, equipment: "장비 없음" }).every((exercise) => exercise.equipment === "없음")).toBe(true);
  });

  it("provides recovery and wellness education for every mapped region", () => {
    expect(Object.keys(recoveryGuides)).toHaveLength(7);
    Object.values(recoveryGuides).forEach((guide) => {
      expect(guide.steps).toHaveLength(3);
      expect(guide.caution.length).toBeGreaterThan(25);
    });
    expect(wellnessCards).toHaveLength(11);
    expect(wellnessCards.map((card) => card.title)).toEqual(expect.arrayContaining(["수면 리듬", "운동 전후 식사", "사우나와 열 노출", "마사지건의 현실적 역할", "균형과 일상 기능", "일상 식사 리듬", "더운 날 세션 계획", "카페인·운동·수면 일지"]));
    wellnessCards.forEach((card) => expect(card.url).toMatch(/^https:\/\//));
  });
});
