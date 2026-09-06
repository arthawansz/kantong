"use client";

import { usePathname } from "next/navigation";
import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";

const standaloneRoutes = ["/login", "/register", "/forgot-password"];

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  if (standaloneRoutes.includes(pathname)) {
    return children;
  }

  return (
    <div className="min-h-screen bg-[#f6f7f9] text-[#111827]">
      <AppSidebar />
      <main className="min-w-0 lg:ml-[250px]">
        <AppHeader />
        <div className="px-5 py-6 md:px-8 lg:px-10 lg:py-8">{children}</div>
      </main>
    </div>
  );
}
