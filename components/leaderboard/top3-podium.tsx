"use client";

import { motion } from "framer-motion";
import { Crown, Medal, Award, Flame, TrendingUp, TrendingDown } from "lucide-react";
import { cn, formatXP } from "@/lib/utils";
import { RankBadge } from "./rank-badge";
import type { LeaderboardEntry } from "@/lib/leaderboard";
import Link from "next/link";

interface Top3PodiumProps {
  entries: LeaderboardEntry[];
}

function PodiumCard({ entry, position, delay }: { entry: LeaderboardEntry; position: 1 | 2 | 3; delay: number }) {
  const positionConfig = {
    1: {
      height: "h-36",
      order: "md:order-2",
      scale: "md:scale-110 md:z-10",
      bg: "from-amber-500/20 via-yellow-500/10 to-transparent",
      border: "border-amber-500/30",
      icon: Crown,
      iconColor: "text-amber-400",
      podiumBg: "bg-gradient-to-t from-amber-500/30 to-amber-500/10",
      shadowColor: "shadow-amber-500/20",
    },
    2: {
      height: "h-28",
      order: "md:order-1",
      scale: "",
      bg: "from-slate-400/20 via-slate-300/10 to-transparent",
      border: "border-slate-400/30",
      icon: Medal,
      iconColor: "text-slate-300",
      podiumBg: "bg-gradient-to-t from-slate-400/30 to-slate-400/10",
      shadowColor: "shadow-slate-400/20",
    },
    3: {
      height: "h-24",
      order: "md:order-3",
      scale: "",
      bg: "from-amber-700/20 via-amber-600/10 to-transparent",
      border: "border-amber-700/30",
      icon: Award,
      iconColor: "text-amber-600",
      podiumBg: "bg-gradient-to-t from-amber-700/30 to-amber-700/10",
      shadowColor: "shadow-amber-700/20",
    },
  };

  const config = positionConfig[position];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, type: "spring" }}
      className={cn("flex flex-col items-center", config.order, config.scale)}
    >
      <Link href={`/profile/${entry.username}`} className="group w-full">
        <div
          className={cn(
            "relative flex flex-col items-center p-4 rounded-2xl border backdrop-blur-sm transition-all duration-300",
            "hover:shadow-xl hover:scale-105",
            config.bg,
            config.border,
            config.shadowColor
          )}
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <div
              className={cn(
                "flex items-center justify-center w-7 h-7 rounded-full shadow-lg",
                position === 1 && "bg-gradient-to-br from-amber-300 to-amber-500",
                position === 2 && "bg-gradient-to-br from-slate-200 to-slate-400",
                position === 3 && "bg-gradient-to-br from-amber-600 to-amber-800"
              )}
            >
              <Icon className="w-3.5 h-3.5 text-white" />
            </div>
          </div>

          <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
            {entry.avatar_url}
          </div>

          <span className={cn("font-bold text-sm mb-1 group-hover:text-primary transition-colors", position === 1 && "text-amber-400")}>
            {entry.username}
          </span>

          <RankBadge rank={entry.rank_tier} size="sm" className="mb-2" />

          <div className="flex items-center gap-1 text-sm font-mono">
            <span className={cn("font-bold", position === 1 && "text-amber-400")}>{formatXP(entry.xp)}</span>
            <span className="text-muted-foreground text-xs">XP</span>
          </div>

          {entry.rank_change !== undefined && entry.rank_change !== 0 && (
            <div className={cn("flex items-center gap-0.5 mt-1 text-xs", entry.rank_change > 0 ? "text-emerald-400" : "text-red-400")}>
              {entry.rank_change > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {Math.abs(entry.rank_change)}
            </div>
          )}

          {entry.streak !== undefined && entry.streak > 0 && (
            <div className="flex items-center gap-1 mt-2 text-xs text-orange-400">
              <Flame className="w-3 h-3" />
              {entry.streak} Tage
            </div>
          )}
        </div>
      </Link>

      <div
        className={cn(
          "w-full mt-2 rounded-b-xl flex items-center justify-center font-bold text-xl",
          config.podiumBg,
          config.height
        )}
      >
        <span className={cn("text-3xl font-display", config.iconColor)}>{position}</span>
      </div>
    </motion.div>
  );
}

export function Top3Podium({ entries }: Top3PodiumProps) {
  const top3 = entries.slice(0, 3);

  if (top3.length === 0) return null;

  const ordered = [
    top3[1],
    top3[0],
    top3[2],
  ].filter(Boolean);

  return (
    <div className="flex flex-col md:flex-row items-end justify-center gap-3 md:gap-4 mb-8">
      {ordered.map((entry, index) => {
        const position = index === 0 ? 2 : index === 1 ? 1 : 3;
        return entry ? (
          <PodiumCard
            key={entry.id}
            entry={entry}
            position={position as 1 | 2 | 3}
            delay={0.1 + index * 0.15}
          />
        ) : null;
      })}
    </div>
  );
}
