"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function StatsOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Deine Statistiken</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 border-2 border-border rounded-xl">
            <div className="text-3xl font-black">12</div>
            <p className="text-sm text-muted-foreground mt-1">Abgeschlossene Lektionen</p>
          </div>
          <div className="text-center p-4 border-2 border-border rounded-xl">
            <div className="text-3xl font-black">4</div>
            <p className="text-sm text-muted-foreground mt-1">Kurse begonnen</p>
          </div>
          <div className="text-center p-4 border-2 border-border rounded-xl">
            <div className="text-3xl font-black">89%</div>
            <p className="text-sm text-muted-foreground mt-1">Quiz-Rate</p>
          </div>
          <div className="text-center p-4 border-2 border-border rounded-xl">
            <div className="text-3xl font-black">3.5h</div>
            <p className="text-sm text-muted-foreground mt-1">Lernzeit</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
