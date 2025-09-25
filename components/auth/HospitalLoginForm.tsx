"use client";

import { Mail, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface LoginForm {
  email: string;
  password: string;
}

export default function HospitalLoginForm() {
  const { register, handleSubmit } = useForm<LoginForm>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    console.log("Hospital Login Data:", data);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Login successful!"); 

    setIsLoading(false);
    router.push("/hospital/dashboard");
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-lightgrey mb-1">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-lightgrey/70" />
            <input
              {...register("email", { required: true })}
              type="email"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-foreground outline-none"
              placeholder="doctor@hospital.com"
              disabled={isLoading}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-lightgrey mb-1">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-lightgrey/70" />
            <input
              {...register("password", { required: true })}
              type="password"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-foreground outline-none"
              placeholder="••••••••"
              disabled={isLoading}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-primary/80 text-white py-2 px-4 rounded-lg hover:bg-primary transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>
    </>
  );
}
