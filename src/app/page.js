"use client";

import { useMemo, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Chip,
  CssBaseline,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
  ThemeProvider,
  Tooltip,
  createTheme,
} from "@mui/material";
import {
  ArrowDownLeft,
  ArrowUpRight,
  BarChart3,
  Bell,
  ChevronDown,
  CircleDollarSign,
  Home,
  Landmark,
  Plus,
  ReceiptText,
  Search,
  Settings,
  Tags,
  Utensils,
  WalletCards,
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

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#111827" },
    background: { default: "#f6f7f9", paper: "#ffffff" },
    text: { primary: "#111827", secondary: "#6b7280" },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: "var(--font-geist-sans), Arial, sans-serif",
    button: { textTransform: "none", fontWeight: 700 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 10, boxShadow: "none" },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: { borderRadius: 18 },
      },
    },
  },
});

const navItems = [
  { label: "Overview", icon: Home, active: true },
  { label: "Wallets", icon: WalletCards },
  { label: "Transactions", icon: ReceiptText },
  { label: "Categories", icon: Tags },
  { label: "Analytics", icon: BarChart3 },
];

const wallets = [
  { name: "BCA", amount: 4850000, color: "#111827" },
  { name: "Cash", amount: 850000, color: "#2563eb" },
  { name: "GoPay", amount: 421500, color: "#16a34a" },
];

const chartData = [
  { day: "Mon", income: 800000, expense: 320000 },
  { day: "Tue", income: 120000, expense: 440000 },
  { day: "Wed", income: 250000, expense: 280000 },
  { day: "Thu", income: 1300000, expense: 510000 },
  { day: "Fri", income: 220000, expense: 390000 },
  { day: "Sat", income: 450000, expense: 610000 },
  { day: "Sun", income: 900000, expense: 270000 },
];

const transactions = [
  {
    title: "Lunch",
    category: "Food & Drink",
    wallet: "BCA",
    amount: -48000,
    date: "Today, 12:40",
    icon: Utensils,
    iconBg: "#fef3c7",
  },
  {
    title: "Freelance payment",
    category: "Income",
    wallet: "BCA",
    amount: 1250000,
    date: "Today, 09:12",
    icon: CircleDollarSign,
    iconBg: "#dcfce7",
  },
  {
    title: "Top up GoPay",
    category: "Transfer",
    wallet: "BCA → GoPay",
    amount: -250000,
    date: "Yesterday, 19:30",
    icon: Landmark,
    iconBg: "#dbeafe",
  },
];

const categories = [
  { label: "Food", value: 820000, percent: 42, color: "#111827" },
  { label: "Transport", value: 460000, percent: 24, color: "#2563eb" },
  { label: "Lifestyle", value: 330000, percent: 17, color: "#7c3aed" },
  { label: "Others", value: 320000, percent: 17, color: "#9ca3af" },
];

const money = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

function Sidebar() {
  return (
    <aside className="hidden min-h-screen w-[250px] shrink-0 border-r border-black/[0.06] bg-white px-4 py-6 lg:flex lg:flex-col">
      <div className="px-3">
        <div className="flex items-center gap-2.5">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#111827] text-sm font-black text-white">
            K
          </div>
          <div>
            <p className="text-[17px] font-extrabold tracking-[-0.03em] text-[#111827]">kantong.</p>
            <p className="text-[11px] text-[#9ca3af]">personal finance</p>
          </div>
        </div>
      </div>

      <nav className="mt-9 space-y-1.5">
        {navItems.map(({ label, icon: Icon, active }) => (
          <button
            key={label}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${
              active
                ? "bg-[#f1f3f5] text-[#111827]"
                : "text-[#737b88] hover:bg-[#f8f9fa] hover:text-[#111827]"
            }`}
          >
            <Icon size={18} strokeWidth={1.9} />
            {label}
          </button>
        ))}
      </nav>

      <div className="mt-auto rounded-2xl border border-black/[0.06] bg-[#fafafa] p-4">
        <p className="text-xs font-semibold text-[#111827]">Monthly target</p>
        <p className="mt-1 text-xs leading-5 text-[#8a919d]">Keep spending below Rp3.5M this month.</p>
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#e5e7eb]">
          <div className="h-full w-[56%] rounded-full bg-[#111827]" />
        </div>
        <div className="mt-2 flex justify-between text-[11px] text-[#9ca3af]">
          <span>Rp1.93M</span>
          <span>Rp3.5M</span>
        </div>
      </div>

      <button className="mt-3 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#737b88] hover:bg-[#f8f9fa]">
        <Settings size={18} /> Settings
      </button>
    </aside>
  );
}

function StatCard({ label, amount, trend, positive }) {
  return (
    <div className="rounded-2xl border border-black/[0.06] bg-white p-5">
      <div className="flex items-center justify-between">
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
      <p className="mt-3 text-2xl font-bold tracking-[-0.04em] text-[#111827]">{money(amount)}</p>
    </div>
  );
}

function TransactionDialog({ open, onClose }) {
  const [tab, setTab] = useState(1);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ px: 3, pt: 3, pb: 1.5, fontWeight: 800, letterSpacing: "-0.03em" }}>
        Add transaction
      </DialogTitle>
      <DialogContent sx={{ px: 3, pb: 3 }}>
        <Tabs
          value={tab}
          onChange={(_, value) => setTab(value)}
          sx={{ mb: 3, minHeight: 42, "& .MuiTab-root": { textTransform: "none", minHeight: 42, fontWeight: 700 } }}
        >
          <Tab label="Income" />
          <Tab label="Expense" />
          <Tab label="Transfer" />
        </Tabs>

        <div className="grid gap-4">
          <TextField fullWidth label="Amount" placeholder="Rp0" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormControl fullWidth>
              <InputLabel>Wallet</InputLabel>
              <Select label="Wallet" defaultValue="BCA">
                <MenuItem value="BCA">BCA</MenuItem>
                <MenuItem value="Cash">Cash</MenuItem>
                <MenuItem value="GoPay">GoPay</MenuItem>
              </Select>
            </FormControl>
            {tab === 2 ? (
              <FormControl fullWidth>
                <InputLabel>To wallet</InputLabel>
                <Select label="To wallet" defaultValue="GoPay">
                  <MenuItem value="Cash">Cash</MenuItem>
                  <MenuItem value="GoPay">GoPay</MenuItem>
                </Select>
              </FormControl>
            ) : (
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select label="Category" defaultValue="Food">
                  <MenuItem value="Food">Food & Drink</MenuItem>
                  <MenuItem value="Transport">Transport</MenuItem>
                  <MenuItem value="Lifestyle">Lifestyle</MenuItem>
                </Select>
              </FormControl>
            )}
          </div>
          <TextField fullWidth label="Note" placeholder="Optional note" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField fullWidth label="Date" type="date" defaultValue="2026-09-06" InputLabelProps={{ shrink: true }} />
            {tab === 2 && <TextField fullWidth label="Transfer fee" placeholder="Rp0" />}
          </div>
          <Button
            variant="contained"
            size="large"
            onClick={onClose}
            sx={{ mt: 1, py: 1.35, bgcolor: "#111827", "&:hover": { bgcolor: "#1f2937" } }}
          >
            Save transaction
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function HomePage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const totalBalance = useMemo(() => wallets.reduce((total, wallet) => total + wallet.amount, 0), []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="min-h-screen bg-[#f6f7f9] text-[#111827]">
        <div className="mx-auto flex min-h-screen max-w-[1680px]">
          <Sidebar />

          <main className="min-w-0 flex-1">
            <header className="sticky top-0 z-20 flex h-[76px] items-center justify-between border-b border-black/[0.05] bg-[#f6f7f9]/95 px-5 backdrop-blur md:px-8 lg:px-10">
              <div>
                <p className="text-xs font-medium text-[#9aa1ab]">Sunday, September 6</p>
                <h1 className="mt-0.5 text-xl font-bold tracking-[-0.03em]">Overview</h1>
              </div>

              <div className="flex items-center gap-2">
                <Tooltip title="Search">
                  <button className="grid h-10 w-10 place-items-center rounded-xl border border-black/[0.06] bg-white text-[#6b7280] hover:text-[#111827]">
                    <Search size={18} />
                  </button>
                </Tooltip>
                <Tooltip title="Notifications">
                  <button className="relative grid h-10 w-10 place-items-center rounded-xl border border-black/[0.06] bg-white text-[#6b7280] hover:text-[#111827]">
                    <Bell size={18} />
                    <span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-[#ef4444]" />
                  </button>
                </Tooltip>
                <div className="ml-1 hidden items-center gap-2 rounded-xl border border-black/[0.06] bg-white px-2 py-1.5 sm:flex">
                  <Avatar sx={{ width: 30, height: 30, bgcolor: "#111827", fontSize: 12, fontWeight: 800 }}>AP</Avatar>
                  <div className="pr-1">
                    <p className="text-xs font-semibold leading-none">Artha</p>
                    <p className="mt-1 text-[10px] text-[#9ca3af]">Personal</p>
                  </div>
                  <ChevronDown size={14} className="text-[#9ca3af]" />
                </div>
              </div>
            </header>

            <div className="px-5 py-6 md:px-8 lg:px-10 lg:py-8">
              <section className="grid gap-5 xl:grid-cols-[1.45fr_1fr]">
                <div className="relative overflow-hidden rounded-[22px] bg-[#111827] p-6 text-white md:p-7">
                  <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full border border-white/10" />
                  <div className="pointer-events-none absolute -right-4 top-10 h-36 w-36 rounded-full border border-white/[0.07]" />

                  <div className="relative">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm text-white/55">Total balance</p>
                        <p className="mt-2 text-4xl font-bold tracking-[-0.05em] md:text-[44px]">{money(totalBalance)}</p>
                      </div>
                      <Button
                        onClick={() => setDialogOpen(true)}
                        variant="contained"
                        startIcon={<Plus size={17} />}
                        sx={{
                          bgcolor: "#ffffff",
                          color: "#111827",
                          px: 2,
                          "&:hover": { bgcolor: "#f3f4f6" },
                        }}
                      >
                        Transaction
                      </Button>
                    </div>

                    <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,.1)" }} />
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      {wallets.map((wallet) => (
                        <div key={wallet.name} className="rounded-2xl border border-white/[0.09] bg-white/[0.04] p-4">
                          <div className="flex items-center gap-2.5">
                            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: wallet.color }} />
                            <p className="text-xs font-medium text-white/60">{wallet.name}</p>
                          </div>
                          <p className="mt-3 text-lg font-semibold tracking-[-0.03em]">{money(wallet.amount)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-1">
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
                    <Button size="small" endIcon={<ChevronDown size={14} />} sx={{ color: "#6b7280" }}>
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
                            <stop offset="0%" stopColor="#94a3b8" stopOpacity={0.16} />
                            <stop offset="100%" stopColor="#94a3b8" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} stroke="#eef0f2" />
                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 11 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 10 }} tickFormatter={(value) => `${value / 1000}k`} />
                        <ChartTooltip
                          formatter={(value) => money(value)}
                          contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb", boxShadow: "0 10px 30px rgba(17,24,39,.08)" }}
                        />
                        <Area type="monotone" dataKey="income" stroke="#111827" strokeWidth={2.2} fill="url(#incomeFill)" />
                        <Area type="monotone" dataKey="expense" stroke="#94a3b8" strokeWidth={2} fill="url(#expenseFill)" />
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
                    <button className="text-xs font-semibold text-[#6b7280] hover:text-[#111827]">View all</button>
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
                            <p className="text-sm font-semibold">{money(item.value)}</p>
                            <p className="text-[10px] text-[#9ca3af]">{item.percent}%</p>
                          </div>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-[#f0f1f3]">
                          <div className="h-full rounded-full" style={{ width: `${item.percent}%`, backgroundColor: item.color }} />
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
                  <Button size="small" sx={{ color: "#6b7280" }}>View all</Button>
                </div>

                <div className="mt-4 divide-y divide-black/[0.055]">
                  {transactions.map(({ title, category, wallet, amount, date, icon: Icon, iconBg }) => (
                    <div key={`${title}-${date}`} className="flex items-center gap-4 py-4">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl" style={{ backgroundColor: iconBg }}>
                        <Icon size={18} strokeWidth={1.8} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold">{title}</p>
                            <p className="mt-1 truncate text-xs text-[#9ca3af]">{category} · {wallet}</p>
                          </div>
                          <div className="shrink-0 text-right">
                            <p className={`text-sm font-bold ${amount > 0 ? "text-[#15803d]" : "text-[#111827]"}`}>
                              {amount > 0 ? "+" : "−"}{money(Math.abs(amount))}
                            </p>
                            <p className="mt-1 text-[10px] text-[#9ca3af]">{date}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>

      <TransactionDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </ThemeProvider>
  );
}
