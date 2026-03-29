import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getIcon } from "@/lib/iconMap";
import { PrimaryButton } from "./ui/PrimaryButton";

const BentoServicesSection = () => {
  const { data: services = [], isLoading, error } = useQuery({
    queryKey: ["services-home"],
    queryFn: async () => {
      const { data, error } = await supabase.from("services").select("*").order("sort_order");
      if (error) throw error;
      return data || [];
    },
  });

  // Use the fetched services or professional defaults if still loading or if error occurs
  const defaultServices = [
    { id: '1', title: 'Audit and Assurance', description: 'Comprehensive and credible auditing services ensuring financial integrity.', icon_name: 'ShieldCheck', image_url: null },
    { id: '2', title: 'Taxation Strategy', description: 'Expert guidance on complex tax laws and planning for compliance.', icon_name: 'PieChart', image_url: null },
    { id: '3', title: 'Legal Advisory', description: 'Strategic legal counsel for businesses in dynamic regulatory environments.', icon_name: 'Gavel', image_url: null },
    { id: '4', title: 'Business Consulting', description: 'Unlocking potential through expert management and operational strategies.', icon_name: 'Trophy', image_url: null },
    { id: '5', title: 'Market Research', description: 'Data-driven insights to help navigate the competitive landscape of Nepal.', icon_name: 'BarChart', image_url: null },
  ];

  if (isLoading) return <div className="h-[800px] bg-secondary/20 animate-pulse rounded-[3rem] mx-6 my-24 flex items-center justify-center text-muted-foreground">Loading expert services...</div>;

  const displayServices = services.length > 0 ? services.slice(0, 5) : defaultServices;

  const getCardStyles = (index: number) => {
    switch (index) {
      case 0: // Large Wide
        return "lg:col-span-2 lg:row-span-1";
      case 1: // Small
        return "lg:col-span-1 lg:row-span-1";
      case 2: // Small (Taxation) - Now same height
        return "lg:col-span-1 lg:row-span-1";
      case 3: // Large Wide (Business Consulting)
        return "lg:col-span-2 lg:row-span-1";
      case 4: // Full Width Bottom
        return "lg:col-span-3 lg:row-span-1";
      default:
        return "lg:col-span-1 lg:row-span-1";
    }
  };

  return (
    <section id="services" className="py-32 bg-secondary/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-brand-blue/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-bold tracking-widest uppercase text-brand-blue bg-brand-blue/5 px-4 py-1.5 rounded-full border border-brand-blue/10 inline-block mb-4">What We Do</span>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-extrabold text-primary tracking-tight">Our Services</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
            We provide expert auditing, taxation, and legal advisory services tailored to your business needs in Nepal.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(350px,auto)]">
          {displayServices.map((service, index) => {
            const Icon = getIcon(service.icon_name);
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`${getCardStyles(index)} group relative overflow-hidden rounded-[2.5rem] bg-white/70 backdrop-blur-xl border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-1 flex flex-col`}
              >
                {/* Visual Decoration Wrapper */}
                <div className="relative h-64 w-full overflow-hidden bg-gradient-to-br from-primary/[0.02] to-primary/[0.08] flex items-center justify-center p-8">
                   {service.image_url ? (
                    <img 
                      src={service.image_url} 
                      alt={service.title} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'; // Hide broken image
                        // The relative icon/gradient below will then be visible
                      }}
                    />
                  ) : null}
                  
                  {/* Clean Icon-based Placeholder (Visible if no image or image fails) */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/[0.05] to-brand-blue/[0.05]">
                    <Icon size={64} className="text-primary/20 transition-all duration-700 group-hover:scale-125 group-hover:text-primary/30" />
                  </div>
                </div>

                {/* Floating Icon Box (Top Left Corner) */}
                <div className="absolute top-6 left-6 z-20 w-12 h-12 rounded-2xl bg-white/90 backdrop-blur-md shadow-lg border border-white/50 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                  <Icon size={24} className="text-brand-blue" />
                </div>

                <div className="relative p-8 md:p-10 flex flex-col flex-1 bg-white">
                  <div className="mb-4">
                    <h3 className="font-display text-xl md:text-2xl font-bold text-primary tracking-tight">
                      {service.title}
                    </h3>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed text-sm mb-6 flex-1">
                    {service.description}
                  </p>
                  
                  <Link 
                    to="/services" 
                    className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand-blue group/link"
                  >
                    Explore Details
                    <div className="w-6 h-6 rounded-full bg-brand-blue/10 flex items-center justify-center group-hover/link:bg-brand-blue group-hover/link:text-white transition-all duration-300">
                      <ArrowRight size={12} className="group-hover/link:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {services.length > 5 && (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-16 text-center"
          >
            <PrimaryButton 
              as={Link} 
              to="/services" 
              className="px-10 py-4 shadow-xl shadow-primary/20"
              borderRadius="100px"
              containerClassName="h-14 min-w-[240px]"
            >
              <span className="flex items-center gap-3">
                Discover All Services <ArrowRight size={18} />
              </span>
            </PrimaryButton>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default BentoServicesSection;
