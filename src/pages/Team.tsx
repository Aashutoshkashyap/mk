import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { getIcon } from "@/lib/iconMap";
import PreFooterCTA from "@/components/PreFooterCTA";
import { useSectionVisibility } from "@/hooks/useSectionVisibility";

const Team = () => {
  const teamRef = useRef(null);
  const teamInView = useInView(teamRef, { once: true, margin: "-80px" });

  const { data: members = [], isLoading } = useQuery({
    queryKey: ["team"],
    queryFn: async () => {
      const { data } = await supabase.from("team_members").select("*, team_sectors(*)").order("sort_order");
      return data || [];
    },
    staleTime: 1000 * 60 * 5,
  });

  const { isVisible } = useSectionVisibility();

  return (
    <>
      {isVisible("team") && (
        <>
          {/* Hero Banner */}
          <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-primary overflow-hidden">

        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-brand-blue/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-brand-green/5 blur-3xl" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center">
            <span className="text-xs font-bold tracking-widest uppercase text-brand-blue">Leadership</span>
            <h1 className="mt-4 font-display text-4xl md:text-5xl font-extrabold text-primary-foreground leading-tight">Our Core Team</h1>
            <p className="mt-5 text-primary-foreground/70 max-w-2xl mx-auto">
              Our Core Team is dedicated to advancing our Firm's growth and success. They lead with expertise and commitment, serving as the foundation of our practice and nurturing a collaborative environment that continually enhances our standards and services.
            </p>
          </motion.div>
        </div>
      </section>

      <section ref={teamRef} className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap justify-center gap-8">
            {isLoading ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="rounded-2xl bg-secondary/30 border border-border overflow-hidden w-full md:w-[calc(33.333%-1.5rem)] min-w-[300px] h-[500px] animate-pulse" />
              ))
            ) : (
              members.map((member: any, i: number) => {
                const sectors = (member.team_sectors || []).sort((a: any, b: any) => a.sort_order - b.sort_order);
                return (
                  <motion.div key={member.id} initial={{ opacity: 0, y: 40 }} animate={teamInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.15 * i }}
                    className="group rounded-2xl bg-card border border-border overflow-hidden hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 w-full md:w-[calc(33.333%-1.5rem)] min-w-[300px]">
                    <div className="relative h-72 overflow-hidden bg-secondary">
                      <img src={member.image_url || ""} alt={member.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent p-5">
                        <div className="font-display text-lg font-bold text-primary-foreground">{member.name}</div>
                        <div className="text-sm text-primary-foreground/70">{member.role}</div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="px-3 py-1 rounded-full bg-primary/[0.08] text-xs font-bold text-primary flex items-center gap-1.5">
                          <Award size={12} /> {member.experience}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-5">{member.bio}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {sectors.map((sector: any) => {
                          const SectorIcon = getIcon(sector.icon_name);
                          return (
                            <div key={sector.id} className="flex items-center gap-2 rounded-lg bg-secondary/80 px-3 py-2 text-xs">
                              <SectorIcon size={14} className="text-brand-blue shrink-0" strokeWidth={1.5} />
                              <span className="font-medium text-foreground">{sector.label}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </section>
        </>
      )}

      <PreFooterCTA />
    </>
  );
};

export default Team;
