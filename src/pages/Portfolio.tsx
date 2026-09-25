import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Building2, Truck, Factory, ShieldCheck, MapPin, Calendar, 
  ArrowRight, Filter, Ruler, CheckCircle2, HardHat, ExternalLink 
} from "lucide-react";
import PreFooterCTA from "@/components/PreFooterCTA";

export interface ProjectItem {
  id: string;
  title: string;
  category: "commercial" | "civil" | "industrial" | "sustainable";
  categoryLabel: string;
  location: string;
  client: string;
  completionYear: string;
  squareFootage: string;
  budget: string;
  description: string;
  highlights: string[];
  imageUrl: string;
  featured?: boolean;
}

const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "apex-tower",
    title: "Apex Horizon Commercial Super-Tower",
    category: "commercial",
    categoryLabel: "Commercial & High-Rise",
    location: "Financial District, Metro Corridor",
    client: "Horizon Commercial Trust",
    completionYear: "2025",
    squareFootage: "1,250,000 sq.ft",
    budget: "$185M",
    description: "A 48-story LEED Platinum corporate tower engineered with post-tensioned core walls, high-damping seismic isolators, and a double-glazed architectural glass facade designed to withstand Category 5 wind shear.",
    highlights: ["48 Stories with 3 Sub-Level Basements", "Zero Lost-Time Injuries Across 1.2M Man-Hours", "Integrated 1.5MW Rooftop Solar Envelope"],
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&q=80&w=1200",
    featured: true,
  },
  {
    id: "metro-viaduct",
    title: "Metropolitan Arterial Elevated Highway & Viaduct",
    category: "civil",
    categoryLabel: "Civil & Infrastructure",
    location: "Northern Transit Corridor",
    client: "State Department of Transportation",
    completionYear: "2024",
    squareFootage: "14.2 km Dual Viaduct",
    budget: "$240M",
    description: "Heavy civil infrastructure comprising 14.2 km of continuous pre-cast segmental box girders, seismic elastomeric bearings, and deep bored pile foundations through active riverbed silt.",
    highlights: ["120 Pre-Cast Spans Erected via Launching Gantry", "Continuous Real-Time Drone LiDAR Monitoring", "Completed 60 Days Ahead of Highway Commission Schedule"],
    imageUrl: "https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&q=80&w=1200",
    featured: true,
  },
  {
    id: "vanguard-logistics",
    title: "Vanguard Automated High-Bay Logistics Fulfillment Hub",
    category: "industrial",
    categoryLabel: "Industrial & Logistics",
    location: "Interstate Freight Park",
    client: "Global Logistics Holdings",
    completionYear: "2025",
    squareFootage: "650,000 sq.ft",
    budget: "$78M",
    description: "Turnkey design-build of a 36-meter high-bay automated warehouse featuring super-flat jointless floor slabs (FM2 tolerance), 48 automated dock levellers, and heavy duty industrial staging aprons.",
    highlights: ["Super-Flat Industrial Laser-Screed Slabs", "Heavy-Duty Pre-Engineered Steel Framing", "Accommodates 45,000 Automated Pallet Positions"],
    imageUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1200",
    featured: true,
  },
  {
    id: "eco-campus",
    title: "Cascade Bio-Research Innovation Campus",
    category: "sustainable",
    categoryLabel: "Sustainable Green Building",
    location: "Innovation Tech Corridor",
    client: "BioTech Research Consortium",
    completionYear: "2024",
    squareFootage: "420,000 sq.ft",
    budget: "$112M",
    description: "Mass-timber hybrid construction with low-carbon geopolymer concrete foundations, rainwater catchment harvesting, and high-efficiency geothermal HVAC systems targeting Net-Zero operational carbon.",
    highlights: ["LEED Platinum & WELL Certified Gold", "70% Embodied Carbon Reduction via Geopolymer Mixes", "Engineered Cross-Laminated Timber (CLT) Core"],
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
    featured: false,
  },
  {
    id: "grand-bridge",
    title: "St. Jude Cable-Stayed Transit Bridge",
    category: "civil",
    categoryLabel: "Civil & Infrastructure",
    location: "Bay Crossing Interstate",
    client: "Regional Port & Harbor Authority",
    completionYear: "2023",
    squareFootage: "1.8 km Main Span",
    budget: "$195M",
    description: "Twin 135-meter concrete pylon towers supporting high-tensile stay cables with multi-lane vehicular, pedestrian, and light rail transit decks over deep tidal waters.",
    highlights: ["Deep Caisson Foundation Sunk 42m Sub-Sea", "Aerodynamic Wind-Tunnel Tested Deck Fairings", "100-Year Structural Design Life Guarantee"],
    imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200",
    featured: false,
  },
  {
    id: "summit-towers",
    title: "The Summit Luxury Residential High-Rise",
    category: "commercial",
    categoryLabel: "Commercial & High-Rise",
    location: "Metro Skyline Boulevard",
    client: "Prestige Urban Developments",
    completionYear: "2025",
    squareFootage: "580,000 sq.ft",
    budget: "$92M",
    description: "Two 34-story architectural residential towers featuring cantilevered balconies, structural post-tension floor plates, infinity rooftop pool, and multi-tier underground parking.",
    highlights: ["34 Stories with 280 Premium Residences", "Advanced Acoustic Floor & Wall Decoupling", "Automated Seismic Shutoff Safety Systems"],
    imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1200",
    featured: false,
  },
];

const CATEGORIES = [
  { id: "all", label: "All Projects" },
  { id: "commercial", label: "Commercial High-Rise" },
  { id: "civil", label: "Civil Infrastructure" },
  { id: "industrial", label: "Industrial & Logistics" },
  { id: "sustainable", label: "Green & Sustainable" },
];

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filteredProjects = selectedCategory === "all"
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === selectedCategory);

  return (
    <>
      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white overflow-hidden">
        {/* Subtle orange ambient glow */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#f9731615_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none opacity-40" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary font-bold text-xs uppercase tracking-widest mb-6">
              <HardHat size={15} /> Built to Last Generations
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Featured Infrastructure & <br className="hidden sm:inline" />
              <span className="text-primary">Commercial Portfolio</span>
            </h1>
            <p className="mt-6 text-neutral-300 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
              Explore our landmark projects across high-rise commercial developments, heavy civil highway viaducts, automated logistics hubs, and sustainable green structures.
            </p>
          </motion.div>

          {/* Quick Metrics Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-neutral-800"
          >
            <div>
              <div className="font-display text-3xl font-extrabold text-primary">$850M+</div>
              <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider font-semibold">Total Delivered Value</div>
            </div>
            <div>
              <div className="font-display text-3xl font-extrabold text-white">4.5M+</div>
              <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider font-semibold">Square Feet Built</div>
            </div>
            <div>
              <div className="font-display text-3xl font-extrabold text-primary">100%</div>
              <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider font-semibold">Safety Compliance</div>
            </div>
            <div>
              <div className="font-display text-3xl font-extrabold text-white">98.4%</div>
              <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider font-semibold">On-Time Delivery</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Portfolio Grid */}
      <section className="py-20 md:py-28 bg-white relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Category Filter Tabs with Microanimations */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14">
            {CATEGORIES.map((tab) => {
              const active = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
                    active
                      ? "bg-primary text-white shadow-lg shadow-primary/30 scale-105"
                      : "bg-orange-50 text-foreground/75 hover:bg-orange-100 hover:text-primary border border-orange-100"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Projects Grid */}
          <motion.div 
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredProjects.map((project, i) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="group rounded-3xl bg-white border-2 border-orange-100 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary/15 hover:border-primary/40 transition-all duration-500 hover:-translate-y-2 flex flex-col"
                >
                  {/* Image Container with Zoom & Badge */}
                  <div className="relative h-64 overflow-hidden bg-neutral-900">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    <span className="absolute top-4 left-4 bg-primary text-white text-[10px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-md">
                      {project.categoryLabel}
                    </span>

                    <span className="absolute bottom-4 left-4 flex items-center gap-1.5 text-xs text-white/90 font-medium">
                      <MapPin size={13} className="text-primary shrink-0" />
                      {project.location}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="p-7 flex flex-col flex-1">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-3 font-semibold">
                      <span>Client: {project.client}</span>
                      <span className="text-primary font-bold">{project.completionYear}</span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-snug mb-3">
                      {project.title}
                    </h3>

                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-6 flex-1">
                      {project.description}
                    </p>

                    {/* Spec Highlights Pill */}
                    <div className="pt-4 border-t border-orange-100 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-muted-foreground block text-[10px] uppercase font-bold">Scale</span>
                        <span className="font-bold text-foreground">{project.squareFootage}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-muted-foreground block text-[10px] uppercase font-bold">Capital Value</span>
                        <span className="font-bold text-primary">{project.budget}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedProject(project)}
                      className="mt-6 w-full py-3 rounded-2xl bg-orange-50 hover:bg-primary hover:text-white text-primary text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                    >
                      <span>View Specifications</span>
                      <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 shadow-2xl relative border-2 border-primary/20"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-colors"
              >
                ✕
              </button>

              <span className="text-xs font-black uppercase tracking-widest text-primary bg-primary/10 px-3.5 py-1 rounded-full">
                {selectedProject.categoryLabel}
              </span>

              <h2 className="font-display text-2xl md:text-3xl font-extrabold text-foreground mt-4 mb-2">
                {selectedProject.title}
              </h2>

              <p className="text-xs text-muted-foreground flex items-center gap-2 mb-6 font-medium">
                <MapPin size={13} className="text-primary" /> {selectedProject.location} • Completed {selectedProject.completionYear}
              </p>

              <div className="rounded-2xl overflow-hidden h-64 mb-6">
                <img src={selectedProject.imageUrl} alt={selectedProject.title} className="w-full h-full object-cover" />
              </div>

              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-orange-50/70 border border-orange-100 mb-6 text-center">
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase font-bold">Client</div>
                  <div className="font-bold text-foreground text-xs md:text-sm mt-0.5">{selectedProject.client}</div>
                </div>
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase font-bold">Dimensions / Area</div>
                  <div className="font-bold text-foreground text-xs md:text-sm mt-0.5">{selectedProject.squareFootage}</div>
                </div>
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase font-bold">Estimated Cost</div>
                  <div className="font-bold text-primary text-xs md:text-sm mt-0.5">{selectedProject.budget}</div>
                </div>
              </div>

              <h4 className="font-display font-bold text-foreground mb-2">Engineering Scope & Deliverables</h4>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {selectedProject.description}
              </p>

              <h4 className="font-display font-bold text-foreground mb-3">Key Structural Highlights</h4>
              <div className="space-y-2 mb-8">
                {selectedProject.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-foreground">
                    <CheckCircle2 size={16} className="text-primary shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <Link
                  to="/contact"
                  onClick={() => setSelectedProject(null)}
                  className="flex-1 py-3.5 rounded-2xl bg-primary text-white font-bold text-center text-sm shadow-lg shadow-primary/25 hover:bg-primary/95 transition-all"
                >
                  Inquire on Similar Project Scope
                </Link>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-6 py-3.5 rounded-2xl bg-secondary text-foreground font-bold text-sm hover:bg-secondary/80 transition-all"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <PreFooterCTA />
    </>
  );
};

export default Portfolio;
