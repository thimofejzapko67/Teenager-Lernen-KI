"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Zap } from "lucide-react"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { useEffect, useState } from "react"

const leaderboardData = [
  { rank: 1, name: "MaxMustermann", xp: 4820, level: 12, xpPct: 94, badge: "👑" },
  { rank: 2, name: "LenaK_dev",     xp: 4210, level: 11, xpPct: 78, badge: "🥈" },
  { rank: 3, name: "TimCodesHard",  xp: 3980, level: 11, xpPct: 62, badge: "🥉" },
  { rank: 4, name: "SaraAI",        xp: 3540, level: 10, xpPct: 45, badge: null },
  { rank: 5, name: "du?",           xp: 0,    level: 1,  xpPct: 0,  badge: null, isYou: true },
]

type XpNotif = { id: number; text: string; top: number; left: number }

function LiveLeaderboard() {
  const [notifs, setNotifs] = useState<XpNotif[]>([])
  const [counter, setCounter] = useState(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const labels = ["+50 XP", "+120 XP", "+75 XP", "+200 XP", "+30 XP"]
    const interval = setInterval(() => {
      const id = Date.now()
      setCounter(c => c + 1)
      setNotifs(prev => [
        ...prev.filter(n => Date.now() - n.id < 2400),
        {
          id,
          text: labels[counter % labels.length],
          top: Math.floor(Math.random() * 60) + 10,
          left: Math.floor(Math.random() * 60) + 10,
        },
      ])
    }, 2200)
    return () => clearInterval(interval)
  }, [counter, reduced])

  return (
    <motion.div
      initial={{ opacity: 0, x: 48, rotateY: -6 }}
      animate={{ opacity: 1, x: 0, rotateY: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="hidden lg:block relative perspective-1000"
    >
      {/* Glow halo */}
      <div className="absolute -inset-8 rounded-2xl bg-primary/6 blur-3xl pointer-events-none" />

      {/* Card */}
      <div className="relative bg-card border border-border rounded-xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-border bg-muted/30">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Live Rangliste</span>
          </div>
          <span className="text-xs font-mono text-primary/70">↑ Wöchentlich</span>
        </div>

        {/* Column labels */}
        <div className="grid grid-cols-[2rem_1fr_5rem_3rem] gap-3 px-5 py-2 border-b border-border/50">
          <span className="text-[10px] text-muted-foreground uppercase tracking-widest">#</span>
          <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Entwickler</span>
          <span className="text-[10px] text-muted-foreground uppercase tracking-widest">XP</span>
          <span className="text-[10px] text-muted-foreground uppercase tracking-widest text-right">Lvl</span>
        </div>

        {/* Rows */}
        <div className="relative">
          {/* XP pop notifications */}
          {notifs.map(n => (
            <div
              key={n.id}
              className="absolute pointer-events-none animate-xp-pop z-20 font-mono text-xs font-bold text-primary"
              style={{ top: `${n.top}%`, left: `${n.left}%` }}
            >
              {n.text}
            </div>
          ))}

          {leaderboardData.map((row, i) => (
            <motion.div
              key={row.rank}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.08, duration: 0.4 }}
              className={`grid grid-cols-[2rem_1fr_5rem_3rem] gap-3 items-center px-5 py-3.5 border-b border-border/40 last:border-0 transition-colors ${
                row.isYou
                  ? "bg-primary/5 border-l-2 border-l-primary"
                  : "hover:bg-muted/20"
              }`}
            >
              {/* Rank */}
              <span className={`text-sm font-display font-bold ${
                row.rank === 1 ? "text-primary" :
                row.rank === 2 ? "text-slate-400" :
                row.rank === 3 ? "text-amber-600" :
                "text-muted-foreground"
              }`}>
                {row.badge ?? `#${row.rank}`}
              </span>

              {/* Name + bar */}
              <div className="min-w-0">
                <p className={`text-sm font-semibold truncate ${row.isYou ? "text-primary" : ""}`}>
                  {row.isYou ? "→ Du?" : row.name}
                </p>
                <div className="mt-1.5 h-1 w-full bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${row.xpPct}%` }}
                    transition={{ delay: 0.7 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* XP */}
              <span className="text-xs font-mono text-right text-muted-foreground">
                {row.isYou ? "—" : row.xp.toLocaleString("de-DE")}
              </span>

              {/* Level */}
              <span className={`text-xs font-mono text-right font-bold ${row.isYou ? "text-muted-foreground" : "text-foreground"}`}>
                {row.isYou ? "?" : row.level}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="px-5 py-4 bg-primary/5 border-t border-primary/15 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Starte jetzt und climb die Rangliste</span>
          <Zap className="w-4 h-4 text-primary" />
        </div>
      </div>
    </motion.div>
  )
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background layers */}
      <div className="absolute inset-0 bg-dot-pattern opacity-40" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* Lime radial glow top-left */}
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-primary/8 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/8 rounded-full blur-3xl" />

      {/* Vertical accent line */}
      <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-primary/20 via-transparent to-transparent hidden lg:block" />

      <div className="container mx-auto px-4 relative z-10 py-16 lg:py-24 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: Text content */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Label badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex lg:justify-start justify-center"
            >
              <span className="section-label">Für Teenager · 13–19 · Kostenlos</span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold leading-[1.0] tracking-tight">
                <span className="block text-foreground">Code dich</span>
                <span className="block text-primary neon-text">nach oben.</span>
                <span className="block text-foreground/50 text-4xl md:text-5xl lg:text-6xl mt-2">
                  Werde gesponsert.
                </span>
              </h1>
            </motion.div>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed"
            >
              Lerne KI-Entwicklung durch echte Challenges. Sammle XP, climb die Rangliste — und werde von Tech-Companies entdeckt.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                asChild
                size="lg"
                className="group bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-8 py-6 text-base rounded-sm shadow-lg shadow-primary/20 hover:shadow-primary/35 transition-all duration-200 hover:-translate-y-0.5"
              >
                <Link href="/auth">
                  Jetzt kostenlos starten
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="px-8 py-6 text-base rounded-sm border-border hover:border-primary/40 hover:bg-muted/30 font-medium transition-all duration-200"
              >
                <Link href="/learn">Lektionen ansehen</Link>
              </Button>
            </motion.div>

            {/* Trust signals */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="flex flex-wrap gap-6 justify-center lg:justify-start text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>Kein Abo</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>Keine Kreditkarte</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>1.200+ aktiv</span>
              </div>
            </motion.div>
          </div>

          {/* Right: Live leaderboard */}
          <LiveLeaderboard />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-primary/60 to-transparent"
        />
      </div>
    </section>
  )
}
