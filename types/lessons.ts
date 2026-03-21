import type { Lesson, LessonCategory, Difficulty } from "./database";

export interface LessonFilters {
  category?: LessonCategory | "all";
  difficulty?: Difficulty | "all";
  search?: string;
}

export type LessonSort = "xp" | "duration" | "newest" | "oldest";

export interface LessonWithProgress extends Lesson {
  completed?: boolean;
  quiz_score?: number | null;
}

export interface LessonsResponse {
  lessons: LessonWithProgress[];
  total: number;
  page: number;
  pageSize: number;
}

export const CATEGORY_LABELS: Record<LessonCategory | "all", string> = {
  "all": "Alle Kategorien",
  "ki-basics": "KI-Basics",
  "web-dev": "Web-Entwicklung",
  "mobile-dev": "App-Entwicklung",
  "ai-agents": "KI-Agenten",
  "agi-safety": "AGI-Sicherheit",
  "security": "Sicherheit",
};

export const DIFFICULTY_LABELS: Record<Difficulty | "all", string> = {
  "all": "Alle Schwierigkeiten",
  "beginner": "Anfänger",
  "intermediate": "Fortgeschritten",
  "advanced": "Experte",
};

export const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  "beginner": "bg-green-500/20 text-green-400 border-green-500/50",
  "intermediate": "bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
  "advanced": "bg-red-500/20 text-red-400 border-red-500/50",
};

export const CATEGORY_COLORS: Record<LessonCategory, string> = {
  "ki-basics": "bg-purple-500/20 text-purple-400 border-purple-500/50",
  "web-dev": "bg-blue-500/20 text-blue-400 border-blue-500/50",
  "mobile-dev": "bg-cyan-500/20 text-cyan-400 border-cyan-500/50",
  "ai-agents": "bg-pink-500/20 text-pink-400 border-pink-500/50",
  "agi-safety": "bg-orange-500/20 text-orange-400 border-orange-500/50",
  "security": "bg-red-500/20 text-red-400 border-red-500/50",
};

export const SORT_LABELS: Record<LessonSort, string> = {
  "xp": "XP (Höchste zuerst)",
  "duration": "Dauer (Kürzeste zuerst)",
  "newest": "Neueste",
  "oldest": "Älteste",
};
