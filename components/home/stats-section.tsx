"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Users, BookOpen, FolderOpen, Zap } from "lucide-react"
import type { HomeStats } from "@/lib/home"

interface StatsSectionProps {
  stats: HomeStats
}

interface StatItem {
  icon: typeof Users
  label: string
  value: number
  suffix?: string
  gradient: string
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
      gradient: "from-purple-500 to-purple-700",
    },
    {
      icon: BookOpen,
      label: "Interaktive Lektionen",
      value: stats.lessonCount || 50,
      suffix: "+",
      gradient: "from-cyan-500 to-cyan-700",
    },
    {
      icon: FolderOpen,
      label: "Projekte gebaut",
      value: stats.projectCount || 350,
      suffix: "+",
      gradient: "from-pink-500 to-pink-700",
    },
    {
      icon: Zap,
      label: "XP insgesamt",
      value: Math.floor((stats.totalXpEarned || 50000) / 1000),
      suffix: "K+",
      gradient: "from-amber-500 to-amber-700",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section ref={ref} className="py-16 md:py-24 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {statItems.map((stat) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="text-center space-y-4 bg-card/40 border border-border/50 rounded-2xl p-6 backdrop-blur-sm hover:border-primary/30 transition-colors duration-300"
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg`}>
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div className="space-y-1">
                  <p className="text-3xl md:text-4xl lg:text-5xl font-display font-bold">
                    <AnimatedCounter value={stat.value} />
                    {stat.suffix}
                  </p>
                  <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
