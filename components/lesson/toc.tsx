"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface TOCItem {
  id: string
  text: string
  level: number
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
              style={{ paddingLeft: `${item.level * 0.5}rem` }}
              onClick={() => onItemClick?.(item.id)}
            >
              {item.text}
            </Button>
          ))}
        </nav>
      </CardContent>
    </Card>
  )
}

export function DesktopTOC({ items, onItemClick, activeId }: TOCProps & { activeId?: string }) {
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
                item.active || item.id === activeId
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "hover:bg-muted"
              }`}
              style={{ paddingLeft: `${(item.level + 1) * 0.75}rem` }}
              onClick={() => onItemClick?.(item.id)}
            >
              {item.text}
            </button>
          ))}
        </nav>
      </CardContent>
    </Card>
  )
}
