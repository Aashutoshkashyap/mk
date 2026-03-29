import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const MarqueeRow = ({
  items,
  className,
}: {
  items: any[];
  className: string;
}) => (
  <div className="relative mb-4 overflow-hidden">
    <div className={className} style={{ display: "flex", width: "fit-content" }}>
      {(items.length > 0 ? [...items, ...items, ...items] : []).map((item, i) => (
        <div
          key={`${item.id}-${i}`}
          className="flex-shrink-0 w-[240px] h-[120px] md:w-[320px] md:h-[160px] mx-4 rounded-2xl bg-card border border-border flex items-center justify-center p-6 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
        >
          <img
            src={item.logo_url}
            alt={item.name}
            className="max-w-full max-h-full object-contain"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = "https://sharpedge.com.np/static/img/logo.png";
              e.currentTarget.style.filter = "grayscale(1) opacity(0.2)";
            }}
          />
        </div>
      ))}
    </div>
    <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-secondary/50 to-transparent pointer-events-none z-10" />
    <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-secondary/50 to-transparent pointer-events-none z-10" />
  </div>
);

const PartnersSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const defaultPartners = [
    { id: 'p1', name: 'ICAI Nepal', logo_url: 'https://sharpedge.com.np/static/img/logo.png' },
    { id: 'p2', name: 'Revenue Board', logo_url: 'https://sharpedge.com.np/static/img/logo.png' },
    { id: 'p3', name: 'Standard Chartered', logo_url: 'https://sharpedge.com.np/static/img/logo.png' },
    { id: 'p4', name: 'Nabil Bank', logo_url: 'https://sharpedge.com.np/static/img/logo.png' },
    { id: 'p5', name: 'Investment Bank', logo_url: 'https://sharpedge.com.np/static/img/logo.png' },
    { id: 'p6', name: 'Global IME', logo_url: 'https://sharpedge.com.np/static/img/logo.png' },
  ];

  const { data: partners = [], isLoading, error } = useQuery({
    queryKey: ["partners"],
    queryFn: async () => {
      const { data, error } = await supabase.from("partners").select("*").order("sort_order");
      if (error) throw error;
      return data || [];
    },
  });

  // Optimize space: if explicitly empty in DB and no error, hide section.
  // If there's an error, show professional fallbacks.
  if (isLoading) return <div className="h-60 bg-secondary/20 animate-pulse rounded-3xl mx-4 my-20" />;
  if (partners.length === 0 && !error) return null;

  const partnersToDisplay = partners.length > 0 ? partners : defaultPartners;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "/placeholder.svg"; // Fallback to a local SVG or original logo
    e.currentTarget.className = "max-w-[120px] opacity-20 grayscale";
  };

  // Distribute partners into 3 rows
  const row1 = partnersToDisplay.filter((_, i) => i % 3 === 0);
  const row2 = partnersToDisplay.filter((_, i) => i % 3 === 1);
  const row3 = partnersToDisplay.filter((_, i) => i % 3 === 2);

  return (
    <section id="partners" className="py-20 md:py-28 bg-secondary/50 overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-bold tracking-widest uppercase text-brand-blue bg-brand-blue/5 px-4 py-1.5 rounded-full border border-brand-blue/10 inline-block mb-4">Trust & Collaboration</span>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold text-primary tracking-tight">
            Our Clients and Partners
          </h2>
        </motion.div>
      </div>

      <div className="space-y-4">
        {row1.length > 0 && <MarqueeRow items={row1} className="marquee" />}
        {row2.length > 0 && <MarqueeRow items={row2} className="marquee-reverse" />}
        {row3.length > 0 && <MarqueeRow items={row3} className="marquee-slow" />}
      </div>
    </section>
  );
};

export default PartnersSection;
