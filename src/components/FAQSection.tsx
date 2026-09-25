import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const defaultFaqs = [
  {
    id: "f1",
    question: "What contract delivery models do you offer for large-scale construction?",
    answer: "We execute projects through flexible contractual delivery models tailored to client risk and capital frameworks, including Turnkey EPC (Engineering, Procurement, and Construction), CM-at-Risk (Construction Management at Risk), Design-Build, and Integrated Project Delivery (IPD). Our self-performing capabilities across concrete, structural steel, and deep geotechnical trades ensure schedule and cost certainty.",
  },
  {
    id: "f2",
    question: "How does MK Construction enforce safety compliance on complex jobsites?",
    answer: "Safety is our foremost discipline. Operating under an OSHA-compliant and ISO 45001 certified Zero-Harm framework, all our project sites mandate daily Job Safety Analysis (JSA) briefings, full-time on-site safety directors, real-time drone hazard inspections, and stringent subcontractor safety pre-qualifications.",
  },
  {
    id: "f3",
    question: "How does your team utilize 5D BIM during pre-construction?",
    answer: "Our Virtual Design & Construction (VDC) division builds hyper-detailed 4D timeline simulations and 5D cost-loaded models before site mobilization. By resolving mechanical, electrical, and structural clashes in the virtual environment, we prevent expensive site conflicts and protect our clients' capital budgets.",
  },
  {
    id: "f4",
    question: "Can MK Construction engineer LEED Certified and sustainable structures?",
    answer: "Yes. Our team includes certified LEED AP engineers experienced in green envelope design, low-carbon geopolymer concrete mixes, solar micro-grid integration, and construction waste diversion exceeding 85% to achieve LEED Gold and Platinum certifications.",
  },
  {
    id: "f5",
    question: "What bonding capacity and surety backing does your company maintain?",
    answer: "We maintain single-project bonding capacity up to $150M and aggregate commercial surety bonding exceeding $350M through top-rated global sureties, backed by comprehensive commercial general liability and builder's risk coverages.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const { data: faqs = [] } = useQuery({
    queryKey: ["faqs-home"],
    queryFn: async () => {
      const { data } = await supabase.from("faqs").select("*").order("sort_order");
      return data || [];
    },
  });

  const displayFaqs = faqs.length > 0 ? faqs : defaultFaqs;

  return (
    <section className="py-24 bg-gradient-to-b from-white via-orange-50/15 to-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-bold tracking-widest uppercase text-primary bg-primary/10 px-5 py-2 rounded-full border border-primary/20 inline-block mb-4 shadow-sm">
            Technical & Contractual Clarity
          </span>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-extrabold text-foreground tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
            Clear insights into our engineering procedures, project delivery models, safety frameworks, and bonding.
          </p>
        </motion.div>

        <div className="space-y-4">
          {displayFaqs.map((faq: any, index: number) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="rounded-2xl border-2 border-orange-100 bg-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/40"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left transition-colors hover:bg-orange-50/30"
              >
                <span className="font-bold text-foreground text-base md:text-lg pr-4">{faq.question}</span>
                <div className={`p-2 rounded-xl transition-all duration-300 ${openIndex === index ? "bg-primary text-white shadow-md shadow-primary/30" : "bg-primary/10 text-primary"}`}>
                  {openIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? "max-h-96" : "max-h-0"}`}
              >
                <div className="p-6 pt-0 text-muted-foreground leading-relaxed text-sm md:text-base border-t border-orange-100/50 mt-2">
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
