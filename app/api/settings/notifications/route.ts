import { updateNotificationPreferences } from '@/lib/settings';
import { NextResponse } from 'next/server';

/**
 * POST /api/settings/notifications
 * Update notification preferences
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = await updateNotificationPreferences(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in POST /api/settings/notifications:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
