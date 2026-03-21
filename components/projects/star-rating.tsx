'use client';

import { useState, useTransition } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { rateProject } from '@/lib/ratings';

interface StarRatingProps {
  projectId: string;
  currentRating?: number;
  onRated?: (newRating: number) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  readonly?: boolean;
}

export function StarRating({
  projectId,
  currentRating = 0,
  onRated,
  disabled = false,
  size = 'md',
  readonly = false,
}: StarRatingProps) {
  const [hoverValue, setHoverValue] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [ratedValue, setRatedValue] = useState(currentRating);
  const [showSuccess, setShowSuccess] = useState(false);

  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  const containerSizeClasses = {
    sm: 'gap-0.5',
    md: 'gap-1',
    lg: 'gap-1.5',
  };

  const displayValue = hoverValue || ratedValue;

  const handleRating = (value: number) => {
    if (disabled || readonly || isPending) return;

    startTransition(async () => {
      const result = await rateProject(projectId, value);

      if (result.success && result.data) {
        setRatedValue(result.data.userRating || value);
        setShowSuccess(true);

        // Trigger success animation
        setTimeout(() => setShowSuccess(false), 1500);

        onRated?.(result.data.userRating || value);
      }
    });
  };

  const handleMouseEnter = (value: number) => {
    if (!readonly && !disabled && !isPending) {
      setHoverValue(value);
    }
  };

  const handleMouseLeave = () => {
    setHoverValue(0);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={cn(
          'flex items-center',
          containerSizeClasses[size],
          (readonly || disabled) && 'pointer-events-none opacity-70'
        )}
        onMouseLeave={handleMouseLeave}
      >
        {[1, 2, 3, 4, 5].map((value) => {
          const isFilled = value <= displayValue;
          const isHovered = value <= hoverValue;

          return (
            <button
              key={value}
              type="button"
              disabled={disabled || readonly || isPending}
              onClick={() => handleRating(value)}
              onMouseEnter={() => handleMouseEnter(value)}
              className={cn(
                'relative transition-transform duration-150',
                'hover:scale-110 active:scale-95',
                'disabled:hover:scale-100',
                'focus:outline-none focus:ring-2 focus:ring-primary/50 rounded',
                sizeClasses[size]
              )}
              aria-label={`Rate ${value} stars`}
            >
              <Star
                className={cn(
                  'transition-all duration-200',
                  isFilled
                    ? cn(
                        'fill-yellow-400 text-yellow-400',
                        isHovered && !readonly && 'fill-yellow-300 text-yellow-300',
                        showSuccess && ratedValue > 0 && 'animate-pulse'
                      )
                    : cn(
                        'fill-transparent text-muted-foreground/40',
                        isHovered && !readonly && 'fill-yellow-200/50 text-yellow-200/50'
                      )
                )}
              />
            </button>
          );
        })}
      </div>

      {/* Rating value display */}
      {ratedValue > 0 && (
        <span
          className={cn(
            'text-xs font-medium transition-all duration-300',
            showSuccess
              ? 'text-green-400 scale-110'
              : 'text-muted-foreground'
          )}
        >
          {showSuccess ? (
            <>Gespeichert!</>
          ) : (
            <>
              {ratedValue} von 5 Stern{ratedValue !== 1 ? 'en' : ''}
            </>
          )}
        </span>
      )}

      {/* Hover value display */}
      {!readonly && hoverValue > 0 && ratedValue === 0 && (
        <span className="text-xs text-muted-foreground">
          {hoverValue} {hoverValue === 1 ? 'Stern' : 'Sterne'}
        </span>
      )}

      {/* Readonly label */}
      {readonly && ratedValue > 0 && (
        <span className="text-xs text-muted-foreground">
          {ratedValue}.0
        </span>
      )}
    </div>
  );
}
