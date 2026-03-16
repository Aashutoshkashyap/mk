import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const PreFooterCTA = () => (
  <section className="py-20 md:py-28">
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="relative rounded-3xl bg-primary overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-brand-blue/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-brand-green/10 blur-3xl" />
        <div className="relative z-10 p-10 md:p-16 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-primary-foreground">
            Ready to work with us?
          </h2>
          <p className="mt-4 text-primary-foreground/75 max-w-lg mx-auto">
            Get a consultation from our team of Chartered Accountants.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-card px-8 py-3.5 text-sm font-bold text-primary hover:bg-secondary transition-all duration-200 shadow-lg hover:-translate-y-0.5"
          >
            Get in Touch <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default PreFooterCTA;
