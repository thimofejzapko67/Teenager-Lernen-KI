import { cn } from "@/lib/utils";
import type { Rank } from "@/types/database";

interface RankBadgeProps {
  rank: Rank;
  className?: string;
}

const rankConfig: Record<
  Rank,
  { label: string; bgClass: string; textClass: string; borderClass: string }
> = {
  novice: {
    label: "Novice",
    bgClass: "bg-gray-500/20",
    textClass: "text-gray-400",
    borderClass: "border-gray-500/50",
  },
  coder: {
    label: "Coder",
    bgClass: "bg-cyan-500/20",
    textClass: "text-cyan-400",
    borderClass: "border-cyan-500/50",
  },
  developer: {
    label: "Developer",
    bgClass: "bg-green-500/20",
    textClass: "text-green-400",
    borderClass: "border-green-500/50",
  },
  architect: {
    label: "Architect",
    bgClass: "bg-purple-500/20",
    textClass: "text-purple-400",
    borderClass: "border-purple-500/50",
  },
  master: {
    label: "Master",
    bgClass: "bg-yellow-500/20",
    textClass: "text-yellow-400",
    borderClass: "border-yellow-500/50",
  },
  legend: {
    label: "Legend",
    bgClass: "bg-red-500/20",
    textClass: "text-red-400",
    borderClass: "border-red-500/50",
  },
};

export function RankBadge({ rank, className }: RankBadgeProps) {
  const config = rankConfig[rank];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide",
        config.bgClass,
        config.textClass,
        config.borderClass,
        className
      )}
    >
      {config.label}
    </span>
  );
}
