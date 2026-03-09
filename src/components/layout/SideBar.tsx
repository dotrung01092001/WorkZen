import { NavLink } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { MdPeopleAlt } from "react-icons/md";
import { HiClipboardList } from "react-icons/hi";
import { HiCog6Tooth } from "react-icons/hi2";
import { motion } from "motion/react";
import { usePermission } from "@/hooks/usePermission";

const items = [
  { to: "/dashboard", label: "Dashboard", icon: MdSpaceDashboard },
  { to: "/employees", label: "Employees", icon: MdPeopleAlt, permission: "employees" },
  { to: "/tasks", label: "Tasks", icon: HiClipboardList },
  { to: "/settings", label: "Settings", icon: HiCog6Tooth, permission: "settings" },
];

interface SidebarProps {
  isOpen: boolean;
  handleOpen: () => void;
}

export function Sidebar({ isOpen, handleOpen }: SidebarProps) {
  const permission = usePermission();
  const visibleItems = items.filter((item) => {
    if (!item.permission || !permission) {
      return true;
    }
    return Boolean(permission[item.permission as "settings" | "employees"]);
  });

  return (
    <>
      <button
        type="button"
        className={`fixed inset-0 z-30 bg-slate-900/30 transition-opacity md:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={handleOpen}
        aria-label="Close sidebar overlay"
      />

      <aside
        className={`fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] border-r border-sidebar-border bg-sidebar text-sidebar-foreground px-3 py-4 shadow-xl transition-[width,transform] duration-300 md:shadow-none ${
          isOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full md:w-20 md:translate-x-0"
        }`}
      >
        <nav className="space-y-1.5">
          {visibleItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => {
                if (window.innerWidth < 768) {
                  handleOpen();
                }
              }}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150 ${
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    className={`h-5 w-5 shrink-0 ${
                      isActive
                        ? "fill-current"
                        : "fill-sidebar-foreground/60 group-hover:fill-current"
                    }`}
                  />
                  {isOpen && (
                    <motion.span initial={false} className="truncate">
                      {item.label}
                    </motion.span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
