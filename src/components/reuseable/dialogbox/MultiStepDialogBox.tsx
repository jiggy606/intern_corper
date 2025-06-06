import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ReactNode, useState } from "react";

type MultiStepDialogProps = {
  triggerButton: ReactNode;
  steps: {
    title: string;
    description?: string;
    content: ReactNode;
  }[];
  onSubmit: () => void;
  canProceed?: boolean; 
  canSubmit?: boolean;  
};

const MultiStepDialogBox = ({
  triggerButton,
  steps,
  onSubmit,
  canProceed = true,
  canSubmit = true,
}: MultiStepDialogProps) => {
  const [step, setStep] = useState(0);
  const [open, setOpen] = useState(false);

  const nextStep = () => {
    if (canProceed) setStep((prev) => prev + 1);
  };
  const prevStep = () => setStep((prev) => prev - 1);
  const reset = () => setStep(0);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) reset();
  };

  const handleSubmit = () => {
    if (canSubmit) {
      onSubmit();
      setOpen(false);
      reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{steps[step].title}</DialogTitle>
          {steps[step].description && (
            <DialogDescription>{steps[step].description}</DialogDescription>
          )}
        </DialogHeader>

        <div className="py-4">{steps[step].content}</div>

        <DialogFooter className="flex justify-between">
          {step > 0 && (
            <Button variant="outline" onClick={prevStep}>
              Back
            </Button>
          )}

          {step < steps.length - 1 ? (
            <Button onClick={nextStep} disabled={!canProceed}>
              Next
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={!canSubmit}>
              Submit
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MultiStepDialogBox;
