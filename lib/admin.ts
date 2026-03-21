'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

/**
 * Check if current user is admin
 */
async function isAdmin(): Promise<boolean> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return false;

  // Check if user has admin role
  const { data } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  return data?.role === 'admin';
}

/**
 * Get all users with stats
 */
export async function getAllUsers(options?: {
  limit?: number;
  offset?: number;
  search?: string;
}) {
  if (!(await isAdmin())) {
    throw new Error('Unauthorized');
  }

  const supabase = await createClient();
  let query = supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });

  if (options?.search) {
    query = query.ilike('username', `%${options.search}%`);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  if (options?.offset) {
    query = query.range(options.offset, options.offset + (options.limit || 50) - 1);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching users:', error);
    return [];
  }

  return data || [];
}

/**
 * Get platform statistics
 */
export async function getPlatformStats() {
  if (!(await isAdmin())) {
    throw new Error('Unauthorized');
  }

  const supabase = await createClient();

  // Get user count
  const { count: userCount } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true });

  // Get lesson completions
  const { count: lessonCompletions } = await supabase
    .from('lesson_progress')
    .select('*', { count: 'exact', head: true })
    .not('completed_at', 'is', null);

  // Get project count
  const { count: projectCount } = await supabase
    .from('projects')
    .select('*', { count: 'exact', head: true });

  // Get total XP awarded
  const { data: xpData } = await supabase
    .from('profiles')
    .select('xp');

  const totalXPAwarded = xpData?.reduce((sum, p) => sum + (p.xp || 0), 0) || 0;

  // Get active users (last 7 days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const { count: activeUsers } = await supabase
    .from('daily_logins')
    .select('*', { count: 'exact', head: true })
    .gte('login_date', sevenDaysAgo.toISOString());

  return {
    userCount: userCount || 0,
    lessonCompletions: lessonCompletions || 0,
    projectCount: projectCount || 0,
    totalXPAwarded,
    activeUsers: activeUsers || 0,
  };
}

/**
 * Ban user
 */
export async function banUser(userId: string, reason: string) {
  if (!(await isAdmin())) {
    return { success: false, error: 'Unauthorized' };
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from('profiles')
    .update({
      banned: true,
      banned_reason: reason,
      banned_at: new Date().toISOString(),
    })
    .eq('id', userId);

  if (error) {
    console.error('Error banning user:', error);
    return { success: false, error: 'Failed to ban user' };
  }

  return { success: true };
}

/**
 * Unban user
 */
export async function unbanUser(userId: string) {
  if (!(await isAdmin())) {
    return { success: false, error: 'Unauthorized' };
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from('profiles')
    .update({
      banned: false,
      banned_reason: null,
      banned_at: null,
    })
    .eq('id', userId);

  if (error) {
    console.error('Error unbanning user:', error);
    return { success: false, error: 'Failed to unban user' };
  }

  return { success: true };
}

/**
 * Update user role
 */
export async function updateUserRole(userId: string, role: 'admin' | 'moderator' | 'user') {
  if (!(await isAdmin())) {
    return { success: false, error: 'Unauthorized' };
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from('profiles')
    .update({ role })
    .eq('id', userId);

  if (error) {
    console.error('Error updating user role:', error);
    return { success: false, error: 'Failed to update role' };
  }

  return { success: true };
}

/**
 * Get pending approvals (projects, reports, etc.)
 */
export async function getPendingApprovals() {
  if (!(await isAdmin())) {
    throw new Error('Unauthorized');
  }

  const supabase = await createClient();

  // Get pending projects
  const { data: pendingProjects } = await supabase
    .from('projects')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: false });

  return {
    projects: pendingProjects || [],
  };
}

/**
 * Approve project
 */
export async function approveProject(projectId: string) {
  if (!(await isAdmin())) {
    return { success: false, error: 'Unauthorized' };
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from('projects')
    .update({ status: 'approved' })
    .eq('id', projectId);

  if (error) {
    console.error('Error approving project:', error);
    return { success: false, error: 'Failed to approve project' };
  }

  revalidatePath('/admin');
  return { success: true };
}

/**
 * Reject project
 */
export async function rejectProject(projectId: string, reason: string) {
  if (!(await isAdmin())) {
    return { success: false, error: 'Unauthorized' };
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from('projects')
    .update({
      status: 'rejected',
      rejection_reason: reason,
    })
    .eq('id', projectId);

  if (error) {
    console.error('Error rejecting project:', error);
    return { success: false, error: 'Failed to reject project' };
  }

  revalidatePath('/admin');
  return { success: true };
}
