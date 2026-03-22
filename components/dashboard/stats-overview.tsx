"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface StatsOverviewProps {
  totalXP: number
  lessonsCompleted: number
  projectsUploaded: number
  currentLevel: number
}

export function StatsOverview({ totalXP, lessonsCompleted, projectsUploaded, currentLevel }: StatsOverviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Deine Statistiken</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 border-2 border-border rounded-xl">
            <div className="text-3xl font-black">{totalXP.toLocaleString("de-DE")}</div>
            <p className="text-sm text-muted-foreground mt-1">Gesamt XP</p>
          </div>
          <div className="text-center p-4 border-2 border-border rounded-xl">
            <div className="text-3xl font-black">{lessonsCompleted}</div>
            <p className="text-sm text-muted-foreground mt-1">Abgeschlossene Lektionen</p>
          </div>
          <div className="text-center p-4 border-2 border-border rounded-xl">
            <div className="text-3xl font-black">{projectsUploaded}</div>
            <p className="text-sm text-muted-foreground mt-1">Projekte hochgeladen</p>
          </div>
          <div className="text-center p-4 border-2 border-border rounded-xl">
            <div className="text-3xl font-black">{currentLevel}</div>
            <p className="text-sm text-muted-foreground mt-1">Aktuelles Level</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
