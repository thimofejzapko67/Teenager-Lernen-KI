import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { getPlatformStats, getAllUsers, banUser, unbanUser, updateUserRole } from '@/lib/admin';
import { StatsOverview } from '@/components/admin/stats-overview';
import { UsersTable } from '@/components/admin/users-table';
import { AdminTabs } from '@/components/admin/admin-tabs';
import type { UserProfile } from '@/components/admin/users-table';

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth');
  }

  // Check if user is admin
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') {
    redirect('/dashboard');
  }

  const [stats, users] = await Promise.all([
    getPlatformStats(),
    getAllUsers({ limit: 50 }),
  ]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage users, content, and platform settings
          </p>
        </div>

        <AdminTabs
          stats={stats}
          users={users as UserProfile[]}
          onBan={async (userId, reason) => {
            'use server';
            await banUser(userId, reason);
          }}
          onUnban={async (userId) => {
            'use server';
            await unbanUser(userId);
          }}
          onRoleChange={async (userId, role) => {
            'use server';
            await updateUserRole(userId, role);
          }}
        />
      </div>
    </div>
  );
}
