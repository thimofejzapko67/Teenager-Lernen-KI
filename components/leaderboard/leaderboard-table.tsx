"use client";

import { MedalBadgeCompact } from "./medal-badge";
import { RankBadge } from "./rank-badge";
import { cn, formatXP } from "@/lib/utils";
import type { LeaderboardEntry } from "@/lib/leaderboard";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Flame, TrendingUp, TrendingDown, Minus, ExternalLink, ChevronRight } from "lucide-react";

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  isLoading?: boolean;
  showTop3?: boolean;
}

function RankChangeIndicator({ change }: { change?: number }) {
  if (change === undefined || change === 0) {
    return (
      <div className="flex items-center gap-0.5 text-muted-foreground/60">
        <Minus className="w-3 h-3" />
        <span className="text-xs">0</span>
      </div>
    );
  }

  if (change > 0) {
    return (
      <div className="flex items-center gap-0.5 text-emerald-400">
        <TrendingUp className="w-3 h-3" />
        <span className="text-xs font-medium">+{change}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-0.5 text-red-400">
      <TrendingDown className="w-3 h-3" />
      <span className="text-xs font-medium">{change}</span>
    </div>
  );
}

function SkeletonRow() {
  return (
    <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-4 py-3 border-b border-border/30 items-center">
      <div className="w-8 h-8 bg-muted/50 rounded-lg animate-pulse" />
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-muted/50 rounded-full animate-pulse" />
        <div className="space-y-2">
          <div className="w-32 h-4 bg-muted/50 rounded animate-pulse" />
          <div className="w-16 h-3 bg-muted/50 rounded animate-pulse" />
        </div>
      </div>
      <div className="w-20 h-4 bg-muted/50 rounded animate-pulse" />
      <div className="w-16 h-4 bg-muted/50 rounded animate-pulse" />
      <div className="w-24 h-6 bg-muted/50 rounded animate-pulse" />
    </div>
  );
}

export function LeaderboardTable({ entries, isLoading, showTop3 = true }: LeaderboardTableProps) {
  const displayEntries = showTop3 ? entries.slice(3) : entries;
  const top3 = entries.slice(0, 3);

  if (isLoading) {
    return (
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-4 py-3 border-b border-border/50 bg-muted/30 text-sm font-medium text-muted-foreground">
          <div className="w-8">#</div>
          <div>Entwickler</div>
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
        <p className="text-muted-foreground">Noch keine Einträge vorhanden.</p>
        <p className="text-sm text-muted-foreground/60 mt-2">Sei der Erste auf der Rangliste!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {showTop3 && top3.length === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass-card rounded-2xl p-6 border border-amber-500/20 bg-gradient-to-b from-amber-500/5 to-transparent"
          >
            <div className="flex items-center justify-center gap-6">
              {top3.map((entry, index) => {
                const positions = [2, 1, 3];
                const position = positions[index];
                return (
                  <div key={entry.id} className="flex items-center gap-3">
                    <div className="flex flex-col items-center">
                      <div className="text-3xl mb-1">{entry.avatar_url}</div>
                      <MedalBadgeCompact rank={position} />
                      <Link href={`/profile/${entry.username}`} className="mt-1 font-medium text-sm hover:text-primary transition-colors">
                        {entry.username}
                      </Link>
                      <div className="text-xs text-muted-foreground font-mono">{formatXP(entry.xp)} XP</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-4 py-3 border-b border-border/50 bg-muted/30 text-sm font-medium text-muted-foreground uppercase tracking-wider text-xs">
          <div className="w-8 text-center">#</div>
          <div>Entwickler</div>
          <div className="text-right">XP</div>
          <div className="text-right">Level</div>
          <div className="text-right">Rang</div>
        </div>

        <div>
          <AnimatePresence>
            {displayEntries.map((entry, i) => {
              const globalIndex = showTop3 ? i + 4 : i + 1;
              return (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ delay: i * 0.02, duration: 0.25 }}
                  layout
                >
                  <Link
                    href={`/profile/${entry.username}`}
                    className={cn(
                      "grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-4 py-3 border-b border-border/30 items-center transition-all duration-200 group",
                      entry.is_current_user && "bg-primary/10 border-l-2 border-l-primary",
                      !entry.is_current_user && entry.rank <= 10 && "bg-primary/[0.02]",
                      !entry.is_current_user && "hover:bg-muted/30"
                    )}
                  >
                    <div className="flex items-center justify-center w-8">
                      <span
                        className={cn(
                          "text-sm font-mono font-bold",
                          entry.is_current_user ? "text-primary" : "text-muted-foreground"
                        )}
                      >
                        {globalIndex}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative">
                        <span className="text-2xl group-hover:scale-110 transition-transform duration-200 inline-block">
                          {entry.avatar_url}
                        </span>
                        {entry.streak !== undefined && entry.streak >= 7 && (
                          <div className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 rounded-full bg-orange-500 text-white text-[8px]">
                            <Flame className="w-2.5 h-2.5" />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              "font-medium truncate group-hover:text-primary transition-colors",
                              entry.is_current_user && "text-primary"
                            )}
                          >
                            {entry.username}
                          </span>
                          {entry.is_current_user && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/20 text-primary">
                              Du
                            </span>
                          )}
                        </div>
                        <RankChangeIndicator change={entry.rank_change} />
                      </div>
                    </div>

                    <div className="text-right font-mono">
                      <div className={cn("text-sm", (entry.rank <= 10 || entry.is_current_user) && "font-semibold text-primary")}>
                        {formatXP(entry.xp)}
                      </div>
                      <div className="text-[10px] text-muted-foreground">XP</div>
                    </div>

                    <div className="text-right">
                      <span
                        className={cn(
                          "inline-flex items-center justify-center w-10 h-7 rounded-lg text-sm font-bold",
                          (entry.rank <= 10 || entry.is_current_user)
                            ? "bg-gradient-to-br from-primary/20 to-primary/20 text-primary border border-primary/20"
                            : "bg-muted/30 text-muted-foreground"
                        )}
                      >
                        {entry.level}
                      </span>
                    </div>

                    <div className="flex items-center justify-end gap-2">
                      <RankBadge rank={entry.rank_tier} size="sm" />
                      <ChevronRight className="w-4 h-4 text-muted-foreground/0 group-hover:text-muted-foreground transition-opacity" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
