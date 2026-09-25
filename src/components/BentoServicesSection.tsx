import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getIcon } from "@/lib/iconMap";
import { Building2, ArrowRight } from "lucide-react";
import { DEFAULT_CONSTRUCTION_SERVICES } from "@/lib/servicesData";

export const BentoServicesSection = () => {
  const services = DEFAULT_CONSTRUCTION_SERVICES;

  return (
    <section id="services" className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-bold tracking-widest uppercase text-[#888A8C] bg-transparent px-5 py-2 rounded-full border border-[#888A8C] inline-block mb-4 shadow-xs">
            Core Engineering Disciplines
          </span>
          <h2 className="mt-2 font-display text-3xl md:text-5xl font-extrabold text-foreground tracking-tight">
            What We Build Across Nepal
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            From national highway corridors and long-span river bridges to hydraulic river training, hydropower civil works, and civic complexes.
          </p>
        </motion.div>

        {/* 3x2 Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = getIcon(service.icon_name) || Building2;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
              >
                <Link
                  to={`/services#${service.id}`}
                  className="group block rounded-2xl border border-neutral-200/90 bg-white overflow-hidden shadow-xs hover:shadow-xl hover:border-neutral-300 transition-all duration-300 flex flex-col h-full hover:-translate-y-1"
                >
                  {/* Top Preview Canvas */}
                  <div className="h-52 w-full bg-[#f8f9fb] border-b border-neutral-100/90 flex items-center justify-center p-5 relative overflow-hidden">
                    {/* Render custom technical preview mockup based on index */}
                    {index === 0 && (
                      <div className="relative w-full max-w-[270px] h-38 bg-white rounded-xl shadow-md border border-neutral-200/80 p-3 flex flex-col justify-between overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                        <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-red-400" />
                            <span className="w-2 h-2 rounded-full bg-amber-400" />
                            <span className="w-2 h-2 rounded-full bg-emerald-400" />
                          </div>
                          <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">DoR Highway Standard</span>
                        </div>
                        <div className="flex items-center gap-3 pt-1">
                          <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-neutral-900 border border-neutral-100">
                            <img src={service.image_url} alt={service.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0 space-y-1">
                            <div className="h-2 w-20 bg-neutral-200 rounded-full" />
                            <div className="h-1.5 w-24 bg-neutral-100 rounded-full" />
                            <span className="inline-block text-[9px] font-black text-[#F5333F] bg-[#F5333F]/10 px-1.5 py-0.5 rounded mt-1">
                              Asphalt / DBST
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-1 text-[9px] border-t border-neutral-100 text-neutral-500">
                          <span className="font-semibold text-neutral-700 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            QA/QC Verified
                          </span>
                          <span className="font-mono font-bold text-neutral-400">Class-A Standard</span>
                        </div>
                      </div>
                    )}

                    {index === 1 && (
                      <div className="relative w-full max-w-[270px] h-38 bg-white rounded-xl shadow-md border border-neutral-200/80 p-3 flex flex-col justify-between overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                        <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-red-400" />
                            <span className="w-2 h-2 rounded-full bg-amber-400" />
                            <span className="w-2 h-2 rounded-full bg-emerald-400" />
                          </div>
                          <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Bridge Crossings</span>
                        </div>
                        <div className="grid grid-cols-3 gap-1.5 pt-1">
                          <div className="rounded-lg bg-neutral-50 border border-neutral-100 p-1.5 text-center flex flex-col items-center justify-center">
                            <span className="text-[8px] text-neutral-400">Span</span>
                            <span className="text-[11px] font-black text-[#24272A]">200m+</span>
                          </div>
                          <div className="rounded-lg bg-neutral-50 border border-neutral-100 p-1.5 text-center flex flex-col items-center justify-center">
                            <span className="text-[8px] text-neutral-400">Piers</span>
                            <span className="text-[11px] font-black text-[#24272A]">Caisson</span>
                          </div>
                          <div className="rounded-lg bg-neutral-50 border border-neutral-100 p-1.5 text-center flex flex-col items-center justify-center">
                            <span className="text-[8px] text-neutral-400">Seismic</span>
                            <span className="text-[11px] font-black text-[#F5333F]">Zone V</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-1 text-[9px] text-neutral-500 border-t border-neutral-100">
                          <span className="font-semibold text-neutral-700">Pre-Stressed Girders</span>
                          <span className="text-[#F5333F] font-black font-mono">FIDIC</span>
                        </div>
                      </div>
                    )}

                    {index === 2 && (
                      <div className="relative w-full max-w-[270px] h-38 bg-white rounded-xl shadow-md border border-neutral-200/80 p-3 flex flex-col justify-between overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                        <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-red-400" />
                            <span className="w-2 h-2 rounded-full bg-amber-400" />
                            <span className="w-2 h-2 rounded-full bg-emerald-400" />
                          </div>
                          <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Hydraulic Protection</span>
                        </div>
                        <div className="space-y-1.5 pt-1">
                          <div className="flex items-center justify-between bg-neutral-50 px-2 py-1 rounded border border-neutral-100 text-[10px]">
                            <span className="font-medium text-neutral-700">RCC Guided Spurs</span>
                            <span className="font-bold text-emerald-600">Active</span>
                          </div>
                          <div className="flex items-center justify-between bg-neutral-50 px-2 py-1 rounded border border-neutral-100 text-[10px]">
                            <span className="font-medium text-neutral-700">Gabion Revetment</span>
                            <span className="font-bold text-[#F5333F]">High Flow</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-1 border-t border-neutral-100 text-[9px] text-neutral-500">
                          <span className="font-semibold text-neutral-700">Monsoon Mitigation</span>
                          <span className="font-mono font-bold text-neutral-400">Scour Control</span>
                        </div>
                      </div>
                    )}

                    {index === 3 && (
                      <div className="relative w-full max-w-[270px] h-38 bg-white rounded-xl shadow-md border border-neutral-200/80 p-3 flex flex-col justify-between overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                        <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-red-400" />
                            <span className="w-2 h-2 rounded-full bg-amber-400" />
                            <span className="w-2 h-2 rounded-full bg-emerald-400" />
                          </div>
                          <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-mono">NBC 105:2020</span>
                        </div>
                        <div className="flex items-center gap-3 pt-1">
                          <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-neutral-900 border border-neutral-100">
                            <img src={service.image_url} alt={service.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0 space-y-0.5 text-[10px]">
                            <div className="font-bold text-neutral-800">Ductile RCC Frame</div>
                            <div className="text-neutral-500 text-[9px]">Integrated MEP Civils</div>
                            <div className="text-[9px] font-bold text-[#F5333F]">Turnkey Complex</div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-1 border-t border-neutral-100 text-[9px] text-neutral-400 font-mono">
                          <span>Institutional Civic</span>
                          <span className="text-neutral-700 font-bold">Grade M30+</span>
                        </div>
                      </div>
                    )}

                    {index === 4 && (
                      <div className="relative w-full max-w-[270px] h-38 bg-white rounded-xl shadow-md border border-neutral-200/80 p-3 flex flex-col justify-between overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                        <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-red-400" />
                            <span className="w-2 h-2 rounded-full bg-amber-400" />
                            <span className="w-2 h-2 rounded-full bg-emerald-400" />
                          </div>
                          <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">RoR Civil Scheme</span>
                        </div>
                        <div className="grid grid-cols-2 gap-1.5 pt-1">
                          <div className="rounded-lg bg-neutral-50 border border-neutral-100 p-1.5 text-center">
                            <span className="text-[8px] text-neutral-400 block">Headworks</span>
                            <span className="text-[10px] font-black text-[#24272A]">Ogee Weir</span>
                          </div>
                          <div className="rounded-lg bg-neutral-50 border border-neutral-100 p-1.5 text-center">
                            <span className="text-[8px] text-neutral-400 block">Tunnels</span>
                            <span className="text-[10px] font-black text-[#F5333F]">Drill & Blast</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-1 text-[9px] text-neutral-500 border-t border-neutral-100">
                          <span className="font-semibold text-neutral-700">Penstock & Powerhouse</span>
                          <span className="text-emerald-600 font-bold font-mono">Turbine Ready</span>
                        </div>
                      </div>
                    )}

                    {index === 5 && (
                      <div className="relative w-full max-w-[270px] h-38 bg-white rounded-xl shadow-md border border-neutral-200/80 p-3 flex flex-col justify-between overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                        <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-red-400" />
                            <span className="w-2 h-2 rounded-full bg-amber-400" />
                            <span className="w-2 h-2 rounded-full bg-emerald-400" />
                          </div>
                          <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Potable Supply</span>
                        </div>
                        <div className="space-y-1.5 pt-1">
                          <div className="flex items-center justify-between bg-neutral-50 px-2 py-1 rounded border border-neutral-100 text-[10px]">
                            <span className="font-medium text-neutral-700">Bulk DI Transmission</span>
                            <span className="font-bold text-neutral-800">PN16 Mains</span>
                          </div>
                          <div className="flex items-center justify-between bg-neutral-50 px-2 py-1 rounded border border-neutral-100 text-[10px]">
                            <span className="font-medium text-neutral-700">Overhead Reservoirs</span>
                            <span className="font-bold text-[#F5333F]">RCC OHT</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-1 border-t border-neutral-100 text-[9px] text-neutral-500">
                          <span className="font-semibold text-neutral-700">District Distribution</span>
                          <span className="text-emerald-600 font-bold">WTP 24/7</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bottom Content Area */}
                  <div className="p-6 md:p-7 flex flex-col flex-1 bg-white">
                    {/* Icon + Title on same row */}
                    <div className="flex items-center gap-3 mb-2.5">
                      <Icon size={20} className="text-foreground shrink-0 group-hover:text-[#F5333F] transition-colors" />
                      <h3 className="font-display text-lg md:text-xl font-bold text-foreground tracking-tight group-hover:text-[#F5333F] transition-colors">
                        {service.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-neutral-500 leading-relaxed line-clamp-3">
                      {service.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Explore More Button */}
        <div className="mt-14 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#888A8C] hover:bg-[#77797B] text-white text-xs sm:text-sm font-bold shadow-lg shadow-black/10 hover:shadow-xl active:scale-95 transition-all"
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

