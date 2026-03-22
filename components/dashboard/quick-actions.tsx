"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Code, BookOpen, Trophy, Users } from "lucide-react"
import Link from "next/link"

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Schnellaktionen</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          <Link href="/learn">
            <Button variant="outline" className="w-full h-auto flex-col gap-2 p-4">
              <Code className="w-6 h-6" />
              <span className="text-sm">Neue Lektion</span>
            </Button>
          </Link>
          <Link href="/leaderboard">
            <Button variant="outline" className="w-full h-auto flex-col gap-2 p-4">
              <Trophy className="w-6 h-6" />
              <span className="text-sm">Ranking</span>
            </Button>
          </Link>
          <Link href="/profile">
            <Button variant="outline" className="w-full h-auto flex-col gap-2 p-4">
              <BookOpen className="w-6 h-6" />
              <span className="text-sm">Mein Profil</span>
            </Button>
          </Link>
          <Link href="/community">
            <Button variant="outline" className="w-full h-auto flex-col gap-2 p-4">
              <Users className="w-6 h-6" />
              <span className="text-sm">Community</span>
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
