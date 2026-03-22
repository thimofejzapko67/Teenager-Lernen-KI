"use server";

import type { Rank } from "@/types/database";

export type LeaderboardPeriod = "global" | "week" | "month" | "friends";

export interface UserStats {
  design: number;
  development: number;
  ai_ml: number;
  security: number;
  mobile: number;
  databases: number;
  devops: number;
  algorithms: number;
}

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
  stats?: UserStats;
  bio?: string;
  joined?: string;
  projects?: number;
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

const USERNAMES = [
  "NightOwl", "PixelNinja", "CodeWizard", "TechTitan", "ByteHunter",
  "DataDragon", "CloudChaser", "StormCoder", "FireDev", "IceHacker",
  "ShadowByte", "NeonPunk", "CyberWolf", "LogicLord", "SyntaxSamurai",
  "BugSquasher", "GitGuru", "DockerMaster", "KubeKing", "RustRacer",
  "PythonPro", "JSMaster", "ReactNinja", "VueViking", "AngularAce",
  "SwiftSensei", "KotlinKnight", "FlutterFox", "DartDragon", "GoGlider",
  "RubyRider", "PHPPhantom", "JavaJedi", "CSharpStar", "CppCommander",
  "SqlSorcerer", "MongoMaven", "RedisRanger", "GraphGuru", "ApiArchitect",
  "FrontendFox", "BackendBear", "FullstackFalcon", "DevOpsDeer", "MlMaverick",
  "AIAdept", "DataDruid", "CloudCrow", "SecurityScout", "TestingTiger",
  "CryptoCat", "BlockChainBear", "Web3Wolf", "MobileMonkey", "UXUnicorn",
  "DesignDragon", "ProductPhoenix", "AgileAnt", "ScrumShark", "LeanLion",
  "TerraformTiger", "AnsibleAce", "JenkinsJaguar", "PrometheusPilot", "GrafanaGlider",
  "LambdaLion", "ServerlessStar", "MicroserviceMaven", "ContainerCat", "K8sKnight",
  "DeepDiver", "NeuralNinja", "TensorTitan", "PyTorchPro", "HuggingHero",
  "OpenAIOrbit", "AnthropicAce", "LangChainLord", "VectorViking", "EmbeddingEagle",
  "FigmaFox", "SketchStar", "AdobeAce", "CanvaCreator", "FramerFox",
  "TailwindTitan", "CSSChampion", "BootstrapBear", "MaterialMaster", "ChakraChief",
  "TestingTurtle", "JestJedi", "CypressCat", "PlaywrightPro", "MochaMaster",
  "GraphQLGuru", "RestRocket", "WebSocketWolf", "GrpcGlider", "ProtobufPro",
  "WebpackWolf", "ViteViking", "EsbuildEagle", "RollupRocket", "ParcelPro",
  "NpmNinja", "YarnYogi", "PnpmPro", "BunBear", "DenoDragon",
  "RustRookie", "ZigZebra", "CrystalCat", "ElixirEagle", "HaskellHero",
  "LinuxLion", "BashBear", "ZshZebra", "FishFox", "PowershellPro",
  "VimViking", "EmacsEagle", "VsCodeViper", "JetbrainsJedi", "NeovimNinja"
];

const BADGES = [
  { name: "🚀 Early Adopter", description: "Among the first 100 users" },
  { name: "🔥 30-Day Streak", description: "Coded for 30 days straight" },
  { name: "⭐ Rising Star", description: "Top 10% in weekly XP" },
  { name: "💎 Premium Coder", description: "Completed 50+ lessons" },
  { name: "🎯 Bug Hunter", description: "Found and reported 10 bugs" },
  { name: "🏆 Hackathon Winner", description: "Won a coding competition" },
  { name: "🌟 Community Hero", description: "Helped 100+ community members" },
  { name: "📚 Knowledge Master", description: "Completed all courses in one track" },
  { name: "🎨 Design Pro", description: "Created 20+ UI designs" },
  { name: "⚡ Speed Demon", description: "Completed lesson in record time" },
  { name: "🛡️ Security Expert", description: "Passed all security challenges" },
  { name: "🤖 AI Pioneer", description: "Built 10 AI projects" },
  { name: "📱 App Developer", description: "Published 5 mobile apps" },
  { name: "🌐 Web Master", description: "Deployed 20+ websites" },
  { name: "🔧 Open Source Hero", description: "50+ GitHub contributions" },
  { name: "💡 Innovation Award", description: "Created unique project" },
  { name: "🥇 First Place", description: "#1 on leaderboard" },
  { name: "🥈 Second Place", description: "#2 on leaderboard" },
  { name: "🥉 Third Place", description: "#3 on leaderboard" },
  { name: "🏅 Top 10", description: "Reached top 10" },
  { name: "🔥 100-Day Streak", description: "Coded for 100 days straight" },
  { name: "💜 Community Favorite", description: "Most liked projects" },
  { name: "🎓 Mentor", description: "Helped 10 beginners" },
  { name: "⚡ Lightning Fast", description: "Submissions under 5 minutes" }
];

const AWARDS = [
  "🥇 Web Dev Challenge 2025 - 1st Place",
  "🥈 AI Hackathon - 2nd Place", 
  "🥉 Security CTF - 3rd Place",
  "🏆 Community Choice Award",
  "⭐ Most Innovative Project",
  "🎯 Best Newcomer",
  "🔥 Streak Champion - 100 Days",
  "💯 Perfect Score - Python Master",
  "🌟 Rising Star of the Month",
  "💎 Premium Developer Badge",
  "🚀 Project of the Week",
  "🤖 Best AI Project",
  "📱 Top Mobile App",
  "🌐 Best Web Design",
  "🔐 Security Expert Award"
];

const BIOS = [
  "Full-stack developer passionate about clean code and coffee ☕",
  "AI enthusiast building the future, one model at a time 🤖",
  "Security researcher by day, CTF player by night 🔐",
  "Mobile developer who loves creating beautiful apps 📱",
  "Open source contributor and community builder 💜",
  "Turning ideas into reality, one commit at a time 💻",
  "UX designer turned developer, creating seamless experiences ✨",
  "Backend engineer obsessed with scalability and performance ⚡",
  "Game developer creating immersive worlds 🎮",
  "Data scientist finding patterns in chaos 📊",
  "DevOps engineer automating everything 🔄",
  "Startup founder coding the next big thing 🚀",
  "Teacher sharing knowledge, one tutorial at a time 📚",
  "Freelancer building cool projects for awesome clients 💼",
  "Student learning something new every day 🎓"
];

function generateMockUsers(count: number): LeaderboardEntry[] {
  const users: LeaderboardEntry[] = [];
  
  for (let i = 0; i < count; i++) {
    const username = USERNAMES[i % USERNAMES.length] + (Math.floor(i / USERNAMES.length) || '');
    const xp = Math.floor(Math.random() * 50000) + 100;
    const level = Math.floor(xp / 500) + 1;
    
    let rank_tier: Rank = "novice";
    if (xp > 40000) rank_tier = "legend";
    else if (xp > 30000) rank_tier = "master";
    else if (xp > 20000) rank_tier = "architect";
    else if (xp > 10000) rank_tier = "developer";
    else if (xp > 5000) rank_tier = "coder";
    
    const stats: UserStats = {
      design: Math.floor(Math.random() * 100),
      development: Math.floor(Math.random() * 100),
      ai_ml: Math.floor(Math.random() * 100),
      security: Math.floor(Math.random() * 100),
      mobile: Math.floor(Math.random() * 100),
      databases: Math.floor(Math.random() * 100),
      devops: Math.floor(Math.random() * 100),
      algorithms: Math.floor(Math.random() * 100),
    };

    const hasBadges = Math.random() > 0.3;
    const hasAwards = Math.random() > 0.7;
    const hasBio = Math.random() > 0.2;
    
    const numBadges = Math.floor(Math.random() * 5);
    const numAwards = Math.floor(Math.random() * 3);
    
    const shuffledBadges = [...BADGES].sort(() => Math.random() - 0.5);
    const shuffledAwards = [...AWARDS].sort(() => Math.random() - 0.5);
    
    const avatars = [
      "🦊", "🐱", "🐶", "🦁", "🐯", "🐻", "🐼", "🐨", "🦄", "🐲",
      "🦋", "🦅", "🐺", "🦈", "🐙", "🤖", "👽", "🧙", "🧛", "🧝",
      "👻", "💀", "🎃", "👾", "🤠", "😎", "🥷", "🎅", "🧑‍💻", "👨‍🚀",
      "🧙‍♂️", "🧝‍♀️", "🦸", "🦹", "🧑‍🎤", "👨‍🎨", "🧑‍🔬", "🧑‍🚀", "🧑‍💻", "🧑‍🎤"
    ];
    
    users.push({
      rank: 0,
      id: `user-${i + 1}`,
      username,
      avatar_url: avatars[Math.floor(Math.random() * avatars.length)],
      xp,
      level,
      rank_tier,
      rank_change: Math.floor(Math.random() * 20) - 10,
      is_current_user: false,
      badges: hasBadges ? shuffledBadges.slice(0, numBadges).map(b => b.name) : [],
      awards: hasAwards ? shuffledAwards.slice(0, numAwards) : [],
      streak: Math.floor(Math.random() * 100),
      lessons_completed: Math.floor(Math.random() * 50) + 1,
      stats,
      bio: hasBio ? BIOS[Math.floor(Math.random() * BIOS.length)] : undefined,
      joined: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
      projects: Math.floor(Math.random() * 20),
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
    filteredUsers.forEach((user, index) => {
      user.rank = index + 1;
    });
  } else if (period === "month") {
    filteredUsers = filteredUsers.map(user => ({
      ...user,
      xp: Math.floor(user.xp * (0.3 + Math.random() * 0.4)),
    })).sort((a, b) => b.xp - a.xp);
    filteredUsers.forEach((user, index) => {
      user.rank = index + 1;
    });
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

export async function getUserById(userId: string): Promise<LeaderboardEntry | null> {
  return MOCK_USERS.find(u => u.id === userId) || null;
}

export async function getUserByUsername(username: string): Promise<LeaderboardEntry | null> {
  return MOCK_USERS.find(u => u.username === username) || null;
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
