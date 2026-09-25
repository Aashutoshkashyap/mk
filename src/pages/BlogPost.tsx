import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, User, Eye, HardHat, Share2, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import PreFooterCTA from "@/components/PreFooterCTA";
import { defaultConstructionArticles } from "@/lib/blogData";
import { sanitizeDbRecord } from "@/lib/contentFilter";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: dbPost, isLoading } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug!)
        .eq("is_published", true)
        .maybeSingle();
      if (error) console.warn("Supabase query error:", error);
      return data || null;
    },
    enabled: !!slug,
  });

  // Fallback to static construction article if not in DB or if DB has legacy financial post
  const validDbPost = sanitizeDbRecord(dbPost);
  const fallbackPost = defaultConstructionArticles.find((a) => a.slug === slug);
  const post = validDbPost || fallbackPost;

  useEffect(() => {
    if (dbPost && slug) {
      const incrementViews = async () => {
        try {
          await supabase
            .from("blog_posts")
            .update({ views: ((dbPost as any).views || 0) + 1 })
            .eq("id", (dbPost as any).id);
        } catch (e) {
          // ignore view increment error
        }
      };
      incrementViews();
    }
  }, [dbPost, slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-white px-4">
        <HardHat size={48} className="text-primary/40" />
        <h1 className="font-display text-2xl font-bold text-foreground">Technical Article Not Found</h1>
        <p className="text-muted-foreground text-sm">The requested engineering report may have been archived.</p>
        <Link 
          to="/blog" 
          className="mt-2 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-primary/25"
        >
          <ArrowLeft size={14} /> Back to Field Reports
        </Link>
      </div>
    );
  }

  const readTime = post.read_time || `${Math.max(1, Math.ceil((post.content || "").split(/\s+/).length / 200))} min read`;

  return (
    <>
      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white overflow-hidden">
        <div className="absolute top-10 right-10 w-96 h-96 bg-primary/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-red-700/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#f9731615_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none opacity-40" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:text-primary/80 mb-6 bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20 transition-all"
            >
              <ArrowLeft size={13} /> Back to Engineering Bulletins
            </Link>

            {post.category && (
              <div className="mb-3">
                <span className="inline-block px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-primary text-white shadow-md">
                  {post.category}
                </span>
              </div>
            )}

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
              {post.title}
            </h1>

            <div className="mt-8 flex flex-wrap items-center gap-6 text-xs text-neutral-300 pt-6 border-t border-neutral-800">
              {post.author && (
                <span className="flex items-center gap-1.5 font-semibold text-white">
                  <User size={14} className="text-primary" /> {post.author}
                </span>
              )}
              {post.published_at && (
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-primary" /> 
                  {new Date(post.published_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Clock size={14} className="text-primary" /> {readTime}
              </span>
              <span className="flex items-center gap-1.5">
                <Eye size={14} className="text-primary" /> {post.views || 450} views
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Article Body */}
      <article className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {post.thumbnail_url && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5 }} 
              className="mb-12 rounded-3xl overflow-hidden shadow-2xl border-4 border-red-50 group h-80 sm:h-[480px]"
            >
              <img 
                src={post.thumbnail_url} 
                alt={post.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
              />
            </motion.div>
          )}

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: 0.1 }}
            className="prose prose-lg max-w-none space-y-6"
          >
            {(post.content || "").split("\n\n").map((paragraph: string, i: number) => (
              <div key={i}>
                <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                  {paragraph}
                </p>
                {/* Secondary image if present */}
                {i === 1 && post.image_1_url && (
                  <div className="my-8 rounded-2xl overflow-hidden border border-red-100 shadow-md">
                    <img src={post.image_1_url} alt="Engineering schematic" className="w-full" loading="lazy" />
                  </div>
                )}
              </div>
            ))}
          </motion.div>

          {/* Author Box & Scope Callout */}
          <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-red-50 to-red-50/50 border-2 border-red-100 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center font-black text-xl shadow-lg shadow-primary/25 shrink-0">
                MK
              </div>
              <div>
                <div className="font-display font-bold text-foreground text-base">MK Technical Research & VDC Group</div>
                <div className="text-xs text-muted-foreground mt-0.5">Civil Engineering, Seismic Damping & 5D BIM Pre-Construction</div>
              </div>
            </div>
            <Link
              to="/contact"
              className="px-6 py-3 rounded-full bg-primary text-white text-xs font-bold shadow-md shadow-primary/25 hover:bg-primary/95 transition-all whitespace-nowrap flex items-center gap-2"
            >
              Inquire About Specifications <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </article>

      <PreFooterCTA />
    </>
  );
};

export default BlogPost;
