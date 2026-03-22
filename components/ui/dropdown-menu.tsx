"use client"
import * as React from "react"

function DropdownMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  return <div className="relative">{React.Children.map(children, child => React.cloneElement(child as any, { open, setOpen }))}</div>
}

function DropdownMenuTrigger({ children, open, setOpen }: any) {
  return <div onClick={() => setOpen(!open)} className="inline-flex">{children}</div>
}

function DropdownMenuContent({ children, open }: any) {
  if (!open) return null
  return <div className="absolute right-0 mt-2 w-56 rounded-xl border-2 border-border bg-background shadow-xl z-50">{children}</div>
}

function DropdownMenuItem({ children, className, ...props }: any) {
  return <div className={cn("px-4 py-2 hover:bg-muted cursor-pointer rounded-lg text-sm", className)} {...props}>{children}</div>
}

export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem }
