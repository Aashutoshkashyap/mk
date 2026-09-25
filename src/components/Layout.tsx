import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import FloatingActions from "@/components/ui/FloatingActions";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Layout = () => {
  return (
    <div className="min-h-screen bg-transparent relative selection:bg-primary/20 selection:text-primary">
      {/* Global Fixed Parallax Background Image (stays stationary on scroll) */}
      <div 
        className="fixed inset-0 w-full h-full pointer-events-none -z-50 bg-cover bg-center bg-no-repeat transition-opacity duration-500"
        style={{
          backgroundImage: "url('/images/bg.jpg')",
          opacity: 0.85,
        }}
        aria-hidden="true"
      />
      <ScrollToTop />
      <Navbar />
      <main className="relative z-10">
        <Outlet />
      </main>
      <FloatingActions />
      <FooterSection />
    </div>
  );
};

export default Layout;
