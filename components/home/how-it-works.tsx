"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { UserPlus, Code2, Trophy, ArrowRight } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Registriere dich",
    description: "Erstelle deinen Account in unter 2 Minuten. Kostenlos und ohne Kreditkarte.",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/30",
    gradientFrom: "from-primary",
    gradientTo: "to-secondary",
  },
  {
    number: "02",
    icon: Code2,
    title: "Lerne & Baue",
    description: "Meistere interaktive Challenges, baue KI-Apps und sammle XP.",
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/30",
    gradientFrom: "from-cyan-500",
    gradientTo: "to-sky-600",
  },
  {
    number: "03",
    icon: Trophy,
    title: "Werde gesponsert",
    description: "Top-Entwickler werden von Tech-Companies gesponsert und erhalten persönliches Mentorship.",
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    gradientFrom: "from-amber-500",
    gradientTo: "to-orange-600",
  },
]

export function HowItWorksSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="py-24 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="space-y-16">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary uppercase tracking-wider mb-2">
              So einfach geht's
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold">
              In 3 Schritten zur{" "}
              <span className="text-primary">KI-Karriere</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Kein Vorwissen nötig. Starte heute, lerne im eigenen Tempo.
            </p>
          </motion.div>

          {/* Steps */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto relative">
            {/* Connector lines */}
            <div className="hidden md:block absolute top-20 left-[calc(33%+2rem)] right-[calc(33%+2rem)] h-px bg-gradient-to-r from-primary/40 via-cyan-500/40 to-amber-500/40" />

            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="relative"
                >
                  {/* Step card */}
                  <div className={`bg-card/60 backdrop-blur-sm border ${step.borderColor} rounded-2xl p-7 h-full hover:border-opacity-70 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}>
                    {/* Number + icon row */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.gradientFrom} ${step.gradientTo} flex items-center justify-center shadow-lg shrink-0`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-4xl font-display font-bold text-border/60 select-none">
                        {step.number}
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center"
          >
            <a
              href="/auth"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              Jetzt kostenlos starten
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
