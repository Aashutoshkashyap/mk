import HeroSection from "@/components/HeroSection";
import BentoServicesSection from "@/components/BentoServicesSection";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { getIcon } from "@/lib/iconMap";
import PartnersSection from "@/components/PartnersSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BlogSection from "@/components/BlogSection";
import FAQSection from "@/components/FAQSection";
import PreFooterCTA from "@/components/PreFooterCTA";
import { useSectionVisibility } from "@/hooks/useSectionVisibility";

const Index = () => {
  const aboutRef = useRef(null);
  const statsRef = useRef(null);
  const aboutInView = useInView(aboutRef, { once: true, margin: "-100px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });

  const { data: stats = [] } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => { const { data } = await supabase.from("stats").select("*").order("sort_order"); return data || []; },
    staleTime: 1000 * 60 * 5,
  });

  const { data: services = [] } = useQuery({
    queryKey: ["services-home"],
    queryFn: async () => { const { data } = await supabase.from("services").select("*").order("sort_order"); return data || []; },
    staleTime: 1000 * 60 * 5,
  });

  const { data: about } = useQuery({
    queryKey: ["about-home"],
    queryFn: async () => { const { data } = await supabase.from("about_section").select("*").single(); return data; },
    staleTime: 1000 * 60 * 5,
  });

  const { isVisible } = useSectionVisibility();

  return (
    <>
      {isVisible("hero") && <HeroSection />}

      {/* Stats Strip */}
      {isVisible("stats") && (
        <section ref={statsRef} className="relative -mt-10 z-10 pb-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="flex flex-wrap justify-center gap-6">
              {stats.length > 0 ? (
                stats.map((stat: any, i: number) => {
                  const Icon = getIcon(stat.icon_name);
                  return (
                    <motion.div key={stat.id} initial={{ opacity: 0, y: 30 }} animate={statsInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 * i }}
                      className="rounded-2xl bg-card border border-border p-6 text-center shadow-lg shadow-primary/5 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 min-w-[200px]">
                      <div className="w-12 h-12 mx-auto rounded-xl bg-primary/[0.08] flex items-center justify-center mb-3">
                        <Icon size={22} className="text-primary" strokeWidth={1.5} />
                      </div>
                      <div className="font-display text-3xl md:text-4xl font-extrabold text-primary">{stat.value}</div>
                      <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
                    </motion.div>
                  );
                })
              ) : (
                // Skeleton placeholders for stats
                [1, 2, 3].map((_, i) => (
                  <div key={i} className="rounded-2xl bg-card border border-border p-6 text-center shadow-lg shadow-primary/5 min-w-[200px] animate-pulse">
                    <div className="w-12 h-12 mx-auto rounded-xl bg-secondary mb-3"></div>
                    <div className="h-8 bg-secondary rounded w-2/3 mx-auto mb-2"></div>
                    <div className="h-4 bg-secondary rounded w-1/2 mx-auto"></div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      )}

      {/* About Preview */}
      {isVisible("about_overview") && (
        <section ref={aboutRef} className="py-20 md:py-28">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {!about ? (
                // Skeleton Loader for About
                <>
                  <div className="relative rounded-2xl overflow-hidden h-80 bg-secondary animate-pulse" />
                  <div className="space-y-6 animate-pulse">
                    <div className="flex gap-3">
                      <div className="h-6 w-20 bg-secondary rounded-full" />
                      <div className="h-6 w-20 bg-secondary rounded-full" />
                      <div className="h-6 w-20 bg-secondary rounded-full" />
                    </div>
                    <div className="h-12 w-3/4 bg-secondary rounded-xl" />
                    <div className="h-24 w-full bg-secondary rounded-xl" />
                    <div className="grid grid-cols-2 gap-3">
                      <div className="h-6 bg-secondary rounded w-full" />
                      <div className="h-6 bg-secondary rounded w-full" />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <motion.div initial={{ opacity: 0, x: -30 }} animate={aboutInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
                    <div className="relative rounded-2xl overflow-hidden">
                      <img src={about?.image_url || "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1500"} alt="Sharp Edge Office" className="w-full h-80 object-cover rounded-2xl" />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent rounded-2xl" />
                    </div>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, x: 30 }} animate={aboutInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.15 }}>
                    <div className="flex flex-wrap gap-3 mb-6">
                      {["Precision", "Integrity", "Excellence"].map((value, i) => (
                        <span key={value} className="text-[10px] font-black tracking-widest uppercase text-brand-blue bg-brand-blue/5 px-4 py-1.5 rounded-full border border-brand-blue/10 inline-block">
                          {value}
                        </span>
                      ))}
                    </div>
                    <h2 className="mt-3 font-display text-3xl md:text-5xl font-extrabold text-primary leading-tight tracking-tight">{about?.heading || "Trusted Expertise Since Day One"}</h2>
                    <p className="mt-5 text-muted-foreground leading-relaxed">{about?.description || "Sharp Egde Business Solutions is a firm that provides clients with a wide range of services in auditing assurance, taxation, regulatory matters, and advisory services."}</p>
                    <div className="mt-6 grid grid-cols-2 gap-3">
                      {["Chartered Accountants", "Legal Experts", "Tax Advisors", "Business Consultants"].map((item) => (
                        <div key={item} className="flex items-center gap-2 text-sm text-foreground"><CheckCircle2 size={16} className="text-brand-green shrink-0" />{item}</div>
                      ))}
                    </div>
                    <Link to="/about" className="mt-8 inline-flex items-center gap-2 rounded-full border-2 border-primary/20 px-6 py-3 text-sm font-bold text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                      Learn More <ArrowRight size={14} />
                    </Link>
                  </motion.div>
                </>
              )}
            </div>
          </div>
        </section>
      )}

      {isVisible("services") && <BentoServicesSection />}

      {isVisible("partners") && <PartnersSection />}
      {isVisible("testimonials") && <TestimonialsSection />}
      {isVisible("faqs") && <FAQSection />}
      {isVisible("blog") && <BlogSection />}
      {isVisible("cta") && <PreFooterCTA />}
    </>
  );
};

export default Index;
