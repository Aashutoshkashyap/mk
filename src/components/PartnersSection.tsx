import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const row1 = Array.from({ length: 10 }, (_, i) => ({
  src: `https://sharpedge.com.np/static/img/partners/${i + 1}.png`,
  alt: `Partner ${i + 1}`,
}));

const row2 = Array.from({ length: 10 }, (_, i) => ({
  src: `https://sharpedge.com.np/static/img/partners/${i + 11}.png`,
  alt: `Partner ${i + 11}`,
}));

const row3Indexes = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32];
const row3 = row3Indexes.map((n) => ({
  src: `https://sharpedge.com.np/static/img/partners/${n}.${n === 21 ? "jpg" : "png"}`,
  alt: `Partner ${n}`,
}));

const MarqueeRow = ({
  items,
  className,
}: {
  items: { src: string; alt: string }[];
  className: string;
}) => (
  <div className="relative mb-4 overflow-hidden">
    <div className={className} style={{ display: "flex", width: "fit-content" }}>
      {[...items, ...items].map((item, i) => (
        <div
          key={i}
          className="flex-shrink-0 w-[208px] h-[104px] mx-4 rounded-xl bg-card border border-border flex items-center justify-center p-4 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
        >
          <img
            src={item.src}
            alt={item.alt}
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

  return (
    <section id="partners" className="py-20 md:py-28 bg-secondary/50 overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-primary">
            Our Clients and Partners
          </h2>
        </motion.div>
      </div>

      <MarqueeRow items={row1} className="marquee" />
      <MarqueeRow items={row2} className="marquee-reverse" />
      <MarqueeRow items={row3} className="marquee-slow" />
    </section>
  );
};

export default PartnersSection;
