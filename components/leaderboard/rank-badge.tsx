import { cn } from "@/lib/utils";
import type { Rank } from "@/types/database";
import { motion } from "framer-motion";
import { Star, Code, Cpu, Crown, Sparkles, Zap } from "lucide-react";

interface RankBadgeProps {
  rank: Rank;
  className?: string;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
}

const rankConfig: Record<
  Rank,
  { 
    label: string; 
    icon: typeof Star;
    gradient: string; 
    textClass: string; 
    borderClass: string;
    bgGlow: string;
    description: string;
  }
> = {
  novice: {
    label: "Novice",
    icon: Star,
    gradient: "from-slate-500/20 to-slate-600/20",
    textClass: "text-slate-400",
    borderClass: "border-slate-500/30",
    bgGlow: "shadow-slate-500/20",
    description: "Neu gestartet",
  },
  coder: {
    label: "Coder",
    icon: Code,
    gradient: "from-cyan-500/20 to-sky-500/20",
    textClass: "text-cyan-400",
    borderClass: "border-cyan-500/30",
    bgGlow: "shadow-cyan-500/20",
    description: "Grundlagen gemeistert",
  },
  developer: {
    label: "Developer",
    icon: Cpu,
    gradient: "from-emerald-500/20 to-green-500/20",
    textClass: "text-emerald-400",
    borderClass: "border-emerald-500/30",
    bgGlow: "shadow-emerald-500/20",
    description: "Erfahrener Entwickler",
  },
  architect: {
    label: "Architect",
    icon: Crown,
    gradient: "from-violet-500/20 to-purple-500/20",
    textClass: "text-violet-400",
    borderClass: "border-violet-500/30",
    bgGlow: "shadow-violet-500/20",
    description: "Senior Level",
  },
  master: {
    label: "Master",
    icon: Sparkles,
    gradient: "from-amber-500/20 to-yellow-500/20",
    textClass: "text-amber-400",
    borderClass: "border-amber-500/30",
    bgGlow: "shadow-amber-500/20",
    description: "Experte",
  },
  legend: {
    label: "Legend",
    icon: Zap,
    gradient: "from-rose-500/20 to-pink-500/20",
    textClass: "text-rose-400",
    borderClass: "border-rose-500/30",
    bgGlow: "shadow-rose-500/20",
    description: "Elite Entwickler",
  },
};

const sizeClasses = {
  sm: "px-2 py-0.5 text-[10px] gap-1",
  md: "px-2.5 py-1 text-xs gap-1.5",
  lg: "px-3 py-1.5 text-sm gap-2",
};

const iconSizes = {
  sm: "w-2.5 h-2.5",
  md: "w-3 h-3",
  lg: "w-3.5 h-3.5",
};

export function RankBadge({ rank, className, size = "md", showIcon = true }: RankBadgeProps) {
  const config = rankConfig[rank];
  const Icon = config.icon;

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      className={cn(
        "inline-flex items-center rounded-lg border font-semibold uppercase tracking-wide transition-all duration-200",
        `bg-gradient-to-r ${config.gradient}`,
        config.textClass,
        config.borderClass,
        `hover:shadow-md ${config.bgGlow}`,
        sizeClasses[size],
        className
      )}
    >
      {showIcon && <Icon className={iconSizes[size]} />}
      {config.label}
    </motion.span>
  );
}

export function RankBadgeDetailed({ rank, className }: { rank: Rank; className?: string }) {
  const config = rankConfig[rank];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex items-center gap-3 p-3 rounded-xl border bg-card/50 backdrop-blur-sm transition-all duration-200 hover:shadow-lg",
        config.borderClass,
        className
      )}
    >
      <div className={cn("p-2 rounded-lg bg-gradient-to-br", config.gradient)}>
        <Icon className={cn("w-5 h-5", config.textClass)} />
      </div>
      <div>
        <div className={cn("font-semibold", config.textClass)}>{config.label}</div>
        <div className="text-xs text-muted-foreground">{config.description}</div>
      </div>
    </motion.div>
  );
}
