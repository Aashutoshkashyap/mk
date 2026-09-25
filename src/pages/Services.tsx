import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Truck, Compass, Waves, Building2, Zap, Droplets } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { getIcon } from "@/lib/iconMap";
import PreFooterCTA from "@/components/PreFooterCTA";
import { useSectionVisibility } from "@/hooks/useSectionVisibility";

const defaultConstructionServices = [
  {
    id: "s1",
    title: "Roads & Highways",
    disciplineNumber: "01",
    description: "National highways, district roads, rural feeder networks, and urban arterials across complex mountain and plains topography. Full-depth asphalt, DBST, gravel, and rigid concrete pavement with integrated slope stabilization and drainage culverts.",
    icon_name: "Truck",
    image_url: "https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&q=80&w=1200",
    sub_services: [
      { id: "ss1", label: "Earthwork & Sub-grade Preparation", icon_name: "Hammer", sort_order: 1 },
      { id: "ss2", label: "Pavement Layers (Asphalt / DBST)", icon_name: "Truck", sort_order: 2 },
      { id: "ss3", label: "Cross-Drainage & Box Culverts", icon_name: "Wrench", sort_order: 3 },
      { id: "ss4", label: "Slope Bio-Engineering & Retaining", icon_name: "ShieldCheck", sort_order: 4 },
    ],
  },
  {
    id: "s2",
    title: "Bridges & Structures",
    disciplineNumber: "02",
    description: "Steel-truss, RCC, and pre-stressed long-span river crossings engineered for Nepal’s torrential monsoon river dynamics. Span ranges from 20m to 200m+ with deep pneumatic well-foundations, heavy pier fabrication, and seismic elastomeric bearings.",
    icon_name: "Compass",
    image_url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200",
    sub_services: [
      { id: "ss5", label: "Pier & Abutment Well Sinking", icon_name: "Hammer", sort_order: 1 },
      { id: "ss6", label: "Pre-Stressed Girder Launching", icon_name: "Compass", sort_order: 2 },
      { id: "ss7", label: "Deck Slab Casting & Approaches", icon_name: "Building2", sort_order: 3 },
      { id: "ss8", label: "Bearings & Expansion Joints", icon_name: "ShieldCheck", sort_order: 4 },
    ],
  },
  {
    id: "s3",
    title: "River Training & Flood Mitigation",
    disciplineNumber: "03",
    description: "Hydraulic protection works for riverbank stabilization and flood mitigation in dynamic monsoon-fed river systems. Heavy gabion revetments, RCC spurs, boulder pitching, channelization, and guided flood dykes safeguarding agricultural basins and towns.",
    icon_name: "Waves",
    image_url: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&q=80&w=1200",
    sub_services: [
      { id: "ss9", label: "Gabion & RCC Guided Spurs", icon_name: "Waves", sort_order: 1 },
      { id: "ss10", label: "Flood Embankment Dykes", icon_name: "Building2", sort_order: 2 },
      { id: "ss11", label: "Toe Protection & Armor Rock", icon_name: "Hammer", sort_order: 3 },
      { id: "ss12", label: "River Channelization Dredging", icon_name: "Truck", sort_order: 4 },
    ],
  },
  {
    id: "s4",
    title: "Buildings & Institutional Complexes",
    disciplineNumber: "04",
    description: "Institutional, commercial, and administrative structures executed in strict compliance with the Nepal National Building Code (NBC 105:2020) with ductile seismic detailing, high-grade concrete frames, and full MEP coordination.",
    icon_name: "Building2",
    image_url: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&q=80&w=1200",
    sub_services: [
      { id: "ss13", label: "Ductile Structural Concrete Frames", icon_name: "Building2", sort_order: 1 },
      { id: "ss14", label: "Integrated MEP Infrastructure", icon_name: "Zap", sort_order: 2 },
      { id: "ss15", label: "Architectural Finishes & Joinery", icon_name: "CheckCircle2", sort_order: 3 },
      { id: "ss16", label: "Site Grading & Ancillary Pavements", icon_name: "Truck", sort_order: 4 },
    ],
  },
  {
    id: "s5",
    title: "Hydropower Civil Works",
    disciplineNumber: "05",
    description: "Turnkey civil packages for run-of-river hydropower generation. Engineering weir diversion headworks, intake basins, gravel traps, underground tunnels, surge shafts, penstock foundations, and powerhouse civil structures.",
    icon_name: "Zap",
    image_url: "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&q=80&w=1200",
    sub_services: [
      { id: "ss17", label: "Diversion Weirs & Intake Basins", icon_name: "Waves", sort_order: 1 },
      { id: "ss18", label: "Tunnel & Adit Rock Excavation", icon_name: "Hammer", sort_order: 2 },
      { id: "ss19", label: "Penstock Anchor Thrust Blocks", icon_name: "Wrench", sort_order: 3 },
      { id: "ss20", label: "Powerhouse Substructure Casting", icon_name: "Building2", sort_order: 4 },
    ],
  },
  {
    id: "s6",
    title: "Water & Sanitation Infrastructure",
    disciplineNumber: "06",
    description: "Municipal water supply systems, bulk transmission pipelines, overhead water storage reservoirs, distribution pipeline networks, and urban sewerage infrastructure delivering potable water to urban and rural centers.",
    icon_name: "Droplets",
    image_url: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1200",
    sub_services: [
      { id: "ss21", label: "Bulk DI / HDPE Transmission Mains", icon_name: "Droplets", sort_order: 1 },
      { id: "ss22", label: "Elevated RCC Storage Reservoirs", icon_name: "Building2", sort_order: 2 },
      { id: "ss23", label: "District Distribution Networks", icon_name: "Compass", sort_order: 3 },
      { id: "ss24", label: "Water Treatment Filtration Plants", icon_name: "ShieldCheck", sort_order: 4 },
    ],
  },
];

import { filterOutLegacyFinancial } from "@/lib/contentFilter";

const Services = () => {
  const { isVisible } = useSectionVisibility();
  const { data: services = [] } = useQuery({
    queryKey: ["services-full"],
    queryFn: async () => {
      const { data } = await supabase.from("services").select("*, sub_services(*)").order("sort_order");
      return data || [];
    },
  });

  const validServices = filterOutLegacyFinancial(services);
  const displayServices = validServices.length > 0 ? validServices : defaultConstructionServices;

  return (
    <>
      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white overflow-hidden">
        <div className="absolute top-10 right-10 w-96 h-96 bg-primary/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-red-700/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#f9731615_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none opacity-40" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="text-xs font-bold tracking-widest uppercase text-primary bg-primary/20 px-5 py-2 rounded-full border border-primary/30 inline-block mb-4 shadow-sm">
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
      <section className="py-20 md:py-28 bg-white">
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
  const Icon = getIcon(service.icon_name) || Building2;
  const subs = (service.sub_services || []).sort((a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0));

  return (
    <div 
      ref={ref} 
      className="grid md:grid-cols-2 gap-10 lg:gap-14 items-center p-8 sm:p-10 rounded-3xl bg-white border-2 border-red-100 shadow-sm hover:shadow-2xl hover:border-primary/40 transition-all duration-500"
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
            <Icon size={26} className="text-primary" />
          </div>
          <span className="absolute bottom-4 right-4 bg-primary text-white text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-md">
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
        <div className="inline-block text-xs font-black uppercase tracking-widest text-primary bg-primary/10 px-3.5 py-1 rounded-full mb-3">
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
                const SubIcon = getIcon(sub.icon_name) || CheckCircle2;
                return (
                  <div key={sub.id} className="flex items-center gap-2 rounded-xl bg-red-50/70 border border-red-100 px-3.5 py-2 text-xs text-foreground font-semibold">
                    <SubIcon size={14} className="text-primary shrink-0" />
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
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white text-xs font-bold shadow-md shadow-primary/25 hover:bg-primary/95 active:scale-95 transition-all duration-300"
          >
            <span>Request Tender Specification</span>
            <ArrowRight size={14} />
          </Link>
          <Link 
            to="/projects" 
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-red-200 text-xs font-bold text-foreground hover:bg-red-50 transition-all duration-300"
          >
            <span>View Executed Projects</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Services;
