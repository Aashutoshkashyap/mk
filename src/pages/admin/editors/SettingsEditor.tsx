import { useState } from "react";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { contentStore, DEFAULTS } from "@/lib/contentStore";
import { useSiteSettingsContent } from "@/hooks/useCMS";

const SettingsEditor = () => {
  const data = useSiteSettingsContent();
  const [form, setForm] = useState(data);

  const handleSave = () => { contentStore.setSiteSettings(form); toast.success("Site settings updated!"); };

  return (
    <div>
      <h2 className="font-display text-2xl font-extrabold text-primary mb-6">Site Settings</h2>
      <div className="rounded-2xl bg-card border border-border p-6 space-y-5">
        <Field label="Company Name" value={form.company_name} onChange={(v) => setForm({ ...form, company_name: v })} />
        <Field label="Logo URL" value={form.logo_url} onChange={(v) => setForm({ ...form, logo_url: v })} placeholder="/images/mk-logo.png or https://..." />
        {form.logo_url && (
          <div className="p-4 rounded-xl bg-secondary/30 border border-border">
            <p className="text-xs text-muted-foreground mb-2 font-semibold">Logo Preview:</p>
            <img src={form.logo_url} alt="Logo preview" className="h-12 object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          </div>
        )}
        <div className="flex gap-3">
          <button onClick={handleSave}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:bg-brand-navy-dark transition-colors">
            <Save size={16} /> Save Settings
          </button>
          <button onClick={() => { const d = DEFAULTS.site_settings; setForm(d); contentStore.setSiteSettings(d); toast.success("Reset!"); }}
            className="inline-flex items-center gap-2 rounded-xl bg-secondary px-4 py-3 text-sm font-medium text-foreground hover:bg-secondary/80 transition-colors">
            Reset to Defaults
          </button>
        </div>
      </div>
    </div>
  );
};

const Field = ({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) => (
  <div>
    <label className="block text-sm font-semibold text-foreground mb-1.5">{label}</label>
    <input value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
      className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
  </div>
);

export default SettingsEditor;
