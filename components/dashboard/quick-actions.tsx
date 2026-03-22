import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Upload, Trophy, Zap } from "lucide-react";

const QUICK_ACTIONS = [
  {
    label: "Lektion starten",
    icon: BookOpen,
    href: "/learn",
    description: "Lerne weiter und steige auf",
    gradient: "from-primary to-primary-700",
  },
  {
    label: "Projekt hochladen",
    icon: Upload,
    href: "/projects/upload",
    description: "Teile deine Arbeit mit der Community",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    label: "Rangliste",
    icon: Trophy,
    href: "/leaderboard",
    description: "Sieh die besten Entwickler",
    gradient: "from-amber-500 to-orange-600",
  },
] as const;

export function QuickActions() {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-yellow-400" />
          Schnellzugriff
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {QUICK_ACTIONS.map((action) => {
          const Icon = action.icon;
          return (
            <Button
              key={action.label}
              variant="outline"
              className={`group relative h-auto flex-col items-start gap-2 border-border/50 p-4 transition-all hover:border-primary/50 hover:bg-primary/5 hover:shadow-lg hover:shadow-primary/10`}
              asChild
            >
              <a href={action.href}>
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${action.gradient} shadow-lg`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div className="flex flex-col items-start gap-0.5 text-left">
                  <span className="font-semibold text-sm group-hover:text-primary transition-colors">
                    {action.label}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {action.description}
                  </span>
                </div>
              </a>
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
}
