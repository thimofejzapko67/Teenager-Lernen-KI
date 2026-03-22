"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Flame } from "lucide-react"

export function StreakDisplay() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-orange-500" />
          Lernserie
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-black">7 Tage</div>
        <p className="text-sm text-muted-foreground mt-2">Halte durch!</p>
      </CardContent>
    </Card>
  )
}
