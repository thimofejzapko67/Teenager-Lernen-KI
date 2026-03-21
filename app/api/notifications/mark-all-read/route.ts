import { markAllAsRead } from '@/lib/notifications';
import { NextResponse } from 'next/server';

/**
 * POST /api/notifications/mark-all-read
 * Mark all notifications as read
 */
export async function POST() {
  try {
    const count = await markAllAsRead();

    return NextResponse.json({ success: true, count });
  } catch (error) {
    console.error('Error in POST /api/notifications/mark-all-read:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
