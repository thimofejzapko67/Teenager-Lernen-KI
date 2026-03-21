'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { COMMON_TECH_STACK } from '@/types/projects';

interface TechStackInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
}

export function TechStackInput({
  value,
  onChange,
  placeholder = 'Add technologies...',
  maxTags = 10,
}: TechStackInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter suggestions based on input and already selected tags
  const suggestions = COMMON_TECH_STACK.filter(
    (tag) =>
      tag.name.toLowerCase().includes(inputValue.toLowerCase()) &&
      !value.includes(tag.name)
  ).slice(0, 8);

  const handleAddTag = (tagName: string) => {
    if (value.length >= maxTags) return;
    if (!value.includes(tagName)) {
      onChange([...value, tagName]);
      setInputValue('');
      setShowSuggestions(false);
    }
  };

  const handleRemoveTag = (tagName: string) => {
    onChange(value.filter((tag) => tag !== tagName));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (inputValue.trim() && !value.includes(inputValue.trim())) {
        handleAddTag(inputValue.trim());
      }
    } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      handleRemoveTag(value[value.length - 1]);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div className="flex flex-wrap gap-2 p-3 min-h-[60px] border border-border rounded-md bg-card/50 focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50 transition-all">
        {value.map((tag) => (
          <TechBadge
            key={tag}
            label={tag}
            onRemove={() => handleRemoveTag(tag)}
          />
        ))}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          placeholder={value.length === 0 ? placeholder : ''}
          disabled={value.length >= maxTags}
          className="flex-1 min-w-[120px] bg-transparent outline-none text-sm placeholder:text-muted-foreground disabled:opacity-50"
        />
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-card border border-border rounded-md shadow-lg max-h-[200px] overflow-y-auto">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion.id}
              type="button"
              onClick={() => handleAddTag(suggestion.name)}
              className="w-full px-3 py-2 text-left text-sm hover:bg-accent/50 transition-colors flex items-center justify-between group"
            >
              <span className="text-foreground">{suggestion.name}</span>
              <Plus className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
            </button>
          ))}
        </div>
      )}

      {value.length >= maxTags && (
        <p className="text-xs text-muted-foreground mt-1">
          Maximum {maxTags} technologies allowed
        </p>
      )}
    </div>
  );
}

interface TechBadgeProps {
  label: string;
  onRemove: () => void;
}

function TechBadge({ label, onRemove }: TechBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-primary/20 text-primary text-sm border border-primary/30 group hover:bg-primary/30 transition-colors">
      <span>{label}</span>
      <button
        type="button"
        onClick={onRemove}
        className="hover:text-destructive transition-colors"
        aria-label={`Remove ${label}`}
      >
        <X className="h-3 w-3" />
      </button>
    </span>
  );
}
