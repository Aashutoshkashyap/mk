import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PrimaryButton } from "./ui/PrimaryButton";

const PreFooterCTA = () => {
  const { data } = useQuery({
    queryKey: ["prefooter-cta"],
    queryFn: async () => {
      const { data } = await supabase.from("prefooter_cta").select("*").single();
      return data;
    },
  });

  return (
    <section className="py-20 md:py-28 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl bg-gradient-to-r from-primary via-orange-600 to-amber-600 overflow-hidden shadow-2xl shadow-primary/25">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-black/10 blur-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
          
          <div className="relative z-10 p-10 md:p-16 text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-black uppercase tracking-widest mb-6">
              Turnkey General Contracting & Engineering
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold text-white tracking-tight max-w-3xl mx-auto leading-tight">
              {data?.heading || "Ready to Groundbreak Your Next Milestone Project?"}
            </h2>
            <p className="mt-5 text-white/90 max-w-2xl mx-auto text-base md:text-lg leading-relaxed font-normal">
              {data?.description || "Consult with our Principal Engineers and Pre-Construction Directors. From geotechnical analysis and 5D BIM virtual design to turnkey site delivery, we guarantee precision at every stage."}
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <PrimaryButton
                as={Link}
                to={data?.cta_link || "/contact"}
                className="bg-white text-primary hover:bg-white/95 font-bold shadow-xl hover:shadow-2xl transition-all active:scale-95 border-none"
                containerClassName="h-14 min-w-[240px]"
              >
                <span className="flex items-center gap-2 text-base">
                  {data?.cta_text || "Request Project Estimate"} <ArrowRight size={18} />
                </span>
              </PrimaryButton>
              <Link
                to="/projects"
                className="inline-flex items-center justify-center h-14 px-8 rounded-full bg-black/25 hover:bg-black/40 backdrop-blur-md text-white font-bold transition-all text-base border-none shadow-md"
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
