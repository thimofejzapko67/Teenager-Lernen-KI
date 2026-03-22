"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export function StyleSwitcher() {
  const [currentStyle, setCurrentStyle] = useState<"minimal" | "experimental" | "youthful">("minimal")

  useEffect(() => {
    const saved = localStorage.getItem("codelift-style") as "minimal" | "experimental" | "youthful" | null
    if (saved) setCurrentStyle(saved)
  }, [])

  const handleStyleChange = (style: "minimal" | "experimental" | "youthful") => {
    setCurrentStyle(style)
    localStorage.setItem("codelift-style", style)
    document.documentElement.setAttribute("data-style", style)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      <div className="bg-card/95 backdrop-blur-xl border border-border/60 rounded-2xl p-4 shadow-2xl">
        <p className="text-xs font-semibold mb-3 text-muted-foreground uppercase tracking-wider">
          Design Style
        </p>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={currentStyle === "minimal" ? "default" : "outline"}
            onClick={() => handleStyleChange("minimal")}
            className="text-xs"
          >
            /1 Minimal
          </Button>
          <Button
            size="sm"
            variant={currentStyle === "experimental" ? "default" : "outline"}
            onClick={() => handleStyleChange("experimental")}
            className="text-xs"
          >
            /2 Experimental
          </Button>
          <Button
            size="sm"
            variant={currentStyle === "youthful" ? "default" : "outline"}
            onClick={() => handleStyleChange("youthful")}
            className="text-xs"
          >
            /3 Youthful
          </Button>
        </div>
      </div>
    </div>
  )
}
