"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Eye,
  EyeOff,
  Fingerprint,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  WalletCards,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen bg-[#eef1f4] text-[#111827]">
      <div className="grid min-h-screen lg:grid-cols-[1.08fr_0.92fr]">
        <section className="relative hidden overflow-hidden bg-[#0d1422] text-white lg:flex lg:flex-col lg:justify-between lg:p-10 xl:p-14">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(circle_at_45%_45%,black,transparent_82%)]" />
          <div className="pointer-events-none absolute left-[18%] top-[10%] h-72 w-72 rounded-full bg-[#72e0b2]/10 blur-[110px]" />
          <div className="pointer-events-none absolute bottom-[-90px] right-[-60px] h-96 w-96 rounded-full border border-white/[0.06]" />
          <div className="pointer-events-none absolute bottom-[10px] right-[10px] h-64 w-64 rounded-full border border-white/[0.05]" />

          <Link href="/" className="relative z-10 flex w-fit items-center gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-white text-sm font-black text-[#111827]">K</div>
            <div>
              <p className="text-[17px] font-extrabold tracking-[-0.04em]">kantong.</p>
              <p className="text-[10px] tracking-[0.08em] text-white/40">PERSONAL FINANCE</p>
            </div>
          </Link>

          <div className="relative z-10 max-w-xl py-14">
            <div className="flex items-center gap-2 text-[11px] font-bold tracking-[0.17em] text-[#7fe0b7]">
              <Sparkles size={14} /> PRIVATE FINANCIAL OS
            </div>
            <h1 className="mt-6 text-5xl font-semibold leading-[1.02] tracking-[-0.055em] xl:text-6xl">
              Step back into
              <span className="block text-[#8fa0b8]">your financial picture.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-[#98a6ba]">
              One calm workspace for balances, transfers, spending patterns, and the decisions behind them.
            </p>

            <div className="mt-10 overflow-hidden rounded-[24px] border border-white/[0.08] bg-white/[0.035] backdrop-blur">
              <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-4">
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.14em] text-white/35">LIVE SNAPSHOT</p>
                  <p className="mt-1 text-sm font-semibold text-white/90">September cash flow</p>
                </div>
                <div className="rounded-full border border-[#7fe0b7]/20 bg-[#7fe0b7]/10 px-2.5 py-1 text-[10px] font-semibold text-[#7fe0b7]">Healthy</div>
              </div>
              <div className="grid gap-px bg-white/[0.08] sm:grid-cols-3">
                <div className="bg-[#101827] p-5">
                  <WalletCards size={18} className="text-[#9db0c9]" />
                  <p className="mt-6 text-[10px] text-white/35">Balance</p>
                  <p className="mt-1 text-lg font-semibold tracking-[-0.03em]">Rp6.12M</p>
                </div>
                <div className="bg-[#101827] p-5">
                  <BarChart3 size={18} className="text-[#9db0c9]" />
                  <p className="mt-6 text-[10px] text-white/35">Expense</p>
                  <p className="mt-1 text-lg font-semibold tracking-[-0.03em]">Rp1.93M</p>
                </div>
                <div className="bg-[#101827] p-5">
                  <ShieldCheck size={18} className="text-[#7fe0b7]" />
                  <p className="mt-6 text-[10px] text-white/35">Monthly target</p>
                  <p className="mt-1 text-lg font-semibold tracking-[-0.03em]">56%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between border-t border-white/[0.08] pt-6 text-[11px] text-white/35">
            <span>Secure session</span>
            <span>© 2026 Kantong</span>
          </div>
        </section>

        <section className="relative flex min-h-screen items-center justify-center bg-[#f7f8fa] px-5 py-10 sm:px-8 lg:px-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(126,224,183,0.14),transparent_25%)]" />

          <div className="relative z-10 w-full max-w-[470px]">
            <Link href="/" className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-[#737b88] transition hover:text-[#111827]">
              <ArrowLeft size={16} /> Back to home
            </Link>

            <div className="rounded-[28px] border border-black/[0.07] bg-white p-6 shadow-[0_24px_70px_rgba(17,24,39,0.08)] sm:p-8 lg:p-9">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.17em] text-[#9ca3af]">WELCOME BACK</p>
                  <h2 className="mt-2 text-3xl font-semibold tracking-[-0.045em]">Sign in to Kantong.</h2>
                </div>
                <div className="grid h-11 w-11 place-items-center rounded-xl border border-black/[0.06] bg-[#f6f7f9]">
                  <Fingerprint size={20} />
                </div>
              </div>

              <p className="mt-3 text-sm leading-6 text-[#7a828e]">
                Continue to your wallets, transactions, and financial overview.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <TextField
                  fullWidth
                  label="Email address"
                  type="email"
                  required
                  autoComplete="email"
                  sx={fieldSx}
                />
                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  sx={fieldSx}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockKeyhole size={17} color="#9ca3af" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword((value) => !value)} edge="end" size="small">
                          {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <div className="flex items-center justify-between gap-4">
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label="Remember me"
                    sx={{ m: 0, "& .MuiFormControlLabel-label": { fontSize: 13, color: "#6b7280" } }}
                  />
                  <button type="button" className="text-xs font-semibold text-[#4b5563] transition hover:text-[#111827]">
                    Forgot password?
                  </button>
                </div>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  endIcon={!loading ? <ArrowRight size={16} /> : null}
                  sx={{
                    mt: 1,
                    py: 1.35,
                    bgcolor: "#111827",
                    "&:hover": { bgcolor: "#1f2937" },
                  }}
                >
                  {loading ? "Entering Kantong..." : "Sign in"}
                </Button>
              </form>

              <div className="my-7 flex items-center gap-3 text-[10px] font-semibold tracking-[0.12em] text-[#a1a8b2]">
                <span className="h-px flex-1 bg-black/[0.07]" />
                SECURE ACCESS
                <span className="h-px flex-1 bg-black/[0.07]" />
              </div>

              <div className="rounded-2xl border border-black/[0.05] bg-[#f8f9fa] p-4">
                <div className="flex items-start gap-3">
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white ring-1 ring-black/[0.05]">
                    <ShieldCheck size={16} className="text-[#15803d]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold">Your finance workspace stays yours.</p>
                    <p className="mt-1 text-[11px] leading-5 text-[#8a919d]">Authentication and database protection will be wired into the production backend layer.</p>
                  </div>
                </div>
              </div>

              <p className="mt-7 text-center text-xs text-[#8b94a0]">
                New to Kantong? <span className="font-semibold text-[#111827]">Account creation is coming next.</span>
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    bgcolor: "#fbfbfc",
    "& fieldset": { borderColor: "rgba(17,24,39,0.09)" },
    "&:hover fieldset": { borderColor: "rgba(17,24,39,0.18)" },
    "&.Mui-focused fieldset": { borderColor: "#111827", borderWidth: 1 },
  },
  "& .MuiInputLabel-root.Mui-focused": { color: "#111827" },
};
