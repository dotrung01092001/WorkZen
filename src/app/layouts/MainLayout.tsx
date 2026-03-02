import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/layout/SideBar";
import Header from "@/components/layout/Header";

interface MainLayoutProps {
  isOpen : boolean;
  handleOpen: () => void;
}

export function MainLayout({isOpen, handleOpen}: MainLayoutProps) {
  return (
    <div>
      <Header handleOpen={handleOpen} />
      <div className="flex min-h-screen overflow-x-hidden max-md:overflow-x-auto">
        <Sidebar isOpen={isOpen} handleOpen={handleOpen}  />
        <div className=" px-6 mt-[12vh] pt-4 bg-black dark:bg-white flex-1 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
