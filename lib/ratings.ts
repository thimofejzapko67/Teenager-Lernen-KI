'use server';

import { createClient } from '@/lib/supabase/server';
import type {
  ProjectRating,
  RatingResult,
  UserRatingResult,
} from '@/types/ratings';

/**
 * Rate a project (1-5 stars)
 * Uses the database function for atomic updates
 */
export async function rateProject(
  projectId: string,
  rating: number
): Promise<RatingResult> {
  try {
    // Validate rating
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return {
        success: false,
        error: 'Rating must be between 1 and 5',
      };
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return {
        success: false,
        error: 'Authentication required',
      };
    }

    // Check if user already rated
    const { data: existingRating } = await supabase
      .from('project_ratings')
      .select('rating')
      .eq('user_id', user.id)
      .eq('project_id', projectId)
      .maybeSingle();

    let newAverage: number;
    let newCount: number;
    let newSum: number;

    if (existingRating) {
      // Update existing rating
      const { error } = await supabase
        .from('project_ratings')
        .update({ rating })
        .eq('user_id', user.id)
        .eq('project_id', projectId);

      if (error) {
        console.error('Error updating rating:', error);
        return {
          success: false,
          error: 'Failed to update rating',
        };
      }

      // Update project stats atomically
      const { data: project } = await supabase
        .from('projects')
        .select()
        .eq('id', projectId)
        .single();

      if (!project) {
        return {
          success: false,
          error: 'Project not found',
        };
      }

      newSum = (project.rating_sum || 0) - existingRating.rating + rating;
      newCount = project.rating_count || 0;
    } else {
      // Insert new rating
      const { error } = await supabase
        .from('project_ratings')
        .insert({
          user_id: user.id,
          project_id: projectId,
          rating,
        });

      if (error) {
        console.error('Error inserting rating:', error);
        return {
          success: false,
          error: 'Failed to submit rating',
        };
      }

      // Update project stats atomically
      const { data: project } = await supabase
        .from('projects')
        .select()
        .eq('id', projectId)
        .single();

      if (!project) {
        return {
          success: false,
          error: 'Project not found',
        };
      }

      newSum = (project.rating_sum || 0) + rating;
      newCount = (project.rating_count || 0) + 1;
    }

    // Update project with new stats
    const { error: updateError } = await supabase
      .from('projects')
      .update({
        rating_sum: newSum,
        rating_count: newCount,
      })
      .eq('id', projectId);

    if (updateError) {
      console.error('Error updating project stats:', updateError);
      return {
        success: false,
        error: 'Failed to update project stats',
      };
    }

    newAverage = newCount > 0 ? newSum / newCount : 0;

    return {
      success: true,
      data: {
        average: Math.round(newAverage * 10) / 10,
        count: newCount,
        userRating: rating,
      },
    };
  } catch (error) {
    console.error('Error in rateProject:', error);
    return {
      success: false,
      error: 'An unexpected error occurred',
    };
  }
}

/**
 * Get the average rating and count for a project
 */
export async function getProjectRating(
  projectId: string
): Promise<ProjectRating | null> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('projects')
      .select()
      .eq('id', projectId)
      .maybeSingle();

    if (error || !data) {
      console.error('Error fetching project rating:', error);
      return null;
    }

    const average =
      (data.rating_count || 0) > 0
        ? (data.rating_sum || 0) / (data.rating_count || 1)
        : 0;

    return {
      average: Math.round(average * 10) / 10,
      count: data.rating_count || 0,
      sum: data.rating_sum || 0,
    };
  } catch (error) {
    console.error('Error in getProjectRating:', error);
    return null;
  }
}

/**
 * Get a specific user's rating for a project
 */
export async function getUserRating(
  userId: string,
  projectId: string
): Promise<UserRatingResult> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('project_ratings')
      .select('rating')
      .eq('user_id', userId)
      .eq('project_id', projectId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching user rating:', error);
      return {
        success: false,
        error: 'Failed to fetch user rating',
      };
    }

    return {
      success: true,
      data: data?.rating ?? null,
    };
  } catch (error) {
    console.error('Error in getUserRating:', error);
    return {
      success: false,
      error: 'An unexpected error occurred',
    };
  }
}

/**
 * Get the current user's rating for a project
 */
export async function getCurrentUserRating(
  projectId: string
): Promise<UserRatingResult> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return {
        success: false,
        error: 'Authentication required',
      };
    }

    return getUserRating(user.id, projectId);
  } catch (error) {
    console.error('Error in getCurrentUserRating:', error);
    return {
      success: false,
      error: 'An unexpected error occurred',
    };
  }
}

/**
 * Get all ratings for a project (for detailed view)
 */
export async function getProjectRatings(
  projectId: string,
  limit = 10
) {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('project_ratings')
      .select(`
        rating,
        created_at,
        user_id,
        profiles(username, avatar_url, rank)
      `)
      .eq('project_id', projectId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching project ratings:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getProjectRatings:', error);
    return null;
  }
}
