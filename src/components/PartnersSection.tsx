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

  const { data: partners = [], isLoading } = useQuery({
    queryKey: ["partners"],
    queryFn: async () => {
      const { data } = await supabase.from("partners").select("*").order("sort_order");
      return data || [];
    },
  });

  if (isLoading || partners.length === 0) return null;

  // Distribute partners into 3 rows
  const row1 = partners.filter((_, i) => i % 3 === 0);
  const row2 = partners.filter((_, i) => i % 3 === 1);
  const row3 = partners.filter((_, i) => i % 3 === 2);

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
