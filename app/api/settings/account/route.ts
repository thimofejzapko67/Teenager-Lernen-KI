import { deleteAccount } from '@/lib/settings';
import { NextResponse } from 'next/server';

/**
 * DELETE /api/settings/account
 * Delete user account
 */
export async function DELETE() {
  try {
    const result = await deleteAccount();

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE /api/settings/account:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
