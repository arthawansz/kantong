"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Avatar, Tooltip } from "@mui/material";
import {
  Bell,
  ChevronDown,
  Menu,
  PanelLeft,
  Search,
  User,
} from "lucide-react";

const titles = {
  "/dashboard": "Overview",
  "/wallets": "Wallets",
  "/transactions": "Transactions",
  "/categories": "Categories",
  "/analytics": "Analytics",
  "/settings": "Settings",
};

export default function AppHeader({ collapsed, onToggle }) {
  const pathname = usePathname();
  const title = titles[pathname] ?? "KANTONG";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className="fixed left-0 right-0 top-0 z-30 flex h-[68px] items-center justify-between border-b border-black/[0.05] bg-[#f6f7f9]/95 px-4 backdrop-blur transition-[left] duration-300 sm:h-[72px] sm:px-5 md:px-8 lg:left-[var(--sidebar-offset)] lg:h-[76px] lg:px-10"
      style={{ "--sidebar-offset": `${collapsed ? 84 : 250}px` }}
    >
      <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
        <Tooltip title={collapsed ? "Open sidebar" : "Close sidebar"}>
          <button
            type="button"
            onClick={onToggle}
            aria-label={collapsed ? "Open sidebar" : "Close sidebar"}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-[#7a828e] transition hover:bg-white hover:text-[#111827] hover:shadow-sm cursor-pointer"
          >
            <PanelLeft size={20} strokeWidth={1.9} />
          </button>
        </Tooltip>

        <div className="min-w-0">
          <p className="hidden text-[11px] font-medium text-[#9aa1ab] sm:block lg:text-xs">
            Sunday, September 6
          </p>
          <h1 className="truncate text-lg font-bold tracking-[-0.03em] sm:mt-0.5 sm:text-xl">
            {title}
          </h1>
        </div>
      </div>

      <div className="relative shrink-0">
        <div className="hidden items-center gap-2 md:flex">
          <Tooltip title="Search">
            <button className="grid h-10 w-10 place-items-center rounded-xl border border-black/[0.06] bg-white text-[#6b7280] transition hover:text-[#111827] cursor-pointer">
              <Search size={18} />
            </button>
          </Tooltip>

          <Tooltip title="Notifications">
            <button className="relative grid h-10 w-10 place-items-center rounded-xl border border-black/[0.06] bg-white text-[#6b7280] transition hover:text-[#111827] cursor-pointer">
              <Bell size={18} />
              <span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-[#ef4444]" />
            </button>
          </Tooltip>

          <div className="ml-1 flex items-center gap-2 rounded-xl border border-black/[0.06] bg-white px-2 py-1.5">
            <Avatar sx={{ width: 30, height: 30, bgcolor: "#111827", fontSize: 12, fontWeight: 800 }}>
              AP
            </Avatar>
            <div className="pr-1">
              <p className="text-xs font-semibold leading-none">Artha</p>
              <p className="mt-1 text-[10px] text-[#9ca3af]">Personal</p>
            </div>
            <ChevronDown size={14} className="text-[#9ca3af]" />
          </div>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((value) => !value)}
          aria-label="Open header menu"
          aria-expanded={mobileMenuOpen}
          className="grid h-9 w-9 place-items-center rounded-xl border border-black/[0.06] bg-white text-[#6b7280] transition hover:text-[#111827] md:hidden"
        >
          <Menu size={18} />
        </button>

        {mobileMenuOpen && (
          <div className="absolute right-0 top-[46px] w-52 overflow-hidden rounded-2xl border border-black/[0.07] bg-white p-1.5 shadow-xl shadow-black/[0.08] md:hidden">
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-[#4b5563] transition hover:bg-[#f7f8fa] hover:text-[#111827]"
            >
              <Search size={17} />
              Search
            </button>
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-[#4b5563] transition hover:bg-[#f7f8fa] hover:text-[#111827]"
            >
              <span className="relative">
                <Bell size={17} />
                <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-[#ef4444]" />
              </span>
              Notifications
            </button>
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-[#4b5563] transition hover:bg-[#f7f8fa] hover:text-[#111827]"
            >
              <User size={17} />
              Profile
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
