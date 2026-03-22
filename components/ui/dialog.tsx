"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

const DialogContext = React.createContext<{ open: boolean; setOpen: (open: boolean) => void } | null>(null)

function Dialog({ open, onOpenChange, children, ...props }: React.ComponentProps<"div"> & { open?: boolean; onOpenChange?: (open: boolean) => void }) {
  const [internalOpen, setInternalOpen] = React.useState(open || false)
  const controlledOpen = open !== undefined ? open : internalOpen
  const setOpen = onOpenChange || setInternalOpen

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false) }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [setOpen])

  return (
    <DialogContext.Provider value={{ open: controlledOpen, setOpen }}>
      {controlledOpen && <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" onClick={() => setOpen(false)} />}
      <div {...props}>{children}</div>
    </DialogContext.Provider>
  )
}

function DialogContent({ className, ...props }: React.ComponentProps<"div">) {
  const context = React.useContext(DialogContext)
  if (!context || !context.open) return null

  return (
    <div className="fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%]">
      <div className={cn("border-2 border-border bg-background p-6 rounded-3xl shadow-2xl max-w-lg w-full", className)} {...props} />
    </div>
  )
}

function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left mb-4", className)} {...props} />
}

function DialogTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn("text-lg font-bold leading-none tracking-tight", className)} {...props} />
}

function DialogDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />
}

function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-4", className)} {...props} />
}

export { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter }
