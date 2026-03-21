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

import { getStreakMultiplier, applyStreakBonus } from './streak-utils';

export { getStreakMultiplier, applyStreakBonus };
