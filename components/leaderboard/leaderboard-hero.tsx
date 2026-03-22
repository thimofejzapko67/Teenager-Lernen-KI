"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Crown, Flame, Shield, Zap } from "lucide-react"

const stats = [
  { icon: Crown, text: "Top 3 werden gesponsert", gradient: "from-amber-500 to-orange-500" },
  { icon: Flame, text: "Echtzeit-Updates", gradient: "from-red-500 to-pink-500" },
  { icon: Shield, text: "Faires Cooldown-System", gradient: "from-indigo-500 to-blue-500" },
]

export function LeaderboardHero() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="relative overflow-hidden border-b border-border/50">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.07]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -right-32 w-[400px] h-[400px] bg-amber-500/8 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 py-16 md:py-24 max-w-5xl relative z-10">
        <div className="text-center space-y-6">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-medium text-amber-400 uppercase tracking-wider">
              <Zap className="w-3 h-3" />
              Wöchentlich aktualisiert
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-display font-bold neon-text"
          >
            Rangliste
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto leading-relaxed"
          >
            Kämpfe um den ersten Platz. Steige auf. Werde zur Legende.
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 pt-4"
          >
            {stats.map((s, i) => {
              const Icon = s.icon
              return (
                <motion.div
                  key={s.text}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.35 + i * 0.1 }}
                  className="flex items-center gap-2.5 bg-card/60 border border-border/50 rounded-xl px-4 py-2.5 backdrop-blur-sm"
                >
                  <div className={`inline-flex p-1.5 rounded-lg bg-gradient-to-br ${s.gradient} shadow-lg`}>
                    <Icon className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-sm text-muted-foreground">{s.text}</span>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
