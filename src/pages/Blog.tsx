import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock, User, HardHat, Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import PreFooterCTA from "@/components/PreFooterCTA";
import { useSectionVisibility } from "@/hooks/useSectionVisibility";
import { defaultConstructionArticles } from "@/lib/blogData";
import { filterOutLegacyFinancial } from "@/lib/contentFilter";


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

  const validPosts = filterOutLegacyFinancial(dbPosts);
  const allPosts = validPosts.length > 0 ? validPosts : defaultConstructionArticles;

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
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-red-700/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#f9731615_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none opacity-40" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-transparent border border-[#888A8C] text-[#888A8C] font-bold text-xs uppercase tracking-widest mb-6">
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
      <section className="py-10 bg-white border-b border-[#888A8C]/30">
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
                      ? "bg-[#888A8C] text-white shadow-md shadow-black/10"
                      : "bg-transparent text-foreground/80 hover:bg-[#888A8C]/10 hover:text-[#24272A] border border-[#888A8C]/30"
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
                className="w-full pl-10 pr-4 py-2.5 rounded-full border-2 border-[#888A8C]/30 bg-neutral-50/60 text-xs font-medium focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white via-red-50/15 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Featured Article */}
          {featured && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl bg-white border-2 border-[#888A8C]/30 overflow-hidden shadow-xl shadow-primary/5 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 mb-16"
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <Link to={`/blog/${featured.slug}`} className="h-72 md:h-full relative overflow-hidden group block">
                  <img
                    src={featured.thumbnail_url || "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&q=80&w=1200"}
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
                className="group flex flex-col bg-white rounded-3xl border-2 border-[#888A8C]/30 overflow-hidden hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-1.5"
              >
                <Link to={`/blog/${post.slug}`} className="block h-52 relative overflow-hidden">
                  <img
                    src={post.thumbnail_url || "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&q=80&w=800"}
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

                  <div className="pt-4 border-t border-[#888A8C]/30 flex items-center justify-between">
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
            <div className="text-center py-20 bg-neutral-50/60 rounded-3xl border border-[#888A8C]/30">
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
