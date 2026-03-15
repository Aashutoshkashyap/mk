import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const partnerRows = [
  Array.from({ length: 10 }, (_, i) => `https://sharpedge.com.np/static/img/partners/${i + 1}.png`),
  Array.from({ length: 10 }, (_, i) => `https://sharpedge.com.np/static/img/partners/${i + 11}.png`),
];

const PartnersSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="partners" className="py-24 overflow-hidden" ref={ref}>
      <div className="container max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-sm font-semibold text-teal uppercase tracking-widest">Partners</span>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-foreground">
            Our clients & partners
          </h2>
        </motion.div>
      </div>

      {/* Marquee rows */}
      {partnerRows.map((row, rowIdx) => (
        <div key={rowIdx} className="relative mb-6">
          <div className={rowIdx === 0 ? "marquee" : "marquee-reverse"} style={{ display: "flex", width: "fit-content" }}>
            {[...row, ...row].map((src, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-32 h-16 mx-4 rounded-xl bg-card border border-border flex items-center justify-center p-3 grayscale hover:grayscale-0 transition-all duration-300"
              >
                <img
                  src={src}
                  alt={`Partner ${(i % row.length) + 1 + rowIdx * 10}`}
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          {/* Edge fades */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
        </div>
      ))}
    </section>
  );
};

export default PartnersSection;
