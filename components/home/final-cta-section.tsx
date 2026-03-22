"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function FinalCtaSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="relative overflow-hidden py-24 md:py-36">
      {/* Full-bleed lime glow behind everything */}
      <div className="absolute inset-0 bg-primary/5" />
      <div className="absolute top-0 left-0 right-0 h-px bg-primary/25" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/12 rounded-full blur-3xl pointer-events-none" />

      {/* Dot grid */}
      <div className="absolute inset-0 bg-dot-pattern opacity-30" />

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <div className="text-center space-y-10">
          {/* Big label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="section-label">Jetzt starten</span>
          </motion.div>

          {/* Headline — two lines, massive */}
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold leading-[1.0] tracking-tight"
          >
            <span className="block text-primary neon-text">Bereit,</span>
            <span className="block text-foreground/70">durchzustarten?</span>
          </motion.h2>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto"
          >
            Über 1.200 Teenager lernen bereits auf Codelift — und die besten werden von Tech-Companies gesponsert.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/auth"
              className="group inline-flex items-center gap-2.5 px-10 py-5 bg-primary text-primary-foreground font-bold rounded-sm text-base uppercase tracking-wide hover:bg-primary/90 transition-all duration-200 hover:-translate-y-0.5 shadow-xl shadow-primary/25 hover:shadow-primary/40"
            >
              Kostenlos registrieren
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 px-10 py-5 border border-border rounded-sm text-base font-medium hover:border-primary/30 hover:bg-muted/30 transition-all duration-200 text-muted-foreground hover:text-foreground"
            >
              Lektionen ansehen
            </Link>
          </motion.div>

          {/* Trust row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="flex flex-wrap gap-8 justify-center text-sm text-muted-foreground"
          >
            {["Keine Kreditkarte", "DSGVO-konform", "In 2 Min. startklar"].map(t => (
              <span key={t} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/70" />
                {t}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
