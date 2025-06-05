// components/dialogs/MultiStepDialog.tsx
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
};

const MultiStepDialogBox = ({ triggerButton, steps, onSubmit }: MultiStepDialogProps) => {
  const [step, setStep] = useState(0);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);
  const reset = () => setStep(0);

  return (
    <Dialog onOpenChange={reset}>
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
            <Button onClick={nextStep}>Next</Button>
          ) : (
            <Button onClick={onSubmit}>Submit</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MultiStepDialogBox;