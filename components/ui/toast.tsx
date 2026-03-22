"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

const Toast = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 z-50 rounded-xl border-2 border-border bg-background p-4 shadow-lg",
        className
      )}
      {...props}
    />
  )
}

const ToastTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
  return <h3 className={cn("font-semibold", className)} {...props} />
}

const ToastDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />
}

const ToastViewport = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("fixed bottom-0 right-0 z-50 flex flex-col gap-2 p-4", className)}
      {...props}
    />
  )
}

const ToastClose = ({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={cn("absolute right-2 top-2 rounded-lg opacity-70 transition-opacity", className)}
      {...props}
    />
  )
}

export {
  Toast,
  ToastProvider,
  ToastTitle,
  ToastDescription,
  ToastViewport,
  ToastClose,
}
