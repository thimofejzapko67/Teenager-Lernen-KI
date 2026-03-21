/**
 * Get streak bonus multiplier
 * Returns a multiplier based on current streak
 */
export function getStreakMultiplier(streak: number): number {
  if (streak >= 30) return 2.0; // 2x multiplier for 30+ day streaks
  if (streak >= 14) return 1.5; // 1.5x multiplier for 14+ day streaks
  if (streak >= 7) return 1.25; // 1.25x multiplier for 7+ day streaks
  if (streak >= 3) return 1.1; // 1.1x multiplier for 3+ day streaks
  return 1.0; // No bonus for streaks under 3 days
}

/**
 * Calculate XP with streak bonus applied
 */
export function applyStreakBonus(baseXP: number, streak: number): number {
  const multiplier = getStreakMultiplier(streak);
  return Math.round(baseXP * multiplier);
}
