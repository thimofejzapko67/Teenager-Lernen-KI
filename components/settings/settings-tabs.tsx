'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Bell, Shield } from 'lucide-react';
import { ProfileSettings } from './profile-settings';
import { NotificationSettings } from './notification-settings';
import { AccountSettings } from './account-settings';

interface SettingsTabsProps {
  initialData: {
    username: string;
    email: string;
    bio?: string;
    avatar_url?: string;
    email_notifications?: boolean;
    achievement_alerts?: boolean;
    weekly_summary?: boolean;
    sponsor_updates?: boolean;
  };
}

export function SettingsTabs({ initialData }: SettingsTabsProps) {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="profile" className="flex items-center gap-2">
          <User className="w-4 h-4" />
          <span className="hidden sm:inline">Profile</span>
        </TabsTrigger>
        <TabsTrigger value="notifications" className="flex items-center gap-2">
          <Bell className="w-4 h-4" />
          <span className="hidden sm:inline">Notifications</span>
        </TabsTrigger>
        <TabsTrigger value="account" className="flex items-center gap-2">
          <Shield className="w-4 h-4" />
          <span className="hidden sm:inline">Account</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="profile" className="mt-6">
        <ProfileSettings initialData={initialData} />
      </TabsContent>

      <TabsContent value="notifications" className="mt-6">
        <NotificationSettings initialData={initialData} />
      </TabsContent>

      <TabsContent value="account" className="mt-6">
        <AccountSettings />
      </TabsContent>
    </Tabs>
  );
}
