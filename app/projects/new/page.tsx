import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { UploadForm } from '@/components/projects/upload-form';
import { UploadSkeleton } from '@/components/projects/upload-skeleton';
import { Upload, Sparkles } from 'lucide-react';
import { Suspense } from 'react';

export const metadata = {
  title: 'Upload Project | ClawAcademy',
  description: 'Share your AI project with the ClawAcademy community',
};

async function UploadPageContent() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth?redirect=/projects/new');
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 md:px-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/20 border border-primary/50">
              <Upload className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold text-foreground">
                Upload Project
              </h1>
              <p className="text-sm text-muted-foreground">
                Showcase your work to the community
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        {/* Info Banner */}
        <div className="mb-8 p-4 rounded-xl glass-card border border-primary/30 flex items-start gap-4">
          <div className="p-2 rounded-lg bg-accent/20 border border-accent/50 flex-shrink-0">
            <Sparkles className="h-5 w-5 text-accent" />
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-foreground">Why upload your project?</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Get feedback from other developers and AI enthusiasts</li>
              <li>• Build your portfolio and gain recognition</li>
              <li>• Earn XP and unlock achievements</li>
              <li>• Inspire others with your creations</li>
            </ul>
          </div>
        </div>

        <UploadForm userId={user.id} />
      </main>
    </div>
  );
}

export default function UploadPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <UploadPageContent />
    </Suspense>
  );
}

function LoadingState() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Skeleton */}
      <div className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 md:px-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/20 border border-primary/50 animate-pulse" />
            <div className="space-y-2">
              <div className="h-7 w-48 bg-card/50 rounded animate-pulse" />
              <div className="h-4 w-64 bg-card/50 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <div className="mb-8 p-4 rounded-xl glass-card border border-primary/30 flex items-start gap-4 animate-pulse">
          <div className="p-2 rounded-lg bg-accent/20 border border-accent/50 w-9 h-9" />
          <div className="space-y-2 flex-1">
            <div className="h-5 w-64 bg-card/50 rounded" />
            <div className="h-4 w-full bg-card/50 rounded" />
            <div className="h-4 w-3/4 bg-card/50 rounded" />
          </div>
        </div>

        <UploadSkeleton />
      </main>
    </div>
  );
}
