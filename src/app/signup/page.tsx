"use client";
import React, { useEffect, useRef, useState, Suspense } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import SignupLotti from "@/components/signup/Lotti";
import { useRegisterMutation } from "@/lib/api/authApi";
import { uploadImageToImgBB } from "@/lib/images.upload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Eye,
  EyeOff,
  ArrowRight,
  Check,
  Loader2,
  Camera,
  Upload,
  User,
  Mail,
  Lock,
  Phone,
  Sparkles,
  Shield,
  ShieldCheck,
  Star,
  GraduationCap,
  ChevronLeft,
  UserPlus,
  Target,
} from "lucide-react";
import { toast } from "sonner";

type SignupFormData = {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  password: string;
};

function SignupFormContent(): React.JSX.Element {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toastIdRef = useRef<string | number | null>(null);
  const [countries, setCountries] = useState<string[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);

  const [
    registerUser,
    {
      isLoading: isRegisterLoading,
      isSuccess: isRegisterSuccess,
      isError: isRegisterError,
      error: registerError,
    },
  ] = useRegisterMutation();

  const getApiErrorMessage = (error: unknown): string => {
    if (!error) return "Registration failed";
    if (typeof error === "string") return error;
    if (error instanceof Error) return error.message || "Registration failed";

    const anyErr = error as any;
    const data = anyErr?.data;

    if (typeof data === "string") return data;
    if (typeof data?.message === "string") return data.message;
    if (typeof data?.error === "string") return data.error;
    if (Array.isArray(data?.message))
      return data.message.filter((x: any) => typeof x === "string").join(", ");

    if (typeof anyErr?.error === "string") return anyErr.error;

    try {
      return JSON.stringify(data ?? error);
    } catch {
      return "Registration failed";
    }
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      country: "",
      password: "",
    },
  });

  useEffect(() => {
    let active = true;

    fetch("/cuntrey.json")
      .then((res) => res.json())
      .then((data: Array<{ name?: unknown }>) => {
        if (!active) return;
        const names = data
          .map((x) => (typeof x?.name === "string" ? x.name : null))
          .filter((x): x is string => !!x);
        const withOther = names.includes("Other") ? names : [...names, "Other"];
        setCountries(withOther);
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const id = toastIdRef.current;
    if (!id) return;

    if (isRegisterSuccess) {
      setSuccess(true);
      toast.success("Account created!", { id });
      toastIdRef.current = null;
      return;
    }

    if (isRegisterError) {
      toast.error(getApiErrorMessage(registerError), { id });
      toastIdRef.current = null;
    }
  }, [getApiErrorMessage, isRegisterError, isRegisterSuccess, registerError]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedPhoto(file);
      setPhotoName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit: SubmitHandler<SignupFormData> = async (data) => {
    if (!selectedPhoto) {
      toast.error("Please upload a profile photo");
      return;
    }

    const toastId = toast.loading("Creating account...");

    try {
      const photoUrl = await uploadImageToImgBB(selectedPhoto);

      const searchParams = new URLSearchParams(window.location.search);
      const requestedRole = searchParams.get("role");
      const finalRole = requestedRole === "affiliate" ? "affiliate" : "student";

      await registerUser({
        name: data.fullName,
        email: data.email,
        phone: data.phone,
        country: data.country,
        password: data.password,
        photo: photoUrl,
        role: finalRole,
      }).unwrap();

      setSuccess(true);
      toast.success("Account created successfully!", { id: toastId });
    } catch (err) {
      const message =
        typeof err === "object" && err && "data" in err
          ? (err as any).data?.message || "Registration failed"
          : err instanceof Error
            ? err.message
            : "Registration failed";
      toast.error(message, { id: toastId });
    }
  };

  return (
    <div className="w-full max-w-[440px] mx-auto">
      {/* Brand Logo Box */}
      <div className="flex flex-col items-center mb-5">
        <div className="w-14 h-14 rounded-2xl bg-[#5B50E6] text-white flex items-center justify-center shadow-lg shadow-indigo-500/25 mb-2.5">
          <GraduationCap className="w-8 h-8 stroke-[2.2]" />
        </div>
        <h3 className="text-xl font-black text-slate-900 tracking-tight">EduNova</h3>

        {/* Auth Tag Pill */}
        <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[#5B50E6] text-[10.5px] font-black uppercase tracking-widest">
          <UserPlus className="w-3 h-3" />
          <span>STUDENT REGISTRATION</span>
        </div>
      </div>

      {/* Title */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-black text-slate-900 flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-[#5B50E6]" />
          <span>Create Account</span>
        </h1>
        <p className="text-xs font-medium text-slate-400 mt-1">
          Enter your details below to create your EduNova account.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
        {/* Photo Upload Dropzone */}
        <div className="space-y-1">
          <label className="text-[10.5px] font-black text-slate-400 uppercase tracking-widest ml-1">
            PROFILE PHOTO
          </label>
          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-full bg-white border border-slate-200 hover:border-[#5B50E6] hover:bg-indigo-50/30 rounded-xl p-3 cursor-pointer transition-all flex items-center gap-3 group shadow-2xs"
          >
            <div className="w-10 h-10 rounded-lg overflow-hidden bg-indigo-50 border border-indigo-100 shrink-0 flex items-center justify-center">
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Camera className="w-5 h-5 text-[#5B50E6] group-hover:scale-110 transition-transform" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-extrabold text-slate-700 group-hover:text-[#5B50E6] transition-colors truncate">
                {photoName ? photoName : "Upload Profile Photo"}
              </p>
              <p className="text-[10.5px] text-slate-400 font-medium">
                JPG, PNG or GIF (Max 5MB)
              </p>
            </div>
            <Upload className="w-4 h-4 text-slate-400 group-hover:text-[#5B50E6] transition-colors shrink-0" />
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoChange}
          />
        </div>

        {/* Full Name */}
        <div className="space-y-1">
          <label className="text-[10.5px] font-black text-slate-400 uppercase tracking-widest ml-1">
            FULL NAME
          </label>
          <div className="relative flex items-center">
            <User className="absolute left-3.5 text-slate-400 w-4 h-4 pointer-events-none" />
            <input
              {...register("fullName", { required: "Full name is required" })}
              type="text"
              placeholder="John Doe"
              className="w-full bg-white border border-slate-200 focus:border-[#5B50E6] focus:ring-4 focus:ring-[#5B50E6]/10 rounded-xl py-3 pl-10 pr-4 text-xs font-semibold text-slate-700 outline-none transition-all placeholder:text-slate-400"
            />
          </div>
          {errors.fullName && (
            <p className="text-[11px] text-red-500 font-bold ml-1">{errors.fullName.message}</p>
          )}
        </div>

        {/* Email Address */}
        <div className="space-y-1">
          <label className="text-[10.5px] font-black text-slate-400 uppercase tracking-widest ml-1">
            EMAIL ADDRESS
          </label>
          <div className="relative flex items-center">
            <Mail className="absolute left-3.5 text-slate-400 w-4 h-4 pointer-events-none" />
            <input
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
              })}
              type="email"
              placeholder="name@example.com"
              className="w-full bg-white border border-slate-200 focus:border-[#5B50E6] focus:ring-4 focus:ring-[#5B50E6]/10 rounded-xl py-3 pl-10 pr-4 text-xs font-semibold text-slate-700 outline-none transition-all placeholder:text-slate-400"
            />
          </div>
          {errors.email && (
            <p className="text-[11px] text-red-500 font-bold ml-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label className="text-[10.5px] font-black text-slate-400 uppercase tracking-widest ml-1">
            PASSWORD
          </label>
          <div className="relative flex items-center">
            <Lock className="absolute left-3.5 text-slate-400 w-4 h-4 pointer-events-none" />
            <input
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
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
            <p className="text-[11px] text-red-500 font-bold ml-1">{errors.password.message}</p>
          )}
        </div>

        {/* Phone & Country Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[10.5px] font-black text-slate-400 uppercase tracking-widest ml-1">
              PHONE NUMBER
            </label>
            <div className="relative flex items-center">
              <Phone className="absolute left-3.5 text-slate-400 w-4 h-4 pointer-events-none" />
              <input
                {...register("phone", {
                  required: "Phone is required",
                  pattern: {
                    value: /^[+]?[\d\s\-()]{7,15}$/,
                    message: "Invalid phone",
                  },
                })}
                type="tel"
                placeholder="+880 1700..."
                className="w-full bg-white border border-slate-200 focus:border-[#5B50E6] focus:ring-4 focus:ring-[#5B50E6]/10 rounded-xl py-3 pl-10 pr-4 text-xs font-semibold text-slate-700 outline-none transition-all placeholder:text-slate-400"
              />
            </div>
            {errors.phone && (
              <p className="text-[11px] text-red-500 font-bold ml-1">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-[10.5px] font-black text-slate-400 uppercase tracking-widest ml-1">
              COUNTRY
            </label>
            <Controller
              control={control}
              name="country"
              rules={{ required: "Country is required" }}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    className={`w-full bg-white border ${
                      errors.country ? "border-red-400" : "border-slate-200"
                    } focus:border-[#5B50E6] focus:ring-4 focus:ring-[#5B50E6]/10 rounded-xl px-3 py-3 text-xs outline-none transition-all text-slate-700 font-semibold cursor-pointer`}
                  >
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.country && (
              <p className="text-[11px] text-red-500 font-bold ml-1">{errors.country.message}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || isRegisterLoading || success}
          className="w-full bg-[#5B50E6] hover:bg-[#4D42DB] text-white font-extrabold py-3.5 rounded-2xl transition-all shadow-lg shadow-indigo-500/25 active:scale-[0.98] disabled:opacity-70 text-xs flex items-center justify-center gap-2 mt-2 cursor-pointer"
        >
          {isSubmitting || isRegisterLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : success ? (
            <>
              <Check className="w-4 h-4" />
              <span>Account Created!</span>
            </>
          ) : (
            <>
              <span>Create Free Account</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Login Link */}
      <p className="text-center text-xs text-slate-400 mt-5 font-medium">
        Already have an account?{" "}
        <Link href="/login" className="text-[#5B50E6] font-black hover:underline">
          Sign In →
        </Link>
      </p>

      {/* Trust Footer */}
      <div className="mt-5 pt-4 border-t border-slate-200/60 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[10.5px] font-bold text-slate-400">
        <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> SSL Encrypted</span>
        <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-blue-500" /> Privacy Protected</span>
        <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-500" /> Trusted by 50K+</span>
      </div>
    </div>
  );
}

export default function SignupPage(): React.JSX.Element {
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
          <SignupLotti />
        </div>

        {/* Text Content & Feature Bullets */}
        <div className="w-full max-w-md text-center space-y-3 pb-2">
          <h2 className="text-2xl xl:text-3xl font-black text-slate-900 tracking-tight">
            Start Your Journey with <span className="text-[#5B50E6]">EduNova</span>
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
          <Suspense
            fallback={
              <div className="w-full max-w-[440px] mx-auto h-96 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-[#5B50E6]" />
              </div>
            }
          >
            <SignupFormContent />
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

