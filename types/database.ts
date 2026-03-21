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
