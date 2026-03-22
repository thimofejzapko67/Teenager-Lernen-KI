"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { UserPlus, Code2, Trophy, ArrowRight } from "lucide-react"
import Link from "next/link"

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Account anlegen",
    description: "In 60 Sekunden registriert. Kein Kreditkarte, kein Abo — einfach loslegen.",
    accent: "from-primary/80 to-primary",
  },
  {
    number: "02",
    icon: Code2,
    title: "Lernen & bauen",
    description: "Interaktive Challenges, echte KI-Projekte, XP sammeln, Rangliste climben.",
    accent: "from-secondary/80 to-secondary",
  },
  {
    number: "03",
    icon: Trophy,
    title: "Gesponsert werden",
    description: "Top-Entwickler werden direkt von Tech-Companies gesponsert und mentored.",
    accent: "from-accent/80 to-accent",
  },
]

export function HowItWorksSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="py-24 md:py-32 relative overflow-hidden bg-card/30">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* Large background label */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none">
        <span className="text-[12rem] font-display font-extrabold text-border/10 leading-none">HOW</span>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <span className="section-label mb-5 inline-flex">So funktioniert's</span>
          <h2 className="text-4xl md:text-6xl font-display font-extrabold leading-tight mt-4">
            In <span className="text-primary">3 Schritten</span> zur<br />
            <span className="text-foreground/60">KI-Karriere.</span>
          </h2>
        </motion.div>

        {/* Steps — horizontal with connecting numbers */}
        <div className="relative grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Connector */}
          <div className="hidden md:block absolute top-8 left-[calc(16.66%+1rem)] right-[calc(16.66%+1rem)] h-px bg-gradient-to-r from-primary/40 via-secondary/40 to-accent/40" />

          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 32 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <div className="bg-card border border-border rounded-sm p-8 h-full relative group hover:border-primary/30 transition-colors duration-300">
                  {/* Step number circle */}
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.accent} flex items-center justify-center mb-6 shadow-lg`}>
                    <Icon className="w-7 h-7 text-background" />
                  </div>

                  {/* Large number watermark */}
                  <span className="absolute top-4 right-5 text-5xl font-display font-extrabold text-border/30 select-none">
                    {step.number}
                  </span>

                  <h3 className="text-xl font-display font-bold mb-3">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>

                  {/* Lime accent line on hover */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-b-sm" />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="mt-14 text-center"
        >
          <Link
            href="/auth"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-primary text-primary-foreground font-bold rounded-sm hover:bg-primary/90 transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-primary/20 hover:shadow-primary/35 text-sm uppercase tracking-wide"
          >
            Jetzt kostenlos starten
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
