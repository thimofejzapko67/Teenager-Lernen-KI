import { cn } from "@/lib/utils";

interface MedalBadgeProps {
  rank: number;
  className?: string;
}

export function MedalBadge({ rank, className }: MedalBadgeProps) {
  if (rank === 1) {
    return (
      <span className={cn("text-2xl", className)} role="img" aria-label="Gold medal">
        🥇
      </span>
    );
  }

  if (rank === 2) {
    return (
      <span className={cn("text-2xl", className)} role="img" aria-label="Silver medal">
        🥈
      </span>
    );
  }

  if (rank === 3) {
    return (
      <span className={cn("text-2xl", className)} role="img" aria-label="Bronze medal">
        🥉
      </span>
    );
  }

  return null;
}
