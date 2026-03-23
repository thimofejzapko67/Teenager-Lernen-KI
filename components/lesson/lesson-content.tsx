"use client"

interface LessonContentProps {
  content: string
  title?: string
}

export function LessonContent({ content }: LessonContentProps) {
  return (
    <div
      className="rounded-2xl border-[2.5px] border-border bg-card overflow-hidden"
      style={{ boxShadow: "0 4px 0 var(--color-border)" }}
    >
      <div
        className="prose prose-base max-w-none p-6 md:p-8"
        style={{
          "--tw-prose-headings": "#1C1C1C",
          "--tw-prose-body": "#3D3D3D",
          "--tw-prose-bold": "#1C1C1C",
          "--tw-prose-links": "#1CB0F6",
          "--tw-prose-code": "#CE82FF",
          "--tw-prose-pre-bg": "#1C1C1C",
          "--tw-prose-counters": "#58CC02",
          "--tw-prose-bullets": "#58CC02",
        } as React.CSSProperties}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  )
}
