import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Crown, Medal, Award } from "lucide-react";

interface MedalBadgeProps {
  rank: number;
  className?: string;
  showGlow?: boolean;
}

export function MedalBadge({ rank, className, showGlow = true }: MedalBadgeProps) {
  if (rank === 1) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className={cn("relative", className)}
      >
        {showGlow && (
          <div className="absolute inset-0 bg-amber-400/40 blur-lg rounded-full animate-pulse" />
        )}
        <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 shadow-lg shadow-amber-500/50 border-2 border-amber-300/50">
          <Crown className="w-5 h-5 text-amber-100" />
        </div>
      </motion.div>
    );
  }

  if (rank === 2) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1 }}
        className={cn("relative", className)}
      >
        {showGlow && (
          <div className="absolute inset-0 bg-slate-300/30 blur-lg rounded-full" />
        )}
        <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-slate-200 via-slate-300 to-slate-500 shadow-lg shadow-slate-400/50 border-2 border-slate-200/50">
          <Medal className="w-5 h-5 text-slate-100" />
        </div>
      </motion.div>
    );
  }

  if (rank === 3) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
        className={cn("relative", className)}
      >
        {showGlow && (
          <div className="absolute inset-0 bg-amber-600/30 blur-lg rounded-full" />
        )}
        <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 via-amber-600 to-amber-800 shadow-lg shadow-amber-700/50 border-2 border-amber-500/50">
          <Award className="w-5 h-5 text-amber-100" />
        </div>
      </motion.div>
    );
  }

  return null;
}

export function MedalBadgeCompact({ rank, className }: MedalBadgeProps) {
  const config = {
    1: { emoji: "🥇", glow: "shadow-amber-500/50", bg: "bg-amber-500/10" },
    2: { emoji: "🥈", glow: "shadow-slate-400/50", bg: "bg-slate-400/10" },
    3: { emoji: "🥉", glow: "shadow-amber-700/50", bg: "bg-amber-700/10" },
  };

  const medal = config[rank as keyof typeof config];
  if (!medal) return null;

  return (
    <span className={cn("text-xl drop-shadow-lg", className)} role="img">
      {medal.emoji}
    </span>
  );
}
