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
    <section className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl bg-primary overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-brand-blue/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-brand-green/10 blur-3xl" />
          <div className="relative z-10 p-10 md:p-16 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-primary-foreground">
              {data?.heading || "Ready to work with us?"}
            </h2>
            <p className="mt-4 text-primary-foreground/75 max-w-lg mx-auto">
              {data?.description || "Get a consultation from our team of Chartered Accountants."}
            </p>
            <PrimaryButton
              as={Link}
              to={data?.cta_link || "/contact"}
              className="mt-8 bg-white text-primary hover:bg-white/90"
              borderRadius="100px"
              containerClassName="h-14 min-w-[200px]"
            >
              <span className="flex items-center gap-2">
                {data?.cta_text || "Get in Touch"} <ArrowRight size={16} />
              </span>
            </PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreFooterCTA;
