"use client";

import { useState } from "react";
import Image from "next/image";
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
  Eye,
  EyeOff,
  Fingerprint,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import LogoDark from "@/app/assets/Logo Dark Theme.png";

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
    <main className="h-screen overflow-hidden bg-[#eef1f4] text-[#111827]">
      <div className="grid h-full lg:grid-cols-[1.02fr_0.98fr]">
        <section className="relative hidden h-full overflow-hidden bg-[#0d1422] text-white lg:flex lg:flex-col lg:justify-between lg:p-10 xl:p-14">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(circle_at_45%_45%,black,transparent_82%)]" />
          <div className="pointer-events-none absolute left-[18%] top-[10%] h-72 w-72 rounded-full bg-[#72e0b2]/10 blur-[110px]" />
          <div className="pointer-events-none absolute bottom-[-90px] right-[-60px] h-96 w-96 rounded-full border border-white/[0.06]" />
          <div className="pointer-events-none absolute bottom-[10px] right-[10px] h-64 w-64 rounded-full border border-white/[0.05]" />

          <Link href="/" className="relative z-10 flex w-fit items-center gap-3">
            <Image
              src={LogoDark}
              alt="Kantong"
              width={40}
              height={40}
              priority
              className="h-10 w-10 rounded-xl object-contain"
            />
            <div>
              <p className="text-[17px] font-extrabold tracking-[-0.04em]">kantong.</p>
              <p className="text-[10px] tracking-[0.08em] text-white/40">PERSONAL FINANCE</p>
            </div>
          </Link>

          <div className="relative z-10 max-w-xl">
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

            <div className="mt-9 max-w-lg border-t border-white/[0.08] pt-7">
              <div className="grid gap-5 sm:grid-cols-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/30">Structure</p>
                  <p className="mt-2 text-sm font-medium text-white/75">Wallet-first</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/30">Signal</p>
                  <p className="mt-2 text-sm font-medium text-white/75">Clear cash flow</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/30">Control</p>
                  <p className="mt-2 text-sm font-medium text-white/75">Your own system</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between border-t border-white/[0.08] pt-6 text-[11px] text-white/35">
            <span>Secure session</span>
            <span>© 2026 Kantong</span>
          </div>
        </section>

        <section className="relative flex h-full items-center justify-center overflow-hidden bg-[#f7f8fa] px-5 sm:px-8 lg:px-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(126,224,183,0.14),transparent_25%)]" />

          <div className="relative z-10 w-full max-w-[470px]">
            <Link href="/" className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-[#737b88] transition hover:text-[#111827]">
              <ArrowLeft size={16} /> Back to home
            </Link>

            <div className="rounded-[28px] border border-black/[0.07] bg-white p-6 shadow-[0_24px_70px_rgba(17,24,39,0.08)] sm:p-8 lg:p-9">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.17em] text-[#9ca3af]">WELCOME BACK</p>
                  <h2 className="mt-2 text-3xl font-semibold tracking-[-0.045em]">Sign in to Kantong.</h2>
                </div>
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-black/[0.06] bg-[#f6f7f9]">
                  <Fingerprint size={20} />
                </div>
              </div>

              <p className="mt-3 text-sm leading-6 text-[#7a828e]">
                Continue to your wallets, transactions, and financial overview.
              </p>

              <form onSubmit={handleSubmit} className="mt-7 space-y-4">
                <div>
                  <label htmlFor="email" className="mb-2 block text-xs font-semibold text-[#4b5563]">
                    Email address
                  </label>
                  <TextField
                    id="email"
                    fullWidth
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    sx={fieldSx}
                    inputProps={{ "aria-label": "Email address" }}
                  />
                </div>

                <div>
                  <label htmlFor="password" className="mb-2 block text-xs font-semibold text-[#4b5563]">
                    Password
                  </label>
                  <TextField
                    id="password"
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    sx={fieldSx}
                    inputProps={{ "aria-label": "Password" }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockKeyhole size={17} color="#9ca3af" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            type="button"
                            onClick={() => setShowPassword((value) => !value)}
                            edge="end"
                            size="small"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                          >
                            {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>

                <div className="flex items-center justify-between gap-4 pt-1">
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

              <div className="my-6 flex items-center gap-3 text-[10px] font-semibold tracking-[0.12em] text-[#a1a8b2]">
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
                    <p className="mt-1 text-[11px] leading-5 text-[#8a919d]">
                      Authentication and database protection will be wired into the production backend layer.
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-6 text-center text-xs text-[#8b94a0]">
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
