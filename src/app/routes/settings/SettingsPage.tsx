import EmployeeModal from "@/components/ui/EmployeeModal";
import { useEmployee } from "@/contexts/EmployeeContext";
import { EmployeeTable4 } from "@/features/employees/components/EmployeeTable4";
import type { Employee } from "@/types/employee";
import { useEffect, useState } from "react";
import AddButton from "@/components/ui/AddButton";
import Popup from "@/components/ui/Popup";
import { motion, AnimatePresence } from "framer-motion";
import Dialog from "@/components/ui/Dialog";
import Switch from "@/components/ui/Switch";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/hooks/useAuth";

type SettingsPrefs = {
  locale: "en" | "vi";
  emailDigest: boolean;
  deadlineAlerts: boolean;
  passwordMinLength: number;
  requireStrongPassword: boolean;
};

const SETTINGS_STORAGE_KEY = "app_settings_prefs";

function loadPrefs(): SettingsPrefs {
  const fallback: SettingsPrefs = {
    locale: "en",
    emailDigest: true,
    deadlineAlerts: true,
    passwordMinLength: 8,
    requireStrongPassword: true,
  };

  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) return fallback;
    return { ...fallback, ...(JSON.parse(raw) as Partial<SettingsPrefs>) };
  } catch {
    return fallback;
  }
}

export default function SettingsPage() {
  const employeeState = useEmployee();
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [prefs, setPrefs] = useState<SettingsPrefs>(() => loadPrefs());
  const { isAdded, isOpenDialog, handleCloseDialog, isUpdated } = useEmployee();

  useEffect(() => {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(prefs));
  }, [prefs]);

  const onEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setIsOpenModal(true);
  };

  const onAdd = () => {
    setEditingEmployee(null);
    setIsOpenModal(true);
  };

  const canManageEmployees = user?.role === "Admin";

  return (
    <section className="space-y-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>

      <div className="grid gap-4 xl:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/60">
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Appearance & Locale
          </h2>
          <div className="mt-3 flex items-center justify-between">
            <p className="text-sm text-slate-600 dark:text-slate-300">Dark mode</p>
            <Switch checked={theme === "dark"} onChange={toggleTheme} />
          </div>
          <div className="mt-3">
            <p className="mb-1 text-sm text-slate-600 dark:text-slate-300">Locale</p>
            <select
              className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-900"
              value={prefs.locale}
              onChange={(event) =>
                setPrefs((prev) => ({ ...prev, locale: event.target.value as "en" | "vi" }))
              }
            >
              <option value="en">English</option>
              <option value="vi">Vietnamese</option>
            </select>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/60">
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Notification Preferences
          </h2>
          <label className="mt-3 flex items-center justify-between gap-2 text-sm text-slate-700 dark:text-slate-200">
            Email digest
            <input
              type="checkbox"
              checked={prefs.emailDigest}
              onChange={(event) =>
                setPrefs((prev) => ({ ...prev, emailDigest: event.target.checked }))
              }
            />
          </label>
          <label className="mt-3 flex items-center justify-between gap-2 text-sm text-slate-700 dark:text-slate-200">
            Deadline alerts
            <input
              type="checkbox"
              checked={prefs.deadlineAlerts}
              onChange={(event) =>
                setPrefs((prev) => ({ ...prev, deadlineAlerts: event.target.checked }))
              }
            />
          </label>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/60">
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
          Password Policy
        </h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <label className="text-sm text-slate-700 dark:text-slate-200">
            Minimum password length
            <input
              type="number"
              min={6}
              max={32}
              value={prefs.passwordMinLength}
              onChange={(event) =>
                setPrefs((prev) => ({
                  ...prev,
                  passwordMinLength: Number(event.target.value) || 8,
                }))
              }
              className="mt-1 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 dark:border-slate-700 dark:bg-slate-900"
            />
          </label>

          <label className="mt-6 flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200 sm:mt-0">
            <input
              type="checkbox"
              checked={prefs.requireStrongPassword}
              onChange={(event) =>
                setPrefs((prev) => ({ ...prev, requireStrongPassword: event.target.checked }))
              }
            />
            Require uppercase, lowercase, number
          </label>
        </div>
      </div>

      {canManageEmployees && (
        <div className="space-y-4">
          <AddButton onAdd={onAdd} title="Add Employee" />
          <EmployeeTable4 onEdit={onEdit} employeeState={employeeState} />
        </div>
      )}

      <AnimatePresence>
        {isOpenModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpenModal(false)}
            />
            <motion.div
              className="relative z-10"
              initial={{ opacity: 0, y: 100, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 200, damping: 20, duration: 0.3 }}
              onClick={(event) => event.stopPropagation()}
            >
              <EmployeeModal
                setIsOpenModal={setIsOpenModal}
                employee={editingEmployee}
                employeeState={employeeState}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isAdded && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
            className="fixed right-7 top-21.5 z-9999"
          >
            <Popup message="Employee added successfully!" />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isUpdated && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
            className="fixed right-7 top-21.5 z-9999"
          >
            <Popup message="Employee updated successfully!" />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpenDialog && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/80"
              onClick={() => handleCloseDialog()}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="relative z-10"
              initial={{ opacity: 0, y: 100, x: 150, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, x: 150, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 200, damping: 20, duration: 0.3 }}
              onClick={(event) => event.stopPropagation()}
            >
              <Dialog />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
