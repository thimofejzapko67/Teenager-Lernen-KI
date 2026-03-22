"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export function RecommendedLessons() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Empfohlen für dich</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 border-2 border-border rounded-xl hover:border-primary transition-colors">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold">Python Basics</h4>
                <p className="text-sm text-muted-foreground mt-1">Deine erste KI-Anwendung</p>
              </div>
              <Badge>Anfänger</Badge>
            </div>
            <Link href="/learn/lesson/python-basics-1" className="mt-3 block">
              <Button variant="outline" size="sm" className="w-full">Starten</Button>
            </Link>
          </div>

          <div className="p-4 border-2 border-border rounded-xl hover:border-primary transition-colors">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold">KI Modelle</h4>
                <p className="text-sm text-muted-foreground mt-1">Wie Machine Learning funktioniert</p>
              </div>
              <Badge>Mittel</Badge>
            </div>
            <Link href="/learn/lesson/ml-models-1" className="mt-3 block">
              <Button variant="outline" size="sm" className="w-full">Starten</Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
