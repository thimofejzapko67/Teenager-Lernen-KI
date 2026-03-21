import { Card, CardContent } from "@/components/ui/card";
import { Trophy, BookOpen, Upload, Target } from "lucide-react";

interface StatsOverviewProps {
  totalXP: number;
  lessonsCompleted: number;
  projectsUploaded: number;
  currentLevel: number;
}

const STATS = [
  {
    key: "totalXP",
    label: "Total XP",
    icon: Trophy,
    color: "text-yellow-400",
    bgGradient: "from-yellow-500/20 to-amber-500/20",
    borderColor: "border-yellow-500/30",
  },
  {
    key: "lessonsCompleted",
    label: "Lessons Completed",
    icon: BookOpen,
    color: "text-green-400",
    bgGradient: "from-green-500/20 to-emerald-500/20",
    borderColor: "border-green-500/30",
  },
  {
    key: "projectsUploaded",
    label: "Projects Uploaded",
    icon: Upload,
    color: "text-cyan-400",
    bgGradient: "from-cyan-500/20 to-blue-500/20",
    borderColor: "border-cyan-500/30",
  },
  {
    key: "currentLevel",
    label: "Current Level",
    icon: Target,
    color: "text-purple-400",
    bgGradient: "from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-500/30",
  },
] as const;

export function StatsOverview({
  totalXP,
  lessonsCompleted,
  projectsUploaded,
  currentLevel,
}: StatsOverviewProps) {
  const statValues = {
    totalXP,
    lessonsCompleted,
    projectsUploaded,
    currentLevel,
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {STATS.map((stat) => {
        const Icon = stat.icon;
        const value = statValues[stat.key];

        return (
          <Card
            key={stat.key}
            className={`glass-card border ${stat.borderColor} bg-gradient-to-br ${stat.bgGradient} transition-all hover:shadow-lg hover:shadow-${stat.color.split('-')[1]}-500/10`}
          >
            <CardContent className="flex items-center gap-4 p-6">
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${stat.bgGradient} border ${stat.borderColor} shadow-lg`}>
                <Icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className={`text-2xl font-display font-bold ${stat.color}`}>
                  {stat.key === "totalXP" ? value.toLocaleString() : value}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
