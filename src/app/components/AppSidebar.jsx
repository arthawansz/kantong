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
  UserRound,
  WalletCards,
  X,
} from "lucide-react";

const navItems = [
  { label: "Overview", href: "/dashboard", icon: Home },
  { label: "Wallets", href: "/wallets", icon: WalletCards },
  { label: "Transactions", href: "/transactions", icon: ReceiptText },
  { label: "Categories", href: "/categories", icon: Tags },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Profile", href: "/profile", icon: UserRound },
];

export default function AppSidebar({ collapsed, mobileOpen, onCloseMobile }) {
  const pathname = usePathname();

  const monthlySpending = 1930000;
  const monthlyTarget = 3500000;
  const monthlyProgress = Math.min((monthlySpending / monthlyTarget) * 100, 100);
  const monthlyProgressColor =
    monthlyProgress >= 66
      ? "#dc2626"
      : monthlyProgress >= 50
        ? "#eab308"
        : "#16a34a";

  const navLink = ({ label, href, icon: Icon }) => {
    const active = pathname === href;

    const content = (
      <Link
        href={href}
        onClick={onCloseMobile}
        aria-label={collapsed ? label : undefined}
        className={`group flex w-full cursor-pointer items-center rounded-xl py-2.5 text-sm font-medium transition-all duration-200 ${
          collapsed ? "lg:justify-center lg:px-2" : "gap-3 px-3"
        } ${
          active
            ? "bg-[#f1f3f5] text-[#111827]"
            : "text-[#737b88] hover:bg-[#f8f9fa] hover:text-[#111827]"
        }`}
      >
        <Icon size={18} strokeWidth={1.9} className="shrink-0" />
        <span className={`${collapsed ? "lg:hidden" : ""} whitespace-nowrap`}>{label}</span>
      </Link>
    );

    return collapsed ? (
      <Tooltip key={href} title={label} placement="right" arrow disableHoverListener={mobileOpen}>
        {content}
      </Tooltip>
    ) : (
      <div key={href}>{content}</div>
    );
  };

  return (
    <>
      <button
        type="button"
        aria-label="Close sidebar overlay"
        onClick={onCloseMobile}
        className={`fixed inset-0 z-40 bg-black/25 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden ${
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-[100dvh] w-[250px] shrink-0 flex-col border-r border-black/[0.06] bg-white px-4 py-5 transition-all duration-300 ease-in-out lg:z-40 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } ${collapsed ? "lg:w-[84px] lg:translate-x-0 lg:px-3" : "lg:w-[250px] lg:translate-x-0 lg:px-4"}`}
      >
        <div className={`flex h-11 items-center justify-between ${collapsed ? "lg:justify-center" : "lg:px-2"}`}>
          <Link
            href="/dashboard"
            onClick={onCloseMobile}
            className={`flex min-w-0 cursor-pointer items-center gap-2.5 ${collapsed ? "lg:justify-center" : ""}`}
          >
            <Image
              src={LogoLight}
              alt="Kantong"
              width={40}
              height={40}
              priority
              className={`${collapsed ? "lg:h-10 lg:w-10" : ""} h-9 w-9 shrink-0 rounded-xl object-contain transition-all duration-300`}
            />

            <div className={`${collapsed ? "lg:hidden" : ""} whitespace-nowrap`}>
              <p className="text-[17px] font-extrabold tracking-[-0.03em] text-[#111827]">kantong.</p>
              <p className="text-[11px] text-[#9ca3af]">personal finance</p>
            </div>
          </Link>

          <button
            type="button"
            onClick={onCloseMobile}
            aria-label="Close sidebar"
            className="grid h-8 w-8 cursor-pointer place-items-center rounded-lg text-[#7a828e] transition hover:bg-[#f6f7f9] hover:text-[#111827] lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        <nav className={`${collapsed ? "lg:mt-7" : "lg:mt-8"} mt-8 space-y-1.5`}>
          {navItems.map(navLink)}
        </nav>

        <div className={`${collapsed ? "lg:hidden" : ""} mt-auto rounded-2xl border border-black/[0.06] bg-[#fafafa] p-4`}>
          <p className="text-xs font-semibold text-[#111827]">Monthly target</p>
          <p className="mt-1 text-xs leading-5 text-[#8a919d]">Keep spending below Rp3.5M this month.</p>
          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#e5e7eb]">
            <div
              className="h-full rounded-full transition-[width,background-color] duration-300 ease-out"
              style={{
                width: `${monthlyProgress}%`,
                backgroundColor: monthlyProgressColor,
              }}
            />
          </div>
          <div className="mt-2 flex justify-between text-[11px] text-[#9ca3af]">
            <span>Rp1.93M</span>
            <span>Rp3.5M</span>
          </div>
        </div>

        <div className={collapsed ? "lg:mt-auto" : "mt-3"}>
          {collapsed ? (
            <Tooltip title="Settings" placement="right" arrow disableHoverListener={mobileOpen}>
              <Link
                href="/settings"
                onClick={onCloseMobile}
                aria-label="Settings"
                className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition lg:justify-center lg:px-2 ${
                  pathname === "/settings"
                    ? "bg-[#f1f3f5] text-[#111827]"
                    : "text-[#737b88] hover:bg-[#f8f9fa] hover:text-[#111827]"
                }`}
              >
                <Settings size={18} />
                <span className="lg:hidden">Settings</span>
              </Link>
            </Tooltip>
          ) : (
            <Link
              href="/settings"
              onClick={onCloseMobile}
              className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
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
    </>
  );
}
