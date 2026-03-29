import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";
import { useState, useMemo, useRef, useEffect } from "react";

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const { data: testimonials = [], isLoading, error } = useQuery({
    queryKey: ["testimonials-home"],
    queryFn: async () => {
      const { data, error } = await supabase.from("testimonials").select("*").order("sort_order");
      if (error) throw error;
      return data || [];
    },
  });

  const { data: sectionData }: any = useQuery({
    queryKey: ["testimonials-section-meta"],
    queryFn: async () => {
      const { data } = await supabase.from("testimonials_section" as any).select("*").maybeSingle();
      return data;
    },
  });

  const defaultTestimonials = [
    { id: 't1', name: 'Rajesh Sharma', role: 'CEO, Nepal Ventures', content: 'Sharp Edge provided us with exceptional audit services. Their attention to detail and professional integrity are unmatched.', image_url: null, sort_order: 1 },
    { id: 't2', name: 'Sita Thapa', role: 'Finance Director', content: 'The taxation strategy developed by their team saved us significant resources. Highly recommended for any business in Nepal.', image_url: null, sort_order: 2 },
    { id: 't3', name: 'Anil Kapali', role: 'Founder, TechHive', content: 'Expert legal advice that helped us navigate complex regulatory hurdles. A true partner in our growth journey.', image_url: null, sort_order: 3 },
  ];

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let isInteracting = false;

    const startScrolling = () => {
      const container = scrollContainerRef.current;
      if (container && !isInteracting) {
        container.scrollLeft += 0.8; // Control auto-scroll speed
        // Reset scroll seamlessly when reaching the halfway point (start of the cloned set)
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(startScrolling);
    };

    const handleInteractStart = () => (isInteracting = true);
    const handleInteractEnd = () => {
      // Resume scroll logic gracefully
      setTimeout(() => (isInteracting = false), 1500); 
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("mouseenter", handleInteractStart);
      container.addEventListener("mouseleave", handleInteractEnd);
      container.addEventListener("touchstart", handleInteractStart, { passive: true });
      container.addEventListener("touchend", handleInteractEnd);
      
      animationFrameId = requestAnimationFrame(startScrolling);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (container) {
        container.removeEventListener("mouseenter", handleInteractStart);
        container.removeEventListener("mouseleave", handleInteractEnd);
        container.removeEventListener("touchstart", handleInteractStart);
        container.removeEventListener("touchend", handleInteractEnd);
      }
    };
  }, []);

  const testimonialsToDisplay = testimonials.length > 0 ? testimonials : defaultTestimonials;
  const activeTestimonial = testimonialsToDisplay[activeIndex] || defaultTestimonials[0];
  
  // Dynamically calculate positions in a large circle to utilize space
  const floatingPositions = useMemo(() => {
    const total = testimonialsToDisplay.length;
    if (total <= 1) return [];
    
    return testimonialsToDisplay.map((_, i) => {
      const angle = (i / total) * Math.PI * 2;
      const rx = 46; // horizontal radius in %
      const ry = 42; // vertical radius in %
      return {
        left: `${50 + rx * Math.cos(angle)}%`,
        top: `${50 + ry * Math.sin(angle)}%`,
        delay: i * 0.1
      };
    });
  }, [testimonialsToDisplay.length]);

  // Duplicate testimonials for the infinite scroll on mobile
  const mobileTestimonials = [...testimonialsToDisplay, ...testimonialsToDisplay];

  // Early returns must come AFTER all hooks
  if (isLoading) return <div className="h-[600px] bg-secondary/10 animate-pulse rounded-[40px] mx-6 my-24 flex items-center justify-center text-muted-foreground">Loading testimonials...</div>;
  if (testimonials.length === 0 && !error) return null;

  return (
    <section id="testimonials" className="relative bg-[#fafbff] pt-24 pb-32 overflow-hidden min-h-[900px] flex flex-col items-center">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 relative w-full flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center mb-16 relative z-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold tracking-[0.2em] uppercase text-brand-blue bg-brand-blue/5 px-6 py-2 rounded-full border border-brand-blue/10 inline-block mb-6 shadow-sm"
          >
            Trust & Collaboration
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-6xl font-black text-primary tracking-tight"
          >
            {sectionData?.title || "What our happy clients say!"}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-muted-foreground leading-relaxed max-w-xl mx-auto text-lg"
          >
            {sectionData?.description || "Experience the Sharp Edge difference through the voices of those we serve."}
          </motion.p>
        </div>

        {/* --- DESKTOP VIEW: Floating Interactive Layout --- */}
        <div className="hidden lg:flex relative w-full aspect-[2/1] min-h-[750px] items-center justify-center">
          <LayoutGroup>
            {/* Centered Active Testimonial - Absolute centered to prevent shifts */}
            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
              <div className="w-full max-w-3xl text-center px-12 min-h-[500px] flex items-center justify-center">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -15, filter: "blur(4px)" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col items-center pointer-events-auto w-full"
                  >
                    <div className="flex gap-1 text-orange-400 justify-center mb-10">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={20} fill="currentColor" />
                      ))}
                    </div>

                    <p className="text-2xl md:text-3xl text-muted-foreground leading-relaxed mb-14 italic max-w-2xl font-medium px-4">
                      "{activeTestimonial?.content}"
                    </p>

                    <div className="relative mb-10 flex items-center justify-center">
                       <motion.div 
                          layoutId={`avatar-${activeTestimonial?.id}`}
                          transition={{ layout: { type: "spring", bounce: 0.15, duration: 1.2 } }}
                          className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-[8px] border-white shadow-2xl bg-orange-50 z-20 relative"
                       >
                          <img 
                            src={activeTestimonial?.image_url || `https://i.pravatar.cc/150?u=${activeTestimonial?.id}`} 
                            alt={activeTestimonial?.name} 
                            className="w-full h-full object-cover" 
                            onError={(e) => {
                              e.currentTarget.src = `https://i.pravatar.cc/150?u=${activeTestimonial?.id}`;
                            }}
                          />
                       </motion.div>
                       <div className="absolute w-[calc(100%+2rem)] h-[calc(100%+2rem)] rounded-full border border-dashed border-brand-blue/20 animate-[spin_15s_linear_infinite]" />
                    </div>

                    <h4 className="font-bold text-primary text-2xl md:text-3xl mb-2 tracking-tight">{activeTestimonial?.name}</h4>
                    <p className="text-sm md:text-base text-brand-blue font-bold tracking-widest uppercase opacity-80">{activeTestimonial?.role}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Floating Other Members */}
            {testimonialsToDisplay.map((t, i) => {
              if (i === activeIndex) return null;
              const pos = floatingPositions[i];
              
              return (
                <div
                  key={t.id}
                  className="absolute z-0"
                  style={{ 
                    left: pos.left, 
                    top: pos.top,
                    transform: "translate(-50%, -50%)"
                  }}
                >
                  <motion.button
                    layoutId={`avatar-${t.id}`}
                    transition={{ layout: { type: "spring", bounce: 0.15, duration: 1.2 } }}
                    onMouseEnter={() => setActiveIndex(i)}
                    onClick={() => setActiveIndex(i)}
                    className="relative rounded-full overflow-hidden border-4 border-white shadow-xl cursor-pointer bg-secondary group w-20 h-20 md:w-28 md:h-28 hover:shadow-2xl hover:scale-110 transition-transform duration-300"
                  >
                    <img 
                      src={t.image_url || `https://i.pravatar.cc/150?u=${t.id}`} 
                      alt={t.name} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                      onError={(e) => {
                        e.currentTarget.src = `https://i.pravatar.cc/150?u=${t.id}`;
                      }}
                    />
                    <div className="absolute inset-0 bg-brand-blue/10 group-hover:bg-transparent transition-colors duration-500" />
                    
                    {/* Name tooltip on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 text-white text-[10px] font-bold uppercase p-1 text-center">
                      {t.name.split(' ')[0]}
                    </div>
                  </motion.button>
                </div>
              );
            })}
          </LayoutGroup>
        </div>

        {/* --- MOBILE VIEW: Auto-Scrolling Marquee with Swipe --- */}
        <div 
          ref={scrollContainerRef}
          className="lg:hidden w-full overflow-x-auto flex gap-6 px-4 my-12 py-8 bg-brand-blue/5 rounded-3xl border border-brand-blue/10 snap-x snap-mandatory hide-scrollbar touch-pan-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {mobileTestimonials.map((t, i) => (
            <div 
              key={`${t.id}-${i}`} 
              className="w-[85vw] sm:w-[350px] shrink-0 bg-white rounded-2xl p-6 shadow-sm border border-border flex flex-col gap-6 snap-center"
            >
              <div className="flex gap-1 text-orange-400">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={14} fill="currentColor" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed italic line-clamp-4">
                "{t.content}"
              </p>
              <div className="mt-auto flex items-center gap-4 pt-4 border-t border-border/50">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-orange-50 shrink-0">
                  <img src={t.image_url || `https://i.pravatar.cc/150?u=${t.id}`} 
                    alt={t.name} 
                    className="w-full h-full object-cover" 
                    onError={(e) => {
                      e.currentTarget.src = `https://i.pravatar.cc/150?u=${t.id}`;
                    }}
                  />
                </div>
                <div>
                  <h4 className="font-bold text-primary text-sm">{t.name}</h4>
                  <p className="text-xs text-brand-blue font-bold tracking-widest uppercase opacity-80">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>


        {/* Footer Stats Redesign */}
        <div className="mt-4 lg:mt-24 mb-10 flex flex-col items-center gap-8 relative z-20">
           {/* Pagination dots (Desktop only) */}
           <div className="hidden lg:flex gap-2">
              {testimonialsToDisplay.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 hover:bg-brand-blue/50 ${i === activeIndex ? "bg-brand-blue w-8" : "bg-brand-blue/10 w-2"}`}
                />
              ))}
           </div>

           <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-4">
                 <div className="flex gap-1 text-orange-400">
                   {[1, 2, 3, 4, 5].map((s) => (
                     <Star key={s} size={18} fill={s <= Math.round(sectionData?.rating || 5) ? "currentColor" : "none"} />
                   ))}
                 </div>
                 <span className="text-lg font-bold text-primary">{(sectionData?.rating || 5.0).toFixed(1)} / 5.0</span>
              </div>
              
              <div className="flex flex-col items-center">
                 <span className="text-7xl md:text-8xl font-black text-primary/10 -mb-8 select-none">{sectionData?.review_count || 2578}</span>
                 <button className="relative z-10 flex items-center gap-2 text-brand-blue font-bold text-sm md:text-base uppercase tracking-[0.2em] hover:gap-4 transition-all group p-4 border border-transparent hover:border-brand-blue/10 rounded-full hover:bg-brand-blue/5">
                   Total User Reviews 
                   <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                 </button>
              </div>
           </div>
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
