import { motion } from "framer-motion";
import { Compass, Hammer, Building2, ShieldCheck, CheckCircle2, Award, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

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
    <section className="py-20 md:py-28 bg-gradient-to-b from-white via-red-50/20 to-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold tracking-widest uppercase text-primary bg-primary/10 px-5 py-2 rounded-full border border-primary/20 inline-block mb-4 shadow-xs">
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
                className={`rounded-3xl bg-white border-2 border-red-100 p-8 shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300 flex flex-col ${
                  isLast ? "md:col-span-2 lg:col-span-2" : ""
                }`}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <Icon size={26} strokeWidth={1.75} />
                  </div>
                  <span className="font-display text-3xl font-black text-red-200">
                    {step.step}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                  {step.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-red-100">
                  {step.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg bg-red-50 border border-red-200/60 text-[10px] font-bold text-foreground/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}

          {/* Quick Tender CTA Card in the remaining slot */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="rounded-3xl bg-gradient-to-br from-primary to-red-700 text-white p-8 shadow-xl shadow-primary/20 flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-white/80 bg-white/20 px-3 py-1 rounded-full">
                Pre-Construction Support
              </span>
              <h3 className="font-display text-2xl font-bold mt-4 leading-tight">
                Require a Preliminary Feasibility & Cost Model?
              </h3>
              <p className="text-white/90 text-sm mt-3 leading-relaxed">
                Connect with our Principal Pre-Construction Directors to run 5D BIM schedule simulations and value-engineering analysis on your architectural drawings.
              </p>
            </div>

            <Link
              to="/contact"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl bg-white text-primary px-6 py-3.5 text-xs font-bold shadow-md hover:bg-white/95 active:scale-95 transition-all"
            >
              <span>Submit Project Drawings</span>
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default ConstructionProcessSection;
