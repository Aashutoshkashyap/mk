import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Eye } from "lucide-react";

const defaultPosts = [
  {
    id: "b1",
    slug: "seismic-resilient-high-rise-engineering",
    title: "Seismic-Resilient Architecture: Innovations in High-Rise Structural Damping",
    category: "Structural Engineering",
    excerpt: "Exploring how tuned mass dampers and post-tensioned steel core walls allow modern commercial towers to withstand severe lateral earthquake accelerations without structural compromise.",
    thumbnail_url: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&q=80&w=800",
    published_at: "2026-08-15",
  },
  {
    id: "b2",
    slug: "5d-bim-drone-topography-construction",
    title: "How 5D BIM and Drone Topography Cut Heavy Infrastructure Delays by 35%",
    category: "Virtual Design (VDC)",
    excerpt: "A deep-dive into how reality-capture drone photogrammetry and algorithmic schedule clash detection safeguard mega-project delivery schedules and eliminate rework.",
    thumbnail_url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800",
    published_at: "2026-09-02",
  },
  {
    id: "b3",
    slug: "decarbonizing-concrete-leed-infrastructure",
    title: "The Decarbonization of Mega-Structures: Low-Carbon Geopolymer Cements",
    category: "Sustainable Materials",
    excerpt: "Replacing traditional Portland cement with industrial slag and fly-ash geopolymer binders to lower embodied carbon while accelerating high early compressive strength.",
    thumbnail_url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800",
    published_at: "2026-09-20",
  },
];

const BlogSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["home-blogs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("is_published", true)
        .order("published_at", { ascending: false })
        .limit(3);
      if (error) throw error;
      return data || [];
    },
  });

  const displayPosts = posts.length > 0 ? posts : defaultPosts;

  return (
    <section ref={sectionRef} className="py-24 md:py-32 overflow-hidden bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-1 bg-primary rounded-full" />
              <span className="text-[10px] font-black tracking-widest uppercase text-primary">Technical Bulletins & Case Studies</span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold text-foreground leading-tight tracking-tight">
              Engineering Insights & Field Reports
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link 
              to="/blog" 
              className="group inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-all duration-300"
            >
              <span>Explore All Field Reports</span> 
              <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {displayPosts.map((post: any, i: number) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group flex flex-col h-full bg-white rounded-3xl border-2 border-orange-100/80 overflow-hidden hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-1.5"
            >
              <Link to={`/blog/${post.slug}`} className="block overflow-hidden h-52 relative">
                <img 
                  src={post.thumbnail_url || "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&q=80&w=800"} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                <span className="absolute bottom-4 left-4 bg-primary text-white text-[10px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-md">
                  {post.category || "Civil Works"}
                </span>
              </Link>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between text-[11px] font-bold text-muted-foreground uppercase mb-3">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={13} className="text-primary" />
                    {post.published_at ? new Date(post.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Recent"}
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                  {post.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground line-clamp-3 flex-1 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="mt-5 pt-4 border-t border-orange-100/60 flex items-center justify-between">
                  <span className="text-xs font-bold text-primary group-hover:underline flex items-center gap-1">
                    Read Report <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
