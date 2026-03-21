'use client';

import { Building2, MapPin, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface Sponsor {
  id: string;
  name: string;
  logo_url?: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  industry?: string;
  location?: string;
  website?: string;
  description?: string;
  benefits?: string[];
}

interface SponsorCardProps {
  sponsor: Sponsor;
  onApply?: (sponsorId: string) => void;
  applied?: boolean;
}

export function SponsorCard({ sponsor, onApply, applied }: SponsorCardProps) {
  const tierColors = {
    bronze: 'bg-orange-700/20 text-orange-400 border-orange-700/50',
    silver: 'bg-slate-300/20 text-slate-300 border-slate-300/50',
    gold: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
    platinum: 'bg-cyan-400/20 text-cyan-400 border-cyan-400/50',
  };

  const tierGradients = {
    bronze: 'from-orange-700 to-orange-900',
    silver: 'from-slate-300 to-slate-500',
    gold: 'from-yellow-500 to-yellow-700',
    platinum: 'from-cyan-400 to-blue-600',
  };

  return (
    <div className="glass-card rounded-xl p-6 hover:border-primary/50 transition-all duration-300 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <div className={cn(
            'w-16 h-16 rounded-lg flex items-center justify-center bg-gradient-to-br',
            tierGradients[sponsor.tier]
          )}>
            {sponsor.logo_url ? (
              <img src={sponsor.logo_url} alt={sponsor.name} className="w-full h-full object-cover rounded-lg" />
            ) : (
              <Building2 className="w-8 h-8 text-white" />
            )}
          </div>

          <div>
            <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
              {sponsor.name}
            </h3>
            {sponsor.industry && (
              <p className="text-sm text-muted-foreground">{sponsor.industry}</p>
            )}
          </div>
        </div>

        <Badge className={tierColors[sponsor.tier]}>
          {sponsor.tier.charAt(0).toUpperCase() + sponsor.tier.slice(1)}
        </Badge>
      </div>

      {/* Description */}
      {sponsor.description && (
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {sponsor.description}
        </p>
      )}

      {/* Location */}
      {sponsor.location && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <MapPin className="w-4 h-4" />
          {sponsor.location}
        </div>
      )}

      {/* Benefits */}
      {sponsor.benefits && sponsor.benefits.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-semibold mb-2 text-muted-foreground">Benefits:</p>
          <ul className="text-sm space-y-1">
            {sponsor.benefits.slice(0, 3).map((benefit, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-primary" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2">
        {onApply && (
          <Button
            onClick={() => onApply(sponsor.id)}
            disabled={applied}
            className="flex-1"
            variant={applied ? 'outline' : 'default'}
          >
            {applied ? 'Applied' : 'Apply Now'}
          </Button>
        )}
        {sponsor.website && (
          <Button variant="outline" size="icon" asChild>
            <a href={sponsor.website} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}
