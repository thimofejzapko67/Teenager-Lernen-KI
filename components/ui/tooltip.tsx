"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const TooltipProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

const Tooltip = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("inline-block", className)}
      {...props}
    />
  )
}

const TooltipTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  if (asChild && React.isValidElement(props.children)) {
    return React.cloneElement(props.children as React.ReactElement<any>, {
      className: cn(className, (props.children as React.ReactElement<any>).props.className),
      ref: ref as any,
    })
  }

  return <button className={cn(className)} ref={ref} {...props} />
})
TooltipTrigger.displayName = "TooltipTrigger"

const TooltipContent = ({ className, side, ...props }: React.HTMLAttributes<HTMLDivElement> & { side?: string }) => {
  return (
    <div
      className={cn(
        "z-50 overflow-hidden rounded-xl border-2 border-border bg-background px-3 py-1.5 text-sm shadow-md",
        side === "bottom" && "mt-2",
        side === "top" && "mb-2",
        side === "left" && "mr-2",
        side === "right" && "ml-2",
        className
      )}
      {...props}
    />
  )
}

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
}
