"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { User } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase/server"
import { User as AuthUser } from "@supabase/auth-js"

interface AuthContextType {
  user: AuthUser | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (data: {
    username: string
    email: string
    password: string
    dateOfBirth?: string
  }) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    async function loadUser() {
      try {
        const supabase = await createClient()
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (mounted) {
          setUser(user)
          setLoading(false)
        }
      } catch (error) {
        console.error("Error loading user:", error)
        if (mounted) {
          setUser(null)
          setLoading(false)
        }
      }
    }

    loadUser()

    return () => {
      mounted = false
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    const { signIn } = await import("@/lib/auth")
    const result = await signIn(email, password)

    if (!result.success) {
      throw new Error(result.error || "Failed to sign in")
    }

    // Reload user after sign in
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    setUser(user)
  }

  const signUp = async (data: {
    username: string
    email: string
    password: string
    dateOfBirth?: string
  }) => {
    const { signUp } = await import("@/lib/auth")
    const result = await signUp(data)

    if (!result.success) {
      throw new Error(result.error || "Failed to sign up")
    }

    // Reload user after sign up
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    setUser(user)
  }

  const signOut = async () => {
    const { signOut } = await import("@/lib/auth")
    await signOut()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
