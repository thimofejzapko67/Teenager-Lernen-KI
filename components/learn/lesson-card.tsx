import Link from "next/link";
import { Clock, Trophy, CheckCircle2 } from "lucide-react";
import type { LessonWithProgress } from "@/types/lessons";
import {
  CATEGORY_COLORS,
  DIFFICULTY_COLORS,
} from "@/types/lessons";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface LessonCardProps {
  lesson: LessonWithProgress;
}

const CATEGORY_GRADIENTS: Record<string, string> = {
  "ki-basics": "from-violet-500 to-purple-600",
  "web-dev": "from-blue-500 to-cyan-500",
  "mobile-dev": "from-green-500 to-emerald-500",
  "ai-agents": "from-pink-500 to-rose-500",
  "agi-safety": "from-amber-500 to-orange-500",
  security: "from-red-500 to-pink-500",
};

const CATEGORY_ACCENTS: Record<string, string> = {
  "ki-basics": "border-violet-500/20 hover:border-violet-500/50 group-hover:shadow-violet-500/10",
  "web-dev": "border-blue-500/20 hover:border-blue-500/50 group-hover:shadow-blue-500/10",
  "mobile-dev": "border-green-500/20 hover:border-green-500/50 group-hover:shadow-green-500/10",
  "ai-agents": "border-pink-500/20 hover:border-pink-500/50 group-hover:shadow-pink-500/10",
  "agi-safety": "border-amber-500/20 hover:border-amber-500/50 group-hover:shadow-amber-500/10",
  security: "border-red-500/20 hover:border-red-500/50 group-hover:shadow-red-500/10",
};

const CATEGORY_LABELS: Record<string, string> = {
  "ki-basics": "KI-Basics",
  "web-dev": "Web-Dev",
  "mobile-dev": "Mobile",
  "ai-agents": "KI-Agenten",
  "agi-safety": "AGI-Safety",
  security: "Security",
};

export function LessonCard({ lesson }: LessonCardProps) {
  const categoryColor = CATEGORY_COLORS[lesson.category];
  const difficultyColor = DIFFICULTY_COLORS[lesson.difficulty];
  const gradient = CATEGORY_GRADIENTS[lesson.category] || "from-primary to-violet-600";
  const accent = CATEGORY_ACCENTS[lesson.category] || "border-border/50 hover:border-primary/50";

  return (
    <Link
      href={`/learn/${lesson.category}/${lesson.slug}`}
      className="group block"
    >
      <div
        className={cn(
          "h-full bg-card/60 border rounded-2xl p-6 transition-all duration-300 backdrop-blur-sm relative overflow-hidden",
          "hover:shadow-xl hover:-translate-y-1",
          accent
        )}
      >
        {/* Top accent bar on hover */}
        <div className={cn(
          "absolute top-0 left-6 right-6 h-px bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full",
          gradient
        )} />

        {/* Category + completion */}
        <div className="flex items-start justify-between gap-2 mb-4">
          <Badge
            variant="outline"
            className={cn("text-xs", categoryColor)}
          >
            {CATEGORY_LABELS[lesson.category] ?? lesson.category}
          </Badge>
          {lesson.completed && (
            <span className="flex items-center gap-1 text-xs text-emerald-400 font-medium">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Fertig
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-semibold text-lg leading-tight group-hover:text-foreground transition-colors mb-3">
          {lesson.title}
        </h3>

        {/* Difficulty */}
        <Badge
          variant="outline"
          className={cn("text-xs w-fit mb-3", difficultyColor)}
        >
          {lesson.difficulty === "beginner"
            ? "Anfänger"
            : lesson.difficulty === "intermediate"
            ? "Fortgeschritten"
            : "Experte"}
        </Badge>

        {/* Quiz score */}
        {lesson.quiz_score !== null && lesson.quiz_score !== undefined && lesson.completed && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <span>Quiz:</span>
            <span
              className={cn(
                "font-semibold",
                lesson.quiz_score >= 80
                  ? "text-emerald-400"
                  : lesson.quiz_score >= 50
                  ? "text-yellow-400"
                  : "text-red-400"
              )}
            >
              {lesson.quiz_score}%
            </span>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between text-sm text-muted-foreground pt-3 border-t border-border/50 mt-auto">
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>{lesson.duration} Min</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className={cn("inline-flex p-1 rounded-md bg-gradient-to-br", gradient)}>
              <Trophy className="h-3 w-3 text-white" />
            </div>
            <span className="font-semibold text-foreground">+{lesson.xp_reward} XP</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
