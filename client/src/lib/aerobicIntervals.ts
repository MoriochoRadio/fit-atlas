export type AerobicIntervalTemplate = {
  id: "run" | "cycle" | "row" | "swim";
  title: string;
  format: string;
  warmup: string;
  work: string;
  recovery: string;
  rpe: string;
  adjust: string;
  safety: string;
};

export const aerobicIntervalTemplates: AerobicIntervalTemplate[] = [
  {
    id: "run",
    title: "걷기·달리기 인터벌",
    format: "총 18–24분",
    warmup: "5분 편안한 걷기",
    work: "느린 달리기 1분",
    recovery: "걷기 2분 · 4–6회",
    rpe: "작업 RPE 5–6 · 짧은 문장은 가능",
    adjust: "대화가 어려우면 달리기 구간을 30초로 낮추거나 걷기를 늘리기",
    safety: "흉통·어지러움·날카로운 통증이 있으면 즉시 중단",
  },
  {
    id: "cycle",
    title: "사이클 리듬 인터벌",
    format: "총 20–26분",
    warmup: "5분 가벼운 페달",
    work: "낮은 저항의 빠른 리듬 1분",
    recovery: "아주 편한 페달 2분 · 4–6회",
    rpe: "작업 RPE 5–6 · 노래는 어렵고 말은 가능",
    adjust: "무릎·허리 불편 또는 호흡 과부하는 저항을 낮추고 회복을 늘리기",
    safety: "어지러움·흉통·비정상적 숨참이 있으면 중단",
  },
  {
    id: "row",
    title: "로잉 기술 인터벌",
    format: "총 16–22분",
    warmup: "4분 낮은 저항·짧은 스트로크",
    work: "매끄러운 스트로크 1분",
    recovery: "아주 낮은 저항 2분 · 4–5회",
    rpe: "작업 RPE 5 · 자세를 말로 설명할 여유",
    adjust:
      "허리가 둥글어지거나 팔로 먼저 당기면 강도 대신 스트로크 길이를 줄이기",
    safety: "허리 통증·어지러움이 있으면 즉시 중단하고 저충격 대안 선택",
  },
  {
    id: "swim",
    title: "수영 짧은 길이 인터벌",
    format: "총 12–20분",
    warmup: "물 밖·얕은 구간에서 호흡 확인",
    work: "편안한 한 길이",
    recovery: "벽에서 45–90초 호흡 · 4–8회",
    rpe: "작업 RPE 4–5 · 숨이 정리된 뒤만 다음 길이",
    adjust: "호흡이 회복되지 않으면 길이 대신 휴식을 늘리고 수중 걷기로 전환",
    safety: "감시 인력·동반자·수심이 확인된 곳에서만, 혼자 하지 않기",
  },
];

export function getIntervalAdjustment(
  template: AerobicIntervalTemplate,
  readiness: "ready" | "reduced"
) {
  return readiness === "reduced"
    ? `${template.adjust}. 컨디션이 낮으면 반복을 1–2회 줄이고 회복 구간을 먼저 늘리세요.`
    : template.adjust;
}
