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
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Settings</h1>
            <p className="text-muted-foreground">
              Manage your account settings and preferences
            </p>
          </div>

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
