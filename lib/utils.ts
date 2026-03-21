import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatXP(xp: number): string {
  return new Intl.NumberFormat("de-DE").format(xp);
}

export function getRankFromXP(xp: number): string {
  if (xp >= 100000) return "Legend";
  if (xp >= 50000) return "Master";
  if (xp >= 15000) return "Architect";
  if (xp >= 5000) return "Developer";
  if (xp >= 1000) return "Coder";
  return "Novice";
}

export function getLevelFromXP(xp: number): number {
  return Math.floor(Math.sqrt(xp / 100)) + 1;
}

export function getXPForLevel(level: number): number {
  return Math.pow(level - 1, 2) * 100;
}

export const clawGradientText = "bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent";

export interface LevelProgress {
  currentLevel: number;
  nextLevelXP: number;
  progressPercent: number;
}

export function getLevelProgress(currentXP: number): LevelProgress {
  const currentLevel = Math.floor(Math.sqrt(currentXP / 100)) + 1;
  const nextLevelXP = Math.pow(currentLevel, 2) * 100;
  const currentLevelXP = Math.pow(currentLevel - 1, 2) * 100;
  const progressPercent = ((currentXP - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;

  return {
    currentLevel,
    nextLevelXP,
    progressPercent: Math.min(100, Math.max(0, progressPercent)),
  };
}
