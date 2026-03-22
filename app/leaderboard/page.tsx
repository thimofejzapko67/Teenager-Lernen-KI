import { Suspense } from "react";
import { LeaderboardContent } from "./leaderboard-content";
import { LeaderboardHero } from "@/components/leaderboard/leaderboard-hero";

export const metadata = {
  title: "Rangliste – Codelift",
  description: "Die besten Entwickler auf Codelift. Kämpfe um den ersten Platz, steige auf und werde zur Legende.",
};

export default function LeaderboardPage() {
  return (
    <main className="min-h-screen relative">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.04] pointer-events-none" />

      <LeaderboardHero />

      <section className="container mx-auto px-4 py-10 md:py-14 max-w-5xl relative z-10">
        <Suspense fallback={<LeaderboardSkeleton />}>
          <LeaderboardContent />
        </Suspense>
      </section>
    </main>
  );
}

function LeaderboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 pb-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-11 w-24 bg-muted/30 rounded-xl animate-pulse"
          />
        ))}
      </div>

      <div className="glass-card rounded-2xl p-6 mb-6 animate-pulse">
        <div className="flex items-center justify-center gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 bg-muted/30 rounded-full" />
              <div className="w-24 h-4 bg-muted/30 rounded" />
              <div className="w-16 h-3 bg-muted/30 rounded" />
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-4 py-3 border-b border-border/50 bg-muted/30">
          <div className="w-8 h-4 bg-muted/50 rounded animate-pulse" />
          <div className="h-4 bg-muted/50 rounded animate-pulse" />
          <div className="w-20 h-4 bg-muted/50 rounded animate-pulse" />
          <div className="w-16 h-4 bg-muted/50 rounded animate-pulse" />
          <div className="w-24 h-4 bg-muted/50 rounded animate-pulse" />
        </div>
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-4 py-3 border-b border-border/30 items-center"
          >
            <div className="w-8 h-8 bg-muted/30 rounded-lg animate-pulse" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-muted/30 rounded-full animate-pulse" />
              <div className="space-y-2">
                <div className="w-32 h-4 bg-muted/30 rounded animate-pulse" />
                <div className="w-16 h-3 bg-muted/30 rounded animate-pulse" />
              </div>
            </div>
            <div className="w-20 h-4 bg-muted/30 rounded animate-pulse" />
            <div className="w-16 h-4 bg-muted/30 rounded animate-pulse" />
            <div className="w-24 h-6 bg-muted/30 rounded animate-pulse" />
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-10 w-10 bg-muted/30 rounded-lg animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}
