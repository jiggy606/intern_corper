"use client"

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function DeleteDialogBox({
  trigger,
  onConfirm,
}: {
  trigger: React.ReactNode
  onConfirm: () => void
}) {
  const [open, setOpen] = useState(false)

  const handleConfirm = () => {
    onConfirm()
    setOpen(false) // Close dialog after deletion
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px] text-center">
        <h1 className="font-semibold text-lg mb-6">
          Are you sure you want to delete this member?
        </h1>

        <DialogFooter className="justify-center gap-4">
          <DialogClose asChild>
            <Button variant="outline" className="px-6 py-2 rounded-md">
              Cancel
            </Button>
          </DialogClose>
         
          <Button
            onClick={handleConfirm}
            className="px-6 py-2 rounded-md bg-[#638763] hover:text-[#638763] hover:bg-white hover:border hover:border-[#638763]"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}