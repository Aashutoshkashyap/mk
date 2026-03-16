import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  FileCheck, Scale, Calculator, Briefcase, GraduationCap,
  ArrowRight, ClipboardCheck, ShieldCheck, Search,
  FileText, BarChart3, BookOpen, Landmark, Receipt, Users2,
  Wallet, ScrollText, Gavel, Building, FileKey, BadgeCheck,
  PieChart, HandCoins, Banknote, TrendingUp
} from "lucide-react";
import PreFooterCTA from "@/components/PreFooterCTA";

const services = [
  {
    icon: FileCheck,
    title: "Audit & Assurance",
    image: "https://sharpedge.com.np/static/img/ourservices/AuditandAssurance.png",
    desc: "Enhancing credibility of financial statements and building trust with stakeholders.",
    subServices: [
      { icon: ClipboardCheck, label: "Statutory Audit" },
      { icon: Search, label: "Internal Audits" },
      { icon: ShieldCheck, label: "Compliance Audit" },
      { icon: FileText, label: "Forensic Audit" },
      { icon: BarChart3, label: "Management Audits" },
      { icon: Receipt, label: "VAT Audit" },
      { icon: BookOpen, label: "Stock Audit" },
      { icon: Landmark, label: "Tax Audit" },
    ],
  },
  {
    icon: Scale,
    title: "Corporate Law",
    image: "https://sharpedge.com.np/static/img/ourservices/CorporateLaw.png",
    desc: "Comprehensive guidance to navigate corporate law complexities with confidence.",
    subServices: [
      { icon: Gavel, label: "Regulatory Compliance" },
      { icon: Building, label: "Company Formation" },
      { icon: FileKey, label: "Legal Documentation" },
      { icon: BadgeCheck, label: "Corporate Governance" },
    ],
  },
  {
    icon: Calculator,
    title: "Taxation",
    image: "https://sharpedge.com.np/static/img/ourservices/Taxation.png",
    desc: "Proactive tax advisory for optimizing positions and achieving financial goals.",
    subServices: [
      { icon: PieChart, label: "Tax Planning" },
      { icon: ScrollText, label: "Tax Compliance" },
      { icon: HandCoins, label: "Tax Advisory" },
      { icon: Banknote, label: "Transfer Pricing" },
    ],
  },
  {
    icon: Briefcase,
    title: "Business Consulting",
    desc: "Comprehensive financial and advisory services to drive business growth.",
    subServices: [
      { icon: BookOpen, label: "Accounting & Bookkeeping" },
      { icon: Users2, label: "Payroll Processing" },
      { icon: BarChart3, label: "Management Reporting" },
      { icon: Wallet, label: "Advance Ruling Services" },
      { icon: TrendingUp, label: "Financial Advisory" },
    ],
  },
  {
    icon: GraduationCap,
    title: "Training & Workshops",
    image: "https://sharpedge.com.np/static/img/ourservices/Trainingandworkshops.png",
    desc: "Programs to equip professionals with skills for financial and regulatory challenges.",
    subServices: [
      { icon: BarChart3, label: "Financial Analysis" },
      { icon: Receipt, label: "Taxation Training" },
      { icon: FileCheck, label: "Audit & Assurance" },
      { icon: BookOpen, label: "NFRS Training" },
      { icon: ShieldCheck, label: "Risk Management" },
      { icon: BadgeCheck, label: "Corporate Governance" },
    ],
  },
];

const Services = () => {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-primary overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-brand-blue/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-brand-green/5 blur-3xl" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <span className="text-xs font-bold tracking-widest uppercase text-brand-blue">What We Offer</span>
            <h1 className="mt-4 font-display text-4xl md:text-5xl font-extrabold text-primary-foreground leading-tight">
              Our Services
            </h1>
            <p className="mt-5 text-primary-foreground/70 max-w-2xl mx-auto">
              Valuable, trustworthy, and efficient services rooted in expertise across audit, taxation, regulatory compliance, and advisory.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-20">
          {services.map((service, idx) => (
            <ServiceBlock key={service.title} service={service} index={idx} />
          ))}
        </div>
      </section>

      <PreFooterCTA />
    </>
  );
};

const ServiceBlock = ({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className={`grid md:grid-cols-2 gap-10 items-center`}>
      <motion.div
        initial={{ opacity: 0, x: isEven ? -30 : 30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
        className={`${!isEven ? "md:order-2" : ""}`}
      >
        {service.image ? (
          <div className="relative rounded-2xl overflow-hidden">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-72 md:h-80 object-cover rounded-2xl"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent rounded-2xl" />
            <div className="absolute top-5 left-5 w-14 h-14 rounded-xl bg-card/90 backdrop-blur flex items-center justify-center shadow-lg">
              <service.icon size={24} className="text-primary" />
            </div>
          </div>
        ) : (
          <div className="relative rounded-2xl bg-primary/[0.04] border border-border p-12 flex items-center justify-center h-72 md:h-80">
            <service.icon size={80} className="text-primary/20" strokeWidth={1} />
            <div className="absolute top-5 left-5 w-14 h-14 rounded-xl bg-primary/[0.08] flex items-center justify-center">
              <service.icon size={24} className="text-primary" />
            </div>
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: isEven ? 30 : -30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.15 }}
        className={`${!isEven ? "md:order-1" : ""}`}
      >
        <h2 className="font-display text-2xl md:text-3xl font-extrabold text-primary mb-3">
          {service.title}
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-6">{service.desc}</p>
        <div className="grid grid-cols-2 gap-3">
          {service.subServices.map((sub) => (
            <div
              key={sub.label}
              className="flex items-center gap-2.5 rounded-xl bg-secondary/80 px-4 py-3 text-sm text-foreground"
            >
              <sub.icon size={16} className="text-brand-blue shrink-0" />
              <span className="font-medium">{sub.label}</span>
            </div>
          ))}
        </div>
        <Link
          to="/contact"
          className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-blue hover:gap-3 transition-all"
        >
          Get Inquiry <ArrowRight size={14} />
        </Link>
      </motion.div>
    </div>
  );
};

export default Services;
