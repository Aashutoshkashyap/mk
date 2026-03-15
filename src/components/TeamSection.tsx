import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const team = [
  {
    name: "CA Subrat Sapkota",
    image: "https://sharpedge.com.np/static/img/Subratsabkota.png",
    bio: "CA Subrat Sapkota serves as the managing partner of the Firm, boasting over 10 years of experience in auditing and consulting assignments across various sectors such as Manufacturing, Trading, Telecommunications, Insurance, Banking, Hospitality, Investment & Non-profit organizations.",
  },
  {
    name: "CA Diwash Dahal",
    image: "https://sharpedge.com.np/static/img/CADiwashDahal.png",
    bio: "CA Diwash Dahal holds the position of executive partner in the Firm. Mr. Dahal boasts extensive experience in managing projects across various sectors such as Telecom, Trading, Import & Export, Tobacco Industry, Oil and Gas, Manufacturing, Hydro Power, Distribution, IT, and Service organizations.",
  },
  {
    name: "CA Nar Bahadur Budhayair",
    image: "https://sharpedge.com.np/static/img/CANarBahadurBudhayair.png",
    bio: "CA Nar Bahadur Budhayair serves as the quality control reviewer at the Firm. With extensive experience in overseeing assignments for Insurance, Manufacturing, Hydro, and Financial Service sector organizations, Mr. Budhayair, the QCM of the firm, also holds a position as an Audit faculty in an Institute in Nepal.",
  },
];

const TeamSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="team" className="py-20 md:py-28" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-primary">
            Our Core Team
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            Our Core Team is dedicated to advancing our Firm's growth and
            success. They lead with expertise and commitment, serving as
            the foundation of our practice and nurturing a collaborative
            environment that continually enhances our standards and services.
          </p>
        </motion.div>

        <div className="mt-14 grid sm:grid-cols-3 gap-6">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 * i }}
              className="group rounded-2xl bg-card border border-border p-6 text-center hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="mx-auto w-32 h-32 rounded-2xl overflow-hidden bg-secondary mb-5">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>
              <h3 className="font-display text-lg font-bold text-primary">
                {member.name}
              </h3>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                {member.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
