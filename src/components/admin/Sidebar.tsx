"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  LayoutDashboard,
  Users,
  Layers,
  GraduationCap,
  Wallet,
  Banknote,
  ClipboardList,
  CreditCard,
  ShoppingBag,
  BarChart2,
  LogOut,
  X,
  ChevronRight,
  Sparkles,
  BookOpen,
  Search,
  Ticket,
  ShieldCheck,
} from "lucide-react";
import { useLogoutMutation } from "@/lib/api/authApi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/authSlice";
import { baseApi } from "@/lib/api/baseApi";
import { toast } from "sonner";
import type { RootState } from "@/store";
import { motion, AnimatePresence } from "framer-motion";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
      { label: "Enrollments", href: "/admin/enrollments", icon: ClipboardList, badge: "Live" },
    ],
  },
  {
    label: "People",
    items: [
      { label: "Users", href: "/admin/users", icon: Users },
      { label: "Instructors", href: "/admin/instructor", icon: GraduationCap },
    ],
  },
  {
    label: "Finance",
    items: [
      { label: "Wallet", href: "/admin/wallet", icon: Wallet },
      { label: "Payment Methods", href: "/admin/paymentMethods", icon: CreditCard },
      { label: "Withdrawals", href: "/admin/withdraw", icon: Banknote },
    ],
  },
  {
    label: "Content",
    items: [
      { label: "Products", href: "/admin/products", icon: ShoppingBag },
      { label: "Shop", href: "/admin/shop", icon: ShoppingBag },
      { label: "Category", href: "/admin/category", icon: Layers },
      { label: "Courses", href: "/admin/courses", icon: BookOpen },
      { label: "Coupons", href: "/admin/coupons", icon: Ticket },
      { label: "Percentage", href: "/admin/percentage", icon: BarChart2 },
    ],
  },
];

export default function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [logoutApi, { isLoading: isLoggingOut }] = useLogoutMutation();

  const [searchQuery, setSearchQuery] = useState("");
  const [openGroups, setOpenGroups] = useState<string[]>([
    "Overview",
    "People",
    "Finance",
    "Content",
  ]);

  const authUser = useSelector((state: RootState) => state.auth.user);

  const displayName =
    String(
      authUser?.name ?? authUser?.fullName ?? authUser?.username ?? "",
    ).trim() || "Admin";
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

  const initials = displayName
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

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

  const isSearchMatch = (text: string, query: string) => {
    if (!query.trim()) return true;
    const cleanText = text.toLowerCase();
    const queryTokens = query.toLowerCase().trim().split(/\s+/);
    return queryTokens.every((token) => cleanText.includes(token));
  };

  const filteredNavGroups = useMemo(() => {
    if (!searchQuery.trim()) return navGroups;

    return navGroups
      .map((group) => {
        const matchedItems = group.items.filter(
          (item) =>
            isSearchMatch(item.label, searchQuery) ||
            isSearchMatch(item.href, searchQuery),
        );
        if (matchedItems.length > 0 || isSearchMatch(group.label, searchQuery)) {
          return {
            ...group,
            items: matchedItems.length > 0 ? matchedItems : group.items,
          };
        }
        return null;
      })
      .filter((g): g is NavGroup => g !== null);
  }, [searchQuery]);

  useEffect(() => {
    const activeGroup = navGroups.find((g) =>
      g.items.some(
        (item) =>
          pathname === item.href || pathname?.startsWith(item.href + "/"),
      ),
    );
    if (activeGroup && !openGroups.includes(activeGroup.label)) {
      setOpenGroups((prev) => [...prev, activeGroup.label]);
    }
  }, [pathname]);

  return (
    <aside className="relative z-50 flex h-full w-[260px] flex-col border-r border-slate-200/80 bg-white shadow-[6px_0_30px_rgba(0,0,0,0.015)]">
      {/* Brand & Super Admin Badge Header */}
      <div className="p-4 pb-3 flex flex-col items-start gap-2.5 border-b border-slate-100 bg-gradient-to-b from-slate-50/60 to-white">
        <div className="flex items-center justify-between w-full">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-[#5B50E6] via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-[#5B50E6]/25 group-hover:scale-105 transition-transform duration-300">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight text-slate-900 leading-none">
                Edu<span className="text-[#5B50E6]">Nova</span>
              </span>
              <span className="text-[10px] font-bold text-slate-400 tracking-wider">
                Admin Console
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

        <div className="flex items-center gap-2 w-full pt-1">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100/90 text-[10px] font-black text-[#5B50E6] tracking-wider uppercase">
            <ShieldCheck size={12} className="text-[#5B50E6]" />
            SUPER ADMIN
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-50 text-[10px] font-bold text-emerald-600 border border-emerald-100/90 ml-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            v2.4
          </span>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="px-3 pt-3 pb-1">
        <div className="relative flex items-center">
          <Search className="absolute left-3 text-slate-400 w-4 h-4 pointer-events-none" />
          <input
            type="text"
            placeholder="Search menu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200/80 rounded-xl py-2 pl-9 pr-7 text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#5B50E6] focus:bg-white focus:ring-2 focus:ring-[#5B50E6]/10 transition-all shadow-2xs"
          />
          {searchQuery ? (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2 text-slate-400 hover:text-slate-600 p-0.5"
            >
              <X size={12} />
            </button>
          ) : (
            <span className="absolute right-2.5 text-[9px] font-bold text-slate-300 font-mono pointer-events-none">
              ⌘K
            </span>
          )}
        </div>
      </div>

      {/* Navigation Menu with Ultra-Thin Custom Scrollbar */}
      <nav
        className="flex-1 px-3 py-2 space-y-4 overflow-y-auto custom-sidebar-scrollbar
          [scrollbar-width:thin] [scrollbar-color:rgba(91,80,230,0.25)_transparent]
          [&::-webkit-scrollbar]:w-[3.5px]
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-[#5B50E6]/25
          hover:[&::-webkit-scrollbar-thumb]:bg-[#5B50E6]/50
        "
      >
        {/* Main Website Quick Link */}
        <div>
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all duration-200 group"
          >
            <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-[#5B50E6]/10 group-hover:text-[#5B50E6] transition-colors">
              <Home size={14} />
            </div>
            <span>Main Website</span>
            <ChevronRight size={14} className="ml-auto text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all" />
          </Link>
        </div>

        {filteredNavGroups.map((group) => {
          const isExpanded = openGroups.includes(group.label);
          const toggleGroup = () => {
            setOpenGroups((prev) =>
              prev.includes(group.label)
                ? prev.filter((g) => g !== group.label)
                : [...prev, group.label],
            );
          };

          return (
            <div key={group.label} className="space-y-1">
              <button
                onClick={toggleGroup}
                className="w-full flex items-center justify-between px-3 py-1 text-[10px] font-black tracking-widest text-slate-400 uppercase hover:text-slate-600 transition-colors cursor-pointer"
              >
                <span>{group.label}</span>
                <ChevronRight
                  size={12}
                  className={`transition-transform duration-200 ${
                    isExpanded ? "rotate-90" : ""
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.18, ease: "easeInOut" }}
                    className="space-y-1 overflow-hidden pt-0.5"
                  >
                    {group.items.map((item) => {
                      const isActive =
                        pathname === item.href ||
                        pathname?.startsWith(item.href + "/");
                      const Icon = item.icon;

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={onClose}
                          className={`relative flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 group ${
                            isActive
                              ? "bg-gradient-to-r from-[#5B50E6] to-[#4D42DB] text-white shadow-[0_4px_16px_rgba(91,80,230,0.3)]"
                              : "text-slate-600 hover:bg-indigo-50/70 hover:text-[#5B50E6]"
                          }`}
                        >
                          {isActive && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-white rounded-r-full shadow-sm" />
                          )}

                          <Icon
                            size={16}
                            className={`shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                              isActive ? "text-white" : "text-slate-400 group-hover:text-[#5B50E6]"
                            }`}
                          />
                          <span className="truncate">{item.label}</span>
                          {item.badge && (
                            <span
                              className={`ml-auto text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${
                                isActive
                                  ? "bg-white/20 text-white"
                                  : "bg-emerald-100 text-emerald-700"
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>

      {/* User Profile Strip & Sign Out Footer */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/70 space-y-2">
        <div className="flex items-center gap-3 px-2 py-1.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
          <div className="w-8 h-8 rounded-lg overflow-hidden bg-[#5B50E6] flex items-center justify-center text-white text-xs font-black shrink-0 shadow-2xs">
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
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-slate-800 truncate leading-tight">
              {displayName}
            </p>
            <p className="text-[10px] font-semibold text-slate-400 truncate">
              {email || "Administrator"}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs transition-colors cursor-pointer disabled:opacity-50 active:scale-95"
        >
          <LogOut size={14} />
          <span>{isLoggingOut ? "Signing out..." : "Sign Out"}</span>
        </button>
      </div>
    </aside>
  );
}
