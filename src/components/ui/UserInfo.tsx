import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const UserInfo = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-left transition-colors hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
      >
        <span className="hidden text-right sm:block">
          <span className="block text-xs font-semibold text-slate-900 dark:text-slate-100">
            {user?.name ?? "Guest"}
          </span>
          <span className="block max-w-32 truncate text-xs text-slate-500 dark:text-slate-400">
            {user?.email ?? "No email"}
          </span>
        </span>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white dark:bg-slate-100 dark:text-slate-900">
          {user?.name?.slice(0, 1).toUpperCase() ?? "U"}
        </span>
      </button>

      {isDropdownOpen && (
        <ul className="absolute right-0 top-12 z-20 w-44 rounded-lg border border-slate-200 bg-white p-1 shadow-lg dark:border-slate-700 dark:bg-slate-900">
          <li>
            <button
              type="button"
              className="w-full rounded-md px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              onClick={() => {
                setIsDropdownOpen(false);
                navigate("/profile");
              }}
            >
              Profile
            </button>
          </li>
          <li>
            <button
              type="button"
              className="w-full rounded-md px-3 py-2 text-left text-sm text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/40"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default UserInfo;
