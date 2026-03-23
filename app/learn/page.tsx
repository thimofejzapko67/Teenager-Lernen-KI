import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles, BookOpen, Target } from "lucide-react";
import { PLATFORMS } from "@/lib/constants/platforms";
import type { LessonCategory } from "@/types/database";
import { LearningPath } from "@/components/learn/learning-path";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Lernen - Codelift",
  description:
    "Wähle deinen Lernpfad: Web Development, App Development, Security oder AI & Data Science.",
};

const categoryConfig: Record<LessonCategory, {
  color: string;
  shadow: string;
  bg: string;
  emoji: string;
}> = {
  "web-dev":  { color: "#1CB0F6", shadow: "#0E9BD8", bg: "#EBF8FE", emoji: "🌐" },
  "app-dev":  { color: "#CE82FF", shadow: "#A854F7", bg: "#F5EEFF", emoji: "📱" },
  security:   { color: "#FF4B4B", shadow: "#EA2929", bg: "#FFEAEA", emoji: "🔐" },
  "ai-data":  { color: "#FF9600", shadow: "#E08800", bg: "#FFF3E0", emoji: "🤖" },
};

function PlatformCard({
  platformKey,
  platform,
}: {
  platformKey: LessonCategory;
  platform: typeof PLATFORMS[LessonCategory];
}) {
  const cfg = categoryConfig[platformKey];

  return (
    <Link href={`/learn/${platformKey}`} className="group block">
      <div
        className="relative overflow-hidden rounded-2xl border-[2.5px] bg-card transition-all duration-200 hover:-translate-y-1"
        style={{
          borderColor: cfg.color,
          boxShadow: `0 5px 0 ${cfg.shadow}`,
        }}
      >
        <div className="h-1.5 rounded-t-xl" style={{ background: cfg.color }} />

        <div className="p-7">
          <div className="flex items-start justify-between mb-5">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
              style={{ background: cfg.bg }}
            >
              {cfg.emoji}
            </div>
            <ArrowRight
              className="w-5 h-5 mt-1 transition-transform duration-200 group-hover:translate-x-1"
              style={{ color: cfg.color }}
            />
          </div>

          <h3 className="text-xl font-display font-800 mb-2 leading-tight">
            {platform.title}
          </h3>
          <p className="text-sm font-body text-muted-foreground leading-relaxed mb-5 line-clamp-2">
            {platform.description}
          </p>

          <span
            className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-display font-700 border-2"
            style={{ background: cfg.bg, color: cfg.shadow, borderColor: cfg.color }}
          >
            {platform.lessonsCount} Lektionen
          </span>
        </div>
      </div>
    </Link>
  );
}

function PlatformGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="rounded-2xl bg-card border-2 border-border p-7 animate-pulse">
          <div className="h-1.5 rounded-full bg-muted -mx-7 -mt-7 mb-7" />
          <div className="h-14 w-14 rounded-2xl bg-muted mb-5" />
          <div className="h-6 w-40 bg-muted rounded mb-3" />
          <div className="h-4 w-full bg-muted rounded mb-2" />
          <div className="h-4 w-3/4 bg-muted rounded mb-5" />
          <div className="h-8 w-32 bg-muted rounded-full" />
        </div>
      ))}
    </div>
  );
}

function PlatformGrid() {
  const platforms = Object.entries(PLATFORMS) as [LessonCategory, typeof PLATFORMS[LessonCategory]][];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {platforms.map(([key, platform]) => (
        <PlatformCard key={key} platformKey={key} platform={platform} />
      ))}
    </div>
  );
}

export default function LearnPage() {
  return (
    <main className="min-h-screen pb-16" style={{ background: "var(--color-background)" }}>

      {/* Hero */}
      <section className="relative overflow-hidden border-b-2 border-border bg-card">
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="container mx-auto px-4 py-16 md:py-20 relative z-10 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-display font-800 mb-5 uppercase tracking-wide"
            style={{ background: "#EDFAE0", color: "#46A302", border: "2px solid #58CC02" }}
          >
            <Sparkles className="w-4 h-4" />
            XP-gesichertes Lernen
          </div>

          <h1 className="text-5xl md:text-6xl font-display font-900 mb-4 leading-tight">
            Wähle deinen{" "}
            <span className="gradient-text">Lernpfad</span>
          </h1>
          <p className="text-lg text-muted-foreground font-body max-w-xl mx-auto leading-relaxed">
            Starte deine Reise in die Welt der Programmierung.
            Baue echte Projekte, sammle XP und werde sponsored.
          </p>
        </div>
      </section>

      {/* Learning Path */}
      <section className="container mx-auto px-4 py-14 md:py-16">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <Target className="w-5 h-5" style={{ color: "#58CC02" }} />
            <h2 className="text-3xl font-display font-900">Dein Weg zum Ziel</h2>
          </div>
          <p className="text-muted-foreground font-body">
            Wähle einen Bereich und entdecke was du lernen kannst
          </p>
        </div>
        <LearningPath />
      </section>

      {/* Platform Grid */}
      <section className="container mx-auto px-4 py-14 md:py-16 border-t-2 border-border">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <BookOpen className="w-5 h-5" style={{ color: "#1CB0F6" }} />
            <h2 className="text-3xl font-display font-900">Lernplattformen</h2>
          </div>
          <p className="text-muted-foreground font-body">
            Von Grundlagen bis fortgeschrittene Konzepte
          </p>
        </div>
        <Suspense fallback={<PlatformGridSkeleton />}>
          <PlatformGrid />
        </Suspense>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 pb-8">
        <div
          className="rounded-2xl p-8 md:p-12 text-center border-[2.5px]"
          style={{
            borderColor: "#58CC02",
            boxShadow: "0 5px 0 #46A302",
            background: "#EDFAE0",
          }}
        >
          <h2 className="text-2xl md:text-3xl font-display font-900 mb-3">
            Noch unsicher?{" "}
            <span style={{ color: "#46A302" }}>Starte mit Web Dev</span>
          </h2>
          <p className="text-muted-foreground font-body mb-6 max-w-md mx-auto text-sm">
            Web Development ist der perfekte Einstieg — du siehst sofort Ergebnisse im Browser.
          </p>
          <Link href="/learn/web-dev" className="duo-btn duo-btn-green inline-flex">
            Web Development starten
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </main>
  );
}
