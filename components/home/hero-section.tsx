"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Zap, Send } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

const PROMPTS = [
  {
    prompt: "Erkläre mir, wie eine REST API funktioniert",
    response: "Eine REST API ist eine Schnittstelle, die HTTP-Methoden wie GET, POST, PUT und DELETE nutzt, um Daten zwischen Client und Server auszutauschen...",
  },
  {
    prompt: "Schreib einen einfachen KI-Agenten in Python",
    response: "Klar! Hier ist ein einfacher KI-Agent mit der Anthropic API. Er nimmt eine Nutzereingabe entgegen und antwortet intelligent...",
  },
  {
    prompt: "Was ist der Unterschied zwischen iOS und Android?",
    response: "iOS läuft ausschließlich auf Apple-Geräten und nutzt Swift/Objective-C. Android ist open-source und wird auf vielen Geräten verwendet...",
  },
]

function PromptDemo() {
  const [promptIndex, setPromptIndex] = useState(0)
  const [typedPrompt, setTypedPrompt] = useState("")
  const [phase, setPhase] = useState<"typing" | "responding" | "pause">("typing")

  const current = PROMPTS[promptIndex]

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>

    if (phase === "typing") {
      if (typedPrompt.length < current.prompt.length) {
        timeout = setTimeout(() => {
          setTypedPrompt(current.prompt.slice(0, typedPrompt.length + 1))
        }, 38)
      } else {
        timeout = setTimeout(() => setPhase("responding"), 500)
      }
    } else if (phase === "responding") {
      timeout = setTimeout(() => setPhase("pause"), 2800)
    } else {
      timeout = setTimeout(() => {
        setTypedPrompt("")
        setPhase("typing")
        setPromptIndex((i) => (i + 1) % PROMPTS.length)
      }, 1800)
    }

    return () => clearTimeout(timeout)
  }, [phase, typedPrompt, current.prompt])

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.4 }}
      className="hidden lg:block relative"
    >
      <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl" />
      <div className="relative bg-card/90 border border-border/60 rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 backdrop-blur-sm flex flex-col">
        {/* Chat header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border/50 bg-muted/30">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex items-center gap-2 ml-1">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span className="text-xs font-medium text-foreground/80">Codelift AI</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </div>

        {/* Chat messages area */}
        <div className="flex-1 p-4 space-y-4 min-h-[220px]">
          <AnimatePresence mode="wait">
            {phase !== "typing" && (
              <motion.div
                key={`response-${promptIndex}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="flex gap-3"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="bg-muted/50 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-foreground/80 leading-relaxed max-w-[85%]">
                  {phase === "responding" ? (
                    <span>
                      {current.response.slice(0, 60)}
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="inline-block w-0.5 h-3.5 bg-primary ml-0.5 align-middle"
                      />
                    </span>
                  ) : (
                    current.response
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Prompt input */}
        <div className="px-4 pb-4">
          <div className="flex items-center gap-2 bg-background/60 border border-border/60 rounded-xl px-4 py-3">
            <span className="flex-1 text-sm font-mono text-foreground/90 min-h-[20px]">
              {typedPrompt}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity }}
                className="inline-block w-0.5 h-4 bg-primary ml-0.5 align-middle"
              />
            </span>
            <motion.button
              animate={phase !== "typing" ? { scale: [1, 1.15, 1] } : {}}
              transition={{ duration: 0.3 }}
              className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center shrink-0"
            >
              <Send className="w-3.5 h-3.5 text-white" />
            </motion.button>
          </div>
          <p className="text-[10px] text-muted-foreground/50 text-center mt-2">
            +50 XP für jede beantwortete Lektion
          </p>
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

          {/* Right: Prompt demo */}
          <PromptDemo />
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
