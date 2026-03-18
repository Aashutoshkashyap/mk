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
    <div className="min-h-screen bg-background">
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <FloatingActions />
      <FooterSection />
    </div>
  );
};

export default Layout;
