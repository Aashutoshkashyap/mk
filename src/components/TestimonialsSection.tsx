import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion, useScroll, useTransform } from "framer-motion";
import { Quote, User, Star } from "lucide-react";
import { useRef } from "react";

const TestimonialCard = ({ testimonial, index, progress, range, targetScale }: any) => {
  const container = useRef(null);
  const scale = useTransform(progress, range, [1, targetScale]);
  
  return (
    <div key={testimonial.id} ref={container} className="min-h-[60vh] md:h-screen flex items-center justify-center sticky top-0 py-4 md:py-10">
      <motion.div 
        style={{ 
          scale,
          top: `calc(10vh + ${index * 15}px)` 
        }}
        className="relative p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] bg-white border border-[#eef2f7] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.08)] max-w-2xl w-full flex flex-col transition-shadow duration-500 hover:shadow-[0_60px_120px_-30px_rgba(0,0,0,0.12)]"
      >
        <div className="absolute top-4 right-8 md:top-8 md:right-12 text-primary/[0.03]">
          <Quote size={80} className="md:w-[120px] md:h-[120px]" />
        </div>

        <div className="relative z-10 flex flex-col h-full">
          {/* Rating */}
          <div className="flex gap-1 text-yellow-500 mb-6 md:mb-8">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={16} className="fill-yellow-400" />
            ))}
          </div>

          <p className="text-lg md:text-2xl text-[#1a1c1e] font-medium leading-relaxed mb-8 md:mb-12 italic">
            "{testimonial.content}"
          </p>

          <div className="mt-auto pt-6 md:pt-8 border-t border-[#f0f3f7] flex items-center gap-4 md:gap-5">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-white shadow-md bg-secondary shrink-0">
              {testimonial.image_url ? (
                <img src={testimonial.image_url} alt={testimonial.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary/5">
                  <User size={20} className="md:w-7 md:h-7 text-primary/20" />
                </div>
              )}
            </div>
            <div>
              <h4 className="font-bold text-[#1a1c1e] text-base md:text-lg">{testimonial.name}</h4>
              {testimonial.role && <p className="text-[10px] md:text-sm text-brand-blue font-bold tracking-widest uppercase opacity-80">{testimonial.role}</p>}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const TestimonialsSection = () => {
  const container = useRef(null);
  const { data: testimonials = [] } = useQuery({
    queryKey: ["testimonials-home"],
    queryFn: async () => {
      const { data } = await supabase.from("testimonials").select("*").order("sort_order");
      return data || [];
    },
  });

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" ref={container} className="relative bg-white lg:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-24 lg:sticky lg:top-32 h-fit">
          <span className="text-xs font-bold tracking-widest uppercase text-brand-blue bg-brand-blue/5 px-4 py-1.5 rounded-full border border-brand-blue/10 inline-block mb-4">Trust & Collaboration</span>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold text-primary tracking-tight">
            What our happy <br/> <span className="text-brand-blue">clients</span> say!
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Experience the "Sharp Edge" difference through the voices of those we serve.
          </p>
        </div>

        <div className="relative mt-12 pb-24">
          {testimonials.map((testimonial: any, i: number) => {
            const targetScale = 1 - ((testimonials.length - i) * 0.05);
            return (
              <TestimonialCard 
                key={testimonial.id} 
                testimonial={testimonial} 
                index={i} 
                progress={scrollYProgress}
                range={[i * (1 / testimonials.length), 1]}
                targetScale={targetScale}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
