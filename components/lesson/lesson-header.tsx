import { Clock, Trophy, Zap } from "lucide-react";
import type { LessonWithProgress } from "@/types/lessons";
import {
  CATEGORY_COLORS,
  DIFFICULTY_COLORS,
  CATEGORY_LABELS,
  DIFFICULTY_LABELS,
} from "@/types/lessons";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface LessonHeaderProps {
  lesson: LessonWithProgress;
}

export function LessonHeader({ lesson }: LessonHeaderProps) {
  const categoryColor = CATEGORY_COLORS[lesson.category];
  const difficultyColor = DIFFICULTY_COLORS[lesson.difficulty];
  const categoryLabel = CATEGORY_LABELS[lesson.category];
  const difficultyLabel = DIFFICULTY_LABELS[lesson.difficulty];

  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground">
        <a
          href="/learn"
          className="hover:text-primary transition-colors"
        >
          Lektionen
        </a>
        <span className="text-muted-foreground/50">/</span>
        <a
          href={`/learn?category=${lesson.category}`}
          className="hover:text-primary transition-colors"
        >
          {categoryLabel}
        </a>
        <span className="text-muted-foreground/50">/</span>
        <span className="text-foreground/70 truncate max-w-[200px]">
          {lesson.title}
        </span>
      </nav>

      {/* Title and Badges */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="outline"
            className={cn("text-xs font-medium", categoryColor)}
          >
            {categoryLabel}
          </Badge>
          <Badge
            variant="outline"
            className={cn("text-xs font-medium", difficultyColor)}
          >
            {difficultyLabel}
          </Badge>
          {lesson.completed && (
            <Badge
              variant="outline"
              className="text-xs font-medium bg-green-500/20 text-green-400 border-green-500/50"
            >
              Abgeschlossen
            </Badge>
          )}
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold neon-text leading-tight">
          {lesson.title}
        </h1>

        {/* Stats */}
        <div className="flex flex-wrap items-center gap-6 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{lesson.duration} Minuten</span>
          </div>
          <div className="flex items-center gap-2 text-primary">
            <Trophy className="h-4 w-4" />
            <span className="font-semibold">+{lesson.xp_reward} XP</span>
          </div>
          {lesson.quiz_score !== null && lesson.quiz_score !== undefined && lesson.completed && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Zap className="h-4 w-4" />
              <span>
                Quiz-Score:{" "}
                <span
                  className={cn(
                    "font-semibold",
                    lesson.quiz_score >= 90
                      ? "text-green-400"
                      : lesson.quiz_score >= 70
                      ? "text-yellow-400"
                      : "text-orange-400"
                  )}
                >
                  {lesson.quiz_score}%
                </span>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-border via-primary/30 to-border" />
    </div>
  );
}
