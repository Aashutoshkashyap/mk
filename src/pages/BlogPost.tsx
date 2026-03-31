import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, User, Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import PreFooterCTA from "@/components/PreFooterCTA";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug!)
        .eq("is_published", true)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  useEffect(() => {
    if (post && slug) {
      const incrementViews = async () => {
        const { error } = await supabase
          .from("blog_posts")
          .update({ views: (post.views || 0) + 1 })
          .eq("id", post.id);
        
        if (error) console.error("Error incrementing views:", error);
      };
      
      incrementViews();
    }
  }, [post?.id, slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="font-display text-2xl font-bold text-primary">Article not found</h1>
        <Link to="/blog" className="text-brand-blue font-semibold">← Back to Blog</Link>
      </div>
    );
  }

  const readTime = `${Math.max(1, Math.ceil(post.content.split(/\s+/).length / 200))} min read`;

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-primary overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-brand-blue/10 blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground mb-6">
              <ArrowLeft size={14} /> Back to Blog
            </Link>
            {post.category && (
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-brand-blue/20 text-brand-blue mb-4">
                {post.category}
              </span>
            )}
            <h1 className="font-display text-3xl md:text-5xl font-extrabold text-primary-foreground leading-tight">
              {post.title}
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-primary-foreground/60">
              {post.author && <span className="flex items-center gap-1.5"><User size={14} /> {post.author}</span>}
              {post.published_at && <span className="flex items-center gap-1.5"><Calendar size={14} /> {new Date(post.published_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>}
              <span className="flex items-center gap-1.5"><Clock size={14} /> {readTime}</span>
              <span className="flex items-center gap-1.5"><Eye size={14} /> {post.views} views</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <article className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {post.thumbnail_url && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-10">
              <img src={post.thumbnail_url} alt={post.title} className="w-full h-64 md:h-96 object-cover rounded-2xl" />
            </motion.div>
          )}

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            {(post.content || "").split("\n\n").map((paragraph, i) => (
              <div key={i}>
                <p className="text-muted-foreground leading-relaxed mb-6 text-base md:text-lg">{paragraph}</p>
                {/* Insert image_1 after 2nd paragraph */}
                {i === 1 && post.image_1_url && (
                  <div className="my-8">
                    <img 
                      src={post.image_1_url} 
                      alt="Article illustration" 
                      className="w-full rounded-xl" 
                      loading="lazy" 
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'; // Hide if broken
                      }}
                    />
                  </div>
                )}
                {/* Insert image_2 after 4th paragraph or last if shorter */}
                {i === 3 && post.image_2_url && (
                  <div className="my-8">
                    <img 
                      src={post.image_2_url} 
                      alt="Article illustration" 
                      className="w-full rounded-xl" 
                      loading="lazy" 
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'; // Hide if broken
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </motion.div>

          <div className="mt-10 pt-8 border-t border-border flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <Eye size={16} /> {post.views} views
            </span>
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-brand-blue">
              <ArrowLeft size={14} /> Back to Blog
            </Link>
          </div>
        </div>
      </article>

      <PreFooterCTA />
    </>
  );
};

export default BlogPost;
