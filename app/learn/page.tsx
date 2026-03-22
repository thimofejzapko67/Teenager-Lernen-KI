import { Suspense } from "react";
import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import { getLessons } from "@/lib/lessons";
import { LessonFilters } from "@/components/learn/lesson-filters";
import { LessonCard } from "@/components/learn/lesson-card";
import { LessonGridSkeleton } from "@/components/learn/lesson-skeleton";
import type { LessonFilters as LessonFiltersType, LessonSort } from "@/types/lessons";

export const revalidate = 300; // ISR every 5 minutes

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
        <div className="text-center py-16">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {response.lessons.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))}
      </div>

      {response.total > response.page * response.pageSize && (
        <div className="flex justify-center mt-8">
          <a
            href={`?page=${page + 1}${filters.category ? `&category=${filters.category}` : ""}${filters.difficulty ? `&difficulty=${filters.difficulty}` : ""}${filters.search ? `&search=${filters.search}` : ""}&sort=${sort}`}
            className="cyber-button px-6 py-2 bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity inline-block"
          >
            Mehr laden
          </a>
        </div>
      )}
    </>
  );
}

export default function LessonsPage({ searchParams }: LessonsPageProps) {
  // Parse search params into filters
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
      {/* Page header */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-dot-pattern opacity-30" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="container py-12 md:py-16 relative z-10 max-w-7xl mx-auto px-4">
          <span className="section-label mb-5 inline-flex">Lernplattform</span>
          <h1 className="text-4xl md:text-6xl font-display font-extrabold mt-4 mb-3">
            Lektionen
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Meistere KI-Tools, baue echte Apps und werde gesponsert. Jede Lektion bringt dich näher zum Sponsorship.
          </p>
        </div>
      </section>

      {/* Filters & Lessons */}
      <section className="container py-8 max-w-7xl mx-auto px-4">
        <Suspense fallback={<LessonGridSkeleton />}>
          <LessonsContent filters={filters} sort={sort} page={page} />
        </Suspense>
      </section>
    </main>
  );
}
