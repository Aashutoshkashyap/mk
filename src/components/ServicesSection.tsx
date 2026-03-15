import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FileCheck, Scale, Calculator, Briefcase, ArrowUpRight } from "lucide-react";

const services = [
  {
    icon: FileCheck,
    title: "Audit & Assurance",
    description:
      "Our team combines the right skills and expertise to provide audit and assurance services, ensuring clients maximize the benefits.",
  },
  {
    icon: Scale,
    title: "Corporate Law",
    description:
      "A dedicated and highly experienced team specializing in Corporate Law Compliances across diverse sectors.",
  },
  {
    icon: Calculator,
    title: "Taxation",
    description:
      "Extensive tax services designed to keep clients up-to-date with evolving tax laws and expert advice on effective tax planning.",
  },
  {
    icon: Briefcase,
    title: "Business Consulting",
    description:
      "Accounting, bookkeeping, payroll processing, management reporting, advance ruling services and more.",
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="py-24" ref={ref}>
      <div className="container max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="text-sm font-semibold text-teal uppercase tracking-widest">Our Services</span>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-foreground">
            Comprehensive professional solutions
          </h2>
          <p className="mt-4 text-muted-foreground">
            We deliver valuable, trustworthy, and efficient services rooted in expertise and experience.
          </p>
        </motion.div>

        <div className="mt-16 grid sm:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="group relative p-8 rounded-2xl bg-card border border-border hover:border-teal/30 hover:shadow-xl hover:shadow-teal/5 transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-teal/10 transition-colors">
                  <service.icon size={22} className="text-primary group-hover:text-teal transition-colors" />
                </div>
                <ArrowUpRight
                  size={18}
                  className="text-muted-foreground/0 group-hover:text-teal group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-foreground">{service.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
