import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Mail } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PrimaryButton } from "./ui/PrimaryButton";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Team", href: "/team" },
  { label: "Blog", href: "/blog" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  const { data: settings } = useQuery({
    queryKey: ["site_settings"],
    queryFn: async () => {
      const { data } = await supabase.from("site_settings").select("*").eq("id", "current").single();
      return data;
    },
  });

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update scrolled state for background/shadow
      setScrolled(currentScrollY > 20);
      
      // Logic for show/hide header parts
      if (currentScrollY < 100) {
        // Near top: Show everything
        setVisible(true);
      } else if (currentScrollY > lastScrollY && !mobileOpen) {
        // Scrolling down: Hide everything
        setVisible(false);
      } else {
        // Scrolling up: Show only nav capsule (logo/button handled via visibility logic below)
        setVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, mobileOpen]);

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    if (href.startsWith("/#")) return location.pathname === "/" && location.hash === href.slice(1);
    return location.pathname === href;
  };

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("/#")) {
      if (location.pathname === "/") {
        const el = document.querySelector(href.slice(1));
        el?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const showFullHeader = lastScrollY < 100;

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: visible ? 0 : -100,
        opacity: visible ? 1 : 0 
      }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Logo on the left */}
          <motion.div
            animate={{ 
              opacity: showFullHeader ? 1 : 0,
              x: showFullHeader ? 0 : -20,
              scale: showFullHeader ? 1 : 0.95
            }}
            transition={{ duration: 0.3 }}
            className={cn("flex-shrink-0 min-w-[120px] md:min-w-[180px] flex items-center", !showFullHeader && "pointer-events-none")}
          >
            <Link to="/" className="transition-transform hover:scale-105 block w-full h-12 md:h-24 flex items-center">
              <img
                src={settings?.logo_url || "https://sharpedge.com.np/static/img/logo.png"}
                alt={settings?.company_name || "Sharp Edge Business Solutions"}
                className="max-h-full max-w-full object-contain"
              />
            </Link>
          </motion.div>

          {/* Centered Navigation Capsule (Desktop) - Stays visible on scroll up */}
          <nav className="flex-1 flex justify-center">
            <div className="hidden md:flex items-center glass-nav rounded-full px-2 py-1.5 border border-white/20 shadow-lg shadow-brand-navy/5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                    isActive(link.href)
                      ? "text-primary bg-primary/[0.08]"
                      : "text-foreground/70 hover:text-primary hover:bg-secondary/50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Action Button & Mobile Toggle Container */}
          <div className="flex items-center gap-3">
            <motion.div 
              animate={{ 
                opacity: showFullHeader ? 1 : 0,
                x: showFullHeader ? 0 : 20,
                scale: showFullHeader ? 1 : 0.95
              }}
              transition={{ duration: 0.3 }}
              className={cn("flex items-center", !showFullHeader && "pointer-events-none")}
            >
              <PrimaryButton
                as={Link}
                to="/contact"
                containerClassName="h-9 md:h-11 min-w-0 md:min-w-[140px]"
                className="px-4 md:px-6 py-2 md:py-2.5 rounded-lg md:rounded-xl text-xs md:text-sm"
              >
                <span className="flex items-center gap-1.5 md:gap-2">
                  <Mail size={14} className="md:w-[15px] md:h-[15px]" />
                  <span className="hidden sm:inline">Let's Talk</span>
                  <span className="sm:hidden font-bold tracking-wide">Connect</span>
                </span>
              </PrimaryButton>
            </motion.div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-xl bg-white/80 border border-border backdrop-blur-md text-foreground transition-all hover:bg-secondary flex items-center justify-center shrink-0"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="glass-nav mt-2 rounded-2xl border border-border p-5 flex flex-col gap-1 shadow-xl md:hidden"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                    isActive(link.href)
                      ? "text-primary bg-primary/[0.08]"
                      : "text-foreground hover:bg-secondary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="mt-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground text-center"
              >
                Let's Talk
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Navbar;
