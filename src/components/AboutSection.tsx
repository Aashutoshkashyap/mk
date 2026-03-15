import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 md:py-28" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-[1fr_3fr] gap-10 md:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-primary leading-tight">
              About Us
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Sharp Edge Business Solutions is a firm that provides clients with
              a wide range of services in auditing assurance, taxation,
              regulatory matters, and advisory services. The firm's team
              consists of dedicated and knowledgeable professionals, such as
              Chartered Accountants, Attorneys, and Consultants, offering a
              complete set of company services.
            </p>
            <div className="mt-8">
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-full border-2 border-primary/20 px-6 py-3 text-sm font-bold text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                Learn More
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
