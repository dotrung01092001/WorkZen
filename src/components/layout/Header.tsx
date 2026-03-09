import Input from "../ui/Input";
import Switch from "../ui/Switch";
import { GiHamburgerMenu } from "react-icons/gi";
import { useTheme } from "@/hooks/useTheme";
import UserInfo from "../ui/UserInfo";
import { NavLink } from "react-router-dom";
import NotificationCenter from "../ui/NotificationCenter";

interface HeaderProps {
  handleOpen?: () => void;
}

const Header = ({ handleOpen }: HeaderProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur-lg dark:border-slate-800 dark:bg-slate-950/90 sm:px-6">
      <div className="flex items-center gap-3">
        {handleOpen && (
          <button
            type="button"
            onClick={handleOpen}
            className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100"
            aria-label="Toggle sidebar"
          >
            <GiHamburgerMenu className="h-5 w-5" />
          </button>
        )}

        <NavLink to="/dashboard">
          <h1 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            WorkZen
          </h1>
        </NavLink>
      </div>

      <div className="mx-4 hidden flex-1 justify-center md:flex">
        <Input />
      </div>

      <div className="flex items-center gap-3">
        <NotificationCenter />
        <Switch checked={theme === "dark"} onChange={toggleTheme} />
        <UserInfo />
      </div>
    </header>
  );
};

export default Header;
