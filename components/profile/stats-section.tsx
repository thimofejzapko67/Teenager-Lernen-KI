'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserStats } from '@/types/database';
import { formatXP } from '@/lib/utils';
import { BookOpen, Rocket, Flame, Trophy, Star, Award } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatsSectionProps {
  stats: UserStats | null;
}

export function StatsSection({ stats }: StatsSectionProps) {
  if (!stats) {
    return (
      <Card className="glass-card">
        <CardContent className="p-6">
          <p className="text-muted-foreground text-center">No stats available</p>
        </CardContent>
      </Card>
    );
  }

  const statItems = [
    {
      label: 'Lessons Completed',
      value: stats.lessons_completed,
      icon: BookOpen,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
      borderColor: 'border-blue-400/30',
    },
    {
      label: 'Projects Uploaded',
      value: stats.projects_uploaded,
      icon: Rocket,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
      borderColor: 'border-green-400/30',
    },
    {
      label: 'Current Streak',
      value: `${stats.current_streak} day${stats.current_streak !== 1 ? 's' : ''}`,
      icon: Flame,
      color: 'text-orange-400',
      bgColor: 'bg-orange-400/10',
      borderColor: 'border-orange-400/30',
    },
    {
      label: 'Total XP',
      value: formatXP(stats.total_xp),
      icon: Star,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10',
      borderColor: 'border-yellow-400/30',
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <Card className="glass-card neon-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-display">
          <Trophy className="h-5 w-5 text-primary" />
          Statistics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {statItems.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div key={index} variants={item}>
                <div className={`${stat.bgColor} ${stat.borderColor} border rounded-xl p-4 text-center space-y-2 hover:scale-105 transition-transform`}>
                  <div className={`${stat.color} mx-auto`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="text-2xl font-bold font-display">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Achievement Progress */}
        <div className="mt-6 pt-6 border-t border-border/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground flex items-center gap-2">
              <Award className="h-4 w-4" />
              Achievement Progress
            </span>
            <Badge variant="secondary">
              {stats.achievements_unlocked} / {stats.total_achievements}
            </Badge>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-500"
              style={{
                width: `${stats.total_achievements > 0 ? (stats.achievements_unlocked / stats.total_achievements) * 100 : 0}%`,
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
