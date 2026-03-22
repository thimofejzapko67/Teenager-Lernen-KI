"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Code, Gamepad2, Trophy, Users, Rocket, Shield } from "lucide-react"

const features = [
  {
    icon: Code,
    title: "Interaktives Coding",
    description: "Lerne Python, JavaScript und KI-Tools durch echte Challenges, nicht langweilige Videos.",
    gradient: "from-blue-500 to-cyan-500",
    accent: "border-blue-500/20 hover:border-blue-500/50",
    glow: "group-hover:shadow-blue-500/10",
  },
  {
    icon: Gamepad2,
    title: "Gamified Learning",
    description: "Sammle XP, level auf, schalte Badges frei und klettere im Leaderboard.",
    gradient: "from-purple-500 to-pink-500",
    accent: "border-purple-500/20 hover:border-purple-500/50",
    glow: "group-hover:shadow-purple-500/10",
  },
  {
    icon: Trophy,
    title: "Werde Gesponsert",
    description: "Die besten Entwickler werden von Tech-Companies gesponsert und persönlich mentored.",
    gradient: "from-amber-500 to-orange-500",
    accent: "border-amber-500/20 hover:border-amber-500/50",
    glow: "group-hover:shadow-amber-500/10",
  },
  {
    icon: Users,
    title: "Community",
    description: "Lerne mit anderen Teenagern, teile deine Projekte und finde dein Team.",
    gradient: "from-green-500 to-emerald-500",
    accent: "border-green-500/20 hover:border-green-500/50",
    glow: "group-hover:shadow-green-500/10",
  },
  {
    icon: Rocket,
    title: "Echte Projekte",
    description: "Baue echte KI-Apps, Games und Tools für dein Portfolio.",
    gradient: "from-red-500 to-pink-500",
    accent: "border-red-500/20 hover:border-red-500/50",
    glow: "group-hover:shadow-red-500/10",
  },
  {
    icon: Shield,
    title: "Sicher & Geschützt",
    description: "Deine Daten sind sicher. Wir halten uns an alle Datenschutzregeln.",
    gradient: "from-indigo-500 to-blue-500",
    accent: "border-indigo-500/20 hover:border-indigo-500/50",
    glow: "group-hover:shadow-indigo-500/10",
  },
]

export function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="py-24 md:py-32 relative">
      <div className="container mx-auto px-4">
        <div className="space-y-16">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto space-y-4"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold">
              Warum <span className="text-primary">Codelift</span>?
            </h2>
            <p className="text-muted-foreground text-lg">
              Die KI-Lernplattform, die Spaß macht und dich fit macht für die Zukunft.
            </p>
          </motion.div>

          {/* Features grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="group relative"
                >
                  <div className={`h-full bg-card/60 border ${feature.accent} rounded-2xl p-6 transition-all duration-300 hover:shadow-xl ${feature.glow} hover:-translate-y-1 backdrop-blur-sm`}>
                    {/* Top accent bar */}
                    <div className={`absolute top-0 left-6 right-6 h-px bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full`} />

                    {/* Icon container */}
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-foreground transition-colors">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
