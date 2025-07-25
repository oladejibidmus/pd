import * as React from "react"
import { cn } from "@/lib/utils"

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {}

const Divider = React.forwardRef<HTMLHRElement, DividerProps>(({ className, ...props }, ref) => {
  return <hr ref={ref} className={cn("border-none h-px bg-border", className)} {...props} />
})
Divider.displayName = "Divider"

export { Divider }
