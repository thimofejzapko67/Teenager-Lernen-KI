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
      {/* Page header */}
      <div className="relative border-b border-border/50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/8 via-transparent to-secondary/5" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.04]" />
        <div className="container mx-auto px-4 py-10 relative z-10 max-w-7xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary uppercase tracking-wider mb-4">
            Sponsorship-Programm
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
            Sponsoren-Marktplatz
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl">
            Entdecke Unternehmen, die dein Talent fördern und deine Tech-Karriere beschleunigen.
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8 max-w-7xl">

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
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">Keine Sponsoren für diese Filter gefunden.</p>
            <p className="text-sm text-muted-foreground mt-1">Versuche andere Filtereinstellungen.</p>
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
