"use client"
import * as React from "react"

const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>((props, ref) => (
  <select ref={ref} className="flex h-10 w-full items-center justify-between rounded-xl border-2 border-border bg-transparent px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" {...props} />
))
Select.displayName = "Select"

export { Select }
