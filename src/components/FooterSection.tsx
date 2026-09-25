import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const FooterSection = () => {
  const { data: settings } = useQuery({
    queryKey: ["site_settings"],
    queryFn: async () => {
      const { data } = await supabase.from("site_settings").select("*").eq("id", "current").single();
      return data;
    },
  });

  return (
    <footer className="py-16 bg-neutral-950 text-white relative border-t-4 border-primary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-black text-lg shadow-lg shadow-primary/30">
                MK
              </div>
              <div>
                <span className="font-display font-extrabold text-xl text-white tracking-tight">MK Engineering and Construction</span>
                <div className="text-[10px] uppercase tracking-widest text-primary font-bold">General Contracting & Civil Engineering</div>
              </div>
            </div>
            <p className="mt-4 text-sm text-neutral-400 leading-relaxed">
              Tier-1 General Contracting and Civil Infrastructure engineering group. Transforming complex architectural visions into monumental landmarks through sustainable engineering, self-owned heavy machinery, and Zero-Harm safety standards.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-neutral-400">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span>OSHA & ISO 45001 / 9001 Certified</span>
            </div>
          </div>
          <div>
            <h4 className="font-display font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-3 bg-primary rounded-sm" />
              Company
            </h4>
            <div className="flex flex-col gap-2.5">
              {[
                { label: "Home", to: "/" },
                { label: "About Us", to: "/about" },
                { label: "Our Services", to: "/services" },
                { label: "Projects & Portfolio", to: "/portfolio" },
                { label: "Fleet & Safety Standards", to: "/safety" },
                { label: "Leadership Team", to: "/team" },
                { label: "Field Reports & Insights", to: "/blog" },
                { label: "Request a Quote", to: "/contact" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm text-neutral-400 hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <span className="text-primary/50 text-xs">›</span> {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-3 bg-primary rounded-sm" />
              Specialized Disciplines
            </h4>
            <div className="flex flex-col gap-2.5">
              {[
                "Commercial High-Rise Towers",
                "Highways, Viaducts & Bridges",
                "Industrial Logistics Hubs",
                "BIM 5D Virtual Design",
                "Deep Geotechnical Foundations",
                "LEED Sustainable Retrofits",
              ].map((s) => (
                <Link
                  key={s}
                  to="/services"
                  className="text-sm text-neutral-400 hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <span className="text-primary/50 text-xs">›</span> {s}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-3 bg-primary rounded-sm" />
              Headquarters
            </h4>
            <div className="flex flex-col gap-3.5">
              <div className="flex items-start gap-3 text-sm text-neutral-400">
                <MapPin size={16} className="text-primary shrink-0 mt-0.5" />
                <span>MK Engineering Tower, 450 Grand Avenue<br />Infrastructure District, Metro Center</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-neutral-400">
                <Mail size={16} className="text-primary shrink-0 mt-0.5" />
                <span>tenders@mkconstruction.com<br />projects@mkconstruction.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-neutral-400">
                <Phone size={16} className="text-primary shrink-0" />
                <span>+1 (800) 555-BUILD / +1 (800) 555-2845</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-400">
          <p>© {new Date().getFullYear()} MK Engineering and Construction. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-primary font-bold">Safety • Integrity • Engineering Mastery</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
