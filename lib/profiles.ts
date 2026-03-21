'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { Profile, UserStats, AchievementWithUnlocked, UpdateProfileInput, Rank } from '@/types/database';

/**
 * Get profile by username
 */
export async function getProfile(username: string): Promise<Profile | null> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('username', username)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getProfile:', error);
    return null;
  }
}

/**
 * Get profile by user ID
 */
export async function getUserProfile(userId: string): Promise<Profile | null> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getUserProfile:', error);
    return null;
  }
}

/**
 * Update profile
 */
export async function updateProfile(userId: string, data: UpdateProfileInput): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient();

    // Validate username if provided
    if (data.username) {
      const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
      if (!usernameRegex.test(data.username)) {
        return { success: false, error: 'Username must be 3-20 characters and contain only letters, numbers, hyphens, and underscores' };
      }

      // Check if username is already taken
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', data.username)
        .neq('id', userId)
        .single();

      if (existingProfile) {
        return { success: false, error: 'Username is already taken' };
      }
    }

    const { error } = await supabase
      .from('profiles')
      .update({
        username: data.username,
        avatar_url: data.avatar_url,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId);

    if (error) {
      console.error('Error updating profile:', error);
      return { success: false, error: error.message };
    }

    // Revalidate profile paths
    revalidatePath('/profile/[username]', 'page');

    return { success: true };
  } catch (error) {
    console.error('Error in updateProfile:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

/**
 * Get user's achievements with unlock status
 */
export async function getUserAchievements(userId: string): Promise<AchievementWithUnlocked[]> {
  try {
    const supabase = await createClient();

    // Get all achievements
    const { data: achievements, error: achievementsError } = await supabase
      .from('achievements')
      .select('*')
      .order('created_at', { ascending: true });

    if (achievementsError) {
      console.error('Error fetching achievements:', achievementsError);
      return [];
    }

    // Get user's unlocked achievements
    const { data: userAchievements, error: userAchievementsError } = await supabase
      .from('user_achievements')
      .select('*')
      .eq('user_id', userId);

    if (userAchievementsError) {
      console.error('Error fetching user achievements:', userAchievementsError);
      return [];
    }

    const unlockedIds = new Set(userAchievements.map(ua => ua.achievement_id));

    // Combine achievements with unlock status
    const achievementsWithStatus: AchievementWithUnlocked[] = (achievements || []).map(achievement => {
      const userAchievement = userAchievements?.find(ua => ua.achievement_id === achievement.id);
      return {
        ...achievement,
        is_unlocked: unlockedIds.has(achievement.id),
        unlocked_at: userAchievement?.unlocked_at,
      };
    });

    return achievementsWithStatus;
  } catch (error) {
    console.error('Error in getUserAchievements:', error);
    return [];
  }
}

/**
 * Get comprehensive user stats
 */
export async function getUserStats(userId: string): Promise<UserStats | null> {
  try {
    const supabase = await createClient();

    // Get profile data
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (profileError || !profile) {
      return null;
    }

    // Get completed lessons count
    const { count: lessonsCompleted } = await supabase
      .from('lesson_progress')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .not('completed_at', 'is', null);

    // Get uploaded projects count
    const { count: projectsUploaded } = await supabase
      .from('projects')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    // Get total achievements count
    const { count: totalAchievements } = await supabase
      .from('achievements')
      .select('*', { count: 'exact', head: true });

    // Get unlocked achievements count
    const { count: achievementsUnlocked } = await supabase
      .from('user_achievements')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    return {
      lessons_completed: lessonsCompleted || 0,
      projects_uploaded: projectsUploaded || 0,
      current_streak: profile.streak,
      total_xp: profile.xp,
      current_rank: profile.rank,
      current_level: profile.level,
      achievements_unlocked: achievementsUnlocked || 0,
      total_achievements: totalAchievements || 0,
    };
  } catch (error) {
    console.error('Error in getUserStats:', error);
    return null;
  }
}

/**
 * Get all data needed for profile page
 */
export async function getProfilePageData(username: string, currentUserId?: string | null): Promise<{
  profile: Profile | null;
  stats: UserStats | null;
  achievements: AchievementWithUnlocked[];
  isOwnProfile: boolean;
}> {
  const profile = await getProfile(username);

  if (!profile) {
    return {
      profile: null,
      stats: null,
      achievements: [],
      isOwnProfile: false,
    };
  }

  const [stats, achievements] = await Promise.all([
    getUserStats(profile.id),
    getUserAchievements(profile.id),
  ]);

  return {
    profile,
    stats,
    achievements,
    isOwnProfile: currentUserId === profile.id,
  };
}

// RANK_CONFIG moved to lib/rank-config.ts to avoid "use server" export issues
