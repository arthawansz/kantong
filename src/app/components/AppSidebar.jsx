"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoLight from "@/app/assets/Logo Light Theme.png";
import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
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

export default function AppSidebar({ collapsed, onToggle }) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 hidden h-[100dvh] shrink-0 border-r border-black/[0.06] bg-white transition-[width] duration-300 lg:flex lg:flex-col ${
        collapsed ? "w-[84px] px-3 py-5" : "w-[250px] px-4 py-5"
      }`}
    >
      <div className={`relative flex items-center ${collapsed ? "justify-center" : "justify-between px-2"}`}>
        <Link href="/dashboard" className="flex min-w-0 items-center gap-2.5">
          <Image
            src={LogoLight}
            alt="Kantong"
            width={36}
            height={36}
            priority
            className="h-9 w-9 shrink-0 rounded-xl object-contain"
          />
          <div
            className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
              collapsed ? "w-0 opacity-0" : "w-[132px] opacity-100"
            }`}
          >
            <p className="text-[17px] font-extrabold tracking-[-0.03em] text-[#111827]">kantong.</p>
            <p className="text-[11px] text-[#9ca3af]">personal finance</p>
          </div>
        </Link>

        <button
          type="button"
          onClick={onToggle}
          aria-label={collapsed ? "Open sidebar" : "Close sidebar"}
          className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-black/[0.07] bg-white text-[#6b7280] shadow-sm transition hover:bg-[#f7f8fa] hover:text-[#111827] ${
            collapsed ? "absolute -right-4 top-1/2 z-50 -translate-y-1/2" : ""
          }`}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <nav className={`${collapsed ? "mt-8" : "mt-9"} space-y-1.5`}>
        {navItems.map(({ label, href, icon: Icon }) => {
          const active = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              title={collapsed ? label : undefined}
              className={`flex w-full items-center rounded-xl py-2.5 text-sm font-medium transition ${
                collapsed ? "justify-center px-2" : "gap-3 px-3"
              } ${
                active
                  ? "bg-[#f1f3f5] text-[#111827]"
                  : "text-[#737b88] hover:bg-[#f8f9fa] hover:text-[#111827]"
              }`}
            >
              <Icon size={18} strokeWidth={1.9} className="shrink-0" />
              <span
                className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
                  collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </nav>

      {!collapsed && (
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
      )}

      <Link
        href="/settings"
        title={collapsed ? "Settings" : undefined}
        className={`flex items-center rounded-xl py-2.5 text-sm transition ${
          collapsed ? "mt-auto justify-center px-2" : "mt-3 gap-3 px-3"
        } ${
          pathname === "/settings"
            ? "bg-[#f1f3f5] text-[#111827]"
            : "text-[#737b88] hover:bg-[#f8f9fa] hover:text-[#111827]"
        }`}
      >
        <Settings size={18} className="shrink-0" />
        <span
          className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
            collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
          }`}
        >
          Settings
        </span>
      </Link>
    </aside>
  );
}
