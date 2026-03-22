"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useTransition } from "react";
import { Search, Filter, X } from "lucide-react";
import type { LessonFilters, LessonSort } from "@/types/lessons";
import {
  CATEGORY_LABELS,
  DIFFICULTY_LABELS,
  SORT_LABELS,
} from "@/types/lessons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { LessonCategory, Difficulty } from "@/types/database";

interface LessonFiltersClientProps {
  initialFilters: LessonFilters;
  initialSort: LessonSort;
  totalCount: number;
}

export function LessonFiltersClient({
  initialFilters,
  initialSort,
  totalCount,
}: LessonFiltersClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const categoryFilter = (searchParams.get("category") as LessonCategory | null) || undefined;
  const difficultyFilter = (searchParams.get("difficulty") as Difficulty | null) || undefined;
  const searchFilter = searchParams.get("search") || undefined;
  const sortParam = (searchParams.get("sort") as LessonSort | null) || initialSort;

  const filters: LessonFilters = {
    category: categoryFilter || initialFilters.category || "all",
    difficulty: difficultyFilter || initialFilters.difficulty || "all",
    search: searchFilter || initialFilters.search,
  };

  const sort = sortParam;

  const [searchInput, setSearchInput] = useState(filters.search || "");

  useEffect(() => {
    setSearchInput(filters.search || "");
  }, [filters.search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== filters.search) {
        updateFilters({ ...filters, search: searchInput || undefined });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const updateFilters = (newFilters: LessonFilters) => {
    const params = new URLSearchParams();

    if (newFilters.category && newFilters.category !== "all") {
      params.set("category", newFilters.category);
    }
    if (newFilters.difficulty && newFilters.difficulty !== "all") {
      params.set("difficulty", newFilters.difficulty);
    }
    if (newFilters.search) {
      params.set("search", newFilters.search);
    }
    if (sort !== "newest") {
      params.set("sort", sort);
    }

    const queryString = params.toString();
    router.push(queryString ? `/learn?${queryString}` : "/learn");
  };

  const updateSort = (newSort: LessonSort) => {
    const params = new URLSearchParams();

    if (filters.category && filters.category !== "all") {
      params.set("category", filters.category);
    }
    if (filters.difficulty && filters.difficulty !== "all") {
      params.set("difficulty", filters.difficulty);
    }
    if (filters.search) {
      params.set("search", filters.search);
    }
    if (newSort !== "newest") {
      params.set("sort", newSort);
    }

    const queryString = params.toString();
    router.push(queryString ? `/learn?${queryString}` : "/learn");
  };

  const resetFilters = () => {
    setSearchInput("");
    router.push("/learn");
  };

  const categories = Object.entries(CATEGORY_LABELS) as [
    LessonCategory | "all",
    string
  ][];
  const difficulties = Object.entries(DIFFICULTY_LABELS) as [
    Difficulty | "all",
    string
  ][];
  const sorts = Object.entries(SORT_LABELS) as [LessonSort, string][];

  const hasActiveFilters =
    filters.category !== "all" ||
    filters.difficulty !== "all" ||
    !!filters.search;

  return (
    <div className="space-y-4 mb-8">
      {/* Search + Filters in glass card */}
      <div className="glass-card rounded-2xl p-5 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Lektionen durchsuchen..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="pl-9 bg-background/50 border-border/50 rounded-xl"
          />
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Select
            value={filters.category || "all"}
            onValueChange={(value) =>
              updateFilters({
                ...filters,
                category: value as LessonCategory | "all",
              })
            }
          >
            <SelectTrigger className="bg-background/50 border-border/50 rounded-xl">
              <SelectValue placeholder="Kategorie" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.difficulty || "all"}
            onValueChange={(value) =>
              updateFilters({
                ...filters,
                difficulty: value as Difficulty | "all",
              })
            }
          >
            <SelectTrigger className="bg-background/50 border-border/50 rounded-xl">
              <SelectValue placeholder="Schwierigkeit" />
            </SelectTrigger>
            <SelectContent>
              {difficulties.map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sort} onValueChange={updateSort}>
            <SelectTrigger className="bg-background/50 border-border/50 rounded-xl">
              <SelectValue placeholder="Sortierung" />
            </SelectTrigger>
            <SelectContent>
              {sorts.map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results count & reset */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          {totalCount} {totalCount === 1 ? "Lektion" : "Lektionen"} gefunden
        </span>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="text-muted-foreground hover:text-foreground rounded-xl gap-2"
          >
            <X className="h-3 w-3" />
            Filter zurücksetzen
          </Button>
        )}
      </div>
    </div>
  );
}
