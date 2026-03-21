'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AchievementWithUnlocked } from '@/types/database';
import { Lock, Trophy } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface AchievementsSectionProps {
  achievements: AchievementWithUnlocked[];
}

export function AchievementsSection({ achievements }: AchievementsSectionProps) {
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');

  const filteredAchievements = achievements.filter(achievement => {
    if (filter === 'all') return true;
    if (filter === 'unlocked') return achievement.is_unlocked;
    if (filter === 'locked') return !achievement.is_unlocked;
    return true;
  });

  const unlockedCount = achievements.filter(a => a.is_unlocked).length;
  const lockedCount = achievements.length - unlockedCount;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1 },
  };

  return (
    <Card className="glass-card neon-border">
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <CardTitle className="flex items-center gap-2 font-display">
            <Trophy className="h-5 w-5 text-primary" />
            Achievements
          </CardTitle>
          <div className="flex gap-2">
            <Badge
              variant={filter === 'all' ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setFilter('all')}
            >
              All ({achievements.length})
            </Badge>
            <Badge
              variant={filter === 'unlocked' ? 'default' : 'outline'}
              className="cursor-pointer bg-green-600 hover:bg-green-700"
              onClick={() => setFilter('unlocked')}
            >
              Unlocked ({unlockedCount})
            </Badge>
            <Badge
              variant={filter === 'locked' ? 'default' : 'outline'}
              className="cursor-pointer bg-gray-600 hover:bg-gray-700"
              onClick={() => setFilter('locked')}
            >
              Locked ({lockedCount})
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {filteredAchievements.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Lock className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No achievements found for this filter</p>
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filteredAchievements.map((achievement, index) => (
              <motion.div key={achievement.id} variants={item}>
                <AchievementCard achievement={achievement} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}

interface AchievementCardProps {
  achievement: AchievementWithUnlocked;
}

function AchievementCard({ achievement }: AchievementCardProps) {
  const isUnlocked = achievement.is_unlocked;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={`
              relative p-4 rounded-xl border transition-all duration-300
              ${isUnlocked
                ? 'bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20'
                : 'bg-muted/30 border-border/50 opacity-60'
              }
              group cursor-help
            `}
          >
            {/* Lock Icon for Locked Achievements */}
            {!isUnlocked && (
              <div className="absolute top-2 right-2">
                <Lock className="h-4 w-4 text-muted-foreground" />
              </div>
            )}

            {/* Icon */}
            <div className={`text-4xl mb-3 ${isUnlocked ? 'grayscale-0' : 'grayscale'}`}>
              {achievement.icon}
            </div>

            {/* Title */}
            <h3 className={`font-semibold font-display ${isUnlocked ? 'text-foreground' : 'text-muted-foreground'}`}>
              {achievement.title}
            </h3>

            {/* XP Bonus Badge */}
            {isUnlocked && achievement.xp_bonus > 0 && (
              <Badge className="mt-2 bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs">
                +{achievement.xp_bonus} XP
              </Badge>
            )}

            {/* Unlocked Date */}
            {isUnlocked && achievement.unlocked_at && (
              <p className="text-xs text-muted-foreground mt-2">
                Unlocked {new Date(achievement.unlocked_at).toLocaleDateString('de-DE')}
              </p>
            )}

            {/* Hover Glow Effect */}
            <div
              className={`
                absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none
                ${isUnlocked ? 'bg-gradient-to-br from-primary/5 to-secondary/5' : ''}
              `}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          className="max-w-xs bg-popover border-border text-popover-foreground"
        >
          <div className="space-y-1">
            <p className="font-semibold">{achievement.title}</p>
            <p className="text-sm text-muted-foreground">{achievement.description}</p>
            {!isUnlocked && (
              <p className="text-xs text-primary mt-2">
                Keep learning to unlock this achievement!
              </p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
