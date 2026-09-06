"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import LogoDark from "@/app/assets/Logo Dark Theme.png";

const footerGroups = [
  {
    title: "Product",
    links: [
      { label: "Overview", href: "#product" },
      { label: "Insights", href: "#insights" },
      { label: "Principles", href: "#principles" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Sign in", href: "/login" },
      { label: "Open Kantong", href: "/login" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
];

export default function LandingFooter() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#0d1422] text-white">
      <div className="mx-auto max-w-[1320px] px-5 py-14 md:px-8 lg:px-10 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <div className="max-w-md">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src={LogoDark}
                alt="Kantong"
                width={44}
                height={44}
                className="h-11 w-11 rounded-[14px] object-contain"
              />
              <div>
                <p className="text-xl font-extrabold tracking-[-0.04em]">kantong.</p>
                <p className="mt-0.5 text-[10px] font-semibold tracking-[0.12em] text-[#718096]">
                  PERSONAL FINANCE
                </p>
              </div>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-6 text-[#98a6ba]">
              A calmer way to understand wallets, transactions, and spending habits in one clear financial system.
            </p>

            <Link
              href="/login"
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#dce3ec] transition hover:text-white"
            >
              Start with Kantong
              <ArrowUpRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#718096]">
                  {group.title}
                </p>
                <ul className="mt-5 space-y-3">
                  {group.links.map((link) => (
                    <li key={`${group.title}-${link.label}`}>
                      <Link
                        href={link.href}
                        className="text-sm text-[#aab5c4] transition hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 h-px bg-white/[0.08]" />

        <div className="mt-6 flex flex-col gap-5 text-xs text-[#718096] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
            <p>© 2026 Kantong. All rights reserved.</p>
            <span className="hidden h-3 w-px bg-white/[0.12] sm:block" />
            <p>Personal finance, designed for clarity.</p>
          </div>

          <a
            href="https://github.com/arthawansz/kantong"
            target="_blank"
            rel="noreferrer"
            aria-label="Kantong on GitHub"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.035] text-[#9aa8ba] transition hover:border-white/[0.16] hover:bg-white/[0.07] hover:text-white"
          >
            <Github size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
