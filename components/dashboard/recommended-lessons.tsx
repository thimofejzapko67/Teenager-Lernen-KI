"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import type { Lesson } from "@/types/database"

interface RecommendedLessonsProps {
  lessons: Lesson[]
  userLevel: number
}

const difficultyOrder = { beginner: 1, intermediate: 2, advanced: 3 }

export function RecommendedLessons({ lessons, userLevel }: RecommendedLessonsProps) {
  const recommendedLessons = lessons
    .filter((lesson) => difficultyOrder[lesson.difficulty] <= userLevel + 1)
    .slice(0, 3)

  const difficultyLabels = {
    beginner: "Anfänger",
    intermediate: "Mittel",
    advanced: "Fortgeschritten"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Empfohlen für dich</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendedLessons.map((lesson) => (
            <div key={lesson.id} className="p-4 border-2 border-border rounded-xl hover:border-primary transition-colors">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold">{lesson.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{lesson.category}</p>
                </div>
                <Badge>{difficultyLabels[lesson.difficulty]}</Badge>
              </div>
              <Link href={`/learn/lesson/${lesson.id}`} className="mt-3 block">
                <Button variant="outline" size="sm" className="w-full">Starten</Button>
              </Link>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
