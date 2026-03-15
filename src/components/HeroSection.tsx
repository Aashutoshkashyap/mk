import { motion } from "framer-motion";
import { ArrowRight, Shield, Award, Users } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const stats = [
  { value: "10+", label: "Years Experience", icon: Award },
  { value: "100+", label: "Clients Served", icon: Users },
  { value: "4", label: "Core Services", icon: Shield },
];

const HeroSection = () => {
  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Subtle gradient bg */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-teal/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container max-w-6xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight text-foreground"
          >
            Your Trusted Chartered{" "}
            <span className="text-gradient">Accountants</span> in Nepal
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed"
          >
            Professional CA services for auditing, taxation, and advisory.
            Sharp Edge Business Solutions delivers expertise you can count on.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground hover:bg-navy-light transition-colors shadow-lg shadow-primary/20"
            >
              Get in Touch
              <ArrowRight size={16} />
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-7 py-3.5 text-sm font-semibold text-foreground hover:bg-secondary transition-colors"
            >
              Our Services
            </a>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-16"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <span className="font-display text-3xl md:text-4xl font-bold text-primary">
                {stat.value}
              </span>
              <span className="text-sm text-muted-foreground leading-tight">
                {stat.label.split(" ").map((w, i) => (
                  <span key={i} className="block">{w}</span>
                ))}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-16 rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 border border-border"
        >
          <img
            src={heroImage}
            alt="Sharp Edge Business Solutions team consulting"
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
