import { useState } from "react";
import { Save, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { contentStore, DEFAULTS } from "@/lib/contentStore";
import { useContactInfoContent } from "@/hooks/useCMS";

type ContactItem = { id: string; icon_name: string; title: string; details: string[]; action_label?: string; action_href?: string; sort_order: number };

const ContactEditor = () => {
  const dbData = useContactInfoContent();
  const [items, setItems] = useState<ContactItem[]>(dbData);

  const saveAll = () => { contentStore.setContactInfo(items); toast.success("Contact info updated! Changes are live."); };
  const add = () => setItems([...items, { id: crypto.randomUUID(), icon_name: "Phone", title: "New Contact", details: [""], sort_order: items.length }]);
  const remove = (id: string) => setItems(items.filter((i) => i.id !== id));
  const update = (id: string, field: keyof ContactItem, val: any) =>
    setItems(items.map((i) => i.id === id ? { ...i, [field]: val } : i));
  const updateDetail = (id: string, idx: number, val: string) => {
    const item = items.find((i) => i.id === id)!;
    const newDetails = [...item.details];
    newDetails[idx] = val;
    update(id, "details", newDetails);
  };
  const addDetail = (id: string) => {
    const item = items.find((i) => i.id === id)!;
    update(id, "details", [...item.details, ""]);
  };
  const removeDetail = (id: string, idx: number) => {
    const item = items.find((i) => i.id === id)!;
    update(id, "details", item.details.filter((_, i) => i !== idx));
  };

  const iconOptions = ["MapPin", "Phone", "Mail", "Clock", "Globe", "Linkedin", "Facebook"];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-extrabold text-primary">Contact Info</h2>
        <button onClick={add} className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground"><Plus size={16} /> Add Item</button>
      </div>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="rounded-2xl bg-card border border-border p-5 space-y-3">
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">Icon</label>
                <select value={item.icon_name} onChange={(e) => update(item.id, "icon_name", e.target.value)}
                  className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm">
                  {iconOptions.map((k) => <option key={k} value={k}>{k}</option>)}
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-foreground mb-1">Title</label>
                <input value={item.title} onChange={(e) => update(item.id, "title", e.target.value)}
                  className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">Details (one per line)</label>
              {item.details.map((d, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <input value={d} onChange={(e) => updateDetail(item.id, idx, e.target.value)}
                    className="flex-1 rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm" />
                  <button onClick={() => removeDetail(item.id, idx)} className="text-destructive hover:bg-destructive/10 rounded-lg p-2"><Trash2 size={13} /></button>
                </div>
              ))}
              <button onClick={() => addDetail(item.id)} className="text-xs text-primary hover:underline">+ Add line</button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">Action Label (optional)</label>
                <input value={item.action_label || ""} onChange={(e) => update(item.id, "action_label", e.target.value)}
                  className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm" placeholder="e.g. Call Us" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">Action Link (optional)</label>
                <input value={item.action_href || ""} onChange={(e) => update(item.id, "action_href", e.target.value)}
                  className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm" placeholder="tel:+977..." />
              </div>
            </div>
            <div className="flex justify-end">
              <button onClick={() => remove(item.id)}
                className="inline-flex items-center gap-1 rounded-lg bg-destructive/10 px-3 py-1.5 text-xs text-destructive hover:bg-destructive/20">
                <Trash2 size={13} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex gap-3">
        <button onClick={saveAll} className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:bg-brand-navy-dark transition-colors">
          <Save size={16} /> Save Contact Info
        </button>
        <button onClick={() => { setItems(DEFAULTS.contact_info); contentStore.setContactInfo(DEFAULTS.contact_info); toast.success("Reset!"); }}
          className="inline-flex items-center gap-2 rounded-xl bg-secondary px-4 py-3 text-sm font-medium text-foreground hover:bg-secondary/80 transition-colors">
          Reset to Defaults
        </button>
      </div>
    </div>
  );
};

export default ContactEditor;
