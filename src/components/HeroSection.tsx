import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useHeroContent } from "@/hooks/useCMS";

const HeroSection = () => {
  const data = useHeroContent();

  const defaultConstructionImg = "/images/hero.jpg";
  const backupConstructionImg = "/images/hero-handshake.png";

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center pt-32 pb-16 overflow-hidden bg-transparent">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[8%] right-[8%] w-[45%] h-[60%] bg-[#888A8C]/[0.08] rounded-full blur-[130px]" />
        <div className="absolute bottom-[5%] left-[5%] w-[35%] h-[40%] bg-primary/[0.04] rounded-full blur-[110px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left Content */}
          <div className="max-w-2xl text-center lg:text-left mx-auto lg:mx-0">
            {/* Capsule Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-transparent border border-[#888A8C] text-[#888A8C] font-bold text-xs uppercase tracking-wider mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
              {data.badge}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-foreground tracking-tight"
            >
              {data.title ? (
                <>
                  {data.title.split(' ').map((word: string, i: number) => (
                    <span key={i} className={i >= 2 ? 'text-primary' : ''}>
                      {word}{' '}
                    </span>
                  ))}
                </>
              ) : (
                <>Pioneering Nepal's <span className="text-primary">Critical Infrastructure &amp; <br className="hidden sm:inline" /> Modern Landmarks.</span></>
              )}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0"
            >
              {data.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-10 flex flex-wrap justify-center lg:justify-start gap-4"
            >
              <Link
                to={data.cta_link || "/projects"}
                className="group inline-flex items-center justify-center gap-2 py-4 px-10 rounded-2xl text-lg font-bold bg-[#888A8C] text-white hover:bg-[#77797B] shadow-xl shadow-black/10 hover:shadow-2xl active:scale-95 transition-all duration-300 border-none"
              >
                <span>{data.cta_text}</span>
                <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform duration-300" />
              </Link>

              <Link
                to={data.secondary_cta_link || "/services"}
                className="inline-flex items-center justify-center py-4 px-10 rounded-2xl bg-white border border-[#888A8C]/30 text-foreground hover:bg-[#888A8C]/10 text-lg font-bold active:scale-95 transition-all duration-300 shadow-sm"
              >
                <span>{data.secondary_cta_text}</span>
              </Link>
            </motion.div>

            {/* Quick Micro Stat Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="mt-10 pt-6 border-t border-[#888A8C]/20 flex items-center justify-center lg:justify-start gap-8 text-xs text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span>ISO 9001 &amp; 45001 Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span>Zero-Harm Safety Record</span>
              </div>
            </motion.div>
          </div>

          {/* Right Visual */}
          <div className="relative flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-[550px] aspect-square flex items-center justify-center"
            >
              {/* Decorative Glows & Spinning Rings */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-[#888A8C]/10 rounded-full blur-3xl" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] border border-dashed border-[#888A8C]/30 rounded-full animate-[spin_40s_linear_infinite]" />

              {/* Image Container */}
              <div className="relative z-10 w-full h-full flex items-center justify-center group">
                <div className="w-[95%] h-[95%] bg-white rounded-[4rem] shadow-2xl border-2 border-[#888A8C]/30 overflow-hidden flex items-center justify-center relative p-3">
                  <div className="w-full h-full rounded-[3.25rem] overflow-hidden relative">
                    <img
                      src={data.image_url?.trim() ? data.image_url : defaultConstructionImg}
                      alt="Construction and Infrastructure Engineering"
                      loading="eager"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.dataset.triedDefault) {
                          target.dataset.triedDefault = "1";
                          target.src = defaultConstructionImg;
                        } else if (!target.dataset.triedBackup) {
                          target.dataset.triedBackup = "1";
                          target.src = backupConstructionImg;
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                    {/* Floating badge inside image */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                      className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[#888A8C]/30 shadow-xl flex items-center justify-between"
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
