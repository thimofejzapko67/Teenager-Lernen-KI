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
  },
  {
    icon: Gamepad2,
    title: "Gamified Learning",
    description: "Sammle XP, level auf, schalte Badges frei und climb den Leaderboard.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Trophy,
    title: "Werde Sponsored",
    description: "Die besten Entwickler werden von Tech-Companies gesponsort und mentored.",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: Users,
    title: "Community",
    description: "Lerne mit anderen Teenagern, teile deine Projekte und finde dein Team.",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Rocket,
    title: "Real Projects",
    description: "Baue echte KI-Apps, Games und Tools fur dein Portfolio.",
    gradient: "from-red-500 to-pink-500",
  },
  {
    icon: Shield,
    title: "Sicher & Geschutzt",
    description: "Deine Daten sind sicher. Wir halten uns an alle Datenschutzregeln.",
    gradient: "from-indigo-500 to-blue-500",
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
              Warum <span className="text-primary">ClawAcademy</span>?
            </h2>
            <p className="text-muted-foreground text-lg">
              Die KI-Lernplattform, die Spa macht und dich fit macht fur die Zukunft.
            </p>
          </motion.div>

          {/* Features grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="h-full bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
                    {/* Icon container */}
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
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
