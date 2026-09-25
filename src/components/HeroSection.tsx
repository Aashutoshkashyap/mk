import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, Star } from "lucide-react";
import { PrimaryButton } from "./ui/PrimaryButton";

const HeroSection = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["hero"],
    queryFn: async () => {
      const { data } = await supabase.from("hero_section").select("*").limit(1).maybeSingle();
      return data || null;
    },
    staleTime: 1000 * 60 * 5,
  });



  // Default construction engineering visual if no image is uploaded from CMS
  const defaultConstructionImg = "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&q=80&w=1200";

  if (isLoading) {
    return (
      <section className="relative min-h-[90vh] flex items-center pt-32 pb-16 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full animate-pulse">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="max-w-2xl text-center lg:text-left space-y-6">
              <div className="h-16 bg-secondary/80 rounded-2xl w-3/4 mx-auto lg:mx-0"></div>
              <div className="h-16 bg-secondary/80 rounded-2xl w-2/3 mx-auto lg:mx-0"></div>
              <div className="h-20 bg-secondary/40 rounded-2xl w-full mt-8"></div>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-10">
                <div className="h-14 w-40 bg-secondary/80 rounded-2xl"></div>
                <div className="h-14 w-40 bg-secondary/40 rounded-2xl"></div>
              </div>
            </div>
            <div className="relative flex justify-center lg:justify-end">
              <div className="w-full max-w-[550px] aspect-square flex items-center justify-center">
                <div className="w-[95%] h-[95%] bg-secondary/30 rounded-[4rem] border border-border"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center pt-32 pb-16 overflow-hidden bg-white">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[8%] right-[8%] w-[45%] h-[60%] bg-primary/[0.04] rounded-full blur-[130px]" />
        <div className="absolute bottom-[5%] left-[5%] w-[35%] h-[40%] bg-orange-400/[0.03] rounded-full blur-[110px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f9731608_1px,transparent_1px),linear-gradient(to_bottom,#f9731608_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Content */}
          <div className="max-w-2xl text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-xs uppercase tracking-wider mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
              General Contracting & Heavy Civil Engineering
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.7 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-foreground tracking-tight"
            >
              {data?.title ? (
                <>
                  {data.title.split(' ').map((word: string, i: number) => (
                    <span key={i} className={i >= 2 ? 'text-primary' : ''}>
                      {word}{' '}
                    </span>
                  ))}
                </>
              ) : (
                <>Elevate Your <span className="text-primary">Business <br/> Strategy & Growth.</span></>
              )}
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0"
            >
              {data?.description || "Expert consultation and strategic planning to help your business reach its full potential in a dynamic market."}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-10 flex flex-wrap justify-center lg:justify-start gap-4"
            >
              <PrimaryButton 
                as={Link}
                to={data?.cta_link || "/contact"}
                className="group py-4 px-10 rounded-2xl text-lg shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 active:scale-95 transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  {data?.cta_text || "Get Started"}
                  <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                </span>
              </PrimaryButton>

              <PrimaryButton 
                as={Link}
                to={data?.secondary_cta_link || "/about"}
                className="group py-4 px-10 rounded-2xl bg-white border-2 border-primary/20 text-foreground hover:bg-primary/5 hover:border-primary/40 text-lg active:scale-95 transition-all duration-300 shadow-sm"
              >
                <span>{data?.secondary_cta_text || "Learn More"}</span>
              </PrimaryButton>
            </motion.div>

            {/* Quick Micro Stat Indicator */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="mt-10 pt-6 border-t border-border flex items-center justify-center lg:justify-start gap-8 text-xs text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span>ISO 9001 & 45001 Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span>Zero-Harm Safety Record</span>
              </div>
            </motion.div>
          </div>

          {/* Right Visual (High-Res Construction Image with Microanimations) */}
          <div className="relative flex justify-center lg:justify-end">
            <motion.div 
              initial={{ opacity: 0, scale: 0.92 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-[550px] aspect-square flex items-center justify-center"
            >
              {/* Decorative Glows & Spinning Rings */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] border border-dashed border-primary/30 rounded-full animate-[spin_40s_linear_infinite]" />
              
              {/* Image Container with Hover Microanimation */}
              <div className="relative z-10 w-full h-full flex items-center justify-center group">
                <div className="w-[95%] h-[95%] bg-white rounded-[4rem] shadow-[0_30px_70px_-15px_rgba(249,115,22,0.25)] border-2 border-primary/15 overflow-hidden flex items-center justify-center relative p-3">
                  <div className="w-full h-full rounded-[3.25rem] overflow-hidden relative">
                    <img 
                      src={data?.image_url || defaultConstructionImg} 
                      alt="Construction and Infrastructure Engineering" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      onError={(e) => {
                        e.currentTarget.src = defaultConstructionImg;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Floating badge inside image */}
                    <motion.div 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                      className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/40 shadow-xl flex items-center justify-between"
                    >
                      <div>
                        <div className="text-xs uppercase tracking-wider font-extrabold text-primary">Master Builders</div>
                        <div className="text-sm font-bold text-foreground">Turnkey Infrastructure Solutions</div>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-black text-sm shadow-md shadow-primary/30">
                        MK
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
