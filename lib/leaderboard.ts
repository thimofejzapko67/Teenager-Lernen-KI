"use server";

import { createClient } from "@/lib/supabase/server";
import type { Rank } from "@/types/database";

export type LeaderboardPeriod = "global" | "week" | "month" | "friends";

export interface LeaderboardEntry {
  rank: number;
  id: string;
  username: string;
  avatar_url: string | null;
  xp: number;
  level: number;
  rank_tier: Rank;
  rank_change?: number;
  is_current_user: boolean;
}

export interface LeaderboardResult {
  entries: LeaderboardEntry[];
  total: number;
  page: number;
  perPage: number;
}

export interface UserRankResult {
  rank: number;
  xp: number;
  level: number;
  rank_tier: Rank;
}

const PER_PAGE = 25;

/**
 * Fetch leaderboard data based on period and pagination
 */
export async function getLeaderboard(
  period: LeaderboardPeriod = "global",
  page: number = 1,
  currentUserId?: string
): Promise<LeaderboardResult> {
  const supabase = await createClient();
  const offset = (page - 1) * PER_PAGE;

  let query = supabase
    .from("profiles")
    .select("id, username, avatar_url, xp, level, rank", { count: "exact" });

  // Apply time-based filtering for week/month
  if (period === "week") {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    // Note: This requires xp_history table or similar for historical data
    // For now, we'll use the same query but you'd implement historical XP tracking
  } else if (period === "month") {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    // Note: Same as above - requires historical data
  } else if (period === "friends" && currentUserId) {
    // Filter to friends only - requires friends table
    // For now, return empty for friends tab
    return {
      entries: [],
      total: 0,
      page,
      perPage: PER_PAGE,
    };
  }

  // Order by XP descending
  query = query.order("xp", { ascending: false }).range(offset, offset + PER_PAGE - 1);

  const { data, error, count } = await query;

  if (error) {
    console.error("Error fetching leaderboard:", error);
    return {
      entries: [],
      total: 0,
      page,
      perPage: PER_PAGE,
    };
  }

  type ProfileRow = {
    id: string;
    username: string;
    avatar_url: string | null;
    xp: number;
    level: number;
    rank: Rank;
  };

  const entries: LeaderboardEntry[] = ((data as ProfileRow[] | null) || []).map((profile, index) => ({
    rank: offset + index + 1,
    id: profile.id,
    username: profile.username,
    avatar_url: profile.avatar_url,
    xp: profile.xp,
    level: profile.level,
    rank_tier: profile.rank,
    is_current_user: profile.id === currentUserId,
  }));

  return {
    entries,
    total: count || 0,
    page,
    perPage: PER_PAGE,
  };
}

/**
 * Get a specific user's rank on the global leaderboard
 */
export async function getUserRank(userId: string): Promise<UserRankResult | null> {
  const supabase = await createClient();

  type ProfileData = {
    xp: number;
    level: number;
    rank: Rank;
  };

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("xp, level, rank")
    .eq("id", userId)
    .single();

  if (error || !profile) {
    return null;
  }

  const typedProfile = profile as ProfileData;

  // Get the count of users with more XP
  const { count } = await supabase
    .from("profiles")
    .select("id", { count: "exact", head: true })
    .gt("xp", typedProfile.xp);

  return {
    rank: (count || 0) + 1,
    xp: typedProfile.xp,
    level: typedProfile.level,
    rank_tier: typedProfile.rank,
  };
}

/**
 * Get leaderboard wins/times at #1 for a user
 * Note: This requires a leaderboard_history table to track
 */
export async function getLeaderboardWins(userId: string): Promise<number> {
  // This would require a separate table to track historical leaderboard positions
  // For now, return 0
  return 0;
}

/**
 * Get the current authenticated user's ID
 */
export async function getCurrentUserId(): Promise<string | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user?.id || null;
}
