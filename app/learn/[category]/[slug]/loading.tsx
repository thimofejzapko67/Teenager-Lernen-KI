import { Skeleton } from "@/components/ui/skeleton";

export default function LessonLoading() {
  return (
    <main className="min-h-screen pb-16">
      <div className="absolute inset-0 h-48 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

      <div className="container pt-8">
        <div className="lg:flex lg:gap-8">
          {/* Main Content Skeleton */}
          <article className="flex-1 min-w-0 space-y-8">
            {/* Header Skeleton */}
            <div className="space-y-4">
              <div className="flex gap-2">
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>
              <Skeleton className="h-12 w-3/4 rounded" />
              <div className="flex gap-6">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-5 w-24" />
              </div>
            </div>

            {/* Content Skeleton */}
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-64 w-full rounded-lg" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>

            {/* Quiz Skeleton */}
            <div className="border-t border-border/50 pt-8 space-y-4">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-64 w-full rounded-lg" />
            </div>
          </article>

          {/* Sidebar Skeleton */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="glass-card rounded-lg p-4 space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
