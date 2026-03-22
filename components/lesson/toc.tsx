"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface TOCItem {
  id: string
  title: string
  active?: boolean
}

interface TOCProps {
  items: TOCItem[]
  onItemClick?: (id: string) => void
}

export function TOC({ items, onItemClick }: TOCProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Inhalt</CardTitle>
      </CardHeader>
      <CardContent>
        <nav className="space-y-2">
          {items.map((item) => (
            <Button
              key={item.id}
              variant={item.active ? "primary" : "ghost"}
              className="w-full justify-start"
              onClick={() => onItemClick?.(item.id)}
            >
              {item.title}
            </Button>
          ))}
        </nav>
      </CardContent>
    </Card>
  )
}
