"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { CheckCircle2, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type LessonStatus = "completed" | "in_progress" | "locked"

interface Lesson {
  id: string
  title: string
  status: LessonStatus
}

interface LearningPathProps {
  lessons: Lesson[]
  currentLessonId?: string
}

export function LearningPath({ lessons, currentLessonId }: LearningPathProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lernpfad</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {lessons.map((lesson, index) => (
            <div
              key={lesson.id}
              className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                lesson.status === "completed"
                  ? "border-green-500/30 bg-green-500/10"
                  : lesson.status === "in_progress"
                  ? "border-primary bg-primary/10"
                  : "border-border bg-muted/30"
              }`}
            >
              <div className="flex-shrink-0">
                {lesson.status === "completed" ? (
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                ) : lesson.status === "locked" ? (
                  <Lock className="w-6 h-6 text-muted-foreground" />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-sm font-black">
                    {index + 1}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">{lesson.title}</h4>
              </div>
              {lesson.status === "in_progress" && (
                <Link href={`/learn/lesson/${lesson.id}`}>
                  <Button size="sm">Fortsetzen</Button>
                </Link>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
