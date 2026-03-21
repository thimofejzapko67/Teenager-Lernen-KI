'use client';

import { Trophy, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Achievement } from '@/types/database';
import { AchievementCard } from './achievement-card';

interface AchievementsGridProps {
  achievements: (Achievement & { unlocked: boolean; unlockedAt?: string })[];
  size?: 'sm' | 'md' | 'lg';
  enableLocked?: boolean;
  className?: string;
}

export function AchievementsGrid({
  achievements,
  size = 'md',
  enableLocked = true,
  className,
}: AchievementsGridProps) {
  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalCount = achievements.length;
  const completionPercent = totalCount > 0 ? (unlockedCount / totalCount) * 100 : 0;

  const grouped = {
    legendary: achievements.filter((a) => a.xp_bonus >= 500),
    epic: achievements.filter((a) => a.xp_bonus >= 200 && a.xp_bonus < 500),
    rare: achievements.filter((a) => a.xp_bonus >= 100 && a.xp_bonus < 200),
    common: achievements.filter((a) => a.xp_bonus < 100),
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Stats */}
      <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border">
        <div className="flex items-center gap-3">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <span className="font-semibold">
            {unlockedCount} / {totalCount} Achievements
          </span>
        </div>
        <div className="text-sm text-muted-foreground">
          {completionPercent.toFixed(0)}% Complete
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-500"
          style={{ width: `${completionPercent}%` }}
        />
      </div>

      {/* Legendary */}
      {grouped.legendary.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-yellow-500 flex items-center gap-2">
            <SparklesIcon />
            Legendary
          </h3>
          <div className="flex flex-wrap gap-3">
            {grouped.legendary.map((achievement) => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                size={size}
              />
            ))}
          </div>
        </div>
      )}

      {/* Epic */}
      {grouped.epic.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-purple-500 flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            Epic
          </h3>
          <div className="flex flex-wrap gap-3">
            {grouped.epic.map((achievement) => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                size={size}
              />
            ))}
          </div>
        </div>
      )}

      {/* Rare */}
      {grouped.rare.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-cyan-500 flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            Rare
          </h3>
          <div className="flex flex-wrap gap-3">
            {grouped.rare.map((achievement) => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                size={size}
              />
            ))}
          </div>
        </div>
      )}

      {/* Common */}
      {grouped.common.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            Common
          </h3>
          <div className="flex flex-wrap gap-3">
            {grouped.common.map((achievement) => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                size={size}
              />
            ))}
          </div>
        </div>
      )}

      {/* Locked indicator */}
      {enableLocked && achievements.some((a) => !a.unlocked) && (
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground pt-4">
          <Lock className="w-4 h-4" />
          <span>{achievements.filter((a) => !a.unlocked).length} locked achievements</span>
        </div>
      )}
    </div>
  );
}

function SparklesIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-4 h-4"
    >
      <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
    </svg>
  );
}
