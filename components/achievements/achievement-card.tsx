'use client';

import { useState } from 'react';
import { Trophy, Lock, Sparkles } from 'lucide-react';
import { cn, clawGradientText } from '@/lib/utils';
import type { Achievement } from '@/types/database';

interface AchievementCardProps {
  achievement: Achievement & { unlocked: boolean; unlockedAt?: string };
  size?: 'sm' | 'md' | 'lg';
  enableTooltip?: boolean;
}

export function AchievementCard({
  achievement,
  size = 'md',
  enableTooltip = true,
}: AchievementCardProps) {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const sizeClasses = {
    sm: 'w-10 h-10 text-sm',
    md: 'w-16 h-16 text-xl',
    lg: 'w-24 h-24 text-3xl',
  };

  const iconSizes = {
    sm: 16,
    md: 24,
    lg: 36,
  };

  const getRarityColor = (xpBonus: number) => {
    if (xpBonus >= 500) return 'from-yellow-400 via-orange-500 to-red-500';
    if (xpBonus >= 200) return 'from-purple-400 via-pink-500 to-red-500';
    if (xpBonus >= 100) return 'from-blue-400 via-cyan-500 to-teal-500';
    return 'from-gray-400 via-slate-500 to-zinc-600';
  };

  const rarityGradient = getRarityColor(achievement.xp_bonus);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => enableTooltip && setTooltipVisible(true)}
      onMouseLeave={() => setTooltipVisible(false)}
    >
      <div
        className={cn(
          'relative flex items-center justify-center rounded-xl transition-all duration-300',
          sizeClasses[size],
          achievement.unlocked
            ? `bg-gradient-to-br ${rarityGradient} shadow-lg shadow-purple-500/20 hover:scale-110 cursor-pointer`
            : 'bg-muted/50 border border-muted-foreground/20 cursor-not-allowed opacity-60'
        )}
      >
        {achievement.unlocked ? (
          <div className="flex items-center justify-center">
            {achievement.icon ? (
              <span className="text-2xl filter drop-shadow-lg">{achievement.icon}</span>
            ) : (
              <Trophy size={iconSizes[size]} className="text-white drop-shadow-lg" />
            )}
          </div>
        ) : (
          <Lock size={iconSizes[size] * 0.6} className="text-muted-foreground" />
        )}

        {achievement.unlocked && achievement.xp_bonus >= 100 && (
          <div className="absolute -top-1 -right-1">
            <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
          </div>
        )}
      </div>

      {enableTooltip && tooltipVisible && (
        <div className="absolute z-50 w-64 p-4 rounded-lg bg-popover border border-border shadow-xl bottom-full left-1/2 -translate-x-1/2 mb-2">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className={cn('font-semibold', clawGradientText)}>
                {achievement.title}
              </h4>
              {achievement.unlocked && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary">
                  +{achievement.xp_bonus} XP
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {achievement.description}
            </p>
            {!achievement.unlocked && (
              <div className="text-xs text-muted-foreground mt-2 pt-2 border-t border-border">
                <Lock className="w-3 h-3 inline mr-1" />
                Not unlocked yet
              </div>
            )}
            {achievement.unlocked && achievement.unlockedAt && (
              <div className="text-xs text-muted-foreground mt-2 pt-2 border-t border-border">
                Unlocked {new Date(achievement.unlockedAt).toLocaleDateString('de-DE')}
              </div>
            )}
          </div>
          <div className="absolute w-2 h-2 bg-popover border-l border-b border-border rotate-45 bottom-[-5px] left-1/2 -translate-x-1/2" />
        </div>
      )}
    </div>
  );
}
