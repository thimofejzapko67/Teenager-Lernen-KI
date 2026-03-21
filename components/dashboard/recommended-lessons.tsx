import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Lesson } from "@/types/database";
import { Clock, Zap } from "lucide-react";

interface RecommendedLessonsProps {
  lessons: Lesson[];
  userLevel: number;
}

const CATEGORY_CONFIG: Record<
  string,
  { label: string; emoji: string; bgClass: string; textClass: string; borderClass: string }
> = {
  "ki-basics": {
    label: "AI Basics",
    emoji: "🤖",
    bgClass: "bg-purple-500/20",
    textClass: "text-purple-400",
    borderClass: "border-purple-500/30",
  },
  "web-dev": {
    label: "Web Dev",
    emoji: "💻",
    bgClass: "bg-blue-500/20",
    textClass: "text-blue-400",
    borderClass: "border-blue-500/30",
  },
  "mobile-dev": {
    label: "Mobile",
    emoji: "📱",
    bgClass: "bg-cyan-500/20",
    textClass: "text-cyan-400",
    borderClass: "border-cyan-500/30",
  },
  "ai-agents": {
    label: "AI Agents",
    emoji: "🧠",
    bgClass: "bg-pink-500/20",
    textClass: "text-pink-400",
    borderClass: "border-pink-500/30",
  },
  "agi-safety": {
    label: "AI Safety",
    emoji: "🛡️",
    bgClass: "bg-red-500/20",
    textClass: "text-red-400",
    borderClass: "border-red-500/30",
  },
  "security": {
    label: "Security",
    emoji: "🔒",
    bgClass: "bg-amber-500/20",
    textClass: "text-amber-400",
    borderClass: "border-amber-500/30",
  },
};

const DIFFICULTY_CONFIG: Record<
  string,
  { label: string; bgClass: string; textClass: string; borderClass: string }
> = {
  beginner: {
    label: "Beginner",
    bgClass: "bg-blue-500/20",
    textClass: "text-blue-400",
    borderClass: "border-blue-500/30",
  },
  intermediate: {
    label: "Intermediate",
    bgClass: "bg-yellow-500/20",
    textClass: "text-yellow-400",
    borderClass: "border-yellow-500/30",
  },
  advanced: {
    label: "Advanced",
    bgClass: "bg-red-500/20",
    textClass: "text-red-400",
    borderClass: "border-red-500/30",
  },
};

export function RecommendedLessons({ lessons, userLevel }: RecommendedLessonsProps) {
  const recommendedLessons = lessons
    .filter((lesson) => {
      if (userLevel <= 3) return lesson.difficulty === "beginner";
      if (userLevel <= 7) return lesson.difficulty === "beginner" || lesson.difficulty === "intermediate";
      return true;
    })
    .slice(0, 4);

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-xl">🎯</span>
          Recommended for You
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {recommendedLessons.map((lesson) => {
          const categoryConfig = CATEGORY_CONFIG[lesson.category] || CATEGORY_CONFIG["ki-basics"];
          const difficultyConfig = DIFFICULTY_CONFIG[lesson.difficulty];

          return (
            <div
              key={lesson.id}
              className="group flex items-center gap-4 rounded-xl border border-border/50 p-4 transition-all hover:border-primary/50 hover:bg-primary/5"
            >
              <div className="flex flex-1 flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Badge
                    className={`${categoryConfig.bgClass} ${categoryConfig.textClass} ${categoryConfig.borderClass} gap-1`}
                  >
                    {categoryConfig.emoji} {categoryConfig.label}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`${difficultyConfig.bgClass} ${difficultyConfig.textClass} ${difficultyConfig.borderClass} border`}
                  >
                    {difficultyConfig.label}
                  </Badge>
                </div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {lesson.title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{lesson.duration} min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap className="h-3.5 w-3.5 text-yellow-400" />
                    <span className="text-yellow-400 font-semibold">+{lesson.xp_reward} XP</span>
                  </div>
                </div>
              </div>
              <Button
                size="sm"
                className="shrink-0 bg-gradient-to-r from-primary to-purple-700 hover:from-primary/90 hover:to-purple-700/90 shadow-lg shadow-primary/20"
              >
                Start
              </Button>
            </div>
          );
        })}

        {recommendedLessons.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <span className="text-4xl mb-2">🎓</span>
            <p className="text-muted-foreground">No lessons available yet. Check back soon!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
