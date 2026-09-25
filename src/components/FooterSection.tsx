import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const FooterSection = () => {
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

  return (
    <footer className="py-16 bg-neutral-950 text-white relative border-t border-neutral-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-black text-lg shadow-lg shadow-primary/30">
                MK
              </div>
              <div>
                <span className="font-display font-extrabold text-lg text-white tracking-tight leading-tight block">
                  MK Engineering & Construction
                </span>
                <div className="text-[10px] uppercase tracking-widest text-primary font-bold">
                  MK Construction Company Pvt. Ltd.
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm text-neutral-400 leading-relaxed">
              A Class-A licensed Nepali infrastructure contractor delivering national highways, bridges, river training, NBC-standard buildings, hydropower civil works, and water & sanitation projects across Nepal.
            </p>
            <div className="mt-4 flex flex-col gap-1.5 text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span>Class-A Licensed Contractor · GoN</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span>ISO 9001:2015 QMS Certified</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-display font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-3 bg-primary rounded-sm" />
              Navigation
            </h4>
            <div className="flex flex-col gap-2">
              {[
                { label: "Home", to: "/" },
                { label: "About Us", to: "/about" },
                { label: "Engineering Services", to: "/services" },
                { label: "Featured Projects", to: "/projects" },
                { label: "Quality & Safety (HSE)", to: "/safety" },
                { label: "Engineering Leadership", to: "/team" },
                { label: "Project News & Insights", to: "/blog" },
                { label: "Careers", to: "/careers" },
                { label: "Contact Us", to: "/contact" },
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
              Service Verticals
            </h4>
            <div className="flex flex-col gap-2.5">
              {[
                "Roads & Highways",
                "Bridges & Structures",
                "River Training & Spurs",
                "Buildings (NBC Standards)",
                "Hydropower Civil Works",
                "Water & Sanitation Systems",
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
              Head Office
            </h4>
            <div className="flex flex-col gap-3.5">
              <div className="flex items-start gap-3 text-sm text-neutral-400">
                <MapPin size={16} className="text-primary shrink-0 mt-0.5" />
                <span>Kathmandu, Nepal<br />Operating across 32 Districts</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-neutral-400">
                <Mail size={16} className="text-primary shrink-0 mt-0.5" />
                <span>info@mkconstruction.com.np<br />tenders@mkconstruction.com.np</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-neutral-400">
                <Phone size={16} className="text-primary shrink-0" />
                <span>+977 1 4542380 / +977 9851087492</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-400">
          <p>© {new Date().getFullYear()} MK Construction Company Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-primary font-bold">Class-A Licensed Contractor · Engineering Nepal's Infrastructure</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
