"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoLight from "@/app/assets/Logo Light Theme.png";
import {
  BarChart3,
  Home,
  ReceiptText,
  Settings,
  Tags,
  WalletCards,
} from "lucide-react";

const navItems = [
  { label: "Overview", href: "/dashboard", icon: Home },
  { label: "Wallets", href: "/wallets", icon: WalletCards },
  { label: "Transactions", href: "/transactions", icon: ReceiptText },
  { label: "Categories", href: "/categories", icon: Tags },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden h-dvh w-[250px] overflow-hidden border-r border-black/[0.06] bg-white px-4 py-5 lg:flex lg:flex-col">
      <div className="shrink-0 px-3">
        <div className="flex items-center gap-2.5">
          <Image
            src={LogoLight}
            alt="Kantong"
            width={36}
            height={36}
            priority
            className="h-9 w-9 rounded-xl object-contain"
          />
          <div>
            <p className="text-[17px] font-extrabold tracking-[-0.03em] text-[#111827]">kantong.</p>
            <p className="text-[11px] text-[#9ca3af]">personal finance</p>
          </div>
        </div>
      </div>

      <nav className="mt-7 shrink-0 space-y-1">
        {navItems.map(({ label, href, icon: Icon }) => {
          const active = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                active
                  ? "bg-[#f1f3f5] text-[#111827]"
                  : "text-[#737b88] hover:bg-[#f8f9fa] hover:text-[#111827]"
              }`}
            >
              <Icon size={18} strokeWidth={1.9} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="min-h-4 flex-1" />

      <div className="shrink-0 rounded-2xl border border-black/[0.06] bg-[#fafafa] p-4">
        <p className="text-xs font-semibold text-[#111827]">Monthly target</p>
        <p className="mt-1 text-[11px] leading-4 text-[#8a919d]">Keep spending below Rp3.5M this month.</p>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#e5e7eb]">
          <div className="h-full w-[56%] rounded-full bg-[#111827]" />
        </div>
        <div className="mt-2 flex justify-between text-[10px] text-[#9ca3af]">
          <span>Rp1.93M</span>
          <span>Rp3.5M</span>
        </div>
      </div>

      <Link
        href="/settings"
        className={`mt-2 shrink-0 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
          pathname === "/settings"
            ? "bg-[#f1f3f5] text-[#111827]"
            : "text-[#737b88] hover:bg-[#f8f9fa] hover:text-[#111827]"
        }`}
      >
        <Settings size={18} /> Settings
      </Link>
    </aside>
  );
}
