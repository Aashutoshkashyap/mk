import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle } from "lucide-react";

const highlights = [
  "Chartered Accountants, Attorneys & Consultants",
  "Comprehensive auditing & assurance services",
  "Expert taxation & regulatory advisory",
  "Tailored solutions for every business size",
];

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 bg-card" ref={ref}>
      <div className="container max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="text-sm font-semibold text-teal uppercase tracking-widest">About Us</span>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-foreground leading-tight">
              A firm built on expertise and trust
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Sharp Edge Business Solutions is a firm that provides clients with a wide range of services
              in auditing assurance, taxation, regulatory matters, and advisory services. The firm's team
              consists of dedicated and knowledgeable professionals offering a complete set of company services.
            </p>
            <ul className="mt-8 space-y-3">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-foreground">
                  <CheckCircle size={18} className="text-teal mt-0.5 shrink-0" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl bg-secondary flex items-center justify-center overflow-hidden border border-border">
              <div className="text-center p-12">
                <span className="font-display text-7xl font-bold text-gradient">10+</span>
                <p className="mt-4 text-lg font-medium text-foreground">Years of Professional Excellence</p>
                <p className="mt-2 text-sm text-muted-foreground">Serving businesses across Nepal</p>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-xl bg-teal/10 -z-10" />
            <div className="absolute -top-4 -left-4 w-16 h-16 rounded-lg bg-primary/10 -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
