import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { UserX } from 'lucide-react';

export default function ProfileNotFound() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <Card className="glass-card neon-border">
        <CardContent className="p-8 text-center space-y-6">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <UserX className="h-8 w-8 text-primary" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-display font-bold">Profile Not Found</h1>
            <p className="text-muted-foreground">
              The user profile you're looking for doesn't exist or has been removed.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Button asChild className="cyber-button">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
