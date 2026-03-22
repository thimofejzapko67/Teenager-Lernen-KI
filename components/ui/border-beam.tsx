"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface BorderBeamProps {
  className?: string
  size?: number
  duration?: number
  borderWidth?: number
  colorFrom?: string
  colorTo?: string
  delay?: number
}

export const BorderBeam = ({
  className,
  size = 200,
  duration = 15,
  borderWidth = 1.5,
  colorFrom = "#ffaa40",
  colorTo = "#9400ff",
  delay = 0,
}: BorderBeamProps) => {
  return (
    <div
      style={
        {
          "--size": `${size}px`,
          "--duration": `${duration}s`,
          "--border-width": `${borderWidth}px`,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--delay": `-${delay}s`,
        } as React.CSSProperties
      }
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]",
        "before:absolute before:inset-[var(--border-width)] before:rounded-[inherit]",
        "after:absolute after:inset-[var(--border-width)] after:rounded-[inherit]",
        "before:bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,var(--color-from)_50%,transparent_100%)]",
        "after:bg-[conic-gradient(from_270deg_at_50%_50%,transparent_0%,var(--color-to)_50%,transparent_100%)]",
        "before:animate-[rotate_4s_linear_infinite]",
        "after:animate-[rotate_4s_linear_infinite]",
        "after:[animation-delay:var(--delay)]",
        className
      )}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `conic-gradient(from 90deg at 50% 50%, transparent 0%, ${colorFrom} 50%, transparent 100%)`,
          animation: `rotate ${duration}s linear infinite`,
        }}
      />
    </div>
  )
}
