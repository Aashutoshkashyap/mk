import { useState } from "react";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { contentStore, DEFAULTS } from "@/lib/contentStore";
import { useAboutContent } from "@/hooks/useCMS";

const AboutEditor = () => {
  const data = useAboutContent();
  const [form, setForm] = useState(data);

  const handleSave = () => {
    contentStore.setAbout(form);
    toast.success("About section updated! Changes are live on the website.");
  };

  const f = (key: keyof typeof form) => ({
    value: form[key] as string,
    onChange: (v: string) => setForm({ ...form, [key]: v }),
  });

  return (
    <div>
      <h2 className="font-display text-2xl font-extrabold text-primary mb-6">About Section</h2>
      <div className="rounded-2xl bg-card border border-border p-6 space-y-5">
        <div className="grid lg:grid-cols-2 gap-5">
          <Field label="Heading" {...f("heading")} />
          <Field label="Subheading" {...f("subheading")} />
        </div>
        <Field label="Description" {...f("description")} textarea />
        <Field label="About Image URL" {...f("image_url")} placeholder="https://... or leave blank for default" />
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Vision Title" {...f("vision_title")} />
          <Field label="Mission Title" {...f("mission_title")} />
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Vision Text" {...f("vision_text")} textarea />
          <Field label="Mission Text" {...f("mission_text")} textarea />
        </div>
        <div className="flex gap-3">
          <button onClick={handleSave}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:bg-brand-navy-dark transition-colors">
            <Save size={16} /> Save Changes
          </button>
          <button onClick={() => { const d = DEFAULTS.about; setForm(d); contentStore.setAbout(d); toast.success("Reset to defaults!"); }}
            className="inline-flex items-center gap-2 rounded-xl bg-secondary px-4 py-3 text-sm font-medium text-foreground hover:bg-secondary/80 transition-colors">
            Reset to Defaults
          </button>
        </div>
      </div>
    </div>
  );
};

const Field = ({ label, value, onChange, textarea, placeholder }: { label: string; value: string; onChange: (v: string) => void; textarea?: boolean; placeholder?: string }) => (
  <div>
    <label className="block text-sm font-semibold text-foreground mb-1.5">{label}</label>
    {textarea ? (
      <textarea value={value || ""} onChange={(e) => onChange(e.target.value)} rows={3} placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
    ) : (
      <input value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
    )}
  </div>
);

export default AboutEditor;
