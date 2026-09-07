"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tooltip } from "@mui/material";
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

export default function AppSidebar({ collapsed }) {
  const pathname = usePathname();

  const navLink = ({ label, href, icon: Icon }) => {
    const active = pathname === href;

    const content = (
      <Link
        href={href}
        aria-label={collapsed ? label : undefined}
        className={`group flex w-full items-center rounded-xl py-2.5 text-sm font-medium transition-all duration-200 ${
          collapsed ? "justify-center px-2" : "gap-3 px-3"
        } ${
          active
            ? "bg-[#f1f3f5] text-[#111827]"
            : "text-[#737b88] hover:bg-[#f8f9fa] hover:text-[#111827]"
        }`}
      >
        <Icon size={18} strokeWidth={1.9} className="shrink-0" />
        {!collapsed && <span className="whitespace-nowrap">{label}</span>}
      </Link>
    );

    return collapsed ? (
      <Tooltip key={href} title={label} placement="right" arrow>
        {content}
      </Tooltip>
    ) : (
      <div key={href}>{content}</div>
    );
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 hidden h-[100dvh] shrink-0 border-r border-black/[0.06] bg-white transition-[width] duration-300 ease-in-out lg:flex lg:flex-col ${
        collapsed ? "w-[84px] px-3 py-5" : "w-[250px] px-4 py-5"
      }`}
    >
      <div className={`flex h-11 items-center ${collapsed ? "justify-center" : "px-2"}`}>
        <Link
          href="/dashboard"
          className={`flex min-w-0 items-center ${collapsed ? "justify-center" : "gap-2.5"}`}
        >
          <Image
            src={LogoLight}
            alt="Kantong"
            width={40}
            height={40}
            priority
            className={`${collapsed ? "h-10 w-10" : "h-9 w-9"} shrink-0 rounded-xl object-contain transition-all duration-300`}
          />

          {!collapsed && (
            <div className="whitespace-nowrap">
              <p className="text-[17px] font-extrabold tracking-[-0.03em] text-[#111827]">kantong.</p>
              <p className="text-[11px] text-[#9ca3af]">personal finance</p>
            </div>
          )}
        </Link>
      </div>

      <nav className={`${collapsed ? "mt-7" : "mt-8"} space-y-1.5`}>
        {navItems.map(navLink)}
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

      <div className={collapsed ? "mt-auto" : "mt-3"}>
        {collapsed ? (
          <Tooltip title="Settings" placement="right" arrow>
            <Link
              href="/settings"
              aria-label="Settings"
              className={`flex items-center justify-center rounded-xl px-2 py-2.5 text-sm transition ${
                pathname === "/settings"
                  ? "bg-[#f1f3f5] text-[#111827]"
                  : "text-[#737b88] hover:bg-[#f8f9fa] hover:text-[#111827]"
              }`}
            >
              <Settings size={18} />
            </Link>
          </Tooltip>
        ) : (
          <Link
            href="/settings"
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
              pathname === "/settings"
                ? "bg-[#f1f3f5] text-[#111827]"
                : "text-[#737b88] hover:bg-[#f8f9fa] hover:text-[#111827]"
            }`}
          >
            <Settings size={18} /> Settings
          </Link>
        )}
      </div>
    </aside>
  );
}
