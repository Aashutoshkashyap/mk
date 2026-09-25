import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Truck, Compass, Building2, Droplets, Waves, Zap } from "lucide-react";
import { getIcon } from "@/lib/iconMap";
import { PrimaryButton } from "./ui/PrimaryButton";

// The exact 6 engineering verticals from mk-construction-website.md
export const DEFAULT_NEPAL_SERVICES = [
  { 
    id: 's1', 
    title: 'Roads & Highways', 
    description: 'National highways, district roads, rural feeder networks, and urban arterials across complex mountain and plains topography. Full-depth asphalt, DBST, gravel, and rigid concrete pavement with integrated slope stabilization and drainage culverts.', 
    icon_name: 'Truck', 
    image_url: 'https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&q=80&w=1200',
    scope: ['Earthwork & Subgrade', 'Pavement Layers (DBST/Asphalt)', 'Culverts & Drainage', 'Retaining Structures'],
  },
  { 
    id: 's2', 
    title: 'Bridges & Structures', 
    description: 'Steel-truss, RCC, and pre-stressed long-span river crossings engineered for Nepal’s torrential monsoon rivers. Spanning 20m to 200m+ with deep caisson well-foundations, heavy pier fabrication, and seismic elastomeric bearings.', 
    icon_name: 'Compass', 
    image_url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200',
    scope: ['Pier & Abutment Wells', 'Girder Fabrication & Launching', 'Deck Slab & Approaches', 'Bearings & Expansion Joints'],
  },
  { 
    id: 's3', 
    title: 'River Training & Flood Mitigation', 
    description: 'Hydraulic protection works for riverbank stabilization and flood mitigation in dynamic river systems. Heavy gabion revetments, RCC spurs, boulder pitching, channelization, and guided flood dykes safeguarding communities.', 
    icon_name: 'Waves', 
    image_url: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&q=80&w=1200',
    scope: ['Gabion & RCC Spurs', 'Embankment Construction', 'Toe Protection & Armor Rock', 'River Channelization'],
  },
  { 
    id: 's4', 
    title: 'Buildings & Institutional Complexes', 
    description: 'Institutional, commercial, and administrative structures executed in strict compliance with the Nepal National Building Code (NBC) with ductile seismic detailing, high-grade concrete frames, and full MEP coordination.', 
    icon_name: 'Building2', 
    image_url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&q=80&w=1200',
    scope: ['Ductile RCC Frames', 'MEP Infrastructure Coordination', 'Finishes & Architectural Joinery', 'Site Infrastructure Development'],
  },
  { 
    id: 's5', 
    title: 'Hydropower Civil Works', 
    description: 'Turnkey civil packages for run-of-river hydropower generation. Engineering weir diversion headworks, intake basins, gravel traps, underground tunnels, surge shafts, penstock foundations, and powerhouse civil structures.', 
    icon_name: 'Zap', 
    image_url: 'https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&q=80&w=1200',
    scope: ['Diversion Headworks & Weirs', 'Tunnel & Adit Excavation', 'Penstock Alignment & Thrust Blocks', 'Powerhouse Civil Package'],
  },
  { 
    id: 's6', 
    title: 'Water & Sanitation Infrastructure', 
    description: 'Municipal water supply systems, bulk transmission pipelines, overhead water storage reservoirs, distribution pipeline networks, and urban sewerage infrastructure delivering potable water.', 
    icon_name: 'Droplets', 
    image_url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1200',
    scope: ['Bulk Transmission Mains', 'RCC Storage Reservoirs', 'Distribution Pipe Networks', 'Water Treatment Plants'],
  },
];

import { filterOutLegacyFinancial } from "@/lib/contentFilter";

const BentoServicesSection = () => {
  const { data: dbServices = [], isLoading } = useQuery({
    queryKey: ["services-home"],
    queryFn: async () => {
      const { data, error } = await supabase.from("services").select("*").order("sort_order");
      if (error) return [];
      return data || [];
    },
  });

  const validDbServices = filterOutLegacyFinancial(dbServices);
  const services = validDbServices.length > 0 ? validDbServices : DEFAULT_NEPAL_SERVICES;

  return (
    <section id="services" className="py-20 md:py-28 bg-gradient-to-b from-white via-orange-50/15 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-orange-400/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#f9731612_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-bold tracking-widest uppercase text-primary bg-primary/10 px-5 py-2 rounded-full border border-primary/20 inline-block mb-4 shadow-sm">
            Core Engineering Disciplines
          </span>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-extrabold text-foreground tracking-tight">
            What We Build Across Nepal
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            From national highway corridors and long-span river bridges to hydraulic river training, hydropower civil works, and civic complexes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service: any, index: number) => {
            const Icon = getIcon(service.icon_name) || Building2;
            const scopeItems = service.scope || (service.sub_services || []).map((s: any) => s.label);
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group relative overflow-hidden rounded-3xl bg-white border-2 border-orange-100/90 shadow-sm hover:shadow-2xl hover:border-primary/40 transition-all duration-500 hover:-translate-y-1.5 flex flex-col"
              >
                {/* Visual Image Banner with Provision for Uploaded Image */}
                <div className="relative h-56 w-full overflow-hidden bg-neutral-900">
                  <img 
                    src={service.image_url || 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&q=80&w=1200'} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108" 
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&q=80&w=1200';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  
                  {/* Sector Number Badge */}
                  <span className="absolute top-4 left-4 bg-primary text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                    Sector 0{index + 1}
                  </span>

                  {/* Icon Box */}
                  <div className="absolute bottom-4 left-4 w-12 h-12 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-white/60 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                    <Icon size={22} className="text-primary group-hover:text-white transition-colors" />
                  </div>
                </div>

                {/* Details */}
                <div className="p-7 flex flex-col flex-1 bg-white">
                  <h3 className="font-display text-xl font-bold text-foreground tracking-tight group-hover:text-primary transition-colors mb-3">
                    {service.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed text-sm mb-6 flex-1">
                    {service.description}
                  </p>

                  {/* Scope of works pills if available */}
                  {scopeItems && scopeItems.length > 0 && (
                    <div className="space-y-1.5 pt-4 border-t border-orange-100 mb-6">
                      {scopeItems.slice(0, 3).map((item: string, sIdx: number) => (
                        <div key={sIdx} className="text-xs text-foreground/80 font-medium flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <Link 
                    to="/services" 
                    className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary group/link active:scale-95 transition-all mt-auto"
                  >
                    <span>View Technical Scope</span>
                    <ArrowRight size={13} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        <div className="mt-14 text-center">
          <PrimaryButton 
            as={Link} 
            to="/services" 
            className="px-8 py-3.5 shadow-xl shadow-primary/20"
            borderRadius="100px"
            containerClassName="h-12 min-w-[220px]"
          >
            <span className="flex items-center gap-2 text-xs sm:text-sm font-bold">
              Explore All 6 Engineering Verticals <ArrowRight size={16} />
            </span>
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
};

export default BentoServicesSection;
