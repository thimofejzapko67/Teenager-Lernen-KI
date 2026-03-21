import { getNotifications } from '@/lib/notifications';
import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/notifications
 * Get notifications for current user
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const unreadOnly = searchParams.get('unreadOnly') === 'true';
    const limit = searchParams.get('limit')
      ? parseInt(searchParams.get('limit')!)
      : undefined;

    const notifications = await getNotifications({
      unreadOnly,
      limit,
    });

    return NextResponse.json({ notifications });
  } catch (error) {
    console.error('Error in GET /api/notifications:', error);
    return NextResponse.json(
      { error: 'Internal server error', notifications: [] },
      { status: 500 }
    );
  }
}
