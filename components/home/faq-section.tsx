"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Plus, Minus } from "lucide-react"

const faqs = [
  {
    question: "Ist Codelift wirklich kostenlos?",
    answer: "Ja, 100%. Keine Abo-Gebühren, keine Kreditkarte, keine versteckten Kosten. Unser Ziel ist es, jedem Teenager Zugang zu KI-Bildung zu geben.",
  },
  {
    question: "Was brauche ich, um loszulegen?",
    answer: "Nur einen Computer mit Internetverbindung. Alle Lektionen laufen direkt im Browser. Für fortgeschrittene Kurse empfehlen wir VS Code.",
  },
  {
    question: "Wie funktioniert das Sponsor-Programm?",
    answer: "Top-Entwickler auf Codelift werden von Partner-Companies gesponsert: kostenlose Kurse, Hardware-Support und persönliches Mentorship von Profis.",
  },
  {
    question: "Kann ich starten, wenn ich noch nie programmiert habe?",
    answer: "Absolut. Unsere Anfänger-Lektionen setzen kein Vorwissen voraus. Du arbeitest dich Schritt für Schritt vor — die Community hilft dir dabei.",
  },
  {
    question: "Welche Sprachen lernt man bei Codelift?",
    answer: "Python für ML und Data Science, JavaScript für Web-Apps, SQL für Datenbanken. Dazu KI-APIs: Claude, ChatGPT, GitHub Copilot.",
  },
  {
    question: "Kann ich meine Projekte im Portfolio nutzen?",
    answer: "Ja — alles, was du baust, gehört dir. Code herunterladen, auf GitHub zeigen, in Bewerbungen präsentieren. Codelift-Projekte sind Karriere-Starter.",
  },
]

export function FaqSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section ref={ref} className="py-24 md:py-32 relative">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-[280px_1fr] gap-16">
          {/* Left label column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <span className="section-label">FAQ</span>
            <h2 className="text-4xl md:text-5xl font-display font-extrabold leading-tight mt-4">
              Häufige<br />
              <span className="text-primary">Fragen.</span>
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Noch mehr Fragen?{" "}
              <a href="mailto:support@codelift.de" className="text-primary hover:underline">
                support@codelift.de
              </a>
            </p>
          </motion.div>

          {/* Right FAQ list */}
          <div className="divide-y divide-border border-t border-border">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.35, delay: i * 0.06 }}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full text-left py-5 flex items-start justify-between gap-4 group"
                >
                  <span className={`text-base font-medium transition-colors ${open === i ? "text-primary" : "text-foreground group-hover:text-primary"}`}>
                    {faq.question}
                  </span>
                  <span className="shrink-0 mt-0.5 text-muted-foreground group-hover:text-primary transition-colors">
                    {open === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>
                {open === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.18 }}
                    className="pb-5 pr-8"
                  >
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
