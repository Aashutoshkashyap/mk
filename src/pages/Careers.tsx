import { motion } from "framer-motion";
import { useState } from "react";
import { Briefcase, MapPin, Clock, ArrowRight, CheckCircle2, Send, HardHat, FileText, Award, Users } from "lucide-react";
import { toast } from "sonner";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import PreFooterCTA from "@/components/PreFooterCTA";

const OPEN_POSITIONS = [
  {
    id: "job-1",
    title: "Senior Resident Engineer — Highways",
    department: "Civil & Highway Infrastructure",
    location: "Karnali / Mid-Hill Highway Pkg 7",
    type: "Full-Time · Contract",
    experience: "10+ Years Experience",
    description: "Lead site supervision, geometric alignment control, contractor billing, and earthwork quality assurance on high-altitude mountain highway packages.",
    requirements: [
      "B.E. / M.Sc. in Civil Highway Engineering (NEC registered)",
      "Proven track record in asphalt, DBST, and retaining slope stabilization",
      "Familiarity with FIDIC Conditions of Contract & Department of Roads specs",
    ],
  },
  {
    id: "job-2",
    title: "Bridge Structural Engineer",
    department: "Structures & Engineering Design",
    location: "Kathmandu Central Office with Site Visits",
    type: "Full-Time",
    experience: "8+ Years Experience",
    description: "Design review, structural analysis, and construction methodology planning for long-span steel-truss, RCC, and pre-stressed river crossings across Nepal.",
    requirements: [
      "Master's degree in Structural Engineering preferred",
      "Proficient in MIDAS Civil, SAP2000, and AutoCAD Civil 3D",
      "Experience with deep caisson and bored pile pier foundations",
    ],
  },
  {
    id: "job-3",
    title: "Heavy Plant & Equipment Maintenance Manager",
    department: "Mechanical & Fleet Operations",
    location: "Central Fleet Workshop & Major Project Sites",
    type: "Full-Time",
    experience: "7+ Years Experience",
    description: "Supervise mobilization, preventative maintenance, spare parts logistics, and uptime telemetry for our fleet of 120+ excavators, batching plants, and cranes.",
    requirements: [
      "Degree or Diploma in Mechanical / Automobile Engineering",
      "Extensive background with Caterpillar, Komatsu, and Putzmeister machinery",
      "Strong inventory and preventive schedule management skills",
    ],
  },
  {
    id: "job-4",
    title: "Hydropower Civil Tunneling Engineer",
    department: "Energy & Hydraulic Works",
    location: "Hydropower Project Site (Bagmati Province)",
    type: "Full-Time",
    experience: "6+ Years Experience",
    description: "Oversee drilling, blasting, NATM support installation, headworks civil construction, and surge tank excavation for run-of-river projects.",
    requirements: [
      "B.E. Civil Engineering with underground rock excavation exposure",
      "Knowledge of shotcrete, rock bolts, steel rib installation, and ventilation",
      "Strict enforcement of underground site safety and geotechnical monitoring",
    ],
  },
  {
    id: "job-5",
    title: "QA/QC Materials Laboratory Engineer",
    department: "Quality Assurance & Testing",
    location: "Province 1 Site Laboratory",
    type: "Full-Time",
    experience: "5+ Years Experience",
    description: "Conduct compressive strength breaks, aggregate gradation, bitumen extraction, and field compaction density testing to ensure rigorous code compliance.",
    requirements: [
      "B.E. Civil Engineering or Material Science",
      "Hands-on familiarity with ASTM, AASHTO, and Nepal Standard (NS) protocols",
      "Detailed QA report generation and non-conformance management",
    ],
  },
  {
    id: "job-6",
    title: "Junior Civil Surveyor & BIM Coordinator",
    department: "Technical Services & Virtual Design",
    location: "Kathmandu / Project Sites",
    type: "Full-Time",
    experience: "2-4 Years Experience",
    description: "Field topographic surveys utilizing RTK DGPS, total station reality capture, and 3D terrain modeling for quantity surveying and earthwork volumes.",
    requirements: [
      "Diploma / Degree in Geomatics or Civil Engineering",
      "Proficient in Total Station, RTK GPS, AutoCAD, and Revit / Civil 3D",
      "Willingness to travel to active project corridors across Nepal",
    ],
  },
];

const Careers = () => {
  const [selectedJob, setSelectedJob] = useState<string>("Senior Resident Engineer — Highways");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    district: "Kathmandu",
    experience: "5-10 Years",
    resumeLink: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Application received! Our HR & Engineering recruitment team will review your qualifications.");
      setForm({
        name: "",
        email: "",
        phone: "",
        district: "Kathmandu",
        experience: "5-10 Years",
        resumeLink: "",
        message: "",
      });
    }, 1000);
  };

  return (
    <>
      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white overflow-hidden">
        <div className="absolute top-10 right-10 w-96 h-96 bg-primary/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-red-700/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#f9731615_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none opacity-40" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-transparent border border-[#888A8C] text-[#888A8C] font-bold text-xs uppercase tracking-widest mb-6">
              <Users size={15} /> Join MK Construction Company Pvt. Ltd.
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Build Nepal's National <br className="hidden sm:inline" />
              <span className="text-primary">Infrastructure Legacy</span>
            </h1>
            <p className="mt-6 text-neutral-300 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
              We empower over 850 engineers, heavy machinery operators, and project managers delivering landmark bridges, national highways, and river protection across 32 districts of Nepal.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-16 md:py-24 bg-transparent">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest uppercase text-primary bg-transparent px-5 py-2 rounded-full border border-[#888A8C] text-[#888A8C] inline-block mb-4 shadow-xs">
              Career Advantage
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold text-foreground tracking-tight">
              Why Engineers Choose MK Construction
            </h2>
            <p className="mt-4 text-muted-foreground text-base max-w-2xl mx-auto leading-relaxed">
              Be part of a Class-A licensed contractor delivering high-impact national infrastructure with professional technical governance, competitive remuneration, and continuous career growth.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: HardHat,
                title: "Large-Scale Exposure",
                desc: "Direct hands-on involvement on mega-scale highway packages, multi-span river bridges, and major hydropower civil works.",
              },
              {
                icon: Award,
                title: "Technical Excellence",
                desc: "Learn modern engineering practices, 5D BIM coordination, GPS-guided earthwork grade control, and ISO 9001 QA/QC testing.",
              },
              {
                icon: MapPin,
                title: "32 Districts Footprint",
                desc: "Exciting field postings across diverse terrains from the high mountain valleys of Karnali to Terai river basins.",
              },
              {
                icon: CheckCircle2,
                title: "Safety & Integrity",
                desc: "Uncompromising Zero-Harm safety standards, competitive salaries, provident fund benefits, and rapid internal promotion tracks.",
              },
            ].map((perk, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-3xl bg-white border-2 border-[#888A8C]/30 p-7 shadow-sm hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-5">
                  <perk.icon size={26} strokeWidth={1.75} />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3">{perk.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{perk.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions List */}
      <section id="positions" className="py-16 md:py-24 bg-transparent">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-bold tracking-widest uppercase text-primary bg-transparent px-5 py-2 rounded-full border border-[#888A8C] text-[#888A8C] inline-block mb-4 shadow-xs">
              Current Openings
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold text-foreground tracking-tight">
              Featured Engineering Roles
            </h2>
            <p className="mt-4 text-muted-foreground text-base max-w-xl mx-auto">
              Select an open role below to submit your resume directly to our recruitment engineering board.
            </p>
          </div>

          <div className="space-y-6">
            {OPEN_POSITIONS.map((job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-3xl bg-white border-2 border-[#888A8C]/30 p-8 shadow-sm hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="text-xs font-black uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {job.department}
                    </span>
                    <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                      <Clock size={13} /> {job.type}
                    </span>
                    <span className="text-xs font-bold text-foreground/80 flex items-center gap-1">
                      <Briefcase size={13} className="text-primary" /> {job.experience}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                    {job.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
                    <MapPin size={14} className="text-primary" /> {job.location}
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {job.description}
                  </p>

                  <div className="space-y-1">
                    {job.requirements.map((req, rIdx) => (
                      <div key={rIdx} className="flex items-center gap-2 text-xs font-medium text-foreground/80">
                        <CheckCircle2 size={13} className="text-primary shrink-0" />
                        <span>{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:self-center shrink-0">
                  <a
                    href="#apply"
                    onClick={() => setSelectedJob(job.title)}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-white text-xs font-bold shadow-md shadow-primary/25 hover:bg-primary/95 transition-all duration-300"
                  >
                    <span>Apply for this Role</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="py-16 md:py-24 bg-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-widest uppercase text-primary bg-transparent px-5 py-2 rounded-full border border-[#888A8C] text-[#888A8C] inline-block mb-3 shadow-xs">
              Recruitment Portal
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold text-foreground tracking-tight">
              Submit Your Candidacy
            </h2>
            <p className="mt-3 text-muted-foreground text-base max-w-xl mx-auto">
              Applying for a specific vacancy or submitting a speculative CV? Fill in your profile below.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-3xl bg-white border-2 border-[#888A8C]/30 p-8 md:p-12 shadow-xl shadow-primary/5 space-y-6"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-2xl border-2 border-[#888A8C]/30 bg-neutral-50/60 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="e.g. Ramesh Shrestha"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-2xl border-2 border-[#888A8C]/30 bg-neutral-50/60 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="e.g. ramesh.civil@gmail.com"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                  Contact Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full rounded-2xl border-2 border-[#888A8C]/30 bg-neutral-50/60 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="+977 98XXXXXXXX"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                  Current District / Base
                </label>
                <input
                  type="text"
                  value={form.district}
                  onChange={(e) => setForm({ ...form, district: e.target.value })}
                  className="w-full rounded-2xl border-2 border-[#888A8C]/30 bg-neutral-50/60 px-4 py-3.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="Kathmandu / Pokhara / Itahari"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                  Years of Field Experience
                </label>
                <select
                  value={form.experience}
                  onChange={(e) => setForm({ ...form, experience: e.target.value })}
                  className="w-full rounded-2xl border-2 border-[#888A8C]/30 bg-neutral-50/60 px-4 py-3.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                >
                  <option value="Entry / 0-2 Years">Entry / 0-2 Years</option>
                  <option value="2-5 Years">2-5 Years</option>
                  <option value="5-10 Years">5-10 Years</option>
                  <option value="10+ Years">10+ Years (Senior)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                Position Applied For *
              </label>
              <input
                type="text"
                required
                value={selectedJob}
                onChange={(e) => setSelectedJob(e.target.value)}
                className="w-full rounded-2xl border-2 border-[#888A8C]/30 bg-neutral-50/60 px-4 py-3.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                Resume / CV Link or Portfolio URL *
              </label>
              <input
                type="url"
                required
                value={form.resumeLink}
                onChange={(e) => setForm({ ...form, resumeLink: e.target.value })}
                className="w-full rounded-2xl border-2 border-[#888A8C]/30 bg-neutral-50/60 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="Google Drive / Dropbox / LinkedIn profile link"
              />
              <span className="text-[11px] text-muted-foreground mt-1 block">
                You can also email your CV directly to <strong className="text-primary">careers@mkconstruction.com.np</strong>
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                Summary of Qualifications & Major Projects Delivered
              </label>
              <textarea
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-2xl border-2 border-[#888A8C]/30 bg-neutral-50/60 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                placeholder="Detail your engineering certifications (NEC Reg No.), major bridge/road contracts handled, software proficiencies, and notice period..."
              />
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <CheckCircle2 size={16} className="text-primary shrink-0" />
                <span>Equal Opportunity Employer · Transparent merit-based evaluation</span>
              </div>

              <PrimaryButton
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl text-sm font-bold shadow-lg shadow-primary/25"
                containerClassName="h-12 w-full sm:w-[220px]"
              >
                <span className="flex items-center gap-2">
                  <Send size={16} /> {isSubmitting ? "Submitting..." : "Send Application"}
                </span>
              </PrimaryButton>
            </div>
          </form>
        </div>
      </section>

      <PreFooterCTA />
    </>
  );
};

export default Careers;
