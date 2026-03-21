'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import type { Project, ProjectInput } from '@/types/projects';
import type { UploadResult } from '@/types/projects';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];

/**
 * Upload screenshot to Supabase Storage
 */
export async function uploadScreenshot(
  userId: string,
  file: File
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return { success: false, error: 'File size must be less than 5MB' };
    }

    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return { success: false, error: 'Invalid file type. Please upload JPG, PNG, WebP, or GIF' };
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Generate unique filename
    const fileExt = file.name.split('.').pop() ?? 'png';
    const fileName = `${userId}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

    // Upload to Supabase Storage
    const supabase = await createClient();
    const { data, error } = await supabase.storage
      .from('project-screenshots')
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      console.error('Error uploading screenshot:', error);
      return { success: false, error: error.message };
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('project-screenshots')
      .getPublicUrl(fileName);

    return { success: true, url: publicUrl };
  } catch (error) {
    console.error('Error in uploadScreenshot:', error);
    return { success: false, error: 'Failed to upload screenshot' };
  }
}

/**
 * Create a new project
 */
export async function uploadProject(
  userId: string,
  data: ProjectInput
): Promise<UploadResult> {
  try {
    const supabase = await createClient();

    // Validate input
    if (!data.title?.trim()) {
      return { success: false, error: 'Title is required' };
    }

    if (!data.description?.trim()) {
      return { success: false, error: 'Description is required' };
    }

    if (data.title.length > 100) {
      return { success: false, error: 'Title must be less than 100 characters' };
    }

    if (data.description.length > 2000) {
      return { success: false, error: 'Description must be less than 2000 characters' };
    }

    // Validate GitHub URL if provided
    if (data.github_url) {
      try {
        const url = new URL(data.github_url);
        if (!url.hostname.includes('github.com')) {
          return { success: false, error: 'GitHub URL must be a valid GitHub repository' };
        }
      } catch {
        return { success: false, error: 'Invalid GitHub URL' };
      }
    }

    // Validate tech stack
    if (!data.tech_stack || data.tech_stack.length === 0) {
      return { success: false, error: 'At least one technology must be selected' };
    }

    if (data.tech_stack.length > 10) {
      return { success: false, error: 'Maximum 10 technologies allowed' };
    }

    // Insert project
    const { data: project, error } = await supabase
      .from('projects')
      .insert({
        user_id: userId,
        title: data.title.trim(),
        description: data.description.trim(),
        github_url: data.github_url?.trim() || null,
        screenshot_url: data.screenshot_url,
        tech_stack: data.tech_stack,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating project:', error);
      return { success: false, error: error.message };
    }

    // Revalidate paths
    revalidatePath('/projects');
    revalidatePath('/profile/[username]');

    return { success: true, project };
  } catch (error) {
    console.error('Error in uploadProject:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

/**
 * Get all projects with pagination
 */
export async function getProjects(page = 1, pageSize = 20): Promise<{
  projects: (Project & { username: string; avatar_url: string | null })[];
  total: number;
}> {
  try {
    const supabase = await createClient();
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, error, count } = await supabase
      .from('projects')
      .select(`
        *,
        profiles!inner(username, avatar_url)
      `, { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) {
      console.error('Error fetching projects:', error);
      return { projects: [], total: 0 };
    }

    // Transform data to include username and avatar_url
    const projects = (data ?? []).map((item: any) => ({
      ...item,
      username: item.profiles.username,
      avatar_url: item.profiles.avatar_url,
    }));

    return { projects, total: count ?? 0 };
  } catch (error) {
    console.error('Error in getProjects:', error);
    return { projects: [], total: 0 };
  }
}

/**
 * Get user's projects
 */
export async function getMyProjects(userId: string): Promise<Project[]> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching user projects:', error);
      return [];
    }

    return data ?? [];
  } catch (error) {
    console.error('Error in getMyProjects:', error);
    return [];
  }
}

/**
 * Get project by ID with owner info
 */
export async function getProjectById(
  projectId: string
): Promise<(Project & { username: string; avatar_url: string | null }) | null> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        profiles!inner(username, avatar_url)
      `)
      .eq('id', projectId)
      .single();

    if (error || !data) {
      return null;
    }

    return {
      ...data,
      username: (data as any).profiles.username,
      avatar_url: (data as any).profiles.avatar_url,
    };
  } catch (error) {
    console.error('Error in getProjectById:', error);
    return null;
  }
}

/**
 * Delete a project
 */
export async function deleteProject(
  projectId: string,
  userId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient();

    // Verify ownership
    const { data: project } = await supabase
      .from('projects')
      .select('user_id, screenshot_url')
      .eq('id', projectId)
      .single();

    if (!project || project.user_id !== userId) {
      return { success: false, error: 'Project not found or access denied' };
    }

    // Delete screenshot from storage if exists
    if (project.screenshot_url) {
      const fileName = project.screenshot_url.split('/').pop();
      if (fileName) {
        await supabase.storage
          .from('project-screenshots')
          .remove([`${userId}/${fileName}`]);
      }
    }

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', projectId);

    if (error) {
      console.error('Error deleting project:', error);
      return { success: false, error: error.message };
    }

    // Revalidate paths
    revalidatePath('/projects');
    revalidatePath('/profile/[username]');

    return { success: true };
  } catch (error) {
    console.error('Error in deleteProject:', error);
    return { success: false, error: 'Failed to delete project' };
  }
}

/**
 * Rate a project
 */
export async function rateProject(
  projectId: string,
  rating: number
): Promise<{ success: boolean; newAverage?: number; error?: string }> {
  try {
    if (rating < 1 || rating > 5) {
      return { success: false, error: 'Rating must be between 1 and 5' };
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: 'You must be logged in to rate' };
    }

    // Call the database function to rate
    const { data, error } = await supabase.rpc('rate_project', {
      p_user_id: user.id,
      p_project_id: projectId,
      p_rating: rating,
    });

    if (error) {
      console.error('Error rating project:', error);
      return { success: false, error: error.message };
    }

    return { success: true, newAverage: Number(data) };
  } catch (error) {
    console.error('Error in rateProject:', error);
    return { success: false, error: 'Failed to rate project' };
  }
}
