import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import DynamicIcon from "@/components/DynamicIcon";
import PreFooterCTA from "@/components/PreFooterCTA";
import { useSectionVisibility } from "@/hooks/useSectionVisibility";
import { DEFAULT_CONSTRUCTION_SERVICES } from "@/lib/servicesData";

const Services = () => {
  const { isVisible } = useSectionVisibility();
  const displayServices = DEFAULT_CONSTRUCTION_SERVICES;

  return (
    <>
      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white overflow-hidden">
        <div className="absolute top-10 right-10 w-96 h-96 bg-[#888A8C]/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#888a8c12_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none opacity-40" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="text-xs font-bold tracking-widest uppercase text-[#888A8C] bg-transparent px-5 py-2 rounded-full border border-[#888A8C] inline-block mb-4 shadow-xs">
              Engineering Disciplines & Scope of Works
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Six Engineering Verticals <br className="hidden sm:inline" />
              <span className="text-primary">Delivered Across Nepal</span>
            </h1>
            <p className="mt-6 text-neutral-300 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
              MK Construction Company Pvt. Ltd. self-performs high-complexity infrastructure packages with in-house heavy machinery, certified QA/QC materials testing, and seasoned field engineering leadership.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List with Alternating Layout */}
      <section className="py-20 md:py-28 bg-transparent">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-20">
          {displayServices.map((service: any, idx: number) => (
            <ServiceBlock key={service.id} service={service} index={idx} />
          ))}
        </div>
      </section>

      <PreFooterCTA />
    </>
  );
};

const ServiceBlock = ({ service, index }: { service: any; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isEven = index % 2 === 0;
  const subs = (service.sub_services || []).sort((a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0));

  return (
    <div
      ref={ref}
      id={service.id}
      className="grid md:grid-cols-2 gap-10 lg:gap-14 items-center p-8 sm:p-10 rounded-3xl bg-white border-2 border-[#888A8C]/30 shadow-sm hover:shadow-2xl hover:border-[#888A8C]/60 transition-all duration-500 scroll-mt-28"
    >
      <motion.div 
        initial={{ opacity: 0, x: isEven ? -30 : 30 }} 
        animate={inView ? { opacity: 1, x: 0 } : {}} 
        transition={{ duration: 0.6 }} 
        className={!isEven ? "md:order-2" : ""}
      >
        <div className="relative rounded-2xl overflow-hidden shadow-xl group h-80 bg-neutral-900">
          <img 
            src={service.image_url || "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&q=80&w=1200"} 
            alt={service.title} 
            className="w-full h-full object-cover rounded-2xl group-hover:scale-108 transition-transform duration-700 ease-out" 
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&q=80&w=1200";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent rounded-2xl pointer-events-none" />
          <div className="absolute top-5 left-5 w-14 h-14 rounded-2xl bg-white/95 backdrop-blur flex items-center justify-center shadow-lg border border-white/60">
            <DynamicIcon name={service.icon_name} size={26} className="text-[#F5333F]" />
          </div>
          <span className="absolute bottom-4 right-4 bg-[#F5333F] text-white text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-md">
            Vertical 0{index + 1}
          </span>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: isEven ? 30 : -30 }} 
        animate={inView ? { opacity: 1, x: 0 } : {}} 
        transition={{ duration: 0.6, delay: 0.15 }} 
        className={!isEven ? "md:order-1" : ""}
      >
        <div className="inline-block text-xs font-black uppercase tracking-widest text-[#888A8C] bg-transparent px-3.5 py-1 rounded-full border border-[#888A8C] mb-3">
          Sector 0{index + 1}
        </div>
        <h2 className="font-display text-2xl md:text-3xl font-extrabold text-foreground mb-4 leading-tight">
          {service.title}
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-6 text-sm sm:text-base">
          {service.description}
        </p>

        {subs.length > 0 && (
          <div className="mb-6">
            <div className="text-xs font-bold uppercase tracking-wider text-foreground mb-3">
              Core Scope of Works:
            </div>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {subs.map((sub: any) => {
                return (
                  <div key={sub.id} className="flex items-center gap-2 rounded-xl bg-neutral-50 border border-[#888A8C]/30 px-3.5 py-2 text-xs text-foreground font-semibold">
                    <DynamicIcon name={sub.icon_name} size={14} className="text-[#F5333F] shrink-0" />
                    <span className="truncate">{sub.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="pt-2 flex flex-wrap items-center gap-3">
          <Link 
            to="/contact" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#888A8C] text-white text-xs font-bold shadow-md hover:bg-[#77797B] active:scale-95 transition-all duration-300"
          >
            <span>Request Tender Specification</span>
            <ArrowRight size={14} />
          </Link>
          <Link 
            to="/projects" 
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[#888A8C]/30 text-xs font-bold text-foreground hover:bg-[#888A8C]/10 transition-all duration-300"
          >
            <span>View Executed Projects</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Services;
