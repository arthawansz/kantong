"use client";

import { useMemo, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import {
  Banknote,
  Building2,
  ChevronRight,
  MoreHorizontal,
  PiggyBank,
  Plus,
  Smartphone,
  WalletCards,
  X,
} from "lucide-react";
import { money, wallets as initialWallets } from "../../data/mockDashboard";

const walletTypeMeta = {
  "Bank account": {
    type: "Bank account",
    icon: Building2,
  },
  Cash: {
    type: "Cash",
    icon: Banknote,
  },
  "E-wallet": {
    type: "E-wallet",
    icon: Smartphone,
  },
  Savings: {
    type: "Savings",
    icon: PiggyBank,
  },
  "Custom wallet": {
    type: "Custom wallet",
    icon: WalletCards,
  },
};

const defaultWalletTypes = {
  BCA: "Bank account",
  Cash: "Cash",
  GoPay: "E-wallet",
};

const walletVisuals = {
  BCA: { accent: "#111827", tint: "#f3f4f6" },
  Cash: { accent: "#2563eb", tint: "#eff6ff" },
  GoPay: { accent: "#16a34a", tint: "#f0fdf4" },
};

const quickStats = [
  { label: "Money in", value: 4250000, helper: "This month" },
  { label: "Money out", value: 1930000, helper: "This month" },
  { label: "Wallets", value: 3, helper: "Active wallets", compact: true },
];

export default function WalletsPage() {
  const [wallets, setWallets] = useState(initialWallets);
  const [addWalletOpen, setAddWalletOpen] = useState(false);
  const [walletName, setWalletName] = useState("");
  const [walletType, setWalletType] = useState("Bank account");
  const [startingBalance, setStartingBalance] = useState("");

  const totalBalance = useMemo(
    () => wallets.reduce((total, wallet) => total + wallet.amount, 0),
    [wallets]
  );

  const closeDialog = () => {
    setAddWalletOpen(false);
    setWalletName("");
    setWalletType("Bank account");
    setStartingBalance("");
  };

  const handleAddWallet = () => {
    const cleanName = walletName.trim();
    if (!cleanName) return;

    const palette = ["#7c3aed", "#ea580c", "#0891b2", "#db2777"];
    const amount = Number(startingBalance.replace(/[^0-9]/g, "")) || 0;

    setWallets((items) => [
      ...items,
      {
        name: cleanName,
        amount,
        color: palette[items.length % palette.length],
        customType: walletType,
      },
    ]);
    closeDialog();
  };

  return (
    <>
      <section>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9aa1ab]">
              Wallet management
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-[-0.04em] text-[#111827] sm:text-[30px]">
              Your money, in one place.
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#7a828e]">
              Track every bank account, cash balance, and e-wallet you use from one clear overview.
            </p>
          </div>

          <Button
            variant="contained"
            startIcon={<Plus size={17} />}
            onClick={() => setAddWalletOpen(true)}
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
            Add wallet
          </Button>
        </div>

        <div className="mt-6 overflow-hidden rounded-[24px] bg-[#111827] p-6 text-white md:p-7">
          <div className="relative">
            <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full border border-white/[0.08]" />
            <div className="pointer-events-none absolute -right-4 top-10 h-40 w-40 rounded-full border border-white/[0.06]" />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm text-white/55">Combined balance</p>
                <p className="mt-2 text-4xl font-bold tracking-[-0.055em] sm:text-[44px]">
                  {money(totalBalance)}
                </p>
                <p className="mt-3 text-xs text-white/45">Across {wallets.length} active wallets</p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:min-w-[480px]">
                {quickStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/[0.08] bg-white/[0.045] px-4 py-3.5"
                  >
                    <p className="text-[11px] font-medium text-white/45">{stat.label}</p>
                    <p className="mt-1.5 text-sm font-semibold tracking-[-0.02em]">
                      {stat.compact ? wallets.length : money(stat.value)}
                    </p>
                    <p className="mt-1 text-[10px] text-white/35">{stat.helper}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold tracking-[-0.03em] text-[#111827]">Your wallets</h3>
            <p className="mt-1 text-xs text-[#9ca3af]">Balances from all connected money sources</p>
          </div>
          <button
            type="button"
            className="cursor-pointer text-xs font-semibold text-[#7a828e] transition hover:text-[#111827]"
          >
            Manage order
          </button>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {wallets.map((wallet, index) => {
            const resolvedType = wallet.customType ?? defaultWalletTypes[wallet.name] ?? "Custom wallet";
            const typeMeta = walletTypeMeta[resolvedType] ?? walletTypeMeta["Custom wallet"];
            const visuals = walletVisuals[wallet.name] ?? {
              accent: wallet.color,
              tint: "#f8fafc",
            };
            const Icon = typeMeta.icon;

            return (
              <motion.div
                key={wallet.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.04 }}
                className="group relative overflow-hidden rounded-[20px] border border-black/[0.06] bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/[0.04]"
              >
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-70"
                  style={{ backgroundColor: visuals.tint }}
                />

                <div className="relative flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl"
                      style={{ backgroundColor: visuals.tint, color: visuals.accent }}
                    >
                      <Icon size={19} strokeWidth={1.9} />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-[#111827]">{wallet.name}</p>
                      <p className="mt-1 text-[11px] text-[#9ca3af]">{typeMeta.type}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    aria-label={`More options for ${wallet.name}`}
                    className="grid h-8 w-8 shrink-0 cursor-pointer place-items-center rounded-lg text-[#9ca3af] transition hover:bg-[#f5f6f7] hover:text-[#111827]"
                  >
                    <MoreHorizontal size={17} />
                  </button>
                </div>

                <div className="relative mt-7">
                  <p className="text-[11px] font-medium text-[#9ca3af]">Current balance</p>
                  <p className="mt-1.5 text-2xl font-bold tracking-[-0.045em] text-[#111827]">
                    {money(wallet.amount)}
                  </p>
                </div>

                <div className="relative mt-6 flex items-center justify-between border-t border-black/[0.055] pt-4">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: wallet.color }}
                    />
                    <span className="text-[11px] font-medium text-[#8a919d]">Active</span>
                  </div>
                  <button
                    type="button"
                    className="flex cursor-pointer items-center gap-1 text-[11px] font-semibold text-[#6b7280] transition group-hover:text-[#111827]"
                  >
                    View details
                    <ChevronRight size={14} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="mt-6 rounded-[20px] border border-dashed border-black/[0.12] bg-white/55 px-5 py-5 sm:flex sm:items-center sm:justify-between sm:gap-5">
        <div className="flex items-start gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#f1f3f5] text-[#6b7280]">
            <Plus size={18} />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#111827]">Another place you keep money?</p>
            <p className="mt-1 text-xs leading-5 text-[#8a919d]">
              Add a custom wallet for savings, another bank, or any balance you want to track.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setAddWalletOpen(true)}
          className="mt-4 cursor-pointer text-xs font-bold text-[#111827] transition hover:text-[#4b5563] sm:mt-0"
        >
          Add another wallet →
        </button>
      </section>

      <AnimatePresence>
        {addWalletOpen && (
          <Dialog
            open={addWalletOpen}
            onClose={closeDialog}
            fullWidth
            maxWidth="xs"
            PaperProps={{
              component: motion.div,
              initial: { opacity: 0, y: 16, scale: 0.97 },
              animate: { opacity: 1, y: 0, scale: 1 },
              exit: { opacity: 0, y: 16, scale: 0.97 },
              transition: { duration: 0.18, ease: "easeOut" },
              sx: { borderRadius: "22px", overflow: "hidden" },
            }}
          >
            <DialogTitle sx={{ px: 3, pt: 3, pb: 1.5 }}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-lg font-extrabold tracking-[-0.03em] text-[#111827]">Add wallet</p>
                  <p className="mt-1 text-xs font-normal text-[#9ca3af]">Create a new place to track your money.</p>
                </div>
                <button
                  type="button"
                  onClick={closeDialog}
                  aria-label="Close add wallet"
                  className="grid h-8 w-8 shrink-0 cursor-pointer place-items-center rounded-lg text-[#9ca3af] transition hover:bg-[#f5f6f7] hover:text-[#111827]"
                >
                  <X size={17} />
                </button>
              </div>
            </DialogTitle>

            <DialogContent sx={{ px: 3, pb: 3 }}>
              <div className="grid gap-4 pt-1">
                <TextField
                  fullWidth
                  label="Wallet name"
                  placeholder="e.g. Mandiri"
                  value={walletName}
                  onChange={(event) => setWalletName(event.target.value)}
                  slotProps={{ inputLabel: { shrink: true } }}
                  sx={{
                    "& .MuiOutlinedInput-root": { minHeight: 56, borderRadius: "12px" },
                    "& .MuiInputLabel-root": { backgroundColor: "#ffffff", px: 0.5 },
                  }}
                />

                <TextField
                  select
                  fullWidth
                  label="Wallet type"
                  value={walletType}
                  onChange={(event) => setWalletType(event.target.value)}
                  sx={{ "& .MuiOutlinedInput-root": { minHeight: 56, borderRadius: "12px" } }}
                >
                  <MenuItem value="Bank account">Bank account</MenuItem>
                  <MenuItem value="Cash">Cash</MenuItem>
                  <MenuItem value="E-wallet">E-wallet</MenuItem>
                  <MenuItem value="Savings">Savings</MenuItem>
                  <MenuItem value="Custom wallet">Custom wallet</MenuItem>
                </TextField>

                <TextField
                  fullWidth
                  label="Starting balance"
                  placeholder="Rp0"
                  value={startingBalance}
                  onChange={(event) => setStartingBalance(event.target.value)}
                  slotProps={{ inputLabel: { shrink: true } }}
                  sx={{
                    "& .MuiOutlinedInput-root": { minHeight: 56, borderRadius: "12px" },
                    "& .MuiInputLabel-root": { backgroundColor: "#ffffff", px: 0.5 },
                  }}
                />

                <Button
                  variant="contained"
                  size="large"
                  onClick={handleAddWallet}
                  disabled={!walletName.trim()}
                  sx={{
                    mt: 0.5,
                    minHeight: 48,
                    borderRadius: "12px",
                    bgcolor: "#111827",
                    textTransform: "none",
                    fontWeight: 700,
                    boxShadow: "none",
                    cursor: walletName.trim() ? "pointer" : "not-allowed",
                    "&:hover": { bgcolor: "#1f2937", boxShadow: "none" },
                  }}
                >
                  Create wallet
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
}
