import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, MapPin, Phone, ArrowRight } from "lucide-react";

const FooterSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <>
      {/* CTA */}
      <section id="contact" className="py-20 md:py-28" ref={ref}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative rounded-3xl bg-primary overflow-hidden"
          >
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-brand-blue/20 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-brand-green/10 blur-3xl" />

            <div className="relative z-10 p-10 md:p-16 text-center">
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-primary-foreground">
                Ready to work with us?
              </h2>
              <p className="mt-4 text-primary-foreground/75 max-w-lg mx-auto leading-relaxed">
                Get in touch for a consultation. Our team of Chartered Accountants is ready to help your business thrive in Nepal.
              </p>
              <a
                href="mailto:info@sharpedge.com.np"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-card px-8 py-3.5 text-sm font-bold text-primary hover:bg-secondary transition-all duration-200 shadow-lg hover:-translate-y-0.5"
              >
                Get in Touch
                <ArrowRight size={16} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-10">
            <div>
              <img
                src="https://sharpedge.com.np/static/img/logo.png"
                alt="Sharp Edge Business Solutions"
                className="h-12 w-auto brightness-0 invert"
              />
              <p className="mt-4 text-sm text-primary-foreground/60 leading-relaxed">
                Sharp Edge Business Solutions — your trusted chartered accountants in Nepal.
              </p>
            </div>
            <div>
              <h4 className="font-display font-bold text-primary-foreground mb-4">Quick Links</h4>
              <div className="flex flex-col gap-2.5">
                {["Home", "About Us", "Services", "Team", "Partners"].map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase().replace(" ", "")}`}
                    className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-display font-bold text-primary-foreground mb-4">Contact</h4>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-sm text-primary-foreground/60">
                  <Mail size={14} className="text-brand-blue shrink-0" />
                  info@sharpedge.com.np
                </div>
                <div className="flex items-center gap-3 text-sm text-primary-foreground/60">
                  <MapPin size={14} className="text-brand-blue shrink-0" />
                  Kathmandu, Nepal
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-primary-foreground/10 text-center text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} Sharp Edge Business Solutions. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterSection;
