"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Star } from "lucide-react"
import type { Lesson } from "@/types/database"

interface LessonHeaderProps {
  lesson: Lesson
}

export function LessonHeader({ lesson }: LessonHeaderProps) {
  const difficultyMap = {
    beginner: "Anfänger",
    intermediate: "Mittel",
    advanced: "Fortgeschritten",
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-3xl">{lesson.title}</CardTitle>
            <div className="flex items-center gap-3 mt-3">
              <Badge variant="outline">{difficultyMap[lesson.difficulty]}</Badge>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                {lesson.duration} Min
              </div>
              <div className="flex items-center gap-1 text-sm text-primary font-semibold">
                <Star className="w-4 h-4" />
                {lesson.xp_reward} XP
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}
