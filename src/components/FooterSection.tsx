import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

const FooterSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <>
      {/* CTA */}
      <section id="contact" className="py-24 bg-card" ref={ref}>
        <div className="container max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative rounded-3xl bg-primary p-12 md:p-16 text-center overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-teal/10 blur-3xl -z-0" />
            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground">
                Ready to work with us?
              </h2>
              <p className="mt-4 text-primary-foreground/80 max-w-lg mx-auto">
                Get in touch for a consultation. Our team is ready to help your business thrive.
              </p>
              <a
                href="mailto:info@sharpedge.com.np"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-card px-7 py-3.5 text-sm font-semibold text-primary hover:bg-secondary transition-colors"
              >
                Contact Us
                <ArrowRight size={16} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-10">
            <div>
              <span className="font-display text-xl font-bold text-primary">
                Sharp<span className="text-teal">Edge</span>
              </span>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Sharp Edge Business Solutions — your trusted chartered accountants in Nepal.
              </p>
            </div>
            <div>
              <h4 className="font-display font-semibold text-foreground mb-4">Quick Links</h4>
              <div className="flex flex-col gap-2">
                {["Home", "About", "Services", "Team"].map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    className="text-sm text-muted-foreground hover:text-teal transition-colors"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-display font-semibold text-foreground mb-4">Contact</h4>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail size={14} className="text-teal" />
                  info@sharpedge.com.np
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin size={14} className="text-teal" />
                  Kathmandu, Nepal
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-border text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} Sharp Edge Business Solutions. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterSection;
