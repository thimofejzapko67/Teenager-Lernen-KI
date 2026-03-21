'use client';

import { FileText, User, FolderOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export interface SearchResult {
  type: 'lesson' | 'user' | 'project';
  id: string;
  title: string;
  description?: string;
  url: string;
  relevance: number;
}

interface SearchResultsProps {
  results: SearchResult[];
  query: string;
}

export function SearchResults({ results, query }: SearchResultsProps) {
  const getResultIcon = (type: string) => {
    switch (type) {
      case 'lesson': return FileText;
      case 'user': return User;
      case 'project': return FolderOpen;
      default: return FileText;
    }
  };

  const getResultTypeColor = (type: string) => {
    switch (type) {
      case 'lesson': return 'text-cyan-400';
      case 'user': return 'text-purple-400';
      case 'project': return 'text-orange-400';
      default: return 'text-muted-foreground';
    }
  };

  const getResultTypeLabel = (type: string) => {
    switch (type) {
      case 'lesson': return 'Lesson';
      case 'user': return 'User';
      case 'project': return 'Project';
      default: return type;
    }
  };

  // Group results by type
  const grouped = results.reduce((acc, result) => {
    if (!acc[result.type]) {
      acc[result.type] = [];
    }
    acc[result.type].push(result);
    return acc;
  }, {} as Record<string, SearchResult[]>);

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
          <FileText className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No results found</h3>
        <p className="text-muted-foreground">
          No results for "{query}". Try different keywords.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Summary */}
      <div className="text-sm text-muted-foreground">
        Found {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
      </div>

      {/* Results by type */}
      {Object.entries(grouped).map(([type, typeResults]) => {
        const Icon = getResultIcon(type);
        return (
          <div key={type}>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 capitalize">
              <Icon className={cn('w-5 h-5', getResultTypeColor(type))} />
              {getResultTypeLabel(type)}s ({typeResults.length})
            </h3>
            <div className="space-y-3">
              {typeResults.map((result) => (
                <Link
                  key={result.id}
                  href={result.url}
                  className="block p-4 rounded-lg bg-muted/30 border border-border hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold hover:text-primary transition-colors">
                        {result.title}
                      </h4>
                      {result.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                          {result.description}
                        </p>
                      )}
                    </div>
                    <span className={cn(
                      'text-xs px-2 py-1 rounded-full capitalize',
                      getResultTypeColor(type),
                      'bg-current/10'
                    )}>
                      {getResultTypeLabel(type)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
