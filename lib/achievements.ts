'use server';

import { createClient } from '@/lib/supabase/server';
import type { Achievement, UserAchievement } from '@/types/database';

/**
 * Get all available achievements
 */
export async function getAchievements(): Promise<Achievement[]> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('achievements')
      .select('*')
      .order('xp_bonus', { ascending: false });

    if (error) {
      console.error('Error fetching achievements:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getAchievements:', error);
    return [];
  }
}

/**
 * Get user's unlocked achievements
 */
export async function getUserAchievements(
  userId: string
): Promise<UserAchievement[]> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('user_achievements')
      .select('*, achievements(*)')
      .eq('user_id', userId)
      .order('unlocked_at', { ascending: false });

    if (error) {
      console.error('Error fetching user achievements:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getUserAchievements:', error);
    return [];
  }
}

/**
 * Get achievements with unlock status for current user
 */
export async function getAchievementsWithStatus(): Promise<
  (Achievement & { unlocked: boolean; unlockedAt?: string })[]
> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      const achievements = await getAchievements();
      return achievements.map((a) => ({ ...a, unlocked: false }));
    }

    const [allAchievements, userAchievements] = await Promise.all([
      getAchievements(),
      getUserAchievements(user.id),
    ]);

    const unlockedIds = new Set(
      userAchievements.map((ua) => ua.achievement_id)
    );

    return allAchievements.map((achievement) => ({
      ...achievement,
      unlocked: unlockedIds.has(achievement.id),
      unlockedAt: userAchievements.find(
        (ua) => ua.achievement_id === achievement.id
      )?.unlocked_at,
    }));
  } catch (error) {
    console.error('Error in getAchievementsWithStatus:', error);
    return [];
  }
}

/**
 * Get user's achievement stats
 */
export async function getAchievementStats(userId: string) {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('user_achievements')
      .select('*, achievements(xp_bonus)')
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching achievement stats:', error);
      return { count: 0, totalXP: 0 };
    }

    const count = data?.length || 0;
    const totalXP = data?.reduce((sum, ua) => sum + (ua.achievements?.xp_bonus || 0), 0) || 0;

    return { count, totalXP };
  } catch (error) {
    console.error('Error in getAchievementStats:', error);
    return { count: 0, totalXP: 0 };
  }
}

/**
 * Check and unlock achievements based on user activity
 * This is called internally by other server actions
 */
export async function checkAndUnlockAchievements(
  userId: string,
  type: 'lesson' | 'streak' | 'project' | 'xp' | 'login',
  value?: number
): Promise<Achievement[]> {
  try {
    const supabase = await createClient();

    // Get achievements matching the type
    const { data: achievements, error: achievementsError } = await supabase
      .from('achievements')
      .select('*')
      .eq('requirement_type', type);

    if (achievementsError || !achievements) {
      return [];
    }

    const unlocked: Achievement[] = [];

    for (const achievement of achievements) {
      // Check if already unlocked
      const { data: existing } = await supabase
        .from('user_achievements')
        .select('id')
        .eq('user_id', userId)
        .eq('achievement_id', achievement.id)
        .maybeSingle();

      if (existing) continue;

      // Check if requirement is met
      let requirementMet = false;

      switch (type) {
        case 'lesson':
          // Get user's completed lessons count
          const { data: lessonProgress } = await supabase
            .from('lesson_progress')
            .select('id')
            .eq('user_id', userId)
            .not('completed_at', 'is', null);

          requirementMet = (lessonProgress?.length || 0) >= (achievement.requirement_value || 0);
          break;

        case 'streak':
          // Get user's current streak
          const { data: profile } = await supabase
            .from('profiles')
            .select('streak')
            .eq('id', userId)
            .single();

          requirementMet = (profile?.streak || 0) >= (achievement.requirement_value || 0);
          break;

        case 'project':
          // Get user's projects count
          const { data: projects } = await supabase
            .from('projects')
            .select('id')
            .eq('user_id', userId);

          requirementMet = (projects?.length || 0) >= (achievement.requirement_value || 0);
          break;

        case 'xp':
          // Get user's XP
          const { data: xpProfile } = await supabase
            .from('profiles')
            .select('xp')
            .eq('id', userId)
            .single();

          requirementMet = (xpProfile?.xp || 0) >= (achievement.requirement_value || 0);
          break;

        case 'login':
          // Get total login days
          const { data: logins } = await supabase
            .from('daily_logins')
            .select('id')
            .eq('user_id', userId);

          requirementMet = (logins?.length || 0) >= (achievement.requirement_value || 0);
          break;
      }

      if (requirementMet) {
        // Unlock achievement
        const { error: unlockError } = await supabase
          .from('user_achievements')
          .insert({
            user_id: userId,
            achievement_id: achievement.id,
          });

        if (!unlockError) {
          unlocked.push(achievement);

          // Award bonus XP
          if (achievement.xp_bonus > 0) {
            await supabase.rpc('add_xp', {
              user_id: userId,
              amount: achievement.xp_bonus,
              source: 'achievement',
            });
          }
        }
      }
    }

    return unlocked;
  } catch (error) {
    console.error('Error in checkAndUnlockAchievements:', error);
    return [];
  }
}
