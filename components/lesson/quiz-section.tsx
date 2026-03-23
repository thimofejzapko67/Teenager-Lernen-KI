"use client"

import { useState } from "react"
import { CheckCircle2, XCircle, Star, ChevronRight, RotateCcw } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import type { LessonQuiz } from "@/lib/lessons"

interface QuizSectionProps {
  quiz: LessonQuiz
  lessonId: string
  onComplete?: (score: number) => void
}

const ALPHABET = ["A", "B", "C", "D", "E"]

export function QuizSection({ quiz, onComplete }: QuizSectionProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const question = quiz.questions[currentQuestion]
  const totalQuestions = quiz.questions.length
  const progressPct = Math.round((currentQuestion / totalQuestions) * 100)

  const isCorrect = (() => {
    if (!selectedAnswer || !showResult) return null
    return question.options?.find((o) => o.id === selectedAnswer)?.correct ?? false
  })()

  const handleAnswer = (optionId: string) => {
    if (showResult) return
    setSelectedAnswer(optionId)
    setShowResult(true)
    const opt = question.options?.find((o) => o.id === optionId)
    if (opt?.correct) setScore((s) => s + 1)
  }

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion((q) => q + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setQuizCompleted(true)
      const selectedOpt = question.options?.find((o) => o.id === selectedAnswer)
      onComplete?.(score + (selectedOpt?.correct ? 1 : 0))
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setQuizCompleted(false)
  }

  // ── Completed ─────────────────────────────────────────────────────────────
  if (quizCompleted) {
    const pct = Math.round((score / totalQuestions) * 100)
    const passed = pct >= quiz.passThreshold

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, type: "spring", bounce: 0.35 }}
        className="rounded-2xl border-[2.5px] bg-card overflow-hidden"
        style={{
          borderColor: passed ? "#58CC02" : "#FF4B4B",
          boxShadow: passed ? "0 5px 0 #46A302" : "0 5px 0 #EA2929",
        }}
      >
        <div
          className="px-6 py-8 text-center"
          style={{ background: passed ? "#EDFAE0" : "#FFEAEA" }}
        >
          <div className="text-5xl mb-3">{passed ? "🎉" : "💪"}</div>
          <h3
            className="text-2xl font-display font-900 mb-1"
            style={{ color: passed ? "#46A302" : "#EA2929" }}
          >
            {passed ? "Gut gemacht!" : "Nicht aufgeben!"}
          </h3>
          <p className="text-sm font-body text-muted-foreground">
            {passed
              ? "Du hast das Quiz bestanden."
              : `Du brauchst ${quiz.passThreshold}% zum Bestehen.`}
          </p>
        </div>

        <div className="px-6 py-6 grid grid-cols-2 gap-4">
          <div className="text-center p-4 rounded-xl border-2 border-border bg-muted/30">
            <div
              className="text-3xl font-display font-900 mb-1"
              style={{ color: passed ? "#46A302" : "#EA2929" }}
            >
              {pct}%
            </div>
            <div className="text-xs text-muted-foreground font-display font-700 uppercase tracking-wide">Ergebnis</div>
          </div>
          <div className="text-center p-4 rounded-xl border-2 border-border bg-muted/30">
            <div className="text-3xl font-display font-900 mb-1" style={{ color: "#58CC02" }}>
              {score}/{totalQuestions}
            </div>
            <div className="text-xs text-muted-foreground font-display font-700 uppercase tracking-wide">Richtig</div>
          </div>
        </div>

        {passed && (
          <div
            className="mx-6 mb-4 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2"
            style={{ background: "#FFF3E0", borderColor: "#FF9600", color: "#E08800" }}
          >
            <Star className="w-5 h-5" />
            <span className="font-display font-800">+{Math.round((score / totalQuestions) * 50)} XP verdient!</span>
          </div>
        )}

        <div className="px-6 pb-6">
          <button
            onClick={handleRestart}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 border-border bg-card font-display font-800 text-sm transition-all hover:-translate-y-0.5"
            style={{ boxShadow: "0 3px 0 var(--color-border)" }}
          >
            <RotateCcw className="w-4 h-4" />
            Nochmal versuchen
          </button>
        </div>
      </motion.div>
    )
  }

  // ── Question ──────────────────────────────────────────────────────────────
  return (
    <div className="space-y-5">
      {/* Progress bar + counter */}
      <div className="flex items-center gap-3">
        <div className="flex-1 duo-progress-track">
          <motion.div
            className="duo-progress-fill"
            initial={{ width: "0%" }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
        <span className="text-sm font-display font-800 text-muted-foreground whitespace-nowrap">
          {currentQuestion + 1} / {totalQuestions}
        </span>
      </div>

      {/* Question + options */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.22 }}
          className="space-y-4"
        >
          {/* Question */}
          <div
            className="p-6 rounded-2xl border-[2.5px] border-border bg-card"
            style={{ boxShadow: "0 4px 0 var(--color-border)" }}
          >
            <div
              className="text-xs font-display font-800 uppercase tracking-widest mb-3"
              style={{ color: "#1CB0F6" }}
            >
              Frage {currentQuestion + 1}
            </div>
            <h3 className="text-xl font-display font-800 leading-snug">
              {question.question}
            </h3>
          </div>

          {/* Options */}
          {question.options && question.options.length > 0 && (
            <div className="space-y-3">
              {question.options.map((option, i) => {
                const isSelected = selectedAnswer === option.id

                let cls = "duo-option"
                if (showResult) {
                  if (option.correct)               cls += " correct"
                  else if (isSelected && !option.correct) cls += " incorrect"
                } else if (isSelected) {
                  cls += " selected"
                }

                return (
                  <motion.button
                    key={option.id}
                    whileTap={!showResult ? { scale: 0.98, y: 2 } : {}}
                    onClick={() => handleAnswer(option.id)}
                    disabled={showResult}
                    className={cls}
                  >
                    <span
                      className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-display font-900"
                      style={{
                        background: showResult
                          ? option.correct
                            ? "#58CC02"
                            : isSelected ? "#FF4B4B" : "#F0F0F0"
                          : isSelected ? "#1CB0F6" : "#F0F0F0",
                        color:
                          (showResult && (option.correct || isSelected)) || (!showResult && isSelected)
                            ? "#FFFFFF"
                            : "#777777",
                      }}
                    >
                      {ALPHABET[i]}
                    </span>
                    <span className="flex-1 font-display font-700 text-sm leading-snug">
                      {option.text}
                    </span>
                    {showResult && option.correct && (
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: "#58CC02" }} />
                    )}
                    {showResult && isSelected && !option.correct && (
                      <XCircle className="w-5 h-5 flex-shrink-0" style={{ color: "#FF4B4B" }} />
                    )}
                  </motion.button>
                )
              })}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Feedback + next */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25 }}
            className="space-y-3"
          >
            {/* Explanation banner */}
            {question.explanation && (
              <div className={isCorrect ? "duo-result-correct" : "duo-result-incorrect"}>
                <div className="flex items-start gap-3">
                  <span className="text-xl mt-0.5">{isCorrect ? "✅" : "❌"}</span>
                  <div>
                    <div className="font-display font-900 text-sm mb-0.5">
                      {isCorrect ? "Richtig!" : "Falsch!"}
                    </div>
                    <p className="text-sm font-body leading-relaxed opacity-90">
                      {question.explanation}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Next button */}
            <motion.button
              whileTap={{ y: 3 }}
              onClick={handleNext}
              className="w-full py-4 rounded-xl font-display font-900 text-white text-base uppercase tracking-wide transition-all hover:-translate-y-0.5"
              style={
                isCorrect
                  ? { background: "#58CC02", boxShadow: "0 4px 0 #46A302" }
                  : { background: "#1CB0F6", boxShadow: "0 4px 0 #0E9BD8" }
              }
            >
              <span className="flex items-center justify-center gap-2">
                {currentQuestion < totalQuestions - 1 ? "Weiter" : "Quiz beenden"}
                <ChevronRight className="w-5 h-5" />
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
