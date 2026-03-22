"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Zap, Terminal } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const codeLines = [
  { text: "# KI-Agent bauen", color: "text-emerald-400" },
  { text: "import anthropic", color: "text-violet-400" },
  { text: "", color: "" },
  { text: "client = anthropic.Anthropic()", color: "text-sky-300" },
  { text: "", color: "" },
  { text: 'message = client.messages.create(', color: "text-foreground/80" },
  { text: '  model="claude-opus-4-5",', color: "text-amber-300" },
  { text: '  messages=[{"role": "user",', color: "text-foreground/80" },
  { text: '    "content": "Hallo KI!"}])', color: "text-foreground/80" },
  { text: "", color: "" },
  { text: "print(message.content)", color: "text-sky-300" },
  { text: "# → +50 XP verdient! 🎉", color: "text-emerald-400" },
]

function CodeTerminal() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.4 }}
      className="hidden lg:block relative"
    >
      <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl" />
      <div className="relative bg-card/90 border border-border/60 rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 backdrop-blur-sm">
        {/* Terminal header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-muted/30">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex items-center gap-2 ml-2">
            <Terminal className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground font-mono">mein_erster_ki_agent.py</span>
          </div>
        </div>
        {/* Code content */}
        <div className="p-5 font-mono text-sm leading-relaxed">
          {codeLines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.08, duration: 0.3 }}
              className="flex"
            >
              <span className="select-none text-muted-foreground/30 w-6 shrink-0 text-right mr-4 text-xs leading-relaxed">
                {line.text !== "" ? i + 1 : ""}
              </span>
              <span className={line.color || "text-foreground/60"}>{line.text || "\u00A0"}</span>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ delay: 2, duration: 1, repeat: Infinity }}
            className="inline-block w-2 h-4 bg-primary mt-1 ml-[1.5rem]"
          />
        </div>
      </div>
    </motion.div>
  )
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Grid pattern background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.07]" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-48 w-[500px] h-[500px] bg-primary/15 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -right-48 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/5 rounded-full blur-3xl" />

      {/* Diagonal accent line */}
      <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent" />

      <div className="container mx-auto px-4 relative z-10 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text content */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex lg:justify-start justify-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-sm font-medium text-primary">
                <Sparkles className="w-4 h-4" />
                Für Teenager · 13–19 Jahre · Kostenlos
              </div>
            </motion.div>

            {/* Main headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.05] tracking-tight">
                <span className="block text-foreground">Lerne KI-</span>
                <span className="block text-foreground">Entwicklung.</span>
                <span className="block bg-gradient-to-r from-primary via-violet-400 to-secondary bg-clip-text text-transparent mt-1">
                  Werde sponsored.
                </span>
              </h1>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Baue echte KI-Apps, löse Challenges und sammle XP.
              Die besten Entwickler werden von Tech-Companies gesponsert und mentored.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                asChild
                size="lg"
                className="group bg-gradient-to-r from-primary to-violet-600 hover:from-primary/90 hover:to-violet-600/90 text-white font-semibold px-8 py-6 text-lg rounded-xl shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 hover:-translate-y-0.5"
              >
                <Link href="/auth">
                  Jetzt kostenlos starten
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg rounded-xl border border-border/80 text-foreground/80 hover:bg-muted/50 hover:border-primary/40 font-medium transition-all duration-300"
              >
                <Link href="/learn">Lektionen ansehen</Link>
              </Button>
            </motion.div>

            {/* Trust signals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap gap-6 justify-center lg:justify-start text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Kostenlos für alle</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-secondary" />
                <span>Keine Kreditkarte nötig</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Community aktiv</span>
              </div>
            </motion.div>
          </div>

          {/* Right: Code terminal */}
          <CodeTerminal />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/20 flex justify-center pt-2">
          <div className="w-1 h-2 rounded-full bg-muted-foreground/40" />
        </div>
      </motion.div>
    </section>
  )
}
