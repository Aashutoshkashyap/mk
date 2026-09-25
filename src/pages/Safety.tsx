import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ShieldCheck, HardHat, Truck, Award, CheckCircle2, 
  AlertTriangle, Hammer, Wrench, ArrowRight, Activity 
} from "lucide-react";
import PreFooterCTA from "@/components/PreFooterCTA";

const FLEET_CATEGORIES = [
  {
    title: "Heavy Lifting & Tower Cranes",
    count: "42 Units",
    description: "High-capacity luffing jib and flat-top tower cranes capable of up to 32-ton single picks, high-frequency radar anti-collision telemetry, and variable wind anemometer telemetry.",
    specs: ["Liebherr 550 EC-H & Potain MDT Series", "Max Hook Height: 240 meters", "Active Anti-Collision Dynamic Braking"],
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&q=80&w=900",
  },
  {
    title: "Earthmoving & Deep Trench Excavation",
    count: "128 Units",
    description: "GPS-guided hydraulic excavators, long-reach dredging booms, articulated rock dump trucks, and high-traction bulldozers equipped with real-time 3D grade control sensors.",
    specs: ["CAT 349 & Komatsu PC800 Excavators", "Integrated Trimble 3D GPS Grade Control", "Tier-4 Final Low-Emission Diesel Engines"],
    imageUrl: "https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&q=80&w=900",
  },
  {
    title: "Concrete Pouring & Batching Fleet",
    count: "65 Units",
    description: "Truck-mounted concrete boom pumps reaching up to 63 meters, captive mobile computerized batching plants, and volumetric transit mixers guaranteeing uninterrupted mega-pour cycles.",
    specs: ["Putzmeister 63m & Schwing 58m Boom Pumps", "Mobile Batching Capacity: 180 m³/hour", "Automated Slump & Temperature Telemetry"],
    imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=900",
  },
  {
    title: "Slipform & Heavy Paving Machinery",
    count: "34 Units",
    description: "High-precision concrete slipform pavers, asphalt milling machines, tandem vibratory rollers, and laser screeds producing ultra-flat industrial floor tolerances (FM2/Superflat).",
    specs: ["Wirtgen SP 64 Slipform Pavers", "Somero Laser Screeds with 3D Profiler", "Dual-Frequency Compaction Sensor Tech"],
    imageUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=900",
  },
];

const SAFETY_PILLARS = [
  {
    icon: ShieldCheck,
    title: "Zero-Harm Culture",
    desc: "Every worker, engineer, and contractor holds the unconditional authority to halt work immediately upon identifying any unmitigated hazard.",
  },
  {
    icon: HardHat,
    title: "Daily JSA & Tool-Box Briefs",
    desc: "Every shift commences with mandatory Job Safety Analysis (JSA) risk assessments, crane rigging inspections, and PPE certifications.",
  },
  {
    icon: Award,
    title: "ISO 45001 & OSHA Accredited",
    desc: "Internationally audited occupational health and safety systems with computerized incident tracking and automated compliance audits.",
  },
  {
    icon: Activity,
    title: "Real-Time Drone Hazard AI",
    desc: "Autonomous drone site scans analyze edge protection, scaffolding tie-backs, and heavy equipment blind-spots daily.",
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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary font-bold text-xs uppercase tracking-widest mb-6">
              <ShieldCheck size={16} /> ISO 45001 & 9001 Certified Operations
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Safety First Ethos & <br className="hidden sm:inline" />
              <span className="text-primary">Captive Heavy Machinery Fleet</span>
            </h1>
            <p className="mt-6 text-neutral-300 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
              Our unyielding Zero-Harm safety protocols and fully owned multi-million-dollar heavy machinery fleet ensure total control over quality, safety, and construction milestones.
            </p>
          </motion.div>

          {/* Key Stats */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-neutral-800">
            <div>
              <div className="font-display text-3xl font-extrabold text-primary">0.00</div>
              <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider font-semibold">Lost Time Injury Rate</div>
            </div>
            <div>
              <div className="font-display text-3xl font-extrabold text-white">1,200+</div>
              <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider font-semibold">Captive Fleet Assets</div>
            </div>
            <div>
              <div className="font-display text-3xl font-extrabold text-primary">2.4M</div>
              <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider font-semibold">Safe Man-Hours Logged</div>
            </div>
            <div>
              <div className="font-display text-3xl font-extrabold text-white">100%</div>
              <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider font-semibold">OSHA Compliance Score</div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Pillars Section */}
      <section className="py-20 md:py-28 bg-white relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest uppercase text-primary bg-primary/10 px-5 py-2 rounded-full border border-primary/20 inline-block mb-4 shadow-sm">
              Our Core Discipline
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold text-foreground tracking-tight">
              The Zero-Harm Safety Framework
            </h2>
            <p className="mt-4 text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              Every jobsite is engineered with multi-layered protective protocols, active telemetry, and continuous peer audits to guarantee every team member returns home safely.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SAFETY_PILLARS.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-3xl bg-white border-2 border-orange-100 p-7 shadow-sm hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
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
      <section className="py-20 md:py-28 bg-gradient-to-b from-white via-orange-50/20 to-white relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest uppercase text-primary bg-primary/10 px-5 py-2 rounded-full border border-primary/20 inline-block mb-4 shadow-sm">
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
                className="group rounded-3xl bg-white border-2 border-orange-100/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-500 hover:-translate-y-1.5 flex flex-col"
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
                  <div className="space-y-2 pt-4 border-t border-orange-100">
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
