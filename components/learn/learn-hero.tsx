"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Code, Layers, Trophy, Sparkles } from "lucide-react"

const highlights = [
  { icon: Code, label: "Interaktiv", desc: "Echte Challenges", color: "from-blue-500 to-cyan-500" },
  { icon: Layers, label: "6 Kategorien", desc: "Von KI bis Security", color: "from-primary to-secondary" },
  { icon: Trophy, label: "XP verdienen", desc: "Level aufsteigen", color: "from-amber-500 to-orange-500" },
]

export function LearnHero() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="relative overflow-hidden border-b-2 border-border/50">
      {/* Animated background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />

      <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 border-2 border-primary/30 text-base font-bold text-primary mb-8">
              <Sparkles className="w-5 h-5" />
              Lernplattform
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl md:text-7xl lg:text-8xl font-display font-black leading-[1.05] tracking-tight mb-6"
          >
            <span className="block text-foreground">Lerne.</span>
            <span className="block text-foreground">Baue.</span>
            <span className="block text-gradient-primary mt-2">
              Werde besser.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed mb-12"
          >
            Meistere KI-Tools, baue echte Apps und werde gesponsort.
            Jede Lektion bringt dich näher zum Sponsorship.
          </motion.p>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-6"
          >
            {highlights.map((h, i) => {
              const Icon = h.icon
              return (
                <motion.div
                  key={h.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-4 bg-card border-2 border-border rounded-2xl px-6 py-5 shadow-lg"
                >
                  <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${h.color} shadow-xl`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-foreground">{h.label}</p>
                    <p className="text-sm text-muted-foreground">{h.desc}</p>
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
