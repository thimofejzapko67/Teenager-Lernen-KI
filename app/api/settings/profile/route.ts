import { updateProfile } from '@/lib/settings';
import { NextResponse } from 'next/server';

/**
 * POST /api/settings/profile
 * Update user profile
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = await updateProfile(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in POST /api/settings/profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
