import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { getUserByUsername, type LeaderboardEntry } from '@/lib/leaderboard';
import { ProfileHeader } from '@/components/profile/profile-header';
import { SkillStatsSection } from '@/components/profile/skill-stats-section';
import { BadgesSection } from '@/components/profile/badges-section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatXP } from '@/lib/utils';
import { Trophy, Star, Flame, Rocket, Calendar, Link as LinkIcon } from 'lucide-react';

interface ProfilePageProps {
  params: Promise<{
    username: string;
  }>;
}

export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
  const { username } = await params;
  const user = await getUserByUsername(username);

  if (!user) {
    return {
      title: 'Profil nicht gefunden – Codelift',
    };
  }

  return {
    title: `${user.username} – Codelift Profil`,
    description: `${user.username}'s Profil auf Codelift. Level ${user.level}, ${user.xp} XP`,
  };
}

function ProfileSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl space-y-6">
      <div className="glass-card rounded-2xl p-8 animate-pulse">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="h-24 w-24 rounded-full bg-muted/50" />
          <div className="flex-1 space-y-3 w-full">
            <div className="h-8 bg-muted/50 rounded w-1/3" />
            <div className="h-4 bg-muted/50 rounded w-1/4" />
            <div className="h-2 bg-muted/50 rounded w-full" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="glass-card rounded-2xl p-6 h-48 animate-pulse" />
        ))}
      </div>
    </div>
  );
}

async function ProfileContent({ username }: { username: string }) {
  const user = await getUserByUsername(username);

  if (!user) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative border-b border-border/50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
        
        <div className="container mx-auto px-4 py-8 max-w-5xl relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <div className="relative">
              <span className="text-6xl md:text-7xl">{user.avatar_url}</span>
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl -z-10" />
            </div>
            
            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
                {user.username}
              </h1>
              
              {user.bio && (
                <p className="text-muted-foreground mb-4 max-w-lg">{user.bio}</p>
              )}
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-yellow-400" />
                  <span>Rang #{user.rank}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-primary" />
                  <span>{formatXP(user.xp)} XP</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-orange-400" />
                  <span>{user.streak} Day Streak</span>
                </div>
                {user.joined && (
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {new Date(user.joined).toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })}</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Level Badge */}
            <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30">
              <span className="text-4xl font-display font-bold text-primary">{user.level}</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Level</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 max-w-5xl space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="glass-card">
            <CardContent className="p-4 text-center">
              <Rocket className="w-6 h-6 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{user.projects || 0}</div>
              <div className="text-xs text-muted-foreground">Projects</div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-4 text-center">
              <Flame className="w-6 h-6 mx-auto mb-2 text-orange-400" />
              <div className="text-2xl font-bold">{user.streak || 0}</div>
              <div className="text-xs text-muted-foreground">Day Streak</div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-4 text-center">
              <Star className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
              <div className="text-2xl font-bold">{user.lessons_completed || 0}</div>
              <div className="text-xs text-muted-foreground">Lessons</div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-4 text-center">
              <Trophy className="w-6 h-6 mx-auto mb-2 text-purple-400" />
              <div className="text-2xl font-bold">{user.badges?.length || 0}</div>
              <div className="text-xs text-muted-foreground">Badges</div>
            </CardContent>
          </Card>
        </div>

        {/* Skill Stats */}
        {user.stats && <SkillStatsSection stats={user.stats} />}

        {/* Badges */}
        {user.badges && user.badges.length > 0 && (
          <BadgesSection badges={user.badges} />
        )}

        {/* Awards */}
        {user.awards && user.awards.length > 0 && (
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                Awards & Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {user.awards.map((award, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 text-sm"
                  >
                    {award}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default function ProfilePage({ params }: ProfilePageProps) {
  return (
    <main className="min-h-screen">
      <Suspense fallback={<ProfileSkeleton />}>
        <ProfileContentWrapper params={params} />
      </Suspense>
    </main>
  );
}

async function ProfileContentWrapper({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  return <ProfileContent username={username} />;
}
