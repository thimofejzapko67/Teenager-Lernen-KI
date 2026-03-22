"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle } from "lucide-react"

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
}

interface QuizSectionProps {
  questions: Question[]
  onComplete?: (score: number) => void
}

export function QuizSection({ questions, onComplete }: QuizSectionProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const question = questions[currentQuestion]

  const handleAnswer = (answerIndex: number) => {
    if (showResult) return
    setSelectedAnswer(answerIndex)
    setShowResult(true)

    if (answerIndex === question.correctAnswer) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setQuizCompleted(true)
      onComplete?.(score + (selectedAnswer === question.correctAnswer ? 1 : 0))
    }
  }

  if (quizCompleted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Quiz abgeschlossen!</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="text-6xl font-black text-primary mb-4">
            {score}/{questions.length}
          </div>
          <p className="text-muted-foreground">
            {score === questions.length ? "Perfekt!" : score >= questions.length / 2 ? "Gut gemacht!" : "Versuch es nochmal!"}
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Frage {currentQuestion + 1} von {questions.length}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">{question.question}</h3>
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={showResult}
                className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                  showResult
                    ? index === question.correctAnswer
                      ? "border-green-500 bg-green-500/10"
                      : index === selectedAnswer
                      ? "border-red-500 bg-red-500/10"
                      : "border-border"
                    : "border-border hover:border-primary hover:bg-primary/5"
                } ${selectedAnswer === index && !showResult ? "border-primary bg-primary/5" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {showResult && index === question.correctAnswer && (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  )}
                  {showResult && index === selectedAnswer && index !== question.correctAnswer && (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                </div>
              </button>
            ))}
          </div>
          {showResult && (
            <Button onClick={handleNext} className="w-full">
              {currentQuestion < questions.length - 1 ? "Nächste Frage" : "Quiz beenden"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
