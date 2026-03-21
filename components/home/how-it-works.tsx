"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { UserPlus, Code2, Trophy } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Registriere dich",
    description: "Erstelle deinen Account in unter 2 Minuten. Kostenlos und ohne Kreditkarte.",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
  },
  {
    number: "02",
    icon: Code2,
    title: "Lerne & Baue",
    description: "Spiele durch interaktive Challenges, baue KI-Apps und sammle XP.",
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/30",
  },
  {
    number: "03",
    icon: Trophy,
    title: "Werde sponsored",
    description: "Top-Entwickler werden von Tech-Companies sponsored und erhalten Mentorship.",
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
  },
]

export function HowItWorksSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="py-24 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="space-y-16">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto space-y-4"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold">
              Wie <span className="text-primary">funktioniert's</span>?
            </h2>
            <p className="text-muted-foreground text-lg">
              In drei einfachen Schritten zur KI-Karriere.
            </p>
          </motion.div>

          {/* Steps */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="relative"
                >
                  {/* Connector line (desktop only) */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-16 left-[60%] w-[80%] border-t-2 border-dashed border-border" />
                  )}

                  <div className="relative">
                    {/* Number badge */}
                    <div className="absolute -top-4 -left-4 w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-purple-700 flex items-center justify-center font-display font-bold text-lg shadow-lg shadow-primary/30">
                      {index + 1}
                    </div>

                    {/* Step card */}
                    <div className={`bg-card border ${step.borderColor} rounded-2xl p-8 pt-12 h-full`}>
                      {/* Icon */}
                      <div className={`inline-flex p-4 rounded-xl ${step.bgColor} mb-6`}>
                        <Icon className={`w-8 h-8 ${step.color}`} />
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center pt-8"
          >
            <p className="text-muted-foreground mb-4">
              Bereit, loszulegen?
            </p>
            <a
              href="/auth"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-purple-700 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/40 transition-all duration-300 hover:-translate-y-1"
            >
              Jetzt kostenlos starten
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
