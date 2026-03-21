"use server";

import type {
  Quiz,
  QuizAnswer,
  QuizResult,
  QuestionResult,
  QuizAccess,
  QuizAttempt,
  MultipleChoiceAnswer,
  PromptWritingAnswer,
  QuizType,
} from "@/types/quiz";
import { QuizType as QuizTypeEnum } from "@/types/quiz";

// Mock quiz data - replace with Supabase queries later
const MOCK_QUIZZES: Record<string, Quiz> = {
  "1": {
    id: "quiz-1",
    lessonId: "1",
    title: "KI-Basics Quiz",
    description: "Teste dein Wissen über KI und Machine Learning",
    questions: [
      {
        type: QuizTypeEnum.MULTIPLE_CHOICE,
        id: "q1",
        question: "Was ist der Hauptunterschied zwischen KI und Machine Learning?",
        options: [
          "Es gibt keinen Unterschied",
          "Machine Learning ist eine Teilmenge der KI",
          "KI ist eine Teilmenge des Machine Learning",
          "Machine Learning ist nur für Robots",
        ],
        correctAnswer: 1,
        explanation:
          "Machine Learning ist eine Teilmenge der Künstlichen Intelligenz. KI ist das übergeordnete Konzept.",
      },
      {
        type: QuizTypeEnum.MULTIPLE_CHOICE,
        id: "q2",
        question: "Was ist ein neuronales Netz?",
        options: [
          "Ein Netzwerk von Computern",
          "Ein biologically inspired computing system",
          "Eine Art Internet",
          "Ein Grafikdesign-Tool",
        ],
        correctAnswer: 1,
        explanation:
          "Neuronale Netze sind von biologischen neuronalen Netzwerken inspiriert und bestehen aus verbundenen Knoten (Neuronen).",
      },
      {
        type: QuizTypeEnum.MULTIPLE_CHOICE,
        id: "q3",
        question: "Was macht Supervised Learning aus?",
        options: [
          "Der Computer lernt ohne Daten",
          "Der Computer lernt mit gelabelten Trainingsdaten",
          "Der Computer lernt von anderen Computern",
          "Der Computer braucht keinen Menschen",
        ],
        correctAnswer: 1,
        explanation:
          "Supervised Learning verwendet gelabelte Trainingsdaten, bei denen die korrekten Antworten bekannt sind.",
      },
      {
        type: QuizTypeEnum.PROMPT_WRITING,
        id: "q4",
        question:
          "Schreibe einen Prompt für eine KI, der sie bittet, einen einfachen Chatbot zu entwerfen.",
        prompt:
          "Stell dir vor, du möchtest einen Chatbot erstellen, der Fragen zu einem Museum beantwortet. Schreibe einen Prompt, der die KI anweist, dies zu tun.",
        minCharacters: 50,
        maxCharacters: 500,
        keywords: [
          "chatbot",
          "museum",
          "fragen",
          "antworten",
          "benutzer",
          "ki",
          "entwickeln",
        ],
        exampleAnswer:
          "Du bist ein erfahrener KI-Entwickler. Entwirf einen Chatbot für ein Museum, der Besucherfragen zu Kunstwerken, Öffnungszeiten und Ausstellungen beantworten kann. Der Chatbot sollte freundlich und hilfsbereit sein.",
        explanation:
          "Ein guter Prompt sollte klar das Ziel definieren, den Kontext beschreiben und die gewünschte Ausgabe spezifizieren.",
      },
    ],
    passingScore: 70,
    xpReward: 50,
  },
  "2": {
    id: "quiz-2",
    lessonId: "2",
    title: "Chatbot Entwicklung Quiz",
    description: "Teste dein Wissen über Chatbot-Entwicklung mit Python",
    questions: [
      {
        type: QuizTypeEnum.MULTIPLE_CHOICE,
        id: "q5",
        question: "Welche Bibliothek wird häufig für KI-Chatbots verwendet?",
        options: ["Pandas", "NumPy", "OpenAI API / LangChain", "Matplotlib"],
        correctAnswer: 2,
        explanation:
          "OpenAI API und LangChain sind die gängigsten Bibliotheken für KI-Chatbots.",
      },
      {
        type: QuizTypeEnum.MULTIPLE_CHOICE,
        id: "q6",
        question: "Was ist ein System Prompt?",
        options: [
          "Ein Prompt für das Betriebssystem",
          "Anweisungen, die das Verhalten der KI definieren",
          "Ein Passwort für das System",
          "Ein Chatbot-Framework",
        ],
        correctAnswer: 1,
        explanation:
          "Ein System Prompt definiert das Verhalten, die Rolle und die Einschränkungen einer KI.",
      },
      {
        type: QuizTypeEnum.PROMPT_WRITING,
        id: "q7",
        question:
          "Schreibe einen System Prompt für einen Chatbot, der Teenagern bei Programmierfragen hilft.",
        prompt:
          "Erstelle einen System Prompt für einen Coding-Tutor-Chatbot, der Teenagern (13-19 Jahre) hilft, Programmieren zu lernen.",
        minCharacters: 100,
        maxCharacters: 500,
        keywords: [
          "tutor",
          "programmieren",
          "teenager",
          "helfen",
          "lernen",
          " freundlich",
          "erklären",
        ],
        exampleAnswer:
          "Du bist ein freundlicher Coding-Tutor für Teenager (13-19 Jahre). Deine Aufgabe ist es, Programmierkonzepte einfach und verständlich zu erklären. Verwende Beispiele aus Videospielen und Social Media. Sei geduldig und ermutigend. Wenn etwas nicht gleich verstanden wird, erkläre es auf eine andere Art.",
        explanation:
          "Ein guter System Prompt definiert die Rolle, das Zielpublikum und den Kommunikationsstil.",
      },
    ],
    passingScore: 70,
    xpReward: 50,
  },
};

// Mock quiz attempts
const MOCK_ATTEMPTS: Record<string, QuizAttempt[]> = {
  "user-1": [],
};

// Helper function to grade multiple choice question
function gradeMultipleChoice(
  question: any,
  answer: MultipleChoiceAnswer
): QuestionResult {
  const isCorrect = answer.selectedOption === question.correctAnswer;

  return {
    questionId: question.id,
    isCorrect,
    score: isCorrect ? 100 : 0,
    feedback: isCorrect
      ? `Richtig! ${question.explanation}`
      : `Falsch. Die richtige Antwort ist: ${question.options[question.correctAnswer]}. ${question.explanation}`,
  };
}

// Helper function to grade prompt writing question
function gradePromptWriting(
  question: any,
  answer: PromptWritingAnswer
): QuestionResult {
  const answerText = answer.answer.toLowerCase();

  // Check character count
  const hasValidLength =
    answerText.length >= question.minCharacters &&
    answerText.length <= question.maxCharacters;

  // Check keyword matches
  const matchedKeywords = question.keywords.filter((keyword: string) =>
    answerText.includes(keyword.toLowerCase())
  );
  const keywordScore = (matchedKeywords.length / question.keywords.length) * 70;

  // Length score (30% of total)
  const lengthScore = hasValidLength ? 30 : 10;

  const totalScore = Math.round(keywordScore + lengthScore);
  const isCorrect = totalScore >= 70;

  return {
    questionId: question.id,
    isCorrect,
    score: totalScore,
    feedback: isCorrect
      ? `Gut gemacht! Du hast ${matchedKeywords.length} von ${question.keywords.length} relevanten Keywords erkannt. ${question.explanation}`
      : `Du könntest noch verbessern. Versuche mehr relevante Keywords einzubauen. Gefundene Keywords: ${matchedKeywords.join(", ")}. ${question.explanation}`,
  };
}

/**
 * Get quiz by lesson ID
 */
export async function getQuiz(lessonId: string): Promise<Quiz | null> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  const quiz = Object.values(MOCK_QUIZZES).find((q) => q.lessonId === lessonId);
  return quiz || null;
}

/**
 * Check if user can access/attempt the quiz
 */
export async function checkQuizAccess(
  userId: string,
  lessonId: string
): Promise<QuizAccess> {
  await new Promise((resolve) => setTimeout(resolve, 50));

  const attempts = MOCK_ATTEMPTS[userId] || [];
  const lessonAttempts = attempts.filter((a) => a.lessonId === lessonId);
  const lastAttempt = lessonAttempts.sort(
    (a, b) =>
      new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
  )[0];

  // If user passed, they can retake anytime but won't get XP
  if (lastAttempt?.passed) {
    return {
      canAccess: true,
      canRetry: true,
      lastAttempt,
    };
  }

  // If failed, check if 24h have passed
  if (lastAttempt && !lastAttempt.passed) {
    const retryAvailableAt = lastAttempt.retryAvailableAt;
    if (retryAvailableAt && new Date(retryAvailableAt) > new Date()) {
      return {
        canAccess: false,
        canRetry: false,
        retryAvailableAt,
        lastAttempt,
      };
    }
    return {
      canAccess: true,
      canRetry: true,
      lastAttempt,
    };
  }

  // No previous attempt
  return {
    canAccess: true,
    canRetry: true,
    attemptsLeft: 3,
  };
}

/**
 * Submit quiz answers and get results
 */
export async function submitQuizAnswer(
  userId: string,
  lessonId: string,
  answers: QuizAnswer[],
  timeSpent?: number
): Promise<QuizResult> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const quiz = await getQuiz(lessonId);
  if (!quiz) {
    throw new Error("Quiz not found");
  }

  // Grade each question
  const questionResults: QuestionResult[] = answers.map((answer) => {
    const question = quiz.questions.find((q) => q.id === answer.questionId);
    if (!question) {
      throw new Error(`Question ${answer.questionId} not found`);
    }

    if (question.type === QuizTypeEnum.MULTIPLE_CHOICE) {
      return gradeMultipleChoice(question, answer as MultipleChoiceAnswer);
    } else {
      return gradePromptWriting(question, answer as PromptWritingAnswer);
    }
  });

  // Calculate total score
  const totalScore = Math.round(
    questionResults.reduce((sum, r) => sum + r.score, 0) / quiz.questions.length
  );

  const passed = totalScore >= quiz.passingScore;
  const xpEarned = passed ? quiz.xpReward : 0;

  // Calculate retry available date (24h from now if failed)
  const retryAvailableAt = passed
    ? undefined
    : new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

  // Save attempt (mock)
  const attempt: QuizAttempt = {
    id: `attempt-${Date.now()}`,
    userId,
    lessonId,
    score: totalScore,
    passed,
    xpEarned,
    completedAt: new Date().toISOString(),
    retryAvailableAt,
  };

  if (!MOCK_ATTEMPTS[userId]) {
    MOCK_ATTEMPTS[userId] = [];
  }
  MOCK_ATTEMPTS[userId].push(attempt);

  return {
    quizId: quiz.id,
    lessonId,
    userId,
    totalScore,
    passed,
    xpEarned,
    questionResults,
    completedAt: new Date().toISOString(),
    timeSpent,
    retryAvailableAt,
  };
}

/**
 * Get quiz attempts for a user
 */
export async function getQuizAttempts(
  userId: string,
  lessonId?: string
): Promise<QuizAttempt[]> {
  await new Promise((resolve) => setTimeout(resolve, 50));

  const attempts = MOCK_ATTEMPTS[userId] || [];
  if (lessonId) {
    return attempts.filter((a) => a.lessonId === lessonId);
  }
  return attempts;
}
