import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Award, Factory, Landmark, ShieldCheck, Wifi, Truck,
  Zap, Monitor, Heart, BadgeCheck, GraduationCap, Briefcase, Droplets
} from "lucide-react";
import PreFooterCTA from "@/components/PreFooterCTA";

const team = [
  {
    name: "CA Subrat Sapkota",
    role: "Managing Partner",
    image: "https://sharpedge.com.np/static/img/Subratsabkota.png",
    experience: "10+ Years",
    bio: "Over 10 years of experience in auditing and consulting across diverse sectors.",
    sectors: [
      { icon: Factory, label: "Manufacturing" },
      { icon: Briefcase, label: "Trading" },
      { icon: Wifi, label: "Telecom" },
      { icon: ShieldCheck, label: "Insurance" },
      { icon: Landmark, label: "Banking" },
      { icon: Heart, label: "Hospitality" },
    ],
  },
  {
    name: "CA Diwash Dahal",
    role: "Executive Partner",
    image: "https://sharpedge.com.np/static/img/CADiwashDahal.png",
    experience: "10+ Years",
    bio: "Extensive experience managing projects across telecom, manufacturing, hydro, and IT sectors.",
    sectors: [
      { icon: Wifi, label: "Telecom" },
      { icon: Truck, label: "Import & Export" },
      { icon: Droplets, label: "Oil & Gas" },
      { icon: Factory, label: "Manufacturing" },
      { icon: Zap, label: "Hydro Power" },
      { icon: Monitor, label: "IT & Services" },
    ],
  },
  {
    name: "CA Nar Bahadur Budhayair",
    role: "Quality Control Reviewer",
    image: "https://sharpedge.com.np/static/img/CANarBahadurBudhayair.png",
    experience: "15+ Years",
    bio: "Quality control expert overseeing insurance, manufacturing, hydro, and financial services.",
    sectors: [
      { icon: ShieldCheck, label: "Insurance" },
      { icon: Factory, label: "Manufacturing" },
      { icon: Zap, label: "Hydro" },
      { icon: Landmark, label: "Financial Services" },
      { icon: GraduationCap, label: "Audit Faculty" },
      { icon: BadgeCheck, label: "Quality Assurance" },
    ],
  },
];

const Team = () => {
  const teamRef = useRef(null);
  const teamInView = useInView(teamRef, { once: true, margin: "-80px" });

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
            <span className="text-xs font-bold tracking-widest uppercase text-brand-blue">Leadership</span>
            <h1 className="mt-4 font-display text-4xl md:text-5xl font-extrabold text-primary-foreground leading-tight">
              Our Core Team
            </h1>
            <p className="mt-5 text-primary-foreground/70 max-w-2xl mx-auto">
              Dedicated leaders driving growth with expertise and commitment—the foundation of our practice.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Grid — compact cards */}
      <section ref={teamRef} className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 * i }}
                className="group rounded-2xl bg-card border border-border overflow-hidden hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
              >
                {/* Photo */}
                <div className="relative h-72 overflow-hidden bg-secondary">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent p-5">
                    <div className="font-display text-lg font-bold text-primary-foreground">{member.name}</div>
                    <div className="text-sm text-primary-foreground/70">{member.role}</div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full bg-primary/[0.08] text-xs font-bold text-primary flex items-center gap-1.5">
                      <Award size={12} /> {member.experience}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-5">{member.bio}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {member.sectors.map((sector) => (
                      <div
                        key={sector.label}
                        className="flex items-center gap-2 rounded-lg bg-secondary/80 px-3 py-2 text-xs"
                      >
                        <sector.icon size={14} className="text-brand-blue shrink-0" strokeWidth={1.5} />
                        <span className="font-medium text-foreground">{sector.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PreFooterCTA />
    </>
  );
};

export default Team;
