import { useState } from "react";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { contentStore, DEFAULTS } from "@/lib/contentStore";
import { usePreFooterCTAContent } from "@/hooks/useCMS";

const CTAEditor = () => {
  const data = usePreFooterCTAContent();
  const [form, setForm] = useState(data);

  const handleSave = () => { contentStore.setPreFooterCta(form); toast.success("Pre-footer CTA updated! Changes are live."); };

  return (
    <div>
      <h2 className="font-display text-2xl font-extrabold text-primary mb-6">Pre-Footer CTA</h2>
      <div className="rounded-2xl bg-card border border-border p-6 space-y-5">
        <Field label="Heading" value={form.heading} onChange={(v) => setForm({ ...form, heading: v })} />
        <Field label="Description" value={form.description} onChange={(v) => setForm({ ...form, description: v })} textarea />
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="CTA Button Text" value={form.cta_text} onChange={(v) => setForm({ ...form, cta_text: v })} />
          <Field label="CTA Button Link" value={form.cta_link} onChange={(v) => setForm({ ...form, cta_link: v })} />
        </div>
        <div className="flex gap-3">
          <button onClick={handleSave}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:bg-brand-navy-dark transition-colors">
            <Save size={16} /> Save Changes
          </button>
          <button onClick={() => { const d = DEFAULTS.prefooter_cta; setForm(d); contentStore.setPreFooterCta(d); toast.success("Reset!"); }}
            className="inline-flex items-center gap-2 rounded-xl bg-secondary px-4 py-3 text-sm font-medium text-foreground hover:bg-secondary/80 transition-colors">
            Reset to Defaults
          </button>
        </div>
      </div>
    </div>
  );
};

const Field = ({ label, value, onChange, textarea }: { label: string; value: string; onChange: (v: string) => void; textarea?: boolean }) => (
  <div>
    <label className="block text-sm font-semibold text-foreground mb-1.5">{label}</label>
    {textarea ? (
      <textarea value={value || ""} onChange={(e) => onChange(e.target.value)} rows={3}
        className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
    ) : (
      <input value={value || ""} onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
    )}
  </div>
);

export default CTAEditor;
