import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/layout/SideBar";
import Header from "@/components/layout/Header";

interface MainLayoutProps {
  isOpen: boolean;
  handleOpen: () => void;
}

export function MainLayout({ isOpen, handleOpen }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Header handleOpen={handleOpen} />
      <div className="flex pt-16">
        <Sidebar isOpen={isOpen} handleOpen={handleOpen} />
        <main
          className={`min-w-0 flex-1 p-4 transition-[margin] duration-300 sm:p-6 lg:p-8 ${
            isOpen ? "md:ml-64" : "md:ml-20"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
