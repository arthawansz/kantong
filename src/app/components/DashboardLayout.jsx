"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";

const standaloneRoutes = ["/login", "/register", "/forgot-password"];

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  if (standaloneRoutes.includes(pathname)) {
    return children;
  }

  const handleToggleSidebar = () => {
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 1023px)").matches) {
      setMobileSidebarOpen((value) => !value);
      return;
    }

    setSidebarCollapsed((value) => !value);
  };

  return (
    <div className="min-h-screen bg-[#f6f7f9] text-[#111827]">
      <AppSidebar
        collapsed={sidebarCollapsed}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      <AppHeader
        collapsed={sidebarCollapsed}
        onToggle={handleToggleSidebar}
      />

      <main
        className={`min-w-0 pt-[68px] transition-[margin] duration-300 sm:pt-[72px] lg:pt-[76px] ${
          sidebarCollapsed ? "lg:ml-[84px]" : "lg:ml-[250px]"
        }`}
      >
        <div className="px-4 py-5 sm:px-5 sm:py-6 md:px-8 lg:px-10 lg:py-8">{children}</div>
      </main>
    </div>
  );
}
