'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building2, MapPin, ExternalLink, Check } from 'lucide-react';
import { toast } from 'sonner';
import { cn, clawGradientText } from '@/lib/utils';
import type { Sponsor } from './sponsor-card';

interface SponsorModalProps {
  sponsor: Sponsor | null;
  open: boolean;
  onClose: () => void;
  onApply?: (sponsorId: string) => void;
  applied?: boolean;
}

export function SponsorModal({
  sponsor,
  open,
  onClose,
  onApply,
  applied,
}: SponsorModalProps) {
  const [isApplying, setIsApplying] = useState(false);

  if (!sponsor) return null;

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

  const handleApply = async () => {
    if (!onApply) return;

    setIsApplying(true);
    try {
      await onApply(sponsor.id);
      toast.success('Application submitted successfully!');
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to apply');
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start gap-4">
            <div className={cn(
              'w-20 h-20 rounded-lg flex items-center justify-center bg-gradient-to-br',
              tierGradients[sponsor.tier]
            )}>
              {sponsor.logo_url ? (
                <img src={sponsor.logo_url} alt={sponsor.name} className="w-full h-full object-cover rounded-lg" />
              ) : (
                <Building2 className="w-10 h-10 text-white" />
              )}
            </div>
            <div className="flex-1">
              <DialogTitle className="text-2xl mb-1">{sponsor.name}</DialogTitle>
              <div className="flex items-center gap-3">
                <Badge className={tierColors[sponsor.tier]}>
                  {sponsor.tier.charAt(0).toUpperCase() + sponsor.tier.slice(1)} Sponsor
                </Badge>
                {sponsor.industry && (
                  <span className="text-sm text-muted-foreground">{sponsor.industry}</span>
                )}
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Description */}
          {sponsor.description && (
            <div>
              <h3 className="font-semibold mb-2">About</h3>
              <p className="text-muted-foreground">{sponsor.description}</p>
            </div>
          )}

          {/* Location */}
          {sponsor.location && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              {sponsor.location}
            </div>
          )}

          {/* Website */}
          {sponsor.website && (
            <Button variant="outline" className="w-full" asChild>
              <a href={sponsor.website} target="_blank" rel="noopener noreferrer" className="gap-2">
                <ExternalLink className="w-4 h-4" />
                Visit Website
              </a>
            </Button>
          )}

          {/* Benefits */}
          {sponsor.benefits && sponsor.benefits.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3">Sponsorship Benefits</h3>
              <ul className="space-y-2">
                {sponsor.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Requirements */}
          <div className="p-4 rounded-lg bg-muted/30 border border-border">
            <h3 className="font-semibold mb-2">Requirements</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Active on the platform</li>
              <li>• Completed at least 5 lessons</li>
              <li>• Rank: Developer or higher</li>
              <li>• Positive community standing</li>
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          {onApply && (
            <Button
              onClick={handleApply}
              disabled={applied || isApplying}
              className="flex-1"
              variant={applied ? 'outline' : 'default'}
            >
              {isApplying ? 'Submitting...' : applied ? 'Already Applied' : 'Apply for Sponsorship'}
            </Button>
          )}
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
