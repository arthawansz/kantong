"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button, TextField } from "@mui/material";
import {
  ArrowRight,
  ChevronLeft,
  KeyRound,
  MailCheck,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import LogoDark from "@/app/assets/Logo Dark Theme.png";

const easeOut = [0.22, 1, 0.36, 1];

export default function ForgotPasswordPage() {
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setEmailSent(true);
    setLoading(false);
  };

  return (
    <main className="h-screen overflow-hidden bg-[#eef1f4] text-[#111827]">
      <div className="grid h-full lg:grid-cols-[1.02fr_0.98fr]">
        <section className="relative hidden h-full overflow-hidden bg-[#0d1422] text-white lg:flex lg:flex-col lg:justify-between lg:p-10 xl:p-14">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(circle_at_45%_45%,black,transparent_82%)]" />
          <div className="pointer-events-none absolute left-[18%] top-[10%] h-72 w-72 rounded-full bg-[#72e0b2]/10 blur-[110px]" />
          <div className="pointer-events-none absolute bottom-[-90px] right-[-60px] h-96 w-96 rounded-full border border-white/[0.06]" />
          <div className="pointer-events-none absolute bottom-[10px] right-[10px] h-64 w-64 rounded-full border border-white/[0.05]" />

          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: easeOut }} className="relative z-10">
            <Link href="/" className="flex w-fit items-center gap-3">
              <Image src={LogoDark} alt="Kantong" width={40} height={40} priority className="h-12 w-12 rounded-xl object-contain" />
              <div>
                <p className="text-[17px] font-extrabold tracking-[-0.04em]">kantong.</p>
                <p className="text-[10px] tracking-[0.08em] text-white/40">PERSONAL FINANCE</p>
              </div>
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.12, ease: easeOut }} className="relative z-10 max-w-xl">
            <div className="flex items-center gap-2 text-[11px] font-bold tracking-[0.17em] text-[#7fe0b7]">
              <Sparkles size={14} /> ACCOUNT RECOVERY
            </div>
            <h1 className="mt-6 text-5xl font-semibold leading-[1.02] tracking-[-0.055em] xl:text-6xl">
              Recover access,
              <span className="block text-[#8fa0b8]">without losing control.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-[#98a6ba]">
              Reset access securely through the email connected to your Kantong account.
            </p>

            <div className="mt-9 max-w-lg border-t border-white/[0.08] pt-7">
              <div className="grid gap-5 sm:grid-cols-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/30">Verify</p>
                  <p className="mt-2 text-sm font-medium text-white/75">Your email</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/30">Reset</p>
                  <p className="mt-2 text-sm font-medium text-white/75">With a secure link</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/30">Return</p>
                  <p className="mt-2 text-sm font-medium text-white/75">To your account</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.55 }} className="relative z-10 flex items-center justify-between border-t border-white/[0.08] pt-6 text-[11px] text-white/35">
            <span>Recovery protected</span>
            <span>© 2026 Kantong</span>
          </motion.div>
        </section>

        <section className="relative flex h-full items-center justify-center overflow-hidden bg-[#f7f8fa] px-5 sm:px-8 lg:px-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(126,224,183,0.14),transparent_25%)]" />

          <Link href="/" aria-label="Back to landing page" className="absolute right-5 top-5 z-20 grid h-10 w-10 place-items-center rounded-xl border border-black/[0.07] bg-white/90 text-[#667085] shadow-sm backdrop-blur transition hover:bg-white hover:text-[#111827] sm:right-8 sm:top-8 lg:right-10">
            <ChevronLeft size={19} />
          </Link>

          <motion.div initial={{ opacity: 0, y: 24, scale: 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.68, delay: 0.12, ease: easeOut }} className="relative z-10 w-full max-w-[470px] rounded-[28px] border border-black/[0.07] bg-white p-6 shadow-[0_24px_70px_rgba(17,24,39,0.08)] sm:p-8 lg:p-9">
            {!emailSent ? (
              <>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.17em] text-[#9ca3af]">RESET ACCESS</p>
                    <h2 className="mt-2 text-3xl font-semibold tracking-[-0.045em]">Forgot your password?</h2>
                  </div>
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-black/[0.06] bg-[#f6f7f9]">
                    <KeyRound size={20} />
                  </div>
                </div>

                <p className="mt-3 text-sm leading-6 text-[#7a828e]">
                  Enter the email connected to your account and we’ll send a password reset link.
                </p>

                <form onSubmit={handleSubmit} className="mt-7 space-y-4">
                  <div>
                    <label htmlFor="email" className="mb-2 block text-xs font-semibold text-[#4b5563]">Email address</label>
                    <TextField id="email" fullWidth required type="email" autoComplete="email" placeholder="you@example.com" sx={fieldSx} />
                  </div>

                  <Button type="submit" fullWidth variant="contained" size="large" disabled={loading} endIcon={!loading ? <ArrowRight size={16} /> : null} sx={{ py: 1.35, bgcolor: "#111827", "&:hover": { bgcolor: "#1f2937" } }}>
                    {loading ? "Sending reset link..." : "Send reset link"}
                  </Button>
                </form>

                <div className="my-6 flex items-center gap-3 text-[10px] font-semibold tracking-[0.12em] text-[#a1a8b2]">
                  <span className="h-px flex-1 bg-black/[0.07]" />
                  SECURE RECOVERY
                  <span className="h-px flex-1 bg-black/[0.07]" />
                </div>

                <div className="rounded-2xl border border-black/[0.05] bg-[#f8f9fa] p-4">
                  <div className="flex items-start gap-3">
                    <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white ring-1 ring-black/[0.05]">
                      <ShieldCheck size={16} className="text-[#15803d]" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold">Only the account email can reset access.</p>
                      <p className="mt-1 text-[11px] leading-5 text-[#8a919d]">Reset links will be time-limited and single-use once the backend is connected.</p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: easeOut }} className="py-4 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#ecfdf3] text-[#15803d]">
                  <MailCheck size={26} />
                </div>
                <p className="mt-5 text-[10px] font-bold tracking-[0.17em] text-[#9ca3af]">CHECK YOUR EMAIL</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-[-0.045em]">Reset link sent.</h2>
                <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#7a828e]">
                  If that email is connected to a Kantong account, a secure reset link will arrive shortly.
                </p>
                <Button component={Link} href="/login" fullWidth variant="contained" size="large" sx={{ mt: 6, py: 1.35, bgcolor: "#111827", "&:hover": { bgcolor: "#1f2937" } }}>
                  Back to sign in
                </Button>
              </motion.div>
            )}

            {!emailSent && (
              <p className="mt-6 text-center text-xs text-[#8b94a0]">
                Remembered it? <Link href="/login" className="font-semibold text-[#373738] transition hover:text-black">Back to sign in</Link>
              </p>
            )}
          </motion.div>
        </section>
      </div>
    </main>
  );
}

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    minHeight: 52,
    borderRadius: "12px",
    bgcolor: "#fbfbfc",
    "& fieldset": { borderColor: "rgba(17,24,39,0.09)" },
    "&:hover fieldset": { borderColor: "rgba(17,24,39,0.18)" },
    "&.Mui-focused fieldset": { borderColor: "#111827", borderWidth: 1 },
  },
  "& .MuiOutlinedInput-input": {
    paddingTop: "14px",
    paddingBottom: "14px",
    fontSize: 14,
  },
};
