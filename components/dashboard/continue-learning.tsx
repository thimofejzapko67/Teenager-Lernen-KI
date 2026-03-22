"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import Link from "next/link"

export function ContinueLearning() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weiterlernen</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Einführung in KI</h3>
            <p className="text-sm text-muted-foreground mt-1">Lektion 3 von 8</p>
            <div className="mt-3 h-2 w-full bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[37%]" />
            </div>
          </div>
          <Link href="/learn/lesson/intro-ai-3">
            <Button className="w-full">
              <Play className="w-4 h-4 mr-2" />
              Fortsetzen
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
