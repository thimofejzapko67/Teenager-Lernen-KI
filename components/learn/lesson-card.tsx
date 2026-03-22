import Link from "next/link";
import { Clock, Trophy, CheckCircle2 } from "lucide-react";
import type { LessonWithProgress } from "@/types/lessons";
import {
  CATEGORY_COLORS,
  DIFFICULTY_COLORS,
} from "@/types/lessons";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface LessonCardProps {
  lesson: LessonWithProgress;
}

const CATEGORY_GRADIENTS: Record<string, string> = {
  "ki-basics": "from-primary to-secondary",
  "web-dev": "from-blue-500 to-cyan-500",
  "mobile-dev": "from-green-500 to-emerald-500",
  "ai-agents": "from-accent to-destructive",
  "agi-safety": "from-amber-500 to-orange-500",
  security: "from-red-500 to-accent",
};

const CATEGORY_ACCENTS: Record<string, string> = {
  "ki-basics": "border-primary/20 hover:border-primary/50 group-hover:shadow-primary/10",
  "web-dev": "border-blue-500/20 hover:border-blue-500/50 group-hover:shadow-blue-500/10",
  "mobile-dev": "border-green-500/20 hover:border-green-500/50 group-hover:shadow-green-500/10",
  "ai-agents": "border-accent/20 hover:border-accent/50 group-hover:shadow-accent/10",
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
  const gradient = CATEGORY_GRADIENTS[lesson.category] || "from-primary to-secondary";
  const accent = CATEGORY_ACCENTS[lesson.category] || "border-border/50 hover:border-primary/50";

  return (
    <Link
      href={`/learn/${lesson.category}/${lesson.slug}`}
      className="group block"
    >
      <div
        className={cn(
          "h-full bg-card border-2 rounded-2xl p-6 transition-all duration-300 relative overflow-hidden",
          "hover:shadow-xl hover:-translate-y-1",
          accent
        )}
      >
        {/* Completion badge */}
        {lesson.completed && (
          <div className="absolute top-4 right-4">
            <span className="flex items-center gap-1 text-sm text-emerald-500 font-semibold bg-emerald-500/10 px-3 py-1 rounded-full">
              <CheckCircle2 className="h-4 w-4" />
              Abgeschlossen
            </span>
          </div>
        )}

        {/* Category badge */}
        <div className="mb-4">
          <Badge
            variant="outline"
            className={cn("text-xs font-medium", categoryColor)}
          >
            {CATEGORY_LABELS[lesson.category] ?? lesson.category}
          </Badge>
        </div>

        {/* Title */}
        <h3 className="font-bold text-xl leading-tight group-hover:text-primary transition-colors mb-3 pr-20">
          {lesson.title}
        </h3>

        {/* Description preview */}
        {lesson.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {lesson.description}
          </p>
        )}

        {/* Difficulty badge */}
        <Badge
          variant="outline"
          className={cn("text-xs w-fit mb-4", difficultyColor)}
        >
          {lesson.difficulty === "beginner"
            ? "Anfänger"
            : lesson.difficulty === "intermediate"
            ? "Fortgeschritten"
            : "Experte"}
        </Badge>

        {/* Quiz score */}
        {lesson.quiz_score !== null && lesson.quiz_score !== undefined && lesson.completed && (
          <div className="flex items-center gap-2 text-sm mb-4 p-3 bg-muted/50 rounded-lg">
            <span className="text-muted-foreground">Quiz-Ergebnis:</span>
            <span
              className={cn(
                "font-bold text-lg",
                lesson.quiz_score >= 80
                  ? "text-emerald-500"
                  : lesson.quiz_score >= 50
                  ? "text-yellow-500"
                  : "text-red-500"
              )}
            >
              {lesson.quiz_score}%
            </span>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between text-sm pt-4 border-t border-border/50">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span className="font-medium">{lesson.duration} Min</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={cn("inline-flex p-1.5 rounded-lg bg-gradient-to-br", gradient)}>
              <Trophy className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-primary text-lg">+{lesson.xp_reward} XP</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
