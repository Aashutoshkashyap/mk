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
    <footer className="py-12 bg-primary text-primary-foreground">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <img
              src={settings?.logo_url || "https://sharpedge.com.np/static/img/logo.png"}
              alt={settings?.company_name || "Sharp Edge Business Solutions"}
              className="h-12 w-auto brightness-0 invert"
            />
            <p className="mt-4 text-sm text-primary-foreground/60 leading-relaxed">
              Sharp Egde Business Solutions is a firm that provides clients with a wide range of services in auditing assurance, taxation, regulatory matters, and advisory services.
            </p>
          </div>
          <div>
            <h4 className="font-display font-bold text-primary-foreground mb-4">Pages</h4>
            <div className="flex flex-col gap-2.5">
              {[
                { label: "Home", to: "/" },
                { label: "About Us", to: "/about" },
                { label: "Services", to: "/services" },
                { label: "Team", to: "/team" },
                { label: "Blog", to: "/blog" },
                { label: "Contact", to: "/contact" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display font-bold text-primary-foreground mb-4">Services</h4>
            <div className="flex flex-col gap-2.5">
              {["Audit & Assurance", "Corporate Law", "Taxation", "Business Consulting", "Training"].map((s) => (
                <Link
                  key={s}
                  to="/services"
                  className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                >
                  {s}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display font-bold text-primary-foreground mb-4">Contact</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3 text-sm text-primary-foreground/60">
                <Mail size={14} className="text-brand-blue shrink-0 mt-0.5" />
                <span>casubratsapkota@gmail.com<br />cadiwashdahal@gmail.com</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-primary-foreground/60">
                <MapPin size={14} className="text-brand-blue shrink-0 mt-0.5" />
                <span>Thapagaun-10, New Baneshwor<br />Kathmandu, Nepal</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-primary-foreground/60">
                <Phone size={14} className="text-brand-blue shrink-0" />
                +(977) 9841690746
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-primary-foreground/40">
          <p>© {new Date().getFullYear()} Sharp Edge Business Solutions. All rights reserved.</p>
          <p>
            Supported by{" "}
            <a 
              href="https://thebytejar.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-brand-blue hover:text-white transition-colors font-semibold"
            >
              Byte Jar Pvt Ltd
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
