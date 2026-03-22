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

export function DesktopTOC({ items, onItemClick }: TOCProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Inhaltsverzeichnis</CardTitle>
      </CardHeader>
      <CardContent>
        <nav className="space-y-1">
          {items.map((item) => (
            <button
              key={item.id}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                item.active
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "hover:bg-muted"
              }`}
              onClick={() => onItemClick?.(item.id)}
            >
              {item.title}
            </button>
          ))}
        </nav>
      </CardContent>
    </Card>
  )
}
