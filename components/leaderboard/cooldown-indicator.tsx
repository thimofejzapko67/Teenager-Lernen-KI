'use client';

import { Clock, Trophy, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn, clawGradientText } from '@/lib/utils';

interface CooldownIndicatorProps {
  inCooldown: boolean;
  winCount: number;
  daysRemaining?: number;
  cooldownEndsAt?: string;
}

export function CooldownIndicator({
  inCooldown,
  winCount,
  daysRemaining,
  cooldownEndsAt,
}: CooldownIndicatorProps) {
  if (winCount === 0) {
    return null;
  }

  if (inCooldown) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge variant="outline" className="gap-2 border-orange-500/50 text-orange-400">
              <Clock className="w-3 h-3" />
              Cooldown: {daysRemaining}d left
            </Badge>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            <div className="space-y-2">
              <p className="font-semibold">You are in cooldown!</p>
              <p className="text-sm">
                After achieving 3 leaderboard wins, you enter a 1-month cooldown period.
                This allows others to compete at the top level.
              </p>
              <p className="text-sm text-muted-foreground">
                Cooldown ends: {cooldownEndsAt ? new Date(cooldownEndsAt).toLocaleDateString() : 'N/A'}
              </p>
              <p className="text-xs text-muted-foreground">
                You can still be scouted by sponsors during cooldown!
              </p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  // Not in cooldown but has wins
  const winsUntilCooldown = 3 - winCount;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant="outline" className={cn(
            'gap-2',
            winCount >= 2 && 'border-yellow-500/50 text-yellow-400'
          )}>
            <Trophy className="w-3 h-3" />
            {winCount} win{winCount !== 1 ? 's' : ''}
          </Badge>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <div className="space-y-2">
            <p className="font-semibold flex items-center gap-2">
              <Info className="w-4 h-4" />
              Cooldown Progress
            </p>
            <p className="text-sm">
              After 3 leaderboard wins, you enter a 1-month cooldown period.
              This ensures fair competition for all players.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <div className="flex gap-1">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={cn(
                      'w-8 h-2 rounded-full',
                      i <= winCount ? 'bg-primary' : 'bg-muted'
                    )}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                {winsUntilCooldown} more win{winsUntilCooldown !== 1 ? 's' : ''} needed
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Your wins still count towards sponsor scouting!
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
