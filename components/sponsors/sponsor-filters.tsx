'use client';

import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SponsorFiltersProps {
  onTierChange: (tier: string) => void;
  onIndustryChange: (industry: string) => void;
  industries: string[];
  selectedTier: string;
  selectedIndustry: string;
}

export function SponsorFilters({
  onTierChange,
  onIndustryChange,
  industries,
  selectedTier,
  selectedIndustry,
}: SponsorFiltersProps) {
  const tiers = [
    { value: 'all', label: 'All Tiers' },
    { value: 'platinum', label: 'Platinum' },
    { value: 'gold', label: 'Gold' },
    { value: 'silver', label: 'Silver' },
    { value: 'bronze', label: 'Bronze' },
  ];

  return (
    <div className="flex flex-wrap items-center gap-3 p-4 rounded-lg bg-muted/30 border border-border">
      <div className="flex items-center gap-2 text-sm font-medium">
        <Filter className="w-4 h-4" />
        Filters:
      </div>

      <Select value={selectedTier} onValueChange={onTierChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select tier" />
        </SelectTrigger>
        <SelectContent>
          {tiers.map((tier) => (
            <SelectItem key={tier.value} value={tier.value}>
              {tier.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedIndustry} onValueChange={onIndustryChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select industry" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Industries</SelectItem>
          {industries.map((industry) => (
            <SelectItem key={industry} value={industry}>
              {industry}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {(selectedTier !== 'all' || selectedIndustry !== 'all') && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            onTierChange('all');
            onIndustryChange('all');
          }}
        >
          Clear
        </Button>
      )}
    </div>
  );
}
