import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "secondary" | "ghost" | "outline" | "destructive"
  size?: "icon" | "sm" | "md" | "lg"
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild = false, ...props }, ref) => {
  const buttonClasses = cn(
    "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
    {
      "bg-primary text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/25": variant === "primary" || variant === "default",
      "bg-secondary text-secondary-foreground hover:opacity-90 shadow-lg shadow-secondary/25": variant === "secondary",
      "hover:bg-muted": variant === "ghost",
      "border-2 border-border bg-transparent hover:border-primary hover:text-primary": variant === "outline",
      "bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/25": variant === "destructive",
      "h-9 px-4 text-sm": size === "sm",
      "h-11 px-6 text-base": size === "md",
      "h-14 px-8 text-lg": size === "lg",
      "h-10 w-10 p-0": size === "icon",
    },
    className
  )

  if (asChild && React.isValidElement(props.children)) {
    return React.cloneElement(props.children as React.ReactElement<any>, {
      className: cn(buttonClasses, (props.children as React.ReactElement<any>).props.className),
      ref: ref as any,
    })
  }

  return (
    <button
      className={buttonClasses}
      ref={ref}
      {...props}
    />
  )
  })
Button.displayName = "Button"

export { Button }
