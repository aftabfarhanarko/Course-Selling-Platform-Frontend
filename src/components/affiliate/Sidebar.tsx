"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HandCoins,
  LayoutDashboard,
  LogOut,
  Wallet,
  CreditCard,
  X,
  Sparkles,
  Home,
  ChevronRight,
  GraduationCap,
} from "lucide-react";
import Image from "next/image";
import { useLogoutMutation } from "@/lib/api/authApi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/authSlice";
import { baseApi } from "@/lib/api/baseApi";
import { toast } from "sonner";
import type { RootState } from "@/store";

const menuGroups = [
  {
    label: "Overview",
    items: [
      {
        name: "Dashboard",
        href: "/affiliate/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    label: "Finance",
    items: [
      { name: "Wallet", href: "/affiliate/dashboard/wallet", icon: Wallet },
      {
        name: "Payment Methods",
        href: "/affiliate/dashboard/payment-methods",
        icon: CreditCard,
      },
      {
        name: "Withdraw",
        href: "/affiliate/dashboard/withdraw",
        icon: HandCoins,
      },
    ],
  },
];

export default function Sidebar({ onClose }: { onClose?: () => void }) {
  const authUser = useSelector((state: RootState) => state.auth.user);
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [logoutApi, { isLoading: isLoggingOut }] = useLogoutMutation();

  const displayName =
    String(
      authUser?.name ?? authUser?.fullName ?? authUser?.username ?? "",
    ).trim() || "Affiliate";
  const email = String(authUser?.email ?? "").trim();

  const avatarUrlRaw =
    authUser?.photo ??
    authUser?.avatar ??
    authUser?.image ??
    authUser?.profileImage ??
    null;
  const avatarUrl =
    typeof avatarUrlRaw === "string" && avatarUrlRaw.trim().length > 0
      ? avatarUrlRaw.trim()
      : null;

  const roleRaw = String(authUser?.role ?? "affiliate");
  const badge = roleRaw.replace(/_/g, " ").toUpperCase();

  const handleLogout = async () => {
    try {
      onClose?.();
      await logoutApi().unwrap().catch(() => {});
    } catch {}
    dispatch(logout());
    dispatch(baseApi.util.resetApiState());
    toast.success("Signed out");
    window.location.href = "/login";
  };

  return (
    <aside className="relative z-50 flex h-full w-[240px] flex-col border-r border-slate-200/80 bg-white shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      {/* Brand Header */}
      <div className="p-4 pb-3 flex flex-col items-start gap-2 border-b border-slate-100">
        <div className="flex items-center justify-between w-full">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight text-slate-900 leading-none">
                Edu<span className="text-emerald-600">Nova</span>
              </span>
              <span className="text-[10px] font-bold text-slate-400 tracking-wider">
                Affiliate Portal
              </span>
            </div>
          </Link>

          {onClose && (
            <button
              onClick={onClose}
              className="flex cursor-pointer items-center justify-center rounded-xl bg-slate-100 p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 lg:hidden transition-colors"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* User Profile Banner */}
      <div className="p-3">
        <div className="rounded-2xl border border-slate-200/80 bg-gradient-to-b from-slate-50 to-white p-3.5 shadow-2xs space-y-3">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 p-0.5 shadow-sm">
                {avatarUrl ? (
                  <Image
                    src={avatarUrl}
                    alt={displayName}
                    width={44}
                    height={44}
                    className="h-full w-full rounded-[14px] bg-white object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-extrabold text-sm">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-400" />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="truncate text-xs font-bold text-slate-900 leading-tight">
                {displayName}
              </h3>
              <p className="truncate text-[10px] font-medium text-slate-400 mt-0.5">
                {email || "affiliate@edunova.io"}
              </p>
              <span className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-100 text-[9px] font-black text-emerald-700 uppercase tracking-wider">
                <Sparkles size={9} />
                {badge}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-3 space-y-4 overflow-y-auto custom-sidebar-scrollbar pt-1">
        {/* Main Website Link */}
        <div>
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all group"
          >
            <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
              <Home size={14} />
            </div>
            <span>Main Website</span>
            <ChevronRight size={14} className="ml-auto text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all" />
          </Link>
        </div>

        {menuGroups.map((group) => (
          <div key={group.label} className="space-y-1">
            <p className="px-3 text-[10px] font-black tracking-widest text-slate-400 uppercase">
              {group.label}
            </p>

            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.name === "Dashboard"
                    ? pathname === item.href
                    : pathname === item.href || pathname?.startsWith(item.href + "/");

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={onClose}
                    className={`relative flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 group ${
                      isActive
                        ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/20"
                        : "text-slate-600 hover:bg-emerald-50/60 hover:text-emerald-700"
                    }`}
                  >
                    <Icon
                      size={16}
                      className={`shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                        isActive ? "text-white" : "text-slate-400 group-hover:text-emerald-600"
                      }`}
                    />
                    <span className="truncate">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Sign Out Button */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/60 space-y-1.5">
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs transition-colors cursor-pointer disabled:opacity-50"
        >
          <LogOut size={14} />
          <span>{isLoggingOut ? "Signing out..." : "Sign Out"}</span>
        </button>
      </div>
    </aside>
  );
}
