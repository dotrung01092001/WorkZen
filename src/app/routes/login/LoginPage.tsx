import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import LoginImage from "@/assets/login-image.png";
import { motion } from "framer-motion";
import { LoginLoadingPage } from "./LoginLoadingPage";
import { ShieldCheck, Mail, Lock } from "lucide-react";
import { useState } from "react";

interface LoginForm {
  email: string;
  password: string;
}

export function LoginPage() {
  const { register, handleSubmit } = useForm<LoginForm>();
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");

  const onSubmit = async (data: LoginForm) => {
    try {
      setError("");
      await login(data.email, data.password);
      navigate("/dashboard");
    } catch {
      setError("Invalid email or password.");
    }
  };

  if (loading) {
    return <LoginLoadingPage />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-8 sm:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.20),transparent_46%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(37,99,235,0.22),transparent_48%)]" />

      <motion.div
        className="relative mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-6xl overflow-hidden rounded-3xl border border-slate-700/70 bg-slate-900/70 shadow-2xl shadow-black/40 backdrop-blur md:grid-cols-2"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <div className="relative hidden md:block">
          <img src={LoginImage} alt="Login visual" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/30 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8">
            <p className="text-2xl font-semibold text-slate-100">WorkZen Workspace</p>
            <p className="mt-2 text-sm text-slate-200/90">
              Manage employees, tasks, and progress in one place.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center gap-5 px-6 py-10 sm:px-10"
        >
          <div className="mb-2">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-200">
              <ShieldCheck className="h-3.5 w-3.5" />
              Secure Login
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-50">
              Welcome back
            </h1>
            <p className="mt-1 text-sm text-slate-300">
              Sign in to continue to your dashboard.
            </p>
          </div>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-200">Email</span>
            <div className="flex items-center rounded-xl border border-slate-700 bg-slate-950/60 px-3">
              <Mail className="h-4 w-4 text-slate-500" />
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="you@company.com"
                className="h-12 w-full bg-transparent px-3 text-sm text-slate-100 outline-none placeholder:text-slate-500"
              />
            </div>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-200">Password</span>
            <div className="flex items-center rounded-xl border border-slate-700 bg-slate-950/60 px-3">
              <Lock className="h-4 w-4 text-slate-500" />
              <input
                {...register("password", /* { required: true } */)}
                type="password"
                placeholder="Enter your password"
                className="h-12 w-full bg-transparent px-3 text-sm text-slate-100 outline-none placeholder:text-slate-500"
              />
            </div>
          </label>

          {error ? (
            <p className="rounded-lg border border-rose-400/40 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            className="mt-1 h-12 rounded-xl bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Sign in
          </button>
        </form>
      </motion.div>
    </div>
  );
}
