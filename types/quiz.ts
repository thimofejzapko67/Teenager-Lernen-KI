export enum QuizType {
  MULTIPLE_CHOICE = "multiple_choice",
  PROMPT_WRITING = "prompt_writing",
}

export interface MultipleChoiceQuestion {
  type: QuizType.MULTIPLE_CHOICE;
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // Index of correct option
  explanation: string;
}

export interface PromptWritingQuestion {
  type: QuizType.PROMPT_WRITING;
  id: string;
  question: string;
  prompt: string;
  minCharacters: number;
  maxCharacters: number;
  keywords: string[]; // Keywords that should be included for good score
  exampleAnswer?: string;
  explanation: string;
}

export type QuizQuestion = MultipleChoiceQuestion | PromptWritingQuestion;

export interface Quiz {
  id: string;
  lessonId: string;
  title: string;
  description?: string;
  questions: QuizQuestion[];
  passingScore: number; // Percentage (0-100)
  timeLimit?: number; // Seconds
  xpReward: number;
}

export interface MultipleChoiceAnswer {
  questionId: string;
  type: QuizType.MULTIPLE_CHOICE;
  selectedOption: number;
}

export interface PromptWritingAnswer {
  questionId: string;
  type: QuizType.PROMPT_WRITING;
  answer: string;
}

export type QuizAnswer = MultipleChoiceAnswer | PromptWritingAnswer;

export interface QuestionResult {
  questionId: string;
  isCorrect: boolean;
  score: number; // 0-100 for this question
  feedback: string;
}

export interface QuizResult {
  quizId: string;
  lessonId: string;
  userId: string;
  totalScore: number; // Percentage 0-100
  passed: boolean;
  xpEarned: number;
  questionResults: QuestionResult[];
  completedAt: string;
  timeSpent?: number; // Seconds
  retryAvailableAt?: string; // ISO date string
}

export interface QuizSubmission {
  lessonId: string;
  answers: QuizAnswer[];
  timeSpent?: number;
}

export interface QuizAttempt {
  id: string;
  userId: string;
  lessonId: string;
  score: number;
  passed: boolean;
  xpEarned: number;
  completedAt: string;
  retryAvailableAt?: string;
}

export interface QuizAccess {
  canAccess: boolean;
  canRetry: boolean;
  retryAvailableAt?: string;
  attemptsLeft?: number;
  lastAttempt?: QuizAttempt;
}
