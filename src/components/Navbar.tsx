import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, HardHat, ArrowRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Safety", href: "/safety" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
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
      const { data } = await supabase
        .from("site_settings")
        .select("*")
        .eq("id", "00000000-0000-0000-0000-000000000000")
        .maybeSingle();
      return data;
    },
  });

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);
      
      if (currentScrollY < 100) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY && !mobileOpen) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, mobileOpen]);

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname === href;
  };

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: visible ? 0 : -100,
        opacity: visible ? 1 : 0,
        paddingTop: scrolled ? "8px" : "20px",
        paddingBottom: scrolled ? "8px" : "20px",
      }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between gap-4 h-20">
          {/* Logo on the left */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="transition-transform hover:scale-105 flex items-center gap-3">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-primary to-red-700 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-primary/30 border border-white/20">
                MK
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-base sm:text-lg text-foreground tracking-tight leading-none">
                  MK <span className="text-primary">Engineering</span>
                </span>
                <span className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold mt-1">
                  MK Construction Company Pvt. Ltd.
                </span>
              </div>
            </Link>
          </div>

          {/* Centered Navigation Capsule (Desktop) */}
          <nav className="hidden lg:flex items-center justify-center flex-1 max-w-3xl mx-4">
            <div className="flex items-center glass-nav rounded-full px-2 py-1.5 border border-[#888A8C]/40 shadow-lg shadow-black/5 bg-white/95 backdrop-blur-xl">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-full transition-all duration-300 whitespace-nowrap ${
                      active
                        ? "text-white bg-[#888A8C] shadow-md shadow-black/10"
                        : "text-foreground/75 hover:text-[#24272A] hover:bg-[#888A8C]/15"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Contact Button & Mobile Toggle Container */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-4 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-bold bg-[#888A8C] hover:bg-[#77797B] text-white shadow-md shadow-black/10 active:scale-95 transition-all duration-300"
              >
                <HardHat size={16} className="text-white shrink-0" />
                <span>Contact Us</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/90 border border-[#888A8C]/30 backdrop-blur-md text-foreground transition-all hover:bg-[#888A8C]/10 flex items-center justify-center shrink-0 shadow-sm"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} className="text-[#888A8C]" /> : <Menu size={22} />}
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
              className="bg-white/95 backdrop-blur-2xl mt-2 rounded-3xl border-2 border-[#888A8C]/30 p-5 flex flex-col gap-1 shadow-2xl lg:hidden"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`px-4 py-3 text-sm font-bold rounded-2xl transition-colors ${
                    isActive(link.href)
                      ? "text-white bg-[#888A8C] shadow-sm"
                      : "text-foreground hover:bg-[#888A8C]/10"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="mt-3 rounded-2xl bg-[#888A8C] px-5 py-3.5 text-sm font-bold text-white text-center shadow-lg shadow-black/10 flex items-center justify-center gap-2"
              >
                <HardHat size={16} /> Request Free Site Estimate
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Navbar;
