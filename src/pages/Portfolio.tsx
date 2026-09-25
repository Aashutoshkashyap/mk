import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Building2, Truck, Waves, Compass, Droplets, Zap, MapPin, Calendar, 
  ArrowRight, Filter, Ruler, CheckCircle2, HardHat, X 
} from "lucide-react";
import PreFooterCTA from "@/components/PreFooterCTA";

export interface ProjectItem {
  id: string;
  title: string;
  category: "roads" | "bridges" | "river" | "buildings" | "hydropower" | "water";
  categoryLabel: string;
  location: string;
  client: string;
  completionYear: string;
  scaleMetric: string;
  budget: string;
  description: string;
  highlights: string[];
  imageUrl: string;
  featured?: boolean;
}

const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "saptakoshi-bridge",
    title: "Saptakoshi River Bridge & Approach Road",
    category: "bridges",
    categoryLabel: "Bridges & Structures",
    location: "Province 1 (Koshi)",
    client: "Department of Roads, GoN",
    completionYear: "2024",
    scaleMetric: "12 Spans (840m Total Deck)",
    budget: "₨ 2.4 Billion",
    description: "Multi-span pre-stressed concrete girder bridge crossing the Saptakoshi river with deep pneumatic caisson foundations, high-flow monsoon scour protection, and 4 km access highway approaches.",
    highlights: ["12 Pre-Stressed Spans with Pneumatic Well Foundations", "Engineered for 100-Year Peak Flood Discharge", "Self-performed with captive cranes and batching plants"],
    imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200",
    featured: true,
  },
  {
    id: "mid-hill-highway",
    title: "Mid-Hill Highway Pkg 7 Mountain Alignment",
    category: "roads",
    categoryLabel: "Roads & Highways",
    location: "Karnali Province",
    client: "Mid-Hill Highway Project Directorate",
    completionYear: "2023",
    scaleMetric: "42 km Mountain Corridor",
    budget: "₨ 1.9 Billion",
    description: "42 km high-altitude highway expansion through steep mountain terrain. Executed heavy rock excavation, reinforced breast and retaining walls, bio-engineering slope stabilization, and double-coat DBST pavement.",
    highlights: ["42 km Mountain Alignment with 120+ Culverts", "Extensive Gabion & RCC Retaining Walls", "Completed Ahead of DOR Monsoon Moratorium"],
    imageUrl: "https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&q=80&w=1200",
    featured: true,
  },
  {
    id: "bagmati-river-training",
    title: "Bagmati River Training & Embankment Works",
    category: "river",
    categoryLabel: "River Training",
    location: "Bagmati Province",
    client: "Department of Water Resources & Irrigation",
    completionYear: "2024",
    scaleMetric: "18 km Guided Embankment",
    budget: "₨ 1.2 Billion",
    description: "Critical flood mitigation infrastructure along 18 km of the Bagmati river corridor. Executed continuous RCC flood retaining walls, armored rip-rap boulder pitching, and guided flow spurs.",
    highlights: ["18 km Flood Protection Dyke & RCC Spurs", "Mitigates Severe Monsoon Flood Surge for 80,000 Residents", "Armor Rock Sourced & Transported via Captive Fleet"],
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&q=80&w=1200",
    featured: true,
  },
  {
    id: "provincial-hq-complex",
    title: "Provincial Administrative Secretariat Complex",
    category: "buildings",
    categoryLabel: "Buildings & Institutional",
    location: "Lumbini Province",
    client: "Ministry of Physical Infrastructure, Lumbini",
    completionYear: "2025",
    scaleMetric: "380,000 sq.ft Built Area",
    budget: "₨ 980 Million",
    description: "Turnkey institutional civic complex built in strict compliance with the Nepal National Building Code (NBC 105:2020) seismic provisions. Includes ministry secretariat blocks, assembly hall, and underground parking.",
    highlights: ["Ductile Seismic Framing to NBC Standards", "Integrated Solar Photovoltaic Net-Zero System", "Complete Turnkey MEP Coordination & Finishings"],
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
    featured: true,
  },
  {
    id: "upper-trishuli-civil",
    title: "Upper Trishuli Run-of-River Civil Package",
    category: "hydropower",
    categoryLabel: "Hydropower Civil",
    location: "Bagmati Province",
    client: "Nepal Electricity Authority (NEA) Consortium",
    completionYear: "2024",
    scaleMetric: "3.8 km Tunnel & Powerhouse",
    budget: "₨ 3.1 Billion",
    description: "Civil execution of concrete diversion weir, de-sanding gravel basin, 3.8 km headrace tunnel excavation, surge tank, and underground powerhouse foundations.",
    highlights: ["3.8 km Drill-and-Blast Headrace Tunnel", "Underground Concrete Anchor Thrust Blocks", "Zero Lost-Time Incidents Across 900,000 Man-Hours"],
    imageUrl: "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&q=80&w=1200",
    featured: false,
  },
  {
    id: "pokhara-water-supply",
    title: "Pokhara Regional Bulk Water Transmission",
    category: "water",
    categoryLabel: "Water & Sanitation",
    location: "Gandaki Province",
    client: "Department of Water Supply & Sewerage Management",
    completionYear: "2025",
    scaleMetric: "65 km Pipeline & 4 Reservoirs",
    budget: "₨ 1.5 Billion",
    description: "Laying 65 km of ductile iron (DI) bulk water transmission mains, construction of 4 overhead RCC service reservoirs, and municipal distribution network.",
    highlights: ["65 km Bulk Transmission Pipeline", "4 RCC Water Reservoirs Built", "Clean Potable Water for 120,000 Residents"],
    imageUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1200",
    featured: false,
  },
  {
    id: "bheri-feeder-road",
    title: "Bheri Valley Feeder Network & Slab Culverts",
    category: "roads",
    categoryLabel: "Roads & Highways",
    location: "Karnali Province",
    client: "Local Infrastructure Development Dept",
    completionYear: "2023",
    scaleMetric: "28 km All-Weather Road",
    budget: "₨ 840 Million",
    description: "Construction of rural feeder connectivity linking remote agricultural valleys to the national transport spine. Over 45 RCC slab culverts and geo-textile drainage channels.",
    highlights: ["45 RCC Box & Pipe Culverts", "Geo-Textile Reinforced Embankments", "Year-Round Freight Passage for Farmers"],
    imageUrl: "https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&q=80&w=1200",
    featured: false,
  },
  {
    id: "mugling-overpass",
    title: "Mugling Junction RCC Grade Separator",
    category: "bridges",
    categoryLabel: "Bridges & Structures",
    location: "Bagmati Province",
    client: "Department of Roads (DOR)",
    completionYear: "2023",
    scaleMetric: "320m Elevated Viaduct",
    budget: "₨ 720 Million",
    description: "Elevated RCC flyover decoupling heavy transit freight from local urban traffic at Nepal's busiest commercial transit junction.",
    highlights: ["Pre-Stressed Box Girders Erected Over Live Traffic", "High-Early-Strength Micro-Silica Concrete Mixes", "Reduced Congestion Delays by 70%"],
    imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1200",
    featured: false,
  },
  {
    id: "kankai-dyke",
    title: "Kankai Basin River Spur & Dyke Protection",
    category: "river",
    categoryLabel: "River Training",
    location: "Province 1 (Jhapa)",
    client: "People's Embankment Program",
    completionYear: "2024",
    scaleMetric: "12 km River Embankment",
    budget: "₨ 610 Million",
    description: "Erection of 32 heavy permeable spurs and 12 km of geo-bag reinforced flood dykes along the flood-prone Kankai river corridor.",
    highlights: ["32 Heavy Concrete & Gabion Spurs", "Geo-synthetic Filter Fabrics & Rip-Rap Armor", "Prevented Monsoon Inundation Across 4,000 Hectares"],
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&q=80&w=1200",
    featured: false,
  },
  {
    id: "trauma-hospital-wing",
    title: "Regional Trauma & Emergency Medical Facility",
    category: "buildings",
    categoryLabel: "Buildings & Institutional",
    location: "Bagmati Province",
    client: "Ministry of Health and Population",
    completionYear: "2024",
    scaleMetric: "185,000 sq.ft Hospital Wing",
    budget: "₨ 1.1 Billion",
    description: "Multistory specialized medical facility featuring lead-lined radiation diagnostic suites, 6 positive-pressure modular operating theaters, and medical gas pipeline networks.",
    highlights: ["Seismic Base-Isolation Bearing Detailing", "Automated Emergency Power Substation", "Delivered 45 Days Ahead of Government Target"],
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1200",
    featured: false,
  },
  {
    id: "dharan-reservoirs",
    title: "Dharan Deep Wells & Water Reservoirs",
    category: "water",
    categoryLabel: "Water & Sanitation",
    location: "Province 1 (Sunsari)",
    client: "Nepal Water Supply Corporation",
    completionYear: "2023",
    scaleMetric: "4 Deep Tubewells & 2M Liter Tanks",
    budget: "₨ 530 Million",
    description: "Drilling high-discharge deep aquifer tubewells, centrifugal pump houses, and high-capacity elevated RCC water towers with automated chlorination.",
    highlights: ["Automated Chlorination & Filtration", "High-Volume Aquifer Discharge Testing", "Direct Supply to 85,000 Urban Households"],
    imageUrl: "https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&q=80&w=1200",
    featured: false,
  },
  {
    id: "chameliya-headworks",
    title: "Chameliya Auxiliary Headworks Rehabilitation",
    category: "hydropower",
    categoryLabel: "Hydropower Civil",
    location: "Sudurpashchim Province",
    client: "Nepal Electricity Authority",
    completionYear: "2024",
    scaleMetric: "Intake Weir & Scour Sluice",
    budget: "₨ 890 Million",
    description: "Hydraulic desilting basin expansion, reinforced overflow spillway repair, and boulder protection works in remote Far-Western mountainous terrain.",
    highlights: ["Heavy Geotechnical Micro-Piling & Grouting", "High-Density Abrasion-Resistant Silica Fume Concrete", "Executed Under Challenging Extreme Weather Windows"],
    imageUrl: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=1200",
    featured: false,
  },
];

const CATEGORIES = [
  { id: "all", label: "All Works" },
  { id: "roads", label: "Roads & Highways" },
  { id: "bridges", label: "Bridges" },
  { id: "river", label: "River Training" },
  { id: "buildings", label: "Buildings" },
  { id: "hydropower", label: "Hydropower" },
  { id: "water", label: "Water & Sanitation" },
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
              <HardHat size={15} /> Class-A Licensed Infrastructure Contractor
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Project Portfolio & <br className="hidden sm:inline" />
              <span className="text-primary">National Works Executed</span>
            </h1>
            <p className="mt-6 text-neutral-300 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
              Explore our landmark contracts delivered across 32 districts of Nepal—spanning national highways, high-span river crossings, hydraulic river training, civic complexes, and hydropower civil works.
            </p>
          </motion.div>

          {/* Key Metrics Bar from Markdown */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-neutral-800"
          >
            <div>
              <div className="font-display text-3xl font-extrabold text-primary">120+</div>
              <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider font-semibold">Projects Delivered</div>
            </div>
            <div>
              <div className="font-display text-3xl font-extrabold text-white">₨ 18B</div>
              <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider font-semibold">Works Executed</div>
            </div>
            <div>
              <div className="font-display text-3xl font-extrabold text-primary">850+</div>
              <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider font-semibold">Engineers & Crew</div>
            </div>
            <div>
              <div className="font-display text-3xl font-extrabold text-white">32</div>
              <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider font-semibold">Districts Reached</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Portfolio Grid */}
      <section className="py-16 md:py-24 bg-white relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12 overflow-x-auto pb-2">
            {CATEGORIES.map((tab) => {
              const active = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 whitespace-nowrap ${
                    active
                      ? "bg-primary text-white shadow-lg shadow-primary/30 scale-105"
                      : "bg-orange-50 text-foreground/80 hover:bg-orange-100 hover:text-primary border border-orange-100"
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
                  <div className="relative h-60 overflow-hidden bg-neutral-900">
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
                      <span className="truncate max-w-[180px]">Client: {project.client.split(',')[0]}</span>
                      <span className="text-primary font-bold shrink-0">{project.completionYear}</span>
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
                        <span className="text-muted-foreground block text-[10px] uppercase font-bold">Scope / Scale</span>
                        <span className="font-bold text-foreground truncate max-w-[140px] block">{project.scaleMetric}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-muted-foreground block text-[10px] uppercase font-bold">Contract Value</span>
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
                className="absolute top-6 right-6 p-2 rounded-full bg-orange-50 hover:bg-orange-100 text-foreground transition-all"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              <div className="h-64 rounded-2xl overflow-hidden mb-6 relative">
                <img
                  src={selectedProject.imageUrl}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 bg-primary text-white text-xs font-black uppercase px-3 py-1 rounded-full">
                  {selectedProject.categoryLabel}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs text-muted-foreground font-semibold mb-2">
                <span>{selectedProject.location}</span>
                <span>•</span>
                <span>Delivered {selectedProject.completionYear}</span>
              </div>

              <h2 className="font-display text-2xl font-bold text-foreground mb-3">
                {selectedProject.title}
              </h2>

              <p className="text-muted-foreground leading-relaxed text-sm mb-6">
                {selectedProject.description}
              </p>

              <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-orange-50/70 border border-orange-100 mb-6">
                <div>
                  <div className="text-[10px] uppercase font-bold text-muted-foreground">Contracting Client</div>
                  <div className="text-sm font-bold text-foreground">{selectedProject.client}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-muted-foreground">Executed Contract Value</div>
                  <div className="text-sm font-bold text-primary">{selectedProject.budget}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-muted-foreground">Scope / Measurement</div>
                  <div className="text-sm font-bold text-foreground">{selectedProject.scaleMetric}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-muted-foreground">Contractor Classification</div>
                  <div className="text-sm font-bold text-foreground">Class-A Licensed Lead EPC</div>
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-3">Key Project Highlights</h4>
                <div className="space-y-2">
                  {selectedProject.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-semibold text-foreground/80">
                      <CheckCircle2 size={15} className="text-primary shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-orange-100">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2.5 rounded-full border border-orange-200 text-xs font-bold text-muted-foreground hover:bg-orange-50 transition-all"
                >
                  Close
                </button>
                <Link
                  to="/contact"
                  className="px-6 py-2.5 rounded-full bg-primary text-white text-xs font-bold shadow-md shadow-primary/25 hover:bg-primary/90 transition-all"
                >
                  Inquire on Similar Project Scope
                </Link>
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
