import { Bell } from "lucide-react";
import { useMemo, useState } from "react";
import { useTask } from "@/contexts/TaskContext";

const levelStyles = {
  info: "border-cyan-200 bg-cyan-50 text-cyan-700 dark:border-cyan-900 dark:bg-cyan-950/40 dark:text-cyan-300",
  warning:
    "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300",
  critical:
    "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300",
};

export default function NotificationCenter() {
  const [open, setOpen] = useState(false);
  const {
    notifications,
    unreadNotifications,
    markAllNotificationsRead,
    markNotificationAsRead,
  } = useTask();

  const recent = useMemo(() => notifications.slice(0, 8), [notifications]);

  return (
    <div className="relative">
      <button
        type="button"
        className="relative rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100"
        onClick={() => setOpen((prev) => !prev)}
      >
        <Bell className="h-5 w-5" />
        {unreadNotifications > 0 && (
          <span className="absolute -right-0.5 -top-0.5 inline-flex min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-semibold text-white">
            {unreadNotifications > 9 ? "9+" : unreadNotifications}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-80 rounded-xl border border-slate-200 bg-white p-3 shadow-xl dark:border-slate-700 dark:bg-slate-900">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Notifications
            </p>
            <button
              type="button"
              className="text-xs text-cyan-600 hover:underline dark:text-cyan-300"
              onClick={markAllNotificationsRead}
            >
              Mark all read
            </button>
          </div>

          <ul className="max-h-72 space-y-2 overflow-y-auto pr-1">
            {recent.map((item) => (
              <li
                key={item.id}
                className={`rounded-lg border p-2 text-xs ${levelStyles[item.level]}`}
              >
                <button
                  type="button"
                  className="w-full text-left"
                  onClick={() => markNotificationAsRead(item.id)}
                >
                  <p className="font-semibold">{item.title}</p>
                  <p className="mt-1">{item.description}</p>
                </button>
              </li>
            ))}
            {recent.length === 0 && (
              <li className="rounded-lg border border-dashed border-slate-300 p-3 text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">
                No notifications.
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
