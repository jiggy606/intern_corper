import React from 'react';
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext"; 
import logo from '@/assets/images/logo.jpg';
import logo2 from '@/assets/images/logo2.jpeg'

import { toast } from "sonner"

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit } = useForm<LoginFormInputs>();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormInputs) => {
    const success = await login(data.email, data.password);
    if (success) {
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="flex flex-col md:flex-row md:justify-between w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="w-full md:w-1/2 p-6 md:p-12">
          <h1 className="font-bold text-4xl md:text-5xl">LOGIN</h1>
          <p className="mt-3 text-gray-500 text-lg">Sign in to your account</p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <div className='space-y-2'>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <Input
                type="text"
                placeholder="Input Username"
                {...register('email', { required: true })}
              />
            </div>

            <div className='space-y-2'>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <Input
                type="password"
                placeholder="Input Password"
                {...register('password', { required: true })}
              />
            </div>

            <Button type="submit" className="w-full md:w-3/4 py-4 bg-[#638763] hover:text-[#638763] hover:bg-white hover:border hover:border-[#638763]" >
              Log In
            </Button>

            <Link
              to={'/forgot-password'}
              className="text-red-400 text-sm font-medium mt-4 block hover:underline hover:text-red-600"
            >
              Forgot password?
            </Link>
          </form>
        </div>

        <div className="w-full md:w-1/2 flex items-center justify-center p-12">
          <img src={logo} alt="Logo" className="max-h-80 object-contain" />
        </div>
      </div>
    </div>
  );
};

export default Login;
