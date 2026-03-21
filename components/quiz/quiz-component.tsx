"use client";

import { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Check, Loader2 } from "lucide-react";
import type { Quiz, QuizAnswer, QuizResult } from "@/types/quiz";
import { QuizType } from "@/types/quiz";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MultipleChoiceQuestion } from "./multiple-choice-question";
import { PromptWritingQuestion } from "./prompt-writing-question";
import { QuizResult as QuizResultComponent } from "./quiz-result";

interface QuizComponentProps {
  quiz: Quiz;
  onSubmit: (answers: QuizAnswer[]) => Promise<QuizResult>;
  onCancel?: () => void;
}

interface AnswerState {
  questionId: string;
  // For multiple choice
  selectedOption?: number;
  // For prompt writing
  textAnswer?: string;
}

export function QuizComponent({ quiz, onSubmit, onCancel }: QuizComponentProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerState[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [submittedIndices, setSubmittedIndices] = useState<Set<number>>(new Set());
  const [questionResults, setQuestionResults] = useState<Map<number, { isCorrect: boolean; feedback: string; score: number }>>(new Map());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [finalResult, setFinalResult] = useState<QuizResult | null>(null);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  // Get current answer state
  const getCurrentAnswer = useCallback(() => {
    return answers.find((a) => a.questionId === currentQuestion.id);
  }, [answers, currentQuestion.id]);

  // Update answer state
  const updateAnswer = useCallback((updates: Partial<AnswerState>) => {
    setAnswers((prev) => {
      const existing = prev.find((a) => a.questionId === currentQuestion.id);
      if (existing) {
        return prev.map((a) =>
          a.questionId === currentQuestion.id ? { ...a, ...updates } : a
        );
      }
      return [
        ...prev,
        { questionId: currentQuestion.id, ...updates },
      ];
    });
  }, [currentQuestion.id]);

  // Handle multiple choice selection
  const handleOptionSelect = (optionIndex: number) => {
    if (submittedIndices.has(currentQuestionIndex)) return;
    updateAnswer({ selectedOption: optionIndex });
  };

  // Handle text input
  const handleTextChange = (text: string) => {
    if (submittedIndices.has(currentQuestionIndex)) return;
    updateAnswer({ textAnswer: text });
  };

  // Submit current question answer
  const submitQuestionAnswer = async () => {
    const currentAnswer = getCurrentAnswer();
    if (!currentAnswer) return;

    // For multiple choice, check if selected
    if (currentQuestion.type === QuizType.MULTIPLE_CHOICE) {
      if (currentAnswer.selectedOption === undefined) return;
    }

    // For prompt writing, check if has content
    if (currentQuestion.type === QuizType.PROMPT_WRITING) {
      if (!currentAnswer.textAnswer || currentAnswer.textAnswer.trim().length < 10) return;
    }

    // Simulate immediate feedback (in real app, this would call an API)
    const isMultipleChoice = currentQuestion.type === QuizType.MULTIPLE_CHOICE;

    let isCorrect = false;
    let feedback = "";
    let score = 0;

    if (isMultipleChoice) {
      isCorrect = currentAnswer.selectedOption === (currentQuestion as any).correctAnswer;
      feedback = (currentQuestion as any).explanation;
      score = isCorrect ? 100 : 0;
    } else {
      // Simulate AI grading for prompt writing
      setIsSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSubmitting(false);

      const keywords = (currentQuestion as any).keywords || [];
      const answerText = currentAnswer.textAnswer?.toLowerCase() || "";
      const matchedKeywords = keywords.filter((k: string) => answerText.includes(k.toLowerCase()));
      score = Math.round((matchedKeywords.length / keywords.length) * 100);
      isCorrect = score >= 70;
      feedback = isCorrect
        ? `Gut gemacht! Du hast ${matchedKeywords.length} von ${keywords.length} relevanten Keywords erkannt. ${(currentQuestion as any).explanation || ""}`
        : `Versuche mehr relevante Keywords einzubauen. Gefundene: ${matchedKeywords.join(", ")}. ${(currentQuestion as any).explanation || ""}`;
    }

    // Store result
    setQuestionResults((prev) => new Map(prev).set(currentQuestionIndex, { isCorrect, feedback, score }));
    setSubmittedIndices((prev) => new Set(prev).add(currentQuestionIndex));
    setShowFeedback(true);
  };

  // Go to next question
  const goToNext = () => {
    if (isLastQuestion) {
      // Submit entire quiz
      submitQuiz();
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setShowFeedback(false);
    }
  };

  // Go to previous question
  const goToPrevious = () => {
    if (!isFirstQuestion) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setShowFeedback(submittedIndices.has(currentQuestionIndex - 1));
    }
  };

  // Submit entire quiz
  const submitQuiz = async () => {
    setIsSubmitting(true);

    // Convert answers to QuizAnswer format
    const quizAnswers: QuizAnswer[] = quiz.questions.map((q) => {
      const answerState = answers.find((a) => a.questionId === q.id);
      if (q.type === QuizType.MULTIPLE_CHOICE) {
        return {
          questionId: q.id,
          type: QuizType.MULTIPLE_CHOICE,
          selectedOption: answerState?.selectedOption ?? -1,
        };
      } else {
        return {
          questionId: q.id,
          type: QuizType.PROMPT_WRITING,
          answer: answerState?.textAnswer ?? "",
        };
      }
    });

    const result = await onSubmit(quizAnswers);
    setFinalResult(result);
    setIsSubmitting(false);
  };

  // Handle retry
  const handleRetry = () => {
    setFinalResult(null);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShowFeedback(false);
    setSubmittedIndices(new Set());
    setQuestionResults(new Map());
  };

  // If showing final result
  if (finalResult) {
    return (
      <QuizResultComponent
        result={finalResult}
        onRetry={handleRetry}
        onContinue={() => {
          // Navigate away or close
          if (onCancel) onCancel();
        }}
      />
    );
  }

  const currentResult = questionResults.get(currentQuestionIndex);
  const hasAnswered =
    (currentQuestion.type === QuizType.MULTIPLE_CHOICE &&
      getCurrentAnswer()?.selectedOption !== undefined) ||
    (currentQuestion.type === QuizType.PROMPT_WRITING &&
      (getCurrentAnswer()?.textAnswer?.length ?? 0) > 0);

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-display font-bold neon-text">
              {quiz.title}
            </h2>
            {quiz.description && (
              <p className="text-sm text-muted-foreground mt-1">
                {quiz.description}
              </p>
            )}
          </div>
          {onCancel && (
            <Button variant="ghost" size="sm" onClick={onCancel}>
              Abbrechen
            </Button>
          )}
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Frage {currentQuestionIndex + 1} von {quiz.questions.length}
            </span>
            <span className="font-medium">
              {Math.round(
                (submittedIndices.size / quiz.questions.length) * 100
              )}
              % abgeschlossen
            </span>
          </div>
          <div className="h-2 bg-border rounded-full overflow-hidden">
            <div
              className="h-full xp-bar-fill transition-all duration-300"
              style={{
                width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Question indicators */}
        <div className="flex gap-2 mt-4">
          {quiz.questions.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (submittedIndices.has(index) || index < currentQuestionIndex) {
                  setCurrentQuestionIndex(index);
                  setShowFeedback(submittedIndices.has(index));
                }
              }}
              disabled={index > currentQuestionIndex && !submittedIndices.has(index)}
              className={cn(
                "flex-shrink-0 w-8 h-8 rounded-full text-sm font-medium transition-all",
                submittedIndices.has(index) && questionResults.get(index)?.isCorrect
                  ? "bg-green-500/20 text-green-400 border border-green-500/50"
                  : submittedIndices.has(index) && !questionResults.get(index)?.isCorrect
                  ? "bg-red-500/20 text-red-400 border border-red-500/50"
                  : index === currentQuestionIndex
                  ? "bg-primary/20 text-primary border border-primary/50 ring-2 ring-primary/30"
                  : "bg-card/30 text-muted-foreground border border-border/50",
                index > currentQuestionIndex && !submittedIndices.has(index) && "opacity-50 cursor-not-allowed"
              )}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Question Card */}
      <div className="glass-card rounded-2xl p-6 md:p-8">
        {/* Question type badge */}
        <div className="mb-4">
          <span
            className={cn(
              "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
              currentQuestion.type === QuizType.MULTIPLE_CHOICE
                ? "bg-blue-500/20 text-blue-400 border border-blue-500/50"
                : "bg-purple-500/20 text-purple-400 border border-purple-500/50"
            )}
          >
            {currentQuestion.type === QuizType.MULTIPLE_CHOICE
              ? "Multiple Choice"
              : "Prompt Writing"}
          </span>
        </div>

        {/* Question content */}
        {currentQuestion.type === QuizType.MULTIPLE_CHOICE ? (
          <MultipleChoiceQuestion
            question={currentQuestion}
            selectedOption={getCurrentAnswer()?.selectedOption}
            onAnswerChange={handleOptionSelect}
            showFeedback={showFeedback}
            isSubmitted={submittedIndices.has(currentQuestionIndex)}
            feedback={currentResult?.feedback}
            isCorrect={currentResult?.isCorrect}
          />
        ) : (
          <PromptWritingQuestion
            question={currentQuestion}
            answer={getCurrentAnswer()?.textAnswer}
            onAnswerChange={handleTextChange}
            showFeedback={showFeedback}
            isSubmitted={submittedIndices.has(currentQuestionIndex)}
            isGrading={isSubmitting && !showFeedback}
            feedback={currentResult?.feedback}
            isCorrect={currentResult?.isCorrect}
            score={currentResult?.score}
          />
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <Button
          variant="outline"
          onClick={goToPrevious}
          disabled={isFirstQuestion}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Zurück
        </Button>

        <div className="flex items-center gap-3">
          {!showFeedback ? (
            <Button
              onClick={submitQuestionAnswer}
              disabled={!hasAnswered || isSubmitting}
              className="min-w-[120px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analysiere...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Absenden
                </>
              )}
            </Button>
          ) : (
            <Button onClick={goToNext} disabled={isSubmitting}>
              {isLastQuestion ? (
                <>
                  Ergebnis anzeigen
                  <TrophyIcon className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  Nächste Frage
                  <ChevronRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      {/* XP reward hint */}
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          {quiz.passingScore}% erforderlich für Bestehen • +{quiz.xpReward} XP
        </p>
      </div>
    </div>
  );
}

function TrophyIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
      />
    </svg>
  );
}
