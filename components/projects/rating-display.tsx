'use client';

import { Star, StarHalf } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingDisplayProps {
  average: number;
  count: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
  variant?: 'default' | 'compact';
}

export function RatingDisplay({
  average,
  count,
  size = 'md',
  showCount = true,
  variant = 'default',
}: RatingDisplayProps) {
  const sizeClasses = {
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  // Calculate full and half stars
  const fullStars = Math.floor(average);
  const hasHalfStar = average % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const renderStars = () => {
    const stars = [];

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          className={cn(
            sizeClasses[size],
            'fill-yellow-400 text-yellow-400',
            'drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]'
          )}
        />
      );
    }

    // Half star
    if (hasHalfStar) {
      stars.push(
        <StarHalf
          key="half"
          className={cn(
            sizeClasses[size],
            'fill-yellow-400 text-yellow-400',
            'drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]'
          )}
        />
      );
    }

    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star
          key={`empty-${i}`}
          className={cn(
            sizeClasses[size],
            'fill-transparent text-muted-foreground/30'
          )}
        />
      );
    }

    return stars;
  };

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-1.5">
        <div className="flex items-center">{renderStars()}</div>
        {showCount && count > 0 && (
          <span
            className={cn(
              'font-medium text-muted-foreground',
              textSizeClasses[size]
            )}
          >
            {average.toFixed(1)}
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex items-center gap-2',
        'px-3 py-1.5 rounded-lg',
        'bg-gradient-to-r from-yellow-500/10 to-orange-500/10',
        'border border-yellow-500/20',
        'hover:border-yellow-500/30 transition-colors'
      )}
    >
      <div className="flex items-center gap-0.5">
        {renderStars()}
      </div>

      <div className={cn('flex items-center gap-1', textSizeClasses[size])}>
        <span className="font-bold text-yellow-400">
          {average > 0 ? average.toFixed(1) : '-'}
        </span>

        {showCount && (
          <>
            <span className="text-muted-foreground/60">·</span>
            <span className="text-muted-foreground">
              {count} {count === 1 ? 'Bewertung' : 'Bewertungen'}
            </span>
          </>
        )}
      </div>
    </div>
  );
}

/**
 * Minimal rating display for cards and lists
 */
export function RatingMini({
  average,
  count,
  size = 'sm',
}: {
  average: number;
  count: number;
  size?: 'sm' | 'md';
}) {
  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-3.5 w-3.5',
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
  };

  const fullStars = Math.floor(average);
  const hasHalfStar = average % 1 >= 0.5;

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((i) => {
          const isFilled = i < fullStars || (i === fullStars && !hasHalfStar);
          const isHalf = i === fullStars && hasHalfStar;

          return (
            <Star
              key={i}
              className={cn(
                sizeClasses[size],
                isFilled
                  ? 'fill-yellow-400 text-yellow-400'
                  : isHalf
                  ? 'fill-yellow-400/50 text-yellow-400'
                  : 'fill-transparent text-muted-foreground/30'
              )}
            />
          );
        })}
      </div>
      <span className={cn('font-medium text-muted-foreground', textSizeClasses[size])}>
        {average > 0 ? average.toFixed(1) : '-'}
      </span>
      {count > 0 && (
        <span className={cn('text-muted-foreground/60', textSizeClasses[size])}>
          ({count})
        </span>
      )}
    </div>
  );
}
