'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export interface Notification {
  id: string;
  user_id: string;
  type: 'achievement' | 'lesson_complete' | 'streak' | 'sponsor' | 'system' | 'mention' | 'reply';
  title: string;
  message: string;
  link?: string;
  read: boolean;
  created_at: string;
  metadata?: Record<string, any>;
}

/**
 * Get notifications for current user
 */
export async function getNotifications(options?: {
  unreadOnly?: boolean;
  limit?: number;
}): Promise<Notification[]> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return [];
    }

    let query = supabase
      .from('notifications')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (options?.unreadOnly) {
      query = query.eq('read', false);
    }

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching notifications:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getNotifications:', error);
    return [];
  }
}

/**
 * Get unread notification count
 */
export async function getUnreadCount(): Promise<number> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return 0;
    }

    const { count, error } = await supabase
      .from('notifications')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('read', false);

    if (error) {
      console.error('Error fetching unread count:', error);
      return 0;
    }

    return count || 0;
  } catch (error) {
    console.error('Error in getUnreadCount:', error);
    return 0;
  }
}

/**
 * Mark notification as read
 */
export async function markAsRead(notificationId: string): Promise<boolean> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return false;
    }

    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', notificationId)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error marking notification as read:', error);
      return false;
    }

    revalidatePath('/notifications');
    return true;
  } catch (error) {
    console.error('Error in markAsRead:', error);
    return false;
  }
}

/**
 * Mark all notifications as read
 */
export async function markAllAsRead(): Promise<number> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return 0;
    }

    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('user_id', user.id)
      .eq('read', false);

    if (error) {
      console.error('Error marking all as read:', error);
      return 0;
    }

    revalidatePath('/notifications');

    // Get count separately
    const { count } = await supabase
      .from('notifications')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', user.id);

    return count || 0;
  } catch (error) {
    console.error('Error in markAllAsRead:', error);
    return 0;
  }
}

/**
 * Create a notification
 */
export async function createNotification(
  userId: string,
  type: Notification['type'],
  title: string,
  message: string,
  link?: string,
  metadata?: Record<string, any>
): Promise<string | null> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.rpc('create_notification', {
      p_user_id: userId,
      p_type: type,
      p_title: title,
      p_message: message,
      p_link: link || null,
      p_metadata: metadata || {},
    });

    if (error) {
      console.error('Error creating notification:', error);
      return null;
    }

    return data as string;
  } catch (error) {
    console.error('Error in createNotification:', error);
    return null;
  }
}

/**
 * Delete notification
 */
export async function deleteNotification(notificationId: string): Promise<boolean> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return false;
    }

    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', notificationId)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error deleting notification:', error);
      return false;
    }

    revalidatePath('/notifications');
    return true;
  } catch (error) {
    console.error('Error in deleteNotification:', error);
    return false;
  }
}

/**
 * Helper: Create achievement notification
 */
export async function notifyAchievement(
  userId: string,
  achievementTitle: string,
  xpBonus: number
): Promise<void> {
  await createNotification(
    userId,
    'achievement',
    'Achievement Unlocked!',
    `Congratulations! You unlocked "${achievementTitle}" and earned ${xpBonus} XP!`,
    '/achievements',
    { achievementTitle, xpBonus }
  );
}

/**
 * Helper: Create streak notification
 */
export async function notifyStreak(
  userId: string,
  streakDays: number
): Promise<void> {
  await createNotification(
    userId,
    'streak',
    '🔥 Streak Milestone!',
    `Amazing! You've maintained a ${streakDays}-day streak! Keep it up!`,
    '/dashboard'
  );
}

/**
 * Helper: Create lesson complete notification
 */
export async function notifyLessonComplete(
  userId: string,
  lessonTitle: string,
  xpEarned: number
): Promise<void> {
  await createNotification(
    userId,
    'lesson_complete',
    'Lesson Complete!',
    `You completed "${lessonTitle}" and earned ${xpEarned} XP!`,
    '/learn'
  );
}

/**
 * Helper: Create sponsor notification
 */
export async function notifySponsor(
  userId: string,
  sponsorName: string,
  message: string
): Promise<void> {
  await createNotification(
    userId,
    'sponsor',
    `Message from ${sponsorName}`,
    message,
    '/sponsors',
    { sponsorName }
  );
}
