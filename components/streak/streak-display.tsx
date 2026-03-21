'use client';

import { Flame, Zap } from 'lucide-react';
import { cn, clawGradientText } from '@/lib/utils';

interface StreakDisplayProps {
  streak: number;
  size?: 'sm' | 'md' | 'lg';
  showMultiplier?: boolean;
  className?: string;
}

export function StreakDisplay({
  streak,
  size = 'md',
  showMultiplier = false,
  className,
}: StreakDisplayProps) {
  const sizeClasses = {
    sm: 'text-sm gap-1',
    md: 'text-base gap-2',
    lg: 'text-xl gap-3',
  };

  const iconSizes = {
    sm: 14,
    md: 18,
    lg: 24,
  };

  const getFlameColor = (streak: number) => {
    if (streak >= 30) return 'text-orange-500';
    if (streak >= 14) return 'text-orange-400';
    if (streak >= 7) return 'text-yellow-500';
    if (streak >= 3) return 'text-yellow-400';
    return 'text-gray-400';
  };

  const getMultiplier = () => {
    if (streak >= 30) return '2x';
    if (streak >= 14) return '1.5x';
    if (streak >= 7) return '1.25x';
    if (streak >= 3) return '1.1x';
    return null;
  };

  const multiplier = getMultiplier();

  return (
    <div
      className={cn(
        'flex items-center',
        sizeClasses[size],
        className
      )}
    >
      <div className="relative">
        <Flame
          size={iconSizes[size]}
          className={cn(
            getFlameColor(streak),
            streak >= 3 && 'animate-pulse',
            streak >= 7 && 'drop-shadow-lg',
            streak >= 14 && 'drop-shadow-xl',
            streak >= 30 && 'drop-shadow-2xl'
          )}
        />
        {streak >= 7 && (
          <div className="absolute inset-0 blur-sm bg-current opacity-50 rounded-full" />
        )}
      </div>
      <span
        className={cn(
          'font-bold',
          streak >= 7 ? clawGradientText : 'text-foreground'
        )}
      >
        {streak} day{streak !== 1 ? 's' : ''}
      </span>
      {showMultiplier && multiplier && (
        <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary">
          <Zap className="w-3 h-3" />
          {multiplier} XP
        </span>
      )}
    </div>
  );
}
