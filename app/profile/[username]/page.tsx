import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { createClient } from '@/lib/supabase/server';
import { getProfilePageData } from '@/lib/profiles';
import { ProfileHeader } from '@/components/profile/profile-header';
import { StatsSection } from '@/components/profile/stats-section';
import { AchievementsSection } from '@/components/profile/achievements-section';
import { ProfileWrapper } from '@/components/profile/profile-wrapper';

interface ProfilePageProps {
  params: Promise<{
    username: string;
  }>;
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
  const { username } = await params;
  const data = await getProfilePageData(username);

  if (!data.profile) {
    return {
      title: 'Profil nicht gefunden – Codelift',
    };
  }

  return {
    title: `${data.profile.username} – Codelift Profil`,
    description: `${data.profile.username}'s Profil auf Codelift. Rang: ${data.profile.rank}, Level: ${data.profile.level}, XP: ${data.profile.xp}`,
    openGraph: {
      title: `${data.profile.username} – Codelift`,
      description: `Rang: ${data.profile.rank} | Level: ${data.profile.level} | ${data.profile.xp} XP`,
      images: data.profile.avatar_url ? [data.profile.avatar_url] : [],
    },
  };
}

/**
 * Profile page loading skeleton
 */
function ProfileSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-6">
      <div className="glass-card rounded-xl p-6 md:p-8 space-y-6 animate-pulse">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="h-24 w-24 md:h-32 md:w-32 rounded-full bg-muted/50" />
          <div className="flex-1 space-y-4 w-full">
            <div className="h-8 bg-muted/50 rounded w-1/3" />
            <div className="h-4 bg-muted/50 rounded w-1/4" />
            <div className="h-2 bg-muted/50 rounded w-full" />
          </div>
        </div>
      </div>
      <div className="glass-card rounded-xl p-6 space-y-4 animate-pulse">
        <div className="h-6 bg-muted/50 rounded w-1/4" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-muted/50 rounded-lg" />
          ))}
        </div>
      </div>
      <div className="glass-card rounded-xl p-6 space-y-4 animate-pulse">
        <div className="h-6 bg-muted/50 rounded w-1/4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-32 bg-muted/50 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Main profile page component
 */
async function ProfileContent({ username }: { username: string }) {
  // Get current user from session
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Get profile data
  const data = await getProfilePageData(username, user?.id);

  if (!data.profile) {
    notFound();
  }

  const content = (
    <div className="min-h-screen bg-background">
      <div className="relative border-b border-border/50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/8 via-transparent to-secondary/5" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.04]" />
      </div>
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-6">
      <ProfileHeader
        profile={data.profile}
        isOwnProfile={data.isOwnProfile}
        onEdit={() => {
          // This will be handled by the client component
          const event = new CustomEvent('open-edit-modal');
          window.dispatchEvent(event);
        }}
      />

      <StatsSection stats={data.stats} />
      <AchievementsSection achievements={data.achievements} />
    </div>
    </div>
  );

  // Wrap with client component for edit modal if viewing own profile
  if (data.isOwnProfile) {
    return <ProfileWrapper profile={data.profile}>{content}</ProfileWrapper>;
  }

  return content;
}

/**
 * Profile page with loading state
 */
export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;

  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <ProfileContent username={username} />
    </Suspense>
  );
}
