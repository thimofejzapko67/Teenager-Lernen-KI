'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SponsorCard } from '@/components/sponsors/sponsor-card';
import { SponsorFilters } from '@/components/sponsors/sponsor-filters';
import { SponsorModal } from '@/components/sponsors/sponsor-modal';
import type { Sponsor as SponsorType } from '@/components/sponsors/sponsor-card';

function SponsorsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sponsors, setSponsors] = useState<SponsorType[]>([]);
  const [industries, setIndustries] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const tier = searchParams.get('tier') || 'all';
  const industry = searchParams.get('industry') || 'all';

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        if (tier !== 'all') params.set('tier', tier);
        if (industry !== 'all') params.set('industry', industry);

        const response = await fetch(`/api/sponsors?${params.toString()}`);
        if (response.ok) {
          const data = await response.json();
          setSponsors(data.sponsors || data || []);
          setIndustries(data.industries || []);
        }
      } catch (error) {
        console.error('Error fetching sponsors:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [tier, industry]);

  const handleTierChange = (newTier: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newTier === 'all') {
      params.delete('tier');
    } else {
      params.set('tier', newTier);
    }
    router.push(`/sponsors?${params.toString()}`);
  };

  const handleIndustryChange = (newIndustry: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newIndustry === 'all') {
      params.delete('industry');
    } else {
      params.set('industry', newIndustry);
    }
    router.push(`/sponsors?${params.toString()}`);
  };

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
          onTierChange={handleTierChange}
          onIndustryChange={handleIndustryChange}
          industries={industries}
          selectedTier={tier}
          selectedIndustry={industry}
        />

        {/* Sponsors Grid */}
        {isLoading ? (
          <div className="space-y-6 mt-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-48 rounded-lg bg-muted animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {sponsors.map((sponsor) => (
              <SponsorCard
                key={sponsor.id}
                sponsor={sponsor as SponsorType}
              />
            ))}
          </div>
        )}

        {!isLoading && sponsors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No sponsors found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SponsorsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-48 rounded-lg bg-muted animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    }>
      <SponsorsContent />
    </Suspense>
  );
}
