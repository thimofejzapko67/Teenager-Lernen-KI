"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Trophy } from "lucide-react"

interface XPCardProps {
  rank: string
  level: number
  currentXP: number
  xpToNextLevel: number
}

export function XPCard({ rank, level, currentXP, xpToNextLevel }: XPCardProps) {
  const progress = (currentXP / xpToNextLevel) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5" />
          XP & Rang
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Level {level}</span>
              <span className="text-sm font-semibold">{rank}</span>
            </div>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }} />
            </div>
            <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
              <span>{currentXP} XP</span>
              <span>{xpToNextLevel} XP bis Level {level + 1}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
