import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { XPCard } from "@/components/dashboard/xp-card";
import { StreakDisplay } from "@/components/dashboard/streak-display";
import { RecommendedLessons } from "@/components/dashboard/recommended-lessons";
import { ContinueLearning } from "@/components/dashboard/continue-learning";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { StatsOverview } from "@/components/dashboard/stats-overview";
import type { Profile, Lesson, LessonProgress } from "@/types/database";

async function getUserData(): Promise<{
  profile: Profile | null;
  lessons: Lesson[];
  lastProgress: (LessonProgress & { lesson: Lesson }) | null;
}> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { profile: null, lessons: [], lastProgress: null };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const { data: lessons } = await supabase
    .from("lessons")
    .select("*")
    .order("order_index", { ascending: true });

  const { data: progressData } = await supabase
    .from("lesson_progress")
    .select("*, lesson(*)")
    .eq("user_id", user.id)
    .is("completed_at", null)
    .order("created_at", { ascending: false })
    .limit(1);

  return {
    profile: profile,
    lessons: lessons ?? [],
    lastProgress: progressData?.[0] ?? null,
  };
}

const XP_PER_LEVEL = [0, 100, 300, 600, 1000, 1500, 2100, 2800, 3600, 4500, 5500];

function getXPForLevel(level: number): number {
  return XP_PER_LEVEL[level] ?? XP_PER_LEVEL[XP_PER_LEVEL.length - 1] + (level - 10) * 1000;
}

function getXPToNextLevel(currentLevel: number): number {
  const nextLevelXP = getXPForLevel(currentLevel + 1);
  const currentLevelXP = getXPForLevel(currentLevel);
  return nextLevelXP - currentLevelXP;
}

function getCurrentLevelXP(currentLevel: number, totalXP: number): number {
  const currentLevelXP = getXPForLevel(currentLevel);
  return totalXP - currentLevelXP;
}

export default async function DashboardPage() {
  const { profile, lessons, lastProgress } = await getUserData();

  if (!profile) {
    redirect("/auth/signin");
  }

  const currentLevelXP = getCurrentLevelXP(profile.level, profile.xp);
  const xpToNextLevel = getXPToNextLevel(profile.level);

  return (
    <div className="min-h-screen bg-background">
      <div className="relative border-b border-border/50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/8 via-transparent to-secondary/5" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.04]" />
        <div className="mx-auto max-w-7xl px-4 py-7 md:px-8 relative z-10">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Willkommen zurück,</p>
              <h1 className="text-2xl md:text-3xl font-display font-bold">
                <span className="text-primary">{profile.username}</span> 👋
              </h1>
              <p className="text-sm text-muted-foreground">
                Bereit, heute aufzusteigen?
              </p>
            </div>
            <div className="hidden sm:flex flex-col items-end gap-1">
              <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full">
                <span className="text-xs text-primary font-medium">Level {profile.level}</span>
              </div>
              <span className="text-xs text-muted-foreground">{profile.xp.toLocaleString("de-DE")} XP gesamt</span>
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <div className="space-y-6">
          <StatsOverview
            totalXP={profile.xp}
            lessonsCompleted={profile.level * 3}
            projectsUploaded={0}
            currentLevel={profile.level}
          />

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <ContinueLearning
                lesson={lastProgress?.lesson ?? lessons[0] ?? null}
                progress={lastProgress ?? null}
              />
              <RecommendedLessons lessons={lessons} userLevel={profile.level} />
            </div>

            <div className="space-y-6">
              <XPCard
                rank={profile.rank}
                level={profile.level}
                currentXP={currentLevelXP}
                xpToNextLevel={xpToNextLevel}
              />
              <StreakDisplay currentStreak={profile.streak} />
              <QuickActions />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
