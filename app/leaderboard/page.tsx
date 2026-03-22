import { Suspense } from "react";
import { LeaderboardContent } from "./leaderboard-content";

export const metadata = {
  title: "Rangliste – Codelift",
  description: "Die besten Entwickler auf Codelift. Kämpfe um den ersten Platz, steige auf und werde zur Legende.",
};

export default function LeaderboardPage() {
  return (
    <main className="min-h-screen relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.04] pointer-events-none" />

      <div className="container mx-auto px-4 py-12 max-w-5xl relative z-10">
        {/* Header */}
        <div className="mb-10 text-center space-y-3">
          <span className="section-label">Wöchentlich aktualisiert</span>
          <h1 className="text-5xl md:text-7xl font-display font-extrabold neon-text mt-4">
            Rangliste
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Kämpfe um den ersten Platz. Steige auf. Werde zur Legende.
          </p>
        </div>

        {/* Leaderboard Content */}
        <Suspense fallback={<LeaderboardSkeleton />}>
          <LeaderboardContent />
        </Suspense>
      </div>
    </main>
  );
}

function LeaderboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Tabs Skeleton */}
      <div className="flex gap-2 border-b border-border/50 pb-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-10 w-24 bg-muted/30 rounded animate-pulse"
          />
        ))}
      </div>

      {/* Table Skeleton */}
      <div className="glass-card rounded-lg overflow-hidden">
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
            <div className="w-8 h-8 bg-muted/30 rounded animate-pulse" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-muted/30 rounded-full animate-pulse" />
              <div className="w-32 h-4 bg-muted/30 rounded animate-pulse" />
            </div>
            <div className="w-20 h-4 bg-muted/30 rounded animate-pulse" />
            <div className="w-16 h-4 bg-muted/30 rounded animate-pulse" />
            <div className="w-24 h-6 bg-muted/30 rounded animate-pulse" />
          </div>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="flex justify-center gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-10 w-10 bg-muted/30 rounded animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}
