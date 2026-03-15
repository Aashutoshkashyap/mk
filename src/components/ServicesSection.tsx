import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FileCheck, Scale, Calculator, Briefcase } from "lucide-react";

const services = [
  {
    icon: FileCheck,
    title: "Audit and Assurance",
    description:
      "Our team combines the right skills and expertise to provide audit and assurance services. We aim to make the process seamless, ensuring our clients maximize the benefits.",
  },
  {
    icon: Scale,
    title: "Corporate Law",
    description:
      "Our firm boasts a dedicated and highly experienced team specializing in Corporate Law Compliances.",
  },
  {
    icon: Calculator,
    title: "Taxation",
    description:
      "Our firm provides extensive tax services designed to keep clients up-to-date with evolving tax laws and offer expert advice on effective tax planning strategies.",
  },
  {
    icon: Briefcase,
    title: "Business Consulting",
    description:
      "We offer a range of financial services, Accounting and Bookkeeping Services, Payroll Processing Services, Management Reporting, Advance Ruling Services and more.",
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="py-20 md:py-28 bg-secondary/50" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-primary">
            Our Services
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            We commitment to deliver valuable, trustworthy, and efficient
            services rooted in their expertise and experience
            in audit, taxation, regulatory compliance, and related business services.
          </p>
        </motion.div>

        <div className="mt-14 grid sm:grid-cols-2 gap-5">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="group relative rounded-2xl bg-card p-8 border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/[0.08] flex items-center justify-center mb-5 group-hover:bg-primary/[0.12] transition-colors">
                <service.icon size={22} className="text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold text-primary mb-3">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border-2 border-primary/20 px-6 py-3 text-sm font-bold text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            Learn More
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
