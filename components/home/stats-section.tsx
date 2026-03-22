"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import type { HomeStats } from "@/lib/home"

interface StatsSectionProps {
  stats: HomeStats
}

function Counter({ value, duration = 1800 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    const start = Date.now()
    const end = start + duration
    const run = () => {
      const now = Date.now()
      const progress = Math.min(1, (now - start) / duration)
      const ease = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(value * ease))
      if (progress < 1) requestAnimationFrame(run)
      else setCount(value)
    }
    requestAnimationFrame(run)
  }, [isInView, value, duration])

  return <span ref={ref}>{count.toLocaleString("de-DE")}</span>
}

export function StatsSection({ stats }: StatsSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const items = [
    { value: stats.userCount || 1200, suffix: "+", label: "Aktive Lernende" },
    { value: stats.lessonCount || 50,  suffix: "+", label: "Interaktive Lektionen" },
    { value: stats.projectCount || 350, suffix: "+", label: "Projekte gebaut" },
    { value: Math.floor((stats.totalXpEarned || 50000) / 1000), suffix: "K+", label: "XP verdient" },
  ]

  return (
    <section ref={ref} className="relative overflow-hidden py-0">
      {/* Diagonal background block */}
      <div className="absolute inset-0 bg-primary/[0.04]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-primary/20" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-primary/20" />

      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-border">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="py-16 px-6 md:px-10 text-center space-y-2 first:border-l-0 border-l border-border"
            >
              <p className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold text-primary leading-none neon-text">
                <Counter value={item.value} />
                <span>{item.suffix}</span>
              </p>
              <p className="text-sm text-muted-foreground uppercase tracking-widest font-medium">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
