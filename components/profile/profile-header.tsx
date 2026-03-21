'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { RANK_CONFIG } from '@/lib/rank-config';
import { formatXP, getLevelProgress } from '@/lib/utils';
import { Profile, Rank } from '@/types/database';
import { Edit2, Share2, User } from 'lucide-react';
import { useState } from 'react';

interface ProfileHeaderProps {
  profile: Profile;
  isOwnProfile: boolean;
  onEdit?: () => void;
}

export function ProfileHeader({ profile, isOwnProfile, onEdit }: ProfileHeaderProps) {
  const [copied, setCopied] = useState(false);

  const rankConfig = RANK_CONFIG[profile.rank as Rank];
  const { currentLevel, nextLevelXP, progressPercent } = getLevelProgress(profile.xp);

  const handleShare = async () => {
    const url = window.location.href;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getInitials = (username: string) => {
    return username
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card className="glass-card neon-border overflow-hidden">
      <CardContent className="p-6 md:p-8">
        {/* Banner/Background effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 pointer-events-none" />

        <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Avatar */}
          <div className="relative group">
            <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-primary/30 ring-2 ring-primary/20">
              <AvatarImage
                src={profile.avatar_url || undefined}
                alt={profile.username}
                className="object-cover"
              />
              <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-2xl font-display font-bold">
                {getInitials(profile.username)}
              </AvatarFallback>
            </Avatar>
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl -z-10 group-hover:bg-primary/30 transition-colors duration-300" />
          </div>

          {/* Profile Info */}
          <div className="flex-1 text-center md:text-left space-y-4">
            <div className="space-y-2">
              {/* Username and Rank */}
              <div className="flex flex-col md:flex-row items-center gap-3">
                <h1 className="text-3xl md:text-4xl font-display font-bold neon-text">
                  {profile.username}
                </h1>
                <Badge
                  className={`${rankConfig.bgColor} ${rankConfig.color} ${rankConfig.borderColor} border text-sm md:text-base px-3 py-1`}
                >
                  {rankConfig.name}
                </Badge>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-center md:justify-start gap-2">
                {isOwnProfile && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onEdit}
                    className="gap-2"
                  >
                    <Edit2 className="h-4 w-4" />
                    Edit Profile
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleShare}
                  className="gap-2"
                >
                  <Share2 className="h-4 w-4" />
                  {copied ? 'Copied!' : 'Share'}
                </Button>
              </div>
            </div>

            {/* Level and XP Progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Level {currentLevel}</span>
                <span className="font-mono text-primary">
                  {formatXP(profile.xp)} / {formatXP(nextLevelXP)} XP
                </span>
              </div>
              <Progress value={progressPercent} className="h-3" />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{Math.round(progressPercent)}% to Level {currentLevel + 1}</span>
                <span className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  Member since {new Date(profile.created_at).toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })}
                </span>
              </div>
            </div>
          </div>

          {/* Rank Badge (Large) */}
          <div className="hidden lg:flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
            <div className={`text-6xl mb-2 ${rankConfig.color}`}>
              {rankConfig.icon}
            </div>
            <span className={`font-display font-bold text-lg ${rankConfig.color}`}>
              {rankConfig.name}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
