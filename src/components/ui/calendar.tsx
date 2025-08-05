"use client"

import * as React from "react"
import DatePicker from "react-datepicker"
import { Calendar as CalendarIcon } from "lucide-react"

import "react-datepicker/dist/react-datepicker.css"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

type CalendarProps = {
  selected?: Date | null  // ← change from `Date | undefined` to `Date | null`
  onChange: (date: Date | null) => void
  placeholderText?: string
  className?: string
}

function Calendar({ selected, onChange, className, placeholderText }: CalendarProps) {
  return (
    <div className={cn("relative", className)}>
      <DatePicker
        selected={selected}
        onChange={onChange}
        placeholderText={placeholderText}
        dateFormat="MMMM d, yyyy"
        className={cn(
          buttonVariants({ variant: "outline" }),
          "w-full text-left font-normal"
        )}
        calendarClassName="z-50 rounded-md border bg-popover text-popover-foreground shadow-md"
        dayClassName={() =>
          "rounded-md p-1 hover:bg-accent hover:text-accent-foreground"
        }
        popperPlacement="bottom-start"
      />
      <CalendarIcon className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
    </div>
  )
}

export { Calendar }
