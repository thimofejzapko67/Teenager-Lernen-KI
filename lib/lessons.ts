"use server";

import type {
  LessonFilters,
  LessonSort,
  LessonWithProgress,
  LessonsResponse,
} from "@/types/lessons";
import type { Lesson, LessonCategory, Difficulty } from "@/types/database";

export type QuizQuestionType = "multiple-choice" | "prompt";

export interface QuizOption {
  id: string;
  text: string;
  correct: boolean;
  explanation?: string;
}

export interface QuizQuestion {
  id: string;
  type: QuizQuestionType;
  question: string;
  options?: QuizOption[];
  correctAnswer?: string;
  explanation: string;
}

export interface LessonQuiz {
  id: string;
  lessonId: string;
  passThreshold: number;
  questions: QuizQuestion[];
}

const MOCK_LESSONS: Lesson[] = [];

export async function getLessons(
  filters: LessonFilters,
  sort: LessonSort = "newest",
  page: number = 1,
  pageSize: number = 12
): Promise<LessonsResponse> {
  let filteredLessons = [...MOCK_LESSONS];

  if (filters.category && filters.category !== "all") {
    filteredLessons = filteredLessons.filter(
      (lesson) => lesson.category === filters.category
    );
  }

  if (filters.difficulty && filters.difficulty !== "all") {
    filteredLessons = filteredLessons.filter(
      (lesson) => lesson.difficulty === filters.difficulty
    );
  }

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filteredLessons = filteredLessons.filter(
      (lesson) =>
        lesson.title.toLowerCase().includes(searchLower) ||
        lesson.content.toLowerCase().includes(searchLower)
    );
  }

  switch (sort) {
    case "xp":
      filteredLessons.sort((a, b) => b.xp_reward - a.xp_reward);
      break;
    case "duration":
      filteredLessons.sort((a, b) => a.duration - b.duration);
      break;
    case "newest":
      filteredLessons.sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      break;
    case "oldest":
      filteredLessons.sort(
        (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
      break;
  }

  const total = filteredLessons.length;
  const startIndex = (page - 1) * pageSize;
  const paginatedLessons = filteredLessons.slice(
    startIndex,
    startIndex + pageSize
  );

  return {
    lessons: paginatedLessons as LessonWithProgress[],
    total,
    page,
    pageSize,
  };
}

export async function getLessonBySlug(slug: string): Promise<Lesson | null> {
  return MOCK_LESSONS.find((lesson) => lesson.slug === slug) || null;
}

export async function getLessonById(id: string): Promise<Lesson | null> {
  return MOCK_LESSONS.find((lesson) => lesson.id === id) || null;
}

export async function getLessonsByCategory(
  category: LessonCategory
): Promise<Lesson[]> {
  return MOCK_LESSONS.filter((lesson) => lesson.category === category);
}

export async function getLessonByCategoryAndSlug(
  category: LessonCategory,
  slug: string
): Promise<Lesson | null> {
  return (
    MOCK_LESSONS.find(
      (lesson) => lesson.category === category && lesson.slug === slug
    ) || null
  );
}

export async function getLessonQuiz(lessonId: string): Promise<LessonQuiz | null> {
  const lesson = MOCK_LESSONS.find((l) => l.id === lessonId);
  if (!lesson || !lesson.quiz_data) return null;
  return lesson.quiz_data as unknown as LessonQuiz;
}

export async function completeLesson(
  userId: string,
  lessonId: string,
  quizScore?: number
): Promise<{ success: boolean; xpEarned: number }> {
  return { success: true, xpEarned: 0 };
}
