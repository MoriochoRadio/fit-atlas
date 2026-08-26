import { ArrowRight, HeartPulse, ShieldCheck } from "lucide-react";
import { AnatomyMap } from "@/components/AnatomyMap";
import { RecoveryStageGrid } from "@/components/GuidancePanels";
import { SectionTitle } from "@/components/SectionPrimitives";
import type { BodyRegion, Exercise } from "@/lib/catalogTypes";
import { recoveryGuides } from "@/lib/catalogContent";
import {
  recoveryProtocols,
  recoveryStageGuides,
} from "@/lib/recoveryProtocols";
import {
  getRecoveryPathway,
  recoveryPathways,
  type RecoveryPathwayId,
} from "@/lib/recoveryPathways";
import { RecoveryPathwayPanel } from "@/components/GuidancePanels";

export type AnatomyMuscleRoles = {
  primary: BodyRegion[];
  supporting: BodyRegion[];
} | null;

type AnatomySceneProps = {
  activeRegion: BodyRegion;
  selectedAnatomyRegions: BodyRegion[];
  onToggleRegion: (region: BodyRegion) => void;
  regionExercises: Exercise[];
  anatomyExercise: Exercise | null;
  anatomyMuscleRoles: AnatomyMuscleRoles;
  onOpenExercise: (exercise: Exercise) => void;
  recovery: (typeof recoveryGuides)[BodyRegion];
  activeRecoveryPathway: ReturnType<typeof getRecoveryPathway>;
  pathwayAlternatives: Exercise[];
  onChoosePathway: (id: RecoveryPathwayId) => void;
  onExploreAlternative: (exerciseId: string) => void;
};

export function AnatomyScene({
  activeRegion,
  selectedAnatomyRegions,
  onToggleRegion,
  regionExercises,
  anatomyExercise,
  anatomyMuscleRoles,
  onOpenExercise,
  recovery,
  activeRecoveryPathway,
  pathwayAlternatives,
  onChoosePathway,
  onExploreAlternative,
}: AnatomySceneProps) {
  return (
    <section
      id="scene-anatomy"
      className="scene-view scene-view-anatomy"
      tabIndex={-1}
    >
      <section id="anatomy" className="anatomy-section section-pad">
        <SectionTitle
          eyebrow="BODY ATLAS"
          title="부위를 누르면, 필요한 움직임이 보입니다."
          description="신체 지도의 부위를 선택해 연관 운동과 회복 관점을 확인하세요. 통증 정보는 교육 목적이며 진단이나 치료가 아닙니다."
        />
        <div className="anatomy-grid">
          <div className="body-map-card">
            <div className="map-head">
              <span>INTERACTIVE 3D MUSCLE MODEL</span>
              <span className="live-dot">DRAG · MULTI SELECT</span>
            </div>
            <AnatomyMap
              activeRegion={activeRegion}
              selectedRegions={selectedAnatomyRegions}
              onToggleRegion={onToggleRegion}
              muscleRoles={anatomyMuscleRoles}
            />
            <div
              className="region-selector"
              role="group"
              aria-label="근육 부위 다중 선택"
            >
              {(Object.keys(recoveryGuides) as BodyRegion[]).map(region => (
                <button
                  key={region}
                  className={
                    selectedAnatomyRegions.includes(region) ? "is-active" : ""
                  }
                  aria-pressed={selectedAnatomyRegions.includes(region)}
                  onClick={() => onToggleRegion(region)}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>
          <div className="anatomy-info">
            <div className="region-title">
              <p className="eyebrow">
                {selectedAnatomyRegions.length > 1
                  ? "COMPOUND MUSCLE FILTER"
                  : "SELECTED MUSCLE / REGION"}
              </p>
              <h3>
                {selectedAnatomyRegions.length
                  ? selectedAnatomyRegions.join(" · ")
                  : activeRegion}
              </h3>
              <p>
                {selectedAnatomyRegions.length > 1
                  ? "선택한 모든 부위를 함께 자극하는 복합 운동만 표시합니다."
                  : "모델을 드래그해 회전하거나 근육을 눌러 여러 부위를 함께 선택하세요."}
              </p>
            </div>
            {anatomyExercise && (
              <div
                className="anatomy-muscle-legend"
                aria-label={`${anatomyExercise.name} 근육 역할`}
              >
                <span className="primary">
                  주동근 · {anatomyMuscleRoles?.primary.join(" · ") || "-"}
                </span>
                <span className="supporting">
                  협응근 · {anatomyMuscleRoles?.supporting.join(" · ") || "-"}
                </span>
              </div>
            )}
            <div className="related-list">
              <div className="related-list-head">
                <div>
                  <p className="small-label">
                    {selectedAnatomyRegions.length > 1
                      ? "COMPOUND EXERCISES"
                      : "RELATED EXERCISES"}
                  </p>
                  <b>
                    {selectedAnatomyRegions.length
                      ? selectedAnatomyRegions.join(" · ")
                      : activeRegion}{" "}
                    비교
                  </b>
                </div>
                <span aria-label="선택 부위 운동 비교 요약">
                  공통 자극 · {regionExercises.length}개
                </span>
              </div>
              {regionExercises.length ? (
                <div className="anatomy-exercise-list">
                  {regionExercises.slice(0, 16).map(exercise => (
                    <button
                      key={exercise.id}
                      onClick={() => onOpenExercise(exercise)}
                    >
                      <span>{exercise.category}</span>
                      <b>{exercise.name}</b>
                      <ArrowRight size={15} />
                    </button>
                  ))}
                </div>
              ) : (
                <p className="anatomy-list-empty">
                  이 조합을 함께 자극하는 운동을 찾지 못했습니다. 한 부위를
                  해제하거나 다른 조합을 선택해 보세요.
                </p>
              )}
            </div>
            <div className="safety-callout">
              <ShieldCheck size={18} />
              <p>
                <strong>안전한 탐색</strong>
                <br />
                날카로운 통증, 저림, 근력 저하, 외상 후 변화는 자가 관리보다
                의료 평가를 우선하세요.
              </p>
            </div>
          </div>
        </div>
        <div className="recovery-card">
          <div>
            <p className="eyebrow">RECOVERY GUIDE · {activeRegion}</p>
            <h3>{recovery.title}</h3>
            <p>{recovery.intro}</p>
          </div>
          <ol>
            {recovery.steps.map((step, index) => (
              <li key={step}>
                <span>0{index + 1}</span>
                {step}
              </li>
            ))}
          </ol>
          <div className="recovery-caution">
            <HeartPulse size={17} /> {recovery.caution}
          </div>
        </div>
        <RecoveryProtocolPanel region={activeRegion} />
        <RecoveryPathwayPanel
          pathways={recoveryPathways}
          pathway={activeRecoveryPathway}
          alternatives={pathwayAlternatives}
          onChoose={onChoosePathway}
          onExplore={onExploreAlternative}
        />
      </section>
    </section>
  );
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
  return (
    <section
      className="recovery-toolkit"
      aria-label={`${region} 회복 방법 상세`}
    >
      <div className="toolkit-heading">
        <p className="eyebrow">RECOVERY TOOLKIT</p>
        <h3>도구보다, 반응을 먼저 확인하세요.</h3>
        <p>
          아래 내용은 일반 교육용입니다. 통증을 치료하려 하기보다
          불편감·피로·기능 변화를 관찰하며 부하를 조절하세요.
        </p>
      </div>
      <RecoveryStageGrid stages={stages} />
      <div className="toolkit-grid">
        {groups.map(([label, steps]) => (
          <article key={label}>
            <p className="small-label">{label}</p>
            <ul>
              {steps.map(step => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <div className="toolkit-red-flags">
        <ShieldCheck size={17} />
        <div>
          <p className="small-label">
            즉시 자가 관리를 멈추고 평가가 필요한 신호
          </p>
          <ul>
            {protocol.redFlags.map(flag => (
              <li key={flag}>{flag}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
