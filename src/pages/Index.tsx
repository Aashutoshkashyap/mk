import HeroSection from "@/components/HeroSection";
import BentoServicesSection from "@/components/BentoServicesSection";
import FeaturedProjectsSection from "@/components/FeaturedProjectsSection";
import ConstructionProcessSection from "@/components/ConstructionProcessSection";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import DynamicIcon from "@/components/DynamicIcon";
import TestimonialsSection from "@/components/TestimonialsSection";
import BlogSection from "@/components/BlogSection";
import FAQSection from "@/components/FAQSection";
import PreFooterCTA from "@/components/PreFooterCTA";
import { useSectionVisibility } from "@/hooks/useSectionVisibility";
import { useStatsContent, useAboutContent } from "@/hooks/useCMS";

const Index = () => {
  const aboutRef = useRef(null);
  const statsRef = useRef(null);
  const aboutInView = useInView(aboutRef, { once: true, margin: "-60px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });

  const displayStats = useStatsContent();
  const about = useAboutContent();
  const { isVisible } = useSectionVisibility();

  return (
    <>
      {isVisible("hero") && <HeroSection />}

      {/* Stats Strip with microanimations */}
      {isVisible("stats") && (
        <section ref={statsRef} className="relative -mt-8 sm:-mt-12 z-20 pb-8 sm:pb-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {displayStats.map((stat: any, i: number) => {
                return (
                  <motion.div 
                    key={stat.id} 
                    initial={{ opacity: 0, y: 24 }} 
                    animate={statsInView ? { opacity: 1, y: 0 } : {}} 
                    transition={{ duration: 0.5, delay: 0.08 * i }}
                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                    className="group rounded-2xl bg-white/95 backdrop-blur-xl border-2 border-[#888A8C]/30 p-6 text-center shadow-xl shadow-black/5 hover:shadow-2xl hover:border-[#888A8C]/60 transition-all duration-300"
                  >
                    <div className="w-14 h-14 mx-auto rounded-2xl bg-[#888A8C]/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#888A8C] group-hover:text-white transition-all duration-300">
                      <DynamicIcon name={stat.icon_name} size={26} className="text-primary group-hover:text-white transition-colors duration-300" />
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
        <section ref={aboutRef} className="py-16 md:py-24 bg-transparent relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }} 
                animate={aboutInView ? { opacity: 1, x: 0 } : {}} 
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#888A8C]/30 group">
                  <img 
                    src={about?.image_url || "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1600"} 
                    alt="MK Engineering and Construction Civil Infrastructure" 
                    className="w-full h-[450px] object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700 ease-out" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent rounded-2xl pointer-events-none" />
                  
                  {/* Floating Experience Badge */}
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md border border-[#888A8C]/30 p-4 rounded-2xl shadow-xl flex items-center gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#888A8C] text-white flex items-center justify-center font-black text-xl shadow-lg shadow-black/15">
                      25+
                    </div>
                    <div>
                      <div className="font-bold text-sm" style={{ color: '#000000' }}>Years of Proven Delivery</div>
                      <div className="text-xs" style={{ color: '#000000' }}>Certified Tier-1 EPC Contractor</div>
                    </div>
                  </motion.div>
                </div>
                
                {/* Micro decorative accents */}
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#888A8C]/10 rounded-full blur-2xl -z-10" />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#888A8C]/10 rounded-full blur-2xl -z-10" />
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 30 }} 
                animate={aboutInView ? { opacity: 1, x: 0 } : {}} 
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                {/* Transparent Capsules with Stone Borders */}
                <div className="flex flex-wrap gap-2.5 mb-6">
                  {["Structural Integrity", "LEED Certified", "Zero-Harm Safety", "BIM 5D Technology"].map((value) => (
                    <span key={value} className="text-[10px] font-black tracking-widest uppercase text-[#888A8C] bg-transparent px-4 py-1.5 rounded-full border border-[#888A8C] inline-block shadow-xs">
                      {value}
                    </span>
                  ))}
                </div>
                
                <h2 className="font-display text-3xl md:text-5xl font-extrabold text-foreground leading-[1.15] tracking-tight">
                  {about?.heading || "Engineering Nepal's Infrastructure With Technical Excellence & Reliability"}
                </h2>
                
                <p className="mt-6 text-muted-foreground leading-relaxed text-base md:text-lg">
                  {about?.description || "MK Construction Company Pvt. Ltd. (formerly M.K. Builders & Construction Company Private Limited) is a Class-A licensed contractor delivering major national highways, long-span river crossings, hydraulic river training, and civil engineering infrastructure across 32 districts of Nepal. Supported by an extensive in-house heavy equipment fleet and over 850 engineers and technicians, we guarantee schedule certainty, structural durability, and Zero-Harm safety standards."}
                </p>

                <div className="mt-8 grid sm:grid-cols-2 gap-3.5">
                  {[
                    "National Highways & Rural Feeder Roads",
                    "Steel, RCC & Pre-Stressed Bridges",
                    "River Training & Flood Mitigation Spurs",
                    "Nepal Building Code (NBC) Structures",
                    "Hydropower Civil Works & Headworks",
                    "Municipal Bulk Water & Sanitation",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2.5 text-sm font-semibold text-foreground dark:text-black bg-white/80 p-2.5 rounded-xl border border-[#888A8C]/30 shadow-xs">
                      <CheckCircle2 size={18} className="text-primary shrink-0" />
                      <span className="dark:text-black">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-4">
                  {/* Explore Company Profile Button with Stone Color */}
                  <Link 
                    to="/about" 
                    className="inline-flex items-center gap-2.5 rounded-full bg-[#888A8C] px-7 py-3.5 text-sm font-bold text-white hover:bg-[#77797B] shadow-lg shadow-black/10 hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
                  >
                    Explore Company Profile <ArrowRight size={16} />
                  </Link>

                  <Link 
                    to="/projects" 
                    className="inline-flex items-center gap-2 rounded-full border-2 border-[#888A8C]/40 px-6 py-3.5 text-sm font-bold text-foreground hover:bg-[#888A8C]/10 transition-all duration-300"
                  >
                    View Our Projects
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Bento Disciplines Section */}
      {isVisible("services") && <BentoServicesSection />}

      {/* Featured Projects / Infrastructure Showcase on Homepage */}
      <FeaturedProjectsSection />

      {/* 5-Stage Project Delivery Framework */}
      <ConstructionProcessSection />

      {/* Endorsements / Testimonials */}
      {isVisible("testimonials") && <TestimonialsSection />}

      {/* Corporate Insights & News */}
      {isVisible("blog") && <BlogSection />}

      {/* FAQ Technical Accordion */}
      {isVisible("faqs") && <FAQSection />}

      {/* Pre-Footer Global CTA */}
      {isVisible("cta") && <PreFooterCTA />}
    </>
  );
};

export default Index;
