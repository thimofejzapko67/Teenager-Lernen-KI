'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trophy } from 'lucide-react';
import { AchievementsGrid } from './achievements-grid';
import type { Achievement } from '@/types/database';

interface AchievementsModalProps {
  achievements?: (Achievement & { unlocked: boolean; unlockedAt?: string })[];
  trigger?: React.ReactNode;
}

export function AchievementsModal({
  achievements,
  trigger,
}: AchievementsModalProps) {
  const [open, setOpen] = useState(false);
  const [localAchievements, setLocalAchievements] = useState(achievements);

  // Fetch achievements when opening modal if not provided
  const handleOpenChange = async (newOpen: boolean) => {
    setOpen(newOpen);
    if (newOpen && !localAchievements) {
      try {
        const response = await fetch('/api/achievements');
        if (response.ok) {
          const data = await response.json();
          setLocalAchievements(data);
        }
      } catch (error) {
        console.error('Failed to fetch achievements:', error);
      }
    }
  };

  const defaultTrigger = (
    <Button variant="outline" size="sm" className="gap-2">
      <Trophy className="w-4 h-4" />
      View All Achievements
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Trophy className="w-6 h-6 text-yellow-500" />
            Achievements
          </DialogTitle>
          <DialogDescription>
            Complete challenges to earn achievements and bonus XP!
          </DialogDescription>
        </DialogHeader>

        {(localAchievements || achievements) ? (
          <AchievementsGrid
            achievements={localAchievements || achievements!}
            size="lg"
            enableLocked={true}
          />
        ) : (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
