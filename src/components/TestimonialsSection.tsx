import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ArrowRight, Quote, ChevronLeft, ChevronRight, Award, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useState } from "react";

const defaultTestimonials = [
  { 
    id: 't1', 
    name: 'Eng. Rajendra Prasad Sharma', 
    role: 'Project Director, DoR Package NW-7',
    company: 'Department of Roads, Government of Nepal',
    project: 'Mid-Hill Highway — 42 km Mountain Corridor (₨ 1.9B)',
    content: 'MK Construction Company delivered the Mid-Hill Highway Package 7 with exceptional technical discipline. Their rock excavation and slope bio-engineering teams executed complex terrain work ahead of the monsoon deadline. Zero safety incidents across 14 months of execution.', 
    image_url: 'https://i.pravatar.cc/150?img=11', 
    rating: 5,
    sort_order: 1 
  },
  { 
    id: 't2', 
    name: 'Sushila Rana Magar', 
    role: 'Deputy Secretary, Infrastructure Division',
    company: 'Ministry of Physical Infrastructure & Transport',
    project: 'Saptakoshi River Bridge — 12-span Crossing (₨ 2.4B)',
    content: 'The Saptakoshi River Bridge project faced severe monsoon flooding challenges during construction. MK\'s in-house heavy fleet and deep caisson expertise delivered the bridge on schedule, connecting critical eastern districts and serving over 200,000 residents daily.', 
    image_url: 'https://i.pravatar.cc/150?img=47', 
    rating: 5,
    sort_order: 2 
  },
  { 
    id: 't3', 
    name: 'Birendra Lal Shrestha', 
    role: 'Chief Engineer, Karnali Province',
    company: 'Province Public Works Division, Karnali',
    project: 'Bagmati River Training & Flood Protection (₨ 1.2B)',
    content: 'Flood mitigation work on the Bagmati was technically demanding — continuous RCC spurs, 18 km of armored dykes, all executed during aggressive timelines. MK\'s project team maintained daily progress reporting and completed with full structural integrity.', 
    image_url: 'https://i.pravatar.cc/150?img=12', 
    rating: 5,
    sort_order: 3 
  },
  { 
    id: 't4', 
    name: 'Dr. Manisha Gurung', 
    role: 'Executive Director, Civil Division',
    company: 'Nepal Electricity Authority (NEA)',
    project: 'Upper Trishuli Hydropower Civil Package (₨ 3.1B)',
    content: 'The headrace tunnel excavation at Upper Trishuli required specialized drill-and-blast geotechnical engineering. MK Construction\'s tunnel team delivered 3.8 km of headrace on schedule, demonstrating the technical capacity needed for Nepal\'s energy independence goals.', 
    image_url: 'https://i.pravatar.cc/150?img=49', 
    rating: 5,
    sort_order: 4 
  },
];

import { filterOutLegacyFinancial } from "@/lib/contentFilter";

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ["testimonials-home"],
    queryFn: async () => {
      const { data, error } = await supabase.from("testimonials").select("*").order("sort_order");
      if (error) throw error;
      return data || [];
    },
  });

  const validTestimonials = filterOutLegacyFinancial(testimonials);
  const displayTestimonials = validTestimonials.length > 0 ? validTestimonials : defaultTestimonials;
  const current = displayTestimonials[currentIndex] || defaultTestimonials[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % displayTestimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + displayTestimonials.length) % displayTestimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-gradient-to-b from-white via-orange-50/20 to-white relative overflow-hidden">
      {/* Background Subtle Ambience */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-orange-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold tracking-widest uppercase text-primary bg-primary/10 px-5 py-2 rounded-full border border-primary/20 inline-block mb-4 shadow-xs"
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
        <div className="relative rounded-3xl bg-white border-2 border-orange-100 p-8 md:p-14 shadow-xl shadow-primary/5">
          <Quote className="absolute top-8 right-8 text-primary/10 w-24 h-24 pointer-events-none" />

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Author Profile */}
            <div className="lg:col-span-4 flex flex-col items-center text-center lg:border-r lg:border-orange-100 lg:pr-8">
              <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-orange-100 shadow-xl mb-5 group">
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
              <p className="text-xs font-bold text-primary uppercase tracking-wider mt-1">{current.role}</p>
              {current.company && (
                <p className="text-xs text-muted-foreground font-medium mt-0.5">{current.company}</p>
              )}

              {/* Verified Project Badge */}
              <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-200/80 text-[11px] font-semibold text-foreground/80">
                <CheckCircle2 size={13} className="text-primary shrink-0" />
                <span className="truncate max-w-[200px]">{current.project || "Verified Construction Contract"}</span>
              </div>
            </div>

            {/* Right: Detailed Testimonial */}
            <div className="lg:col-span-8 flex flex-col justify-between">
              <div>
                <div className="flex gap-1 text-orange-400 mb-6">
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
              <div className="mt-8 pt-6 border-t border-orange-100 flex flex-wrap items-center justify-between gap-4">
                <div className="flex gap-2">
                  {displayTestimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === currentIndex ? "w-8 bg-primary" : "w-2 bg-orange-200 hover:bg-orange-300"
                      }`}
                      aria-label={`Go to review ${idx + 1}`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="w-10 h-10 rounded-full border border-orange-200 bg-white hover:bg-orange-50 flex items-center justify-center text-foreground hover:text-primary transition-all active:scale-95 shadow-xs"
                    aria-label="Previous review"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={handleNext}
                    className="w-10 h-10 rounded-full border border-orange-200 bg-white hover:bg-orange-50 flex items-center justify-center text-foreground hover:text-primary transition-all active:scale-95 shadow-xs"
                    aria-label="Next review"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Small Bottom Multi-Card Grid for quick scan */}
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
                  ? "border-primary bg-orange-50/50 shadow-md" 
                  : "border-orange-100 bg-white hover:border-primary/40 hover:shadow-sm"
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <img 
                  src={item.image_url || `https://i.pravatar.cc/150?u=${item.id}`} 
                  alt={item.name} 
                  className="w-10 h-10 rounded-full object-cover border border-orange-200"
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
