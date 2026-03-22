"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Zap } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { BorderBeam } from "@/components/ui/border-beam"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      <div className="container mx-auto px-4 relative z-10 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text content */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex lg:justify-start justify-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 text-sm font-medium text-primary">
                <Sparkles className="w-4 h-4" />
                Für Teenager · 13–19 Jahre · Kostenlos
              </div>
            </motion.div>

            {/* Main headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.05] tracking-tight">
                <span className="block text-foreground">Lerne KI-</span>
                <span className="block text-foreground">Entwicklung.</span>
                <span className="block text-primary mt-1">
                  Werde sponsored.
                </span>
              </h1>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Baue echte KI-Apps, löse Challenges und sammle XP.
              Die besten Entwickler werden von Tech-Companies gesponsort.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white font-medium px-8 py-6 text-lg rounded-sm"
              >
                <Link href="/auth">
                  Jetzt kostenlos starten
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg rounded-sm border border-border text-foreground/80 hover:bg-muted font-medium"
              >
                <Link href="/learn">Lektionen ansehen</Link>
              </Button>
            </motion.div>

            {/* Trust signals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap gap-6 justify-center lg:justify-start text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                <span>Kostenlos für alle</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>Keine Kreditkarte nötig</span>
              </div>
            </motion.div>
          </div>

          {/* Right: Bento Grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative"
          >
            <BentoGrid className="max-w-lg">
              <BentoGridItem
                title="Interaktives Coding"
                description="Lerne durch echte Challenges, nicht Videos"
                className="md:col-span-2 relative overflow-hidden"
              >
                <BorderBeam size={300} duration={12} />
              </BentoGridItem>
              <BentoGridItem
                title="Gamified"
                description="Sammle XP und level auf"
                className="md:row-span-2"
              >
                <></>
              </BentoGridItem>
              <BentoGridItem
                title="Werde Gesponsort"
                description="Tech-Companies sponsor die besten"
              >
                <></>
              </BentoGridItem>
              <BentoGridItem
                title="Community"
                description="Lerne mit anderen Teenagern"
                className="md:col-span-2"
              >
                <></>
              </BentoGridItem>
            </BentoGrid>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-border flex justify-center pt-2">
          <div className="w-1 h-2 rounded-full bg-muted-foreground/40" />
        </div>
      </motion.div>
    </section>
  )
}
