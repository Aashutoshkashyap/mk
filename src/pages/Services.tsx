import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { getIcon } from "@/lib/iconMap";
import PreFooterCTA from "@/components/PreFooterCTA";

const Services = () => {
  const { data: services = [] } = useQuery({
    queryKey: ["services-full"],
    queryFn: async () => {
      const { data } = await supabase.from("services").select("*, sub_services(*)").order("sort_order");
      return data || [];
    },
  });

  return (
    <>
      {/* Hero Banner */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-primary overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-brand-blue/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-brand-green/5 blur-3xl" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center">
            <span className="text-xs font-bold tracking-widest uppercase text-brand-blue">What We Offer</span>
            <h1 className="mt-4 font-display text-4xl md:text-5xl font-extrabold text-primary-foreground leading-tight">Our Services</h1>
            <p className="mt-5 text-primary-foreground/70 max-w-2xl mx-auto">
              We commitment to deliver valuable, trustworthy, and efficient services rooted in their expertise and experience in audit, taxation, regulatory compliance, and related business services.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-20">
          {services.map((service: any, idx: number) => (
            <ServiceBlock key={service.id} service={service} index={idx} />
          ))}
        </div>
      </section>

      <PreFooterCTA />
    </>
  );
};

const ServiceBlock = ({ service, index }: { service: any; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isEven = index % 2 === 0;
  const Icon = getIcon(service.icon_name);
  const subs = (service.sub_services || []).sort((a: any, b: any) => a.sort_order - b.sort_order);

  return (
    <div ref={ref} className="grid md:grid-cols-2 gap-10 items-center">
      <motion.div initial={{ opacity: 0, x: isEven ? -30 : 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }} className={!isEven ? "md:order-2" : ""}>
        {service.image_url ? (
          <div className="relative rounded-2xl overflow-hidden">
            <img src={service.image_url} alt={service.title} className="w-full h-72 md:h-80 object-cover rounded-2xl" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent rounded-2xl" />
            <div className="absolute top-5 left-5 w-14 h-14 rounded-xl bg-card/90 backdrop-blur flex items-center justify-center shadow-lg">
              <Icon size={24} className="text-primary" />
            </div>
          </div>
        ) : (
          <div className="relative rounded-2xl bg-primary/[0.04] border border-border p-12 flex items-center justify-center h-72 md:h-80">
            <Icon size={80} className="text-primary/20" strokeWidth={1} />
            <div className="absolute top-5 left-5 w-14 h-14 rounded-xl bg-primary/[0.08] flex items-center justify-center">
              <Icon size={24} className="text-primary" />
            </div>
          </div>
        )}
      </motion.div>

      <motion.div initial={{ opacity: 0, x: isEven ? 30 : -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.15 }} className={!isEven ? "md:order-1" : ""}>
        <h2 className="font-display text-2xl md:text-3xl font-extrabold text-primary mb-3">{service.title}</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">{service.description}</p>
        <div className="grid grid-cols-2 gap-3">
          {subs.map((sub: any) => {
            const SubIcon = getIcon(sub.icon_name);
            return (
              <div key={sub.id} className="flex items-center gap-2.5 rounded-xl bg-secondary/80 px-4 py-3 text-sm text-foreground">
                <SubIcon size={16} className="text-brand-blue shrink-0" />
                <span className="font-medium">{sub.label}</span>
              </div>
            );
          })}
        </div>
        <Link to="/contact" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-blue hover:gap-3 transition-all">
          Get Inquiry <ArrowRight size={14} />
        </Link>
      </motion.div>
    </div>
  );
};

export default Services;
