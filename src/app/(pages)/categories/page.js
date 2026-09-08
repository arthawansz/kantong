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
  BriefcaseBusiness,
  Car,
  CircleDollarSign,
  Coffee,
  HeartPulse,
  Home,
  MoreHorizontal,
  Pencil,
  Plus,
  ShoppingBag,
  Smartphone,
  Trash2,
  Utensils,
  X,
} from "lucide-react";
import { money } from "../../data/mockDashboard";

const iconOptions = {
  food: { label: "Food", icon: Utensils },
  coffee: { label: "Coffee", icon: Coffee },
  transport: { label: "Transport", icon: Car },
  shopping: { label: "Shopping", icon: ShoppingBag },
  home: { label: "Bills", icon: Home },
  health: { label: "Health", icon: HeartPulse },
  income: { label: "Income", icon: BriefcaseBusiness },
  digital: { label: "Digital", icon: Smartphone },
};

const colorOptions = ["#111827", "#2563eb", "#7c3aed", "#16a34a", "#ea580c", "#db2777", "#0891b2", "#9ca3af"];

const seedCategories = [
  { id: 1, name: "Food & Drink", type: "Expense", amount: 820000, transactionCount: 14, color: "#111827", iconKey: "food", archived: false },
  { id: 2, name: "Transport", type: "Expense", amount: 460000, transactionCount: 9, color: "#2563eb", iconKey: "transport", archived: false },
  { id: 3, name: "Lifestyle", type: "Expense", amount: 330000, transactionCount: 6, color: "#7c3aed", iconKey: "shopping", archived: false },
  { id: 4, name: "Bills", type: "Expense", amount: 210000, transactionCount: 3, color: "#ea580c", iconKey: "home", archived: false },
  { id: 5, name: "Health", type: "Expense", amount: 110000, transactionCount: 2, color: "#db2777", iconKey: "health", archived: false },
  { id: 6, name: "Freelance", type: "Income", amount: 1250000, transactionCount: 2, color: "#16a34a", iconKey: "income", archived: false },
];

const recentByCategory = {
  "Food & Drink": [
    { title: "Lunch", amount: -48000, date: "Today, 12:40" },
    { title: "Coffee", amount: -28000, date: "Yesterday, 16:02" },
  ],
  Transport: [
    { title: "Ride to campus", amount: -24000, date: "Yesterday, 08:15" },
    { title: "Bus card", amount: -50000, date: "Sep 5, 18:20" },
  ],
  Lifestyle: [{ title: "Keyboard accessories", amount: -185000, date: "Sep 6, 16:05" }],
  Freelance: [{ title: "Freelance payment", amount: 1250000, date: "Today, 09:12" }],
};

const fieldSx = {
  "& .MuiOutlinedInput-root": { minHeight: 52, borderRadius: "12px" },
  "& .MuiInputLabel-root": { backgroundColor: "#ffffff", px: 0.5 },
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState(seedCategories);
  const [menuCategory, setMenuCategory] = useState(null);
  const [detailCategory, setDetailCategory] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formName, setFormName] = useState("");
  const [formType, setFormType] = useState("Expense");
  const [formIcon, setFormIcon] = useState("food");
  const [formColor, setFormColor] = useState("#111827");

  const activeCategories = categories.filter((category) => !category.archived);
  const expenseCategories = activeCategories.filter((category) => category.type === "Expense");
  const totalSpending = expenseCategories.reduce((total, category) => total + category.amount, 0);
  const topCategory = expenseCategories.reduce((top, category) => (!top || category.amount > top.amount ? category : top), null);

  const enrichedExpenses = useMemo(
    () => expenseCategories.map((category) => ({ ...category, percent: totalSpending ? Math.round((category.amount / totalSpending) * 100) : 0 })),
    [categories, totalSpending]
  );

  const resetForm = () => {
    setEditingCategory(null);
    setFormName("");
    setFormType("Expense");
    setFormIcon("food");
    setFormColor("#111827");
  };

  const openAdd = () => {
    resetForm();
    setFormOpen(true);
  };

  const openEdit = (category) => {
    setMenuCategory(null);
    setEditingCategory(category);
    setFormName(category.name);
    setFormType(category.type);
    setFormIcon(category.iconKey);
    setFormColor(category.color);
    setFormOpen(true);
  };

  const saveCategory = () => {
    const cleanName = formName.trim();
    if (!cleanName) return;

    const nextCategory = {
      id: editingCategory?.id ?? Date.now(),
      name: cleanName,
      type: formType,
      amount: editingCategory?.amount ?? 0,
      transactionCount: editingCategory?.transactionCount ?? 0,
      color: formColor,
      iconKey: formIcon,
      archived: editingCategory?.archived ?? false,
    };

    setCategories((current) =>
      editingCategory
        ? current.map((category) => (category.id === editingCategory.id ? nextCategory : category))
        : [...current, nextCategory]
    );
    setFormOpen(false);
    resetForm();
  };

  const toggleArchive = (category) => {
    setMenuCategory(null);
    setCategories((current) => current.map((item) => item.id === category.id ? { ...item, archived: !item.archived } : item));
  };

  const deleteCategory = (category) => {
    setMenuCategory(null);
    setCategories((current) => current.filter((item) => item.id !== category.id));
    if (detailCategory?.id === category.id) setDetailCategory(null);
  };

  return (
    <>
      <section>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9aa1ab]">Category management</p>
            <h2 className="mt-2 text-2xl font-bold tracking-[-0.04em] text-[#111827] sm:text-[30px]">Know where your money goes.</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#7a828e]">Understand your spending mix and keep transaction categories organized around how you actually use money.</p>
          </div>
          <Button
            variant="contained"
            startIcon={<Plus size={17} />}
            onClick={openAdd}
            sx={{ alignSelf: { xs: "flex-start", sm: "auto" }, minHeight: 42, borderRadius: "12px", bgcolor: "#111827", px: 2, textTransform: "none", fontWeight: 700, boxShadow: "none", cursor: "pointer", "&:hover": { bgcolor: "#1f2937", boxShadow: "none" } }}
          >
            Add category
          </Button>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-black/[0.06] bg-white p-4"><p className="text-[11px] font-medium text-[#8a919d]">Total spending</p><p className="mt-2 text-xl font-bold tracking-[-0.03em] text-[#111827]">{money(totalSpending)}</p><p className="mt-1 text-[10px] text-[#9ca3af]">September 2026</p></div>
          <div className="rounded-2xl border border-black/[0.06] bg-white p-4"><p className="text-[11px] font-medium text-[#8a919d]">Active categories</p><p className="mt-2 text-xl font-bold tracking-[-0.03em] text-[#111827]">{activeCategories.length}</p><p className="mt-1 text-[10px] text-[#9ca3af]">Expense and income</p></div>
          <div className="rounded-2xl border border-black/[0.06] bg-white p-4"><p className="text-[11px] font-medium text-[#8a919d]">Top category</p><p className="mt-2 truncate text-xl font-bold tracking-[-0.03em] text-[#111827]">{topCategory?.name ?? "—"}</p><p className="mt-1 text-[10px] text-[#9ca3af]">{topCategory ? money(topCategory.amount) : "No spending yet"}</p></div>
        </div>
      </section>

      <section className="mt-6 rounded-[20px] border border-black/[0.06] bg-white p-5 md:p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="text-sm font-bold text-[#111827]">Spending breakdown</p><p className="mt-1 text-xs text-[#9ca3af]">Your active expense categories this month</p></div>
          <p className="text-xs font-semibold text-[#7a828e]">{money(totalSpending)} total</p>
        </div>

        <div className="mt-6 space-y-5">
          {enrichedExpenses.map((category) => {
            const Icon = iconOptions[category.iconKey]?.icon ?? CircleDollarSign;
            return (
              <button key={category.id} type="button" onClick={() => setDetailCategory(category)} className="block w-full cursor-pointer text-left">
                <div className="mb-2 flex items-center justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3"><div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl" style={{ backgroundColor: `${category.color}14`, color: category.color }}><Icon size={16} /></div><div className="min-w-0"><p className="truncate text-sm font-semibold text-[#111827]">{category.name}</p><p className="mt-0.5 text-[10px] text-[#9ca3af]">{category.transactionCount} transactions</p></div></div>
                  <div className="shrink-0 text-right"><p className="text-sm font-semibold text-[#111827]">{money(category.amount)}</p><p className="mt-0.5 text-[10px] text-[#9ca3af]">{category.percent}%</p></div>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-[#f0f1f3]"><div className="h-full rounded-full transition-all" style={{ width: `${category.percent}%`, backgroundColor: category.color }} /></div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="mt-6">
        <div className="flex items-center justify-between gap-4">
          <div><h3 className="text-base font-bold tracking-[-0.03em] text-[#111827]">All categories</h3><p className="mt-1 text-xs text-[#9ca3af]">Customize how transactions are grouped and scanned</p></div>
          <p className="text-xs text-[#9ca3af]">{categories.length} total</p>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category, index) => {
            const Icon = iconOptions[category.iconKey]?.icon ?? CircleDollarSign;
            return (
              <motion.div key={category.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18, delay: index * 0.025 }} className={`relative rounded-[20px] border border-black/[0.06] bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/[0.04] ${category.archived ? "opacity-55" : ""}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl" style={{ backgroundColor: `${category.color}14`, color: category.color }}><Icon size={18} strokeWidth={1.9} /></div><div className="min-w-0"><p className="truncate text-sm font-bold text-[#111827]">{category.name}</p><p className="mt-1 text-[11px] text-[#9ca3af]">{category.type} · {category.archived ? "Archived" : "Active"}</p></div></div>
                  <div className="relative">
                    <button type="button" onClick={() => setMenuCategory(menuCategory?.id === category.id ? null : category)} className="grid h-8 w-8 cursor-pointer place-items-center rounded-lg text-[#9ca3af] transition hover:bg-[#f5f6f7] hover:text-[#111827]" aria-label={`More options for ${category.name}`}><MoreHorizontal size={17} /></button>
                    <AnimatePresence>
                      {menuCategory?.id === category.id && (
                        <motion.div initial={{ opacity: 0, y: -5, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -5, scale: 0.97 }} transition={{ duration: 0.15 }} className="absolute right-0 top-9 z-30 w-44 overflow-hidden rounded-2xl border border-black/[0.07] bg-white p-1.5 shadow-xl shadow-black/[0.08]">
                          <button type="button" onClick={() => openEdit(category)} className="flex w-full cursor-pointer items-center gap-2 rounded-xl px-3 py-2.5 text-left text-xs font-medium text-[#4b5563] hover:bg-[#f7f8fa] hover:text-[#111827]"><Pencil size={14} /> Edit category</button>
                          <button type="button" onClick={() => toggleArchive(category)} className="flex w-full cursor-pointer items-center gap-2 rounded-xl px-3 py-2.5 text-left text-xs font-medium text-[#4b5563] hover:bg-[#f7f8fa] hover:text-[#111827]"><Archive size={14} /> {category.archived ? "Restore" : "Archive"}</button>
                          <div className="my-1 border-t border-black/[0.06]" />
                          <button type="button" onClick={() => deleteCategory(category)} className="flex w-full cursor-pointer items-center gap-2 rounded-xl px-3 py-2.5 text-left text-xs font-semibold text-[#dc2626] hover:bg-red-50"><Trash2 size={14} /> Delete</button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <button type="button" onClick={() => setDetailCategory(category)} className="mt-7 block w-full cursor-pointer text-left">
                  <p className="text-[11px] font-medium text-[#9ca3af]">{category.type === "Income" ? "Recorded income" : "Spent this month"}</p>
                  <p className="mt-1.5 text-xl font-bold tracking-[-0.04em] text-[#111827]">{money(category.amount)}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-black/[0.055] pt-4"><span className="text-[11px] text-[#8a919d]">{category.transactionCount} transactions</span><span className="text-[11px] font-semibold text-[#6b7280] transition hover:text-[#111827]">View details</span></div>
                </button>
              </motion.div>
            );
          })}
        </div>
      </section>

      <Dialog open={formOpen} onClose={() => setFormOpen(false)} fullWidth maxWidth="xs" PaperProps={{ sx: { borderRadius: "22px" } }}>
        <DialogTitle sx={{ px: 3, pt: 3, pb: 1.5 }}>
          <div className="flex items-start justify-between gap-4"><div><p className="text-lg font-extrabold tracking-[-0.03em]">{editingCategory ? "Edit category" : "Add category"}</p><p className="mt-1 text-xs font-normal text-[#9ca3af]">Choose a name, type, icon, and color.</p></div><button type="button" onClick={() => setFormOpen(false)} className="grid h-8 w-8 cursor-pointer place-items-center rounded-lg text-[#9ca3af] hover:bg-[#f5f6f7]"><X size={17} /></button></div>
        </DialogTitle>
        <DialogContent sx={{ px: 3, pb: 3 }}>
          <div className="grid gap-4 pt-1">
            <TextField fullWidth label="Category name" value={formName} onChange={(event) => setFormName(event.target.value)} slotProps={{ inputLabel: { shrink: true } }} sx={fieldSx} />
            <div className="grid gap-4 sm:grid-cols-2"><TextField select fullWidth label="Type" value={formType} onChange={(event) => setFormType(event.target.value)} sx={fieldSx}><MenuItem value="Expense">Expense</MenuItem><MenuItem value="Income">Income</MenuItem></TextField><TextField select fullWidth label="Icon" value={formIcon} onChange={(event) => setFormIcon(event.target.value)} sx={fieldSx}>{Object.entries(iconOptions).map(([key, option]) => <MenuItem key={key} value={key}>{option.label}</MenuItem>)}</TextField></div>
            <div><p className="mb-2 text-xs font-semibold text-[#6b7280]">Color</p><div className="flex flex-wrap gap-2">{colorOptions.map((color) => <button key={color} type="button" onClick={() => setFormColor(color)} aria-label={`Use ${color}`} className={`h-8 w-8 cursor-pointer rounded-full border-2 transition ${formColor === color ? "scale-110 border-[#111827]" : "border-white shadow-[0_0_0_1px_rgba(17,24,39,0.12)]"}`} style={{ backgroundColor: color }} />)}</div></div>
            <Button variant="contained" onClick={saveCategory} disabled={!formName.trim()} sx={{ minHeight: 48, borderRadius: "12px", bgcolor: "#111827", textTransform: "none", fontWeight: 700, boxShadow: "none", cursor: formName.trim() ? "pointer" : "not-allowed", "&:hover": { bgcolor: "#1f2937", boxShadow: "none" } }}>{editingCategory ? "Save changes" : "Create category"}</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(detailCategory)} onClose={() => setDetailCategory(null)} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: "22px" } }}>
        {detailCategory && (() => {
          const Icon = iconOptions[detailCategory.iconKey]?.icon ?? CircleDollarSign;
          const activity = recentByCategory[detailCategory.name] ?? [];
          return (
            <>
              <DialogTitle sx={{ px: 3, pt: 3, pb: 1.5 }}><div className="flex items-start justify-between gap-4"><div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl" style={{ backgroundColor: `${detailCategory.color}14`, color: detailCategory.color }}><Icon size={17} /></div><div><p className="text-lg font-extrabold tracking-[-0.03em]">{detailCategory.name}</p><p className="mt-1 text-xs font-normal text-[#9ca3af]">{detailCategory.type} category · {detailCategory.archived ? "Archived" : "Active"}</p></div></div><button type="button" onClick={() => setDetailCategory(null)} className="grid h-8 w-8 cursor-pointer place-items-center rounded-lg text-[#9ca3af] hover:bg-[#f5f6f7]"><X size={17} /></button></div></DialogTitle>
              <DialogContent sx={{ px: 3, pb: 3 }}>
                <div className="grid gap-3 sm:grid-cols-3"><div className="rounded-2xl bg-[#111827] p-4 text-white sm:col-span-2"><p className="text-[11px] text-white/50">{detailCategory.type === "Income" ? "Recorded income" : "Spent this month"}</p><p className="mt-2 text-2xl font-bold tracking-[-0.04em]">{money(detailCategory.amount)}</p></div><div className="rounded-2xl border border-black/[0.06] bg-[#fafbfc] p-4"><p className="text-[11px] text-[#9ca3af]">Transactions</p><p className="mt-2 text-2xl font-bold tracking-[-0.04em] text-[#111827]">{detailCategory.transactionCount}</p></div></div>
                <div className="mt-5"><p className="text-sm font-bold text-[#111827]">Recent transactions</p><div className="mt-3 divide-y divide-black/[0.055]">{activity.length ? activity.map((item) => <div key={`${item.title}-${item.date}`} className="flex items-center justify-between gap-4 py-3"><div><p className="text-sm font-semibold text-[#111827]">{item.title}</p><p className="mt-1 text-[11px] text-[#9ca3af]">{item.date}</p></div><p className={`text-sm font-bold ${item.amount > 0 ? "text-[#15803d]" : "text-[#dc2626]"}`}>{item.amount > 0 ? "+" : "−"}{money(Math.abs(item.amount))}</p></div>) : <div className="py-8 text-center text-xs text-[#9ca3af]">No mock transactions yet for this category.</div>}</div></div>
                <div className="mt-5 grid grid-cols-2 gap-3"><Button variant="outlined" onClick={() => { const category = detailCategory; setDetailCategory(null); openEdit(category); }} sx={{ minHeight: 42, borderRadius: "12px", borderColor: "#d9dde3", color: "#4b5563", textTransform: "none", cursor: "pointer" }}>Edit</Button><Button variant="outlined" onClick={() => deleteCategory(detailCategory)} sx={{ minHeight: 42, borderRadius: "12px", borderColor: "#fecaca", color: "#dc2626", textTransform: "none", cursor: "pointer" }}>Delete</Button></div>
              </DialogContent>
            </>
          );
        })()}
      </Dialog>
    </>
  );
}
