import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import NavigationMenuDemo from "../NavigationMenuDemo";
import Footer from "./Footer";

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Global Toast Notifications */}
      <Toaster position="bottom-right" richColors />
      
      <NavigationMenuDemo />

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default RootLayout;
