import { createClient } from '@/lib/supabase/server';
import { recordDailyLogin, getStreakInfo } from '@/lib/streak';
import { NextResponse } from 'next/server';

/**
 * GET /api/streak
 * Get current user's streak information
 */
export async function GET() {
  try {
    const streakInfo = await getStreakInfo();

    return NextResponse.json(streakInfo);
  } catch (error) {
    console.error('Error in GET /api/streak:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/streak
 * Record daily login for the current user
 */
export async function POST() {
  try {
    const result = await recordDailyLogin();

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({
      streak: result.streak,
      achievementsUnlocked: result.achievementsUnlocked,
    });
  } catch (error) {
    console.error('Error in POST /api/streak:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
