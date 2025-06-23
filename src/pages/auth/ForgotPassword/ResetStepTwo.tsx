import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import logo from '@/assets/images/logo.jpg';

type Props = {
  onBack: () => void;
};

type FormValues = {
  password: string;
  confirmPassword: string;
};

const ResetStepTwo = ({ onBack }: Props) => {
  const navigate = useNavigate();

  const [seePass, setSeePass] = useState(false);
  const [seeConfirmPass, setSeeConfirmPass] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const password = watch("password");

  const onSubmit = (data: FormValues) => {
    console.log("Password reset data:", data);
    // reset password API
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <Card className="w-full max-w-xl bg-white rounded-3xl pt-10 pb-16 shadow-md">
        <div className="px-4 sm:px-6 md:px-8">
          <div className="flex justify-center mb-4">
            <img src={logo} alt="logo" className=" max-h-20" />
          </div>

          <CardHeader className="text-center">
            <CardTitle className="text-2xl sm:text-3xl font-semibold">Set a new password</CardTitle>
            <CardDescription className="text-gray-600 mt-2 font-medium text-base">
              Input a different password from the last one
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={seePass ? "text" : "password"}
                    placeholder="******"
                    className="pr-10"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                  <div
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                    onClick={() => setSeePass((prev) => !prev)}
                  >
                    {seePass ? <EyeOff size={18} color="#808080" /> : <Eye size={18} color="#808080" />}
                  </div>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Retype Password
                </label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={seeConfirmPass ? "text" : "password"}
                    placeholder="******"
                    className="pr-10"
                    {...register("confirmPassword", {
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                  />
                  <div
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                    onClick={() => setSeeConfirmPass((prev) => !prev)}
                  >
                    {seeConfirmPass ? <EyeOff size={18} color="#808080" /> : <Eye size={18} color="#808080" />}
                  </div>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <Button className="hover:bg-[#638763] bg-white hover:text-white text-[#638763] border border-[#638763]"> 
                  Submit
                </Button>
                <Button variant="destructive" onClick={onBack}>
                  Cancel
                  </Button>
              </div>
            </form>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default ResetStepTwo;
