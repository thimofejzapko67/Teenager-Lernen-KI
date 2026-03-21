import { createClient } from '@/lib/supabase/server';
import { rateProject, getProjectRating } from '@/lib/ratings';
import { NextResponse } from 'next/server';

/**
 * GET /api/ratings?projectId=xxx
 * Get the rating for a project
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');

    if (!projectId) {
      return NextResponse.json(
        { error: 'Project ID is required' },
        { status: 400 }
      );
    }

    const rating = await getProjectRating(projectId);

    if (!rating) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      average: rating.average,
      count: rating.count,
    });
  } catch (error) {
    console.error('Error in GET /api/ratings:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/ratings
 * Submit or update a rating for a project
 *
 * Body:
 * {
 *   "projectId": string,
 *   "rating": number (1-5)
 * }
 */
export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { projectId, rating } = body;

    // Validate input
    if (!projectId) {
      return NextResponse.json(
        { error: 'Project ID is required' },
        { status: 400 }
      );
    }

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be an integer between 1 and 5' },
        { status: 400 }
      );
    }

    // Check if project exists
    const { data: project } = await supabase
      .from('projects')
      .select('id')
      .eq('id', projectId)
      .maybeSingle();

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // Submit the rating
    const result = await rateProject(projectId, rating);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to submit rating' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.data,
    });
  } catch (error) {
    console.error('Error in POST /api/ratings:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/ratings?projectId=xxx
 * Remove user's rating for a project
 */
export async function DELETE(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');

    if (!projectId) {
      return NextResponse.json(
        { error: 'Project ID is required' },
        { status: 400 }
      );
    }

    // Get the user's current rating
    const { data: existingRating } = await supabase
      .from('project_ratings')
      .select('rating')
      .eq('user_id', user.id)
      .eq('project_id', projectId)
      .maybeSingle();

    if (!existingRating) {
      return NextResponse.json(
        { error: 'Rating not found' },
        { status: 404 }
      );
    }

    // Delete the rating
    const { error: deleteError } = await supabase
      .from('project_ratings')
      .delete()
      .eq('user_id', user.id)
      .eq('project_id', projectId);

    if (deleteError) {
      console.error('Error deleting rating:', deleteError);
      return NextResponse.json(
        { error: 'Failed to delete rating' },
        { status: 500 }
      );
    }

    // Update project stats
    const { data: project } = await supabase
      .from('projects')
      .select('rating_count', 'rating_sum')
      .eq('id', projectId)
      .single();

    if (project) {
      const newSum = project.rating_sum - existingRating.rating;
      const newCount = project.rating_count - 1;

      await supabase
        .from('projects')
        .update({
          rating_sum: newSum,
          rating_count: Math.max(0, newCount),
        })
        .eq('id', projectId);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE /api/ratings:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
