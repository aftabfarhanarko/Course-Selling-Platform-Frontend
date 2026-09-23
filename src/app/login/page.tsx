"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useLoginMutation } from "@/lib/api/authApi";
import { Eye, EyeOff, ArrowRight, Check, Loader2, ShieldCheck, Store, User, Briefcase, Mail, Lock, Zap, Shield, Star, GraduationCap, ChevronLeft, LogIn, Target } from "lucide-react";
import LoginLotti from "@/components/signup/LoginLotti";

type LoginFormData = {
  email: string;
  password: string;
};

const DEMO_ROLES = [
  {
    label: "Super Admin",
    email: "admin@edunova.com",
    password: "Admin@123456",
    icon: ShieldCheck,
    style: "bg-[#FFF1F2] border-[#FECDD3] text-[#E11D48] hover:bg-[#FFE4E6]",
  },
  {
    label: "Vendor",
    email: "instructor@edunova.com",
    password: "Instructor@123456",
    icon: Store,
    style: "bg-[#FEF3C7] border-[#FDE68A] text-[#D97706] hover:bg-[#FDE68A]",
  },
  {
    label: "Student",
    email: "student@edunova.com",
    password: "Student@123456",
    icon: User,
    style: "bg-[#DCFCE7] border-[#BBF7D0] text-[#059669] hover:bg-[#D1FAE5]",
  },
  {
    label: "Affiliate",
    email: "affiliate@edunova.com",
    password: "Affiliate@123456",
    icon: Briefcase,
    style: "bg-[#EFF6FF] border-[#BFDBFE] text-[#5B50E6] hover:bg-[#DBEAFE]",
  },
];

function LoginFormContent(): React.JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams?.get("next");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [loginUser, { isLoading: isLoginLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    const toastId = toast.loading("Signing in...");

    try {
      const response = await loginUser({ email: data.email, password: data.password }).unwrap() as any;
      const userRole = response?.user?.role || response?.role || response?.data?.user?.role || response?.data?.role;
      setSuccess(true);
      toast.success("Signed in!", { id: toastId });

      if (next) {
        router.push(next);
      } else {
        if (userRole === "superadmin" || userRole === "super_admin" || userRole === "admin") {
          router.push("/admin/dashboard");
        } else if (userRole === "affiliate") {
          router.push("/affiliate/dashboard");
        } else {
          router.push("/student/dashboard");
        }
      }
    } catch {
      toast.error("Login failed", { id: toastId });
    }
  };

  const handleQuickLogin = async (email: string, pass: string) => {
    setValue("email", email, { shouldValidate: true });
    setValue("password", pass, { shouldValidate: true });
    await onSubmit({ email, password: pass });
  };

  return (
    <div className="w-full max-w-[420px] mx-auto">
      {/* Brand Logo Box */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-14 h-14 rounded-2xl bg-[#5B50E6] text-white flex items-center justify-center shadow-lg shadow-indigo-500/25 mb-2.5">
          <GraduationCap className="w-8 h-8 stroke-[2.2]" />
        </div>
        <h3 className="text-xl font-black text-slate-900 tracking-tight">EduNova</h3>
        
        {/* Email Auth Pill */}
        <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[#5B50E6] text-[10.5px] font-black uppercase tracking-widest">
          <Mail className="w-3 h-3" />
          <span>EMAIL AUTHENTICATION</span>
        </div>
      </div>

      {/* Title */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-black text-slate-900 flex items-center justify-center gap-2">
          <LogIn className="w-5 h-5 text-[#5B50E6]" />
          <span>Welcome back</span>
        </h1>
        <p className="text-xs font-medium text-slate-400 mt-1">
          Enter your email address and password to sign in.
        </p>
      </div>

      {/* Quick Demo Accounts Card */}
      <div className="mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-2xs">
        <div className="flex items-center justify-center gap-1.5 text-[11px] font-black text-slate-500 mb-3">
          <Zap className="w-3.5 h-3.5 text-amber-500" />
          <span>QUICK DEMO ACCOUNTS (ক্লিক করে অটো ফিল করুন)</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {DEMO_ROLES.map((role) => (
            <button
              key={role.label}
              type="button"
              onClick={() => handleQuickLogin(role.email, role.password)}
              disabled={isSubmitting || isLoginLoading || success}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11.5px] font-bold transition-all hover:scale-105 active:scale-95 shadow-2xs cursor-pointer disabled:opacity-50 ${role.style}`}
            >
              <role.icon className="w-3.5 h-3.5 shrink-0" />
              <span>{role.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Address */}
        <div className="space-y-1.5">
          <label className="text-[10.5px] font-black text-slate-400 uppercase tracking-widest ml-1">
            EMAIL ADDRESS
          </label>
          <div className="relative flex items-center">
            <Mail className="absolute left-3.5 text-slate-400 w-4 h-4 pointer-events-none" />
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="name@example.com"
              className="w-full bg-white border border-slate-200 focus:border-[#5B50E6] focus:ring-4 focus:ring-[#5B50E6]/10 rounded-xl py-3 pl-10 pr-4 text-xs font-semibold text-slate-700 outline-none transition-all placeholder:text-slate-400"
            />
          </div>
          {errors.email && (
            <p className="text-[11px] text-red-500 font-bold ml-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label className="text-[10.5px] font-black text-slate-400 uppercase tracking-widest ml-1">
              PASSWORD
            </label>
            <Link
              href="/forget-password"
              className="text-[11px] font-bold text-[#5B50E6] hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="relative flex items-center">
            <Lock className="absolute left-3.5 text-slate-400 w-4 h-4 pointer-events-none" />
            <input
              {...register("password", { required: "Password is required" })}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full bg-white border border-slate-200 focus:border-[#5B50E6] focus:ring-4 focus:ring-[#5B50E6]/10 rounded-xl py-3 pl-10 pr-11 text-xs font-semibold text-slate-700 outline-none transition-all placeholder:text-slate-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3.5 text-slate-400 hover:text-[#5B50E6] transition-colors p-1"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-[11px] text-red-500 font-bold ml-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Remember Me */}
        <div className="flex items-center gap-2 ml-1">
          <input
            type="checkbox"
            id="remember"
            className="w-4 h-4 rounded border-slate-300 text-[#5B50E6] focus:ring-[#5B50E6]"
          />
          <label htmlFor="remember" className="text-xs font-medium text-slate-500 cursor-pointer">
            Remember me
          </label>
        </div>

        {/* Sign In Button */}
        <button
          type="submit"
          disabled={isSubmitting || isLoginLoading || success}
          className="w-full bg-[#5B50E6] hover:bg-[#4D42DB] text-white font-extrabold py-3.5 rounded-2xl transition-all shadow-lg shadow-indigo-500/25 active:scale-[0.98] disabled:opacity-70 text-xs flex items-center justify-center gap-2 mt-2 cursor-pointer"
        >
          {isSubmitting || isLoginLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : success ? (
            <>
              <Check className="w-4 h-4" />
              <span>Signed In!</span>
            </>
          ) : (
            <>
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Register Link */}
      <p className="text-center text-xs text-slate-400 mt-6 font-medium">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-[#5B50E6] font-black hover:underline">
          Create one free →
        </Link>
      </p>

      {/* Trust Footer */}
      <div className="mt-6 pt-4 border-t border-slate-200/60 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[10.5px] font-bold text-slate-400">
        <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> SSL Encrypted</span>
        <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-blue-500" /> Privacy Protected</span>
        <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-500" /> Trusted by 50K+</span>
      </div>
    </div>
  );
}

export default function LoginPage(): React.JSX.Element {
  return (
    <div className="w-full flex flex-col lg:flex-row bg-white">
      {/* ── LEFT COLUMN: Lottie Showcase & Stats ── */}
      <div className="hidden md:flex lg:w-1/2 bg-gradient-to-br from-[#EEF2FF] via-indigo-50/70 to-slate-50 p-6 xl:p-10 flex-col justify-between items-center relative overflow-hidden border-r border-indigo-100/60 py-8">
        {/* Top Pill Tag */}
        <div className="w-full flex justify-center pt-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-indigo-100 text-[#5B50E6] text-[11.5px] font-extrabold shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5B50E6] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5B50E6]"></span>
            </span>
            <span>Bangladesh&apos;s #1 Learning Platform</span>
          </div>
        </div>

        {/* Center Lottie Animation */}
        <div className="w-full max-w-lg my-auto py-4 flex items-center justify-center">
          <LoginLotti />
        </div>

        {/* Text Content & Feature Bullets */}
        <div className="w-full max-w-md text-center space-y-3 pb-2">
          <h2 className="text-2xl xl:text-3xl font-black text-slate-900 tracking-tight">
            Welcome back to <span className="text-[#5B50E6]">EduNova</span>
          </h2>

          <div className="space-y-2 text-left max-w-xs mx-auto">
            <div className="flex items-center gap-2.5 text-xs font-bold text-slate-700">
              <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center text-[#5B50E6] shrink-0">
                <Target className="w-3.5 h-3.5" />
              </div>
              <span>100+ Live & Recorded Courses</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs font-bold text-slate-700">
              <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center text-[#5B50E6] shrink-0">
                <Target className="w-3.5 h-3.5" />
              </div>
              <span>Verified Certificates & Placement</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs font-bold text-slate-700">
              <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center text-[#5B50E6] shrink-0">
                <Target className="w-3.5 h-3.5" />
              </div>
              <span>24/7 Dedicated Instructor Support</span>
            </div>
          </div>
        </div>

        {/* Bottom Stats Bar */}
        <div className="w-full pt-4 border-t border-indigo-100/80 grid grid-cols-4 gap-2 text-center">
          <div>
            <p className="text-base xl:text-lg font-black text-slate-900">50K+</p>
            <p className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">Happy Students</p>
          </div>
          <div className="border-l border-indigo-100">
            <p className="text-base xl:text-lg font-black text-slate-900">4.9★</p>
            <p className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">Avg Rating</p>
          </div>
          <div className="border-l border-indigo-100">
            <p className="text-base xl:text-lg font-black text-slate-900">200K+</p>
            <p className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">Jobs Done</p>
          </div>
          <div className="border-l border-indigo-100">
            <p className="text-base xl:text-lg font-black text-slate-900">24/7</p>
            <p className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">Support</p>
          </div>
        </div>
      </div>

      {/* ── RIGHT COLUMN: Auth Form ── */}
      <div className="w-full lg:w-1/2 bg-slate-50/40 flex flex-col justify-between p-6 sm:p-8 lg:p-10 relative py-8">
        {/* Top Back Link */}
        <div className="w-full flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#5B50E6] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>BACK TO HOME</span>
          </Link>
        </div>

        {/* Form Container */}
        <div className="w-full my-auto py-4">
          <Suspense fallback={
            <div className="w-full max-w-[420px] mx-auto h-96 flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-[#5B50E6]" />
            </div>
          }>
            <LoginFormContent />
          </Suspense>
        </div>

        {/* Footer Copyright */}
        <div className="w-full text-center text-[10.5px] text-slate-400 font-medium pt-2">
          © 2026 EduNova Services Ltd. All rights reserved. · <Link href="/privacy" className="hover:underline">Privacy</Link> · <Link href="/terms" className="hover:underline">Terms</Link>
          <p className="mt-0.5 text-slate-400">Developed by <span className="font-bold text-slate-600">Aftabfarhan Arko</span></p>
        </div>
      </div>
    </div>
  );
}
