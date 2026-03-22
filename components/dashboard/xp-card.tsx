"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Trophy } from "lucide-react"

export function XPCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5" />
          XP Punkte
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-black">1,250</div>
        <p className="text-sm text-muted-foreground mt-2">+150 diese Woche</p>
      </CardContent>
    </Card>
  )
}
