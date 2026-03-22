'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X, FileText, User, FolderOpen } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface SearchResult {
  type: 'lesson' | 'user' | 'project';
  id: string;
  title: string;
  description?: string;
  url: string;
  relevance: number;
}

interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

export function SearchBar({ placeholder = 'Search...', className }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close dialog when clicking outside
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setQuery('');
      setResults([]);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
        setTimeout(() => inputRef.current?.focus(), 100);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (query.length < 2) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (response.ok) {
          const data = await response.json();
          setResults(data.results || []);
        }
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [query]);

  const handleResultClick = (result: SearchResult) => {
    setIsOpen(false);
    router.push(result.url);
    setQuery('');
    setResults([]);
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'lesson': return FileText;
      case 'user': return User;
      case 'project': return FolderOpen;
      default: return Search;
    }
  };

  const getResultTypeColor = (type: string) => {
    switch (type) {
      case 'lesson': return 'text-cyan-400';
      case 'user': return 'text-primary';
      case 'project': return 'text-orange-400';
      default: return 'text-muted-foreground';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      handleResultClick(results[selectedIndex]);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <Button
        variant="outline"
        className={cn('relative justify-start text-sm text-muted-foreground', className)}
        onClick={() => setIsOpen(true)}
      >
        <Search className="w-4 h-4 mr-2" />
        {placeholder}
        <kbd className="pointer-events-none absolute right-2 top-2 h-5 select-none rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-60">
          ⌘K
        </kbd>
      </Button>

      {/* Search Dialog */}
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="p-0 max-w-2xl">
          <div className="flex items-center border-b px-3">
            <Search className="w-4 h-4 mr-2 text-muted-foreground shrink-0" />
            <Input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search lessons, users, projects..."
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              autoFocus
            />
            {query && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setQuery('');
                  setResults([]);
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>

          <div className="max-h-[400px] overflow-y-auto">
            {isLoading && (
              <div className="p-8 text-center text-muted-foreground">
                <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
              </div>
            )}

            {!isLoading && query.length < 2 && (
              <div className="p-4">
                <p className="text-sm text-muted-foreground mb-4">Quick Links</p>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => handleResultClick({
                      type: 'lesson',
                      id: 'learn',
                      title: 'Browse Lessons',
                      url: '/learn',
                      relevance: 0,
                    })}
                  >
                    <FileText className="w-4 h-4 mr-2 text-cyan-400" />
                    Browse Lessons
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => handleResultClick({
                      type: 'project',
                      id: 'projects',
                      title: 'Explore Projects',
                      url: '/projects',
                      relevance: 0,
                    })}
                  >
                    <FolderOpen className="w-4 h-4 mr-2 text-orange-400" />
                    Explore Projects
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => handleResultClick({
                      type: 'user',
                      id: 'leaderboard',
                      title: 'Leaderboard',
                      url: '/leaderboard',
                      relevance: 0,
                    })}
                  >
                    <User className="w-4 h-4 mr-2 text-primary" />
                    Leaderboard
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => handleResultClick({
                      type: 'lesson',
                      id: 'sponsors',
                      title: 'Sponsors',
                      url: '/sponsors',
                      relevance: 0,
                    })}
                  >
                    <Building2 className="w-4 h-4 mr-2 text-accent" />
                    Sponsors
                  </Button>
                </div>
              </div>
            )}

            {!isLoading && results.length > 0 && (
              <div className="p-2">
                <p className="text-xs text-muted-foreground px-2 py-1">
                  {results.length} results
                </p>
                {results.map((result, index) => {
                  const Icon = getResultIcon(result.type);
                  return (
                    <button
                      key={result.id}
                      onClick={() => handleResultClick(result)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={cn(
                        'w-full flex items-start gap-3 p-3 rounded-lg text-left transition-colors',
                        'hover:bg-muted/50',
                        selectedIndex === index && 'bg-muted/50'
                      )}
                    >
                      <Icon className={cn('w-5 h-5 mt-0.5 shrink-0', getResultTypeColor(result.type))} />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{result.title}</p>
                        {result.description && (
                          <p className="text-sm text-muted-foreground truncate">
                            {result.description}
                          </p>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground capitalize shrink-0">
                        {result.type}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {!isLoading && query.length >= 2 && results.length === 0 && (
              <div className="p-8 text-center text-muted-foreground">
                <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No results found for "{query}"</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function Building2({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
      <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
      <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
      <path d="M10 6h4" />
      <path d="M10 10h4" />
      <path d="M10 14h4" />
      <path d="M10 18h4" />
    </svg>
  );
}
