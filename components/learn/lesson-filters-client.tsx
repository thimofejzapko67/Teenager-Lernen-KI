"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useTransition } from "react";
import { Search, Globe, Smartphone, Shield, Brain } from "lucide-react";
import type { LessonFilters, LessonSort } from "@/types/lessons";
import { SORT_LABELS } from "@/types/lessons";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { LessonCategory } from "@/types/database";
import { cn } from "@/lib/utils";

interface LessonFiltersClientProps {
  initialFilters: LessonFilters;
  initialSort: LessonSort;
  totalCount: number;
}

const MAIN_CATEGORIES = [
  { value: "all" as const, label: "Alle", icon: null },
  { value: "web-dev" as LessonCategory, label: "Web Development", icon: Globe },
  { value: "app-dev" as LessonCategory, label: "App Development", icon: Smartphone },
  { value: "security" as LessonCategory, label: "Security", icon: Shield },
  { value: "ai-data" as LessonCategory, label: "AI & Data", icon: Brain },
] as const;

export function LessonFiltersClient({
  initialFilters,
  initialSort,
  totalCount,
}: LessonFiltersClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const categoryFilter = (searchParams.get("category") as LessonCategory | null) || "all";
  const searchFilter = searchParams.get("search") || "";
  const sortParam = (searchParams.get("sort") as LessonSort | null) || initialSort;

  const [searchInput, setSearchInput] = useState(searchFilter);

  useEffect(() => {
    setSearchInput(searchFilter);
  }, [searchFilter]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== searchFilter) {
        pushParams({ category: categoryFilter, search: searchInput || undefined, sort: sortParam });
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const pushParams = (opts: { category: string; search?: string; sort: string }) => {
    const params = new URLSearchParams();
    if (opts.category && opts.category !== "all") params.set("category", opts.category);
    if (opts.search) params.set("search", opts.search);
    if (opts.sort !== "newest") params.set("sort", opts.sort);
    const qs = params.toString();
    startTransition(() => {
      router.push(qs ? `/learn?${qs}` : "/learn");
    });
  };

  const setCategory = (value: string) => {
    pushParams({ category: value, search: searchInput || undefined, sort: sortParam });
  };

  const setSort = (value: LessonSort) => {
    pushParams({ category: categoryFilter, search: searchInput || undefined, sort: value });
  };

  return (
    <div className="space-y-4 mb-8">
      {/* Category Tab Bar */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {MAIN_CATEGORIES.map(({ value, label, icon: Icon }) => {
          const isActive = categoryFilter === value;
          return (
            <button
              key={value}
              onClick={() => setCategory(value)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 border",
                isActive
                  ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                  : "bg-background/50 text-muted-foreground border-border/50 hover:border-primary/40 hover:text-foreground"
              )}
            >
              {Icon && <Icon className="h-4 w-4" />}
              {label}
            </button>
          );
        })}
      </div>

      {/* Search + Sort */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Lektionen durchsuchen..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="pl-9 bg-background/50 border-border/50 rounded-xl"
          />
        </div>
        <Select value={sortParam} onValueChange={setSort}>
          <SelectTrigger className="w-48 bg-background/50 border-border/50 rounded-xl shrink-0">
            <SelectValue placeholder="Sortierung" />
          </SelectTrigger>
          <SelectContent>
            {(Object.entries(SORT_LABELS) as [LessonSort, string][]).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground">
        {totalCount} {totalCount === 1 ? "Lektion" : "Lektionen"} gefunden
      </p>
    </div>
  );
}
