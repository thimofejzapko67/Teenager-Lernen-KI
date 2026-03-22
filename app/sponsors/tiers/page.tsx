import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Award,
  Building2,
  Users,
  Rocket,
  DollarSign,
  Check,
  Mail,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const tiers = [
  {
    id: 'platinum',
    name: 'Platinum',
    description: 'Premium-Sponsoring für maximale Sichtbarkeit und Wirkung',
    color: 'from-cyan-400 to-blue-600',
    bgColor: 'bg-cyan-400/10',
    borderColor: 'border-cyan-400/30',
    textColor: 'text-cyan-400',
    price: '€5,000+',
    features: [
      'Topplatzierung im Sponsoren-Marktplatz',
      'Exklusiver Featured-Spot auf der Startseite',
      'Direktzugang zu den Top-10-Entwicklern',
      'Gebrandete Challenges und Hackathons',
      'Quartalsberichte zur Talent-Pipeline',
      'Priorisiertes Matching mit Kandidaten',
      'Unternehmensprofil mit Video-Content',
      'Unbegrenzte Stellenanzeigen',
      'Persönlicher Account Manager',
      'Jährliches Sponsorship-Event',
    ],
    icon: Award,
  },
  {
    id: 'gold',
    name: 'Gold',
    description: 'Erhöhte Sichtbarkeit und Zugang zu Top-Talenten',
    color: 'from-yellow-500 to-yellow-700',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/30',
    textColor: 'text-yellow-400',
    price: '€2,500+',
    features: [
      'Featured im Sponsoren-Marktplatz',
      'Platzierung in der Startseiten-Rotation',
      'Zugang zu den Top-50-Entwicklern',
      'Gebrandete Challenge-Möglichkeiten',
      'Monatliche Talent-Insights',
      'Priorisiertes Kandidaten-Matching',
      'Erweitertes Unternehmensprofil',
      'Bis zu 5 Stellenanzeigen pro Monat',
      'E-Mail-Support',
    ],
    icon: Trophy,
  },
  {
    id: 'silver',
    name: 'Silver',
    description: 'Gutes Preis-Leistungs-Verhältnis für wachsende Unternehmen',
    color: 'from-slate-300 to-slate-500',
    bgColor: 'bg-slate-300/10',
    borderColor: 'border-slate-300/30',
    textColor: 'text-slate-300',
    price: '€1,000+',
    features: [
      'Gelistet im Sponsoren-Marktplatz',
      'Basis-Unternehmensprofil',
      'Zugang zu Ranglisten-Talenten',
      'Standard-Kandidaten-Matching',
      'Feature im monatlichen Newsletter',
      '2 Stellenanzeigen pro Monat',
    ],
    icon: Building2,
  },
  {
    id: 'bronze',
    name: 'Bronze',
    description: 'Einstieg ins Sponsoring-Programm',
    color: 'from-orange-700 to-orange-900',
    bgColor: 'bg-orange-700/10',
    borderColor: 'border-orange-700/30',
    textColor: 'text-orange-400',
    price: '€250+',
    features: [
      'Basis-Listung im Sponsoren-Marktplatz',
      'Einfaches Unternehmensprofil',
      'Zugang zur Kandidatensuche',
      'Community-Anerkennung',
    ],
    icon: Users,
  },
];

function Trophy({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}

export default function SponsorTiersPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative border-b border-border/50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/8 via-transparent to-secondary/5" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.04]" />
        <div className="container mx-auto px-4 py-10 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary uppercase tracking-wider mb-4">
            Für Unternehmen
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-3">
            Sponsorship-Pakete
          </h1>
          <p className="text-xl text-muted-foreground">
            Wähle das Paket, das zu deinen Unternehmenszielen passt.
          </p>
        </div>
      </div>
        <div className="container mx-auto px-4 py-12">
          {/* Benefits Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="glass-card p-6 rounded-xl text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Top-Talente finden</h3>
              <p className="text-sm text-muted-foreground">
                Vernetze dich mit den besten jungen KI-Entwicklern
              </p>
            </div>
            <div className="glass-card p-6 rounded-xl text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                <Rocket className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Marke stärken</h3>
              <p className="text-sm text-muted-foreground">
                Positioniere dein Unternehmen als Tech-Bildungs-Pioneer
              </p>
            </div>
            <div className="glass-card p-6 rounded-xl text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Flexibles Investment</h3>
              <p className="text-sm text-muted-foreground">
                Passende Pakete für jedes Budget und jeden Bedarf
              </p>
            </div>
          </div>

          {/* Tier Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier) => {
              const Icon = tier.icon;
              return (
                <div
                  key={tier.id}
                  className={cn(
                    'glass-card rounded-2xl p-6 relative overflow-hidden',
                    tier.borderColor,
                    tier.id === 'platinum' && 'ring-2 ring-cyan-400/50'
                  )}
                >
                  {/* Background Gradient */}
                  <div className={cn(
                    'absolute inset-0 bg-gradient-to-br opacity-10 pointer-events-none',
                    tier.color
                  )} />

                  {/* Header */}
                  <div className="relative">
                    <div className={cn(
                      'w-16 h-16 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4',
                      tier.color
                    )}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className={cn('text-2xl font-bold mb-1', tier.textColor)}>
                      {tier.name}
                    </h3>
                    <p className="text-3xl font-bold mb-2">{tier.price}</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      {tier.description}
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button className="w-full" variant={tier.id === 'platinum' ? 'default' : 'outline'}>
                    Jetzt starten
                  </Button>
                </div>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 border border-primary/30">
              <h2 className="text-2xl font-display font-bold mb-4">Bereit, Sponsor zu werden?</h2>
              <p className="text-muted-foreground mb-6">
                Kontaktiere uns für individuelle Sponsoring-Möglichkeiten, die perfekt zu deinem Unternehmen passen.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="lg" className="gap-2">
                  <Mail className="w-4 h-4" />
                  Kontakt aufnehmen
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/sponsors">Sponsoren ansehen</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
