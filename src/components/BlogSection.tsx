import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Eye } from "lucide-react";

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

  if (!isLoading && posts.length === 0) return null;

  return (
    <section ref={sectionRef} className="py-24 md:py-32 overflow-hidden bg-secondary/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-0.5 bg-primary/20 rounded-full" />
              <span className="text-[10px] font-black tracking-widest uppercase text-brand-blue">Insights & Resources</span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold text-primary leading-tight tracking-tight">Latest Strategic Insights</h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link 
              to="/blog" 
              className="group inline-flex items-center gap-2 text-sm font-bold text-brand-blue hover:text-primary transition-all duration-300"
            >
              View All Articles 
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {isLoading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="h-64 bg-secondary/50 animate-pulse rounded-3xl" />
            ))
          ) : (
            posts.map((post: any, i: number) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group flex flex-col h-full bg-card rounded-3xl border border-border overflow-hidden hover:border-primary/20 transition-all duration-500"
              >
                <Link to={`/blog/${post.slug}`} className="block overflow-hidden h-48">
                  <img src={post.thumbnail_url || ""} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </Link>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between text-[10px] font-bold text-muted-foreground uppercase mb-3">
                    <span>{post.category || "General"}</span>
                    <span>{post.published_at ? new Date(post.published_at).toLocaleDateString() : ""}</span>
                  </div>
                  <h3 className="font-display text-lg font-extrabold text-primary line-clamp-2">{post.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground line-clamp-2 flex-1">{post.excerpt}</p>
                </div>
              </motion.article>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
