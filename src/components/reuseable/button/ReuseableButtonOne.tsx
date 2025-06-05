import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"

type ReusableButtonProps = {
  children: ReactNode
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  className?: string
  bgColor?: string    // Tailwind like 'bg-blue-500'
  textColor?: string  // Tailwind like 'text-white'
  borderColor?: string // Tailwind like 'border-blue-500'
  icon?: ReactNode     // Accepts Lucide icon or anything else
  disabled?: boolean
}

export const ReusableButtonOne = ({
  children,
  onClick,
  type = "button",
  className = "",
  bgColor = "",
  textColor = "",
  borderColor = "",
  icon,
  disabled = false,
}: ReusableButtonProps) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-md border transition-all duration-200",
        bgColor,
        textColor,
        borderColor,
        className
      )}
    >
      {icon && <span className="w-5 h-5">{icon}</span>}
      {children}
    </Button>
  )
}
