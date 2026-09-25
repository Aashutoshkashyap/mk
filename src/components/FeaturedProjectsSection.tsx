import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Building2, Truck, Factory, ShieldCheck, MapPin, Calendar, ArrowRight, Ruler, CheckCircle2, HardHat } from "lucide-react";

export const FEATURED_HOMEPAGE_PROJECTS = [
  {
    id: "apex-tower",
    title: "Apex Horizon Commercial Super-Tower",
    category: "commercial",
    categoryLabel: "Commercial High-Rise",
    location: "Financial District, Metro Corridor",
    completionYear: "2025",
    squareFootage: "1,250,000 sq.ft",
    budget: "$185M",
    description: "A 48-story LEED Platinum corporate tower engineered with post-tensioned core walls, high-damping seismic isolators, and double-glazed architectural glass curtain wall.",
    highlights: ["48 Stories with 3 Sub-Level Basements", "Zero Lost-Time Injuries Across 1.2M Man-Hours", "Integrated 1.5MW Rooftop Solar Envelope"],
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "metro-viaduct",
    title: "Metropolitan Arterial Elevated Highway & Viaduct",
    category: "civil",
    categoryLabel: "Civil Infrastructure",
    location: "Northern Transit Corridor",
    completionYear: "2024",
    squareFootage: "14.2 km Dual Viaduct",
    budget: "$240M",
    description: "Heavy civil infrastructure comprising 14.2 km of continuous pre-cast segmental box girders, seismic elastomeric bearings, and deep bored pile foundations.",
    highlights: ["120 Pre-Cast Spans Erected via Launching Gantry", "Continuous Real-Time Drone LiDAR Monitoring", "Completed 60 Days Ahead of Commission Schedule"],
    imageUrl: "https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "vanguard-logistics",
    title: "Vanguard Automated High-Bay Logistics Fulfillment Hub",
    category: "industrial",
    categoryLabel: "Industrial & Logistics",
    location: "Interstate Freight Park",
    completionYear: "2025",
    squareFootage: "650,000 sq.ft",
    budget: "$78M",
    description: "Turnkey design-build of a 36-meter high-bay automated warehouse featuring super-flat jointless floor slabs (FM2 tolerance) and 48 automated dock levellers.",
    highlights: ["Super-Flat Industrial Laser-Screed Slabs", "Heavy-Duty Pre-Engineered Steel Framing", "Accommodates 45,000 Automated Pallet Positions"],
    imageUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "eco-campus",
    title: "Cascade Bio-Research Innovation Campus",
    category: "commercial",
    categoryLabel: "Commercial & Research",
    location: "Innovation Tech Corridor",
    completionYear: "2024",
    squareFootage: "420,000 sq.ft",
    budget: "$112M",
    description: "Mass-timber hybrid construction with low-carbon geopolymer concrete foundations, rainwater harvesting, and high-efficiency geothermal HVAC systems.",
    highlights: ["LEED Platinum & WELL Certified Gold", "70% Embodied Carbon Reduction via Geopolymer", "Engineered Cross-Laminated Timber (CLT) Core"],
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
  },
];

const CATEGORIES = [
  { id: "all", label: "All Projects" },
  { id: "commercial", label: "Commercial High-Rise" },
  { id: "civil", label: "Civil Infrastructure" },
  { id: "industrial", label: "Industrial Logistics" },
];

export const FeaturedProjectsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProjects = selectedCategory === "all"
    ? FEATURED_HOMEPAGE_PROJECTS
    : FEATURED_HOMEPAGE_PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-primary bg-primary/10 px-5 py-2 rounded-full border border-primary/20 inline-block mb-4 shadow-xs">
              Landmark Construction Portfolio
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
              Featured Built Landmarks & Infrastructure
            </h2>
            <p className="mt-3 text-muted-foreground text-base max-w-xl">
              From commercial high-rise towers to arterial highway viaducts and high-bay distribution hubs.
            </p>
          </div>

          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-all group shrink-0"
          >
            <span>Explore Complete Portfolio</span>
            <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          {CATEGORIES.map((tab) => {
            const active = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Badges on image */}
                  <span className="absolute top-4 left-4 bg-primary text-white text-[10px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-md">
                    {project.categoryLabel}
                  </span>
                  <span className="absolute top-4 right-4 bg-white/95 backdrop-blur-md text-foreground text-xs font-extrabold px-3.5 py-1.5 rounded-full shadow-md border border-white/60">
                    {project.budget}
                  </span>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-2 text-xs text-orange-200 mb-1">
                      <MapPin size={13} /> {project.location}
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

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground font-semibold flex items-center gap-1.5">
                      <Ruler size={14} className="text-primary" /> {project.squareFootage}
                    </span>
                    <Link
                      to="/portfolio"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:underline"
                    >
                      <span>Full Case Study</span>
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
            to="/portfolio"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-white text-sm font-bold shadow-xl shadow-primary/25 hover:bg-primary/90 hover:shadow-2xl hover:shadow-primary/35 transition-all active:scale-95"
          >
            <HardHat size={18} />
            <span>Discover All Landmark Projects in Portfolio</span>
            <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default FeaturedProjectsSection;
