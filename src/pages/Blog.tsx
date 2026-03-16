import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import PreFooterCTA from "@/components/PreFooterCTA";

const posts = [
  {
    title: "Understanding Nepal's Tax Compliance Requirements in 2025",
    excerpt: "A comprehensive guide to staying compliant with Nepal's evolving tax regulations and filing deadlines.",
    category: "Taxation",
    author: "CA Subrat Sapkota",
    date: "March 10, 2025",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
  },
  {
    title: "The Importance of Internal Audits for Growing Businesses",
    excerpt: "How regular internal audits can protect your business, improve efficiency, and build stakeholder trust.",
    category: "Audit & Assurance",
    author: "CA Diwash Dahal",
    date: "February 22, 2025",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
  },
  {
    title: "Corporate Governance Best Practices for Nepali Companies",
    excerpt: "Key governance frameworks that help companies maintain transparency and regulatory compliance.",
    category: "Corporate Law",
    author: "CA Nar Bahadur Budhayair",
    date: "February 8, 2025",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1507679799987-c73b4177fead?w=600&h=400&fit=crop",
  },
  {
    title: "NFRS Implementation: What Your Business Needs to Know",
    excerpt: "Breaking down the Nepal Financial Reporting Standards and practical steps for adoption.",
    category: "Training",
    author: "CA Subrat Sapkota",
    date: "January 15, 2025",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
  },
  {
    title: "VAT Audit Essentials: Avoiding Common Pitfalls",
    excerpt: "Learn the most frequent VAT audit findings and how to prepare your business proactively.",
    category: "Taxation",
    author: "CA Diwash Dahal",
    date: "January 3, 2025",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop",
  },
  {
    title: "How to Choose the Right Accounting Firm in Nepal",
    excerpt: "Factors to consider when selecting a professional accounting and advisory partner for your business.",
    category: "Business Consulting",
    author: "CA Nar Bahadur Budhayair",
    date: "December 20, 2024",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&h=400&fit=crop",
  },
];

const categoryColors: Record<string, string> = {
  Taxation: "bg-brand-green/10 text-brand-green",
  "Audit & Assurance": "bg-brand-blue/10 text-brand-blue",
  "Corporate Law": "bg-primary/10 text-primary",
  Training: "bg-amber-500/10 text-amber-600",
  "Business Consulting": "bg-violet-500/10 text-violet-600",
};

const Blog = () => {
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-80px" });

  return (
    <>
      {/* Hero Banner */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-primary overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-brand-blue/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-brand-green/5 blur-3xl" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <span className="text-xs font-bold tracking-widest uppercase text-brand-blue">Insights</span>
            <h1 className="mt-4 font-display text-4xl md:text-5xl font-extrabold text-primary-foreground leading-tight">
              Blog & Resources
            </h1>
            <p className="mt-5 text-primary-foreground/70 max-w-2xl mx-auto">
              Expert insights on taxation, audit, corporate governance, and financial best practices in Nepal.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-8 items-center rounded-2xl bg-card border border-border overflow-hidden"
          >
            <div className="h-64 md:h-full">
              <img
                src={posts[0].image}
                alt={posts[0].title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8 md:p-10">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${categoryColors[posts[0].category] || "bg-secondary text-foreground"}`}>
                {posts[0].category}
              </span>
              <h2 className="mt-4 font-display text-2xl md:text-3xl font-extrabold text-primary leading-tight">
                {posts[0].title}
              </h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">{posts[0].excerpt}</p>
              <div className="mt-5 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><User size={12} /> {posts[0].author}</span>
                <span className="flex items-center gap-1.5"><Calendar size={12} /> {posts[0].date}</span>
                <span className="flex items-center gap-1.5"><Clock size={12} /> {posts[0].readTime}</span>
              </div>
              <button className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-blue hover:gap-3 transition-all">
                Read Article <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section ref={gridRef} className="pb-20 md:pb-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(1).map((post, i) => (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, y: 30 }}
                animate={gridInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.08 * i }}
                className="group rounded-2xl bg-card border border-border overflow-hidden hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${categoryColors[post.category] || "bg-secondary text-foreground"}`}>
                    {post.category}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-bold text-primary leading-snug line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">{post.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5"><Calendar size={11} /> {post.date}</span>
                    <span className="flex items-center gap-1.5"><Clock size={11} /> {post.readTime}</span>
                  </div>
                </div>
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
