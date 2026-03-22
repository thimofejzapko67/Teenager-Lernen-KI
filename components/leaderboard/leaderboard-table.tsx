"use client";

import { MedalBadge } from "./medal-badge";
import { RankBadge } from "./rank-badge";
import { cn, formatXP } from "@/lib/utils";
import type { LeaderboardEntry } from "@/lib/leaderboard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  isLoading?: boolean;
}

interface RankChangeIndicatorProps {
  change?: number;
}

function RankChangeIndicator({ change }: RankChangeIndicatorProps) {
  if (change === undefined) return null;

  if (change > 0) {
    return (
      <span className="text-emerald-400 text-xs font-medium" title={`${change} Plätze aufgestiegen`}>
        +{change}
      </span>
    );
  }

  if (change < 0) {
    return (
      <span className="text-red-400 text-xs font-medium" title={`${Math.abs(change)} Plätze abgestiegen`}>
        {change}
      </span>
    );
  }

  return <span className="text-muted-foreground text-xs">-</span>;
}

function SkeletonRow() {
  return (
    <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-4 py-3 border-b border-border/30 items-center">
      <div className="w-8 h-8 bg-muted/50 rounded animate-pulse" />
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-muted/50 rounded-full animate-pulse" />
        <div className="w-32 h-4 bg-muted/50 rounded animate-pulse" />
      </div>
      <div className="w-20 h-4 bg-muted/50 rounded animate-pulse" />
      <div className="w-16 h-4 bg-muted/50 rounded animate-pulse" />
      <div className="w-24 h-6 bg-muted/50 rounded animate-pulse" />
    </div>
  );
}

export function LeaderboardTable({ entries, isLoading }: LeaderboardTableProps) {
  if (isLoading) {
    return (
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-4 py-3 border-b border-border/50 bg-muted/30 text-sm font-medium text-muted-foreground">
          <div className="w-8">#</div>
          <div>User</div>
          <div className="text-right">XP</div>
          <div className="text-right">Level</div>
          <div className="text-right">Rang</div>
        </div>
        {Array.from({ length: 10 }).map((_, i) => (
          <SkeletonRow key={i} />
        ))}
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-12 text-center">
        <p className="text-muted-foreground">Keine Einträge gefunden.</p>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-4 py-3 border-b border-border/50 bg-muted/30 text-sm font-medium text-muted-foreground uppercase tracking-wider text-xs">
        <div className="w-8">#</div>
        <div>Entwickler</div>
        <div className="text-right">XP</div>
        <div className="text-right">Level</div>
        <div className="text-right">Rang</div>
      </div>

      {/* Rows */}
      <div>
        {entries.map((entry, i) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.03, duration: 0.3 }}
            className={cn(
              "grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-4 py-3 border-b border-border/30 items-center transition-colors",
              entry.is_current_user && "bg-primary/10 border-l-2 border-l-primary",
              !entry.is_current_user && entry.rank <= 3 && "bg-primary/[0.03]",
              !entry.is_current_user && "hover:bg-muted/20"
            )}
          >
            {/* Rank Column */}
            <div className="flex items-center gap-2 w-8">
              <MedalBadge rank={entry.rank} />
              {(entry.rank > 3 || entry.is_current_user) && (
                <span
                  className={cn(
                    "text-sm font-mono font-bold text-center",
                    entry.rank <= 3 || entry.is_current_user ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {entry.rank}
                </span>
              )}
            </div>

            {/* User Column */}
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border border-border/50">
                <AvatarImage src={entry.avatar_url || undefined} alt={entry.username} />
                <AvatarFallback className="bg-gradient-to-br from-primary/20 to-violet-500/20 text-primary text-sm font-medium">
                  {entry.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col min-w-0">
                <span
                  className={cn(
                    "font-medium truncate",
                    entry.is_current_user && "text-primary",
                    entry.rank <= 3 && !entry.is_current_user && "text-foreground"
                  )}
                >
                  {entry.username}
                  {entry.is_current_user && (
                    <span className="ml-2 text-xs text-primary/70">(Du)</span>
                  )}
                </span>
                <RankChangeIndicator change={entry.rank_change} />
              </div>
            </div>

            {/* XP Column */}
            <div className="text-right font-mono text-sm">
              <span
                className={cn(
                  (entry.rank <= 3 || entry.is_current_user) && "text-primary font-semibold"
                )}
              >
                {formatXP(entry.xp)}
              </span>
              <span className="text-muted-foreground ml-1 text-xs">XP</span>
            </div>

            {/* Level Column */}
            <div className="text-right">
              <span
                className={cn(
                  "inline-flex items-center justify-center w-10 h-6 rounded-full text-sm font-medium",
                  (entry.rank <= 3 || entry.is_current_user)
                    ? "bg-primary/20 text-primary"
                    : "bg-muted/30 text-muted-foreground"
                )}
              >
                {entry.level}
              </span>
            </div>

            {/* Rank Badge Column */}
            <div className="text-right">
              <RankBadge rank={entry.rank_tier} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
