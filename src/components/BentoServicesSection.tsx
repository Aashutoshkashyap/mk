import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getIcon } from "@/lib/iconMap";
import { PrimaryButton } from "./ui/PrimaryButton";

const BentoServicesSection = () => {
  const { data: services = [] } = useQuery({
    queryKey: ["services-home"],
    queryFn: async () => {
      const { data } = await supabase.from("services").select("*").order("sort_order");
      return data || [];
    },
  });

  if (services.length === 0) return null;

  // We'll use the first 4 or 5 services for the bento layout to keep it clean
  const displayServices = services.slice(0, 5);

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
                     />
                   ) : (
                     <>
                        {index === 0 && (
                          <div className="w-full max-w-[280px] bg-white rounded-xl shadow-xl p-4 scale-95 origin-center -rotate-2 group-hover:rotate-0 transition-transform duration-500">
                             <div className="flex items-center justify-between mb-3">
                               <div className="text-[10px] font-bold text-muted-foreground uppercase">Transaction History</div>
                               {[1, 2, 3, 4].map(i => <div key={i} className={`w-1.5 h-${i === 4 ? 4 : i + 2} rounded-full bg-brand-blue/${i * 20} ${i === 4 ? 'animate-pulse' : ''}`} />)}
                             </div>
                             {[1, 2, 3].map(i => (
                               <div key={i} className="flex items-center gap-3 py-2 border-b border-secondary last:border-0">
                                 <div className={`w-8 h-8 rounded-lg ${i === 2 ? 'bg-orange-100' : 'bg-blue-100'} flex items-center justify-center`}>
                                   <div className={`w-4 h-4 rounded-sm ${i === 2 ? 'bg-orange-400' : 'bg-blue-400'}`} />
                                 </div>
                                 <div className="flex-1">
                                   <div className="h-2 w-16 bg-secondary rounded mb-1" />
                                   <div className="h-1.5 w-10 bg-secondary/60 rounded" />
                                 </div>
                                 <div className="text-xs font-bold text-primary">Rs. {(i * 4500).toLocaleString()}</div>
                               </div>
                             ))}
                          </div>
                        )}
                        {index === 1 && (
                          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-lg w-32 h-32 flex flex-col items-center justify-center border border-white rotate-3 group-hover:rotate-0 transition-transform duration-500">
                             <div className="text-2xl font-black text-brand-blue">84%</div>
                             <div className="text-[10px] font-bold text-muted-foreground uppercase mt-1">Efficiency</div>
                             <div className="w-full bg-secondary h-1.5 rounded-full mt-3 overflow-hidden">
                               <div className="bg-brand-blue h-full w-[84%]" />
                             </div>
                          </div>
                        )}
                        {index === 2 && (
                          <div className="flex flex-col gap-3 w-full max-w-[240px] -rotate-3 group-hover:rotate-0 transition-transform duration-500">
                             <div className="bg-primary/5 rounded-xl p-3 border border-primary/10 mb-1">
                                <div className="text-[10px] font-bold text-primary uppercase mb-0.5">Total Tax Liability</div>
                                <div className="text-lg font-black text-primary">Rs. 1,42,500.00</div>
                             </div>
                             {[1, 2, 3].map(i => (
                               <div key={i} className="bg-white rounded-lg p-2 shadow-md flex items-center gap-3 border border-white/50">
                                 <div className={`w-2 h-2 rounded-full ${i <= 1 ? 'bg-brand-green' : 'bg-orange-400'}`} />
                                 <div className="flex-1">
                                   <div className={`h-2 ${i % 2 === 0 ? 'w-24' : 'w-16'} bg-secondary rounded`} />
                                 </div>
                                 <div className="text-[8px] font-black text-muted-foreground">{i <= 1 ? 'PAID' : 'PENDING'}</div>
                               </div>
                             ))}
                          </div>
                        )}
                        {index === 3 && (
                           <div className="w-full h-full flex items-center justify-center">
                             <svg width="240" height="120" viewBox="0 0 240 120" className="drop-shadow-2xl">
                               <path d="M0 100 Q 60 80, 120 40 T 240 10" fill="none" stroke="url(#gradient)" strokeWidth="6" strokeLinecap="round" />
                               <defs>
                                 <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                   <stop offset="0%" stopColor="#0ea5e9" />
                                   <stop offset="100%" stopColor="#2563eb" />
                                 </linearGradient>
                               </defs>
                               {[40, 120, 200].map(x => (
                                 <circle key={x} cx={x} cy={x === 40 ? 85 : (x === 120 ? 40 : 15)} r="5" fill="white" stroke="#2563eb" strokeWidth="3" />
                               ))}
                             </svg>
                           </div>
                        )}
                        {index > 3 && (
                          <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center rotate-45">
                             <Icon size={32} className="text-primary -rotate-45" />
                          </div>
                        )}
                     </>
                   )}
                </div>

                <div className="relative p-8 md:p-10 flex flex-col flex-1 bg-white">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/[0.08] flex items-center justify-center">
                      <Icon size={20} className="text-primary" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-primary">
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
