"use client";

import { useState, useEffect } from "react";
import {
  CheckCircle2,
  XCircle,
  Loader2,
  Lightbulb,
  AlertCircle,
} from "lucide-react";
import type { PromptWritingQuestion, PromptWritingAnswer } from "@/types/quiz";
import { QuizType } from "@/types/quiz";
import { cn } from "@/lib/utils";

interface PromptWritingQuestionProps {
  question: PromptWritingQuestion;
  answer?: string;
  onAnswerChange: (answer: string) => void;
  showFeedback?: boolean;
  isSubmitted?: boolean;
  isGrading?: boolean;
  feedback?: string;
  isCorrect?: boolean;
  score?: number;
}

export function PromptWritingQuestion({
  question,
  answer = "",
  onAnswerChange,
  showFeedback = false,
  isSubmitted = false,
  isGrading = false,
  feedback,
  isCorrect,
  score,
}: PromptWritingQuestionProps) {
  const [charCount, setCharCount] = useState(answer.length);
  const [showExample, setShowExample] = useState(false);

  const isTooShort = charCount < question.minCharacters;
  const isTooLong = charCount > question.maxCharacters;
  const isValidLength = !isTooShort && !isTooLong;

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setCharCount(newValue.length);
    onAnswerChange(newValue);
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">{question.question}</h3>
        <p className="text-sm text-muted-foreground">{question.prompt}</p>
      </div>

      {/* Textarea */}
      <div className="relative">
        <textarea
          value={answer}
          onChange={handleInputChange}
          disabled={isSubmitted || isGrading}
          placeholder="Schreibe deinen Prompt hier..."
          className={cn(
            "w-full min-h-[150px] p-4 rounded-lg border resize-none transition-all",
            "bg-card/50 focus:bg-card",
            "focus:outline-none focus:ring-2 focus:ring-primary/50",
            isSubmitted && "cursor-not-allowed opacity-70",
            showFeedback &&
              isCorrect &&
              "border-green-500 focus:ring-green-500/50",
            showFeedback &&
              !isCorrect &&
              "border-red-500 focus:ring-red-500/50"
          )}
          maxLength={question.maxCharacters}
        />

        {/* Character count indicator */}
        <div
          className={cn(
            "absolute bottom-3 right-3 text-xs px-2 py-1 rounded-full",
            isValidLength && "bg-green-500/20 text-green-400",
            (isTooShort || isTooLong) && "bg-yellow-500/20 text-yellow-400"
          )}
        >
          {charCount} / {question.minCharacters}-{question.maxCharacters}
        </div>

        {/* Grading overlay */}
        {isGrading && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-lg flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
              <span className="text-sm font-medium">Dein Prompt wird analysiert...</span>
            </div>
          </div>
        )}
      </div>

      {/* Validation warning */}
      {!isSubmitted && isTooShort && answer.length > 0 && (
        <div className="flex items-center gap-2 text-yellow-400 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>
            Schreibe mindestens {question.minCharacters - charCount} weitere
            Zeichen.
          </span>
        </div>
      )}

      {/* Example answer toggle */}
      {!isSubmitted && (
        <button
          type="button"
          onClick={() => setShowExample(!showExample)}
          className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
        >
          <Lightbulb className="w-4 h-4" />
          {showExample ? "Beispiel ausblenden" : "Beispiel anzeigen"}
        </button>
      )}

      {showExample && !isSubmitted && question.exampleAnswer && (
        <div className="p-4 rounded-lg border border-primary/30 bg-primary/5">
          <p className="text-sm font-medium text-primary mb-1">
            Beispielantwort:
          </p>
          <p className="text-sm text-muted-foreground">
            {question.exampleAnswer}
          </p>
        </div>
      )}

      {/* Feedback section */}
      {showFeedback && feedback && (
        <div
          className={cn(
            "flex items-start gap-3 p-4 rounded-lg border",
            isCorrect
              ? "border-green-500/50 bg-green-500/10"
              : "border-yellow-500/50 bg-yellow-500/10"
          )}
        >
          {isCorrect ? (
            <CheckCircle2 className="flex-shrink-0 w-5 h-5 text-green-500 mt-0.5" />
          ) : (
            <AlertCircle className="flex-shrink-0 w-5 h-5 text-yellow-500 mt-0.5" />
          )}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <p
                className={cn(
                  "text-sm font-medium",
                  isCorrect ? "text-green-400" : "text-yellow-400"
                )}
              >
                {isCorrect ? "Gut gemacht!" : "Nicht schlecht, aber Verbesserung möglich"}
              </p>
              {score !== undefined && (
                <span
                  className={cn(
                    "text-xs px-2 py-0.5 rounded-full",
                    isCorrect
                      ? "bg-green-500/20 text-green-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  )}
                >
                  {score}/100
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{feedback}</p>
          </div>
        </div>
      )}
    </div>
  );
}
