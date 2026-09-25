import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Building2, Truck, Waves, Compass, Droplets, Zap, MapPin, ArrowRight, CheckCircle2, HardHat, Ruler } from "lucide-react";

export const NEPAL_FEATURED_PROJECTS = [
  {
    id: "saptakoshi-bridge",
    title: "Saptakoshi River Bridge & Approach Road",
    category: "bridges",
    categoryLabel: "Bridges & Structures",
    location: "Province 1 (Koshi)",
    sector: "Bridge Crossing",
    completionYear: "2024",
    contractValue: "₨ 2.4 Billion",
    description: "Multi-span pre-stressed concrete girder bridge crossing the torrential Saptakoshi river with deep pneumatic caisson foundations, hydraulic scour protection, and 4 km access highway approaches.",
    highlights: ["12 Spans with Deep Caisson Well-Foundations", "High-Flow Monsoon Scour Armor Protection", "Delivered for Department of Roads"],
    imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "mid-hill-highway",
    title: "Mid-Hill Highway Pkg 7 Upgrade",
    category: "roads",
    categoryLabel: "Roads & Highways",
    location: "Karnali Province",
    sector: "National Highway",
    completionYear: "2023",
    contractValue: "₨ 1.9 Billion",
    description: "42 km high-altitude highway expansion through steep mountain terrain. Executed heavy rock excavation, reinforced breast and retaining walls, bio-engineering slope stabilization, and double-coat DBST pavement.",
    highlights: ["42 km Mountain Highway Corridor", "Extensive Gabion & RCC Retaining Walls", "All-Weather Connectivity for Mountain Communities"],
    imageUrl: "https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "bagmati-river-training",
    title: "Bagmati River Training & Embankment Works",
    category: "river",
    categoryLabel: "River Training",
    location: "Bagmati Province",
    sector: "Hydraulic Flood Mitigation",
    completionYear: "2024",
    contractValue: "₨ 1.2 Billion",
    description: "Critical flood mitigation infrastructure along 18 km of the Bagmati river corridor. Executed continuous RCC flood retaining walls, armored rip-rap boulder pitching, and guided flow spurs.",
    highlights: ["18 km Flood Protection Dyke & Spurs", "Mitigates Severe Monsoon Flood Surge", "Executed with In-House Heavy Fleet"],
    imageUrl: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "provincial-hq-complex",
    title: "Provincial Government Administrative HQ",
    category: "buildings",
    categoryLabel: "Buildings & Institutional",
    location: "Lumbini Province",
    sector: "Administrative Complex",
    completionYear: "2025",
    contractValue: "₨ 980 Million",
    description: "Turnkey institutional civic complex built in strict compliance with the Nepal National Building Code (NBC) seismic provisions. Includes ministry secretariat blocks, assembly hall, and underground parking.",
    highlights: ["Ductile Seismic Framing to NBC 105:2020", "Solar Integrated Net-Zero Envelope", "Turnkey Mechanical & Electrical Fit-Out"],
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "upper-trishuli-civil",
    title: "Upper Trishuli Run-of-River Civil Package",
    category: "hydropower",
    categoryLabel: "Hydropower Civil",
    location: "Bagmati Province",
    sector: "Hydropower Civil",
    completionYear: "2024",
    contractValue: "₨ 3.1 Billion",
    description: "Civil execution of concrete diversion weir, de-sanding gravel basin, 3.8 km headrace tunnel excavation, surge tank, and underground powerhouse foundations.",
    highlights: ["3.8 km Drill-and-Blast Headrace Tunnel", "Heavy Reinforced Powerhouse Substructure", "Engineered for Nepal Electricity Authority"],
    imageUrl: "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "pokhara-water-supply",
    title: "Pokhara Regional Bulk Water Transmission",
    category: "water",
    categoryLabel: "Water & Sanitation",
    location: "Gandaki Province",
    sector: "Water Supply & Reservoirs",
    completionYear: "2025",
    contractValue: "₨ 1.5 Billion",
    description: "Laying 65 km of ductile iron (DI) bulk water transmission mains, construction of 4 overhead RCC service reservoirs, and municipal distribution network.",
    highlights: ["65 km Bulk Transmission Pipeline", "4 RCC Water Reservoirs Built", "Clean Potable Water for 120,000 Residents"],
    imageUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1200",
  },
];

const CATEGORIES = [
  { id: "all", label: "All Projects" },
  { id: "roads", label: "Roads & Highways" },
  { id: "bridges", label: "Bridges" },
  { id: "river", label: "River Training" },
  { id: "buildings", label: "Buildings" },
  { id: "hydropower", label: "Hydropower" },
  { id: "water", label: "Water & Sanitation" },
];

export const FeaturedProjectsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProjects = selectedCategory === "all"
    ? NEPAL_FEATURED_PROJECTS
    : NEPAL_FEATURED_PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-primary bg-primary/10 px-5 py-2 rounded-full border border-primary/20 inline-block mb-4 shadow-xs">
              National Infrastructure Portfolio
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
              Featured Works Across Nepal
            </h2>
            <p className="mt-3 text-muted-foreground text-base max-w-xl">
              Major roads, long-span river crossings, hydraulic flood defense, civic institutions, and hydropower packages delivered to Class-A standards.
            </p>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-all group shrink-0"
          >
            <span>View All Projects in Full Portfolio</span>
            <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 overflow-x-auto pb-2">
          {CATEGORIES.map((tab) => {
            const active = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 whitespace-nowrap ${
                  active
                    ? "bg-primary text-white shadow-md shadow-primary/30"
                    : "bg-orange-50 text-foreground/80 hover:bg-orange-100 hover:text-primary border border-orange-100"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="group rounded-3xl bg-white border-2 border-orange-100 overflow-hidden shadow-sm hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-1.5 flex flex-col"
              >
                {/* Image */}
                <div className="relative h-64 sm:h-72 overflow-hidden bg-neutral-900">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  
                  {/* Badges on image */}
                  <span className="absolute top-4 left-4 bg-primary text-white text-[10px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-md">
                    {project.categoryLabel}
                  </span>
                  <span className="absolute top-4 right-4 bg-white/95 backdrop-blur-md text-foreground text-xs font-extrabold px-3.5 py-1.5 rounded-full shadow-md border border-white/60">
                    {project.contractValue}
                  </span>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-2 text-xs text-orange-200 mb-1">
                      <MapPin size={13} /> {project.location} · {project.completionYear}
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white leading-snug">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Details */}
                <div className="p-7 flex flex-col flex-1">
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                    {project.description}
                  </p>

                  <div className="space-y-2 pt-4 border-t border-orange-100 mb-6">
                    {project.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-semibold text-foreground">
                        <CheckCircle2 size={14} className="text-primary shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-orange-50">
                    <span className="text-xs text-muted-foreground font-semibold">
                      Sector: <strong className="text-foreground">{project.sector}</strong>
                    </span>
                    <Link
                      to="/projects"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:underline"
                    >
                      <span>Full Specifications</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* View All Projects Action Bar */}
        <div className="mt-12 text-center">
          <Link
            to="/projects"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-white text-sm font-bold shadow-xl shadow-primary/25 hover:bg-primary/90 hover:shadow-2xl hover:shadow-primary/35 transition-all active:scale-95"
          >
            <HardHat size={18} />
            <span>Explore All 120+ Infrastructure Projects</span>
            <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default FeaturedProjectsSection;
