"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Bell,
  Menu,
  Search,
  LogOut,
  User,
  ChevronDown,
  CheckCheck,
  Clock,
  Loader2,
  Plus,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "@/lib/api/authApi";
import { logout } from "@/store/slices/authSlice";
import { baseApi } from "@/lib/api/baseApi";
import { RootState } from "@/store";
import { toast } from "sonner";
import {
  useGetNotificationsQuery,
  useMarkAllNotificationsReadMutation,
  useMarkNotificationReadMutation,
  NotificationItem,
} from "@/lib/api/notificationApi";

export default function TopNavbar({
  onMenuClick,
  onClose,
}: {
  onMenuClick?: () => void;
  onClose?: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const [logoutApi, { isLoading: isLoggingOut }] = useLogoutMutation();
  const { data: notifData, isLoading: isNotifLoading } = useGetNotificationsQuery();
  const [markAllRead] = useMarkAllNotificationsReadMutation();
  const [markRead] = useMarkNotificationReadMutation();

  const rawNotifications = notifData?.data;
  const notifications: NotificationItem[] = Array.isArray(rawNotifications)
    ? rawNotifications
    : Array.isArray(notifData)
    ? (notifData as unknown as NotificationItem[])
    : Array.isArray((rawNotifications as any)?.notifications)
    ? (rawNotifications as any).notifications
    : [];

  const unreadCount = notifications.filter((n) => !n?.isRead).length;

  const authUser = useSelector((state: RootState) => state.auth.user);

  const displayName =
    String(
      authUser?.name ?? authUser?.fullName ?? authUser?.username ?? "",
    ).trim() || "Admin";
  const email = String(authUser?.email ?? "").trim();
  const roleName = String(authUser?.role ?? "SUPER ADMIN")
    .replace(/_/g, " ")
    .toUpperCase();

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

  const initials = displayName
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
      if (
        notifRef.current &&
        !notifRef.current.contains(e.target as Node)
      ) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      setDropdownOpen(false);
      onClose?.();
      await logoutApi().unwrap().catch(() => {});
    } catch {}
    dispatch(logout());
    dispatch(baseApi.util.resetApiState());
    toast.success("Signed out");
    window.location.href = "/login";
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200/80 bg-white/85 backdrop-blur-xl px-4 sm:px-6 shadow-2xs">
      {/* Left: Mobile Toggle & Global Search */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <button
          onClick={onMenuClick}
          className="lg:hidden flex items-center justify-center w-9 h-9 rounded-xl hover:bg-slate-100 transition-colors text-slate-700"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-full max-w-sm hidden sm:block">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search courses, users, bookings..."
            className="w-full bg-slate-50/80 border border-slate-200/80 rounded-xl py-2 pl-10 pr-12 text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#5B50E6] focus:bg-white focus:ring-2 focus:ring-[#5B50E6]/10 transition-all"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded border border-slate-200 bg-white text-[10px] font-bold text-slate-400 font-mono">
            ⌘K
          </span>
        </div>
      </div>

      {/* Right: Quick Action, Status Badge, Notifications, User */}
      <div className="flex items-center gap-3">
        {/* Quick Add Course Button */}
        <button
          onClick={() => router.push("/admin/courses")}
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#5B50E6] hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-sm shadow-indigo-500/20 active:scale-95 cursor-pointer"
        >
          <Plus size={14} />
          <span>New Course</span>
        </button>

        {/* Security Status Indicator Pill */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-bold text-slate-700">
          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
          <span>Vault Secure</span>
        </div>

        {/* Notification Bell Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen((prev) => !prev)}
            className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-slate-100/80 hover:bg-indigo-50 border border-slate-200/60 text-slate-600 hover:text-[#5B50E6] transition-all cursor-pointer group"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4 transition-colors" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-rose-600 px-1 text-[9px] font-black text-white border-2 border-white animate-pulse">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Popover */}
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border border-slate-200 bg-white/95 backdrop-blur-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/80">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">
                    Notifications
                  </h4>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-600 text-[10px] font-bold">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={() => markAllRead()}
                    className="text-[11px] font-bold text-[#5B50E6] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <CheckCheck size={14} /> Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                {isNotifLoading ? (
                  <div className="p-6 text-center text-slate-400 flex items-center justify-center gap-2">
                    <Loader2 size={16} className="animate-spin text-[#5B50E6]" />
                    <span className="text-xs font-semibold">Loading...</span>
                  </div>
                ) : notifications.length === 0 ? (
                  <div className="p-6 text-center text-slate-400 text-xs font-medium">
                    No new notifications.
                  </div>
                ) : (
                  notifications.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => markRead(item.id)}
                      className={`p-3.5 hover:bg-slate-50 transition-colors cursor-pointer flex items-start gap-3 ${
                        !item.isRead ? "bg-indigo-50/30" : ""
                      }`}
                    >
                      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-[#5B50E6]">
                        <Bell size={14} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <p className="text-xs font-bold text-slate-900 truncate">
                            {item.title}
                          </p>
                          {!item.isRead && (
                            <span className="h-2 w-2 rounded-full bg-[#5B50E6] shrink-0" />
                          )}
                        </div>
                        <p className="text-[11px] text-slate-600 line-clamp-2 mt-0.5">
                          {item.message}
                        </p>
                        <p className="text-[9px] text-slate-400 mt-1 flex items-center gap-1 font-mono">
                          <Clock size={10} />
                          {new Date(item.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Pill */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-100 transition-all border border-slate-200/60 cursor-pointer group bg-white shadow-2xs"
          >
            <div className="relative h-8 w-8 shrink-0 rounded-lg overflow-hidden bg-[#5B50E6] text-white flex items-center justify-center text-xs font-extrabold shadow-sm">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={displayName}
                  className="w-full h-full object-cover"
                />
              ) : (
                initials
              )}
            </div>

            <div className="hidden sm:flex flex-col items-start text-left pr-1">
              <span className="text-xs font-bold text-slate-800 leading-tight">
                {displayName}
              </span>
              <span className="text-[9px] font-black text-[#5B50E6] tracking-wider uppercase">
                {roleName}
              </span>
            </div>

            <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-transform duration-200" />
          </button>

          {/* User Popover Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-200 bg-white/95 backdrop-blur-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
              <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/80">
                <p className="text-xs font-bold text-slate-900 truncate">
                  {displayName}
                </p>
                {email && (
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">
                    {email}
                  </p>
                )}
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    router.push("/admin/dashboard");
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-[#5B50E6] transition-colors"
                >
                  <User className="w-4 h-4 text-slate-400" />
                  Admin Profile
                </button>
                <Link
                  href="/"
                  onClick={() => setDropdownOpen(false)}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-[#5B50E6] transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                  View Storefront
                </Link>
              </div>

              <div className="border-t border-slate-100 py-1">
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors disabled:opacity-50"
                >
                  <LogOut className="w-4 h-4" />
                  {isLoggingOut ? "Signing out…" : "Sign Out"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}