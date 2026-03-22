"use server";

import type { Rank } from "@/types/database";

export type LeaderboardPeriod = "global" | "week" | "month" | "friends";

export interface LeaderboardEntry {
  rank: number;
  id: string;
  username: string;
  avatar_url: string | null;
  xp: number;
  level: number;
  rank_tier: Rank;
  rank_change?: number;
  is_current_user: boolean;
  skills?: string[];
  badges?: string[];
  awards?: string[];
  streak?: number;
  lessons_completed?: number;
}

export interface LeaderboardResult {
  entries: LeaderboardEntry[];
  total: number;
  page: number;
  perPage: number;
}

export interface UserRankResult {
  rank: number;
  xp: number;
  level: number;
  rank_tier: Rank;
}

const PER_PAGE = 25;

const FIRST_NAMES = [
  "Max", "Lena", "Finn", "Mia", "Leon", "Emma", "Noah", "Hannah", "Elias", "Sophie",
  "Ben", "Lea", "Paul", "Anna", "Felix", "Marie", "Julian", "Laura", "Tim", "Julia",
  "David", "Lisa", "Niklas", "Sarah", "Tom", "Lina", "Jonas", "Jana", "Philipp", "Klara",
  "Lukas", "Amelie", "Moritz", "Helena", "Fynn", "Emilia", "Nick", "Lilly", "Jan", "Maja",
  "Oscar", "Zoe", "Henry", "Lena", "Alex", "Ella", "Robin", "Greta", "Fabian", "Clara"
];

const LAST_NAMES = [
  "Müller", "Schmidt", "Schneider", "Fischer", "Weber", "Meyer", "Wagner", "Becker",
  "Schulz", "Hoffmann", "Koch", "Richter", "Bauer", "Klein", "Wolf", "Schröder",
  "Neumann", "Schwarz", "Braun", "Zimmermann", "Krüger", "Hofmann", "Hartmann", "Lange"
];

const SKILLS = [
  "JavaScript", "Python", "React", "TypeScript", "Next.js", "Node.js", "CSS",
  "HTML", "SQL", "Git", "Docker", "AWS", "Tailwind", "Vue.js", "Angular",
  "Swift", "Kotlin", "Flutter", "Rust", "Go", "Java", "C++", "PHP", "Ruby"
];

const BADGES = [
  "🚀 First Steps", "🔥 Streak Master", "⭐ Rising Star", "💎 Premium Coder",
  "🎯 Bug Hunter", "🏆 Champion", "🌟 Community Hero", "📚 Knowledge Seeker",
  "🎨 UI Wizard", "⚡ Speed Demon", "🛡️ Security Pro", "🤖 AI Enthusiast",
  "📱 Mobile Dev", "🌐 Web Master", "🔧 Problem Solver", "💡 Idea Generator"
];

const AWARDS = [
  "Gold Medal - Web Dev Challenge 2025",
  "Silver Medal - AI Hackathon",
  "Community Choice Award",
  "Most Innovative Project",
  "Best Newcomer",
  "Streak Champion - 30 Days",
  "Perfect Score - Security Quiz",
  "First Place - Python Sprint"
];

const AVATARS = [
  "🦊", "🐱", "🐶", "🦁", "🐯", "🐻", "🐼", "🐨", "🦄", "🐲",
  "🦋", "🦅", "🐺", "🦈", "🐙", "🤖", "👽", "🧙", "🧛", "🧝",
  "👻", "💀", "🎃", "👾", "🤠", "😎", "🥷", "🎅", "🧑‍💻", "👨‍🚀"
];

function generateMockUsers(count: number): LeaderboardEntry[] {
  const users: LeaderboardEntry[] = [];
  
  for (let i = 0; i < count; i++) {
    const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
    const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
    const username = `${firstName.toLowerCase()}${Math.floor(Math.random() * 999)}${lastName.charAt(0).toLowerCase()}`;
    
    const xp = Math.floor(Math.random() * 50000) + 100;
    const level = Math.floor(xp / 500) + 1;
    
    let rank_tier: Rank = "novice";
    if (xp > 40000) rank_tier = "legend";
    else if (xp > 30000) rank_tier = "master";
    else if (xp > 20000) rank_tier = "architect";
    else if (xp > 10000) rank_tier = "developer";
    else if (xp > 5000) rank_tier = "coder";
    
    const hasSkills = Math.random() > 0.2;
    const hasBadges = Math.random() > 0.3;
    const hasAwards = Math.random() > 0.7;
    
    const numSkills = Math.floor(Math.random() * 5) + 1;
    const numBadges = Math.floor(Math.random() * 4);
    const numAwards = Math.floor(Math.random() * 2);
    
    const shuffledSkills = [...SKILLS].sort(() => Math.random() - 0.5);
    const shuffledBadges = [...BADGES].sort(() => Math.random() - 0.5);
    const shuffledAwards = [...AWARDS].sort(() => Math.random() - 0.5);
    
    users.push({
      rank: 0,
      id: `user-${i + 1}`,
      username,
      avatar_url: AVATARS[Math.floor(Math.random() * AVATARS.length)],
      xp,
      level,
      rank_tier,
      rank_change: Math.floor(Math.random() * 20) - 10,
      is_current_user: false,
      skills: hasSkills ? shuffledSkills.slice(0, numSkills) : [],
      badges: hasBadges ? shuffledBadges.slice(0, numBadges) : [],
      awards: hasAwards ? shuffledAwards.slice(0, numAwards) : [],
      streak: Math.floor(Math.random() * 100),
      lessons_completed: Math.floor(Math.random() * 50) + 1,
    });
  }
  
  users.sort((a, b) => b.xp - a.xp);
  users.forEach((user, index) => {
    user.rank = index + 1;
  });
  
  return users;
}

const MOCK_USERS = generateMockUsers(120);

export async function getLeaderboard(
  period: LeaderboardPeriod = "global",
  page: number = 1,
  currentUserId?: string
): Promise<LeaderboardResult> {
  const offset = (page - 1) * PER_PAGE;
  
  let filteredUsers = [...MOCK_USERS];
  
  if (period === "week") {
    filteredUsers = filteredUsers.map(user => ({
      ...user,
      xp: Math.floor(user.xp * (0.1 + Math.random() * 0.3)),
    })).sort((a, b) => b.xp - a.xp);
  } else if (period === "month") {
    filteredUsers = filteredUsers.map(user => ({
      ...user,
      xp: Math.floor(user.xp * (0.3 + Math.random() * 0.4)),
    })).sort((a, b) => b.xp - a.xp);
  }
  
  if (period === "friends") {
    return {
      entries: [],
      total: 0,
      page,
      perPage: PER_PAGE,
    };
  }
  
  const total = filteredUsers.length;
  const paginatedUsers = filteredUsers.slice(offset, offset + PER_PAGE);
  
  const entries = paginatedUsers.map((user) => ({
    ...user,
    is_current_user: user.id === currentUserId,
  }));
  
  return {
    entries,
    total,
    page,
    perPage: PER_PAGE,
  };
}

export async function getUserRank(userId: string): Promise<UserRankResult | null> {
  const user = MOCK_USERS.find(u => u.id === userId);
  if (!user) return null;
  
  return {
    rank: user.rank,
    xp: user.xp,
    level: user.level,
    rank_tier: user.rank_tier,
  };
}

export async function getLeaderboardWins(userId: string): Promise<number> {
  return Math.floor(Math.random() * 5);
}

export async function getCurrentUserId(): Promise<string | null> {
  return null;
}
