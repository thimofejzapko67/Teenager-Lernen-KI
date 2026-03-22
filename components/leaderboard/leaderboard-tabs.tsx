"use client";

import { cn } from "@/lib/utils";
import { Globe, Calendar, CalendarDays, Users } from "lucide-react";

export type LeaderboardPeriod = "global" | "week" | "month" | "friends";

interface LeaderboardTabsProps {
  currentPeriod: LeaderboardPeriod;
  onPeriodChange: (period: LeaderboardPeriod) => void;
  disabled?: boolean;
}

const tabs: { id: LeaderboardPeriod; label: string; icon: typeof Globe }[] = [
  { id: "global", label: "Global", icon: Globe },
  { id: "week", label: "Diese Woche", icon: Calendar },
  { id: "month", label: "Dieser Monat", icon: CalendarDays },
  { id: "friends", label: "Freunde", icon: Users },
];

export function LeaderboardTabs({
  currentPeriod,
  onPeriodChange,
  disabled = false,
}: LeaderboardTabsProps) {
  return (
    <div className="flex flex-wrap gap-2 border-b border-border/50 pb-4">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentPeriod === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onPeriodChange(tab.id)}
            disabled={disabled}
            className={cn(
              "relative flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all duration-200 rounded-xl",
              "focus:outline-none focus:ring-2 focus:ring-primary/50",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              isActive
                ? "bg-gradient-to-r from-primary to-violet-600 text-white shadow-lg shadow-primary/30"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
          >
            <Icon className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
