import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
      className="group relative overflow-hidden rounded-2xl bg-surface border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${platform.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
      
      <div className="relative p-8">
        <div className="flex items-center justify-between mb-6">
          <span className="text-5xl">{platform.icon}</span>
          <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
        </div>
        
        <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
          {platform.title}
        </h3>
        
        <p className="text-muted-foreground mb-6 line-clamp-2">
          {platform.description}
        </p>
        
        <div className="flex items-center gap-2 text-sm">
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
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
        <div key={i} className="rounded-2xl bg-surface border border-border p-8 animate-pulse">
          <div className="h-12 w-12 rounded-full bg-border mb-6" />
          <div className="h-8 w-48 bg-border rounded mb-4" />
          <div className="h-4 w-full bg-border rounded mb-2" />
          <div className="h-4 w-3/4 bg-border rounded mb-6" />
          <div className="h-8 w-24 bg-border rounded-full" />
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
    <main className="min-h-screen">
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-violet-500/5" />
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              Wähle deinen{" "}
              <span className="bg-gradient-to-r from-primary via-violet-400 to-secondary bg-clip-text text-transparent">
                Lernpfad
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Starte deine Reise in die Welt der Programmierung. 
              Klicke auf eine Plattform um mit den Lektionen zu beginnen.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-4 text-center">
            Lernpfad Übersicht
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto">
            Wähle einen Bereich um mehr zu erfahren
          </p>
          <LearningPath />
        </div>
        
        <Suspense fallback={<PlatformGridSkeleton />}>
          <PlatformGrid />
        </Suspense>
      </section>

      <section className="relative overflow-hidden border-t border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
        <div className="container mx-auto px-4 py-16 text-center relative z-10">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
            Noch unsicher?{" "}
            <span className="bg-gradient-to-r from-primary via-violet-400 to-secondary bg-clip-text text-transparent">
              Starte mit Web Development
            </span>
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Web Development ist der perfekte Einstieg. Du lernst die Grundlagen 
            und siehst sofort Ergebnisse im Browser.
          </p>
          <Link
            href="/learn/web-dev"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-violet-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5"
          >
            Web Development starten
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
