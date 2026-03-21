'use server';

import { createClient } from '@/lib/supabase/server';

/**
 * Record daily login for the current user
 * Returns the new streak count and any achievements unlocked
 */
export async function recordDailyLogin() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: 'Authentication required' };
    }

    // Call the database function to record login
    const { data, error } = await supabase.rpc('record_daily_login', {
      user_id: user.id,
    });

    if (error) {
      console.error('Error recording daily login:', error);
      return { success: false, error: 'Failed to record login' };
    }

    // Check for streak achievements
    const { checkAndUnlockAchievements } = await import('@/lib/achievements');
    const unlocked = await checkAndUnlockAchievements(user.id, 'streak');

    return {
      success: true,
      streak: data,
      achievementsUnlocked: unlocked,
    };
  } catch (error) {
    console.error('Error in recordDailyLogin:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

/**
 * Get user's current streak and login history
 */
export async function getStreakInfo() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { streak: 0, lastLogin: null, history: [] };
    }

    // Get profile for current streak
    const { data: profile } = await supabase
      .from('profiles')
      .select('streak')
      .eq('id', user.id)
      .single();

    // Get login history (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data: history } = await supabase
      .from('daily_logins')
      .select('login_date')
      .eq('user_id', user.id)
      .gte('login_date', thirtyDaysAgo.toISOString())
      .order('login_date', { ascending: false });

    return {
      streak: profile?.streak || 0,
      lastLogin: history?.[0]?.login_date || null,
      history: history?.map((h) => new Date(h.login_date)) || [],
    };
  } catch (error) {
    console.error('Error in getStreakInfo:', error);
    return { streak: 0, lastLogin: null, history: [] };
  }
}

/**
 * Get streak bonus multiplier
 * Returns a multiplier based on current streak
 */
export function getStreakMultiplier(streak: number): number {
  if (streak >= 30) return 2.0; // 2x multiplier for 30+ day streaks
  if (streak >= 14) return 1.5; // 1.5x multiplier for 14+ day streaks
  if (streak >= 7) return 1.25; // 1.25x multiplier for 7+ day streaks
  if (streak >= 3) return 1.1; // 1.1x multiplier for 3+ day streaks
  return 1.0; // No bonus for streaks under 3 days
}

/**
 * Calculate XP with streak bonus applied
 */
export function applyStreakBonus(baseXP: number, streak: number): number {
  const multiplier = getStreakMultiplier(streak);
  return Math.round(baseXP * multiplier);
}
