import * as React from "react"
import { cn } from "@/lib/utils"

interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

interface BentoGridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  title?: string
  description?: string
  header?: React.ReactNode
  icon?: React.ReactNode
  colSpan?: number
  rowSpan?: number
}

const BentoGrid = React.forwardRef<HTMLDivElement, BentoGridProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "grid auto-rows-[22rem] grid-cols-1 gap-4 md:grid-cols-3",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

BentoGrid.displayName = "BentoGrid"

const BentoGridItem = React.forwardRef<HTMLDivElement, BentoGridItemProps>(
  (
    {
      children,
      className,
      title,
      description,
      header,
      icon,
      colSpan = 1,
      rowSpan = 1,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "group relative overflow-hidden rounded-2xl bg-background/80 backdrop-blur-xl border border-border/60 p-6 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1",
          colSpan === 2 && "md:col-span-2",
          colSpan === 3 && "md:col-span-3",
          rowSpan === 2 && "md:row-span-2",
          rowSpan === 3 && "md:row-span-3",
          className
        )}
        {...props}
      >
        {header && (
          <div className="mb-4 flex items-start justify-between">
            {icon && <div className="text-primary">{icon}</div>}
          </div>
        )}
        {title && (
          <div className="mb-2">
            <h3 className="font-semibold text-lg">{title}</h3>
          </div>
        )}
        {description && (
          <div className="mb-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
        )}
        {children}
      </div>
    )
  }
)

BentoGridItem.displayName = "BentoGridItem"

export { BentoGrid, BentoGridItem }
