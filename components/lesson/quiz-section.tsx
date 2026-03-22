"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, XCircle, RotateCcw, Trophy, Zap } from "lucide-react";
import type { LessonQuiz, QuizQuestion } from "@/lib/lessons";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface QuizSectionProps {
  quiz: LessonQuiz;
  lessonId: string;
  userId?: string;
  onComplete?: (passed: boolean, score: number, xpAwarded: number) => void;
  previousAttempts?: number;
}

type QuizState = "intro" | "in-progress" | "review" | "completed";

interface QuizResults {
  score: number;
  passed: boolean;
  correctAnswers: number;
  totalQuestions: number;
  xpAwarded: number;
}

export function QuizSection({
  quiz,
  lessonId,
  userId,
  onComplete,
  previousAttempts = 0,
}: QuizSectionProps) {
  const [quizState, setQuizState] = useState<QuizState>("intro");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<string>>(new Set());
  const [showResults, setShowResults] = useState<QuizResults | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;
  const isCurrentAnswered = answeredQuestions.has(currentQuestion?.id ?? "");

  // Handle answer selection — shows immediate feedback
  const handleSelectAnswer = (questionId: string, optionId: string) => {
    if (quizState !== "in-progress" || answeredQuestions.has(questionId)) return;

    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionId }));
    setAnsweredQuestions((prev) => new Set(prev).add(questionId));
  };

  // Navigate to next question
  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      handleSubmitQuiz();
    }
  };

  // Navigate to previous question
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  // Submit quiz and calculate results
  const handleSubmitQuiz = async () => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    let correctCount = 0;
    const totalQuestions = quiz.questions.length;

    quiz.questions.forEach((question) => {
      const selectedOptionId = selectedAnswers[question.id];
      if (selectedOptionId) {
        const selectedOption = question.options?.find(
          (opt) => opt.id === selectedOptionId
        );
        if (selectedOption?.correct) {
          correctCount++;
        }
      }
    });

    const score = Math.round((correctCount / totalQuestions) * 100);
    const passed = score >= quiz.passThreshold;
    const xpAwarded = passed ? 50 : 0; // Mock XP award

    const results: QuizResults = {
      score,
      passed,
      correctAnswers: correctCount,
      totalQuestions,
      xpAwarded,
    };

    setShowResults(results);
    setQuizState("completed");

    if (passed) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }

    onComplete?.(passed, score, xpAwarded);
    setIsSubmitting(false);
  };

  // Start quiz
  const handleStartQuiz = () => {
    setQuizState("in-progress");
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setAnsweredQuestions(new Set());
    setShowResults(null);
  };

  // Retake quiz
  const handleRetakeQuiz = () => {
    setQuizState("in-progress");
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setAnsweredQuestions(new Set());
    setShowResults(null);
  };

  // Intro screen
  if (quizState === "intro") {
    return (
      <div className="glass-card rounded-lg p-6 md:p-8">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
            <Trophy className="h-8 w-8 text-primary" />
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-2">
              Quiz: Teste dein Wissen
            </h2>
            <p className="text-muted-foreground">
              {quiz.questions.length} Fragen • Bestehensgrenze:{" "}
              {quiz.passThreshold}%
            </p>
          </div>

          <div className="bg-card/50 rounded-lg p-4 text-left space-y-2">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
              Quiz-Details
            </h3>
            <ul className="space-y-1 text-sm">
              <li className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                <span>Bestehe das Quiz mit mind. {quiz.passThreshold}%</span>
              </li>
              <li className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-yellow-500" />
                <span>Verdiene XP für das Bestehen</span>
              </li>
              {previousAttempts > 0 && (
                <li className="flex items-center gap-2 text-muted-foreground">
                  <RotateCcw className="h-4 w-4" />
                  <span>Versuche übrig: {Math.max(0, 3 - previousAttempts)}</span>
                </li>
              )}
            </ul>
          </div>

          <Button
            size="lg"
            onClick={handleStartQuiz}
            className="cyber-button px-8"
          >
            Quiz starten
          </Button>
        </div>
      </div>
    );
  }

  // Results screen
  if (quizState === "completed" && showResults) {
    return (
      <div className="glass-card rounded-lg p-6 md:p-8 relative overflow-hidden">
        {showConfetti && <ConfettiEffect />}

        <div className="text-center space-y-6">
          <div
            className={cn(
              "inline-flex items-center justify-center w-20 h-20 rounded-full mb-4",
              showResults.passed
                ? "bg-green-500/20"
                : "bg-orange-500/20"
            )}
          >
            {showResults.passed ? (
              <CheckCircle2 className="h-10 w-10 text-green-400" />
            ) : (
              <XCircle className="h-10 w-10 text-orange-400" />
            )}
          </div>

          <div>
            <h2
              className={cn(
                "text-2xl md:text-3xl font-display font-bold mb-2",
                showResults.passed
                  ? "text-green-400"
                  : "text-orange-400"
              )}
            >
              {showResults.passed ? "Geschafft!" : "Nicht ganz"}
            </h2>
            <p className="text-muted-foreground">
              Du hast {showResults.correctAnswers} von{" "}
              {showResults.totalQuestions} Fragen richtig ({showResults.score}%)
            </p>
          </div>

          {/* Score Circle */}
          <div className="flex justify-center">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="58"
                  fill="none"
                  className="stroke-border/30"
                  strokeWidth="8"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="58"
                  fill="none"
                  className={cn(
                    "transition-all duration-1000 ease-out",
                    showResults.passed
                      ? "stroke-green-500"
                      : "stroke-orange-500"
                  )}
                  strokeWidth="8"
                  strokeDasharray={2 * Math.PI * 58}
                  strokeDashoffset={
                    2 * Math.PI * 58 * (1 - showResults.score / 100)
                  }
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold">
                  {showResults.score}%
                </span>
              </div>
            </div>
          </div>

          {/* XP Awarded */}
          {showResults.xpAwarded > 0 && (
            <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
              <div className="flex items-center justify-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <span className="font-semibold">+{showResults.xpAwarded} XP verdient</span>
              </div>
            </div>
          )}

          {/* Review answers */}
          <div className="text-left space-y-4">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
              Antworten überprüfen
            </h3>
            <div className="space-y-3">
              {quiz.questions.map((question, index) => {
                const selectedOptionId = selectedAnswers[question.id];
                const selectedOption = question.options?.find(
                  (opt) => opt.id === selectedOptionId
                );
                const correctOption = question.options?.find((opt) => opt.correct);

                return (
                  <div
                    key={question.id}
                    className={cn(
                      "bg-card/50 border rounded-lg p-4",
                      selectedOption?.correct
                        ? "border-green-500/50"
                        : "border-orange-500/50"
                    )}
                  >
                    <p className="font-medium mb-2">
                      {index + 1}. {question.question}
                    </p>
                    <div className="space-y-1 text-sm">
                      <p className={cn(
                        selectedOption?.correct ? "text-green-400" : "text-orange-400"
                      )}>
                        {selectedOption?.correct ? "Richtig" : "Falsch"}:{" "}
                        {selectedOption?.text || "Keine Antwort"}
                      </p>
                      {!selectedOption?.correct && correctOption && (
                        <p className="text-green-400">
                          Korrekt: {correctOption.text}
                        </p>
                      )}
                      {question.explanation && (
                        <p className="text-muted-foreground mt-2 italic">
                          {question.explanation}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {!showResults.passed && (
              <Button
                size="lg"
                onClick={handleRetakeQuiz}
                variant="outline"
                className="cyber-button"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Nochmal versuchen
              </Button>
            )}
            <Button
              size="lg"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="cyber-button"
            >
              Zurück zur Lektion
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Question screen
  return (
    <div className="glass-card rounded-lg p-6 md:p-8">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <span>
            Frage {currentQuestionIndex + 1} von {quiz.questions.length}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question */}
      <div className="space-y-6">
        <h2 className="text-xl md:text-2xl font-semibold leading-tight">
          {currentQuestion.question}
        </h2>

        {/* Options */}
        <div className="space-y-3">
          {currentQuestion.options?.map((option) => {
            const isSelected = selectedAnswers[currentQuestion.id] === option.id;
            const isAnswered = isCurrentAnswered;
            const isCorrect = option.correct;
            const isWrongSelected = isSelected && !isCorrect;
            const isCorrectUnselected = isAnswered && isCorrect && !isSelected;

            return (
              <button
                key={option.id}
                onClick={() => handleSelectAnswer(currentQuestion.id, option.id)}
                disabled={isAnswered}
                className={cn(
                  "w-full text-left p-4 rounded-lg border transition-all duration-200",
                  !isAnswered && "hover:bg-primary/10 hover:border-primary/50 cursor-pointer",
                  isAnswered && "cursor-default",
                  isSelected && !isAnswered && "bg-primary/20 border-primary",
                  isSelected && isCorrect && "bg-green-500/20 border-green-500",
                  isWrongSelected && "bg-red-500/20 border-red-500",
                  isCorrectUnselected && "bg-green-500/10 border-green-500/50",
                  !isSelected && !isCorrectUnselected && "bg-card/50 border-border/50"
                )}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 shrink-0",
                      isSelected && isCorrect && "border-green-500 bg-green-500",
                      isWrongSelected && "border-red-500 bg-red-500",
                      isCorrectUnselected && "border-green-500",
                      !isSelected && !isCorrectUnselected && (isSelected ? "border-primary bg-primary" : "border-border")
                    )}
                  >
                    {isSelected && isCorrect && <CheckCircle2 className="w-3 h-3 text-white" />}
                    {isWrongSelected && <XCircle className="w-3 h-3 text-white" />}
                    {isCorrectUnselected && <div className="w-2 h-2 rounded-full bg-green-500" />}
                    {isSelected && !isAnswered && <div className="w-2.5 h-2.5 rounded-full bg-background" />}
                  </div>
                  <span className="flex-1">{option.text}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation after answering */}
        {isCurrentAnswered && currentQuestion.explanation && (
          <div className="bg-card/60 border border-border/60 rounded-lg p-4 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Erklärung: </span>
            {currentQuestion.explanation}
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            Zurück
          </Button>

          <div className="flex gap-2">
            {quiz.questions.map((_, index) => {
              const q = quiz.questions[index];
              const isAnsweredQ = answeredQuestions.has(q.id);
              const selectedOpt = q.options?.find(o => o.id === selectedAnswers[q.id]);
              const isCorrectQ = selectedOpt?.correct;
              return (
                <button
                  key={index}
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={cn(
                    "w-8 h-8 rounded-full text-sm font-medium transition-colors",
                    index === currentQuestionIndex && !isAnsweredQ && "bg-primary text-primary-foreground",
                    isAnsweredQ && isCorrectQ && "bg-green-500 text-white",
                    isAnsweredQ && !isCorrectQ && "bg-red-500 text-white",
                    !isAnsweredQ && index !== currentQuestionIndex && "bg-card/50 text-muted-foreground hover:bg-card"
                  )}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>

          <Button
            onClick={handleNext}
            disabled={!isCurrentAnswered || isSubmitting}
          >
            {currentQuestionIndex === quiz.questions.length - 1
              ? isSubmitting
                ? "Wird ausgewertet..."
                : "Abschließen"
              : "Weiter"}
          </Button>
        </div>
      </div>
    </div>
  );
}

// Simple confetti effect component
function ConfettiEffect() {
  useEffect(() => {
    const colors = [
      "oklch(0.65 0.25 285)", // primary
      "oklch(0.7 0.2 195)", // secondary
      "oklch(0.65 0.25 10)", // accent
      "oklch(0.7 0.2 120)", // green
    ];

    const confetti = Array.from({ length: 50 }).map((_, i) => {
      const style = {
        left: `${Math.random() * 100}%`,
        top: `-20px`,
        animationDelay: `${Math.random() * 3}s`,
        animationDuration: `${3 + Math.random() * 2}s`,
        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
      };
      return { style, id: i };
    });

    // We'd need to append these to DOM, but for simplicity we'll use a CSS-based approach
    // In a real implementation, use canvas-confetti or similar library
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <style>{`
        @keyframes confetti-fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .confetti-piece {
          position: absolute;
          width: 10px;
          height: 10px;
          animation: confetti-fall linear forwards;
        }
      `}</style>
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="confetti-piece"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
            backgroundColor: [
              "oklch(0.65 0.25 285)",
              "oklch(0.7 0.2 195)",
              "oklch(0.65 0.25 10)",
              "oklch(0.7 0.2 120)",
            ][Math.floor(Math.random() * 4)],
          }}
        />
      ))}
    </div>
  );
}
