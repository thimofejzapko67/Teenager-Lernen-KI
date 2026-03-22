"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface PopoverProps {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const Popover = ({ children, open, onOpenChange }: PopoverProps) => {
  return <>{children}</>
}

const PopoverTrigger = React.forwardRef<
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
PopoverTrigger.displayName = "PopoverTrigger"

const PopoverContent = ({ className, align, onOpenAutoFocus, ...props }: React.HTMLAttributes<HTMLDivElement> & { align?: string; onOpenAutoFocus?: (e: any) => void }) => {
  return (
    <div
      className={cn(
        "z-50 w-72 rounded-xl border-2 border-border bg-background p-4 shadow-md",
        align === "end" && "ml-auto",
        className
      )}
      onFocus={onOpenAutoFocus as any}
      {...props}
    />
  )
}

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
}
