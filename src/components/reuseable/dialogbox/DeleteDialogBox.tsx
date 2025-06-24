"use client"

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
  DialogClose,
  DialogTitle,
  DialogDescription,
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
    onConfirm();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="w-[90%] max-w-[500px] text-center p-6 sm:p-8">
        <DialogTitle className="font-bold sm:text-xl">Are you sure?</DialogTitle>
        <DialogDescription className=" font-semibold sm:text-lg mb-4">
          This action cannot be undone. This will permanently delete the record.
        </DialogDescription>
        {/* <h1 className="font-semibold text-lg sm:text-xl mb-6">
          Are you sure you want to delete this member?
        </h1> */}

        <DialogFooter className="flex flex-col sm:flex-row justify-center gap-4">
          <DialogClose asChild>
            <Button variant="outline" className="px-6 py-2 rounded-md w-full sm:w-auto">
              Cancel
            </Button>
          </DialogClose>

          <Button
            onClick={handleConfirm}
            className="px-6 py-2 rounded-md w-full sm:w-auto hover:bg-[#638763] bg-white hover:text-white text-[#638763] border border-[#638763]"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
