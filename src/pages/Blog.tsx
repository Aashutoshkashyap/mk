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
    slug: "saptakoshi-river-bridge-deep-well-pier-milestone",
    title: "Saptakoshi River Bridge: Deep-Well Foundation Pier Milestone Completed Ahead of Monsoon",
    category: "Project Milestones",
    excerpt: "Our heavy bridge engineering division successfully completed all deep-well pier caissons for the Saptakoshi River crossing, beating the critical monsoon flood window by three weeks.",
    content: "Constructing multi-span bridges across Nepal's major perennially flooded rivers requires immaculate seasonal timing and deep hydraulic engineering expertise.\n\nOn the Saptakoshi River Bridge contract (Province 1 · ₨ 2.4B), MK Construction deployed pneumatic well-sinking rigs and bentonite-stabilized excavation techniques to anchor 18 bridge piers into bedrock beneath 22 meters of shifting alluvial silt. Working in round-the-clock winter shifts, our crew placed over 14,000 cubic meters of high-density M35 structural concrete.\n\nAll deep pier caps are now secured above the maximum anticipated 100-year flood line, allowing superstructure pre-stressed girder launching to proceed smoothly without risk of seasonal inundation.",
    thumbnail_url: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&q=80&w=1200",
    author: "Er. Rameshwor Adhikari",
    published_at: "2026-09-18",
    read_time: "5 min read",
    views: 1420,
    is_featured: true,
  },
  {
    id: "b2",
    slug: "mk-construction-awarded-mid-hill-highway-pkg-7",
    title: "MK Construction Awarded Mid-Hill Highway Package 7 Asphalt Paving Contract (₨ 1.9B)",
    category: "Tender Wins",
    excerpt: "The Department of Roads has officially awarded MK Construction Company Pvt. Ltd. the turnkey 48-kilometer double-lane asphalt concrete and slope stabilization contract in Karnali Province.",
    content: "The Ministry of Physical Infrastructure and Transport, Department of Roads (DoR), has formally executed the contract agreement with MK Construction Company Pvt. Ltd. for Mid-Hill Highway Package 7 in Karnali Province.\n\nThe ₨ 1.9B works package encompasses widening the existing alignment to double-lane standards, deep rock cutting in steep mountainous terrain, bio-engineering slope stabilization, reinforced concrete box culverts, and 48 kilometers of asphalt concrete surfacing.\n\nMobilization of our captive CAT excavators, motor graders, and mobile aggregate crushing plants is underway at the site depot.",
    thumbnail_url: "https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&q=80&w=1200",
    author: "Sunita Pradhan",
    published_at: "2026-09-08",
    read_time: "4 min read",
    views: 980,
    is_featured: false,
  },
  {
    id: "b3",
    slug: "bagmati-river-training-12km-embankment-completion",
    title: "Bagmati River Training: 12-Kilometer Flood Mitigation Embankment & Spur Defense Commissioned",
    category: "Project Milestones",
    excerpt: "Deploying high-density gabion mattresses and reinforced concrete spurs, our hydraulic teams successfully fortified 12 kilometers of vulnerable river basin to safeguard surrounding settlements.",
    content: "Monsoon floods regularly devastate agricultural riverbanks and urban settlements across the Terai and inner valleys. On the Bagmati River Training project (₨ 1.2B), MK Construction engineered an integrated flood defense system designed to withstand high hydraulic discharge.\n\nThe project incorporates 12 kilometers of earthen embankment armored with geotextile filter layers, wire-mesh gabion revetments, and RCC deflective spurs that redirect river flow away from vulnerable banks.\n\nIndependent quality testing by the Department of Water Resources confirmed zero scour degradation after initial high-flow stress trials.",
    thumbnail_url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200",
    author: "Er. Rameshwor Adhikari",
    published_at: "2026-08-25",
    read_time: "6 min read",
    views: 1150,
    is_featured: false,
  },
  {
    id: "b4",
    slug: "seismic-resilient-building-nbc-105-2020",
    title: "Implementing NBC 105:2020: Advanced Ductile Detailing for Seismic-Resistant Institutional Buildings",
    category: "Sector Commentary",
    excerpt: "An engineering breakdown of how MK Construction translates Nepal Building Code (NBC 105:2020) seismic requirements into high-ductility shear walls and beam-column junction reinforcement.",
    content: "Nepal is situated in an active seismic subduction zone, making seismic engineering compliance not merely a legal mandate, but a critical life-safety imperative.\n\nUnder Nepal Building Code (NBC 105:2020), seismic coefficients and ductile detailing standards have been substantially heightened. On the Lumbini Provincial HQ Complex (₨ 980M), MK Construction integrated advanced response spectrum analysis into structural modeling, utilizing Fe500D thermo-mechanically treated rebar and closely spaced confinement ties at critical beam-column nodes.\n\nOur on-site QA/QC laboratory verifies 100% of rebar tensile elongation and concrete cube compressive strengths prior to formwork striking.",
    thumbnail_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
    author: "Er. Binod K. Thapa, M.Sc.",
    published_at: "2026-08-12",
    read_time: "7 min read",
    views: 890,
    is_featured: false,
  },
  {
    id: "b5",
    slug: "fleet-expansion-mobile-batching-crushers",
    title: "MK Construction Expands Captive Heavy Fleet with 3 Mobile Batching Plants and 12-Ton Tandem Rollers",
    category: "Company Announcements",
    excerpt: "Strengthening our self-performance capabilities across western Nepal, MK Construction has inducted new mobile computerized wet-mix batching plants and GPS-telemetry compaction rollers.",
    content: "To guarantee schedule certainty and eliminate dependency on third-party suppliers in remote project zones, MK Construction Company Pvt. Ltd. has completed a capital investment expanding our heavy machinery fleet.\n\nThe new additions include three mobile computerized concrete batching plants capable of 120 m³/hr output, four Hamm 12-ton tandem vibratory rollers with continuous density sensors, and six multi-axle tippers.\n\nThis fleet expansion boosts our active equipment inventory to over 500 operational units across 32 districts.",
    thumbnail_url: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1200",
    author: "Er. M.K. Shrestha, PE",
    published_at: "2026-07-29",
    read_time: "4 min read",
    views: 740,
    is_featured: false,
  },
  {
    id: "b6",
    slug: "run-of-river-hydropower-civil-works-challenges",
    title: "Civil Engineering in Steep Himalayan Topography: Excavating Tunnels & Surge Tanks for Hydropower",
    category: "Sector Commentary",
    excerpt: "Insights into rock mass classification (RMR/Q-system), NATM tunneling support, and torrential water diversion strategies executed across high-gradient Nepali river valleys.",
    content: "Developing run-of-river hydropower civil infrastructure in the Himalayas demands mastery over fragile geology, high hydraulic heads, and flash-flood risks.\n\nOn the Upper Trishuli Run-of-River civil package (₨ 3.1B), MK Construction's tunneling teams executed drill-and-blast excavation supported by fiber-reinforced shotcrete, lattice girders, and self-drilling rock anchors.\n\nBy continuously monitoring rock convergence with optical 3D targets, our engineers adjusted primary support classes dynamically, achieving zero collapse incidents across 3.4 kilometers of headrace tunnel.",
    thumbnail_url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1200",
    author: "Er. Binod K. Thapa, M.Sc.",
    published_at: "2026-07-15",
    read_time: "8 min read",
    views: 810,
    is_featured: false,
  },
];

const CATEGORIES = [
  "All Updates",
  "Project Milestones",
  "Tender Wins",
  "Company Announcements",
  "Sector Commentary",
];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Updates");
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
      selectedCategory === "All Updates" || post.category === selectedCategory;
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
              <HardHat size={15} /> Company Milestones · Tender Wins · Sector Commentary
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
              News & Insights — <br className="hidden sm:inline" />
              <span className="text-primary">MK Construction Company</span>
            </h1>
            <p className="mt-6 text-neutral-300 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
              Stay informed on our latest bridge breakthroughs, national highway paving packages, flood mitigation completions, and engineering updates across Nepal.
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
