import { markAsRead } from '@/lib/notifications';
import { NextResponse } from 'next/server';

/**
 * POST /api/notifications/[id]/read
 * Mark notification as read
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const success = await markAsRead(id);

    if (!success) {
      return NextResponse.json(
        { error: 'Notification not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in POST /api/notifications/[id]/read:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
