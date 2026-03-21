import { Suspense } from "react";
import type { Metadata } from "next";
import { BookOpen, Sparkles } from "lucide-react";
import { getLessons } from "@/lib/lessons";
import { LessonFilters } from "@/components/learn/lesson-filters";
import { LessonCard } from "@/components/learn/lesson-card";
import { LessonGridSkeleton } from "@/components/learn/lesson-skeleton";
import type { LessonFilters as LessonFiltersType, LessonSort } from "@/types/lessons";

export const revalidate = 300; // ISR every 5 minutes

export const metadata: Metadata = {
  title: "Lektionen - ClawAcademy",
  description:
    "Entdecke KI-Kurse, Web-Entwicklung, App-Bau und mehr. Verdienne XP und level auf!",
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

async function LessonsList({
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
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <BookOpen className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Keine Lektionen gefunden</h3>
        <p className="text-muted-foreground">
          Versuche andere Filter oder Suchbegriffe.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {response.lessons.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))}
      </div>

      {/* Pagination could be added here */}
      {response.total > response.page * response.pageSize && (
        <div className="flex justify-center mt-8">
          <button
            className="cyber-button px-6 py-2 bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
          >
            Mehr laden
          </button>
        </div>
      )}
    </>
  );
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

  return (
    <>
      <LessonFilters
        filters={filters}
        sort={sort}
        totalCount={response.total}
      />
      <Suspense fallback={<LessonGridSkeleton />}>
        <LessonsList filters={filters} sort={sort} page={page} />
      </Suspense>
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
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
        <div className="container py-12 md:py-16 relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/20">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              ClawAcademy
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 neon-text">
            Lektionen
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Meistere KI-Tools, baue Apps und werde sponsored. Jede Lektion
            bringt dich closer zum Sponsorship.
          </p>
        </div>
      </section>

      {/* Filters & Lessons */}
      <section className="container py-8">
        <Suspense fallback={<LessonGridSkeleton count={1} />}>
          <LessonsContent filters={filters} sort={sort} page={page} />
        </Suspense>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border/50 bg-card/30">
        <div className="container py-12 text-center">
          <h2 className="text-2xl font-display font-bold mb-4">
            Bereit loszulegen?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Starte mit deinem ersten Tutorial und verdienne sofort 50 XP.
          </p>
          <button className="cyber-button px-8 py-3 bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity">
            Jetzt starten
          </button>
        </div>
      </section>
    </main>
  );
}
