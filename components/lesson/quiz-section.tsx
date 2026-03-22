"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle } from "lucide-react"
import type { LessonQuiz, QuizOption } from "@/lib/lessons"

interface QuizSectionProps {
  quiz: LessonQuiz
  lessonId: string
  onComplete?: (score: number) => void
}

export function QuizSection({ quiz, onComplete }: QuizSectionProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const question = quiz.questions[currentQuestion]

  const handleAnswer = (optionId: string) => {
    if (showResult) return
    setSelectedAnswer(optionId)
    setShowResult(true)

    const selectedOption = question.options?.find((opt) => opt.id === optionId)
    if (selectedOption?.correct) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setQuizCompleted(true)
      const selectedOption = question.options?.find((opt) => opt.id === selectedAnswer)
      const finalScore = score + (selectedOption?.correct ? 1 : 0)
      onComplete?.(finalScore)
    }
  }

  if (quizCompleted) {
    const percentage = Math.round((score / quiz.questions.length) * 100)
    const passed = percentage >= quiz.passThreshold

    return (
      <Card>
        <CardHeader>
          <CardTitle>Quiz abgeschlossen!</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="text-6xl font-black mb-4">
            {passed ? (
              <span className="text-green-500">{percentage}%</span>
            ) : (
              <span className="text-red-500">{percentage}%</span>
            )}
          </div>
          <div className="text-2xl font-semibold mb-2">
            {score}/{quiz.questions.length} Richtige
          </div>
          <p className="text-muted-foreground">
            {passed
              ? "Perfekt! Du hast das Quiz bestanden."
              : `Du brauchst ${quiz.passThreshold}% um zu bestehen. Versuch es nochmal!`}
          </p>
          {showResult && question.explanation && (
            <div className="mt-4 p-4 bg-muted rounded-lg text-left">
              <p className="text-sm">{question.explanation}</p>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Frage {currentQuestion + 1} von {quiz.questions.length}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">{question.question}</h3>
          {question.options && question.options.length > 0 && (
            <div className="space-y-3">
              {question.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswer(option.id)}
                  disabled={showResult}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                    showResult
                      ? option.correct
                        ? "border-green-500 bg-green-500/10"
                        : selectedAnswer === option.id
                        ? "border-red-500 bg-red-500/10"
                        : "border-border"
                      : "border-border hover:border-primary hover:bg-primary/5"
                  } ${selectedAnswer === option.id && !showResult ? "border-primary bg-primary/5" : ""}`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option.text}</span>
                    {showResult && option.correct && (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    )}
                    {showResult && selectedAnswer === option.id && !option.correct && (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
          {showResult && question.explanation && (
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm">{question.explanation}</p>
            </div>
          )}
          {showResult && (
            <Button onClick={handleNext} className="w-full">
              {currentQuestion < quiz.questions.length - 1 ? "Nächste Frage" : "Quiz beenden"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
