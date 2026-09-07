"use client";

import { useMemo, useState } from "react";
import { Button, Chip, Divider } from "@mui/material";
import {
  ChevronDown,
  CircleDollarSign,
  Landmark,
  Plus,
  Utensils,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as ChartTooltip,
  XAxis,
  YAxis,
} from "recharts";
import TransactionDialog from "../../components/TransactionDialog";
import {
  categories,
  chartData,
  money,
  transactions,
  wallets,
} from "../../data/mockDashboard";

function StatCard({ label, amount, trend, positive }) {
  return (
    <div className="rounded-2xl border border-black/[0.06] bg-white p-5 md:p-6">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-[#7a828e]">{label}</p>
        <Chip
          size="small"
          label={trend}
          sx={{
            height: 24,
            bgcolor: positive ? "#ecfdf3" : "#fff1f2",
            color: positive ? "#15803d" : "#be123c",
            fontSize: 11,
            fontWeight: 700,
          }}
        />
      </div>
      <p
        className={`mt-3 text-2xl font-bold tracking-[-0.04em] md:text-[28px] ${
          positive ? "text-[#15803d]" : "text-[#dc2626]"
        }`}
      >
        {money(amount)}
      </p>
    </div>
  );
}

const transactionIcons = {
  food: { icon: Utensils, bg: "#fef3c7" },
  income: { icon: CircleDollarSign, bg: "#dcfce7" },
  transfer: { icon: Landmark, bg: "#dbeafe" },
};

export default function DashboardPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const totalBalance = useMemo(
    () => wallets.reduce((total, wallet) => total + wallet.amount, 0),
    []
  );

  return (
    <>
      <section>
        <div className="relative overflow-hidden rounded-[22px] bg-[#111827] p-6 text-white md:p-7">
          <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -right-4 top-10 h-36 w-36 rounded-full border border-white/[0.07]" />

          <div className="relative">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-white/55">Total balance</p>
                <p className="mt-2 text-4xl font-bold tracking-[-0.05em] md:text-[44px]">
                  {money(totalBalance)}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setDialogOpen(true)}
                aria-label="Add transaction"
                className="grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-xl border-2 border-[#bbbbcc] bg-[#111827] text-white transition hover:bg-[#19243a] sm:hidden"
              >
                <Plus size={18} />
              </button>

              <Button
                onClick={() => setDialogOpen(true)}
                variant="contained"
                startIcon={<Plus size={17} />}
                className="!hidden sm:!inline-flex"
                sx={{
                  bgcolor: "#111827",
                  color: "#ffffff",
                  border: 2,
                  borderColor: "#fefefe",
                  px: 2,
                  cursor: "pointer",
                  "&:hover": { bgcolor: "#19243a" },
                }}
              >
                Transaction
              </Button>
            </div>

            <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,.1)" }} />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {wallets.map((wallet) => (
                <div
                  key={wallet.name}
                  className="rounded-2xl border border-white/[0.09] bg-white/[0.04] p-4"
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: wallet.color }}
                    />
                    <p className="text-xs font-medium text-white/60">{wallet.name}</p>
                  </div>
                  <p className="mt-3 text-lg font-semibold tracking-[-0.03em]">
                    {money(wallet.amount)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <StatCard label="Income this month" amount={4250000} trend="+12.4%" positive />
          <StatCard label="Expense this month" amount={1930000} trend="+5.8%" />
        </div>
      </section>

      <section className="mt-5 grid gap-5 xl:grid-cols-[1.45fr_1fr]">
        <div className="rounded-2xl border border-black/[0.06] bg-white p-5 md:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold">Cash flow</p>
              <p className="mt-1 text-xs text-[#9ca3af]">Income and expenses over the last 7 days</p>
            </div>
            <Button size="small" endIcon={<ChevronDown size={14} />} sx={{ color: "#6b7280", cursor: "pointer" }}>
              Last 7 days
            </Button>
          </div>

          <div className="mt-6 h-[290px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 8, right: 6, bottom: 0, left: -22 }}>
                <defs>
                  <linearGradient id="incomeFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#111827" stopOpacity={0.16} />
                    <stop offset="100%" stopColor="#111827" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="expenseFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#dc2626" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="#dc2626" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#eef0f2" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 11 }} />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 10 }}
                  tickFormatter={(value) => `${value / 1000}k`}
                />
                <ChartTooltip
                  formatter={(value) => money(value)}
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid #e5e7eb",
                    boxShadow: "0 10px 30px rgba(17,24,39,.08)",
                  }}
                />
                <Area type="monotone" dataKey="income" stroke="#111827" strokeWidth={2.2} fill="url(#incomeFill)" />
                <Area type="monotone" dataKey="expense" stroke="#dc2626" strokeWidth={2} fill="url(#expenseFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-black/[0.06] bg-white p-5 md:p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold">Spending by category</p>
              <p className="mt-1 text-xs text-[#9ca3af]">September 2026</p>
            </div>
            <button className="cursor-pointer text-xs font-semibold text-[#6b7280] hover:text-[#111827]">View all</button>
          </div>

          <div className="mt-7 space-y-5">
            {categories.map((item) => (
              <div key={item.label}>
                <div className="mb-2 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-[#dc2626]">{money(item.value)}</p>
                    <p className="text-[10px] text-[#9ca3af]">{item.percent}%</p>
                  </div>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-[#f0f1f3]">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${item.percent}%`, backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-5 rounded-2xl border border-black/[0.06] bg-white p-5 md:p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold">Recent transactions</p>
            <p className="mt-1 text-xs text-[#9ca3af]">Your latest activity across all wallets</p>
          </div>
          <Button size="small" sx={{ color: "#6b7280", cursor: "pointer" }}>View all</Button>
        </div>

        <div className="mt-4 divide-y divide-black/[0.055]">
          {transactions.map((transaction) => {
            const Icon = transactionIcons[transaction.type].icon;
            const iconBg = transactionIcons[transaction.type].bg;

            return (
              <div key={`${transaction.title}-${transaction.date}`} className="flex items-center gap-4 py-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl" style={{ backgroundColor: iconBg }}>
                  <Icon size={18} strokeWidth={1.8} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{transaction.title}</p>
                      <p className="mt-1 truncate text-xs text-[#9ca3af]">
                        {transaction.category} · {transaction.wallet}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className={`text-sm font-bold ${transaction.amount > 0 ? "text-[#15803d]" : "text-[#dc2626]"}`}>
                        {transaction.amount > 0 ? "+" : "−"}{money(Math.abs(transaction.amount))}
                      </p>
                      <p className="mt-1 text-[10px] text-[#9ca3af]">{transaction.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <TransactionDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  );
}
