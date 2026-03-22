"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import {
  Code,
  Gamepad2,
  Trophy,
  Users,
  Rocket,
  Shield,
  Sparkles,
} from "lucide-react"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"

const features = [
  {
    icon: Code,
    title: "Interaktives Coding",
    description: "Lerne Python, JavaScript und KI-Tools durch echte Challenges, nicht langweilige Videos.",
    colSpan: 2,
  },
  {
    icon: Gamepad2,
    title: "Gamified Learning",
    description: "Sammle XP, level auf, schalte Badges frei und klettere im Leaderboard.",
    rowSpan: 2,
  },
  {
    icon: Trophy,
    title: "Werde Gesponsort",
    description: "Die besten Entwickler werden von Tech-Companies gesponsert und persönlich mentored.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Lerne mit anderen Teenagern, teile deine Projekte und finde dein Team.",
  },
  {
    icon: Rocket,
    title: "Echte Projekte",
    description: "Baue echte KI-Apps, Games und Tools für dein Portfolio.",
  },
  {
    icon: Shield,
    title: "Sicher & Geschützt",
    description: "Deine Daten sind sicher. Wir halten uns an alle Datenschutzregeln.",
    colSpan: 2,
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

          {/* Bento Grid Features */}
          <BentoGrid className="max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <BentoGridItem
                    title={feature.title}
                    description={feature.description}
                    icon={<Icon className="w-5 h-5" />}
                    colSpan={feature.colSpan}
                    rowSpan={feature.rowSpan}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <></>
                  </BentoGridItem>
                </motion.div>
              )
            })}
          </BentoGrid>
        </div>
      </div>
    </section>
  )
}
