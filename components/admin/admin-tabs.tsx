'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, Users, FileText, Settings } from 'lucide-react';
import { StatsOverview } from '@/components/admin/stats-overview';
import { UsersTable } from '@/components/admin/users-table';
import type { UserProfile } from '@/components/admin/users-table';

interface AdminTabsProps {
  stats: {
    userCount: number;
    lessonCompletions: number;
    projectCount: number;
    totalXPAwarded: number;
    activeUsers: number;
  };
  users: UserProfile[];
  onBan?: (userId: string, reason: string) => void;
  onUnban?: (userId: string) => void;
  onRoleChange?: (userId: string, role: 'admin' | 'moderator' | 'user') => void;
}

export function AdminTabs({
  stats,
  users,
  onBan,
  onUnban,
  onRoleChange,
}: AdminTabsProps) {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="overview" className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4" />
          <span className="hidden sm:inline">Overview</span>
        </TabsTrigger>
        <TabsTrigger value="users" className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          <span className="hidden sm:inline">Users</span>
        </TabsTrigger>
        <TabsTrigger value="content" className="flex items-center gap-2">
          <FileText className="w-4 h-4" />
          <span className="hidden sm:inline">Content</span>
        </TabsTrigger>
        <TabsTrigger value="settings" className="flex items-center gap-2">
          <Settings className="w-4 h-4" />
          <span className="hidden sm:inline">Settings</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="mt-6">
        <div className="space-y-6">
          <StatsOverview stats={stats} />

          {/* Recent Activity placeholder */}
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <p className="text-sm text-muted-foreground">
              Recent activity tracking will be available soon.
            </p>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="users" className="mt-6">
        <UsersTable
          users={users}
          onBan={onBan}
          onUnban={onUnban}
          onRoleChange={onRoleChange}
        />
      </TabsContent>

      <TabsContent value="content" className="mt-6">
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Content Moderation</h3>
          <p className="text-sm text-muted-foreground">
            Content moderation tools will be available soon.
          </p>
        </div>
      </TabsContent>

      <TabsContent value="settings" className="mt-6">
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Platform Settings</h3>
          <p className="text-sm text-muted-foreground">
            Platform configuration will be available soon.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  );
}
