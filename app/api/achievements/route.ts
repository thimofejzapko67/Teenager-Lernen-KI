import { createClient } from '@/lib/supabase/server';
import { getAchievementsWithStatus } from '@/lib/achievements';
import { NextResponse } from 'next/server';

/**
 * GET /api/achievements
 * Get all achievements with user's unlock status
 */
export async function GET() {
  try {
    const achievements = await getAchievementsWithStatus();

    return NextResponse.json(achievements);
  } catch (error) {
    console.error('Error in GET /api/achievements:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
