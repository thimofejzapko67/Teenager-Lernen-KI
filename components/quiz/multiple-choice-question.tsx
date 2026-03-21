"use client";

import { CheckCircle2, XCircle, Info } from "lucide-react";
import type { MultipleChoiceQuestion, MultipleChoiceAnswer } from "@/types/quiz";
import { QuizType } from "@/types/quiz";
import { cn } from "@/lib/utils";

interface MultipleChoiceQuestionProps {
  question: MultipleChoiceQuestion;
  selectedOption?: number;
  onAnswerChange: (answer: number) => void;
  showFeedback?: boolean;
  isSubmitted?: boolean;
  feedback?: string;
  isCorrect?: boolean;
}

export function MultipleChoiceQuestion({
  question,
  selectedOption,
  onAnswerChange,
  showFeedback = false,
  isSubmitted = false,
  feedback,
  isCorrect,
}: MultipleChoiceQuestionProps) {
  const isCorrectOption = (index: number) => index === question.correctAnswer;
  const isSelectedOption = (index: number) => index === selectedOption;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{question.question}</h3>

      <div className="space-y-2">
        {question.options.map((option, index) => {
          const isSelected = isSelectedOption(index);
          const showCorrect = showFeedback && isCorrectOption(index);
          const showIncorrect = showFeedback && isSelected && !isCorrect;

          return (
            <button
              key={index}
              onClick={() => !isSubmitted && onAnswerChange(index)}
              disabled={isSubmitted}
              className={cn(
                "w-full text-left p-4 rounded-lg border transition-all duration-200",
                "relative overflow-hidden group",
                // Default state
                !showFeedback &&
                  isSelected &&
                  "border-primary bg-primary/20 shadow-lg shadow-primary/20",
                !showFeedback && !isSelected && "border-border bg-card/50 hover:border-primary/50 hover:bg-primary/5",
                // Feedback states
                showCorrect && "border-green-500 bg-green-500/20",
                showIncorrect && "border-red-500 bg-red-500/20",
                isSubmitted && "cursor-not-allowed opacity-70"
              )}
            >
              <div className="flex items-start gap-3">
                {/* Option indicator */}
                <div
                  className={cn(
                    "flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center font-medium text-sm transition-colors",
                    !showFeedback &&
                      isSelected &&
                      "border-primary bg-primary text-primary-foreground",
                    !showFeedback && !isSelected && "border-border text-muted-foreground",
                    showCorrect && "border-green-500 bg-green-500 text-white",
                    showIncorrect && "border-red-500 bg-red-500 text-white"
                  )}
                >
                  {String.fromCharCode(65 + index)}
                </div>

                {/* Option text */}
                <span className="flex-1 pt-0.5">{option}</span>

                {/* Feedback icons */}
                {showFeedback && isCorrectOption(index) && (
                  <CheckCircle2 className="flex-shrink-0 w-5 h-5 text-green-500" />
                )}
                {showFeedback && isSelected && !isCorrect && (
                  <XCircle className="flex-shrink-0 w-5 h-5 text-red-500" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Feedback section */}
      {showFeedback && feedback && (
        <div
          className={cn(
            "flex items-start gap-3 p-4 rounded-lg border",
            isCorrect
              ? "border-green-500/50 bg-green-500/10"
              : "border-red-500/50 bg-red-500/10"
          )}
        >
          {isCorrect ? (
            <CheckCircle2 className="flex-shrink-0 w-5 h-5 text-green-500 mt-0.5" />
          ) : (
            <XCircle className="flex-shrink-0 w-5 h-5 text-red-500 mt-0.5" />
          )}
          <div className="flex-1">
            <p
              className={cn(
                "text-sm font-medium mb-1",
                isCorrect ? "text-green-400" : "text-red-400"
              )}
            >
              {isCorrect ? "Richtig!" : "Nicht ganz richtig"}
            </p>
            <p className="text-sm text-muted-foreground">{feedback}</p>
          </div>
        </div>
      )}
    </div>
  );
}
