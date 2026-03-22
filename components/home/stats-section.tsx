"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Users, BookOpen, FolderOpen, Zap } from "lucide-react"
import type { HomeStats } from "@/lib/home"
import { Marquee } from "@/components/ui/marquee"

interface StatsSectionProps {
  stats: HomeStats
}

interface StatItem {
  icon: typeof Users
  label: string
  value: number
  suffix?: string
}

function AnimatedCounter({ value, duration = 2000 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    const startTime = Date.now()
    const endTime = startTime + duration

    const animate = () => {
      const now = Date.now()
      const remaining = Math.max(0, endTime - now)
      const progress = 1 - remaining / duration

      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(value * easeOut))

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(value)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, value, duration])

  return <span ref={ref}>{count.toLocaleString("de-DE")}</span>
}

export function StatsSection({ stats }: StatsSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const statItems: StatItem[] = [
    {
      icon: Users,
      label: "Aktive Lernende",
      value: stats.userCount || 1200,
      suffix: "+",
    },
    {
      icon: BookOpen,
      label: "Lektionen",
      value: stats.lessonCount || 50,
      suffix: "+",
    },
    {
      icon: FolderOpen,
      label: "Projekte",
      value: stats.projectCount || 350,
      suffix: "+",
    },
    {
      icon: Zap,
      label: "XP gesammelt",
      value: Math.floor((stats.totalXpEarned || 50000) / 1000),
      suffix: "K+",
    },
  ]

  return (
    <section ref={ref} className="py-16 md:py-24 border-y border-border/40">
      <div className="container mx-auto px-4">
        {/* Marquee Stats */}
        <div className="mb-12">
          <Marquee speed="normal" pauseOnHover className="max-w-4xl mx-auto">
            {statItems.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div
                  key={`${stat.label}-${index}`}
                  className="flex items-center gap-3 px-8 py-4 bg-background border border-border/40 rounded-sm mx-4"
                >
                  <Icon className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-2xl font-display font-bold text-foreground">
                      <AnimatedCounter value={stat.value} />
                      {stat.suffix}
                    </p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              )
            })}
          </Marquee>
        </div>

        {/* Static Grid Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
        >
          {statItems.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center space-y-2"
              >
                <Icon className="w-6 h-6 text-primary mx-auto" />
                <p className="text-3xl md:text-4xl font-display font-bold text-foreground">
                  <AnimatedCounter value={stat.value} />
                  {stat.suffix}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
