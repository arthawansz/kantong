"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@mui/material/Button";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Check,
  CircleDollarSign,
  Landmark,
  MoveUpRight,
  ShieldCheck,
  Sparkles,
  WalletCards,
} from "lucide-react";

const wallets = [
  { name: "BCA", amount: "Rp4.850.000", dot: "#111827" },
  { name: "Cash", amount: "Rp850.000", dot: "#2563eb" },
  { name: "GoPay", amount: "Rp421.500", dot: "#16a34a" },
];

const features = [
  {
    icon: WalletCards,
    eyebrow: "01 / WALLETS",
    title: "Every balance, one clear view.",
    description:
      "Track cash, bank accounts, and digital wallets without forcing your money into someone else's structure.",
  },
  {
    icon: BarChart3,
    eyebrow: "02 / INSIGHTS",
    title: "See the pattern behind the spending.",
    description:
      "Understand cash flow, category trends, and the decisions shaping your month at a glance.",
  },
  {
    icon: ShieldCheck,
    eyebrow: "03 / CONTROL",
    title: "Built to stay simple as you grow.",
    description:
      "Clean transaction flows, flexible categories, and financial context without spreadsheet fatigue.",
  },
];

const reveal = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, amount: 0.2 },
  transition: { duration: 0.58, ease: "easeOut" },
};

export default function LandingPageClient() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[#f6f7f9] text-[#111827]">
      <section className="relative border-b border-black/[0.06] pt-[80px]">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(17,24,39,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(17,24,39,0.035)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" />
        <div className="pointer-events-none absolute left-1/2 top-[-280px] h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-[#bff7df]/45 blur-[140px]" />

        <motion.nav
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
            scrolled
              ? "border-b border-black/[0.06] bg-[#f6f7f9]/88 shadow-[0_10px_30px_rgba(17,24,39,0.05)] backdrop-blur-xl"
              : "bg-transparent"
          }`}
        >
          <div className="mx-auto flex max-w-[1320px] items-center justify-between px-5 py-5 md:px-8 lg:px-10">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#111827] text-sm font-black text-white">
                K
              </div>
              <div>
                <p className="text-[17px] font-extrabold tracking-[-0.04em]">kantong.</p>
                <p className="text-[10px] tracking-[0.08em] text-[#9ca3af]">PERSONAL FINANCE</p>
              </div>
            </Link>

            <div className="hidden items-center gap-7 text-sm font-medium text-[#6b7280] md:flex">
              <a href="#product" className="transition hover:text-[#111827]">Product</a>
              <a href="#insights" className="transition hover:text-[#111827]">Insights</a>
              <a href="#principles" className="transition hover:text-[#111827]">Principles</a>
            </div>

            <div className="flex items-center gap-2">
              <Button component={Link} href="/login" variant="text" sx={{ color: "#4b5563", px: 1.5 }}>
                Sign in
              </Button>
              <Button
                component={Link}
                href="/login"
                variant="contained"
                endIcon={<ArrowRight size={16} />}
                sx={{ bgcolor: "#111827", px: 2.1, "&:hover": { bgcolor: "#1f2937" } }}
              >
                Open Kantong
              </Button>
            </div>
          </div>
        </motion.nav>

        <div className="relative z-10 mx-auto max-w-[1320px] px-5 pb-24 pt-20 md:px-8 md:pt-28 lg:px-10 lg:pb-32 lg:pt-32">
          <motion.div {...reveal} className="mx-auto max-w-5xl text-center">
            <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-black/[0.07] bg-white/80 px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.08em] text-[#657080] shadow-sm backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[#16a34a] shadow-[0_0_0_4px_rgba(22,163,74,0.09)]" />
              MONEY, WITHOUT THE NOISE
            </div>

            <h1 className="text-[52px] font-semibold leading-[0.98] tracking-[-0.06em] sm:text-6xl md:text-7xl lg:text-[88px]">
              Your money,
              <span className="block text-[#7b8491]">mapped with clarity.</span>
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-[#6b7280] md:text-lg md:leading-8">
              Kantong turns scattered wallets, transactions, and spending habits into one calm financial system you can actually understand.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                component={Link}
                href="/login"
                variant="contained"
                size="large"
                endIcon={<ArrowRight size={17} />}
                sx={{ bgcolor: "#111827", px: 3, py: 1.35, "&:hover": { bgcolor: "#1f2937" } }}
              >
                Start tracking
              </Button>
              <Button component="a" href="#product" variant="outlined" size="large" sx={{ borderColor: "#d9dde3", color: "#4b5563", px: 3, py: 1.35 }}>
                See the product
              </Button>
            </div>
          </motion.div>

          <motion.div {...reveal} id="product" className="relative mx-auto mt-20 max-w-[1180px]">
            <div className="absolute inset-x-24 bottom-[-60px] h-40 rounded-full bg-[#9ee8c8]/25 blur-[80px]" />
            <div className="relative overflow-hidden rounded-[28px] border border-black/[0.08] bg-white p-2 shadow-[0_30px_90px_rgba(17,24,39,0.12)]">
              <div className="overflow-hidden rounded-[22px] border border-black/[0.05] bg-[#f4f6f8]">
                <div className="flex h-12 items-center justify-between border-b border-black/[0.06] bg-white px-4 md:px-6">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff4141]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ffe32c]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#52ff46]" />
                  </div>
                  <div className="rounded-full bg-[#f4f5f7] px-3 py-1 text-[10px] font-medium text-[#8b94a0]">app.kantong / overview</div>
                </div>

                <div className="grid md:grid-cols-[190px_1fr]">
                  <aside className="hidden border-r border-black/[0.06] bg-white p-4 md:block">
                    <div className="flex items-center gap-2 px-2 py-2">
                      <div className="grid h-7 w-7 place-items-center rounded-lg bg-[#111827] text-[10px] font-black text-white">K</div>
                      <span className="text-sm font-extrabold tracking-[-0.03em]">kantong.</span>
                    </div>
                    <div className="mt-6 space-y-2">
                      {["Overview", "Wallets", "Transactions", "Categories", "Analytics"].map((item, index) => (
                        <div key={item} className={`rounded-lg px-3 py-2 text-xs ${index === 0 ? "bg-[#f1f3f5] font-semibold text-[#111827]" : "text-[#8b94a0]"}`}>
                          {item}
                        </div>
                      ))}
                    </div>
                  </aside>

                  <div className="p-4 md:p-6 lg:p-8">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#9aa1ab]">Overview</p>
                        <p className="mt-1 text-xl font-bold tracking-[-0.04em]">Sunday, September 6</p>
                      </div>
                      <div className="rounded-xl border border-black/[0.06] bg-white px-3 py-2 text-[11px] font-semibold text-[#6b7280]">Live preview</div>
                    </div>

                    <div className="mt-6 grid gap-4 xl:grid-cols-[1.45fr_1fr]">
                      <div className="relative overflow-hidden rounded-[22px] bg-[#111827] p-5 text-white">
                        <div className="absolute -right-12 -top-10 h-36 w-36 rounded-full border border-white/[0.08]" />
                        <p className="text-xs text-white/50">Total balance</p>
                        <p className="mt-2 text-3xl font-bold tracking-[-0.05em]">Rp6.121.500</p>
                        <div className="mt-7 grid gap-2 sm:grid-cols-3">
                          {wallets.map((wallet) => (
                            <div key={wallet.name} className="rounded-xl border border-white/[0.08] bg-white/[0.04] p-3">
                              <div className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: wallet.dot }} />
                                <p className="text-[10px] text-white/55">{wallet.name}</p>
                              </div>
                              <p className="mt-2 text-sm font-semibold">{wallet.amount}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                        <div className="rounded-[20px] border border-black/[0.06] bg-white p-4">
                          <p className="text-[11px] text-[#8b94a0]">Income this month</p>
                          <p className="mt-2 text-xl font-bold tracking-[-0.04em]">Rp4.250.000</p>
                          <p className="mt-3 text-[10px] font-semibold text-[#15803d]">+12.4% vs last month</p>
                        </div>
                        <div className="rounded-[20px] border border-black/[0.06] bg-white p-4">
                          <p className="text-[11px] text-[#8b94a0]">Expense this month</p>
                          <p className="mt-2 text-xl font-bold tracking-[-0.04em]">Rp1.930.000</p>
                          <p className="mt-3 text-[10px] text-[#9ca3af]">56% of monthly target</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
                      <div className="rounded-[20px] border border-black/[0.06] bg-white p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs font-semibold">Cash flow</p>
                            <p className="mt-1 text-[10px] text-[#9ca3af]">Last 7 days</p>
                          </div>
                          <MoveUpRight size={15} className="text-[#9ca3af]" />
                        </div>
                        <div className="relative mt-5 h-24 overflow-hidden">
                          <svg viewBox="0 0 600 120" className="h-full w-full" preserveAspectRatio="none">
                            <path d="M0 92 C50 65 95 100 145 70 C200 38 235 18 285 58 C335 97 380 96 430 56 C475 22 525 50 600 18" fill="none" stroke="#111827" strokeWidth="4" strokeLinecap="round" />
                            <path d="M0 95 C60 86 90 55 150 72 C205 87 250 92 300 62 C350 33 405 72 450 73 C500 74 540 44 600 57" fill="none" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
                          </svg>
                        </div>
                      </div>
                      <div className="rounded-[20px] border border-black/[0.06] bg-white p-4">
                        <p className="text-xs font-semibold">Top category</p>
                        <div className="mt-5 flex items-center justify-between">
                          <div>
                            <p className="text-sm font-semibold">Food & Drink</p>
                            <p className="mt-1 text-[10px] text-[#9ca3af]">42% of spending</p>
                          </div>
                          <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#fef3c7]">
                            <CircleDollarSign size={18} />
                          </div>
                        </div>
                        <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-[#eef0f2]">
                          <div className="h-full w-[42%] rounded-full bg-[#111827]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <motion.section {...reveal} id="insights" className="mx-auto max-w-[1320px] px-5 py-24 md:px-8 lg:px-10 lg:py-32">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.6fr] lg:gap-16">
          <div>
            <p className="text-[11px] font-bold tracking-[0.16em] text-[#8b94a0]">THE SYSTEM</p>
            <h2 className="mt-4 max-w-md text-4xl font-semibold tracking-[-0.05em] md:text-5xl">
              Finance software that gets out of your way.
            </h2>
          </div>
          <div className="grid gap-px overflow-hidden rounded-[24px] border border-black/[0.06] bg-black/[0.06] md:grid-cols-3">
            {features.map(({ icon: Icon, eyebrow, title, description }) => (
              <article key={eyebrow} className="bg-white p-7 lg:p-8">
                <div className="grid h-11 w-11 place-items-center rounded-xl border border-black/[0.06] bg-[#f7f8fa]">
                  <Icon size={20} strokeWidth={1.8} />
                </div>
                <p className="mt-7 text-[10px] font-bold tracking-[0.15em] text-[#9ca3af]">{eyebrow}</p>
                <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em]">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#737b88]">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </motion.section>

      <section id="principles" className="border-y border-white/[0.08] bg-[#0d1422] text-white">
        <motion.div {...reveal} className="mx-auto grid max-w-[1320px] gap-12 px-5 py-24 md:px-8 lg:grid-cols-[1.25fr_1fr] lg:px-10 lg:py-32">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-bold tracking-[0.16em] text-[#8fa0b8]">
              <Sparkles size={14} className="text-[#7fe0b7]" /> PRODUCT PRINCIPLES
            </div>
            <h2 className="mt-6 max-w-2xl text-4xl font-semibold leading-[1.05] tracking-[-0.05em] md:text-5xl lg:text-6xl">
              Quiet interface. Serious financial context.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-[#98a6ba]">
              No casino colors, no noisy gamification, no dashboard for the sake of having a dashboard. Kantong keeps the signal visible and the noise behind it.
            </p>
          </div>

          <div className="self-end rounded-[24px] border border-white/[0.08] bg-white/[0.035] p-6 backdrop-blur md:p-8">
            {["Flexible wallets", "Income, expense, and transfer flows", "Custom categories", "Cash-flow analytics"].map((item) => (
              <div key={item} className="flex items-center gap-3 border-b border-white/[0.08] py-4 last:border-0">
                <div className="grid h-7 w-7 place-items-center rounded-full bg-[#7fe0b7]/10 text-[#7fe0b7]">
                  <Check size={14} strokeWidth={2.2} />
                </div>
                <p className="text-sm font-medium text-[#dce3ec]">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <motion.section {...reveal} className="mx-auto max-w-[1320px] px-5 py-24 md:px-8 lg:px-10 lg:py-28">
        <div className="relative overflow-hidden rounded-[30px] bg-white p-8 shadow-[0_24px_70px_rgba(17,24,39,0.07)] ring-1 ring-black/[0.05] md:p-12 lg:p-16">
          <div className="pointer-events-none absolute right-[-100px] top-[-120px] h-80 w-80 rounded-full border border-black/[0.05]" />
          <div className="pointer-events-none absolute right-[-10px] top-[-30px] h-44 w-44 rounded-full border border-black/[0.05]" />
          <p className="text-[11px] font-bold tracking-[0.16em] text-[#8b94a0]">READY WHEN YOU ARE</p>
          <div className="mt-4 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <h2 className="max-w-3xl text-4xl font-semibold tracking-[-0.05em] md:text-5xl lg:text-6xl">
              Give every rupiah a clearer place to go.
            </h2>
            <Button
              component={Link}
              href="/login"
              variant="contained"
              size="large"
              endIcon={<ArrowRight size={17} />}
              sx={{ alignSelf: { xs: "flex-start", lg: "flex-end" }, bgcolor: "#111827", px: 3, py: 1.35, "&:hover": { bgcolor: "#1f2937" } }}
            >
              Enter Kantong
            </Button>
          </div>
        </div>
      </motion.section>

      <motion.footer {...reveal} className="border-t border-black/[0.06] bg-white">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-4 px-5 py-7 text-xs text-[#8b94a0] md:flex-row md:items-center md:justify-between md:px-8 lg:px-10">
          <div className="flex items-center gap-2 font-semibold text-[#111827]">
            <Landmark size={15} /> kantong.
          </div>
          <p>Personal finance, designed for clarity.</p>
          <p>© 2026 Kantong</p>
        </div>
      </motion.footer>
    </main>
  );
}
