import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const TeamSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const { data: team = [], isLoading } = useQuery({
    queryKey: ["team"],
    queryFn: async () => {
      const { data } = await supabase.from("team_members").select("*").order("sort_order");
      return data || [];
    },
  });

  if (isLoading) return null;
  if (team.length === 0) return null;

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
                  src={member.image_url || ""}
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
