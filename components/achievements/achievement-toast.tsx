'use client';

import { useEffect, useState } from 'react';
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast';
import { Trophy, Sparkles } from 'lucide-react';
import { cn, clawGradientText } from '@/lib/utils';

interface AchievementToastProps {
  title: string;
  description: string;
  xpBonus: number;
  icon?: string;
}

export function showAchievementToast({
  title,
  description,
  xpBonus,
  icon,
}: AchievementToastProps) {
  const event = new CustomEvent('achievement-unlock', {
    detail: { title, description, xpBonus, icon },
  });
  window.dispatchEvent(event);
}

export function AchievementToastProvider() {
  const [toasts, setToasts] = useState<AchievementToastProps[]>([]);

  useEffect(() => {
    const handleAchievementUnlock = (e: CustomEvent) => {
      const detail = e.detail as AchievementToastProps;
      setToasts((prev) => [...prev, detail]);

      // Auto-remove after 5 seconds
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t !== detail));
      }, 5000);
    };

    window.addEventListener(
      'achievement-unlock' as any,
      handleAchievementUnlock as any
    );

    return () => {
      window.removeEventListener(
        'achievement-unlock' as any,
        handleAchievementUnlock as any
      );
    };
  }, []);

  return (
    <ToastProvider>
      {toasts.map((toast, index) => (
        <Toast
          key={index}
          className="bg-gradient-to-r from-primary/20 via-accent/20 to-cyan-500/20 border border-primary/50"
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 flex items-center justify-center">
              {toast.icon ? (
                <span className="text-xl">{toast.icon}</span>
              ) : (
                <Trophy className="w-6 h-6 text-white" />
              )}
            </div>
            <div className="flex-1">
              <ToastTitle className={cn('text-lg font-bold', clawGradientText)}>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  Achievement Unlocked!
                </div>
              </ToastTitle>
              <ToastDescription className="text-base mt-1">
                <div className="font-semibold">{toast.title}</div>
                <div className="text-sm text-muted-foreground mt-0.5">
                  {toast.description}
                </div>
                <div className="text-sm text-primary font-semibold mt-1">
                  +{toast.xpBonus} XP
                </div>
              </ToastDescription>
            </div>
          </div>
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}
