import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { WellnessDetailPanel } from "@/components/GuidancePanels";
import { SectionTitle } from "@/components/SectionPrimitives";
import { aerobicIntervalTemplates } from "@/lib/aerobicIntervals";
import { wellnessCards } from "@/lib/catalogContent";
import { lifeStageGuides, startChecklist } from "@/lib/lifeStageGuidance";
import { lowNoiseCircuitTemplates } from "@/lib/lowNoiseCircuits";
import { wellnessDetails } from "@/lib/wellnessDetails";

/** 이 장면은 정적인 교육 자료만 담는다. Home 의 상태를 읽지 않는다. */
export function WellnessScene() {
  return (
    <section className="scene-view scene-view-wellness">
      <section id="wellness" className="wellness-section section-pad">
        <SectionTitle
          eyebrow="WHOLE-PERSON WELLNESS"
          title="회복도 훈련의 일부입니다."
          description="영양, 수면, 열 노출은 운동을 대체하는 비법이 아니라, 일관된 훈련을 지지하는 생활 습관의 일부로 다룹니다."
        />
        <div className="wellness-grid">
          {wellnessCards.map((card, index) => (
            <WellnessCard key={card.title} card={card} index={index} />
          ))}
        </div>
      </section>

      <section id="cardio-intervals" className="interval-section section-pad">
        <SectionTitle
          eyebrow="CARDIO INTERVALS"
          title="종목에 맞춰, 숨이 무너지기 전에 낮춥니다."
          description="모든 템플릿은 입문·회복 우선의 출발점입니다. 말하기 검사와 RPE가 계획보다 우선하며, 통증·어지러움·비정상적 숨참은 중단 신호입니다."
        />
        <div className="interval-grid">
          {aerobicIntervalTemplates.map(template => (
            <article className="interval-card" key={template.id}>
              <p className="small-label">{template.format}</p>
              <h3>{template.title}</h3>
              <dl>
                <div>
                  <dt>준비</dt>
                  <dd>{template.warmup}</dd>
                </div>
                <div>
                  <dt>작업</dt>
                  <dd>{template.work}</dd>
                </div>
                <div>
                  <dt>회복</dt>
                  <dd>{template.recovery}</dd>
                </div>
              </dl>
              <p className="interval-rpe">{template.rpe}</p>
              <p>{template.adjust}</p>
              <p className="interval-safety">
                <ShieldCheck size={14} /> {template.safety}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="quiet-circuits" className="interval-section section-pad">
        <SectionTitle
          eyebrow="QUIET HOME CIRCUITS"
          title="바닥 충격을 낮추고, 리듬은 이어갑니다."
          description="아파트·공유 주거 환경을 고려한 무점프 전신 서킷입니다. 발소리·호흡·자세 중 하나라도 통제되지 않으면 보폭·반복·라운드를 먼저 줄이세요."
        />
        <div className="interval-grid">
          {lowNoiseCircuitTemplates.map(template => (
            <article className="interval-card" key={template.id}>
              <p className="small-label">{template.format}</p>
              <h3>{template.title}</h3>
              <dl>
                <div>
                  <dt>소음</dt>
                  <dd>{template.noise}</dd>
                </div>
                <div>
                  <dt>공간</dt>
                  <dd>{template.space}</dd>
                </div>
                <div>
                  <dt>구성</dt>
                  <dd>{template.blocks.join(" · ")}</dd>
                </div>
              </dl>
              <p className="interval-rpe">{template.intensity}</p>
              <p>{template.adjust}</p>
              <p className="interval-safety">
                <ShieldCheck size={14} /> {template.safety}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="start-safely" className="life-stage-section section-pad">
        <SectionTitle
          eyebrow="START SAFELY"
          title="시작 조건을 먼저 맞추고, 한 번에 하나만 조절합니다."
          description="이 안내는 개인 진단·치료·운동 처방이 아닌 일반 정보입니다. 임신·산후 상태, 질환, 수술·부상 이력 또는 새 증상은 의료진의 안내를 우선하세요."
        />
        <div className="start-checklist">
          <h3>운동 시작 전 5가지 확인</h3>
          <ul>
            {startChecklist.map(item => (
              <li key={item}>
                <Check size={15} />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="life-stage-grid">
          {lifeStageGuides.map(guide => (
            <article key={guide.id}>
              <p className="eyebrow">GENERAL STARTING POINT</p>
              <h3>{guide.title}</h3>
              <p>{guide.scope}</p>
              <h4>시작</h4>
              <ul>
                {guide.start.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <h4>조절</h4>
              <ul>
                {guide.adjust.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="life-stage-stop">
                <ShieldCheck size={14} /> {guide.stop.join(" · ")}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="evidence-section">
        <div>
          <BookOpen size={21} />
          <p className="eyebrow">EVIDENCE FIRST</p>
          <h2>
            근거를 남기고,
            <br />
            한계를 함께 말합니다.
          </h2>
        </div>
        <div>
          <p>
            Fit Atlas는 운동 항목마다 공공 보건 지침 또는 전문 기관의 출처를
            연결합니다. 권고량은 일반적 참고 정보이며 개인별 질환, 임신·산후
            상태, 부상 이력, 복용 약물을 대체 평가하지 않습니다.
          </p>
          <a
            href="https://www.who.int/news-room/fact-sheets/detail/physical-activity"
            target="_blank"
            rel="noreferrer"
          >
            WHO 신체 활동 권고 보기 <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </section>
  );
}

function WellnessCard({
  card,
  index,
}: {
  card: (typeof wellnessCards)[number];
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const detail = wellnessDetails[card.title];
  const detailId = `wellness-detail-${index}`;
  return (
    <article
      className={`wellness-card tone-${card.tone}${expanded ? " is-expanded" : ""}`}
    >
      <span className="wellness-index">
        {String(index + 1).padStart(2, "0")}
      </span>
      <p className="eyebrow">{card.eyebrow}</p>
      <h3>{card.title}</h3>
      <p>{card.text}</p>
      {expanded && (
        <div id={detailId} className="wellness-detail-region">
          <WellnessDetailPanel detail={detail} />
        </div>
      )}
      <button
        className="wellness-expand"
        aria-expanded={expanded}
        aria-controls={detailId}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "간단히 보기" : "상세 가이드"}
        <ChevronRight size={14} className={expanded ? "rotate-icon" : ""} />
      </button>
      <a href={card.url} target="_blank" rel="noreferrer">
        {card.source} <ArrowRight size={14} />
      </a>
    </article>
  );
}
