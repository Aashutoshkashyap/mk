import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PrimaryButton } from "./ui/PrimaryButton";
import { usePreFooterCTAContent } from "@/hooks/useCMS";

const PreFooterCTA = () => {
  const data = usePreFooterCTAContent();

  return (
    <section className="py-20 md:py-28 bg-transparent relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Pre-Footer CTA Card */}
        <div 
          className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 text-white group bg-neutral-950"
        >
          {/* Full-coverage Background Image */}
          <img 
            src="/images/beforefooter.jpg" 
            alt="MK Engineering & Construction Projects"
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
          />
          
          {/* Dark Overlay for optimal readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/95 via-neutral-950/80 to-neutral-950/95" />
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
          
          {/* Ambient Brand Accent Lighting */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#888A8C]/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#F5333F]/20 blur-3xl pointer-events-none" />
          
          <div className="relative z-10 p-10 md:p-16 text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white/90 text-xs font-black uppercase tracking-widest mb-6 border border-white/15">
              Turnkey General Contracting & Engineering
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold text-white tracking-tight max-w-3xl mx-auto leading-tight">
              {data?.heading || "Ready to Groundbreak Nepal's Next Landmark Infrastructure?"}
            </h2>
            <p className="mt-5 text-white/80 max-w-2xl mx-auto text-base md:text-lg leading-relaxed font-normal">
              {data?.description || "Partner with MK Engineering and Construction for Class-A general contracting, heavy civil engineering, and turnkey project delivery across Nepal."}
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <PrimaryButton
                as={Link}
                to={data?.cta_link || "/contact"}
                className="bg-primary text-white hover:bg-primary/90 font-bold shadow-xl shadow-primary/25 hover:shadow-2xl transition-all active:scale-95 border-none"
                containerClassName="h-14 min-w-[240px]"
              >
                <span className="flex items-center gap-2 text-base font-bold">
                  {data?.cta_text || "Request Project Estimate"} <ArrowRight size={18} />
                </span>
              </PrimaryButton>
              <Link
                to="/projects"
                className="inline-flex items-center justify-center h-14 px-8 rounded-full bg-[#24272A]/60 hover:bg-[#24272A]/80 border border-white/20 backdrop-blur-md text-white font-bold transition-all text-base shadow-md"
              >
                Explore Completed Works
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreFooterCTA;
