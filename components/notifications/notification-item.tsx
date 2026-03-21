'use client';

import { Trophy, BookOpen, Flame, Building2, AlertCircle, MessageCircle, ExternalLink, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import type { Notification } from '@/lib/notifications';

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
  onClose?: () => void;
}

export function NotificationItem({
  notification,
  onMarkAsRead,
  onDelete,
  onClose,
}: NotificationItemProps) {
  const getIcon = () => {
    switch (notification.type) {
      case 'achievement':
        return <Trophy className="w-4 h-4 text-yellow-500" />;
      case 'lesson_complete':
        return <BookOpen className="w-4 h-4 text-cyan-500" />;
      case 'streak':
        return <Flame className="w-4 h-4 text-orange-500" />;
      case 'sponsor':
        return <Building2 className="w-4 h-4 text-purple-500" />;
      case 'mention':
      case 'reply':
        return <MessageCircle className="w-4 h-4 text-blue-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getContent = () => (
    <div
      className={cn(
        'flex items-start gap-3 p-3 hover:bg-muted/50 transition-colors',
        !notification.read && 'bg-primary/5'
      )}
    >
      {/* Icon */}
      <div className="flex-shrink-0 mt-0.5">
        {getIcon()}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className={cn('text-sm', !notification.read && 'font-semibold')}>
          {notification.title}
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2">
          {notification.message}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {formatTimeAgo(notification.created_at)}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1">
        {!notification.read && (
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => onMarkAsRead(notification.id)}
          >
            <ExternalLink className="w-3 h-3" />
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-destructive"
          onClick={() => onDelete(notification.id)}
        >
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );

  if (notification.link) {
    return (
      <Link
        href={notification.link}
        onClick={() => {
          onMarkAsRead(notification.id);
          onClose?.();
        }}
        className="block"
      >
        {getContent()}
      </Link>
    );
  }

  return getContent();
}

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return date.toLocaleDateString();
}
