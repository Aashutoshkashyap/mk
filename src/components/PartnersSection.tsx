import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { usePartnersContent } from "@/hooks/useCMS";

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
          className="flex-shrink-0 w-[240px] h-[110px] md:w-[290px] md:h-[130px] mx-3 rounded-2xl bg-white/90 backdrop-blur-md border border-[#888A8C]/30 flex items-center justify-center p-6 shadow-sm hover:border-primary hover:bg-neutral-50/60 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 cursor-default group"
        >
          {item.logo_url ? (
            <img
              src={item.logo_url}
              alt={item.name}
              className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div className="flex items-center gap-3 text-center">
              <div className="w-10 h-10 rounded-xl bg-primary/10 group-hover:bg-primary group-hover:text-white flex items-center justify-center text-primary font-black text-xs shrink-0 transition-colors">
                🏗️
              </div>
              <span className="font-display font-bold text-foreground text-sm group-hover:text-primary transition-colors line-clamp-2 text-left">
                {item.name}
              </span>
            </div>
          )}
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
    { id: 'p1', name: 'Metropolitan Transit Authority', logo_url: '' },
    { id: 'p2', name: 'Apex Real Estate Consortium', logo_url: '' },
    { id: 'p3', name: 'Holcim Infrastructure', logo_url: '' },
    { id: 'p4', name: 'Caterpillar Heavy Systems', logo_url: '' },
    { id: 'p5', name: 'Skanska Global Alliance', logo_url: '' },
    { id: 'p6', name: 'Vanguard Logistics Hubs', logo_url: '' },
    { id: 'p7', name: 'Trimble BIM Technologies', logo_url: '' },
    { id: 'p8', name: 'National Highway Authority', logo_url: '' },
    { id: 'p9', name: 'Balfour Civil Engineering', logo_url: '' },
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


  const dbPartners = usePartnersContent();
  const partnersConfig = {};
  const displayHeading = "Trusted by Public Authorities & Regional Developers";
  const displaySubheading = "Collaborating with the Department of Roads (DoR), Nepal Electricity Authority (NEA), DWIDP, and multilateral partners to deliver resilient civil engineering assets across Nepal.";
  const displayPadding = "py-24 md:py-32";

  const partnersToDisplay = dbPartners.length > 0 ? dbPartners : defaultPartners;

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
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-[10px] tracking-widest uppercase mb-6 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
            Infrastructure Partnerships & Client Alliances
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-6">
            {displayHeading}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
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
