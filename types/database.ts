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
      // More tables...
    }
  }
}

export type Rank = 'novice' | 'coder' | 'developer' | 'architect' | 'master' | 'legend'

export type LessonCategory = 'ki-basics' | 'web-dev' | 'mobile-dev' | 'ai-agents' | 'agi-safety' | 'security'

export type Difficulty = 'beginner' | 'intermediate' | 'advanced'

export type Profile = Database['public']['Tables']['profiles']['Row']
export type Lesson = Database['public']['Tables']['lessons']['Row']
export type LessonProgress = Database['public']['Tables']['lesson_progress']['Row']

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

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirement_type: AchievementRequirementType;
  requirement_value: number;
  xp_bonus: number;
  created_at: string;
}

export interface UserAchievement {
  user_id: string;
  achievement_id: string;
  unlocked_at: string;
}

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
