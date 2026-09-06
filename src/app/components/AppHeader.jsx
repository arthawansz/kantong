"use client";

import { usePathname } from "next/navigation";
import { Avatar, Tooltip } from "@mui/material";
import { Bell, ChevronDown, Search } from "lucide-react";

const titles = {
  "/dashboard": "Overview",
  "/wallets": "Wallets",
  "/transactions": "Transactions",
  "/categories": "Categories",
  "/analytics": "Analytics",
  "/settings": "Settings",
};

export default function AppHeader() {
  const pathname = usePathname();
  const title = titles[pathname] ?? "KANTONG";

  return (
    <header className="sticky top-0 z-20 flex h-[76px] items-center justify-between border-b border-black/[0.05] bg-[#f6f7f9]/95 px-5 backdrop-blur md:px-8 lg:px-10">
      <div>
        <p className="text-xs font-medium text-[#9aa1ab]">Sunday, September 6</p>
        <h1 className="mt-0.5 text-xl font-bold tracking-[-0.03em]">{title}</h1>
      </div>

      <div className="flex items-center gap-2">
        <Tooltip title="Search">
          <button className="grid h-10 w-10 place-items-center rounded-xl border border-black/[0.06] bg-white text-[#6b7280] hover:text-[#111827]">
            <Search size={18} />
          </button>
        </Tooltip>

        <Tooltip title="Notifications">
          <button className="relative grid h-10 w-10 place-items-center rounded-xl border border-black/[0.06] bg-white text-[#6b7280] hover:text-[#111827]">
            <Bell size={18} />
            <span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-[#ef4444]" />
          </button>
        </Tooltip>

        <div className="ml-1 hidden items-center gap-2 rounded-xl border border-black/[0.06] bg-white px-2 py-1.5 sm:flex">
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
    </header>
  );
}
