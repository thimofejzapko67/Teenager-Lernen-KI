import { getUnreadCount } from '@/lib/notifications';
import { NextResponse } from 'next/server';

/**
 * GET /api/notifications/unread-count
 * Get unread notification count
 */
export async function GET() {
  try {
    const count = await getUnreadCount();

    return NextResponse.json({ count });
  } catch (error) {
    console.error('Error in GET /api/notifications/unread-count:', error);
    return NextResponse.json(
      { count: 0 },
      { status: 500 }
    );
  }
}
