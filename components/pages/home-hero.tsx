import Link from "next/link"
import { ArrowRight, Sparkles, Zap, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HomeHero() {
  return (
    <section className="relative overflow-hidden px-4 py-24 sm:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-secondary/10 to-transparent rounded-full blur-3xl" />

      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border-2 border-primary/20 text-sm font-bold text-primary mb-8">
            <Sparkles className="w-4 h-4" />
            Für Teenager · 13–19 Jahre · Kostenlos
          </div>

          {/* Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight mb-8">
            <span className="block">Lerne KI-</span>
            <span className="block">Entwicklung.</span>
            <span className="block text-gradient-primary">Werde sponsored.</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            Die KI-Lernplattform für Teenager. Lerne programmieren, baue KI-Apps und werde von Tech-Companies gesponsert.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/learn">
              <Button size="lg" className="group">
                Jetzt starten
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/leaderboard">
              <Button variant="outline" size="lg">
                Ranking ansehen
              </Button>
            </Link>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex flex-col items-center p-6 rounded-3xl border-2 border-border bg-card/50 backdrop-blur">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white mb-4">
                <Zap className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-lg mb-2">Interaktiv</h3>
              <p className="text-sm text-muted-foreground">Echte Challenges und Projekte</p>
            </div>

            <div className="flex flex-col items-center p-6 rounded-3xl border-2 border-border bg-card/50 backdrop-blur">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary to-accent text-white mb-4">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-lg mb-2">6 Kategorien</h3>
              <p className="text-sm text-muted-foreground">Von KI bis Security</p>
            </div>

            <div className="flex flex-col items-center p-6 rounded-3xl border-2 border-border bg-card/50 backdrop-blur">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-primary text-white mb-4">
                <Shield className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-lg mb-2">XP verdienen</h3>
              <p className="text-sm text-muted-foreground">Level aufsteigen</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
