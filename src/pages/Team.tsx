import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Briefcase, Award, Building2, Factory,
  Landmark, ShieldCheck, GraduationCap, Wifi, Truck,
  Droplets, Zap, Monitor, Heart, BadgeCheck
} from "lucide-react";

const team = [
  {
    name: "CA Subrat Sapkota",
    role: "Managing Partner",
    image: "https://sharpedge.com.np/static/img/Subratsabkota.png",
    experience: "10+ Years",
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
  const heroRef = useRef(null);
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

      {/* Team Members */}
      <section ref={teamRef} className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
          {team.map((member, i) => {
            const isEven = i % 2 === 0;
            return (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 * i }}
                className="grid md:grid-cols-[280px_1fr] gap-8 items-start"
              >
                {/* Photo Card */}
                <div className={`${!isEven ? "md:order-2" : ""}`}>
                  <div className="relative rounded-2xl overflow-hidden bg-secondary">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full aspect-[3/4] object-cover object-top"
                      loading="lazy"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/80 to-transparent p-5">
                      <div className="font-display text-lg font-bold text-primary-foreground">{member.name}</div>
                      <div className="text-sm text-primary-foreground/70">{member.role}</div>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className={`${!isEven ? "md:order-1" : ""}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="px-3 py-1.5 rounded-full bg-primary/[0.08] text-xs font-bold text-primary flex items-center gap-1.5">
                      <Award size={14} />
                      {member.experience}
                    </div>
                    <div className="px-3 py-1.5 rounded-full bg-brand-blue/[0.08] text-xs font-bold text-brand-blue">
                      {member.role}
                    </div>
                  </div>

                  <h2 className="font-display text-2xl md:text-3xl font-extrabold text-primary mb-2">
                    {member.name}
                  </h2>

                  <p className="text-sm text-muted-foreground mb-6">
                    Extensive experience across diverse industry sectors:
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {member.sectors.map((sector) => (
                      <div
                        key={sector.label}
                        className="flex items-center gap-2 rounded-xl bg-secondary/80 px-4 py-3 text-sm"
                      >
                        <sector.icon size={16} className="text-brand-blue shrink-0" strokeWidth={1.5} />
                        <span className="font-medium text-foreground">{sector.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-secondary/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-primary">
            Work with our experts
          </h2>
          <p className="mt-4 text-muted-foreground">Let our experienced team help your business succeed.</p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground hover:bg-brand-navy-dark transition-all shadow-lg shadow-primary/25"
          >
            Get in Touch <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </>
  );
};

export default Team;
