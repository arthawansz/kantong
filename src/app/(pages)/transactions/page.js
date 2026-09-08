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
  ArrowDownLeft,
  ArrowDownUp,
  ArrowUpRight,
  BriefcaseBusiness,
  Car,
  Copy,
  Landmark,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  Trash2,
  Utensils,
  X,
} from "lucide-react";
import { money, wallets } from "../../data/mockDashboard";

const categoryMeta = {
  "Food & Drink": { icon: Utensils, bg: "#fef3c7" },
  Transport: { icon: Car, bg: "#dbeafe" },
  Shopping: { icon: ShoppingBag, bg: "#f3e8ff" },
  Freelance: { icon: BriefcaseBusiness, bg: "#dcfce7" },
  Transfer: { icon: Landmark, bg: "#e0e7ff" },
};

const seedTransactions = [
  { id: 1, title: "Lunch", category: "Food & Drink", wallet: "BCA", amount: -48000, type: "Expense", dateLabel: "Today", date: "2026-09-08", time: "12:40", note: "Lunch near campus" },
  { id: 2, title: "Freelance payment", category: "Freelance", wallet: "BCA", amount: 1250000, type: "Income", dateLabel: "Today", date: "2026-09-08", time: "09:12", note: "Landing page project" },
  { id: 3, title: "Top up GoPay", category: "Transfer", wallet: "BCA", toWallet: "GoPay", amount: -250000, type: "Transfer", dateLabel: "Yesterday", date: "2026-09-07", time: "19:30", note: "Monthly e-wallet top up" },
  { id: 4, title: "Ride to campus", category: "Transport", wallet: "GoPay", amount: -24000, type: "Expense", dateLabel: "Yesterday", date: "2026-09-07", time: "08:15", note: "Morning ride" },
  { id: 5, title: "Keyboard accessories", category: "Shopping", wallet: "BCA", amount: -185000, type: "Expense", dateLabel: "September 6", date: "2026-09-06", time: "16:05", note: "Desk setup" },
];

const fieldSx = {
  "& .MuiOutlinedInput-root": { minHeight: 52, borderRadius: "12px" },
  "& .MuiInputLabel-root": { backgroundColor: "#ffffff", px: 0.5 },
};

const typeTone = {
  Income: "bg-emerald-50 text-emerald-700",
  Expense: "bg-red-50 text-red-700",
  Transfer: "bg-blue-50 text-blue-700",
};

const amountTone = (type) => {
  if (type === "Income") return "text-[#15803d]";
  if (type === "Expense") return "text-[#dc2626]";
  return "text-[#2563eb]";
};

export default function TransactionsPage() {
  const [items, setItems] = useState(seedTransactions);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [walletFilter, setWalletFilter] = useState("All");
  const [menuTransaction, setMenuTransaction] = useState(null);
  const [detailTransaction, setDetailTransaction] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [formType, setFormType] = useState("Expense");
  const [formTitle, setFormTitle] = useState("");
  const [formAmount, setFormAmount] = useState("");
  const [formWallet, setFormWallet] = useState("BCA");
  const [formCategory, setFormCategory] = useState("Food & Drink");
  const [formToWallet, setFormToWallet] = useState("GoPay");
  const [formDate, setFormDate] = useState("2026-09-08");
  const [formNote, setFormNote] = useState("");

  const summary = useMemo(() => {
    const income = items.filter((item) => item.type === "Income").reduce((total, item) => total + Math.abs(item.amount), 0);
    const expense = items.filter((item) => item.type === "Expense").reduce((total, item) => total + Math.abs(item.amount), 0);
    return { income, expense, net: income - expense, count: items.length };
  }, [items]);

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();
    return items.filter((item) => {
      const matchesSearch = !query || [item.title, item.category, item.wallet, item.toWallet, item.note].filter(Boolean).some((value) => value.toLowerCase().includes(query));
      const matchesType = typeFilter === "All" || item.type === typeFilter;
      const matchesWallet = walletFilter === "All" || item.wallet === walletFilter || item.toWallet === walletFilter;
      return matchesSearch && matchesType && matchesWallet;
    });
  }, [items, search, typeFilter, walletFilter]);

  const groupedItems = useMemo(() => filteredItems.reduce((groups, item) => {
    if (!groups[item.dateLabel]) groups[item.dateLabel] = [];
    groups[item.dateLabel].push(item);
    return groups;
  }, {}), [filteredItems]);

  const walletNames = wallets.map((wallet) => wallet.name);

  const resetForm = () => {
    setEditingTransaction(null);
    setFormType("Expense");
    setFormTitle("");
    setFormAmount("");
    setFormWallet("BCA");
    setFormCategory("Food & Drink");
    setFormToWallet("GoPay");
    setFormDate("2026-09-08");
    setFormNote("");
  };

  const openAdd = () => {
    resetForm();
    setFormOpen(true);
  };

  const openEdit = (item) => {
    setMenuTransaction(null);
    setEditingTransaction(item);
    setFormType(item.type);
    setFormTitle(item.title);
    setFormAmount(String(Math.abs(item.amount)));
    setFormWallet(item.wallet);
    setFormCategory(item.category);
    setFormToWallet(item.toWallet ?? wallets.find((wallet) => wallet.name !== item.wallet)?.name ?? "GoPay");
    setFormDate(item.date);
    setFormNote(item.note ?? "");
    setFormOpen(true);
  };

  const saveTransaction = () => {
    const cleanTitle = formTitle.trim();
    const numericAmount = Number(formAmount.replace(/[^0-9]/g, "")) || 0;
    if (!cleanTitle || numericAmount <= 0) return;

    const nextTransaction = {
      id: editingTransaction?.id ?? Date.now(),
      title: cleanTitle,
      category: formType === "Transfer" ? "Transfer" : formCategory,
      wallet: formWallet,
      toWallet: formType === "Transfer" ? formToWallet : undefined,
      amount: formType === "Income" ? numericAmount : -numericAmount,
      type: formType,
      dateLabel: formDate === "2026-09-08" ? "Today" : formDate === "2026-09-07" ? "Yesterday" : formDate,
      date: formDate,
      time: editingTransaction?.time ?? "Just now",
      note: formNote.trim(),
    };

    setItems((current) => editingTransaction ? current.map((item) => item.id === editingTransaction.id ? nextTransaction : item) : [nextTransaction, ...current]);
    setFormOpen(false);
    resetForm();
  };

  const duplicateTransaction = (item) => {
    setMenuTransaction(null);
    setItems((current) => [{ ...item, id: Date.now(), title: `${item.title} copy`, time: "Just now", dateLabel: "Today", date: "2026-09-08" }, ...current]);
  };

  const deleteTransaction = (item) => {
    setMenuTransaction(null);
    setItems((current) => current.filter((entry) => entry.id !== item.id));
    if (detailTransaction?.id === item.id) setDetailTransaction(null);
  };

  return (
    <>
      <section>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9aa1ab]">Transaction intelligence</p>
            <h2 className="mt-2 text-2xl font-bold tracking-[-0.04em] text-[#111827] sm:text-[30px]">Every movement, accounted for.</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#7a828e]">Search, filter, and read your money flow without losing the context behind each transaction.</p>
          </div>
          <Button
            variant="contained"
            startIcon={<Plus size={17} />}
            onClick={openAdd}
            sx={{ alignSelf: { xs: "flex-start", sm: "auto" }, minHeight: 42, borderRadius: "12px", bgcolor: "#111827", px: 2, textTransform: "none", fontWeight: 700, boxShadow: "none", cursor: "pointer", "&:hover": { bgcolor: "#1f2937", boxShadow: "none" } }}
          >
            Add transaction
          </Button>
        </div>

        <div className="relative mt-6 overflow-hidden rounded-[24px] bg-[#111827] p-6 text-white md:p-7">
          <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full border border-white/[0.08]" />
          <div className="pointer-events-none absolute right-8 top-8 h-40 w-40 rounded-full border border-white/[0.05]" />
          <div className="relative grid gap-6 xl:grid-cols-[1.15fr_1fr] xl:items-end">
            <div>
              <div className="flex items-center gap-2 text-white/50"><Sparkles size={14} /><p className="text-xs font-semibold uppercase tracking-[0.14em]">September flow</p></div>
              <p className="mt-5 text-sm text-white/55">Net flow</p>
              <p className={`mt-2 text-4xl font-bold tracking-[-0.055em] sm:text-[44px] ${summary.net >= 0 ? "text-white" : "text-red-300"}`}>{summary.net >= 0 ? "+" : "−"}{money(Math.abs(summary.net))}</p>
              <p className="mt-3 text-xs text-white/45">Across {summary.count} tracked movements this month</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.045] p-4"><div className="flex items-center justify-between"><p className="text-[11px] text-white/45">Income</p><ArrowDownLeft size={14} className="text-emerald-300" /></div><p className="mt-2 text-sm font-semibold text-emerald-300">+{money(summary.income)}</p><p className="mt-1 text-[10px] text-white/35">Money in</p></div>
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.045] p-4"><div className="flex items-center justify-between"><p className="text-[11px] text-white/45">Expense</p><ArrowUpRight size={14} className="text-red-300" /></div><p className="mt-2 text-sm font-semibold text-red-300">−{money(summary.expense)}</p><p className="mt-1 text-[10px] text-white/35">Money out</p></div>
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.045] p-4"><div className="flex items-center justify-between"><p className="text-[11px] text-white/45">Activity</p><ArrowDownUp size={14} className="text-blue-300" /></div><p className="mt-2 text-sm font-semibold">{summary.count} entries</p><p className="mt-1 text-[10px] text-white/35">Tracked movements</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-[22px] border border-black/[0.06] bg-white p-4 md:p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9ca3af]" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search transactions, notes, wallets..."
              className="h-11 w-full rounded-xl border border-black/[0.08] bg-[#fafbfc] pl-10 pr-4 text-sm outline-none transition focus:border-[#aeb5bf] focus:bg-white"
            />
          </div>
          <div className="grid grid-cols-2 gap-3 lg:flex">
            <TextField select size="small" label="Type" value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)} sx={{ minWidth: 145, "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}>
              {["All", "Income", "Expense", "Transfer"].map((type) => <MenuItem key={type} value={type}>{type}</MenuItem>)}
            </TextField>
            <TextField select size="small" label="Wallet" value={walletFilter} onChange={(event) => setWalletFilter(event.target.value)} sx={{ minWidth: 145, "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}>
              <MenuItem value="All">All wallets</MenuItem>
              {walletNames.map((wallet) => <MenuItem key={wallet} value={wallet}>{wallet}</MenuItem>)}
            </TextField>
          </div>
        </div>
        {(search || typeFilter !== "All" || walletFilter !== "All") && (
          <div className="mt-3 flex items-center justify-between gap-4 border-t border-black/[0.05] pt-3"><p className="text-[11px] text-[#9ca3af]">{filteredItems.length} matching transactions</p><button type="button" onClick={() => { setSearch(""); setTypeFilter("All"); setWalletFilter("All"); }} className="cursor-pointer text-[11px] font-semibold text-[#6b7280] transition hover:text-[#111827]">Reset filters</button></div>
        )}
      </section>

      <section className="mt-5 overflow-visible rounded-[22px] border border-black/[0.06] bg-white px-3 py-2 md:px-5">
        {filteredItems.length ? Object.entries(groupedItems).map(([group, groupItems]) => (
          <div key={group} className="py-3">
            <div className="flex items-center gap-3 px-1 pb-2"><p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9ca3af]">{group}</p><div className="h-px flex-1 bg-black/[0.045]" /></div>
            <div className="space-y-2">
              {groupItems.map((item, index) => {
                const meta = categoryMeta[item.category] ?? categoryMeta.Transfer;
                const Icon = meta.icon;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18, delay: index * 0.025 }}
                    onClick={() => setDetailTransaction(item)}
                    className="group relative flex cursor-pointer items-center gap-3 rounded-2xl border border-transparent px-2 py-3 transition hover:border-black/[0.05] hover:bg-[#fafbfc] sm:gap-4 sm:px-3"
                  >
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl" style={{ backgroundColor: meta.bg }}><Icon size={18} strokeWidth={1.8} /></div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="flex min-w-0 items-center gap-2"><p className="truncate text-sm font-semibold text-[#111827]">{item.title}</p><span className={`hidden rounded-full px-2 py-0.5 text-[9px] font-semibold sm:inline ${typeTone[item.type]}`}>{item.type}</span></div>
                          <p className="mt-1 truncate text-xs text-[#9ca3af]">{item.category} · {item.type === "Transfer" ? `${item.wallet} → ${item.toWallet}` : item.wallet} · {item.time}</p>
                        </div>
                        <div className="flex shrink-0 items-start gap-2">
                          <div className="text-right"><p className={`text-sm font-bold ${amountTone(item.type)}`}>{item.type === "Income" ? "+" : item.type === "Expense" ? "−" : ""}{money(Math.abs(item.amount))}</p><p className="mt-1 text-[10px] text-[#a1a7b0]">{item.date}</p></div>
                          <div className="relative" onClick={(event) => event.stopPropagation()}>
                            <button type="button" onClick={() => setMenuTransaction(menuTransaction?.id === item.id ? null : item)} className="grid h-8 w-8 cursor-pointer place-items-center rounded-lg text-[#9ca3af] transition hover:bg-[#eef0f3] hover:text-[#111827]" aria-label={`More options for ${item.title}`}><MoreHorizontal size={17} /></button>
                            <AnimatePresence>
                              {menuTransaction?.id === item.id && (
                                <motion.div initial={{ opacity: 0, y: -5, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -5, scale: 0.97 }} transition={{ duration: 0.15 }} className="absolute right-0 top-9 z-30 w-44 overflow-hidden rounded-2xl border border-black/[0.07] bg-white p-1.5 shadow-xl shadow-black/[0.08]">
                                  <button type="button" onClick={() => openEdit(item)} className="flex w-full cursor-pointer items-center gap-2 rounded-xl px-3 py-2.5 text-left text-xs font-medium text-[#4b5563] hover:bg-[#f7f8fa] hover:text-[#111827]"><Pencil size={14} /> Edit</button>
                                  <button type="button" onClick={() => duplicateTransaction(item)} className="flex w-full cursor-pointer items-center gap-2 rounded-xl px-3 py-2.5 text-left text-xs font-medium text-[#4b5563] hover:bg-[#f7f8fa] hover:text-[#111827]"><Copy size={14} /> Duplicate</button>
                                  <div className="my-1 border-t border-black/[0.06]" />
                                  <button type="button" onClick={() => deleteTransaction(item)} className="flex w-full cursor-pointer items-center gap-2 rounded-xl px-3 py-2.5 text-left text-xs font-semibold text-[#dc2626] hover:bg-red-50"><Trash2 size={14} /> Delete</button>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )) : (
          <div className="py-16 text-center"><div className="mx-auto grid h-11 w-11 place-items-center rounded-2xl bg-[#f3f4f6] text-[#7a828e]"><Search size={18} /></div><p className="mt-4 text-sm font-semibold text-[#111827]">No transactions found</p><p className="mt-1 text-xs text-[#9ca3af]">Try changing your search or filters.</p></div>
        )}
      </section>

      <Dialog open={formOpen} onClose={() => setFormOpen(false)} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: "22px" } }}>
        <DialogTitle sx={{ px: 3, pt: 3, pb: 1.5 }}>
          <div className="flex items-start justify-between gap-4"><div><p className="text-lg font-extrabold tracking-[-0.03em]">{editingTransaction ? "Edit transaction" : "Add transaction"}</p><p className="mt-1 text-xs font-normal text-[#9ca3af]">{editingTransaction ? "Update this money movement." : "Record a new income, expense, or transfer."}</p></div><button type="button" onClick={() => setFormOpen(false)} className="grid h-8 w-8 cursor-pointer place-items-center rounded-lg text-[#9ca3af] hover:bg-[#f5f6f7]"><X size={17} /></button></div>
        </DialogTitle>
        <DialogContent sx={{ px: 3, pb: 3 }}>
          <div className="grid gap-4 pt-1">
            <TextField select fullWidth label="Type" value={formType} onChange={(event) => setFormType(event.target.value)} sx={fieldSx}>{["Income", "Expense", "Transfer"].map((type) => <MenuItem key={type} value={type}>{type}</MenuItem>)}</TextField>
            <div className="grid gap-4 sm:grid-cols-2"><TextField fullWidth label="Title" value={formTitle} onChange={(event) => setFormTitle(event.target.value)} slotProps={{ inputLabel: { shrink: true } }} sx={fieldSx} /><TextField fullWidth label="Amount" placeholder="Rp0" value={formAmount} onChange={(event) => setFormAmount(event.target.value)} slotProps={{ inputLabel: { shrink: true } }} sx={fieldSx} /></div>
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField select fullWidth label="Wallet" value={formWallet} onChange={(event) => { const value = event.target.value; setFormWallet(value); if (value === formToWallet) setFormToWallet(walletNames.find((name) => name !== value) ?? ""); }} sx={fieldSx}>{walletNames.map((wallet) => <MenuItem key={wallet} value={wallet}>{wallet}</MenuItem>)}</TextField>
              {formType === "Transfer" ? <TextField select fullWidth label="To wallet" value={formToWallet} onChange={(event) => setFormToWallet(event.target.value)} sx={fieldSx}>{walletNames.filter((wallet) => wallet !== formWallet).map((wallet) => <MenuItem key={wallet} value={wallet}>{wallet}</MenuItem>)}</TextField> : <TextField select fullWidth label="Category" value={formCategory} onChange={(event) => setFormCategory(event.target.value)} sx={fieldSx}>{Object.keys(categoryMeta).filter((category) => category !== "Transfer").map((category) => <MenuItem key={category} value={category}>{category}</MenuItem>)}</TextField>}
            </div>
            <TextField fullWidth label="Note" value={formNote} onChange={(event) => setFormNote(event.target.value)} slotProps={{ inputLabel: { shrink: true } }} sx={fieldSx} />
            <TextField fullWidth type="date" label="Date" value={formDate} onChange={(event) => setFormDate(event.target.value)} slotProps={{ inputLabel: { shrink: true } }} sx={fieldSx} />
            <Button variant="contained" onClick={saveTransaction} disabled={!formTitle.trim() || !Number(formAmount.replace(/[^0-9]/g, ""))} sx={{ minHeight: 48, borderRadius: "12px", bgcolor: "#111827", textTransform: "none", fontWeight: 700, boxShadow: "none", cursor: formTitle.trim() && Number(formAmount.replace(/[^0-9]/g, "")) ? "pointer" : "not-allowed", "&:hover": { bgcolor: "#1f2937", boxShadow: "none" } }}>{editingTransaction ? "Save changes" : "Save transaction"}</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(detailTransaction)} onClose={() => setDetailTransaction(null)} fullWidth maxWidth="xs" PaperProps={{ sx: { borderRadius: "22px" } }}>
        {detailTransaction && (
          <>
            <DialogTitle sx={{ px: 3, pt: 3, pb: 1.5 }}><div className="flex items-start justify-between gap-4"><div><p className="text-lg font-extrabold tracking-[-0.03em]">Transaction details</p><p className="mt-1 text-xs font-normal text-[#9ca3af]">{detailTransaction.dateLabel} · {detailTransaction.time}</p></div><button type="button" onClick={() => setDetailTransaction(null)} className="grid h-8 w-8 cursor-pointer place-items-center rounded-lg text-[#9ca3af] hover:bg-[#f5f6f7]"><X size={17} /></button></div></DialogTitle>
            <DialogContent sx={{ px: 3, pb: 3 }}>
              <div className="rounded-2xl bg-[#111827] p-5 text-white"><p className="text-xs text-white/55">{detailTransaction.title}</p><p className={`mt-2 text-3xl font-bold tracking-[-0.04em] ${detailTransaction.type === "Income" ? "text-emerald-300" : detailTransaction.type === "Expense" ? "text-red-300" : "text-blue-300"}`}>{detailTransaction.type === "Income" ? "+" : detailTransaction.type === "Expense" ? "−" : ""}{money(Math.abs(detailTransaction.amount))}</p><p className="mt-2 text-[11px] text-white/45">{detailTransaction.type}</p></div>
              <div className="mt-5 space-y-3 text-sm">{[["Category", detailTransaction.category], ["Wallet", detailTransaction.type === "Transfer" ? `${detailTransaction.wallet} → ${detailTransaction.toWallet}` : detailTransaction.wallet], ["Date", detailTransaction.date], ["Note", detailTransaction.note || "No note"]].map(([label, value]) => <div key={label} className="flex items-start justify-between gap-5 border-b border-black/[0.055] pb-3"><span className="text-[#9ca3af]">{label}</span><span className="text-right font-semibold text-[#111827]">{value}</span></div>)}</div>
              <div className="mt-5 grid grid-cols-2 gap-3"><Button variant="outlined" onClick={() => { const item = detailTransaction; setDetailTransaction(null); openEdit(item); }} sx={{ minHeight: 42, borderRadius: "12px", borderColor: "#d9dde3", color: "#4b5563", textTransform: "none", cursor: "pointer" }}>Edit</Button><Button variant="outlined" onClick={() => deleteTransaction(detailTransaction)} sx={{ minHeight: 42, borderRadius: "12px", borderColor: "#fecaca", color: "#dc2626", textTransform: "none", cursor: "pointer" }}>Delete</Button></div>
            </DialogContent>
          </>
        )}
      </Dialog>
    </>
  );
}
