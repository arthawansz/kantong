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
  Archive,
  ArrowDown,
  ArrowDownUp,
  ArrowUp,
  Banknote,
  Building2,
  ChevronRight,
  MoreHorizontal,
  Pencil,
  PiggyBank,
  Plus,
  Smartphone,
  Trash2,
  WalletCards,
  X,
} from "lucide-react";
import { money, wallets as initialWallets } from "../../data/mockDashboard";

const walletTypeMeta = {
  "Bank account": { type: "Bank account", icon: Building2 },
  Cash: { type: "Cash", icon: Banknote },
  "E-wallet": { type: "E-wallet", icon: Smartphone },
  Savings: { type: "Savings", icon: PiggyBank },
  "Custom wallet": { type: "Custom wallet", icon: WalletCards },
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
  { label: "Money in", value: 4250000, helper: "This month", positive: true },
  { label: "Money out", value: 1930000, helper: "This month", negative: true },
  { label: "Wallets", value: 3, helper: "Active wallets", compact: true },
];

const recentActivity = [
  { title: "Lunch", wallet: "BCA", amount: -48000, time: "Today, 12:40" },
  { title: "Freelance payment", wallet: "BCA", amount: 1250000, time: "Today, 09:12" },
  { title: "Coffee", wallet: "Cash", amount: -28000, time: "Yesterday, 16:02" },
  { title: "Ride", wallet: "GoPay", amount: -24000, time: "Yesterday, 08:15" },
];

const fieldSx = {
  "& .MuiOutlinedInput-root": { minHeight: 56, borderRadius: "12px" },
  "& .MuiInputLabel-root": { backgroundColor: "#ffffff", px: 0.5 },
};

export default function WalletsPage() {
  const [wallets, setWallets] = useState(initialWallets.map((wallet) => ({ ...wallet, archived: false })));
  const [addWalletOpen, setAddWalletOpen] = useState(false);
  const [walletName, setWalletName] = useState("");
  const [walletType, setWalletType] = useState("Bank account");
  const [startingBalance, setStartingBalance] = useState("");

  const [menuWallet, setMenuWallet] = useState(null);
  const [detailsWallet, setDetailsWallet] = useState(null);
  const [editWallet, setEditWallet] = useState(null);
  const [editName, setEditName] = useState("");
  const [editType, setEditType] = useState("Bank account");
  const [transferWallet, setTransferWallet] = useState(null);
  const [transferTarget, setTransferTarget] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [manageOrderOpen, setManageOrderOpen] = useState(false);

  const activeWallets = wallets.filter((wallet) => !wallet.archived);
  const totalBalance = useMemo(
    () => activeWallets.reduce((total, wallet) => total + wallet.amount, 0),
    [wallets]
  );

  const resolvedType = (wallet) =>
    wallet.customType ?? defaultWalletTypes[wallet.name] ?? "Custom wallet";

  const resolvedVisuals = (wallet) =>
    walletVisuals[wallet.name] ?? { accent: wallet.color, tint: "#f8fafc" };

  const closeAddDialog = () => {
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
        archived: false,
      },
    ]);
    closeAddDialog();
  };

  const openEdit = (wallet) => {
    setMenuWallet(null);
    setEditWallet(wallet);
    setEditName(wallet.name);
    setEditType(resolvedType(wallet));
  };

  const saveEdit = () => {
    if (!editWallet || !editName.trim()) return;
    setWallets((items) =>
      items.map((wallet) =>
        wallet === editWallet
          ? { ...wallet, name: editName.trim(), customType: editType }
          : wallet
      )
    );
    setEditWallet(null);
  };

  const openTransfer = (wallet) => {
    setMenuWallet(null);
    setTransferWallet(wallet);
    const firstTarget = wallets.find((item) => item !== wallet && !item.archived);
    setTransferTarget(firstTarget?.name ?? "");
    setTransferAmount("");
  };

  const submitTransfer = () => {
    if (!transferWallet || !transferTarget) return;
    const amount = Number(transferAmount.replace(/[^0-9]/g, "")) || 0;
    if (amount <= 0 || amount > transferWallet.amount) return;

    setWallets((items) =>
      items.map((wallet) => {
        if (wallet === transferWallet) return { ...wallet, amount: wallet.amount - amount };
        if (wallet.name === transferTarget) return { ...wallet, amount: wallet.amount + amount };
        return wallet;
      })
    );
    setTransferWallet(null);
  };

  const toggleArchive = (wallet) => {
    setMenuWallet(null);
    setWallets((items) =>
      items.map((item) => (item === wallet ? { ...item, archived: !item.archived } : item))
    );
  };

  const deleteWallet = (wallet) => {
    setMenuWallet(null);
    setWallets((items) => items.filter((item) => item !== wallet));
  };

  const moveWallet = (index, direction) => {
    setWallets((items) => {
      const nextIndex = index + direction;
      if (nextIndex < 0 || nextIndex >= items.length) return items;
      const next = [...items];
      [next[index], next[nextIndex]] = [next[nextIndex], next[index]];
      return next;
    });
  };

  return (
    <>
      <section>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9aa1ab]">Wallet management</p>
            <h2 className="mt-2 text-2xl font-bold tracking-[-0.04em] text-[#111827] sm:text-[30px]">Your money, in one place.</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#7a828e]">Track every bank account, cash balance, and e-wallet you use from one clear overview.</p>
          </div>

          <Button
            variant="contained"
            startIcon={<Plus size={17} />}
            onClick={() => setAddWalletOpen(true)}
            sx={{ alignSelf: { xs: "flex-start", sm: "auto" }, minHeight: 42, borderRadius: "12px", bgcolor: "#111827", px: 2, textTransform: "none", fontWeight: 700, boxShadow: "none", cursor: "pointer", "&:hover": { bgcolor: "#1f2937", boxShadow: "none" } }}
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
                <p className="mt-2 text-4xl font-bold tracking-[-0.055em] sm:text-[44px]">{money(totalBalance)}</p>
                <p className="mt-3 text-xs text-white/45">Across {activeWallets.length} active wallets</p>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:min-w-[480px]">
                {quickStats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/[0.08] bg-white/[0.045] px-4 py-3.5">
                    <p className="text-[11px] font-medium text-white/45">{stat.label}</p>
                    <p className={`mt-1.5 text-sm font-semibold tracking-[-0.02em] ${stat.negative ? "text-red-300" : stat.positive ? "text-green-300" : ""} `}>{stat.compact ? activeWallets.length : money(stat.value)}</p>
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
          <button type="button" onClick={() => setManageOrderOpen(true)} className="cursor-pointer text-xs font-semibold text-[#7a828e] transition hover:text-[#111827]">Manage order</button>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {wallets.map((wallet, index) => {
            const typeMeta = walletTypeMeta[resolvedType(wallet)] ?? walletTypeMeta["Custom wallet"];
            const visuals = resolvedVisuals(wallet);
            const Icon = typeMeta.icon;

            return (
              <motion.div
                key={`${wallet.name}-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.04 }}
                className={`group relative overflow-visible rounded-[20px] border border-black/[0.06] bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/[0.04] ${wallet.archived ? "opacity-55" : ""}`}
              >
                <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[20px]">
                  <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-70" style={{ backgroundColor: visuals.tint }} />
                </div>
                <div className="relative flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl" style={{ backgroundColor: visuals.tint, color: visuals.accent }}>
                      <Icon size={19} strokeWidth={1.9} />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-[#111827]">{wallet.name}</p>
                      <p className="mt-1 text-[11px] text-[#9ca3af]">{typeMeta.type}</p>
                    </div>
                  </div>

                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setMenuWallet(menuWallet === wallet ? null : wallet)}
                      aria-label={`More options for ${wallet.name}`}
                      className="grid h-8 w-8 shrink-0 cursor-pointer place-items-center rounded-lg text-[#9ca3af] transition hover:bg-[#f5f6f7] hover:text-[#111827]"
                    >
                      <MoreHorizontal size={17} />
                    </button>

                    <AnimatePresence>
                      {menuWallet === wallet && (
                        <motion.div
                          initial={{ opacity: 0, y: -6, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -6, scale: 0.96 }}
                          transition={{ duration: 0.16, ease: "easeOut" }}
                          className="absolute right-0 top-9 z-30 w-48 overflow-hidden rounded-2xl border border-black/[0.07] bg-white p-1.5 shadow-xl shadow-black/[0.08]"
                        >
                          <button type="button" onClick={() => openEdit(wallet)} className="flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-xs font-medium text-[#4b5563] transition hover:bg-[#f7f8fa] hover:text-[#111827]"><Pencil size={15} /> Edit wallet</button>
                          <button type="button" onClick={() => openTransfer(wallet)} disabled={wallet.archived} className="flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-xs font-medium text-[#4b5563] transition hover:bg-[#f7f8fa] hover:text-[#111827] disabled:cursor-not-allowed disabled:opacity-40"><ArrowDownUp size={15} /> Transfer money</button>
                          <button type="button" onClick={() => toggleArchive(wallet)} className="flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-xs font-medium text-[#4b5563] transition hover:bg-[#f7f8fa] hover:text-[#111827]"><Archive size={15} /> {wallet.archived ? "Restore wallet" : "Archive wallet"}</button>
                          <div className="my-1 border-t border-black/[0.06]" />
                          <button type="button" onClick={() => deleteWallet(wallet)} className="flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-xs font-semibold text-[#dc2626] transition hover:bg-red-50"><Trash2 size={15} /> Delete wallet</button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="relative mt-7">
                  <p className="text-[11px] font-medium text-[#9ca3af]">Current balance</p>
                  <p className="mt-1.5 text-2xl font-bold tracking-[-0.045em] text-[#111827]">{money(wallet.amount)}</p>
                </div>

                <div className="relative mt-6 flex items-center justify-between border-t border-black/[0.055] pt-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: wallet.archived ? "#9ca3af" : wallet.color }} />
                    <span className="text-[11px] font-medium text-[#8a919d]">{wallet.archived ? "Archived" : "Active"}</span>
                  </div>
                  <button type="button" onClick={() => setDetailsWallet(wallet)} className="flex cursor-pointer items-center gap-1 text-[11px] font-semibold text-[#6b7280] transition group-hover:text-[#111827]">View details <ChevronRight size={14} /></button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="mt-6 rounded-[20px] border border-dashed border-black/[0.12] bg-white/55 px-5 py-5 sm:flex sm:items-center sm:justify-between sm:gap-5">
        <div className="flex items-start gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#f1f3f5] text-[#6b7280]"><Plus size={18} /></div>
          <div>
            <p className="text-sm font-semibold text-[#111827]">Another place you keep money?</p>
            <p className="mt-1 text-xs leading-5 text-[#8a919d]">Add a custom wallet for savings, another bank, or any balance you want to track.</p>
          </div>
        </div>
        <button type="button" onClick={() => setAddWalletOpen(true)} className="mt-4 cursor-pointer text-xs font-bold text-[#111827] transition hover:text-[#4b5563] sm:mt-0">Add another wallet →</button>
      </section>

      <Dialog open={addWalletOpen} onClose={closeAddDialog} fullWidth maxWidth="xs" PaperProps={{ sx: { borderRadius: "22px", overflow: "hidden" } }}>
        <DialogTitle sx={{ px: 3, pt: 3, pb: 1.5 }}>
          <div className="flex items-start justify-between gap-4">
            <div><p className="text-lg font-extrabold tracking-[-0.03em] text-[#111827]">Add wallet</p><p className="mt-1 text-xs font-normal text-[#9ca3af]">Create a new place to track your money.</p></div>
            <button type="button" onClick={closeAddDialog} className="grid h-8 w-8 cursor-pointer place-items-center rounded-lg text-[#9ca3af] transition hover:bg-[#f5f6f7] hover:text-[#111827]"><X size={17} /></button>
          </div>
        </DialogTitle>
        <DialogContent sx={{ px: 3, pb: 3 }}>
          <div className="grid gap-4 pt-1">
            <TextField fullWidth label="Wallet name" placeholder="e.g. Mandiri" value={walletName} onChange={(e) => setWalletName(e.target.value)} slotProps={{ inputLabel: { shrink: true } }} sx={fieldSx} />
            <TextField select fullWidth label="Wallet type" value={walletType} onChange={(e) => setWalletType(e.target.value)} sx={fieldSx}>{Object.keys(walletTypeMeta).map((type) => <MenuItem key={type} value={type}>{type}</MenuItem>)}</TextField>
            <TextField fullWidth label="Starting balance" placeholder="Rp0" value={startingBalance} onChange={(e) => setStartingBalance(e.target.value)} slotProps={{ inputLabel: { shrink: true } }} sx={fieldSx} />
            <Button variant="contained" size="large" onClick={handleAddWallet} disabled={!walletName.trim()} sx={{ minHeight: 48, borderRadius: "12px", bgcolor: "#111827", textTransform: "none", fontWeight: 700, boxShadow: "none", cursor: walletName.trim() ? "pointer" : "not-allowed", "&:hover": { bgcolor: "#1f2937", boxShadow: "none" } }}>Create wallet</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(detailsWallet)} onClose={() => setDetailsWallet(null)} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: "22px" } }}>
        {detailsWallet && (
          <>
            <DialogTitle sx={{ px: 3, pt: 3, pb: 1.5 }}>
              <div className="flex items-start justify-between gap-4"><div><p className="text-lg font-extrabold">{detailsWallet.name}</p><p className="mt-1 text-xs font-normal text-[#9ca3af]">{resolvedType(detailsWallet)} · wallet details</p></div><button type="button" onClick={() => setDetailsWallet(null)} className="grid h-8 w-8 cursor-pointer place-items-center rounded-lg text-[#9ca3af] hover:bg-[#f5f6f7]"><X size={17} /></button></div>
            </DialogTitle>
            <DialogContent sx={{ px: 3, pb: 3 }}>
              <div className="rounded-2xl bg-[#111827] p-5 text-white"><p className="text-xs text-white/55">Current balance</p><p className="mt-2 text-3xl font-bold tracking-[-0.04em]">{money(detailsWallet.amount)}</p><p className="mt-2 text-[11px] text-white/40">{detailsWallet.archived ? "Archived wallet" : "Active wallet"}</p></div>
              <div className="mt-5"><p className="text-sm font-bold">Recent activity</p><div className="mt-3 divide-y divide-black/[0.06]">{recentActivity.filter((item) => item.wallet === detailsWallet.name).length ? recentActivity.filter((item) => item.wallet === detailsWallet.name).map((item) => <div key={`${item.title}-${item.time}`} className="flex items-center justify-between gap-4 py-3"><div><p className="text-sm font-semibold">{item.title}</p><p className="mt-1 text-[11px] text-[#9ca3af]">{item.time}</p></div><p className={`text-sm font-bold ${item.amount > 0 ? "text-emerald-700" : "text-red-600"}`}>{item.amount > 0 ? "+" : "−"}{money(Math.abs(item.amount))}</p></div>) : <div className="py-8 text-center text-xs text-[#9ca3af]">No mock activity yet for this wallet.</div>}</div></div>
            </DialogContent>
          </>
        )}
      </Dialog>

      <Dialog open={Boolean(editWallet)} onClose={() => setEditWallet(null)} fullWidth maxWidth="xs" PaperProps={{ sx: { borderRadius: "22px" } }}>
        <DialogTitle sx={{ px: 3, pt: 3, pb: 1.5 }}><p className="text-lg font-extrabold">Edit wallet</p><p className="mt-1 text-xs font-normal text-[#9ca3af]">Update wallet identity and type.</p></DialogTitle>
        <DialogContent sx={{ px: 3, pb: 3 }}><div className="grid gap-4 pt-1"><TextField fullWidth label="Wallet name" value={editName} onChange={(e) => setEditName(e.target.value)} slotProps={{ inputLabel: { shrink: true } }} sx={fieldSx} /><TextField select fullWidth label="Wallet type" value={editType} onChange={(e) => setEditType(e.target.value)} sx={fieldSx}>{Object.keys(walletTypeMeta).map((type) => <MenuItem key={type} value={type}>{type}</MenuItem>)}</TextField><Button variant="contained" onClick={saveEdit} sx={{ minHeight: 46, borderRadius: "12px", bgcolor: "#111827", textTransform: "none", fontWeight: 700, cursor: "pointer", "&:hover": { bgcolor: "#1f2937" } }}>Save changes</Button></div></DialogContent>
      </Dialog>

      <Dialog open={Boolean(transferWallet)} onClose={() => setTransferWallet(null)} fullWidth maxWidth="xs" PaperProps={{ sx: { borderRadius: "22px" } }}>
        {transferWallet && <><DialogTitle sx={{ px: 3, pt: 3, pb: 1.5 }}><p className="text-lg font-extrabold">Transfer money</p><p className="mt-1 text-xs font-normal text-[#9ca3af]">From {transferWallet.name} · Available {money(transferWallet.amount)}</p></DialogTitle><DialogContent sx={{ px: 3, pb: 3 }}><div className="grid gap-4 pt-1"><TextField select fullWidth label="To wallet" value={transferTarget} onChange={(e) => setTransferTarget(e.target.value)} sx={fieldSx}>{wallets.filter((item) => item !== transferWallet && !item.archived).map((item) => <MenuItem key={item.name} value={item.name}>{item.name}</MenuItem>)}</TextField><TextField fullWidth label="Amount" placeholder="Rp0" value={transferAmount} onChange={(e) => setTransferAmount(e.target.value)} slotProps={{ inputLabel: { shrink: true } }} sx={fieldSx} /><Button variant="contained" onClick={submitTransfer} sx={{ minHeight: 46, borderRadius: "12px", bgcolor: "#111827", textTransform: "none", fontWeight: 700, cursor: "pointer", "&:hover": { bgcolor: "#1f2937" } }}>Transfer</Button></div></DialogContent></>}
      </Dialog>

      <Dialog open={manageOrderOpen} onClose={() => setManageOrderOpen(false)} fullWidth maxWidth="xs" PaperProps={{ sx: { borderRadius: "22px" } }}>
        <DialogTitle sx={{ px: 3, pt: 3, pb: 1.5 }}><p className="text-lg font-extrabold">Manage wallet order</p><p className="mt-1 text-xs font-normal text-[#9ca3af]">Choose which wallets appear first.</p></DialogTitle>
        <DialogContent sx={{ px: 3, pb: 3 }}><div className="space-y-2 pt-1">{wallets.map((wallet, index) => <div key={`${wallet.name}-order`} className="flex items-center justify-between gap-3 rounded-2xl border border-black/[0.06] px-3 py-3"><div className="min-w-0"><p className="truncate text-sm font-semibold">{wallet.name}</p><p className="mt-0.5 text-[10px] text-[#9ca3af]">{resolvedType(wallet)}</p></div><div className="flex gap-1"><button type="button" onClick={() => moveWallet(index, -1)} disabled={index === 0} className="grid h-8 w-8 cursor-pointer place-items-center rounded-lg text-[#6b7280] hover:bg-[#f5f6f7] disabled:cursor-not-allowed disabled:opacity-30"><ArrowUp size={15} /></button><button type="button" onClick={() => moveWallet(index, 1)} disabled={index === wallets.length - 1} className="grid h-8 w-8 cursor-pointer place-items-center rounded-lg text-[#6b7280] hover:bg-[#f5f6f7] disabled:cursor-not-allowed disabled:opacity-30"><ArrowDown size={15} /></button></div></div>)}</div></DialogContent>
      </Dialog>
    </>
  );
}