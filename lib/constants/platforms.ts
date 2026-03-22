import type { LessonCategory } from "@/types/database";

export const PLATFORMS: Record<LessonCategory, {
  title: string;
  description: string;
  icon: string;
  color: string;
  lessonsCount: number;
}> = {
  "web-dev": {
    title: "Web Development",
    description: "Lerne Websites und Web-Apps zu bauen mit HTML, CSS, JavaScript und modernen Frameworks",
    icon: "🌐",
    color: "from-blue-500 to-blue-600",
    lessonsCount: 0,
  },
  "app-dev": {
    title: "App Development",
    description: "Entwickle mobile Apps für iOS und Android mit React Native und Flutter",
    icon: "📱",
    color: "from-cyan-500 to-cyan-600",
    lessonsCount: 0,
  },
  "security": {
    title: "Security",
    description: "Verstehe Cybersecurity, lerne Schwachstellen zu finden und Systeme zu schützen",
    icon: "🔐",
    color: "from-red-500 to-red-600",
    lessonsCount: 0,
  },
  "ai-data": {
    title: "AI & Data Science",
    description: "Tauche ein in KI, Machine Learning und Datenanalyse mit Python und modernen Tools",
    icon: "🤖",
    color: "from-purple-500 to-purple-600",
    lessonsCount: 0,
  },
};
