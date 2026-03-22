"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface MeteorEffectProps {
  className?: string
  meteorCount?: number
  meteorDelay?: number
}

export const MeteorEffect = ({
  className,
  meteorCount = 20,
  meteorDelay = 0,
}: MeteorEffectProps) => {
  const meteors = React.useMemo(() => {
    return Array.from({ length: meteorCount }).map((_, i) => ({
      id: i,
      top: Math.floor(Math.random() * 100) + "%",
      left: Math.floor(Math.random() * 100) + "%",
      animationDelay: Math.random() * 1 + 0.2 + "s",
      animationDuration: Math.random() * 1 + 0.5 + "s",
    }))
  }, [meteorCount])

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {meteors.map((meteor) => (
        <div
          key={meteor.id}
          className="absolute top-0 left-0 h-0.5 w-0.5 rotate-[45deg] animate-meteor-effect rounded-[9999px]"
          style={{
            top: meteor.top,
            left: meteor.left,
            animationDelay: meteor.animationDelay,
            animationDuration: meteor.animationDuration,
          }}
        >
          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[1px] w-[50px] bg-gradient-to-r from-sky-500 to-transparent opacity-50" />
        </div>
      ))}
    </div>
  )
}
