import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { Lesson, LessonProgress } from "@/types/database";
import { Play, Clock } from "lucide-react";

interface ContinueLearningProps {
  lesson: Lesson | null;
  progress: LessonProgress | null;
}

const CATEGORY_CONFIG: Record<
  string,
  { label: string; emoji: string; bgClass: string; textClass: string; borderClass: string }
> = {
  "ki-basics": {
    label: "AI Basics",
    emoji: "🤖",
    bgClass: "bg-primary/20",
    textClass: "text-primary",
    borderClass: "border-primary/30",
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
    bgClass: "bg-accent/20",
    textClass: "text-accent",
    borderClass: "border-accent/30",
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

export function ContinueLearning({ lesson, progress }: ContinueLearningProps) {
  if (!lesson) {
    return (
      <Card className="glass-card border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <span className="text-5xl mb-4 animate-float">🚀</span>
          <h3 className="text-lg font-semibold mb-2">Ready to Start Learning?</h3>
          <p className="text-muted-foreground mb-4 max-w-xs">
            Begin your journey into AI development with our first lesson.
          </p>
          <Button className="bg-gradient-to-r from-primary to-primary-700 hover:from-primary/90 hover:to-primary-700/90 shadow-lg shadow-primary/20">
            Browse Lessons
          </Button>
        </CardContent>
      </Card>
    );
  }

  const categoryConfig = CATEGORY_CONFIG[lesson.category] || CATEGORY_CONFIG["ki-basics"];
  const progressPercent = progress ? 50 : 0;

  return (
    <Card className="glass-card border-primary/30 bg-gradient-to-br from-primary/10 to-transparent">
      <CardContent className="p-6">
        <div className="mb-4 flex items-center gap-2">
          <Badge
            className={`${categoryConfig.bgClass} ${categoryConfig.textClass} ${categoryConfig.borderClass} gap-1`}
          >
            {categoryConfig.emoji} {categoryConfig.label}
          </Badge>
          <span className="text-xs text-muted-foreground">In Progress</span>
        </div>

        <h3 className="mb-4 text-xl font-display font-bold">{lesson.title}</h3>

        <div className="mb-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Your Progress</span>
            <span className="font-semibold">{progressPercent}%</span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>

        <div className="mb-6 flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{lesson.duration} min left</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-yellow-400 font-semibold">+{lesson.xp_reward} XP</span>
          </div>
        </div>

        <Button className="w-full bg-gradient-to-r from-primary to-primary-700 hover:from-primary/90 hover:to-primary-700/90 shadow-lg shadow-primary/20 group">
          <Play className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
          Continue Learning
        </Button>
      </CardContent>
    </Card>
  );
}
