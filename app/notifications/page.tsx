import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { getNotifications, markAllAsRead } from '@/lib/notifications';
import { NotificationItem } from '@/components/notifications/notification-item';
import { Button } from '@/components/ui/button';
import { Check, Bell, Trash2 } from 'lucide-react';

export default async function NotificationsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth');
  }

  const notifications = await getNotifications();

  async function handleMarkAllRead() {
    'use server';
    await markAllAsRead();
  }

  return (
    <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-display font-bold mb-1">Benachrichtigungen</h1>
              <p className="text-sm text-muted-foreground">
                Bleib über deine Aktivitäten auf dem Laufenden.
              </p>
            </div>
            {notifications.length > 0 && (
              <form action={handleMarkAllRead}>
                <Button type="submit" variant="outline" size="sm">
                  <Check className="w-4 h-4 mr-2" />
                  Alle gelesen
                </Button>
              </form>
            )}
          </div>

          {notifications.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <Bell className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Keine Benachrichtigungen</h3>
              <p className="text-muted-foreground">
                Alles erledigt! Wir informieren dich, wenn etwas passiert.
              </p>
            </div>
          ) : (
            <div className="divide-y rounded-lg border">
              {notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={async () => {}}
                  onDelete={async () => {}}
                />
              ))}
            </div>
          )}
        </div>
      </div>
  );
}
