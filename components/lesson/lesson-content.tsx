"use client"

import { Card } from "@/components/ui/card"

interface LessonContentProps {
  content: string
  title?: string
}

export function LessonContent({ content, title }: LessonContentProps) {
  return (
    <Card className="p-8">
      <div className="prose prose-invert max-w-none">
        {title && <h1>{title}</h1>}
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </Card>
  )
}
