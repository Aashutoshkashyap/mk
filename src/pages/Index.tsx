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

  const defaultStats = [
    { id: '1', icon_name: 'Building2', value: '350+', label: 'Projects Completed' },
    { id: '2', icon_name: 'Award', value: '25+ Yrs', label: 'Engineering Excellence' },
    { id: '3', icon_name: 'Truck', value: '1,200+', label: 'Heavy Equipment Fleet' },
    { id: '4', icon_name: 'ShieldCheck', value: '99.8%', label: 'Zero-Harm Safety Rate' },
  ];

  const displayStats = stats.length > 0 ? stats : defaultStats;

  return (
    <>
      {isVisible("hero") && <HeroSection />}

      {/* Stats Strip with microanimations */}
      {isVisible("stats") && (
        <section ref={statsRef} className="relative -mt-12 z-20 pb-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {displayStats.map((stat: any, i: number) => {
                const Icon = getIcon(stat.icon_name);
                return (
                  <motion.div 
                    key={stat.id} 
                    initial={{ opacity: 0, y: 30 }} 
                    animate={statsInView ? { opacity: 1, y: 0 } : {}} 
                    transition={{ duration: 0.5, delay: 0.08 * i }}
                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                    className="group rounded-2xl bg-white/95 backdrop-blur-xl border-2 border-orange-100 p-6 text-center shadow-xl shadow-primary/5 hover:shadow-2xl hover:shadow-primary/15 hover:border-primary/40 transition-all duration-300"
                  >
                    <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <Icon size={26} className="text-primary group-hover:text-white transition-colors duration-300" strokeWidth={1.75} />
                    </div>
                    <div className="font-display text-3xl md:text-4xl font-extrabold text-foreground tracking-tight group-hover:text-primary transition-colors">
                      {stat.value}
                    </div>
                    <div className="mt-1.5 text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* About Preview */}
      {isVisible("about_overview") && (
        <section ref={aboutRef} className="py-20 md:py-32 bg-gradient-to-b from-white via-orange-50/20 to-white relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -40 }} 
                animate={aboutInView ? { opacity: 1, x: 0 } : {}} 
                transition={{ duration: 0.7 }}
                className="relative"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white group">
                  <img 
                    src={about?.image_url || "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1600"} 
                    alt="Modern Civil Construction Project" 
                    className="w-full h-[450px] object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700 ease-out" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent rounded-2xl pointer-events-none" />
                  
                  {/* Floating Experience Badge */}
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md border border-white/60 p-4 rounded-2xl shadow-xl flex items-center gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center font-black text-xl shadow-lg shadow-primary/30">
                      25+
                    </div>
                    <div>
                      <div className="font-bold text-foreground text-sm">Years of Proven Delivery</div>
                      <div className="text-xs text-muted-foreground">Certified Tier-1 EPC Contractor</div>
                    </div>
                  </motion.div>
                </div>
                
                {/* Micro decorative accents */}
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl -z-10" />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-orange-400/10 rounded-full blur-2xl -z-10" />
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 40 }} 
                animate={aboutInView ? { opacity: 1, x: 0 } : {}} 
                transition={{ duration: 0.7, delay: 0.15 }}
              >
                <div className="flex flex-wrap gap-2.5 mb-6">
                  {["Structural Integrity", "LEED Certified", "Zero-Harm Safety", "BIM 5D Technology"].map((value) => (
                    <span key={value} className="text-[10px] font-black tracking-widest uppercase text-primary bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20 inline-block shadow-sm">
                      {value}
                    </span>
                  ))}
                </div>
                
                <h2 className="font-display text-3xl md:text-5xl font-extrabold text-foreground leading-[1.15] tracking-tight">
                  {about?.heading || "Setting the Benchmark in Commercial & Civil Heavy Construction"}
                </h2>
                
                <p className="mt-6 text-muted-foreground leading-relaxed text-base md:text-lg">
                  {about?.description || "MK Construction & Infrastructure is a premier general contractor and civil engineering powerhouse. For over two decades, we have engineered iconic corporate towers, heavy highway infrastructure, high-bay industrial logistics hubs, and resilient residential communities. Backed by an extensive captive heavy machinery fleet, ISO 45001 safety compliance, and comprehensive 5D BIM virtual modeling, we deliver monumental scale with pinpoint precision, on time and on budget."}
                </p>

                <div className="mt-8 grid sm:grid-cols-2 gap-3.5">
                  {[
                    "Commercial High-Rise & Campuses",
                    "Highways, Bridges & Culverts",
                    "Deep Foundations & Geotechnical",
                    "LEED Platinum Green Buildings",
                    "Pre-Engineered Metal Structures",
                    "Turnkey EPC & Project Controls",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2.5 text-sm font-semibold text-foreground bg-white/80 p-2.5 rounded-xl border border-orange-100/80 shadow-xs">
                      <CheckCircle2 size={18} className="text-primary shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <Link 
                    to="/about" 
                    className="inline-flex items-center gap-2.5 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-white hover:bg-primary/90 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
                  >
                    Explore Company Profile <ArrowRight size={16} />
                  </Link>

                  <Link 
                    to="/portfolio" 
                    className="inline-flex items-center gap-2 rounded-full border-2 border-primary/25 px-6 py-3.5 text-sm font-bold text-primary hover:bg-primary/5 transition-all duration-300"
                  >
                    View Our Portfolio
                  </Link>
                </div>
              </motion.div>
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
