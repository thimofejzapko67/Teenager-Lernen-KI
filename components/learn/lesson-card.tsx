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

  return (
    <Link
      href={`/learn/${lesson.category}/${lesson.slug}`}
      className="group block"
    >
      <div className="h-full bg-card border-2 border-border rounded-3xl p-8 transition-all duration-500 relative overflow-hidden hover:shadow-2xl hover:-translate-y-2">
        {/* Gradient background on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Completion badge */}
        {lesson.completed && (
          <div className="absolute top-6 right-6 z-10">
            <span className="flex items-center gap-2 text-sm font-bold bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-full shadow-lg">
              <CheckCircle2 className="h-4 w-4" />
              Abgeschlossen
            </span>
          </div>
        )}

        {/* Category badge */}
        <div className="mb-5 relative z-10">
          <Badge
            variant="outline"
            className={cn("text-sm font-semibold px-4 py-1.5 rounded-full border-2", categoryColor)}
          >
            {CATEGORY_LABELS[lesson.category] ?? lesson.category}
          </Badge>
        </div>

        {/* Title */}
        <h3 className="font-bold text-2xl leading-tight mb-4 pr-24 relative z-10 group-hover:text-gradient-primary transition-all">
          {lesson.title}
        </h3>

        {/* Difficulty badge */}
        <Badge
          variant="outline"
          className={cn("text-sm font-medium px-4 py-1.5 rounded-full border-2 mb-6", difficultyColor)}
        >
          {lesson.difficulty === "beginner"
            ? "Anfänger"
            : lesson.difficulty === "intermediate"
            ? "Fortgeschritten"
            : "Experte"}
        </Badge>

        {/* Quiz score */}
        {lesson.quiz_score !== null && lesson.quiz_score !== undefined && lesson.completed && (
          <div className="flex items-center gap-3 mb-6 p-4 bg-muted/50 rounded-2xl border-2 border-border relative z-10">
            <span className="text-muted-foreground font-medium">Quiz:</span>
            <span
              className={cn(
                "font-bold text-2xl",
                lesson.quiz_score >= 80
                  ? "text-gradient-primary"
                  : lesson.quiz_score >= 50
                  ? "text-accent"
                  : "text-destructive"
              )}
            >
              {lesson.quiz_score}%
            </span>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between text-sm pt-6 border-t-2 border-border/50 relative z-10">
          <div className="flex items-center gap-3 text-muted-foreground font-medium">
            <Clock className="h-5 w-5" />
            <span className="text-base">{lesson.duration} Min</span>
          </div>
          <div className="flex items-center gap-3">
            <div className={cn("inline-flex p-2 rounded-xl bg-gradient-to-br shadow-lg", gradient)}>
              <Trophy className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-gradient-primary text-2xl">+{lesson.xp_reward}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
