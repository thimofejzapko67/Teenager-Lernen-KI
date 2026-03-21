'use client';

import { useState } from 'react';
import { User, Mail, FileText, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { cn, clawGradientText } from '@/lib/utils';

interface ProfileSettingsProps {
  initialData: {
    username: string;
    email: string;
    bio?: string;
    avatar_url?: string;
  };
}

export function ProfileSettings({ initialData }: ProfileSettingsProps) {
  const [username, setUsername] = useState(initialData.username);
  const [bio, setBio] = useState(initialData.bio || '');
  const [avatarUrl, setAvatarUrl] = useState(initialData.avatar_url || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/settings/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, bio, avatar_url: avatarUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update profile');
      }

      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Profile Settings</h2>
        <p className="text-muted-foreground">
          Update your public profile information
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Avatar */}
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-3xl font-bold overflow-hidden">
            {avatarUrl ? (
              <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              username.charAt(0).toUpperCase()
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="avatar_url">Avatar URL</Label>
            <div className="flex gap-2">
              <Input
                id="avatar_url"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="https://example.com/avatar.png"
                className="max-w-xs"
              />
              <Button type="button" variant="outline" size="icon">
                <Camera className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Enter a URL for your avatar image
            </p>
          </div>
        </div>

        {/* Email (read-only) */}
        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={initialData.email}
            disabled
            className="bg-muted/50"
          />
          <p className="text-xs text-muted-foreground">
            Email cannot be changed
          </p>
        </div>

        {/* Username */}
        <div className="space-y-2">
          <Label htmlFor="username" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Username
          </Label>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="your-username"
            minLength={3}
            maxLength={20}
            pattern="[a-zA-Z0-9_-]+"
            required
          />
          <p className="text-xs text-muted-foreground">
            3-20 characters, letters, numbers, hyphens and underscores only
          </p>
        </div>

        {/* Bio */}
        <div className="space-y-2">
          <Label htmlFor="bio" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Bio
          </Label>
          <Textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell us about yourself..."
            maxLength={500}
            rows={4}
          />
          <p className="text-xs text-muted-foreground">
            {bio.length}/500 characters
          </p>
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      </form>
    </div>
  );
}
