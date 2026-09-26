import { useState } from "react";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { contentStore, DEFAULTS } from "@/lib/contentStore";
import { useSiteSettingsContent } from "@/hooks/useCMS";
import ImageUploadInput from "@/components/admin/ImageUploadInput";

const SettingsEditor = () => {
  const data = useSiteSettingsContent();
  const [form, setForm] = useState(data);

  const handleSave = () => { contentStore.setSiteSettings(form); toast.success("Site settings updated!"); };

  return (
    <div>
      <h2 className="font-display text-2xl font-extrabold text-primary mb-6">Site Settings</h2>
      <div className="rounded-2xl bg-card border border-border p-6 space-y-5">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">Company Name</label>
          <input
            value={form.company_name || ""}
            onChange={(e) => setForm({ ...form, company_name: e.target.value })}
            className="w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <ImageUploadInput
          label="Site Logo (SVG / PNG / Image)"
          value={form.logo_url || ""}
          onChange={(url) => setForm({ ...form, logo_url: url })}
          placeholder="/images/mk-logo.png or https://... or upload file"
          previewHeight="h-20"
          objectFit="contain"
          helpText="This logo appears in the header navigation and footer across the site."
        />

        <div className="flex gap-3 pt-2">
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

export default SettingsEditor;
