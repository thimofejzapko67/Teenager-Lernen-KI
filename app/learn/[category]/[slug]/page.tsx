import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Suspense } from "react";
import { BookOpen, Star, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { getLessonByCategoryAndSlug, getLessonQuiz } from "@/lib/lessons";
import { LessonHeader } from "@/components/lesson/lesson-header";
import { LessonContent } from "@/components/lesson/lesson-content";
import { QuizSection } from "@/components/lesson/quiz-section";
import { DesktopTOC, TOC } from "@/components/lesson/toc";
import { ScrollProgress } from "@/components/lesson/scroll-progress";
import type { LessonCategory } from "@/types/database";

interface LessonPageProps {
  params: {
    category: string;
    slug: string;
  };
}

const validCategories: LessonCategory[] = ["web-dev", "app-dev", "security", "ai-data"];

const categoryLabels: Record<LessonCategory, { label: string; color: string; bg: string }> = {
  "web-dev": { label: "Web Dev", color: "#1CB0F6", bg: "#EBF8FE" },
  "app-dev": { label: "App Dev", color: "#CE82FF", bg: "#F5EEFF" },
  security: { label: "Security", color: "#FF4B4B", bg: "#FFEAEA" },
  "ai-data": { label: "AI & Data", color: "#FF9600", bg: "#FFF3E0" },
};

export async function generateMetadata({
  params,
}: LessonPageProps): Promise<Metadata> {
  const category = params.category as LessonCategory;
  if (!validCategories.includes(category)) {
    return { title: "Lektion nicht gefunden - Codelift" };
  }

  const lesson = await getLessonByCategoryAndSlug(category, params.slug);

  if (!lesson) {
    return { title: "Lektion nicht gefunden - ClawAcademy" };
  }

  return {
    title: `${lesson.title} - ClawAcademy`,
    description: `Lerne ${lesson.title} bei ClawAcademy. Verdiene ${lesson.xp_reward} XP!`,
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
  category: LessonCategory;
  slug: string;
}) {
  const lesson = await getLessonByCategoryAndSlug(category, slug);

  if (!lesson) {
    notFound();
  }

  const quiz = await getLessonQuiz(lesson.id);
  const headings = extractHeadings(lesson.content);
  const catCfg = categoryLabels[category];

  return (
    <div className="lg:flex lg:gap-8">
      {/* Main Content */}
      <article className="flex-1 min-w-0">
        <div className="space-y-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm">
            <Link
              href="/learn"
              className="flex items-center gap-1.5 font-display font-700 px-3 py-1.5 rounded-xl border-2 border-border bg-card hover:border-primary transition-colors"
              style={{ boxShadow: "0 2px 0 var(--color-border)" }}
            >
              <ChevronLeft className="w-4 h-4" />
              Lernen
            </Link>
            <span className="text-muted-foreground">/</span>
            <span
              className="px-3 py-1.5 rounded-xl text-sm font-display font-700 border-2"
              style={{
                background: catCfg.bg,
                color: catCfg.color,
                borderColor: catCfg.color,
              }}
            >
              {catCfg.label}
            </span>
          </div>

          <LessonHeader lesson={lesson} />

          {/* Mobile TOC */}
          <TOC items={headings} />

          <LessonContent content={lesson.content} title={lesson.title} />

          {/* Quiz Section */}
          {quiz && (
            <section className="pt-2">
              {/* Section header */}
              <div
                className="flex items-center gap-3 p-4 rounded-2xl mb-5 border-[2.5px]"
                style={{
                  background: "#FFF3E0",
                  borderColor: "#FF9600",
                  boxShadow: "0 3px 0 #E08800",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                  style={{ background: "#FF9600" }}
                >
                  ⚡
                </div>
                <div>
                  <h2 className="text-lg font-display font-900" style={{ color: "#E08800" }}>
                    Wissen testen
                  </h2>
                  <p className="text-xs font-body text-muted-foreground">
                    {quiz.questions.length} Fragen · Bestehe mit {quiz.passThreshold}%
                  </p>
                </div>
                <div className="ml-auto flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-display font-800"
                  style={{ background: "#EDFAE0", color: "#46A302", border: "2px solid #58CC02" }}
                >
                  <Star className="w-3.5 h-3.5" />
                  +{lesson.xp_reward} XP
                </div>
              </div>

              <QuizSection quiz={quiz} lessonId={lesson.id} />
            </section>
          )}
        </div>
      </article>

      {/* Desktop Sidebar TOC */}
      <DesktopTOC items={headings} activeId="" />
    </div>
  );
}

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
    headings.push({
      id: `heading-${index++}`,
      text: match[2].trim(),
      level: match[1].length,
    });
  }

  return headings;
}

function LessonLoadingSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 w-48 bg-card rounded-xl" />
      <div className="h-12 w-3/4 bg-card rounded-xl" />
      <div className="space-y-3">
        <div className="h-4 w-full bg-card rounded" />
        <div className="h-4 w-full bg-card rounded" />
        <div className="h-4 w-5/6 bg-card rounded" />
        <div className="h-32 w-full bg-card rounded-2xl" />
      </div>
    </div>
  );
}

export default function LessonPage({ params }: LessonPageProps) {
  return (
    <main className="min-h-screen pb-16" style={{ background: "var(--color-background)" }}>
      <ScrollProgress />

      <div className="container pt-8">
        <Suspense fallback={<LessonLoadingSkeleton />}>
          <LessonContentWrapper
            category={params.category as LessonCategory}
            slug={params.slug}
          />
        </Suspense>
      </div>

      {/* CTA Section */}
      <section className="mt-16 border-t-2 border-border bg-card">
        <div className="container py-12 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-display font-800 mb-4"
            style={{ background: "#EDFAE0", color: "#46A302", border: "2px solid #58CC02" }}
          >
            <BookOpen className="w-4 h-4" />
            ClawAcademy
          </div>
          <h2 className="text-2xl font-display font-900 mb-3">
            Mehr Lektionen entdecken
          </h2>
          <p className="text-muted-foreground font-body mb-6 max-w-md mx-auto text-sm">
            Entdecke weitere Lektionen und werde besser in KI, Web-Dev und mehr!
          </p>
          <Link
            href="/learn"
            className="duo-btn duo-btn-green inline-flex"
          >
            Alle Lektionen
          </Link>
        </div>
      </section>
    </main>
  );
}
