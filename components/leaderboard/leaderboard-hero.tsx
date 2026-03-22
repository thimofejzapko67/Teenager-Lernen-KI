"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Crown, Flame, Shield, Zap, Trophy, Target, TrendingUp, Users } from "lucide-react"

const stats = [
  { icon: Crown, text: "Top 3 werden gesponsert", gradient: "from-amber-500 to-orange-500", bg: "bg-amber-500/10" },
  { icon: Flame, text: "Echtzeit-Updates", gradient: "from-red-500 to-accent", bg: "bg-red-500/10" },
  { icon: Shield, text: "Faires Cooldown-System", gradient: "from-indigo-500 to-blue-500", bg: "bg-indigo-500/10" },
  { icon: Trophy, text: "Wöchentliche Awards", gradient: "from-primary to-primary", bg: "bg-primary/10" },
]

const quickStats = [
  { icon: Users, value: "2.4K+", label: "Aktive Entwickler", color: "text-blue-400" },
  { icon: Target, value: "156K", label: "XP vergeben", color: "text-emerald-400" },
  { icon: TrendingUp, value: "89%", label: "Weekly Active", color: "text-primary" },
]

export function LeaderboardHero() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="relative overflow-hidden border-b border-border/50">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.07]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -right-32 w-[400px] h-[400px] bg-amber-500/8 rounded-full blur-3xl" />
      <div className="absolute top-20 left-10 w-[300px] h-[300px] bg-primary/8 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 py-16 md:py-20 max-w-5xl relative z-10">
        <div className="text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 border border-amber-500/20 text-xs font-medium text-amber-400 uppercase tracking-wider backdrop-blur-sm">
              <Zap className="w-3.5 h-3.5 animate-pulse" />
              <span>Live-Rangliste</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-display font-bold neon-text"
          >
            Rangliste
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto leading-relaxed"
          >
            Kämpfe um den ersten Platz. Steige auf. Werde zur Legende.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {stats.map((s, i) => {
              const Icon = s.icon
              return (
                <motion.div
                  key={s.text}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.35 + i * 0.08 }}
                  className="group flex items-center gap-2.5 bg-card/60 border border-border/50 rounded-xl px-4 py-2.5 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className={`inline-flex p-1.5 rounded-lg bg-gradient-to-br ${s.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{s.text}</span>
                </motion.div>
              )
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-8 pt-6 border-t border-border/30 mt-8"
          >
            {quickStats.map((stat, i) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.55 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className={`p-2.5 rounded-xl bg-muted/30 ${stat.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
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
