import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { getIcon } from "@/lib/iconMap";
import PreFooterCTA from "@/components/PreFooterCTA";
import { useSectionVisibility } from "@/hooks/useSectionVisibility";

const defaultConstructionServices = [
  {
    id: "s1",
    title: "Commercial & High-Rise General Contracting",
    description: "Complete turnkey construction of grade-A corporate towers, luxury mixed-use developments, and commercial complexes. Engineered with post-tensioned floor slabs, high-damping seismic steel framing, and bespoke architectural glass envelopes designed for hundred-year design life.",
    icon_name: "Building2",
    image_url: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&q=80&w=1200",
    sub_services: [
      { id: "ss1", label: "Structural Steel Framing", icon_name: "Building2", sort_order: 1 },
      { id: "ss2", label: "Curtain Wall Glazing", icon_name: "Eye", sort_order: 2 },
      { id: "ss3", label: "Multi-Level Basements", icon_name: "Hammer", sort_order: 3 },
      { id: "ss4", label: "Seismic Damping Systems", icon_name: "ShieldCheck", sort_order: 4 },
    ],
  },
  {
    id: "s2",
    title: "Heavy Civil & Infrastructure Engineering",
    description: "Mass transit arterial highway corridors, elevated post-tensioned viaducts, transit bridges, and municipal deep stormwater culverts engineered to withstand extreme seismic accelerations and hydraulic flood peaks.",
    icon_name: "Truck",
    image_url: "https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&q=80&w=1200",
    sub_services: [
      { id: "ss5", label: "Elevated Viaduct Spans", icon_name: "Truck", sort_order: 1 },
      { id: "ss6", label: "Cable-Stayed Bridges", icon_name: "Compass", sort_order: 2 },
      { id: "ss7", label: "Deep Culvert Shoring", icon_name: "Wrench", sort_order: 3 },
      { id: "ss8", label: "Pre-Cast Launching Gantry", icon_name: "HardHat", sort_order: 4 },
    ],
  },
  {
    id: "s3",
    title: "Turnkey Industrial & Logistics Hubs",
    description: "High-bay automated fulfillment warehouses, specialized manufacturing facilities, and high-load industrial floors engineered with super-flat laser screed tolerances (FM2 standard) for high-speed automated robotic picking.",
    icon_name: "Factory",
    image_url: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1200",
    sub_services: [
      { id: "ss9", label: "Super-Flat Jointless Slabs", icon_name: "Ruler", sort_order: 1 },
      { id: "ss10", label: "Pre-Engineered Steel (PEMB)", icon_name: "Factory", sort_order: 2 },
      { id: "ss11", label: "Cold Storage Automation", icon_name: "Boxes", sort_order: 3 },
      { id: "ss12", label: "Heavy Loading Aprons", icon_name: "Truck", sort_order: 4 },
    ],
  },
  {
    id: "s4",
    title: "Deep Foundations & Geotechnical Engineering",
    description: "Secant and tangent pile walls, deep bored cast-in-place concrete caissons, high-capacity rock tiebacks, and micro-tunneling through complex geologic strata and high water table zones.",
    icon_name: "Hammer",
    image_url: "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&q=80&w=1200",
    sub_services: [
      { id: "ss13", label: "Bored Piles & Caissons", icon_name: "Hammer", sort_order: 1 },
      { id: "ss14", label: "Diaphragm Slurry Walls", icon_name: "ShieldCheck", sort_order: 2 },
      { id: "ss15", label: "High-Load Rock Anchors", icon_name: "Wrench", sort_order: 3 },
      { id: "ss16", label: "Jet Grouting Stabilization", icon_name: "Activity", sort_order: 4 },
    ],
  },
  {
    id: "s5",
    title: "Virtual Design & 5D BIM Pre-Construction",
    description: "Harnessing 4D timeline simulation and 5D cost-loaded Building Information Modeling to execute automated trade clash detection, drone photogrammetry, and precision value-engineering.",
    icon_name: "Compass",
    image_url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1200",
    sub_services: [
      { id: "ss17", label: "4D Schedule Simulation", icon_name: "Calendar", sort_order: 1 },
      { id: "ss18", label: "5D Cost Clash Resolution", icon_name: "Compass", sort_order: 2 },
      { id: "ss19", label: "Drone LiDAR Topography", icon_name: "Eye", sort_order: 3 },
      { id: "ss20", label: "Digital Twin Handover", icon_name: "CheckCircle2", sort_order: 4 },
    ],
  },
  {
    id: "s6",
    title: "Sustainable Green Building & Seismic Retrofits",
    description: "Pioneering low-carbon geopolymer cements, construction waste diversion exceeding 85%, photovoltaic envelope cladding, and structural seismic retrofitting achieving LEED Platinum certification.",
    icon_name: "ShieldCheck",
    image_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
    sub_services: [
      { id: "ss21", label: "Seismic Strengthening", icon_name: "ShieldCheck", sort_order: 1 },
      { id: "ss22", label: "LEED Platinum Envelope", icon_name: "Award", sort_order: 2 },
      { id: "ss23", label: "Low-Carbon Concrete Mixes", icon_name: "CheckCircle2", sort_order: 3 },
      { id: "ss24", label: "Net-Zero Solar Integration", icon_name: "Zap", sort_order: 4 },
    ],
  },
];

const Services = () => {
  const { isVisible } = useSectionVisibility();
  const { data: services = [] } = useQuery({
    queryKey: ["services-full"],
    queryFn: async () => {
      const { data } = await supabase.from("services").select("*, sub_services(*)").order("sort_order");
      return data || [];
    },
  });

  const displayServices = services.length > 0 ? services : defaultConstructionServices;

  return (
    <>
      {/* Hero Banner */}
      {isVisible("services_hero") && (
        <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-orange-600/10 blur-3xl" />
          </div>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <span className="text-xs font-bold tracking-widest uppercase text-primary bg-primary/20 px-5 py-2 rounded-full border border-primary/30 inline-block mb-4 shadow-sm">
                Engineering & Contracting Disciplines
              </span>
              <h1 className="font-display text-4xl md:text-6xl font-extrabold text-white leading-tight">
                Specialized Construction Capabilities
              </h1>
              <p className="mt-5 text-neutral-300 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                Full-spectrum EPC delivery across commercial skyscrapers, mass-transit civil works, industrial logistics parks, and deep geotechnical foundations.
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {isVisible("services_list") && (
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-24">
            {displayServices.map((service: any, idx: number) => (
              <ServiceBlock key={service.id} service={service} index={idx} />
            ))}
          </div>
        </section>
      )}

      <PreFooterCTA />
    </>
  );
};

const ServiceBlock = ({ service, index }: { service: any; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isEven = index % 2 === 0;
  const Icon = getIcon(service.icon_name);
  const subs = (service.sub_services || []).sort((a: any, b: any) => a.sort_order - b.sort_order);

  return (
    <div ref={ref} className="grid md:grid-cols-2 gap-12 items-center p-8 rounded-3xl bg-white border-2 border-orange-100 shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-500">
      <motion.div initial={{ opacity: 0, x: isEven ? -30 : 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }} className={!isEven ? "md:order-2" : ""}>
        {service.image_url ? (
          <div className="relative rounded-2xl overflow-hidden shadow-lg group h-80">
            <img src={service.image_url} alt={service.title} className="w-full h-full object-cover rounded-2xl group-hover:scale-108 transition-transform duration-700 ease-out" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl pointer-events-none" />
            <div className="absolute top-5 left-5 w-14 h-14 rounded-2xl bg-white/95 backdrop-blur flex items-center justify-center shadow-lg border border-white/60">
              <Icon size={26} className="text-primary" />
            </div>
          </div>
        ) : (
          <div className="relative rounded-2xl bg-orange-50/50 border border-orange-200 p-12 flex items-center justify-center h-80">
            <Icon size={80} className="text-primary/20" strokeWidth={1} />
            <div className="absolute top-5 left-5 w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Icon size={26} className="text-primary" />
            </div>
          </div>
        )}
      </motion.div>

      <motion.div initial={{ opacity: 0, x: isEven ? 30 : -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.15 }} className={!isEven ? "md:order-1" : ""}>
        <div className="inline-block text-xs font-black uppercase tracking-widest text-primary bg-primary/10 px-3.5 py-1 rounded-full mb-3">
          Discipline #{index + 1}
        </div>
        <h2 className="font-display text-2xl md:text-3xl font-extrabold text-foreground mb-4 leading-tight">{service.title}</h2>
        <p className="text-muted-foreground leading-relaxed mb-6 text-sm md:text-base">{service.description}</p>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {subs.map((sub: any) => {
            const SubIcon = getIcon(sub.icon_name);
            return (
              <div key={sub.id} className="flex items-center gap-2.5 rounded-xl bg-orange-50/70 border border-orange-100 px-3.5 py-2.5 text-xs sm:text-sm text-foreground font-semibold">
                <SubIcon size={15} className="text-primary shrink-0" />
                <span className="truncate">{sub.label}</span>
              </div>
            );
          })}
        </div>
        <Link 
          to="/contact" 
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white text-xs sm:text-sm font-bold shadow-md shadow-primary/25 hover:bg-primary/95 active:scale-95 transition-all duration-300"
        >
          <span>Request Technical Scope & Tender</span>
          <ArrowRight size={14} />
        </Link>
      </motion.div>
    </div>
  );
};

export default Services;
