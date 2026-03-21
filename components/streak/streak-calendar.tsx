'use client';

import { Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StreakCalendarProps {
  history: Date[];
  className?: string;
}

export function StreakCalendar({ history, className }: StreakCalendarProps) {
  const today = new Date();
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  // Generate last 12 weeks of data
  const weeks: Date[][] = [];
  for (let i = 11; i >= 0; i--) {
    const weekStart = new Date(today);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay() - i * 7);
    const week: Date[] = [];
    for (let j = 0; j < 7; j++) {
      const day = new Date(weekStart);
      day.setDate(day.getDate() + j);
      week.push(day);
    }
    weeks.push(week);
  }

  const hasActivity = (date: Date) => {
    return history.some(
      (h) =>
        h.getDate() === date.getDate() &&
        h.getMonth() === date.getMonth() &&
        h.getFullYear() === date.getFullYear()
    );
  };

  const getActivityLevel = (date: Date) => {
    if (!hasActivity(date)) return 0;

    // Calculate activity level based on recency and consecutive days
    const daysDiff = Math.floor(
      (today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysDiff <= 1) return 4; // Recent
    if (daysDiff <= 7) return 3; // This week
    if (daysDiff <= 30) return 2; // This month
    return 1; // Older
  };

  const levelColors = {
    0: 'bg-muted/20',
    1: 'bg-primary/20',
    2: 'bg-primary/40',
    3: 'bg-primary/60',
    4: 'bg-primary',
  };

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold flex items-center gap-2">
          <Flame className="w-4 h-4 text-orange-500" />
          Login History
        </h3>
        <div className="text-xs text-muted-foreground">
          Last 12 weeks
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="flex gap-1 min-w-max">
          <div className="flex flex-col gap-1 pr-2">
            <div className="h-3" />
            {daysOfWeek.map((day) => (
              <div
                key={day}
                className="h-3 text-[10px] text-muted-foreground flex items-center"
                style={{ lineHeight: '12px' }}
              >
                {day}
              </div>
            ))}
          </div>

          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {week.map((date, dayIndex) => {
                const level = getActivityLevel(date);
                const isToday =
                  date.getDate() === today.getDate() &&
                  date.getMonth() === today.getMonth() &&
                  date.getFullYear() === today.getFullYear();

                return (
                  <div
                    key={dayIndex}
                    className={cn(
                      'w-3 h-3 rounded-sm transition-all hover:scale-125',
                      levelColors[level as keyof typeof levelColors],
                      isToday && 'ring-1 ring-ring'
                    )}
                    title={`${date.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}: ${level > 0 ? 'Active' : 'No activity'}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <span>Less</span>
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={cn('w-3 h-3 rounded-sm', levelColors[level as keyof typeof levelColors])}
            />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  );
}
