import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { SettingsTabs } from '@/components/settings/settings-tabs';
import { getUserSettings } from '@/lib/settings';

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth');
  }

  const settings = await getUserSettings();

  if (!settings) {
    redirect('/auth');
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <div className="relative border-b border-border/50 overflow-hidden mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/8 via-transparent to-secondary/5" />
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.04]" />
          <div className="container mx-auto px-4 py-10 max-w-4xl relative z-10">
            <h1 className="text-3xl font-display font-bold mb-1">Einstellungen</h1>
            <p className="text-muted-foreground">
              Verwalte dein Konto und deine Präferenzen.
            </p>
          </div>
        </div>
        <div className="container mx-auto px-4 max-w-4xl pb-12">

          <SettingsTabs
            initialData={{
              username: settings.username || '',
              email: user.email || '',
              bio: settings.bio || '',
              avatar_url: settings.avatar_url || '',
              email_notifications: settings.email_notifications,
              achievement_alerts: settings.achievement_alerts,
              weekly_summary: settings.weekly_summary,
              sponsor_updates: settings.sponsor_updates,
            }}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
}
