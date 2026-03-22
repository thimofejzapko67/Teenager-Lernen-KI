'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Shield, Ban, MoreVertical, Search } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  rank: string;
  xp: number;
  level: number;
  streak: number;
  created_at: string;
  banned?: boolean;
  role?: string;
}

interface UsersTableProps {
  users: UserProfile[];
  onBan?: (userId: string, reason: string) => void;
  onUnban?: (userId: string) => void;
  onRoleChange?: (userId: string, role: 'admin' | 'moderator' | 'user') => void;
}

export function UsersTable({ users, onBan, onUnban, onRoleChange }: UsersTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [banDialogOpen, setBanDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [banReason, setBanReason] = useState('');

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRoleColor = (role?: string) => {
    switch (role) {
      case 'admin': return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'moderator': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      default: return 'bg-muted/50 text-muted-foreground';
    }
  };

  const getRankColor = (rank: string) => {
    switch (rank) {
      case 'legend': return 'text-yellow-500';
      case 'master': return 'text-primary';
      case 'architect': return 'text-cyan-500';
      case 'developer': return 'text-green-500';
      case 'coder': return 'text-blue-500';
      default: return 'text-gray-400';
    }
  };

  const handleBan = () => {
    if (selectedUser && banReason) {
      onBan?.(selectedUser.id, banReason);
      setBanDialogOpen(false);
      setBanReason('');
      setSelectedUser(null);
    }
  };

  return (
    <>
      <div className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search users..."
            className="pl-10"
          />
        </div>

        {/* Table */}
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Rank</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>XP</TableHead>
                <TableHead>Streak</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{user.username}</div>
                      <div className="text-xs text-muted-foreground">{user.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={cn('capitalize text-sm font-medium', getRankColor(user.rank))}>
                      {user.rank}
                    </span>
                  </TableCell>
                  <TableCell>{user.level}</TableCell>
                  <TableCell>{user.xp.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {user.streak}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getRoleColor(user.role)}>
                      {user.role || 'user'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {user.banned ? (
                      <Badge variant="destructive">Banned</Badge>
                    ) : (
                      <Badge variant="outline" className="text-green-500 border-green-500/50">
                        Active
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => {
                          setSelectedUser(user);
                          onRoleChange?.(user.id, user.role === 'admin' ? 'user' : 'admin');
                        }}>
                          <Shield className="w-4 h-4 mr-2" />
                          {user.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                        </DropdownMenuItem>
                        {user.banned ? (
                          <DropdownMenuItem onClick={() => onUnban?.(user.id)}>
                            <Shield className="w-4 h-4 mr-2" />
                            Unban User
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => {
                              setSelectedUser(user);
                              setBanDialogOpen(true);
                            }}
                          >
                            <Ban className="w-4 h-4 mr-2" />
                            Ban User
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No users found
          </div>
        )}
      </div>

      {/* Ban Dialog */}
      <Dialog open={banDialogOpen} onOpenChange={setBanDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ban User</DialogTitle>
            <DialogDescription>
              Are you sure you want to ban <strong>{selectedUser?.username}</strong>?
              This will prevent them from accessing the platform.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <label htmlFor="reason" className="text-sm font-medium">
              Reason for ban
            </label>
            <Input
              id="reason"
              value={banReason}
              onChange={(e) => setBanReason(e.target.value)}
              placeholder="e.g., Violation of community guidelines"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBanDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleBan}>
              Ban User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
