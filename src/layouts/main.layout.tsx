import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/providers/ThemeProvider";
// import AppSidebar from "@/components/AppSidebar";
// import { SidebarProvider } from "@/components/ui/sidebar";

export default function MainLayout() {
  return (
    <>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        {/* <SidebarProvider> */}
        {/* <AppSidebar /> */}
        <main className="w-full">
          <Navbar />
          <Toaster
            position="top-center"
            toastOptions={{
              style: { backgroundColor: "antiquewhite" },
              duration: 5000,
              // icon: <Icon />,
              classNames: {
                title: "!text-gray-900 !font-bold",
                description: "!text-gray-700",
              },
            }}
          />
          <Outlet /> {/* Nested routes are rendered here */}
        </main>
        {/* </SidebarProvider> */}
      </ThemeProvider>
    </>
  );
}
