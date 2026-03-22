export interface QuestTask {
  id: string;
  type: "quiz" | "code" | "multiple-choice";
  question: string;
  options?: string[];
  correctAnswer?: string | number;
  codeTemplate?: string;
  hint?: string;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  explanation: string;
  xpReward: number;
  order: number;
  tasks: QuestTask[];
  locked?: boolean;
}

export interface Subtopic {
  id: string;
  title: string;
  description: string;
  explanation: string;
  icon: string;
  xpTotal: number;
  quests: Quest[];
}

export type SubtopicId = "frontend" | "backend" | "databases" | "deploy" | "ios" | "android" | "cross-platform" | "publishing" | "authentication" | "data-protection" | "vulnerabilities" | "best-practices" | "cursor" | "windsurf" | "bolt" | "v0";
