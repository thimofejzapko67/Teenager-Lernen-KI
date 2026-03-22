import { cn } from "@/lib/utils";
import type { Rank } from "@/types/database";

interface RankBadgeProps {
  rank: Rank;
  className?: string;
}

const rankConfig: Record<
  Rank,
  { label: string; gradient: string; textClass: string; borderClass: string }
> = {
  novice: {
    label: "Novice",
    gradient: "from-gray-500/20 to-gray-600/20",
    textClass: "text-gray-400",
    borderClass: "border-gray-500/30",
  },
  coder: {
    label: "Coder",
    gradient: "from-cyan-500/20 to-sky-500/20",
    textClass: "text-cyan-400",
    borderClass: "border-cyan-500/30",
  },
  developer: {
    label: "Developer",
    gradient: "from-green-500/20 to-emerald-500/20",
    textClass: "text-green-400",
    borderClass: "border-green-500/30",
  },
  architect: {
    label: "Architect",
    gradient: "from-purple-500/20 to-violet-500/20",
    textClass: "text-purple-400",
    borderClass: "border-purple-500/30",
  },
  master: {
    label: "Master",
    gradient: "from-yellow-500/20 to-amber-500/20",
    textClass: "text-yellow-400",
    borderClass: "border-yellow-500/30",
  },
  legend: {
    label: "Legend",
    gradient: "from-red-500/20 to-pink-500/20",
    textClass: "text-red-400",
    borderClass: "border-red-500/30",
  },
};

export function RankBadge({ rank, className }: RankBadgeProps) {
  const config = rankConfig[rank];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-lg border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide",
        `bg-gradient-to-r ${config.gradient}`,
        config.textClass,
        config.borderClass,
        className
      )}
    >
      {config.label}
    </span>
  );
}
