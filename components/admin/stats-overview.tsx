'use client';

import { Users, BookOpen, FolderOpen, Zap, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn, clawGradientText } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  trend?: number;
  className?: string;
}

function StatCard({ title, value, icon, trend, className }: StatCardProps) {
  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            {trend !== undefined && (
              <p className={cn(
                'text-xs mt-1 flex items-center gap-1',
                trend >= 0 ? 'text-green-500' : 'text-red-500'
              )}>
                <TrendingUp className="w-3 h-3" />
                {trend >= 0 ? '+' : ''}{trend}%
              </p>
            )}
          </div>
          <div className="p-3 rounded-lg bg-primary/10">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface StatsOverviewProps {
  stats: {
    userCount: number;
    lessonCompletions: number;
    projectCount: number;
    totalXPAwarded: number;
    activeUsers: number;
  };
}

export function StatsOverview({ stats }: StatsOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <StatCard
        title="Total Users"
        value={stats.userCount.toLocaleString()}
        icon={<Users className="w-5 h-5 text-primary" />}
      />
      <StatCard
        title="Active Users (7d)"
        value={stats.activeUsers.toLocaleString()}
        icon={<TrendingUp className="w-5 h-5 text-green-500" />}
      />
      <StatCard
        title="Lesson Completions"
        value={stats.lessonCompletions.toLocaleString()}
        icon={<BookOpen className="w-5 h-5 text-cyan-500" />}
      />
      <StatCard
        title="Projects"
        value={stats.projectCount.toLocaleString()}
        icon={<FolderOpen className="w-5 h-5 text-orange-500" />}
      />
      <StatCard
        title="Total XP Awarded"
        value={stats.totalXPAwarded.toLocaleString()}
        icon={<Zap className="w-5 h-5 text-yellow-500" />}
      />
    </div>
  );
}
