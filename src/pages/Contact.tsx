import { motion } from "framer-motion";
import { useState } from "react";
import { Send, ExternalLink } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { getIcon } from "@/lib/iconMap";
import { toast } from "sonner";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import PreFooterCTA from "@/components/PreFooterCTA";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const { data: contactItems = [] } = useQuery({
    queryKey: ["contact-info"],
    queryFn: async () => {
      const { data } = await supabase.from("contact_info").select("*").order("sort_order");
      return data || [];
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from("contact_submissions").insert([
        { name: form.name, email: form.email, phone: form.phone, message: form.message },
      ]);
      
      if (error) throw error;
      
      toast.success("Message sent successfully!");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to send message. Please try again or use the email provided below.");
    }
  };

  return (
    <>
      {/* Hero Banner */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-primary overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-brand-blue/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-brand-green/5 blur-3xl" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center">
            <span className="text-xs font-bold tracking-widest uppercase text-brand-blue">Reach Out</span>
            <h1 className="mt-4 font-display text-4xl md:text-5xl font-extrabold text-primary-foreground leading-tight">Get in Touch</h1>
            <p className="mt-5 text-primary-foreground/70 max-w-xl mx-auto">Dedicated to delivering world-class service rooted in integrity, innovation, and excellence.</p>
                      <p className="mt-5 text-primary-foreground/70 max-w-xl mx-auto">Sharp Egde Business Solutions is a firm that provides clients with a wide range of services in auditing assurance, taxation, regulatory matters, and advisory services.</p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {contactItems.map((info: any, i: number) => {
              const Icon = getIcon(info.icon_name);
              return (
                <motion.div key={info.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 * i }}
                  className="rounded-2xl bg-card border border-border p-6 hover:border-primary/20 hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-primary/[0.08] flex items-center justify-center mb-4">
                    <Icon size={22} className="text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-primary mb-3">{info.title}</h3>
                  <div className="space-y-1 mb-4">
                    {(info.details || []).map((d: string) => <p key={d} className="text-sm text-muted-foreground">{d}</p>)}
                  </div>
                  {info.action_label && info.action_href && (
                    <a href={info.action_href} target={info.action_href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:gap-2.5 transition-all">
                      {info.action_label} <ExternalLink size={12} />
                    </a>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-10">
            <span className="text-xs font-bold tracking-widest uppercase text-brand-blue">Send a Message</span>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-extrabold text-primary">Leave a Message</h2>
          </motion.div>
          <motion.form initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} onSubmit={handleSubmit}
            className="rounded-2xl bg-card border border-border p-8 md:p-10 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div><label className="block text-sm font-semibold text-foreground mb-2">Name</label>
                <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="Your name" /></div>
              <div><label className="block text-sm font-semibold text-foreground mb-2">Email</label>
                <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="your@email.com" /></div>
            </div>
            <div><label className="block text-sm font-semibold text-foreground mb-2">Phone Number</label>
              <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="+977 9800000000" /></div>
            <div><label className="block text-sm font-semibold text-foreground mb-2">Message</label>
              <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none" placeholder="How can we help you?" /></div>
            <PrimaryButton 
              type="submit" 
              className="w-full sm:w-auto"
              containerClassName="h-12 w-full sm:w-[200px]"
            >
              <span className="flex items-center gap-2">
                <Send size={16} /> Send Message
              </span>
            </PrimaryButton>
          </motion.form>
        </div>
      </section>

      {/* Map */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="rounded-2xl overflow-hidden border border-border shadow-lg">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.9!2d85.34!3d27.69!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQxJzI0LjAiTiA4NcKwMjAnMjQuMCJF!5e0!3m2!1sen!2snp!4v1234567890"
              width="100%" height="400" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Sharp Edge Location" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
