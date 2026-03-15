import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const team = [
  {
    name: "CA Subrat Sapkota",
    role: "Managing Partner",
    image: "https://sharpedge.com.np/static/img/Subratsabkota.png",
    bio: "Over 10 years of experience in auditing and consulting across Manufacturing, Telecom, Insurance, Banking, and more.",
  },
  {
    name: "CA Diwash Dahal",
    role: "Executive Partner",
    image: "https://sharpedge.com.np/static/img/CADiwashDahal.png",
    bio: "Extensive experience managing projects across Telecom, Trading, Manufacturing, Hydro Power, IT and more.",
  },
  {
    name: "CA Nar Bahadur Budhayair",
    role: "Quality Control Reviewer",
    image: "https://sharpedge.com.np/static/img/CANarBahadurBudhayair.png",
    bio: "Oversees assignments for Insurance, Manufacturing, Hydro, and Financial Service sector organizations.",
  },
];

const TeamSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="team" className="py-24 bg-card" ref={ref}>
      <div className="container max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="text-sm font-semibold text-teal uppercase tracking-widest">Our Team</span>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-foreground">
            Meet our core leadership
          </h2>
          <p className="mt-4 text-muted-foreground">
            Dedicated professionals driving growth and excellence.
          </p>
        </motion.div>

        <div className="mt-16 grid sm:grid-cols-3 gap-8">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 * i }}
              className="text-center group"
            >
              <div className="relative mx-auto w-40 h-40 rounded-2xl overflow-hidden bg-secondary border border-border group-hover:border-teal/30 transition-colors">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-foreground">{member.name}</h3>
              <p className="text-sm font-medium text-teal">{member.role}</p>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
