"use client";

import { cn } from "@/lib/utils";

export type LeaderboardPeriod = "global" | "week" | "month" | "friends";

interface LeaderboardTabsProps {
  currentPeriod: LeaderboardPeriod;
  onPeriodChange: (period: LeaderboardPeriod) => void;
  disabled?: boolean;
}

const tabs: { id: LeaderboardPeriod; label: string }[] = [
  { id: "global", label: "Global" },
  { id: "week", label: "This Week" },
  { id: "month", label: "This Month" },
  { id: "friends", label: "Friends" },
];

export function LeaderboardTabs({
  currentPeriod,
  onPeriodChange,
  disabled = false,
}: LeaderboardTabsProps) {
  return (
    <div className="flex flex-wrap gap-2 border-b border-border/50 pb-4">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onPeriodChange(tab.id)}
          disabled={disabled}
          className={cn(
            "relative px-4 py-2 text-sm font-medium transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            currentPeriod === tab.id
              ? "text-primary neon-text"
              : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
          )}
        >
          {tab.label}
          {currentPeriod === tab.id && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent" />
          )}
        </button>
      ))}
    </div>
  );
}
