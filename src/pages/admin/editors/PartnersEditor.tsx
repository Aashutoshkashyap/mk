import { useState } from "react";
import { Save, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { contentStore } from "@/lib/contentStore";
import { usePartnersContent } from "@/hooks/useCMS";
import ImageUploadInput from "@/components/admin/ImageUploadInput";

type Partner = { id: string; name: string; logo_url: string; sort_order: number };

const PartnersEditor = () => {
  const dbPartners = usePartnersContent();
  const [partners, setPartners] = useState<Partner[]>(dbPartners);

  const saveAll = () => { contentStore.setPartners(partners); toast.success("Partners updated! Changes are live."); };
  const add = () => setPartners([...partners, { id: crypto.randomUUID(), name: "New Partner", logo_url: "", sort_order: partners.length }]);
  const remove = (id: string) => setPartners(partners.filter((p) => p.id !== id));
  const update = (id: string, field: keyof Partner, val: string) =>
    setPartners(partners.map((p) => p.id === id ? { ...p, [field]: val } : p));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-extrabold text-primary">Partners & Clients</h2>
        <button onClick={add} className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground"><Plus size={16} /> Add Partner</button>
      </div>
      <p className="text-sm text-muted-foreground mb-4">Partners appear in the scrolling marquee on the homepage. Upload or paste a logo URL, or leave blank to show the partner name as text.</p>
      <div className="space-y-4">
        {partners.map((p) => (
          <div key={p.id} className="rounded-2xl bg-card border border-border p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex-1 mr-4">
                <label className="block text-xs font-semibold text-foreground mb-1">Partner Name</label>
                <input value={p.name} onChange={(e) => update(p.id, "name", e.target.value)}
                  className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm" />
              </div>
              <button onClick={() => remove(p.id)}
                className="rounded-lg bg-destructive/10 p-2 text-destructive hover:bg-destructive/20 shrink-0 self-end">
                <Trash2 size={16} />
              </button>
            </div>
            
            <ImageUploadInput
              label="Partner Logo (SVG / PNG / Image)"
              value={p.logo_url}
              onChange={(url) => update(p.id, "logo_url", url)}
              placeholder="https://... or upload logo"
              previewHeight="h-20"
              objectFit="contain"
            />
          </div>
        ))}
      </div>
      <div className="mt-6 flex gap-3">
        <button onClick={saveAll} className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:bg-brand-navy-dark transition-colors">
          <Save size={16} /> Save Partners
        </button>
      </div>
    </div>
  );
};

export default PartnersEditor;
