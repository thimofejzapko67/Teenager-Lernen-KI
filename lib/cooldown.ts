'use server';

import { createClient } from '@/lib/supabase/server';

/**
 * Check if a user is in cooldown period
 * Cooldown: 1 month after achieving 3 wins in 3 months
 */
export async function getUserCooldownStatus(userId: string) {
  try {
    const supabase = await createClient();

    // Get recent wins from the last 3 months
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    const { data: recentWins, error } = await supabase
      .from('leaderboard_wins')
      .select('*')
      .eq('user_id', userId)
      .gte('won_at', threeMonthsAgo.toISOString())
      .order('won_at', { ascending: false });

    if (error) {
      console.error('Error fetching recent wins:', error);
      return { inCooldown: false, winCount: 0, cooldownEndsAt: null };
    }

    const winCount = recentWins?.length || 0;

    // Check if in cooldown (3+ wins means cooldown)
    if (winCount >= 3) {
      // Find the third most recent win
      const thirdWin = recentWins?.[2];
      if (thirdWin) {
        // Cooldown ends 1 month after the third win
        const cooldownEndsAt = new Date(thirdWin.won_at);
        cooldownEndsAt.setMonth(cooldownEndsAt.getMonth() + 1);

        const now = new Date();
        const inCooldown = now < cooldownEndsAt;

        return {
          inCooldown,
          winCount,
          cooldownEndsAt: inCooldown ? cooldownEndsAt.toISOString() : null,
          recentWins: recentWins?.slice(0, 3) || [],
        };
      }
    }

    return {
      inCooldown: false,
      winCount,
      cooldownEndsAt: null,
      recentWins: recentWins || [],
    };
  } catch (error) {
    console.error('Error in getUserCooldownStatus:', error);
    return { inCooldown: false, winCount: 0, cooldownEndsAt: null };
  }
}

/**
 * Get formatted cooldown info for UI display
 */
export async function getCooldownDisplayInfo(userId: string) {
  const status = await getUserCooldownStatus(userId);

  if (!status.inCooldown) {
    return {
      inCooldown: false,
      message: status.winCount >= 3
        ? 'You have achieved 3 wins! Enjoy your cooldown period.'
        : `Keep competing! ${3 - status.winCount} more win${3 - status.winCount !== 1 ? 's' : ''} needed for cooldown.`,
    };
  }

  const cooldownEndsAt = new Date(status.cooldownEndsAt!);
  const now = new Date();
  const daysRemaining = Math.ceil((cooldownEndsAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  return {
    inCooldown: true,
    cooldownEndsAt: status.cooldownEndsAt,
    daysRemaining,
    message: `You are in cooldown period. Eligible again in ${daysRemaining} day${daysRemaining !== 1 ? 's' : ''}.`,
    winCount: status.winCount,
  };
}

/**
 * Check if user can participate in leaderboard
 */
export async function canParticipateInLeaderboard(userId: string) {
  const status = await getUserCooldownStatus(userId);
  return !status.inCooldown;
}

/**
 * Record a leaderboard win
 */
export async function recordLeaderboardWin(
  userId: string,
  leaderboardType: 'global' | 'weekly' | 'monthly',
  rank: number
) {
  try {
    const supabase = await createClient();

    const { error } = await supabase
      .from('leaderboard_wins')
      .insert({
        user_id: userId,
        leaderboard_type: leaderboardType,
        rank,
        won_at: new Date().toISOString(),
      });

    if (error) {
      console.error('Error recording leaderboard win:', error);
      return { success: false, error: 'Failed to record win' };
    }

    return { success: true };
  } catch (error) {
    console.error('Error in recordLeaderboardWin:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}
