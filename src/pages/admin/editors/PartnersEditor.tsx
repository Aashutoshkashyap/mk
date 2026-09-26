import { useState } from "react";
import { Save, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { contentStore, DEFAULTS } from "@/lib/contentStore";
import { usePartnersContent } from "@/hooks/useCMS";

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
      <p className="text-sm text-muted-foreground mb-4">Partners appear in the scrolling marquee on the homepage. Add a logo URL or leave blank to show the partner name as text.</p>
      <div className="space-y-3">
        {partners.map((p, idx) => (
          <div key={p.id} className="flex items-center gap-4 rounded-2xl bg-card border border-border p-4">
            {p.logo_url && (
              <img src={p.logo_url} alt={p.name} className="h-10 w-20 object-contain rounded-lg bg-white p-1 border border-border"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
            )}
            <div className="flex-1 grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">Partner Name</label>
                <input value={p.name} onChange={(e) => update(p.id, "name", e.target.value)}
                  className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">Logo URL (optional)</label>
                <input value={p.logo_url} onChange={(e) => update(p.id, "logo_url", e.target.value)} placeholder="https://..."
                  className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm" />
              </div>
            </div>
            <button onClick={() => remove(p.id)}
              className="rounded-lg bg-destructive/10 p-2 text-destructive hover:bg-destructive/20 shrink-0">
              <Trash2 size={15} />
            </button>
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
