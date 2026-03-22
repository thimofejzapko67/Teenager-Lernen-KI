import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Lock, CheckCircle, Play, Star, Zap } from "lucide-react";
import { PLATFORMS } from "@/lib/constants/platforms";
import { getLessonsByCategory } from "@/lib/lessons";
import type { LessonCategory } from "@/types/database";

export const revalidate = 300;

interface PlatformPageProps {
  params: Promise<{
    platform: string;
  }>;
}

const validPlatforms: LessonCategory[] = ["web-dev", "app-dev", "security", "ai-data"];

export async function generateStaticParams() {
  return validPlatforms.map((platform) => ({
    platform,
  }));
}

export async function generateMetadata({ params }: PlatformPageProps): Promise<Metadata> {
  const { platform } = await params;
  const platformData = PLATFORMS[platform as LessonCategory];
  
  if (!platformData) {
    return { title: "Nicht gefunden - Codelift" };
  }

  return {
    title: `${platformData.title} - Codelift`,
    description: platformData.description,
  };
}

function LessonNode({ 
  lesson, 
  index, 
  isUnlocked, 
  isCompleted 
}: { 
  lesson: any; 
  index: number; 
  isUnlocked: boolean; 
  isCompleted: boolean;
}) {
  const baseClasses = "relative flex flex-col items-center transition-all duration-300";
  
  return (
    <div className={baseClasses}>
      <div className="flex items-center gap-4">
        {index % 2 === 0 ? (
          <>
            <div className="w-32 text-right">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">
                Lektion {index + 1}
              </span>
            </div>
            <Link
              href={isUnlocked ? `/learn/${lesson.category}/${lesson.slug}` : "#"}
              className={`relative w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold transition-all ${
                isCompleted
                  ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30"
                  : isUnlocked
                  ? "bg-gradient-to-br from-primary to-secondary text-white shadow-lg shadow-primary/30 hover:scale-110 cursor-pointer"
                  : "bg-surface border-2 border-border text-muted-foreground cursor-not-allowed opacity-60"
              }`}
            >
              {isCompleted ? (
                <CheckCircle className="w-8 h-8" />
              ) : isUnlocked ? (
                <Play className="w-8 h-8" />
              ) : (
                <Lock className="w-6 h-6" />
              )}
            </Link>
            <div className="w-32">
              <p className={`font-semibold ${isUnlocked ? "text-foreground" : "text-muted-foreground"}`}>
                {lesson.title}
              </p>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Zap className="w-3 h-3 text-yellow-400" />
                {lesson.xp_reward} XP
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="w-32 text-right">
              <p className={`font-semibold ${isUnlocked ? "text-foreground" : "text-muted-foreground"}`}>
                {lesson.title}
              </p>
              <p className="text-xs text-muted-foreground flex items-center justify-end gap-1">
                <Zap className="w-3 h-3 text-yellow-400" />
                {lesson.xp_reward} XP
              </p>
            </div>
            <Link
              href={isUnlocked ? `/learn/${lesson.category}/${lesson.slug}` : "#"}
              className={`relative w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold transition-all ${
                isCompleted
                  ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30"
                  : isUnlocked
                  ? "bg-gradient-to-br from-primary to-secondary text-white shadow-lg shadow-primary/30 hover:scale-110 cursor-pointer"
                  : "bg-surface border-2 border-border text-muted-foreground cursor-not-allowed opacity-60"
              }`}
            >
              {isCompleted ? (
                <CheckCircle className="w-8 h-8" />
              ) : isUnlocked ? (
                <Play className="w-8 h-8" />
              ) : (
                <Lock className="w-6 h-6" />
              )}
            </Link>
            <div className="w-32">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">
                Lektion {index + 1}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function LearningPathSkeleton() {
  return (
    <div className="flex flex-col items-center gap-8 py-8">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex items-center gap-4">
          <div className="w-32 h-6 bg-surface animate-pulse rounded" />
          <div className="w-20 h-20 bg-surface animate-pulse rounded-2xl" />
          <div className="w-32 h-6 bg-surface animate-pulse rounded" />
        </div>
      ))}
    </div>
  );
}

async function LearningPath({ platform }: { platform: LessonCategory }) {
  const lessons = await getLessonsByCategory(platform);

  if (lessons.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
          <Star className="w-10 h-10 text-primary" />
        </div>
        <h3 className="text-2xl font-bold mb-3">Lektionen kommen bald!</h3>
        <p className="text-muted-foreground max-w-md mx-auto mb-6">
          Wir arbeiten hart daran, tolle Lektionen für diesen Track zu erstellen. 
          Schau bald wieder vorbei!
        </p>
        <Link
          href="/learn"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück zur Übersicht
        </Link>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-border -translate-x-1/2 hidden md:block" />
      
      <div className="flex flex-col items-center gap-8 py-8">
        {lessons.map((lesson, index) => (
          <LessonNode
            key={lesson.id}
            lesson={lesson}
            index={index}
            isUnlocked={index === 0}
            isCompleted={false}
          />
        ))}
      </div>
    </div>
  );
}

export default async function PlatformPage({ params }: PlatformPageProps) {
  const { platform } = await params;
  
  if (!validPlatforms.includes(platform as LessonCategory)) {
    notFound();
  }

  const platformData = PLATFORMS[platform as LessonCategory];

  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${platformData.color} opacity-10`} />
        <div className="container mx-auto px-4 py-8 relative z-10">
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück zu allen Plattformen
          </Link>
          
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{platformData.icon}</span>
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold">
                {platformData.title}
              </h1>
              <p className="text-muted-foreground mt-1">{platformData.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-6 mt-6">
            <div className="flex items-center gap-2 bg-surface/50 px-4 py-2 rounded-lg">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="font-semibold">{platformData.lessonsCount}</span>
              <span className="text-muted-foreground">Lektionen</span>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8 text-center">Dein Lernpfad</h2>
        <Suspense fallback={<LearningPathSkeleton />}>
          <LearningPath platform={platform as LessonCategory} />
        </Suspense>
      </section>
    </main>
  );
}
