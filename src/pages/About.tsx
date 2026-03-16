import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Eye, Target, Lightbulb, Handshake, Shield, TrendingUp,
  Globe, Users, Award
} from "lucide-react";
import PreFooterCTA from "@/components/PreFooterCTA";

const values = [
  { icon: Shield, title: "Integrity", desc: "Unwavering ethical standards in all engagements" },
  { icon: Lightbulb, title: "Innovation", desc: "Cutting-edge solutions for evolving business needs" },
  { icon: Handshake, title: "Trust", desc: "Long-term relationships built on transparency" },
  { icon: TrendingUp, title: "Excellence", desc: "World-class services driven by expertise" },
];

const galleryImages = Array.from({ length: 7 }, (_, i) => ({
  src: `https://sharpedge.com.np/static/img/gallery/G${i + 1}.jpg`,
  alt: `Company gallery ${i + 1}`,
}));

const About = () => {
  const heroRef = useRef(null);
  const visionRef = useRef(null);
  const valuesRef = useRef(null);
  const galleryRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-80px" });
  const visionInView = useInView(visionRef, { once: true, margin: "-80px" });
  const valuesInView = useInView(valuesRef, { once: true, margin: "-80px" });
  const galleryInView = useInView(galleryRef, { once: true, margin: "-80px" });

  return (
    <>
      {/* Hero Banner */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-primary overflow-hidden">
        <div className="absolute inset-0 -z-0">
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
            <span className="text-xs font-bold tracking-widest uppercase text-brand-blue">Who We Are</span>
            <h1 className="mt-4 font-display text-4xl md:text-5xl font-extrabold text-primary-foreground leading-tight">
              About Sharp Edge
            </h1>
            <p className="mt-5 text-primary-foreground/70 max-w-2xl mx-auto leading-relaxed">
              A pioneering Chartered Accountants and advisory firm delivering world-class services with integrity, innovation, and strategic collaboration.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Overview with Image */}
      <section ref={heroRef} className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <img
                  src="https://sharpedge.com.np/static/img/ComanyBuilding.jpg"
                  alt="Sharp Edge Business Solutions Office"
                  className="w-full rounded-2xl shadow-2xl shadow-primary/10"
                />
                <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground rounded-xl px-5 py-3 shadow-lg">
                  <div className="font-display text-2xl font-extrabold">10+</div>
                  <div className="text-xs text-primary-foreground/70">Years of Excellence</div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <h2 className="font-display text-3xl font-extrabold text-primary leading-tight">
                Safeguarding Clients' Interests with Bespoke Solutions
              </h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                Our team of dedicated Chartered Accountants, Attorneys, and Consultants provides comprehensive services across auditing, taxation, regulatory compliance, and advisory domains.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-4">
                {[
                  { icon: Globe, label: "Global\nStandards" },
                  { icon: Users, label: "Expert\nTeam" },
                  { icon: Award, label: "Proven\nTrack Record" },
                ].map((item, i) => (
                  <div key={i} className="text-center p-4 rounded-xl bg-secondary/80">
                    <item.icon size={24} className="mx-auto text-primary mb-2" strokeWidth={1.5} />
                    <div className="text-xs font-semibold text-foreground whitespace-pre-line">{item.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section ref={visionRef} className="py-20 md:py-28 bg-secondary/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={visionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="rounded-2xl bg-card border border-border p-8 md:p-10"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/[0.08] flex items-center justify-center mb-6">
                <Eye size={28} className="text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-2xl font-bold text-primary mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be acknowledged globally as a prestigious, trusted professional firm—renowned for safeguarding clients' interests through bespoke, cutting-edge solutions and unwavering dedication to excellence.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={visionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="rounded-2xl bg-card border border-border p-8 md:p-10"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/[0.08] flex items-center justify-center mb-6">
                <Target size={28} className="text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-2xl font-bold text-primary mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To cultivate a dynamic, inclusive environment where our team excels—working in synergy with clients to foster long-term success, growth, and resilience in an ever-evolving business landscape.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section ref={valuesRef} className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="text-xs font-bold tracking-widest uppercase text-brand-blue">What Drives Us</span>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-extrabold text-primary">
              Our Core Values
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="rounded-2xl bg-card border border-border p-7 text-center hover:border-primary/20 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 mx-auto rounded-xl bg-primary/[0.08] flex items-center justify-center mb-4">
                  <v.icon size={24} className="text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-lg font-bold text-primary mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section ref={galleryRef} className="py-20 md:py-28 bg-secondary/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={galleryInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="text-xs font-bold tracking-widest uppercase text-brand-blue">Our Space</span>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-extrabold text-primary">
              Gallery
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={galleryInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.06 * i }}
                className="rounded-xl overflow-hidden aspect-[4/3] group"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PreFooterCTA />
    </>
  );
};

export default About;
