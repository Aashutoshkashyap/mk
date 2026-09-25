import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { getIcon } from "@/lib/iconMap";
import PreFooterCTA from "@/components/PreFooterCTA";
import { useSectionVisibility } from "@/hooks/useSectionVisibility";

const defaultConstructionTeam = [
  {
    id: "tm1",
    name: "Marcus Vance, PE, SE",
    role: "Chief Structural Engineer & COO",
    experience: "24+ Yrs Exp",
    bio: "Specializes in deep caisson foundation design, seismic damping, and high-rise structural steel framing for monumental commercial towers exceeding 50 stories.",
    image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
    team_sectors: [
      { id: "ts1", label: "High-Rise Steel", icon_name: "Building2", sort_order: 1 },
      { id: "ts2", label: "Seismic Damping", icon_name: "ShieldCheck", sort_order: 2 },
    ],
  },
  {
    id: "tm2",
    name: "Elena Rostova, LEED AP",
    role: "VP of Virtual Design & 5D BIM",
    experience: "18+ Yrs Exp",
    bio: "Directs pre-construction digital twins, drone LiDAR topography, 4D schedule sequencing, and automated multi-trade clash resolution across all project portfolios.",
    image_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
    team_sectors: [
      { id: "ts3", label: "5D BIM Modeling", icon_name: "Compass", sort_order: 1 },
      { id: "ts4", label: "LEED Platinum", icon_name: "Award", sort_order: 2 },
    ],
  },
  {
    id: "tm3",
    name: "David K. O'Connor, CSP",
    role: "Director of Field Safety & Heavy Operations",
    experience: "26+ Yrs Exp",
    bio: "Manages corporate-wide ISO 45001 safety governance, complex crane tandem-lift rigging engineering, and our 1,200-unit captive heavy equipment fleet.",
    image_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600",
    team_sectors: [
      { id: "ts5", label: "Zero-Harm Safety", icon_name: "HardHat", sort_order: 1 },
      { id: "ts6", label: "Heavy Fleet Ops", icon_name: "Truck", sort_order: 2 },
    ],
  },
];

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
  const displayMembers = members.length > 0 ? members : defaultConstructionTeam;

  return (
    <>
      {isVisible("team") && (
        <>
          {/* Hero Banner */}
          <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-orange-600/10 blur-3xl" />
            </div>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                <span className="text-xs font-bold tracking-widest uppercase text-primary bg-primary/20 px-5 py-2 rounded-full border border-primary/30 inline-block mb-4 shadow-sm">
                  Executive Engineering Leadership
                </span>
                <h1 className="font-display text-4xl md:text-6xl font-extrabold text-white leading-tight">
                  Our Construction Leadership
                </h1>
                <p className="mt-5 text-neutral-300 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                  Decades of combined master-builder experience steering heavy civil, commercial high-rise, and industrial mega-projects with unyielding safety and precision.
                </p>
              </motion.div>
            </div>
          </section>

          <section ref={teamRef} className="py-20 md:py-28 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="grid md:grid-cols-3 gap-8">
                {displayMembers.map((member: any, i: number) => {
                  const sectors = (member.team_sectors || []).sort((a: any, b: any) => a.sort_order - b.sort_order);
                  return (
                    <motion.div 
                      key={member.id} 
                      initial={{ opacity: 0, y: 40 }} 
                      animate={teamInView ? { opacity: 1, y: 0 } : {}} 
                      transition={{ duration: 0.6, delay: 0.12 * i }}
                      className="group rounded-3xl bg-white border-2 border-orange-100 overflow-hidden hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-500 flex flex-col"
                    >
                      <div className="relative h-80 overflow-hidden bg-neutral-900">
                        <img 
                          src={member.image_url || ""} 
                          alt={member.name} 
                          className="w-full h-full object-cover object-top group-hover:scale-108 transition-transform duration-700 ease-out" 
                          loading="lazy" 
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6">
                          <div className="font-display text-xl font-bold text-white leading-snug">{member.name}</div>
                          <div className="text-xs font-semibold text-primary mt-1">{member.role}</div>
                        </div>
                      </div>
                      <div className="p-7 flex flex-col flex-1">
                        <div className="flex items-center gap-2 mb-4">
                          <span className="px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center gap-1.5 border border-primary/20">
                            <Award size={13} /> {member.experience}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-6 leading-relaxed flex-1">{member.bio}</p>
                        <div className="grid grid-cols-2 gap-2 pt-4 border-t border-orange-100">
                          {sectors.map((sector: any) => {
                            const SectorIcon = getIcon(sector.icon_name);
                            return (
                              <div key={sector.id} className="flex items-center gap-2 rounded-xl bg-orange-50/70 border border-orange-100/80 px-3 py-2 text-xs font-semibold text-foreground">
                                <SectorIcon size={14} className="text-primary shrink-0" strokeWidth={1.75} />
                                <span className="truncate">{sector.label}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
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

