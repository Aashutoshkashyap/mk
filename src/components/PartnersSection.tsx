import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const MarqueeRow = ({
  items,
  className,
  onHover,
  onLeave,
}: {
  items: any[];
  className: string;
  onHover: (name: string) => void;
  onLeave: () => void;
}) => (
  <div className="relative mb-4 overflow-hidden marquee-pause">
    <div className={className} style={{ display: "flex", width: "fit-content" }}>
      {(items.length > 0 ? [...items, ...items, ...items] : []).map((item, i) => (
        <div
          key={`${item.id}-${i}`}
          onMouseEnter={() => onHover(item.name)}
          onMouseLeave={onLeave}
          className="flex-shrink-0 w-[240px] h-[120px] md:w-[320px] md:h-[160px] mx-4 rounded-3xl bg-card/60 backdrop-blur-sm border border-border flex items-center justify-center p-8 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 hover:border-brand-blue/30 hover:bg-white hover:shadow-xl hover:shadow-brand-blue/5 transition-all duration-500 cursor-none"
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
    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
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

  const [hoveredPartner, setHoveredPartner] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const { data: partners = [], isLoading, error } = useQuery({
    queryKey: ["partners"],
    queryFn: async () => {
      const { data, error } = await supabase.from("partners").select("*").order("sort_order");
      if (error) throw error;
      return data || [];
    },
  });

  const { data: settings } = useQuery({
    queryKey: ["site_settings"],
    queryFn: async () => {
      const { data } = await supabase.from("site_settings").select("*").eq("id", "00000000-0000-0000-0000-000000000000").maybeSingle();
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });

  const partnersConfig = (settings as any)?.section_visibility?.partners_config || {};
  const displayHeading = partnersConfig.heading || "The Companies We Serve";
  const displaySubheading = partnersConfig.subheading || "We are honored to have worked with some of the most innovative and industry-leading organizations across the region.";
  const displayPadding = partnersConfig.padding || "py-24 md:py-32";

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
    <section id="partners" className={`${displayPadding} bg-white relative overflow-hidden`} ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/5 border border-brand-blue/10 text-brand-blue font-bold text-[10px] tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse" />
            Strategic Partners
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-extrabold text-primary tracking-tight mb-6">
            {displayHeading.split(' ').map((word, i, arr) => 
              i === arr.length - 1 ? <span key={i} className="text-brand-blue">{word}</span> : word + ' '
            )}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {displaySubheading}
          </p>
        </motion.div>
      </div>

      <div className="space-y-6 relative z-10">
        {row1.length > 0 && <MarqueeRow items={row1} className="marquee" onHover={setHoveredPartner} onLeave={() => setHoveredPartner(null)} />}
        {row2.length > 0 && <MarqueeRow items={row2} className="marquee-reverse" onHover={setHoveredPartner} onLeave={() => setHoveredPartner(null)} />}
        {row3.length > 0 && <MarqueeRow items={row3} className="marquee-slow" onHover={setHoveredPartner} onLeave={() => setHoveredPartner(null)} />}
      </div>

      {/* Floating Tooltip Custom Cursor */}
      <AnimatePresence>
        {hoveredPartner && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            style={{ 
              position: "fixed", 
              left: mousePos.x, 
              top: mousePos.y, 
              pointerEvents: "none", 
              zIndex: 9999,
              translateX: "-50%",
              translateY: "-150%" 
            }}
            className="px-6 py-2 bg-primary text-white text-sm font-bold rounded-full shadow-2xl backdrop-blur-md"
          >
            {hoveredPartner}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
    </section>
  );
};

export default PartnersSection;
