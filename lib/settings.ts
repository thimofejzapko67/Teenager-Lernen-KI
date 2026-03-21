'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

/**
 * Update user profile
 */
export async function updateProfile(data: {
  username?: string;
  bio?: string;
  avatar_url?: string;
}) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: 'Authentication required' };
    }

    // Validate username if provided
    if (data.username) {
      if (data.username.length < 3 || data.username.length > 20) {
        return { success: false, error: 'Username must be 3-20 characters' };
      }

      // Check if username is taken
      const { data: existing } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', data.username)
        .neq('id', user.id)
        .maybeSingle();

      if (existing) {
        return { success: false, error: 'Username already taken' };
      }
    }

    const { error } = await supabase
      .from('profiles')
      .update(data)
      .eq('id', user.id);

    if (error) {
      console.error('Error updating profile:', error);
      return { success: false, error: 'Failed to update profile' };
    }

    revalidatePath('/profile/[username]');
    revalidatePath('/settings');

    return { success: true };
  } catch (error) {
    console.error('Error in updateProfile:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

/**
 * Update notification preferences
 */
export async function updateNotificationPreferences(data: {
  email_notifications?: boolean;
  achievement_alerts?: boolean;
  weekly_summary?: boolean;
  sponsor_updates?: boolean;
}) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: 'Authentication required' };
    }

    const { error } = await supabase
      .from('profiles')
      .update({
        email_notifications: data.email_notifications,
        achievement_alerts: data.achievement_alerts,
        weekly_summary: data.weekly_summary,
        sponsor_updates: data.sponsor_updates,
      })
      .eq('id', user.id);

    if (error) {
      console.error('Error updating notification preferences:', error);
      return { success: false, error: 'Failed to update preferences' };
    }

    return { success: true };
  } catch (error) {
    console.error('Error in updateNotificationPreferences:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

/**
 * Change password
 */
export async function changePassword(data: {
  currentPassword: string;
  newPassword: string;
}) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: 'Authentication required' };
    }

    // Verify current password by attempting to sign in
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email!,
      password: data.currentPassword,
    });

    if (signInError) {
      return { success: false, error: 'Current password is incorrect' };
    }

    // Update password
    const { error } = await supabase.auth.updateUser({
      password: data.newPassword,
    });

    if (error) {
      console.error('Error changing password:', error);
      return { success: false, error: 'Failed to change password' };
    }

    return { success: true };
  } catch (error) {
    console.error('Error in changePassword:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

/**
 * Delete user account
 */
export async function deleteAccount() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: 'Authentication required' };
    }

    // Delete user data (cascade will handle related records)
    const { error: profileError } = await supabase
      .from('profiles')
      .delete()
      .eq('id', user.id);

    if (profileError) {
      console.error('Error deleting profile:', profileError);
      return { success: false, error: 'Failed to delete profile' };
    }

    // Delete auth user
    const { error } = await supabase.auth.admin.deleteUser(user.id);

    if (error) {
      console.error('Error deleting auth user:', error);
      return { success: false, error: 'Failed to delete account' };
    }

    return { success: true };
  } catch (error) {
    console.error('Error in deleteAccount:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

/**
 * Get user settings
 */
export async function getUserSettings() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return null;
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error || !data) {
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getUserSettings:', error);
    return null;
  }
}
