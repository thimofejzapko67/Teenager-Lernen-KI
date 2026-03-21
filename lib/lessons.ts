"use server";

import type {
  LessonFilters,
  LessonSort,
  LessonWithProgress,
  LessonsResponse,
} from "@/types/lessons";
import type { Lesson, LessonCategory, Difficulty } from "@/types/database";

// Mock lessons data - replace with Supabase queries later
const MOCK_LESSONS: Lesson[] = [
  {
    id: "1",
    title: "Einführung in KI und Machine Learning",
    slug: "einfuehrung-ki-ml",
    category: "ki-basics",
    difficulty: "beginner",
    content: "Grundlagen der KI...",
    xp_reward: 50,
    duration: 15,
    order_index: 1,
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    title: "Dein erster Chatbot mit Python",
    slug: "erster-chatbot-python",
    category: "ki-basics",
    difficulty: "beginner",
    content: "Baue einen Chatbot...",
    xp_reward: 50,
    duration: 20,
    order_index: 2,
    created_at: "2024-01-02T00:00:00Z",
  },
  {
    id: "3",
    title: "Neuronale Netze visualisiert",
    slug: "neuronale-netze-visualisiert",
    category: "ki-basics",
    difficulty: "intermediate",
    content: "Verstehe neuronale Netze...",
    xp_reward: 100,
    duration: 30,
    order_index: 3,
    created_at: "2024-01-03T00:00:00Z",
  },
  {
    id: "4",
    title: "Next.js für Anfänger",
    slug: "nextjs-anfaenger",
    category: "web-dev",
    difficulty: "beginner",
    content: "Lerne Next.js...",
    xp_reward: 50,
    duration: 25,
    order_index: 1,
    created_at: "2024-01-04T00:00:00Z",
  },
  {
    id: "5",
    title: "TypeScript Masterclass",
    slug: "typescript-masterclass",
    category: "web-dev",
    difficulty: "intermediate",
    content: "TypeScript vertieft...",
    xp_reward: 100,
    duration: 35,
    order_index: 2,
    created_at: "2024-01-05T00:00:00Z",
  },
  {
    id: "6",
    title: "React Server Components",
    slug: "react-server-components",
    category: "web-dev",
    difficulty: "advanced",
    content: "Server Components...",
    xp_reward: 200,
    duration: 45,
    order_index: 3,
    created_at: "2024-01-06T00:00:00Z",
  },
  {
    id: "7",
    title: "Deine erste React Native App",
    slug: "erste-react-native-app",
    category: "mobile-dev",
    difficulty: "beginner",
    content: "Mobile Apps bauen...",
    xp_reward: 50,
    duration: 30,
    order_index: 1,
    created_at: "2024-01-07T00:00:00Z",
  },
  {
    id: "8",
    title: "Expo Workshop",
    slug: "expo-workshop",
    category: "mobile-dev",
    difficulty: "intermediate",
    content: "Expo framework...",
    xp_reward: 100,
    duration: 40,
    order_index: 2,
    created_at: "2024-01-08T00:00:00Z",
  },
  {
    id: "9",
    title: "KI-Agenten mit LangChain",
    slug: "ki-agenten-langchain",
    category: "ai-agents",
    difficulty: "intermediate",
    content: "Agenten bauen...",
    xp_reward: 100,
    duration: 35,
    order_index: 1,
    created_at: "2024-01-09T00:00:00Z",
  },
  {
    id: "10",
    title: "AutoGPT Tutorial",
    slug: "autogpt-tutorial",
    category: "ai-agents",
    difficulty: "advanced",
    content: "Autonome Agenten...",
    xp_reward: 200,
    duration: 50,
    order_index: 2,
    created_at: "2024-01-10T00:00:00Z",
  },
  {
    id: "11",
    title: "Alignment Problem erklärt",
    slug: "alignment-problem",
    category: "agi-safety",
    difficulty: "beginner",
    content: "Warum Alignment wichtig ist...",
    xp_reward: 50,
    duration: 20,
    order_index: 1,
    created_at: "2024-01-11T00:00:00Z",
  },
  {
    id: "12",
    title: "AI Safety Grundlagen",
    slug: "ai-safety-grundlagen",
    category: "agi-safety",
    difficulty: "intermediate",
    content: "Safety Engineering...",
    xp_reward: 100,
    duration: 30,
    order_index: 2,
    created_at: "2024-01-12T00:00:00Z",
  },
  {
    id: "13",
    title: "Prompt Injection Basics",
    slug: "prompt-injection-basics",
    category: "security",
    difficulty: "beginner",
    content: "Prompt Injection verstehen...",
    xp_reward: 50,
    duration: 15,
    order_index: 1,
    created_at: "2024-01-13T00:00:00Z",
  },
  {
    id: "14",
    title: "Adversarial Attacks",
    slug: "adversarial-attacks",
    category: "security",
    difficulty: "advanced",
    content: "Angriffe auf KI-Systeme...",
    xp_reward: 200,
    duration: 40,
    order_index: 2,
    created_at: "2024-01-14T00:00:00Z",
  },
];

// Mock user progress - replace with Supabase queries later
const MOCK_USER_PROGRESS: Record<string, { completed: boolean; score?: number }> = {
  "1": { completed: true, score: 100 },
  "2": { completed: true, score: 90 },
  "4": { completed: false },
};

function filterLessons(lessons: Lesson[], filters: LessonFilters): Lesson[] {
  let filtered = [...lessons];

  if (filters.category && filters.category !== "all") {
    filtered = filtered.filter((l) => l.category === filters.category);
  }

  if (filters.difficulty && filters.difficulty !== "all") {
    filtered = filtered.filter((l) => l.difficulty === filters.difficulty);
  }

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(
      (l) =>
        l.title.toLowerCase().includes(searchLower) ||
        l.category.toLowerCase().includes(searchLower)
    );
  }

  return filtered;
}

function sortLessons(lessons: Lesson[], sort: LessonSort): Lesson[] {
  const sorted = [...lessons];

  switch (sort) {
    case "xp":
      return sorted.sort((a, b) => b.xp_reward - a.xp_reward);
    case "duration":
      return sorted.sort((a, b) => a.duration - b.duration);
    case "newest":
      return sorted.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    case "oldest":
      return sorted.sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    default:
      return sorted;
  }
}

export async function getLessons(
  filters: LessonFilters = {},
  sort: LessonSort = "newest",
  page = 1,
  pageSize = 12
): Promise<LessonsResponse> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  let filtered = filterLessons(MOCK_LESSONS, filters);
  filtered = sortLessons(filtered, sort);

  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const paginatedLessons = filtered.slice(start, start + pageSize);

  // Add progress information
  const lessonsWithProgress: LessonWithProgress[] = paginatedLessons.map(
    (lesson) => {
      const progress = MOCK_USER_PROGRESS[lesson.id];
      return {
        ...lesson,
        completed: progress?.completed ?? false,
        quiz_score: progress?.score ?? null,
      };
    }
  );

  return {
    lessons: lessonsWithProgress,
    total,
    page,
    pageSize,
  };
}

export async function getLessonBySlug(
  slug: string
): Promise<LessonWithProgress | null> {
  await new Promise((resolve) => setTimeout(resolve, 100));

  const lesson = MOCK_LESSONS.find((l) => l.slug === slug);
  if (!lesson) return null;

  const progress = MOCK_USER_PROGRESS[lesson.id];
  return {
    ...lesson,
    completed: progress?.completed ?? false,
    quiz_score: progress?.score ?? null,
  };
}

export async function getUserProgress(userId: string) {
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Mock implementation - replace with Supabase
  const completedLessons = Object.entries(MOCK_USER_PROGRESS)
    .filter(([_, progress]) => progress.completed)
    .map(([lessonId]) => lessonId);

  return {
    completedLessons,
    totalXP: completedLessons.length * 75, // Mock calculation
  };
}

export async function getCategories(): Promise<
  { value: LessonCategory | "all"; label: string; count: number }[]
> {
  await new Promise((resolve) => setTimeout(resolve, 50));

  const categories: LessonCategory[] = [
    "ki-basics",
    "web-dev",
    "mobile-dev",
    "ai-agents",
    "agi-safety",
    "security",
  ];

  return [
    { value: "all", label: "Alle Kategorien", count: MOCK_LESSONS.length },
    ...categories.map((cat) => ({
      value: cat,
      label:
        cat === "ki-basics"
          ? "KI-Basics"
          : cat === "web-dev"
          ? "Web-Entwicklung"
          : cat === "mobile-dev"
          ? "App-Entwicklung"
          : cat === "ai-agents"
          ? "KI-Agenten"
          : cat === "agi-safety"
          ? "AGI-Sicherheit"
          : "Sicherheit",
      count: MOCK_LESSONS.filter((l) => l.category === cat).length,
    })),
  ];
}
