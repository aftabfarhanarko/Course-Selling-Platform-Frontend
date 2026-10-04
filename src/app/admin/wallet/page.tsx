"use client";

import React, { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  Search,
  Users,
  Wallet,
  X,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  RefreshCw,
  ArrowUpRight,
} from "lucide-react";
import { useAdminWalletsQuery } from "@/lib/api/admin/wallet";

type UiWallet = {
  id: number | string;
  balance: string;
  user: {
    name: string;
    email: string;
    photo: string;
  };
  createdAt: string;
};

const PAGE_SIZE = 10;

function extractList(payload: any): any[] {
  if (!payload) return [];
  if (Array.isArray(payload?.data?.items)) return payload.data.items;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
}

function extractTotal(payload: any): number | null {
  const candidates = [payload?.data?.meta?.total, payload?.meta?.total];
  for (const v of candidates) {
    const n = Number(v);
    if (Number.isFinite(n) && n >= 0) return n;
  }
  return null;
}

function formatDate(value: unknown): string {
  if (!value) return "—";
  const d = new Date(String(value));
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function toUi(raw: any): UiWallet | null {
  const id = raw?.id;
  if (!id) return null;
  const user = raw?.user || {};
  return {
    id,
    balance: raw?.balance ?? "0.00",
    user: {
      name: user.name || "—",
      email: user.email || "—",
      photo: user.photo || "",
    },
    createdAt: formatDate(raw?.createdAt),
  };
}

function Avatar({ name, src }: { name: string; src?: string }) {
  if (src && src.startsWith("http")) {
    return (
      <img
        src={src}
        alt={name}
        className="w-9 h-9 rounded-xl object-cover flex-shrink-0 ring-2 ring-slate-100 shadow-xs"
      />
    );
  }
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
  const colors = [
    "bg-indigo-500 text-white",
    "bg-emerald-500 text-white",
    "bg-violet-500 text-white",
    "bg-amber-500 text-white",
    "bg-purple-500 text-white",
  ];
  const idx = name.charCodeAt(0) % colors.length;
  return (
    <div
      className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black flex-shrink-0 shadow-xs ${colors[idx]}`}
    >
      {initials || "?"}
    </div>
  );
}

export default function AdminWalletPage(): React.JSX.Element {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, refetch } = useAdminWalletsQuery({
    search,
    page,
    limit: PAGE_SIZE,
  });

  const list = useMemo(
    () => extractList(data).map(toUi).filter(Boolean) as UiWallet[],
    [data],
  );
  const total = extractTotal(data);
  const totalPages = Math.max(
    1,
    total !== null
      ? Math.ceil(total / PAGE_SIZE)
      : Math.ceil(list.length / PAGE_SIZE) || 1,
  );
  const totalCount = total ?? list.length;
  const totalBalance = list
    .reduce((acc, curr) => acc + Number(curr.balance), 0)
    .toFixed(2);

  const pagination = (
    <div className="px-5 py-4 border-t border-slate-100 flex items-center justify-between gap-3 flex-wrap bg-slate-50/50">
      <p className="text-xs font-semibold text-slate-500">
        Showing{" "}
        <span className="font-bold text-slate-900">
          {list.length > 0 ? (page - 1) * PAGE_SIZE + 1 : 0}–
          {Math.min(page * PAGE_SIZE, total ?? list.length)}
        </span>{" "}
        of <span className="font-bold text-slate-900">{total ?? list.length}</span>
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page <= 1}
          className="h-9 px-3 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition-colors shadow-2xs cursor-pointer"
        >
          <ChevronLeft size={16} /> Prev
        </button>
        <span className="text-xs font-extrabold text-slate-700 px-2">
          {page} / {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page >= totalPages}
          className="h-9 px-3 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition-colors shadow-2xs cursor-pointer"
        >
          Next <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50/70 p-4 sm:p-6 text-slate-900 space-y-6">
      {/* Executive Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 text-white shadow-xl shadow-indigo-950/10 border border-slate-800">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md flex items-center justify-center text-white shadow-lg">
              <Wallet size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
                  User Wallets
                </h1>
                <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Live Balances
                </span>
              </div>
              <p className="text-sm text-slate-300 font-medium mt-1">
                Monitor user wallet balances, credits, and account histories.
              </p>
            </div>
          </div>

          <button
            onClick={() => refetch()}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 text-xs font-bold text-white transition-all active:scale-95 cursor-pointer self-start md:self-auto"
          >
            <RefreshCw size={14} />
            <span>Refresh Wallets</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                Total Wallet Balance
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                <TrendingUp size={10} /> Active
              </span>
            </div>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight font-mono">
              ৳
              {Number(totalBalance).toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <Wallet size={22} />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                Total Active Wallets
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-black text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full">
                <Users size={10} /> Users
              </span>
            </div>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">
              {totalCount.toLocaleString()}
            </h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-[#5B50E6] border border-indigo-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <Users size={22} />
          </div>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-4">
        <div className="relative flex items-center">
          <Search size={16} className="absolute left-3.5 text-slate-400" />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search by user name or email..."
            className="w-full pl-10 pr-10 py-2.5 text-xs font-semibold text-slate-800 placeholder:text-slate-400 outline-none bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#5B50E6] focus:ring-2 focus:ring-[#5B50E6]/10 transition-all"
          />
          {search && (
            <button
              onClick={() => {
                setSearch("");
                setPage(1);
              }}
              className="absolute right-3.5 text-slate-400 hover:text-slate-600 p-0.5"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70">
                <th className="text-[10px] font-black text-slate-400 uppercase tracking-wider px-6 py-3.5">
                  User
                </th>
                <th className="text-[10px] font-black text-slate-400 uppercase tracking-wider px-6 py-3.5">
                  Current Balance
                </th>
                <th className="text-[10px] font-black text-slate-400 uppercase tracking-wider px-6 py-3.5">
                  Created Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-xs font-semibold text-slate-400">
                    <Loader2 className="h-5 w-5 animate-spin mx-auto mb-2 text-[#5B50E6]" />
                    Loading wallet records...
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-xs font-semibold text-rose-600">
                    Failed to load wallets
                  </td>
                </tr>
              ) : list.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-14 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center">
                        <Wallet size={18} className="text-slate-400" />
                      </div>
                      <p className="text-xs font-semibold text-slate-400">
                        No wallets found matching your search.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                list.map((m) => (
                  <tr key={String(m.id)} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <Avatar name={m.user.name} src={m.user.photo} />
                        <div>
                          <p className="text-xs font-bold text-slate-900 leading-tight">
                            {m.user.name}
                          </p>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            {m.user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-mono">
                      <span className="inline-flex items-center gap-1 text-xs font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                        ৳
                        {Number(m.balance).toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs font-semibold text-slate-500 font-mono">
                      {m.createdAt}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {pagination}
      </div>

      {/* Mobile View Cards */}
      <div className="md:hidden space-y-3">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-5 w-5 animate-spin text-[#5B50E6]" />
          </div>
        ) : isError ? (
          <div className="text-center py-12 text-rose-600 font-bold text-xs">
            Failed to load wallets
          </div>
        ) : list.length === 0 ? (
          <div className="flex flex-col items-center py-12 gap-2">
            <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center">
              <Wallet size={18} className="text-slate-400" />
            </div>
            <p className="text-slate-400 font-semibold text-xs">No wallets found.</p>
          </div>
        ) : (
          list.map((m) => (
            <div key={String(m.id)} className="bg-white rounded-2xl border border-slate-200/80 p-4 space-y-3 shadow-sm">
              <div className="flex items-center gap-3">
                <Avatar name={m.user.name} src={m.user.photo} />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-slate-900 truncate">
                    {m.user.name}
                  </p>
                  <p className="text-[11px] text-slate-500 truncate">
                    {m.user.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Balance
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full font-mono">
                  ৳
                  {Number(m.balance).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
          ))
        )}

        {list.length > 0 && <div className="mt-4">{pagination}</div>}
      </div>
    </div>
  );
}
