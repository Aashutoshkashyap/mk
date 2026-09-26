import { useState } from "react";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { contentStore, DEFAULTS } from "@/lib/contentStore";
import { useHeroContent } from "@/hooks/useCMS";
import ImageUploadInput from "@/components/admin/ImageUploadInput";

const HeroEditor = () => {
  const data = useHeroContent();
  const [form, setForm] = useState(data);

  const handleSave = () => {
    contentStore.setHero(form);
    toast.success("Hero section updated! Changes are live on the homepage.");
  };

  return (
    <div>
      <h2 className="font-display text-2xl font-extrabold text-primary mb-6">Hero Section</h2>
      <div className="rounded-2xl bg-card border border-border p-6 space-y-6">
        <div className="grid lg:grid-cols-2 gap-6">
          <Field label="Headline / Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
          <Field label="Badge Text" value={form.badge} onChange={(v) => setForm({ ...form, badge: v })} />
        </div>
        <Field label="Description" value={form.description} onChange={(v) => setForm({ ...form, description: v })} textarea />
        <div className="grid grid-cols-2 gap-4">
          <Field label="Primary CTA Text" value={form.cta_text} onChange={(v) => setForm({ ...form, cta_text: v })} />
          <Field label="Primary CTA Link" value={form.cta_link} onChange={(v) => setForm({ ...form, cta_link: v })} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Secondary CTA Text" value={form.secondary_cta_text} onChange={(v) => setForm({ ...form, secondary_cta_text: v })} />
          <Field label="Secondary CTA Link" value={form.secondary_cta_link} onChange={(v) => setForm({ ...form, secondary_cta_link: v })} />
        </div>

        {/* Hero Section Featured Image with Upload & URL */}
        <ImageUploadInput
          label="Hero Section Featured Image"
          value={form.image_url || "/images/hero.jpg"}
          onChange={(url) => setForm({ ...form, image_url: url })}
          placeholder="/images/hero.jpg or https://... or upload image"
          helpText="This image appears prominently in the circular/badge frame on the main homepage hero section."
          previewHeight="h-56"
        />

        <div className="flex gap-3 pt-2">
          <button onClick={handleSave}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:bg-brand-navy-dark transition-colors">
            <Save size={16} /> Save Changes
          </button>
          <button onClick={() => { setForm(DEFAULTS.hero); contentStore.setHero(DEFAULTS.hero); toast.success("Reset to defaults!"); }}
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
      <textarea value={value || ""} onChange={(e) => onChange(e.target.value)} rows={4} placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
    ) : (
      <input value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
    )}
  </div>
);

export default HeroEditor;
