import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function LessonSkeleton() {
  return (
    <Card className="h-full border-border/50 bg-card/50">
      <CardHeader className="space-y-3 pb-3">
        <div className="flex items-start justify-between gap-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-3/4" />
      </CardHeader>

      <CardContent className="space-y-3 pb-3">
        <Skeleton className="h-5 w-20" />
      </CardContent>

      <CardFooter className="flex items-center justify-between pt-3 border-t border-border/50">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-16" />
      </CardFooter>
    </Card>
  );
}

export function LessonGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <LessonSkeleton key={i} />
      ))}
    </div>
  );
}
