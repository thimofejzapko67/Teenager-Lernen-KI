"use client";

import { LessonFiltersClient } from "./lesson-filters-client";
import type { LessonFilters, LessonSort } from "@/types/lessons";

interface LessonFiltersProps {
  filters: LessonFilters;
  sort: LessonSort;
  totalCount: number;
}

export function LessonFilters({
  filters,
  sort,
  totalCount,
}: LessonFiltersProps) {
  return <LessonFiltersClient initialFilters={filters} initialSort={sort} totalCount={totalCount} />;
}
