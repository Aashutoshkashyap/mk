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
      const { data } = await supabase.from("hero_section").select("*").maybeSingle();
      return data;
    },
  });

  const avatars = [
    "https://i.pravatar.cc/150?u=1",
    "https://i.pravatar.cc/150?u=2",
    "https://i.pravatar.cc/150?u=3",
    "https://i.pravatar.cc/150?u=4"
  ];

  // Default professional illustration if no image is uploaded
  const defaultHandshakeImg = "/images/hero-handshake.png";

  if (isLoading) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center bg-white">
        <div className="animate-pulse flex flex-col items-center gap-4 text-center">
          <div className="h-16 w-96 bg-secondary rounded-2xl" />
          <div className="h-6 w-64 bg-secondary rounded-lg" />
        </div>
      </div>
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
              className="font-display text-5xl sm:text-6xl lg:text-[5rem] font-bold leading-[1.1] text-primary tracking-tight"
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
              className="mt-8 text-xl text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0"
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
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-12 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6"
            >
              <div className="flex -space-x-3">
                {avatars.map((url, i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-white overflow-hidden shadow-md bg-secondary shrink-0">
                    <img src={url} alt="User" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="text-sm font-semibold text-muted-foreground text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-1.5 mb-0.5">
                  <span className="text-primary font-bold text-lg">5,000+</span>
                  <div className="flex gap-0.5 text-orange-400">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={12} fill="currentColor" />)}
                  </div>
                </div>
                Trusted global partners and entrepreneurs
              </div>
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
