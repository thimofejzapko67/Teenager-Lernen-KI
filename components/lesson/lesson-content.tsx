"use client"

import { Card } from "@/components/ui/card"

interface LessonContentProps {
  content: string
}

export function LessonContent({ content }: LessonContentProps) {
  return (
    <Card className="p-8">
      <div className="prose prose-invert max-w-none">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </Card>
  )
}
