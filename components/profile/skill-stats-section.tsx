'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { UserStats } from '@/lib/leaderboard';
import { motion } from 'framer-motion';
import { 
  Palette, 
  Code, 
  Brain, 
  Shield, 
  Smartphone, 
  Database, 
  GitBranch,
  TrendingUp,
  BarChart3
} from 'lucide-react';

interface SkillStatsSectionProps {
  stats: UserStats;
}

const SKILL_CONFIG = [
  { key: 'design' as const, label: 'Design', icon: Palette, color: 'from-pink-500 to-rose-500' },
  { key: 'development' as const, label: 'Development', icon: Code, color: 'from-blue-500 to-cyan-500' },
  { key: 'ai_ml' as const, label: 'AI & ML', icon: Brain, color: 'from-purple-500 to-violet-500' },
  { key: 'security' as const, label: 'Security', icon: Shield, color: 'from-red-500 to-orange-500' },
  { key: 'mobile' as const, label: 'Mobile', icon: Smartphone, color: 'from-green-500 to-emerald-500' },
  { key: 'databases' as const, label: 'Databases', icon: Database, color: 'from-yellow-500 to-amber-500' },
  { key: 'devops' as const, label: 'DevOps', icon: GitBranch, color: 'from-indigo-500 to-blue-500' },
  { key: 'algorithms' as const, label: 'Algorithms', icon: TrendingUp, color: 'from-teal-500 to-cyan-500' },
];

function SkillBar({ 
  label, 
  value, 
  icon: Icon, 
  color, 
  delay 
}: { 
  label: string; 
  value: number; 
  icon: any; 
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="space-y-2"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium">{label}</span>
        </div>
        <span className="text-sm font-mono text-muted-foreground">{value}%</span>
      </div>
      <div className="h-3 bg-muted/50 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ delay: delay + 0.2, duration: 0.6, ease: 'easeOut' }}
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
        />
      </div>
    </motion.div>
  );
}

export function SkillStatsSection({ stats }: SkillStatsSectionProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          Skills & Expertise
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {SKILL_CONFIG.map((skill, index) => (
            <SkillBar
              key={skill.key}
              label={skill.label}
              value={stats[skill.key]}
              icon={skill.icon}
              color={skill.color}
              delay={index * 0.1}
            />
          ))}
        </motion.div>
      </CardContent>
    </Card>
  );
}
