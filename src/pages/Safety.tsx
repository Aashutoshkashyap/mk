import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ShieldCheck, HardHat, Truck, Award, CheckCircle2, 
  AlertTriangle, Hammer, Wrench, ArrowRight, Activity 
} from "lucide-react";
import PreFooterCTA from "@/components/PreFooterCTA";

const FLEET_CATEGORIES = [
  {
    title: "Excavators, Dozers & Earthmoving",
    count: "140+ Units",
    description: "Heavy hydraulic excavators (CAT, Komatsu), long-reach slope stabilization booms, and crawler bulldozers equipped with GPS grade control for high-altitude hill cutting and Terai earthwork.",
    specs: ["Komatsu PC200–PC800 & CAT 349 Excavators", "CAT D6 & D8 Track-Type Bulldozers", "Hydraulic Rock Breakers & Long-Reach Booms"],
    imageUrl: "https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&q=80&w=900",
  },
  {
    title: "Motor Graders & Heavy Compaction",
    count: "65+ Units",
    description: "Precision motor graders with automatic laser leveling, vibrating tandem road rollers, and padfoot soil compactors delivering sub-base density exceeding DoR norms.",
    specs: ["CAT 140K & Komatsu GD555 Motor Graders", "Hamm & Bomag 12-Ton Tandem Vibratory Rollers", "Padfoot Earthwork Compactors with Real-Time Density"],
    imageUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=900",
  },
  {
    title: "Batching Plants & Aggregate Crushers",
    count: "38 Units",
    description: "Captive computerized ready-mix batching plants and primary/secondary aggregate crushing units ensuring an uninterrupted supply of certified aggregates and high-spec concrete.",
    specs: ["Mobile Wet-Mix Batching Plants (120–180 m³/hr)", "3-Stage Mobile Jaw & Cone Crushing Plants", "Chilled Water Concrete Cooling Systems"],
    imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=900",
  },
  {
    title: "Asphalt Pavers & Specialized Road Fleet",
    count: "45 Units",
    description: "Sensor-guided asphalt pavers, bitumen distributors, mechanical chip spreaders, and cold milling machines for national highways and regional transit corridors.",
    specs: ["Vögele Super 1800-3 Asphalt Pavers", "Hydrostatic Bitumen Pressure Distributors", "Pneumatic Tire Rollers for Surface Sealing"],
    imageUrl: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&q=80&w=900",
  },
  {
    title: "Heavy Tippers, Transit Mixers & Tankers",
    count: "180+ Units",
    description: "Multi-axle tipper trucks, high-capacity transit mixers, and bulk water/fuel tankers maintaining rapid continuous aggregate transport to remote jobsites across Nepal.",
    specs: ["Tata Prima & BharatBenz Multi-Axle Tippers", "Transit Mixers with Automated Slump Control", "Off-Road 6x4 Diesel & Water Bowser Fleet"],
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=900",
  },
  {
    title: "Lifting Cranes & Piling Rigs",
    count: "28 Units",
    description: "Lattice crawler cranes, rough-terrain hydraulic mobile cranes, and hydraulic rotary piling rigs for deep bridge pier caissons and heavy steel girder erection.",
    specs: ["50T–120T Crawler & Rough-Terrain Cranes", "Bauer Rotary Hydraulic Piling Rigs", "Pre-Stressing Jacks & Grouting Pumps"],
    imageUrl: "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&q=80&w=900",
  },
];

const CAPABILITY_PILLARS = [
  {
    icon: ShieldCheck,
    title: "In-House QA/QC Site Labs",
    desc: "Fully equipped on-site material testing laboratories conducting aggregate gradation, concrete cube compression, CBR, bitumen penetration, and rebar yield testing.",
  },
  {
    icon: HardHat,
    title: "Zero-Harm HSE Culture",
    desc: "Strict occupational health and safety protocols with daily tool-box talks, job hazard analyses, and unconditional stop-work authority on all project sites.",
  },
  {
    icon: Award,
    title: "Survey & Engineering Rigor",
    desc: "High-precision RTK GPS and electronic total station survey crews paired with Civil 3D design coordination for flawless alignment and profile setting.",
  },
  {
    icon: Activity,
    title: "850+ Multi-Skilled Workforce",
    desc: "A cohesive team of chartered structural engineers, bridge specialists, geotechnical advisors, licensed plant operators, and master craftsmen.",
  },
];

const Safety = () => {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white overflow-hidden">
        <div className="absolute top-10 right-10 w-96 h-96 bg-primary/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#f9731615_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none opacity-40" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-transparent border border-[#888A8C] text-[#888A8C] font-bold text-xs uppercase tracking-widest mb-6">
              <ShieldCheck size={16} /> Plant Fleet · In-House QC Labs · Zero-Harm Safety
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Contractor Capabilities & <br className="hidden sm:inline" />
              <span className="text-primary">Plant & Equipment Fleet</span>
            </h1>
            <p className="mt-6 text-neutral-300 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
              MK Construction Company Pvt. Ltd. operates one of Nepal's most comprehensive captive heavy equipment fleets, paired with certified in-house material testing laboratories and rigorous HSE governance.
            </p>
          </motion.div>

          {/* Key Stats */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-neutral-800">
            <div>
              <div className="font-display text-3xl font-extrabold text-primary">500+</div>
              <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider font-semibold">Captive Plant Units</div>
            </div>
            <div>
              <div className="font-display text-3xl font-extrabold text-white">850+</div>
              <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider font-semibold">Engineers & Crew</div>
            </div>
            <div>
              <div className="font-display text-3xl font-extrabold text-primary">ISO 9001</div>
              <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider font-semibold">QMS Certified</div>
            </div>
            <div>
              <div className="font-display text-3xl font-extrabold text-white">32</div>
              <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider font-semibold">Districts Mobilized</div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities & Quality Assurance Pillars */}
      <section className="py-20 md:py-28 bg-white relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest uppercase text-primary bg-transparent px-5 py-2 rounded-full border border-[#888A8C] text-[#888A8C] inline-block mb-4 shadow-sm">
              Engineering Infrastructure Rigor
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold text-foreground tracking-tight">
              In-House Labs, Systems & Safety Governance
            </h2>
            <p className="mt-4 text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              From advance topographical surveys to rigorous compressive testing and Zero-Harm safety standards, our operational framework guarantees precision delivery.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CAPABILITY_PILLARS.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-3xl bg-white border-2 border-[#888A8C]/30 p-7 shadow-sm hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-5">
                  <p.icon size={26} strokeWidth={1.75} />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Heavy Machinery Fleet Showcase */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-white via-red-50/20 to-white relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest uppercase text-primary bg-transparent px-5 py-2 rounded-full border border-[#888A8C] text-[#888A8C] inline-block mb-4 shadow-sm">
              Captive Equipment Advantage
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold text-foreground tracking-tight">
              Heavy Equipment Fleet & Technology
            </h2>
            <p className="mt-4 text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              We own and maintain an extensive captive fleet of heavy machinery, eliminating subcontractor equipment bottlenecks and delivering turnkey self-performance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {FLEET_CATEGORIES.map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group rounded-3xl bg-white border-2 border-[#888A8C]/30/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-500 hover:-translate-y-1.5 flex flex-col"
              >
                <div className="relative h-64 overflow-hidden bg-neutral-900">
                  <img
                    src={cat.imageUrl}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <span className="absolute top-4 right-4 bg-primary text-white text-xs font-black px-3.5 py-1.5 rounded-full shadow-md">
                    {cat.count}
                  </span>
                </div>

                <div className="p-7 flex flex-col flex-1">
                  <h3 className="font-display text-2xl font-bold text-foreground group-hover:text-primary transition-colors mb-3">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                    {cat.description}
                  </p>
                  <div className="space-y-2 pt-4 border-t border-[#888A8C]/30">
                    {cat.specs.map((s, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-foreground">
                        <CheckCircle2 size={14} className="text-primary shrink-0" />
                        <span>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PreFooterCTA />
    </>
  );
};

export default Safety;
