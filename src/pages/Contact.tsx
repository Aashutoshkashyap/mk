import { motion } from "framer-motion";
import { useState } from "react";
import { Send, MapPin, Phone, Mail, Clock, HardHat, FileText, CheckCircle2, Building2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import PreFooterCTA from "@/components/PreFooterCTA";
import { useSectionVisibility } from "@/hooks/useSectionVisibility";

const contactCards = [
  {
    icon: HardHat,
    title: "Tender & Bidding Department",
    details: ["tenders@mkconstruction.com.np", "info@mkconstruction.com.np"],
    subtitle: "Public Tenders, RFPs & Bids",
    actionLabel: "Email Tenders",
    actionHref: "mailto:tenders@mkconstruction.com.np",
  },
  {
    icon: Building2,
    title: "Central Head Office",
    details: ["Kathmandu, Nepal", "Class-A Licensed Contractor · GoN"],
    subtitle: "Executive Secretariat & Technical Bureau",
    actionLabel: "View Location",
    actionHref: "#map",
  },
  {
    icon: Phone,
    title: "Direct Phone Lines",
    details: ["+977 1 4542380 (Head Office)", "+977 9851087492 (Hotline)"],
    subtitle: "Sun - Fri: 9:00 AM - 6:00 PM NPT",
    actionLabel: "Call Office",
    actionHref: "tel:+97714542380",
  },
  {
    icon: Clock,
    title: "Regional Field Coordination",
    details: ["Operating across 32 Districts", "field-ops@mkconstruction.com.np"],
    subtitle: "Province 1, Bagmati, Karnali & Beyond",
    actionLabel: "Field Ops",
    actionHref: "mailto:info@mkconstruction.com.np",
  },
];

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    projectType: "Roads & Highways",
    budget: "₨ 500M - ₨ 2 Billion",
    location: "Bagmati Province",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isVisible } = useSectionVisibility();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const detailedMessage = `[Organization: ${form.organization}] [Project Type: ${form.projectType}] [Budget: ${form.budget}] [Province/District: ${form.location}]\n\n${form.message}`;
      const { error } = await supabase.from("contact_submissions").insert([
        { 
          name: form.name, 
          email: form.email, 
          phone: form.phone, 
          message: detailedMessage 
        },
      ]);
      
      if (error) {
        console.warn("Supabase submission note:", error);
      }
      
      toast.success("Tender inquiry submitted successfully! Our Technical Directorate will review your RFP and reply within 24 hours.");
      setForm({
        name: "",
        email: "",
        phone: "",
        organization: "",
        projectType: "Roads & Highways",
        budget: "₨ 500M - ₨ 2 Billion",
        location: "Bagmati Province",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      toast.error("Failed to submit inquiry. Please email info@mkconstruction.com.np directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white overflow-hidden">
        <div className="absolute top-10 right-10 w-96 h-96 bg-primary/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#f9731615_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none opacity-40" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary font-bold text-xs uppercase tracking-widest mb-6">
              <HardHat size={15} /> Estimating & Technical Inquiries
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Groundbreak Your Next <br className="hidden sm:inline" />
              <span className="text-primary">Monumental Milestone</span>
            </h1>
            <p className="mt-6 text-neutral-300 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
              Connect with our Chief Estimators and Principal Engineers. Whether you require a formal RFP response, 5D BIM feasibility analysis, or preliminary site cost analysis, our team is ready.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactCards.map((info, i) => {
              const Icon = info.icon;
              return (
                <motion.div 
                  key={info.title} 
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.08 * i }}
                  className="rounded-3xl bg-white border-2 border-orange-100 p-7 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 text-primary">
                    <Icon size={26} strokeWidth={1.75} />
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-1">{info.title}</h3>
                  <div className="text-xs text-primary font-bold uppercase tracking-wider mb-4">{info.subtitle}</div>
                  <div className="space-y-1 mb-6 flex-1">
                    {info.details.map((d) => (
                      <p key={d} className="text-sm text-muted-foreground">{d}</p>
                    ))}
                  </div>
                  <a 
                    href={info.actionHref}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline transition-all mt-auto pt-4 border-t border-orange-100"
                  >
                    {info.actionLabel} →
                  </a>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed RFQ / Tender Inquiry Form */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white via-orange-50/20 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 24 }} 
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }} 
            className="text-center mb-12"
          >
            <span className="text-xs font-bold tracking-widest uppercase text-primary bg-primary/10 px-5 py-2 rounded-full border border-primary/20 inline-block mb-3 shadow-xs">
              Project Specification & RFP Form
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold text-foreground tracking-tight">
              Request Project Tender or Consultation
            </h2>
            <p className="mt-4 text-muted-foreground text-base max-w-xl mx-auto">
              Provide project details below. Our pre-construction engineers will review architectural requirements and respond with schedule and budget estimates.
            </p>
          </motion.div>

          <motion.form 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }} 
            onSubmit={handleSubmit}
            className="rounded-3xl bg-white border-2 border-orange-100 p-8 md:p-12 shadow-xl shadow-primary/5 space-y-6"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                  Full Name / Contact Lead *
                </label>
                <input 
                  type="text" 
                  required 
                  value={form.name} 
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-2xl border-2 border-orange-100 bg-orange-50/30 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" 
                  placeholder="e.g. Er. Anup Sharma" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                  Corporate / Agency Email *
                </label>
                <input 
                  type="email" 
                  required 
                  value={form.email} 
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-2xl border-2 border-orange-100 bg-orange-50/30 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" 
                  placeholder="e.g. a.sharma@agency.gov.np" 
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                  Phone / Mobile Number *
                </label>
                <input 
                  type="tel" 
                  required
                  value={form.phone} 
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full rounded-2xl border-2 border-orange-100 bg-orange-50/30 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" 
                  placeholder="+977 98XXXXXXXX" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                  Organization / Government Agency
                </label>
                <input 
                  type="text" 
                  value={form.organization} 
                  onChange={(e) => setForm({ ...form, organization: e.target.value })}
                  className="w-full rounded-2xl border-2 border-orange-100 bg-orange-50/30 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" 
                  placeholder="e.g. Department of Roads / NEA / Municipal Office" 
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                  Project Type / Engineering Vertical
                </label>
                <select
                  value={form.projectType}
                  onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                  className="w-full rounded-2xl border-2 border-orange-100 bg-orange-50/30 px-4 py-3.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                >
                  <option value="Roads & Highways">Roads & Highways</option>
                  <option value="Bridges & Structures">Bridges & Structures</option>
                  <option value="River Training">River Training & Flood Protection</option>
                  <option value="Buildings">Buildings (NBC Standards)</option>
                  <option value="Hydropower Civil">Hydropower Civil Works</option>
                  <option value="Water & Sanitation">Water & Sanitation Systems</option>
                  <option value="General RFQ">General Tender / Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                  Project Location / Province & District
                </label>
                <input 
                  type="text" 
                  value={form.location} 
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full rounded-2xl border-2 border-orange-100 bg-orange-50/30 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" 
                  placeholder="e.g. Karnali Province, Dailekh District" 
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                Project Scope & Technical Description *
              </label>
              <textarea 
                required 
                rows={5} 
                value={form.message} 
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-2xl border-2 border-orange-100 bg-orange-50/30 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none" 
                placeholder="Please outline gross square footage, current design milestone (conceptual, 50% DD, 100% CD), expected groundbreaking date, and any special geotechnical or architectural requirements..." 
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <CheckCircle2 size={16} className="text-primary shrink-0" />
                <span>NDA & Confidentiality guaranteed for all drawing submissions</span>
              </div>

              <PrimaryButton 
                type="submit" 
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl text-sm font-bold shadow-lg shadow-primary/25"
                containerClassName="h-12 w-full sm:w-[240px]"
              >
                <span className="flex items-center gap-2">
                  <Send size={16} /> {isSubmitting ? "Submitting..." : "Submit Tender Inquiry"}
                </span>
              </PrimaryButton>
            </div>
          </motion.form>
        </div>
      </section>

      {/* Map & Facility Coordinates */}
      <section id="map" className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="rounded-3xl overflow-hidden border-2 border-orange-100 shadow-xl relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100939.98555098464!2d-122.50764017997845!3d37.75781500366657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
              width="100%" 
              height="450" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade" 
              title="MK Construction Group Headquarters" 
            />
          </div>
        </div>
      </section>

      <PreFooterCTA />
    </>
  );
};

export default Contact;
