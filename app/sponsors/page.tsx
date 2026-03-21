import { Suspense } from 'react';
import { createClient } from '@/lib/supabase/server';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { SponsorCard } from '@/components/sponsors/sponsor-card';
import { SponsorFilters } from '@/components/sponsors/sponsor-filters';
import { SponsorModal } from '@/components/sponsors/sponsor-modal';
import { getSponsors, getSponsorIndustries } from '@/lib/sponsors';
import { applyForSponsorship } from '@/lib/sponsors';
import { toast } from 'sonner';
import type { Sponsor } from '@/components/sponsors/sponsor-card';

async function SponsorsContent({
  searchParams,
}: {
  searchParams: { tier?: string; industry?: string };
}) {
  const sponsors = await getSponsors({
    tier: searchParams.tier as any,
    industry: searchParams.industry,
  });

  const industries = await getSponsorIndustries();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Sponsors Marketplace</h1>
          <p className="text-muted-foreground">
            Discover sponsors who can help accelerate your tech career
          </p>
        </div>

        {/* Filters */}
        <SponsorFilters
          onTierChange={(tier: string) => {
            // URL param update would happen via client component
          }}
          onIndustryChange={(industry: string) => {
            // URL param update would happen via client component
          }}
          industries={industries}
          selectedTier={searchParams.tier || 'all'}
          selectedIndustry={searchParams.industry || 'all'}
        />

        {/* Sponsors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {sponsors.map((sponsor) => (
            <SponsorCard
              key={sponsor.id}
              sponsor={sponsor as Sponsor}
            />
          ))}
        </div>

        {sponsors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No sponsors found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SponsorsPage({
  searchParams,
}: {
  searchParams: { tier?: string; industry?: string };
}) {
  return (
    <ProtectedRoute>
      <Suspense fallback={<SponsorsLoading />}>
        <SponsorsContent searchParams={searchParams} />
      </Suspense>
    </ProtectedRoute>
  );
}

function SponsorsLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-48 rounded-lg bg-muted animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
