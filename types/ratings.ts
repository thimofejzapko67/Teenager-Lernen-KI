/**
 * Rating types for the project rating system
 */

export interface Rating {
  user_id: string;
  project_id: string;
  rating: number;
  created_at: string;
}

export interface RatingInput {
  userId: string;
  projectId: string;
  rating: number;
}

export interface ProjectRating {
  average: number;
  count: number;
  sum: number;
}

export interface RatingResult {
  success: boolean;
  data?: {
    average: number;
    count: number;
    userRating?: number;
  };
  error?: string;
}

export interface UserRatingResult {
  success: boolean;
  data?: number | null;
  error?: string;
}
