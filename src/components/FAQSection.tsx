import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { filterOutLegacyFinancial } from "@/lib/contentFilter";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const { data: faqs = [] } = useQuery({
    queryKey: ["faqs-home"],
    queryFn: async () => {
      const { data } = await supabase.from("faqs").select("*").order("sort_order");
      return data || [];
    },
  });

  const displayFaqs = filterOutLegacyFinancial(faqs);

  if (displayFaqs.length === 0) return null;

  return (
    <section className="py-20 bg-transparent">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-bold tracking-widest uppercase text-brand-blue bg-brand-blue/5 px-4 py-1.5 rounded-full border border-brand-blue/10 inline-block mb-4">Got Questions?</span>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-extrabold text-primary tracking-tight">Frequently Asked Questions</h2>
        </motion.div>

        <div className="space-y-4">
          {displayFaqs.map((faq: any, index: number) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 hover:shadow-md"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left transition-colors hover:bg-secondary/10"
              >
                <span className="font-bold text-primary md:text-lg">{faq.question}</span>
                <div className={`p-2 rounded-full transition-colors ${openIndex === index ? "bg-primary text-primary-foreground" : "bg-primary/5 text-primary"}`}>
                  {openIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? "max-h-96" : "max-h-0"}`}
              >
                <div className="p-6 pt-0 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
