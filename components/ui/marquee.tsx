"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface MarqueeProps {
  className?: string
  reverse?: boolean
  pauseOnHover?: boolean
  children?: React.ReactNode
  vertical?: boolean
  repeat?: number
  speed?: "fast" | "normal" | "slow"
}

export function Marquee({
  className,
  reverse,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  speed = "normal",
}: MarqueeProps) {
  const duration = speed === "fast" ? 20 : speed === "slow" ? 40 : 30

  return (
    <div
      className={cn(
        "group flex overflow-hidden p-2 [--gap:1rem] [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        vertical && "flex-col [--gap:1rem] [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]",
        className
      )}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "flex shrink-0 justify-around [gap:var(--gap)]",
            vertical ? "animate-marquee-vertical flex-col" : "animate-marquee",
            reverse && "[animation-direction:reverse]",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
            "[animation-duration:var(--duration)]"
          )}
          style={{ "--duration": `${duration}s` } as React.CSSProperties}
        >
          {children}
        </div>
      ))}
    </div>
  )
}
