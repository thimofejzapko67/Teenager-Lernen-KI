"use server"

import { createClient } from "@/lib/supabase/server"
import { unstable_cache } from "next/cache"

export interface HomeStats {
  userCount: number
  lessonCount: number
  projectCount: number
  totalXpEarned: number
}

export interface Testimonial {
  id: string
  username: string
  avatar_url: string | null
  content: string
  rank: string
  created_at: string
}

export interface Sponsor {
  id: string
  name: string
  logo_url: string | null
  website: string | null
}

/**
 * Get home page stats with caching
 * Cache for 5 minutes (300 seconds)
 */
export async function getHomeStats(): Promise<HomeStats> {
  const getCachedStats = unstable_cache(
    async () => {
      const supabase = await createClient()

      // Get user count
      const { count: userCount } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })

      // Get lesson count
      const { count: lessonCount } = await supabase
        .from("lessons")
        .select("*", { count: "exact", head: true })

      // Get project count
      const { count: projectCount } = await supabase
        .from("projects")
        .select("*", { count: "exact", head: true })

      // Get total XP earned
      const { data: xpData } = await supabase
        .from("profiles")
        .select("xp")

      const totalXpEarned = xpData?.reduce((sum, profile) => sum + (profile.xp || 0), 0) || 0

      return {
        userCount: userCount || 0,
        lessonCount: lessonCount || 0,
        projectCount: projectCount || 0,
        totalXpEarned,
      }
    },
    ["home-stats"],
    { revalidate: 300, tags: ["home-stats"] }
  )

  return getCachedStats()
}

/**
 * Get featured testimonials
 * Cache for 10 minutes (600 seconds)
 */
export async function getTestimonials(limit: number = 6): Promise<Testimonial[]> {
  const getCachedTestimonials = unstable_cache(
    async () => {
      const supabase = await createClient()

      const { data } = await supabase
        .from("testimonials")
        .select(`
          id,
          content,
          created_at,
          profiles:user_id (
            username,
            avatar_url,
            rank
          )
        `)
        .eq("featured", true)
        .order("created_at", { ascending: false })
        .limit(limit)

      if (!data) return []

      return data.map((item: any) => ({
        id: item.id,
        username: item.profiles?.username || "Anonymous",
        avatar_url: item.profiles?.avatar_url,
        content: item.content,
        rank: item.profiles?.rank || "novice",
        created_at: item.created_at,
      }))
    },
    ["testimonials"],
    { revalidate: 600, tags: ["testimonials"] }
  )

  return getCachedTestimonials()
}

/**
 * Get sponsor logos
 * Cache for 1 hour (3600 seconds)
 */
export async function getSponsors(): Promise<Sponsor[]> {
  const getCachedSponsors = unstable_cache(
    async () => {
      const supabase = await createClient()

      const { data } = await supabase
        .from("sponsors")
        .select("*")
        .eq("active", true)
        .order("name", { ascending: true })

      return data || []
    },
    ["sponsors"],
    { revalidate: 3600, tags: ["sponsors"] }
  )

  return getCachedSponsors()
}

/**
 * Get featured lessons for home page
 */
export async function getFeaturedLessons(limit: number = 3) {
  const supabase = await createClient()

  const { data } = await supabase
    .from("lessons")
    .select("*")
    .eq("published", true)
    .order("xp_reward", { ascending: false })
    .limit(limit)

  return data || []
}
