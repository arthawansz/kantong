"use client";

import { useMemo, useState } from "react";
import { MenuItem, TextField } from "@mui/material";
import { motion } from "framer-motion";
import {
  ArrowDownLeft,
  ArrowUpRight,
  CalendarDays,
  CircleDollarSign,
  PiggyBank,
  Sparkles,
  TrendingDown,
  TrendingUp,
  WalletCards,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { categories, money, wallets } from "../../data/mockDashboard";

const periodOptions = ["This month", "Last 3 months", "Last 6 months"];

const periodData = {
  "This month": {
    income: 4250000,
    expense: 1930000,
    savingRate: 55,
    change: 12.4,
    monthly: [
      { label: "1–7", income: 940000, expense: 510000 },
      { label: "8–14", income: 1180000, expense: 460000 },
      { label: "15–21", income: 870000, expense: 420000 },
      { label: "22–30", income: 1260000, expense: 540000 },
    ],
  },
  "Last 3 months": {
    income: 12150000,
    expense: 6470000,
    savingRate: 47,
    change: 8.7,
    monthly: [
      { label: "Jul", income: 3650000, expense: 2140000 },
      { label: "Aug", income: 4250000, expense: 2400000 },
      { label: "Sep", income: 4250000, expense: 1930000 },
    ],
  },
  "Last 6 months": {
    income: 23200000,
    expense: 13080000,
    savingRate: 44,
    change: 6.2,
    monthly: [
      { label: "Apr", income: 3400000, expense: 2100000 },
      { label: "May", income: 3700000, expense: 2180000 },
      { label: "Jun", income: 3950000, expense: 2390000 },
      { label: "Jul", income: 3650000, expense: 2140000 },
      { label: "Aug", income: 4250000, expense: 2400000 },
      { label: "Sep", income: 4250000, expense: 1930000 },
    ],
  },
};

const spendingTrend = [
  { month: "Apr", spending: 2100000 },
  { month: "May", spending: 2180000 },
  { month: "Jun", spending: 2390000 },
  { month: "Jul", spending: 2140000 },
  { month: "Aug", spending: 2400000 },
  { month: "Sep", spending: 1930000 },
];

const walletUsage = [
  { name: "BCA", value: 1320000 },
  { name: "Cash", value: 360000 },
  { name: "GoPay", value: 250000 },
];

const tooltipStyle = {
  borderRadius: 14,
  border: "1px solid rgba(17,24,39,.08)",
  boxShadow: "0 16px 40px rgba(17,24,39,.08)",
  fontSize: 12,
};

function MetricCard({ label, value, helper, icon: Icon, tone = "neutral" }) {
  const toneClass =
    tone === "positive"
      ? "text-[#15803d]"
      : tone === "negative"
        ? "text-[#dc2626]"
        : "text-[#111827]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="rounded-[20px] border border-black/[0.06] bg-white p-5"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9aa1ab]">{label}</p>
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#f4f5f7] text-[#6b7280]">
          <Icon size={16} strokeWidth={1.8} />
        </div>
      </div>
      <p className={`mt-4 text-2xl font-bold tracking-[-0.045em] ${toneClass}`}>{value}</p>
      <p className="mt-2 text-xs text-[#9ca3af]">{helper}</p>
    </motion.div>
  );
}

export default function AnalyticsPage() {
  const [period, setPeriod] = useState("This month");
  const data = periodData[period];

  const netFlow = data.income - data.expense;
  const totalBalance = useMemo(
    () => wallets.reduce((total, wallet) => total + wallet.amount, 0),
    []
  );

  const topCategory = [...categories].sort((a, b) => b.value - a.value)[0];

  return (
    <>
      <section>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9aa1ab]">Financial analytics</p>
            <h2 className="mt-2 text-2xl font-bold tracking-[-0.04em] text-[#111827] sm:text-[30px]">Read the story behind your money.</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#7a828e]">Spot spending patterns, compare cash flow, and understand where your money is moving over time.</p>
          </div>

          <TextField
            select
            size="small"
            value={period}
            onChange={(event) => setPeriod(event.target.value)}
            aria-label="Analytics period"
            sx={{
              minWidth: 170,
              alignSelf: { xs: "flex-start", sm: "auto" },
              "& .MuiOutlinedInput-root": { borderRadius: "12px", bgcolor: "#fff" },
            }}
          >
            {periodOptions.map((option) => (
              <MenuItem key={option} value={option} sx={{ cursor: "pointer", fontSize: 13 }}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <div className="relative mt-6 overflow-hidden rounded-[24px] bg-[#111827] p-6 text-white md:p-7">
          <div className="pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full border border-white/[0.08]" />
          <div className="pointer-events-none absolute -right-4 top-12 h-40 w-40 rounded-full border border-white/[0.06]" />
          <div className="pointer-events-none absolute bottom-0 left-1/2 h-36 w-36 -translate-x-1/2 rounded-full border border-white/[0.04]" />

          <div className="relative grid gap-7 lg:grid-cols-[1fr_1.15fr] lg:items-end">
            <div>
              <div className="flex items-center gap-2 text-white/50">
                <Sparkles size={14} />
                <p className="text-xs font-medium">Net cash flow · {period.toLowerCase()}</p>
              </div>
              <p className={`mt-3 text-4xl font-bold tracking-[-0.055em] sm:text-[46px] ${netFlow >= 0 ? "text-white" : "text-red-300"}`}>
                {money(netFlow)}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-emerald-300/20 bg-emerald-300/[0.08] px-2.5 py-1 text-[11px] font-semibold text-emerald-300">+{data.change}% vs previous period</span>
                <span className="text-[11px] text-white/40">Transfers excluded</span>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.045] p-4">
                <div className="flex items-center justify-between gap-2"><p className="text-[11px] text-white/45">Income</p><ArrowDownLeft size={14} className="text-emerald-300" /></div>
                <p className="mt-2 text-sm font-semibold text-emerald-300">{money(data.income)}</p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.045] p-4">
                <div className="flex items-center justify-between gap-2"><p className="text-[11px] text-white/45">Expense</p><ArrowUpRight size={14} className="text-red-300" /></div>
                <p className="mt-2 text-sm font-semibold text-red-300">{money(data.expense)}</p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.045] p-4">
                <div className="flex items-center justify-between gap-2"><p className="text-[11px] text-white/45">Saving rate</p><PiggyBank size={14} className="text-white/60" /></div>
                <p className="mt-2 text-sm font-semibold">{data.savingRate}%</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Total balance" value={money(totalBalance)} helper="Across all active wallets" icon={WalletCards} />
        <MetricCard label="Top category" value={topCategory.label} helper={`${money(topCategory.value)} this month`} icon={CircleDollarSign} />
        <MetricCard label="Spending trend" value="−19.6%" helper="Compared with August" icon={TrendingDown} tone="positive" />
        <MetricCard label="Avg. daily spend" value={money(Math.round(1930000 / 30))} helper="Based on September spending" icon={CalendarDays} />
      </section>

      <section className="mt-5 grid gap-5 xl:grid-cols-[1.45fr_1fr]">
        <div className="rounded-[20px] border border-black/[0.06] bg-white p-5 md:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-[#111827]">Income vs expense</p>
              <p className="mt-1 text-xs text-[#9ca3af]">Cash flow performance for {period.toLowerCase()}</p>
            </div>
            <div className="hidden items-center gap-4 text-[10px] text-[#8a919d] sm:flex">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#111827]" />Income</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#dc2626]" />Expense</span>
            </div>
          </div>

          <div className="mt-6 h-[310px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.monthly} barGap={6}>
                <CartesianGrid vertical={false} stroke="#eef0f2" />
                <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 10 }} tickFormatter={(value) => `${value / 1000000}M`} />
                <Tooltip formatter={(value) => money(value)} contentStyle={tooltipStyle} cursor={{ fill: "rgba(17,24,39,.025)" }} />
                <Bar dataKey="income" fill="#111827" radius={[7, 7, 0, 0]} maxBarSize={28} />
                <Bar dataKey="expense" fill="#dc2626" radius={[7, 7, 0, 0]} maxBarSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-[20px] border border-black/[0.06] bg-white p-5 md:p-6">
          <div>
            <p className="text-sm font-bold text-[#111827]">Spending distribution</p>
            <p className="mt-1 text-xs text-[#9ca3af]">Where this month&apos;s money went</p>
          </div>

          <div className="relative mt-4 h-[190px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categories} dataKey="value" nameKey="label" innerRadius={58} outerRadius={82} paddingAngle={3} stroke="none">
                  {categories.map((item) => <Cell key={item.label} fill={item.color} />)}
                </Pie>
                <Tooltip formatter={(value) => money(value)} contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
              <div>
                <p className="text-[10px] text-[#9ca3af]">Total</p>
                <p className="mt-1 text-sm font-bold tracking-[-0.03em] text-[#111827]">{money(categories.reduce((sum, item) => sum + item.value, 0))}</p>
              </div>
            </div>
          </div>

          <div className="mt-1 space-y-3">
            {categories.map((item) => (
              <div key={item.label} className="flex items-center justify-between gap-4">
                <div className="flex min-w-0 items-center gap-2.5"><span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: item.color }} /><span className="truncate text-xs font-medium text-[#4b5563]">{item.label}</span></div>
                <div className="shrink-0 text-right"><p className="text-xs font-semibold text-[#111827]">{money(item.value)}</p><p className="mt-0.5 text-[9px] text-[#9ca3af]">{item.percent}%</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-5 grid gap-5 xl:grid-cols-[1.2fr_1fr]">
        <div className="rounded-[20px] border border-black/[0.06] bg-white p-5 md:p-6">
          <div className="flex items-start justify-between gap-4">
            <div><p className="text-sm font-bold text-[#111827]">Spending trend</p><p className="mt-1 text-xs text-[#9ca3af]">Six-month expense movement</p></div>
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700"><TrendingDown size={12} />19.6% lower</span>
          </div>
          <div className="mt-6 h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={spendingTrend} margin={{ left: -20, right: 4 }}>
                <defs>
                  <linearGradient id="analyticsExpenseFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#111827" stopOpacity={0.13} /><stop offset="100%" stopColor="#111827" stopOpacity={0} /></linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#eef0f2" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 10 }} tickFormatter={(value) => `${value / 1000000}M`} />
                <Tooltip formatter={(value) => money(value)} contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="spending" stroke="#111827" strokeWidth={2.2} fill="url(#analyticsExpenseFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-[20px] border border-black/[0.06] bg-white p-5 md:p-6">
          <div><p className="text-sm font-bold text-[#111827]">Wallet usage</p><p className="mt-1 text-xs text-[#9ca3af]">Expense share by money source</p></div>
          <div className="mt-6 h-[210px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={walletUsage} layout="vertical" margin={{ left: 4, right: 10 }}>
                <CartesianGrid horizontal={false} stroke="#eef0f2" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={52} tick={{ fill: "#6b7280", fontSize: 11 }} />
                <Tooltip formatter={(value) => money(value)} contentStyle={tooltipStyle} cursor={{ fill: "rgba(17,24,39,.025)" }} />
                <Bar dataKey="value" radius={[0, 8, 8, 0]} maxBarSize={18}>
                  {walletUsage.map((item, index) => <Cell key={item.name} fill={wallets[index]?.color ?? "#9ca3af"} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 rounded-2xl bg-[#f7f8fa] p-4">
            <div className="flex items-start gap-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-[#111827]"><TrendingUp size={16} /></div>
              <div><p className="text-xs font-bold text-[#111827]">BCA carries most spending</p><p className="mt-1 text-[11px] leading-5 text-[#8a919d]">About 68% of tracked expenses came from BCA this month.</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-5 rounded-[20px] border border-black/[0.06] bg-white p-5 md:p-6">
        <div className="flex items-start gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[#111827] text-white"><Sparkles size={17} /></div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-[#111827]">Money insight</p>
            <p className="mt-1 max-w-3xl text-xs leading-6 text-[#7a828e]">Your spending is lower than last month while your saving rate remains above 50%. Food is still your biggest category, so reducing small recurring food purchases would have the strongest impact on your monthly target.</p>
          </div>
        </div>
      </section>
    </>
  );
}
