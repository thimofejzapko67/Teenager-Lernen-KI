"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Zap } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Grid pattern background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
      <div
        className="absolute bottom-1/4 -right-32 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse-slow"
        style={{ animationDelay: "1s" }}
      />

      {/* Animated floating elements */}
      <motion.div
        className="absolute top-20 right-20 w-16 h-16 border border-primary/30 rounded-lg"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-32 left-20 w-12 h-12 border border-secondary/30 rounded-full"
        animate={{
          y: [0, 20, 0],
          rotate: [0, -10, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="container mx-auto px-4 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Fur Teenager 13-19 Jahre</span>
            </div>
          </motion.div>

          {/* Main headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight">
              <span className="block">Lerne KI-Entwicklung.</span>
              <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Werde sponsored.
              </span>
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Baue KI-Anwendungen, spiele dich durch Challenges und sammle XP.
            Top-Entwickler werden von Tech-Companies sponsored.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
          >
            <Button
              asChild
              size="lg"
              className="group bg-gradient-to-r from-primary to-purple-700 hover:from-primary/90 hover:to-purple-700/90 text-white font-semibold px-8 py-6 text-lg rounded-xl shadow-lg shadow-primary/40 hover:shadow-xl hover:shadow-primary/50 transition-all duration-300"
            >
              <Link href="/auth">
                Jetzt starten
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="px-8 py-6 text-lg rounded-xl border-2 border-primary/50 text-primary hover:bg-primary/10 font-semibold"
            >
              <Link href="/learn">Mehr erfahren</Link>
            </Button>
          </motion.div>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="pt-8 flex flex-wrap gap-8 justify-center items-center text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-accent" />
              <span className="font-medium">Kostenlos fur alle</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-secondary" />
              <span className="font-medium">Keine Kreditkarte notig</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="font-medium">Community aktiv</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <div className="w-1 h-2 rounded-full bg-muted-foreground/50" />
        </div>
      </motion.div>
    </section>
  )
}
