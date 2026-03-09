import { LoaderCircle } from "lucide-react";
import { motion } from "framer-motion";

export function LoginLoadingPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_48%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(37,99,235,0.20),transparent_45%)]" />

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="relative w-full max-w-sm rounded-2xl border border-slate-700/80 bg-slate-900/80 p-8 text-center shadow-2xl shadow-slate-900/50 backdrop-blur"
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-800 text-cyan-300">
          <LoaderCircle className="h-7 w-7 animate-spin" />
        </div>
        <p className="text-lg font-semibold text-slate-100">Signing you in</p>
        <p className="mt-1 text-sm text-slate-400">
          Please wait while we verify your account.
        </p>
      </motion.div>
    </div>
  );
}
