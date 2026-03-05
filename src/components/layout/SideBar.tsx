import { NavLink } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { MdPeopleAlt } from "react-icons/md";
import { HiClipboardList } from "react-icons/hi";
import { HiCog6Tooth } from "react-icons/hi2";
import { motion } from "motion/react";

const items = [
  { to: "/dashboard", label: "Dashboard", icon: MdSpaceDashboard },
  { to: "/employees", label: "Employees", icon: MdPeopleAlt },
  { to: "/tasks", label: "Tasks", icon: HiClipboardList },
  { to: "/settings", label: "Settings", icon: HiCog6Tooth },
];

export function Sidebar({ isOpen }: { isOpen: boolean }) {
  return (
    <aside
      className={`
    mt-[12vh] bg-black dark:bg-white dark:text-black text-white h-[88vh]
    transition-[width] duration-300 max-md:fixed max-md:inset-0 max-md:flex max-md:justify-center max-md:items-center max-md:w-full max-md:z-1000000 max-md:transition-transform max-md:duration-300 max-md:ease-in-out
    ${isOpen ? "w-45 p-4 max-md:translate-x-0" : "w-16 py-4 px-2 max-md:-translate-x-full"}
  `}
    >
      <nav className="space-y-2">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `group flex items-center gap-3 px-3 py-2 rounded transition
         ${
           isActive
             ? "bg-gray-700 text-white"
             : "text-gray-400 hover:bg-gray-800 hover:text-white"
         }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon
                  className={`w-5 h-5 max-md:w-12 max-md:h-12 transition-colors ${
                    isActive
                      ? "fill-blue-400"
                      : "fill-gray-400 group-hover:fill-white"
                  }`}
                />
                {isOpen && (
                  <motion.span initial={false} className="text-sm max-md:text-2xl font-medium">
                    {item.label}
                  </motion.span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
