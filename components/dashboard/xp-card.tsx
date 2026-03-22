import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Rank } from "@/types/database";

interface XPCardProps {
  rank: Rank;
  level: number;
  currentXP: number;
  xpToNextLevel: number;
}

const RANK_CONFIG: Record<
  Rank,
  { color: string; label: string; emoji: string; bgClass: string; textClass: string; borderClass: string }
> = {
  novice: {
    color: "#94A3B8",
    label: "Novice",
    emoji: "🌱",
    bgClass: "bg-slate-500/20",
    textClass: "text-slate-400",
    borderClass: "border-slate-500/30",
  },
  coder: {
    color: "#22D3EE",
    label: "Coder",
    emoji: "📚",
    bgClass: "bg-cyan-500/20",
    textClass: "text-cyan-400",
    borderClass: "border-cyan-500/30",
  },
  developer: {
    color: "#22C55E",
    label: "Developer",
    emoji: "⚡",
    bgClass: "bg-green-500/20",
    textClass: "text-green-400",
    borderClass: "border-green-500/30",
  },
  architect: {
    color: "#A855F7",
    label: "Architect",
    emoji: "🎯",
    bgClass: "bg-primary/20",
    textClass: "text-primary",
    borderClass: "border-primary/30",
  },
  master: {
    color: "#F59E0B",
    label: "Master",
    emoji: "👑",
    bgClass: "bg-amber-500/20",
    textClass: "text-amber-400",
    borderClass: "border-amber-500/30",
  },
  legend: {
    color: "#EF4444",
    label: "Legend",
    emoji: "🔥",
    bgClass: "bg-red-500/20",
    textClass: "text-red-400",
    borderClass: "border-red-500/30",
  },
};

export function XPCard({ rank, level, currentXP, xpToNextLevel }: XPCardProps) {
  const rankConfig = RANK_CONFIG[rank];
  const progress = Math.min((currentXP / xpToNextLevel) * 100, 100);
  const xpRemaining = Math.max(xpToNextLevel - currentXP, 0);

  return (
    <Card className="glass-card overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <Badge
            className={`${rankConfig.bgClass} ${rankConfig.textClass} ${rankConfig.borderClass} gap-1.5 px-3 py-1.5 text-sm`}
          >
            <span className="text-base">{rankConfig.emoji}</span>
            {rankConfig.label}
          </Badge>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Level</span>
            <span className="text-2xl font-display font-bold text-primary">
              {level}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Fortschritt</span>
            <span className="font-semibold">
              {currentXP.toLocaleString()} / {xpToNextLevel.toLocaleString()} XP
            </span>
          </div>
          <div className="relative h-4 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            >
              <div className="h-full w-full animate-[shimmer_2s_linear_infinite bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>
          </div>
          {xpRemaining > 0 && (
            <p className="text-right text-xs text-muted-foreground">
              +{xpRemaining.toLocaleString()} XP bis Level-Up ⚡
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
