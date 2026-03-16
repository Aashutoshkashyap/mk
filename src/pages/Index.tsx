import HeroSection from "@/components/HeroSection";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { FileCheck, Scale, Calculator, Briefcase, GraduationCap, ArrowRight, CheckCircle2, Users, Award, Building2 } from "lucide-react";
import PartnersSection from "@/components/PartnersSection";

const stats = [
  { icon: Users, value: "50+", label: "Clients Served" },
  { icon: Award, value: "10+", label: "Years Experience" },
  { icon: Building2, value: "6+", label: "Industry Sectors" },
  { icon: CheckCircle2, value: "100%", label: "Compliance Rate" },
];

const services = [
  { icon: FileCheck, title: "Audit & Assurance", desc: "Statutory, Internal, Forensic, VAT, Stock & Tax Audits", href: "/services" },
  { icon: Scale, title: "Corporate Law", desc: "Full corporate law compliance & regulatory guidance", href: "/services" },
  { icon: Calculator, title: "Taxation", desc: "Tax planning, compliance & advisory services", href: "/services" },
  { icon: Briefcase, title: "Business Consulting", desc: "Accounting, payroll, management reporting & more", href: "/services" },
  { icon: GraduationCap, title: "Training & Workshops", desc: "Professional development & financial training programs", href: "/services" },
];

const Index = () => {
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const statsRef = useRef(null);
  const aboutInView = useInView(aboutRef, { once: true, margin: "-100px" });
  const servicesInView = useInView(servicesRef, { once: true, margin: "-80px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });

  return (
    <>
      <HeroSection />

      {/* Stats Strip */}
      <section ref={statsRef} className="py-12 bg-primary">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="text-center"
              >
                <stat.icon size={28} className="mx-auto mb-3 text-brand-blue" strokeWidth={1.5} />
                <div className="font-display text-3xl md:text-4xl font-extrabold text-primary-foreground">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-primary-foreground/60">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section ref={aboutRef} className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src="https://sharpedge.com.np/static/img/ComanyBuilding.jpg"
                  alt="Sharp Edge Office"
                  className="w-full h-80 object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent rounded-2xl" />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <span className="text-xs font-bold tracking-widest uppercase text-brand-blue">About Us</span>
              <h2 className="mt-3 font-display text-3xl md:text-4xl font-extrabold text-primary leading-tight">
                Trusted Expertise Since Day One
              </h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                Sharp Edge Business Solutions provides auditing, taxation, regulatory, and advisory services through a team of Chartered Accountants, Attorneys, and Consultants.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {["Chartered Accountants", "Legal Experts", "Tax Advisors", "Business Consultants"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-foreground">
                    <CheckCircle2 size={16} className="text-brand-green shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
              <Link
                to="/about"
                className="mt-8 inline-flex items-center gap-2 rounded-full border-2 border-primary/20 px-6 py-3 text-sm font-bold text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                Learn More <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section ref={servicesRef} className="py-20 md:py-28 bg-secondary/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <span className="text-xs font-bold tracking-widest uppercase text-brand-blue">What We Do</span>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-extrabold text-primary">
              Our Services
            </h2>
          </motion.div>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.08 * i }}
              >
                <Link
                  to={service.href}
                  className="group block h-full rounded-2xl bg-card p-7 border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/[0.08] flex items-center justify-center mb-4 group-hover:bg-primary/[0.15] transition-colors">
                    <service.icon size={22} className="text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-primary mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-brand-blue group-hover:gap-2 transition-all">
                    Learn more <ArrowRight size={12} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <PartnersSection />

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="relative rounded-3xl bg-primary overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-brand-blue/20 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-brand-green/10 blur-3xl" />
            <div className="relative z-10 p-10 md:p-16 text-center">
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-primary-foreground">
                Ready to work with us?
              </h2>
              <p className="mt-4 text-primary-foreground/75 max-w-lg mx-auto">
                Get a consultation from our team of Chartered Accountants.
              </p>
              <Link
                to="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-card px-8 py-3.5 text-sm font-bold text-primary hover:bg-secondary transition-all duration-200 shadow-lg hover:-translate-y-0.5"
              >
                Get in Touch <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
