"use client"
import * as React from "react"

interface SelectProps {
  children: React.ReactNode
  value?: string
  onValueChange?: (value: string) => void
}

const Select = ({ children, value, onValueChange }: SelectProps) => {
  return <>{children}</>
}
Select.displayName = "Select"

function SelectTrigger({ asChild, ...props }: React.ComponentProps<"button"> & { asChild?: boolean }) {
  return <button {...props} />
}

function SelectValue({ placeholder, ...props }: React.ComponentProps<"span"> & { placeholder?: string }) {
  return <span {...props}>{placeholder}</span>
}

function SelectContent({ children }: { children: React.ReactNode }) {
  return <div className="relative w-full">{children}</div>
}

function SelectItem({ children, value, ...props }: React.ComponentProps<"div"> & { value: string }) {
  return <div {...props}>{children}</div>
}

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem }
