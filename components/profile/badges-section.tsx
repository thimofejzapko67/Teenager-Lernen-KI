'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

interface BadgesSectionProps {
  badges: string[];
}

const BADGE_INFO: Record<string, { description: string; rarity: 'common' | 'rare' | 'epic' | 'legendary' }> = {
  '🚀 Early Adopter': { description: 'Among the first 100 users', rarity: 'legendary' },
  '🔥 30-Day Streak': { description: 'Coded for 30 days straight', rarity: 'rare' },
  '⭐ Rising Star': { description: 'Top 10% in weekly XP', rarity: 'rare' },
  '💎 Premium Coder': { description: 'Completed 50+ lessons', rarity: 'epic' },
  '🎯 Bug Hunter': { description: 'Found and reported 10 bugs', rarity: 'common' },
  '🏆 Hackathon Winner': { description: 'Won a coding competition', rarity: 'legendary' },
  '🌟 Community Hero': { description: 'Helped 100+ community members', rarity: 'epic' },
  '📚 Knowledge Master': { description: 'Completed all courses in one track', rarity: 'epic' },
  '🎨 Design Pro': { description: 'Created 20+ UI designs', rarity: 'rare' },
  '⚡ Speed Demon': { description: 'Completed lesson in record time', rarity: 'rare' },
  '🛡️ Security Expert': { description: 'Passed all security challenges', rarity: 'epic' },
  '🤖 AI Pioneer': { description: 'Built 10 AI projects', rarity: 'epic' },
  '📱 App Developer': { description: 'Published 5 mobile apps', rarity: 'rare' },
  '🌐 Web Master': { description: 'Deployed 20+ websites', rarity: 'rare' },
  '🔧 Open Source Hero': { description: '50+ GitHub contributions', rarity: 'epic' },
  '💡 Innovation Award': { description: 'Created unique project', rarity: 'legendary' },
  '🥇 First Place': { description: '#1 on leaderboard', rarity: 'legendary' },
  '🥈 Second Place': { description: '#2 on leaderboard', rarity: 'legendary' },
  '🥉 Third Place': { description: '#3 on leaderboard', rarity: 'epic' },
  '🏅 Top 10': { description: 'Reached top 10', rarity: 'epic' },
  '🔥 100-Day Streak': { description: 'Coded for 100 days straight', rarity: 'legendary' },
  '💜 Community Favorite': { description: 'Most liked projects', rarity: 'epic' },
  '🎓 Mentor': { description: 'Helped 10 beginners', rarity: 'rare' },
  '⚡ Lightning Fast': { description: 'Submissions under 5 minutes', rarity: 'rare' },
};

const RARITY_COLORS = {
  common: 'bg-gray-500/20 border-gray-500/50 text-gray-300 hover:bg-gray-500/30',
  rare: 'bg-blue-500/20 border-blue-500/50 text-blue-300 hover:bg-blue-500/30',
  epic: 'bg-purple-500/20 border-purple-500/50 text-purple-300 hover:bg-purple-500/30',
  legendary: 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/50 text-yellow-300 hover:from-yellow-500/30 hover:to-orange-500/30',
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 },
};

export function BadgesSection({ badges }: BadgesSectionProps) {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="w-5 h-5 text-yellow-400" />
          Badges
          <span className="text-sm font-normal text-muted-foreground">({badges.length})</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-wrap gap-3"
        >
          {badges.map((badge, index) => {
            const info = BADGE_INFO[badge] || { description: badge, rarity: 'common' as const };
            return (
              <motion.div key={index} variants={item}>
                <Badge
                  variant="outline"
                  className={`px-4 py-2 text-sm border ${RARITY_COLORS[info.rarity]} transition-all cursor-default`}
                  title={info.description}
                >
                  {badge}
                </Badge>
              </motion.div>
            );
          })}
        </motion.div>
      </CardContent>
    </Card>
  );
}
