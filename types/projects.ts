import type { Project } from "./database";

export type { Project };

export interface TechStackTag {
  id: string;
  name: string;
  category?: 'frontend' | 'backend' | 'database' | 'devops' | 'ai' | 'mobile' | 'other';
}

export interface ProjectInput {
  title: string;
  description: string;
  github_url: string | null;
  screenshot_url: string | null;
  tech_stack: string[];
}

export interface ProjectFormData extends ProjectInput {
  screenshot_file?: File | null;
}

export interface UploadResult {
  success: boolean;
  project?: Project;
  error?: string;
}

export const COMMON_TECH_STACK: TechStackTag[] = [
  // Frontend
  { id: 'nextjs', name: 'Next.js', category: 'frontend' },
  { id: 'react', name: 'React', category: 'frontend' },
  { id: 'vue', name: 'Vue', category: 'frontend' },
  { id: 'svelte', name: 'Svelte', category: 'frontend' },
  { id: 'angular', name: 'Angular', category: 'frontend' },
  { id: 'typescript', name: 'TypeScript', category: 'frontend' },
  { id: 'javascript', name: 'JavaScript', category: 'frontend' },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'frontend' },
  { id: 'shadcn', name: 'shadcn/ui', category: 'frontend' },
  { id: 'framer-motion', name: 'Framer Motion', category: 'frontend' },

  // Backend
  { id: 'nodejs', name: 'Node.js', category: 'backend' },
  { id: 'python', name: 'Python', category: 'backend' },
  { id: 'go', name: 'Go', category: 'backend' },
  { id: 'rust', name: 'Rust', category: 'backend' },
  { id: 'java', name: 'Java', category: 'backend' },
  { id: 'express', name: 'Express', category: 'backend' },
  { id: 'fastapi', name: 'FastAPI', category: 'backend' },
  { id: 'django', name: 'Django', category: 'backend' },
  { id: 'nestjs', name: 'NestJS', category: 'backend' },

  // Database
  { id: 'supabase', name: 'Supabase', category: 'database' },
  { id: 'postgresql', name: 'PostgreSQL', category: 'database' },
  { id: 'mongodb', name: 'MongoDB', category: 'database' },
  { id: 'redis', name: 'Redis', category: 'database' },
  { id: 'prisma', name: 'Prisma', category: 'database' },
  { id: 'drizzle', name: 'Drizzle', category: 'database' },

  // AI/ML
  { id: 'openai', name: 'OpenAI', category: 'ai' },
  { id: 'anthropic', name: 'Anthropic', category: 'ai' },
  { id: 'langchain', name: 'LangChain', category: 'ai' },
  { id: 'tensorflow', name: 'TensorFlow', category: 'ai' },
  { id: 'pytorch', name: 'PyTorch', category: 'ai' },
  { id: 'huggingface', name: 'Hugging Face', category: 'ai' },
  { id: 'ollama', name: 'Ollama', category: 'ai' },
  { id: 'ml', name: 'Machine Learning', category: 'ai' },

  // DevOps
  { id: 'docker', name: 'Docker', category: 'devops' },
  { id: 'kubernetes', name: 'Kubernetes', category: 'devops' },
  { id: 'vercel', name: 'Vercel', category: 'devops' },
  { id: 'aws', name: 'AWS', category: 'devops' },
  { id: 'github-actions', name: 'GitHub Actions', category: 'devops' },

  // Mobile
  { id: 'react-native', name: 'React Native', category: 'mobile' },
  { id: 'flutter', name: 'Flutter', category: 'mobile' },
  { id: 'swift', name: 'Swift', category: 'mobile' },
  { id: 'kotlin', name: 'Kotlin', category: 'mobile' },

  // Other
  { id: 'graphql', name: 'GraphQL', category: 'other' },
  { id: 'rest', name: 'REST API', category: 'other' },
  { id: 'websocket', name: 'WebSocket', category: 'other' },
  { id: 'web3', name: 'Web3', category: 'other' },
  { id: 'solidity', name: 'Solidity', category: 'other' },
];

export type TechStackCategory = TechStackTag['category'];

export const TECH_STACK_COLORS: Record<Exclude<TechStackCategory, undefined>, string> = {
  frontend: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50',
  backend: 'bg-green-500/20 text-green-400 border-green-500/50',
  database: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
  devops: 'bg-orange-500/20 text-orange-400 border-orange-500/50',
  ai: 'bg-purple-500/20 text-purple-400 border-purple-500/50',
  mobile: 'bg-pink-500/20 text-pink-400 border-pink-500/50',
  other: 'bg-gray-500/20 text-gray-400 border-gray-500/50',
};
