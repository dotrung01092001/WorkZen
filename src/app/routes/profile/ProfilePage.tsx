import PasswordInput from "@/components/ui/PasswordInput";
import { useEmployee } from "@/contexts/EmployeeContext";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShieldCheck } from "lucide-react";

interface errorProps {
  current?: string;
  new?: string;
  confirm?: string;
}

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const { employees, updateEmployee } = useEmployee();

  const [error, setError] = useState<errorProps>({});
  const [current, setCurrent] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const navigate = useNavigate();

  const updatePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) return;

    const employee = employees.find((emp) => emp.id === user.id);

    if (!employee) return;

    const newError: errorProps = {};

    if (employee.password !== current) {
      newError.current = "Current password is incorrect";
    }

    if (newPassword.length < 6) {
      newError.new = "New password must be at least 6 characters long";
    }

    if (newPassword !== confirmPassword) {
      newError.confirm = "New password and confirm password do not match";
    }

    if (Object.keys(newError).length > 0) {
      setError(newError);
      return;
    }

    updateEmployee({
      ...employee,
      password: newPassword,
    });
    setError({});
    setCurrent("");
    setNewPassword("");
    setConfirmPassword("");

    logout();

    navigate("/login");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-8 sm:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.16),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.18),transparent_42%)]" />

      <motion.div
        className="relative mx-auto mt-8 w-full max-w-4xl rounded-3xl border border-slate-700/70 bg-slate-900/75 p-5 shadow-2xl shadow-black/40 backdrop-blur sm:p-8"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <div className="mb-5 flex items-center justify-between gap-3">
          <Button
            type="button"
            variant="ghost"
            className="text-slate-300 hover:bg-slate-800 hover:text-slate-100"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-200">
            <ShieldCheck className="h-3.5 w-3.5" />
            Profile Security
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-700 bg-slate-950/70 p-5">
            <p className="text-xs uppercase tracking-wider text-slate-400">
              Account
            </p>
            <div className="mt-2">
              <p className="text-2xl font-semibold text-slate-100">
                {user?.name}
              </p>
              <p className="text-sm font-medium text-cyan-300">
                {user?.role}
              </p>
              <p className="mt-1 text-sm text-slate-400">{user?.email}</p>
            </div>
          </div>

          <form
            onSubmit={updatePassword}
            className="rounded-2xl border border-slate-700 bg-slate-950/70 p-5"
          >
            <p className="text-xl font-semibold text-slate-100">Change Password</p>
            <p className="pb-4 pt-1 text-sm text-slate-400">
              Use a strong password with at least 6 characters.
            </p>
            <PasswordInput
              PlaceHolder="Current Password"
              Name="current"
              value={current}
              onChange={setCurrent}
              error={error.current}
            />
            <PasswordInput
              PlaceHolder="New Password"
              Name="new"
              value={newPassword}
              onChange={setNewPassword}
              error={error.new}
            />
            <PasswordInput
              PlaceHolder="Confirm Password"
              Name="confirm"
              value={confirmPassword}
              onChange={setConfirmPassword}
              error={error.confirm}
            />
            <Button
              type="submit"
              className="h-10 rounded-lg bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 px-5 text-white hover:brightness-110"
            >
              Save Changes
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
