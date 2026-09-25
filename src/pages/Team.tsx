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
    name: "Er. M.K. Shrestha, PE",
    role: "Chairman & Managing Director",
    experience: "28+ Yrs Exp",
    bio: "Founding leader of MK Engineering and Construction. Oversees corporate strategy, mega-infrastructure execution, and multilateral agency partnerships with DoR, ADB, and World Bank across Nepal.",
    image_url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600",
    team_sectors: [
      { id: "ts1", label: "National Highways", icon_name: "Building2", sort_order: 1 },
      { id: "ts2", label: "Major Bridges", icon_name: "ShieldCheck", sort_order: 2 },
    ],
  },
  {
    id: "tm2",
    name: "Er. Rameshwor Adhikari",
    role: "Executive Director & Head of Operations",
    experience: "24+ Yrs Exp",
    bio: "Directs turnkey field mobilization, captive heavy equipment fleet deployments, and river training hydraulic protection works across the Mid-Hills and Terai flood plains.",
    image_url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600",
    team_sectors: [
      { id: "ts3", label: "River Training", icon_name: "Compass", sort_order: 1 },
      { id: "ts4", label: "Fleet Logistics", icon_name: "Truck", sort_order: 2 },
    ],
  },
  {
    id: "tm3",
    name: "Er. Binod K. Thapa, M.Sc.",
    role: "Chief Technical Officer & Head of Engineering",
    experience: "21+ Yrs Exp",
    bio: "Spearheads structural design coordination, seismic detailing per Nepal Building Code (NBC 105:2020), geotechnical foundation validation, and site QA/QC testing labs.",
    image_url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600",
    team_sectors: [
      { id: "ts5", label: "NBC Seismic Code", icon_name: "HardHat", sort_order: 1 },
      { id: "ts6", label: "QA/QC Testing Labs", icon_name: "Award", sort_order: 2 },
    ],
  },
  {
    id: "tm4",
    name: "Sunita Pradhan",
    role: "Director of Contracts & Multilateral Procurement",
    experience: "18+ Yrs Exp",
    bio: "Manages public-sector procurement, FIDIC commercial contract administration, ADB/World Bank compliance frameworks, and tender documentation across all 6 service lines.",
    image_url: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600",
    team_sectors: [
      { id: "ts7", label: "FIDIC Contracts", icon_name: "FileText", sort_order: 1 },
      { id: "ts8", label: "Tender Bidding", icon_name: "CheckCircle2", sort_order: 2 },
    ],
  },
];

import { filterOutLegacyFinancial } from "@/lib/contentFilter";

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
  const validMembers = filterOutLegacyFinancial(members);
  const displayMembers = validMembers.length > 0 ? validMembers : defaultConstructionTeam;

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
                  MK Construction Leadership
                </h1>
                <p className="mt-5 text-neutral-300 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                  Decades of combined engineering leadership steering national highways, river training works, bridges, and infrastructure megaprojects across Nepal.
                </p>
              </motion.div>
            </div>
          </section>

          <section ref={teamRef} className="py-20 md:py-28 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

