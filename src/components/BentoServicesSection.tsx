import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getIcon } from "@/lib/iconMap";
import { PrimaryButton } from "./ui/PrimaryButton";

const BentoServicesSection = () => {
  const { data: services = [], isLoading, error } = useQuery({
    queryKey: ["services-home"],
    queryFn: async () => {
      const { data, error } = await supabase.from("services").select("*").order("sort_order");
      if (error) throw error;
      return data || [];
    },
  });

  // Use the fetched services or professional defaults if still loading or if error occurs
  // High-value construction default services with real Unsplash photography
  const defaultServices = [
    { 
      id: '1', 
      title: 'Commercial & High-Rise General Contracting', 
      description: 'Turnkey execution of iconic high-rise commercial towers, corporate headquarters, and mixed-use complexes. Engineered with advanced seismic-damping steel framing, post-tension slabs, and high-performance architectural glass envelopes.', 
      icon_name: 'Building2', 
      image_url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&q=80&w=1200' 
    },
    { 
      id: '2', 
      title: 'Civil & Heavy Infrastructure', 
      description: 'Mass transit infrastructure, elevated highway viaducts, post-tensioned bridges, deep tunnel culverts, and municipal civil earthworks delivered to stringent engineering tolerances.', 
      icon_name: 'Truck', 
      image_url: 'https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&q=80&w=900' 
    },
    { 
      id: '3', 
      title: 'Turnkey Industrial & Logistics Facilities', 
      description: 'High-bay automated distribution fulfillment centers, heavy industrial processing facilities, and super-flat industrial floor slabs built for high static and dynamic loadings.', 
      icon_name: 'Factory', 
      image_url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=900' 
    },
    { 
      id: '4', 
      title: 'BIM 5D Virtual Design & Pre-Construction', 
      description: 'End-to-end 4D/5D Building Information Modeling, spatial clash resolution, drone aerial volumetric surveys, and precision value-engineering that eliminate budget overruns.', 
      icon_name: 'Compass', 
      image_url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1200' 
    },
    { 
      id: '5', 
      title: 'Sustainable LEED Green Building & Seismic Retrofitting', 
      description: 'Low-carbon geopolymer concrete formulations, photovoltaic envelope integration, deep foundation stabilization, and structural seismic retrofitting achieving LEED Platinum certification.', 
      icon_name: 'ShieldCheck', 
      image_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1400' 
    },
  ];

  if (isLoading) return <div className="h-[800px] bg-secondary/20 animate-pulse rounded-[3rem] mx-6 my-24 flex items-center justify-center text-muted-foreground font-semibold">Loading specialized capabilities...</div>;

  const displayServices = services.length > 0 ? services.slice(0, 5) : defaultServices;

  const getCardStyles = (index: number) => {
    switch (index) {
      case 0: // Large Wide
        return "lg:col-span-2 lg:row-span-1";
      case 1: // Small
        return "lg:col-span-1 lg:row-span-1";
      case 2: // Small
        return "lg:col-span-1 lg:row-span-1";
      case 3: // Large Wide
        return "lg:col-span-2 lg:row-span-1";
      case 4: // Full Width Bottom
        return "lg:col-span-3 lg:row-span-1";
      default:
        return "lg:col-span-1 lg:row-span-1";
    }
  };

  return (
    <section id="services" className="py-28 md:py-36 bg-gradient-to-b from-white via-orange-50/15 to-white relative overflow-hidden">
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
            Core Construction Disciplines
          </span>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-extrabold text-foreground tracking-tight">
            Engineered for Monumental Scale
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Delivering master-builder excellence from deep geotechnical foundations to high-rise structural envelopes with captive heavy machinery and Tier-1 engineering rigour.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(350px,auto)]">
          {displayServices.map((service, index) => {
            const Icon = getIcon(service.icon_name);
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`${getCardStyles(index)} group relative overflow-hidden rounded-[2.5rem] bg-white border-2 border-orange-100/80 shadow-[0_8px_30px_rgb(249,115,22,0.06)] hover:shadow-[0_20px_50px_rgb(249,115,22,0.14)] hover:border-primary/40 transition-all duration-500 hover:-translate-y-1.5 flex flex-col`}
              >
                {/* Visual Decoration Wrapper */}
                <div className="relative h-64 w-full overflow-hidden bg-orange-50 flex items-center justify-center">
                  {service.image_url ? (
                    <img 
                      src={service.image_url} 
                      alt={service.title} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108" 
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : null}
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  
                  {/* Clean Icon-based Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <Icon size={72} className="text-white/20 transition-all duration-700 group-hover:scale-125 group-hover:text-white/30" />
                  </div>
                </div>

                {/* Floating Icon Box */}
                <div className="absolute top-6 left-6 z-20 w-12 h-12 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-white/60 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                  <Icon size={24} className="text-primary group-hover:text-white transition-colors" />
                </div>

                <div className="relative p-7 md:p-9 flex flex-col flex-1 bg-white">
                  <div className="mb-3">
                    <h3 className="font-display text-xl md:text-2xl font-bold text-foreground tracking-tight group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed text-sm mb-6 flex-1">
                    {service.description}
                  </p>
                  
                  <Link 
                    to="/services" 
                    className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary group/link active:scale-95 transition-all"
                  >
                    <span>View Specifications</span>
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center group-hover/link:bg-primary group-hover/link:text-white transition-all duration-300">
                      <ArrowRight size={13} className="group-hover/link:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {services.length > 5 && (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-16 text-center"
          >
            <PrimaryButton 
              as={Link} 
              to="/services" 
              className="px-10 py-4 shadow-xl shadow-primary/20"
              borderRadius="100px"
              containerClassName="h-14 min-w-[240px]"
            >
              <span className="flex items-center gap-3">
                Discover All Services <ArrowRight size={18} />
              </span>
            </PrimaryButton>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default BentoServicesSection;
