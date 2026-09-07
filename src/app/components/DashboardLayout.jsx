"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";

const standaloneRoutes = ["/login", "/register", "/forgot-password"];

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  if (standaloneRoutes.includes(pathname)) {
    return children;
  }

  const handleToggleSidebar = () => {
    setSidebarCollapsed((value) => !value);
  };

  return (
    <div className="min-h-screen bg-[#f6f7f9] text-[#111827]">
      <AppSidebar collapsed={sidebarCollapsed} />

      <AppHeader
        collapsed={sidebarCollapsed}
        onToggle={handleToggleSidebar}
      />

      <main
        className={`min-w-0 pt-[76px] transition-[margin] duration-300 ${
          sidebarCollapsed ? "lg:ml-[84px]" : "lg:ml-[250px]"
        }`}
      >
        <div className="px-5 py-6 md:px-8 lg:px-10 lg:py-8">{children}</div>
      </main>
    </div>
  );
}
