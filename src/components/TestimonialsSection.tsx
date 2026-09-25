import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Star, ArrowRight, Quote } from "lucide-react";
import { useState, useMemo, useRef, useEffect } from "react";
import { filterOutLegacyFinancial } from "@/lib/contentFilter";

const defaultTestimonials = [
  {
    id: "t1",
    name: "Er. Ramesh Adhikari",
    role: "Senior Division Engineer, Project Directorate",
    company: "Department of Roads (DoR), Nepal",
    content: "MK Construction demonstrated exceptional engineering rigor on the Mid-Hill Highway upgrade. Managing rock excavation, deep retaining structures, and asphalt paving under tight pre-monsoon deadlines was executed flawlessly with their captive heavy equipment fleet.",
    rating: 5,
    project: "Mid-Hill Highway Pkg 7",
    image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
  },
  {
    id: "t2",
    name: "Sunil Shrestha",
    role: "Director of Infrastructure Development",
    company: "Provincial Ministry of Physical Infrastructure, Koshi",
    content: "The Saptakoshi River Bridge foundation was one of the most technically challenging caisson-sinking assignments in the region. MK Construction's engineering team deployed precision hydraulic equipment, completing all 12 pier caissons ahead of the flood season.",
    rating: 5,
    project: "Saptakoshi River Bridge",
    image_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300",
  },
  {
    id: "t3",
    name: "Bikash Thapa",
    role: "Project Manager, Hydraulic Works Division",
    company: "Bagmati Basin Flood Mitigation Project",
    content: "The 18-kilometer flood mitigation dyke and guided spurs built by MK Construction protected vulnerable settlements during the 2024 monsoon flood surge. Their quality control on gabions, geotextile layers, and RCC structures is exemplary.",
    rating: 5,
    project: "Bagmati River Training",
    image_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300",
  },
  {
    id: "t4",
    name: "Dipendra Sharma",
    role: "Chief Technical Officer",
    company: "Himalayan Power Developers Ltd.",
    content: "For our run-of-river civil package, MK Construction self-performed the headworks weir and 3.8km tunnel excavation with zero safety incidents. Their zero-harm HSE governance and schedule transparency set a benchmark for hydropower contracting in Nepal.",
    rating: 5,
    project: "Upper Trishuli Civil Package",
    image_url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300",
  },
  {
    id: "t5",
    name: "Er. Anita Gurung",
    role: "Lead Structural Consultant",
    company: "National Building Design Bureau",
    content: "Working alongside MK Construction on seismic institutional facilities has been seamless. Their strict adherence to NBC 105:2020 and thorough QA/QC concrete testing guarantees uncompromised structural longevity.",
    rating: 5,
    project: "Provincial HQ Complex",
    image_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300",
  },
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const { data: dbTestimonials = [] } = useQuery({
    queryKey: ["testimonials-home"],
    queryFn: async () => {
      const { data } = await supabase.from("testimonials").select("*").order("sort_order");
      return data || [];
    },
  });

  const validTestimonials = filterOutLegacyFinancial(dbTestimonials);
  const displayTestimonials = validTestimonials.length > 0 ? validTestimonials : defaultTestimonials;

  // Auto rotate testimonials every 6 seconds
  useEffect(() => {
    if (displayTestimonials.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % displayTestimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [displayTestimonials.length]);

  const activeTestimonial = displayTestimonials[activeIndex] || displayTestimonials[0];

  // Dynamically calculate circular orbit positions around the center
  const floatingPositions = useMemo(() => {
    const total = displayTestimonials.length;
    if (total <= 1) return [];

    return displayTestimonials.map((_, i) => {
      const angle = (i / total) * Math.PI * 2;
      const rx = 44; // horizontal radius in %
      const ry = 40; // vertical radius in %
      return {
        left: `${50 + rx * Math.cos(angle)}%`,
        top: `${50 + ry * Math.sin(angle)}%`,
      };
    });
  }, [displayTestimonials.length]);

  // Mobile horizontal swipe container ref
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  if (!activeTestimonial) return null;

  return (
    <section id="testimonials" className="py-20 md:py-32 bg-gradient-to-b from-white via-neutral-50/50 to-white relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/[0.03] rounded-full blur-[140px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest uppercase text-[#888A8C] bg-transparent px-5 py-2 rounded-full border border-[#888A8C] inline-block mb-4 shadow-xs">
            Client Endorsements &amp; Owner Verdicts
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold text-foreground tracking-tight">
            What Developers &amp; Authorities Say
          </h2>
          <p className="mt-4 text-muted-foreground text-base md:text-lg leading-relaxed">
            Delivering structural reliability, rigorous OSHA safety compliance, and proactive budget engineering across monumental civil and commercial contracts.
          </p>
        </div>

        {/* --- DESKTOP VIEW: Circular Orbiting Testimonial Showcase --- */}
        <div className="hidden lg:block relative w-full max-w-4xl mx-auto h-[620px] my-6">
          <LayoutGroup>
            {/* Outer Orbit Guide Ring */}
            <div className="absolute inset-0 m-auto w-[520px] h-[520px] rounded-full border border-dashed border-[#888A8C]/30 animate-[spin_60s_linear_infinite] pointer-events-none" />
            <div className="absolute inset-0 m-auto w-[380px] h-[380px] rounded-full border border-[#888A8C]/15 pointer-events-none" />

            {/* Central Active Testimonial Card */}
            <div className="absolute inset-0 m-auto w-[460px] h-[460px] flex flex-col items-center justify-center text-center z-20 pointer-events-none">
              <div className="pointer-events-auto w-full bg-white/95 backdrop-blur-xl rounded-[2.5rem] p-8 border-2 border-[#888A8C]/30 shadow-2xl shadow-black/10 flex flex-col items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTestimonial.id}
                    initial={{ opacity: 0, scale: 0.9, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -15 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center text-center"
                  >
                    {/* Active Avatar with Rotating Ring */}
                    <div className="relative mb-5 flex items-center justify-center">
                      <motion.div 
                        layoutId={`avatar-${activeTestimonial.id}`}
                        transition={{ layout: { type: "spring", bounce: 0.15, duration: 0.9 } }}
                        className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-xl bg-neutral-100 relative z-10"
                      >
                        <img 
                          src={activeTestimonial.image_url || `https://i.pravatar.cc/150?u=${activeTestimonial.id}`} 
                          alt={activeTestimonial.name} 
                          className="w-full h-full object-cover" 
                          onError={(e) => {
                            e.currentTarget.src = `https://i.pravatar.cc/150?u=${activeTestimonial.id}`;
                          }}
                        />
                      </motion.div>
                      <div className="absolute -inset-2.5 rounded-full border-2 border-dashed border-primary animate-[spin_12s_linear_infinite]" />
                    </div>

                    {/* Rating Stars */}
                    <div className="flex gap-1 text-primary mb-3">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={15} fill="currentColor" />
                      ))}
                    </div>

                    {/* Quote Text */}
                    <p className="text-sm text-foreground/90 font-medium leading-relaxed italic mb-4 line-clamp-4">
                      "{activeTestimonial.content}"
                    </p>

                    {/* Author Details */}
                    <h4 className="font-display font-extrabold text-foreground text-base tracking-tight">
                      {activeTestimonial.name}
                    </h4>
                    <p className="text-xs text-[#888A8C] font-bold uppercase tracking-wider mt-0.5">
                      {activeTestimonial.role}
                    </p>
                    {activeTestimonial.company && (
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        {activeTestimonial.company}
                      </p>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Circular Orbiting Avatars around the Perimeter */}
            {displayTestimonials.map((t, i) => {
              if (i === activeIndex) return null;
              const pos = floatingPositions[i] || { left: "50%", top: "50%" };

              return (
                <div
                  key={t.id}
                  className="absolute z-10"
                  style={{
                    left: pos.left,
                    top: pos.top,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <motion.button
                    layoutId={`avatar-${t.id}`}
                    transition={{ layout: { type: "spring", bounce: 0.15, duration: 0.9 } }}
                    onClick={() => setActiveIndex(i)}
                    onMouseEnter={() => setActiveIndex(i)}
                    className="relative rounded-full overflow-hidden border-4 border-white shadow-xl cursor-pointer group w-20 h-20 hover:scale-110 hover:shadow-2xl transition-transform duration-300"
                    aria-label={`Select ${t.name}`}
                  >
                    <img 
                      src={t.image_url || `https://i.pravatar.cc/150?u=${t.id}`} 
                      alt={t.name} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                      onError={(e) => {
                        e.currentTarget.src = `https://i.pravatar.cc/150?u=${t.id}`;
                      }}
                    />
                    <div className="absolute inset-0 bg-[#888A8C]/20 group-hover:bg-transparent transition-colors" />
                    
                    {/* Mini Name Tooltip on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-white text-[10px] font-bold uppercase p-1 text-center">
                      {t.name.split(' ')[0]}
                    </div>
                  </motion.button>
                </div>
              );
            })}
          </LayoutGroup>
        </div>

        {/* --- MOBILE VIEW: Horizontal Touch Carousel --- */}
        <div 
          ref={scrollContainerRef}
          className="lg:hidden w-full overflow-x-auto flex gap-5 px-4 my-8 pb-4 snap-x snap-mandatory hide-scrollbar"
        >
          {displayTestimonials.map((t) => (
            <div 
              key={t.id}
              className="w-[85vw] sm:w-[360px] shrink-0 bg-white rounded-3xl p-7 shadow-lg border-2 border-[#888A8C]/30 flex flex-col justify-between snap-center"
            >
              <div>
                <div className="flex gap-1 text-primary mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={15} fill="currentColor" />
                  ))}
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed italic line-clamp-4">
                  "{t.content}"
                </p>
              </div>

              <div className="mt-6 flex items-center gap-4 pt-4 border-t border-[#888A8C]/20">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary shrink-0">
                  <img 
                    src={t.image_url || `https://i.pravatar.cc/150?u=${t.id}`} 
                    alt={t.name} 
                    className="w-full h-full object-cover" 
                    onError={(e) => {
                      e.currentTarget.src = `https://i.pravatar.cc/150?u=${t.id}`;
                    }}
                  />
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm">{t.name}</h4>
                  <p className="text-[11px] text-[#888A8C] font-semibold uppercase">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Orbit Pagination Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {displayTestimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex ? "w-8 bg-[#888A8C]" : "w-2 bg-[#888A8C]/30 hover:bg-[#888A8C]/60"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
