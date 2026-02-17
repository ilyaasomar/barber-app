import AppSidebar from "@/components/AppSidebar";
import Navbar from "@/components/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <AppSidebar />
        <main className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <Navbar />
          <div className="flex-1 overflow-y-auto p-4">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default RootLayout;
