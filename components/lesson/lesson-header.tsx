"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Star } from "lucide-react"

interface LessonHeaderProps {
  title: string
  difficulty: "Anfänger" | "Mittel" | "Fortgeschritten"
  duration: string
  xp: number
}

export function LessonHeader({ title, difficulty, duration, xp }: LessonHeaderProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-3xl">{title}</CardTitle>
            <div className="flex items-center gap-3 mt-3">
              <Badge variant="outline">{difficulty}</Badge>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                {duration}
              </div>
              <div className="flex items-center gap-1 text-sm text-primary font-semibold">
                <Star className="w-4 h-4" />
                {xp} XP
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}
