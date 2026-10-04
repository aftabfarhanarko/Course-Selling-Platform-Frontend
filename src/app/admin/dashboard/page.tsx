"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Users,
  Wallet,
  ReceiptText,
  TrendingUp,
  TrendingDown,
  ChevronRight,
  Search,
  SlidersHorizontal,
  Download,
  Loader2,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  RefreshCw,
  BookOpen,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAdminDashboardStatsQuery } from "@/lib/api/statsApi";
import * as Icons from "lucide-react";

/* Fallback Data */
const FALLBACK = {
  kpis: {
    totalActiveUsers: 18420,
    revenueMTD: "$482,910",
    completedTransactions: 9271,
    totalEnrollments: 4180,
  },
  dailyData: [
    { day: "Mon", value: 210 },
    { day: "Tue", value: 246 },
    { day: "Wed", value: 198 },
    { day: "Thu", value: 288 },
    { day: "Fri", value: 314 },
    { day: "Sat", value: 260 },
    { day: "Sun", value: 231 },
  ],
  weeklyData: [
    { day: "W1", value: 268 },
    { day: "W2", value: 221 },
    { day: "W3", value: 150 },
    { day: "W4", value: 229 },
  ],
  activities: [
    { icon: "UserPlus", title: "New user registered", desc: "Sarah Jenkins joined the platform.", time: "5 MINS AGO" },
    { icon: "ShoppingCart", title: "New purchase", desc: "Pro Masterclass purchased by Mark E.", time: "12 MINS AGO" },
    { icon: "Star", title: "New review", desc: "5-star review left on UI Architecture Path.", time: "1 HOUR AGO" },
  ],
  transactions: [
    { id: "TXN-88A2F1", user: "Nabila Chowdhury", initials: "NC", product: "Enterprise Plan — Annual", amount: "$14,200.00", date: "Aug 27, 2026", status: "Success" },
    { id: "TXN-6C110E", user: "Tanvir Ahmed", initials: "TA", product: "POS Terminal ×12", amount: "$8,940.00", date: "Aug 27, 2026", status: "Success" },
    { id: "TXN-3F9D42", user: "Rezwana Karim", initials: "RK", product: "Bulk Inventory Restock", amount: "$22,650.00", date: "Aug 26, 2026", status: "Failed" },
    { id: "TXN-A15B77", user: "Imran Hossain", initials: "IH", product: "Logistics Retainer — Q3", amount: "$6,300.00", date: "Aug 26, 2026", status: "Success" },
  ],
};

/* Interactive Animated Vault Chart */
const VaultChart = ({ data }: { data: any[] }) => {
  const [progress, setProgress] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    setProgress(0);
    const start = performance.now();
    const duration = 800;
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setProgress(1 - Math.pow(1 - t, 3));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [data]);

  if (!data || data.length === 0) return null;

  const W = 600;
  const H = 210;
  const PAD = { top: 20, right: 16, bottom: 30, left: 38 };
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;

  const max = Math.max(...data.map((d: any) => d.value));
  const min = Math.min(...data.map((d: any) => d.value));
  const range = max - min || 1;

  const pts = data.map((d: any, i: number) => ({
    x: PAD.left + (i / (data.length - 1)) * innerW,
    y: PAD.top + (1 - (d.value - min) / range) * innerH,
    ...d,
  }));

  const smooth = (points: any[]) => {
    if (points.length < 2) return "";
    let d = `M ${points[0].x},${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[Math.max(i - 1, 0)];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[Math.min(i + 2, points.length - 1)];
      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;
      d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
    }
    return d;
  };

  const linePath = smooth(pts);
  const areaPath = `${linePath} L ${pts[pts.length - 1].x},${H - PAD.bottom} L ${pts[0].x},${H - PAD.bottom} Z`;
  const cols = 8;
  const rows = 4;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", overflow: "visible" }}>
      <defs>
        <linearGradient id="vaultLineGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#5B50E6" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>

        <linearGradient id="vaultAreaGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5B50E6" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#5B50E6" stopOpacity="0.0" />
        </linearGradient>

        <filter id="lineGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <clipPath id="chartReveal">
          <rect x={PAD.left} y={0} width={innerW * progress} height={H} />
        </clipPath>
      </defs>

      {/* Grid lines */}
      {Array.from({ length: rows + 1 }).map((_, i) => (
        <line
          key={`h${i}`}
          x1={PAD.left}
          y1={PAD.top + (i / rows) * innerH}
          x2={PAD.left + innerW}
          y2={PAD.top + (i / rows) * innerH}
          stroke="#F1F5F9"
          strokeWidth="1"
        />
      ))}
      {Array.from({ length: cols + 1 }).map((_, i) => (
        <line
          key={`v${i}`}
          x1={PAD.left + (i / cols) * innerW}
          y1={PAD.top}
          x2={PAD.left + (i / cols) * innerW}
          y2={PAD.top + innerH}
          stroke="#F8FAFC"
          strokeWidth="1"
        />
      ))}

      {/* Axis Day Labels */}
      {pts.map((p: any, i: number) => (
        <text
          key={i}
          x={p.x}
          y={H - 8}
          textAnchor="middle"
          fontSize="10"
          fontWeight="700"
          fill="#94A3B8"
        >
          {p.day}
        </text>
      ))}

      {/* Gradient Area Fill */}
      <path d={areaPath} fill="url(#vaultAreaGradient)" clipPath="url(#chartReveal)" />

      {/* Smooth Line Path */}
      <path
        d={linePath}
        fill="none"
        stroke="url(#vaultLineGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#lineGlow)"
        clipPath="url(#chartReveal)"
      />

      {/* Interactive Data Nodes */}
      {pts.map((p: any, i: number) => {
        const visible = p.x <= PAD.left + innerW * progress + 0.5;
        if (!visible) return null;
        const isHov = hovered === i;
        const isLast = i === pts.length - 1;
        return (
          <g key={i}>
            <rect
              x={p.x - 18}
              y={PAD.top}
              width={36}
              height={innerH}
              fill="transparent"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "pointer" }}
            />
            {isLast && (
              <circle cx={p.x} cy={p.y} r={10} fill="#10B981" opacity="0.2" className="animate-ping" />
            )}
            <circle
              cx={p.x}
              cy={p.y}
              r={isHov ? 6 : 4}
              fill={isHov ? "#5B50E6" : "#FFFFFF"}
              stroke={isHov ? "#FFFFFF" : "#5B50E6"}
              strokeWidth={isHov ? 3 : 2}
            />
            {isHov && (
              <g className="animate-in fade-in zoom-in-95 duration-150">
                <rect
                  x={p.x - 30}
                  y={p.y - 36}
                  width={60}
                  height={24}
                  rx={8}
                  fill="#0F172A"
                  className="shadow-xl"
                />
                <text
                  x={p.x}
                  y={p.y - 20}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="800"
                  fill="#FFFFFF"
                >
                  {p.value}
                </text>
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
};

/* Status Badge Component */
const StatusLed = ({ status }: { status: string }) => {
  const isOk = status === "Success";
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
        isOk
          ? "bg-emerald-50 text-emerald-700 border border-emerald-200/80"
          : "bg-rose-50 text-rose-700 border border-rose-200/80"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          isOk ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" : "bg-rose-500"
        }`}
      />
      {status}
    </span>
  );
};

export default function Dashboard() {
  const { data: statsData, isLoading, refetch } = useGetAdminDashboardStatsQuery();

  const [chartView, setChartView] = useState("Weekly");
  const [searchTx, setSearchTx] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [chartKey, setChartKey] = useState(0);

  const transactions = statsData?.transactions ?? FALLBACK.transactions;
  const dailyData = statsData?.dailyData ?? FALLBACK.dailyData;
  const weeklyData = statsData?.weeklyData ?? FALLBACK.weeklyData;
  const activities = statsData?.activities ?? FALLBACK.activities;
  const kpis = statsData?.kpis ?? FALLBACK.kpis;

  const chartData = chartView === "Daily" ? dailyData : weeklyData;

  const handleChartView = (v: string) => {
    setChartView(v);
    setChartKey((k) => k + 1);
  };

  const filtered = useMemo(
    () =>
      transactions.filter((t: any) => {
        const matchSearch =
          t.id.toLowerCase().includes(searchTx.toLowerCase()) ||
          t.user.toLowerCase().includes(searchTx.toLowerCase()) ||
          t.product.toLowerCase().includes(searchTx.toLowerCase());
        const matchStatus = statusFilter === "All" || t.status === statusFilter;
        return matchSearch && matchStatus;
      }),
    [transactions, searchTx, statusFilter]
  );

  const renderIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName] || Icons.Activity;
    return <IconComponent size={15} />;
  };

  const stats = [
    { label: "Peak", value: chartData?.length ? Math.max(...chartData.map((d: any) => d.value)) : 0 },
    { label: "Average", value: chartData?.length ? Math.round(chartData.reduce((s: number, d: any) => s + d.value, 0) / chartData.length) : 0 },
    { label: "Lowest", value: chartData?.length ? Math.min(...chartData.map((d: any) => d.value)) : 0 },
  ];

  if (isLoading) {
    return (
      <div className="min-h-[80vh] bg-slate-50 flex flex-col items-center justify-center gap-3">
        <Loader2 className="animate-spin text-[#5B50E6] w-8 h-8" />
        <p className="text-xs font-bold text-slate-500">Loading admin metrics...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-slate-50/70 text-slate-900 space-y-6">
      {/* Executive Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 text-white shadow-xl shadow-indigo-950/10 border border-slate-800">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-80 h-80 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-bold text-indigo-200">
              <Sparkles size={13} className="text-indigo-400" />
              <span>Real-Time Admin Console</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
              Welcome back, Administrator
            </h1>
            <p className="text-sm text-slate-300 font-medium leading-relaxed">
              Here is what is happening across your platform today. Monitor revenue performance, active users, and recent system activities.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              onClick={() => refetch()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 text-xs font-bold text-white transition-all active:scale-95 cursor-pointer"
            >
              <RefreshCw size={14} />
              <span>Refresh Data</span>
            </button>

            <div className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-xs font-bold text-emerald-300 backdrop-blur-md">
              <ShieldCheck size={16} className="text-emerald-400" />
              <span>Vault Secure</span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total Active Users",
            value: Number(kpis.totalActiveUsers).toLocaleString(),
            trend: "+14.2%",
            badge: "Live",
            up: true,
            icon: Users,
            iconBg: "bg-indigo-50 text-[#5B50E6]",
            border: "border-indigo-100",
          },
          {
            label: "Revenue MTD",
            value: kpis.revenueMTD,
            trend: "+28.6%",
            badge: "All time",
            up: true,
            icon: Wallet,
            iconBg: "bg-emerald-50 text-emerald-600",
            border: "border-emerald-100",
          },
          {
            label: "Completed Transactions",
            value: Number(kpis.completedTransactions).toLocaleString(),
            trend: "+8.4%",
            badge: "Total",
            up: true,
            icon: ReceiptText,
            iconBg: "bg-amber-50 text-amber-600",
            border: "border-amber-100",
          },
          {
            label: "Active Enrollments",
            value: Number(kpis.totalEnrollments ?? 4180).toLocaleString(),
            trend: "+19.1%",
            badge: "Courses",
            up: true,
            icon: BookOpen,
            iconBg: "bg-violet-50 text-violet-600",
            border: "border-violet-100",
          },
        ].map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className={`relative bg-white rounded-2xl p-5 border ${card.border} shadow-sm hover:shadow-md transition-all duration-300 group`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-2xl ${card.iconBg} transition-transform duration-300 group-hover:scale-110`}>
                  <Icon size={20} />
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                    <TrendingUp size={11} />
                    {card.trend}
                  </span>
                </div>
              </div>

              <p className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                {card.label}
              </p>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
                {card.value}
              </h3>
            </div>
          );
        })}
      </div>

      {/* Performance Analytics & Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Analytics Chart */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-100">
            <div>
              <h2 className="text-base font-black text-slate-900">Platform Performance</h2>
              <p className="text-xs text-slate-500 font-medium">
                Revenue and engagement fluctuations over time
              </p>
            </div>

            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 border border-slate-200/70 w-fit">
              {["Daily", "Weekly"].map((v) => (
                <button
                  key={v}
                  onClick={() => handleChartView(v)}
                  className={`text-xs font-extrabold px-3.5 py-1.5 rounded-xl transition-all ${
                    chartView === v
                      ? "bg-[#5B50E6] text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6 pt-1">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                  {s.label}
                </p>
                <p className="text-base font-black text-slate-900">{s.value}</p>
              </div>
            ))}
            <div className="ml-auto flex items-center gap-2">
              <span className="w-3 h-1 rounded-full bg-[#5B50E6]" />
              <span className="text-xs font-bold text-slate-500">Volume</span>
            </div>
          </div>

          <VaultChart key={chartKey} data={chartData} />
        </div>

        {/* Recent System Activity */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h2 className="text-base font-black text-slate-900">Recent Activity</h2>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                Live Feed
              </span>
            </div>

            <div className="space-y-4">
              {activities.map((act: any, idx: number) => (
                <div key={idx} className="flex items-start gap-3.5 group">
                  <div className="w-9 h-9 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[#5B50E6] shrink-0 group-hover:scale-105 transition-transform">
                    {renderIcon(act.icon)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-slate-900 leading-tight">
                      {act.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                      {act.desc}
                    </p>
                    <span className="inline-block text-[9px] font-black text-slate-400 uppercase tracking-wider mt-1.5 font-mono">
                      {act.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="w-full py-2.5 rounded-2xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer">
            <span>View Complete Log</span>
            <ArrowUpRight size={14} className="text-slate-400" />
          </button>
        </div>
      </div>

      {/* High-Value Transactions Section */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden space-y-1">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-base font-black text-slate-900">Recent High-Value Transactions</h2>
            <p className="text-xs text-slate-500 font-medium">
              Verified financial records and platform purchases
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 sm:flex-none">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search transaction, user..."
                value={searchTx}
                onChange={(e) => setSearchTx(e.target.value)}
                className="pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#5B50E6] focus:bg-white focus:ring-2 focus:ring-[#5B50E6]/10 w-full sm:w-52 transition-all"
              />
            </div>

            <div className="relative">
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className={`p-2 border rounded-xl transition-all cursor-pointer ${
                  filterOpen || statusFilter !== "All"
                    ? "border-[#5B50E6] bg-indigo-50 text-[#5B50E6]"
                    : "border-slate-200 hover:bg-slate-50 text-slate-600"
                }`}
              >
                <SlidersHorizontal size={14} />
              </button>

              {filterOpen && (
                <div className="absolute right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-20 min-w-[140px] animate-in fade-in zoom-in-95 duration-150">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider px-2 py-1">
                    Filter Status
                  </p>
                  {["All", "Success", "Failed"].map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setStatusFilter(s);
                        setFilterOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs font-bold rounded-xl transition-colors cursor-pointer ${
                        statusFilter === s
                          ? "bg-[#5B50E6] text-white"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-indigo-600 border border-indigo-200 bg-indigo-50/50 hover:bg-indigo-50 rounded-xl transition-colors active:scale-95 cursor-pointer">
              <Download size={14} />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        <div className="p-4 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-100 hover:bg-transparent">
                <TableHead className="text-xs font-black text-slate-400 uppercase tracking-wider">Transaction ID</TableHead>
                <TableHead className="text-xs font-black text-slate-400 uppercase tracking-wider">User</TableHead>
                <TableHead className="text-xs font-black text-slate-400 uppercase tracking-wider">Product</TableHead>
                <TableHead className="text-xs font-black text-slate-400 uppercase tracking-wider">Amount</TableHead>
                <TableHead className="text-xs font-black text-slate-400 uppercase tracking-wider">Date</TableHead>
                <TableHead className="text-xs font-black text-slate-400 uppercase tracking-wider">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow className="border-slate-100 hover:bg-transparent">
                  <TableCell colSpan={6} className="h-24 text-center text-xs font-semibold text-slate-400">
                    No transactions found matching your criteria.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((tx: any, idx: number) => (
                  <TableRow key={idx} className="border-slate-100 hover:bg-slate-50/70 transition-colors">
                    <TableCell className="font-extrabold text-[#5B50E6] font-mono text-xs">
                      {tx.id}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-200/80 text-slate-700 flex items-center justify-center text-xs font-black shrink-0">
                          {tx.initials}
                        </div>
                        <span className="text-xs font-bold text-slate-900">{tx.user}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs font-medium text-slate-600">{tx.product}</TableCell>
                    <TableCell className="text-xs font-black text-slate-900 font-mono">{tx.amount}</TableCell>
                    <TableCell className="text-xs font-medium text-slate-400 font-mono">{tx.date}</TableCell>
                    <TableCell>
                      <StatusLed status={tx.status} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}