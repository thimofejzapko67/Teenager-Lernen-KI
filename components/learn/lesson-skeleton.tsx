export function LessonSkeleton() {
  return (
    <div className="bg-card/60 border border-border/50 rounded-2xl p-6 backdrop-blur-sm">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-2">
          <div className="h-5 w-20 bg-muted/30 rounded-full animate-pulse" />
          <div className="h-4 w-14 bg-muted/20 rounded animate-pulse" />
        </div>
        <div className="h-6 w-full bg-muted/30 rounded animate-pulse" />
        <div className="h-6 w-3/4 bg-muted/20 rounded animate-pulse" />
        <div className="h-5 w-20 bg-muted/20 rounded-full animate-pulse" />
        <div className="flex items-center justify-between pt-3 border-t border-border/50">
          <div className="h-4 w-16 bg-muted/20 rounded animate-pulse" />
          <div className="h-4 w-16 bg-muted/20 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export function LessonGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <LessonSkeleton key={i} />
      ))}
    </div>
  );
}
