import { Card, CardContent } from "@/components/ui/card";

interface StreakDisplayProps {
  currentStreak: number;
}

export function StreakDisplay({ currentStreak }: StreakDisplayProps) {
  const bonusXP = currentStreak >= 7 ? 100 : currentStreak >= 3 ? 30 : 0;

  return (
    <Card className="glass-card border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-transparent">
      <CardContent className="flex items-center gap-4 p-6">
        <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-500 shadow-lg shadow-orange-500/40">
          <span
            className={`text-3xl ${currentStreak >= 3 ? "animate-pulse" : ""}`}
            role="img"
            aria-label="fire"
          >
            🔥
          </span>
          {currentStreak >= 7 && (
            <div className="absolute -inset-1 rounded-full bg-orange-500/20 animate-ping" />
          )}
        </div>

        <div className="flex-1 space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-display font-bold text-orange-400">
              {currentStreak}
            </span>
            <span className="text-lg text-muted-foreground">day streak</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {currentStreak === 0
              ? "Start learning today to build your streak!"
              : currentStreak === 1
                ? "Day 1 - Keep it going!"
                : `Day ${currentStreak} - You're on fire!`}
          </p>
        </div>

        {bonusXP > 0 && (
          <div className="flex shrink-0 flex-col items-end gap-1">
            <div className="rounded-lg bg-green-500/20 px-3 py-1.5 border border-green-500/30">
              <span className="text-sm font-semibold text-green-400">+{bonusXP} XP</span>
            </div>
            <span className="text-xs text-muted-foreground">
              {currentStreak >= 7 ? "7-day bonus" : "3-day bonus"}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
