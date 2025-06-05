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
import { Link } from "react-router-dom";

type Props = {
  onNext: () => void;
};

type FormValues = {
  email: string;
};

const ResetStepOne = ({ onNext }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log("Email submitted:", data);
    onNext();
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <Card className="w-full max-w-xl bg-white rounded-3xl pt-10 pb-16 shadow-md">
        <div className="px-4 sm:px-6 md:px-8">
          <p className="text-center mb-6 text-sm text-gray-500">Image goes here</p>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl sm:text-3xl font-semibold">Forgot Password</CardTitle>
            <CardDescription className="text-gray-600 my-2">
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

              <Button type="submit" className=" w-full text-base">
                Reset Password
              </Button>
            </form>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default ResetStepOne;
