import type { Rank } from '@/types/database';

export interface RankConfig {
  name: string;
  color: string;
  bgColor: string;
  borderColor: string;
  xpRequired: number;
  icon: string;
}

export const RANK_CONFIG: Record<Rank, RankConfig> = {
  novice: {
    name: 'Novice',
    color: 'text-gray-400',
    bgColor: 'bg-gray-400/10',
    borderColor: 'border-gray-400/30',
    xpRequired: 0,
    icon: '🌱',
  },
  coder: {
    name: 'Coder',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-400/10',
    borderColor: 'border-cyan-400/30',
    xpRequired: 1000,
    icon: '💻',
  },
  developer: {
    name: 'Developer',
    color: 'text-green-400',
    bgColor: 'bg-green-400/10',
    borderColor: 'border-green-400/30',
    xpRequired: 5000,
    icon: '🚀',
  },
  architect: {
    name: 'Architect',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-400/10',
    borderColor: 'border-yellow-400/30',
    xpRequired: 15000,
    icon: '🏗️',
  },
  master: {
    name: 'Master',
    color: 'text-orange-400',
    bgColor: 'bg-orange-400/10',
    borderColor: 'border-orange-400/30',
    xpRequired: 50000,
    icon: '👑',
  },
  legend: {
    name: 'Legend',
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/10',
    borderColor: 'border-purple-400/30',
    xpRequired: 100000,
    icon: '🐉',
  },
};
