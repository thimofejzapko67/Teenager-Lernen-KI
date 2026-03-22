"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

const TabsContext = React.createContext<{ value: string; setValue: (value: string) => void } | null>(null)

function Tabs({ defaultValue, value, onValueChange, children, ...props }: React.ComponentProps<"div"> & { defaultValue?: string; value?: string; onValueChange?: (value: string) => void }) {
  const [internalValue, setInternalValue] = React.useState(defaultValue || "")
  const controlledValue = value !== undefined ? value : internalValue
  const setValue = onValueChange || setInternalValue

  return (
    <TabsContext.Provider value={{ value: controlledValue, setValue: setValue as (value: string) => void }}>
      <div {...props}>{children}</div>
    </TabsContext.Provider>
  )
}

function TabsList({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("inline-flex h-10 items-center justify-center rounded-xl bg-muted p-1", className)} {...props} />
  )
}

function TabsTrigger({ value, className, ...props }: React.ComponentProps<"button"> & { value: string }) {
  const context = React.useContext(TabsContext)
  if (!context) throw new Error("TabsTrigger must be used within Tabs")

  return (
    <button
      onClick={() => context.setValue(value)}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-lg px-8 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        context.value === value ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:bg-background/50",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({ value, className, ...props }: React.ComponentProps<"div"> & { value: string }) {
  const context = React.useContext(TabsContext)
  if (!context) throw new Error("TabsContent must be used within Tabs")

  if (context.value !== value) return null

  return <div className={cn("mt-2", className)} {...props} />
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
