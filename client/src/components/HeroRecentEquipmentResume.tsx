import { ArrowRight, History } from "lucide-react";

type HeroRecentEquipmentResumeProps = {
  label: string;
  resistance: number;
  onResume: () => void;
};

export function HeroRecentEquipmentResume({
  label,
  resistance,
  onResume,
}: HeroRecentEquipmentResumeProps) {
  return (
    <button
      className="hero-recent-session"
      onClick={onResume}
      aria-label={`최근 ${label} ${resistance}% 설정으로 세션 다시 시작`}
    >
      <History size={15} />
      <span>
        최근 {label} {resistance}%
      </span>
      <b>다시 시작</b>
      <ArrowRight size={15} />
    </button>
  );
}
