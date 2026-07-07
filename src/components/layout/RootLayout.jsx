import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Toaster } from "sonner";
import NavigationMenuDemo from "../NavigationMenuDemo";
import Footer from "./Footer";
import { supabase } from "../../supabaseClient";
import { getSession, setSession } from "../../redux/features/authSlice";

const RootLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Get the current session when the app loads
    dispatch(getSession());

    // Listen for auth changes (login, logout, refresh)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(setSession(session));
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [dispatch]);

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