'use client';

import { Badge } from '@/components/ui/badge';
import { Github, ExternalLink, ImageOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ProjectFormData } from '@/types/projects';

interface ProjectPreviewCardProps {
  data: Partial<ProjectFormData> & {
    tech_stack?: string[];
    screenshot_file?: File | null;
  };
}

export function ProjectPreviewCard({ data }: ProjectPreviewCardProps) {
  const averageRating = 0;
  const ratingCount = 0;

  return (
    <div className="glass-card rounded-xl overflow-hidden cyberpunk-border">
      {/* Screenshot Preview */}
      <div className="aspect-video bg-card/30 relative overflow-hidden group">
        {data.screenshot_url ? (
          <img
            src={data.screenshot_url}
            alt={data.title || 'Project preview'}
            className="w-full h-full object-cover"
          />
        ) : data.screenshot_file ? (
          <img
            src={URL.createObjectURL(data.screenshot_file)}
            alt={data.title || 'Project preview'}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground bg-gradient-to-br from-primary/10 to-secondary/10">
            <ImageOff className="h-12 w-12 mb-2 opacity-50" />
            <p className="text-sm">No screenshot uploaded</p>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <h3 className="font-display font-bold text-lg text-foreground truncate">
          {data.title || 'Your Project Title'}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-3 min-h-[60px]">
          {data.description || 'Your project description will appear here...'}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5">
          {data.tech_stack && data.tech_stack.length > 0 ? (
            data.tech_stack.slice(0, 6).map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="text-xs border border-border/50"
              >
                {tech}
              </Badge>
            ))
          ) : (
            <Badge
              variant="outline"
              className="text-xs text-muted-foreground border-dashed"
            >
              No technologies selected
            </Badge>
          )}
          {data.tech_stack && data.tech_stack.length > 6 && (
            <Badge variant="outline" className="text-xs">
              +{data.tech_stack.length - 6} more
            </Badge>
          )}
        </div>

        {/* Links */}
        {(data.github_url || data.title) && (
          <div className="flex gap-2 pt-2 border-t border-border/50">
            {data.github_url && (
              <a
                href={data.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
              >
                <Github className="h-3.5 w-3.5" />
                <span>GitHub</span>
              </a>
            )}
          </div>
        )}

        {/* Rating Preview */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={cn(
                  'text-base',
                  star <= Math.round(averageRating)
                    ? 'text-yellow-400'
                    : 'text-muted-foreground/30'
                )}
              >
                {star <= Math.round(averageRating) ? '★' : '☆'}
              </span>
            ))}
          </div>
          <span>
            {ratingCount > 0 ? `${averageRating.toFixed(1)} (${ratingCount})` : 'No ratings yet'}
          </span>
        </div>
      </div>
    </div>
  );
}
