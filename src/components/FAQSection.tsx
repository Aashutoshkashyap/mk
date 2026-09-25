import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle, HardHat, FileCheck } from "lucide-react";
import { useState } from "react";

const defaultFaqs = [
  {
    id: "f1",
    category: "Contracts & Delivery",
    question: "What contract delivery models do you offer for commercial and infrastructure projects?",
    answer: "We execute projects through flexible contractual delivery frameworks tailored to project scale, capital allocation, and risk management. Our core models include Turnkey EPC (Engineering, Procurement, and Construction), Guaranteed Maximum Price (GMP), Construction Management at Risk (CMAR), Design-Build (DB), and Integrated Project Delivery (IPD). Our captive self-performing trade capability in concrete, structural steel, and deep geotechnical excavation ensures strict cost certainty and protects owners against schedule delays.",
  },
  {
    id: "f2",
    category: "Safety & Compliance",
    question: "How does MK Engineering and Construction enforce Zero-Harm safety on active jobsites?",
    answer: "Safety is our core operational discipline. Operating under an OSHA-compliant and ISO 45001 certified Zero-Harm framework, all our project sites mandate daily Job Safety Analysis (JSA) briefings, certified crane rigging inspections, full-time on-site safety managers, real-time drone hazard telemetry, and mandatory stop-work authority granted to every single tradesperson without fear of reprisal.",
  },
  {
    id: "f3",
    category: "Virtual Design & BIM",
    question: "How does your team utilize 5D BIM and digital twins during pre-construction?",
    answer: "Our in-house Virtual Design & Construction (VDC) engineers develop hyper-detailed 4D timeline simulations and 5D cost-loaded Building Information Models before physical groundbreaking. By resolving multi-trade spatial clashes (MEP ducts, post-tension tendons, structural steel bracing) in the virtual environment, we eliminate expensive field change orders and keep projects on budget.",
  },
  {
    id: "f4",
    category: "Sustainability",
    question: "Can MK engineer LEED Platinum certified and Net-Zero carbon structures?",
    answer: "Yes. Our team includes licensed LEED AP and WELL-accredited engineers experienced in sustainable envelope design, low-carbon geopolymer concrete mixes (replacing up to 70% Portland cement with slag/fly ash), rooftop and facade solar photovoltaic integration, and jobsite waste diversion rates exceeding 85% to achieve LEED Gold and Platinum certifications.",
  },
  {
    id: "f5",
    category: "Surety & Bonding",
    question: "What bonding capacity and commercial insurance coverages do you maintain?",
    answer: "MK maintains single-project surety bonding capacity up to $150M and aggregate commercial bonding exceeding $350M through top-rated global sureties (A.M. Best 'A+' rated). We carry comprehensive commercial general liability, builder's risk insurance, umbrella excess liability, and environmental pollution coverages tailored to mega-infrastructure projects.",
  },
  {
    id: "f6",
    category: "Machinery & Logistics",
    question: "What is the advantage of your 1,200+ unit captive heavy machinery fleet?",
    answer: "Unlike general contractors who rely entirely on equipment rental companies and third-party logistics, MK owns and maintains over 1,200 heavy machinery units—including high-capacity tower cranes, 63m concrete boom pumps, laser screeds, slipform pavers, and GPS-guided excavators. This captive fleet eliminates third-party equipment shortages, guarantees machinery availability during peak cycles, and reduces overall site mobilization costs.",
  },
  {
    id: "f7",
    category: "Quality Assurance",
    question: "How are concrete pours, welding, and structural materials quality-controlled on site?",
    answer: "Every batch of concrete undergoes on-site slump, air-content, and temperature verification before pumping. Test cylinders are cast and cured for 7, 14, and 28-day third-party laboratory compression breaks. For structural steel, certified independent welding inspectors (CWI) perform ultrasonic, magnetic particle, and radiographic weld testing to meet AWS D1.1 and AISC specifications.",
  },
  {
    id: "f8",
    category: "Seismic & High-Rise",
    question: "How do you engineer high-rise towers to resist severe earthquakes and wind shear?",
    answer: "Our structural engineering teams specialize in performance-based seismic design (PBSD). We engineer core wall assemblies with tuned mass dampers (TMDs), outrigger trusses, and buckling-restrained braces (BRBs) that absorb lateral seismic accelerations, preventing catastrophic damage and ensuring building occupancy immediate re-entry.",
  },
  {
    id: "f9",
    category: "Procurement & Schedule",
    question: "How do you mitigate long-lead equipment delays and supply chain inflation?",
    answer: "During early pre-construction, our procurement directors issue advance mill orders for structural steel, high-voltage transformers, switchgear, and facade glazing systems months before site mobilization. We maintain direct relationships with Tier-1 domestic and international manufacturers, utilizing bonded storage facilities to lock in raw material prices.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  const { data: faqs = [] } = useQuery({
    queryKey: ["faqs-home"],
    queryFn: async () => {
      const { data } = await supabase.from("faqs").select("*").order("sort_order");
      return data || [];
    },
  });

  const displayFaqs = faqs.length > 0 ? faqs : defaultFaqs;

  const categories = ["All", ...Array.from(new Set(displayFaqs.map((f: any) => f.category || "General")))];

  const filteredFaqs = selectedFilter === "All"
    ? displayFaqs
    : displayFaqs.filter((f: any) => (f.category || "General") === selectedFilter);

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white via-orange-50/15 to-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-xs font-bold tracking-widest uppercase text-primary bg-primary/10 px-5 py-2 rounded-full border border-primary/20 inline-block mb-4 shadow-sm">
            Technical & Commercial Clarity
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold text-foreground tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
            Comprehensive answers regarding our engineering delivery models, safety governance, 5D BIM technology, bonding, and quality assurance.
          </p>
        </motion.div>

        {/* Filter categories pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
                selectedFilter === cat
                  ? "bg-primary text-white shadow-md shadow-primary/25"
                  : "bg-white text-muted-foreground hover:bg-orange-50 hover:text-primary border border-orange-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq: any, index: number) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={faq.id || index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`rounded-2xl border-2 transition-all duration-300 overflow-hidden bg-white ${
                  isOpen ? "border-primary/50 shadow-lg shadow-primary/5" : "border-orange-100 hover:border-primary/30"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left transition-colors hover:bg-orange-50/20"
                >
                  <div className="pr-4">
                    {faq.category && (
                      <span className="text-[10px] font-black uppercase tracking-wider text-primary block mb-1">
                        {faq.category}
                      </span>
                    )}
                    <span className="font-bold text-foreground text-base md:text-lg block leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <div className={`p-2 rounded-xl shrink-0 transition-all duration-300 ${
                    isOpen ? "bg-primary text-white shadow-md shadow-primary/30" : "bg-orange-100 text-primary"
                  }`}>
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-muted-foreground leading-relaxed text-sm md:text-base border-t border-orange-100/60 mt-1">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
