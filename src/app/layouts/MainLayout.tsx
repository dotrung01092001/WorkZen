import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/layout/SideBar";
import Header from "@/components/layout/Header";

export function MainLayout({isOpen, handleOpen}: MainLayoutProps) {
  return (
    <div>
      <Header handleOpen={handleOpen} />
      <div className="flex min-h-screen overflow-x-hidden">
        <Sidebar isOpen={isOpen} handleOpen={handleOpen}  />
        <div className=" px-6 mt-[12vh] pt-4 bg-black dark:bg-white flex-1 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
