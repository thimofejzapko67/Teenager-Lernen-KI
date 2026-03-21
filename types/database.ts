export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          avatar_url: string | null
          rank: Rank
          xp: number
          level: number
          streak: number
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
      }
      lessons: {
        Row: {
          id: string
          title: string
          slug: string
          category: LessonCategory
          difficulty: Difficulty
          content: string
          xp_reward: number
          duration: number
          order_index: number
          quiz_data: Json | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['lessons']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['lessons']['Insert']>
      }
      lesson_progress: {
        Row: {
          user_id: string
          lesson_id: string
          completed_at: string | null
          quiz_score: number | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['lesson_progress']['Row'], 'created_at'>
        Update: Partial<Database['public']['Tables']['lesson_progress']['Insert']>
      }
      projects: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string
          github_url: string | null
          screenshot_url: string | null
          tech_stack: string[]
          rating_count: number
          rating_sum: number
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['projects']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['projects']['Insert']>
      }
      project_ratings: {
        Row: {
          user_id: string
          project_id: string
          rating: number
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['project_ratings']['Row'], 'created_at'>
        Update: Partial<Database['public']['Tables']['project_ratings']['Insert']>
      }
      achievements: {
        Row: {
          id: string
          title: string
          description: string
          icon: string
          requirement_type: AchievementRequirementType
          requirement_value: number
          xp_bonus: number
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['achievements']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['achievements']['Insert']>
      }
      user_achievements: {
        Row: {
          user_id: string
          achievement_id: string
          unlocked_at: string
        }
        Insert: Database['public']['Tables']['user_achievements']['Row']
        Update: Partial<Database['public']['Tables']['user_achievements']['Insert']>
      }
      quiz_attempts: {
        Row: {
          id: string
          user_id: string
          lesson_id: string
          score: number
          passed: boolean
          xp_earned: number
          answers: Json
          completed_at: string
          retry_available_at: string | null
        }
        Insert: Omit<Database['public']['Tables']['quiz_attempts']['Row'], 'id' | 'completed_at'>
        Update: Partial<Database['public']['Tables']['quiz_attempts']['Insert']>
      }
    }
  }
}

export type Rank = 'novice' | 'coder' | 'developer' | 'architect' | 'master' | 'legend'

export type LessonCategory = 'ki-basics' | 'web-dev' | 'mobile-dev' | 'ai-agents' | 'agi-safety' | 'security'

export type Difficulty = 'beginner' | 'intermediate' | 'advanced'

export type Profile = Database['public']['Tables']['profiles']['Row']
export type Lesson = Database['public']['Tables']['lessons']['Row']
export type LessonProgress = Database['public']['Tables']['lesson_progress']['Row']
export type Project = Database['public']['Tables']['projects']['Row']
export type ProjectRating = Database['public']['Tables']['project_ratings']['Row']
export type Achievement = Database['public']['Tables']['achievements']['Row']
export type UserAchievement = Database['public']['Tables']['user_achievements']['Row']
export type QuizAttempt = Database['public']['Tables']['quiz_attempts']['Row']

// Achievement types
export type AchievementRequirementType =
  | 'first_lesson'
  | 'streak_3'
  | 'streak_7'
  | 'streak_30'
  | 'first_project'
  | 'project_5'
  | 'project_10'
  | 'hackathon_winner'
  | 'sponsor_winner'

export interface AchievementWithUnlocked extends Achievement {
  unlocked_at?: string;
  is_unlocked: boolean;
}

// Combined types for profile page
export interface ProfileWithStats extends Profile {
  total_lessons_completed?: number;
  total_projects_uploaded?: number;
}

export interface UserStats {
  lessons_completed: number;
  projects_uploaded: number;
  current_streak: number;
  total_xp: number;
  current_rank: Rank;
  current_level: number;
  achievements_unlocked: number;
  total_achievements: number;
}

export interface UpdateProfileInput {
  username?: string;
  avatar_url?: string;
  bio?: string;
}

export interface UserProfileData {
  profile: ProfileWithStats | null;
  achievements: AchievementWithUnlocked[];
  stats: UserStats | null;
  isOwnProfile: boolean;
}
