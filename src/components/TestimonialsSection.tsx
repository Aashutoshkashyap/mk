import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
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
    image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
  },
  {
    id: "t2",
    name: "Sunil Shrestha",
    role: "Director of Infrastructure Development",
    company: "Provincial Ministry of Physical Infrastructure, Koshi",
    content: "The Saptakoshi River Bridge foundation was one of the most technically challenging caisson-sinking assignments in the region. MK Construction's engineering team deployed precision hydraulic equipment, completing all 12 pier caissons ahead of the flood season.",
    rating: 5,
    project: "Saptakoshi River Bridge",
    image_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
  },
  {
    id: "t3",
    name: "Bikash Thapa",
    role: "Project Manager, Hydraulic Works Division",
    company: "Bagmati Basin Flood Mitigation Project",
    content: "The 18-kilometer flood mitigation dyke and guided spurs built by MK Construction protected vulnerable settlements during the 2024 monsoon flood surge. Their quality control on gabions, geotextile layers, and RCC structures is exemplary.",
    rating: 5,
    project: "Bagmati River Training",
    image_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
  },
  {
    id: "t4",
    name: "Dipendra Sharma",
    role: "Chief Technical Officer",
    company: "Himalayan Power Developers Ltd.",
    content: "For our run-of-river civil package, MK Construction self-performed the headworks weir and 3.8km tunnel excavation with zero safety incidents. Their zero-harm HSE governance and schedule transparency set a benchmark for hydropower contracting in Nepal.",
    rating: 5,
    project: "Upper Trishuli Civil Package",
    image_url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200",
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: dbTestimonials = [] } = useQuery({
    queryKey: ["testimonials-home"],
    queryFn: async () => {
      const { data } = await supabase.from("testimonials").select("*").order("sort_order");
      return data || [];
    },
  });

  const validTestimonials = filterOutLegacyFinancial(dbTestimonials);
  const displayTestimonials = validTestimonials.length > 0 ? validTestimonials : defaultTestimonials;

  // Auto rotate testimonials every 7 seconds
  useEffect(() => {
    if (displayTestimonials.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayTestimonials.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [displayTestimonials.length]);

  const current = displayTestimonials[currentIndex] || displayTestimonials[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? displayTestimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % displayTestimonials.length);
  };

  if (!current) return null;

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-gradient-to-b from-white via-neutral-50/50 to-white relative overflow-hidden">
      {/* Background Subtle Ambience */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-[#888A8C]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-[#888A8C]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold tracking-widest uppercase text-[#888A8C] bg-transparent px-5 py-2 rounded-full border border-[#888A8C] inline-block mb-4 shadow-xs"
          >
            Client Endorsements & Owner Verdicts
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl md:text-5xl font-extrabold text-foreground tracking-tight"
          >
            What Developers & Authorities Say
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-muted-foreground leading-relaxed max-w-2xl mx-auto text-base md:text-lg"
          >
            Delivering structural reliability, rigorous OSHA safety compliance, and proactive budget engineering across monumental civil and commercial contracts.
          </motion.p>
        </div>

        {/* Featured Testimonial Hero Card */}
        <div className="relative rounded-3xl bg-white border-2 border-[#888A8C]/30 p-8 md:p-14 shadow-xl shadow-black/5">
          <Quote className="absolute top-8 right-8 text-[#888A8C]/10 w-24 h-24 pointer-events-none" />

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Author Profile */}
            <div className="lg:col-span-4 flex flex-col items-center text-center lg:border-r lg:border-[#888A8C]/20 lg:pr-8">
              <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-[#888A8C]/30 shadow-xl mb-5 group">
                <img 
                  src={current.image_url || `https://i.pravatar.cc/150?u=${current.id}`} 
                  alt={current.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = `https://i.pravatar.cc/150?u=${current.id}`;
                  }}
                />
              </div>

              <h4 className="font-display text-xl font-bold text-foreground">{current.name}</h4>
              <p className="text-xs font-bold text-[#888A8C] uppercase tracking-wider mt-1">{current.role}</p>
              {current.company && (
                <p className="text-xs text-muted-foreground font-medium mt-0.5">{current.company}</p>
              )}

              {/* Verified Project Badge */}
              <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-transparent border border-[#888A8C]/40 text-[11px] font-semibold text-foreground/80">
                <CheckCircle2 size={13} className="text-[#888A8C] shrink-0" />
                <span className="truncate max-w-[200px]">{current.project || "Verified Construction Contract"}</span>
              </div>
            </div>

            {/* Right: Detailed Testimonial */}
            <div className="lg:col-span-8 flex flex-col justify-between">
              <div>
                <div className="flex gap-1 text-primary mb-6">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={18} fill="currentColor" />
                  ))}
                  <span className="ml-2 text-xs font-bold text-primary">5.0 / 5.0 Rating</span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.blockquote 
                    key={currentIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="text-lg md:text-2xl text-foreground font-medium leading-relaxed italic"
                  >
                    "{current.content}"
                  </motion.blockquote>
                </AnimatePresence>
              </div>

              {/* Navigation Controls */}
              <div className="mt-8 pt-6 border-t border-[#888A8C]/20 flex flex-wrap items-center justify-between gap-4">
                <div className="flex gap-2">
                  {displayTestimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === currentIndex ? "w-8 bg-[#888A8C]" : "w-2 bg-[#888A8C]/30 hover:bg-[#888A8C]/60"
                      }`}
                      aria-label={`Go to review ${idx + 1}`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="w-10 h-10 rounded-full border border-[#888A8C]/30 bg-white hover:bg-[#888A8C]/10 flex items-center justify-center text-foreground hover:text-[#24272A] transition-all active:scale-95 shadow-xs"
                    aria-label="Previous review"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={handleNext}
                    className="w-10 h-10 rounded-full border border-[#888A8C]/30 bg-white hover:bg-[#888A8C]/10 flex items-center justify-center text-foreground hover:text-[#24272A] transition-all active:scale-95 shadow-xs"
                    aria-label="Next review"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Small Bottom Multi-Card Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {displayTestimonials.slice(0, 3).map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setCurrentIndex(idx)}
              className={`p-6 rounded-2xl border-2 transition-all cursor-pointer ${
                idx === currentIndex 
                  ? "border-[#888A8C] bg-neutral-50 shadow-md" 
                  : "border-[#888A8C]/30 bg-white hover:border-[#888A8C]/60 hover:shadow-sm"
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <img 
                  src={item.image_url || `https://i.pravatar.cc/150?u=${item.id}`} 
                  alt={item.name} 
                  className="w-10 h-10 rounded-full object-cover border border-[#888A8C]/30"
                />
                <div>
                  <div className="font-bold text-sm text-foreground">{item.name}</div>
                  <div className="text-[11px] text-muted-foreground line-clamp-1">{item.company || item.role}</div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-3 italic leading-relaxed">
                "{item.content}"
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
