import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { filterOutLegacyFinancial } from "@/lib/contentFilter";

const defaultPosts = [
  {
    id: "b1",
    slug: "saptakoshi-river-bridge-deep-well-pier-milestone",
    title: "Saptakoshi River Bridge: Deep-Well Pier Milestone Completed Ahead of Monsoon",
    category: "Project Milestones",
    excerpt: "Our heavy bridge engineering division completed all 18 deep-well pier caissons for the Saptakoshi River crossing, beating the critical monsoon flood window.",
    thumbnail_url: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&q=80&w=800",
    published_at: "2026-09-18",
  },
  {
    id: "b2",
    slug: "mk-construction-awarded-mid-hill-highway-pkg-7",
    title: "MK Construction Awarded Mid-Hill Highway Package 7 Paving Contract (₨ 1.9B)",
    category: "Tender Wins",
    excerpt: "The Department of Roads has awarded MK Construction Company Pvt. Ltd. the turnkey 48km asphalt concrete and slope stabilization contract in Karnali.",
    thumbnail_url: "https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&q=80&w=800",
    published_at: "2026-09-08",
  },
  {
    id: "b3",
    slug: "bagmati-river-training-12km-embankment-completion",
    title: "Bagmati River Training: 12-Kilometer Flood Mitigation Embankment Commissioned",
    category: "Project Milestones",
    excerpt: "Deploying high-density gabions and RCC deflective spurs, our hydraulic teams fortified 12 kilometers of vulnerable river basin to safeguard surrounding towns.",
    thumbnail_url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800",
    published_at: "2026-08-25",
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

  const validPosts = filterOutLegacyFinancial(posts);
  const displayPosts = validPosts.length > 0 ? validPosts : defaultPosts;

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
              <div className="w-10 h-1 bg-[#888A8C] rounded-full" />
              <span className="text-[10px] font-black tracking-widest uppercase text-[#888A8C]">Company News & Insights</span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold text-foreground leading-tight tracking-tight">
              News & Infrastructure Insights
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link 
              to="/blog" 
              className="group inline-flex items-center gap-2 text-sm font-bold text-[#888A8C] hover:text-[#24272A] transition-all duration-300"
            >
              <span>Explore All News & Insights</span> 
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
              className="group flex flex-col h-full bg-white rounded-3xl border-2 border-[#888A8C]/30 overflow-hidden hover:border-[#888A8C]/60 hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5"
            >
              <Link to={`/blog/${post.slug}`} className="block overflow-hidden h-52 relative">
                <img 
                  src={post.thumbnail_url || "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&q=80&w=800"} 
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
                <div className="mt-5 pt-4 border-t border-[#888A8C]/20 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#888A8C] hover:text-[#24272A] group-hover:underline flex items-center gap-1">
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
