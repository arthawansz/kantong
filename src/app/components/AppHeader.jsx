"use client";

import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { Avatar, Tooltip } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  ChevronDown,
  CircleDollarSign,
  LogOut,
  Menu,
  PanelLeft,
  Search,
  Settings,
  TrendingUp,
  User,
  WalletCards,
  X,
} from "lucide-react";

const titles = {
  "/dashboard": "Overview",
  "/wallets": "Wallets",
  "/transactions": "Transactions",
  "/categories": "Categories",
  "/analytics": "Analytics",
  "/profile": "Profile",
  "/settings": "Settings",
};

const searchableItems = [
  { title: "Overview", subtitle: "Dashboard summary and balance", href: "/dashboard", type: "Page" },
  { title: "Wallets", subtitle: "Manage BCA, Cash, GoPay and more", href: "/wallets", type: "Page" },
  { title: "Transactions", subtitle: "Review income, expenses and transfers", href: "/transactions", type: "Page" },
  { title: "Categories", subtitle: "Manage spending categories", href: "/categories", type: "Page" },
  { title: "Analytics", subtitle: "Explore cash flow and spending trends", href: "/analytics", type: "Page" },
  { title: "Profile", subtitle: "Personal information and finance preferences", href: "/profile", type: "Page" },
  { title: "Settings", subtitle: "Account and application preferences", href: "/settings", type: "Page" },
  { title: "BCA", subtitle: "Wallet · Rp 4.850.000", href: "/wallets", type: "Wallet" },
  { title: "Cash", subtitle: "Wallet · Rp 850.000", href: "/wallets", type: "Wallet" },
  { title: "GoPay", subtitle: "Wallet · Rp 421.500", href: "/wallets", type: "Wallet" },
];

const initialNotifications = [
  {
    id: 1,
    title: "Monthly spending is getting close",
    description: "You have used 56% of your Rp3.5M monthly target.",
    time: "8 min ago",
    read: false,
    tone: "warning",
  },
  {
    id: 2,
    title: "Income added successfully",
    description: "Rp1.250.000 was added to your BCA wallet.",
    time: "1 hour ago",
    read: false,
    tone: "positive",
  },
  {
    id: 3,
    title: "GoPay balance is running low",
    description: "Your GoPay wallet balance is now Rp421.500.",
    time: "Yesterday",
    read: true,
    tone: "wallet",
  },
];

const popupTransition = { duration: 0.18, ease: "easeOut" };

function NotificationIcon({ tone }) {
  const iconClass = "h-9 w-9 shrink-0 rounded-xl grid place-items-center";

  if (tone === "positive") {
    return (
      <div className={`${iconClass} bg-emerald-50 text-emerald-700`}>
        <CircleDollarSign size={17} />
      </div>
    );
  }

  if (tone === "wallet") {
    return (
      <div className={`${iconClass} bg-blue-50 text-blue-700`}>
        <WalletCards size={17} />
      </div>
    );
  }

  return (
    <div className={`${iconClass} bg-amber-50 text-amber-700`}>
      <TrendingUp size={17} />
    </div>
  );
}

export default function AppHeader({ collapsed, onToggle }) {
  const pathname = usePathname();
  const title = titles[pathname] ?? "KANTONG";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = notifications.filter((item) => !item.read).length;

  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return searchableItems.slice(0, 6);

    return searchableItems.filter((item) =>
      `${item.title} ${item.subtitle} ${item.type}`.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const openSearch = () => {
    setMobileMenuOpen(false);
    setNotificationOpen(false);
    setProfileOpen(false);
    setSearchOpen(true);
  };

  const openNotifications = () => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
    setProfileOpen(false);
    setNotificationOpen((value) => !value);
  };

  const openProfile = () => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
    setNotificationOpen(false);
    setProfileOpen((value) => !value);
  };

  const closeNotifications = () => setNotificationOpen(false);
  const closeProfile = () => setProfileOpen(false);

  const markAllAsRead = () => {
    setNotifications((items) => items.map((item) => ({ ...item, read: true })));
  };

  return (
    <>
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
              className="grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-xl text-[#7a828e] transition hover:bg-white hover:text-[#111827] hover:shadow-sm"
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
              <button
                type="button"
                onClick={openSearch}
                className="grid h-10 w-10 cursor-pointer place-items-center rounded-xl border border-black/[0.06] bg-white text-[#6b7280] transition hover:text-[#111827]"
              >
                <Search size={18} />
              </button>
            </Tooltip>

            <Tooltip title="Notifications">
              <button
                type="button"
                onClick={openNotifications}
                className="relative grid h-10 w-10 cursor-pointer place-items-center rounded-xl border border-black/[0.06] bg-white text-[#6b7280] transition hover:text-[#111827]"
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-[#ef4444]" />
                )}
              </button>
            </Tooltip>

            <button
              type="button"
              onClick={openProfile}
              aria-expanded={profileOpen}
              className="ml-1 flex cursor-pointer items-center gap-2 rounded-xl border border-black/[0.06] bg-white px-2 py-1.5 text-left transition hover:border-black/[0.1] hover:shadow-sm"
            >
              <Avatar sx={{ width: 30, height: 30, bgcolor: "#111827", fontSize: 12, fontWeight: 800 }}>
                AP
              </Avatar>
              <div className="pr-1">
                <p className="text-xs font-semibold leading-none">Artha</p>
                <p className="mt-1 text-[10px] text-[#9ca3af]">Personal</p>
              </div>
              <motion.div animate={{ rotate: profileOpen ? 180 : 0 }} transition={{ duration: 0.18 }}>
                <ChevronDown size={14} className="text-[#9ca3af]" />
              </motion.div>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((value) => !value)}
            aria-label="Open header menu"
            aria-expanded={mobileMenuOpen}
            className="grid h-9 w-9 cursor-pointer place-items-center rounded-xl border border-black/[0.06] bg-white text-[#6b7280] transition hover:text-[#111827] md:hidden"
          >
            <Menu size={18} />
          </button>

          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={popupTransition}
                className="absolute right-0 top-[46px] w-52 origin-top-right overflow-hidden rounded-2xl border border-black/[0.07] bg-white p-1.5 shadow-xl shadow-black/[0.08] md:hidden"
              >
                <button
                  type="button"
                  onClick={openSearch}
                  className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-[#4b5563] transition hover:bg-[#f7f8fa] hover:text-[#111827]"
                >
                  <Search size={17} />
                  Search
                </button>
                <button
                  type="button"
                  onClick={openNotifications}
                  className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-[#4b5563] transition hover:bg-[#f7f8fa] hover:text-[#111827]"
                >
                  <span className="relative">
                    <Bell size={17} />
                    {unreadCount > 0 && (
                      <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-[#ef4444]" />
                    )}
                  </span>
                  Notifications
                </button>
                <button
                  type="button"
                  onClick={openProfile}
                  className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-[#4b5563] transition hover:bg-[#f7f8fa] hover:text-[#111827]"
                >
                  <User size={17} />
                  Profile
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {notificationOpen && (
              <>
                <motion.button
                  type="button"
                  aria-label="Close notifications"
                  onClick={closeNotifications}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.16 }}
                  className="fixed inset-0 z-[45] cursor-pointer bg-[#111827]/20 backdrop-blur-[1px] md:hidden"
                />

                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.97 }}
                  transition={popupTransition}
                  className="fixed left-4 right-4 top-[78px] z-50 origin-top-right overflow-hidden rounded-2xl border border-black/[0.07] bg-white shadow-2xl shadow-black/[0.12] sm:left-auto sm:right-5 sm:w-[380px] md:absolute md:right-0 md:top-[50px] lg:right-0"
                >
                  <div className="flex items-center justify-between border-b border-black/[0.06] px-4 py-3.5">
                    <div>
                      <p className="text-sm font-bold text-[#111827]">Notifications</p>
                      <p className="mt-0.5 text-[11px] text-[#9ca3af]">
                        {unreadCount > 0 ? `${unreadCount} unread updates` : "You're all caught up"}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={markAllAsRead}
                        className="cursor-pointer text-[11px] font-semibold text-[#6b7280] transition hover:text-[#111827]"
                      >
                        Mark all as read
                      </button>
                      <button
                        type="button"
                        onClick={closeNotifications}
                        aria-label="Close notifications"
                        className="grid h-8 w-8 cursor-pointer place-items-center rounded-lg text-[#9ca3af] transition hover:bg-[#f5f6f7] hover:text-[#111827]"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="max-h-[360px] overflow-y-auto p-2">
                    {notifications.map((item, index) => (
                      <motion.button
                        key={item.id}
                        type="button"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.18, delay: index * 0.035 }}
                        onClick={() =>
                          setNotifications((items) =>
                            items.map((notification) =>
                              notification.id === item.id ? { ...notification, read: true } : notification
                            )
                          )
                        }
                        className={`flex w-full cursor-pointer gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-[#f7f8fa] ${
                          item.read ? "bg-white" : "bg-[#f8fafc]"
                        }`}
                      >
                        <NotificationIcon tone={item.tone} />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start gap-2">
                            <p className="flex-1 text-[13px] font-semibold leading-5 text-[#111827]">{item.title}</p>
                            {!item.read && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#111827]" />}
                          </div>
                          <p className="mt-0.5 text-[11px] leading-4 text-[#8a919d]">{item.description}</p>
                          <p className="mt-1.5 text-[10px] font-medium text-[#b0b5bd]">{item.time}</p>
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  <div className="border-t border-black/[0.06] p-2">
                    <button
                      type="button"
                      className="w-full cursor-pointer rounded-xl px-3 py-2.5 text-center text-xs font-semibold text-[#4b5563] transition hover:bg-[#f7f8fa] hover:text-[#111827]"
                    >
                      View all notifications
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {profileOpen && (
              <>
                <motion.button
                  type="button"
                  aria-label="Close profile menu"
                  onClick={closeProfile}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.16 }}
                  className="fixed inset-0 z-[45] cursor-pointer bg-[#111827]/20 backdrop-blur-[1px] md:hidden"
                />

                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.96 }}
                  transition={popupTransition}
                  className="fixed left-4 right-4 top-[78px] z-50 origin-top-right overflow-hidden rounded-2xl border border-black/[0.07] bg-white shadow-2xl shadow-black/[0.12] sm:left-auto sm:right-5 sm:w-[300px] md:absolute md:right-0 md:top-[50px]"
                >
                  <div className="flex items-center gap-3 border-b border-black/[0.06] px-4 py-4">
                    <Avatar sx={{ width: 42, height: 42, bgcolor: "#111827", fontSize: 14, fontWeight: 800 }}>
                      AP
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-[#111827]">Artha</p>
                      <p className="mt-0.5 truncate text-[11px] text-[#9ca3af]">Personal account</p>
                    </div>
                    <button
                      type="button"
                      onClick={closeProfile}
                      aria-label="Close profile menu"
                      className="grid h-8 w-8 cursor-pointer place-items-center rounded-lg text-[#9ca3af] transition hover:bg-[#f5f6f7] hover:text-[#111827] md:hidden"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="p-2">
                    <a
                      href="/profile"
                      onClick={closeProfile}
                      className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-[#4b5563] transition hover:bg-[#f7f8fa] hover:text-[#111827]"
                    >
                      <User size={17} />
                      Profile
                    </a>
                    <a
                      href="/settings"
                      onClick={closeProfile}
                      className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#4b5563] transition hover:bg-[#f7f8fa] hover:text-[#111827]"
                    >
                      <Settings size={17} />
                      Settings
                    </a>
                  </div>

                  <div className="border-t border-black/[0.06] p-2">
                    <a
                      href="/login"
                      className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#dc2626] transition hover:bg-red-50"
                    >
                      <LogOut size={17} />
                      Sign out
                    </a>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </header>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[9vh] sm:px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
          >
            <motion.button
              type="button"
              aria-label="Close search"
              onClick={() => setSearchOpen(false)}
              className="absolute inset-0 cursor-pointer bg-[#111827]/35 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.16 }}
            />

            <motion.div
              initial={{ opacity: 0, y: -18, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -18, scale: 0.97 }}
              transition={popupTransition}
              className="relative w-full max-w-2xl origin-top overflow-hidden rounded-[22px] border border-black/[0.08] bg-white shadow-2xl shadow-black/[0.18]"
            >
              <div className="flex items-center gap-3 border-b border-black/[0.06] px-4 py-4 sm:px-5">
                <Search size={19} className="shrink-0 text-[#111827]" />
                <input
                  autoFocus
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search wallets, transactions, pages..."
                  className="min-w-0 flex-1 bg-transparent text-sm text-[#111827] outline-none placeholder:text-[#9ca3af] sm:text-base"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="grid h-8 w-8 shrink-0 cursor-pointer place-items-center rounded-lg text-[#9ca3af] transition hover:bg-[#f5f6f7] hover:text-[#111827]"
                >
                  <X size={17} />
                </button>
              </div>

              <div className="max-h-[420px] overflow-y-auto p-2 sm:p-3">
                <div className="px-2 pb-2 pt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#a0a6af]">
                  {searchQuery ? "Search results" : "Quick access"}
                </div>

                {searchResults.length > 0 ? (
                  <div className="space-y-1">
                    {searchResults.map((item, index) => (
                      <motion.a
                        key={`${item.type}-${item.title}`}
                        href={item.href}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.16, delay: index * 0.025 }}
                        className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-[#f7f8fa]"
                      >
                        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#f1f3f5] text-[#6b7280]">
                          {item.type === "Wallet" ? <WalletCards size={17} /> : <Search size={16} />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <p className="truncate text-sm font-semibold text-[#111827]">{item.title}</p>
                            <span className="rounded-md bg-[#f1f3f5] px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-[#8a919d]">
                              {item.type}
                            </span>
                          </div>
                          <p className="mt-0.5 truncate text-[11px] text-[#9ca3af]">{item.subtitle}</p>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="px-4 py-12 text-center"
                  >
                    <p className="text-sm font-semibold text-[#374151]">No results found</p>
                    <p className="mt-1 text-xs text-[#9ca3af]">Try searching with another keyword.</p>
                  </motion.div>
                )}
              </div>

              <div className="flex items-center justify-between border-t border-black/[0.06] bg-[#fafafa] px-4 py-3 text-[10px] text-[#9ca3af] sm:px-5">
                <span>Frontend preview · mock data</span>
                <span>ESC to close</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
