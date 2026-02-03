import Input from "../ui/Input";
import Switch from "../ui/Switch";
import { GiHamburgerMenu } from "react-icons/gi";
import { useTheme } from "@/hooks/useTheme";
import UserInfo from "../ui/UserInfo";
import { NavLink } from "react-router";

const Header = ({ handleOpen }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 z-50 flex w-full h-[12vh] items-center justify-between px-4 bg-black dark:bg-white">
      <div className="flex items-center flex-1 justify-between ">
        <NavLink to='/dashboard'>
          <h1 className="text-2xl font-bold text-blue-400">WorkZen</h1>
        </NavLink>

        <button>
          <GiHamburgerMenu
            className="fill-white dark:fill-black w-18 h-6"
            onClick={handleOpen}
          />
        </button>
      </div>

      <div className="flex items-center ml-2 flex-6">
        <Input />
      </div>

      <div className="flex items-center gap-4 flex-1.5  justify-end">
        <Switch checked={theme === "dark"} onChange={toggleTheme} />
        <UserInfo />
      </div>
    </header>
  );
};

export default Header;
