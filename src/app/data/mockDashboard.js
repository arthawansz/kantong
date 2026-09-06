export const wallets = [
  { name: "BCA", amount: 4850000, color: "#111827" },
  { name: "Cash", amount: 850000, color: "#2563eb" },
  { name: "GoPay", amount: 421500, color: "#16a34a" },
];

export const chartData = [
  { day: "Mon", income: 800000, expense: 320000 },
  { day: "Tue", income: 120000, expense: 440000 },
  { day: "Wed", income: 250000, expense: 280000 },
  { day: "Thu", income: 1300000, expense: 510000 },
  { day: "Fri", income: 220000, expense: 390000 },
  { day: "Sat", income: 450000, expense: 610000 },
  { day: "Sun", income: 900000, expense: 270000 },
];

export const transactions = [
  {
    title: "Lunch",
    category: "Food & Drink",
    wallet: "BCA",
    amount: -48000,
    date: "Today, 12:40",
    type: "food",
  },
  {
    title: "Freelance payment",
    category: "Income",
    wallet: "BCA",
    amount: 1250000,
    date: "Today, 09:12",
    type: "income",
  },
  {
    title: "Top up GoPay",
    category: "Transfer",
    wallet: "BCA → GoPay",
    amount: -250000,
    date: "Yesterday, 19:30",
    type: "transfer",
  },
];

export const categories = [
  { label: "Food", value: 820000, percent: 42, color: "#111827" },
  { label: "Transport", value: 460000, percent: 24, color: "#2563eb" },
  { label: "Lifestyle", value: 330000, percent: 17, color: "#7c3aed" },
  { label: "Others", value: 320000, percent: 17, color: "#9ca3af" },
];

export const money = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
