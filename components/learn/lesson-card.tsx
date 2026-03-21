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

export function LessonCard({ lesson }: LessonCardProps) {
  const categoryColor = CATEGORY_COLORS[lesson.category];
  const difficultyColor = DIFFICULTY_COLORS[lesson.difficulty];

  return (
    <Link
      href={`/learn/${lesson.category}/${lesson.slug}`}
      className="group block"
    >
      <Card
        className={cn(
          "h-full transition-all duration-300",
          "border-border/50 bg-card/50 backdrop-blur-sm",
          "hover:border-primary/50 hover:shadow-[0_0_30px_rgba(124,58,237,0.2)]",
          "hover:scale-[1.02] hover:bg-card/80"
        )}
      >
        <CardHeader className="space-y-3 pb-3">
          <div className="flex items-start justify-between gap-2">
            <Badge
              variant="outline"
              className={cn("text-xs", categoryColor)}
            >
              {lesson.category === "ki-basics"
                ? "KI-Basics"
                : lesson.category === "web-dev"
                ? "Web-Dev"
                : lesson.category === "mobile-dev"
                ? "Mobile"
                : lesson.category === "ai-agents"
                ? "KI-Agenten"
                : lesson.category === "agi-safety"
                ? "AGI-Safety"
                : "Security"}
            </Badge>
            {lesson.completed && (
              <span className="flex items-center gap-1 text-xs text-green-400">
                <CheckCircle2 className="h-4 w-4" />
                Abgeschlossen
              </span>
            )}
          </div>
          <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
            {lesson.title}
          </h3>
        </CardHeader>

        <CardContent className="space-y-3 pb-3">
          <Badge
            variant="outline"
            className={cn("text-xs w-fit", difficultyColor)}
          >
            {lesson.difficulty === "beginner"
              ? "Anfänger"
              : lesson.difficulty === "intermediate"
              ? "Fortgeschritten"
              : "Experte"}
          </Badge>

          {lesson.quiz_score !== null && lesson.quiz_score !== undefined && lesson.completed && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Quiz-Score:</span>
              <span
                className={cn(
                  "font-semibold",
                  lesson.quiz_score >= 80
                    ? "text-green-400"
                    : lesson.quiz_score >= 50
                    ? "text-yellow-400"
                    : "text-red-400"
                )}
              >
                {lesson.quiz_score}%
              </span>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex items-center justify-between text-sm text-muted-foreground pt-3 border-t border-border/50">
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>{lesson.duration} Min</span>
          </div>
          <div className="flex items-center gap-1.5 text-primary">
            <Trophy className="h-4 w-4" />
            <span className="font-semibold">+{lesson.xp_reward} XP</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
