"use client";

import { useEffect, useState, useRef } from "react";
import { Trophy, X, RotateCcw, ArrowRight, Sparkles } from "lucide-react";
import type { QuizResult } from "@/types/quiz";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface QuizResultProps {
  result: QuizResult;
  onRetry: () => void;
  onContinue: () => void;
}

interface ConfettiParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  rotation: number;
  size: number;
}

export function QuizResult({ result, onRetry, onContinue }: QuizResultProps) {
  const [showConfetti, setShowConfetti] = useState(result.passed);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const colors = [
    "oklch(0.65 0.25 285)", // primary
    "oklch(0.7 0.2 195)", // secondary
    "oklch(0.65 0.25 10)", // accent
    "oklch(0.7 0.25 145)", // green
    "oklch(0.7 0.2 45)", // gold
  ];

  // Confetti animation
  useEffect(() => {
    if (!showConfetti || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: ConfettiParticle[] = Array.from({ length: 150 }, (_, i) => ({
      id: i,
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 15,
      vy: (Math.random() - 1) * 15 - 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      size: Math.random() * 8 + 4,
    }));

    let animationId: number;
    let opacity = 1;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.3; // gravity
        particle.rotation += 5;
        particle.vx *= 0.99; // air resistance

        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate((particle.rotation * Math.PI) / 180);
        ctx.globalAlpha = opacity;
        ctx.fillStyle = particle.color;
        ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
        ctx.restore();
      });

      opacity -= 0.005;

      if (opacity > 0) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [showConfetti]);

  const scoreColor =
    result.totalScore >= 90
      ? "text-green-400"
      : result.totalScore >= 70
      ? "text-blue-400"
      : result.totalScore >= 50
      ? "text-yellow-400"
      : "text-red-400";

  const handleResize = () => {
    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative">
      {/* Confetti canvas */}
      {showConfetti && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-50"
        />
      )}

      <div className="max-w-2xl mx-auto">
        {/* Result Card */}
        <div className="glass-card rounded-2xl overflow-hidden">
          {/* Header with gradient */}
          <div
            className={cn(
              "p-8 text-center relative overflow-hidden",
              result.passed
                ? "bg-gradient-to-b from-green-500/20 to-transparent"
                : "bg-gradient-to-b from-red-500/20 to-transparent"
            )}
          >
            {/* Animated background glow */}
            {result.passed && (
              <div className="absolute inset-0 bg-gradient-radial from-primary/30 to-transparent animate-pulse" />
            )}

            {/* Icon */}
            <div className="relative z-10">
              <div
                className={cn(
                  "inline-flex items-center justify-center w-20 h-20 rounded-full mb-4",
                  result.passed
                    ? "bg-green-500/20 border-2 border-green-500/50"
                    : "bg-red-500/20 border-2 border-red-500/50"
                )}
              >
                {result.passed ? (
                  <Trophy className="w-10 h-10 text-yellow-400" />
                ) : (
                  <X className="w-10 h-10 text-red-400" />
                )}
              </div>

              {/* Score display */}
              <div className="mb-4">
                <div className="text-6xl font-display font-bold neon-text mb-2">
                  {result.totalScore}%
                </div>
                <p className="text-muted-foreground">Dein Ergebnis</p>
              </div>

              {/* Pass/Fail status */}
              <div
                className={cn(
                  "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold",
                  result.passed
                    ? "bg-green-500/20 text-green-400 border border-green-500/50"
                    : "bg-red-500/20 text-red-400 border border-red-500/50"
                )}
              >
                {result.passed ? (
                  <>
                    <Sparkles className="w-4 h-4" />
                    BESTANDEN!
                  </>
                ) : (
                  <>
                    <X className="w-4 h-4" />
                    NICHT BESTANDEN
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="p-6 border-t border-border/50">
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* XP Earned */}
              <div className="text-center p-4 rounded-lg bg-card/50 border border-border/50">
                <div className="text-2xl font-display font-bold text-primary">
                  +{result.xpEarned}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">
                  XP verdient
                </div>
              </div>

              {/* Correct Answers */}
              <div className="text-center p-4 rounded-lg bg-card/50 border border-border/50">
                <div className="text-2xl font-display font-bold">
                  {
                    result.questionResults.filter((r) => r.isCorrect).length
                  }
                  /{result.questionResults.length}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">
                  Richtige Antworten
                </div>
              </div>
            </div>

            {/* Retry info */}
            {!result.passed && result.retryAvailableAt && (
              <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30 mb-6">
                <p className="text-sm text-center text-yellow-200">
                  Du kannst das Quiz in{" "}
                  {Math.ceil(
                    (new Date(result.retryAvailableAt).getTime() - Date.now()) /
                      (1000 * 60 * 60)
                  )}{" "}
                  Stunden wiederholen.
                </p>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex gap-3">
              {!result.passed && (
                <Button
                  variant="outline"
                  onClick={onRetry}
                  className="flex-1"
                  disabled={!!result.retryAvailableAt && new Date(result.retryAvailableAt) > new Date()}
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Wiederholen
                </Button>
              )}
              <Button onClick={onContinue} className="flex-1">
                {result.passed ? (
                  <>
                    Weiter
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                ) : (
                  "Zurück zu den Lektionen"
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Question breakdown */}
        <div className="mt-6 space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Antwortübersicht
          </h3>
          {result.questionResults.map((questionResult, index) => (
            <div
              key={questionResult.questionId}
              className="flex items-center gap-3 p-3 rounded-lg bg-card/30 border border-border/50"
            >
              <div
                className={cn(
                  "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                  questionResult.isCorrect
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                )}
              >
                {questionResult.isCorrect ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <X className="w-4 h-4" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm">Frage {index + 1}</p>
              </div>
              <div className="text-sm font-medium">
                {questionResult.score}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
