import React from 'react';
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="flex flex-col md:flex-row md:justify-between w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="w-full md:w-1/2 p-6 md:p-12">
          <h1 className="font-bold text-4xl md:text-5xl">LOGIN</h1>
          <p className="mt-3 text-gray-500 text-lg">Sign in to your account</p>
          
          <form className="mt-8 space-y-6">
            <div className='space-y-2'>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <Input type="text" placeholder="Input Username" />
            </div>

            <div className='space-y-2'>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <Input type="password" placeholder="Input Password" />
            </div>

            <Link to={'/dashboard'}>
              <Button type="submit" variant="default" className="w-full md:w-3/4 py-4">
                Log In
              </Button>
            </Link>

            <Link
              to={'/forgot-password'}
              className="text-red-400 text-sm font-medium mt-4 block hover:underline hover:text-red-600"
            >
              Forgot password?
            </Link>
          </form>
        </div>

        <div className="w-full md:w-1/2 bg-gray-700 flex items-center justify-center p-8">
          <p className="text-center text-white">IMAGE COMES HERE</p>
        </div>

      </div>
    </div>
  );
};

export default Login;
