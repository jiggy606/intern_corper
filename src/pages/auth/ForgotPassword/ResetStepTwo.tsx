import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/images/logo.jpg";
import { toast } from "sonner";

const ResetStepTwo = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <Card className="w-full max-w-xl bg-white rounded-3xl pt-10 pb-16 shadow-md">
        <div className="px-4 sm:px-6 md:px-8">
          <div className="flex justify-center mb-4">
            <img src={logo} alt="logo" className="max-h-20" />
          </div>

          <CardHeader className="text-center">
            <CardTitle className="text-2xl sm:text-3xl font-semibold">
              Check Your Email
            </CardTitle>
            <CardDescription className="text-gray-600 my-2 font-medium text-base">
              A password reset link has been sent to your email. Please follow the instructions there to reset your password.
            </CardDescription>
          </CardHeader>

          <CardContent className="mt-6">
            <Button
              className="w-full text-base hover:bg-[#638763] bg-white hover:text-white text-[#638763] border border-[#638763]"
              onClick={() => {
              navigate("/login");
            }}
            >
              Go to Login
            </Button>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default ResetStepTwo;
