"use client";

import { cn } from "@/lib/utils";
import { Globe, Calendar, CalendarDays, Users, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export type LeaderboardPeriod = "global" | "week" | "month" | "friends";

interface LeaderboardTabsProps {
  currentPeriod: LeaderboardPeriod;
  onPeriodChange: (period: LeaderboardPeriod) => void;
  disabled?: boolean;
}

const tabs: { id: LeaderboardPeriod; label: string; icon: typeof Globe; description: string }[] = [
  { id: "global", label: "Global", icon: Globe, description: "Alle Zeiten" },
  { id: "week", label: "Woche", icon: Calendar, description: "Diese Woche" },
  { id: "month", label: "Monat", icon: CalendarDays, description: "Dieser Monat" },
  { id: "friends", label: "Freunde", icon: Users, description: "Dein Kreis" },
];

export function LeaderboardTabs({
  currentPeriod,
  onPeriodChange,
  disabled = false,
}: LeaderboardTabsProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentPeriod === tab.id;

          return (
            <motion.button
              key={tab.id}
              onClick={() => onPeriodChange(tab.id)}
              disabled={disabled}
              whileHover={{ scale: disabled ? 1 : 1.02 }}
              whileTap={{ scale: disabled ? 1 : 0.98 }}
              className={cn(
                "relative group flex items-center gap-2.5 px-5 py-3 text-sm font-medium transition-all duration-300 rounded-xl overflow-hidden",
                "focus:outline-none focus:ring-2 focus:ring-primary/50",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                isActive
                  ? "bg-gradient-to-r from-primary via-violet-600 to-purple-600 text-white shadow-lg shadow-primary/25"
                  : "bg-card/60 border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-card/80"
              )}
            >
              <Icon className={cn("w-4 h-4", isActive && "animate-pulse")} />
              <span>{tab.label}</span>
              
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              
              {!isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-violet-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              )}
            </motion.button>
          );
        })}
      </div>

      <motion.div
        key={currentPeriod}
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 text-xs text-muted-foreground"
      >
        <TrendingUp className="w-3 h-3" />
        <span>
          {currentPeriod === "global" && "Alle Entwickler nach gesamter XP sortiert"}
          {currentPeriod === "week" && "Top-Performer dieser Woche"}
          {currentPeriod === "month" && "Beste Entwickler des Monats"}
          {currentPeriod === "friends" && "Vergleiche dich mit deinen Freunden"}
        </span>
      </motion.div>
    </div>
  );
}
