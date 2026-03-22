"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Flame } from "lucide-react"

interface StreakDisplayProps {
  currentStreak: number
}

export function StreakDisplay({ currentStreak }: StreakDisplayProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-orange-500" />
          Lernserie
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-black">{currentStreak} Tage</div>
        <p className="text-sm text-muted-foreground mt-2">
          {currentStreak > 0 ? "Halte durch!" : "Starte heute!"}
        </p>
      </CardContent>
    </Card>
  )
}
