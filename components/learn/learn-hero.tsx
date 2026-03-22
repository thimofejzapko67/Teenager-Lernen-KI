"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { BookOpen, Code, Layers, Trophy, Sparkles } from "lucide-react"

const highlights = [
  { icon: Code, label: "Interaktiv", desc: "Echte Challenges", color: "text-blue-500 bg-blue-500/10" },
  { icon: Layers, label: "6 Kategorien", desc: "Von KI bis Security", color: "text-primary bg-primary/10" },
  { icon: Trophy, label: "XP verdienen", desc: "Level aufsteigen", color: "text-amber-500 bg-amber-500/10" },
]

export function LearnHero() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="relative overflow-hidden border-b border-border/50">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.05]" />

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-6">
              <Sparkles className="w-4 h-4" />
              Lernplattform
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.05] tracking-tight"
          >
            <span className="block text-foreground">Lerne.</span>
            <span className="block text-foreground">Baue.</span>
            <span className="block text-primary mt-1">
              Werde besser.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mt-6"
          >
            Meistere KI-Tools, baue echte Apps und werde gesponsort.
            Jede Lektion bringt dich näher zum Sponsorship.
          </motion.p>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4 mt-8"
          >
            {highlights.map((h, i) => {
              const Icon = h.icon
              return (
                <motion.div
                  key={h.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.35 + i * 0.1 }}
                  className="flex items-center gap-3 bg-card border border-border/50 rounded-xl px-5 py-4"
                >
                  <div className={`inline-flex p-2.5 rounded-lg ${h.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{h.label}</p>
                    <p className="text-xs text-muted-foreground">{h.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
