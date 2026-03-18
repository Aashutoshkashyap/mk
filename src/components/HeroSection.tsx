import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, CheckCircle2, Star, Users } from "lucide-react";
import { PrimaryButton } from "./ui/PrimaryButton";

const HeroSection = () => {
  const { data } = useQuery({
    queryKey: ["hero"],
    queryFn: async () => {
      const { data } = await supabase.from("hero_section").select("*").single();
      return data;
    },
  });

  const avatars = [
    "https://www.gravatar.com/avatar/6c8585e5d36e2f5b48aec07710c08d50?d=retro",
    "https://www.gravatar.com/avatar/a123e456b78901234567890123456789?d=identicon",
    "https://www.gravatar.com/avatar/246b9788f6153f3e1b369f6922d0d085?d=retro",
    "https://www.gravatar.com/avatar/4f64c9f81bb0d4ee969aaf7b4a5a6f40?d=identicon"
  ];

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden bg-white">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[50%] h-[100%] bg-gradient-to-l from-brand-blue/[0.03] to-transparent" />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/[0.03] blur-[120px]" />
        <div className="absolute top-1/2 -left-40 w-[500px] h-[500px] rounded-full bg-brand-blue/[0.05] blur-[150px]" />
        
        {/* Wavy Pattern SVG (Inspired by reference) */}
        <svg className="absolute top-1/2 right-0 -translate-y-1/2 opacity-[0.05] w-[400px] h-[600px]" viewBox="0 0 400 600" fill="none">
          <path d="M100 0C150 100 50 200 100 300C150 400 50 500 100 600" stroke="currentColor" strokeWidth="2" strokeDasharray="8 8" className="text-primary" />
          <path d="M200 0C250 100 150 200 200 300C250 400 150 500 200 600" stroke="currentColor" strokeWidth="2" strokeDasharray="8 8" className="text-primary" />
          <path d="M300 0C350 100 250 200 300 300C350 400 250 500 300 600" stroke="currentColor" strokeWidth="2" strokeDasharray="8 8" className="text-primary" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          
          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-[10px] font-black uppercase tracking-widest mb-8 border border-brand-blue/10"
            >
              <CheckCircle2 size={12} strokeWidth={3} />
              The Verified Professional Solution
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.7 }}
              className="font-display text-5xl sm:text-6xl lg:text-[4.5rem] font-black leading-[0.95] tracking-tighter text-[#1a1c1e]"
            >
              Empowering <span className="text-brand-blue">Premier</span> <br/> 
              Financial Success <br/>
              for Leading Talent.
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-8 text-lg text-[#4a4d55] leading-relaxed max-w-lg opacity-80"
            >
              Automatically track your business growth, compliance hours, and tax efficiency with curated advisory tailored for <strong>experts in Nepal</strong>.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-10 flex flex-wrap items-center gap-6"
            >
              <PrimaryButton 
                as={Link}
                to={data?.cta_link || "/contact"}
                className="group py-5 px-10"
              >
                <span className="flex items-center gap-3">
                  Start Free Audit
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-brand-blue transition-colors">
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </span>
              </PrimaryButton>
              
              <div className="flex flex-col gap-2">
                <div className="flex -space-x-3">
                  {avatars.map((url, i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-md bg-secondary">
                      <img src={url} alt="Expert" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                  <span className="text-[#1a1c1e]">Trusted by experts</span>
                  <div className="flex gap-0.5 text-brand-blue">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={8} fill="currentColor" />)}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Visual (Mock UI / Dashboard) */}
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, x: 50 }} 
              animate={{ opacity: 1, scale: 1, x: 0 }} 
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative z-10 mx-auto lg:ml-auto max-w-[450px]"
            >
              {/* Main Dashboard Mockup */}
              <div className="bg-[#fcfdff] rounded-[3.5rem] p-6 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] border border-[#eef2f7] relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/[0.03] rounded-bl-[4rem]" />
                 
                 {/* Header Mockup */}
                 <div className="flex items-center justify-between mb-8">
                    <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center">
                       <div className="w-3 h-3 rounded-full bg-brand-blue" />
                    </div>
                    <div className="flex gap-2">
                       <div className="w-2 h-2 rounded-full bg-secondary" />
                       <div className="w-2 h-2 rounded-full bg-secondary" />
                    </div>
                 </div>

                 {/* Content Mockup */}
                 <div className="space-y-6">
                    <div className="p-5 bg-white rounded-3xl border border-[#f0f3f7] shadow-sm transform group-hover:scale-[1.02] transition-transform duration-500">
                       <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-3">Weekly Update</div>
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center">
                             <div className="w-6 h-6 rounded-lg bg-orange-400" />
                          </div>
                          <div>
                             <div className="h-2 w-24 bg-[#1a1c1e]/10 rounded mb-2" />
                             <div className="h-1.5 w-16 bg-[#1a1c1e]/5 rounded" />
                          </div>
                          <div className="ml-auto w-2 h-2 rounded-full bg-brand-green" />
                       </div>
                    </div>

                    <div className="p-5 bg-white rounded-3xl border border-[#f0f3f7] shadow-sm transform translate-x-4 group-hover:translate-x-6 transition-transform duration-700">
                       <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-3">Audit Progress</div>
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
                             <div className="w-6 h-6 rounded-lg bg-brand-blue" />
                          </div>
                          <div className="flex-1">
                             <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: "75%" }}
                                  transition={{ duration: 1, delay: 1 }}
                                  className="h-full bg-brand-blue" 
                                />
                             </div>
                          </div>
                          <div className="text-xs font-black">75%</div>
                       </div>
                    </div>

                    <div className="p-5 bg-white rounded-3xl border border-[#f0f3f7] shadow-sm transform -translate-x-2 group-hover:-translate-x-4 transition-transform duration-700">
                       <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-3">Upcoming Deadline</div>
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-pink-100 flex items-center justify-center">
                             <div className="w-6 h-6 rounded-lg bg-pink-400" />
                          </div>
                          <div>
                             <div className="h-2 w-32 bg-[#1a1c1e]/10 rounded" />
                          </div>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Floating Element 1: Circular Portrait */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-4 sm:-right-8 top-1/2 -translate-y-1/2 z-20 w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 sm:border-8 border-white shadow-2xl overflow-hidden hidden sm:block"
              >
                 <img src="https://www.gravatar.com/avatar/c3fb9f9dd5ee4f6fb652ae0720516bc9?d=retro&s=300" alt="" className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-brand-blue/20 mix-blend-overlay" />
              </motion.div>

              {/* Floating Element 2: Efficiency Badge */}
              <motion.div 
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-6 -left-6 sm:-bottom-10 sm:-left-12 z-20 bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] flex flex-col items-center border border-[#eef2f7]"
              >
                 <div className="text-3xl font-black text-brand-blue mb-1">94.2%</div>
                 <div className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">Tax Efficiency</div>
                 <div className="mt-4 flex gap-1">
                    {[1, 2, 3, 4].map(i => <div key={i} className={`w-1.5 h-${i === 4 ? 4 : i + 2} rounded-full bg-brand-blue/${i * 20}`} />)}
                 </div>
              </motion.div>
            </motion.div>

            {/* Background Decorative Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] -z-10 opacity-20 pointer-events-none">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full border border-primary/20" />
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full border border-brand-blue/20" />
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full border border-primary/10" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
