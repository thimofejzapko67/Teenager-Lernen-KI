"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export interface AuthResult {
  success: boolean
  error?: string
  user?: {
    id: string
    email: string
  }
}

export async function signIn(email: string, password: string): Promise<AuthResult> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return {
        success: false,
        error: getErrorMessage(error.message),
      }
    }

    if (data.user) {
      revalidatePath("/", "layout")
      return {
        success: true,
        user: {
          id: data.user.id,
          email: data.user.email ?? "",
        },
      }
    }

    return {
      success: false,
      error: "An unexpected error occurred",
    }
  } catch (error) {
    console.error("Sign in error:", error)
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    }
  }
}

export interface SignUpData {
  username: string
  email: string
  password: string
  dateOfBirth?: string
}

export async function signUp(data: SignUpData): Promise<AuthResult> {
  try {
    const supabase = await createClient()

    // Check age requirement (must be at least 13 years old)
    if (data.dateOfBirth) {
      const birthDate = new Date(data.dateOfBirth)
      const today = new Date()
      const age = today.getFullYear() - birthDate.getFullYear()
      const monthDiff = today.getMonth() - birthDate.getMonth()

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        // Not had birthday yet this year
      }

      const actualAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ? age - 1
        : age

      if (actualAge < 13) {
        return {
          success: false,
          error: "You must be at least 13 years old to use ClawAcademy.",
        }
      }

      // Parental consent check for users under 16
      if (actualAge < 16) {
        // For now, we'll note that parental consent is required
        // This could be expanded to require parent email verification
        return {
          success: false,
          error: "Users under 16 require parental consent. Please contact support.",
        }
      }
    }

    // Validate username (alphanumeric, 3-20 characters)
    const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/
    if (!usernameRegex.test(data.username)) {
      return {
        success: false,
        error: "Username must be 3-20 characters and contain only letters, numbers, underscores, and hyphens.",
      }
    }

    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          username: data.username,
        },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/auth/callback`,
      },
    })

    if (error) {
      return {
        success: false,
        error: getErrorMessage(error.message),
      }
    }

    if (authData.user) {
      // Create profile in the profiles table
      const { error: profileError } = await supabase.from("profiles").insert({
        id: authData.user.id,
        username: data.username,
        avatar_url: null,
        rank: "novice",
        xp: 0,
        level: 1,
        streak: 0,
      })

      if (profileError) {
        console.error("Profile creation error:", profileError)
        // Don't fail auth if profile creation fails - can be created later
      }

      revalidatePath("/", "layout")

      return {
        success: true,
        user: {
          id: authData.user.id,
          email: authData.user.email ?? "",
        },
      }
    }

    return {
      success: false,
      error: "An unexpected error occurred",
    }
  } catch (error) {
    console.error("Sign up error:", error)
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    }
  }
}

export async function signOut(): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient()

    const { error } = await supabase.auth.signOut()

    if (error) {
      return {
        success: false,
        error: getErrorMessage(error.message),
      }
    }

    revalidatePath("/", "layout")
    return { success: true }
  } catch (error) {
    console.error("Sign out error:", error)
    return {
      success: false,
      error: "An unexpected error occurred",
    }
  }
}

function getErrorMessage(message: string): string {
  const errorMap: Record<string, string> = {
    "Invalid login credentials": "Invalid email or password",
    "Email not confirmed": "Please verify your email before signing in",
    "User already registered": "An account with this email already exists",
    "Password should be at least 6 characters": "Password must be at least 6 characters",
    "Unable to validate email address": "Invalid email address",
    "signup_disabled": "Sign up is currently disabled",
  }

  return errorMap[message] || message
}
