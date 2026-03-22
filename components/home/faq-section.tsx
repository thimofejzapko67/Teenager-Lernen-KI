"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "Ist ClawAcademy wirklich kostenlos?",
    answer: "Ja! ClawAcademy ist 100% kostenlos für alle Teenager zwischen 13–19 Jahren. Es gibt keine versteckten Kosten, keine Abo-Gebühren und keine Kreditkarte ist erforderlich. Unser Ziel ist es, jedem Zugang zu KI-Bildung zu geben.",
  },
  {
    question: "Was brauche ich, um loszulegen?",
    answer: "Du brauchst nur einen Computer mit Internetverbindung und Interesse an KI und Programmierung. Alle Lektionen und Challenges laufen direkt im Browser. Für fortgeschrittene Kurse empfehlen wir einen Code-Editor wie VS Code.",
  },
  {
    question: "Wie funktioniert das Sponsor-Programm?",
    answer: "Top-Entwickler auf ClawAcademy werden von unseren Partner-Companies gesponsert. Das bedeutet: kostenlose Kurse, Hardware-Support und Mentorship von Profis. Qualifiziert sind alle, die bestimmte XP-Meilensteine erreichen und Projekte in ihrem Portfolio haben.",
  },
  {
    question: "Kann ich ClawAcademy auch nutzen, wenn ich noch nie programmiert habe?",
    answer: "Absolut! Unsere Anfänger-Kurse setzen keine Vorkenntnisse voraus. Du startest mit den Basics und arbeitest dich Schritt für Schritt nach oben. Unsere Community hilft dir bei Fragen.",
  },
  {
    question: "Welche Sprachen lernt man bei ClawAcademy?",
    answer: "Wir fokussieren auf die wichtigsten Sprachen für KI-Entwicklung: Python für Machine Learning und Data Science, JavaScript für Web-Apps, und SQL für Datenbanken. Dazu kommen KI-Tools wie ChatGPT, Claude und GitHub Copilot.",
  },
  {
    question: "Gibt es Altersbeschränkungen?",
    answer: "ClawAcademy ist für Teenager zwischen 13–19 Jahren gemacht. Nutzer unter 16 benötigen die Zustimmung ihrer Eltern. Diese wird bei der Registrierung abgefragt. Nach 19 Jahren kannst du als Mentor bleiben!",
  },
  {
    question: "Wie viel Zeit sollte ich investieren?",
    answer: "So viel oder wenig wie du willst. Einige Lektionen sind in 10–15 Minuten erledigt. Für Herausforderungen solltest du 30–60 Minuten einplanen. Es gibt keine Fristen – du lernst in deinem Tempo.",
  },
  {
    question: "Kann ich Projekte in mein Portfolio aufnehmen?",
    answer: "Ja! Alle Projekte, die du auf ClawAcademy baust, gehören dir. Du kannst den Code herunterladen, auf GitHub zeigen und in Bewerbungen vorstellen. Viele unserer Alumni haben mit ClawAcademy-Projekten Jobs bekommen.",
  },
]

export function FaqSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section ref={ref} className="py-24 md:py-32 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-12 max-w-3xl mx-auto"
        >
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-4"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold">
              Häufige <span className="text-primary">Fragen</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Alles, was du wissen musst.
            </p>
          </motion.div>

          {/* FAQ items */}
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full text-left bg-card border border-border rounded-xl hover:border-primary/50 transition-colors"
                >
                  <div className="p-6 flex items-start justify-between gap-4">
                    <h3 className="font-semibold pr-8">{faq.question}</h3>
                    <ChevronDown
                      className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-200 flex-shrink-0 mt-0.5 ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  {openIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-6 pb-6"
                    >
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </button>
              </motion.div>
            ))}
          </div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center pt-8"
          >
            <p className="text-muted-foreground mb-4">
              Noch weitere Fragen?
            </p>
            <a
              href="mailto:support@clawacademy.de"
              className="text-primary hover:text-primary/80 transition-colors font-medium"
            >
              support@clawacademy.de
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
