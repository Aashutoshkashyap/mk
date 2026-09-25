import { motion } from "framer-motion";
import { Compass, Hammer, Building2, ShieldCheck, Award } from "lucide-react";

const STEPS = [
  {
    step: "01",
    title: "Feasibility & 5D BIM Virtual Design",
    description: "Our in-house VDC engineers construct 4D timeline simulations and 5D cost-loaded digital models before breaking ground, identifying and resolving multi-trade spatial clashes.",
    icon: Compass,
    tags: ["Drone LiDAR Topography", "Spatial Clash Detection", "GMP Cost Validation"],
  },
  {
    step: "02",
    title: "Geotechnical & Subterranean Engineering",
    description: "Executing complex ground stabilization, overlapping secant pile walls, high-capacity rock tiebacks, and deep caisson foundations with captive heavy drill rigs.",
    icon: Hammer,
    tags: ["Deep Caisson Boring", "Secant Slurry Walls", "Groundwater Dewatering"],
  },
  {
    step: "03",
    title: "Structural Superstructure & Slipforming",
    description: "Erecting seismic-damping structural steel framing, post-tensioned floor slabs, and reinforced concrete core walls utilizing high-capacity tower crane tandem lifts.",
    icon: Building2,
    tags: ["Continuous Slipforming", "Seismic Isolators", "Post-Tension Tendons"],
  },
  {
    step: "04",
    title: "High-Performance Envelopes & MEP",
    description: "Installing unitized architectural glass curtain walls engineered for extreme wind shear, alongside high-efficiency HVAC, electrical distribution, and fire suppression systems.",
    icon: ShieldCheck,
    tags: ["Unitized Curtain Walls", "Smart BMS Controls", "Seismic MEP Bracing"],
  },
  {
    step: "05",
    title: "Commissioning, QA Certification & Turnkey Handover",
    description: "Rigorous integrated systems testing, material QA compliance certificates, client handover inspections with GoN/DoR authorities, and seamless operational transfer.",
    icon: Award,
    tags: ["Full Systems Commissioning", "Final DoR/DUDBC QA Inspection", "Zero-Punchlist Handover"],
  },
];

export const ConstructionProcessSection = () => {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white via-neutral-50/50 to-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold tracking-widest uppercase text-[#888A8C] bg-transparent px-5 py-2 rounded-full border border-[#888A8C] inline-block mb-4 shadow-xs">
            Turnkey EPC Methodology
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold text-foreground tracking-tight">
            Our 5-Stage Project Delivery Framework
          </h2>
          <p className="mt-4 text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            From initial geotechnical feasibility to turnkey handover, our structured project lifecycle guarantees schedule certainty, transparent budget control, and Zero-Harm safety.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isLast = idx === STEPS.length - 1;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className={`rounded-3xl bg-white border-2 border-[#888A8C]/30 p-8 shadow-sm hover:shadow-xl hover:border-[#888A8C]/60 transition-all duration-300 flex flex-col ${
                  isLast ? "md:col-span-2 lg:col-span-2" : ""
                }`}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#F5333F]/10 flex items-center justify-center">
                    <Icon size={26} strokeWidth={1.75} className="text-[#F5333F]" />
                  </div>
                  <span className="font-display text-3xl font-black text-[#888A8C]/40">
                    {step.step}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                  {step.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-[#888A8C]/20">
                  {step.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg bg-[#888A8C]/10 border border-[#888A8C]/20 text-[10px] font-bold text-foreground/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ConstructionProcessSection;
