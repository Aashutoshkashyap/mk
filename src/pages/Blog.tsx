import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock, User, HardHat, Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import PreFooterCTA from "@/components/PreFooterCTA";
import { useSectionVisibility } from "@/hooks/useSectionVisibility";

export const defaultConstructionArticles = [
  {
    id: "b1",
    slug: "seismic-resilient-high-rise-engineering",
    title: "Seismic-Resilient Architecture: Innovations in High-Rise Structural Damping",
    category: "Structural Engineering",
    excerpt: "Exploring how tuned mass dampers and post-tensioned steel core walls allow modern commercial towers to withstand severe lateral earthquake accelerations without structural compromise.",
    content: "Modern high-rise commercial structures face unprecedented engineering demands: increasing architectural heights coupled with stringent seismic and aerodynamic performance criteria.\n\nAt MK BuildCraft, our structural engineering division integrates advanced seismic damping assemblies directly into the tower core during slipform casting. By implementing tuned liquid column dampers (TLCD) and viscoelastic shear braces, horizontal drift ratios are reduced by up to 45% during intense seismic events.\n\nIn our recent 48-story Apex Horizon project, 5D finite element modeling predicted resonance nodes before physical groundbreaking. The resulting structure achieves full compliance with Seismic Performance Category E while preserving open floor plates and maximizing rentable tenant area.",
    thumbnail_url: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&q=80&w=1200",
    author: "Marcus Vance, PE, SE",
    published_at: "2026-08-15",
    read_time: "6 min read",
    views: 1420,
    is_featured: true,
  },
  {
    id: "b2",
    slug: "5d-bim-drone-topography-construction",
    title: "How 5D BIM and Drone Topography Cut Heavy Infrastructure Delays by 35%",
    category: "Virtual Design (VDC)",
    excerpt: "A deep-dive into how reality-capture drone photogrammetry and algorithmic schedule clash detection safeguard mega-project delivery schedules and eliminate rework.",
    content: "On multi-year heavy civil infrastructure projects, spatial deviations of even a few centimeters can ripple across months of subcontractor scheduling.\n\nBy integrating autonomous RTK drone survey flights with our centralized 5D BIM environment, our field teams capture sub-centimeter volumetric point clouds every 48 hours. Earthwork excavation volumes, rebar cage alignments, and pre-cast concrete beam seatings are verified automatically against the structural digital twin.\n\nOn the Metropolitan Arterial Viaduct, algorithmic clash detection identified 142 mechanical and structural interferences prior to concrete pouring, generating verified savings exceeding $3.8M in avoided field rework.",
    thumbnail_url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1200",
    author: "Elena Rostova, LEED AP",
    published_at: "2026-09-02",
    read_time: "5 min read",
    views: 980,
    is_featured: false,
  },
  {
    id: "b3",
    slug: "decarbonizing-concrete-leed-infrastructure",
    title: "The Decarbonization of Mega-Structures: Low-Carbon Geopolymer Cements",
    category: "Sustainable Materials",
    excerpt: "Replacing traditional Portland cement with industrial slag and fly-ash geopolymer binders to lower embodied carbon while accelerating high early compressive strength.",
    content: "Concrete accounts for roughly 8% of worldwide greenhouse gas emissions, making binder innovation the primary lever for delivering true net-zero commercial infrastructure.\n\nMK BuildCraft's materials laboratory has developed site-ready geopolymer formulations replacing up to 70% of Ordinary Portland Cement with granulated blast-furnace slag (GGBS) and pulverized fly ash. These formulations not only reduce embodied carbon by 65%, but also deliver superior sulfate and chloride resistance for sub-grade foundations.\n\nApplied across the Cascade Bio-Research Campus, the structure attained LEED Platinum status while achieving 6,000 PSI compressive strength at 14 days, outpacing traditional hydration curves.",
    thumbnail_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
    author: "Dr. Alistair Chen, PhD",
    published_at: "2026-09-20",
    read_time: "7 min read",
    views: 1150,
    is_featured: false,
  },
  {
    id: "b4",
    slug: "deep-caisson-shoring-urban-foundations",
    title: "Deep Caisson Shoring: Navigating High Water Tables in Urban Foundations",
    category: "Geotechnical Engineering",
    excerpt: "Secant pile walls, slurry diaphragm systems, and jet grouting methodologies engineered for subterranean excavations in saturated alluvial soils.",
    content: "Subterranean construction in high-density urban environments presents severe challenges: adjacent heritage structures, vibrating subway tunnels, and pressurized groundwater aquifers.\n\nTo construct 4-story deep basements without inducing ground subsidence, MK employs continuous overlapping secant pile walls combined with pre-stressed ground tiebacks. Real-time piezometer arrays and inclinometers stream continuous telemetry to our geotechnical monitoring dashboard.\n\nThis precision engineering ensures neighboring foundations remain undisturbed while dewatering discharge is treated and redirected in full compliance with municipal environmental codes.",
    thumbnail_url: "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&q=80&w=1200",
    author: "Marcus Vance, PE, SE",
    published_at: "2026-07-28",
    read_time: "8 min read",
    views: 890,
    is_featured: false,
  },
  {
    id: "b5",
    slug: "zero-harm-safety-heavy-equipment-fleet",
    title: "Zero-Harm Jobsite Governance: Telemetry & Safety Systems in Heavy Fleet",
    category: "Health & Safety",
    excerpt: "How automated radar blind-spot telemetry, smart crane load monitors, and mandatory stop-work culture ensure zero lost-time injuries across millions of man-hours.",
    content: "In heavy civil engineering, safety is not an operational afterthought—it is the foundational prerequisite of high productivity.\n\nOur captive fleet of 1,200 heavy equipment units is outfitted with 360-degree ultrasonic proximity sensors, operator fatigue cameras, and digital load moment indicators that automatically restrict crane swings during adverse wind shears.\n\nCombined with daily Job Safety Analysis (JSA) briefings and unconditional stop-work authority for every crew member, MK has logged over 2.4 million consecutive safe man-hours with a 0.00 lost-time incident rate.",
    thumbnail_url: "https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&q=80&w=1200",
    author: "David K. O'Connor, CSP",
    published_at: "2026-08-10",
    read_time: "5 min read",
    views: 740,
    is_featured: false,
  },
  {
    id: "b6",
    slug: "superflat-floor-tolerances-logistics-robotics",
    title: "Super-Flat Floor Tolerances: Laser Screed Engineering for High-Bay Automation",
    category: "Industrial Engineering",
    excerpt: "Executing FM2 and Superflat concrete slab specifications to empower high-speed automated guided vehicles (AGVs) and 40-meter automated warehouse racking.",
    content: "The exponential growth of robotic logistics hubs has transformed industrial concrete flooring from a simple wearing surface into a high-precision structural component.\n\nWhen Automated Guided Vehicles (AGVs) and narrow-aisle turret trucks travel at high speeds between 40-meter racks, floor deviations of mere millimeters cause unacceptable mast sway and robotic sensor stalls.\n\nMK deploys multi-axis 3D laser-guided screeds and specialized dry-shake metallic hardeners to pour continuous, jointless slabs meeting stringent FM1/FM2 tolerances and high abrasion resistance standards.",
    thumbnail_url: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1200",
    author: "David K. O'Connor, CSP",
    published_at: "2026-09-12",
    read_time: "6 min read",
    views: 810,
    is_featured: false,
  },
];

const CATEGORIES = [
  "All Disciplines",
  "Structural Engineering",
  "Virtual Design (VDC)",
  "Sustainable Materials",
  "Geotechnical Engineering",
  "Health & Safety",
  "Industrial Engineering",
];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Disciplines");
  const [searchQuery, setSearchQuery] = useState("");
  const { isVisible } = useSectionVisibility();

  const { data: dbPosts = [] } = useQuery({
    queryKey: ["blog-posts-all"],
    queryFn: async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("is_published", true)
        .order("published_at", { ascending: false });
      return data || [];
    },
  });

  const allPosts = dbPosts.length > 0 ? dbPosts : defaultConstructionArticles;

  const filteredPosts = allPosts.filter((post: any) => {
    const matchesCategory =
      selectedCategory === "All Disciplines" || post.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featured = filteredPosts.find((p: any) => p.is_featured) || filteredPosts[0];
  const gridPosts = filteredPosts.filter((p: any) => p.id !== featured?.id);

  return (
    <>
      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white overflow-hidden">
        <div className="absolute top-10 right-10 w-96 h-96 bg-primary/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#f9731615_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none opacity-40" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary font-bold text-xs uppercase tracking-widest mb-6">
              <HardHat size={15} /> Technical Bulletins & Field Reports
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Engineering Insights & <br className="hidden sm:inline" />
              <span className="text-primary">Construction Knowledge</span>
            </h1>
            <p className="mt-6 text-neutral-300 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
              Explore in-depth engineering case studies, 5D BIM methodologies, low-carbon geopolymer advances, and field-tested safety protocols from our master builders.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="py-10 bg-white border-b border-orange-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Category tabs */}
            <div className="flex flex-wrap items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 whitespace-nowrap ${
                    selectedCategory === cat
                      ? "bg-primary text-white shadow-md shadow-primary/25"
                      : "bg-orange-50 text-foreground/80 hover:bg-orange-100 hover:text-primary border border-orange-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search technical reports..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full border-2 border-orange-100 bg-orange-50/40 text-xs font-medium focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white via-orange-50/15 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Featured Article */}
          {featured && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl bg-white border-2 border-orange-100 overflow-hidden shadow-xl shadow-primary/5 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 mb-16"
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <Link to={`/blog/${featured.slug}`} className="h-72 md:h-full relative overflow-hidden group block">
                  <img
                    src={featured.thumbnail_url || "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&q=80&w=1200"}
                    alt={featured.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute top-4 left-4 bg-primary text-white text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-md">
                    Featured Case Study
                  </span>
                </Link>

                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <span className="text-xs font-bold text-primary uppercase tracking-wider mb-2">
                    {featured.category}
                  </span>
                  <Link to={`/blog/${featured.slug}`}>
                    <h2 className="font-display text-2xl md:text-3xl font-extrabold text-foreground hover:text-primary transition-colors leading-tight mb-4">
                      {featured.title}
                    </h2>
                  </Link>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-6">
                    {featured.excerpt}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-8">
                    {featured.author && (
                      <span className="flex items-center gap-1 font-semibold text-foreground">
                        <User size={13} className="text-primary" /> {featured.author}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar size={13} className="text-primary" />
                      {featured.published_at ? new Date(featured.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Recent"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={13} className="text-primary" /> {featured.read_time || "6 min read"}
                    </span>
                  </div>
                  <div>
                    <Link
                      to={`/blog/${featured.slug}`}
                      className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-md shadow-primary/25 hover:bg-primary/95 transition-all"
                    >
                      Read Technical Article <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Grid of Other Articles */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gridPosts.map((post: any, i: number) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group flex flex-col bg-white rounded-3xl border-2 border-orange-100 overflow-hidden hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-1.5"
              >
                <Link to={`/blog/${post.slug}`} className="block h-52 relative overflow-hidden">
                  <img
                    src={post.thumbnail_url || "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&q=80&w=800"}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  <span className="absolute bottom-4 left-4 bg-primary text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                    {post.category}
                  </span>
                </Link>

                <div className="p-7 flex flex-col flex-1">
                  <div className="flex items-center justify-between text-[11px] font-bold text-muted-foreground uppercase mb-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={13} className="text-primary" />
                      {post.published_at ? new Date(post.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Recent"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} className="text-primary" /> {post.read_time || "5 min read"}
                    </span>
                  </div>

                  <Link to={`/blog/${post.slug}`}>
                    <h3 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug mb-3">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed mb-6 flex-1">
                    {post.excerpt}
                  </p>

                  <div className="pt-4 border-t border-orange-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-foreground/80 flex items-center gap-1">
                      <User size={13} className="text-primary" /> {post.author ? post.author.split(",")[0] : "MK Engineering"}
                    </span>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="text-xs font-bold text-primary group-hover:translate-x-1 transition-transform flex items-center gap-1"
                    >
                      Read Full <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20 bg-orange-50/50 rounded-3xl border border-orange-100">
              <HardHat size={48} className="mx-auto text-primary/40 mb-4" />
              <h3 className="font-display text-xl font-bold text-foreground">No reports match your filter</h3>
              <p className="text-sm text-muted-foreground mt-2">Try clearing your search query or selecting "All Disciplines".</p>
              <button
                onClick={() => { setSelectedCategory("All Disciplines"); setSearchQuery(""); }}
                className="mt-6 px-6 py-2.5 rounded-full bg-primary text-white text-xs font-bold shadow-md shadow-primary/25"
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>
      </section>

      <PreFooterCTA />
    </>
  );
};

export default Blog;
