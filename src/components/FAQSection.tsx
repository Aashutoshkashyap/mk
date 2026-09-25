import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle, HardHat, FileCheck } from "lucide-react";
import { useState } from "react";

const defaultFaqs = [
  {
    id: "f1",
    category: "Licensing & Compliance",
    question: "What is MK Construction Company's licensing classification in Nepal?",
    answer: "MK Construction Company Pvt. Ltd. holds a Class-A construction license issued by the Department of Urban Development and Building Construction (DUDBC), Government of Nepal. We are also registered with the Public Procurement Monitoring Office (PPMO) for national competitive bidding and comply fully with the Public Procurement Act 2063. Our ISO 9001:2015 certification covers civil works quality management systems for all project types.",
  },
  {
    id: "f2",
    category: "Contracts & Tendering",
    question: "What types of government and donor-funded contracts does MK Construction execute?",
    answer: "We execute contracts under Department of Roads (DoR), Department of Water Induced Disaster Prevention (DWIDP), Nepal Electricity Authority (NEA), and donor-funded packages from ADB, World Bank, JICA, and bilateral government grants. We bid through PPMO-compliant GoN procurement portals and participate in national competitive bidding (NCB) and international competitive bidding (ICB) tenders, meeting all PQ (pre-qualification) requirements including financial capacity, equipment ownership, and past performance.",
  },
  {
    id: "f3",
    category: "Safety & HSE",
    question: "How does MK Construction enforce safety standards on remote Himalayan jobsites?",
    answer: "All project sites — including high-altitude mountain corridors and active monsoon river zones — operate under a strict Zero-Harm HSE framework. Each site deploys a dedicated Safety Manager certified in NEBOSH/IOSH, conducts daily toolbox talks and JSA (Job Safety Analysis) briefings, implements fall protection standards for bridge pier work, and uses flagmen and traffic management plans for highway construction zones. We comply with the Labour Act 2074 and OSHA international standards across all 32 districts of operation.",
  },
  {
    id: "f4",
    category: "Monsoon & Scheduling",
    question: "How does your team manage construction timelines around Nepal's monsoon season?",
    answer: "Monsoon scheduling is one of our most critical engineering disciplines. We develop pre-monsoon milestone targets for all bridge substructure, earthwork, and river training packages, ensuring that exposed foundations and riverbank protection works are structurally secured before June. During the monsoon period (June–September), we redirect crews to building superstructure, tunnel lining, and indoor fabrication works. Our in-house meteorological tracking and DoR-linked flood gauge monitoring systems further help field managers make real-time scheduling decisions.",
  },
  {
    id: "f5",
    category: "Equipment Fleet",
    question: "What heavy equipment does MK Construction own for infrastructure execution?",
    answer: "MK Construction maintains a captive heavy machinery fleet including motor graders, vibratory compactors, hydraulic excavators (up to 35-ton), wheel loaders, dump trucks, concrete batching plants, concrete boom pumps, drilling jumbos for tunnel work, truck-mounted cranes, pile driving rigs, and hydrographic survey boats for river works. Our owned fleet eliminates dependence on rental markets — especially critical in remote hill districts where equipment availability is limited — and allows rapid mobilization across project sites.",
  },
  {
    id: "f6",
    category: "Nepal Building Code",
    question: "How do you ensure seismic safety compliance for Nepal's institutional buildings?",
    answer: "All institutional and commercial structures are designed and constructed in strict compliance with Nepal National Building Code (NBC 105:2020) — Nepal's mandatory seismic standard. This includes ductile reinforced concrete moment frames, confined masonry detailing where applicable, and rigorous rebar placement inspection by our resident QA engineers. All structural designs require review and approval from registered structural engineers (Nepal Engineering Council certified), and our construction supervision team verifies bar bending schedules and cover blocks at every concrete pour.",
  },
  {
    id: "f7",
    category: "Quality Assurance",
    question: "What quality control procedures govern MK Construction's concrete and bridge works?",
    answer: "Our ISO 9001:2015 certified quality management system mandates source approval for all aggregate quarries, cement brand certification (NS 49), and batch plant calibration checks before each work front. Concrete test cubes (150mm) are cast in triplicate at every pour — tested at 7 and 28 days in NABL-accredited labs. For bridge works, pile integrity testing (PIT), high-strain dynamic pile testing (HSDPT), and proof load testing are conducted in accordance with IS 2911 and IRC standards.",
  },
  {
    id: "f8",
    category: "Hydropower Civil",
    question: "What civil scope does MK Construction self-perform on hydropower projects?",
    answer: "We self-perform the full civil scope of run-of-river hydropower projects: concrete diversion weir construction with ogee spillway and sluice gate embedments, gravel trap and de-sanding basin, intake channel excavation, headrace tunnel drill-and-blast and shotcrete lining, surge tank, penstock alignment and thrust block casting, powerhouse substructure and machine hall concrete, and tailrace channel construction. We have executed civil packages on both NEA-owned and private IPP schemes.",
  },
  {
    id: "f9",
    category: "River Training",
    question: "How does MK Construction design and build flood protection and river training works?",
    answer: "Our river training works are executed based on hydraulic engineering design models developed by DoR, DWIDP, or project consultants. We construct heavy gabion wire basket revetments (filled with selected quarried boulders), RCC-guided spurs and porcupine structures, rock-filled embankment dykes with armored slope protection, boulder pitching, and HDPE geotextile filter layers. All river protection works are timed and constructed during the dry season (October–May) to ensure stable construction conditions and design scour protection before monsoon onset.",
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
