import React from "react"
import { cn } from "@/lib/utils"

export function Alert({ className, variant = "default", ...props }) {
  const baseClasses = "relative w-full rounded-lg border p-4"
  const variantClasses = {
    default: "bg-background text-foreground",
    destructive:
      "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"
  }

  return (
    <div
      role="alert"
      className={cn(baseClasses, variantClasses[variant], className)}
      {...props}
    />
  )
}

export const AlertTitle = ({ className, ...props }) => (
  <h5
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
)

export const AlertDescription = ({ className, ...props }) => (
  <div
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
)
