import { motion } from "framer-motion";
import heroImage from "@/assets/hero-main.svg";

const HeroSection = () => {
  return (
    <section id="home" className="relative pt-28 pb-10 md:pt-36 md:pb-16 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary/[0.03] blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-[400px] h-[400px] rounded-full bg-brand-blue/[0.03] blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Text */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.1] tracking-tight text-primary"
            >
              Your Trusted Chartered Accountants
              <br />
              <span className="text-primary">in Nepal</span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-5 font-display text-lg sm:text-xl font-semibold text-foreground"
            >
              Professional CA Services for Auditing, Taxation, and Advisory in Nepal
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-4 text-base text-muted-foreground leading-relaxed max-w-lg"
            >
              Sharp Edge Business Solutions is a firm that provides clients with a wide range of services
              in auditing assurance, taxation, regulatory matters, and advisory services.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground hover:bg-brand-navy-dark transition-all duration-200 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
              >
                Get in Touch
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="ml-1">
                  <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a
                href="#about"
                className="inline-flex items-center gap-2 rounded-full border-2 border-border bg-card px-8 py-3.5 text-sm font-bold text-foreground hover:border-primary/20 hover:bg-secondary transition-all duration-200 hover:-translate-y-0.5"
              >
                Learn More
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="ml-1">
                  <path d="M7 1v12M2 8l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </motion.div>
          </div>

          {/* Hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
          >
            <img
              src={heroImage}
              alt="Sharp Edge Business Solutions"
              className="w-full max-w-lg lg:max-w-none"
              style={{ animation: "float 6s ease-in-out infinite" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
