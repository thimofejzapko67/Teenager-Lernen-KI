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
