import { Suspense } from "react";
import type { Metadata } from "next";
import { BookOpen, Sparkles, ArrowRight } from "lucide-react";
import { getLessons } from "@/lib/lessons";
import { LessonFilters } from "@/components/learn/lesson-filters";
import { LessonCard } from "@/components/learn/lesson-card";
import { LessonGridSkeleton } from "@/components/learn/lesson-skeleton";
import { LearnHero } from "@/components/learn/learn-hero";
import type { LessonFilters as LessonFiltersType, LessonSort } from "@/types/lessons";
import Link from "next/link";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Lektionen - Codelift",
  description:
    "Entdecke KI-Kurse, Web-Entwicklung, App-Bau und mehr. Verdiene XP und level auf!",
};

interface LessonsPageProps {
  searchParams: {
    category?: string;
    difficulty?: string;
    search?: string;
    sort?: string;
    page?: string;
  };
}

async function LessonsContent({
  filters,
  sort,
  page,
}: {
  filters: LessonFiltersType;
  sort: LessonSort;
  page: number;
}) {
  const response = await getLessons(filters, sort, page);

  if (response.lessons.length === 0) {
    return (
      <>
        <LessonFilters filters={filters} sort={sort} totalCount={0} />
        <div className="text-center py-20">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Keine Lektionen gefunden</h3>
          <p className="text-muted-foreground">
            Versuche andere Filter oder Suchbegriffe.
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <LessonFilters
        filters={filters}
        sort={sort}
        totalCount={response.total}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {response.lessons.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))}
      </div>

      {response.total > response.page * response.pageSize && (
        <div className="flex justify-center mt-10">
          <a
            href={`?page=${page + 1}${filters.category ? `&category=${filters.category}` : ""}${filters.difficulty ? `&difficulty=${filters.difficulty}` : ""}${filters.search ? `&search=${filters.search}` : ""}&sort=${sort}`}
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-violet-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5"
          >
            Mehr laden
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      )}
    </>
  );
}

export default function LessonsPage({ searchParams }: LessonsPageProps) {
  const filters: LessonFiltersType = {
    category:
      (searchParams.category as any) === "all"
        ? undefined
        : (searchParams.category as any) || undefined,
    difficulty:
      (searchParams.difficulty as any) === "all"
        ? undefined
        : (searchParams.difficulty as any) || undefined,
    search: searchParams.search || undefined,
  };

  const sort: LessonSort =
    (searchParams.sort as LessonSort) || "newest";

  const page = parseInt(searchParams.page || "1", 10);

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <LearnHero />

      {/* Filters & Lessons */}
      <section className="container mx-auto px-4 py-10 md:py-14">
        <Suspense fallback={<LessonGridSkeleton />}>
          <LessonsContent filters={filters} sort={sort} page={page} />
        </Suspense>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden border-t border-border/50">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
        <div className="container mx-auto px-4 py-16 text-center relative z-10">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
            Bereit <span className="bg-gradient-to-r from-primary via-violet-400 to-secondary bg-clip-text text-transparent">loszulegen</span>?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Starte mit deinem ersten Tutorial und verdiene sofort 50 XP.
          </p>
          <Link
            href="/auth"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-violet-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5"
          >
            Jetzt starten
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
