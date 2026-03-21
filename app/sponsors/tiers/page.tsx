import { ProtectedRoute } from '@/components/auth/protected-route';
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
import { cn, clawGradientText } from '@/lib/utils';
import Link from 'next/link';

const tiers = [
  {
    id: 'platinum',
    name: 'Platinum',
    description: 'Premium sponsorship for maximum visibility and impact',
    color: 'from-cyan-400 to-blue-600',
    bgColor: 'bg-cyan-400/10',
    borderColor: 'border-cyan-400/30',
    textColor: 'text-cyan-400',
    price: '€5,000+',
    features: [
      'Top placement in sponsors marketplace',
      'Exclusive featured spot on homepage',
      'Direct access to top 10 leaderboard performers',
      'Branded challenges and hackathons',
      'Quarterly talent pipeline reports',
      'Priority matching with qualified candidates',
      'Company profile with video content',
      'Unlimited job postings',
      'Dedicated account manager',
      'Annual sponsorship event',
    ],
    icon: Award,
  },
  {
    id: 'gold',
    name: 'Gold',
    description: 'Enhanced visibility and access to top talent',
    color: 'from-yellow-500 to-yellow-700',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/30',
    textColor: 'text-yellow-400',
    price: '€2,500+',
    features: [
      'Featured in sponsors marketplace',
      'Placement in homepage rotation',
      'Access to top 50 leaderboard performers',
      'Branded challenge opportunities',
      'Monthly talent insights',
      'Priority candidate matching',
      'Enhanced company profile',
      'Up to 5 job postings per month',
      'Email support',
    ],
    icon: Trophy,
  },
  {
    id: 'silver',
    name: 'Silver',
    description: 'Great value for growing companies',
    color: 'from-slate-300 to-slate-500',
    bgColor: 'bg-slate-300/10',
    borderColor: 'border-slate-300/30',
    textColor: 'text-slate-300',
    price: '€1,000+',
    features: [
      'Listed in sponsors marketplace',
      'Basic company profile',
      'Access to leaderboard performers',
      'Standard candidate matching',
      'Monthly newsletter feature',
      '2 job postings per month',
    ],
    icon: Building2,
  },
  {
    id: 'bronze',
    name: 'Bronze',
    description: 'Get started with sponsorships',
    color: 'from-orange-700 to-orange-900',
    bgColor: 'bg-orange-700/10',
    borderColor: 'border-orange-700/30',
    textColor: 'text-orange-400',
    price: '€250+',
    features: [
      'Basic listing in sponsors marketplace',
      'Simple company profile',
      'Access to candidate search',
      'Community recognition',
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
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl font-bold mb-4">
              <span className={clawGradientText}>Sponsorship Tiers</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Choose the sponsorship level that fits your company's goals
            </p>
          </div>

          {/* Benefits Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="glass-card p-6 rounded-xl text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Access Top Talent</h3>
              <p className="text-sm text-muted-foreground">
                Connect with the most skilled young developers in the AI space
              </p>
            </div>
            <div className="glass-card p-6 rounded-xl text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                <Rocket className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Build Your Brand</h3>
              <p className="text-sm text-muted-foreground">
                Establish your company as a leader in supporting tech education
              </p>
            </div>
            <div className="glass-card p-6 rounded-xl text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Flexible Investment</h3>
              <p className="text-sm text-muted-foreground">
                Choose a tier that matches your budget and hiring needs
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
                    Get Started
                  </Button>
                </div>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 border border-primary/30">
              <h2 className="text-2xl font-bold mb-4">Ready to become a sponsor?</h2>
              <p className="text-muted-foreground mb-6">
                Contact us to discuss custom sponsorship opportunities and find the perfect fit for your company.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="lg" className="gap-2">
                  <Mail className="w-4 h-4" />
                  Contact Sales
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/sponsors">View Sponsors</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
