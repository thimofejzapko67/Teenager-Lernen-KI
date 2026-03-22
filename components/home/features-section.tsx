"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Code, Gamepad2, Trophy, Users, Rocket, ShieldCheck } from "lucide-react"

const features = [
  {
    icon: Code,
    number: "01",
    title: "Interaktives Coding",
    description: "Python, JavaScript, KI-APIs — durch echte Challenges, nicht langweilige Videos.",
  },
  {
    icon: Gamepad2,
    number: "02",
    title: "Gamified Learning",
    description: "XP sammeln, leveln, Badges freischalten, Rangliste climben.",
  },
  {
    icon: Trophy,
    number: "03",
    title: "Gesponsert werden",
    description: "Die besten Entwickler werden von echten Tech-Companies entdeckt und mentored.",
  },
  {
    icon: Users,
    number: "04",
    title: "Community",
    description: "Baue mit anderen Teenagern, teile Projekte, finde dein Team.",
  },
  {
    icon: Rocket,
    number: "05",
    title: "Echte Projekte",
    description: "KI-Apps, Tools und Games — für dein Portfolio und deine Karriere.",
  },
  {
    icon: ShieldCheck,
    number: "06",
    title: "Sicher & kostenlos",
    description: "Keine versteckten Kosten. DSGVO-konform. Für alle Teenager.",
  },
]

export function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section ref={ref} className="py-24 md:py-32 relative">
      {/* Subtle top rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-16 md:mb-20 max-w-3xl"
        >
          <span className="section-label mb-5 inline-flex">Platform</span>
          <h2 className="text-4xl md:text-6xl font-display font-extrabold leading-tight mt-4">
            Warum{" "}
            <span className="text-primary">Codelift?</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-xl">
            Eine Plattform, die Lernen in ein Spiel verwandelt — und aus Spielern Sponsorship-Kandidaten macht.
          </p>
        </motion.div>

        {/* Features grid — 2 col desktop, editorial style */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {features.map((f, i) => {
            const Icon = f.icon
            return (
              <motion.div
                key={f.number}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="group bg-card hover:bg-muted/40 transition-colors duration-200 p-8 relative overflow-hidden"
              >
                {/* Number watermark */}
                <span className="absolute -top-2 -right-2 text-8xl font-display font-extrabold text-border/40 select-none leading-none">
                  {f.number}
                </span>

                {/* Icon */}
                <div className="relative mb-6">
                  <div className="w-10 h-10 border border-primary/30 flex items-center justify-center rounded-sm bg-primary/5 group-hover:bg-primary/10 transition-colors">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-display font-bold mb-2 group-hover:text-primary transition-colors duration-200">
                  {f.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>

                {/* Bottom lime line on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
