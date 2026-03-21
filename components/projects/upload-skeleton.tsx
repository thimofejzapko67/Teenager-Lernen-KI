import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

export function UploadSkeleton() {
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Form Skeleton */}
      <div className="space-y-6">
        <Card className="p-6 space-y-6 glass-card">
          <div className="space-y-2">
            <Skeleton className="h-7 w-48 bg-card/50" />
            <Skeleton className="h-4 w-64 bg-card/50" />
          </div>

          <div className="space-y-4">
            <Skeleton className="h-5 w-24 bg-card/50" />
            <Skeleton className="h-10 w-full bg-card/50" />
          </div>

          <div className="space-y-4">
            <Skeleton className="h-5 w-28 bg-card/50" />
            <Skeleton className="h-32 w-full bg-card/50" />
          </div>

          <div className="space-y-4">
            <Skeleton className="h-5 w-40 bg-card/50" />
            <Skeleton className="h-10 w-full bg-card/50" />
          </div>

          <div className="space-y-4">
            <Skeleton className="h-5 w-32 bg-card/50" />
            <Skeleton className="h-32 w-full rounded-lg bg-card/50" />
          </div>

          <div className="space-y-4">
            <Skeleton className="h-5 w-36 bg-card/50" />
            <Skeleton className="h-14 w-full bg-card/50" />
          </div>

          <div className="flex gap-3 pt-2">
            <Skeleton className="h-10 flex-1 bg-card/50" />
            <Skeleton className="h-10 flex-1 bg-card/50" />
          </div>
        </Card>
      </div>

      {/* Preview Skeleton */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-32 bg-card/50" />
          <Skeleton className="h-5 w-48 bg-card/50 rounded-full" />
        </div>
        <Card className="overflow-hidden glass-card">
          <Skeleton className="aspect-video w-full bg-card/50" />
          <div className="p-4 space-y-3">
            <Skeleton className="h-6 w-3/4 bg-card/50" />
            <Skeleton className="h-4 w-full bg-card/50" />
            <Skeleton className="h-4 w-5/6 bg-card/50" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16 bg-card/50 rounded-full" />
              <Skeleton className="h-6 w-20 bg-card/50 rounded-full" />
              <Skeleton className="h-6 w-14 bg-card/50 rounded-full" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
