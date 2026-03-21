import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Suspense } from "react";
import { BookOpen, Sparkles } from "lucide-react";
import { getLessonByCategoryAndSlug, getLessonQuiz } from "@/lib/lessons";
import { LessonHeader } from "@/components/lesson/lesson-header";
import { LessonContent } from "@/components/lesson/lesson-content";
import { QuizSection } from "@/components/lesson/quiz-section";
import { DesktopTOC, TOC } from "@/components/lesson/toc";
import { completeLesson } from "@/lib/lessons";

interface LessonPageProps {
  params: {
    category: string;
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: LessonPageProps): Promise<Metadata> {
  const lesson = await getLessonByCategoryAndSlug(
    params.category,
    params.slug
  );

  if (!lesson) {
    return {
      title: "Lektion nicht gefunden - ClawAcademy",
    };
  }

  return {
    title: `${lesson.title} - ClawAcademy`,
    description: `Lerne ${lesson.title} bei ClawAcademy. Verdienne ${lesson.xp_reward} XP!`,
    openGraph: {
      title: lesson.title,
      description: `Lerne ${lesson.title} bei ClawAcademy`,
      type: "article",
    },
  };
}

async function LessonContentWrapper({
  category,
  slug,
}: {
  category: string;
  slug: string;
}) {
  const lesson = await getLessonByCategoryAndSlug(category, slug);

  if (!lesson) {
    notFound();
  }

  const quiz = await getLessonQuiz(lesson.id);

  return (
    <div className="lg:flex lg:gap-8">
      {/* Main Content */}
      <article className="flex-1 min-w-0">
        <div className="space-y-8">
          <LessonHeader lesson={lesson} />
          <LessonContent content={lesson.content} title={lesson.title} />

          {/* Quiz Section */}
          {quiz && (
            <section className="pt-8 border-t border-border/50">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-display font-bold">
                  Wissen testen
                </h2>
              </div>
              <QuizSection
                quiz={quiz}
                lessonId={lesson.id}
                onComplete={async (passed, score, xpAwarded) => {
                  "use server";
                  // In a real app, we'd get userId from session
                  const mockUserId = "user-1";
                  await completeLesson(mockUserId, lesson.id, score);
                }}
              />
            </section>
          )}
        </div>
      </article>

      {/* Desktop Sidebar TOC */}
      <DesktopTOC
        items={extractHeadings(lesson.content)}
        activeId=""
      />
    </div>
  );
}

// Helper function to extract headings from markdown content
function extractHeadings(content: string): Array<{
  id: string;
  text: string;
  level: number;
}> {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: Array<{ id: string; text: string; level: number }> = [];
  let match;
  let index = 0;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    headings.push({
      id: `heading-${index++}`,
      text,
      level,
    });
  }

  return headings;
}

function LessonLoadingSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="h-6 w-24 bg-card/50 rounded" />
          <div className="h-6 w-24 bg-card/50 rounded" />
        </div>
        <div className="h-12 w-3/4 bg-card/50 rounded" />
        <div className="flex gap-6">
          <div className="h-5 w-32 bg-card/50 rounded" />
          <div className="h-5 w-24 bg-card/50 rounded" />
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-4 w-full bg-card/50 rounded" />
        <div className="h-4 w-full bg-card/50 rounded" />
        <div className="h-4 w-5/6 bg-card/50 rounded" />
        <div className="h-32 w-full bg-card/50 rounded" />
      </div>
    </div>
  );
}

export default function LessonPage({ params }: LessonPageProps) {
  return (
    <main className="min-h-screen pb-16">
      {/* Hero gradient */}
      <div className="absolute inset-0 h-48 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

      <div className="container pt-8">
        {/* Back button & breadcrumb */}
        <Suspense fallback={<LessonLoadingSkeleton />}>
          <LessonContentWrapper
            category={params.category}
            slug={params.slug}
          />
        </Suspense>
      </div>

      {/* CTA Section */}
      <section className="border-t border-border/50 bg-card/30 mt-16">
        <div className="container py-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/20">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              ClawAcademy
            </span>
          </div>
          <h2 className="text-2xl font-display font-bold mb-4">
            Mehr lernen
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Entdecke weitere Lektionen und werde besser in KI, Web-Dev und mehr!
          </p>
          <a
            href="/learn"
            className="cyber-button inline-block px-8 py-3 bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity rounded"
          >
            Alle Lektionen ansehen
          </a>
        </div>
      </section>
    </main>
  );
}
