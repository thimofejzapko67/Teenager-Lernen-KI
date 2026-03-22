import {
  HeroSection,
  FeaturesSection,
  StatsSection,
  HowItWorksSection,
  FaqSection,
  FinalCtaSection,
  Footer,
} from "@/components/home"
import { getHomeStats } from "@/lib/home"
import { Suspense } from "react"

function StatsSectionSkeleton() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="text-center space-y-4">
              <div className="inline-flex p-4 rounded-2xl bg-muted animate-pulse" />
              <div className="h-12 w-24 mx-auto bg-muted animate-pulse rounded" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

async function CachedStatsSection() {
  const stats = await getHomeStats()
  return <StatsSection stats={stats} />
}

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Stats Section - with Suspense for PPR */}
      <Suspense fallback={<StatsSectionSkeleton />}>
        <CachedStatsSection />
      </Suspense>

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* FAQ Section */}
      <FaqSection />

      {/* Final CTA Section */}
      <FinalCtaSection />

      {/* Footer */}
      <Footer />
    </main>
  )
}
