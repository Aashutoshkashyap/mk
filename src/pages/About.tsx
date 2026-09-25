import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Eye, Target, Globe, Users, Award } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { getIcon } from "@/lib/iconMap";
import PreFooterCTA from "@/components/PreFooterCTA";
import { useSectionVisibility } from "@/hooks/useSectionVisibility";

const About = () => {
  const heroRef = useRef(null);
  const visionRef = useRef(null);
  const valuesRef = useRef(null);
  const galleryRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-80px" });
  const visionInView = useInView(visionRef, { once: true, margin: "-80px" });
  const valuesInView = useInView(valuesRef, { once: true, margin: "-80px" });
  const galleryInView = useInView(galleryRef, { once: true, margin: "-80px" });

  const { data: about } = useQuery({
    queryKey: ["about"],
    queryFn: async () => { const { data } = await supabase.from("about_section").select("*").single(); return data; },
    staleTime: 1000 * 60 * 5,
  });

  const { data: values = [] } = useQuery({
    queryKey: ["core-values"],
    queryFn: async () => { const { data } = await supabase.from("core_values").select("*").order("sort_order"); return data || []; },
    staleTime: 1000 * 60 * 5,
  });

  const { data: gallery = [] } = useQuery({
    queryKey: ["gallery"],
    queryFn: async () => { const { data } = await supabase.from("gallery_images").select("*").order("sort_order"); return data || []; },
    staleTime: 1000 * 60 * 5,
  });

  const defaultValues = [
    { id: "v1", title: "Zero-Harm Safety First", description: "Uncompromising adherence to OSHA and ISO 45001 standards, empowering every worker with stop-work authority.", icon_name: "ShieldCheck" },
    { id: "v2", title: "Structural Precision", description: "Executing complex steel, deep caisson, and post-tension concrete designs to millimeter tolerances.", icon_name: "Building2" },
    { id: "v3", title: "5D BIM Innovation", description: "Virtual modeling and aerial reality capture that resolve spatial clashes and secure budget predictability.", icon_name: "Compass" },
    { id: "v4", title: "LEED Sustainability", description: "Pioneering low-carbon geopolymer concrete, waste diversion, and Net-Zero energy building envelopes.", icon_name: "Shield" },
  ];

  const defaultGallery = [
    { id: "g1", image_url: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&q=80&w=800", alt_text: "High-Rise Tower Crane Construction" },
    { id: "g2", image_url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800", alt_text: "Engineers Reviewing Site Blueprints" },
    { id: "g3", image_url: "https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&q=80&w=800", alt_text: "Highway Viaduct Segmental Gantry" },
    { id: "g4", image_url: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800", alt_text: "Industrial Logistics Super-Flat Slabs" },
    { id: "g5", image_url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800", alt_text: "Cable-Stayed Transit Bridge" },
    { id: "g6", image_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800", alt_text: "LEED Platinum Modern Glass Envelope" },
    { id: "g7", image_url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800", alt_text: "Structural Architectural Design" },
    { id: "g8", image_url: "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&q=80&w=800", alt_text: "Reinforced Concrete Foundation Pour" },
  ];

  const displayValues = values.length > 0 ? values : defaultValues;
  const displayGallery = gallery.length > 0 ? gallery : defaultGallery;

  return (
    <>
      {/* Hero Banner */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-orange-600/10 blur-3xl" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="text-xs font-bold tracking-widest uppercase text-primary bg-primary/20 px-4 py-1.5 rounded-full border border-primary/30 inline-block mb-4">
              {about?.subheading || "Legacy of Master Builders"}
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-extrabold text-white leading-tight">
              About MK Engineering and Construction
            </h1>
            <p className="mt-5 text-neutral-300 max-w-2xl mx-auto leading-relaxed text-base md:text-lg">
              A Tier-1 general contracting and civil infrastructure engineering firm dedicated to transforming visionary architectural concepts into landmark realities.
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
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-orange-50 group">
                  <img 
                    src={about?.image_url || "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&q=80&w=1200"} 
                    alt="MK Engineering and Construction Headquarters" 
                    className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute -bottom-2 -right-2 bg-primary text-white rounded-2xl px-6 py-4 shadow-xl border border-white/20">
                    <div className="font-display text-3xl font-black">25+</div>
                    <div className="text-xs font-bold uppercase tracking-wider text-white/90">Years of Engineering</div>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 30 }} animate={heroInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.15 }}>
                <span className="text-xs font-bold tracking-widest uppercase text-primary">Master Builders & Engineers</span>
                <h2 className="mt-2 font-display text-3xl md:text-4xl font-extrabold text-foreground leading-tight">
                  {about?.heading || "Engineering Monumental Landmarks Since 2000"}
                </h2>
                <p className="mt-5 text-muted-foreground leading-relaxed text-base">
                  {about?.description || "MK Engineering and Construction is a premier general contractor and heavy civil engineering enterprise. Over the last 25 years, our multidisciplinary teams of licensed master builders, structural engineers, and BIM coordinators have safely erected over 350 complex developments. From deep caisson foundations and highway viaducts to 50-story commercial skyscrapers and high-bay distribution hubs, we maintain our own captive fleet of 1,200+ machinery units, guaranteeing schedule certainty and craft mastery."}
                </p>
                <div className="mt-8 grid grid-cols-3 gap-4">
                  {[
                    { icon: Globe, label: "Global\nStandards" }, 
                    { icon: Users, label: "Captive Fleet\n& Crew" }, 
                    { icon: Award, label: "Zero-Harm\nSafety Record" }
                  ].map((item, i) => (
                    <div key={i} className="text-center p-4 rounded-2xl bg-orange-50/70 border border-orange-100 hover:border-primary/40 transition-colors">
                      <item.icon size={24} className="mx-auto text-primary mb-2" strokeWidth={1.75} />
                      <div className="text-xs font-bold text-foreground whitespace-pre-line leading-tight">{item.label}</div>
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
        <section ref={visionRef} className="py-20 md:py-28 bg-gradient-to-b from-white via-orange-50/20 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={visionInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="rounded-3xl bg-white border-2 border-orange-100 p-8 md:p-10 shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <Eye size={28} className="text-primary" strokeWidth={1.75} />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                  {about?.vision_title || "Our Strategic Vision"}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-base">
                  {about?.vision_text || "To be the foremost civil and commercial builder of choice, pioneering advanced modular assembly, low-carbon geopolymer materials, and digital-twin robotics that set new benchmarks for structural resilience across the globe."}
                </p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 30 }} animate={visionInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.15 }} className="rounded-3xl bg-white border-2 border-orange-100 p-8 md:p-10 shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <Target size={28} className="text-primary" strokeWidth={1.75} />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                  {about?.mission_title || "Our Operating Mission"}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-base">
                  {about?.mission_text || "To safely build monumental infrastructure with zero lost-time incidents, transparent budget discipline, and LEED Platinum sustainability, delivering lasting civic value to the communities we serve."}
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
              <span className="text-xs font-bold tracking-widest uppercase text-primary bg-primary/10 px-5 py-2 rounded-full border border-primary/20 inline-block mb-3">
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
                    className="rounded-3xl bg-white border-2 border-orange-100 p-7 text-center hover:border-primary hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
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
        <section ref={galleryRef} className="py-20 md:py-28 bg-gradient-to-b from-white via-orange-50/20 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={galleryInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-14">
              <span className="text-xs font-bold tracking-widest uppercase text-primary bg-primary/10 px-5 py-2 rounded-full border border-primary/20 inline-block mb-3">
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
                  className="rounded-2xl overflow-hidden aspect-[4/3] group relative bg-neutral-900 border-2 border-orange-100"
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
