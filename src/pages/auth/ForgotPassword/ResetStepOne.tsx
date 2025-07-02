import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
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
import { supabase } from "@/lib/supabaseClient"; 

type Props = {
  onNext: () => void;
};

type FormValues = {
  email: string;
};

const ResetStepOne = ({ onNext }: Props) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${import.meta.env.VITE_SITE_URL}/reset-password`,
    });

    if (error) {
      toast.error("Invalid email / Wrong email.");
    } else {
      toast.success("Check your inbox for the password reset link.");
      onNext();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <Card className="w-full max-w-xl bg-white rounded-3xl pt-10 pb-16 shadow-md">
        <div className="px-4 sm:px-6 md:px-8">
          <div className="flex justify-center mb-4">
            <img src={logo} alt="logo" className="max-h-20" />
          </div>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl sm:text-3xl font-semibold">
              Forgot Password
            </CardTitle>
            <CardDescription className="text-gray-600 my-2 font-medium text-base">
              Please enter your email to reset password
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Your Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="px-4"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">Email is required</p>
                )}
              </div>

              <div className="space-y-4">
                <Button
                  type="submit"
                  className="w-full text-base hover:bg-[#638763] bg-white hover:text-white text-[#638763] border border-[#638763]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Reset Password"}
                </Button>
                <Button
                  type="button"
                  className="w-full text-base"
                  variant="outline"
                  onClick={() => navigate("/login")}
                >
                  Back
                </Button>
              </div>
            </form>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default ResetStepOne;
