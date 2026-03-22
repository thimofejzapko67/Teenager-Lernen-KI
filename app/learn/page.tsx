import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles, Target, BookOpen } from "lucide-react";
import { PLATFORMS } from "@/lib/constants/platforms";
import type { LessonCategory } from "@/types/database";
import { LearningPath } from "@/components/learn/learning-path";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Lernen - Codelift",
  description:
    "Wähle deinen Lernpfad: Web Development, App Development, Security oder AI & Data Science.",
};

function PlatformCard({
  platformKey,
  platform
}: {
  platformKey: LessonCategory;
  platform: typeof PLATFORMS[LessonCategory];
}) {
  return (
    <Link
      href={`/learn/${platformKey}`}
      className="group relative overflow-hidden rounded-2xl bg-card/80 backdrop-blur-xl border border-white/10 hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/25 hover:-translate-y-2 hover:scale-[1.02]"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${platform.color} opacity-0 group-hover:opacity-15 transition-opacity duration-500`} />

      <div className="relative p-8">
        <div className="flex items-center justify-between mb-6">
          <span className="text-6xl drop-shadow-lg">{platform.icon}</span>
          <ArrowRight className="w-6 h-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-2 transition-all duration-300" />
        </div>

        <h3 className="text-3xl font-bold mb-3 group-hover:text-primary transition-colors">
          {platform.title}
        </h3>

        <p className="text-muted-foreground mb-6 line-clamp-2 leading-relaxed">
          {platform.description}
        </p>

        <div className="flex items-center gap-3">
          <span className="px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm border border-primary/20">
            {platform.lessonsCount} Lektionen
          </span>
          <span className="text-xs text-muted-foreground">·</span>
          <span className="text-xs text-muted-foreground">+XP verdienen</span>
        </div>
      </div>
    </Link>
  );
}

function PlatformGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="rounded-3xl bg-card/40 border border-border/60 p-8 animate-pulse">
          <div className="h-16 w-16 rounded-2xl bg-border/60 mb-6" />
          <div className="h-10 w-48 bg-border/60 rounded mb-4" />
          <div className="h-5 w-full bg-border/60 rounded mb-2" />
          <div className="h-5 w-3/4 bg-border/60 rounded mb-6" />
          <div className="h-10 w-32 bg-border/60 rounded-full" />
        </div>
      ))}
    </div>
  );
}

function PlatformGrid() {
  const platforms = Object.entries(PLATFORMS) as [LessonCategory, typeof PLATFORMS[LessonCategory]][];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {platforms.map(([key, platform]) => (
        <PlatformCard key={key} platformKey={key} platform={platform} />
      ))}
    </div>
  );
}

export default function LearnPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-violet-500/5" />
        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary">
              <Sparkles className="w-4 h-4" />
              XP-gesichertes Lernen
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight">
              Wähle deinen{" "}
              <span className="bg-gradient-to-r from-primary via-violet-400 to-secondary bg-clip-text text-transparent">
                Lernpfad
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Starte deine Reise in die Welt der Programmierung.
              Baue echte Projekte, sammle XP und werde sponsored.
            </p>
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <div className="mb-16 space-y-4">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Target className="w-6 h-6 text-primary" />
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center">
              Dein Weg zum Ziel
            </h2>
          </div>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto text-lg">
            Wähle einen Bereich und entdecke was du lernen kannst
          </p>
        </div>
        <LearningPath />
      </section>

      {/* Platform Grid */}
      <section className="container mx-auto px-4 py-16 md:py-20 border-t border-border/40">
        <div className="mb-16 space-y-4">
          <div className="flex items-center justify-center gap-3 mb-6">
            <BookOpen className="w-6 h-6 text-primary" />
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center">
              Lernplattformen
            </h2>
          </div>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto text-lg">
            Von Grundlagen bis fortgeschrittene Konzepte
          </p>
        </div>

        <Suspense fallback={<PlatformGridSkeleton />}>
          <PlatformGrid />
        </Suspense>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden border-t border-border/40">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
        <div className="container mx-auto px-4 py-20 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Noch unsicher?{" "}
            <span className="bg-gradient-to-r from-primary via-violet-400 to-secondary bg-clip-text text-transparent">
              Starte mit Web Development
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Web Development ist der perfekte Einstieg. Du lernst die Grundlagen
            und siehst sofort Ergebnisse im Browser.
          </p>
          <Link
            href="/learn/web-dev"
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-primary to-violet-600 text-white font-semibold rounded-2xl hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-1 text-lg"
          >
            Web Development starten
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
