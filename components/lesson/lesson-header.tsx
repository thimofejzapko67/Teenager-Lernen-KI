"use client"

import { Clock, Star } from "lucide-react"
import type { Lesson } from "@/types/database"

interface LessonHeaderProps {
  lesson: Lesson
}

const difficultyConfig = {
  beginner:     { label: "Anfänger",       color: "#58CC02", shadow: "#46A302", bg: "#EDFAE0" },
  intermediate: { label: "Mittel",         color: "#FF9600", shadow: "#E08800", bg: "#FFF3E0" },
  advanced:     { label: "Fortgeschritten", color: "#CE82FF", shadow: "#A854F7", bg: "#F5EEFF" },
}

export function LessonHeader({ lesson }: LessonHeaderProps) {
  const diff = difficultyConfig[lesson.difficulty]

  return (
    <div className="space-y-4">
      {/* Badges */}
      <div className="flex flex-wrap items-center gap-3">
        <span
          className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-display font-800 border-2"
          style={{ background: diff.bg, color: diff.shadow, borderColor: diff.color, boxShadow: `0 2px 0 ${diff.shadow}` }}
        >
          {diff.label}
        </span>

        <span
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-display font-800 border-2"
          style={{ background: "#EBF8FE", color: "#0E9BD8", borderColor: "#1CB0F6", boxShadow: "0 2px 0 #0E9BD8" }}
        >
          <Clock className="w-3.5 h-3.5" />
          {lesson.duration} Min
        </span>

        <span
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-display font-800 border-2"
          style={{ background: "#FFF3E0", color: "#E08800", borderColor: "#FF9600", boxShadow: "0 2px 0 #E08800" }}
        >
          <Star className="w-3.5 h-3.5" />
          +{lesson.xp_reward} XP
        </span>
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-display font-900 leading-tight">
        {lesson.title}
      </h1>
    </div>
  )
}
