import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Eye, Target } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { getIcon } from "@/lib/iconMap";
import PreFooterCTA from "@/components/PreFooterCTA";
import { useSectionVisibility } from "@/hooks/useSectionVisibility";
import { sanitizeDbRecord, filterOutLegacyFinancial } from "@/lib/contentFilter";

const About = () => {
  const heroRef = useRef(null);
  const visionRef = useRef(null);
  const valuesRef = useRef(null);
  const galleryRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-80px" });
  const visionInView = useInView(visionRef, { once: true, margin: "-80px" });
  const valuesInView = useInView(valuesRef, { once: true, margin: "-80px" });
  const galleryInView = useInView(galleryRef, { once: true, margin: "-80px" });
  const { isVisible } = useSectionVisibility();

  const { data: rawAbout } = useQuery({
    queryKey: ["about"],
    queryFn: async () => { const { data } = await supabase.from("about_section").select("*").single(); return data; },
    staleTime: 1000 * 60 * 5,
  });

  const { data: rawValues = [] } = useQuery({
    queryKey: ["core-values"],
    queryFn: async () => { const { data } = await supabase.from("core_values").select("*").order("sort_order"); return data || []; },
    staleTime: 1000 * 60 * 5,
  });

  const { data: rawGallery = [] } = useQuery({
    queryKey: ["gallery"],
    queryFn: async () => { const { data } = await supabase.from("gallery_images").select("*").order("sort_order"); return data || []; },
    staleTime: 1000 * 60 * 5,
  });

  const about = sanitizeDbRecord(rawAbout);

  const defaultValues = [
    { id: "v1", title: "Zero-Harm Safety First", description: "Uncompromising adherence to occupational safety standards and strict HSE protocols across all Himalayan and Terai jobsites.", icon_name: "ShieldCheck" },
    { id: "v2", title: "Engineering Discipline", description: "Exacting adherence to Nepal Building Code (NBC), DoR standard specifications, and international FIDIC contractual guidelines.", icon_name: "Building2" },
    { id: "v3", title: "Timely Delivery", description: "Strategic pre-monsoon milestones, automated scheduling, and captive heavy fleet mobilization to deliver projects within schedule.", icon_name: "Compass" },
    { id: "v4", title: "Ethical Contracting", description: "Pioneering transparent procurement, corporate governance, community stewardship, and sustainable river basin protection.", icon_name: "Shield" },
  ];

  const defaultGallery = [
    { id: "g1", image_url: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&q=80&w=800", alt_text: "High-Rise Tower Crane Construction" },
    { id: "g2", image_url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800", alt_text: "Engineers Reviewing Site Blueprints" },
    { id: "g3", image_url: "https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&q=80&w=800", alt_text: "Highway Viaduct Segmental Gantry" },
    { id: "g4", image_url: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800", alt_text: "Industrial Logistics Super-Flat Slabs" },
    { id: "g5", image_url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800", alt_text: "Cable-Stayed Transit Bridge" },
    { id: "g6", image_url: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&q=80&w=800", alt_text: "Institutional Complex & Administration" },
    { id: "g7", image_url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800", alt_text: "Hydropower Penstock & Headworks" },
    { id: "g8", image_url: "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&q=80&w=800", alt_text: "Reinforced Concrete Foundation Pour" },
  ];

  const validValues = filterOutLegacyFinancial(rawValues);
  const validGallery = filterOutLegacyFinancial(rawGallery);
  const displayValues = validValues.length > 0 ? validValues : defaultValues;
  const displayGallery = validGallery.length > 0 ? validGallery : defaultGallery;

  return (
    <>
      {/* Hero Banner */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#888A8C]/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-primary/10 blur-3xl" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="text-xs font-bold tracking-widest uppercase text-[#888A8C] bg-transparent px-4 py-1.5 rounded-full border border-[#888A8C] inline-block mb-4">
              Class-A Licensed Contractor · Government of Nepal
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-extrabold text-white leading-tight">
              About MK Construction Company Pvt. Ltd.
            </h1>
            <p className="mt-5 text-neutral-300 max-w-2xl mx-auto leading-relaxed text-base md:text-lg">
              Engineering Nepal's national infrastructure through technical excellence, transparency, and reliability across 32 districts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Overview */}
      {isVisible("about_intro") && (
        <section ref={heroRef} className="py-20 md:py-28 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, x: -30 }} animate={heroInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#888A8C]/30 group">
                  <img 
                    src={about?.image_url || "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&q=80&w=1200"} 
                    alt="MK Construction Company Headquarters" 
                    className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute -bottom-2 -right-2 bg-primary text-white rounded-2xl px-6 py-4 shadow-xl border border-white/20">
                    <div className="font-display text-3xl font-black">120+</div>
                    <div className="text-xs font-bold uppercase tracking-wider text-white/90">Projects Delivered</div>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 30 }} animate={heroInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.15 }}>
                <span className="text-xs font-bold tracking-widest uppercase text-[#888A8C]">Class-A Licensed Contractor</span>
                <h2 className="mt-2 font-display text-3xl md:text-4xl font-extrabold text-foreground leading-tight">
                  {about?.heading || "Engineering Nepal's Infrastructure Since 2018"}
                </h2>
                <p className="mt-4 text-sm font-semibold text-primary">
                  Formerly known as M.K. Builders & Construction Company Private Limited
                </p>
                <p className="mt-4 text-muted-foreground leading-relaxed text-base">
                  {about?.description || "MK Construction Company Pvt. Ltd. (formerly M.K. Builders & Construction Company Private Limited) is a premier Class-A licensed contractor certified under ISO 9001:2015. Operating across 32 districts of Nepal, we specialize in high-capacity national highway packages, multi-span river bridges, flood mitigation river training, institutional buildings to Nepal Building Code (NBC), hydropower civil headworks, and municipal bulk water supply networks. Backed by an in-house heavy equipment fleet and over 850 engineers and technicians, we deliver complex infrastructure with total accountability."}
                </p>
                <div className="mt-8 grid grid-cols-4 gap-3">
                  {[
                    { label: "120+", sub: "Delivered" },
                    { label: "₨ 18B", sub: "Executed" },
                    { label: "850+", sub: "Engineers & Crew" },
                    { label: "32", sub: "Districts" },
                  ].map((item, i) => (
                    <div key={i} className="text-center p-3 rounded-2xl bg-neutral-50 border border-[#888A8C]/30 hover:border-[#888A8C]/60 transition-colors">
                      <div className="font-display text-xl font-extrabold text-[#24272A]">{item.label}</div>
                      <div className="text-[11px] font-semibold text-muted-foreground mt-0.5">{item.sub}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Vision & Mission */}
      {isVisible("vision_mission") && (
        <section ref={visionRef} className="py-20 md:py-28 bg-gradient-to-b from-white via-neutral-50/50 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={visionInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="rounded-3xl bg-white border-2 border-[#888A8C]/30 p-8 md:p-10 shadow-sm hover:shadow-xl hover:border-[#888A8C]/60 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-[#888A8C]/10 flex items-center justify-center mb-6">
                  <Eye size={28} className="text-[#888A8C]" strokeWidth={1.75} />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                  {about?.vision_title || "Our Strategic Vision"}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-base">
                  {about?.vision_text || "To be the most respected and technically capable infrastructure organization in Nepal, setting national benchmarks for quality, engineering discipline, and sustainable construction in every district we serve."}
                </p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 30 }} animate={visionInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.15 }} className="rounded-3xl bg-white border-2 border-[#888A8C]/30 p-8 md:p-10 shadow-sm hover:shadow-xl hover:border-[#888A8C]/60 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-[#888A8C]/10 flex items-center justify-center mb-6">
                  <Target size={28} className="text-[#888A8C]" strokeWidth={1.75} />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                  {about?.mission_title || "Our Operating Mission"}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-base">
                  {about?.mission_text || "Technical excellence, transparency, and reliability in Nepal's construction sector—delivering large-scale roads, bridges, river training, buildings, and civil works safely, on schedule, and to international quality standards."}
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Core Values */}
      {isVisible("core_values") && (
        <section ref={valuesRef} className="py-20 md:py-28 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={valuesInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-14">
              <span className="text-xs font-bold tracking-widest uppercase text-[#888A8C] bg-transparent px-5 py-2 rounded-full border border-[#888A8C] inline-block mb-3">
                Uncompromising Principles
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-extrabold text-foreground tracking-tight">Our Core Values</h2>
            </motion.div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayValues.map((v: any, i: number) => {
                const Icon = getIcon(v.icon_name);
                return (
                  <motion.div 
                    key={v.id} 
                    initial={{ opacity: 0, y: 30 }} 
                    animate={valuesInView ? { opacity: 1, y: 0 } : {}} 
                    transition={{ duration: 0.5, delay: 0.08 * i }}
                    className="rounded-3xl bg-white border-2 border-[#888A8C]/30 p-7 text-center hover:border-[#888A8C]/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="w-14 h-14 mx-auto rounded-2xl bg-[#888A8C]/10 flex items-center justify-center mb-4 text-[#888A8C]">
                      <Icon size={26} strokeWidth={1.75} />
                    </div>
                    <h3 className="font-display text-lg font-bold text-foreground mb-2">{v.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Construction Site Gallery */}
      {isVisible("gallery") && (
        <section ref={galleryRef} className="py-20 md:py-28 bg-gradient-to-b from-white via-neutral-50/50 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={galleryInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-14">
              <span className="text-xs font-bold tracking-widest uppercase text-[#888A8C] bg-transparent px-5 py-2 rounded-full border border-[#888A8C] inline-block mb-3">
                Field Visuals
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-extrabold text-foreground tracking-tight">
                Active Jobsites & Built Landmarks
              </h2>
            </motion.div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {displayGallery.map((img: any, i: number) => (
                <motion.div 
                  key={img.id} 
                  initial={{ opacity: 0, scale: 0.92 }} 
                  animate={galleryInView ? { opacity: 1, scale: 1 } : {}} 
                  transition={{ duration: 0.4, delay: 0.05 * i }} 
                  className="rounded-2xl overflow-hidden aspect-[4/3] group relative bg-neutral-900 border-2 border-[#888A8C]/30"
                >
                  <img 
                    src={img.image_url} 
                    alt={img.alt_text || "Construction Jobsite"} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
                    loading="lazy" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-white text-xs font-bold">{img.alt_text}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <PreFooterCTA />
    </>
  );
};

export default About;
