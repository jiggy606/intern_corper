import { useState } from "react"
import ResetStepOne from "./ResetStepOne"
import ResetStepTwo from "./ResetStepTwo"

export const ForgotPassword = () => {
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      {step === 1 && <ResetStepOne onNext={handleNextStep} />}  
      {step === 2 && <ResetStepTwo onBack={handlePrevStep} />}
    </div>
  )
}