'use client';

import { useState } from 'react';
import { Bell, Mail, Trophy, TrendingUp, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface NotificationSettingsProps {
  initialData: {
    email_notifications?: boolean;
    achievement_alerts?: boolean;
    weekly_summary?: boolean;
    sponsor_updates?: boolean;
  };
}

export function NotificationSettings({ initialData }: NotificationSettingsProps) {
  const [emailNotifications, setEmailNotifications] = useState(
    initialData.email_notifications ?? true
  );
  const [achievementAlerts, setAchievementAlerts] = useState(
    initialData.achievement_alerts ?? true
  );
  const [weeklySummary, setWeeklySummary] = useState(
    initialData.weekly_summary ?? true
  );
  const [sponsorUpdates, setSponsorUpdates] = useState(
    initialData.sponsor_updates ?? true
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/settings/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email_notifications: emailNotifications,
          achievement_alerts: achievementAlerts,
          weekly_summary: weeklySummary,
          sponsor_updates: sponsorUpdates,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update preferences');
      }

      toast.success('Notification preferences updated!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update preferences');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Notification Preferences</h2>
        <p className="text-muted-foreground">
          Choose which notifications you want to receive
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Notifications */}
        <div className="flex items-start justify-between p-4 rounded-lg bg-muted/30 border border-border">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <Label htmlFor="email_notifications" className="font-semibold">
                Email Notifications
              </Label>
            </div>
            <p className="text-sm text-muted-foreground">
              Receive notifications via email
            </p>
          </div>
          <Switch
            id="email_notifications"
            checked={emailNotifications}
            onCheckedChange={setEmailNotifications}
          />
        </div>

        {/* Achievement Alerts */}
        <div className="flex items-start justify-between p-4 rounded-lg bg-muted/30 border border-border">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <Label htmlFor="achievement_alerts" className="font-semibold">
                Achievement Alerts
              </Label>
            </div>
            <p className="text-sm text-muted-foreground">
              Get notified when you unlock achievements
            </p>
          </div>
          <Switch
            id="achievement_alerts"
            checked={achievementAlerts}
            onCheckedChange={setAchievementAlerts}
          />
        </div>

        {/* Weekly Summary */}
        <div className="flex items-start justify-between p-4 rounded-lg bg-muted/30 border border-border">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-500" />
              <Label htmlFor="weekly_summary" className="font-semibold">
                Weekly Summary
              </Label>
            </div>
            <p className="text-sm text-muted-foreground">
              Receive a weekly summary of your progress
            </p>
          </div>
          <Switch
            id="weekly_summary"
            checked={weeklySummary}
            onCheckedChange={setWeeklySummary}
          />
        </div>

        {/* Sponsor Updates */}
        <div className="flex items-start justify-between p-4 rounded-lg bg-muted/30 border border-border">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-purple-500" />
              <Label htmlFor="sponsor_updates" className="font-semibold">
                Sponsor Updates
              </Label>
            </div>
            <p className="text-sm text-muted-foreground">
              Get notified about new sponsorship opportunities
            </p>
          </div>
          <Switch
            id="sponsor_updates"
            checked={sponsorUpdates}
            onCheckedChange={setSponsorUpdates}
          />
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? 'Saving...' : 'Save Preferences'}
        </Button>
      </form>
    </div>
  );
}
