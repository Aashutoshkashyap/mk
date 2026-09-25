import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getIcon } from "@/lib/iconMap";
import { Building2, ArrowRight } from "lucide-react";
import { DEFAULT_CONSTRUCTION_SERVICES } from "@/lib/servicesData";

export const BentoServicesSection = () => {
  const services = DEFAULT_CONSTRUCTION_SERVICES;

  return (
    <section id="services" className="py-20 md:py-28 bg-transparent relative overflow-hidden">
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
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
              >
                <Link
                  to={`/services#${service.id}`}
                  className="group block rounded-2xl border border-neutral-200/90 bg-white overflow-hidden shadow-xs hover:shadow-2xl hover:border-neutral-300 transition-all duration-300 flex flex-col h-full"
                >
                  {/* Top Preview Canvas */}
                  <div className="h-52 w-full bg-gradient-to-b from-[#fbfcfd] to-[#f3f5f8] border-b border-neutral-100/90 flex items-center justify-center p-5 relative overflow-hidden">
                    {/* Background subtle mesh grid */}
                    <div className="absolute inset-0 bg-[radial-gradient(#888a8c10_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-60" />

                    {/* Inner Mockup Window with UNIFORM FULL-SIZE Image */}
                    <div className="relative w-full max-w-[290px] h-40 bg-white rounded-xl shadow-md group-hover:shadow-2xl border border-neutral-200/80 flex flex-col overflow-hidden group-hover:scale-[1.03] transition-all duration-500 shrink-0">
                      {/* Window top bar */}
                      <div className="flex items-center justify-between px-3 py-1.5 bg-neutral-50/90 border-b border-neutral-200/70 shrink-0">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-red-400 group-hover:animate-pulse" />
                          <span className="w-2 h-2 rounded-full bg-amber-400" />
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        </div>
                        <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider truncate max-w-[170px]">
                          Sector 0{index + 1} · {service.title.split(' ')[0]}
                        </span>
                      </div>

                      {/* Full-bleed Photo with Absolute Inset for 100% Uniformity */}
                      <div className="relative flex-1 w-full overflow-hidden bg-neutral-900">
                        <img
                          src={service.image_url}
                          alt={service.title}
                          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none" />

                        {/* Floating Technical Overlay Chips */}
                        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none gap-1">
                          <span className="text-[9px] font-black text-white bg-black/65 backdrop-blur-md px-2 py-0.5 rounded border border-white/20 shadow-xs truncate max-w-[140px]">
                            {index === 0 && "Asphalt / DBST"}
                            {index === 1 && "Span: 200m+ Caisson"}
                            {index === 2 && "RCC Guided Spurs"}
                            {index === 3 && "NBC 105:2020"}
                            {index === 4 && "RoR Weir Headworks"}
                            {index === 5 && "Bulk DI PN16 Mains"}
                          </span>

                          <span className="text-[9px] font-bold text-white bg-[#F5333F] px-2 py-0.5 rounded shadow-sm flex items-center gap-1 shrink-0">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            {index === 0 && "QA/QC Verified"}
                            {index === 1 && "FIDIC Standard"}
                            {index === 2 && "Monsoon Ready"}
                            {index === 3 && "Ductile Frame"}
                            {index === 4 && "Turbine Ready"}
                            {index === 5 && "WTP 24/7"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Content Area */}
                  <div className="p-6 md:p-7 flex flex-col flex-1 bg-white">
                    {/* Icon + Title on same row */}
                    <div className="flex items-center gap-3 mb-2.5">
                      <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-foreground group-hover:bg-[#F5333F]/10 group-hover:text-[#F5333F] group-hover:scale-110 transition-all duration-300 shrink-0">
                        <Icon size={18} />
                      </div>
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
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#888A8C] hover:bg-[#77797B] text-white text-xs sm:text-sm font-bold shadow-lg shadow-black/10 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <span>Explore More</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BentoServicesSection;

