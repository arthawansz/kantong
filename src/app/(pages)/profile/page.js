"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  CalendarDays,
  ChevronRight,
  CircleDollarSign,
  CreditCard,
  Edit3,
  KeyRound,
  Landmark,
  Mail,
  PiggyBank,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  UserRound,
  WalletCards,
  X,
} from "lucide-react";
import { money, wallets } from "../../data/mockDashboard";

const fieldSx = {
  "& .MuiOutlinedInput-root": { minHeight: 54, borderRadius: "12px" },
  "& .MuiInputLabel-root": { backgroundColor: "#ffffff", px: 0.5 },
};

const monthlySpending = 1930000;
const monthlyTarget = 3500000;

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "Artha",
    email: "artha@kantong.app",
    accountType: "Personal",
    joined: "September 2026",
    defaultWallet: "BCA",
    currency: "IDR — Indonesian Rupiah",
    monthlyTarget,
  });
  const [editOpen, setEditOpen] = useState(false);
  const [draft, setDraft] = useState(profile);

  const totalBalance = useMemo(
    () => wallets.reduce((total, wallet) => total + wallet.amount, 0),
    []
  );
  const budgetUsed = Math.round((monthlySpending / profile.monthlyTarget) * 100);
  const remainingBudget = Math.max(profile.monthlyTarget - monthlySpending, 0);

  const openEdit = () => {
    setDraft(profile);
    setEditOpen(true);
  };

  const saveProfile = () => {
    if (!draft.name.trim() || !draft.email.trim()) return;
    setProfile({ ...draft, monthlyTarget: Number(draft.monthlyTarget) || monthlyTarget });
    setEditOpen(false);
  };

  const quickStats = [
    { label: "Total balance", value: money(totalBalance), helper: `${wallets.length} active wallets`, icon: WalletCards },
    { label: "Monthly target", value: money(profile.monthlyTarget), helper: `${budgetUsed}% used`, icon: Target },
    { label: "Budget left", value: money(remainingBudget), helper: "September 2026", icon: PiggyBank },
  ];

  return (
    <>
      <section>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9aa1ab]">Your account</p>
            <h2 className="mt-2 text-2xl font-bold tracking-[-0.04em] text-[#111827] sm:text-[30px]">Your money starts with you.</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#7a828e]">Manage the identity and financial preferences KANTONG uses across your personal workspace.</p>
          </div>
          <Button
            variant="contained"
            startIcon={<Edit3 size={16} />}
            onClick={openEdit}
            sx={{
              alignSelf: { xs: "flex-start", sm: "auto" },
              minHeight: 42,
              borderRadius: "12px",
              bgcolor: "#111827",
              px: 2,
              textTransform: "none",
              fontWeight: 700,
              boxShadow: "none",
              cursor: "pointer",
              "&:hover": { bgcolor: "#1f2937", boxShadow: "none" },
            }}
          >
            Edit profile
          </Button>
        </div>

        <div className="relative mt-6 overflow-hidden rounded-[24px] bg-[#111827] p-6 text-white md:p-7">
          <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full border border-white/[0.08]" />
          <div className="pointer-events-none absolute -right-4 top-12 h-40 w-40 rounded-full border border-white/[0.06]" />
          <div className="pointer-events-none absolute bottom-0 left-[36%] h-24 w-24 rounded-full bg-emerald-400/[0.04] blur-2xl" />

          <div className="relative flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex items-center gap-4">
              <Avatar sx={{ width: 72, height: 72, bgcolor: "#ffffff", color: "#111827", fontSize: 22, fontWeight: 900 }}>
                AP
              </Avatar>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-2xl font-bold tracking-[-0.04em]">{profile.name}</h3>
                  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-300/20 bg-emerald-300/[0.08] px-2.5 py-1 text-[10px] font-semibold text-emerald-200">
                    <BadgeCheck size={12} /> Active
                  </span>
                </div>
                <p className="mt-1.5 text-sm text-white/55">{profile.email}</p>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-white/40">
                  <span className="inline-flex items-center gap-1.5"><UserRound size={13} /> {profile.accountType} account</span>
                  <span className="inline-flex items-center gap-1.5"><CalendarDays size={13} /> Joined {profile.joined}</span>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[520px]">
              {quickStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="rounded-2xl border border-white/[0.08] bg-white/[0.045] px-4 py-3.5"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-[11px] font-medium text-white/45">{stat.label}</p>
                      <Icon size={15} className="text-white/35" />
                    </div>
                    <p className="mt-2 truncate text-sm font-semibold tracking-[-0.02em]">{stat.value}</p>
                    <p className="mt-1 text-[10px] text-white/35">{stat.helper}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-5 xl:grid-cols-[1.25fr_.75fr]">
        <div className="rounded-[22px] border border-black/[0.06] bg-white p-5 md:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-[#111827]">Personal information</p>
              <p className="mt-1 text-xs text-[#9ca3af]">Core identity shown across your KANTONG workspace.</p>
            </div>
            <button type="button" onClick={openEdit} className="cursor-pointer text-xs font-semibold text-[#6b7280] transition hover:text-[#111827]">Edit</button>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              { label: "Display name", value: profile.name, icon: UserRound },
              { label: "Email address", value: profile.email, icon: Mail },
              { label: "Account type", value: profile.accountType, icon: BadgeCheck },
              { label: "Member since", value: profile.joined, icon: CalendarDays },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="rounded-2xl border border-black/[0.055] bg-[#fafbfc] p-4">
                  <div className="flex items-center gap-2 text-[#9ca3af]"><Icon size={14} /><p className="text-[11px] font-medium">{item.label}</p></div>
                  <p className="mt-2 truncate text-sm font-semibold text-[#111827]">{item.value}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-[22px] border border-black/[0.06] bg-white p-5 md:p-6">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-emerald-50 text-emerald-700"><ShieldCheck size={18} /></div>
            <div><p className="text-sm font-bold text-[#111827]">Account health</p><p className="mt-1 text-xs text-[#9ca3af]">Your profile setup looks healthy.</p></div>
          </div>
          <div className="mt-6 space-y-4">
            {[
              ["Profile details", "Complete"],
              ["Financial preferences", "Configured"],
              ["Security", "Password enabled"],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between gap-4 border-b border-black/[0.055] pb-4 last:border-0 last:pb-0">
                <span className="text-xs text-[#7a828e]">{label}</span>
                <span className="text-[11px] font-semibold text-emerald-700">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-5 grid gap-5 xl:grid-cols-[1fr_1fr]">
        <div className="rounded-[22px] border border-black/[0.06] bg-white p-5 md:p-6">
          <div className="flex items-start justify-between gap-4">
            <div><p className="text-sm font-bold text-[#111827]">Financial preferences</p><p className="mt-1 text-xs text-[#9ca3af]">Defaults KANTONG can use when recording and analyzing money.</p></div>
            <Sparkles size={17} className="text-[#9ca3af]" />
          </div>
          <div className="mt-5 divide-y divide-black/[0.055]">
            {[
              { label: "Monthly spending target", value: money(profile.monthlyTarget), icon: Target },
              { label: "Default wallet", value: profile.defaultWallet, icon: CreditCard },
              { label: "Currency", value: profile.currency, icon: CircleDollarSign },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button key={item.label} type="button" onClick={openEdit} className="flex w-full cursor-pointer items-center gap-3 py-4 text-left first:pt-0 last:pb-0">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#f3f4f6] text-[#6b7280]"><Icon size={16} /></div>
                  <div className="min-w-0 flex-1"><p className="text-[11px] text-[#9ca3af]">{item.label}</p><p className="mt-1 truncate text-sm font-semibold text-[#111827]">{item.value}</p></div>
                  <ChevronRight size={16} className="shrink-0 text-[#b1b6be]" />
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-[22px] border border-black/[0.06] bg-white p-5 md:p-6">
          <div><p className="text-sm font-bold text-[#111827]">Account & security</p><p className="mt-1 text-xs text-[#9ca3af]">Shortcuts for settings that affect your account.</p></div>
          <div className="mt-5 space-y-2">
            {[
              { title: "Change password", subtitle: "Update your account password", icon: KeyRound, href: "/settings" },
              { title: "Account settings", subtitle: "Currency, preferences, and app options", icon: Settings, href: "/settings" },
              { title: "Wallet management", subtitle: "Review connected money sources", icon: Landmark, href: "/wallets" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.title} href={item.href} className="group flex cursor-pointer items-center gap-3 rounded-2xl border border-transparent px-3 py-3 transition hover:border-black/[0.055] hover:bg-[#fafbfc]">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#f3f4f6] text-[#6b7280] transition group-hover:text-[#111827]"><Icon size={16} /></div>
                  <div className="min-w-0 flex-1"><p className="text-sm font-semibold text-[#111827]">{item.title}</p><p className="mt-1 truncate text-[11px] text-[#9ca3af]">{item.subtitle}</p></div>
                  <ChevronRight size={16} className="text-[#b1b6be]" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Dialog open={editOpen} onClose={() => setEditOpen(false)} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: "22px" } }}>
        <DialogTitle sx={{ px: 3, pt: 3, pb: 1.5 }}>
          <div className="flex items-start justify-between gap-4">
            <div><p className="text-lg font-extrabold tracking-[-0.03em]">Edit profile</p><p className="mt-1 text-xs font-normal text-[#9ca3af]">Frontend preview — changes are stored locally for now.</p></div>
            <button type="button" onClick={() => setEditOpen(false)} className="grid h-8 w-8 cursor-pointer place-items-center rounded-lg text-[#9ca3af] transition hover:bg-[#f5f6f7] hover:text-[#111827]"><X size={17} /></button>
          </div>
        </DialogTitle>
        <DialogContent sx={{ px: 3, pb: 3 }}>
          <div className="grid gap-4 pt-1">
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField fullWidth label="Display name" value={draft.name} onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))} slotProps={{ inputLabel: { shrink: true } }} sx={fieldSx} />
              <TextField fullWidth label="Email" value={draft.email} onChange={(event) => setDraft((current) => ({ ...current, email: event.target.value }))} slotProps={{ inputLabel: { shrink: true } }} sx={fieldSx} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField select fullWidth label="Account type" value={draft.accountType} onChange={(event) => setDraft((current) => ({ ...current, accountType: event.target.value }))} sx={fieldSx}>
                <MenuItem value="Personal">Personal</MenuItem>
                <MenuItem value="Student">Student</MenuItem>
                <MenuItem value="Freelance">Freelance</MenuItem>
              </TextField>
              <TextField select fullWidth label="Default wallet" value={draft.defaultWallet} onChange={(event) => setDraft((current) => ({ ...current, defaultWallet: event.target.value }))} sx={fieldSx}>
                {wallets.map((wallet) => <MenuItem key={wallet.name} value={wallet.name}>{wallet.name}</MenuItem>)}
              </TextField>
            </div>
            <TextField fullWidth label="Monthly spending target" value={draft.monthlyTarget} onChange={(event) => setDraft((current) => ({ ...current, monthlyTarget: event.target.value.replace(/[^0-9]/g, "") }))} slotProps={{ inputLabel: { shrink: true } }} sx={fieldSx} />
            <TextField select fullWidth label="Currency" value={draft.currency} onChange={(event) => setDraft((current) => ({ ...current, currency: event.target.value }))} sx={fieldSx}>
              <MenuItem value="IDR — Indonesian Rupiah">IDR — Indonesian Rupiah</MenuItem>
              <MenuItem value="USD — US Dollar">USD — US Dollar</MenuItem>
              <MenuItem value="SGD — Singapore Dollar">SGD — Singapore Dollar</MenuItem>
            </TextField>
            <Button variant="contained" onClick={saveProfile} disabled={!draft.name.trim() || !draft.email.trim()} sx={{ minHeight: 48, borderRadius: "12px", bgcolor: "#111827", textTransform: "none", fontWeight: 700, boxShadow: "none", cursor: draft.name.trim() && draft.email.trim() ? "pointer" : "not-allowed", "&:hover": { bgcolor: "#1f2937", boxShadow: "none" } }}>
              Save changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
