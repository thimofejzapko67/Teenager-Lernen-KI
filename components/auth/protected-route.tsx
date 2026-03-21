"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "./auth-provider"
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  fallback?: string
}

export function ProtectedRoute({ children, fallback = "/auth" }: ProtectedRouteProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push(fallback)
    }
  }, [user, loading, router, fallback])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <>{children}</>
}

interface ProtectedRouteClientProps {
  children: React.ReactNode
  fallback?: string
}

export function ProtectedRouteClient({
  children,
  fallback = "/auth",
}: ProtectedRouteClientProps) {
  return <ProtectedRoute fallback={fallback}>{children}</ProtectedRoute>
}
