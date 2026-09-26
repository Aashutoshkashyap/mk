import { useState } from "react";
import { Save, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { contentStore, DEFAULTS } from "@/lib/contentStore";
import { useServicesContent } from "@/hooks/useCMS";
import iconMap from "@/lib/iconMap";

type Service = { id: string; title: string; description: string; icon_name: string; sort_order: number; image_url?: string };

const ServicesEditor = () => {
  const dbServices = useServicesContent();
  const [services, setServices] = useState<Service[]>(dbServices);

  const saveAll = () => { contentStore.setServices(services); toast.success("Services updated! Changes are live."); };

  const addService = () => setServices([...services, { id: crypto.randomUUID(), title: "New Service", description: "", icon_name: "Wrench", sort_order: services.length }]);
  const deleteService = (id: string) => setServices(services.filter((s) => s.id !== id));
  const update = (id: string, field: keyof Service, value: string) =>
    setServices(services.map((s) => s.id === id ? { ...s, [field]: value } : s));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-extrabold text-primary">Services</h2>
        <button onClick={addService} className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground"><Plus size={16} /> Add Service</button>
      </div>
      <div className="space-y-4">
        {services.map((svc) => (
          <div key={svc.id} className="rounded-2xl bg-card border border-border p-5 space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">Icon</label>
                <select value={svc.icon_name} onChange={(e) => update(svc.id, "icon_name", e.target.value)}
                  className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm">
                  {Object.keys(iconMap).map((k) => <option key={k} value={k}>{k}</option>)}
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-foreground mb-1">Title</label>
                <input value={svc.title} onChange={(e) => update(svc.id, "title", e.target.value)}
                  className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">Description</label>
              <textarea value={svc.description} onChange={(e) => update(svc.id, "description", e.target.value)} rows={2}
                className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm" />
            </div>
            <div className="flex justify-end">
              <button onClick={() => deleteService(svc.id)}
                className="inline-flex items-center gap-1 rounded-lg bg-destructive/10 px-3 py-1.5 text-xs text-destructive hover:bg-destructive/20">
                <Trash2 size={13} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex gap-3">
        <button onClick={saveAll} className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:bg-brand-navy-dark transition-colors">
          <Save size={16} /> Save All Services
        </button>
        <button onClick={() => { setServices(DEFAULTS.services); contentStore.setServices(DEFAULTS.services); toast.success("Reset!"); }}
          className="inline-flex items-center gap-2 rounded-xl bg-secondary px-4 py-3 text-sm font-medium text-foreground hover:bg-secondary/80 transition-colors">
          Reset to Defaults
        </button>
      </div>
    </div>
  );
};

export default ServicesEditor;
