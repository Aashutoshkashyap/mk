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



  // Default professional illustration if no image is uploaded
  const defaultHandshakeImg = "/images/hero-handshake.png";

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
        <div className="absolute top-[10%] right-[10%] w-[40%] h-[60%] bg-brand-blue/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] left-[5%] w-[30%] h-[40%] bg-primary/[0.02] rounded-full blur-[100px]" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Content */}
          <div className="max-w-2xl text-center lg:text-left">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.7 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-primary tracking-tight"
            >
              {data?.title ? (
                <>
                  {data.title.split(' ').map((word: string, i: number) => (
                    <span key={i} className={i >= 2 ? 'text-brand-blue' : ''}>
                      {word}{' '}
                    </span>
                  ))}
                </>
              ) : (
                <>Elevate Your <span className="text-brand-blue">Business <br/> Strategy & Growth.</span></>
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
                className="group py-4 px-10 rounded-2xl text-lg shadow-lg shadow-primary/10"
              >
                <span className="flex items-center gap-2">
                  {data?.cta_text || "Get Started"}
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </PrimaryButton>

              <PrimaryButton 
                as={Link}
                to={data?.secondary_cta_link || "/about"}
                className="group py-4 px-10 rounded-2xl bg-white border-2 border-brand-blue/20 text-primary hover:bg-brand-blue/5 text-lg"
              >
                <span>{data?.secondary_cta_text || "Learn More"}</span>
              </PrimaryButton>
            </motion.div>
          </div>

          {/* Right Visual (Business Illustration) */}
          <div className="relative flex justify-center lg:justify-end">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-[550px] aspect-square flex items-center justify-center"
            >
              {/* Decorative Blobs */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-brand-blue/5 rounded-full blur-3xl" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border border-dashed border-brand-blue/20 rounded-full animate-[spin_30s_linear_infinite]" />
              
              {/* Illustration Container */}
              <div className="relative z-10 w-full h-full flex items-center justify-center group">
                <div className="w-[95%] h-[95%] bg-white rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(108,99,255,0.15)] border border-brand-blue/5 overflow-hidden flex items-center justify-center p-4">
                  <img 
                    src={data?.image_url || defaultHandshakeImg} 
                    alt="Business Partnership" 
                    onError={(e) => {
                      e.currentTarget.src = defaultHandshakeImg;
                    }}
                  />
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
