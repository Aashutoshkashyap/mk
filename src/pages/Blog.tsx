import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock, User, Eye } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import PreFooterCTA from "@/components/PreFooterCTA";

const categoryColors: Record<string, string> = {
  Taxation: "bg-brand-green/10 text-brand-green",
  "Audit & Assurance": "bg-brand-blue/10 text-brand-blue",
  "Corporate Law": "bg-primary/10 text-primary",
  Training: "bg-amber-500/10 text-amber-600",
  "Business Consulting": "bg-violet-500/10 text-violet-600",
  General: "bg-secondary text-foreground",
};

const Blog = () => {
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-80px" });

  const { data: posts = [] } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      const { data } = await supabase.from("blog_posts").select("*").eq("is_published", true).order("published_at", { ascending: false });
      return data || [];
    },
  });

  const featured = posts.find((p) => p.is_featured) || posts[0];
  const gridPosts = posts.filter((p) => p.id !== featured?.id);

  return (
    <>
      {/* Hero Banner */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-primary overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-brand-blue/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-brand-green/5 blur-3xl" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center">
            <span className="text-xs font-bold tracking-widest uppercase text-brand-blue">Insights</span>
            <h1 className="mt-4 font-display text-4xl md:text-5xl font-extrabold text-primary-foreground leading-tight">Blog & Resources</h1>
            <p className="mt-5 text-primary-foreground/70 max-w-2xl mx-auto">Expert insights on taxation, audit, corporate governance, and financial best practices in Nepal.</p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      {featured && (
        <section className="py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="grid md:grid-cols-2 gap-8 items-center rounded-2xl bg-card border border-border overflow-hidden">
              <div className="h-64 md:h-full">
                <img src={featured.thumbnail_url || ""} alt={featured.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-8 md:p-10">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${categoryColors[featured.category || ""] || "bg-secondary text-foreground"}`}>
                  {featured.category}
                </span>
                <h2 className="mt-4 font-display text-2xl md:text-3xl font-extrabold text-primary leading-tight">{featured.title}</h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">{featured.excerpt}</p>
                <div className="mt-5 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5"><User size={12} /> {featured.author}</span>
                  {featured.published_at && <span className="flex items-center gap-1.5"><Calendar size={12} /> {new Date(featured.published_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>}
                  <span className="flex items-center gap-1.5"><Eye size={12} /> {featured.views}</span>
                </div>
                <Link to={`/blog/${featured.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-blue hover:gap-3 transition-all">
                  Read Article <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section ref={gridRef} className="pb-20 md:pb-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gridPosts.map((post, i) => (
              <motion.article key={post.id} initial={{ opacity: 0, y: 30 }} animate={gridInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.08 * i }}
                className="group rounded-2xl bg-card border border-border overflow-hidden hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
                <Link to={`/blog/${post.slug}`}>
                  <div className="h-48 overflow-hidden">
                    <img src={post.thumbnail_url || ""} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                  <div className="p-6">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${categoryColors[post.category || ""] || "bg-secondary text-foreground"}`}>
                      {post.category}
                    </span>
                    <h3 className="mt-3 font-display text-lg font-bold text-primary leading-snug line-clamp-2">{post.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">{post.excerpt}</p>
                    <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                      {post.published_at && <span className="flex items-center gap-1.5"><Calendar size={11} /> {new Date(post.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>}
                      <span className="flex items-center gap-1.5"><Eye size={11} /> {post.views}</span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <PreFooterCTA />
    </>
  );
};

export default Blog;
