import { useState } from "react";
import { Save, Plus, Trash2, Star } from "lucide-react";
import { toast } from "sonner";
import { contentStore, DEFAULTS } from "@/lib/contentStore";
import { useTestimonialsContent } from "@/hooks/useCMS";
import ImageUploadInput from "@/components/admin/ImageUploadInput";

type Testimonial = { id: string; name: string; role: string; content: string; rating: number; sort_order: number; image_url?: string };

const TestimonialsEditor = () => {
  const dbData = useTestimonialsContent();
  const [items, setItems] = useState<Testimonial[]>(dbData);

  const saveAll = () => { contentStore.setTestimonials(items); toast.success("Testimonials updated! Changes are live."); };
  const add = () => setItems([...items, { id: crypto.randomUUID(), name: "New Person", role: "Title, Company", content: "Testimonial text here.", rating: 5, sort_order: items.length }]);
  const remove = (id: string) => setItems(items.filter((t) => t.id !== id));
  const update = (id: string, field: keyof Testimonial, val: any) =>
    setItems(items.map((t) => t.id === id ? { ...t, [field]: val } : t));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-extrabold text-primary">Testimonials</h2>
        <button onClick={add} className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground"><Plus size={16} /> Add Testimonial</button>
      </div>
      <div className="space-y-4">
        {items.map((t) => (
          <div key={t.id} className="rounded-2xl bg-card border border-border p-5 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">Name</label>
                <input value={t.name} onChange={(e) => update(t.id, "name", e.target.value)}
                  className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">Role / Company</label>
                <input value={t.role} onChange={(e) => update(t.id, "role", e.target.value)}
                  className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">Testimonial</label>
              <textarea value={t.content} onChange={(e) => update(t.id, "content", e.target.value)} rows={3}
                className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm" />
            </div>
            
            <ImageUploadInput
              label="Author Photo / Avatar (optional)"
              value={t.image_url || ""}
              onChange={(url) => update(t.id, "image_url", url)}
              placeholder="https://... or upload photo"
              previewHeight="h-24"
              objectFit="cover"
            />

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">Rating (1–5)</label>
              <input type="number" min={1} max={5} value={t.rating} onChange={(e) => update(t.id, "rating", parseInt(e.target.value) || 5)}
                className="w-32 rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm" />
            </div>

            <div className="flex justify-end">
              <button onClick={() => remove(t.id)}
                className="inline-flex items-center gap-1 rounded-lg bg-destructive/10 px-3 py-1.5 text-xs text-destructive hover:bg-destructive/20">
                <Trash2 size={13} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex gap-3">
        <button onClick={saveAll} className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:bg-brand-navy-dark transition-colors">
          <Save size={16} /> Save All Testimonials
        </button>
        <button onClick={() => { setItems(DEFAULTS.testimonials); contentStore.setTestimonials(DEFAULTS.testimonials); toast.success("Reset!"); }}
          className="inline-flex items-center gap-2 rounded-xl bg-secondary px-4 py-3 text-sm font-medium text-foreground hover:bg-secondary/80 transition-colors">
          Reset to Defaults
        </button>
      </div>
    </div>
  );
};

export default TestimonialsEditor;
