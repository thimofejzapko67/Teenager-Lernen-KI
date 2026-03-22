"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import Link from "next/link"
import type { Lesson, LessonProgress } from "@/types/database"

interface ContinueLearningProps {
  lesson: Lesson | null
  progress: LessonProgress | null
}

export function ContinueLearning({ lesson, progress }: ContinueLearningProps) {
  if (!lesson) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Weiterlernen</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Starte deine erste Lektion!</p>
        </CardContent>
      </Card>
    )
  }

  const isCompleted = progress?.completed_at !== null

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weiterlernen</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">{lesson.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{lesson.category}</p>
            {isCompleted ? (
              <div className="mt-3 inline-flex items-center gap-2 text-sm text-green-500 font-semibold">
                ✓ Abgeschlossen
              </div>
            ) : progress && (
              <div className="mt-3 inline-flex items-center gap-2 text-sm text-primary font-semibold">
                In Bearbeitung
              </div>
            )}
          </div>
          <Link href={`/learn/lesson/${lesson.id}`}>
            <Button className="w-full">
              <Play className="w-4 h-4 mr-2" />
              {isCompleted ? "Wiederholen" : "Fortsetzen"}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
