import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { getIcon } from "@/lib/iconMap";
import { Building2, ArrowRight } from "lucide-react";
import { filterOutLegacyFinancial } from "@/lib/contentFilter";
import { DEFAULT_CONSTRUCTION_SERVICES } from "@/lib/servicesData";

export const BentoServicesSection = () => {
  const { data: dbServices = [] } = useQuery({
    queryKey: ["services-home"],
    queryFn: async () => {
      const { data } = await supabase
        .from("services")
        .select("*, sub_services(*)")
        .order("sort_order");
      return data || [];
    },
  });

  const validDbServices = filterOutLegacyFinancial(dbServices);
  // Use DB services if available, otherwise fall back to the shared default data
  const services = validDbServices.length > 0 ? validDbServices : DEFAULT_CONSTRUCTION_SERVICES;

  return (
    <section id="services" className="py-20 md:py-28 bg-gradient-to-b from-white via-neutral-50/50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#888A8C]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#888A8C]/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#888a8c12_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-bold tracking-widest uppercase text-[#888A8C] bg-transparent px-5 py-2 rounded-full border border-[#888A8C] inline-block mb-4 shadow-xs">
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
            // Support both `scope` (shared data) and `sub_services` (DB format)
            const scopeItems: string[] =
              service.scope ||
              (service.sub_services || []).map((s: any) => s.label);

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group relative overflow-hidden rounded-3xl bg-white border-2 border-[#888A8C]/30 shadow-sm hover:shadow-2xl hover:border-[#888A8C]/60 transition-all duration-500 hover:-translate-y-1.5 flex flex-col"
              >
                {/* Visual Image Banner */}
                <div className="relative h-56 w-full overflow-hidden bg-neutral-900">
                  <img
                    src={service.image_url || 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&q=80&w=1200'}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&q=80&w=1200';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                  {/* Discipline Number Badge */}
                  <span className="absolute top-4 left-4 bg-[#F5333F] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                    {service.disciplineNumber ? `Sector ${service.disciplineNumber}` : `Sector 0${index + 1}`}
                  </span>

                  {/* Icon Box */}
                  <div className="absolute bottom-4 left-4 w-12 h-12 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-white/60 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-[#F5333F]">
                    <Icon size={22} className="text-[#F5333F] group-hover:text-white transition-colors" />
                  </div>
                </div>

                {/* Details */}
                <div className="p-7 flex flex-col flex-1 bg-white">
                  <h3 className="font-display text-xl font-bold text-foreground tracking-tight group-hover:text-[#F5333F] transition-colors mb-3">
                    {service.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed text-sm mb-6 flex-1">
                    {service.description}
                  </p>

                  {/* Scope of works */}
                  {scopeItems && scopeItems.length > 0 && (
                    <div className="space-y-1.5 pt-4 border-t border-[#888A8C]/20 mb-6">
                      {scopeItems.slice(0, 3).map((item: string, sIdx: number) => (
                        <div key={sIdx} className="text-xs text-foreground/80 font-medium flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#F5333F] shrink-0" />
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <Link
                    to={`/services#${service.id}`}
                    className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#888A8C] hover:text-[#F5333F] group/link active:scale-95 transition-all mt-auto"
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
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#888A8C] hover:bg-[#77797B] text-white text-xs sm:text-sm font-bold shadow-xl shadow-black/10 hover:shadow-2xl active:scale-95 transition-all"
          >
            <span>Explore More</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BentoServicesSection;
